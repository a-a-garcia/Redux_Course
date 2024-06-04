//moved what we have from reducer.js
// we want entities to have two sub slices - bugs and projects

import { combineReducers } from "redux";
import bugsReducer from './bugs'
import projectsReducer from './projects'
import usersReducer from './users'

export default combineReducers({
    bugs: bugsReducer,
    projects: projectsReducer,
    users: usersReducer
})