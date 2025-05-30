import { useState } from "react";
import TextOutput from "./text output";
import DiarizationOutput from "./diarization output";
import UploadCard from "./upload card";
import type { Utterance } from "@/types";
export default function Body() {
  const [text, setText] = useState<string>("");
  const [utterances, setUtterances] = useState<Utterance[]>([]);

  return (
    <>
      <UploadCard setText={setText} setUtterances={setUtterances} />;
      <div className="flex ">
        <TextOutput text={text} />
        <DiarizationOutput utterances={utterances} />
      </div>
    </>
  );
}
