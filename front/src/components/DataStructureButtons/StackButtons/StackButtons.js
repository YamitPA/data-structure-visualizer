import React, { useState } from 'react';
import './StackButtons.css'; // ייבוא קובץ ה-CSS


const StackButtons = () => {
    const [inputValue, setInputValue] = useState('');

    const pushItem = () => {
        console.log(`Push item: ${inputValue}`);
        // כאן תוכל להוסיף לוגיקה לדחיפת איבר למחסנית
    };

    const popItem = () => {
        console.log(`Pop item`);
        // כאן תוכל להוסיף לוגיקה להסרת איבר מהמחסנית
    };

    const getStack = () => {
        console.log(`Get stack`);
        // כאן תוכל להוסיף לוגיקה לקבלת המחסנית
    };

    return (
        <div className="Stack-buttons button">
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter value for Stack"
            />
            <button onClick={pushItem}>Push Item</button>
            <button onClick={popItem}>Pop Item</button>
            <button onClick={getStack}>Get Stack</button>
        </div>
    );
};

export default StackButtons;
