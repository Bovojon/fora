import React, { useState } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import tw from "twin.macro";
import styled from "styled-components";
import {
  Navbar as BootNavbar,
  NavbarBrand as BootNavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
} from 'reactstrap';

const Navbar = styled(BootNavbar)`
  ${tw`flex justify-between items-center max-w-screen-xl mx-auto`};
  padding: 0
`

const NavbarBrand = styled(BootNavbarBrand)`
  ${tw`flex items-center font-black border-b-0 text-2xl! ml-0!`};
  
  a {
    ${tw`no-underline`}
  }
`

const NavLinks = styled.div`
  ${tw`inline-block my-5`};
  a {
    ${tw`no-underline`}
  }
`

const NavLink = tw.a`
  text-lg my-2 lg:text-sm lg:mx-6 lg:my-0 font-semibold tracking-wide transition duration-300
  pb-1 border-b-2 border-transparent hover:border-blue-500 hocus:text-blue-500 no-underline
`;

const PrimaryLink = tw(NavLink)`
  lg:mx-0 px-4 py-3 rounded bg-blue-500 text-gray-100 ml-3 hocus:bg-blue-700 hocus:text-gray-200 
  focus:shadow-outline border-b-0
`;

const MainNavbar = ({ navigateTo }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const handleBrandClick = (e) => {
    e.preventDefault();
    navigateTo("/");
  }

  const handleFindTimeClick = (e) => {
    e.preventDefault();
    navigateTo("/calendar");
  }

  return (
    <Navbar expand="md" light>
      <NavbarBrand onClick={handleBrandClick} href="#">Fora</NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="ml-auto" navbar>
          <NavLinks>
            <NavLink href="#">About us</NavLink>
            <PrimaryLink onClick={handleFindTimeClick} css="rounded-full" href="#">Find a time</PrimaryLink>
          </NavLinks>
        </Nav>
      </Collapse>
    </Navbar>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    navigateTo: (route) => { dispatch(push(route)) }
  }
}

export default connect(null, mapDispatchToProps)(MainNavbar);