import React from "react";
import tw from "twin.macro";

import Reveal from "../components/animations/Reveal";

const Container = tw.div`relative`;

const NotFound = () => {
  return (
    <Reveal>
      <Container>Oops, this page doesn't exist.</Container>
    </Reveal>
  );
}

export default NotFound;