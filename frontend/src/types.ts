export type Utterance = {
  speaker: string;
  text: string;
  confidence: number;
  start: number;
  end: number;
};

export type TextOutputProps = {
    text: string;
  };
export type DiarizationOutputProps = {
    utterances: Utterance[]
}; 
export type UploadCardProps ={
    setText: (text: string) => void;
    setUtterances: (utterances: Utterance[]) => void;
}