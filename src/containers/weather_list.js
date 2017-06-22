import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Sparklines, SparklinesLine} from 'react-sparklines';

class WeatherList extends Component {
    renderWeather(cityData) {
        // render data for a single city/row
        const name = cityData.city.name;
        const temps = cityData.list.map(weather => weather.main.temp);
        console.log(temps)
        return (
            <tr key={name}>
                <td>{name}</td>
                <td>
                    <Sparklines height={120} width={180} data={temps}>
                        <SparklinesLine color="red" />
                    </Sparklines>
                </td>
            </tr>
        )
    }

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