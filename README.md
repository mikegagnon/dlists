# Doubly Linked Listst

A mini-course in doubly linked lists in JS for novice programmers.

## Prerequisites

Mastery of [linked lists](https://github.com/mikegagnon/linked-lists/blob/master/README.md)

## Contents

- [Lecture 1. DNode](#lec1)
- [Lecture 2. `insertAfter(...)`](#lec2)
- [Lecture 3. `insertBefore(...)`](#lec3)

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

    prepend(value, head) {

        var newHead = new DNode(value);

        newHead.next = head;
        head.prev = newHead;

        return newHead;
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

## <a name="lec3">Lecture 3. `prepend(...)`</a>

```js
class DNode {
    
    ...
    
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
}

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
```

The algorithmic performance of `append(...)` is *O(1)*.

