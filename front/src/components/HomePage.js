import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';
import SelectOption from './SelectOption';
import { structures, algorithms } from './data'; 

const HomePage = () => {
    const navigate = useNavigate();
    const [selectedStructure, setSelectedStructure] = useState('');
    const [selectedAlgorithm, setSelectedAlgorithm] = useState('');

    // Navigate to the details page with the selected structure or algorithm
    const goToDetails = () => {
        if (selectedStructure || selectedAlgorithm) {
            navigate('/details', {
                state: { selectedStructure, selectedAlgorithm } // Pass selected data to details page
            });
        } else {
            alert("Please select one data structure and an algorithm."); // Prompt if no selection is made
        }
    };

    return (
        <div className="home-container">
            <div className="background-image"></div>
            <header className="header">
                <h1>An interactive analyzer for data structures and algorithms</h1>
                <p>Welcome!</p>
                <p>Choose a data structure and start exploring algorithms</p>
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
                <button onClick={goToDetails}>Continue</button>
            </main>
            <footer className="footer">
                <p>© 2024 An interactive parser for data structures and algorithms</p>
            </footer>
        </div>
    );
};

export default HomePage;
