import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';

// reduxForm is a function - very similar to the connect helper we've been using from react-redux
// remember in index.js we hooked up formReducer - this reduxForm allows our component to communicate with this reducer
// allows our component to talk directly to the redux store


// with redux form we don't have to write all that boilerplate code for inputs
// we dont have to put together a set state call or make an action creator or set the value of input
// all the pieces of boilerplate code are going to be handled automatically for us by redux-form

// when user submits the form, we pass 2 callbacks to redux-form that validate the inputs user provided
// then we will handle form submittal - thats when redux-form hands control of the form back to us eg save it to backend server
// redux form is only responsible for managing the state of our form, handdling the data
// its up to us to show markup that represents the form - hence the component
class PostsNew extends Component {
    // name property = what piece of state we're editing
    // Field component knows how to communicate with ReduxForm BUT it doesn't know how to produce JSX to show itself on screen
    // so component property is to add in a function that returns some JSX to show that field on the screen
    //      takes a reference to a function so no parens needed - Field will call the function, not us

    renderField(field) {    // field represents a single piece of state
                            // can be given arbitrary properties and automatically created properties (.input and .meta.error)
        // field object contains some event handlers we need to wire up to the JSX we're returning
        // the input needs to be tracked by the corresponding Field component
        // up to us to make sure the Field component recognizes that when it calls renderTitleField, it needs to be
        // responsible for handling any changes to the input
        // field.input is an object containing a bunch of event handlers and props - like onChange, onblur, onfocus, value etc
        // the ... indicates we want all these properties in it he object to be communicated as props to the input tag
        // just fancy JSX to so we dont have to do this:
        /*
            <input
                type="text"
                onChange={field.input.onChange}
                onFocus={field.input.onFocus}
                onBlur={field.input.onBlur}
            />
        */

        // when you have two pieces of JSX that look very similar, you want to start thinking about not repeating yourself

        // .input is automatically created property
        // .meta.error automatically added to field object from validate function
        return (
            <div className="form-group">
                <label>{field.label}</label>
                <input
                    className="form-control"
                    type="text"
                    {...field.input}
                />
                {field.meta.error}
            </div>
        )
    }

    onSubmit(values) {
        // this === component
        console.log(values);
    }

    // you can pass in any arbitrary property to the Field component, it will automatically be attached to the field
    // argument (in renderField function)

    // redux form handles STATE,. incl values, validation, etc. It does NOT take care of posting form data to backend server
    render() {
        // below we wired up reduxForm to PostNew component (similar to connect())
        // that connect() helper was used to add some additional properties to our component
        // when we wire up reduxForm below, it adds a bunch of additional properties that are passed to the PostsNew comp
        // so when we reference this.props and pull off handleSubmit(), this is a property that
        // has been passed to the component on behalf of reduxForm

        const {handleSubmit} = this.props;

        // there are 2 pieces of responsibility for handling form submittal - the redux-form side of going through
        // validation process and deciding if form should be submitted, and our side where we take all this data and submit to backend server
        // handleSubmit takes a function that I define, then runs the redux form side of things
        // then redux form says if everything is valid, then go ahead and call the callback this.onSubmit
        // .bind(this) because we are passing this.onSubmit as a callback function that will be executed in some diff context outside of our component
        // so to make sure we still have access to the correct this (essentially our component) inside of this we add on the bind(this)
        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field
                    label="Title For Post"
                    name="title"
                    component={this.renderField}
                />
                <Field
                    label="Categories"
                    name="categories"
                    component={this.renderField}
                />
                <Field
                    label="Post Content"
                    name="content"
                    component={this.renderField}
                />
                <button type="submit" className="btn btn-primary"> Submit</button>
            </form>
        );
    }
}

// validate() will be called automatically for us at certain points during the form's lifecycle
// whenever the user tries to submit the form (submit button or enter key)
// given a single arg, by convention caled vallues - object containing values user entered into form
// errors property name has to match the name of the corresponding Field component
function validate(values) {
    const errors = {}


    // validate the inputs from 'values'
    // if (values.title.length < 3) {
    //     errors.title = "Title must be at least 3 characters";
    // }

    if (!values.title) {
        errors.title = "Enter a title";
    }
    // Alternative:
    // if (!values.title || values.title.length < 3) {
    //     errors.title = "Enter a title that is at least 3 characters";
    // }

    if (!values.categories) {
        errors.categories = "Enter some categories";
    }

    if (!values.content) {
        errors.content = "Enter some content";
    }

    // if we return an empty object, redux-form assumes there is nothing wrong and form is fine to submit
    // if errors has ANY properties, redux form assumes form is invalid
    return errors;
}

// remember when we used the connect helper, we defined mapStateToProps and mapDispatchToProps functions
// in the case of redux-form we pass a single argument - a function that takes config options
// below, you can think of 'form' key as being the name of the form
//      you might want to show multiple forms on a single page at a time eg sign in and sign up form
//      Make sure the string assigned to form property is unique
//      If you had another reduxForm in a different component with same form property string,
//      it would caause the state of the two components to be merged

// we use reduxForm to wrap PostsNew component - by doing so we gave reduxForm the ability to communicate
// directly from this component to the reducer that we wired up
// form property allows you to specify a namespace of sorts for all the state thats going to be generated
// by this component - just needs to be unique if we want this form to be isolated and not share its state
// with other forms
export default reduxForm({
    validate, // validate: validate,
    form: 'PostsNewForm'
})(PostsNew);
