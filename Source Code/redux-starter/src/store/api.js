import { createAction } from "@reduxjs/toolkit";

// more consistent naming convention, centralized in one place
// can namespace the actions - api/callBegan instead of apiCallBegan. this is more consistent with other actions in our app
export const apiCallBegan = createAction("api/callBegan")
export const apiCallSuccess = createAction("api/callSuccess")
export const apiCallFailed = createAction("api/callFailed")