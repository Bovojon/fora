import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

import { removeError } from '../../actions/errorActionCreators';

const ErrorNotification = ({ error, removeError }) => {
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return;
    removeError();
    setIsError(false);
    setErrorMessage("");
  };

  useEffect(() => {
    setIsError(error.isError);
    setErrorMessage(error.errorMessage);
  }, [error]);

  return (
    <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} open={isError} autoHideDuration={5000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="error" elevation={6} variant="filled">{errorMessage}</Alert>
    </Snackbar>
  );
}

const mapStateToProps = (state) => {
  return {
    error: state.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    removeError: () => { dispatch(removeError()) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ErrorNotification);