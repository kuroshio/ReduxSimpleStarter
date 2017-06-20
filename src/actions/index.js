import axios from 'axios';

// Remember we only change our application state through reducers and actions
const API_KEY = '6a78596d062df78380eff5944c4e5567'; // using steve grider's api key
const ROOT_URL = `http://api.openweathermap.org/data/2.5/forecast?appid=${API_KEY}`;

// keep action types consistent between action creators and reducers
export const FETCH_WEATHER = 'FETCH_WEATHER';

export function fetchWeather(city) {
    const url = `${ROOT_URL}&q=${city},us`;

    //axios is library made solely to make ajax requests from browser, works almost identically to jQuery ajax method
    // but jQuery includes a ton of other functionality that we don't need
    const request = axios.get(url);     // axios returns a promise (see docs)

    // middleware allows us to have some nice looking code thats not overly complex
    // notice how our code is asynchronous - we're making an ajax call, but it doesn't appear that we have any async
    // code - that's the point of redux promise = to clean up our code
    // normally you would need to pass a callback, or deal with a promise
    // redux promise unwraps a promise for us so we only have to work with data in our reducers, not promises

    // promise is a data structure that doesn't yet contain any of our data
    // but note that we're returning the promise on the payload key below
    // we're returning a promise as the payload

    // console.log('Request:', request);

    // remember action creators always have to return an action
    // and an action is an object which always has a type
    return {
        type: FETCH_WEATHER,
        payload: request
    }
}

