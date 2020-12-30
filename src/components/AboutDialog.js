import React, { useEffect, useRef } from 'react';
import styled from "styled-components";
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
            <SmallTitle>Contact us</SmallTitle>
            <LightText>If you have any questions, reach out to us at letsfora@gmail.com.</LightText>
            <SmallTitle>Selecting a new time</SmallTitle>
            <LightText>Click and drag on the calendar to select times.</LightText>
            <SmallTitle>Scheduling a new event and sending invites</SmallTitle>
            <LightText>To schedule a new event, click on a time on the calendar and select "Schedule New Event".</LightText>
            <SmallTitle>Filtering times by person</SmallTitle>
            <LightText>Click on the checkbox near a peron's name in the list of users to view their selected times.</LightText>
            <SmallTitle>Editing your details</SmallTitle>
            <LightText>To edit your name or email, click on your name in the list of users.</LightText>
            <SmallTitle>Adding a time that is already on the calendar</SmallTitle>
            <LightText>To add the same time, click on the time on the calendar and choose "Select Same Time".</LightText>
          </Grid>
        </DialogContent>
        <DialogActions>      
          <Button onClick={handleAboutClose} color="primary">Got it</Button>
        </DialogActions>
    </Dialog>
  );
}

export default AboutDialog;