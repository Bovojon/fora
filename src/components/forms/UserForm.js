import React from 'react';
import styled from "styled-components";
import { 
  Grid,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent as MuiDialogContent,
} from '@material-ui/core';

const DialogContent = styled(MuiDialogContent)`
  min-width: 320px;
`

const UserForm = ({ dialogIsOpen, handleDialogClose, fullScreen }) => {

  return (
    <Dialog open={dialogIsOpen} onClose={handleDialogClose} fullWidth={fullScreen} maxWidth="sm">
      <DialogContent>
        <Grid container direction="column" justify="center" alignItems="center">
          <TextField autoFocus id="name" placeholder="Name" type="text" fullWidth margin="normal" />
          <TextField id="email" placeholder="Email" type="email" fullWidth margin="normal" />
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDialogClose} color="primary">Done</Button>
      </DialogActions>
    </Dialog>
  );
}

export default UserForm;