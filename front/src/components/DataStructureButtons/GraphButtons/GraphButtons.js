import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './GraphButtons.css';

const GraphButtons = () => {
    const [nodeValue, setNodeValue] = useState('');
    const [edgeFrom, setEdgeFrom] = useState('');
    const [edgeTo, setEdgeTo] = useState('');
    const [graph, setGraph] = useState({ nodes: {}, edges: [] });
    const [nodePositions, setNodePositions] = useState({}); // לשמירת מיקום קבוע לצמתים
    const edgeToInput = React.useRef(null); // רפרנס לשדה הקלט של `edgeTo`

    const fetchGraph = useCallback(async () => {
        try {
            const response = await axios.get('http://localhost:5000/graph');
            console.log('Graph data:', response.data);
            if (response.data.nodes && response.data.edges) {
                setGraph(response.data);
                setNodePositions(generateNodePositions(response.data.nodes)); // עדכון מיקומים עם נתונים חדשים
            } else {
                console.error('Invalid graph data structure:', response.data);
                setGraph({ nodes: {}, edges: [] });
            }
        } catch (error) {
            console.error('Error fetching graph:', error);
        }
    }, []);

    const generateNodePositions = (nodes) => {
        const positions = {};
        const nodeKeys = Object.keys(nodes);
        const totalNodes = nodeKeys.length;

        // עדכון המיקומים כך שיהיו מפוזרים על פני המשטח
        const angleIncrement = (2 * Math.PI) / totalNodes; // זווית בין כל צומת
        const radius = 150; // רדיוס של המעגל שבו הצמתים יימצאו

        nodeKeys.forEach((nodeKey, i) => {
            const angle = angleIncrement * i;
            positions[nodeKey] = {
                top: Math.sin(angle) * radius + 200, // מרכז על ציר Y
                left: Math.cos(angle) * radius + 300, // מרכז על ציר X
            };
        });
        console.log('Node positions:', positions); // בדיקה שהמיקומים מתעדכנים
        return positions;
    };

    useEffect(() => {
        fetchGraph();
    }, [fetchGraph]);

    const addNode = async () => {
        if (!nodeValue) return; // אם אין ערך, יוצאים מהפונקציה
        try {
            await axios.post('http://localhost:5000/graph/node', { node: nodeValue });
            fetchGraph();
            setNodeValue('');
        } catch (error) {
            console.error('Error adding node:', error);
        }
    };

    const removeNode = async () => {
        try {
            await axios.delete(`http://localhost:5000/graph/node/${nodeValue}`);
            fetchGraph();
            setNodeValue('');
        } catch (error) {
            console.error('Error removing node:', error);
        }
    };

    const addEdge = async () => {
        if (!edgeFrom || !edgeTo) return; // אם אין ערכים, יוצאים מהפונקציה
        try {
            await axios.post('http://localhost:5000/graph/edge', { from: edgeFrom, to: edgeTo });
            fetchGraph();
            setEdgeFrom('');
            setEdgeTo('');
        } catch (error) {
            console.error('Error adding edge:', error);
        }
    };

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

    // New function to delete the entire graph
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

    // פונקציה ליצירת חץ בין צמתים
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
                    width: `${distance - 26}px`, // אורך מקוצר
                    top: `${fromPos.top + 20}px`, // 20 הוא חצי מגובה הצומת
                    left: `${fromPos.left + 20}px`,
                    transform: `rotate(${angle}deg)`,
                    position: 'absolute',
                }}
            >
                {/* אלמנט לחץ בקצה הקו */}
                <div className="arrowhead" />
            </div>
        );
    };

    // פונקציות מאזינות לאירועים
    const handleNodeKeyPress = (e) => {
        if (e.key === 'Enter') addNode(); // הוספת צומת
    };

    const handleEdgeFromKeyPress = (e) => {
        if (e.key === 'Enter') {
            edgeToInput.current.focus(); // מעביר פוקוס לשדה `edgeTo`
        }
    };

    const handleEdgeToKeyPress = (e) => {
        if (e.key === 'Enter') addEdge(); // הוספת קשת
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
                        onKeyDown={handleNodeKeyPress} // מאזין לאנטר עבור צומת
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
                        onKeyDown={handleEdgeFromKeyPress} // מאזין לאנטר כדי לעבור ל־`edgeTo`
                    />
                    <input
                        type="text"
                        value={edgeTo}
                        onChange={(e) => setEdgeTo(e.target.value)}
                        placeholder="To Node"
                        ref={edgeToInput} // רפרנס לשדה `edgeTo`
                        onKeyDown={handleEdgeToKeyPress} // מאזין לאנטר כדי להוסיף קשת
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
