from fastapi import FastAPI
from app.api.v1.endpoints.companies import router as companies_router

app = FastAPI(
    title="Bonjil Backend MVP",
    version="0.1.0",
)

app.include_router(companies_router, prefix="/api/v1")


@app.get("/")
def root():
    return {"message": "Bonjil backend is running"}
