import React from 'react';
import styled from "styled-components";
import { 
  Grid,
  Button,
  Dialog,
  DialogActions,
  DialogContent as MuiDialogContent
} from '@material-ui/core';

const DialogContent = styled(MuiDialogContent)`
  min-width: 320px;
`

const EventClickForm = ({ dialogIsOpen, handleDialogClose, fullScreen, handleScheduleEventClick, handleSelectTimeClick }) => {

  return (
    <Dialog open={dialogIsOpen} onClose={handleDialogClose} fullWidth={fullScreen} maxWidth="sm">
      <DialogContent>
        <p>Would you like to add this slot to the list of selected times or proceed with scheduling a new event?</p>
      </DialogContent>
      <DialogActions>
        <Grid container direction="row" justify="flex-end" alignItems="center">
          <Button onClick={handleSelectTimeClick} color="primary">Add to selected times</Button>
          <Button onClick={handleScheduleEventClick} color="primary">Schedule new event</Button>
        </Grid>
      </DialogActions>
    </Dialog>
  );
}

export default EventClickForm;