import React, { useState } from 'react';
import './DetailPage.css';
import SelectOption from './SelectOption';
import { structures, algorithms } from './data'; // יבוא נתונים

const DetailPage = () => {
    const [selectedStructure, setSelectedStructure] = useState('');
    const [selectedAlgorithm, setSelectedAlgorithm] = useState('');

    return (
        <div className="detail-container">
            <header className="header">
                <h1>Details on Data Structures and Algorithms</h1>
                <p>Select a data structure and algorithm to see details.</p>
            </header>
            <main className="main-content">
                <SelectOption
                    label="Data Structure"
                    options={structures}
                    value={selectedStructure}
                    onChange={(e) => setSelectedStructure(e.target.value)}
                />
                <SelectOption
                    label="Algorithm"
                    options={algorithms}
                    value={selectedAlgorithm}
                    onChange={(e) => setSelectedAlgorithm(e.target.value)}
                />
                <div className="illustration">
                    {selectedStructure && selectedAlgorithm && (
                        <p>You have selected: {selectedStructure} with the {selectedAlgorithm} algorithm.</p>
                    )}
                </div>
            </main>
            <footer className="footer">
                <p>© 2024 An interactive parser for data structures and algorithms</p>
            </footer>
        </div>
    );
};

export default DetailPage;
