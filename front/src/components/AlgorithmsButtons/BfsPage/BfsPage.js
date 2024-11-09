import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import '../../DataStructureButtons/GraphButtons/GraphButtons.css';
import './BfsPage.css';

const BfsPage = () => {
    // State variables for graph data, node positions, BFS state, and user input
    const [graph, setGraph] = useState({ nodes: {}, edges: [] });
    const [nodePositions, setNodePositions] = useState({});
    const [startNode, setStartNode] = useState('');
    const [visitedNodes, setVisitedNodes] = useState([]);
    const [nodeValue, setNodeValue] = useState('');
    const [edge, setEdge] = useState({ from: '', to: '' });

    // Fetches graph data from the server
    const fetchGraph = useCallback(async () => {
        try {
            const response = await axios.get('http://localhost:5000/bfsgraph');
            setGraph(response.data);
            setNodePositions(generateNodePositions(response.data.nodes));
        } catch (error) {
            console.error('Error fetching graph:', error);
        }
    }, []);

    // Generates positions for nodes on the screen in a circular layout
    const generateNodePositions = (nodes) => {
        const positions = {};
        const nodeKeys = Object.keys(nodes);
        const totalNodes = nodeKeys.length;
        const angleIncrement = (2 * Math.PI) / totalNodes;
        const radius = 150;

        nodeKeys.forEach((nodeKey, i) => {
            const angle = angleIncrement * i;
            positions[nodeKey] = {
                top: Math.sin(angle) * radius + 200,
                left: Math.cos(angle) * radius + 300,
            };
        });
        return positions;
    };

    // Runs BFS and updates visited nodes
    const runBFS = async () => {
        if (!startNode) {
            console.log("No start node provided");
            return;
        }
        try {
            const response = await axios.post('http://localhost:5000/bfs/run', { start_node: startNode });
            setVisitedNodes(response.data.visited_nodes);
            setStartNode('');
        } catch (error) {
            console.error('Error running BFS:', error);
        }
    };

    // Adds a new node to the graph
    const addNode = async () => {
        if (!nodeValue) return;
        try {
            await axios.post('http://localhost:5000/bfs/node', { node: nodeValue });
            setNodeValue('');
            fetchGraph();
        } catch (error) {
            console.error('Error adding node:', error);
        }
    };

    // Removes a node from the graph
    const removeNode = async () => {
        if (!nodeValue) return;
        try {
            await axios.delete(`http://localhost:5000/bfs/node/<node>/${nodeValue}`);
            setNodeValue('');
            fetchGraph();
        } catch (error) {
            console.error('Error removing node:', error);
        }
    };

    // Adds an edge between two nodes in the graph
    const addEdge = async () => {
        if (!edge.from || !edge.to) return;
        try {
            await axios.post('http://localhost:5000/bfs/edge', edge);
            setEdge({ from: '', to: '' });
            fetchGraph();
        } catch (error) {
            console.error('Error adding edge:', error);
        }
    };

    // Removes an edge between two nodes from the graph
    const removeEdge = async () => {
        if (!edge.from || !edge.to) return;
        try {
            await axios.delete('http://localhost:5000/bfs/edge', { data: edge });
            setEdge({ from: '', to: '' });
            fetchGraph();
        } catch (error) {
            console.error('Error removing edge:', error);
        }
    };

    // Clears the entire graph
    const clearGraph = async () => {
        try {
            await axios.delete('http://localhost:5000/bfs/clear');
            fetchGraph();
        } catch (error) {
            console.error('Error clearing graph:', error);
        }
    };

    // Fetches the graph data when the component mounts
    useEffect(() => {
        fetchGraph();
        return () => {
            // Clean up state on unmount
            setGraph({ nodes: {}, edges: [] });
            setNodePositions({});
            setVisitedNodes([]);
            setStartNode('');
        };
    }, [fetchGraph]);
    
    // Renders a node on the graph screen, highlighting visited nodes
    const renderNode = (node) => {
        const isVisited = visitedNodes.includes(node);
        const nodeClass = isVisited ? 'Graph-node visited' : 'Graph-node';
        return (
            <div
                key={node}
                className={nodeClass}
                style={{
                    top: `${nodePositions[node]?.top}px`,
                    left: `${nodePositions[node]?.left}px`,
                    position: 'absolute'
                }}
            >
                {node}
            </div>
        );
    };

    // Renders an edge between two nodes
    const renderEdge = (fromNode, toNode) => {
        const fromPos = nodePositions[fromNode];
        const toPos = nodePositions[toNode];
        if (!fromPos || !toPos) return null;

        const deltaX = toPos.left - fromPos.left;
        const deltaY = toPos.top - fromPos.top;
        const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);
        const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);

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
                <div className="arrowhead" />
            </div>
        );
    };

    // Handles "Enter" key press to trigger actions
    const handleKeyPress = (e, action) => {
        if (e.key === 'Enter') {
            action();  
        }
    };

    return (
        <div className="BfsPage-container">
            <div className="bfs-buttons">
                {/* Activation BFS */}
                <div className="input-container">
                    <input
                        type="text"
                        value={startNode}
                        onChange={(e) => setStartNode(e.target.value)}
                        placeholder="Start Node"
                        onKeyDown={(e) => handleKeyPress(e, runBFS)} 
                    />
                    <button onClick={runBFS}>Run BFS</button>
                </div>
    
                {/* Node management */}
                <div className="input-container">
                    <input
                        type="text"
                        value={nodeValue}
                        onChange={(e) => setNodeValue(e.target.value)}
                        placeholder="Node Value"
                        onKeyDown={(e) => handleKeyPress(e, addNode)}  // Just add node, no focus change 
                    />
                    <div className="button-group">
                        <button onClick={addNode}>Add Node</button>
                        <button onClick={removeNode}>Remove Node</button>
                    </div>
                </div>
    
                {/* Edge management */}
                <div className="input-container">
                    <input
                        id="edgeFrom"
                        type="text"
                        value={edge.from}
                        onChange={(e) => setEdge({ ...edge, from: e.target.value })}
                        placeholder="From Node"
                        onKeyDown={(e) => handleKeyPress(e, () => document.getElementById('edgeTo').focus(), document.getElementById('edgeTo'))} 
                    />
                    <input
                        id="edgeTo"
                        type="text"
                        value={edge.to}
                        onChange={(e) => setEdge({ ...edge, to: e.target.value })}
                        placeholder="To Node"
                        onKeyDown={(e) => handleKeyPress(e, addEdge)} 
                    />
                    <div className="button-group">
                        <button onClick={addEdge}>Add Edge</button>
                        <button onClick={removeEdge}>Remove Edge</button>
                    </div>
                </div>
    
                {/* Deleting the entire graph */}
                <button className="clear-button" onClick={clearGraph}>Clear Graph</button>
            </div>
    
            {/* The graph display */}
            <div className="Graph-container" style={{ position: 'relative' }}>
                {Object.keys(graph.nodes).map(renderNode)}
                {graph.edges.map(([from, to], index) => (
                    <React.Fragment key={index}>{renderEdge(from, to)}</React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default BfsPage;
