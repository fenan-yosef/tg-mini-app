'use client'; // Needed to use client-side logic like useEffect

import { faBell, faFire, faHourglassHalf, faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
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
      } else {
        setUsername('Guest');
      }
    }
  }, []);

  return (
    <main className='blur-gradient' style={{ textAlign: 'center', marginTop: '-5px', marginBottom: '130px', minHeight: '100vh' }}>
      <div className="header flex justify-between items-center p-4">
        <div className='flex'>
          <img
            src={photoUrl}
            alt="User Avatar"
            className="pl-3 w-12 h-12 rounded-full"
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

      <div className="masonry-container columns-2 gap-4 px-4 ">
        <div className="task-card text-left break-inside bg-white text-black p-4 rounded-lg shadow-md mb-4">
          <span className="tag px-2 pink-bg py-1 rounded-full text-xs font-bold">
            <FontAwesomeIcon icon={faFire} className='mx-1' />
            Urgent
          </span>
          <div className='pb-10 mt-5'>
            <h4 className="font-bold ">Market research for Zulla project</h4>
            <p className="text-sm">28h</p>
          </div>
          <div className='flex justify-between'>
            <div className="avatars flex items-center">
              <img src={photoUrl} className="w-6 h-6 rounded-full" />
              <img src={photoUrl} className="w-6 h-6 rounded-full" />
            </div>
            <button className="play-button text-yellow-300 mt-2">
              <FontAwesomeIcon icon={faPlay} size='lg' />
            </button>
          </div>
        </div>

        <div className="task-card text-left break-inside blue-bg p-4 rounded-lg shadow-md mb-4">
          <span className="tag px-2 yellow-bg py-1 text-black rounded-full text-xs font-bold">
            <FontAwesomeIcon icon={faHourglassHalf} className='mx-1' />
            Urgent
          </span>
          <h4 className="font-bold my-2">Monthly report</h4>
          <p className="text-sm my-2">2h</p>
          <div className='flex justify-between'>
            <div className="avatars flex items-center">
              <img src={photoUrl} className="w-6 h-6 rounded-full" />
              <img src={photoUrl} className="w-6 h-6 rounded-full" />
            </div>
            <button className="play-button text-yellow-300 mt-2">
              <FontAwesomeIcon icon={faPlay} />
            </button>
          </div>
        </div>

        <div className="task-card text-left break-inside blue-bg p-4 rounded-lg shadow-md mb-4">
          <span className="tag px-2 yellow-bg py-1 text-black rounded-full text-xs font-bold">
            <FontAwesomeIcon icon={faHourglassHalf} className='mx-1' />
            Urgent
          </span>
          <h4 className="font-bold my-2">Monthly report</h4>
          <p className="text-sm my-2">2h</p>
          <div className='flex justify-between'>
            <div className="avatars flex items-center">
              <img src={photoUrl} className="w-6 h-6 rounded-full" />
              <img src={photoUrl} className="w-6 h-6 rounded-full" />
            </div>
            <button className="play-button text-yellow-300 mt-2">
              <FontAwesomeIcon icon={faPlay} />
            </button>
          </div>
        </div>

        <div className="task-card liquid-marble-bg text-left break-inside  p-4 rounded-lg shadow-md mb-4">
          <span className="tag px-2 bg-blue-950 py-1 text-white rounded-full text-xs font-bold">
            <FontAwesomeIcon icon={faPause} className='mx-1' />
            On pause
          </span>
          <h4 className="font-bold my-2">Monthly report</h4>
          <p className="text-sm my-2">2h</p>
          <div className='flex justify-between'>
            <div className="avatars flex items-center">
              <img src={photoUrl} className="w-6 h-6 rounded-full" />
              <img src={photoUrl} className="w-6 h-6 rounded-full" />
            </div>
            <button className="play-button text-yellow-300 mt-2">
              <FontAwesomeIcon icon={faPlay} />
            </button>
          </div>
        </div>


      </div>









    </main>
  );
}
