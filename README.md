# Doubly Linked Listst

A mini-course in doubly linked lists in JS for novice programmers.

## Prerequisites

Mastery of [linked lists](https://github.com/mikegagnon/linked-lists/blob/master/README.md)

## Contents

- [Lecture 1. DNode](#lec1)

## <a name="lec1">Lecture 1. DNode</a>

Doubly linked lists are like linked lists (aka singly linked lists), except every node has a `prev` reference and a `next` reference.

<img src="dnodes.png">

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
