import React, { useState } from 'react';
import axios from 'axios'; 
import './StackButtons.css'; 


const StackButtons = () => {
    const [inputValue, setInputValue] = useState(''); // State for user input
    const [stack, setStack] = useState([]); // State to manage the current stack
    const [topItem, setTopItem] = useState(null); // State to track the top item in the stack

    
    // Function to add an item to the stack
    const pushItem = async () => {
        try {
            const response = await axios.post('http://localhost:5000/stack/push', {
                value: inputValue
            });
            setStack(response.data.stack); // Updates the stack state with the full stack data from the server
            setInputValue(''); // Clears the input field after the push
        } catch (error) {
            console.error('Error pushing item:', error);
        }
    };

    // Function to handle key events for input
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            pushItem(); 
        }
    };

    // Function to remove the top item from the stack
    const popItem = async () => {
        try {
            const response = await axios.delete('http://localhost:5000/stack/pop');
            setStack(response.data.stack); // Updates the stack state after popping an item
        } catch (error) {
            console.error('Error popping item:', error);
        }
    };

    // Function to get the top item in the stack without removing it
    const peekItem = async () => {
        try {
            const response = await axios.get('http://localhost:5000/stack/peek'); 
            setTopItem(response.data); // Sets the top item in state
        } catch (error) {
            console.error('Error peeking item:', error);
        }
    };

    // Function to fetch the current state of the stack
    const getStack = async () => {
        try {
            const response = await axios.get('http://localhost:5000/stack');
            setStack(response.data); 
        } catch (error) {
            console.error('Error getting stack:', error);
        }
    };

    // Function to clear all items in the stack
    const clearStack = async () => {
        try {
            const response = await axios.delete('http://localhost:5000/stack/clear');
            setStack(response.data); // Clears the stack state after deletion
        } catch (error) {
            console.error('Error clearing stack:', error);
        }
    };

    return (
        <div className="Stack-container"> {/* Wrapper element for stack UI */}
            <div className="Stack-buttons button">
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown} 
                    placeholder="Enter value for Stack"
                />
                <button onClick={pushItem}>Push Item</button>
                <button onClick={popItem}>Pop Item</button>
                <button onClick={peekItem}>Peek Item</button>
                <button onClick={getStack}>Get Stack</button>
                <button onClick={clearStack}>Clear Stack</button>
            </div>
            
            {/* Display of the stack */}
            <div className="Stack-display">
                {stack.length > 0 ? (
                    <ul>
                        {stack.map((item, index) => (
                            <li key={index} className={index === 0 ? 'Stack-item first-item' : 'Stack-item'}>
                                {item}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="Stack-empty">The stack is empty</p>
                )}
                {topItem && <p>Top Item: {topItem}</p>} {/* Display each item in the stack */}
            </div>
        </div>
    );
};

export default StackButtons;
