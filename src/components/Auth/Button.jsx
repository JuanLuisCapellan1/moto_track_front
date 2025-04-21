import React from 'react';
import styled from 'styled-components';
import { Button as AntButton } from 'antd';

const StyledButton = styled(AntButton)`
  background-color: #635BFF !important;;
  border-color: #635BFF !important;;
  color: white;
  border-radius: 6px;
  font-weight: 600;
  width: 100%;
  height: 48px;
  border-radius: 20px;
  
  ${props => props.size === 'small' && `
    padding: 4px 12px;
    font-size: 12px;
  `}
  
  ${props => props.size === 'medium' && `
    padding: 8px 16px;
    font-size: 14px;
  `}
  
  ${props => props.size === 'large' && `
    padding: 12px 20px;
    font-size: 20px;
  `}
  
  &:hover, &:focus {
    background-color: #5249d3 !important;
    border-color: #5249d3 !important;
    color: white;
  }
  
  &:active {
    background-color: #4a42c7 !important;;
    border-color: #4a42c7 !important;;
  }
`;

const Button = ({ children, size = 'medium', onClick, type = 'primary', htmlType = 'button', disabled = false }) => {
  return (
    <StyledButton 
      size={size}
      onClick={onClick}
      type={type}
      htmlType={htmlType}
      disabled={disabled}
    >
      {children}
    </StyledButton>
  );
};

export default Button;