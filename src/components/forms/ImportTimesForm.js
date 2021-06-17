import React from 'react';
import styled from "styled-components";
import DatePicker from "react-datepicker";
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
  makeStyles
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

const CustomDatePicker = styled(DatePicker)`
  padding: 8px;
  margin-right: 8px;
  color: #3c4043;
  font-size: 14px;
  font-weight: 400;
  line-height: 16px;
  background-color: #f1f3f4;
  border-radius: 4px;
  text-align: center;
  width: 80%
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
    overflow: "visible !important"
  },
  container: {
    marginBottom: "10px"
  }
}));

const ImportTimesForm = ({ dialogIsOpen, handleDialogClose, handleImportClick, startDate, endDate, setStartDate, setEndDate, fullScreen }) => {
  const classes = useStyles();

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
            <CustomDatePicker selected={startDate} onChange={date => setStartDate(date)} />
          </Grid>
          <Grid container direction="row" justify="center" alignItems="center">
            <Text>End:</Text>
            <CustomDatePicker selected={endDate} onChange={date => setEndDate(date)} />
          </Grid>
          </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleImportClick} variant="contained" disableElevation>Submit</Button>
      </DialogActions>
    </Dialog>
  );
}

export default ImportTimesForm;