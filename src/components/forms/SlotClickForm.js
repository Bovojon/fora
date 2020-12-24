import React from 'react';
import { connect } from 'react-redux';
import styled from "styled-components";
import { 
  Grid,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent as MuiDialogContent,
  CircularProgress
} from '@material-ui/core';

import { updateUserPending } from '../../actions/userActionCreators';

const DialogContent = styled(MuiDialogContent)`
  min-width: 320px;
`

const SlotClickForm = ({ dialogIsOpen, handleDialogClose, fullScreen, user, createUser, updateUser }) => {
  
  const handleScheduleEventClick = () => {
    handleDialogClose();
  };
  const handleSelectTimeClick = () => {
    handleDialogClose();
  };

  return (
    <Dialog open={dialogIsOpen} onClose={handleDialogClose} fullWidth={fullScreen} maxWidth="sm">
      <DialogContent>
        <p>Would you like to add this slot to the list of selected times or proceed with scheduling a new event?</p>
      </DialogContent>
      <DialogActions>
        <Grid container direction="row" justify="center" alignItems="center">
          <Button onClick={handleSelectTimeClick} color="primary">Add to list of times</Button>
          <Button onClick={handleScheduleEventClick} color="primary">Schedule new event</Button>
        </Grid>
      </DialogActions>
    </Dialog>
  );
}

export default SlotClickForm;