import React from 'react';
import { Row, Col } from 'antd';
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import HowItWorksIntroduction from './HowItWorksIntroduction';
import HowItWorksExample from './HowItWorksExample';

const GridContainer = styled(motion.div)`
  max-width: 1400px;
  margin: 0 auto;
  padding: 40px 24px;
`;

const StyledRow = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  min-height: 600px;
  align-items: center;
`;

const StyledCol = styled(motion.div)`
  padding: 0 12px;
  flex: 0 0 100%;
  
  @media (min-width: 992px) {
    flex: 0 0 50%;
    max-width: 50%;
  }
`;

// Animation variants - clean Stripe-like animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut",
      when: "beforeChildren",
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

function HowItWorksGrid() {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: "-50px 0px"
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <GridContainer
      id="how-it-works"
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
    >
      <StyledRow variants={itemVariants}>
        <StyledCol variants={itemVariants}>
          <HowItWorksIntroduction />
        </StyledCol>
        <StyledCol variants={itemVariants}>
          <HowItWorksExample />
        </StyledCol>
      </StyledRow>
    </GridContainer>
  );
}

export default HowItWorksGrid;
