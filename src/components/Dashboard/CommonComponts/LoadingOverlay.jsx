import React from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../../context/ThemeContext';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

// Overlay styled component with higher z-index than modals
const StyledOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: ${props => props.$zIndex || 3000}; /* Higher than the modal's z-index of 2500 */
`;

const SpinnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${props => props.theme?.token?.contentBg || '#FFFFFF'};
  padding: 30px 40px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
`;

const LoadingText = styled.p`
  margin-top: 16px;
  color: ${props => props.theme?.token?.titleColor || '#000000'};
  font-size: 16px;
  font-weight: 500;
`;

const antIconStyle = {
  fontSize: 40,
};

/**
 * Loading Overlay Component
 * @param {boolean} isLoading - Controls visibility of the loading overlay
 * @param {string} text - Optional text to display beneath the spinner
 * @param {number} zIndex - Optional z-index value (default: 3000)
 * @returns {JSX.Element|null}
 */
const LoadingOverlay = ({ isLoading, text = "Cargando...", zIndex = 3000 }) => {
  const { theme } = useTheme();
  
  return (
    <AnimatePresence>
      {isLoading && (
        <StyledOverlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.1}}
          $zIndex={zIndex}
        >
          <SpinnerContainer theme={theme}>
            <Spin 
              indicator={<LoadingOutlined style={antIconStyle} spin />} 
              size="large"
              style={{ color: theme?.token?.colorPrimary }}
            />
            {text && <LoadingText theme={theme}>{text}</LoadingText>}
          </SpinnerContainer>
        </StyledOverlay>
      )}
    </AnimatePresence>
  );
};

export default LoadingOverlay;