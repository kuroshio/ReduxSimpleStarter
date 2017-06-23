import axios from 'axios';

export const FETCH_POSTS = 'fetch_posts';

// need to make network request to the reduxblog api
// whenever we need to make a network request inside of an action creator
// we have to install axios to make the actual request, and redux-promise
// to handle the async nature of the request itself

const ROOT_URL = 'https://reduxblog.herokuapp.com/api';
const API_KEY = '?key=somerandomuniquekey';


export function fetchPosts() {
    const request = axios.get(`${ROOT_URL}/posts${API_KEY}`);

    // assign request to the payload property of the action we're returning
    // since the request is being assigned to the payload property, the redux promise
    // middleware will automatically resolve this request for us whenever it sees this
    // action come across. by the time this action arrives in the reducer, the payload
    // property will contain the payload response object from axios which will
    // have our array of posts.
    return {
        type: FETCH_POSTS,
        payload: request
    }
}