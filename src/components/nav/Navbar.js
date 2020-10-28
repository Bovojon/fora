import React, { useState } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { useLocation } from 'react-router-dom';
import tw from "twin.macro";
import styled from "styled-components";
import {
  Navbar,
  NavbarBrand as BootNavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem
} from 'reactstrap';
import { Modal, Backdrop, Fade, Box as MuiBox, makeStyles } from '@material-ui/core';

const NavbarBrand = styled(BootNavbarBrand)`
  ${tw`text-2xl! text-4xl font-black`};
  color: #4299e1 !important;
`

const NavLinks = styled.div`
  ${tw`inline-block my-5`};
  a { ${tw`no-underline`} }
`

const NavLink = tw.a`
  text-lg my-2 lg:mx-6 lg:my-0 font-semibold tracking-wide transition duration-300
  pb-1 border-b-2 border-transparent hover:border-blue-500 hocus:text-blue-500 no-underline
`;

const PrimaryLink = tw.a`
  lg:mx-0 px-4 py-3 rounded bg-blue-500 text-gray-100 ml-3 hover:bg-blue-700 hover:text-gray-200 
  hover:shadow-outline border-b-0 font-semibold
`;

const Box = styled(MuiBox)`
  padding: 24px 24px 20px 24px;
  border-radius: 8px;
  background-color: #fff;
`

const SmallTitle = styled.p`
  font: 500 20px Roboto,RobotoDraft,Helvetica,Arial,sans-serif;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: .1px;
  line-height: 24px;
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
                  <PrimaryLink css="rounded-full" href="#" onClick={handleShareClick}>Share calendar</PrimaryLink>
                </NavLinks>
              </NavItem>
              :
              <NavItem>
                <NavLinks>
                  <PrimaryLink onClick={handleFindTimeClick} css="rounded-full" href="/">Find a time</PrimaryLink>
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
          <Box boxShadow={5}>
            <SmallTitle>Here's the link to the calendar</SmallTitle>
          </Box>
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