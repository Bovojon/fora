import React from "react";
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { useLocation } from "react-router-dom";

import { addAuthCodeSuccess } from '../../../actions/authActionCreators';
import { fetchCalendarSuccess } from '../../../actions/calendarActionCreators';
import { setCurrentUserPending } from '../../../actions/userActionCreators';
import { addEventPending } from '../../../actions/eventActionCreators';
import '../../animations/styles/loading.scss';

const useQuery = () => { return new URLSearchParams(useLocation().search) }

const LoadingAuth = ({ navigateTo, addAuthCode, addCalendar, setCurrentUser, addEvent }) => {
  const query = useQuery();
  const code = query.get("code");

  const { calendar, currentUser, eventObj } = JSON.parse(localStorage.getItem('fora'));
  addCalendar(calendar);
  setCurrentUser(currentUser);
  addEvent(eventObj);

  if (code !== null) {
    addAuthCode(code);
    navigateTo("/event");
  } else {
    navigateTo(`/${calendar.unique_id}`);
  }

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
    addAuthCode: (code) => { dispatch(addAuthCodeSuccess(code)) },
    addCalendar: (calendarObj) => { dispatch(fetchCalendarSuccess(calendarObj)) },
    setCurrentUser: (userObj) => { dispatch(setCurrentUserPending(userObj)) },
    addEvent: (eventObj) => { dispatch(addEventPending(eventObj)) }
  }
}

export default connect(null, mapDispatchToProps)(LoadingAuth);