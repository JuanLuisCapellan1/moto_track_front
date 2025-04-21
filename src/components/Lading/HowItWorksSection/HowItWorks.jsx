import React from 'react';
import styled from 'styled-components';
import { Row, Col } from 'antd';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import HowItWorksIntroduction from './HowItWorksIntroduction';
import HowItWorksExample from './HowItWorksExample';

const Container = styled(motion.div)`
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px 24px;
  
  @media (max-width: 768px) {
    padding: 15px 16px;
  }
`;

const Bubble = styled(motion.div)`
  display: inline-block;
  padding: 0.7rem 4rem;
  border-radius: 9999px; 
  background: transparent;
  color: #000000;
  font-weight: 500;
  margin-bottom: 1.5rem;
  border: 1px solid rgba(0, 0, 0, 0.50);
  
  @media (max-width: 768px) {
    padding: 0.5rem 2rem;
    font-size: 0.9rem;
  }
`;

const StyledRow = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  margin: 0 -12px;
  min-height: auto;
  align-items: center;
  
  @media (max-width: 768px) {
    min-height: auto;
    padding-bottom: 30px; /* Añadido padding inferior para evitar cortes */
  }
`;

const StyledCol = styled(motion.div)`
  padding: 0 12px;
  flex: 0 0 100%;
  
  @media (min-width: 992px) {
    flex: 0 0 50%;
    max-width: 50%;
  }
`;

// Animation variants - Faster animations with reduced delays
const containerVariants = {
  hidden: { 
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.2, // Reduced from 0.4
      ease: "easeOut",
      when: "beforeChildren",
      staggerChildren: 0.05 // Reduced from 0.1
    }
  }
};

const itemVariants = {
  hidden: { 
    opacity: 0,
    y: 10, // Reduced from 20 for subtler movement
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3, // Reduced from 0.5
      ease: "easeInOut" // Changed for faster animation curve
    }
  }
};

function HowItWorks() {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.05, // Lowered from 0.1 to trigger earlier
    rootMargin: "-20px 0px" // Changed from -50px to trigger sooner
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <Container
      id="how-it-works"
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
    >
      <motion.div style={{ textAlign: 'center', marginBottom: '3rem' }} variants={itemVariants}>
        <Bubble variants={itemVariants}>Cómo Funciona</Bubble>
      </motion.div>
      
      <StyledRow variants={itemVariants}>
        <StyledCol variants={itemVariants}>
          <HowItWorksIntroduction />
        </StyledCol>
        <StyledCol variants={itemVariants}>
          <HowItWorksExample />
        </StyledCol>
      </StyledRow>
    </Container>
  );
}

export default HowItWorks;