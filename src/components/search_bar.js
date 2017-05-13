import React, {Component} from 'react';

class SearchBar extends Component{
    render() {
        return <input />;
    }
}

export default SearchBar;

// NOTE
//      import React, {Component} from 'react';
// IS THE SAME AS
//      import React from 'react';
//      const Component = React.Component

// SAME THING:
/*
import React from 'react';
class SearchBar extends React.Component{
    render() {
        return <input />;
    }
}

export default SearchBar;
*/