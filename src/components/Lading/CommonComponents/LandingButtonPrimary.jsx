import React, { useState } from 'react';
import { Button } from 'antd';
import { ArrowRightOutlined, RightOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

// Styled container to handle the icon animation
const IconContainer = styled(motion.span)`
  display: inline-flex;
  margin-left: 8px;
  
  svg {
    transform: scale(1.2);
    stroke-width: 2px;
    stroke: currentColor;
  }
`;

// Styled primary button with consistent landing page styling
const StyledPrimaryButton = styled(Button)`
  border-radius: 50px !important;
  padding: 0.7rem 1.3rem !important;
  height: auto !important;
  font-size: 0.9rem !important;
  background: #6366f1 !important;
  box-shadow: 0 2px 8px rgba(99, 102, 241, 0.2) !important;
  border: none !important;
  
  &:hover {
    background: #4f46e5 !important;
  }
  
  /* Responsive styles */
  @media (max-width: 768px) {
    padding: 0.6rem 1.1rem !important;
    font-size: 0.85rem !important;
  }
  
  @media (max-width: 480px) {
    padding: 0.5rem 1rem !important;
    font-size: 0.8rem !important;
    width: 100% !important;
  }
`;

const LandingButtonPrimary = ({ children, onClick, ...props }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <StyledPrimaryButton 
      type="primary" 
      onClick={onClick}
      size="large"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)} // Add touch support for mobile
      onTouchEnd={() => setIsHovered(false)}
      {...props}
    >
      {children} 
      <AnimatePresence mode="wait" initial={false}>
        {isHovered ? (
          <IconContainer
            key="arrow"
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 5 }}
            transition={{ duration: 0.2 }}
          >
            <ArrowRightOutlined />
          </IconContainer>
        ) : (
          <IconContainer
            key="right"
            initial={{ opacity: 0, x: 5 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -5 }}
            transition={{ duration: 0.2 }}
          >
            <RightOutlined />
          </IconContainer>
        )}
      </AnimatePresence>
    </StyledPrimaryButton>
  );
};

export default LandingButtonPrimary;