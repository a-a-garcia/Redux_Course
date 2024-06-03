import { createStore } from 'redux';
// we exported reducer as default so we don't have write this as { reducer }
// import reducer from './reducer';
// importing it from ./bugs now that we are converting to duck
import reducer from "./bugs"
import { devToolsEnhancer } from 'redux-devtools-extension'


// export default store;

export default function configureStore() {
    // createStore - higher order function
    // pass reference to reducer
    // returns a store object
    const store = createStore(
        reducer,
    
        // below is a "store enhancer" allowing us to connect Redux dev tools to our project
        // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    
        // we can simplify the above using the devToolsEnhancer dependency
        // we can pass an object to configure our store enhancer - trace:true allows us to use the trace tab in Redux dev tools
        devToolsEnhancer({ trace: true })
    )
    return store
}