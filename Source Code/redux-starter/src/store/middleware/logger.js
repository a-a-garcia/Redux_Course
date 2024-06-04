// we're going to log every action that's dispatched

// Currying refresher
// N parameters => 1 parameter

// Middleware always has 3 parameters -
// SNA -> (S)tore, (N)ext, (A)ction
// can also use object destructuring from the store
// const logger = ( {getState, dispatch} )...
// add an extra parameter here `param` so we can parameterize and handle logging on dev vs production
const logger = param => store => next => action => {
    // store object looks like the store object in Redux but it's not.
    console.log("Logging", param)
    // next is a function and that is a reference to the next function in our middleware pipeline (in this case, since we only have 1 middleware function it's a refernce to our reducer)
    // console.log("next", next)
    // console.log("action", store)

    // next is our reducer, we need to call it to process the action further
    next(action)
}

export default logger

// WITHOUT USING REDUX TOOLKIT

// import {createStore, applyMiddleware} from "redux";
// import reducer from "./store/reducer";

    // pass 1 or more middleware(s)
// const store = createStore(reducer, applyMiddleware(logger))