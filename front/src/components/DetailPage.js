import React from 'react';
import { useLocation } from 'react-router-dom'; // ייבוא ה-hook useLocation
import './DetailPage.css';

const DetailPage = () => {
    const location = useLocation(); // קבלת המיקום הנוכחי
    const { selectedStructure, selectedAlgorithm } = location.state || {}; // קבלת הנתונים מה-state

    return (
        <div className="detail-container">
            <header className="header">
                <h1>The illustration of your choice:</h1>
            </header>
            <main className="main-content">
                <div className="illustration">
                    {/* הצגת הודעה בהתאם לבחירות */}
                    {selectedStructure || selectedAlgorithm ? (
                        <p>
                            {selectedStructure ? selectedStructure : ''} 
                            {selectedStructure && selectedAlgorithm ? ' with ' : ''} 
                            {selectedAlgorithm ? selectedAlgorithm : ''}
                        </p>
                    ) : (
                        <p>Please select either a data structure or an algorithm.</p>
                    )}
                    {/* ניתן להוסיף כאן את תמונת האילוסטרציה אם יש */}
                    {selectedStructure && selectedAlgorithm && (
                        <img
                            src={`/path/to/illustrations/${selectedStructure}-${selectedAlgorithm}.png`}
                            alt={`${selectedStructure} with ${selectedAlgorithm}`}
                        />
                    )}
                </div>
                <button className="back-button" onClick={() => window.history.back()}>
                    Back to Home
                </button>
            </main>
            <footer className="footer">
                <p>© 2024 An interactive parser for data structures and algorithms</p>
            </footer>
        </div>
    );
};

export default DetailPage;
