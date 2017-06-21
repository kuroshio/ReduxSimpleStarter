import React, {Component} from 'react';
import {connect} from 'react-redux';

class WeatherList extends Component {
    render() {
        return (
            <table className="table table-hover">
                <thead>
                <tr>
                    <th>City</th>
                    <th>Temperature</th>
                    <th>Pressure</th>
                    <th>Humidity</th>
                </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        )
    }
}

// we are specifically using state.weather here because we assigned WeatherReducer
// to the weather key in combinereducers of reducers/index.js
// ES6 below is equivalent to:
// function mapStateToProps(state) {
//     return {weather: state.weather}
// }

function mapStateToProps({weather}) {
    // {weather} == const weather = state.weather
    return {weather}    // { weather} === {weather: weather}
}

// export the connected version of weatherlist
export default connect(mapStateToProps)(WeatherList)