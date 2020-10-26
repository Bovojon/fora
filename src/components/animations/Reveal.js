import React from "react";
import tw from "twin.macro";
import { motion } from "framer-motion";
import useInView from "use-in-view";

const StyledDiv = tw.div`min-h-screen overflow-hidden`;

const AnimationReveal = ({ disabled, children }) => {
  if (disabled) {
    return <>{children}</>;
  }

  if (!Array.isArray(children)) children = [children];

  const directions = ["left", "right"];
  const childrenWithAnimation = children.map((child, i) => {
    return (
      <AnimatedSlideInComponent key={i} direction={directions[i % directions.length]}>
        {child}
      </AnimatedSlideInComponent>
    );
  });
  return <>{childrenWithAnimation}</>;
}

const AnimatedSlideInComponent = ({ direction = "left", offset = 30, children }) => {
  const [ref, inView] = useInView(30);

  const x = { target: "0%" };

  if (direction === "left") x.initial = "-150%";
  else x.initial = "150%";

  return (
    <motion.section
      initial={{ x: x.initial }}
      animate={{ 
        x: inView && x.target,
        transitionEnd:{
          x: inView && 0
        }
      }}
      transition={{ type: "spring", damping: 25 }}
      ref={ref}
    >
      {children}
    </motion.section>
  );
}

export default props => (
  <StyledDiv className="App">
    <AnimationReveal {...props} />
  </StyledDiv>
);
