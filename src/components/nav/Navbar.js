import React, { useState } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { useLocation } from 'react-router-dom';
import tw from "twin.macro";
import styled from "styled-components";
import { Clear, FilterNoneOutlined as CopyIcon } from '@material-ui/icons';
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
  makeStyles
} from '@material-ui/core';

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
  padding: 15px 24px 20px 24px;
  border-radius: 8px;
  background-color: #fff;
  max-width: 400px;
  min-height: 200px;
  min-width: 400px;
`

const SmallTitle = styled.span`
  font-size: 16px;
  font-weight: 500;
  letter-spacing: .1px;
  line-height: 24px;
`

const LightText = styled.span`
  color: #5f6368;
  font: 400 14px / 20px Roboto, sans-serif;
  margin-top: 15px;
  margin-bottom: 12px;
`

const CopyArea = styled(Grid)`
  align-items: center;
  background: #f1f3f4;
  border-radius: 4px;
  color: #5f6368;
  display: flex;
  padding: 15px 12px;
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

const ClearIcon = styled(Clear)`
  cursor: pointer;
`

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
}));

const MainNavbar = ({ navigateTo }) => {
  const [collapseIsOpen, setCollapseIsOpen] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const location = useLocation();
  const classes = useStyles();

  const handleBrandClick = (e) => {
    e.preventDefault();
    navigateTo("/");
  }
  const handleFindTimeClick = (e) => {
    e.preventDefault();
    navigateTo("/calendar");
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

  return (
    <>
      <Navbar light expand="md" className="pl-md-5 pr-md-5">
        <NavbarBrand onClick={handleBrandClick} href="/">Fora</NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} />
        <Collapse isOpen={collapseIsOpen} navbar>
          <Nav className="ml-auto" navbar>
            {location.pathname === "/calendar" ?
              <NavItem>
                <NavLinks>
                  <PrimaryLink css="rounded-full" onClick={handleShareClick}>Share calendar</PrimaryLink>
                </NavLinks>
              </NavItem>
              :
              <NavItem>
                <NavLinks>
                  <PrimaryLink onClick={handleFindTimeClick} css="rounded-full">Find a time</PrimaryLink>
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
          <ModalContent boxShadow={5} container direction="column" justify="space-evenly" alignItems="flex-start">
            <Grid container direction="row" justify="space-between" alignItems="center">
              <SmallTitle>Here's the link to this calendar</SmallTitle>
              <ClearIcon onClick={handleModalClose} color="action" />
            </Grid>
            <LightText>Also, here is the calendar ID if you just want to share that: </LightText>
            <CopyArea container direction="row" justify="space-between" alignItems="center">
              <LinkText>fora.com/calendar/link</LinkText>
              <CopyIcon />
            </CopyArea>
          </ModalContent>
        </Fade>
      </Modal>
    </>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    navigateTo: (route) => { dispatch(push(route)) }
  }
}

export default connect(null, mapDispatchToProps)(MainNavbar);