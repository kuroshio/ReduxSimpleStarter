import { combineReducers } from 'redux';

// as keyword essentially doing import of reducer property and assigned to alias of formReducer
// just renaming this property since reducer is too generic a keyword
import { reducer as formReducer } from 'redux-form';
import PostsReducer from './reducer_posts'

// internally, redux-form uses our instance of the redux store for handling all the state being produced by the form
// like the actual form thats getting rendered on the screen
// at the end of the day, redux-form just saves us from having to wire up a bunch of manual action creators
// more just a time saver
// important to assign key of "form" - all different forms we hook up inside our different components are going to assume
// that the formReducer is being applied to the "form" piece of state
const rootReducer = combineReducers({
  posts: PostsReducer,
  form: formReducer
});

export default rootReducer;
