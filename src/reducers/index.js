import { combineReducers } from 'redux';
import BooksReducer from './reducer_books';
import ActiveBook from './reducer_active_book';

// any key to the object we provide to combineReducers ends up as a key on our global state
const rootReducer = combineReducers({
    // state: (state = {}) => state
    books: BooksReducer,
    activeBook: ActiveBook
});

export default rootReducer;

