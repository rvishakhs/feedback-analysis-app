'use client';

import React, { useState } from "react"
import { IoCopyOutline } from "react-icons/io5";
import { HiOutlineClipboardCopy } from "react-icons/hi";
import { TiTick } from "react-icons/ti";


function CopyButton({text} : {text: string}) {

    // const [copied, setCopied] = React.useState<boolean>(false);
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500); // Reset copied state after 2 seconds
        } catch (error) {
            console.log("Failed to copy text: ", error);
        }
    }
    return (
        <button className="flex items-center justify-center gap-1 text-sm h-fit w-fit rounded-md border border-gray-200 bg-white px-2 py-1 text-gray-600 hover:bg-gray-50 transition-colors" onClick={handleCopy}>
            {copied ? <TiTick className="w-4 h-4" /> : <IoCopyOutline className="w-4 h-4" />} 
            {copied ? "Copied" : "Copy"}
        </button>
    )
}


export default CopyButton;