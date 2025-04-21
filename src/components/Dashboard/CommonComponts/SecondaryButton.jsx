import React from 'react';
import { Button } from 'antd';
import styled from 'styled-components';
import { usePrimaryColor } from '../../../context/PrimaryColorContext';
import { useTheme } from '../../../context/ThemeContext';

const StyledSecondaryButton = styled(Button)`
  background-color: transparent;
  border-radius: 8px;
  font-weight: normal;
  padding: 6px 16px;
  display: flex;
  padding: 6px 16px;
  font-size: 14px;
  height: auto;
  min-height: 32px;
  align-items: center;
  justify-content: center;
  
  .anticon {
    display: flex;
    align-items: center;
  }

  &:hover,
  &:focus {
    color: ${props => props.$primaryColor};
    border-color: ${props => props.$primaryColor};
  }

  &:active {
    color: ${props => props.$primaryColorDarker};
    border-color: ${props => props.$primaryColorDarker};
  }

  &:focus-visible {
    outline: none;
  }
`;

const SecondaryButton = ({ children, onClick, icon, ...rest }) => {
  const { primaryColor } = usePrimaryColor();
  const { currentTheme } = useTheme();
  
  // Create a slightly darker shade for active state
  const primaryColorDarker = primaryColor.replace('#', '').match(/.{2}/g)
    .map(hex => Math.max(0, parseInt(hex, 16) - 25).toString(16).padStart(2, '0'))
    .join('');

  const isDarkMode = currentTheme === 'themeDark';

  return (
    <StyledSecondaryButton 
      onClick={onClick} 
      $primaryColor={primaryColor}
      $primaryColorDarker={`#${primaryColorDarker}`}
      $isDarkMode={isDarkMode}
      icon={icon}
      {...rest}
    >
      {children}
    </StyledSecondaryButton>
  );
};

export default SecondaryButton;
