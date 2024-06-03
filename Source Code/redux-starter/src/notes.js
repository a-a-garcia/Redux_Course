function sayHello() {
    return "Hello World";
}

// `greet` and `sayHello2` are "Higher-order functions"  
// A higher-order function is a function that takes a function as an argument, returns a function, or both!
function greet(fn) {
    console.log(fn());
}

function sayHello2() {
    // functions can return other functions (anonymous included)
    return function() {
        return "Hello World"
    }
}

// if we call sayHello(), we will get a function back, (which can be stored in a variable)

let fn2 = sayHello();

let message = fn2;


// Not calling the function, we just want to pass a reference to it.
// we can treat functions like any other type of object.
let fn = sayHello

// fn is now an alias for sayHello
fn() // "Hello World"
sayHello() // "Hello World"

// we can also pass a function as an argument to another function
function greet2(fnMessage) {
    // this will log the returned value of the fnMessage function.
    console.log(fnMessage())
}

greet2(sayHello);


// --------

let numbers = [1,2,3]
// map is an example of a higher order function, because it takes a function as an argument
numbers.map(number => number * 2)
// setTimeout is another example
setTimeout(() => console.log("Hello", 1000))

import { countBy } from 'lodash';
// ----

// imports from lodash to get rid of unnecessary parenthesis
import {compose, pipe} from 'lodash/fp';

let input = "   JavaScript  ";
let output = "<div>" + input.trim() + "</div>";

// If we wanted to do the above with functional programming... we need to create small functions
// trim
// wrapInDiv

const trim = str => str.trim();
// const wrapInDiv = str => `<div>${str}</div>`
// const wrapInSpan = str => `<span>${str}</span>`
// to avoid duplication
// const wrap = (type, str) => `<${type}>${str}</${type}>}`
// curried version
const wrap = type => str => `<${type}>${str}</${type}>`
// Now, when we pass "div" to wrap, we get a function (str => `<${type}>${str}</${type}>}`), not a string anymore, which allows pipe to work.
const toLowerCase = str => str.toLowerCase();

// compose is a higher order function. we just pass the references to the functions
// const transform = compose(wrapInDiv, toLowerCase, trim)

// we can use pipe to list our functions in a more readable order, left to right.
const transform = pipe(trim, toLowerCase, wrap("div"))
// passing wrap("div") (without currying) will not work because every argument to the pipe function must be a function.
// "Currying" is something that can solve this issue of having a function with 2 params but we need it to only have 1 for pipe

// the result of this console.log will be `<javascript>undefined</javascript>}`
// Why? pipe function creates a "pipeline" - the output for each function becomes the input for the next function
// the result of toLowerCase gets passed as the first argument, `type` to the wrap function, leaving `str` to be undefined
console.log(transform(input))

// called functional composition
const result = wrap(toLowerCase(trim(input)))

// ------

// 10 - updating objects

const person = { 
    name: "John" ,
    address: {
        country: "USA",
        city: "San Fran"
    }

}
// if you want to update this object...
// make a copy, update the copy

// 1 - use Object.assign 
// const updated = Object.assign({}, person, {name: "Bob", age: 30})

// 2 - (Better) use the spread operator
const updated = {
    ...person, 
    //creating a new reference (deep copy)
    address: {
        ...person.address,
        city: "Houston"
    },
    name: "Bob"
}
updated.address.city = "New York"

// Note - both methods create a shallow copy.
// The city for both of these will be "New York"
// The address property is set to an object. Both `updated` and `person` point to the same reference. Changing one ref will change the other.
console.log(person)
console.log(updated)

// 11 - Updating Arrays
const numbers2 = [1,2,3];

// Adding

// to end
const added = [...numbers2, 4];

// to beg
const added2 = [4, ...numbers2];

// to specific index
// find the index where you want to insert
const index = numbers2.indexOf(2);
// copy all the numbers before 2. Can use slice. start index 0 up to the element at `index` (but excluding the actual index.)
// slice returns new array to have to spread that array or you'll end up with nested arrays.
const added3 = [
    ...numbers2.slice(0, index),
    4,
    ...numbers2.slice(index)
]
console.log(added3)

//Removing
const removed = numbers2.filter(n => n !== 2);

console.log(removed)

//Updating
// if we were updating an object, would have to use the spread operator
const updated2 = numbers2.map(n => n === 2 ? 20 : n)

console.log(updated2);

// ------

// 13 - Immutable.js

// Map from immutable creates a hash map, container with key value pairs
import { Map } from 'immutable';

// Maps are immutable so, must return in the publish function and save to a variable
let book = Map({ title: "Harry Potter" })

function publish(book) {
    // book.isPublished = true
    return book.set("isPublished", true)
}

book = publish(book)

// if using a Map cannot get properties via `.` ie book.title, need to use `get` method
// It's difficult to integrate this API with other libraries that expect plain JS objects. so you can also use the `.toJS()`
console.log(book.toJS())

// 14 - Immer
// Immer is preferred by Mosh

import { produce } from 'immer'

let book2 = { title: "Harry Potter 2"};

function publish2(book) {
    // don't want to mutate the object
    // book2.isPublished = true;
    // produce takes 2 args - 1 initial state 2 - function that specifies our mutations
    return produce(book2, draftBook => {
        draftBook.isPublished = true;
    })
}

let updatedBook = publish2(book);

//you'll note that the original book2 was not mutated.
console.log(book2)
console.log(updatedBook)