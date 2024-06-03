//"Currying" is the ability to take a function that has N arguments and convert it to a function that has a single argument.

// N => 1

// to curry this function, get rid of param `b`
// instead of returning a+b, return a function that takes param `b`
// inside THAT function, we return a + b
function add(a) {
    return function(b) {
        return a + b;
    }
}

// with currying, instead of separating our arguments with comma, we separate them with parenthesis
add(1)(5); // add(1,5)

// add function written as an arrow function
const add2 = (a) => (b) => a + b // (a,b) => a + b 
