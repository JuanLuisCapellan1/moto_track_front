import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Importa useNavigate
import styled, { createGlobalStyle } from 'styled-components';
import { Typography, Checkbox, Spin, notification } from 'antd'; // Importa notification
import { motion } from 'framer-motion';
import SideImage from '../../components/Auth/SideImage';
import Input from '../../components/Auth/Input';
import Button from '../../components/Auth/Button';
import MotoTrackLogo from '../../assets/Lading/MotoTrackLogo-2.png';
import axios from 'axios';

const { Title, Text, Paragraph } = Typography;

// Animation variants
const pageVariants = {
  initial: {
    opacity: 0,
    scale: 0.98
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3, // Más rápido (antes 0.6)
      when: "beforeChildren",
      staggerChildren: 0.06, // Más rápido (antes 0.15)
    },
  },
  exit: { 
    opacity: 0,
    scale: 0.96,
    transition: { duration: 0.2 }
  }
};

const itemVariants = {
  initial: { y: 15, opacity: 0 }, // Menor distancia (antes 30)
  animate: { 
    y: 0, 
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 180, // Más rápido (antes 100)
      damping: 6, // Más rebote (antes 10)
      mass: 0.5 // Masa más ligera = movimiento más rápido
    }
  },
};

const sideImageVariants = {
  initial: { x: -50, opacity: 0 }, // Menor distancia (antes -100)
  animate: { 
    x: 0, 
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 120, // Más rápido (antes 50)
      damping: 12, // Más control (antes 20)
      duration: 0.5, // Más rápido (antes 0.8)
      mass: 0.8 // Añadido para control
    }
  },
};

// Añadir animaciones especiales para inputs y botón
const inputRowVariants = {
  initial: { opacity: 0, x: -5 },
  animate: { 
    opacity: 1, 
    x: 0,
    transition: { 
      type: "spring",
      stiffness: 150,
      damping: 8
    }
  }
};



const logoVariants = {
  initial: { scale: 0.7, opacity: 0, rotate: -5 },
  animate: { 
    scale: 1, 
    opacity: 1,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 150,
      damping: 6,
      delay: 0.05
    }
  }
};

// Wrap components with motion
const PageContainer = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 100vh;
  width: 100%;
  overflow: hidden;
  position: relative;
  
  @media (max-width: 840px) {
    grid-template-columns: 1fr;
  }
`;

const SideImageContainer = styled(motion.div)`
  height: 100vh;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  
  @media (max-width: 840px) {
    display: none;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 0px 40px 40px 0;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  }
`;

const FormContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  padding: clamp(10px, 2vw, 20px);
  height: 100vh;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  justify-content: center;

  @media (max-width: 840px) {
    padding: clamp(8px, 1.5vw, 15px);
  }
`;

const LogoContainer = styled(motion.div)`
  text-align: center;
  margin-bottom: clamp(10px, 2vw, 20px);
  width: 100%;
`;

const Logo = styled(motion.img)`
  height: clamp(50px, 8vw, 80px);
  margin-bottom: clamp(5px, 1vw, 10px);
`;

const StyledTitle = styled(motion(Title))`
  font-size: clamp(1.5rem, 2.5vw, 2rem) !important;
  line-height: 1.2 !important;
  margin-bottom: clamp(8px, 1.5vw, 15px) !important;
`;

const BrandSpan = styled.span`
  color: #635BFF;
  font-weight: 700;
  display: inline-block;
`;

const RegisterForm = styled(motion.form)`
  width: 100%;
  max-width: 450px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: clamp(8px, 1.5vw, 15px);
`;

const InputRow = styled(motion.div)`
  display: flex;
  gap: clamp(10px, 2vw, 20px);
  width: 100%;
  
  @media (max-width: 840px) {
    flex-direction: column;
    gap: clamp(8px, 1.5vw, 15px);
  }
`;

const StyledParagraph = styled(Paragraph)`
  margin-top: clamp(8px, 1.5vw, 15px) !important;
  font-size: clamp(13px, 1.2vw, 15px) !important;
  text-align: center;
  width: 100%;
  
  @media (max-width: 768px) {
    font-size: 16px !important;
    margin-top: 15px !important;
  }
`;

