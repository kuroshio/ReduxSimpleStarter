// Redux Blog Post API Reference
// https://reduxblog.herokuapp.com

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

// BrowserRouter interacts with history library
// Route is a react component that can render inside of any other React component
// purpose of Route to provide the configuration "if URL looks like this, show this component, if it looks like that URL
// show that component"
import { BrowserRouter, Route } from 'react-router-dom';

import App from './components/app';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware()(createStore);

class Hello extends React.Component {
    render() {return <div>Hello!</div>}
}

class Goodbye extends React.Component {
    render() {return <div>Goodbye!</div>}
}

// Route components in BrowserRouter match a given path to a particular component to show on the screen
// we are still free to mix in any other components along with the route components, like a header
// Route component just used to shows or hides child component depending on the URL
ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
      <BrowserRouter>
          <div>
            Header
            <Route path="/hello" component={Hello}/>
            <Route path="/goodbye" component={Goodbye}/>
          </div>
      </BrowserRouter>
  </Provider>
  , document.querySelector('.container'));
