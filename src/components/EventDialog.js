import React, { useEffect, useRef, Fragment } from 'react';
import moment from "moment";
import momentTimezone from "moment-timezone";
import styled from "styled-components";
import { Close as CloseIcon } from '@material-ui/icons';
import {
  Dialog,
  DialogActions as MuiDialogActions,
  DialogContent as MuiDialogContent,
  DialogTitle,
  Button as MuiButton,
  Grid,
  IconButton as MuiIconButton
} from '@material-ui/core';

const SmallTitle = styled.span`
  font: 500 16px / 20px Roboto, sans-serif;
  margin-right: 5px;
`

const LightText = styled.span`
  color: #5f6368;
  font: 400 16px / 20px Roboto, sans-serif;
`

const GridItem = styled(Grid)`
  margin-bottom: 10px;
`

const IconButton = styled(MuiIconButton)`
  margin-left: 10px;
  position: absolute;
  right: 2px;
  top: 2px;
  color: theme.palette.grey[500]
`

const DialogContent = styled(MuiDialogContent)`
  padding: 40px 35px 0px 35px;
`

const DialogActions = styled(MuiDialogActions)`
  padding: 25px 20px;
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
  margin-bottom: 10px;
`

const EventDetails = ({ dialogIsOpen, handleDialogClose, eventObj, isOwner, handleScheduleEventClick,
  handleAddTime, handleDelete, timeSelectedObj, isDifferentTimezone, calTimezone }) => {
  const descriptionElementRef = useRef(null);
  
  useEffect(() => {
    if (dialogIsOpen) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) descriptionElement.focus();
    }
  }, [dialogIsOpen]);

  console.log(eventObj)

  const eventStart = momentTimezone.tz(eventObj.start, calTimezone);
	const eventEnd = momentTimezone.tz(eventObj.end, calTimezone);

  return (
    <Dialog open={dialogIsOpen} onClose={handleDialogClose} scroll="paper">
      <IconButton onClick={handleDialogClose}><CloseIcon /></IconButton>
      <DialogContent dividers={true}>
        <Grid container direction="column" justify="center" alignItems="center">
          <GridItem container direction="row" justify="center" alignItems="center">
            <LightText>{eventObj.user_name}{isOwner ? <Fragment> (you)</Fragment> : null}</LightText>
          </GridItem>
          <GridItem container direction="row" justify="center" alignItems="center">
            <LightText>{moment(eventStart).format('h:mma') + " – " + moment(eventEnd).format('h:mma')}</LightText>
          </GridItem>
          <GridItem container direction="row" justify="center" alignItems="center">
            {moment(eventStart).format('YYYY-MM-DD') !== moment(eventEnd).format('YYYY-MM-DD') ?
              <LightText>{moment(eventStart).format('MMM D') + " – " + moment(eventEnd).format('MMM D')}</LightText>
              :
              <LightText>{moment(eventStart).format('ddd, MMM D')}</LightText>
            }
          </GridItem>
          <GridItem container direction="row" justify="center" alignItems="center">
            {isDifferentTimezone ?
              <LightText>({calTimezone})</LightText>
              :
              null
            }
          </GridItem>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Grid container direction="column" justify="center" alignItems="center">
          <Button onClick={handleDialogClose} variant="contained" disableElevation>Schedule event</Button>
          <Fragment>
            {isOwner ?
              <Button onClick={handleDialogClose} variant="contained" disableElevation>Remove Time</Button>
              :
              <Button onClick={handleDialogClose} variant="contained" disableElevation>Select same time</Button>
            }
          </Fragment>
          <Button onClick={handleDialogClose} variant="contained" disableElevation>Cancel</Button>
        </Grid>
      </DialogActions>
    </Dialog>
  );
}

export default EventDetails;