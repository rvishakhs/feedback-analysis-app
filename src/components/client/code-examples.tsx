'use client';

import React, { useState } from "react";

function CodeExamples() {
    const [activeTab, setActiveTab] = useState<'typescript' | 'curl'>('typescript');

    return (
        <div className="mt-2 flex h-fit w-full flex-col rounded-xl bg-gray-100 bg-opacity-80 p-6">
            <span className="text-sm font-medium">API Usage</span>
            <span className="mb-4 text-sm text-gray-500"> Examples of how to use our API keys with Typescript or cURl. </span>
        
            <div className="overflow-hidden rounded-md bg-gray-900 ">
                <div className="flex border-b border-gray-700">
                    <button onClick={() => setActiveTab("typescript")} className={`px-4 py-2 text-xs font-medium ${activeTab === "typescript" ? "bg-gray-800 text-white" : "text-gray-400 hover:text-gray-300 "}`}>Type Script</button>
                    <button onClick={() => setActiveTab("curl")} className={`px-4 py-2 text-xs font-medium ${activeTab === "curl" ? "bg-gray-800 text-white" : "text-gray-400 hover:text-gray-300 "}`}>Curl</button>
                </div>
            </div>
        </div>
    )
}

export default CodeExamples;