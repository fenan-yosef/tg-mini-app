'use client'; // Required for client-side logic

import { faArrowDown, faBell, faFire, faHourglass2, faPlay, faSpinner } from '@fortawesome/free-solid-svg-icons';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useMemo, useState } from 'react';

// Dynamic import for FontAwesomeIcon
const FontAwesomeIcon = dynamic(() => import('@fortawesome/react-fontawesome').then(mod => mod.FontAwesomeIcon), { ssr: false });

// Memoized greeting logic
const getGreeting = () => {
  const hours = new Date().getHours();
  return hours < 12 ? 'Good morning' : 'Good evening';
};

const Home = () => {
  const router = useRouter();

  const handleTaskClick = (taskId) => {
    router.push(`/timer/${taskId}`); // Navigate to the task details page
  };

  const [username, setUsername] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const greeting = useMemo(getGreeting, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp;

      tg.ready();
      const user = tg.initDataUnsafe?.user;
      if (user) {
        setUsername(user.first_name || 'Guest');
        setPhotoUrl(user.photo_url || '/images/placeholder-profile.jpg'); // Use placeholder if no photo
        fetchTasks(user.id);
      } else {
        setUsername('Guest');
        fetchTasks(6627826120); // Fallback ID
      }
    }
  }, []);

  const fetchTasks = async (user_id) => {
    try {
      const response = await fetch(`/api/tasks/${user_id}`);
      if (response.ok) {
        const data = await response.json();
        setTasks(data);
      } else {
        console.error('Failed to fetch tasks');
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const capitalizeFirstLetter = React.useCallback((str) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  }, []);

  const renderedTasks = useMemo(
    () =>
      tasks.length > 0 ? (
        tasks.map((task) => (
          <div
            key={task._id}
            className={`task-card ${task.priority === 'low'
              ? 'blue-bg'
              : task.priority === 'urgent'
                ? 'bg-white text-black text-lg'
                : 'blue-bg'
              } text-left break-inside-avoid p-4 rounded-lg shadow-md mb-4`}
          >
            <span
              className={`tag px-2 py-1 rounded-full text-xs font-bold ${task.priority === 'low'
                ? 'text-black bg-white'
                : task.priority === 'urgent'
                  ? 'pink-bg text-black'
                  : 'text-black yellow-bg '
                }`}
            >
              {task.priority === 'low' ? (
                <FontAwesomeIcon icon={faArrowDown} className="mx-1" />
              ) : task.priority === 'urgent' ? (
                <FontAwesomeIcon icon={faFire} className="mx-1" />
              ) : (
                <FontAwesomeIcon icon={faHourglass2} className="mx-1" />
              )}
              {capitalizeFirstLetter(task.priority)}
            </span>
            <h4 className="font-bold my-2">{capitalizeFirstLetter(task.title)}</h4>
            <p className="text-sm my-2">{capitalizeFirstLetter(task.description)}</p>
            <div className="flex justify-between pt-7 pb-2">
              <p className="text-sm my-2">{task.leftHours}hr</p>
              <button className="play-button text-yellow-300 mt-2">
                <FontAwesomeIcon icon={faPlay} onClick={() => { handleTaskClick(task.task_id) }} />
              </button>
            </div>
            <p className="text-xs text-gray-300">
              Due: {new Date(task.dueDate).toLocaleDateString()}
            </p>
          </div>
        ))
      ) : (
        <div className="text-center mt-10">
          <p className="text-gray-500">You have no tasks yet. Start by adding a new task to stay productive!</p>
        </div>
      ),
    [tasks, capitalizeFirstLetter]
  );

  // Find the closest meeting
  const closestMeeting = useMemo(() => {
    console.log('tasks: ', tasks)
    const meetings = tasks.filter((task) => task.taskType === 'meeting' && task.meetingDate);
    if (meetings.length === 0) return null;

    // Sort meetings by the nearest meetingDate
    return meetings.reduce((closest, current) => {
      const closestDate = new Date(closest.meetingDate);
      const currentDate = new Date(current.meetingDate);
      return currentDate < closestDate ? current : closest;
    });
  }, [tasks]);

  return (
    <main
      className="blur-gradient"
      style={{
        textAlign: 'center',
        marginTop: '-5px',
        marginBottom: '130px',
        minHeight: '100vh',
      }}
    >
      <div className="header flex justify-between items-center p-4">
        <div className="flex">
          <Image
            src={photoUrl}
            alt="User Avatar"
            className="pl-3 w-10 h-10 rounded-md mx-1 mr-3"
            width={40}
            height={40}
            priority
          />
          <div>
            <h4 className="text-sm font-thin">{greeting},</h4>
            <h2> {username}!</h2>
          </div>
        </div>
        <FontAwesomeIcon icon={faBell} className="w-9" />
      </div>

      <div>
        <h3>Upcoming meeting</h3>
      </div>

      {/* meeting */}
      {/* <div className="backdrop-blur-sm upcoming-meeting bg-transparent yellow-border border-2 text-white p-4 rounded-xl shadow-md mx-4 mt-2 mb-3 ">
        <div>
          <h4 className="text-2xl mb-14 text-left yellow-text">Meeting with developers team</h4>
        </div>
        <div className="flex justify-between">
          <p className="text-sm">Jan 10, 9:30 - 11:30 am</p>
          <div className="avatars flex items-center">
            <Image src={photoUrl} className="w-8 h-8 rounded-full" width={32} height={32} alt="Participant 1" />
            <Image src={photoUrl} className="w-8 h-8 rounded-full" width={32} height={32} alt="Participant 2" />
            <span className="text-sm bg-gray-700 p-1 rounded-full">+5</span>
          </div>
        </div>
      </div> */}

      {loading ? (
        <div className="flex justify-center items-center mt-10 min-h-52">
          <FontAwesomeIcon icon={faSpinner} spin size="2x" />
        </div>
      ) : closestMeeting ? (
        <div className="backdrop-blur-sm upcoming-meeting bg-transparent yellow-border border-2 text-white p-4 rounded-xl shadow-md mx-4 mt-2 mb-3">
          <div>
            <h4 className="text-2xl mb-14 text-left yellow-text">
              {capitalizeFirstLetter(closestMeeting.title) || 'Meeting'}
            </h4>
          </div>
          <div className="flex justify-between">
            <p className="text-sm">
              {new Date(closestMeeting.meetingDate).toLocaleString('en-US', {
                month: 'short',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
              })}
            </p>
            <div className="avatars flex items-center">
              <Image
                src={photoUrl}
                className="w-8 h-8 rounded-full"
                width={32}
                height={32}
                alt="Participant 1"
              />
              <Image
                src={photoUrl}
                className="w-8 h-8 rounded-full"
                width={32}
                height={32}
                alt="Participant 2"
              />
              <span className="text-sm bg-gray-700 p-1 rounded-full">+5</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center mt-10">
          <p className="text-gray-500">No upcoming meetings.</p>
        </div>
      )}

      <div>
        <h3 className="pt-4 text-lg font-bold text-left ml-4">Be Productive Today</h3>
        <p className="pb-4 text-sm font-thin text-left ml-4">Tasks to be done </p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center mt-10 min-h-52">
          <FontAwesomeIcon icon={faSpinner} spin size="2x" />
        </div>
      ) : (
        <div className="masonry-container columns-2 gap-4 px-4 break-inside-avoid">{renderedTasks}</div>
      )}
    </main>
  );
};

export default React.memo(Home);
