import React, {Component} from 'react';
import {connect} from 'react-redux';    // react-redux is the glue between react and redux, they're completely separate

class BookList extends Component {
    renderList() {
        return this.props.books.map((book) => {
            return  (
                <li key={book.title} className="list-group-item">{book.title}</li>
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


function mapStateToProps(state) {
    // this is the glue between react and redux
    // state contains array of books and the active book
    // whatever is returned will show up as props inside of BookList

    // when state changes, this container instantly rerenders with new list of books
    return {
        // asdf: '123'
        books: state.books
    }
}

// connect() takes a function (mapStateToProps) and component (BookList) and returns a container
// a container is a component that is aware of the state that is contained by redux
// we don't want to export the plain BookList container, we want to export the container
// whenever application state changes the object in the state function (mapStateToProps) will be assigned as props to 
// the component (BookList)
export default connect(mapStateToProps)(BookList);
