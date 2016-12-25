# Doubly Linked Listst

A mini-course in doubly linked lists in JS for novice programmers.

## Prerequisites

Mastery of [linked lists](https://github.com/mikegagnon/linked-lists/blob/master/README.md)

## Contents

- [Lecture 1. DNode](#lec1)

## <a name="lec1">Lecture 1. DNode</a>

Doubly linked lists are like linked lists (aka singly linked lists), except every node has a `prev` reference and a `next` reference.

<img src="dnodes.png">

The clients keep track of `head` and `last` themselves.

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

## <a name="lec2">Lecture 2. `append(...)`</a>

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
