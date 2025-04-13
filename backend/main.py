from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from events import get_events

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/events")
async def fetch_events(
    month: int = Query(..., ge=1, le=12),
    year: int = Query(..., ge=2000, le=2100)
):
    result = get_events(year, month)
    
    if "error" in result:
        raise HTTPException(
            status_code=400 if "Invalid" in result["error"] else 500,
            detail=result["error"]
        )
    return result
