// import store from './store';
// console.log(store)

// import { configureStore } from "@reduxjs/toolkit";

// import {bugAdded, bugRemoved, bugResolved} from './actions';

// // in .subscribe, pass a function
// // this function gets called every time the state of the store changes.
// // UI components should subscribe to the store so that they get notified when the store changes
// const unsubscribe = store.subscribe(() => {
//     console.log("Store changed!", store.getState());
// })

// // adding a bug

// // store.dispatch({
// //     type: actions.BUG_ADDED,
// //     payload: {
// //         description: "Bug1"
// //     }
// // })

// // what if there are multiple places we want to dispatch the same action??
// // we can create a function that would create this action object for us, called an action creator. go to src/actions.js
// // Now we can dispatch with the bugAdded function import
// store.dispatch(bugAdded("Bug 1"))

// // subscribe method returns a function for unsubscribing from the store.
// // important because it's possible that user can navigate away from page, where the UI component no longer is visible. Need to be able to unsubscribe to prevent memory leaks
// unsubscribe();

// store.dispatch(bugResolved(1))

// //remove bug
// // store.dispatch(bugRemoved(1))

// console.log(store.getState())
// // console.logging the store will look something like this: 
// /*

// --dispatch for dispatching actions--
// dispatch
// : 
// ƒ dispatch(action)
// -- note that there's no `setState`. To change state, we have to dispatch an action.
// getState
// : 
// -- get the current state of the store --
// ƒ getState()
// replaceReducer
// : 
// ƒ replaceReducer(nextReducer)
// -- when we subscribe to the store, we get notified every time the state of the store changes --
// subscribe
// : 
// ƒ subscribe(listener)
// Symbol(observable)
// : 
// ƒ observable()
// [[Prototype]]
// : 
// Object

// */

//BUILDING REDUX FROM SCRATCH
// import store from './customStore';
// import configureStore from "./store/configureStore"
// // importing * is not bad in this case, but could be in real world applications where using a large library like lodash.
// // import * as actions from './store/bugs';
// // changed to named imports because `getUnresolvedBugs` is not an action.
// import { bugAdded, bugResolved, getUnresolvedBugs, bugAssignedToUser, getBugsByUser } from './store/bugs';
// import { projectAdded } from "./store/projects";
// import { userAdded } from "./store/users";

// const store = configureStore();

// // direct mutation - NOT what we want
// // store.state = 1
// // console.log(store.state)

// // console.log(store.getState())
// // console.log(store)

// // we need to notify subscribers (ui components) when the state of the store changes 
// // so before we dispatch an action, we should subscribe to the store
// // this function is called everytime the store changes
// store.subscribe(() => {
//     console.log("Store changed!")
// })


// // store.dispatch(actions.bugAdded("Bug 1"))

// // store.dispatch(actions.bugAdded("Bug 2"))

// // store.dispatch(actions.bugAdded("Bug 3"))

// // store.dispatch(actions.bugResolved(1))

// // With Redux Toolkit refactoring, the value we pass to bugAdded is going to be the value of the payload property, hence we need to pass an object, not a string. 
// // Our reducer will not work properly if we don't do this, because our reducer extracts the description from the payload object

// // `actions.` removed once exports became named
// store.dispatch(userAdded({ name: "User 1" }))

// // store.dispatch(userAdded({ name: "User 2" }))

// // store.dispatch(projectAdded({
// //     name: "Project 1"
// // }))

// // store.dispatch(bugAdded({
// //     description: "Bug 1"
// // }))

// // store.dispatch(bugAdded({
// //     description: "Bug 2"
// // }))

// // store.dispatch(bugAdded({
// //     description: "Bug 3"
// // }))

// // store.dispatch(bugAssignedToUser({
// //     bugId: 1,
// //     userId: 1
// // }))

// // store.dispatch(bugResolved({
// //     id: 1
// // }))

// // if we want to display unresolved bugs..
// // in a real app, the logic is complex, and could be used elsewhere. So have to change in many places if there's a bug
// // we need to encapsulate this logic in the bugs slice
// const unresolvedBugs = getUnresolvedBugs(store.getState())

// // remember getBugsByUser returns a function, that function is going to get the current state, then it will return the bugs assigned to that user
// const bugs = getBugsByUser(2)(store.getState())

// console.log(store.getState())
// console.log(unresolvedBugs)
// console.log(bugs)


// --------------

//DISPATCHING FUNCTIONS
import configureStore from "./store/configureStore";
const store = configureStore();

// we can't dispatch an object that has no type property
// store.dispatch({})

// we also cannot dispatch a function without some refactoring..
store.dispatch((dispatch, getState) => {
    // Call an API
    // When promise is resolved => dispatch()
    dispatch({ type: 'bugsReceived', bugs: [1,2,3]})
    console.log(getState())
    // If the promise is rejected => dispatch()
})

// testing toast.js middleware
store.dispatch({
    type: "error",
    payload: {
        message: "An error occurred."
    }
})