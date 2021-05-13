import React, { useState, useEffect, Fragment } from 'react';
import styled from 'styled-components';
import { Skeleton } from '@material-ui/lab';
import { Create } from '@material-ui/icons';
import { 
  List as MuiList,  
  ListItem as MuiListItem,
  ListItemSecondaryAction,
  ListItemText,
  ListItemAvatar,
  Checkbox,
  Avatar as MuiAvatar,
  Box as MuiBox,
  Grid
} from '@material-ui/core';

const Box = styled(MuiBox)`
  height: 24vh;
  overflow: auto;
`

const Header = styled.h5`
  font-size: 1.25em;
  text-align: center;
  color: #f2a099;
`

const List = styled(MuiList)`
  overflow-y: auto;
  overflow-x: hidden;
  margin-top: 10px;
  padding: 0px 13px;
`

const ListItem = styled(MuiListItem)`
  padding-left: 12px;
`

const PencilButton = styled(MuiAvatar)`
  width: 20px;
  height: 20px;
`

const PencilIcon = styled(Create)`
  display: block;
  width: 0.7em;
  height: 0.7em;
`

const Avatar = styled(MuiAvatar)`
  background-color: ${props => props.background};
`

const Name = styled.span`
  margin-right: 9px;
`

const LightText = styled.p`
  color: #5f6368;
  font: 400 15px / 20px Roboto, sans-serif;
  text-align: center;
  margin-bottom: 0px;
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

const ParticipantsList = ({ participants, calendarUniqueId, currentUser, handleEditUserName, initialTimes, setTimes }) => {
  const [checked, setChecked] = useState([]);
  const [isLoading, setIsLoading] = useState(typeof participants === "undefined");

  const handleCheckBoxClick = (participantId) => () => {
    const currentIndex = checked.indexOf(participantId);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(participantId);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);

    if (newChecked.length > 0 && initialTimes.length > 0) {
      const newTimes = initialTimes.filter(time => newChecked.includes(time.user_id));
      setTimes(newTimes);
    } else {
      setTimes(initialTimes);
    }
  };

  useEffect(() => {
    if (typeof participants === "undefined") {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [participants]);
  
  return (
    <Box m={2}>
      <Header>Others on this calendar</Header>
      <LightText>Click the checkboxes to filter available times by user.</LightText>
      {isLoading ? 
        <LoadingListSkeleton />
        :
        <List>
          {participants.map((participant) => {
            const participantId = participant.id;
            let canEditName = false;
            let name = participant.name;
            let background = participant?.color;
            if (currentUser.id === participantId) {
              canEditName = true;
              name = currentUser.name
            }
            const nameAndEditIcon = (
              <Fragment>
                {canEditName ?
                  <Grid onClick={handleEditUserName} container direction="row" justify="flex-start" alignItems="center" style={{ cursor: "pointer", overflow: "hidden" }}>
                    <Name>{name} (you)</Name>
                    <PencilButton>
                      <PencilIcon fontSize="small" />
                    </PencilButton>
                  </Grid>
                  :
                  <Grid container direction="row" justify="flex-start" alignItems="center">
                    <Name>{name}</Name>
                  </Grid>
                }
              </Fragment>
            );
            return (
              <ListItem key={participantId}>
                <ListItemAvatar>
                  <Avatar background={background}>{name.charAt(0).toUpperCase()}</Avatar>
                </ListItemAvatar>
                <ListItemText id={participantId} primary={nameAndEditIcon} />
                <ListItemSecondaryAction>
                  <Checkbox edge="end" onChange={handleCheckBoxClick(participantId)} checked={checked.indexOf(participantId) !== -1} inputProps={{ 'aria-labelledby': participantId }} color="default" />
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
        </List>
      }
    </Box>
  );
}

export default ParticipantsList;