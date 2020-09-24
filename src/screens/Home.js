import React from "react";

import Reveal from "../components/shared/Reveal";
import Hero from "../components/home/Hero";

function Home() {
  return (
    <Reveal>
      <Hero roundedHeaderButton={true} />
    </Reveal>
  );
}

export default Home;