import React, { useState } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { useLocation } from 'react-router-dom';
import tw from "twin.macro";
import styled from "styled-components";
import { Clear, FilterNoneOutlined as CopyIcon } from '@material-ui/icons';
import copy from 'copy-to-clipboard';
import {
  Navbar,
  NavbarBrand as BootNavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem
} from 'reactstrap';
import { 
  Grid,
  Modal, 
  Backdrop, 
  Fade,
  IconButton as MuiIconButton,
  makeStyles,
  Snackbar
} from '@material-ui/core';

import { createCalendarPending } from '../actions/calendarActionCreators';

const NavbarBrand = styled(BootNavbarBrand)`
  ${tw`text-2xl! text-4xl font-black`};
  color: #4299e1 !important;
`

const NavLinks = styled.div`
  ${tw`inline-block my-5`};
  a { ${tw`no-underline`} }
`

const PrimaryLink = styled.a`
  ${tw`lg:mx-0 px-4 py-3 rounded bg-blue-500 ml-3 hover:bg-blue-700 
    hover:shadow-outline border-b-0 font-semibold cursor-pointer`}
  color: white !important;
`

const ModalContent = styled(Grid)`
  padding: 0px 25px 0px 25px;
  border-radius: 8px;
  background-color: #fff;
  max-width: 400px;
  min-height: 160px;
  min-width: 400px;
`

const SmallTitle = styled.span`
  font-size: 16px;
  font-weight: 500;
  letter-spacing: .1px;
  line-height: 24px;
`

const CopyArea = styled(Grid)`
  align-items: center;
  background: #f1f3f4;
  border-radius: 10px;
  color: #5f6368;
  display: flex;
  padding: 0px 15px;
`

const LinkText = styled.span`
  letter-spacing: .00625em;
  font-family: Roboto,Arial,sans-serif;
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.5rem;
  color: #202124;
  flex-grow: 1;
`

const CloseIcon = styled(Clear)`
  cursor: pointer;
`

const IconButton = styled(MuiIconButton)`
  outline: none !important;
  cursor: pointer;
`

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
}));

const MainNavbar = ({ navigateTo, createNewCalendar, calendarUniqueId }) => {
  const [collapseIsOpen, setCollapseIsOpen] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [snackBarIsOpen, setSnackBarIsOpen] = useState(false);
  const location = useLocation();
  const classes = useStyles();

  const handleBrandClick = (e) => {
    e.preventDefault();
    setCollapseIsOpen(false);
    navigateTo("/");
  }
  const handleFindTimeClick = (e) => {
    e.preventDefault();
    createNewCalendar();
    setCollapseIsOpen(false);
    navigateTo("/creating_calendar");
  }
  const toggleNavbar = () => {
    setCollapseIsOpen(!collapseIsOpen);
  };
  const handleShareClick = () => {
    setModalIsOpen(true);
  };
  const handleModalClose = () => {
    setModalIsOpen(false);
  };
  const handleCopyClick = (textToCopy) => {
    copy(textToCopy);
    setSnackBarIsOpen(true);
  };
  const handleSnackBarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackBarIsOpen(false);
  };
  const shareLink = `letsfora.com/${calendarUniqueId}`

  return (
    <>
      <Navbar light expand="md" className="pl-md-5 pr-md-5">
        <NavbarBrand onClick={handleBrandClick} href="/">Fora</NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} />
        <Collapse isOpen={collapseIsOpen} navbar>
          <Nav className="ml-auto" navbar>
            {location.pathname === "/" ?
              <NavItem>
                <NavLinks>
                  <PrimaryLink onClick={handleFindTimeClick} css="rounded-full">Find a time</PrimaryLink>
                </NavLinks>
              </NavItem>
              :
              <NavItem>
                <NavLinks>
                  <PrimaryLink onClick={handleShareClick} css="rounded-full">Share calendar</PrimaryLink>
                </NavLinks>
              </NavItem>
            }
          </Nav>
        </Collapse>
      </Navbar>
      <Modal
        aria-labelledby="Share calendar link"
        className={classes.modal}
        open={modalIsOpen}
        onClose={handleModalClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}>
        <Fade in={modalIsOpen}>
          <ModalContent container direction="column" justify="space-evenly" alignItems="flex-start">
            <Grid container direction="row" justify="space-between" alignItems="center">
              <SmallTitle>Here's the link to this calendar</SmallTitle>
              <CloseIcon onClick={handleModalClose} color="action" />
            </Grid>
            <CopyArea container direction="row" justify="space-between" alignItems="center">
              <LinkText>{shareLink}</LinkText>
              <IconButton onClick={() => { handleCopyClick(shareLink) }}>
                <CopyIcon /> 
              </IconButton>
            </CopyArea>
          </ModalContent>
        </Fade>
      </Modal>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        open={snackBarIsOpen}
        autoHideDuration={3000}
        onClose={handleSnackBarClose}
        message="Copied calendar link"
      />
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    calendarUniqueId: state.calendar.unique_id
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    navigateTo: (route) => dispatch(push(route)),
    createNewCalendar: () => dispatch(createCalendarPending())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainNavbar);