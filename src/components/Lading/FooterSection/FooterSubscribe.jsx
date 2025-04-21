import React, { useState } from 'react';
import styled from 'styled-components';
import { Typography, Input, Button, Form, message } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import { motion, AnimatePresence } from 'framer-motion';

// Import the Vector SVG
import VectorIcon from '../../../assets/Lading/Footer/Vector.svg';

// Importa tu imagen de fondo si lo deseas
// import VectorImage from '../../../assets/Lading/Footer/Vector.svg';

const { Title, Paragraph } = Typography;

const SubscribeSection = styled.div`
  text-align: left;
  color: #fff;
  padding: 0; /* Removed padding to align with other sections */
  position: relative;
  overflow: hidden;
  width: 100%;
  
  /* Expanded container size */
  @media (min-width: 992px) {
    padding-right: 1rem;
    max-width: 100%;
  }
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
`;

const StyledTitle = styled(Title)`
  color: #fff !important;
  font-size: 1.75rem !important;
  margin-bottom: 1.5rem !important;
  font-weight: 700 !important;
  height: 40px; /* Fixed height for alignment */
  display: flex;
  align-items: center;
  margin-top: 0 !important;
`;

const StyledParagraph = styled(Paragraph)`
  color: rgba(255, 255, 255, 0.8) !important;
  font-size: 1rem !important;
  line-height: 1.8 !important;
  margin-bottom: 2rem !important;
  max-width: 90%;
`;

const SubscribeForm = styled(Form)`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;

  border-radius: 25px;
  padding: 4px;
  width: 100%;
`;

const InputWrapper = styled.div`
  display: flex;
  width: 100%;
  border-radius: 25px;
  overflow: hidden;
  background: #1e1e1e;
  padding: 4px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  position: relative;
  transition: all 0.3s ease;

  @media (min-width: 576px) { width: 100%; }
  @media (min-width: 768px) { width: 100%; }
  @media (min-width: 992px) { width: 100%; }
  @media (min-width: 1200px) { width: 100%; }
  
  &:focus-within {
    border-color: rgba(108, 99, 255, 0.5);
    box-shadow: 0 0 10px rgba(108, 99, 255, 0.3);
    transform: translateY(-2px);
  }
`;

const StyledInput = styled(Input)`
  background-color: transparent !important;
  border: none;
  border-radius: 25px;
  color: #fff !important;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: start;
  width: 100%;
  font-size: 0.95rem;
  transition: all 0.3s ease-in-out;
  padding-right: 55px;
  padding-left: 15px;

  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
    font-size: 12px;
    transition: all 0.2s ease;
  }

  &:focus::placeholder {
    opacity: 0.8;
    transform: translateX(3px);
  }

  &:focus,
  &:hover {
    background-color: transparent !important;
    box-shadow: none !important;
    border-color: transparent !important;
    color: #fff !important;
  }

  /* Removing the hover effect that changes width/height */
  &.ant-input {
    color: #fff !important;
    background-color: transparent !important;
  }

  /* Ensure Ant Design doesn't override our styles */
  &.ant-input:focus, 
  &.ant-input-focused {
    background-color: transparent !important;
    color: #fff !important;
    box-shadow: none !important;
    border-color: transparent !important;
  }
`;

const ButtonContainer = styled.div`
  position: absolute;
  right: 4px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
`;

const SubscribeButton = styled(motion.button)`
  width: 50px;
  height: 30px;
  border-radius: 18px;
  background-color: #6c63ff;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0;
  overflow: hidden;
  outline: none;
  transition: all 0.3s ease;

  &:hover {
    background-color: #5a52d5;
    box-shadow: 0 0 15px rgba(108, 99, 255, 0.5);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }
  
  @media (max-width: 576px) {
    width: 45px;
    height: 28px;
  }
`;

// Replace the SubmitArrow component with this:
const SubmitArrow = () => (
  <img src={VectorIcon} alt="Submit" width="16" height="16" style={{ filter: 'brightness(0) invert(1)' }} />
);

// Keep the other icon components as they are
const SuccessArrow = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 6L9 17L4 12" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const SpinnerIcon = styled(motion.div)`
  width: 16px;
  height: 16px;
  border: 2px solid #fff;
  border-top: 2px solid transparent;
  border-radius: 50%;
