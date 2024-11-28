"use client";

import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { usePathname } from "next/navigation"; // Hook to get current route
import { useState } from "react";

export default function BottomNav() {
    const pathname = usePathname(); // Get the current route
    const isTasksPage = pathname === "/new-task"; // Check if we're on the Tasks page

    const [isCreating, setIsCreating] = useState(false); // Optional: local state

    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    });

    const formattedTime = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
    });


    return (
        <>
            <nav className="fixed bottom-0 left-0 p-3 w-full bg-transparent backdrop-blur-md shadow-md rounded-tl-3xl rounded-tr-3xl">
                {isTasksPage ? (
                    <div className="flex justify-center">
                        <button
                            className="bg-[#e0f569] text-black font-bold py-3 px-6 rounded-2xl shadow-md"
                            onClick={() => setIsCreating(true)} // Replace with form submission logic
                        >
                            Create New Task
                        </button>
                    </div>
                ) : (
                    <>
                        {/* Fixed Date UI */}
                        <div className="fixed bg-[#01061f] mb-10 bottom-[30px] left-0 w-full ">
                            <div className={`flex justify-center items-start flex-col text-white py-3 px-3 shadow-lg `}>
                                <span className="text-sm font-medium">
                                    {formattedDate}
                                </span>
                                <span className="ml-2 text-yellow-300 text-sm font-bold flex">
                                    <FontAwesomeIcon icon={faPlay} className='w-2 mr-2' />{formattedTime}
                                </span>
                            </div>
                        </div>


                        <div className="flex justify-around items-center p-3 rounded-lg  ">
                            <NavLink href="/" icon='faHome' label="Home" />
                            {/* <NavLink href="/tasks" icon="fa-tasks" label="Tasks" /> */}
                            <NavLink href="/new-task" icon="faUser" label="New" />
                            <NavLink href="/projects" icon="faUser" label="Projects" />
                        </div>
                    </>
                )}
            </nav>
        </>
    );
}

function NavLink({ href, label }) {
    return (
        <a
            href={href}
            className="text-white hover:text-teal-400 transition duration-300"
        >
            {label}
        </a>
    );
}
