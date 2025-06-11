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
                        <span className="text-sm font-light text-gray-500">{averages?.topEmotion?.confidence} ({(averages?.topEmotion?.confidence! * 100).toFixed(0)}%)</span>
                    </div>
                    <div className="flex flex-col items-center p-2">
                        <span className="text-sm font-medium">Primary Sentiment</span>
                        <span className="text-[40px]">{SENTIMENTS_EMOJI_MAP[averages?.topSentiment?.label!]}</span>
                        <span className="text-sm font-light text-gray-500">{averages?.topSentiment?.confidence} ({(averages?.topSentiment?.confidence! * 100).toFixed(0)}%)</span>
                    </div>
                </div> : 
                <div className="flex h-32 w-full items-center justify-center rounded-xl border border-dashed border-gray-200 p-4">
                    <span className="text-sm text-gray-400">Upload a video to see the analysis</span>
                </div>}
        </div>
    )
}