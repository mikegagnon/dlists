
function assert(condition) {
    if (!condition) {
        console.error("Test failed");
    }
}

class DNode {
    constructor(value) {
        this.value = value;
        this.prev = undefined;
        this.next = undefined;
    }

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

// Test for insertAfter
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

// Test for insertBefore
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
