import React, {Component} from 'react';
import {connect} from 'react-redux';
import Chart from '../components/chart';
import GoogleMap from '../components/google_map';

class WeatherList extends Component {
    renderWeather(cityData) {
        // render data for a single city/row
        const name = cityData.city.name;
        // this would be a good place to do any unit conversions
        const temps = cityData.list.map(weather => weather.main.temp);
        // const temps = _.map(cityData.list.map(weather => weather.main.temp), (temp) => temp - 273);
        const pressures = cityData.list.map(weather => weather.main.pressure);
        const humidities = cityData.list.map(weather => weather.main.humidity);
        // we're generating all of our data here and passing it directly into the <Sparklines> chart
        // that means the chart component we're going to make doesnt need to talk to redux
        // because its going to be getting its data from its parent


        // const lon = cityData.city.coord.lon;
        // const lat = cityData.city.coord.lat;
        const {lon, lat} = cityData.city.coord; // equivalent to above 2 lines

        return (
            <tr key={name}>
                <td><GoogleMap lon={lon} lat={lat}/></td>
                <td><Chart data={temps} color="orange" units="K"/></td>
                <td><Chart data={pressures} color="green" units="hPa"/></td>
                <td><Chart data={humidities} color="black" units="%"/></td>
            </tr>
        )
    }

    render() {
        return (
            <table className="table table-hover">
                <thead>
                <tr>
                    <th>City</th>
                    <th>Temperature (K)</th>
                    <th>Pressure (hPa)</th>
                    <th>Humidity (%)</th>
                </tr>
                </thead>
                <tbody>
                {this.props.weather.map(this.renderWeather)}
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