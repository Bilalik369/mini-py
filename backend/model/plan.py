from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime


class PlanInput(BaseModel):
    title: str = Field(..., min_length=1, max_length=100)
    available_amount: float = Field(..., gt=0, description="Monthly income/available amount")
    monthly_expenses: float = Field(..., ge=0, description="Total monthly expenses")
    savings_goal: float = Field(..., ge=0, description="Target savings amount")
    notes: Optional[str] = Field(None, max_length=500)


class PlanResult(BaseModel):
    monthly_income: float
    monthly_expenses: float
    monthly_remaining: float
    recommended_savings: float
    annual_savings: float
    months_to_goal: float
    financial_health: str
    expense_ratio: float
    savings_rate: float
    ai_enhanced: bool
    tips: list[str]


class PlanResponse(BaseModel):
    id: str
    title: str
    available_amount: float
    monthly_expenses: float
    savings_goal: float
    notes: Optional[str]
    plan_result: PlanResult
    created_at: datetime
    user_id: str
