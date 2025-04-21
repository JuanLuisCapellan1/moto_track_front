import React, { useState, useEffect } from 'react';
import Modal from '../../../CommonComponts/Modals';
import Inputs from '../../../CommonComponts/Inputs';
import MainButton from '../../../CommonComponts/MainButton';
import SecondaryButton from '../../../CommonComponts/SecondaryButton';
import { useNotification } from '../../../CommonComponts/ToastNotifications';
import styled from 'styled-components';
import { Typography, Form, Spin } from 'antd';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { useTheme } from '../../../../../context/ThemeContext';
import { useLanguage } from '../../../../../context/LanguageContext';
import { passwordChangeTranslations } from '../../../../../utils/Modals/CambiarContraseñas';
import { useAuth } from '../../../../../context/AuthContext';
import axios from 'axios';

const { Title } = Typography;

const ModalContent = styled.div`
  padding: 10px 5px;
  background-color: ${({ theme }) => theme.token.contentBg};
  
  @media (max-width: 480px) {
    padding: 5px 0;
  }
`;

const ModalTitle = styled(Title)`
  text-align: center;
  margin-bottom: 25px !important;
  color: ${({ theme }) => theme.token.titleColor} !important;
  
  @media (max-width: 480px) {
    font-size: 20px !important;
    margin-bottom: 20px !important;
  }
`;

const FormContainer = styled(Form)`
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
`;

const FormItem = styled(Form.Item)`
  margin-bottom: 20px;
  
  @media (max-width: 480px) {
    margin-bottom: 15px;
  }
  
  label {
    font-weight: 500;
    margin-bottom: 5px;
    display: block;
    color: ${props => props.theme?.token?.subtitleBlack || '#333'};
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
  
  @media (max-width: 480px) {
    margin-top: 20px;
    flex-direction: column-reverse;
    gap: 12px;
    
    button {
      width: 100%;
    }
  }
`;

const InputGroup = styled.div`
  position: relative;
`;

const ToggleButton = styled.button`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: #999;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    color: ${props => props.theme?.token?.colorPrimary || '#635BFF'};
  }
`;

const CambiarMiContraseña = ({ show, onClose }) => {
  const [form] = Form.useForm();
  const { theme } = useTheme();
  const { language } = useLanguage();
  const { fetchUser, getAccessToken } = useAuth();
  const notification = useNotification();
  const translations = passwordChangeTranslations[language];
  const [isSubmitting, setIsSubmitting] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;

  // Password visibility states
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Reset form when modal opens or closes
  useEffect(() => {
    if (show) {
      form.resetFields();
    }
  }, [show, form]);
  
  const handleFinish = async (values) => {
    // Check if passwords match
    if (values.newPassword !== values.confirmPassword) {
      notification.error(
        translations.validation.error, 
        translations.validation.passwordsDoNotMatch
      );
      return;
    }
    
    setIsSubmitting(true);
    try {
      const response = await axios.put(
        `${apiUrl}/api/changePassword`,
        {
          currentPassword: values.currentPassword,
          newPassword: values.newPassword,
          confirmPassword: values.confirmPassword,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getAccessToken()}`,
          },
        }
      );

      if (response?.data?.success === false) {
        throw new Error(translations.error.description || 'Error al actualizar la contraseña');
      }
    
      notification.success(
        translations.success.title,
        translations.success.description || translations.success.description
      );

      await fetchUser(); // Refresh user data
      onClose();
    } catch (error) {
      console.log(error?.response?.data.message || error.message);
      notification.error(
        translations.error.title || 'Error',
        error?.response?.data?.message || error.message || translations.error.description
      );
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleCancel = () => {
    // Check if form has been modified before closing
    const formValues = form.getFieldsValue();
    const isModified = formValues.currentPassword || 
                       formValues.newPassword || 
                       formValues.confirmPassword;
      
    if (isModified) {
      if (window.confirm(translations.confirmCancel)) {
        onClose();
      }
    } else {
      onClose();
    }
  };
  
  const togglePasswordVisibility = (field) => {
    switch(field) {
      case 'current':
        setShowCurrentPassword(!showCurrentPassword);
        break;
      case 'new':
        setShowNewPassword(!showNewPassword);
        break;
      case 'confirm':
        setShowConfirmPassword(!showConfirmPassword);
        break;
      default:
        break;
    }
  };
  
  return (
    <Modal 
      show={show} 
      onClose={handleCancel} 
      width="450px" 
      height="auto"
      mobileHeight="auto"
    >
      <Spin spinning={isSubmitting}>
        <ModalContent theme={theme}>
          <ModalTitle level={3} theme={theme}>{translations.title}</ModalTitle>
          
          <FormContainer
            form={form}
            layout="vertical"
            onFinish={handleFinish}
            autoComplete="off"
          >
            <FormItem
              name="currentPassword"
              label={translations.currentPassword}
              required={false}
              rules={[
                { required: true, message: translations.validation.currentPasswordRequired }
              ]}
              theme={theme}
            >
              <InputGroup>
                <Inputs 
                  placeholder={translations.placeholders.currentPassword}
                  type={showCurrentPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                />
                <ToggleButton 
                  type="button" 
                  onClick={() => togglePasswordVisibility('current')}
                  aria-label={showCurrentPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                  theme={theme}
                >
                  {showCurrentPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                </ToggleButton>
              </InputGroup>
            </FormItem>
            
            <FormItem
              name="newPassword"
              label={translations.newPassword}
              required={false}
              rules={[
                { required: true, message: translations.validation.newPasswordRequired },
                { min: 8, message: translations.validation.minLength },
                { pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, message: translations.validation.passwordComplexity },	
              ]}
              theme={theme}
            >
              <InputGroup>
                <Inputs 
                  placeholder={translations.placeholders.newPassword}
                  type={showNewPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                />
                <ToggleButton 
                  type="button" 
                  onClick={() => togglePasswordVisibility('new')}
                  aria-label={showNewPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                  theme={theme}
                >
                  {showNewPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                </ToggleButton>
              </InputGroup>
            </FormItem>
            
            <FormItem
              name="confirmPassword"
              label={translations.confirmPassword}
              required={false}
              dependencies={['newPassword']}
              rules={[
                { required: true, message: translations.validation.confirmPasswordRequired },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('newPassword') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error(translations.validation.passwordsDoNotMatch));
                  },
                }),
              ]}
              theme={theme}
            >
              <InputGroup>
                <Inputs 
                  placeholder={translations.placeholders.confirmPassword}
                  type={showConfirmPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                />
                <ToggleButton 
                  type="button" 
                  onClick={() => togglePasswordVisibility('confirm')}
                  aria-label={showConfirmPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                  theme={theme}
                >
                  {showConfirmPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                </ToggleButton>
              </InputGroup>
            </FormItem>
            
            <ButtonContainer>
              <SecondaryButton 
                onClick={handleCancel}
                theme={theme}
              >
                {translations.cancelButton || 'Cancelar'}
              </SecondaryButton>
              <MainButton 
                type="submit" 
                htmlType="submit" 
                loading={isSubmitting}
              >
                {translations.saveButton}
              </MainButton>
            </ButtonContainer>
          </FormContainer>
        </ModalContent>
      </Spin>
    </Modal>
  );
};

export default CambiarMiContraseña;