import { faAdd, faHome, faPieChart, faTasks } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './globals.css';
import styles from './layout.module.css';

export const metadata = {
  title: "Task Manager",
};

export default function RootLayout({ children }) {
  // Get the current pathname dynamically
  const currentPath = typeof window !== "undefined" ? window.location.pathname : "";

  // Helper function to determine if a link is active
  const isActive = (path) => currentPath === path;
  console.log(currentPath)
  return (
    <html lang="en">
      <head>
        <script src="https://telegram.org/js/telegram-web-app.js?56"></script>
      </head>
      <body className={styles.body}>
        <main className="flex-grow">{children}</main>
        <footer className={styles.footer}>
          <nav className={styles.nav}>
            <a
              href="/home"
              className={`${styles.link} ${isActive("/home") ? "text-yellow-500" : "text-gray-400"}`}
            >
              <FontAwesomeIcon icon={faHome} size="lg" />
              <span className="text-sm">Home</span>
            </a>
            <a
              href="/new-task"
              className={`${styles.link} ${isActive("/new-task") ? "text-yellow-500" : "text-gray-400"}`}
            >
              <FontAwesomeIcon icon={faAdd} size="lg" />
              <span className="text-sm">Add</span>
            </a>
            <a
              href="/tasks"
              className={`${styles.link} ${isActive("/tasks") ? "text-yellow-500" : "text-gray-400"}`}
            >
              <FontAwesomeIcon icon={faTasks} size="lg" />
              <span className="text-sm">Tasks</span>
            </a>
            <a
              href="/projects"
              className={`${styles.link} ${isActive("/projects") ? "text-yellow-500" : "text-gray-400"}`}
            >
              <FontAwesomeIcon icon={faPieChart} size="lg" />
              <span className="text-sm">Projects</span>
            </a>
          </nav>
        </footer>
      </body>
    </html>
  );
}
