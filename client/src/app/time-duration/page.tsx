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
    const [_, setIsLoadingCommutes] = useState<LoadingState>(LoadingState.loading);
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
    }, [apiDomain, apiKey, isTimerRunning]);

    const startTimer = async () => {
        await fetch(`${apiDomain}/commute`, {
            method: "POST",
            headers: { "api-key": apiKey}
            });
        setIsTimerRunning(true);
    };

    const stopTimer = async () => {
        await fetch(`${apiDomain}/commute/close`, {
            method: "PUT",
            headers: { "api-key": apiKey}
        });
        setIsTimerRunning(false);
    };

    const deleteCommute = async (id: string) => {
        await fetch(`${apiDomain}/commute/${id}`, {
            method: "DELETE",
            headers: { "api-key": apiKey
            }
        });
        setCommutes((commutes) => commutes.filter((commute: Commute) => commute.id !== id));
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
        return <table className='border-separate border-spacing-2 border border-slate-500'>
            <thead>
                <tr>
                    <th className="border border-slate-600">Start</th>
                    <th> </th>
                    <th className="border border-slate-600">End</th>
                    <th className="border border-slate-600">Duration</th>                    
                    <th className="border border-slate-600">Delete</th>
                </tr>
            </thead>
            <tbody>
                {commutes.map((commute: Commute) => {
                    return <tr key={commute.id}>
                        <td className="border border-slate-700">{commute.startDateTime?.toLocaleString()}</td>
                        <td>/</td>
                        <td className="border border-slate-700">{commute.endDateTime?.toLocaleString()}</td>
                        <td className="border border-slate-700">{commute.durationInSeconds ? (commute.durationInSeconds / 3600).toFixed(1) : null} m</td>
                        <td className="border border-slate-700"><button onClick={() => deleteCommute(commute.id)}>❌</button></td>
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

