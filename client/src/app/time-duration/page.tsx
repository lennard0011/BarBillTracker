'use client';

import React, { useEffect, useState } from 'react';

enum LoadingState {
    loading = "LOADING",
    failed = "FAILED",
    success = "SUCCESS",
}

type getCommuteDto = {
    id: string;
    startDateTime: Date | null;
    endDateTime: Date | null;
    durationInSeconds: number;
}

type Commute = {
    id: string,
    startDateTime: Date | null,
    endDateTime: Date | null,
    durationInSeconds: number | null,
}

const CommutePage: React.FC = () => {
    const [apiKey, setApiKey] = useState<string>("");
    const [loadingCommutesState, setIsLoadingCommutes] = useState<LoadingState>(LoadingState.loading);
    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const [commutes, setCommutes] = useState([]);

    const apiDomain = process.env.NEXT_PUBLIC_BACKEND_URL || "http://146.190.225.155";

    useEffect(() => {
        let timeoutId: string | number | NodeJS.Timeout | undefined;

        const fetchCommutes = async () => {
            const usersDataResponse = await fetch(`${apiDomain}/commute`, {
                method: "GET",
                headers: { "api-key": apiKey }
            })
            const commutesExteral = await usersDataResponse.json()
            const commutesDataFormatted = commutesExteral.map((userData: getCommuteDto) => {
                const formattedCommute: Commute = {
                    id: userData.id,
                    startDateTime: userData.startDateTime,
                    endDateTime: userData.endDateTime,
                    durationInSeconds: userData.durationInSeconds,
                };
                return formattedCommute;
            })

            setCommutes(commutesDataFormatted);
            setIsLoadingCommutes(LoadingState.success);
        }

        const localApiKey = localStorage.getItem("apikey");
        if (localApiKey && apiKey === "") {
            setApiKey(localApiKey);
        }

        // Delay API fetch by 0.5 seconds
        setIsLoadingCommutes(LoadingState.loading);

        if (apiKey) {
            timeoutId = setTimeout(() => {                
                fetchCommutes().catch(() => {
                    console.error("Failed to fetch users data");
                    setIsLoadingCommutes(LoadingState.failed);
                });
            }, 500);
        }

        return () => {
            clearTimeout(timeoutId);
        };
    }, [apiDomain, apiKey]);

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

    function ApiKeyField() {
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

    function CommuteTable() {
        return <table>
            <thead>
                <tr>
                    <th>Start</th>
                    <th> </th>
                    <th>End</th>
                    <th> </th>
                    <th>Duration</th>
                </tr>
            </thead>
            <tbody>
                {commutes.map((commute: Commute) => {
                    return <tr key={commute.id}>
                        <td>{commute.startDateTime?.toLocaleString()}</td>
                        <td>/</td>
                        <td>{commute.endDateTime?.toLocaleString()}</td>
                        <td>/</td>
                        <td>{commute.durationInSeconds ? commute.durationInSeconds / 60 : null}</td>
                    </tr>
                })}
            </tbody>
        </table>
    }

    return (
        <div>
            <div className="flex flex-col justify-center items-center">
                <h1>Timer page</h1>
                <div className='inline-flex'>
                    {ApiKeyField()}
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
                    {CommuteTable()}
                </div>
            </div>
        </div>
    );
};

export default CommutePage;
