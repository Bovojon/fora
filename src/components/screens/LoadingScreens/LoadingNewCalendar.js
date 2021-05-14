import React, { useState, useEffect } from "react";
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

const sentences = [
  "You look great today!",
  "Tip: Click on an available time to schedule a new event.",
  "One moment please...",
  "Polishing the edges.",
  "Almost there.",
  "Tip: Click and drag on the calendar to add your available times."
]

const LoadingNewCalendar = ({ calendar, navigateTo }) => {
  const [sentence, setSentence] = useState("Getting calendar ready...");

  useEffect(() => {
    const interval = setInterval(() => {
      setSentence(sentences[Math.floor(Math.random() * sentences.length)]);
    }, 5000);
    return () => clearInterval(interval);
  }, []);


	useEffect(() => {
    if (calendar.status.isLoading === false) navigateTo(`/${calendar.unique_id}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [calendar]);

	return (
    <Grid container direction="column" justify="center" alignItems="center">
      <div className="loader"></div>
      <LoadingMessage>
        <h1 className="ml6">
          <span className="textAnimation">{sentence}</span>
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