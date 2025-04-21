import React from 'react';
import { Alert } from 'antd';
import { WarningOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useTheme } from '../../../../context/ThemeContext';
import { useLanguage } from '../../../../context/LanguageContext';

const StyledAlertContainer = styled(motion.div)`
  margin-bottom: 24px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  background-color: ${props => props.theme.token.contentBg};
`;

const StyledAlert = styled(Alert)`
  && {
    background-color: ${props => props.theme.token.contentBg};
    border: 1px solid ${props => props.theme.currentTheme === 'themeDark' ? '#303030' : '#e8e8e8'};
    
    .ant-alert-description {
      color: ${props => props.theme.token.subtitleColor};
      font-weight: 500;
    }
    
    .ant-alert-icon {
      color: #D97C0B;
    }
  }
`;

const IconBubble = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: rgba(217, 124, 11, 0.15);
  margin-right: 8px;
`;

// Custom warning icon with the specified color inside a bubble
const CustomWarningIcon = () => (
  <IconBubble>
    <WarningOutlined style={{ color: '#D97C0B', fontSize: '16px' }} />
  </IconBubble>
);

const WarningNotification = () => {
  const { theme } = useTheme();
  const { language } = useLanguage();

  // Messages for different languages
  const messages = {
    es: {
      content: "Al enviar este formulario, declaro que toda la información proporcionada es verídica y los documentos adjuntos son auténticos."
    },
    en: {
      content: "By submitting this form, I declare that all the information provided is truthful and the attached documents are authentic."
    }
  };

  // Use Spanish as fallback if the language is not supported
  const currentMessages = messages[language] || messages.es;

  return (
    <StyledAlertContainer 
      theme={theme}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <StyledAlert
        theme={theme}
        description={currentMessages.content}
        type="warning"
        icon={<CustomWarningIcon />}
        showIcon
      />
    </StyledAlertContainer>
  );
};

export default WarningNotification;