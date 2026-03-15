from motor.motor_asyncio import AsyncIOMotorClient
from backend.config import get_settings


settings = get_settings()

client :AsyncIOMotorClient = None 
db = None 

async def connect_db() :
    global client , db 
    client =AsyncIOMotorClient(settings.MONGO_URI)
    db = client[settings.DB_NAME]
    await client.admin.command("ping")
    print(f"Connected to MongoDB: {settings.DB_NAME}")

async def close_db():
    global client
    if client:
        client.close()
        print("MongoDB connection closed")


def get_db():
    return db