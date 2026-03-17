import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestRegressor, GradientBoostingRegressor
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline
from typing import Optional
import pickle
import os


TIPS_LIBRARY = {
    "high_expenses": [
        "Your expenses are over 80% of your income. Look for areas to cut costs.",
        "Consider tracking daily spending to identify hidden costs.",
        "Review subscriptions and cancel unused services.",
    ],
    "moderate_expenses": [
        "You're managing expenses reasonably. Try reducing by 5-10% more.",
        "Consider the 50/30/20 rule: 50% needs, 30% wants, 20% savings.",
        "Build an emergency fund covering 3-6 months of expenses.",
    ],
    "low_expenses": [
        "Excellent expense management! Consider investing your surplus.",
        "Look into index funds or ETFs for long-term wealth building.",
        "Diversify savings: high-yield savings, bonds, and investments.",
    ],
    "no_savings": [
        "Start small — even saving 5% of your income builds good habits.",
        "Automate transfers to savings on payday.",
        "Look for additional income streams to cover expenses.",
    ],
    "goal_achievable": [
        "You're on track! Stay consistent and your goal is reachable.",
        "Consider increasing savings by 10% to reach your goal faster.",
        "Celebrate small milestones to stay motivated.",
    ],
    "goal_far": [
        "Your goal is ambitious. Break it into smaller monthly targets.",
        "Consider extending your timeline or increasing income.",
        "Track progress weekly to stay accountable.",
    ],
}


