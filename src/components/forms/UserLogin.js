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

const UserLogin = ({ dialogIsOpen, handleDialogClose, fullScreen, selectedAccount, participants }) => {
  const [isLoading, setIsLoading] = useState(typeof participants === "undefined");

  useEffect(() => {
    if (typeof participants === "undefined") {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [participants]);

  const handleListItemClick = (value) => {
    handleDialogClose(value);
  };

  return (
    <Fragment>
      {isLoading ?
        null
        :
        <Dialog open={dialogIsOpen} onClose={() => handleDialogClose(selectedAccount)} fullWidth={fullScreen} maxWidth="sm">
          <DialogTitle>Continue as</DialogTitle>
          <List>
            {participants.map((participant) => (
              <ListItem key={participant.id} onClick={() => handleListItemClick(participant)} button>
                <ListItemAvatar>
                  <Avatar>
                    <PersonIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={participant.name} />
              </ListItem>
            ))}
            <ListItem button onClick={() => handleListItemClick('addAccount')}>
              <ListItemAvatar>
                <Avatar>
                  <AddIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Add account" />
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
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(UserLogin);