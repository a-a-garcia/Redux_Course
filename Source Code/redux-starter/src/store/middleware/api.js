import axios from 'axios'
import * as actions from '../api'

// purely for demonstration - actions will not exist in middleware.
// actions must be serializable. so we cannot passing functions as callbacks onSuccess and onError.
// const action = {
//     type: 'apiCallBegan', // apiRequest,
//     payload: {
//         url: '/bugs',
//         method: 'get',
//         data: {},
//         onSuccess: 'bugsReceived',
//         onError: 'apiRequestFailed'
//     }
// }


// we don't have access to dispatch, we must destructure it from (S)tore
// mark last function with `async` keyword
const api = ({ dispatch }) => next => async action => {
    //we want to handle specific types of actions that indicate an API call

    // if (action.type !== 'apiCallBegan') {
    //     next(action);
    //     return
    // }

    // simplified
    if (action.type !== actions.apiCallBegan.type) return next(action);

    //if we get here, then we're dealing with an action for calling an API endpoint
    //call api, handle resolve, handle reject

    
    //object destructure from the action object
    const { 
        url, 
        method, 
        data, 
        onSuccess, 
        onError,
        // extract the onStart property
        onStart
    } = action.payload
    
    //it's possible that onStart if undefined, so only dispatch it if onStart is defined
    if (onStart) dispatch( { type: onStart })

    // calling `next(action)` here allows you to see the action dispatched in Redux Devtools
    // in this case, the call is successful, so we receive the second action
    // next(action) is NOT synonymous with a `return`. it's simply a way to pass the action to the next middleware in the pipeline
    // can sometimes be useful to pass the action to the next middleware in the pipeline before doing slow operations like API calls
    next(action)
        
    //returns a promise use 1. .then().catch() or 2. async/await w/ try catch block
    try {
        const response = await axios.request({
            // url does not contain the full url so we need a baseURL
            // in a real app, baseURL value would be stored somewhere else
            baseURL: 'http://localhost:9001/api',
            url, //url of our endpoint /bugs 
            method,
            data
        });
        // General success dispatch
        dispatch(actions.apiCallSuccess(response.data))
        // specific 
        if (onSuccess) dispatch({ type: onSuccess, payload: response.data })
    } catch (error) {
        // general error action
        // we need to pass in error.message because we cannot place error object in the payload. It's not serializable
        dispatch(actions.apiCallFailed(error.message))
        // more specific error action
        if (onError) dispatch({ type: onError, payload: error })
    }
}

export default api;

// UNDERSTANDING THE FLOW OF THE API/MIDDLEWARE
/* 
So to confirm my understanding... Okay so let me try to understand this further. 

    *The payload you're sending with the apiCallBegan action includes instructions for the middleware on what actions to dispatch at different stages of the API call.

    * These instructions are in the form of action types (onStart, onSuccess, onError), which correspond to the bugsRequested.type, bugsReceived.type, and bugsRequestFailed.type respectively.

    * When the middleware intercepts the apiCallBegan action, it uses these instructions to dispatch the appropriate actions, which are then handled by the corresponding reducers to update the state.

    *So, the payload doesn't get revised or resolved to new values in the middleware. Instead, it's used by the middleware to determine what actions to dispatch based on the outcome of the API call.
    
    * the payload of apiCallBegan is sent to the middleware/api.js. The payload CONTAINS INSTRUCTIONS FOR THE MIDDLEWARE on what actions to dispatch at different stages of the API call. When the middleware intercepts the apiCallBegan action, it dispatches an action of type onStart (which is bugsRequested.type). This action is handled by the bugsRequested reducer, which sets bugs.loading to true.
    
    * After, the API call is conducted and different actions are dispatched depending on the result of the API call. if it succeeds we dispatch a new action, identifiable by type: onSuccess. in the payload, we have onSuccess: bugsReceive.type. then, the reducer updates the bugs.list per the action.payload and sets bugs.loading to false. 
*/