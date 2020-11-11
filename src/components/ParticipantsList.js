import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Skeleton } from '@material-ui/lab';
import copy from 'copy-to-clipboard';
import { FilterNoneOutlined as CopyIcon } from '@material-ui/icons';
import { 
  List,  
  ListItem,
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
  height: 30vh;
  overflow: auto;
`

const Header = styled.span`
  font-size: 1.5em;
  text-align: center;
  color: #4299e1;
`

const LightText = styled.span`
  color: #5f6368;
  font: 400 16px / 20px Roboto, sans-serif;
  margin-bottom: 15px;
`

const CopyArea = styled(Grid)`
  align-items: center;
  background: #f1f3f4;
  border-radius: 4px;
  color: #5f6368;
  display: flex;
  padding: 3px 12px;
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

const InviteText = ({ handleCopyClick }) => {
  return (
    <InviteGrid container direction="column" justify="center" alignItems="center">
      <LightText>Share the link below to invite others.</LightText>
      <CopyArea container direction="row" justify="space-between" alignItems="center">
        <LinkText>fora.com/calendar/link</LinkText>
        <IconButton onClick={() => { handleCopyClick("Copied text") }}>
          <CopyIcon /> 
        </IconButton>
      </CopyArea>
    </InviteGrid>
  );
}

const ParticipantsList = ({ participants }) => {
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
    const fetchProduct = () => {
      if (typeof participants === "undefined") {
        setIsLoading(true)
      } else {
        setIsLoading(false)
      }
    };
    fetchProduct();
  }, [participants]);
  
  return (
    <>
      <Box my={2}>
        <Header><h4>Others on this calendar:</h4></Header>
        {isLoading ? 
          <LoadingListSkeleton />
          :
          <>
          {participants.length > 1 ?
            <List>
              {participants.map((participant) => {
                const labelId = participant.id;
                return (
                  <ListItem key={labelId} button>
                    <ListItemAvatar>
                      <Avatar/>
                    </ListItemAvatar>
                    <ListItemText id={labelId} primary={participant.name} />
                    <ListItemSecondaryAction>
                      <Checkbox edge="end" onChange={handleCheckBoxClick(labelId)} checked={checked.indexOf(labelId) !== -1} inputProps={{ 'aria-labelledby': labelId }} />
                    </ListItemSecondaryAction>
                  </ListItem>
                );
              })}
            </List>
            :
            <InviteText handleCopyClick={handleCopyClick}  />
          }
          </>
        }
      </Box>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        open={snackBarIsOpen}
        autoHideDuration={3000}
        onClose={handleSnackBarClose}
        message="Copied calendar link"
      />
    </>
  );
}

export default ParticipantsList;