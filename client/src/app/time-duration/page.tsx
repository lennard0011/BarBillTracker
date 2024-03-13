'use client';

import React, { useEffect, useState } from 'react';

const CommutePage: React.FC = () => {
    const [apiKey, setApiKey] = useState<string>("");

    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const [commutes, setCommutes] = useState([]);

    const apiDomain = process.env.NEXT_PUBLIC_BACKEND_URL || "http://146.190.225.155";

    useEffect(() => {
        // Fetch the commutes from the backend
        // You can use fetch or any other library for making HTTP requests
        // Example: fetch('/api/commutes').then(response => response.json()).then(data => setCommutes(data));
    });

    const startTimer = () => {
        // Send request to start the timer to the backend
        // You can use fetch or any other library for making HTTP requests
        // Example: fetch('/api/start-timer');
        setIsTimerRunning(true);
    };

    const stopTimer = () => {
        // Send request to stop the timer to the backend
        // Example: fetch('/api/stop-timer');
        setIsTimerRunning(false);
    };

    function apiKeyField() {
        return <div className="flex justify-center items-center">
            <label htmlFor="apikey">
                <input type="text" value={apiKey} className="bg-neutral-700" id="apikey" onChange={(e) => {
                    setApiKey(e.target.value)
                    localStorage.setItem("apikey", e.target.value);
                }} />
            </label>
            <button onClick={() => setApiKey("")}>Clear</button>
        </div>
    }

    return (
        <div>
            <div className="flex flex-col justify-center items-center">
                <h1>Timer page</h1>
                <div className='inline-flex'>
                    {apiKeyField()}
                </div>
                <div className="inline-flex">
                    <button onClick={startTimer} disabled={isTimerRunning} className={`bg-gray-300 ${isTimerRunning ? 'cursor-not-allowed opacity-50' : 'hover:bg-gray-400'} hover:bg-gray-400 text-gray-800 font-bold py-2 px-4`}>
                        Start Timer
                    </button>
                    <button onClick={stopTimer} disabled={!isTimerRunning} className={`bg-gray-300 ${!isTimerRunning ? 'cursor-not-allowed opacity-50' : 'hover:bg-gray-400'} hover:bg-gray-400 text-gray-800 font-bold py-2 px-4`}>
                        Stop Timer
                    </button>
                </div>
                <div className='inline-flex'>
                    <p>hello</p>
                </div>
            </div>
        </div>
    );
};

export default CommutePage;
