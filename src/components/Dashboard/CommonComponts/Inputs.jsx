import React from 'react';
import { Input } from 'antd';
import styled from 'styled-components';
import { usePrimaryColor } from '../../../context/PrimaryColorContext';
import { useTheme } from '../../../context/ThemeContext';

const StyledInput = styled(Input)`
  background-color: transparent;
  color: ${props => props.$isDarkMode ? '#fff' : '#000'};
  border: 2px solid ${props => props.$isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)'};
  border-radius: 10px;
  padding: 0 16px;
  font-size: 14px;
  height: 44px !important; // Matched with buttons
  line-height: 44px !important;
  transition: all 0.3s ease;

  &::placeholder {
    color: ${props => props.$isDarkMode ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)'};
  }

  &:hover {
    border-color: ${props => props.$isDarkMode ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.4)'};
  }

  &:focus {
    border-color: ${props => props.$primaryColor};
    box-shadow: 0 0 5px ${props => props.$primaryColor}80;
    outline: none;
  }

  &:disabled {
    background-color: ${props => props.$isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
    color: ${props => props.$isDarkMode ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)'};
    cursor: not-allowed;
  }
`;

const Inputs = ({ placeholder, onChange, ...rest }) => {
  const { primaryColor } = usePrimaryColor();
  const { currentTheme } = useTheme();
  
  const isDarkMode = currentTheme === 'themeDark';

  return (
    <StyledInput 
      placeholder={placeholder} 
      onChange={onChange} 
      $primaryColor={primaryColor}
      $isDarkMode={isDarkMode}
      {...rest} 
    />
  );
};

export default Inputs;
