'use client'; // Enable client-side rendering

import { faAdd, faHome, faPieChart, faTasks } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { usePathname } from "next/navigation";
import styles from "./footer.module.css";

export default function Footer() {
    const pathname = usePathname(); // Get the current active path

    const navItems = [
        { path: "/home", icon: faHome, label: "Home" },
        { path: "/new-task", icon: faAdd, label: "Add" },
        { path: "/tasks", icon: faTasks, label: "Tasks" },
        { path: "/projects", icon: faPieChart, label: "Projects" },
    ];

    return (
        <footer className={styles.footer}>
            <nav className={styles.nav}>
                {navItems.map((item) => (
                    <a
                        key={item.path}
                        href={item.path}
                        className={`${styles.link} ${pathname === item.path ? styles.active : ""}`}
                    >
                        <FontAwesomeIcon icon={item.icon} size="lg" />
                        <span>{item.label}</span>
                    </a>
                ))}
            </nav>
        </footer>
    );
}
