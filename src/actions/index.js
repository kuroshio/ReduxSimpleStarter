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
    const request = axios.get(url);

    // remember action creators always have to return an action
    // and an action is an object which always has a type
    return {
        type: FETCH_WEATHER,
        payload: request
    }
}

