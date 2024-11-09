import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './GraphButtons.css';

const GraphButtons = () => {
    const [nodeValue, setNodeValue] = useState(''); // Node input field value
    const [edgeFrom, setEdgeFrom] = useState(''); // Edge "from" input field value
    const [edgeTo, setEdgeTo] = useState(''); // Edge "to" input
    const [graph, setGraph] = useState({ nodes: {}, edges: [] }); // Graph data
    const [nodePositions, setNodePositions] = useState({}); /// Node positions
    const edgeToInput = React.useRef(null); // Ref for the edge "to" input

    // Function to fetch graph data from the server
    const fetchGraph = useCallback(async () => {
        try {
            const response = await axios.get('http://localhost:5000/graph');
            console.log('Graph data:', response.data);
            if (response.data.nodes && response.data.edges) {
                setGraph(response.data); // Update graph data (nodes and edges)
                setNodePositions(generateNodePositions(response.data.nodes)); // Update node positions based on new data
            } else {
                console.error('Invalid graph data structure:', response.data);
                setGraph({ nodes: {}, edges: [] }); // Set graph to empty if data structure is invalid
            }
        } catch (error) {
            console.error('Error fetching graph:', error);
        }
    }, []);

    // Function to generate positions for the nodes
    const generateNodePositions = (nodes) => {
        const positions = {};
        const nodeKeys = Object.keys(nodes);
        const totalNodes = nodeKeys.length;

        // Calculate positions so that nodes are scattered on the surface
        const angleIncrement = (2 * Math.PI) / totalNodes; 
        const radius = 150; 

        // Calculate X and Y positions based on the angle
        nodeKeys.forEach((nodeKey, i) => {
            const angle = angleIncrement * i;
            positions[nodeKey] = {
                top: Math.sin(angle) * radius + 200, 
                left: Math.cos(angle) * radius + 300, 
            };
        });
        console.log('Node positions:', positions); 
        return positions;
    };

    // UseEffect to fetch graph data when the component mounts
    useEffect(() => {
        fetchGraph();
    }, [fetchGraph]);

    // Function to add a new node to the graph
    const addNode = async () => {
        if (!nodeValue) return; // If no value is entered, do nothing
        try {
            await axios.post('http://localhost:5000/graph/node', { node: nodeValue });
            fetchGraph();
            setNodeValue('');
        } catch (error) {
            console.error('Error adding node:', error);
        }
    };

    // Function to remove a node from the graph
    const removeNode = async () => {
        try {
            await axios.delete(`http://localhost:5000/graph/node/${nodeValue}`);
            fetchGraph();
            setNodeValue('');
        } catch (error) {
            console.error('Error removing node:', error);
        }
    };

    // Function to add an edge between two nodes
    const addEdge = async () => {
        if (!edgeFrom || !edgeTo) return; 
        try {
            await axios.post('http://localhost:5000/graph/edge', { from: edgeFrom, to: edgeTo });
            fetchGraph();
            setEdgeFrom('');
            setEdgeTo('');
        } catch (error) {
            console.error('Error adding edge:', error);
        }
    };

    // Function to remove an edge from the graph
    const removeEdge = async () => {
        try {
            await axios.delete('http://localhost:5000/graph/edge', { data: { from: edgeFrom, to: edgeTo } });
            fetchGraph();
            setEdgeFrom('');
            setEdgeTo('');
        } catch (error) {
            console.error('Error removing edge:', error);
        }
    };

    // New function to delete the entire graph (nodes and edges)
    const deleteGraph = async () => {
        try {
            await axios.delete('http://localhost:5000/graph'); // Adjust the endpoint to delete the whole graph
            setGraph({ nodes: {}, edges: [] }); // Reset local graph state
            setNodePositions({}); // Reset node positions
            console.log('Graph deleted successfully');
        } catch (error) {
            console.error('Error deleting graph:', error);
        }
    };

    // Function to render an edge between two nodes (visual representation)
    const renderEdge = (fromNode, toNode) => {
        const fromPos = nodePositions[fromNode];
        const toPos = nodePositions[toNode];
    
        if (!fromPos || !toPos) return null;
    
        const deltaX = toPos.left - fromPos.left;
        const deltaY = toPos.top - fromPos.top;
        const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);
        const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI); // Calculate angle for rotation
    
        return (
            <div
                className="edge"
                style={{
                    width: `${distance - 26}px`, 
                    top: `${fromPos.top + 20}px`, 
                    left: `${fromPos.left + 20}px`,
                    transform: `rotate(${angle}deg)`,
                    position: 'absolute',
                }}
            >
                {/* Pressure element at the end of the line */}
                <div className="arrowhead" />
            </div>
        );
    };

    // Event listeners for key presses
    const handleNodeKeyPress = (e) => {
        if (e.key === 'Enter') addNode(); // Add node when Enter is pressed
    };

    const handleEdgeFromKeyPress = (e) => {
        if (e.key === 'Enter') {
            edgeToInput.current.focus(); // Focus on the "edgeTo" input field when Enter is pressed
        }
    };

    const handleEdgeToKeyPress = (e) => {
        if (e.key === 'Enter') addEdge(); // Add edge when Enter is pressed
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
                        onKeyDown={handleNodeKeyPress} 
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
                        onKeyDown={handleEdgeFromKeyPress} 
                    />
                    <input
                        type="text"
                        value={edgeTo}
                        onChange={(e) => setEdgeTo(e.target.value)}
                        placeholder="To Node"
                        ref={edgeToInput} 
                        onKeyDown={handleEdgeToKeyPress} 
                    />
                    <button onClick={addEdge}>Add Edge</button>
                    <button onClick={removeEdge}>Remove Edge</button>
                    <button onClick={deleteGraph}>Delete Graph</button>
                </div>
            </div>
            <div className="Graph-container" style={{ position: 'relative' }}>
                {Object.keys(graph.nodes).map((node, index) => (
                    <div key={index} className="Graph-node" style={{ position: 'absolute', top: `${nodePositions[node]?.top}px`, left: `${nodePositions[node]?.left}px` }}>
                        {node}
                    </div>
                ))}
                {graph.edges.map(([from, to], index) => (
                    <React.Fragment key={index}>{renderEdge(from, to)}</React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default GraphButtons;
