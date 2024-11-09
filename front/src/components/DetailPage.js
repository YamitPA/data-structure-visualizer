import React from 'react';
import { useLocation } from 'react-router-dom'; 
import './DetailPage.css';
import LinkedListButtons from './DataStructureButtons/LinkedListButtons/LinkedListButtons';
import StackButtons from './DataStructureButtons/StackButtons/StackButtons';
import QueueButtons from './DataStructureButtons/QueueButtons/QueueButtons';
import GraphButtons from './DataStructureButtons/GraphButtons/GraphButtons';
import BfsPage from './AlgorithmsButtons/BfsPage/BfsPage';


const DetailPage = () => {
    const location = useLocation(); // Retrieves location state with selected structure or algorithm
    const { selectedStructure, selectedAlgorithm } = location.state || {}; // Destructures state to get selectedStructure or selectedAlgorithm

    // Renders appropriate component based on selected structure or algorithm
    const renderButtons = () => {
        if (selectedStructure && selectedAlgorithm) {
            return <p>Please select either a data structure or an algorithm, not both.</p>;
        }

        if (selectedStructure) {
            // Renders data structure buttons based on user selection
            switch (selectedStructure) {
                case 'linked-lists':
                    return <LinkedListButtons />;
                case 'stacks':
                    return <StackButtons />;
                case 'queues':
                    return <QueueButtons />;
                case 'graphs':  
                    return <GraphButtons />;
                default:
                    return null;
            }
        }

        if (selectedAlgorithm) {
            // Renders algorithm buttons based on user selection
            switch (selectedAlgorithm) {
                case 'bfs':
                    return <BfsPage />;
                default:
                    return null;
            }
        }

        return <p>Please select either a data structure or an algorithm.</p>;
    };

    return (
        <div className="detail-container">
            <header className="header">
                <h1>The illustration of your choice:</h1>
            </header>
            <main className="main-content">
                <div className="illustration">
                    {/* Shows message based on selected structure or algorithm */}
                    {selectedStructure || selectedAlgorithm ? (
                        <p>
                            {selectedStructure ? selectedStructure : ''} 
                            {selectedStructure && selectedAlgorithm ? ' with ' : ''} 
                            {selectedAlgorithm ? selectedAlgorithm : ''}
                        </p>
                    ) : (
                        <p>Please select either a data structure or an algorithm.</p>
                    )}
                    
                </div>
                {(selectedStructure || selectedAlgorithm) && (
                    <div className="button-container">
                        {/* Displays appropriate buttons based on user selection */}
                        {renderButtons()}
                    </div>
                )}
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
