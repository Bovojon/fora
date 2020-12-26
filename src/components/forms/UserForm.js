import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import styled from "styled-components";
import { 
  Grid,
  TextField,
  Button,
  Dialog,
  DialogActions as MuiDialogActions,
  DialogContent as MuiDialogContent,
  DialogContentText as MuiDialogContentText,
  CircularProgress
} from '@material-ui/core';

import { updateUserPending } from '../../actions/userActionCreators';

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

const UserForm = ({ dialogIsOpen, handleDialogClose, fullScreen, user, createUser, updateUser }) => {
  let initialName = user?.name;
  let initialEmail = user?.email;
  if (initialName === null || typeof initialName === "undefined") initialName = "";
  if (initialEmail === null || typeof initialEmail === "undefined") initialEmail = "";

  const [name, setName] = useState(initialName);
  const [email, setEmail] = useState(initialEmail);
  const inputRef = useRef();

  useEffect(() => {
    if (initialName !== null && typeof initialName !== "undefined") setName(initialName);
    if (initialEmail !== null && typeof initialEmail !== "undefined") setEmail(initialEmail);
  }, [initialName, initialEmail]);

  const handleNameChange = (event) => { setName(event.target.value) };
  const handleEmailChange = (event) => { setEmail(event.target.value) };
  const handleSubmitClick = () => {
    const userObj = { email, name };
    const userId = user?.id;
    if (typeof userId !== "undefined") {
      userObj.id = userId;
      updateUser(userObj);
    }
    handleDialogClose();
  };
  const handleNameKeyPress = (e) => { if(e.keyCode === 13) inputRef.current.focus() };
  const handleEmailKeyPress = (e) => { if(e.keyCode === 13) handleSubmitClick() };

  return (
    <Dialog open={dialogIsOpen} onClose={handleDialogClose} fullWidth={fullScreen} maxWidth="sm">
      <DialogContent>
        <DialogContentText>Add your name and email to receive calendar invites from other users.</DialogContentText>
        <Grid container direction="column" justify="center" alignItems="center">
          <TextField value={name.includes("Person") ? "" : name} onChange={handleNameChange}  onKeyDown={handleNameKeyPress} id="name" label="Name" type="text" fullWidth margin="normal" autoFocus />
          <TextField value={email} onChange={handleEmailChange} onKeyDown={handleEmailKeyPress} inputRef={inputRef} id="email" label="Email" type="email" fullWidth margin="normal" />
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmitClick} disabled={user.status.isLoading} variant="contained" disableElevation>
          { user.status.isLoading ? <CircularProgress size={24} /> : "Submit" }
        </Button>
      </DialogActions>
    </Dialog>
  );
}

const mapStateToProps = (state) => {
  return {
		user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
	return {
    updateUser: (userObj) => { dispatch(updateUserPending(userObj)) }
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(UserForm);