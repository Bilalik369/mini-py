from fastapi import APIRouter, HTTPException, status, Depends
from datetime import datetime
from typing import Optional

from ..database import get_db  

from ..model.user import UserCreate, UserLogin, UserResponse, TokenResponse

from ..auth.jwt_handler import hash_password, verify_password, create_access_token, decode_token

router = APIRouter(prefix="/api/auth", tags=["Authentication"])



@router.post("/register", response_model=TokenResponse, status_code=status.HTTP_201_CREATED)
async def register(user_data: UserCreate, db=Depends(get_db)):

    existing_email = await db.users.find_one({"email": user_data.email})

    if existing_email:
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )

    existing_username = await db.users.find_one({"username": user_data.username})

    if existing_username:
        raise HTTPException(
            status_code=400,
            detail="Username already taken"
        )

    user_doc = {
        "username": user_data.username,
        "email": user_data.email,
        "password": hash_password(user_data.password),
        "created_at": datetime.utcnow()
    }

    result = await db.users.insert_one(user_doc)
    user_id = str(result.inserted_id)

    token = create_access_token({"sub": user_id, "email": user_data.email})

    return TokenResponse(
        access_token=token,
        user=UserResponse(
            id=user_id,
            username=user_data.username,
            email=user_data.email,
            created_at=user_doc["created_at"]
        )
    )
 
