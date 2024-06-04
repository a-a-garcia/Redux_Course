//this should be our top level reducer where we call entities reducer, auth reducer, UI reducer, and so on

// this is the reducer our store talks to.
//  Store -> Root -> Entities -> Bugs & Projects

import { combineReducers } from "redux";
import entitiesReducer from './entities';

export default combineReducers({
    entities: entitiesReducer,
})

// multiple reducers can handle the same action. Each reducer is responsible for updating a slice of the store. Bugs can only update bugs property.