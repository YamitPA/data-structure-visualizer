from flask import Flask, request, jsonify
from flask_cors import CORS  # ייבוא CORS
from data_structures.linked_list import LinkedList  # ייבוא הרשימה המקושרת
from data_structures.queue import Queue  # ייבוא התור


app = Flask(__name__)
CORS(app)  # אפשר CORS עבור היישום Flask

linked_list = LinkedList()  # יצירת מופע של הרשימה המקושרת
queue = Queue() # יצירת מופע של התור

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


if __name__ == '__main__':
    app.run(debug=True)
