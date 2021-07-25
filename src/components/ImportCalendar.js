import React from 'react';
import styled from 'styled-components';
import {
  Grid,
  Button as MuiButton,
  Box,
} from '@material-ui/core';

const Button = styled(MuiButton)`
  margin-bottom: 1rem;
  text-transform: none;
  font: 600 14px / 20px Roboto, sans-serif;
  :hover {
    background-color: #fddede;
  }
  :focus {
    outline: none;
  }
  border-radius: 9999px;
  padding: 0.8rem 1.1rem;
  background-color: #fddede;
  color: #4299e1 !important;
`

const ImportCalendar = ({ handleImportCalendarClick }) => {
  return (
    <Box m={1}>
      <Grid container direction="column" justify="center" alignItems="center">
        <Button onClick={handleImportCalendarClick} variant="contained" color="primary" disableElevation>Import calendar</Button>
      </Grid>
  </Box>
  );
}

export default ImportCalendar;