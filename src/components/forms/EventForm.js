import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { TextField, Grid } from '@material-ui/core';
import DatePicker from "react-datepicker";
import momentTimezone from "moment-timezone";
import styled from "styled-components";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line

import { addEventPending } from '../../actions/eventActionCreators';

const Container = tw.div`relative`;
const Content = styled.div`
  ${tw`flex flex-col md:flex-row max-w-xs md:max-w-lg mx-auto py-4 md:py-2`};
`
const Time = tw.div`flex flex-col md:flex-row justify-center items-center mt-4`;
const Text = tw.div`md:w-16 sm:w-5/12 my-2 flex justify-center items-center font-semibold`;
const CustomDatePicker = styled(DatePicker)`
  ${tw`mb-1 md:mb-0`};
  padding: 8px;
  margin-right: 8px;
  color: #3c4043;
  font-size: 14px;
  font-weight: 400;
  line-height: 16px;
  background-color: #f1f3f4;
  border-radius: 4px;
  text-align: center;
`

const Header = styled.h2`
  font-size: 1.25em;
  text-align: center;
  color: #f2a099;
  margin-bottom: 20px;
`

const EventForm = ({ event, participants, addEvent }) => {
  const [summary, setSummary] = useState("");
  const [startDateTime, setStartDateTime] = useState(new Date(event.details.start));
  const [endDateTime, setEndDateTime] = useState(new Date(event.details.end));
  const [attendeesList, setAttendeesList] = useState([]);
  const [attendeesStr, setAttendeesStr] = useState("");

  useEffect(() => {
    const tizn = momentTimezone.tz.guess();
    const eventObj = {
      details: {
        summary,
        start: { dateTime: startDateTime, timeZone: tizn },
        end: { dateTime: endDateTime, timeZone: tizn },
        attendees: attendeesList
      }
    }
    addEvent(eventObj);
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

  const handleDialogClose = () => {console.log("yes")}
  const handleSummaryChange = (event) => { setSummary(event.target.value) }
  const handleAttendeesChange = (event) => {
    const emails = event.target.value;
    setAttendeesStr(emails);
    const attendeesList = [];
    emails.split(",").forEach(emailAddresss => {
      attendeesList.push({ email: emailAddresss.trim() })
    });
    setAttendeesList(attendeesList);
  }

  return (
    <Container>
      <Content>
        <Grid container direction="column" justify="center" alignItems="center">
          <Header>Schedule a new event</Header>
          <TextField value={summary} onChange={handleSummaryChange} placeholder="Add title" type="text" fullWidth margin="normal" autoFocus />
          <Time>
            <Text>Start:</Text>
            <CustomDatePicker selected={startDateTime} onChange={date => setStartDateTime(date)} />
            <CustomDatePicker
              selected={startDateTime}
              onChange={time => setStartDateTime(time)}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={15}
              timeCaption="Time"
              dateFormat="h:mm aa"
            />
          </Time>
          <Time container direction="row" justify="center" alignItems="center">
            <Text>End:</Text>
            <CustomDatePicker selected={endDateTime} onChange={date => setEndDateTime(date)} />
            <CustomDatePicker
              selected={endDateTime}
              onChange={time => setEndDateTime(time)}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={15}
              timeCaption="Time"
              dateFormat="h:mm aa"
            />
          </Time>
          <TextField value={attendeesStr} onChange={handleAttendeesChange} placeholder="Add guests (e.g. ex1@email.com, ex2@email.com)"
            multiline rows={3} fullWidth margin="normal" variant="outlined" style={{ marginTop: "16px" }}/>
        </Grid>
      </Content>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    event: state.event,
    participants: state.calendar?.participants
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addEvent: (eventObj) => { dispatch(addEventPending(eventObj)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventForm);