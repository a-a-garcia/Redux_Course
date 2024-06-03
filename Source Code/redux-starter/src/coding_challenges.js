// 1. Write code in a functional style 
let input = { tag: "JAVASCRIPT" }

// function lowercase(input) {
//     return input.tag.toLowerCase();
// }

// function transform(input) {
//     const lowercased = lowercase(input)
//     return `(${lowercased})`
// }

// console.log(transform(input))

// const lowercase = str => str.toLowerCase();
// const getTag = obj => obj.tag;
// const wrapInParenthesis = str => `(${str})`;

// const transform = input => wrapInParenthesis(lowercase(getTag(input)))

// console.log(transform(input))

// WITH IMMER
// import { produce } from "immer"

// const lowercase = str => str.toLowerCase();

// const transform = produce(input => {
//     const lowercased = lowercase(input.tag)
//     return `(${lowercased})`;
// })

// console.log(transform(input))

// 2. Recipe object
const recipe = {
    name: "Spaghetti Bolognese",
    ingredients: ["egg", "salt"]
}

//Add a new ingredient
const addCream = {
    ...recipe,
    ingredients: [...recipe.ingredients, "cream"]
}
console.log(addCream)

const replaceEgg = {
    ...recipe,
    ingredients: [...recipe.ingredients.map(ingredient => ingredient === 'egg' ? ingredient = "egg white" : ingredient)]
}

console.log(replaceEgg)

const removeEgg = {
    ...recipe,
    ingredients: [...recipe.ingredients.filter(ingredient => ingredient !== 'egg')]
}

console.log(removeEgg)

console.log(recipe)