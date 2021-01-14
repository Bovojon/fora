import React, { useEffect, useRef, Fragment } from 'react';
import moment from "moment";
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
  font: 500 16px / 20px Roboto, sans-serif;
  margin-right: 5px;
`

const LightText = styled.span`
  color: #5f6368;
  font: 400 16px / 20px Roboto, sans-serif;
`

const GridItem = styled(Grid)`
  margin-bottom: 15px;
`

const IconButton = styled(MuiIconButton)`
  margin-left: 10px;
  position: absolute;
  right: 8px;
  top: 8px;
  color: theme.palette.grey[500]
`

const EventDetails = ({ dialogIsOpen, handleDialogClose, eventObj }) => {
  const descriptionElementRef = useRef(null);
  
  useEffect(() => {
    if (dialogIsOpen) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) descriptionElement.focus();
    }
  }, [dialogIsOpen]);

  return (
    <Dialog open={dialogIsOpen} onClose={handleDialogClose} scroll="paper">
      <DialogTitle>
        <span>Event details</span>
        <IconButton onClick={handleDialogClose}><CloseIcon /></IconButton>
      </DialogTitle>
      <DialogContent dividers={true}>
        <Grid container direction="column" justify="center" alignItems="flex-start">
          <GridItem container direction="row" justify="flex-start" alignItems="center">
            <SmallTitle>Title: </SmallTitle>
            <LightText>{eventObj.summary}</LightText>
          </GridItem>
          <GridItem container direction="row" justify="flex-start" alignItems="center">
            <SmallTitle>Start: </SmallTitle>
            <LightText>{moment(eventObj.start).format('h:mma, ddd, MMM D')}</LightText>
          </GridItem>
          <GridItem container direction="row" justify="flex-start" alignItems="center">
            <SmallTitle>End: </SmallTitle>
            <LightText>{moment(eventObj.end).format('h:mma, ddd, MMM D')}</LightText>
          </GridItem>
          <GridItem container direction="row" justify="flex-start" alignItems="center">
            {typeof eventObj?.description === "undefined" ?
              null
              :
              <Fragment>
                <SmallTitle>Description: </SmallTitle>
                <LightText>
                  {typeof eventObj?.description === "undefined" ? null :
                  eventObj?.description.substring(0,50).trim().replace(/<\/?[^>]+(>|$)/g, "") + "..."}
                </LightText>
              </Fragment>
            }
          </GridItem>
          <GridItem container direction="row" justify="flex-start" alignItems="center">
            {typeof eventObj?.location === "undefined" ?
              null
              :
              <Fragment>
                <SmallTitle>Location: </SmallTitle>
                <LightText>{eventObj.location}</LightText>
              </Fragment>
            }
          </GridItem>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDialogClose} color="primary">Done</Button>
      </DialogActions>
    </Dialog>
  );
}

export default EventDetails;