import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchWeather} from '../actions/index';

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {term:''};


        // bind the context of onInputChange
        // take the existing function, bind it to this (SearchBar), and replace the existing function
        // Rule of thumb:
        //      if you're ever passing a callback function around, and the callback has a reference to "this",
        //      you need to bind the context (with bind statement or fat arrow)
        this.onInputChange = this.onInputChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    // event is always provided in "on" events, this is vanilla js
    onInputChange(event) {
        // console.log(event.target.value);
        this.setState({term:event.target.value});

    }

    onFormSubmit(event) {
        //
        // note we get free functionality when using form instead of div
        // forms handle case when user presses enter on form input or on submit button click
        event.preventDefault();

        // go and fetch weather data
        // we need to call action creator whenever the user submits the form, and make api request

        // we're working in a container, and it needs to be able to call an action creator (work with redux)
        // so we need to connect searchbar container to redux
        // also need to bind fetchweather action creator as a property to this container, as we've done previously
        // this container setup process is almost always the same

        // goal is to hook up action creator fetchweather to our search bar container
        this.props.fetchWeather(this.state.term);

        // clear the search input after submit
        this.setState({term:''})
    }

    // whenever we hand off a callback function like onChange={this.onInputChange} ()instead of using a fat arrow, and
    // the callback function references 'this' (as in this.setState), then it will have the incorrect context
    // (some mystery context), therefore you need the bind statement in constructor
    render() {
        return (
            <form onSubmit={this.onFormSubmit} className="input-group">
                <input
                    placeholder="Get a five-day forecast in your favorite cities"
                    className="form-control"
                    value={this.state.term}
                    onChange={this.onInputChange} />

                <span className="input-group-btn">
                    <button type="submit" className="btn btn-secondary">Submit</button>
                </span>
            </form>
        )
    }
}

function mapDispatchToProps(dispatch) {
    // by binding the fetchweather action creator to dispatch and mapping it to props, that gives us access to the
    // function this.props.fetchWeather
    return bindActionCreators({fetchWeather}, dispatch)
}

// get access to action creator - by connecting component through mapDispatchToProps with SearchBar
// we are passing null because whenever we're passing a function that is supposed to map our dispatch to the props
// of our container, it always goes in as the second argument. that's all
// all we're saying is that we don't need any state here
export default connect(null, mapDispatchToProps)(SearchBar);