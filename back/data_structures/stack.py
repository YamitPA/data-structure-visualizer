class Stack:
    def __init__(self):
        # Initializes an empty stack using a list
        self.items = []

    def push(self, item):
        # Add an item to the top of the stack (start of the list)
        self.items.insert(0, item)  # Insert the item at the beginning of the list
        return self.items  # Returns the stack after adding the item

    def pop(self):
        # Remove the top item from the stack
        if not self.is_empty():
            return self.items.pop(0)  # Remove and return the first item (top item)
        else:
            raise IndexError("Stack is empty") # Raise an error if the stack is empty

    def peek(self):
        # Return the top item without removing it
        if not self.is_empty():
            return self.items[0]  # Returns the top item in the stack (first in the list)
        else:
            raise IndexError("Stack is empty") # Raise an error if the stack is empty

    def get_stack(self):
        # Returns all the items in the stack
        return self.items

    def is_empty(self):
        # Checks if the stack is empty
        return len(self.items) == 0

    def clear(self):
        # Clears all the items from the stack
        self.items = []
        return self.items 
