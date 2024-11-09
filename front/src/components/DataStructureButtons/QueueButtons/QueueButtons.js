import React, { useState } from 'react';
import axios from 'axios'; 
import './QueueButtons.css'; 


const QueueButtons = () => {
    const [inputValue, setInputValue] = useState(''); // State to store user input
    const [queue, setQueue] = useState([]); // State to manage the current queue

     // Function to add an item to the queue
     const enqueueItem = async () => {
        try {
            const response = await axios.post('http://localhost:5000/queue/enqueue', {
                value: inputValue // Sends the current input value to the server
            });
            setQueue(response.data); // Updates the queue state with the response
            setInputValue(''); // Clears the input field after enqueue
        } catch (error) {
            console.error('Error enqueuing item:', error);
        }
    };

    // Function to handle key events
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            enqueueItem(); // Calls enqueue function if 'Enter' key is pressed
        }
    };

     // Function to remove the first item from the queue
     const dequeueItem = async () => {
        try {
            const response = await axios.delete('http://localhost:5000/queue/dequeue');
            setQueue(response.data); // Updates queue state after dequeuing
        } catch (error) {
            console.error('Error dequeuing item:', error);
        }
    };

     // Function to fetch the current queue from the server
     const getQueue = async () => {
        try {
            const response = await axios.get('http://localhost:5000/queue');
            setQueue(response.data); // Sets queue state based on server response
        } catch (error) {
            console.error('Error getting queue:', error);
        }
    };

    // Function to clear the entire queue
    const clearQueue = async () => {
        try {
            const response = await axios.delete('http://localhost:5000/queue/clear');
            setQueue(response.data); // Updates queue state after clearing it
        } catch (error) {
            console.error('Error clearing queue:', error);
        }
    };

    return (
        <div className="Queue-container"> 
            <div className="Queue-buttons">
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)} // Updates input value on change
                    onKeyDown={handleKeyDown} // Adds event listener for key presses
                    placeholder="Enter value for Queue"
                />
                <button onClick={enqueueItem}>Enqueue Item</button>
                <button onClick={dequeueItem}>Dequeue Item</button>
                <button onClick={getQueue}>Get Queue</button>
                <button onClick={clearQueue}>Clear Queue</button>
            </div>

            {/* Display of the queue*/}
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
