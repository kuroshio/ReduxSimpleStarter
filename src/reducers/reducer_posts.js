import _ from 'lodash';
import {FETCH_POSTS, FETCH_POST, DELETE_POST} from '../actions'; // import from index.js so don't need to specify

// receive the previous state and an action and do something with it
// default the state to be an object
export default function(state = {}, action) {
    switch (action.type) {
        case DELETE_POST:
            // Note below is for WITHOUT this case statement:
            // note with our approach we are relying on our refetch of the big list of posts to get the deleted post
            // out of our application state - when delete request is completed, we automatically navigate back to our list
            // of posts - but when we do so, our big list of posts in memory still includes the deleted one
            // the followup request to fetch new list of posts, does not have the deleted one
            // this get around local state management - but we should update our local state as well, just
            // makes the UI slightly snappier
            // -------------------------------

            // this updates our local state when a post is deleted
            // the action payload contains the id of the post we just deleted
            // just need to reach into state obj and get rid of the key/value that match that ID
            return _.omit(state, action.payload);   // if state obj has a key of action.payload (post id), just drop it
                                                    // and contain a new object that does not contain that ID
                                                    // does not modify existing state obj, returns NEW state obj without that ID

            // this is a benefit of using an object instead of an array for state management, which would require something like:
            // return _.reject(state, post=>post.id === action.payload);
            // not as legible

        case FETCH_POST:
            // we know that our  post piece of state is an object, so we're returning an object
            // we want to ADD to our existing app level state instead of tossing away all posts we've fetched

            // // ES5 code below
            // const post = action.payload.data;
            // const newState = {...state};
            // newState[post.id] = post
            // return newState

            // ES 6 code below - identical to above
            // key interpolation - we are not creating an array - whatever the variable action.payload.data.id is
            // make a new key on this object, using this value, and set its value equal to action.payload.data

            // if we keep going back to the same post over and over, the existing post in our state object is just
            // getting overwritten, so making use of updates to our state object is easier with this approach
            // than using an array. With array we can't just add on or keep concatenating on these new posts we're fetching
            // we would first have to find the post, remove it from array, and add in a new one
            // in practice, recommend using an object as storage for data inside state
            return { ...state, [action.payload.data.id]: action.payload.data }
        case FETCH_POSTS:
            console.log(action.payload.data); // [post1, post2]

            // need to transform into an object where the id is the post id
            // and the value is the post itself
            // lodash library has a method to do this

            // ES6 alternatives:
            //      1) posts.map( post => postsObject[post.id] = post )
            //      2) posts.reduce((result, post) => {result[post.id] = post; return result}, {});

            // mapkeys treats our state object as an object rather than array
            // with object we get very fast/easy lookup of records, and also makes maintaining fetching the same record
            // repeatedly much more straightforward
            return _.mapKeys(action.payload.data, 'id');
        default:
            return state;
    }
}