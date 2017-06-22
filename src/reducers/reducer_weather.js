import {FETCH_WEATHER} from '../actions/index';

export default function(state = [], action) {
    // action should have the payload from actions/index.js
    // redux promise is a middleware
    // middlewares have the ability to stop or manipulate actions before they hit any reducer
    // redux promise sees this incoming action, then specifically looks at the payload property
    // if the payload is a promise, redux promise stops the action entirely and then once the request finishes,
    // it dispatches a new action of the same type but with the payload of the resolve request - in other words it
    // unwraps the promise for us
    // reducers don't really care about getting a promise, they care about getting the data, so it stop s the action
    // waits until the promise resolves, and then it gives the request from the server and sends that to the reducer
    // as the payload - interstitial handling of actions
    // otherwise what would we do if we ended up inside of our reducer with a promise - hard to work with.
    // middleware stops the action in its tracks until the promise is resolved, and then it does its thing
    console.log('Action received', action);

    // we only care about action.payload.data, don't care about other properties
    switch (action.type) {
        case FETCH_WEATHER:
            // we're putting this inside an array bc we'll have multiple cities
            // DON'T do this: return state.push(action.payload.data) - remember: never manipulate state directly
            // don't mutate state, return new array entirely
            // concat creates a new array that contains all the old stuff and the new stuff

            // https://www.udemy.com/react-redux/learn/v4/t/lecture/4284604?start=0
            // When using React-Redux, returning an existing object from the reducer will cause Redux to think that you have made no change, and so will not notify any other part of your app that the state has been updated. Thus, you wont get any components rerendering.
            // It is too expensive CPU-wise for Redux to check every field of an object graph for changes, so the approach is to signal Redux that the state has changed by returning a new state object. It only has to check that the old and new states are literally two different objects, which is an extremely fast and constant time operation. React takes the exact same approach with respect to checking a component's props and state for changes in order to decide whether or not to re-render the component.

            // return state.concat([action.payload.data]);  ES6 below does the same thing
            return [action.payload.data, ...state]; // ... destructures the array (flattens it out)
                                                    // [city,city,city] NOT [city, [city,city]]
                                                    // note it puts newest city at top. can do same
                                                    // thing with concat by swapping state and payload
    }
    return state;
}