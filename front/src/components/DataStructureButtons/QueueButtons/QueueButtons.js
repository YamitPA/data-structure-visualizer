import React, { useState } from 'react';
import axios from 'axios'; // ייבוא axios לשליחת בקשות HTTP
import './QueueButtons.css'; // ייבוא קובץ ה-CSS


const QueueButtons = () => {
    const [inputValue, setInputValue] = useState('');
    const [queue, setQueue] = useState([]); // שמירה על מצב התור

     // הוספת איבר לתור
     const enqueueItem = async () => {
        try {
            const response = await axios.post('http://localhost:5000/queue/enqueue', {
                value: inputValue
            });
            setQueue(response.data); // עדכון מצב התור
            setInputValue(''); // נקה את הקלט
        } catch (error) {
            console.error('Error enqueuing item:', error);
        }
    };

    // פונקציה שמופעלת בלחיצת מקש
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            enqueueItem(); // קרא לפונקציה להוספת פריט אם נלחץ אנטר
        }
    };

     // הסרת איבר מהתור
     const dequeueItem = async () => {
        try {
            const response = await axios.delete('http://localhost:5000/queue/dequeue');
            setQueue(response.data); // עדכון מצב התור לאחר הסרה
        } catch (error) {
            console.error('Error dequeuing item:', error);
        }
    };

     // קבלת התור הנוכחי
     const getQueue = async () => {
        try {
            const response = await axios.get('http://localhost:5000/queue');
            setQueue(response.data); // עדכון התור שהתקבל מהשרת
        } catch (error) {
            console.error('Error getting queue:', error);
        }
    };

    // מחיקת כל התור
    const clearQueue = async () => {
        try {
            const response = await axios.delete('http://localhost:5000/queue/clear');
            setQueue(response.data); // עדכון התור לאחר המחיקה
        } catch (error) {
            console.error('Error clearing queue:', error);
        }
    };

    return (
        <div className="Queue-container"> {/* אלמנט עטיפה */}
            <div className="Queue-buttons">
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown} // הוסף את ההאזנה ללחיצה
                    placeholder="Enter value for Queue"
                />
                <button onClick={enqueueItem}>Enqueue Item</button>
                <button onClick={dequeueItem}>Dequeue Item</button>
                <button onClick={getQueue}>Get Queue</button>
                <button onClick={clearQueue}>Clear Queue</button>
            </div>

            {/* הצגת התור */}
            <div className="queue-display">
                {queue.length > 0 ? (
                    <div className="queue">
                        {queue.map((item, index) => (
                            <div key={index} className="queue-item">
                                {item}
                            </div>
                        ))}
                    </div>
                ) : (
                     <p>The queue is empty</p>
                )}
            </div>
        </div>
    );
};

export default QueueButtons;
