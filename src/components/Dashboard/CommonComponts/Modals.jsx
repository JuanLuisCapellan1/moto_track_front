import React from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';

import { useTheme } from '../../../context/ThemeContext';

// Modificar el styled component para usar $zIndex en lugar de zIndex
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* overlay semitransparente */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: ${props => props.$zIndex || 2500}; // Usar $zIndex
  padding: 15px;
`;

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: ${props => props.$zIndex || 1000};
  /* other styles */
`;

const ModalContent = styled(motion.div)`
  position: relative;
  z-index: ${props => props.zIndex ? props.zIndex + 1 : 2501}; // One higher than overlay
  background-color: ${props => props.theme?.token?.contentBg || '#FFFFFF'};
  width: ${props => props.width || '600px'};
  max-width: 100%;
  height: ${props => props.height || '400px'};
  max-height: 90vh;
  overflow-y: auto; /* Enable scrolling */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
  color: ${props => props.theme?.token?.titleColor || '#000000'};

  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }

  /* Si quieres un borde para la modal, lo dejas aquí */
  border: 1px solid ${props => props.theme?.token?.subtitleBlack || '#635BFF'}; 
  
  /* Media queries para dispositivos móviles */
  @media (max-width: 768px) {
    width: 100% !important;
    padding: 15px;
    border-radius: 12px;
    height: auto !important;
    min-height: ${props => props.mobileHeight || '300px'};
  }
  
  @media (max-width: 480px) {
    padding: 12px;
    border-radius: 10px;
  }
`;

const CloseButton = styled(motion.button)`
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: ${props => props.theme.token.colorPrimary || '#635BFF'};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  z-index: ${props => props.zIndex ? props.zIndex - 1 : 2999}; // Lower than content
  
  @media (max-width: 480px) {
    top: 12px;
    right: 12px;
    width: 28px;
    height: 28px;
    font-size: 1.2rem;
  }
`;

// Luego en el componente Modal, usa los prefijos $ para las props que no deberían pasar al DOM
const Modal = ({ 
  show, 
  onClose, 
  width = '500px', 
  height = 'auto', 
  mobileHeight, 
  children, 
  hideCloseButton = false,
  zIndex = 2500   // Add zIndex prop with default value
}) => {
  const { theme } = useTheme();
  
  if (!show) return null;

  const handleOverlayClick = () => {
    onClose && onClose();
  };

  const handleModalContentClick = (e) => {
    e.stopPropagation();
  };

  return (
    <AnimatePresence>
      {show && (
        <ModalOverlay
          onClick={handleOverlayClick}
          $initial={{ opacity: 0 }}  // Usar $ para props de framer-motion
          $animate={{ opacity: 1 }}  // Usar $ para props de framer-motion
          $exit={{ opacity: 0 }}     // Usar $ para props de framer-motion
          $zIndex={zIndex}           // Usar $ para zIndex
        >
          <ModalContainer $zIndex={zIndex}>
            <ModalContent
              width={width}
              height={height}
              mobileHeight={mobileHeight}
              onClick={handleModalContentClick}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              theme={theme}
              zIndex={zIndex}
            >
              {!hideCloseButton && (  // Only show close button if not hidden
                <CloseButton 
                  onClick={onClose}
                  whileHover={{ rotate: 180 }}
                  transition={{ duration: 0.3 }}
                  theme={theme}
                  zIndex={zIndex}
                >
                  <CloseOutlined />
                </CloseButton>
              )}
              {children}
            </ModalContent>
          </ModalContainer>
        </ModalOverlay>
      )}
    </AnimatePresence>
  );
};

export default Modal;
