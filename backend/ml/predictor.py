import numpy as np
import pandas as pd
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline
from typing import Optional
import pickle
import os

_DIR        = os.path.dirname(__file__)
MODEL_PATH  = os.path.join(_DIR, "model.pkl")
CSV_PATH    = os.path.join(_DIR, "data.csv")
CSV_ROWS    = 5_000

TIPS_LIBRARY = {
    "high_expenses": [
        "Your expenses exceed 80 % of income — identify and cut non-essential costs.",
        "Track daily spending for one week to uncover hidden leaks.",
        "Cancel unused subscriptions; every small saving adds up.",
    ],
    "moderate_expenses": [
        "You manage expenses well. Aim to cut a further 5–10 %.",
        "Apply the 50/30/20 rule: 50 % needs, 30 % wants, 20 % savings.",
        "Build an emergency fund covering 3–6 months of expenses.",
    ],
    "low_expenses": [
        "Great expense discipline! Channel surplus into investments.",
        "Consider low-cost index funds or ETFs for long-term growth.",
        "Diversify: high-yield savings, bonds, and equities.",
    ],
    "no_savings": [
        "Start with just 5 % of income — small habits compound over time.",
        "Automate a savings transfer on payday so you save before you spend.",
        "Explore side-income opportunities to cover your expense gap.",
    ],
    "goal_achievable": [
        "You're on track — stay consistent and your goal is within reach.",
        "Boost savings by 10 % to hit your goal even faster.",
        "Celebrate small milestones to maintain motivation.",
    ],
    "goal_far": [
        "Your goal is ambitious — break it into smaller monthly targets.",
        "Consider extending your timeline or finding additional income.",
        "Review your plan monthly and adjust as circumstances change.",
    ],
}


def _health_from_rate(savings_rate: float) -> tuple[str, int]:
    """Return (label, score) based on savings_rate (0–100)."""
    if savings_rate >= 25:
        return "Excellent", 90
    if savings_rate >= 15:
        return "Good", 70
    if savings_rate >= 8:
        return "Fair", 50
    if savings_rate > 0:
        return "Poor", 25
    return "Critical", 10


