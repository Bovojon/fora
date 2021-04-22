import React, { useEffect, useRef } from 'react';
import styled from "styled-components";
import tw from "twin.macro";
import { Close as CloseIcon } from '@material-ui/icons';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Grid,
  IconButton as MuiIconButton
} from '@material-ui/core';

const SmallTitle = styled.span`
  font-size: 16px;
  font-weight: 400;
  letter-spacing: .1px;
  line-height: 26px;
`

const LightText = styled.span`
  color: #5f6368;
  font: 400 15px / 20px Roboto, sans-serif;
  margin-bottom: 15px;
`

const IconButton = styled(MuiIconButton)`
  position: absolute;
  right: 8px;
  top: 8px;
  color: theme.palette.grey[500]
`

const Heading = tw.h1`font-bold text-lg text-gray-800 leading-tight text-center mt-5 mb-4`

const AboutDialog = ({ aboutIsOpen, handleAboutClose }) => {
  const descriptionElementRef = useRef(null);
  
  useEffect(() => {
    if (aboutIsOpen) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) descriptionElement.focus();
    }
  }, [aboutIsOpen]);

  return (
    <Dialog open={aboutIsOpen} onClose={handleAboutClose} scroll="paper">
      <DialogTitle>
        <span>About Fora</span>
        <IconButton onClick={handleAboutClose}><CloseIcon /></IconButton>
      </DialogTitle>
      <DialogContent dividers={true}>
        <Grid container direction="column" justify="center" alignItems="flex-start">
          <SmallTitle>What is Fora?</SmallTitle>
          <LightText>
            Fora is an easy-to-use group scheduling tool that easily integrates with your preferred/existing calendar apps (Google, Apple, etc.).
          </LightText>
          <SmallTitle>Why Fora?</SmallTitle>
          <LightText>
            Nothing builds friendships more than spending time together. Whether it’s a casual get-together or a big event, virtual or
            in-person, Fora helps you easily schedule a time with friends and family.
          </LightText>
          <SmallTitle>Contact us</SmallTitle>
          <LightText>If you have any questions, reach out to us at letsfora@gmail.com.</LightText>
          <Heading>How do I use Fora?</Heading>
          <SmallTitle>Selecting a new time</SmallTitle>
          <LightText>Click and drag on the calendar to select times.</LightText>
          <SmallTitle>Scheduling a new event and sending invites</SmallTitle>
          <LightText>To schedule a new event, click on a time on the calendar and select "Schedule New Event".</LightText>
          <SmallTitle>Sharing your Fora calendar</SmallTitle>
          <LightText>You can share the link (e.g. letsfora.com/1SY3L3Mf) or just the id (e.g. 1SY3L3Mf).</LightText>
          <SmallTitle>Filtering times by person</SmallTitle>
          <LightText>Click on the checkbox near a peron's name in the list of users to view their selected times.</LightText>
          <SmallTitle>Editing your details</SmallTitle>
          <LightText>To edit your name or email, click on your name in the list of users.</LightText>
          <SmallTitle>Adding a time that is already on the calendar</SmallTitle>
          <LightText>To add the same time, click on the time on the calendar and choose "Select Same Time".</LightText>
          <SmallTitle>Getting more details on imported events</SmallTitle>
          <LightText>If you import your calendar, you can click on the imported events on this calendar to view their details.</LightText>
          <SmallTitle>Removing imported events</SmallTitle>
          <LightText>Refresh the page to remove imported events.</LightText>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleAboutClose} color="primary">Got it</Button>
      </DialogActions>
    </Dialog>
  );
}

export default AboutDialog;