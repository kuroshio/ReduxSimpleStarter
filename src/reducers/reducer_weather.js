export default function(state = null, action) {
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
    // console.log('Action received', action);
    return state;
}