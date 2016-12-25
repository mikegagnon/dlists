
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






