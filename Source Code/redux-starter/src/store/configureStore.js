// import { createStore } from 'redux';
// // we exported reducer as default so we don't have write this as { reducer }
// // import reducer from './reducer';
// // importing it from ./bugs now that we are converting to duck
// import { devToolsEnhancer } from 'redux-devtools-extension'

// using Redux Toolkit, we can simplify with configureStore
// getDefaultMiddleware to get function dispatching (and other functions)
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
// import reducer from "./bugs"
// import reducer from "./projects"

// combining the reducers
import reducer from "./reducer"
// import middleware
import logger from './middleware/logger'
import toast from './middleware/toast'

// export default store;

// REDUX TOOLKIT
// can make it named or anonymous
export default function () {
    // pass it a configuration object
    // automatically sets up store to talk to Redux dev tools
    // also allows us to dispatch async actions - middleware functions!
    return configureStore({ 
        reducer,
        // we want to parameterize the logger function to handle whether logging in dev or production
        // middleware: [logger('console')]
        // we can also pass a complex object
        // order matters. every action goes through middleware in same order
        middleware: [
            // use spread operator to copy the array of middleware functions
            ...getDefaultMiddleware(),
            // additional middleware
            logger({destination : 'console'}),
            // `func` middleware unnecessary, comes with Redux Toolkit 
            // func
            toast
        ]
     })
}


// WITHOUT REDUX TOOLKIT
// export default function configureStore() {
//     // createStore - higher order function
//     // pass reference to reducer
//     // returns a store object
//     const store = createStore(
//         reducer,
    
//         // below is a "store enhancer" allowing us to connect Redux dev tools to our project
//         // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    
//         // we can simplify the above using the devToolsEnhancer dependency
//         // we can pass an object to configure our store enhancer - trace:true allows us to use the trace tab in Redux dev tools
//         devToolsEnhancer({ trace: true })
//     )
//     return store
// }