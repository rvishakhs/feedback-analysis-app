'use client'

import UploadVideo from "./Uploadvideo";

interface InfererenceProps {
    quota: {
        secretkey: string;
    };
}


export function Inference({quota} : InfererenceProps) {
    return (
        <div className="flex h-fit w-full flex-col gap-3 md:w-1/2">
            <h2 className="ttext-2xl font-semibold text-gray-800">Inference </h2>
            <UploadVideo />
        </div>
    )
}