---
title: Closures in javascript
date: '2026-05-06'
excerpt: Deep dive into closures in javascript.
image: https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuHnJDLOcdm_0b6N6kNj-1OvO9KhKYgqIy0w&s
---

# What are closures in javascript?

You know how in javascript we create a function inside a function ?
Let's say that inner function has access to the outer function's variables.

## Where to use closure?

Some of the usecases for closure includes
- hiding of implementation (like a private class members in oops)
- multiplier
- memoization 
- currying

Let's deep dive into each usecase.

# 1. Hiding of implementation (like a private class members in oops)

```js
function createCounter() {
    let count = 0;

    return function () {
        return count++;
    }
};
const counter = createCounter();
console.log(counter()); // 0
console.log(counter()); // 1
console.log(counter()); // 2
```
