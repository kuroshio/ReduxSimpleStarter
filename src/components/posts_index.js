import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchPosts} from '../actions';

class PostsIndex extends Component {

    // a lifecycle method is a function on a react component class that is automatically called by react
    componentDidMount() {
        // will be called by react immediately after this component has shown up inside the DOM
        // why fetch data AFTER the component has shown up on screen? it doesnt really make a diff if we call
        // action creator before or after the component renders on the screen since fetching our data is an async operation
        // react always eagerly render the component as soon as it can, it has no concept of figuring out how to NOT render
        // the component after some preload operation
        // componentWillMount() is called before the component shows up in the DOM - not necessarily a better place to call it
        //      in either case we're always going to end up with a component being rendered one time before we successfully fetch our data
        //      just because it takes some amount of time to make that API request
        this.props.fetchPosts();
    }


    render() {
        return (
            <div>
                Posts Index
            </div>
        )
    }
}


// in the past we made use of the connect helper by defining the mapDispatchToProps function
// whenever we wanted to get an action creator directly into a component so we can call it off the props object
// This is an alternative way to wire up an action creator (more of a shortcut) - below is identical in nature

// export default connect(null, { fetchPosts: fetchPosts })(PostsIndex);
export default connect(null, { fetchPosts })(PostsIndex);

// there are still times when you want to use separate mapDispatchToProps function
// eg if you want to do some computation on exactly how you want to call the action creator ahead of time
// it also gives more insight on whats going on behind the scenes

// passing in the action creator like in above just asks connect() to do that extra step for us
// we'll be using this syntax from now on unless there's a good reason to bind the dispatch function ahead of time