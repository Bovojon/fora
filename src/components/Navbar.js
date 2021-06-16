import React, { useState, Fragment } from 'react';
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
  NavbarToggler as BootNavbarToggler,
  Collapse,
  Nav,
  NavItem as BootNavItem
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

import AboutDialog from './AboutDialog';
import { createCalendarPending } from '../actions/calendarActionCreators';

const NavbarBrand = styled(BootNavbarBrand)`
  ${tw`text-2xl! text-4xl font-black`};
  color: #4299e1 !important;
`

const NavLinks = styled.div`
  ${tw`inline-block my-5`};
  a { ${tw`no-underline`} }
`

const NavLink = styled.a`
  ${tw`text-base md:text-lg my-2 lg:mx-6 lg:my-0 font-semibold tracking-wide transition duration-300
    pb-1 border-b-2 border-transparent hocus:text-blue-500 no-underline cursor-pointer`}
  color: #f2a099 !important;
`

const PrimaryLink = styled.a`
  ${tw`lg:mx-0 px-6 py-3 ml-3 text-base md:text-lg border-b-0 font-semibold cursor-pointer rounded-full`}
  background-color: #fddede;
  color: #4299e1 !important;
`

const ModalContent = styled(Grid)`
  padding: 15px 35px 15px 35px;
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
  padding: 5px 17px;
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

const NavItem = styled(BootNavItem)`
  ${NavLinks} {
    ${tw`flex flex-col md:flex-row items-center`}
  }
`

const NavbarToggler = styled(BootNavbarToggler)`
  :focus {
    outline: none;
  }
`

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
}));

const RightSection = ({ handleFindTimeClick, handleShareClick, handleAboutClick, handlePrivacyClick }) => {
  const location = useLocation();
  const locationPath = location.pathname;
  if (locationPath === "/" || locationPath === "/privacy_policy" || locationPath === "/event") {
    return (
      <NavItem>
        <NavLinks>
          {locationPath === "/privacy_policy" ?
            <NavLink onClick={handlePrivacyClick}>Privacy</NavLink>
            :
            null
          }
          <PrimaryLink onClick={handleFindTimeClick}>Schedule time</PrimaryLink>
        </NavLinks>
      </NavItem>
    );
  } else {
    return (
      <NavItem>
        <NavLinks>
          <NavLink onClick={handleAboutClick}>About</NavLink>
          <PrimaryLink onClick={handleShareClick}>Share calendar</PrimaryLink>
        </NavLinks>
      </NavItem>   
    )
  }
}

const MainNavbar = ({ navigateTo, createCalendar, calendarUniqueId }) => {
  const [collapseIsOpen, setCollapseIsOpen] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [snackBarIsOpen, setSnackBarIsOpen] = useState(false);
  const [aboutIsOpen, setAboutIsOpen] = useState(false);
  const classes = useStyles();

  const handleBrandClick = (e) => {
    e.preventDefault();
    navigateTo("/");
  }
  const handleFindTimeClick = (e) => {
    e.preventDefault();
    createCalendar();
    navigateTo("/creating_calendar");
  }
  const handleShareClick = () => { setModalIsOpen(true) };
  const toggleNavbar = () => { setCollapseIsOpen(!collapseIsOpen) };
  const handleModalClose = () => { setModalIsOpen(false) };
  const handleCopyClick = (textToCopy) => {
    copy(textToCopy);
    setSnackBarIsOpen(true);
  };
  const handleSnackBarClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setSnackBarIsOpen(false);
  };
  const handleAboutClick = () => { setAboutIsOpen(true) }
  const handleAboutClose = () => { setAboutIsOpen(false) }
  const handlePrivacyClick = () => { navigateTo("/privacy_policy") }
  const shareLink = `https://letsfora.com/${calendarUniqueId}`

  return (
    <Fragment>
      <Navbar light expand="md" className="pl-md-5 pr-md-5">
        <NavbarBrand onClick={handleBrandClick} href="/">Fora</NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} />
        <Collapse isOpen={collapseIsOpen} navbar>
          <Nav className="ml-auto" navbar>
            <RightSection
              handleFindTimeClick={handleFindTimeClick}
              handleShareClick={handleShareClick}
              handleAboutClick={handleAboutClick}
              handlePrivacyClick={handlePrivacyClick}
            />
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
      <AboutDialog aboutIsOpen={aboutIsOpen} handleAboutClose={handleAboutClose} />
    </Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    calendarUniqueId: state.calendar.unique_id
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    navigateTo: (route) => { dispatch(push(route)) },
    createCalendar: () => { dispatch(createCalendarPending()) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainNavbar);