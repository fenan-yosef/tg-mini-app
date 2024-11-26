'use client'; // Needed to use client-side logic like useEffect
// home/page.js
import { useEffect, useState } from 'react';

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
            <h1>Hello, {username}!</h1>
        </main>
    );
}
