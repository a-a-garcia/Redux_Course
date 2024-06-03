// this is a "slice" of our code. a duck.

//centralize a place where you can change variables used in the reducer and elsewhere
//code moved from actionTypes.js to here to create duck
//ACTION TYPES
const BUG_ADDED = "bugAdded";
const BUG_REMOVED = "bugRemoved";
const BUG_RESOLVED = "bugResolved"

//ACTION CREATORS
//code moved from actions.js to here to create duck

// using arrow syntax
export const bugAdded = description => ({
    type: BUG_ADDED,
    payload: {
        description: description
    }
})

export const bugRemoved = bugId => ({
    type: BUG_REMOVED,
    payload: {
        id: bugId
    }
})

// we handle the actual changing of `resolved` to true in our reducer! We just need the id in order to actually resolve a bug
export const bugResolved = bugId => ({
    type: BUG_RESOLVED,
    payload: {
        id: bugId
    }
})


// export function bugAdded(description) {
//     return {
//         type: BUG_ADDED,
//         payload: {
//             description: "Bug1"
//         }
//     }
// }

//REDUCER
// import { BUG_ADDED, BUG_REMOVE } from './actionTypes';
// simpler way to import - access via actions.BUG_ADDED...
// No longer need to import this as this is now a duck
// import * as actions from './actionTypes';

// A reducer is a function w/ 2 parameters
// job of a reducer is to return new state based on this action
// reducer is a pure function - if you call it multiple times, and give it same args, it always returns same result, and is free from side effects. 
// reducers (and pure functions) don't touch DOM elements, work with global state, or call APIs
// all a reducer needs should be its passed in args.
// redux is going to call the reducer on start, and if no initial state is defined state will be `undefined`. so we set a default value.
let lastId = 0
export default function reducer(state = [], action) {
    if (action.type === BUG_ADDED)
        return [
            ...state,
            {
                id: ++lastId,
                description: action.payload.description,
                resolved: false
            }
        ];
    else if (action.type === BUG_REMOVED)
        return state.filter(bug => bug.id !== action.payload.id)
    else if (action.type === BUG_RESOLVED)
        //if the id of the bug matches the id of payload from the action, return a copy of the bug object with the updated data. Else return the bug untouched
        return state.map(bug => bug.id === action.payload.id ? {...bug, resolved: true} : bug)
    return state;
}

// swtich/case syntax

// function reducer(state = [], action) {
//     switch (action.type) {
//         case "bugAdded": 
//             return [
//                 ...state,
//                 {
//                     id: ++lastId,
//                     description: action.payload.description,
//                     resolved: false
//                 }
//             ];
//         case "bugRemoved":
//             state.filter(bug => bug.id !== action.payload.id)
//         default: 
//             return state;
//     }
// }
