import React, { useState } from 'react';
import './DetailPage.css'; // אם תיצור קובץ CSS לעיצוב

const DetailPage = () => {
    const [selectedStructure, setSelectedStructure] = useState('');
    const [selectedAlgorithm, setSelectedAlgorithm] = useState('');

    const handleStructureChange = (event) => {
        setSelectedStructure(event.target.value);
    };

    const handleAlgorithmChange = (event) => {
        setSelectedAlgorithm(event.target.value);
    };

    return (
        <div className="detail-container">
            <header className="header">
                <h1>Details on Data Structures and Algorithms</h1>
                <p>Select a data structure and algorithm to see details.</p>
            </header>
            <main className="main-content">
                <section>
                    <h2>Select a data structure</h2>
                    <select value={selectedStructure} onChange={handleStructureChange}>
                        <option value="">-- Select a data structure --</option>
                        <option value="arrays">Arrays</option>
                        <option value="linked-lists">Linked Lists</option>
                        <option value="stacks">Stacks</option>
                        <option value="queues">Queues</option>
                        <option value="hash-tables">Hash Tables</option>
                        <option value="trees">Trees</option>
                        <option value="graphs">Graphs</option>
                        <option value="heaps">Heaps</option>
                        <option value="tries">Tries</option>
                        <option value="sets">Sets</option>
                        <option value="multi-dimensional-arrays">Multi-dimensional Arrays</option>
                        <option value="bloom-filters">Bloom Filters</option>
                    </select>
                </section>
                <section>
                    <h2>Select an algorithm</h2>
                    <select value={selectedAlgorithm} onChange={handleAlgorithmChange}>
                        <option value="">-- Select an algorithm --</option>
                        <option value="searching">Searching</option>
                        <option value="sorting">Sorting</option>
                        <option value="graph-traversal">Graph Traversal</option>
                        <option value="dynamic-programming">Dynamic Programming</option>
                        <option value="backtracking">Backtracking</option>
                        <option value="greedy">Greedy</option>
                        <option value="divide-and-conquer">Divide and Conquer</option>
                    </select>
                </section>
                {/* כאן תוכל להוסיף מקום לאילוסטרציה */}
                <div className="illustration">
                    {/* אילוסטרציה או מידע נוסף כאן */}
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
