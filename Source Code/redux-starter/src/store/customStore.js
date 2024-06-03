import reducer from "./reducer";

function createStore(reducer) {
    // this variable will store the internal state of the store.
    // We don't want to add this to the returned object because we'll then be able to directly mutate the internal state of the store
    // this property/variable is considered `private`
    let state;

    let listeners = [];
    
    // remember, functions are 1st class citizens. meaning a function can be declared inside of another function
    // we can access the variables inside the parent function
    function getState() {
        return state
    }

    function subscribe(listener) {
        listeners.push(listener)
    }

    function dispatch(action) {
        //Call the reducer to get the new state

        //Remember, reducer takes 1. current state 2. dispatched action 
        state = reducer(state, action);

        //Notify the subscribers
        for (let i = 0; i < listeners.length; i++) {
            listeners[i]();
        }
    }

    return {
        subscribe,
        dispatch,
        getState
    }
}

export default createStore(reducer);