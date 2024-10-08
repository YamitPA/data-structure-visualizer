from flask import Flask, request, jsonify
from flask_cors import CORS  # ייבוא CORS
from data_structures.linked_list import LinkedList  # ייבוא הרשימה המקושרת

app = Flask(__name__)
CORS(app)  # אפשר CORS עבור היישום Flask

linked_list = LinkedList()  # יצירת מופע של הרשימה המקושרת

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


if __name__ == '__main__':
    app.run(debug=True)
