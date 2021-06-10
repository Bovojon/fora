import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import styled from "styled-components";
import {
  Grid,
  TextField,
  Button as MuiButton,
  Dialog,
  DialogActions as MuiDialogActions,
  DialogContent as MuiDialogContent,
  CircularProgress
} from '@material-ui/core';

import { updateUserPending } from '../../actions/userActionCreators';

const DialogContent = styled(MuiDialogContent)`
  padding: 25px 35px 0px 35px !important;
`

const DialogActions = styled(MuiDialogActions)`
  padding: 30px 20px !important;
`

const Button = styled(MuiButton)`
  font-size: 1rem;
  border-radius: 9999px;
  background-color: #fddede;
  color: #4299e1 !important;
  :hover {
    background-color: #fddede;
  }
  border-radius: 9999px;
  padding: 0.8rem 1.1rem;
  width: 100%;
  margin-bottom: 10px;
  :focus {
    outline: none;
  }
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
        <Grid container direction="column" justify="center" alignItems="center">
          <TextField value={name} onChange={handleNameChange}  onKeyDown={handleNameKeyPress} id="name" label="Name" type="text" fullWidth margin="normal" autoFocus />
          <TextField value={email} onChange={handleEmailChange} onKeyDown={handleEmailKeyPress} inputRef={inputRef} id="email" label="Email" type="email" fullWidth margin="normal" />
        </Grid>
      </DialogContent>
      <DialogActions>
        <Grid container direction="column" justify="center" alignItems="center">
          <Button onClick={handleDialogClose} variant="contained" disableElevation>Skip</Button>
          <Button onClick={handleSubmitClick} disabled={user.status.isLoading} variant="contained" disableElevation>
            { user.status.isLoading ? <CircularProgress size={24} /> : "Submit" }
          </Button>
        </Grid>
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