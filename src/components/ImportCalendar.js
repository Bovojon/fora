import React from 'react';
import styled from 'styled-components';
import {
  Grid as MuiGrid,
  Button as MuiButton
} from '@material-ui/core';

const Grid = styled(MuiGrid)`
  margin-bottom: 10px;
`

const Button = styled(MuiButton)`
  margin-bottom: 15px;
  background-color: #4299e1;
  text-transform: none;
  font: 400 16px / 20px Roboto, sans-serif;
  :hover {
    background-color: #4299e1;
  }
`

const LightText = styled.span`
  color: #5f6368;
  font: 400 15px / 20px Roboto, sans-serif;
  margin-bottom: 15px;
  text-align: center
`

const ImportCalendar = () => {
  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <Button variant="contained" color="primary" disableElevation>Import Calendar</Button>
      <LightText>Import calendar to check available times. Your calendar will not be visible to others.</LightText>
    </Grid>
  );
}

export default ImportCalendar;