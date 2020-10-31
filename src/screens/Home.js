import React from "react";
import tw from "twin.macro";
import styled from "styled-components";

import Reveal from "../components/animations/Reveal";

import TeamIllustration from "../images/team-illustration-2.svg";

const Container = tw.div`relative`;
const TwoColumn = tw.div`flex flex-col lg:flex-row lg:items-center max-w-screen-xl mx-auto py-20 md:py-24`;
const LeftColumn = tw.div`relative lg:w-5/12 text-center max-w-lg mx-auto lg:max-w-none lg:text-left`;
const RightColumn = tw.div`relative mt-12 lg:mt-0 flex-1 flex flex-col justify-center lg:self-end sm:ml-4 md:ml-20`;
const Heading = tw.h1`font-bold text-3xl md:text-3xl lg:text-4xl xl:text-5xl text-gray-900 leading-tight`;
const Paragraph = tw.p`my-5 lg:my-8 text-base xl:text-lg`;
const Column = tw.div`w-full max-w-md mx-auto md:max-w-none md:mx-0`;
const ImageColumn = tw(Column)`md:w-10/12 flex-shrink-0 h-full md:h-auto`;
const BlueHighlight = tw.span`text-blue-500`;

const Actions = styled.div`
  ${tw`relative max-w-md text-center mx-auto lg:mx-0`}
  input {
    ${tw`sm:pr-48 pl-8 py-4 sm:py-5 rounded-full border-2 w-full font-medium focus:outline-none transition duration-300  focus:border-blue-500 hover:border-gray-500`}
  }
  button {
    ${tw`w-full sm:absolute right-0 top-0 bottom-0 bg-blue-500 text-gray-100 font-bold mr-2 my-4 sm:my-2 rounded-full py-4 flex items-center justify-center sm:w-40 sm:leading-none focus:outline-none hover:bg-blue-900 transition duration-300`}
  }
`;

const Home = () => {
  return (
    <Reveal>
      <Container>
        <TwoColumn>
          <LeftColumn>
            <Heading>Find a time that works for<BlueHighlight> everyone.</BlueHighlight></Heading>
            <Paragraph><BlueHighlight>Fora</BlueHighlight> is a social calendar to plan group events.</Paragraph>
            <Actions>
              <input type="text" placeholder="Enter calendar ID" />
              <button>Join</button>
            </Actions>
          </LeftColumn>
          <RightColumn>
            <ImageColumn>
              <img tw="min-w-0 w-full max-w-lg xl:max-w-3xl" src={TeamIllustration} alt="Design Illustration" />
            </ImageColumn>
          </RightColumn>
        </TwoColumn>
      </Container>
    </Reveal>
  );
}

export default Home;