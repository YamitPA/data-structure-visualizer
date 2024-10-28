from flask import Flask, request, jsonify
from flask_cors import CORS  # ייבוא CORS
from data_structures.linked_list import LinkedList  # ייבוא הרשימה המקושרת
from data_structures.queue import Queue  # ייבוא התור
from data_structures.stack import Stack  # ייבוא המחסנית
from data_structures.graph import Graph  # ייבוא הגרף



app = Flask(__name__)
CORS(app)  # אפשר CORS עבור היישום Flask

linked_list = LinkedList()  # יצירת מופע של הרשימה המקושרת
queue = Queue() # יצירת מופע של התור
stack = Stack()  # יצירת מופע של המחסנית
graph = Graph()  # יצירת מופע של הגרף


# ----- נתיבים עבור הרשימה המקושרת -----

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

@app.route('/list/clear', methods=['DELETE'])  # ה-route למחיקת הרשימה
def clear_list():
    linked_list.clear()  # הנחה שהוספת שיטה clear למחלקה LinkedList
    return jsonify(linked_list.get_list()), 200



# ----- נתיבים עבור התור -----

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
    queue.clear()  # מחיקת כל הפריטים בתור (אם יש שיטה כזו ב-Queue)
    return jsonify(queue.get_queue()), 200


# ----- נתיבים עבור המחסנית -----

@app.route('/stack/push', methods=['POST'])
def push_item():
    data = request.json
    stack.push(data['value'])
    return jsonify({'stack': stack.get_stack()}), 200  # מחזיר את המחסנית לאחר ההוספה

@app.route('/stack/pop', methods=['DELETE'])
def pop_item():
    try:
        item = stack.pop()  # שמירה על הערך שהוסר
        return jsonify({'item': item, 'stack': stack.get_stack()}), 200  # מחזיר את הערך שהוסר ואת המחסנית
    except IndexError as e:
        return str(e), 400
    
@app.route('/stack/peek', methods=['GET'])  # הוספת נתיב ל-peek
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
    stack.clear()  # מחיקת כל הפריטים במחסנית
    return jsonify(stack.get_stack()), 200




# ----- נתיבים עבור הגרף -----

@app.route('/graph/node', methods=['POST'])
def add_node():
    data = request.json
    node = data['node']
    value = data.get('value', None)  # ערך אופציונלי לצומת
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



if __name__ == '__main__':
    app.run(debug=True)