class FinancialPredictor:
    def __init__(self):
        self.model: Optional[Pipeline] = None
        self.is_trained  = False
        self.training_count = 0
        self._load_model()

        if not self.is_trained:
            self._ensure_csv()
            self.train_from_csv()


    def _load_model(self):
        if os.path.exists(MODEL_PATH):
            try:
                with open(MODEL_PATH, "rb") as fh:
                    data = pickle.load(fh)
                self.model          = data["model"]
                self.training_count = data.get("training_count", 0)
                self.is_trained     = True
                print(f"[Predictor] Model loaded ({self.training_count} samples).")
            except Exception as exc:
                print(f"[Predictor] Could not load model: {exc}")
                self.is_trained = False

    def _save_model(self):
        try:
            with open(MODEL_PATH, "wb") as fh:
                pickle.dump(
                    {"model": self.model, "training_count": self.training_count}, fh
                )
            print(f"[Predictor] Model saved ({self.training_count} samples).")
        except Exception as exc:
            print(f"[Predictor] Could not save model: {exc}")


    def _ensure_csv(self):
        """Generate data.csv with CSV_ROWS realistic rows if it doesn't exist."""
        if os.path.exists(CSV_PATH):
            print(f"[Predictor] CSV already exists at {CSV_PATH}.")
            return

        print(f"[Predictor] Generating {CSV_ROWS} training rows → {CSV_PATH} …")
        rng = np.random.default_rng(42)

        available_amount = rng.uniform(1_000, 10_000, CSV_ROWS)
    
        expense_frac     = rng.uniform(0.20, 0.90, CSV_ROWS)
        monthly_expenses = available_amount * expense_frac
        remaining        = available_amount - monthly_expenses

        goal_frac        = rng.uniform(0.0, 0.80, CSV_ROWS)
        savings_goal     = remaining * goal_frac

        save_frac        = rng.beta(2, 3, CSV_ROWS)          
        actual_savings   = np.clip(remaining * save_frac, 0, remaining)

        df = pd.DataFrame({
            "available_amount":  np.round(available_amount, 2),
            "monthly_expenses":  np.round(monthly_expenses, 2),
            "savings_goal":      np.round(savings_goal, 2),
            "actual_savings":    np.round(actual_savings, 2),
        })
        df.to_csv(CSV_PATH, index=False)
        print(f"[Predictor] CSV written ({len(df)} rows).")


    def _engineer_features(
        self,
        available_amount: float,
        monthly_expenses: float,
        savings_goal: float,
    ) -> np.ndarray:
        expense_ratio    = monthly_expenses / available_amount if available_amount > 0 else 1.0
        remaining        = available_amount - monthly_expenses
        goal_ratio       = savings_goal / available_amount if available_amount > 0 else 1.0
        remaining_ratio  = remaining / available_amount if available_amount > 0 else 0.0

        return np.array([[
            available_amount,
            monthly_expenses,
            savings_goal,
            expense_ratio,
            remaining,
            goal_ratio,
            remaining_ratio,
        ]])


    def train_from_csv(self) -> bool:
        """Train the model from data.csv."""
        if not os.path.exists(CSV_PATH):
            print("[Predictor] CSV not found — cannot train.")
            return False
        try:
            df = pd.read_csv(CSV_PATH)
            return self.train(df.to_dict("records"))
        except Exception as exc:
            print(f"[Predictor] train_from_csv error: {exc}")
            return False

    def train(self, historical_data: list[dict]) -> bool:
        """Train from a list of dicts with keys: available_amount, monthly_expenses,
        savings_goal, actual_savings."""
        if len(historical_data) < 5:
            return False
        try:
            df       = pd.DataFrame(historical_data)
            required = ["available_amount", "monthly_expenses", "savings_goal", "actual_savings"]
            if not all(c in df.columns for c in required):
                return False

            X = np.array([
                self._engineer_features(
                    row["available_amount"],
                    row["monthly_expenses"],
                    row["savings_goal"],
                ).flatten()
                for _, row in df.iterrows()
            ])
            y = df["actual_savings"].values

            self.model = Pipeline([
                ("scaler",    StandardScaler()),
                ("regressor", GradientBoostingRegressor(
                    n_estimators=200,
                    learning_rate=0.08,
                    max_depth=4,
                    subsample=0.85,
                    random_state=42,
                )),
            ])
            self.model.fit(X, y)
            self.is_trained     = True
            self.training_count = len(historical_data)
            self._save_model()
            print(f"[Predictor] Training complete ({self.training_count} samples).")
            return True
        except Exception as exc:
            print(f"[Predictor] Training error: {exc}")
            return False


    def _generate_tips(
        self,
        expense_ratio: float,
        recommended_savings: float,
        months_to_goal: float,
    ) -> list[str]:
        rng  = np.random.default_rng()
        tips: list[str] = []

        if expense_ratio > 0.80:
            pool = TIPS_LIBRARY["high_expenses"]
        elif expense_ratio > 0.55:
            pool = TIPS_LIBRARY["moderate_expenses"]
        else:
            pool = TIPS_LIBRARY["low_expenses"]
        tips.extend(rng.choice(pool, size=min(2, len(pool)), replace=False).tolist())

        if recommended_savings <= 0:
            tips.extend(TIPS_LIBRARY["no_savings"][:2])
        elif months_to_goal > 0 and months_to_goal <= 24:
            tips.append(rng.choice(TIPS_LIBRARY["goal_achievable"]).tolist()
                        if hasattr(rng.choice(TIPS_LIBRARY["goal_achievable"]), "tolist")
                        else str(rng.choice(TIPS_LIBRARY["goal_achievable"])))
        elif months_to_goal > 24:
            tips.append(str(rng.choice(TIPS_LIBRARY["goal_far"])))

        return tips[:4]


    def generate_plan(
        self,
        available_amount: float,
        monthly_expenses: float,
        savings_goal: float,
    ) -> dict:
        """Generate a complete financial plan using the AI model only."""

        monthly_remaining = max(available_amount - monthly_expenses, 0.0)
        expense_ratio     = (
            monthly_expenses / available_amount if available_amount > 0 else 1.0
        )

        features = self._engineer_features(available_amount, monthly_expenses, savings_goal)
        raw_pred = float(self.model.predict(features)[0])

        recommended_savings = float(np.clip(raw_pred, 0.0, monthly_remaining))

        if savings_goal > 0:
            recommended_savings = min(recommended_savings, savings_goal)

        recommended_savings = round(recommended_savings, 2)

        annual_savings  = round(recommended_savings * 12, 2)
        savings_rate    = round(
            (recommended_savings / available_amount * 100) if available_amount > 0 else 0.0,
            1,
        )
        months_to_goal  = (
            round(savings_goal / recommended_savings, 1)
            if recommended_savings > 0 and savings_goal > 0
            else 0.0
        )
        financial_health, health_score = _health_from_rate(savings_rate)

        tips = self._generate_tips(expense_ratio, recommended_savings, months_to_goal)

        return {
            "monthly_income":       round(available_amount, 2),
            "monthly_expenses":     round(monthly_expenses, 2),
            "monthly_remaining":    round(monthly_remaining, 2),
            "recommended_savings":  recommended_savings,
            "annual_savings":       annual_savings,
            "months_to_goal":       months_to_goal,
            "savings_rate":         savings_rate,
            "financial_health":     financial_health,
            "health_score":         health_score,
            "expense_ratio":        round(expense_ratio * 100, 1),
            "ai_enhanced":          True,
            "tips":                 tips,
        }

predictor = FinancialPredictor()
