import React, { useState, useEffect } from 'react';
import moment from "moment";
import styled from "styled-components";
import tw from "twin.macro";
import { Close as CloseIcon } from '@material-ui/icons';
import {
  Grid,
  Button as MuiButton,
  Dialog,
  DialogActions as MuiDialogActions,
  DialogTitle as MuiDialogTitle,
  DialogContent as MuiDialogContent,
  IconButton as MuiIconButton,
  makeStyles,
  TextField
} from '@material-ui/core';

const DialogTitle = styled(MuiDialogTitle)`
  padding: 16px 24px 5px 24px;
`

const DialogActions = styled(MuiDialogActions)`
  padding: 8px 13px;
`

const DialogContent = styled(MuiDialogContent)`
  min-width: 320px;
  padding: 8px 30px;
`

const IconButton = styled(MuiIconButton)`
  position: absolute;
  right: 8px;
  top: 8px;
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
  margin: 5px 0px;
  :focus {
    outline: none;
  }
`

const Text = tw.div`md:w-16 sm:w-5/12 flex justify-center items-center font-semibold mr-2`;

const useStyles = makeStyles((theme) => ({
  paper: {
    overflow: "auto !important"
  },
  container: {
    marginBottom: "25px"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 150,
  }
}));

const startBeforeEnd = (start, end) => {
  return moment(end).diff(moment(start)) > 0;
}

const ImportTimesForm = ({ dialogIsOpen, handleDialogClose, handleImportClick, importStartTime, importEndTime, setImportStartTime,
  setImportEndTime, fullScreen }) => {
  const [startDate, setStartDate] = useState(moment(new Date(importStartTime)).format('YYYY-MM-DD'));
  const [endDate, setEndDate] = useState(moment(new Date(importEndTime)).format('YYYY-MM-DD'));
  const [submitDisabled, setSubmitDisabled] = useState(startBeforeEnd(startDate, endDate));
  const classes = useStyles();

  useEffect(() => {
    if (startBeforeEnd(startDate, endDate)) {
      setSubmitDisabled(false);
    } else {
      setSubmitDisabled(true);
    }
  }, [startDate, endDate]);

  const handleStartDateChange = (event) => {
    const date = event.target.value;
    setStartDate(date);
    setImportStartTime(new Date(date));
  }
  const handleEndDateChange = (event) => {
    const date = event.target.value;
    setEndDate(date);
    setImportEndTime(new Date(date))
  }

  return (
    <Dialog open={dialogIsOpen} onClose={handleDialogClose} fullWidth={fullScreen} maxWidth="sm" classes={{ paper: classes.paper}}>
      <DialogTitle>
        <span>Import events from</span>
        <IconButton onClick={handleDialogClose}><CloseIcon /></IconButton>
      </DialogTitle>
      <DialogContent>
        <Grid container direction="column" justify="space-between" alignItems="center">
          <Grid container direction="row" justify="center" alignItems="center" classes={{ container: classes.container}}>
            <Text>Start:</Text>
            <TextField type="date" onChange={handleStartDateChange} value={startDate} className={classes.textField}
              InputLabelProps={{ shrink: true }} />
          </Grid>
          <Grid container direction="row" justify="center" alignItems="center">
            <Text>End:</Text>
            <TextField type="date" onChange={handleEndDateChange} value={endDate} className={classes.textField}
              InputLabelProps={{ shrink: true }} />
          </Grid>
          </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleImportClick} variant="contained" disabled={submitDisabled} disableElevation>Submit</Button>
      </DialogActions>
    </Dialog>
  );
}

export default ImportTimesForm;