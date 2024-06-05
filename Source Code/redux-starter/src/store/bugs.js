// // Redux Toolkit
// // createAction returns an action creator, not an action
// import { createAction } from "@reduxjs/toolkit";
// createSlice (combines action creation and reducer creation)

import { createAction, createReducer, createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "./api";
import api from "./middleware/api";

let lastId = 0
const slice = createSlice({
    name: 'bugs',
    // initial state does not necessarily have to be a plain array
    // initialState: [],
    initialState: {
        list: [],
        // loading - useful for UI to display loading styles
        loading: false,
        // lastFetch - is the timestamp of the last time we fetched the data from the server
        // initally null since we haven't called the server yet
        // useful for caching - for ex if we got the bugs 5 minutes ago, we don't need to fetch them again, we can use what we currently have in the store
        lastFetch: null
    },
    reducers: {
        bugAssignedToUser: (bugs, action) => {
            // we need the id of bug and the id of the user to represent this event.
            // object destructure from the payload
            const { bugId, userId } = action.payload
            const index = bugs.list.findIndex(bug => bug.id === bugId)
            bugs.list[index].userId = userId
        },

        // maps actions => action handlers
        // bugsAdded is not an object that we defined earlier, so we can't set it dynamically.
        // createSlice automatically creates action types and action creators for us, so this will be the only place where the reducer action creator is defined.
        bugAdded: (bugs, action) => {
            bugs.list.push(
                {
                    id: ++lastId,
                    description: action.payload.description,
                    resolved: false
                }
            )
        },

        bugResolved: (bugs, action) => {
            const index = bugs.list.findIndex(bug => bug.id === action.payload.id)
            bugs.list[index].resolved = true;
        },
        //new reducer to handle bugsReceived
        // when we use Redux Toolkit, the name of this action is actually bugs/bugsReceived. So we need to go to index.js and change the onSuccess to bugs/bugsReceived
        bugsReceived: (bugs, action) => {
            //action.payload is the bugs from the server
            bugs.list = action.payload
            // once we receive bugs from server, set .loading to false
            bugs.loading = false;
        },

        // implment loading 
        bugsRequested: (bugs, action) => {
            bugs.loading = true;
        },

        // handle if bugsRequested fails. loading needs to be set back to false
        bugsRequestFailed: (bugs, action) => {
            bugs.loading = false
        }
    }
})

console.log(slice)
//export the reducer
export default slice.reducer
//export the ACTIONS IN THE REDUCER. slice.actions is an object. use object destructuring to destructure the needed properties. export them outside of this module
export const { 
    bugAdded, 
    bugResolved, 
    bugAssignedToUser,
    bugsReceived,
    bugsRequested,
    bugsRequestFailed
} = slice.actions

// ACTION CREATORS - for "unpure" functions

//for demonstration
const url = "/bugs"

export const loadBugs = () => apiCallBegan({ 
    // in a real app we don't want to hardcode the url. Can be in a config file
    url: url,

    // we also don't want this hardcoded. We want to get this from the appropriate reducer. (bugsReceived is a function, can access its type)
    onSuccess: bugsReceived.type,

    onStart: bugsRequested.type,

    //dispatch bugsRequestFailed if failed.
    onError: bugsRequestFailed.type
})

// This is what is called a "Selector" function.
// It's a function that takes the state and returns the computed state.
// naming conventions
    // getUnresolvedBugs (Mosh's pref)
    // selectUnresolvedBugs
    // unresolvedbugsSelector
// no longer need the below implementation of getUnresolvedBugs due to memoization
// export const getUnresolvedBugs = state => state.entities.bugs.filter(bug => !bug.resolved)

// Memoization - technique for optimizing expensive functions.
// for ex - f(x) => y {input: 1, output: 2}
// whenever the function is called past the first time, we can get data from the cache
// bugs => get unresolved bugs from the cache
// There's a library called `reselect` to help with memoization
// We give createSelector 1+ selector functions.
export const getUnresolvedBugs = createSelector(
    //selector 1
    state => state.entities.bugs,
    // selector 2
    state => state.entities.projects,

    // the output of above, gets passed to the "result function"
    // takes list of bugs, compute the list of unresolved bugs
    // if the list of `bugs` (or `projects`) is not changed, the logic will not be executed again. This selector will return the result from the cache.
    (bugs, projects) => bugs.filter(bug => !bug.resolved)
)


// rememeber that `createSelector()` returns a function.
// instead of assigning that function to a const, we can set this const to a different function

// if we call this function with a number, 1, we get `createSelector(
//     state => state.entities.bugs,
//     bugs => bugs.filter(bug => bug.userId === )

// const selector = getBugsByUser(1)
// // selector is going to be a function that takes current state and returns computed state, which is the list of bugs assigned to this particular user. 
// selector(state) => ...
export const getBugsByUser = userId => createSelector(
    state => state.entities.bugs,
    bugs => bugs.filter(bug => bug.userId === userId)
)
// // this will log an object 
// // {type: 'bugUpdated', payload: undefined}
// const bugUpdated = createAction("bugUpdated")

// // whatever you pass to action is the payload
// // console.log(bugUpdated({
// //     id: 1
// // }))

// // functions are objects in js, so they have properties
// console.log(bugUpdated.type)

// this is a "slice" of our code. a duck.

//centralize a place where you can change variables used in the reducer and elsewhere
//code moved from actionTypes.js to here to create duck
//ACTION TYPES

// no longer need these once we implement Redux Toolkit
// const BUG_ADDED = "bugAdded";
// const BUG_REMOVED = "bugRemoved";
// const BUG_RESOLVED = "bugResolved"

//ACTION CREATORS
// code removed once createSlice was implemented.
// code moved from actions.js to here to create duck

// using arrow syntax
// export const bugAdded = description => ({
//     type: BUG_ADDED,
//     payload: {
//         description: description
//     }
// })

// // Redux Toolkit syntax
// export const bugAdded = createAction("bugAdded")

// // export const bugRemoved = bugId => ({
// //     type: BUG_REMOVED,
// //     payload: {
// //         id: bugId
// //     }
// // })

// // Redux Toolkit syntax
// export const bugRemoved = createAction("bugRemoved")

// // we handle the actual changing of `resolved` to true in our reducer! We just need the id in order to actually resolve a bug
// // export const bugResolved = bugId => ({
// //     type: BUG_RESOLVED,
// //     payload: {
    // //         id: bugId
    // //     }
    // // })
    
    // // Redux Toolkit syntax
    // export const bugResolved = createAction("bugResolved")
    
    
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

//REDUX TOOLKIT REDUCER

// createReducer takes 2 params
// 1. initial state
// 2. an object that maps actions to functions that handle those actions
// export default createReducer([], {
//     // key: value
//     // actions: functions (event => event handler)
//     // Note that we write mutating code here. (normally not alllowed) So no spread operators needed, because under the hood createReducer uses Immer

//     // produce(initialState, draftState => {
//     //     draftState.x = 1
//     // })

//     // this object is going to be a proxy, so its going to record all changes made to it then Immer will apply those changes to a copy of the initial state
//     // the value below to the key bugAdded is actually the second arg to the `produce` function in Immer

//     // instead of hard coding the name "bugAdded", we can dynamically compute the name with `[bugAdded.type]` because an action creator has a type property that returns the type of that action
    
//     // removed after implmenting createSlice
//     [bugAdded.type]: (bugs, action) => {
//         // first arg can be called anything - changed from `state` to `bugs` for cleaner code

//         // bugs.push(
//         //     {
//         //         id: ++lastId,
//         //         description: action.payload.description,
//         //         resolved: false
//         //     }
//         // )
//     },

//     // removed after implementing createSlice
//     [bugResolved.type]: (bugs, action) => {

//         // const index = bugs.findIndex(bug => bug.id === action.payload.id)
//         // bugs[index].resolved = true;
//     }
//     // don't need to worry about `default` case
// })

// NON-REDUX TOOLKIT REDUCER
// export default function reducer(state = [], action) {
//     // if (action.type === BUG_ADDED)
//     // redux toolkit syntax
//     if (action.type === bugAdded.type)
//         return [
//             ...state,
//             {
//                 id: ++lastId,
//                 description: action.payload.description,
//                 resolved: false
//             }
//         ];
//     else if (action.type === bugRemoved.type)
//         return state.filter(bug => bug.id !== action.payload.id)
//     else if (action.type === bugResolved.type)
//         //if the id of the bug matches the id of payload from the action, return a copy of the bug object with the updated data. Else return the bug untouched
//         return state.map(bug => bug.id === action.payload.id ? {...bug, resolved: true} : bug)
//     return state;
// }

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
