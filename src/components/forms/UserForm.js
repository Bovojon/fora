import React, { useState } from 'react';
import { Clear, FilterNoneOutlined as CopyIcon } from '@material-ui/icons';
import styled from "styled-components";
import { 
  Grid,
  Modal, 
  Backdrop, 
  Fade,
  IconButton as MuiIconButton,
  makeStyles,
  Snackbar,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent as MuiDialogContent,
  DialogContentText,
  DialogTitle
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
}));

const ModalContent = styled(Grid)`
  padding: 0px 25px 0px 25px;
  border-radius: 8px;
  background-color: #fff;
  max-width: 400px;
  min-height: 160px;
  min-width: 400px;
`

const CloseIcon = styled(Clear)`
  cursor: pointer;
`

const SmallTitle = styled.span`
  font-size: 16px;
  font-weight: 500;
  letter-spacing: .1px;
  line-height: 24px;
`

const DialogContent = styled(MuiDialogContent)`
  min-width: 320px;
`

const UserForm = ({ dialogIsOpen, handleDialogClose, fullScreen }) => {
  const classes = useStyles();

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