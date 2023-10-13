/**
 * Class to represent a Node for a DoublyLinkedList.
 */
class ListNode {
    /**
     * Executed when the new keyword is used to construct a new node instance.
     * @param {any} data The data the new node will store.
     */
    constructor(data) {
        this.data = data;
        this.next = null;
        this.prev = null;
    }
}

/**
 * A class to represent a doubly linked list and contain all of it's methods.
 * A doubly linked list is a singly linked list that can be traversed in both
 * directions.
 */
class DoublyLinkedList {
    /**
     * Executed when the new keyword is used to construct a new DoublyLInkedList
     * instance that inherits these methods and properties.
     */
    constructor() {
        this.head = null;
        this.tail = null;
    }

    isEmpty() {
        return this.head === null;
    }
    toArray() {
        const vals = [];
        let runner = this.head;

        while (runner) {
            vals.push(runner.data);
            runner = runner.next;
        }
        return vals;
    }

    insertAtBack(data) {
        const newTail = new ListNode(data);

        if (this.isEmpty()) {
            // if no head set the newTail to be both the head and the tail
            this.head = newTail;
            this.tail = newTail;
        } else {
            this.tail.next = newTail;
            newTail.prev = this.tail;

            this.tail = newTail;
        }
        return this;
    }

    /**
     * Adds all the given items to the back of this list.
     * @param {Array<any>} items Items to be added to the back of this list.
     * @returns {DoublyLinkedList} This list.
     */
    insertAtBackMany(items = []) {
        items.forEach((item) => this.insertAtBack(item));
        return this;
    }
    // Base case, insert only once
    // Edge Case 1: insertAfter Head?
    // Edge Case 2: insertAfter Tail?
    // What if we want to insert more than once?
    /**
     * Inserts a new node with the given newVal after the node that has the
     * given targetVal as it's data.
     * - Time: O(?).
     * - Space: O(?).
     * @param {any} targetVal The node data to find.
     * @param {any} newVal Data for the new node.
     * @returns {boolean} Indicates if the new node was added.
     */
    // 1. Create the new node
    // 2. search for the targetVal by loop through the list (while loop)
    // 3. when the targetVal is found, move around the pointers

    insertAfter(targetVal, newVal) {
        //turn the data into a new node
        let newNode = new ListNode(newVal);
        //check if empty
        if (this.isEmpty()) {
            return false;
        }
        // iterate through the list using while loop

        let current = this.head;

        while (current) {
            //test current node data to match against targetVal (finding node equal to targetVal)
            if (current.data == targetVal) {
                // and set pointers-insert the new node
                newNode.next = current.next;
                newNode.prev = current;
                // check if targetVal is at the tail
                if (current.next) {
                    current.next.prev = newNode;
                } else {
                    this.tail = newNode; // newNode becomes the tail
                }
                // targetVal will now point to the newNode
                current.next = newNode;
                return true; // insert successful
            }
            // current was not equal to the target value so move on
            current = current.next;
        }
    }

    /**
     * Inserts a new node with the given newVal before the node that has the
     * given targetVal as it's data.
     * - Time: O(?).
     * - Space: O(?).
     * @param {any} targetVal The node data to find.
     * @param {any} newVal Data for the new node.
     * @returns {boolean} Indicates if the new node was added.
     */
    insertBefore(targetVal, newVal) {
        let newNode = new Listnode(newVal);
        if (this.isEmpty()) {
            return false;
        }
        let current = this.head;
        while (current) {
            if (current.data == targetVal) {
                //swapped from above next vs prev
                newNode.next = current;
                newNode.prev = current.prev;
                if (current.prev) {
                    current.prev.next = newNode;
                } else {
                    this.head = newNode;
                }
                current.prev = newNode;
                return true;
            }
            current = current.next;
        }
    }

    /**
     * Finds the given node in this list and removes it.
     * - Time: O(1) constant.
     * - Space: O(1) constant.
     * @param {DLLNode} node A node in this list.
     * @returns {DoublyLinkedList} This list.
     */
    removeData(data) {
        let current = this.head;

        while (current) {
            if (current.data === data) {
                if (current.prev) {
                    current.prev.next = current.next;
                } else {
                    // If the target node is the head, update the head to the next node.
                    this.head = current.next;
                }

                if (current.next) {
                    current.next.prev = current.prev;
                } else {
                    // If the target node is the tail, update the tail to the previous node.
                    this.tail = current.prev;
                }

                // Set the target node's next and prev pointers to null to disconnect it.
                current.next = null;
                current.prev = null;
                return this;
            }

            current = current.next;
        }

        // If the node with the specified data value is not found, return the original list.
        return this;
    }
}
const list1 = new DoublyLinkedList();
list1.insertAtBackMany([5, 7, 1, 4, 7]);
console.log(list1.toArray());
