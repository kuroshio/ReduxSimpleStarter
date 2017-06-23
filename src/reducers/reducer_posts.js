import _ from 'lodash';
import {FETCH_POSTS} from '../actions'; // import from index.js so don't need to specify

// receive the previous state and an action and do something with it
// default the state to be an object
export default function(state = {}, action) {
    switch (action.type) {
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