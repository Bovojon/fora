import React, { useState, useEffect } from 'react';
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

import { createUserPending, updateUserPending } from '../../actions/userActionCreators';

const DialogContent = styled(MuiDialogContent)`
  min-width: 320px;
`

const UserForm = ({ dialogIsOpen, handleDialogClose, fullScreen, user, createUser, updateUser }) => {
  let initialName = user?.name;
  let initialEmail = user?.email;
  if (initialName === null || typeof initialName === "undefined") initialName = "";
  if (initialEmail === null || typeof initialEmail === "undefined") initialEmail = "";

  const [name, setName] = useState(initialName);
  const [email, setEmail] = useState(initialEmail);

  useEffect(() => {
    if (initialName !== null && typeof initialName !== "undefined") setName(initialName);
    if (initialEmail !== null && typeof initialEmail !== "undefined") setEmail(initialEmail);
  }, [initialName, initialEmail]);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handleSubmitClick = () => {
    const userObj = { email, name };
    const userId = user?.id;
    if (typeof userId === "undefined") {
      createUser(userObj);
    } else {
      userObj.id = userId;
      updateUser(userObj);
    }
    handleDialogClose();
  };

  return (
    <Dialog open={dialogIsOpen} onClose={handleDialogClose} fullWidth={fullScreen} maxWidth="sm">
      <DialogContent>
        <Grid container direction="column" justify="center" alignItems="center">
          <TextField value={name} onChange={handleNameChange} id="name" placeholder="Name" type="text" fullWidth margin="normal" autoFocus />
          <TextField value={email} onChange={handleEmailChange} id="email" placeholder="Email" type="email" fullWidth margin="normal" />
          <Button color="primary" disabled={user.status.isLoading} onClick={handleSubmitClick}>
            {user.status.isLoading && <CircularProgress size={24} />}
          </Button>

        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmitClick} color="primary">Done</Button>
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
    createUser: (userObj) => { dispatch(createUserPending(userObj)) },
    updateUser: (userObj) => { dispatch(updateUserPending(userObj)) }
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(UserForm);