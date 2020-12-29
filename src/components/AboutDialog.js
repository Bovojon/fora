import React, { useEffect, useRef } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button
} from '@material-ui/core';

const AboutDialog = ({ aboutIsOpen, handleAboutClose }) => {
  const descriptionElementRef = useRef(null);
  
  useEffect(() => {
    if (aboutIsOpen) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) descriptionElement.focus();
    }
  }, [aboutIsOpen]);

  return (
    <Dialog open={aboutIsOpen} onClose={handleAboutClose} scroll="paper">
      <DialogTitle>Subscribe</DialogTitle>
        <DialogContent dividers={true}>
          <DialogContentText ref={descriptionElementRef} tabIndex={-1}>
                          {[...new Array(50)]
                            .map(
                              () => `Cras mattis consectetur purus sit amet fermentum.
              Cras justo odio, dapibus ac facilisis in, egestas eget quam.
              Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
              Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,
                            )
                            .join('\n')}
          </DialogContentText>
        </DialogContent>
        <DialogActions>      
          <Button onClick={handleAboutClose} color="primary">Got it</Button>
        </DialogActions>
    </Dialog>
  );
}

export default AboutDialog;