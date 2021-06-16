import React, { useState, useEffect } from 'react';
import moment from "moment";
import DatePicker from "react-datepicker";
import styled from "styled-components";
import tw from "twin.macro";
import { Close as CloseIcon } from '@material-ui/icons';
import {
  Grid,
  Button as MuiButton,
  Dialog,
  DialogTitle as MuiDialogTitle,
  DialogContent as MuiDialogContent,
  DialogActions as MuiDialogActions,
  IconButton as MuiIconButton,
  makeStyles
} from '@material-ui/core';

const DialogTitle = styled(MuiDialogTitle)`
  margin-right: 35px;
  padding: 16px 24px 5px;
`

const DialogContent = styled(MuiDialogContent)`
  padding: 8px 30px;
  text-align: center;
`

const DialogActions = styled(MuiDialogActions)`
  padding: 8px 13px;
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

const IconButton = styled(MuiIconButton)`
  position: absolute;
  right: 4px;
  top: 5px;
  color: theme.palette.grey[500]
`

const Text = tw.div`md:w-16 sm:w-5/12 my-2 flex justify-center items-center font-semibold`;
const CustomDatePicker = styled(DatePicker)`
  padding: 8px;
  margin-right: 8px;
  margin-bottom: 10px;
  color: #3c4043;
  font-size: 14px;
  font-weight: 400;
  line-height: 16px;
  background-color: #f1f3f4;
  border-radius: 4px;
  text-align: center;
  width: 80%
`

const useStyles = makeStyles((theme) => ({
  paper: {
    overflow: "visible !important"
  }
}));

const startBeforeEnd = (start, end) => {
  return moment(end).diff(moment(start)) > 0;
}

const AddAvailabilityForm = ({ dialogIsOpen, handleDialogClose, handleAddTime }) => {
  const [startDateTime, setStartDateTime] = useState(new Date());
  const [endDateTime, setEndDateTime] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);
  const classes = useStyles();

  useEffect(() => {
    if (startBeforeEnd(startDateTime, endDateTime)) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [startDateTime, endDateTime]);

  const handleAddClick = () => {
    const eventObj = {
      start: startDateTime,
      end: endDateTime
    }
    handleAddTime(eventObj);
    handleDialogClose();
  }

  return (
    <Dialog open={dialogIsOpen} onClose={handleDialogClose} classes={{ paper: classes.paper}}>
      <IconButton onClick={handleDialogClose}><CloseIcon /></IconButton>
      <DialogTitle>Add your availability</DialogTitle>
      <DialogContent dividers={false}>
        <Grid container direction="column" justify="center" alignItems="center">
          <Text>Start:</Text>
          <CustomDatePicker selected={startDateTime} onChange={date => setStartDateTime(date)} />
          <CustomDatePicker
            selected={startDateTime}
            onChange={time => setStartDateTime(time)}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            timeCaption="Time"
            dateFormat="h:mm aa"
          />
          <Text style={{ marginTop: "20px" }}>End:</Text>
          <CustomDatePicker selected={endDateTime} onChange={date => setEndDateTime(date)} />
          <CustomDatePicker
            selected={endDateTime}
            onChange={time => setEndDateTime(time)}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            timeCaption="Time"
            dateFormat="h:mm aa"
          />
        </Grid>
      </DialogContent>
      <DialogActions>
        <Grid container direction="column" justify="space-around" alignItems="center">
          <Button onClick={handleAddClick} variant="contained" disabled={isLoading} disableElevation>Add</Button>
          <Button onClick={handleDialogClose} variant="contained" disableElevation>Cancel</Button>
        </Grid>
      </DialogActions>
    </Dialog>
  );
}

export default AddAvailabilityForm;