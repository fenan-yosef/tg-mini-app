"use client";

import { usePathname } from "next/navigation"; // Hook to get current route
import { useState } from "react";

export default function BottomNav() {
    const pathname = usePathname(); // Get the current route
    const isTasksPage = pathname === "/new-task"; // Check if we're on the Tasks page

    const [isCreating, setIsCreating] = useState(false); // Optional: local state

    return (
        <nav className="fixed bottom-0 left-0 p-3 w-full bg-transparent backdrop-blur-md shadow-md">
            {isTasksPage ? (
                <div className="flex justify-center">
                    <button
                        className="bg-yellow-500 text-black font-bold py-3 px-6 rounded-2xl shadow-md"
                        onClick={() => setIsCreating(true)} // Replace with form submission logic
                    >
                        Create New Task
                    </button>
                </div>
            ) : (
                <div className="flex justify-around items-center p-3">
                    <NavLink href="/" icon='faHome' label="Home" />
                    <NavLink href="/tasks" icon="fa-tasks" label="Tasks" />
                    <NavLink href="/new-task" icon="faUser" label="New" />
                    <NavLink href="/projects" icon="faUser" label="Projects" />
                </div>
            )}
        </nav>
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
