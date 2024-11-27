'use client'; // Needed to use client-side logic like useEffect

import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';

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
  const [photoUrl, setPhotoUrl] = useState('');
  const hours = new Date().getHours();
  const greeting = hours < 12 ? 'Good morning' : 'Good evening';


  useEffect(() => {
    if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp;

      tg.ready();

      const user = tg.initDataUnsafe?.user;
      if (user) {
        setUsername(user.first_name || 'Guest');
        setPhotoUrl(user.photo_url || '/placeholder-profile.png'); // Use placeholder if no photo
      } else {
        setUsername('Guest');
      }
    }
  }, []);

  return (
    <main style={{ textAlign: 'center', marginTop: '20px' }}>
      <div className="header flex justify-between items-center p-4">
        <div>
          <h2>{greeting}, {username}!</h2>
        </div>
        <img
          src={photoUrl}
          alt="User Avatar"
          className="w-12 h-12 rounded-full"
        />
        <i className="fas fa-bell text-xl"></i>
      </div>

      <div className="upcoming-meeting bg-blue-900 text-white p-4 rounded-xl shadow-md">
        <h3>Upcoming meeting</h3>
        <div>
          <h4 className="text-lg font-bold">Meeting with developers team</h4>
          <p className="text-sm">Jan 10, 9:30 - 11:30 am</p>
          <div className="avatars flex items-center">
            {/* Replace with dynamic participant avatars */}
            <img src="/avatar1.png" className="w-8 h-8 rounded-full" />
            <img src="/avatar2.png" className="w-8 h-8 rounded-full" />
            <span className="text-sm bg-gray-700 p-1 rounded-full">+5</span>
          </div>
        </div>
      </div>

      <div className="task-card bg-white p-4 rounded-lg shadow-md">
        <span className="tag bg-red-500 text-white px-2 py-1 rounded-full">Urgent</span>
        <h4 className="font-bold">Market research for Zulla project</h4>
        <p className="text-sm">28h</p>
        <div className="avatars flex items-center">
          {/* Replace with dynamic participant avatars */}
          <img src="/avatar1.png" className="w-6 h-6 rounded-full" />
          <img src="/avatar2.png" className="w-6 h-6 rounded-full" />
        </div>
        <button className="play-button text-yellow-300">
          <FontAwesomeIcon icon={faPlay} />
        </button>
      </div>



    </main>
  );
}
