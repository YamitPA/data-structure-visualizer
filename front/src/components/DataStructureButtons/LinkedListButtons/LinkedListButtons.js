import React, { useState } from 'react';
import './LinkedListButtons.css';
import axios from 'axios';

const LinkedListButtons = () => {
    // State hooks to store input value and linked list data
    const [inputValue, setInputValue] = useState('');
    const [linkedList, setLinkedList] = useState([]); 

    // Function to add an item to the linked list
    const addItem = async () => {
        try {
            // Make an HTTP POST request to add an item to the linked list
            const response = await axios.post('http://localhost:5000/list/add', {
                value: inputValue // Send the input value as the item to be added
            });
            console.log('Response from server:', response.data); 
            setLinkedList(response.data); // Update the linked list state with the new data
            setInputValue(''); // Clear the input field after adding the item
        } catch (error) {
            console.error('Error adding item:', error);
        }
    };

    // // Function to handle key press events (specifically for 'Enter' key)
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            addItem(); // Call the addItem function when the 'Enter' key is pressed
        }
    };

    // // Function to remove an item from the linked list
    const removeItem = async () => {
        try {
            // Make an HTTP DELETE request to remove an item from the linked list
            const response = await axios.delete('http://localhost:5000/list/remove', {
                data: { value: inputValue }
            });
            console.log('Response from server:', response.data);
            setLinkedList(response.data); 
            setInputValue(''); 
        } catch (error) {
            console.error('Error removing item:', error);
        }
    };

    // Function to fetch and display the current linked list from the server
    const getList = async () => {
        try {
            // Make an HTTP GET request to fetch the linked list
            const response = await axios.get('http://localhost:5000/list');
            console.log('Response from server:', response.data);
            setLinkedList(response.data); 
        } catch (error) {
            console.error('Error getting list:', error);
        }
    };

    // Function to clear the entire linked list
    const clearList = async () => {
        try {
            // Make an HTTP DELETE request to clear the linked list
            const response = await axios.delete('http://localhost:5000/list/clear');
            setLinkedList(response.data);
        } catch (error) {
            console.error('Error clearing list:', error);
        }
    };


    return (
        <div className="linked-list-container"> {/* A wrapper element*/}
            <div className="linked-list-buttons">
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown} // Listen for key presses and handle 'Enter' key
                    placeholder="Enter value for Linked List"
                />
                <button onClick={addItem}>Add Item</button>
                <button onClick={removeItem}>Remove Item</button>
                <button onClick={getList}>Get List</button>
                <button onClick={clearList}>Clear List</button> {/* Button to delete the list*/}
            </div>

            <div className="linked-list-display"> {/* Container for displaying the linked list */}
                {console.log('LinkedList state:', linkedList)}
                {linkedList.length > 0 ? (
                    <div className="linked-list">
                        {linkedList.map((item, index) => (
                            <React.Fragment key={index}>
                                <div className="linked-list-node">{item}</div>
                                {index < linkedList.length - 1 && <div className="arrow">→</div>}
                            </React.Fragment>
                        ))}
                    </div>
                ) : (
                    <p>The list is empty</p>
                )}
            </div>
            {console.log(linkedList)} 
        </div>
    );
};

export default LinkedListButtons;
