import React, { useEffect } from "react";
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { useLocation } from "react-router-dom";

import { addAuthCodeSuccess } from '../../actions/authActionCreators';
import '../animations/styles/loading.scss';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
}

const LoadingTransition = ({ calendar, navigateTo, addAuthCode }) => {
  const query = useQuery();
  const code = query.get("code");
  // const { code } = useQuery();

  useEffect(() => {
    if (code !== null) {
      addAuthCode(code);
      navigateTo("/event");
    }
  }, [code]);

	useEffect(() => {
    if (calendar.status.isLoading === false && code === null) navigateTo(`/${calendar.unique_id}`);
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
    navigateTo: (route) => { dispatch(push(route)) },
    addAuthCode: (code) => { dispatch(addAuthCodeSuccess(code)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoadingTransition);