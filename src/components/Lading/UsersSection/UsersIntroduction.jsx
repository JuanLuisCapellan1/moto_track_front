import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import IntroductionSection from '../CommonComponents/IntroductionSection';

// Wrapper with black background
const BlackBackground = styled(motion.div)`
  background-color: #000000;
  
  /* Override styles for paragraph text color */
  .ant-typography p {
    font-style: italic !important;
    font-size: 1.1rem !important; /* Slightly reduced font size */
    letter-spacing: 0.5px !important;
    max-width: 700px !important;
    margin: 0 auto !important;
    position: relative !important;
    padding-top: 12px !important;
    font-weight: 300 !important; /* Lighter font weight */
    color: inherit !important; /* Allow the color to be inherited from parent */
  }
  
  /* Add subtle separator above subtitle */
  .ant-typography p:before {
    content: "";
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 1px;
    background-color: rgba(255, 255, 255, 0.3);
  }
  
  /* More specific selector for title color */
  .ant-typography.ant-typography-h2,
  h2.ant-typography,
  .ant-typography h2 {
    color: #ffffff !important;
    font-weight: 600 !important;
    letter-spacing: -0.5px !important;
  }
`;

// Animation variants for introduction - optimized for faster appearance
const introVariants = {
  hidden: { 
    opacity: 0,
    y: 10 // Reduced from 20 for subtler movement
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3, // Reduced from 0.5
      ease: "easeInOut" // Changed from easeOut for snappier animation
    }
  }
};

const UsersIntroduction = () => {
  return (
    <BlackBackground variants={introVariants}>
      <IntroductionSection
        sectionName="Usuarios"
        title="Para Cada Tipo de Usuario"
        subtitle="Nuestro sistema está diseñado para satisfacer las necesidades específicas de cada participante en el proceso de registro y control."
        bubbleTextColor="#FFFFFF"
        bubbleBorderColor="rgba(255, 255, 255, 0.8)"
        subtitleColor="rgba(255, 255, 255, 0.7)" 
      />
    </BlackBackground>
  );
};

export default UsersIntroduction;