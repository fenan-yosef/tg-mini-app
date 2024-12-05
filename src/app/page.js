'use client'; // Needed to use client-side logic like useEffect

import { faArrowDown, faBell, faFire, faHourglass2, faPlay, faSpinner } from '@fortawesome/free-solid-svg-icons';
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
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const hours = new Date().getHours();
  const greeting = hours < 12 ? 'Good morning' : 'Good evening';


  useEffect(() => {
    if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp;

      tg.ready();

      // fetchTasks(6627826120);

      const user = tg.initDataUnsafe?.user;
      if (user) {
        setUsername(user.first_name || 'Guest');
        setPhotoUrl(user.photo_url || './images/placeholder-profile.jpg'); // Use placeholder if no photo
        fetchTasks(user.id);
      } else {
        setUsername('Guest');
      }
    }
  }, []);

  const fetchTasks = async (user_id) => {
    try {
      console.log('here')
      const response = await fetch(`/api/task/${user_id}`);
      if (response.ok) {
        const data = await response.json();
        setTasks(data);
      } else {
        console.error("Failed to fetch tasks");
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  const capitalizeFirstLetter = (str) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <main className='blur-gradient' style={{ textAlign: 'center', marginTop: '-5px', marginBottom: '130px', minHeight: '100vh' }}>
      <div className="header flex justify-between items-center p-4">
        <div className='flex'>
          <img
            src={photoUrl}
            alt="User Avatar"
            className="pl-3 w-10 h-10 rounded-md mx-1 mr-3"
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
      <div className="backdrop-blur-sm upcoming-meeting bg-transparent yellow-border border-2 text-white p-4 rounded-xl shadow-md mx-4 mt-2 mb-3 ">
        <div>
          <h4 className="text-2xl mb-14 text-left yellow-text">Meeting with developers team</h4>
        </div>
        <div className='flex justify-between'>
          <p className="text-sm">Jan 10, 9:30 - 11:30 am</p>
          <div className="avatars flex items-center">
            {/* Replace with dynamic participant avatars */}
            <img src={photoUrl} className="w-8 h-8 rounded-full" />
            <img src={photoUrl} className="w-8 h-8 rounded-full" />
            <span className="text-sm bg-gray-700 p-1 rounded-full">+5</span>
          </div>
        </div>
      </div>

      <div>
        <h3 className='pt-4 text-lg font-bold text-left ml-4'>Be Productive Today</h3>
        <p className='pb-4 text-sm font-thin text-left ml-4'>Tasks to be done </p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center mt-10  min-h-52">
          <FontAwesomeIcon icon={faSpinner} spin size="2x" />
        </div>
      ) : (
        <div className="masonry-container columns-2 gap-4 px-4  break-inside-avoid  ">


          {/* low cards */}
          {tasks.length > 0 ? (tasks.map((task) => (
            <div
              key={task._id}
              className={`task-card ${task.priority === "low" ? "blue-bg" : task.priority === "urgent" ? "bg-white text-black text-lg" : "blue-bg"
                } text-left break-inside-avoid p-4 rounded-lg shadow-md mb-4`}
            >
              <span
                className={`tag px-2 py-1 rounded-full text-xs font-bold ${task.priority === "low" ? "text-black bg-white" : task.priority === "urgent" ? "pink-bg text-black" : "text-black yellow-bg "}`}
              >
                {task.priority === "low" ? (
                  <FontAwesomeIcon icon={faArrowDown} className='mx-1' />
                ) : task.priority === "urgent" ? (
                  <FontAwesomeIcon icon={faFire} className='mx-1' />
                ) : (<FontAwesomeIcon icon={faHourglass2} className='mx-1' />)}
                {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
              </span>
              <h4 className="font-bold my-2">{capitalizeFirstLetter(task.title)}</h4>
              <p className="text-sm my-2">{capitalizeFirstLetter(task.description)}</p>
              <div className='flex justify-between pt-7 pb-2'>
                <p className="text-sm my-2">{task.leftHours}hr</p>
                <button className="play-button text-yellow-300 mt-2">
                  <FontAwesomeIcon icon={faPlay} />
                </button>
              </div>
              <p className="text-xs text-gray-300">Due: {new Date(task.dueDate).toLocaleDateString()}</p>
            </div>
          ))) : (
            <div className="text-center mt-10">
              <p className="text-gray-500">You have no tasks yet. Start by adding a new task to stay productive!</p>
            </div>
          )}
        </div>
      )
      }


    </main>
  );
}
