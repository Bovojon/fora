import React, { Fragment } from 'react';
import styled from 'styled-components';
import {
  Grid as MuiGrid,
  Button as MuiButton,
  Divider
} from '@material-ui/core';

const Grid = styled(MuiGrid)`
  margin-bottom: 25px;
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
  text-align: center
`

const ImportCalendar = ({ handleImportCalendarClick, calendar }) => {
  return (
    <Fragment>
      {typeof calendar?.importedEvents === "undefined" ?
        <Fragment>
          <Grid container direction="column" justify="center" alignItems="center">
            <Button onClick={handleImportCalendarClick} variant="contained" color="primary" disableElevation>Import Calendar</Button>
            <LightText>Check when you're available. Details about your calendar and events will not be visible to others.</LightText>
          </Grid>
          <Divider />
        </Fragment>
        :
        null
      }
    </Fragment>
  );
}

export default ImportCalendar;