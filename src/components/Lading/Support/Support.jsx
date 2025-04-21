import React from 'react';
import styled from 'styled-components';
import { Row, Col } from 'antd';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import SupportIntroduction from './SupportIntroduction';
import SupportExample from './SupportExample';

const Container = styled(motion.div)`
  max-width: 1400px;
  margin: 0 auto;
  padding: 40px 24px;
  background-color: white;
  
  @media (max-width: 768px) {
    padding: 30px 16px;
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
  min-height: 600px;
  align-items: center;
  
  @media (max-width: 768px) {
    min-height: auto;
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

const Support = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.05, // Lowered from 0.1
    rootMargin: "-20px 0px" // Changed from -50px to trigger sooner
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  // Animation variants - optimized for faster appearance
  const containerVariants = {
    hidden: { 
      opacity: 0 
    },
    visible: { 
      opacity: 1,
      transition: {
        duration: 0.2, // Reduced from 0.5
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.05 // Reduced from 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 10 // Reduced from 20 for subtler movement
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.3, // Reduced from 0.5
        ease: "easeInOut" // Changed for snappier animation
      }
    }
  };

  const bubbleVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.95 // Increased from 0.9 for subtler effect
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.3, // Reduced from 0.4
        ease: "easeInOut" // Changed for snappier animation
      }
    }
  };

  return (
    <Container
      id="support"
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
    >
      <motion.div style={{ textAlign: 'center', marginBottom: '3rem' }} variants={itemVariants}>
        <Bubble variants={bubbleVariants}>Soporte</Bubble>
      </motion.div>
      
      <StyledRow variants={itemVariants}>
        <StyledCol variants={itemVariants}>
          <SupportIntroduction />
        </StyledCol>
        <StyledCol variants={itemVariants}>
          <SupportExample />
        </StyledCol>
      </StyledRow>
    </Container>
  );
};

export default Support;