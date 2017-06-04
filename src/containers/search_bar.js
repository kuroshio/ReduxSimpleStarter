import React, {Component} from 'react';

export default class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {term:''};


        // bind the context of onInputChange
        // take the existing function, bind it to this (SearchBar), and replace the existing function
        // Rule of thumb:
        //      if you're ever passing a callback function around, and the callback has a reference to "this",
        //      you need to bind the context (with bind statement or fat arrow)
        this.onInputChange = this.onInputChange.bind(this)
    }

    // event is always provided in "on" events, this is vanilla js
    onInputChange(event) {
        console.log(event.target.value);
        this.setState({term:event.target.value});
    }

    onFormSubmit(event) {
        // note we get free functionality when using form instead of div
        // forms handle case when user presses enter on form input or on submit button click
        event.preventDefault();

        // go and fetch weather data
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