class Graph:
    def __init__(self):
        # מאחסן את הצמתים והקשתות
        self.nodes = {}  # כל צומת יהיה מילון עם שם וערך
        self.edges = {}  # מיפוי של שמות צמתים לכל הקשתות שלהם

    def add_node(self, node, value=None):
        """הוספת צומת חדש עם ערך (אם ניתן) לגרף"""
        if node not in self.nodes:
            self.nodes[node] = value  # שומר את שם הצומת והערך שלו
            self.edges[node] = []
        else:
            print(f"Node {node} already exists")

    def remove_node(self, node):
        """הסרת צומת מהגרף"""
        if node in self.nodes:
            self.nodes.pop(node, None)  # מסיר את הצומת עצמו
            self.edges.pop(node, None)  # מסיר את הקשתות היוצאות ממנו
            
            # הסרת הקשתות הנכנסות לצומת
            for key in self.edges:
                self.edges[key] = [edge for edge in self.edges[key] if edge != node]
        else:
            print(f"Node {node} does not exist")

    def add_edge(self, from_node, to_node):
        """הוספת קשת בין שני צמתים"""
        if from_node in self.nodes and to_node in self.nodes:
            self.edges[from_node].append(to_node)
        else:
            print("One or both of the nodes do not exist")

    def remove_edge(self, from_node, to_node):
        """הסרת קשת בין שני צמתים"""
        if from_node in self.edges and to_node in self.edges[from_node]:
            self.edges[from_node].remove(to_node)
        else:
            print("Edge does not exist")

    def get_nodes(self):
        """קבלת כל הצמתים והערכים שלהם בגרף"""
        return self.nodes  # מחזיר את המילון של הצמתים עם הערכים

    def get_edges(self):
        """קבלת כל הקשתות בגרף"""
        return [(from_node, to_node) for from_node, to_list in self.edges.items() for to_node in to_list]

    def clear_graph(self):
        """מחיקת כל הצמתים והקשתות מהגרף"""
        self.nodes.clear()  # מסיר את כל הצמתים
        self.edges.clear()  # מסיר את כל הקשתות

    def __repr__(self):
        """ייצוג הגרף בצורה קריאה"""
        result = "Graph:\n"
        for node, connections in self.edges.items():
            node_value = f" (Value: {self.nodes[node]})" if self.nodes[node] is not None else ""
            result += f"{node}{node_value} -> {', '.join(map(str, connections))}\n"
        return result
