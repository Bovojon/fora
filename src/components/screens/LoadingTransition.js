import React, { useEffect } from "react";
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

const LoadingTransition = ({ calendar, navigateTo }) => {
	useEffect(() => {
    if (calendar.status.isLoading === false) {
      navigateTo(`/${calendar.unique_id}`);
    }
  }, [calendar]);

	return (
		<p>Loading</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(LoadingTransition);