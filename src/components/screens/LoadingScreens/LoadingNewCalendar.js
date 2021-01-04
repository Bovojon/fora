import React, { useEffect } from "react";
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import '../../animations/styles/loading.scss';

const LoadingNewCalendar = ({ calendar, navigateTo }) => {
	useEffect(() => {
    if (calendar.status.isLoading === false) navigateTo(`/${calendar.unique_id}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [calendar]);

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

const mapStateToProps = (state) => {
  return {
		calendar: state.calendar
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    navigateTo: (route) => dispatch(push(route))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoadingNewCalendar);