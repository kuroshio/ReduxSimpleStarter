import React, {Component} from 'react';

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {term:''};
    }

    render() {
        // make value of input equal to the state, not the other way around
        return (
            <div>
                <input
                    value = {this.state.term}
                    onChange={event => this.setState({term: event.target.value})} />
            </div>
        )
    }
}

export default SearchBar;

// SAME THING:
/*
import React from 'react';
class SearchBar extends React.Component {
    render() {
        return <input />;
    }
}

export default SearchBar;
*/


// SAME THING:
/*
import React, {Component} from 'react';
class SearchBar extends Component {
    onInputChange(event) {
        console.log(event.target.value)
    }

    render() {
        return <input onChange={this.onInputChange} />;
    }
}
export default SearchBar;
*/


// NOTE
//      import React, {Component} from 'react';
// IS THE SAME AS
//      import React from 'react';
//      const Component = React.Component