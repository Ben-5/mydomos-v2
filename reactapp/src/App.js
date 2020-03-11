import React from 'react';
import './App.css';

//REDUX
import {Provider} from 'react-redux';
import {createStore, combineReducers}  from 'redux';

//REDUCERS
import currentUser from './reducers/user-reducer';
import visit from './reducers/visit-reducer';

//ROUTER DOM
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

//SCREENS
import AboutScreen    from './screens/About'
import AccountScreen  from './screens/Account'
import BookScreen     from './screens/Book'
import HomeScreen     from './screens/Home'
import BasketScreen   from './screens/Basket'
import ResultsScreen  from './screens/Results'
import SigninScreen   from './screens/Signin'
import SignupScreen   from './screens/Signup'
import SuccessScreen  from './screens/Success'
import VisitScreen    from './screens/Visit'

import RedirectToHome from '../src/toHome'

const STORE = createStore(combineReducers({currentUser, visit}), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default function App() {

  return (
    <Provider store={STORE}>
      <Router>
        <Switch>
          <Route path="/"         exact component={RedirectToHome} />
          <Route path="/home"     component={HomeScreen} />
          <Route path="/about"    component={AboutScreen} />
          <Route path="/account"  component={AccountScreen} />
          <Route path="/book/:_id"     component={BookScreen} />
          <Route path="/home"     component={HomeScreen} />
          <Route path="/basket"   component={BasketScreen} />
          <Route path="/results"  component={ResultsScreen} />
          <Route path="/signin"   component={SigninScreen} />
          <Route path="/signup"   component={SignupScreen} />
          <Route path="/success"  component={SuccessScreen} />
          <Route path="/visit/:_id"    component={VisitScreen} />
        </Switch>
      </Router>
    </Provider>
  );
}
