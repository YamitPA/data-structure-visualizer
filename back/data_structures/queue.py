class Queue:
    def __init__(self):
        # Initializes an empty queue using a list
        self.items = []

    def enqueue(self, item):
        # Add an item to the end of the queue (list)
        self.items.append(item)
        return self.items  # Returns the queue after adding the item
    
    def dequeue(self):
        # Remove and return the first item from the queue (from the front of the list)
        if not self.is_empty():
            return self.items.pop(0)  # Remove and return the first item
        else:
            raise IndexError("Queue is empty") # Raise an error if the queue is empty

    def get_queue(self):
        # Returns all the items in the queue
        return self.items

    def is_empty(self):
        # Checks if the queue is empty
        return len(self.items) == 0

    def size(self):
        # Returns the number of items in the queue
        return len(self.items)

    def clear(self):
        # Clears the queue by removing all items
        self.items.clear()