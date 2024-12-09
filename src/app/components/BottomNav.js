"use client";

import { usePathname } from "next/navigation";

export default function BottomNav() {
    const pathname = usePathname();
    const isTasksPage = (pathname === "/new-task" || pathname.includes('/timer'));

    // const tasksPageRef = useRef(null);

    // const handleCreateTask = () => {
    //     if (tasksPageRef.current) {
    //         tasksPageRef.current.handleSubmit();
    //     }
    // };

    return (
        <>
            <nav className="fixed bottom-0 left-0 p-3 w-full bg-transparent backdrop-blur-md shadow-md rounded-tl-3xl rounded-tr-3xl">
                {isTasksPage ? (
                    <div className="flex justify-center">
                        {/* <button
                            className="bg-[#e0f569] text-black font-bold py-3 px-6 rounded-2xl shadow-md"
                        // onClick={handleCreateTask}
                        >
                            Create New Task
                        </button> */}

                    </div>
                ) : (
                    <div className="flex justify-around items-center p-3 rounded-lg">
                        <NavLink href="/" label="Home" />
                        <NavLink href="/new-task" label="New" />
                        <NavLink href="/projects" label="Projects" />
                    </div>
                )}
            </nav>
            {/* {isTasksPage && <TasksPage ref={tasksPageRef} />} */}
        </>
    );
}

function NavLink({ href, label }) {
    return (
        <a href={href} className="text-white hover:text-teal-400 transition duration-300">
            {label}
        </a>
    );
}
