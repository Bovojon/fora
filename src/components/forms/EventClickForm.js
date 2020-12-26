import React from 'react';
import { connect } from 'react-redux';
import styled from "styled-components";
import { 
  Grid,
  Button as MuiButton,
  Dialog,
  DialogActions as MuiDialogActions,
  DialogContent as MuiDialogContent,
  DialogContentText as MuiDialogContentText
} from '@material-ui/core';

const DialogContent = styled(MuiDialogContent)`
  min-width: 320px;
  padding: 0px 30px;
`

const DialogContentText = styled(MuiDialogContentText)`
  color: #5f6368;
  font: 500 17px / 20px Roboto, sans-serif;
  margin-bottom: 10px;
  margin-top: 15px;
`

const DialogActions = styled(MuiDialogActions)`
  padding: 18px 20px;
`

const Button = styled(MuiButton)`
  margin: 5px 0px;
`

const EventClickForm = ({ dialogIsOpen, handleDialogClose, fullScreen, handleScheduleEventClick, handleSelectTimeClick, eventObject }) => {
  const handleScheduleClick = () => { handleScheduleEventClick(eventObject) }

  return (
    <Dialog open={dialogIsOpen} onClose={handleDialogClose} fullWidth={fullScreen} maxWidth="sm">
      <DialogContent>
        <DialogContentText>Add this slot to the list of selected times or schedule a new event?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Grid container direction="row" justify="space-evenly" alignItems="center">
          <Button onClick={handleSelectTimeClick} variant="contained" disableElevation>Add to selected times</Button>
          <Button onClick={handleScheduleClick} variant="contained" disableElevation>Schedule new event</Button>
        </Grid>
      </DialogActions>
    </Dialog>
  );
}

const mapStateToProps = (state) => {
  return {
		eventObject: state.event
  }
}

export default connect(mapStateToProps)(EventClickForm);