import React, { useState, useEffect } from 'react';
import moment from "moment";
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
  makeStyles,
  TextField
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

const useStyles = makeStyles((theme) => ({
  paper: {
    overflow: "visible !important"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginBottom: '20px',
    width: 200,
  }
}));

const startBeforeEnd = (start, end) => {
  return moment(end).diff(moment(start)) > 0;
}

const AddAvailabilityForm = ({ dialogIsOpen, handleDialogClose, handleAddTime }) => {
  const now = moment(new Date());
  const oneHourFromNow = moment().add(1, 'hours');
  const [startDateTime, setStartDateTime] = useState(new Date());
  const [startTime, setStartTime] = useState(now.format('HH:mm'));
  const [startDate, setStartDate] = useState(now.format('YYYY-MM-DD'));
  const [endDateTime, setEndDateTime] = useState(new Date(oneHourFromNow));
  const [endTime, setEndTime] = useState(oneHourFromNow.format('HH:mm'));
  const [endDate, setEndDate] = useState(oneHourFromNow.format('YYYY-MM-DD'));
  const [addDisabled, setAddDisabled] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    if (startBeforeEnd(startDateTime, endDateTime)) {
      setAddDisabled(false);
    } else {
      setAddDisabled(true);
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
  const handleStartTimeChange = (event) => {
    const time = event.target.value;
    setStartTime(time);
    setStartDateTime(new Date(time + " " + startDate));
  }
  const handleStartDateChange = (event) => {
    const date = event.target.value;
    setStartDate(date);
    setStartDateTime(new Date(startTime + " " + date));
  }
  const handleEndTimeChange = (event) => {
    const time = event.target.value;
    setEndTime(time);
    setEndDateTime(new Date(time + " " + endDate));
  }
  const handleEndDateChange = (event) => {
    const date = event.target.value;
    setEndDate(date);
    setEndDateTime(new Date(endTime + " " + date));
  }

  return (
    <Dialog open={dialogIsOpen} onClose={handleDialogClose} classes={{ paper: classes.paper}}>
      <IconButton onClick={handleDialogClose}><CloseIcon /></IconButton>
      <DialogTitle>Add your availability</DialogTitle>
      <DialogContent dividers={false}>
        <Grid container direction="column" justify="center" alignItems="center">
          <Text>Start:</Text>
          <TextField type="time" onChange={handleStartTimeChange} value={startTime} className={classes.textField}
            InputLabelProps={{ shrink: true }} inputProps={{ step: 60 }} />
          <TextField type="date" onChange={handleStartDateChange} value={startDate} className={classes.textField}
            InputLabelProps={{ shrink: true }} />
          <Text style={{ marginTop: "20px" }}>End:</Text>
          <TextField type="time" onChange={handleEndTimeChange} value={endTime} className={classes.textField}
            InputLabelProps={{ shrink: true }} inputProps={{ step: 60 }} />
          <TextField type="date" onChange={handleEndDateChange} value={endDate} className={classes.textField}
            InputLabelProps={{ shrink: true }} />
        </Grid>
      </DialogContent>
      <DialogActions>
        <Grid container direction="column" justify="space-around" alignItems="center">
          <Button onClick={handleAddClick} variant="contained" disabled={addDisabled} disableElevation>Add</Button>
          <Button onClick={handleDialogClose} variant="contained" disableElevation>Cancel</Button>
        </Grid>
      </DialogActions>
    </Dialog>
  );
}

export default AddAvailabilityForm;