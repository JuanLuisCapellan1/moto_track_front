import React from 'react';
import { Button } from 'antd';
import styled from 'styled-components';
import { usePrimaryColor } from '../../../context/PrimaryColorContext';

const StyledMainButton = styled(Button)`
  background-color: ${props => props.$primaryColor};
  color: ${props => props.$textColor};
  border: none;
  border-radius: 8px;
  font-weight: normal;
  padding: 6px 16px;
  font-size: 14px;
  height: auto;
  min-height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;

  .anticon {
    display: flex;
    align-items: center;
  }

  &:hover,
  &:focus {
    background-color: ${props => props.$primaryColorDarker};
    color: ${props => props.$textColor};
  }

  &:active {
    background-color: ${props => props.$primaryColorDarker2};
    color: ${props => props.$textColor};
  }

  &:focus-visible {
    outline: none;
  }
`;

const MainButton = ({ children, onClick, icon, ...rest }) => {
  const { primaryColor } = usePrimaryColor();
  
  // Create darker shades for hover and active states
  const rgbValues = primaryColor.replace('#', '').match(/.{2}/g)
    .map(hex => parseInt(hex, 16));
  
  const makeDarker = (amount) => rgbValues
    .map(val => Math.max(0, val - amount).toString(16).padStart(2, '0'))
    .join('');
  
  const primaryColorDarker = `#${makeDarker(25)}`;
  const primaryColorDarker2 = `#${makeDarker(45)}`;

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

  const textColor = getContrastTextColor(primaryColor);

  return (
    <StyledMainButton 
      onClick={onClick} 
      $primaryColor={primaryColor}
      $primaryColorDarker={primaryColorDarker}
      $primaryColorDarker2={primaryColorDarker2}
      $textColor={textColor}
      type="primary"
      icon={icon}
      {...rest}
    >
      {children}
    </StyledMainButton>
  );
};

export default MainButton;