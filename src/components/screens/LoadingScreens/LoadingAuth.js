import React from "react";
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { useLocation } from "react-router-dom";

import { addAuthCodeSuccess } from '../../../actions/authActionCreators';
import '../../animations/styles/loading.scss';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
}

const LoadingAuth = ({ navigateTo, addAuthCode }) => {
  const query = useQuery();
  const code = query.get("code");
  if (code !== null) {
    addAuthCode(code);
    navigateTo("/event");
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
    addAuthCode: (code) => { dispatch(addAuthCodeSuccess(code)) }
  }
}

export default connect(null, mapDispatchToProps)(LoadingAuth);