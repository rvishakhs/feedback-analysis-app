
"use client"


import { useState } from "react";
import { FiUpload } from "react-icons/fi";
import React from 'react';

interface UploadVideoProps {
    apiKey?: string;
}

function UploadVideo({apiKey} : UploadVideoProps) {
    // useStates to manage the state of the component
    const [status, setStatus] = useState<"upload a video" | "uploading" | "analyzing">("upload a video");
    const [error, setError] = useState<string | null>(null);

    const handleFileUpload = async (file: File) => {}

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