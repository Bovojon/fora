import React from "react";
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import axios from 'axios';
import { useLocation } from "react-router-dom";

import { addAuthCodeSuccess } from '../../../actions/authActionCreators';
import { fetchCalendarSuccess, importCalendarSuccess } from '../../../actions/calendarActionCreators';
import { setCurrentUserPending } from '../../../actions/userActionCreators';
import { addEventPending } from '../../../actions/eventActionCreators';
import '../../animations/styles/loading.scss';

const useQuery = () => { return new URLSearchParams(useLocation().search) }

const LoadingAuth = ({ navigateTo, addAuthCode, addCalendar, setCurrentUser, addEvent, addImportedEvents }) => {
  const code = useQuery().get("code");
  const localStorageContent = JSON.parse(localStorage.getItem('fora'));
  const { calendar, currentUser, redirectUrl } = localStorageContent;
  addCalendar(calendar);
  setCurrentUser(currentUser);
  if (redirectUrl !== "/event") {
    const { calendarDetails } = localStorageContent;
    axios({
			method: 'post',
      url: `${process.env.REACT_APP_URL}/auth/google/list`,
      data: { ...calendarDetails, code }
		}).then(response => {
      addImportedEvents(response.data.events.data.items)
		}).catch(err =>{
			console.error(err);
		});
  } else {
    if (code !== null) {
      addAuthCode(code);
      const { eventObject } = localStorageContent;
      addEvent(eventObject);
    } else {
      navigateTo(`/${calendar.unique_id}`);
      return
    }
  }
  localStorage.removeItem('fora');
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
    addAuthCode: (code) => { dispatch(addAuthCodeSuccess(code)) },
    addCalendar: (calendarObj) => { dispatch(fetchCalendarSuccess(calendarObj)) },
    setCurrentUser: (userObj) => { dispatch(setCurrentUserPending(userObj)) },
    addEvent: (eventObj) => { dispatch(addEventPending(eventObj)) },
    addImportedEvents: (events) => { dispatch(importCalendarSuccess(events)) }
  }
}

export default connect(null, mapDispatchToProps)(LoadingAuth);