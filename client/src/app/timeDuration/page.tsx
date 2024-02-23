'use client';

import React, { useState } from 'react';

const TimerPage: React.FC = () => {
    const [isTimerRunning, setIsTimerRunning] = useState(false);

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

    return (
        <div>
            <div className="flex flex-col justify-center items-center">
                <h1>Timer page</h1>
                <div className="inline-flex">
                    <button onClick={startTimer} disabled={isTimerRunning} className={`bg-gray-300 ${isTimerRunning ? 'cursor-not-allowed opacity-50' : 'hover:bg-gray-400'} hover:bg-gray-400 text-gray-800 font-bold py-2 px-4`}>
                        Start Timer
                    </button>
                    <button onClick={stopTimer} disabled={!isTimerRunning} className={`bg-gray-300 ${!isTimerRunning ? 'cursor-not-allowed opacity-50' : 'hover:bg-gray-400'} hover:bg-gray-400 text-gray-800 font-bold py-2 px-4`}>
                        Stop Timer
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TimerPage;
