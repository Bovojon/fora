import React from 'react';
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

const UserLogin = ({ dialogIsOpen, handleDialogClose, fullScreen, selectedAccount, emails }) => {
  const handleListItemClick = (value) => {
    handleDialogClose(value);
  };

  return (
    <Dialog open={dialogIsOpen} onClose={() => handleDialogClose(selectedAccount)} fullWidth={fullScreen} maxWidth="sm">
      <DialogTitle>Continue as</DialogTitle>
      <List>
        {emails.map((email) => (
          <ListItem button onClick={() => handleListItemClick(email)} key={email}>
            <ListItemAvatar>
              <Avatar>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={email} />
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
  );
}

export default UserLogin;