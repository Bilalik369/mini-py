from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from backend.database import connect_db, close_db
from backend.routes.auth import router as auth_router
from backend.routes.plans import router as plans_router
from backend.routes.plans import router as plans_router  

@asynccontextmanager
async def lifespan(app: FastAPI):
    await connect_db()
    yield
    await close_db()

app = FastAPI(
    title="Finance Planner AI",
    description="Smart financial planning with AI-powered recommendations",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(plans_router)
app.include_router(plans_router)  