// object destructuring the methods from `store` so we can pass them to `action`
// with this middleware, we can easily dispatch function, allowing us to make asynchronous API calls
// If you use Redux toolkit, you get this all this functionality out of the box.
const func = ({ dispatch, getState }) => next => action => {
    // we can check the type of the action that is passed
    if (typeof action === 'function')
        action(dispatch, getState); //this is not a plain js object.
    
    else // if it's a plain js object...
        next(action);
}

export default func