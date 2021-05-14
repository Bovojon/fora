import React, { useEffect } from "react";
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { Grid } from '@material-ui/core';
import styled from 'styled-components';

import '../../animations/styles/loading.scss';

const LoadingMessage = styled.div`
  position: absolute;
  top: 65%;
  text-align: center;
`

const LoadingNewCalendar = ({ calendar, navigateTo }) => {
	useEffect(() => {
    if (calendar.status.isLoading === false) navigateTo(`/${calendar.unique_id}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [calendar]);

	return (
    <Grid container direction="column" justify="center" alignItems="center">
      <div className="loader"></div>
      <LoadingMessage>
        <h1 className="ml6">
          <span className="textAnimation">Getting calendar ready...</span>
        </h1>
      </LoadingMessage>
    </Grid>
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