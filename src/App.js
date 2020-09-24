import React from 'react';
import { Switch, Route } from "react-router-dom";
import { ConnectedRouter } from 'connected-react-router';
import ReduxToastr from 'react-redux-toastr';

import { history } from './store';
import Home from './screens/Home';
import Calendar from './screens/Calendar';
import NotFound from './screens/NotFound';

import "tailwindcss/dist/base.css";

import './App.css';
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";

function App() {
  return (
      <div className="App">
        <ReduxToastr timeOut={4000} transitionIn="fadeIn" transitionOut="fadeOut" />
        <ConnectedRouter history={history}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route component={NotFound} />
          </Switch>
        </ConnectedRouter>
      </div>
  )
}

export default App;