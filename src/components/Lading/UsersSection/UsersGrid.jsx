import React from 'react';
import styled from 'styled-components';
import { Row, Col } from 'antd';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import LandingButtonPrimary from '../CommonComponents/LandingButtonPrimary';

// Import images
import UserAdminImage from '../../../assets/Lading/Users/UserAdmin.png';
import UserCiudadanoImage from '../../../assets/Lading/Users/UserCiudadano.png';
import UserEmpleadoImage from '../../../assets/Lading/Users/UserEmpleado.png';
import checkAnimation from '../../../assets/Lading/Users/Success-3.json';

// Styled components
const GridContainer = styled(motion.div)`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: transparent;
`;

const StyledRow = styled(motion(Row))`
  min-height: 500px;
  align-items: center;
  justify-content: center;
`;

const Section = styled(motion.div)`
  background: transparent;
  padding: 1.5rem;
  color: white;
  animation: fadeIn 0.3s ease;
  display: flex;
  justify-content: center;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 100%;
  margin-top: 10px;
`;

// Animation variants - optimized for faster appearance
const contentVariants = {
  hidden: { 
    opacity: 0,
    x: -10 // Reduced from -20 for subtler movement
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3, // Reduced from 0.5
      ease: "easeInOut", // Changed for snappier animation
      when: "beforeChildren",
      staggerChildren: 0.05 // Reduced from default
    }
  }
};

const imageVariants = {
  hidden: { 
    opacity: 0,
    x: 10, // Reduced from 20
    scale: 0.98 // Less dramatic scale change from 0.95
  },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.4, // Reduced from 0.6
      ease: "easeInOut" // Changed for snappier animation
    }
  }
};

const featureItemVariants = {
  hidden: { opacity: 0, x: -5 }, // Reduced from -10
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.2, ease: "easeInOut" } // Reduced from 0.3
  }
};

// Update SectionImage to use motion
const SectionImage = styled(motion.img)`
  width: 90%;
  height: auto;
  max-height: 520px;
  object-fit: cover;
  border-radius: 12px;
  margin: 0 auto;
  display: block;
  transform: translateX(0);
  position: relative;
  
  @media (min-width: 992px) {
    transform: translateX(5%);
  }
  
  @media (max-width: 768px) {
    width: 100%;
    max-height: 400px;
    margin: 2rem auto 0;
  }
  
  padding: 4px;
  background: linear-gradient(90deg, #6366f1 0%, #15E6E2 50%, #6366f1 100%);
  background-size: 200% auto;
  animation: shimmer 2s linear infinite;
  
  @keyframes shimmer {
    0% {
      background-position: 0% center;
    }
    100% {
      background-position: 200% center;
    }
  }
`;

const Title = styled.h2`
  font-size: 2.8rem;
  margin: 0;
  font-weight: bold;
  color: #6366f1;
  margin-bottom: 1rem;
  text-align: left;
  
  @media (max-width: 768px) {
    font-size: 2.4rem;
  }
`;

const Description = styled.p`
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
  font-size: 1.2rem;
  margin-bottom: 2rem;
  text-align: left;
  line-height: 1.5;
  font-weight: 300;
  letter-spacing: 0.02rem;
  max-width: 90%;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    max-width: 100%;
  }
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 2rem 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  align-items: start;
`;

// Update FeatureItem to use motion
const FeatureItem = styled(motion.li)`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-size: 1.2rem;
  color: #d4d4d8;
  text-align: left;
  width: 100%;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    gap: 0.6rem;
  }
`;

const CheckAnimation = styled(Lottie)`
  width: 24px;
  height: 24px;
  min-width: 24px;
  
  @media (max-width: 768px) {
    width: 20px;
    height: 20px;
    min-width: 20px;
  }
`;

const ButtonContainer = styled.div`
  margin-top: 1rem;
  width: 100%;
  display: flex;
  justify-content: start;
  
  @media (max-width: 768px) {
  }
`;

const StyledButton = styled(LandingButtonPrimary)`
  padding: 0.8rem 1.8rem;
  font-size: 1.1rem;
  background-color: #6366f1;
  border-radius: 25px;
  color: white;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #4f46e5;
  }
`;

const UsersGrid = ({ selectedCard }) => {
  const sections = [
    {
      id: 1,
      title: "Para Ciudadanos",
      description: "Propietarios que necesitan registrar sus vehículos y mantener actualizada su información vehicular.",
      features: [
        "Registro sencillo de motocicletas",
        "Consulta del estado de tu registro",
        "Descarga de carné digital",
        "Notificaciones en tiempo real"
      ],
      buttonText: "Registrar Motocicleta",
      image: UserCiudadanoImage
    },
    {
      id: 2,
      title: "Para Empleados",
      description: "Personal que gestiona los registros y trámites, procesando solicitudes y verificando documentación.",
      features: [
        "Panel de gestión de solicitudes",
        "Validación de documentos",
        "Generación de reportes",
        "Comunicación con ciudadanos"
      ],
      buttonText: "Acceder al Panel",
      image: UserEmpleadoImage
    },
    {
      id: 3,
      title: "Para Administradores",
      description: "Controlan accesos, permisos y configuración del sistema para garantizar su correcto funcionamiento.",
      features: [
        "Gestión de usuarios",
        "Configuración del sistema",
        "Análisis estadístico",
        "Auditoría de operaciones"
      ],
      buttonText: "Acceder al Panel",
      image: UserAdminImage
    }
  ];

  const selectedSection = sections.find(section => section.id === selectedCard);

  if (!selectedSection) {
    return null;
  }

  return (
    <GridContainer>
      <StyledRow gutter={[48, 48]}>
        {/* Imagen - ahora aparecerá ABAJO en móvil */}
        <Col xs={{ span: 24, order: 2 }} lg={{ span: 12, order: 2 }}>
          <SectionImage 
            variants={imageVariants}
            src={selectedSection.image} 
            alt={selectedSection.title} 
          />
        </Col>
        
        {/* Contenido - ahora aparecerá ARRIBA en móvil */}
        <Col xs={{ span: 24, order: 1 }} lg={{ span: 12, order: 1 }}>
          <Section variants={contentVariants}>
            <ContentContainer>
              <Title>{selectedSection.title}</Title>
              <Description>{selectedSection.description}</Description>
              <FeatureList>
                {selectedSection.features.map((feature, idx) => (
                  <FeatureItem 
                    key={idx}
                    variants={featureItemVariants}
                  >
                    <CheckAnimation 
                      animationData={checkAnimation} 
                      loop={true}
                    />
                    {feature}
                  </FeatureItem>
                ))}
              </FeatureList>
              <ButtonContainer>
                <StyledButton>{selectedSection.buttonText}</StyledButton>
              </ButtonContainer>
            </ContentContainer>
          </Section>
        </Col>
      </StyledRow>
    </GridContainer>
  );
};

export default UsersGrid;