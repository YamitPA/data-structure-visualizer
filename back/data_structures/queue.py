class Queue:
    def __init__(self):
        self.items = []

    def enqueue(self, item):
        """מוסיף פריט לתור (בסוף הרשימה)"""
        self.items.append(item)
        return self.items  # מחזיר את התור לאחר הוספת הפריט

    def dequeue(self):
        """מסיר ומחזיר את הפריט הראשון בתור (מההתחלה של הרשימה)"""
        if not self.is_empty():
            return self.items.pop(0)  # הסרה של הפריט הראשון
        else:
            raise IndexError("Queue is empty")

    def get_queue(self):
        """מחזיר את כל הפריטים בתור"""
        return self.items

    def is_empty(self):
        """בודק אם התור ריק"""
        return len(self.items) == 0

    def size(self):
        """מחזיר את מספר הפריטים בתור"""
        return len(self.items)

    def clear(self):
        """מנקה את התור"""
        self.items.clear()