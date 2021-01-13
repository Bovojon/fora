import React from "react";
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { useLocation } from "react-router-dom";

import { fetchAccessTokenPending } from '../../../actions/authActionCreators';
import { fetchCalendarSuccess } from '../../../actions/calendarActionCreators';
import { setCurrentUserPending } from '../../../actions/userActionCreators';
import { addEventPending, importEventsPending } from '../../../actions/eventActionCreators';
import '../../animations/styles/loading.scss';

const useQuery = () => { return new URLSearchParams(useLocation().search) }

const LoadingAuth = ({ navigateTo, addCalendar, setCurrentUser, addEvent, fetchAccessToken, importEvents }) => {
  if (localStorage.getItem('fora-token') !== null) {
    console.log(localStorage.getItem('fora-token'))
  }
  
  const query = useQuery();
  const code = query.get("code");
  fetchAccessToken(code);
  const localStorageFora = JSON.parse(localStorage.getItem('fora'));
  const { calendar, currentUser, redirectUrl, calDetails } = localStorageFora;
  addCalendar(calendar);
  setCurrentUser(currentUser);
  if (typeof localStorageFora?.eventObject !== "undefined") addEvent(localStorageFora.eventObject);
  localStorage.removeItem('fora');
  if (redirectUrl !== "/event") importEvents(calDetails);
  navigateTo(redirectUrl);

	return (
		<div className="loader-wrapper">
      <div className="loader">
        <div className="roller"></div>
        <div className="roller"></div>
      </div>
      <div id="loader2" className="loader">
        <div className="roller"></div>
        <div className="roller"></div>
      </div>
      <div id="loader3" className="loader">
        <div className="roller"></div>
        <div className="roller"></div>
      </div>
    </div>
	)
}

const mapDispatchToProps = (dispatch) => {
  return {
    navigateTo: (route) => { dispatch(push(route)) },
    addCalendar: (calendarObj) => { dispatch(fetchCalendarSuccess(calendarObj)) },
    setCurrentUser: (userObj) => { dispatch(setCurrentUserPending(userObj)) },
    addEvent: (eventObj) => { dispatch(addEventPending(eventObj)) },
    fetchAccessToken: (code) => { dispatch(fetchAccessTokenPending(code)) },
    importEvents: (calDetails) => { dispatch(importEventsPending(calDetails)) }
  }
}

export default connect(null, mapDispatchToProps)(LoadingAuth);