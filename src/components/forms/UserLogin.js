import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import styled from "styled-components";
import { 
	Avatar as MuiAvatar, 
	List as MuiList,
  ListItem,
  ListItemAvatar,
  ListItemText,
  DialogTitle as MuiDialogTitle,
  Dialog,
} from '@material-ui/core';
import {
  Person as PersonIcon,
  Add as AddIcon
} from '@material-ui/icons';

import { createUserPending, setCurrentUserPending } from '../../actions/userActionCreators';

const Avatar = styled(MuiAvatar)`
  background-color: #bbdefb;
  color: #1e88e5;
`

const DialogTitle = styled(MuiDialogTitle)`
  padding: 16px 24px 5px 24px;
`

const List = styled(MuiList)`
  padding: 0px 24px 16px 24px;
`

const UserLogin = ({ dialogIsOpen, handleDialogClose, handleUserFormOpen, fullScreen, participants, createUserPending, setCurrentUserPending }) => {
  const [isLoading, setIsLoading] = useState(typeof participants === "undefined");

  useEffect(() => {
    if (typeof participants === "undefined") {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [participants]);

  const handleBackdropClick = () => {
    const userObj = {};
    createUserPending(userObj);
    handleDialogClose();
  }
  const handleSelectAccount = (participantObj) => {
    setCurrentUserPending(participantObj);
    handleDialogClose();
  }
  const handleCreateNewClick = () => {
    handleDialogClose();
    handleUserFormOpen(true);
  }

  return (
    <Fragment>
      {isLoading ?
        null
        :
        <Dialog open={dialogIsOpen} onBackdropClick={handleBackdropClick} fullWidth={fullScreen} maxWidth="sm">
          <DialogTitle>Continue as</DialogTitle>
          <List>
            {participants.map((participant) => (
              <ListItem key={participant.id} onClick={() => handleSelectAccount(participant)} button>
                <ListItemAvatar>
                  <Avatar>
                    <PersonIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={participant.name} />
              </ListItem>
            ))}
            <ListItem onClick={handleCreateNewClick} button>
              <ListItemAvatar>
                <Avatar>
                  <AddIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Create new" />
            </ListItem>
          </List>
        </Dialog>
      }
    </Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
		participants: state.calendar.participants,
  }
}

const mapDispatchToProps = (dispatch) => {
	return {
    setCurrentUserPending: (userObj) => { dispatch(setCurrentUserPending(userObj)) },
    createUserPending: (userObj) => { dispatch(createUserPending(userObj)) }
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(UserLogin);