from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pathlib import Path

app = FastAPI()

# API routes - the deployment platform provides /update endpoint
# This is just for local testing


@app.get("/update")
async def update():
    return {"message": "Update endpoint called"}

# Serve static files from out directory
# Note: The deployment platform will serve these directly, not FastAPI
# This is only for local testing
static_dir = Path("out")

if static_dir.exists():
    # Serve _next directory separately to ensure proper asset loading
    if (static_dir / "_next").exists():
        app.mount("/_next", StaticFiles(directory=str(static_dir / "_next"), check_dir=False), name="next")

    # Serve all other static files
    app.mount("/", StaticFiles(directory=str(static_dir),
              html=True, check_dir=False), name="static")
