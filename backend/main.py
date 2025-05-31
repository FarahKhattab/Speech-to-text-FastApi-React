from fastapi import FastAPI, Depends,UploadFile, File, HTTPException 
from fastapi.responses import JSONResponse
from uuid import UUID
import models
from database import engine, SessionLocal
from sqlalchemy.orm import Session
import requests
import os
import time
from fastapi.middleware.cors import CORSMiddleware
import shutil
from dotenv import load_dotenv

load_dotenv()
app=FastAPI()

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


API_KEY = os.getenv("ASSEMBLYAI_API_KEY")
UPLOAD_ENDPOINT = "https://api.assemblyai.com/v2/upload"
TRANSCRIPT_ENDPOINT = "https://api.assemblyai.com/v2/transcript"

HEADERS = {
    "authorization": API_KEY,
}

@app.get("/")
async def hello():
    return "Hello World"


models.Base.metadata.create_all(bind=engine)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Upload audio file to AssemblyAI
def upload_audio_to_assemblyai(file: UploadFile):
    temp_path = "temp_audio_file"

    with open(temp_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    with open(temp_path, "rb") as f:
        response = requests.post(UPLOAD_ENDPOINT, headers={"authorization": API_KEY}, data=f)

    with open("temp_audio_file", "rb") as f:
        response = requests.post(UPLOAD_ENDPOINT, headers={"authorization": API_KEY}, data=f)

    os.remove("temp_audio_file")

    if response.status_code != 200:
        raise Exception("Failed to upload audio to AssemblyAI")

    return response.json()["upload_url"]

# Request transcription with diarization
def request_transcription(audio_url: str):
    payload = {
        "audio_url": audio_url,
        "speaker_labels": True,
        "language_detection": True 
    }
    response = requests.post(TRANSCRIPT_ENDPOINT, headers=HEADERS, json=payload)
    return response.json()["id"]

# Poll transcription result
def poll_transcription(transcript_id: str,timeout: int = 300):
    status_url = f"{TRANSCRIPT_ENDPOINT}/{transcript_id}"
    start_time = time.time()
    
    while True:
        response = requests.get(status_url, headers=HEADERS)
        result = response.json()

        if result["status"] == "completed":
            return result
        elif result["status"] == "error":
            raise Exception("Transcription failed:", result["error"])

        if time.time() - start_time > timeout:
            raise Exception("Polling timed out after 5 minutes")

        time.sleep(5) 

@app.post("/upload")
async def transcribe_audio(file: UploadFile = File(...), db: Session = Depends(get_db)):
    print("Received file:", file.filename)
    try:
        audio_url = upload_audio_to_assemblyai(file)
        transcript_id = request_transcription(audio_url)
        result = poll_transcription(transcript_id)

        text = result.get("text")
        utterances = result.get("utterances")  
        language_code = result.get("language_code")
        
        for utterance in utterances:
            utterance.pop("words", None)
    
        # Save to database
        db_input = models.Transcription(
            id = transcript_id,
            file_name=file.filename,
            text=text,
            utterances=utterances, 
            language=language_code)
        
        db.add(db_input)
        db.commit()
        db.refresh(db_input)

        return JSONResponse(content={
            "text": text,
            "utterances": utterances,
            "language_code": language_code
        })

    except Exception as e:
        print("Error during transcription:", str(e))

        raise HTTPException(status_code=500, detail=f"Transcription failed: {str(e)}")