class FinancialPredictor:
    def __init__(self):
        self.model: Optional[Pipeline] = None
        self.is_trained = False
        self.training_count = 0
        self.model_path = os.path.join(os.path.dirname(__file__), "model.pkl")
        self._load_model()

    def _load_model(self):
        if os.path.exists(self.model_path):
            try:
                with open(self.model_path, "rb") as f:
                    data = pickle.load(f)
                    self.model = data["model"]
                    self.training_count = data.get("training_count", 0)
                    self.is_trained = True
            except Exception:
                self.is_trained = False

    def _save_model(self):
        try:
            with open(self.model_path, "wb") as f:
                pickle.dump(
                    {"model": self.model, "training_count": self.training_count}, f
                )
        except Exception:
            pass

    def _engineer_features(self, available_amount: float, monthly_expenses: float, savings_goal: float) -> np.ndarray:
        expense_ratio = monthly_expenses / available_amount if available_amount > 0 else 1.0
        remaining = available_amount - monthly_expenses
        goal_ratio = savings_goal / available_amount if available_amount > 0 else 1.0
        remaining_ratio = remaining / available_amount if available_amount > 0 else 0.0

        return np.array([[
            available_amount,
            monthly_expenses,
            savings_goal,
            expense_ratio,
            remaining,
            goal_ratio,
            remaining_ratio,
        ]])

    def _rule_based_plan(self, available_amount: float, monthly_expenses: float, savings_goal: float) -> dict:
        monthly_remaining = available_amount - monthly_expenses
        expense_ratio = monthly_expenses / available_amount if available_amount > 0 else 1.0

        if monthly_remaining <= 0:
            recommended_savings = 0.0
            financial_health = "Critical"
            health_score = 10
        elif expense_ratio > 0.9:
            recommended_savings = max(monthly_remaining * 0.2, 0)
            financial_health = "Poor"
            health_score = 25
        elif expense_ratio > 0.75:
            recommended_savings = monthly_remaining * 0.4
            financial_health = "Fair"
            health_score = 45
        elif expense_ratio > 0.55:
            recommended_savings = monthly_remaining * 0.6
            financial_health = "Good"
            health_score = 65
        else:
            recommended_savings = monthly_remaining * 0.75
            financial_health = "Excellent"
            health_score = 85

        recommended_savings = min(recommended_savings, savings_goal) if savings_goal > 0 else recommended_savings
        recommended_savings = max(recommended_savings, 0)

        months_to_goal = (savings_goal / recommended_savings) if recommended_savings > 0 and savings_goal > 0 else 0

        tips = self._generate_tips(expense_ratio, recommended_savings, months_to_goal, available_amount)

        return {
            "monthly_income": round(available_amount, 2),
            "monthly_expenses": round(monthly_expenses, 2),
            "monthly_remaining": round(monthly_remaining, 2),
            "recommended_savings": round(recommended_savings, 2),
            "annual_savings": round(recommended_savings * 12, 2),
            "months_to_goal": round(months_to_goal, 1),
            "financial_health": financial_health,
            "health_score": health_score,
            "expense_ratio": round(expense_ratio * 100, 1),
            "savings_rate": round((recommended_savings / available_amount * 100), 1) if available_amount > 0 else 0,
            "ai_enhanced": False,
            "tips": tips,
        }

    def _generate_tips(self, expense_ratio: float, savings: float, months_to_goal: float, income: float) -> list[str]:
        tips = []

        if expense_ratio > 0.8:
            tips.extend(np.random.choice(TIPS_LIBRARY["high_expenses"], size=min(2, len(TIPS_LIBRARY["high_expenses"])), replace=False).tolist())
        elif expense_ratio > 0.55:
            tips.extend(np.random.choice(TIPS_LIBRARY["moderate_expenses"], size=min(2, len(TIPS_LIBRARY["moderate_expenses"])), replace=False).tolist())
        else:
            tips.extend(np.random.choice(TIPS_LIBRARY["low_expenses"], size=min(2, len(TIPS_LIBRARY["low_expenses"])), replace=False).tolist())

        if savings <= 0:
            tips.extend(TIPS_LIBRARY["no_savings"][:2])
        elif months_to_goal > 0 and months_to_goal <= 24:
            tips.append(np.random.choice(TIPS_LIBRARY["goal_achievable"]))
        elif months_to_goal > 24:
            tips.append(np.random.choice(TIPS_LIBRARY["goal_far"]))

        return tips[:4]

    def generate_plan(self, available_amount: float, monthly_expenses: float, savings_goal: float) -> dict:
        plan = self._rule_based_plan(available_amount, monthly_expenses, savings_goal)

        if self.is_trained and self.training_count >= 5:
            try:
                features = self._engineer_features(available_amount, monthly_expenses, savings_goal)
                ai_savings = float(self.model.predict(features)[0])
                ai_savings = max(0, min(ai_savings, available_amount - monthly_expenses))
                ai_savings = min(ai_savings, savings_goal) if savings_goal > 0 else ai_savings

                blended = plan["recommended_savings"] * 0.3 + ai_savings * 0.7
                plan["recommended_savings"] = round(blended, 2)
                plan["annual_savings"] = round(blended * 12, 2)
                if blended > 0 and savings_goal > 0:
                    plan["months_to_goal"] = round(savings_goal / blended, 1)
                plan["savings_rate"] = round((blended / available_amount * 100), 1) if available_amount > 0 else 0
                plan["ai_enhanced"] = True
            except Exception:
                pass

        return plan

    def train(self, historical_data: list[dict]) -> bool:
        if len(historical_data) < 5:
            return False

        try:
            df = pd.DataFrame(historical_data)
            required = ["available_amount", "monthly_expenses", "savings_goal", "actual_savings"]
            if not all(col in df.columns for col in required):
                return False

            features_list = []
            for _, row in df.iterrows():
                features_list.append(
                    self._engineer_features(
                        row["available_amount"],
                        row["monthly_expenses"],
                        row["savings_goal"],
                    ).flatten()
                )

            X = np.array(features_list)
            y = df["actual_savings"].values

            self.model = Pipeline([
                ("scaler", StandardScaler()),
                ("regressor", GradientBoostingRegressor(
                    n_estimators=100,
                    learning_rate=0.1,
                    max_depth=4,
                    random_state=42,
                )),
            ])
            self.model.fit(X, y)
            self.is_trained = True
            self.training_count = len(historical_data)
            self._save_model()
            return True
        except Exception as e:
            print(f"Training error: {e}")
            return False


predictor = FinancialPredictor()

plan = predictor.generate_plan(
    available_amount=3000,   
    monthly_expenses=2000,   
    savings_goal=1000        
)

print(plan)