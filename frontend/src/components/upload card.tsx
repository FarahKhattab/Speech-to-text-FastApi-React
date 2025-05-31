import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import audioFilepng from "@/assets/audio-file.png";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import type { UploadCardProps } from "@/types";

export default function UploadCard({
  setText,
  setUtterances,
}: UploadCardProps) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  // Upload file to backend
  const handleUpload = async () => {
    if (!file) {
      alert("Please select an audio file first.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      // Replace with your backend API URL
      const response = await fetch(
        "https://speech-to-text-fastapi-react.onrender.com/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();
      alert("Upload successful!");
      console.log("Response from backend:", data);
      console.log("Transcription text:", data.text);
      setText(data.text);
      setUtterances(data.utterances);
    } catch (error) {
      alert("Upload failed: " + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Card className="max-w-md mx-auto my-8 shadow-lg">
      <CardHeader>
        <img className=" mx-auto w-26" src={audioFilepng} alt="audio file" />

        <CardTitle className=" text-2xl font-bold mx-auto ">
          Upload & Transcribe Audio Files
        </CardTitle>
        <CardDescription className=" text-center">
          supports a wide range of audio formats for transcription and audio
          analysis, including MP3, MP4, WAV, M4A, AAC, OGG, WEBM, FLAC, WMA,
          3GP, AMR, CAF, and AIF/AIFF. <br />
          Audio files should ideally be under 2 GB.
        </CardDescription>
      </CardHeader>
      <CardContent className="mx-auto flex flex-col items-center">
        <Input
          className="m-2"
          id="audio"
          type="file"
          accept="audio/*"
          onChange={handleFileChange}
        />
        <Button
          className=" text-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white"
          variant="outline"
          onClick={handleUpload}
          disabled={loading}
        >
          {loading ? "Uploading..." : "Upload Audio File"}
        </Button>
      </CardContent>
    </Card>
  );
}
