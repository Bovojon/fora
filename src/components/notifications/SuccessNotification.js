import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

import { removeSuccess } from '../../actions/successActionCreators';

const SuccessNotification = ({ success, removeSuccess }) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return;
    removeSuccess();
    setIsSuccess(false);
    setSuccessMessage("");
  };

  useEffect(() => {
    setIsSuccess(success.isSuccess);
    setSuccessMessage(success.successMessage);
  }, [success]);

  return (
    <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} open={isSuccess} autoHideDuration={3000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="success" elevation={6} variant="filled">{successMessage}</Alert>
    </Snackbar>
  );
}

const mapStateToProps = (state) => {
  return {
    success: state.success
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    removeSuccess: () => { dispatch(removeSuccess()) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SuccessNotification);