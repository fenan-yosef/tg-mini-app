import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Next.js Bottom Navbar',
  description: 'Demo of a bottom navbar in Next.js 14',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script src="https://telegram.org/js/telegram-web-app.js?56"></script>
      </head>
      <body className={`${inter.className} bg-gray-900 text-white`}>
        <div className="min-h-screen flex flex-col">
          <main className="flex-1">{children}</main>
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
      {/* <FontAwesomeIcon icon={icon} size="sm" /> */}
      {label}
    </a>
  );
}
