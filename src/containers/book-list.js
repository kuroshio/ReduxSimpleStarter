import React, {Component} from 'react';
import {connect} from 'react-redux';    // react-redux is the glue between react and redux, they're completely separate
import {selectBook} from '../actions/index';
import {bindActionCreators} from 'redux';

class BookList extends Component {
    renderList() {
        return this.props.books.map((book) => {
            return  (
                <li
                    key={book.title}
                    onClick={() => this.props.selectBook(book)}
                    className="list-group-item">
                    {book.title}
                </li>
            )
        });
    }

    render() {
        // console.log(this.props.asdf) // -> '123'
        return (
            <ul className="list-group col-sm-4">
                {this.renderList()}
            </ul>
        )
    }
}

// take some state and map it to the props of our container
function mapStateToProps(state) {
    // this is the glue between react and redux
    // state contains array of books and the active book
    // whatever is returned will show up as props inside of BookList

    // whenever our application state changes:
    //      the object in the state function will be assigned as props to the component
    //      this container instantly rerenders with new list of books
    return {
        // asdf: '123'
        books: state.books
    }
}

// take an action creator and make it available to be called inside the container as well
// anything returned from this function will end up as props on the BookList container
function mapDispatchToProps(dispatch) {
    // whenever selectBook is called, the result should be passed to all of our reducers (using dispatch)
    // when action creator (selectBook)_ is called, the result flows through dispatch function
    // dispatch receives all these actions like a funnel and spits them back out to all the reducers in the application
    // remember selectbook just returns a plain JS object - container itself doesnt care about it, only reducers do
    // so bindactioncreators/dispatch  makes sure it flows through all the reducers
    return bindActionCreators({selectBook:selectBook}, dispatch)
}

// connect() takes a function (mapStateToProps) and component (BookList) and returns a container
// a container is a component that is aware of the state that is contained by redux
// we don't want to export the plain BookList container, we want to export the container
// whenever application state changes the object in the state function (mapStateToProps) will be assigned as props to 
// the component (BookList)

// promote BookList from a component to a container - it needs to know about this new dispatch method, selectBook.
// Make it available as a prop.
export default connect(mapStateToProps, mapDispatchToProps)(BookList);

// This is essentially what's going on behind the scenes:
// function connect(mapStateToProps) {
//     return function(component) {
//     }
// }
// The first set of parens calls 'connect'.  Connect itself returns a function.
// The second set of parens calls the function that was returned from connect.
