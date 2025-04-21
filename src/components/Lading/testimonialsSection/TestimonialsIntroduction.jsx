import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import IntroductionSection from '../CommonComponents/IntroductionSection';

// Convert to motion component
const TestimonialsBackground = styled(motion.div)`
  background-color: #000000;
  padding: 0.5rem 0;  // Reduced from 1rem
  
  // Override IntroductionSection styles to make it more compact
  .introduction-section {
    padding-bottom: 1rem;  // Add reduced bottom padding
  }
  
  h2 {
    margin-bottom: 0.5rem !important;  // Reduce heading bottom margin
  }
  
  p {
    margin-top: 0.5rem !important;  // Reduce paragraph top margin
  }
  
  /* Override styles for paragraph text color */
  .ant-typography p {
    font-style: italic !important;
    font-size: 1.1rem !important;
    letter-spacing: 0.5px !important;
    max-width: 700px !important;
    margin: 0 auto !important;
    position: relative !important;
    padding-top: 12px !important;
    padding-left: 1rem !important;
    padding-right: 1rem !important;
    font-weight: 300 !important;
    color: inherit !important;
    
    @media (max-width: 768px) {
      font-size: 1rem !important;
      padding-top: 10px !important;
    }
    
    @media (max-width: 480px) {
      font-size: 0.9rem !important;
      letter-spacing: 0.3px !important;
    }
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
    
    @media (max-width: 480px) {
      width: 40px;
    }
  }
  
  /* More specific selector for title color */
  .ant-typography.ant-typography-h2,
  h2.ant-typography,
  .ant-typography h2 {
    color: #ffffff !important;
    font-weight: 600 !important;
    letter-spacing: -0.5px !important;
    padding-left: 1rem !important;
    padding-right: 1rem !important;
    
    @media (max-width: 768px) {
      font-size: 1.8rem !important;
    }
    
    @media (max-width: 480px) {
      font-size: 1.5rem !important;
    }
  }
`;

// Animation variants - optimized for faster appearance
const introVariants = {
  hidden: { 
    opacity: 0,
    y: 10 // Reduced from 20 for subtler movement
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3, // Reduced from 0.6
      ease: "easeInOut" // Changed for snappier animation
    }
  }
};

const TestimonialsIntroduction = () => {
  return (
    <TestimonialsBackground
      variants={introVariants}
    >
      <IntroductionSection
        sectionName="Testimonios"
        title="Lo que dicen nuestros usuarios"
        subtitle="MotoTrack está transformando la experiencia de registro y control de motocicletas en Santo Domingo este."
        bubbleTextColor="#FFFFFF"
        bubbleBorderColor="rgba(255, 255, 255, 0.8)"
        subtitleColor="rgba(255, 255, 255, 0.7)" 
      />
    </TestimonialsBackground>
  );
};

export default TestimonialsIntroduction;