'use client'; // Needed to use client-side logic like useEffect

import { faBell, faPlay } from '@fortawesome/free-solid-svg-icons';
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
        setPhotoUrl(user.photo_url || './images/placeholder-profile.jpg'); // Use placeholder if no photo
        console.log(photoUrl)
      } else {
        setUsername('Guest');
      }
    }
  }, []);

  return (
    <main className='blur-gradient' style={{ textAlign: 'center', marginTop: '-5px', minHeight: '100vh' }}>
      <div className="header flex justify-between items-center p-4">
        <div className='flex'>
          <img
            src={photoUrl}
            alt="User Avatar"
            className="w-12 h-12 rounded-full"
          />
          <div>
            <h4 className='text-sm font-thin'>{greeting},</h4>
            <h2> {username}!</h2>
          </div>
        </div>
        <FontAwesomeIcon icon={faBell} className='w-9' />
      </div>

      <div>
        <h3>Upcoming meeting</h3>
      </div>
      <div className="upcoming-meeting bg-transparent yellow-border border-2 text-white p-4 rounded-xl shadow-md mx-4 mt-2 mb-3 ">
        <div>
          <h4 className="text-2xl mb-14 text-left yellow-text">Meeting with developers team</h4>
        </div>
        <div className='flex justify-between'>
          <p className="text-sm">Jan 10, 9:30 - 11:30 am</p>
          <div className="avatars flex items-center">
            {/* Replace with dynamic participant avatars */}
            <img src="./images/placeholder-profile.jpg" className="w-8 h-8 rounded-full" />
            <img src="./images/placeholder-profile.jpg" className="w-8 h-8 rounded-full" />
            <span className="text-sm bg-gray-700 p-1 rounded-full">+5</span>
          </div>
        </div>
      </div>

      <div className="task-card bg-gray-400 p-4 rounded-lg shadow-md mx-4 mt-2 mb-3">
        <span className="tag bg-red-500 text-white px-2 py-1 rounded-full">Urgent</span>
        <h4 className="font-bold">Market research for Zulla project</h4>
        <p className="text-sm">28h</p>
        <div className="avatars flex items-center">
          {/* Replace with dynamic participant avatars */}
          <img src="./images/placeholder-profile.jpg" className="w-6 h-6 rounded-full" />
          <img src="./images/placeholder-profile.jpg" className="w-6 h-6 rounded-full" />
        </div>
        <button className="play-button text-yellow-300">
          <FontAwesomeIcon icon={faPlay} />
        </button>
      </div>



    </main>
  );
}
