from database import Base
from sqlalchemy import Column, Integer, String, JSON, TIMESTAMP, Boolean, text


 
class Transcription(Base):
    __tablename__ = "transcriptions"

    id = Column(String,primary_key=True,nullable=False)
    file_name = Column(String, nullable=False)  # Name of the uploaded audio file
    text = Column(String,nullable=False)
    utterances = Column(JSON, nullable=True)  # JSON string of utterances
    language = Column(String, nullable=True)  # Detected language