const StyledLink = styled(Link)`
  color: #635BFF !important;
  text-decoration: none;
  font-weight: 600;
  font-size: 18px;
  
  &:hover {
    text-decoration: underline;
  }
  
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const ErrorMessage = styled(Text)`
  font-size: clamp(10px, 1.1vw, 12px) !important;
  margin-top: clamp(2px, 0.4vw, 3px);
  color: #ff4d4f !important;
  width: 100%;
  
  @media (max-width: 840px) {
    font-size: clamp(10px, 1.2vw, 12px) !important;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 10px;
`;

const FullWidthButton = styled(Button)`
  width: 100% !important;
  padding: clamp(8px, 1.5vw, 12px) !important;
  font-size: clamp(13px, 1.2vw, 15px) !important;
  height: auto !important;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(99, 91, 255, 0.2);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 8px rgba(99, 91, 255, 0.3);
  }
  
  @media (max-width: 840px) {
    padding: clamp(8px, 1.5vw, 12px) clamp(15px, 3vw, 20px) !important;
  }
`;

const LargerInput = styled(Input)`
  .ant-input, .ant-input-password {
    height: clamp(35px, 4vw, 45px);
    font-size: clamp(13px, 1.2vw, 15px);
  }
  
  .ant-input-affix-wrapper {
    height: clamp(35px, 4vw, 45px);
  }
  
  label {
    font-size: clamp(13px, 1.2vw, 15px);
    margin-bottom: clamp(2px, 0.5vw, 4px);
  }
`;

const InputGroup = styled.div`
  width: 100%;
  margin-bottom: clamp(8px, 1.5vw, 12px);
  
  &:last-child {
    margin-bottom: 0;
  }
  
  @media (max-width: 768px) {
    margin-bottom: 18px;
  }
`;

const CheckboxContainer = styled.div`
  width: 100%;
  margin: clamp(3px, 0.8vw, 6px) 0;
  
  .ant-checkbox + span {
    font-size: clamp(11px, 1.2vw, 14px);
    padding-left: clamp(6px, 1vw, 8px);
  }

  @media (max-width: 840px) {
    margin: clamp(3px, 0.8vw, 8px) 0;
  }
`;

const StyledCheckbox = styled(Checkbox)`
  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: #635BFF;
    border-color: #635BFF;
  }
  
  .ant-checkbox-wrapper:hover .ant-checkbox-inner,
  .ant-checkbox:hover .ant-checkbox-inner,
  .ant-checkbox-input:focus + .ant-checkbox-inner {
    border-color: #635BFF;
    background-color: rgba(99, 91, 255, 0.1); /* Fondo púrpura con baja opacidad en hover */
  }
  
  /* Efecto hover para checkbox ya marcado */
  .ant-checkbox-checked:hover .ant-checkbox-inner {
    background-color: rgba(99, 91, 255, 0.8); /* Púrpura más translúcido cuando ya está marcado */
    border-color: #635BFF;
  }
  
  .ant-checkbox-checked::after {
    border-color: #635BFF;
  }
  
  /* Efecto hover para el texto */
  &:hover {
    span:last-child {
      color: #635BFF;
    }
  }
  
  span {
    font-size: 16px;
    transition: color 0.3s ease;
    
    @media (max-width: 768px) {
      font-size: 14px;
    }
  }
`;

// Add this new component for mobile-only back button
const MobileHeader = styled.div`
  display: none;
  
  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    margin-bottom: 20px;
  }
`;

const BackButton = styled.button`
  background: none;
  border: none;
  color: #635BFF;
  font-size: 16px;
  font-weight: 600;
  display: flex;
  align-items: center;
  cursor: pointer;
  
  &:before {
    content: "←";
    margin-right: 8px;
    font-size: 18px;
  }
`;

// Modified to allow scrolling
const GlobalStyles = createGlobalStyle`
  body, html {
    overflow: auto;
  }
