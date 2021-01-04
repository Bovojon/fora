import React from "react";
import styled from 'styled-components';
import {
  Container as MuiContainer,
  Paper
} from '@material-ui/core';

const Container = styled(MuiContainer)`
  padding: 10px 12px;
`

const Title = styled.h1`
  text-align: center
`

const Privacy = () => {
  return (
    <Container>
      <Paper elevation={0}>
        <Title>Privacy Policy</Title>
        <p>Effective January 3, 2021</p>
        <p>
          Fora (“we” or “us”) recognizes the importance of each of our user’s privacy. This privacy notice (“Privacy Notice” or “Notice”) 
          explains how we collect, use, and disclose your information. It also sets out more information about your privacy rights.
        </p>
        <h3>Information We Collect</h3>
        <p>
          We collect information about you directly from you. In order to help you protect yourself and your information, we encourage you 
          to provide only that information that is necessary for using our Website. For example, to schedule an event you may only need to 
          provide us with a name, email address, date, and time.
        </p>
        <h3>Information You Provide Voluntarily</h3>
        <p>Fora collects the following information directly from users.</p>
        <ul>
          <li>
            <b>Appointment Information.</b> A user may voluntarily give us certain information. This can include names, email addresses, the subject 
            of the event, and any other information provided to us or as required by the user upon scheduling or selecting times.
          </li>
          <li>
            <b>Calendar Information.</b> A user may connect their calendar with Fora. Our calendar integration only adds events in your calendar if 
            you choose to schedule an event. We never store the duration or free/busy status of the events in your calendar, who you are meeting with, 
            their email address, the event title, or any other details about the appointments in your connected calendar.
          </li>
        </ul>
        <h3>How We Use Your Information</h3>
        <p>
          We use information that you provide voluntarily only to help facilitate scheduling events. We do not share your information or personal data 
          with anyone. We do not sell your information to any third parties or disclose it in exchange for money or other valuable consideration. 
          We will never use invitee data to send direct marketing via emails, SMS, physical mailings, or other similar communication channels to 
          advertise or promote the use of our product and services or those of a third-party.</p>
        <h3>Changes to this Notice</h3>
        <p>
          This Notice is current as of the Effective Date set forth above. This Notice may change if there is a material change to the way information 
          is handled at Fora, or to clarify our Notice or adjust clerical errors. If any changes are made, we’ll post them on this page, so please be 
          sure to check back periodically. If you continue to use Fora after those changes are in effect, you agree to the revised Notice.
        </p>
        <h3>Contacting Us</h3>
        <p>If you have any questions or comments about this Notice, please contact us at letsfora@gmail.com.</p>
      </Paper>
    </Container>
  )
}

export default Privacy;