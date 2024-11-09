class Graph:
    def __init__(self):
        self.nodes = {}  # Dictionary to store each node with its value
        self.edges = {}  # Mapping of node names to their edges

    def add_node(self, node, value=None):
        # Add a new node with an optional value to the graph
        if node not in self.nodes:
            self.nodes[node] = value  # Save node name and value
            self.edges[node] = []
        else:
            print(f"Node {node} already exists")

    def remove_node(self, node):
        if node in self.nodes:
            self.nodes.pop(node, None)  # Remove the node itself
            self.edges.pop(node, None)  # Remove outgoing edges
            
            # Remove incoming edges to the node
            for key in self.edges:
                self.edges[key] = [edge for edge in self.edges[key] if edge != node]
        else:
            print(f"Node {node} does not exist")

    def add_edge(self, from_node, to_node):
        # Add an edge between two nodes
        if from_node in self.nodes and to_node in self.nodes:
            self.edges[from_node].append(to_node)
        else:
            print("One or both of the nodes do not exist")

    def remove_edge(self, from_node, to_node):
        # Remove an edge between two nodes
        if from_node in self.edges and to_node in self.edges[from_node]:
            self.edges[from_node].remove(to_node)
        else:
            print("Edge does not exist")

    def get_nodes(self):
        # Get all nodes and their values in the graph
        return self.nodes  # Return the dictionary of nodes with values

    def get_edges(self):
        # Get all edges in the graph
        return [(from_node, to_node) for from_node, to_list in self.edges.items() for to_node in to_list]

    def clear_graph(self):
        # Remove all nodes and edges from the graph
        self.nodes.clear()  
        self.edges.clear() 

    def __repr__(self):
        # Readable representation of the graph
        result = "Graph:\n"
        for node, connections in self.edges.items():
            node_value = f" (Value: {self.nodes[node]})" if self.nodes[node] is not None else ""
            result += f"{node}{node_value} -> {', '.join(map(str, connections))}\n"
        return result
