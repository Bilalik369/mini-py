from fastapi import APIRouter, HTTPException, Depends, status
from datetime import datetime

from backend.database import get_db
from backend.model.plan import PlanInput, PlanResponse, PlanResult
from backend.auth.dependencies import get_current_user
from backend.ml.predictor import predictor

router = APIRouter(prefix="/api/plans", tags=["Financial Plans"])


def _doc_to_response(doc: dict) -> PlanResponse:
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
async def create_plan(
    plan_input: PlanInput,
    db=Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    try:
        plan_result = predictor.generate_plan(
            available_amount=plan_input.available_amount,
            monthly_expenses=plan_input.monthly_expenses,
            savings_goal=plan_input.savings_goal,
        )

        plan_doc = {
            "user_id":          current_user["_id"],
            "title":            plan_input.title,
            "available_amount": plan_input.available_amount,
            "monthly_expenses": plan_input.monthly_expenses,
            "savings_goal":     plan_input.savings_goal,
            "notes":            plan_input.notes,
            "plan_result":      plan_result,
            "created_at":       datetime.utcnow(),
        }

        result       = await db.plans.insert_one(plan_doc)
        plan_doc["_id"] = result.inserted_id

        return _doc_to_response(plan_doc)

    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc))


@router.get("", response_model=list[PlanResponse])
async def get_plans(
    db=Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    try:
        cursor = db.plans.find({"user_id": current_user["_id"]}).sort("created_at", -1)
        docs   = await cursor.to_list(length=100)
        return [_doc_to_response(d) for d in docs]
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc))


@router.get("/{plan_id}", response_model=PlanResponse)
async def get_plan(
    plan_id: str,
    db=Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    from bson import ObjectId
    try:
        doc = await db.plans.find_one({
            "_id":     ObjectId(plan_id),
            "user_id": current_user["_id"],
        })
        if not doc:
            raise HTTPException(status_code=404, detail="Plan not found")
        return _doc_to_response(doc)
    except HTTPException:
        raise
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc))
