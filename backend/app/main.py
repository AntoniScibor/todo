from fastapi import FastAPI
from sqlalchemy import text
from . import models
from .database import engine
from .routers import tasks

app = FastAPI() 

models.Base.metadata.create_all(bind=engine)

app.include_router(tasks.router, tags=["tasks"])
