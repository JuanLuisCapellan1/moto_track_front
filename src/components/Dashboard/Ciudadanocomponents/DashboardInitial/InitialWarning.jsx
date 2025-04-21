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
    
    .ant-alert-message {
      color: #D97C0B;
      font-weight: bold;
    }
    
    .ant-alert-description {
      color: ${props => props.theme.token.subtitleColor};
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

const InitialWarning = () => {
  const { theme } = useTheme();
  const { language } = useLanguage();

  // Messages for different languages
  const messages = {
    es: {
      title: "Información Importante",
      content: "Recuerde que debe renovar su registro anualmente. Mantenga sus documentos al día."
    },
    en: {
      title: "Important Information",
      content: "Remember that you must renew your registration annually. Keep your documents up to date."
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
        message={currentMessages.title}
        description={currentMessages.content}
        type="warning"
        icon={<CustomWarningIcon />}
        showIcon
      />
    </StyledAlertContainer>
  );
};

export default InitialWarning;