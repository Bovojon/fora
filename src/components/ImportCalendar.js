import React from 'react';
import styled from 'styled-components';
import {
  Grid as MuiGrid,
  Button as MuiButton
} from '@material-ui/core';

const Grid = styled(MuiGrid)`
  margin-bottom: 25px;
`

const Button = styled(MuiButton)`
  margin-bottom: 1rem;
  text-transform: none;
  font: 600 16px / 20px Roboto, sans-serif;
  :hover {
    background-color: #fddede;
  }
  border-radius: 9999px;
  padding: 0.8rem 1.1rem;
  background-color: #fddede;
  color: #4299e1 !important;
`

const LightText = styled.span`
  color: #5f6368;
  font: 400 15px / 20px Roboto, sans-serif;
  text-align: center
`

const ImportCalendar = ({ handleImportCalendarClick }) => {
  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <Button onClick={handleImportCalendarClick} variant="contained" color="primary" disableElevation>Import calendar</Button>
      <LightText>Check when you're available. Details about your personal calendar will not be visible to others.</LightText>
    </Grid>
  );
}

export default ImportCalendar;