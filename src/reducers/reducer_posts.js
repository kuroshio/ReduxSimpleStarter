import _ from 'lodash';
import {FETCH_POSTS, FETCH_POST} from '../actions'; // import from index.js so don't need to specify

// receive the previous state and an action and do something with it
// default the state to be an object
export default function(state = {}, action) {
    switch (action.type) {
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
            return { ...state, [action.payload.data.id]: action.payload.data }
        case FETCH_POSTS:
            console.log(action.payload.data); // [post1, post2]

            // need to transform into an object where the id is the post id
            // and the value is the post itself
            // lodash library has a method to do this

            // ES6 alternatives:
            //      1) posts.map( post => postsObject[post.id] = post )
            //      2) posts.reduce((result, post) => {result[post.id] = post; return result}, {});
            return _.mapKeys(action.payload.data, 'id');
        default:
            return state;
    }
}