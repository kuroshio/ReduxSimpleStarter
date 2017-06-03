import React, {Component} from 'react';
import BookList from '../containers/book-list';
import BookDetail from '../containers/book-detail';


// Review Notes:
// Redux is in charge of managing application state, which is a single plain Javascript Object
// Application state is completely different and separate from component state

// Application state is formed by reducers
// reducers all get tied together by combineReducers method
// for each key in that object we assign one reducer which is responsible for creating that piece of state

// reducers are responsible for changing application state over time, and do that through use of actions.
// when action is dispatched it flows through all the diff reducers of application
// each reducer has the option to return a diff piece of state than usual based on the type of action received

// action creators are just simple functions that return an action
// action is just a plain javascript object
// actions must always have a type defined, and optionally have a payload or any number of properties
export default class App extends Component {
    render() {
        return (
            <div>
                <BookList />
                <BookDetail />
            </div>
        );
    }


}
