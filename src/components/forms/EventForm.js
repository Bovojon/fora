import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { TextField } from '@material-ui/core';
import DatePicker from "react-datepicker";
import moment from "moment-timezone";
import styled from "styled-components";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line

import { addEventPending } from '../../actions/eventActionCreators';
import ErrorNotification from '../notifications/ErrorNotification';

const Container = tw.div`relative`;
const Content = tw.div`max-w-5xl mx-auto py-20 lg:py-24`;
const FormContainer = tw.div`p-10 sm:p-12 md:p-16 relative`;
const TwoColumn = tw.div`flex flex-col lg:flex-row justify-center mt-6`;
const Text = tw.div`md:w-16 sm:w-5/12 flex justify-center items-center font-semibold`;
const RowButton = tw.div`md:w-1/3 sm:w-5/12 flex justify-center items-center`;
const InputContainer = tw.div`relative py-5 justify-center`;
const CustomDatePicker = styled(DatePicker)`
  padding: 8px;
  margin-right: 8px;
  color: #3c4043;
  font-size: 14px;
  font-weight: 400;
  line-height: 16px;
  background-color: #f1f3f4;
  border-radius: 4px;
  text-align: center;
  width: 80%
`

const EventForm = ({ event, participants, addEvent }) => {
  const [summary, setSummary] = useState("");
  const [startDateTime, setStartDateTime] = useState(new Date(event.details.start));
  const [endDateTime, setEndDateTime] = useState(new Date(event.details.end));
  const [attendeesList, setAttendeesList] = useState([]);
  const [attendeesStr, setAttendeesStr] = useState("");

  useEffect(() => {
    const tizn = moment.tz.guess();
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
        <FormContainer>
          <TextField value={summary} onChange={handleSummaryChange} placeholder="Add title" type="text" fullWidth margin="normal" autoFocus />
          <TwoColumn>
            <Text>Start:</Text>
            <RowButton>
              <InputContainer>
                <CustomDatePicker selected={startDateTime} onChange={date => setStartDateTime(date)} />
              </InputContainer>
              <InputContainer>
                <CustomDatePicker
                  selected={startDateTime}
                  onChange={time => setStartDateTime(time)}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  timeCaption="Time"
                  dateFormat="h:mm aa"
                />
              </InputContainer>
            </RowButton>
            <Text>End:</Text>
            <RowButton>
              <InputContainer>
                <CustomDatePicker selected={endDateTime} onChange={date => setEndDateTime(date)} />
              </InputContainer>
              <InputContainer>
                <CustomDatePicker
                  selected={endDateTime}
                  onChange={time => setEndDateTime(time)}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  timeCaption="Time"
                  dateFormat="h:mm aa"
                />
              </InputContainer>
            </RowButton>
          </TwoColumn>
          <TextField value={attendeesStr} onChange={handleAttendeesChange} placeholder="Add guest emails" multiline rows={4} fullWidth margin="normal" variant="outlined" />
        </FormContainer>
      </Content>
      <ErrorNotification />
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