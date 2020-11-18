import React, { useState, useEffect, Fragment } from 'react';
import styled from 'styled-components';
import { Skeleton } from '@material-ui/lab';
import copy from 'copy-to-clipboard';
import { FilterNoneOutlined as CopyIcon, Create } from '@material-ui/icons';
import { 
  List,  
  ListItem as MuiListItem,
  ListItemSecondaryAction,
  ListItemText,
  ListItemAvatar,
  Checkbox,
  Avatar,
  Box as MuiBox,
  Grid,
  IconButton as MuiIconButton,
  Snackbar
} from '@material-ui/core';

const Box = styled(MuiBox)`
  height: 20vh;
  overflow: auto;
`

const Header = styled.span`
  font-size: 1.5em;
  text-align: center;
  color: #4299e1;
`

const ListItem = styled(MuiListItem)`
  padding-left: 12px;
`

const LightText = styled.span`
  color: #5f6368;
  font: 400 16px / 20px Roboto, sans-serif;
  margin-bottom: 15px;
`

const CopyArea = styled(Grid)`
  align-items: center;
  background: #f1f3f4;
  border-radius: 10px;
  color: #5f6368;
  display: flex;
  padding: 3px 15px;
`

const LinkText = styled.span`
  letter-spacing: .00625em;
  font-family: Roboto,Arial,sans-serif;
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.5rem;
  color: #202124;
  flex-grow: 1;
`

const IconButton = styled(MuiIconButton)`
  outline: none !important;
  cursor: pointer;
`

const InviteGrid = styled(Grid)`
  padding: 25px 20px;
`

const PencilIcon = styled(Create)`
  cursor: pointer;
	display: none;
  width: 5%;
`

const NameArea = styled(Grid)`
	&:hover ${PencilIcon} {
    display: block;
  }
`

const Name = styled.span`
  margin-right: 7px;
`

const LoadingListSkeleton = () => {
  return (
    <List>
      <ListItem>
        <ListItemAvatar>
          <Skeleton animation="wave" variant="circle" width={40} height={40} />
        </ListItemAvatar>
        <ListItemText>
          <Skeleton animation="wave" variant="text" height={20} width="90%" />
        </ListItemText>
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Skeleton animation="wave" variant="circle" width={40} height={40} />
        </ListItemAvatar>
        <ListItemText>
          <Skeleton animation="wave" variant="text" height={20} width="90%" />
        </ListItemText>
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Skeleton animation="wave" variant="circle" width={40} height={40} />
        </ListItemAvatar>
        <ListItemText>
          <Skeleton animation="wave" variant="text" height={20} width="90%" />
        </ListItemText>
      </ListItem>
    </List>
  );
}

const InviteText = ({ handleCopyClick, calendarUniqueId }) => {
  const shareLink = `letsfora.com/${calendarUniqueId}`
  return (
    <InviteGrid container direction="column" justify="center" alignItems="center">
      <LightText>Share the link below to invite others.</LightText>
      <CopyArea container direction="row" justify="space-between" alignItems="center">
        <LinkText>{shareLink}</LinkText>
        <IconButton onClick={() => { handleCopyClick(shareLink) }}>
          <CopyIcon /> 
        </IconButton>
      </CopyArea>
    </InviteGrid>
  );
}

const ParticipantsList = ({ participants, calendarUniqueId, handleEditUserName }) => {
  const [checked, setChecked] = useState([]);
  const [isLoading, setIsLoading] = useState(typeof participants === "undefined");
  const [snackBarIsOpen, setSnackBarIsOpen] = useState(false);

  const handleCheckBoxClick = (labelId) => () => {
    const currentIndex = checked.indexOf(labelId);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(labelId);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };
  const handleCopyClick = (textToCopy) => {
    copy(textToCopy);
    setSnackBarIsOpen(true);
  };
  const handleSnackBarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackBarIsOpen(false);
  };

  useEffect(() => {
    if (typeof participants === "undefined") {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [participants]);
  
  return (
    <Fragment>
      <Box my={2}>
        <Header><h4>Others on this calendar:</h4></Header>
        {isLoading ? 
          <LoadingListSkeleton />
          :
          <Fragment>
            {participants.length === 0 ?
              <InviteText handleCopyClick={handleCopyClick} calendarUniqueId={calendarUniqueId} />
              :
              <List>
                {participants.map((participant) => {
                  const labelId = participant.id;
                  const nameAndEditIcon = (
                    <NameArea container direction="row" justify="flex-start" alignItems="center">
                      <Name>{participant.name}</Name>
                      <PencilIcon onClick={handleEditUserName} fontSize="small" />
                    </NameArea>
                  );
                  return (
                    <ListItem key={labelId}>
                      <ListItemAvatar>
                        <Avatar/>
                      </ListItemAvatar>
                      <ListItemText id={labelId} primary={nameAndEditIcon} />
                      <ListItemSecondaryAction>
                        <Checkbox edge="end" onChange={handleCheckBoxClick(labelId)} checked={checked.indexOf(labelId) !== -1} inputProps={{ 'aria-labelledby': labelId }} />
                      </ListItemSecondaryAction>
                    </ListItem>
                  );
                })}
              </List>
            }
          </Fragment>
        }
      </Box>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        open={snackBarIsOpen}
        autoHideDuration={3000}
        onClose={handleSnackBarClose}
        message="Copied calendar link"
      />
    </Fragment>
  );
}

export default ParticipantsList;