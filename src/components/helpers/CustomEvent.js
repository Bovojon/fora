import React, { Fragment } from "react";
import moment from "moment";
import momentTimezone from "moment-timezone";
import styled from 'styled-components';
import { Grid } from '@material-ui/core';

const NameArea = styled(Grid)`
	width: 70%;
`

const Header = styled.span`
  color: #FFFFFF;
  font: 400 14px / 20px Roboto, sans-serif;
	margin-right: 5px;
`

const TimeText = styled.span`
  color: #FFFFFF;
  font: 400 12px / 20px Roboto, sans-serif;
`

const CustomCalEvent = (event, isDifferentTimezone, calTimezone, currentUser) => {
  const eventStart = momentTimezone.tz(event.start, calTimezone);
  const eventEnd = momentTimezone.tz(event.end, calTimezone);
  if (typeof event?.summary === "undefined") {
    let userName;
    if (typeof event.creator?.name === "undefined" || currentUser.id === event.creator.id) {
      userName = currentUser?.name;
    } else {
      userName = event.creator.name;
    }
    return (
      <Grid container direction="column" justify="flex-start" alignItems="flex-start">
        <NameArea container direction="row" justify="flex-start" alignItems="center">
          <Header>{userName}</Header>
        </NameArea>
        <TimeText>
          {moment(eventStart).format('h:mma') + " – " + moment(eventEnd).format('h:mma')}
        </TimeText>
        <TimeText>
          {moment(eventStart).format('YYYY-MM-DD') !== moment(eventEnd).format('YYYY-MM-DD') ?
            <Fragment>{moment(eventStart).format('MMM D') + " – " + moment(eventEnd).format('MMM D')}</Fragment>
            :
            <Fragment>{moment(eventStart).format('ddd, MMM D')}</Fragment>
          }
        </TimeText>
        <TimeText>
          {isDifferentTimezone ?
            <Fragment>({calTimezone})</Fragment>
            :
            null
          }
        </TimeText>
      </Grid>
    );
  }
  return (
    <Grid container direction="column" justify="flex-start" alignItems="flex-start">
      <NameArea container direction="row" justify="flex-start" alignItems="center">
        <Header>{event.summary}</Header>
      </NameArea>
      <TimeText>
        {moment(eventStart).format('h:mma') + " – " + moment(eventEnd).format('h:mma')}
      </TimeText>
      <TimeText>
        {moment(eventStart).format('YYYY-MM-DD') !== moment(eventEnd).format('YYYY-MM-DD') ?
          <Fragment>{moment(eventStart).format('MMM D') + " – " + moment(eventEnd).format('MMM D')}</Fragment>
          :
          <Fragment>{moment(eventStart).format('ddd, MMM D')}</Fragment>
        }
      </TimeText>
      <TimeText>
        {isDifferentTimezone ?
          <Fragment>({calTimezone})</Fragment>
          :
          null
        }
      </TimeText>
    </Grid>
  );
}

export default CustomCalEvent;