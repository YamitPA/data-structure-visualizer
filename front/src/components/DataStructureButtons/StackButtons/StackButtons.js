import React, { useState } from 'react';
import axios from 'axios'; // ייבוא axios לשליחת בקשות HTTP
import './StackButtons.css'; // ייבוא קובץ ה-CSS


const StackButtons = () => {
    const [inputValue, setInputValue] = useState('');
    const [stack, setStack] = useState([]); // שמירה על מצב המחסנית
    const [topItem, setTopItem] = useState(null); // שמירה על הפריט העליון


    const pushItem = async () => {
        try {
            const response = await axios.post('http://localhost:5000/stack/push', {
                value: inputValue
            });
            setStack(response.data.stack); // עדכון המצב עם המחסנית המלאה
            setInputValue(''); // נקה את הקלט
        } catch (error) {
            console.error('Error pushing item:', error);
        }
    };

    // פונקציה שמופעלת בלחיצת מקש
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            pushItem(); // קרא לפונקציה להוספת פריט אם נלחץ אנטר
        }
    };

    const popItem = async () => {
        try {
            const response = await axios.delete('http://localhost:5000/stack/pop');
            setStack(response.data.stack); // עדכון המצב עם המחסנית המלאה לאחר ההסרה
        } catch (error) {
            console.error('Error popping item:', error);
        }
    };

    const peekItem = async () => {
        try {
            const response = await axios.get('http://localhost:5000/stack/peek'); // הוסף את הנתיב המתאים
            setTopItem(response.data); // שמור את הפריט העליון
        } catch (error) {
            console.error('Error peeking item:', error);
        }
    };

    const getStack = async () => {
        try {
            const response = await axios.get('http://localhost:5000/stack');
            setStack(response.data); // עדכון המחסנית שהתקבלה מהשרת
        } catch (error) {
            console.error('Error getting stack:', error);
        }
    };

    const clearStack = async () => {
        try {
            const response = await axios.delete('http://localhost:5000/stack/clear');
            setStack(response.data); // ניקוי המחסנית
        } catch (error) {
            console.error('Error clearing stack:', error);
        }
    };

    return (
        <div className="Stack-container"> {/* אלמנט עטיפה */}
            <div className="Stack-buttons button">
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown} // הוסף את ההאזנה ללחיצה
                    placeholder="Enter value for Stack"
                />
                <button onClick={pushItem}>Push Item</button>
                <button onClick={popItem}>Pop Item</button>
                <button onClick={peekItem}>Peek Item</button>
                <button onClick={getStack}>Get Stack</button>
                <button onClick={clearStack}>Clear Stack</button>
            </div>
            
            {/* הצגת המחסנית */}
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
                {topItem && <p>Top Item: {topItem}</p>} {/* הצגת הפריט העליון */}
            </div>
        </div>
    );
};

export default StackButtons;
