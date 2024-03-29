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
  font-size: 14px;
`

const LightText = styled.p`
  color: #5f6368;
  font: 400 14px / 20px Roboto, sans-serif;
  text-align: center;
  margin-bottom: 0px;
`

const CheckAll = styled(Checkbox)`
  margin-right: 5px;
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

const ParticipantsList = ({ participants, calendarUniqueId, currentUser, handleEditUserName, initialTimes, handleSetTimesChange,
  filterTimesPending, filteredTimes, showCommonTimes, setShowCommonTimes, checked, setChecked }) => {
  const [isLoading, setIsLoading] = useState(typeof participants === "undefined");
  const [selectAll, setSelectAll] = useState(false);

  const handleShowCommonTimesChange = (checkedTimes) => {
    if (checkedTimes.length > 0 && initialTimes.length > 0) {
      if (showCommonTimes) {
        filterTimesPending(checkedTimes);
      } else {
        const newTimes = initialTimes.filter(time => checkedTimes.includes(time.user_id));
        handleSetTimesChange(newTimes);
      }
    } else {
      handleSetTimesChange(initialTimes);
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
  const handleSelectAll = () => {
    let newChecked = []
    if (!selectAll) {
      participants.forEach(memberObj => {
        newChecked.push(memberObj.id);
      });
    }
    setChecked(newChecked);
    handleShowCommonTimesChange(newChecked);
    setSelectAll(!selectAll)
  }

  useEffect(() => {
    if (typeof participants === "undefined") {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [participants]);

  useEffect(() => {
    handleSetTimesChange(filteredTimes);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredTimes])

  useEffect(() => {
    handleShowCommonTimesChange(checked);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showCommonTimes])
  
  return (
    <Box m={1}>
      <Header>Members</Header>
      <Grid container direction="row" justify="space-between" alignItems="center">
        <Grid item>
          <LightText>
            Common <Switch onChange={() => setShowCommonTimes(!showCommonTimes)} checked={showCommonTimes} />
          </LightText>
        </Grid>
        <Grid item>
          <CheckAll onChange={handleSelectAll} checked={selectAll} color="default" />
        </Grid>
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