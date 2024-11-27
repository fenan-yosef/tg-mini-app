'use client'; // Needed to use client-side logic like useEffect

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';

const containerVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 },
};

const data = [
  { name: 'In Progress', value: 6, color: '#e0f569' },
  { name: 'On Pause', value: 2, color: '#4987de' },
  { name: 'Completed', value: 13, color: '#f7ebf7' },
  { name: 'Upcoming', value: 9, color: '#d687d6' },
];


export default function Home() {
  const [username, setUsername] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp;

      // Ensure the WebApp is ready
      tg.ready();

      // Fetch the Telegram user's username
      const user = tg.initDataUnsafe?.user;
      if (user && user.username) {
        setUsername(user.username);
      } else {
        setUsername('Guest');
      }
    }
  }, []);

  return (
    <main style={{ textAlign: 'center', marginTop: '20px' }}>
      <h1>Hello, @{username}!</h1>
      <div className="p-6 space-y-8">
        <div className="bg-gray-800 p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-bold text-white mb-4">My Projects</h2>
          <DonutChart />
        </div>
        <div className="bg-gray-800 p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-bold text-white mb-4">Daily Login</h2>
          <DailyLoginCalendar />
        </div>
      </div>
    </main>
  );
}

function DonutChart() {
  return (
    <div className="flex items-center justify-center">
      {/* Chart Container */}
      <div className="relative" style={{ width: '80%', height: '200px' }}>
        <ResponsiveContainer className={""}>
          <PieChart className=''>
            <Pie
              data={data}
              startAngle={360} // Start from bottom-center
              endAngle={0} // End at top-center (left half removed)
              innerRadius={50}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legends */}
      <div className="ml-4 space-y-2">
        {data.map((entry, index) => (
          <div key={index} className="flex items-center space-x-2">
            <div
              style={{
                width: '16px',
                height: '16px',
                backgroundColor: entry.color,
                borderRadius: '4px',
              }}
            />
            <span className="text-white">{entry.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function DailyLoginCalendar() {
  // Simulated login data (true = logged in, false = not logged in)
  const simulatedLogins = [
    false, false, false, false, false, false, false, // Week 1
    false, false, false, false, false, false, false, // Week 2
    false, false, false, false, false, false, false, // Week 3
    false, false, false, false, false, true, false, // Week 4
    false, false, false, false, false, true, false, // Week 5
  ];

  // Get the current month and year
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth(); // 0-based index (January = 0)
  const today = now.getDate(); // Current day of the month
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  // Generate an array for each day of the month
  const days = Array.from({ length: daysInMonth }, (_, i) => ({
    day: i + 1,
    loggedIn: simulatedLogins[i] || false, // Use simulated login data
  }));

  // Framer Motion variants for animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05, // Stagger animation for each child
      },
    },
  };

  const boxVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
    hover: { scale: 1.1, transition: { duration: 0.2 } }, // Hover effect
  };

  const todayVariants = {
    wiggle: {
      rotate: [0, 10, -10, 10, -10, 0], // Wiggle animation
      transition: { duration: 0.8, repeat: Infinity },
    },
  };

  return (
    <motion.div
      className="grid grid-cols-7 gap-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {days.map(({ day, loggedIn }) => (
        <motion.div
          key={day}
          className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold ${loggedIn ? 'bg-[#4c7aba] text-white' : 'bg-gray-600 text-gray-300'
            } ${day === today ? 'border-2 border-teal-400' : ''}`} // Highlight today
          variants={boxVariants}
          whileHover="hover"
          animate={day === today ? 'wiggle' : ''} // Wiggle today's date
          title={`Day ${day}: ${loggedIn ? 'Logged in' : 'Not logged in'}`}
        >
          {day}
        </motion.div>
      ))}
    </motion.div>
  );
}

function AnimatedComponent({ children }) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
}