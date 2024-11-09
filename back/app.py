from flask import Flask, request, jsonify
from flask_cors import CORS  
from data_structures.linked_list import LinkedList  
from data_structures.queue import Queue  
from data_structures.stack import Stack  
from data_structures.graph import Graph  



app = Flask(__name__)
CORS(app)  # Enabling CORS for the Flask application

linked_list = LinkedList()  # Creating an instance of the linked list
queue = Queue() # Creating an instance of the queue
stack = Stack()  # Creating an instance of the stack
graph = Graph()  # Creating an instance of the graph
bfs_graph = Graph() # Creating an instance for the BFS graph



# ----- Routes for the Linked List -----

@app.route('/list/add', methods=['POST'])
def add_item():
    data = request.json
    linked_list.add(data['value'])
    return jsonify(linked_list.get_list()), 200

@app.route('/list/remove', methods=['DELETE'])
def remove_item():
    data = request.json
    linked_list.remove(data['value'])
    return jsonify(linked_list.get_list()), 200

@app.route('/list', methods=['GET'])
def get_list():
    return jsonify(linked_list.get_list()), 200

@app.route('/list/clear', methods=['DELETE']) # Route to clear the list
def clear_list():
    linked_list.clear() # Clears the linked list
    return jsonify(linked_list.get_list()), 200



# ----- Routes for the Queue -----

@app.route('/queue/enqueue', methods=['POST'])
def enqueue_item():
    data = request.json
    queue.enqueue(data['value'])
    return jsonify(queue.get_queue()), 200

@app.route('/queue/dequeue', methods=['DELETE'])
def dequeue_item():
    try:
        queue.dequeue()
        return jsonify(queue.get_queue()), 200
    except IndexError as e:
        return str(e), 400

@app.route('/queue', methods=['GET'])
def get_queue():
    return jsonify(queue.get_queue()), 200

@app.route('/queue/clear', methods=['DELETE'])
def clear_queue():
    queue.clear()  # Clears the queue
    return jsonify(queue.get_queue()), 200


# ----- Routes for the Stack -----

@app.route('/stack/push', methods=['POST'])
def push_item():
    data = request.json
    stack.push(data['value'])
    return jsonify({'stack': stack.get_stack()}), 200  # Returns the stack after adding the item

@app.route('/stack/pop', methods=['DELETE'])
def pop_item():
    try:
        item = stack.pop()  # Saves the value that was removed
        return jsonify({'item': item, 'stack': stack.get_stack()}), 200  # Returns the removed item and the stack
    except IndexError as e:
        return str(e), 400
    
@app.route('/stack/peek', methods=['GET'])  # Route for peek
def peek_item():
    try:
        top_item = stack.peek()
        return jsonify(top_item), 200
    except IndexError as e:
        return str(e), 400

@app.route('/stack', methods=['GET'])
def get_stack():
    return jsonify(stack.get_stack()), 200

@app.route('/stack/clear', methods=['DELETE'])
def clear_stack():
    stack.clear()  # Clears all items from the stack
    return jsonify(stack.get_stack()), 200




# ----- Routes for the Graph -----

@app.route('/graph/node', methods=['POST'])
def add_node():
    data = request.json
    node = data['node']
    value = data.get('value', None)  # Optional value for the node
    graph.add_node(node, value)
    return jsonify({'nodes': graph.get_nodes(), 'edges': graph.get_edges()}), 200

@app.route('/graph/node/<node>', methods=['DELETE'])
def remove_node(node):
    graph.remove_node(node)
    return jsonify({'nodes': graph.get_nodes(), 'edges': graph.get_edges()}), 200

@app.route('/graph/edge', methods=['POST'])
def add_edge():
    data = request.json
    from_node = data['from']
    to_node = data['to']
    graph.add_edge(from_node, to_node)
    return jsonify({'nodes': graph.get_nodes(), 'edges': graph.get_edges()}), 200

@app.route('/graph/edge', methods=['DELETE'])
def remove_edge():
    data = request.json
    from_node = data['from']
    to_node = data['to']
    graph.remove_edge(from_node, to_node)
    return jsonify({'nodes': graph.get_nodes(), 'edges': graph.get_edges()}), 200

@app.route('/graph', methods=['GET'])
def get_graph():
    return jsonify({'nodes': graph.get_nodes(), 'edges': graph.get_edges()}), 200

@app.route('/graph', methods=['DELETE'])
def delete_graph():
    graph.clear_graph()  # Clears the graph
    return jsonify({'nodes': graph.get_nodes(), 'edges': graph.get_edges()}), 200




# ----- Routes for BFS -----


# Route to get the BFS graph
@app.route('/bfsgraph', methods=['GET'])
def get_bfs_graph():
    return jsonify({'nodes': bfs_graph.get_nodes(), 'edges': bfs_graph.get_edges()}), 200

# Route to add a node in the BFS graph
@app.route('/bfs/node', methods=['POST'])
def add_bfs_node():
    data = request.json
    node = data['node']
    bfs_graph.add_node(node)
    return jsonify({'nodes': bfs_graph.get_nodes()}), 200

# Route to remove a node in the BFS graph
@app.route('/bfs/node/<node>', methods=['DELETE'])
def remove_bfs_node(node):
    bfs_graph.remove_node(node)
    return jsonify({'nodes': bfs_graph.get_nodes(), 'edges': bfs_graph.get_edges()}), 200

# Route to add an edge in the BFS graph
@app.route('/bfs/edge', methods=['POST'])
def add_bfs_edge():
    data = request.json
    from_node = data['from']
    to_node = data['to']
    bfs_graph.add_edge(from_node, to_node)
    return jsonify({'nodes': bfs_graph.get_nodes(), 'edges': bfs_graph.get_edges()}), 200

# Route to remove an edge in the BFS graph
@app.route('/bfs/edge', methods=['DELETE'])
def remove_bfs_edge():
    data = request.json
    from_node = data['from']
    to_node = data['to']
    bfs_graph.remove_edge(from_node, to_node)
    return jsonify({'nodes': bfs_graph.get_nodes(), 'edges': bfs_graph.get_edges()}), 200

# Route to clear the BFS graph
@app.route('/bfs/clear', methods=['DELETE'])
def clear_bfs_graph():
    bfs_graph.clear_graph()
    return jsonify({'nodes': bfs_graph.get_nodes(), 'edges': bfs_graph.get_edges()}), 200

# Route to run BFS on the BFS graph
@app.route('/bfs/run', methods=['POST'])
def run_bfs():
    start_node = request.json.get("start_node")
    visited_nodes = bfs(bfs_graph, start_node)
    return jsonify({"visited_nodes": visited_nodes})

def bfs(graph, start_node):
    visited = []
    queue = [start_node]
    while queue:
        node = queue.pop(0)
        if node not in visited:
            visited.append(node)
            for neighbor in graph.edges[node]:
                if neighbor not in visited:
                    queue.append(neighbor)
    return visited



if __name__ == '__main__':
    app.run(debug=True)
