const toast = store => next => action => {
    if (action.type === "error")
        // in a real life app you'd utilize a toast notification library instead of just a console.log
        console.log("Toastify", action.payload.message)
    else
        next(action)
}

export default toast