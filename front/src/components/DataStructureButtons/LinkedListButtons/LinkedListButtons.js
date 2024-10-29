import React, { useState } from 'react';
import './LinkedListButtons.css';
import axios from 'axios';

const LinkedListButtons = () => {
    const [inputValue, setInputValue] = useState('');
    const [linkedList, setLinkedList] = useState([]); // שמירה על מצב הרשימה

    // פונקציה להוספת פריט לרשימה
    const addItem = async () => {
        try {
            const response = await axios.post('http://localhost:5000/list/add', {
                value: inputValue // inputValue הוא הערך שמוזן על ידי המשתמש
            });
            console.log('Response from server:', response.data); // הדפס את התגובה
            setLinkedList(response.data); // עדכן את הרשימה
            setInputValue(''); // נקה את הקלט לאחר ההוספה
        } catch (error) {
            console.error('Error adding item:', error);
        }
    };

    // פונקציה שמופעלת בלחיצת מקש
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            addItem(); // קרא לפונקציה להוספת פריט אם נלחץ אנטר
        }
    };

    // פונקציה להסרת פריט מהרשימה
    const removeItem = async () => {
        try {
            const response = await axios.delete('http://localhost:5000/list/remove', {
                data: { value: inputValue }
            });
            console.log('Response from server:', response.data);
            setLinkedList(response.data); // עדכני את הרשימה לאחר מחיקה
            setInputValue(''); // נקה את הקלט לאחר ההוספה
        } catch (error) {
            console.error('Error removing item:', error);
        }
    };

    // פונקציה להחזרת כל הרשימה
    const getList = async () => {
        try {
            const response = await axios.get('http://localhost:5000/list');
            console.log('Response from server:', response.data);
            setLinkedList(response.data); // קבל והצג את הרשימה הנוכחית
        } catch (error) {
            console.error('Error getting list:', error);
        }
    };

    const clearList = async () => {
        try {
            const response = await axios.delete('http://localhost:5000/list/clear');
            setLinkedList(response.data);
        } catch (error) {
            console.error('Error clearing list:', error);
        }
    };


    return (
        <div className="linked-list-container"> {/* אלמנט עטיפה */}
            <div className="linked-list-buttons">
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown} // הוסף את ההאזנה ללחיצה
                    placeholder="Enter value for Linked List"
                />
                <button onClick={addItem}>Add Item</button>
                <button onClick={removeItem}>Remove Item</button>
                <button onClick={getList}>Get List</button>
                <button onClick={clearList}>Clear List</button> {/* הכפתור למחיקת הרשימה */}
            </div>

            <div className="linked-list-display">
                {console.log('LinkedList state:', linkedList)} {/* לוג למצב הרשימה */}
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
            {console.log(linkedList)} {/* הוספת לוג לקונסולה */}
        </div>
    );
};

export default LinkedListButtons;
