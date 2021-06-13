import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
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
  Grid,
  Switch as MuiSwitch,
  withStyles
} from '@material-ui/core';

import { filterTimesPending } from '../actions/timeActionCreators';

const Box = styled(MuiBox)`
  height: 24vh;
  overflow: auto;
`

const Header = styled.h5`
  font-size: 1.25em;
  text-align: center;
  color: #f2a099;
  margin-bottom: 2px;
`

const List = styled(MuiList)`
  overflow-y: auto;
  overflow-x: hidden;
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
  margin-right: 7px;
`

const LightText = styled.p`
  color: #5f6368;
  font: 400 15px / 20px Roboto, sans-serif;
  text-align: center;
  margin-bottom: 0px;
`

const Switch = withStyles({
  switchBase: {
    color: "#fddede",
    '&$checked': {
      color: "#f2a099",
    },
    '&$checked + $track': {
      backgroundColor: "#f2a099",
    },
  },
  checked: {},
  track: {},
})(MuiSwitch);

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

const ParticipantsList = ({ participants, calendarUniqueId, currentUser, handleEditUserName, initialTimes, setTimes,
  filterTimesPending, filteredTimes }) => {
  const [checked, setChecked] = useState([]);
  const [isLoading, setIsLoading] = useState(typeof participants === "undefined");
  const [showCommonTimes, setShowCommonTimes] = useState(false);

  const handleShowCommonTimesChange = (checkedTimes=checked) => {
    if (checkedTimes.length > 0 && initialTimes.length > 0) {
      if (showCommonTimes) {
        filterTimesPending(checkedTimes);
      } else {
        const newTimes = initialTimes.filter(time => checkedTimes.includes(time.user_id));
        setTimes(newTimes);
      }
    } else {
      setTimes(initialTimes);
    }
  }

  const handleCheckBoxClick = (participantId) => () => {
    const currentIndex = checked.indexOf(participantId);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(participantId);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
    handleShowCommonTimesChange(newChecked);
  };

  useEffect(() => {
    if (typeof participants === "undefined") {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [participants]);

  useEffect(() => {
    if (filteredTimes.length > 0) {
      setTimes(filteredTimes);
    }
  }, [filteredTimes, setTimes])

  useEffect(() => {
    handleShowCommonTimesChange();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showCommonTimes])
  
  return (
    <Box m={2}>
      <Header>Members</Header>
      <Grid container direction="row" justify="center" alignItems="center">
        <LightText>Show common times only</LightText>
        <Switch onChange={() => setShowCommonTimes(!showCommonTimes)} checked={showCommonTimes} />
      </Grid>
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
                    <Name>{name} {name.includes("Person") ? <Fragment> (me)</Fragment> : null}</Name>
                    <PencilButton>
                      <PencilIcon fontSize="small" />
                    </PencilButton>
                  </Grid>
                  :
                  <Name>{name}</Name>
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

const mapStateToProps = (state) => {
  return {
		filteredTimes: state.filteredTimes
  }
}

const mapDispatchToProps = (dispatch) => {
	return {
		filterTimesPending: (userIds) => { dispatch(filterTimesPending(userIds)) }
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ParticipantsList);