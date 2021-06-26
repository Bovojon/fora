import React, { useState, useEffect } from 'react';
import moment from "moment";
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import momentTimezone from "moment-timezone";
import styled from "styled-components";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import {
  TextField,
  Grid,
  Button as MuiButton,
  CircularProgress,
  makeStyles
} from '@material-ui/core';

import { addEventPending } from '../../actions/eventActionCreators';
import { submitEventPending } from '../../actions/eventActionCreators';
import { addError } from '../../actions/errorActionCreators';

const Container = tw.div`relative`;
const Content = styled.div`
  ${tw`flex flex-col md:flex-row max-w-xs md:max-w-lg mx-auto py-4 md:py-2`};
`
const Time = tw.div`flex flex-col md:flex-row justify-center items-center mt-4`;
const Text = tw.div`md:w-16 sm:w-5/12 my-2 flex justify-center items-center font-semibold`;

const Header = styled.h2`
  font-size: 1.25em;
  text-align: center;
  color: #f2a099;
  margin-bottom: 20px;
`

const Button = styled(MuiButton)`
  font-size: 1rem;
  border-radius: 9999px;
  background-color: #fddede;
  color: #4299e1 !important;
  :hover {
    background-color: #fddede;
  }
  border-radius: 9999px;
  padding: 0.8rem 1.1rem;
  width: 100%;
  margin-top: 10px;
  :focus {
    outline: none;
  }
`

const startBeforeEnd = (start, end) => {
  return moment(end).diff(moment(start)) > 0;
}

const isValidEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

const useStyles = makeStyles((theme) => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginBottom: '20px',
    width: 200,
  }
}));

const EventForm = ({ eventObj, participants, addEvent, code, submitEvent, addError, calendarUniqueId, navigateTo }) => {
  const [summary, setSummary] = useState("");
  const [startDateTime, setStartDateTime] = useState(new Date(eventObj.details.start));
  const [startTime, setStartTime] = useState(moment(new Date(eventObj.details.start)).format('HH:mm'));
  const [startDate, setStartDate] = useState(moment(new Date(eventObj.details.start)).format('YYYY-MM-DD'));
  const [endDateTime, setEndDateTime] = useState(new Date(eventObj.details.end));
  const [endTime, setEndTime] = useState(moment(new Date(eventObj.details.end)).format('HH:mm'));
  const [endDate, setEndDate] = useState(moment(new Date(eventObj.details.end)).format('YYYY-MM-DD'));
  const [attendeesList, setAttendeesList] = useState([]);
  const [attendeesStr, setAttendeesStr] = useState("");
  const [scheduleEventLoading, setScheduleEventLoading] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    const tizn = momentTimezone.tz.guess();
    const newEventObj = {
      details: {
        summary,
        start: { dateTime: startDateTime, timeZone: tizn },
        end: { dateTime: endDateTime, timeZone: tizn },
        attendees: attendeesList
      }
    }
    addEvent(newEventObj);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [summary, startDateTime, endDateTime, attendeesStr]);

  useEffect(() => {
    if (typeof participants !== "undefined") {
      const attendeeObjectList = [];
      const attendeesList = [];
      participants.forEach(participant => {
        const emailAddresss = participant.email;
        if (emailAddresss !== null) {
          attendeeObjectList.push({ email: emailAddresss });
          attendeesList.push(emailAddresss);
        }
      });
      setAttendeesList(attendeeObjectList);
      setAttendeesStr(attendeesList.length === 0 ? "" : attendeesList.join(", "));
    }
  }, [participants]);

  const handleCancel = () => { navigateTo(`/${calendarUniqueId}`) }
  const handleSummaryChange = (event) => { setSummary(event.target.value) }
  const handleAttendeesChange = (event) => {
    const emails = event.target.value;
    setAttendeesStr(emails);
    const attendeesList = [];
    emails.split(",").forEach(emailAddresss => {
      const emailTrimmed = emailAddresss.trim()
      if (isValidEmail(emailTrimmed)) attendeesList.push({ email: emailTrimmed })
    });
    setAttendeesList(attendeesList);
  }
  const handleScheduleClick = () => {
    setScheduleEventLoading(true);
    const event = eventObj.details;
    if (startBeforeEnd(event.start.dateTime, event.end.dateTime)) {
      submitEvent({ event, code });
    } else {
      const errorMessage = "Please select a start time that is before the end time."
      addError(errorMessage);
    }
  };
  const handleStartTimeChange = (event) => {
    const time = event.target.value;
    setStartTime(time);
    setStartDateTime(new Date(time + " " + startDate));
  }
  const handleStartDateChange = (event) => {
    const date = event.target.value;
    setStartDate(date);
    setStartDateTime(new Date(startTime + " " + date));
  }
  const handleEndTimeChange = (event) => {
    const time = event.target.value;
    setEndTime(time);
    setEndDateTime(new Date(time + " " + endDate));
  }
  const handleEndDateChange = (event) => {
    const date = event.target.value;
    setEndDate(date);
    setEndDateTime(new Date(endTime + " " + date));
  }

  return (
    <Container>
      <Content>
        <Grid container direction="column" justify="center" alignItems="center">
          <Header>Schedule a new event</Header>
          <TextField value={summary} onChange={handleSummaryChange} placeholder="Add title" type="text" fullWidth margin="normal" autoFocus />
          <Time>
            <Text>Start:</Text>
            <TextField type="time" onChange={handleStartTimeChange} value={startTime} className={classes.textField}
              InputLabelProps={{ shrink: true }} inputProps={{ step: 60 }} />
            <TextField type="date" onChange={handleStartDateChange} value={startDate} className={classes.textField}
              InputLabelProps={{ shrink: true }} />
          </Time>
          <Time>
            <Text>End:</Text>
            <TextField type="time" onChange={handleEndTimeChange} value={endTime} className={classes.textField}
              InputLabelProps={{ shrink: true }} inputProps={{ step: 60 }} />
            <TextField type="date" onChange={handleEndDateChange} value={endDate} className={classes.textField}
              InputLabelProps={{ shrink: true }} />
          </Time>
          <TextField value={attendeesStr} onChange={handleAttendeesChange} placeholder="Add guests (e.g. ex1@email.com, ex2@email.com)"
            multiline rows={3} fullWidth margin="normal" variant="outlined" style={{ margin: "16px 0px" }}/>
          <Button onClick={handleScheduleClick} disabled={scheduleEventLoading} variant="contained" disableElevation>
            { scheduleEventLoading ? <CircularProgress size={24} /> : "Schedule event" }
          </Button>
          <Button onClick={handleCancel} variant="contained" disableElevation>Cancel</Button>
        </Grid>
      </Content>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    eventObj: state.event,
    calendarUniqueId: state.calendar.unique_id,
    participants: state.calendar?.participants,
    code: state.auth.code
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addEvent: (eventObj) => { dispatch(addEventPending(eventObj)) },
    submitEvent: (eventCodeObj) => { dispatch(submitEventPending(eventCodeObj)) },
    addError: (errorMessage) => { dispatch(addError(errorMessage)) },
    navigateTo: (route) => { dispatch(push(route)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventForm);