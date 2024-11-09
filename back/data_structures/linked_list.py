class Node:
    def __init__(self, data):
        # Initializes a new node with the given data and sets the next node to None
        self.data = data
        self.next = None

class LinkedList:
    def __init__(self):
        # Initializes an empty linked list with no head node
        self.head = None

    def add(self, data):
        # Add a new node with the given data at the beginning of the list
        new_node = Node(data)
        new_node.next = self.head # Set the new node's next to the current head
        self.head = new_node # Make the new node the head of the list

    def remove(self, data):
        # Remove the first occurrence of a node with the given data
        current = self.head
        previous = None
        while current:
            if current.data == data: # Node found
                if previous:
                    previous.next = current.next # Bypass the current node
                else:
                    self.head = current.next # If node is the head, update the head
                return True
            previous = current
            current = current.next
        return False  # Return False if the node with the given data was not found

    def get_list(self):
        # Return a list of all the elements in the linked list
        current = self.head
        elements = []
        while current:
            elements.append(current.data) # Add current node's data to elements list
            current = current.next # Move to the next node
        return elements
    
    def clear(self):
        self.head = None  # Removes all nodes by clearing the head reference
    