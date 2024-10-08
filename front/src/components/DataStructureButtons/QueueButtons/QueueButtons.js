import React, { useState } from 'react';
import './QueueButtons.css'; // ייבוא קובץ ה-CSS


const QueueButtons = () => {
    const [inputValue, setInputValue] = useState('');

    const enqueueItem = () => {
        console.log(`Enqueue item: ${inputValue}`);
        // כאן תוכל להוסיף לוגיקה להוספת איבר לתור
    };

    const dequeueItem = () => {
        console.log(`Dequeue item`);
        // כאן תוכל להוסיף לוגיקה להסרת איבר מהתור
    };

    const getQueue = () => {
        console.log(`Get queue`);
        // כאן תוכל להוסיף לוגיקה לקבלת התור
    };

    return (
        <div className="Queue-buttons">
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter value for Queue"
            />
            <button onClick={enqueueItem}>Enqueue Item</button>
            <button onClick={dequeueItem}>Dequeue Item</button>
            <button onClick={getQueue}>Get Queue</button>
        </div>
    );
};

export default QueueButtons;
