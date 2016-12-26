# Doubly Linked Lists

A mini-course in doubly linked lists in JS for novice programmers.

## Prerequisites

Mastery of [linked lists](https://github.com/mikegagnon/linked-lists/blob/master/README.md)

## Contents

- Part 1. Methods for doubly linked lists
    - [Lecture 1. DNode](#lec1)
    - [Lecture 2. `insertAfter(...)`](#lec2)
    - [Lecture 3. `insertBefore(...)`](#lec3)
    - [Lecture 4. `append(...)`](#lec4)
        - Comparison to singly linked list
    - [Lecture 5. `prepend(...)`](#lec5)
    - [Lecture 6. `remove(...)`](#lec6)
    - [Lecture 7. `removeFirst(...)`](#lec7)
    - [Lecture 8. `removeLast(...)`](#lec8)
    - [Lecture 9. `removeValue(...)`](#lec9)
    - [Lecture 10. `findSmallest(...)`](#lec10)
    - [Lecture 11. `sort(...)`](#lec11)
- Part 2. Queues and stacks
    - [Lecture 12. The queue datastructure](#lec12)
    - [Lecture 13. The stack datastructure](#lec13)

## Part 1. Methods for doubly linked lists

## <a name="lec1">Lecture 1. DNode</a>

Doubly linked lists are like linked lists (aka singly linked lists), except every node has a `prev` reference and a `next` reference.

<img src="dnodes.png">

The clients must keep track of `head` and `last` themselves.

### `dlists.js`

Here's the class definition for DNode:

```js
class DNode {
    constructor(value) {
        this.value = value;
        this.prev = undefined;
        this.next = undefined;
    }
}
```

### `index.html`

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Doubly Linked Lists</title>
    <script src="dlists.js"></script>
  </head>
</html>
```

## <a name="lec2">Lecture 2. `insertAfter(...)`</a>

```js
class DNode {
    
    ...

    // Creates a new node to hold value, then inserts the new node after
    // this node.
    //
    // Returns a reference to the new node
    insertAfter(value) {
        
        var newNode = new DNode(value);

        newNode.next = this.next;
        newNode.prev = this;

        if (newNode.next != undefined) {
            newNode.next.prev = newNode;
        }

        this.next = newNode;

        return newNode;
    }
}

// Create list: A, D, B, E, C
var a = new DNode("A");
var b = a.insertAfter("B");
var c = b.insertAfter("C");
var d = a.insertAfter("D");
var e = b.insertAfter("E");

assert(a.value == "A");
assert(a.prev == undefined);
assert(a.next == d);

assert(d.value == "D");
assert(d.prev == a);
assert(d.next == b);

assert(b.value == "B");
assert(b.prev == d);
assert(b.next == e);

assert(e.value == "E");
assert(e.prev == b);
assert(e.next == c);

assert(c.value == "C");
assert(c.prev == e);
assert(c.next == undefined);
```

The algorithmic performance of `insertAfter(...)` is *O(1)*.

## <a name="lec3">Lecture 3. `insertBefore(...)`</a>

```js
class DNode {
    
    ...
    
    // Creates a new node to hold value, then inserts the new node before
    // this node.
    //
    // Returns a reference to the new node
    insertBefore(value) {

        var newNode = new DNode(value);

        newNode.next = this;
        newNode.prev = this.prev;

        if (newNode.prev != undefined) {
            newNode.prev.next = newNode;
        }

        this.prev = newNode;

        return newNode;
    }
}

// Create list: C, D, B, E, A
var a = new DNode("A");
var b = a.insertBefore("B");
var c = b.insertBefore("C");
var d = b.insertBefore("D");
var e = a.insertBefore("E");

assert(c.value == "C");
assert(c.prev == undefined);
assert(c.next == d);

assert(d.value == "D");
assert(d.prev == c);
assert(d.next == b);

assert(b.value == "B");
assert(b.prev == d);
assert(b.next == e);

assert(e.value == "E");
assert(e.prev == b);
assert(e.next == a);

assert(a.value == "A");
assert(a.prev == e);
assert(a.next == undefined);
```

The algorithmic performance of `insertBefore(...)` is *O(1)*.

## <a name="lec4">Lecture 4. `append(...)`</a>

```js
class DNode {
    
    ...
    
    // Creates a new node to hold value, then appends the new node to 
    // the end of the list.
    //
    // this node __must__ be the last node in the list
    // 
    // Returns a reference to the new node
    append(value) {
        if (this.next == undefined) {
            return this.insertAfter(value);
        } else {
            console.error("this node __must__ be the last node in the list");
        }
    }
}

// Test for append
// Create a list A, B, C
var a = new DNode("A");
var b = a.append("B");
var c = b.append("C");

assert(a.value == "A");
assert(a.prev == undefined);
assert(a.next == b);

assert(b.value == "B");
assert(b.prev == a);
assert(b.next == c);

assert(c.value == "C");
assert(c.prev == b);
assert(c.next == undefined);
```

The algorithmic performance of `append(...)` is *O(1)*.

### Comparison to singly linked list

The `append(...)` method for a singly linked list is *O(N)*.

The `append(...)` method for a doubly linked list is *O(1)*.

This dramatic difference in performance is the primary motivator for using
doubly linked lists instead of singly linked lists --- at least for our purposes.

In Part 2, `append(...)` turns out to be an important method that is used by the `Queue` class.

## <a name="lec5">Lecture 5. `prepend(...)`</a>

```js
class DNode {
    
    ...
    
    // Creates a new node to hold value, then prepend the new node to 
    // the head of the list.
    //
    // this node __must__ be the first node in the list
    // 
    // Returns a reference to the new node
    prepend(value) {
        if (this.prev == undefined) {
            return this.insertBefore(value);
        } else {
            console.error("this node __must__ be the first node in the list");
        }
    }
}

// Test for prepend
// Create a list C, B, A
var a = new DNode("A");
var b = a.prepend("B");
var c = b.prepend("C");

assert(c.value == "C");
assert(c.prev == undefined);
assert(c.next == b);

assert(b.value == "B");
assert(b.prev == c);
assert(b.next == a);

assert(a.value == "A");
assert(a.prev == b);
assert(a.next == undefined);
```

The algorithmic performance of `prepend(...)` is *O(1)*.

## <a name="lec6">Lecture 6. `remove(...)`</a>

```js

class DNode {
    
    ...
    
    // Removes this node from the list.
    // 
    // Returns [v, prev, next] where:
    //      - v is the value that was removed
    //      - prev is this node's previous node
    //      - next is this node's next node
    remove() {
        if (this.prev != undefined) {
            this.prev.next = this.next;
        }

        if (this.next != undefined) {
            this.next.prev = this.prev;
        }

        return [this.value, this.prev, this.next];
    }
}

// Test for remove
// Create a list A, B, C
function newList() {
    var a = new DNode("A");
    var b = a.append("B");
    var c = b.append("C");
    return [a, b, c];
}

// Remove A, then B, then C
var [a,b,c] = newList();

var [v, prev, next] = a.remove();
assert(v == "A");
assert(prev == undefined);
assert(next == b);

var [v, prev, next] = b.remove();
assert(v == "B");
assert(prev == undefined);
assert(next == c);

var [v, prev, next] = c.remove();
assert(v == "C");
assert(prev == undefined);
assert(next == undefined);

// Remove B
var [a,b,c] = newList();

var [v, prev, next] = b.remove();
assert(v == "B");
assert(prev == a);
assert(next == c);

// Remove C, then B, then A
var [a,b,c] = newList();

var [v, prev, next] = c.remove();
assert(v == "C");
assert(prev == b);
assert(next == undefined);

var [v, prev, next] = b.remove();
assert(v == "B");
assert(prev == a);
assert(next == undefined);

var [v, prev, next] = a.remove();
assert(v == "A");
assert(prev == undefined);
assert(next == undefined);
```

The algorithmic performance of `remove(...)` is *O(1)*.

## <a name="lec7">Lecture 7. `removeFirst(...)`</a>

```js
class DNode {
    
    ...

    // Removes the first node from the list.
    //
    // this node __must__ be the first node in the list
    //
    // Returns [v, head], where v is the value of the removed node, and
    // head is a reference for the new head node
    removeFirst() {
        if (this.prev == undefined) {
            var [v, _, newHead] = this.remove();
            return [v, newHead];
        } else {
            console.error("this node __must__ be the first node in the list");
        }
    }
}

// Test for removeFirst
// Create a list A, B, C
var a = new DNode("A");
var b = a.append("B");
var c = b.append("C");

var [aValue, newHead] = a.removeFirst();
assert(aValue == "A");
assert(b == newHead);
assert(newHead.prev == undefined);

var [bValue, newHead] = newHead.removeFirst();
assert(bValue == "B");
assert(c == newHead);
assert(newHead.prev == undefined);

var [cValue, newHead] = newHead.removeFirst();
assert(cValue == "C");
assert(newHead == undefined);
```

The algorithmic performance of `removeFirst(...)` is *O(1)*.

## <a name="lec8">Lecture 8. `removeLast(...)`</a>

```js
class DNode {
    
    ...

    // Removes the last node from the list.
    //
    // this node __must__ be the last node in the list
    //
    // Returns [v, last], where v is the value of the removed node, and
    // last is a reference for the new last node
    removeLast() {
        if (this.next == undefined) {
            var [v, newLast, _] = this.remove();
            return [v, newLast];
        } else {
            console.error("this node __must__ be the last node in the list");
        }
    }
}

// Test for removeLast
// Create a list A, B, C
var a = new DNode("A");
var b = a.append("B");
var c = b.append("C");

var [cValue, newLast] = c.removeLast();
assert(cValue == "C");
assert(b == newLast);
assert(newLast.next == undefined);

var [bValue, newLast] = newLast.removeLast();
assert(bValue == "B");
assert(a == newLast);
assert(newLast.next == undefined);

var [aValue, newLast] = newLast.removeLast();
assert(aValue == "A");
assert(newLast == undefined);

```

The algorithmic performance of `removeLast(...)` is *O(1)*.

## <a name="lec9">Lecture 9. `removeValue(...)`</a>

```js
class DNode {
    
    ...

    // Deletes the first node with the specified value.
    // It is an error if value is not found in the list.
    //
    // Returns [head, last], where
    //   head is the head of the new list
    //   last is the last node of the new list
    //
    // Arguments:
    //   value, the value to search for
    //   head, a reference to the first node in the list
    //   last, a reference to the last node in the list
    removeValue(value, head, last) {

        // Base Case 1: When we have found the sought-after value
        if (this.value == value) {

            if (this.prev == undefined) {
                head = this.next;
            }

            if (this.next == undefined) {
                last = this.prev;
            }

            this.remove();

            return [head, last];
        }
        
        // Base Case 2: When we have reached the end of the list
        else if (this.next == undefined) {
            console.error("The list did not contain the value we're looking for");
        }
        
        // Recursive case
        else {
            return this.next.removeValue(value, head, last);
        }

    }
}

// Test for removeValue(...)
var [a,b,c] = newList();

// remove first
var [newHead, newLast] = a.removeValue("A", a, c);
assert(newHead == b);
assert(newLast == c);
assert(b.prev == undefined);

// remove last
var [newHead, newLast] = b.removeValue("C", b, c);
assert(newHead == b);
assert(newLast == b);
assert(b.prev == undefined);

// remove middle
var [a,b,c] = newList();

var [newHead, newLast] = a.removeValue("B", a, c);
assert(newHead == a);
assert(newLast == c);
assert(a.next == c);
assert(c.prev == a);

```

The algorithmic performance of `removeValue(...)` is *O(N)*.

## <a name="lec10">Lecture 10. `findSmallest(...)`</a>

```js
class DNode {
    
    ...
    
    // Finds and returns the smallest value in this list
    findSmallest() {

        // Base Case: When we have reached the end of the list
        if (this.next == undefined) {
            return this.value;
        }
        
        // Recursive case
        else {
            var smallest = this.next.findSmallest();

            if (this.value < smallest) {
                return this.value;
            } else {
                return smallest;
            }
        }
    }
 }
 
 // Test findSmallest(...)
var one = new DNode("1");
var two = one.append("2");
var three = two.append("3");
assert(one.findSmallest() == "1");

var two = new DNode("2");
var one = two.append("1");
var three = one.append("3");
assert(two.findSmallest() == "1");

var two = new DNode("2");
var three = two.append("3");
var one = three.append("1");
assert(two.findSmallest() == "1");
```

The algorithmic performance of `findSmallest(...)` is *O(N)*.

## <a name="lec11">Lecture 11. `sort(...)`</a>

```js
class DNode {
    
    ...

    // Sorts the list in ascending order.
    //
    // Arguments: 
    //   head, a reference to the first node in the list
    //   last, a reference to the last node in the list
    //
    // Returns the head of the new list.
    sort(head, last) {

        // Base case
        if (this.next == undefined) {
            return this;
        }

        // Recursive case
        else {
            var smallest = this.findSmallest();
            var [sublist, _] = this.removeValue(smallest, head, last);
            var sortedSublist = sublist.sort();
            return sortedSublist.prepend(smallest);
        }
    }
}

// Test sort()
var one = new DNode(1);
var two = one.append(2);
var three = two.append(3);
var sorted = one.sort(one, three);

aNode = sorted;
bNode = aNode.next;
cNode = bNode.next;

assert(aNode.value == 1);
assert(bNode.value == 2);
assert(cNode.value == 3);
assert(cNode.next == undefined);


var two = new DNode(2);
var one = two.append(1);
var three = one.append(3);
var sorted = two.sort(two, three);

aNode = sorted;
bNode = aNode.next;
cNode = bNode.next;

assert(aNode.value == 1);
assert(bNode.value == 2);
assert(cNode.value == 3);
assert(cNode.next == undefined);


var two = new DNode(2);
var three = two.append(3);
var one = three.append(1);
var sorted = two.sort(two, one);

aNode = sorted;
bNode = aNode.next;
cNode = bNode.next;

assert(aNode.value == 1);
assert(bNode.value == 2);
assert(cNode.value == 3);
```

The algorithmic performance of `sort(...)` is *O(N^2)*.

## Part 2. Queues and stacks

## <a name="lec12">Lecture 12. The queue data structure</a>

A queue is a simple, fundmental, and useful data structure. It is often implemented using a linked list (in our implementation we use a doubly linked list).

A queue is an object that has three methods:

- `queue.enqueue(value)` appends `value` to queue's list
- `queue.dequeue()` removes the first `value` from the queue's list, and returns it
- `isEmpty()` returns true if, and only if, the queue's list is empty

For example:

```
var q = new Queue();

q.enqueue(1);
q.enqueue(2);
q.enqueue(3);

var value = q.dequeue();
assert(value == 1);

q.enqueue(4);

var value = q.dequeue();
assert(value == 2);

var value = q.dequeue();
assert(value == 3);

var value = q.dequeue();
assert(value == 4);
```

A queue is the natural datastructure for reprenting a line of people waiting to get on a bus:

- You step in line via the `enqueue` method
- When it is your turn, you step out of the line via the `dequeue` method

A queue is said to be a FIFO data structure, which stands for First In, First Out. The first person to step in line is also the first person to step out of line.

In a future mini course, and also in a future project, we will use queues to accomplish amazing feats!

### Queue implementation

Here is a complete queue implementation.

```js
class Queue {
    constructor() {
        this.head = undefined;
        this.last = undefined;
    }

    enqueue(value) {
        if (this.head == undefined) {
            this.head = this.tail = new DNode(value);
        } else {
            this.tail = this.tail.append(value);
        }
    }

    dequeue() {
        if (this.head == undefined) {
            console.error("Cannot dequeue an empty queue");
        } else {
            var [value, newHead] = this.head.removeFirst();
            this.head = newHead;

            if (this.head == undefined) {
                this.tail = undefined;
            }

            return value;
        }
    }

    isEmpty() {
        return this.head == undefined;
    }
}

// Test for Queue
var q = new Queue();
assert(q.isEmpty());
q.enqueue(1);
assert(!q.isEmpty());
var value = q.dequeue();
assert(value == 1);
assert(q.isEmpty());

q.enqueue(1);
assert(!q.isEmpty());
q.enqueue(2);
assert(!q.isEmpty());
var value = q.dequeue();
assert(value == 1)
assert(!q.isEmpty());
var value = q.dequeue();
assert(value == 2)
assert(q.isEmpty());

q.enqueue(1);
assert(!q.isEmpty());
q.enqueue(2);
assert(!q.isEmpty());
q.enqueue(3);
var value = q.dequeue();
assert(value == 1)
assert(!q.isEmpty());
var value = q.dequeue();
assert(value == 2)
assert(!q.isEmpty());
var value = q.dequeue();
assert(value == 3)
assert(q.isEmpty());
```

### Efficiency

Queues are efficient.

The algorithmic performance of `enqueue(...)` is *O(1)*.

The algorithmic performance of `dequeue(...)` is *O(1)*.

The algorithmic performance of `isEmpty(...)` is *O(1)*.



