import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Inter } from 'next/font/google';
import './globals.css';
import styles from './layout.module.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Next.js Bottom Navbar',
  description: 'Demo of a bottom navbar in Next.js 14',
};

export default function RootLayout({ children }) {

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
    <html lang="en">
      <head>
        <script src="https://telegram.org/js/telegram-web-app.js?56"></script>
      </head>
      <body className={`${inter.className} ${styles["dark-blue"]} text-white`}>
        <div className="min-h-screen flex flex-col">
          <main className="flex-1">{children}</main>
          {/* Fixed Date UI */}
          <div className="fixed bottom-[60px] left-0 w-full px-3">
            <div className={`flex justify-center items-start flex-col ${styles["dark-blue"]} text-white py-3 rounded-xl shadow-lg`}>
              <span className="text-sm font-medium">
                {formattedDate}
              </span>
              <span className="ml-2 text-yellow-300 text-sm font-bold flex">
                <FontAwesomeIcon icon={faPlay} className='w-2 mr-2' />{formattedTime}
              </span>
            </div>
          </div>
          {/* Bottom Navbar */}
          <nav className="fixed bottom-0 left-0 p-3 w-full bg-gray-800 shadow-md border-t rounded-tl-3xl rounded-tr-3xl border-gray-700">
            <div className="flex justify-around items-center p-3">
              <NavLink href="/" icon='faHome' label="Home" />
              <NavLink href="/tasks" icon="fa-tasks" label="Tasks" />
              <NavLink href="/new-task" icon="faUser" label="New" />
              <NavLink href="/projects" icon="faUser" label="Projects" />
            </div>
          </nav>
        </div>
      </body>
    </html>
  );
}

function NavLink({ href, icon, label }) {
  return (
    <a
      href={href}
      className="flex flex-col items-center text-sm hover:text-teal-400 transition duration-300"
    >
      <i className={`fas ${icon} text-xl mb-1`}></i>
      {label}
    </a>
  );
}
