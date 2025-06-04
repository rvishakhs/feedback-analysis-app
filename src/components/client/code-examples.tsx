'use client';

import React, { useState } from "react";

function CodeExamples() {
    const [activeTab, setActiveTab] = useState<'typescript' | 'curl'>('typescript');

    const tsCode = `
// 1. Get upload URL
    const {url, key } = await fetch('/api/uploadurl', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer' + yourApiKey,
            },
            body: JSON.stringify({ fileType: 'example.mp4'})
        }).then(res => res.json());
// 2. Upload file
    await fetch(url, {
        method: 'POST',
        headers: {
            'content-type' : 'video/mp4',                
        },
        body: videoFile
    })
// 3. Analyze video
    const analysis = await fetch('/api/feedback-inference', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + yourApiKey,
        },
        body: JSON.stringify({ key })
    }).then(res => res.json());
    `;

    const curlCode = `
# 1. Get upload URL
    response=$(curl -s -X POST http://localhost:3000/api/uploadurl 
    -H "Content-Type: application/json" 
    -H "Authorization: Bearer YOUR_API_KEY" 
    -d '{"fileType":"example.mp4"}')

# Extract URL and key from the response
    upload_url=$(echo $response | jq -r '.url')
    key=$(echo $response | jq -r '.key')

# 2. Upload file
    curl -X POST "$upload_url" 
    -H "Content-Type: video/mp4" 
    --data-binary "@example.mp4"

# 3. Analyze video
    curl -X POST http://localhost:3000/api/feedback-inference 
    -H "Content-Type: application/json" 
    -H "Authorization: Bearer YOUR_API_KEY" 
    -d "{\"key\": \"$key\"}"
    `;

    return (
        <div className="mt-2 flex h-fit w-full flex-col rounded-xl bg-gray-100 bg-opacity-80 p-6">
            <span className="text-sm font-medium">API Usage</span>
            <span className="mb-4 text-sm text-gray-500"> Examples of how to use our API keys with Typescript or cURl. </span>
        
            <div className="overflow-hidden rounded-sm bg-gray-900 ">
                <div className="flex border-b border-gray-700">
                    <button onClick={() => setActiveTab("typescript")} className={`px-4 py-2 text-xs font-medium ${activeTab === "typescript" ? "bg-gray-800 text-white" : "text-gray-400 hover:text-gray-300 "}`}>Type Script</button>
                    <button onClick={() => setActiveTab("curl")} className={`px-4 py-2 text-xs font-medium ${activeTab === "curl" ? "bg-gray-800 text-white" : "text-gray-400 hover:text-gray-300 "}`}>Curl</button>                    
                </div>
                <div className="p-4">
                    <pre className="max-h-[300px] overflow-y-auto scrollbar-hidden text-sm text-gray-200">
                        <code>
                            {activeTab === 'typescript' ? tsCode : curlCode}
                        </code>
                    </pre>
                </div>
            </div>
        </div>
    )
}

export default CodeExamples;