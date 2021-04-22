import React, { useState } from "react";
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import tw from "twin.macro";
import styled from "styled-components";

import { addError } from '../../actions/errorActionCreators';
import Reveal from "../animations/Reveal";
import TeamIllustration from "../../images/team-illustration-2.svg";
import { createUserPending } from '../../actions/userActionCreators';
import { createCalendarPending } from '../../actions/calendarActionCreators';

const Container = tw.div`relative`;
const TwoColumn = tw.div`flex flex-col lg:flex-row lg:items-center max-w-screen-xl mx-auto py-8 md:px-6`;
const LeftColumn = tw.div`relative lg:w-5/12 text-center max-w-lg mx-auto lg:max-w-none lg:text-left`;
const RightColumn = tw.div`relative mt-12 lg:mt-0 flex-1 flex flex-col justify-center lg:self-end sm:ml-4 md:ml-20`;
const ContentWithPaddingXl= tw.div`max-w-screen-xl mx-auto py-8`;
const SingleColumn = tw.div`flex flex-col items-center`;
const TextContent = tw.div`lg:py-8 text-center md:text-left`;
const Paragraph = tw.p`my-5 lg:my-8 text-base xl:text-lg text-gray-700`;
const Column = tw.div`w-full max-w-md mx-auto md:max-w-none md:mx-0`;
const ImageColumn = tw(Column)`md:w-10/12 flex-shrink-0 h-full md:h-auto`;
const BlueHighlight = tw.span`text-blue-500`;
const Steps = tw.ul`mt-4`;
const Step = tw.li`mt-8 flex flex-col md:flex-row items-center md:items-start`;
const StepNumber = tw.div`font-semibold text-4xl leading-none text-gray-400`;
const StepText = tw.div`mt-3 md:mt-0 md:ml-6`;
const StepHeading = tw.h6`leading-none text-xl font-semibold`;
const StepDescription = tw.p`mt-3 max-w-xs leading-loose text-sm text-gray-600 font-medium`;
const Heading = styled.h1(props => [
  tw`font-bold text-3xl md:text-3xl lg:text-4xl text-gray-800 leading-tight`,
  props.textOnCenter ? tw`text-center` : tw`text-center md:text-left`
]);
const Actions = styled.div`
  ${tw`relative max-w-md text-center mx-auto lg:mx-0`}
  input {
    ${tw`sm:pr-48 pl-8 py-4 sm:py-5 rounded-full border-2 w-full font-medium focus:outline-none transition duration-300
      focus:border-blue-500 hover:border-gray-500`}
  }
  button {
    ${tw`w-full sm:absolute right-0 top-0 bottom-0 bg-blue-500 text-gray-100 font-bold mr-2 my-4 sm:my-2 rounded-full
      py-4 flex items-center justify-center sm:w-40 sm:leading-none transition duration-300`}
  }
`;

const Home = ({ navigateTo, createUser, createCalendar, addError }) => {
  const [email, setEmail] = useState('');
  const handleEmailChange = (event) => { setEmail(event.target.value) };
  const handleEnterEmail = (e) => { if(e.keyCode === 13) handleScheduleClick(e) };
  const handleScheduleClick = (e) => {
    e.preventDefault();
    createCalendar();
    if (email.trim() !== '') createUser({ email });
    navigateTo("/creating_calendar");
   }
  const steps = [
    {
      heading: "Create",
      description: "Create a one-off calendar on Fora."
    },
    {
      heading: "Pick",
      description: "Pick times that work for you by clicking and dragging on your Fora calendar."
    },
    {
      heading: "Share",
      description: "Share the link to your Fora calendar."
    },
    {
      heading: "Schedule",
      description: "Others pick a time and can schedule an event."
    }
  ];

  return (
    <Reveal>
      <Container>
        <TwoColumn>
          <LeftColumn>
            <Heading><BlueHighlight>Fora </BlueHighlight>helps you easily schedule a time with family and friends</Heading>
            <Paragraph>
              Create a one-off calendar on <BlueHighlight>Fora</BlueHighlight> and share it with others to
              <BlueHighlight> schedule a time.</BlueHighlight>
            </Paragraph>
            <Actions>
              <input value={email} onChange={handleEmailChange} onKeyDown={handleEnterEmail} type="email" placeholder="Enter your email" />
              <button onClick={handleScheduleClick}>Create calendar</button>
            </Actions>
          </LeftColumn>
          <RightColumn>
            <ImageColumn>
              <img tw="min-w-0 w-full max-w-lg xl:max-w-3xl" src={TeamIllustration} alt="Design Illustration" />
            </ImageColumn>
          </RightColumn>
        </TwoColumn>
        <ContentWithPaddingXl>
          <SingleColumn>
            <TextContent>
              <Heading textOnCenter>How it works</Heading>
              <Steps>
                {steps.map((step, index) => (
                  <Step key={index}>
                    <StepNumber>{(index+1).toString().padStart(2,'0')}</StepNumber>
                    <StepText>
                      <StepHeading>{step.heading}</StepHeading>
                      <StepDescription>{step.description}</StepDescription>
                    </StepText>
                  </Step>
                ))}
              </Steps>
            </TextContent>
          </SingleColumn>
        </ContentWithPaddingXl>
      </Container>
    </Reveal>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    navigateTo: (route) => dispatch(push(route)),
    addError: (errorMessage) => { dispatch(addError(errorMessage)) },
    createUser: (userObj) => { dispatch(createUserPending(userObj)) },
    createCalendar: () => { dispatch(createCalendarPending()) }
  }
}

export default connect(null, mapDispatchToProps)(Home);