import React, { useEffect, useRef, Fragment } from 'react';
import moment from "moment";
import momentTimezone from "moment-timezone";
import styled from "styled-components";
import { Close as CloseIcon } from '@material-ui/icons';
import {
  Dialog,
  DialogActions as MuiDialogActions,
  DialogContent as MuiDialogContent,
  Button as MuiButton,
  Grid,
  IconButton as MuiIconButton,
  Avatar as MuiAvatar,
  ListItem as MuiListItem,
  ListItemText,
  ListItemAvatar,
} from '@material-ui/core';

const LightText = styled.span`
  color: #5f6368;
  font: 400 16px / 20px Roboto, sans-serif;
`

const GridItem = styled(Grid)`
  margin-bottom: 5px;
`

const IconButton = styled(MuiIconButton)`
  margin-left: 10px;
  position: absolute;
  right: 4px;
  top: 4px;
  color: theme.palette.grey[500];
  :focus {
    outline: none;
  }
`

const DialogContent = styled(MuiDialogContent)`
  padding: 25px 35px 0px 35px;
  text-align: center;
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
  :focus {
    outline: none;
  }
`

const Avatar = styled(MuiAvatar)`
  background-color: ${props => props.background};
`

const ListItem = styled(MuiListItem)`
  padding: 16px 20px 0px 20px;
`

const EventDetails = ({ dialogIsOpen, handleDialogClose, isOwner, handleScheduleEventClick, handleAddTime,
  handleDelete, selectedEvent, calTimezone, eventObj }) => {
  const descriptionElementRef = useRef(null);
  const eventStart = momentTimezone.tz(selectedEvent.start, calTimezone);
	const eventEnd = momentTimezone.tz(selectedEvent.end, calTimezone);
  const handleDeleteClick = () => {
    handleDialogClose();
    handleDelete(selectedEvent.id);
  }
  const handleAddTimeClick = () => {
    handleDialogClose();
    handleAddTime(selectedEvent);
  }
  const handleScheduleClick = () => {
    handleDialogClose();
    handleScheduleEventClick(eventObj);
  }
  
  useEffect(() => {
    if (dialogIsOpen) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) descriptionElement.focus();
    }
  }, [dialogIsOpen]);

  return (
    <Dialog open={dialogIsOpen} onClose={handleDialogClose} scroll="paper">
      <ListItem key={1}>
        {typeof selectedEvent.id === "string" && selectedEvent.id.charAt(0) === "C" ?
          <ListItemText id={1} primary={<LightText>Common availability</LightText>} />
          :
          <Fragment>
            <ListItemAvatar>
              <Avatar background={selectedEvent.background}>{selectedEvent.userName?.charAt(0).toUpperCase()}</Avatar>
            </ListItemAvatar>
            <ListItemText id={1} primary={<LightText>{selectedEvent.userName}{isOwner ? <Fragment> (me)</Fragment> : null}</LightText>} />
          </Fragment>
        }
      </ListItem>
      <DialogContent dividers={false}>
        <IconButton onClick={handleDialogClose}><CloseIcon /></IconButton>
        <Grid container direction="column" justify="center" alignItems="center">
          <GridItem container direction="row" justify="center" alignItems="center">
            <LightText>{moment(eventStart).format('h:mma, ddd, MMM D YYYY')}</LightText>
          </GridItem>
          <GridItem container direction="row" justify="center" alignItems="center">
            <LightText>to</LightText>
          </GridItem>
          <GridItem container direction="row" justify="center" alignItems="center">
            <LightText>{moment(eventEnd).format('h:mma, ddd, MMM D YYYY')}</LightText>
          </GridItem>
          <GridItem container direction="row" justify="center" alignItems="center">
            <LightText>(GMT {moment(eventEnd).format('Z')})</LightText>
          </GridItem>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Grid container direction="column" justify="center" alignItems="center">
          <Button onClick={handleScheduleClick} variant="contained" disableElevation>Schedule event</Button>
          <Fragment>
            {isOwner ?
              <Fragment>
                {selectedEvent.id < 1000000 && <Button onClick={handleDeleteClick} variant="contained" disableElevation>Remove Time</Button>}
              </Fragment>
              :
              <Button onClick={handleAddTimeClick} variant="contained" disableElevation>Select same time</Button>
            }
          </Fragment>
          <Button onClick={handleDialogClose} variant="contained" disableElevation>Cancel</Button>
        </Grid>
      </DialogActions>
    </Dialog>
  );
}

export default EventDetails;