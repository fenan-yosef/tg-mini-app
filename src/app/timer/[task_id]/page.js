'use client';

import {
    faAngleLeft,
    faCalendarDay,
    faClock,
    faFire,
    faHourglass2,
    faPause,
    faPlay,
    faSnowflake,
    faStop
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function TaskDetails() {
    const { task_id } = useParams();
    const router = useRouter();

    const [task, setTask] = useState(null);
    const [timeLeft, setTimeLeft] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [intervalId, setIntervalId] = useState(null);
    const [formattedDate, setFormattedDate] = useState('');

    // Fetch task details
    useEffect(() => {
        if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
            const tg = window.Telegram.WebApp;

            tg.ready();
            const user = tg.initDataUnsafe?.user;

            const fetchAndFilterTask = async (userId) => {
                try {
                    const res = await fetch(`/api/tasks/${userId}`);
                    const tasks = await res.json();
                    const filteredTask = tasks.find((task) => task.task_id === task_id);
                    if (filteredTask) {
                        setTask(filteredTask);
                        setTimeLeft(filteredTask.leftHours * 3600); // Convert hours to seconds
                        setFormattedDate(new Date(filteredTask.dueDate).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                        }));
                    } else {
                        console.error('Task not found');
                    }
                } catch (error) {
                    console.error('Failed to fetch tasks:', error);
                }
            };

            if (user) {
                fetchAndFilterTask(user.id);
            } else {
                fetchAndFilterTask(6627826120);
            }
        }
    }, [task_id]);

    // Timer control functions
    const startTimer = () => {
        if (isRunning) return;
        setIsRunning(true);

        const id = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 0) {
                    clearInterval(id);
                    setIsRunning(false);
                    return 0;
                }
                return prev - 1; // Decrease by 1 second
            });
        }, 1000);

        setIntervalId(id);
    };

    const pauseTimer = () => {
        clearInterval(intervalId);
        setIsRunning(false);
    };

    const stopTimer = async () => {
        pauseTimer();
        await updateTaskTime(timeLeft / 3600); // Convert seconds back to hours
    };

    const resetTimer = async () => {
        pauseTimer();
        setTimeLeft(task?.estimatedHours * 3600 || 0); // Reset to estimated hours
        await updateTaskTime(task?.estimatedHours || 0);
    };

    const updateTaskTime = async (updatedTime) => {
        try {
            await fetch(`/api/task/${task?.user_id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    task_id,
                    updateFields: { leftHours: updatedTime, onPause: !isRunning },
                }),
            });
        } catch (error) {
            console.error('Failed to update task:', error);
        }
    };

    const formatTime = (seconds) => {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = Math.floor(seconds % 60);
        return `${hrs.toString().padStart(2, '0')}:${mins
            .toString()
            .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    if (!task) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <p>Loading task...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-blue-bg text-white">
            <button
                onClick={() => router.back()}
                className="text-yellow-300 text-lg mb-6 flex items-center p-4"
            >
                <FontAwesomeIcon icon={faAngleLeft} className="mr-2 text-black z-20" />
            </button>

            <div className={`${task.priority === 'normal' ? 'blue-bg' : task.priority === 'low' ? 'blue-bg' : 'bg-white'} text-black rounded-bl-3xl rounded-br-3xl px-4 pb-1 pt-14 shadow-md relative -top-20 shadow-lg shadow-zinc-200`}>
                <div className={`${task.priority === 'low' ? 'bg-white' : task.priority === 'normal' ? 'yellow-bg' : 'pink-bg'} 
                rounded-xl text-center text-black flex align-middle justify-center w-fit px-2`}>
                    <FontAwesomeIcon
                        icon={task.priority === 'low' ? faSnowflake : task.priority === 'urgent' ? faFire : faHourglass2}
                        className="mr-1 my-auto"
                    />
                    <p>{task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}</p>
                </div>
                <h1 className="text-2xl font-bold my-4">{task.title}</h1>
                <div className="mb-4">
                    <p className="text-gray-400">
                        <FontAwesomeIcon icon={faCalendarDay} className="mr-2" />
                        <strong>Due Date: </strong>
                        {formattedDate}
                    </p>
                </div>
            </div>

            <div className="p-4 relative -top-6">
                <h4 className="mb-3">Description</h4>
                <p className="mb-4 text-gray-300 text-sm font-extralight">{task.description}</p>
            </div>

            <div className="absolute fixed bottom-20 w-full yellow-bg rounded-xl text-black">
                <div className="text-center p-4 rounded-lg flex align-middle text-gray-600">
                    <FontAwesomeIcon icon={faClock} className="text-center my-auto mr-2" />
                    <p>{task.title}</p>
                </div>
                <div className="flex justify-between p-4 align-middle">
                    <p className="text-3xl my-auto">{formatTime(timeLeft)}</p>
                    <div>
                        <button
                            onClick={startTimer}
                            className="yellow-bg text-black px-4 py-2 rounded-lg font-bold mx-1"
                        >
                            <FontAwesomeIcon icon={faPlay} size="2x" />
                        </button>
                        <button
                            onClick={pauseTimer}
                            className="yellow-bg text-black px-4 py-2 rounded-lg font-bold mx-1"
                        >
                            <FontAwesomeIcon icon={faPause} size="2x" />
                        </button>
                        <button
                            onClick={stopTimer}
                            className="yellow-bg text-black px-4 py-2 rounded-lg font-bold mx-1"
                        >
                            <FontAwesomeIcon icon={faStop} size="2x" />
                        </button>
                        {/* <button
                            onClick={resetTimer}
                            className=" text-blsck px-4 py-2 rounded-lg font-bold mx-1"
                        >
                            <FontAwesomeIcon icon={faRotateRight} size="2x" />
                        </button> */}
                    </div>
                </div>
            </div>
        </div>
    );
}
