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
import { Modal, Backdrop, Fade, makeStyles } from '@material-ui/core';

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

const useStyles = makeStyles((theme) => {
  console.log(theme.palette.background.paper)
  console.log(theme.shadows[5])
  console.log(theme.spacing(2, 4, 3))
  return {
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  }}
});

const MainNavbar = ({ navigateTo }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const classes = useStyles();
  const location = useLocation();
  const handleBrandClick = (e) => {
    e.preventDefault();
    navigateTo("/");
  }
  const handleFindTimeClick = (e) => {
    e.preventDefault();
    navigateTo("/calendar");
  }
  const toggle = () => {
    setIsOpen(!isOpen);
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
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
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
                  <NavLink href="/">About us</NavLink>
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
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Transition modal</h2>
            <p id="transition-modal-description">react-transition-group animates me.</p>
          </div>
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