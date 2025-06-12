'use client'

import { useState } from "react";
import UploadVideo from "./Uploadvideo";

// Create an emoji record to map emotions to emojis
const EMOTIONS_EMOJI_MAP : Record<string, string> = {
    "happy": "😊",
    "disgust": "🤢",
    "fear": "😨",
    "joy": "😁",
    "neutral": "😐",
    "sadness": "😢",
    "surprise": "😮",
}

const SENTIMENTS_EMOJI_MAP : Record<string, string> = {
    "positive": "😁👍",
    "negative": "👎😠",
    "neutral": "😐",
}

interface InfererenceProps {
    quota: {
        secretkey: string;
    };
}

export type Analysis = {
  analysis: {
    utterances: Array<{
      start_time: number;
      end_time: number;
      text: string;
      emotions: Array<{ label: string; confidence: number }>;
      sentiments: Array<{ label: string; confidence: number }>;
    }>;
  };
};

export function Inference({quota} : InfererenceProps) {

    const [analysis, setAnalysis] = useState<Analysis | null>(null);

    const getAverageScores = () => {
        if (!analysis?.analysis.utterances.length) return null;

        // Aggregate all the scores
        const emotionScores: Record<string, number[]> = {};
        const sentimentScores: Record<string, number[]> = {};

        analysis.analysis.utterances.forEach((utterance) => {
        utterance.emotions.forEach((emotion) => {
            if (!emotionScores[emotion.label]) emotionScores[emotion.label] = [];
            emotionScores[emotion.label]!.push(emotion.confidence);
        });
        utterance.sentiments.forEach((sentiment) => {
            if (!sentimentScores[sentiment.label])
            sentimentScores[sentiment.label] = [];
            sentimentScores[sentiment.label]!.push(sentiment.confidence);
        });
        });

        // Calculate the average
        const avgEmotions = Object.entries(emotionScores).map(
        ([label, scores]) => ({
            label,
            confidence: scores.reduce((a, b) => a + b, 0) / scores.length,
        }),
        );

        const avgSentiments = Object.entries(sentimentScores).map(
        ([label, scores]) => ({
            label,
            confidence: scores.reduce((a, b) => a + b, 0) / scores.length,
        }),
        );

        // Sort by confidence, get the top score
        const topEmotion = avgEmotions.sort(
        (a, b) => b.confidence - a.confidence,
        )[0];
        const topSentiment = avgSentiments.sort(
        (a, b) => b.confidence - a.confidence,
        )[0];

        return { topEmotion, topSentiment };
    };

  const averages = getAverageScores();

    return (
        <div className="flex h-fit w-full flex-col gap-3 md:w-1/2">
            <h2 className="ttext-2xl font-semibold text-gray-800">Inference </h2>
            <UploadVideo onAnalysisComplete={setAnalysis} apiKey={quota.secretkey}/>

            <h2 className="mt-2 text-sm font-medium text-slate-800">Overall Analysis</h2>
            {averages ? 
                <div className="flex w-full h-fit flex-wrap items-center justify-center gap-4 rounded-xl border border-gray-200 sm:gp-8 px-6">
                    <div className="flex flex-col items-center p-2">
                        <span className="text-sm font-medium">Primary emotion</span>
                        <span className="text-[40px]">{EMOTIONS_EMOJI_MAP[averages?.topEmotion?.label!]}</span>
                        <span className="text-sm font-light text-gray-500">{averages?.topEmotion?.confidence.toFixed(3)} ({(averages?.topEmotion?.confidence! * 100).toFixed(0)}%)</span>
                    </div>
                    <div className="flex flex-col items-center p-2">
                        <span className="text-sm font-medium">Primary Sentiment</span>
                        <span className="text-[40px]">{SENTIMENTS_EMOJI_MAP[averages?.topSentiment?.label!]}</span>
                        <span className="text-sm font-light text-gray-500">{averages?.topSentiment?.confidence.toFixed(3)} ({(averages?.topSentiment?.confidence! * 100).toFixed(0)}%)</span>
                    </div>
                </div> : 
                <div className="flex h-32 w-full items-center justify-center rounded-xl border border-dashed border-gray-200 p-4">
                    <span className="text-sm text-gray-400">Upload a video to see the analysis</span>
                </div>}
            <h2 className="mt-2 text-sm font-medium text-slate-800">Detailed Analaysis</h2>
            {analysis ? 
                <div className="flex flex-col gap-2">
                    {analysis?.analysis.utterances.map((utterence, index) => {
                        return  <div key={utterence.start_time.toString() + utterence.end_time.toString()} className="flex h-fit w-full flex-wrap justify-between gap-8 rounded-xl border border-dashed border-gray-200 px-6 py-4 sm:gap-4">
                            {/* Time and Text */}
                            <div className="flex w-full max-w-24 flex-col gap-1 justify-center">
                                <div className="text-sm font-semibold">
                                    {utterence.start_time.toFixed(2)} - {" "} {utterence.end_time.toFixed(2)}
                                </div>
                                <div className="mt-1 text-xs text-gray-500">
                                    {utterence.text}
                                </div>
                             </div>
                            {/* Emotions */}
                            <div className="w-full flex flex-col gap-2">
                                <span className="text-sm font-medium">Emotions</span>
                                {utterence.emotions.map((emo, emoIdx) => {
                                    return (
                                        <div key={emo.label} className="flex items-center gap-2">
                                            <span className="w-16 text-xs text-gray-500">
                                                {EMOTIONS_EMOJI_MAP[emo.label]} {emo.label}
                                            </span>
                                            <div className="flex-1">
                                                <div className="h-1 w-full rounded-full bg-gray-100">
                                                    <div style={{ width: `${emo.confidence * 100}%` }} className="h-1 rounded-full bg-gray-800 transition-all duration-300 ease-in-out">
                                                    </div>
                                                    <span>
                                                        {(emo.confidence * 100).toFixed(0)}%
                                                    </span>
                                                    </div>
                                                </div>
                                            </div>
                                    );
                                    
                                })}
                            </div>
                            {/* Sentimental */}
                            <div className="w-full flex flex-col gap-2">
                                <span className="text-sm font-medium">Sentimental Analysis</span>
                                {utterence.sentiments.map((sentiments, Id) => {
                                    return (
                                        <div key={sentiments.label} className="flex items-center gap-2">
                                            <span className="w-16 text-xs text-gray-500">
                                                {EMOTIONS_EMOJI_MAP[sentiments.label]} {sentiments.label}
                                            </span>
                                            <div className="flex-1">
                                                <div className="h-1 w-full rounded-full bg-gray-100">
                                                    <div style={{ width: `${sentiments.confidence * 100}%` }} className="h-1 rounded-full bg-gray-800 transition-all duration-300 ease-in-out">
                                                    </div>
                                                    <span>
                                                        {(sentiments.confidence * 100).toFixed(0)}%
                                                    </span>
                                                    </div>
                                                </div>
                                            </div>
                                    );
                                    
                                })}
                            </div>
                            </div> 
                    })}

                </div>
                : 
                <div className="flex h-32 w-full items-center justify-center rounded-xl border border-dashed border-gray-200 p-4">
                    <span className="text-sm text-gray-400">Upload a video to see the detailed  analysis</span>
                </div>}  

        </div>
    )
}