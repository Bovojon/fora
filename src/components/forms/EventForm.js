import React, { useState } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { TextField } from '@material-ui/core';
import DatePicker from "react-datepicker";

import styled from "styled-components";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line

const Container = tw.div`relative`;
const Content = tw.div`max-w-5xl mx-auto py-20 lg:py-24`;
const FormContainer = tw.div`p-10 sm:p-12 md:p-16 relative`;
const TwoColumn = tw.div`flex flex-col sm:flex-row justify-center mt-6`;
const Column = tw.div`md:w-1/4 sm:w-5/12 flex flex-col justify-center`;
const InputContainer = tw.div`relative py-5 mx-auto`;
const Label = tw.label`absolute top-0 left-0 tracking-wide font-semibold text-sm`;
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

const EventForm = ({ event }) => {
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [attendees, setAttendees] = useState([]);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  }
  const handleAttendeesChange = (event) => {
    setAttendees(event.target.value);
  }

  return (
    <Container>
      <Content>
        <FormContainer>
          <TextField value={title} onChange={handleTitleChange} id="title" placeholder="Add title" type="text" fullWidth margin="normal" autoFocus />
          <TwoColumn>
            <Column>
              <InputContainer>
                <Label htmlFor="name-input">Start date</Label>
                <CustomDatePicker id="name-input" selected={startDate} onChange={date => setStartDate(date)} />
              </InputContainer>
              <InputContainer>
                <Label htmlFor="name-input1">End date</Label>
                <CustomDatePicker id="name-input1" selected={endDate} onChange={date => setEndDate(date)} />
              </InputContainer>
            </Column>
            <Column>
              <InputContainer>
                <Label htmlFor="email-input">Start time</Label>
                <CustomDatePicker
                  id="email-input"
                  selected={startTime}
                  onChange={time => setStartTime(time)}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  timeCaption="Time"
                  dateFormat="h:mm aa"
                />
              </InputContainer>
              <InputContainer>
                <Label htmlFor="email-input1">End time</Label>
                <CustomDatePicker
                  id="email-input1"
                  selected={endTime}
                  onChange={time => setEndTime(time)}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  timeCaption="Time"
                  dateFormat="h:mm aa"
                />
              </InputContainer>
            </Column>
          </TwoColumn>
          <TextField value={attendees} onChange={handleAttendeesChange} placeholder="Add guest emails" multiline rows={4} fullWidth margin="normal" variant="outlined" />
        </FormContainer>
      </Content>
    </Container>
  );
}

// const event = {
//   'summary': 'Google I/O 2015',
//   'location': '800 Howard St., San Francisco, CA 94103',
//   'description': 'A chance to hear more about Google\'s developer products.',
//   'start': {
//     'dateTime': '2020-12-14T09:00:00-07:00',
//     'timeZone': 'America/Los_Angeles',
//   },
//   'end': {
//     'dateTime': '2020-12-14T17:00:00-07:00',
//     'timeZone': 'America/Los_Angeles',
//   },
//   'recurrence': [
//     'RRULE:FREQ=DAILY;COUNT=2'
//   ],
//   'attendees': [
//     {'email': 'bovojon@gmail.com'},
//     {'email': 'jon.nadabot@gmail.com'}
//   ],
//   'reminders': {
//     'useDefault': false,
//     'overrides': [
//       {'method': 'email', 'minutes': 24 * 60},
//       {'method': 'popup', 'minutes': 10},
//     ],
//   },
// };

const mapStateToProps = (state) => {
  return {
		event: state.event
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    navigateTo: (route) => { dispatch(push(route)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventForm);