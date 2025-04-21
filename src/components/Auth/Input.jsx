import React from 'react';
import styled from 'styled-components';
import { Input as AntInput } from 'antd';

const brandColor = '#635BFF';
const brandColorLight = 'rgba(99, 91, 255, 0.2)';
const brandColorHover = 'rgba(99, 91, 255, 0.8)';

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  width: 100%;
`;

const InputTitle = styled.label`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 10px;
  color: #333;
  transition: color 0.3s ease;
  
  ${InputContainer}:focus-within & {
    color: ${brandColor};
  }
`;

const StyledInput = styled(AntInput)`
  padding: 14px 16px;
  height: 56px;
  border-radius: 8px;
  border: 2px solid #d9d9d9;
  font-size: 16px;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: ${brandColor};
  }
  
  &:focus, &.ant-input-focused {
    border-color: ${brandColor};
    box-shadow: 0 0 0 3px ${brandColorLight};
  }
  
  &::placeholder {
    color: #aaa;
    opacity: 0.7;
  }
`;

const StyledPasswordInput = styled(AntInput.Password)`
  padding: 14px 16px;
  height: 56px;
  border-radius: 8px;
  border: 2px solid #d9d9d9;
  font-size: 16px;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: ${brandColor};
  }
  
  &:focus, &.ant-input-focused, &.ant-input-affix-wrapper-focused {
    border-color: ${brandColor};
    box-shadow: 0 0 0 3px ${brandColorLight};
  }
  
  .ant-input {
    height: 100%;
    font-size: 16px;
    
    &::placeholder {
      color: #aaa;
      opacity: 0.7;
    }
  }
  
  .ant-input-password-icon {
    color: ${brandColor};
    font-size: 18px;
    transition: color 0.3s ease;
    
    &:hover {
      color: ${brandColorHover};
    }
  }
  
  // Make sure the main input container styles apply properly to password component
  &.ant-input-affix-wrapper {
    padding: 0 12px 0 16px;
    
    .ant-input {
      padding-left: 0;
    }
    
    &:hover, &:focus {
      z-index: 1;
    }
  }
`;

// Option to show error states
const ErrorText = styled.div`
  color: #ff4d4f;
  font-size: 14px;
  margin-top: 5px;
`;

const Input = ({ 
  title, 
  placeholder, 
  type = "text", 
  value, 
  onChange, 
  name, 
  className,
  error = null 
}) => {
  return (
    <InputContainer className={className}>
      <InputTitle>{title}</InputTitle>
      {type === "password" ? (
        <StyledPasswordInput
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          name={name}
          status={error ? "error" : ""}
        />
      ) : (
        <StyledInput
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          name={name}
          status={error ? "error" : ""}
        />
      )}
      {error && <ErrorText>{error}</ErrorText>}
    </InputContainer>
  );
};

export default Input;