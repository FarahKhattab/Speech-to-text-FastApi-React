import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import handwriting from "@/assets/handwriting.png";
import type { TextOutputProps } from "@/types";
import copy from "@/assets/copy.svg";
import check from "@/assets/check.svg";
import { useState } from "react";

export default function TextOutput({ text }: TextOutputProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      console.log("Copying text:", text);
      await navigator.clipboard.writeText(text);
      setCopied(true);
      console.log("Text copied to clipboard!");
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  return (
    <Card className="w-11/12 max-w-2xl max-h-max mx-auto my-8 shadow-lg">
      <CardHeader>
        <CardTitle className="flex text-xl font-bold mx-auto border-b-2 border-blue-500 pb-2">
          <img
            className=" mx-auto w-8"
            src={handwriting}
            alt="handwriting icon"
          />
          Transcription
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col">
        {text.trim() ? (
          <>
            <div className="flex justify-end w-full mb-2">
              <Button onClick={handleCopy}>
                {!copied ? (
                  <img className=" mx-auto w-4" src={copy} alt="copy" />
                ) : (
                  <img className=" mx-auto w-4" src={check} alt="check" />
                )}
              </Button>
            </div>
            <div className="flex justify-start w-full mb-2">
              <p className="">{text}</p>
            </div>
          </>
        ) : (
          <p className="mx-auto px-6">No transcription to display</p>
        )}
      </CardContent>
    </Card>
  );
}
