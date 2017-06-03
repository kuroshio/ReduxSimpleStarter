// State argument is not application state, only the state this reducer is responsible for
// reducer going to be called whenever an action is dispatched by our app - so this function will get called a lot
// however many times we don't care about the action so just return the state
export default function(state = null, action) {
    switch(action.type) {
        case 'BOOK_SELECTED':
            return action.payload;
    }

    // *Never mutate our current state to produce new version of state - object we return from reducer must be fresh
    // must always return non-undefined value, hence default null on boot-up
    return state
}