import React from 'react';
import { Switch, Route } from "react-router-dom";
import { ConnectedRouter } from 'connected-react-router';
import tw from "twin.macro";

import { history } from './store';
import Navbar from "./components/Navbar";
import Home from './components/screens/Home';
import Calendar from './components/screens/Calendar';
import LoadingNewCalendar from './components/screens/LoadingScreens/LoadingNewCalendar';
import LoadingAuth from './components/screens/LoadingScreens/LoadingAuth';
import EventForm from './components/forms/EventForm';
import NotFound from './components/screens/NotFound';

import "tailwindcss/dist/base.css";

import './App.css';
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";

const StyledDiv = tw.div`min-h-screen text-gray-800 p-4 overflow-hidden`;

const App = () => {
  return (
      <StyledDiv className="App">
        <ConnectedRouter history={history}>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/event" component={EventForm} />
            <Route exact path="/auth/google" component={LoadingAuth} />
            <Route exact path="/creating_calendar" component={LoadingNewCalendar} />
            <Route exact path="/:calendarId" component={Calendar} />
            <Route component={NotFound} />
          </Switch>
        </ConnectedRouter>
      </StyledDiv>
  )
}

export default App;