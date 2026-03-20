from fastapi import APIRouter, HTTPException, Depends, status
from datetime import datetime
from bson import ObjectId
from typing import List


from backend.database import get_db
from backend.model.plan import PlanInput, PlanResponse, PlanResult
from backend.auth.dependencies import get_current_user
from backend.ml.predictor import predictor


router = APIRouter(prefix="/api/plans", tags=["Financial Plans"])


def plan_doc_to_response(doc: dict) -> PlanResponse:
    return PlanResponse(
        id=str(doc["_id"]),
        title=doc["title"],
        available_amount=doc["available_amount"],
        monthly_expenses=doc["monthly_expenses"],
        savings_goal=doc["savings_goal"],
        notes=doc.get("notes"),
        plan_result=PlanResult(**doc["plan_result"]),
        created_at=doc["created_at"],
        user_id=str(doc["user_id"]),
    )

@router.post("", response_model=PlanResponse, status_code=status.HTTP_201_CREATED)
async def create_plan(plan_input: PlanInput, current_user: dict = Depends(get_current_user)):
    try:
        db = get_db()
        user_id = current_user["_id"]

        plan_result = predictor.generate_plan(
            available_amount=plan_input.available_amount,
            monthly_expenses=plan_input.monthly_expenses,
            savings_goal=plan_input.savings_goal,
        )

        plan_doc = {
            "user_id": user_id,
            "title": plan_input.title,
            "available_amount": plan_input.available_amount,
            "monthly_expenses": plan_input.monthly_expenses,
            "savings_goal": plan_input.savings_goal,
            "notes": plan_input.notes,
            "plan_result": plan_result,
            "created_at": datetime.utcnow(),
        }

        result = await db.plans.insert_one(plan_doc)
        plan_doc["_id"] = result.inserted_id

        # await _retrain_model(db, user_id) 

        return plan_doc_to_response(plan_doc)

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))