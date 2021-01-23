import React from 'react';
import styled from "styled-components";
import { 
  Grid,
  Button as MuiButton,
  Dialog,
  DialogActions as MuiDialogActions
} from '@material-ui/core';

const DialogActions = styled(MuiDialogActions)`
  padding: 30px 40px;
`

const Button = styled(MuiButton)`
  margin: 7px 0px;
`

const EventClickForm = ({ dialogIsOpen, handleDialogClose, fullScreen, handleScheduleEventClick, handleAddTime, handleDelete, eventObj, timeSelectedObj, isOwner }) => {
  const handleDeleteClick = () => {
    handleDialogClose();
    handleDelete(timeSelectedObj.id);
  }
  const handleAddTimeClick = () => {
    handleDialogClose();
    handleAddTime(timeSelectedObj);
  }
  const handleScheduleClick = () => {
    handleDialogClose();
    handleScheduleEventClick(eventObj);
  }

  return (
    <Dialog open={dialogIsOpen} onClose={handleDialogClose} fullWidth={fullScreen} maxWidth="sm">
      <DialogActions>
        <Grid container direction="column" justify="space-around" alignItems="center">
          {isOwner ?
            <Button onClick={handleDeleteClick} variant="contained" disableElevation>Remove Time</Button>
            :
            <Button onClick={handleAddTimeClick} variant="contained" disableElevation>Select same time</Button>
          }
          <Button onClick={handleScheduleClick} variant="contained" disableElevation>Schedule new event</Button>
        </Grid>
      </DialogActions>
    </Dialog>
  );
}

export default EventClickForm;