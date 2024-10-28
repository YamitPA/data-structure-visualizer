import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './GraphButtons.css'; // ייבוא קובץ ה-CSS


const GraphButtons = () => {
    const [nodeValue, setNodeValue] = useState('');
    const [edgeFrom, setEdgeFrom] = useState('');
    const [edgeTo, setEdgeTo] = useState('');
    const [graph, setGraph] = useState({ nodes: [], edges: [] });

    useEffect(() => {
        fetchGraph(); // Fetch the initial graph state
    }, []);

     const fetchGraph = async () => {
        try {
            const response = await axios.get('http://localhost:5000/graph');
            console.log('Graph data:', response.data); // הדפסת הנתונים בקונסול
            setGraph(response.data);
        } catch (error) {
            console.error('Error fetching graph:', error);
        }
    };

    const addNode = async () => {
        try {
            await axios.post('http://localhost:5000/graph/node', { node: nodeValue });
            fetchGraph(); // Refresh the graph after adding
            setNodeValue('');
        } catch (error) {
            console.error('Error adding node:', error);
        }
    };

    const removeNode = async () => {
        try {
            await axios.delete(`http://localhost:5000/graph/node/${nodeValue}`);
            fetchGraph(); // Refresh the graph after removing
            setNodeValue('');
        } catch (error) {
            console.error('Error removing node:', error);
        }
    };

    const addEdge = async () => {
        try {
            await axios.post('http://localhost:5000/graph/edge', { from: edgeFrom, to: edgeTo });
            fetchGraph(); // Refresh the graph after adding
            setEdgeFrom('');
            setEdgeTo('');
        } catch (error) {
            console.error('Error adding edge:', error);
        }
    };

    const removeEdge = async () => {
        try {
            await axios.delete('http://localhost:5000/graph/edge', { data: { from: edgeFrom, to: edgeTo } });
            fetchGraph(); // Refresh the graph after removing
            setEdgeFrom('');
            setEdgeTo('');
        } catch (error) {
            console.error('Error removing edge:', error);
        }
    };

    return (
        <div className="Graph-buttons-container">
            <div className="Graph-buttons">
                <div className="add-remove-node-buttons">
                    <input
                        type="text"
                        value={nodeValue}
                        onChange={(e) => setNodeValue(e.target.value)}
                        placeholder="Node value"
                    />
                    <button onClick={addNode}>Add Node</button>
                    <button onClick={removeNode}>Remove Node</button>
                </div>
                <div className="edge-section">
                    <input
                        type="text"
                        value={edgeFrom}
                        onChange={(e) => setEdgeFrom(e.target.value)}
                        placeholder="From Node"
                    />
                    <input
                        type="text"
                        value={edgeTo}
                        onChange={(e) => setEdgeTo(e.target.value)}
                        placeholder="To Node"
                    />
                    <button onClick={addEdge}>Add Edge</button>
                    <button onClick={removeEdge}>Remove Edge</button>
                </div>
            </div>
            <div>
                <p>Nodes: {Array.isArray(graph.nodes) ? graph.nodes.join(', ') : 'No nodes available'}</p>
                <p>Edges: {Array.isArray(graph.edges) ? graph.edges.map(edge => `${edge[0]} -> ${edge[1]}`).join(', ') : 'No edges available'}</p>
            </div>
        </div>
    );    
};    

export default GraphButtons;