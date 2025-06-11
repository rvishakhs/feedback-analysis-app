'use client'

import { useState } from "react";
import UploadVideo from "./Uploadvideo";

interface InfererenceProps {
    quota: {
        secretkey: string;
    };
}

export type Analysis = {
    utterances: {
        start_time: number;
        end_time: number;
        text: string;
        emotions: Array<{label: string; confidence: number}>;
        sentiments: Array<{label: string; confidence: number}>;
    };
};

export function Inference({quota} : InfererenceProps) {

    const [analysis, setAnalysis] = useState<Analysis | null>(null);

    return (
        <div className="flex h-fit w-full flex-col gap-3 md:w-1/2">
            <h2 className="ttext-2xl font-semibold text-gray-800">Inference </h2>
            <UploadVideo onAnalysisComplete={setAnalysis} apiKey={quota.secretkey}/>
        </div>
    )
}