`;

function Register() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false); // Estado para el spinner
  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate(); // Hook para redirigir

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { 
      firstName: '', 
      lastName: '', 
      email: '', 
      password: '', 
      confirmPassword: '',
      agreeToTerms: ''
    };
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'El nombre es requerido';
      valid = false;
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'El apellido es requerido';
      valid = false;
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'El email no es válido';
      valid = false;
    }
    
    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
      valid = false;
    } else if (formData.password.length < 8) {
      newErrors.password = 'La contraseña debe tener al menos 8 caracteres';
      valid = false;
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(formData.password)) {
      newErrors.password = 'La contraseña debe tener al menos una mayúscula, una minúscula y un número';
      valid = false;
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirmar la contraseña es requerido';
      valid = false;
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
      valid = false;
    }
    
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'Debes aceptar los términos y condiciones';
      valid = false;
    }
    
    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true); // Mostrar spinner
            try {
        const response = await axios.post(`${apiUrl}/api/register`, {
          nombres: formData.firstName,
          apellidos: formData.lastName,
          correo: formData.email,
          contrasena: formData.password,
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        
        // Mostrar notificación de éxito
        notification.success({
          message: 'Registro exitoso',
          description: 'El usuario se ha creado exitosamente.',
        });

        // Redirigir al login
        navigate('/login');
      } catch (error) {
        console.error('Error during registration:', error);
        setErrors(prevErrors => ({
          ...prevErrors,
          email: error?.response?.data?.message || 'Error al registrar, intenta de nuevo.'
        }));
      } finally {
        setIsSubmitting(false); // Ocultar spinner
      }
    }
  };

  const navigateToHome = () => {
    window.location.href = '/';
  };

  return (
    <Spin spinning={isSubmitting} tip="Cargando"> {/* Spinner envuelve todo el contenido */}
      <PageContainer
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <GlobalStyles />
        
        <SideImageContainer
          variants={sideImageVariants}
        >
          <SideImage type="register" />
        </SideImageContainer>
        
        <FormContainer
          variants={itemVariants}
        >
          <MobileHeader>
            <BackButton onClick={navigateToHome}>Inicio</BackButton>
          </MobileHeader>
          
          <LogoContainer>
            <Logo 
              src={MotoTrackLogo} 
              alt="MotoTrack Logo" 
              variants={logoVariants}
              initial="initial"
              animate="animate"
            />
            <StyledTitle 
              level={1}
              variants={itemVariants}
            >
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: 1,
                  transition: { delay: 0.15, duration: 0.2 } 
                }}
              >
                Crear Cuenta
              </motion.span>
            </StyledTitle>
          </LogoContainer>
          
          <RegisterForm 
            onSubmit={handleSubmit}
            variants={itemVariants}
          >
            {/* Form inputs */}
            <motion.div variants={itemVariants} style={{ width: '100%' }}>
              <InputGroup>
                <InputRow variants={inputRowVariants}>
                  <motion.div style={{ flex: 1 }} variants={inputRowVariants}>
                    <LargerInput 
                      title="Nombre"
                      placeholder="Ilia"
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                    />
                    {errors.firstName && <ErrorMessage type="danger">{errors.firstName}</ErrorMessage>}
                  </motion.div>
                  
                  <motion.div style={{ flex: 1 }} variants={inputRowVariants}>
                    <LargerInput 
                      title="Apellido"
                      placeholder="Topuria"
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                    />
                    {errors.lastName && <ErrorMessage type="danger">{errors.lastName}</ErrorMessage>}
                  </motion.div>
                </InputRow>
              </InputGroup>
            </motion.div>
            
            <motion.div variants={itemVariants} style={{ width: '100%' }}>
              <InputGroup>
                <LargerInput 
                  title="Email"
                  placeholder="IliaOwnsVolk@gmail.com"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <ErrorMessage type="danger">{errors.email}</ErrorMessage>}
              </InputGroup>
            </motion.div>
            
            <motion.div variants={itemVariants} style={{ width: '100%' }}>
              <InputGroup>
                <InputRow>
                  <div style={{ flex: 1 }}>
                    <LargerInput 
                      title="Contraseña"
                      placeholder="********"
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                    {errors.password && <ErrorMessage type="danger">{errors.password}</ErrorMessage>}
                  </div>
                  
                  <div style={{ flex: 1 }}>
                    <LargerInput 
                      title="Confirmar Contraseña"
                      placeholder="********"
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                    />
                    {errors.confirmPassword && <ErrorMessage type="danger">{errors.confirmPassword}</ErrorMessage>}
                  </div>
                </InputRow>
              </InputGroup>
            </motion.div>
            
            <motion.div variants={itemVariants} style={{ width: '100%' }}>
              <CheckboxContainer>
                <StyledCheckbox 
                  name="agreeToTerms" 
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                >
                  Acepto los Términos y Condiciones
                </StyledCheckbox>
              </CheckboxContainer>
              {errors.agreeToTerms && <ErrorMessage type="danger">{errors.agreeToTerms}</ErrorMessage>}
            </motion.div>
            
            <motion.div 
              style={{ width: '100%' }}
              whileHover="hover"
              whileTap="tap"
            >
              <ButtonContainer>
                <FullWidthButton 
                  size="large" 
                  htmlType="submit" 
                  disabled={isSubmitting} // Deshabilitar botón mientras se envía
                >
                  Registrarse
                </FullWidthButton>
              </ButtonContainer>
            </motion.div>
            
            <motion.div 
              variants={itemVariants}
              initial={{ opacity: 0, y: 10 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                transition: { 
                  delay: 0.25, 
                  duration: 0.2 
                }
              }}
            >
              <StyledParagraph>
                ¿Ya tienes una cuenta? <StyledLink to="/login">Inicia sesión</StyledLink>
              </StyledParagraph>
            </motion.div>
          </RegisterForm>
        </FormContainer>
      </PageContainer>
    </Spin>
  );
}

export default Register;