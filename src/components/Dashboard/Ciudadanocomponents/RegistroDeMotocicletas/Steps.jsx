import React from 'react';
import { Steps as AntSteps } from 'antd';
import styled from 'styled-components';
import { useTheme } from '../../../../context/ThemeContext';
import { usePrimaryColor } from '../../../../context/PrimaryColorContext';
import { useLanguage } from '../../../../context/LanguageContext';

// Determine text color based on background color contrast
const getContrastTextColor = (hexColor) => {
  // Remove '#' if present
  const hex = hexColor.replace('#', '');
  
  // Convert hex to RGB
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  
  // Calculate luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  
  // Return white for dark backgrounds, black for light backgrounds
  return luminance > 0.7 ? '#000000' : '#ffffff';
};

const StyledStepsContainer = styled.div`
  margin: 20px 0 40px;
  overflow-x: auto; /* Enable horizontal scrolling if needed */
  padding-bottom: 5px; /* Space for potential scrollbar */

  .ant-steps {
    display: flex;
    justify-content: space-between;
    min-width: min-content; /* Prevent steps from shrinking too much */
    width: 100%;
  }

  .ant-steps-item {
    flex: 1;
    min-width: 100px; /* Minimum width for each step item */
    padding: 0 5px;
  }

  .ant-steps-item-title {
    color: ${props => props.theme.token.titleColor} !important;
    font-weight: 500;
    padding: 0 5px;
    margin-top: 8px;
    white-space: nowrap; /* Prevent text wrapping */
    overflow: hidden;
    text-overflow: ellipsis; /* Add ellipsis if text overflows */
  }

  .ant-steps-item-description {
    color: ${props => props.theme.token.subtitleColor} !important;
  }

  .ant-steps-item-wait .ant-steps-item-icon {
    background-color: ${props => props.theme.token.contentBg};
    border-color: ${props => props.theme.token.subtitleColor}50;
    width: 36px;
    height: 36px;
    line-height: 36px;
    font-size: 18px;
  }

  .ant-steps-item-wait .ant-steps-item-icon > .ant-steps-icon {
    color: ${props => props.theme.token.subtitleColor};
    font-size: 18px;
    top: -1px;
    position: relative;
  }

  .ant-steps-item-process .ant-steps-item-icon {
    background-color: ${props => props.$primaryColor};
    border-color: ${props => props.$primaryColor};
    width: 36px;
    height: 36px;
    line-height: 36px;
    font-size: 18px;
  }

  .ant-steps-item-process .ant-steps-item-icon > .ant-steps-icon {
    color: ${props => getContrastTextColor(props.$primaryColor)};
    font-size: 18px;
    top: -1px;
    position: relative;
  }

  .ant-steps-item-finish .ant-steps-item-icon {
    border-color: ${props => props.$primaryColor};
    width: 36px;
    height: 36px;
    line-height: 36px;
    font-size: 18px;
  }

  .ant-steps-item-finish .ant-steps-item-icon > .ant-steps-icon {
    color: ${props => props.$primaryColor};
    font-size: 18px;
    top: -1px;
    position: relative;
  }

  .ant-steps-item-finish .ant-steps-item-tail::after {
    background-color: ${props => props.$primaryColor};
    height: 2px;
  }

  .ant-steps-item-tail {
    padding: 0 5px;
  }

  /* Responsive adjustments */
  @media (max-width: 768px) {
    .ant-steps-item-title {
      font-size: 12px;
    }
    
    .ant-steps-item-icon {
      margin: 0 auto;
      width: 30px !important;
      height: 30px !important;
      line-height: 30px !important;
      font-size: 14px !important;
    }
    
    .ant-steps-item-icon > .ant-steps-icon {
      font-size: 14px !important;
    }
    
    /* Keep items in a row rather than stacking */
    .ant-steps-horizontal:not(.ant-steps-label-vertical) .ant-steps-item {
      margin-right: 10px;
    }
  }
  
  /* For very small screens */
  @media (max-width: 480px) {
    .ant-steps-item {
      min-width: 70px;
    }
  }
`;

const Steps = ({ current = 0 }) => {
  const { theme } = useTheme();
  const { primaryColor } = usePrimaryColor();
  const { language } = useLanguage();

  const translations = {
    en: {
      personalData: 'Personal Data',
      motorcycleData: 'Motorcycle Data',
      documents: 'Documents',
      confirmation: 'Confirmation'
    },
    es: {
      personalData: 'Datos Personales',
      motorcycleData: 'Datos de Moto',
      documents: 'Documentos',
      confirmation: 'Confirmación'
    }
  };

  const texts = translations[language] || translations.es;

  const items = [
    {
      title: texts.personalData,
    },
    {
      title: texts.motorcycleData,
    },
    {
      title: texts.documents,
    },
    {
      title: texts.confirmation,
    },
  ];

  return (
    <StyledStepsContainer theme={theme} $primaryColor={primaryColor}>
      <AntSteps 
        current={current} 
        items={items} 
        labelPlacement="vertical"
        progressDot={false}
        responsive={true} 
        direction="horizontal"
      />
    </StyledStepsContainer>
  );
};

export default Steps;