
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

    // Creates a new node to hold value, and appends the new node to the end
    // of this list.
    //
    // last is a reference to the last node in the list 
    //
    // Returns a reference to the new last node
    append(value, last) {
        
        var newLast = new DNode(value);

        newLast.prev = last;
        last.next = newLast;

        return newLast;
    }

    prepend(value, head) {

        var newHead = new DNode(value);

        newHead.next = head;
        head.prev = newHead;

        return newHead;
    }
}

// Test for append
var a = new DNode("A");
var b = a.append("B", a);
var c = a.append("C", b);

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

var a = new DNode("A");
var b = a.prepend("B", a);
var c = b.prepend("C", b);

assert(c.value == "C");
assert(c.prev == undefined);
assert(c.next == b);

assert(b.value == "B");
assert(b.prev == c);
assert(b.next == a);

assert(a.value == "A");
assert(a.prev == b);
assert(a.next == undefined);

