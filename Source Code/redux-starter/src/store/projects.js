import { createSlice } from "@reduxjs/toolkit";

let lastId = 0;

const slice = createSlice({
    name: "projects",
    initialState: [],
    reducers: {
        //Make sure you use curly braces, or else you will implicitly return `projects.push...` which will result in an error `An immer producer returned a new value *and* modified its draft. Either return a new value *or* modify the draft`
        projectAdded: (projects, action) => {
            projects.push({
                id: lastId++,
                name: action.payload.name
            })
        }
    }
})

console.log(slice)
export default slice.reducer
export const { projectAdded } = slice.actions