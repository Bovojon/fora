import React, { useEffect } from "react";
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import anime from 'animejs/lib/anime.es.js';
import { Grid } from '@material-ui/core';
import styled from 'styled-components';

import '../../animations/styles/loading.scss';

const LoadingMessage = styled.div`
  position: absolute;
  top: 65%;
  text-align: center;
`

const LOADING_MESSAGE = "Getting calendar ready...";

const LoadingNewCalendar = ({ calendar, navigateTo }) => {
	useEffect(() => {
    if (calendar.status.isLoading === false) navigateTo(`/${calendar.unique_id}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [calendar]);

  const addSpanAroundLetters = (str) => {
    const arr = [];
    for (let i = 0; i < str.length; i++) {
      const c = str.charAt(i);
      if (c === " ") {
        arr.push(<span key={i}>{'   '}</span>)
      } else {
        arr.push(<span key={i} className='letter'>{str.charAt(i)}</span>)
      }
    }
    return arr
  }

  anime.timeline({loop: true})
    .add({
      targets: '.ml6 .letter',
      translateY: ["1.1em", 0],
      translateZ: 0,
      duration: 1200,
      delay: (el, i) => 80 * i
    }).add({
      targets: '.ml6',
      opacity: 0,
      duration: 2000,
      easing: "easeOutExpo",
      delay: 1500
    });

	return (
    <Grid container direction="column" justify="center" alignItems="center">
      <div className="loader"></div>
      <LoadingMessage>
        <h1 className="ml6">
          <span className="text-wrapper">
            <span className="letters">
              {addSpanAroundLetters(LOADING_MESSAGE)}
            </span>
          </span>
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