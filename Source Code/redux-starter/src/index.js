// import store from './store';
// console.log(store)

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
import configureStore from "./store/configureStore"
// importing * is not bad in this case, but could be in real world applications where using a large library like lodash.
import * as actions from './store/bugs';

const store = configureStore();

// direct mutation - NOT what we want
// store.state = 1
// console.log(store.state)

// console.log(store.getState())
// console.log(store)

// we need to notify subscribers (ui components) when the state of the store changes 
// so before we dispatch an action, we should subscribe to the store
// this function is called everytime the store changes
store.subscribe(() => {
    console.log("Store changed!")
})

store.dispatch(actions.bugAdded("Bug 1"))

store.dispatch(actions.bugAdded("Bug 2"))

store.dispatch(actions.bugAdded("Bug 3"))

store.dispatch(actions.bugResolved(1))

console.log(store.getState())