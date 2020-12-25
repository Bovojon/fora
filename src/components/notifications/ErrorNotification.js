import React, { useState } from 'react';
import { Snackbar } from '@material-ui/core';

const ErrorNotification = () => {

  return (
    <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }} open={snackBarIsOpen} autoHideDuration={4000} onClose={handleSnackBarClose} message={message}>
      <Alert onClose={handleClose} severity="error">
        Sorry, something...
      </Alert>
    </Snackbar>
  );
}

export default ErrorNotification;