`;

const SuccessMessage = styled(motion.div)`
  color: #52c41a;
  font-size: 0.95rem;
  margin-top: 12px;
  font-weight: 500;
`;

const FooterSubscribe = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (values) => {
    setLoading(true);
    setSuccess(false);

    try {
      // Simulamos un llamado a la API
      await new Promise(resolve => setTimeout(resolve, 800));

      console.log('Subscribed with email:', values.email);
      setSuccess(true);
      form.resetFields();
      message.success('¡Suscripción exitosa!');

      // Ocultamos el mensaje de éxito luego de 5 segundos
      setTimeout(() => setSuccess(false), 5000);
    } catch (error) {
      message.error('Error al procesar la suscripción');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SubscribeSection>
      {/* Descomenta si usas el fondo vectorial 
        <VectorBackground />
      */}
      <ContentWrapper>
        <StyledTitle level={3}>Boletín Informativo</StyledTitle>
        <StyledParagraph>
          Suscríbase para recibir actualizaciones y noticias importantes sobre el sistema MotoTrack.
        </StyledParagraph>

        <SubscribeForm form={form} onFinish={handleSubmit}>
          <motion.div
            initial={{ opacity: 0, y: 10 }} // Reduced from y: 20
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }} // Reduced from 0.5
          >
            <InputWrapper>
              <Form.Item
                name="email"
                noStyle
                rules={[
                  { required: true, message: 'Por favor ingrese su correo' },
                  { type: 'email', message: 'Ingrese un correo válido' }
                ]}
              >
                <StyledInput 
                  placeholder="Ingrese Correo Electrónico" 
                  disabled={loading}
                  autoComplete="email" 
                />
              </Form.Item>

              <ButtonContainer>
                <SubscribeButton
                  type="submit"
                  disabled={loading}
                  whileTap={{ scale: 0.95 }} // Changed from 0.9 for subtler effect
                  whileHover={{ scale: 1.03 }} // Changed from 1.05 for subtler effect
                  onClick={() => {
                    if (!loading && form.getFieldValue('email')) {
                      form.submit();
                    }
                  }}
                >
                  <AnimatePresence mode="wait">
                    {loading ? (
                      <SpinnerIcon
                        key="spinner"
                        animate={{ 
                          rotate: 360,
                          scale: [1, 0.9, 1] // Changed from [1, 0.8, 1] for subtler effect
                        }}
                        transition={{
                          rotate: {
                            duration: 0.8, // Reduced from 1
                            repeat: Infinity,
                            ease: "linear"
                          },
                          scale: {
                            duration: 0.8, // Reduced from 1
                            repeat: Infinity,
                            ease: "easeInOut"
                          }
                        }}
                      />
                    ) : success ? (
                      <motion.div
                        key="success"
                        initial={{ scale: 0, rotate: -90 }} // Changed from -180 for subtler rotation
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0, rotate: 90 }} // Changed from 180 for subtler rotation
                        transition={{
                          type: "spring",
                          stiffness: 300, // Increased from 200 for faster spring
                          damping: 20 // Increased from 15 for faster stabilization
                        }}
                      >
                        <SuccessArrow />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="arrow"
                        initial={{ scale: 0, rotate: -90 }} // Changed from -180 for subtler rotation
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0, rotate: 90 }} // Changed from 180 for subtler rotation
                        transition={{
                          type: "spring",
                          stiffness: 300, // Increased from 200 for faster spring
                          damping: 20 // Increased from 15 for faster stabilization
                        }}
                      >
                        <SubmitArrow />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </SubscribeButton>
              </ButtonContainer>
            </InputWrapper>
          </motion.div>

          <AnimatePresence>
            {success && (
              <SuccessMessage
                initial={{ opacity: 0, y: -5 }} // Reduced from y: -10 for subtler movement
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }} // Reduced from y: -10 for subtler movement
                transition={{ duration: 0.2 }} // Added fast duration
              >
                ¡Gracias por suscribirse a nuestro boletín!
              </SuccessMessage>
            )}
          </AnimatePresence>
        </SubscribeForm>
      </ContentWrapper>
    </SubscribeSection>
  );
};

export default FooterSubscribe;
