import React, { useState } from 'react';
import { Button } from 'antd';
import styled from 'styled-components';
import { SearchOutlined, FileSearchOutlined } from '@ant-design/icons';
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

// Styled secondary button with consistent landing page styling
const StyledSecondaryButton = styled(Button)`
  border-radius: 50px !important;
  padding: 0.7rem 1.3rem !important;
  height: auto !important;
  font-size: 0.9rem !important;
  background: transparent !important;
  border: 1px solid ${props => props.variant === "white" ? "white" : "#e5e7eb"} !important;
  color: ${props => props.variant === "white" ? "white" : "#4b5563"} !important;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05) !important;
  
  &:hover {
    border-color: ${props => props.variant === "white" ? "#ffffff80" : "#6366f1"} !important;
    color: ${props => props.variant === "white" ? "#ffffff" : "#6366f1"} !important;
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

const LandingButtonSecondary = ({ children, onClick, variant, ...props }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <StyledSecondaryButton 
      onClick={onClick}
      size="large"
      variant={variant}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
      {...props}
    >
      {children} 
      <AnimatePresence mode="wait" initial={false}>
        {isHovered ? (
          <IconContainer
            key="fileSearch"
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 5 }}
            transition={{ duration: 0.2 }}
          >
            <FileSearchOutlined />
          </IconContainer>
        ) : (
          <IconContainer
            key="search"
            initial={{ opacity: 0, x: 5 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -5 }}
            transition={{ duration: 0.2 }}
          >
            <SearchOutlined />
          </IconContainer>
        )}
      </AnimatePresence>
    </StyledSecondaryButton>
  );
};

export default LandingButtonSecondary;