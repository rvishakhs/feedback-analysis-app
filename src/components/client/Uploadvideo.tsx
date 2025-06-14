
"use client"


import { useState } from "react";
import { FiUpload } from "react-icons/fi";
import React from 'react';

interface UploadVideoProps {
    apiKey?: string;
    onAnalysisComplete?: (analysis: any) => void;
}

function UploadVideo({apiKey, onAnalysisComplete} : UploadVideoProps) {
    // useStates to manage the state of the component
    const [status, setStatus] = useState<"upload a video" | "uploading" | "analyzing">("upload a video");
    const [error, setError] = useState<string | null>(null);

    const handleFileUpload = async (file: File) => {
        try {
            setStatus("uploading");
            setError(null);

            // Get the file type 
            const fileType = `.${file.name.split('.').pop()}`; 
            // 1. Get upload URL
            const res = await fetch('/api/uploadurl', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer' + apiKey,
                    },
                    body: JSON.stringify({ fileType: fileType})
                });

            if(!res.ok) {
                const error = await res.json();
                throw new Error(error?.message || "Failed to get upload URL");

            }

            const { url, fileId, key } = await res.json();

        // 2. Upload file
            const uploadres = await fetch(url, {
                method: 'PUT',
                headers: {
                    'content-type' : file.type,                
                },
                body: file
            })

            if (!uploadres.ok) {
                const error = await uploadres.json();
                throw new Error(error?.message || "Failed to upload file");
            }

            setStatus("analyzing");
        // 3. Analyze video
            const analysisres = await fetch('/api/feedback-inference', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + apiKey,
                },
                body: JSON.stringify({ key })
            });

            if (!analysisres.ok) {
                throw new Error("Failed to analyze video");
            }
            
            const analysis = await analysisres.json();
            onAnalysisComplete?.(analysis);
        } catch (err) {
            console.error("Error uploading or analyzing video:", err);
            setError(err instanceof Error ? err.message : "An unexpected error occurred while uploading ");
        }
    }

  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-gray-300 p-10">
        <input
          type="file"
          accept="video/mp4,video/mov,video/avi"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFileUpload(file);
          }}
          id="video-upload"
        />
        <label
          htmlFor="video-upload"
          className="flex cursor-pointer flex-col items-center"
        >
          <FiUpload className="min-h-8 min-w-8 text-gray-400" />
          <h3 className="text-md mt-2 from-indigo-50 text-slate-800">
            {status === "uploading"
              ? "Uploading..."
              : status === "analyzing"
                ? "Analysing..."
                : "Upload a video"}
          </h3>
          <p className="text-center text-xs text-gray-500">
            Get started with sentiment detection by uploading a video.
          </p>
        </label>
      </div>
      {error && <div className="text-sm text-red-500">{error}</div>}
    </div>
  );
}


export default UploadVideo;