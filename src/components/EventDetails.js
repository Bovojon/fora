import React, { useEffect, useRef, Fragment } from 'react';
import moment from "moment";
import styled from "styled-components";
import { Close as CloseIcon } from '@material-ui/icons';
import {
  Dialog,
  DialogActions,
  DialogContent as MuiDialogContent,
  DialogTitle as MuiDialogTitle,
  Button as MuiButton,
  IconButton as MuiIconButton
} from '@material-ui/core';

const DialogContent = styled(MuiDialogContent)`
  padding: 8px 30px;
  overflow-wrap: break-word;
`

const DialogTitle = styled(MuiDialogTitle)`
  padding: 16px 24px 6px;
`

const SmallTitle = styled.span`
  font: 500 16px / 20px Roboto, sans-serif;
`

const LightText = styled.span`
  color: #5f6368;
  font: 400 16px / 20px Roboto, sans-serif;
`

const IconButton = styled(MuiIconButton)`
  margin-left: 10px;
  position: absolute;
  right: 4px;
  top: 4px;
  color: theme.palette.grey[500]
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

const EventDetails = ({ dialogIsOpen, handleDialogClose, eventObj }) => {
  const descriptionElementRef = useRef(null);
  
  useEffect(() => {
    if (dialogIsOpen) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) descriptionElement.focus();
    }
  }, [dialogIsOpen]);

  return (
    <Dialog open={dialogIsOpen} onClose={handleDialogClose} maxWidth="xs">
      <DialogTitle>
        <span>Event details</span>
        <IconButton onClick={handleDialogClose}><CloseIcon /></IconButton>
      </DialogTitle>
      <DialogContent dividers={false}>
        <p>
          <SmallTitle>Title: </SmallTitle>
          <LightText>{eventObj.summary}</LightText>
        </p>
        <p>
          <SmallTitle>Start: </SmallTitle>
          <LightText>{moment(eventObj.start).format('h:mma, ddd, MMM D YYYY')}</LightText>
        </p>
        <p>
          <SmallTitle>End: </SmallTitle>
          <LightText>{moment(eventObj.end).format('h:mma, ddd, MMM D YYYY')}</LightText>
        </p>
        <Fragment>
          {typeof eventObj?.description === "undefined" ?
            null
            :
            <p>
              <SmallTitle>Description: </SmallTitle>
              <LightText>
                {typeof eventObj?.description === "undefined" ? null :
                eventObj?.description.substring(0,100).trim().replace(/<\/?[^>]+(>|$)/g, "") + "..."}
              </LightText>
            </p>
          }
        </Fragment>
        <Fragment>
          {typeof eventObj?.location === "undefined" ?
            null
            :
            <p>
              <SmallTitle>Location: </SmallTitle>
              <LightText>{eventObj.location}</LightText>
            </p>
          }
        </Fragment>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDialogClose} color="primary">Done</Button>
      </DialogActions>
    </Dialog>
  );
}

export default EventDetails;