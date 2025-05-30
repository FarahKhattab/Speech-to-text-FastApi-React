import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import speak from "@/assets/speak.png";
import type { DiarizationOutputProps } from "@/types";
import { Button } from "./ui/button";
import copy from "@/assets/copy.svg";
import check from "@/assets/check.svg";
import { useState } from "react";
export default function DiarizationOutput({
  utterances,
}: DiarizationOutputProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      const formattedText = utterances
        .map(
          (utt) =>
            `${utt.speaker} [${utt.start / 1000} - ${utt.end / 1000}]\n${
              utt.text
            }\n`
        )
        .join("\n");
      console.log("Copying text");
      await navigator.clipboard.writeText(formattedText);
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
          <img className=" mx-auto w-8" src={speak} alt="speak icon" />
          Diarization
        </CardTitle>
      </CardHeader>
      <CardContent className="mx-auto px-6">
        <div className="space-y-4">
          {utterances && utterances.length > 0 ? (
            <div className="w-full">
              <div className="flex justify-end w-full mb-2">
                <Button onClick={handleCopy}>
                  {!copied ? (
                    <img className=" mx-auto w-4" src={copy} alt="copy" />
                  ) : (
                    <img className=" mx-auto w-4" src={check} alt="check" />
                  )}
                </Button>
              </div>

              {utterances.map((utt, idx) => (
                <div
                  key={idx}
                  className="p-4 border border-gray-300 rounded-xl bg-white shadow-sm mb-2"
                >
                  <p className="text-sm text-gray-500 mb-1">
                    <span className="font-medium text-blue-600">
                      {utt.speaker}
                    </span>{" "}
                    <span className="italic">
                      [{utt.start / 1000} - {utt.end / 1000}] seconds
                    </span>
                  </p>
                  <p className="text-gray-800 leading-relaxed">{utt.text}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>No diarization to display</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
