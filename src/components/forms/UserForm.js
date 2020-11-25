import React, { useState, useEffect, useRef } from 'react';
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

  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handleSubmitClick = () => {
    const userObj = { email, name };
    const userId = user?.id;
    if (typeof userId !== "undefined") {
      userObj.id = userId;
      updateUser(userObj);
    }
    handleDialogClose();
  };
  const handleNameKeyPress = (e) => {
    if(e.keyCode === 13) inputRef.current.focus();
  }
  const handleEmailKeyPress = (e) => {
    if(e.keyCode === 13) handleSubmitClick()
  }

  return (
    <Dialog open={dialogIsOpen} onClose={handleDialogClose} fullWidth={fullScreen} maxWidth="sm">
      <DialogContent>
        <Grid container direction="column" justify="center" alignItems="center">
          <TextField value={name.includes("Person") ? "" : name} onChange={handleNameChange}  onKeyDown={handleNameKeyPress} id="name" placeholder="Name" type="text" fullWidth margin="normal" autoFocus />
          <TextField value={email} onChange={handleEmailChange} onKeyDown={handleEmailKeyPress} inputRef={inputRef} id="email" placeholder="Email" type="email" fullWidth margin="normal" />
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmitClick} disabled={user.status.isLoading} color="primary">
          { user.status.isLoading ? <CircularProgress size={24} /> : "Done" }
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