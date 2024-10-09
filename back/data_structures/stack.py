class Stack:
    def __init__(self):
        self.items = []

    def push(self, item):
        """מוסיף פריט למחסנית (להתחלה של הרשימה)"""
        self.items.insert(0, item)  # הוסף את הפריט לראש הרשימה
        return self.items  # מחזיר את המחסנית לאחר הוספת הפריט

    def pop(self):
        """מסיר את הפריט העליון במחסנית"""
        if not self.is_empty():
            return self.items.pop(0)  # הסר את הפריט הראשון שנכנס
        else:
            raise IndexError("Stack is empty")

    def peek(self):
        """מחזיר את הפריט העליון מבלי להסיר אותו"""
        if not self.is_empty():
            return self.items[0]  # מחזיר את הפריט האחרון ברשימה
        else:
            raise IndexError("Stack is empty")

    def get_stack(self):
        """מחזיר את כל הפריטים במחסנית"""
        return self.items

    def is_empty(self):
        """בודק אם המחסנית ריקה"""
        return len(self.items) == 0

    def clear(self):
        """מנקה את כל הפריטים מהמחסנית"""
        self.items = []
        return self.items  # מחזיר מחסנית ריקה
