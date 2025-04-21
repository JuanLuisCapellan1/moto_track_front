import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { Card } from 'antd';
import { motion } from 'framer-motion';
import Lottie from "lottie-react";
import AnalyticsAnimation from "../../../assets/Lading/Characteristics/analytics.json";
import DataUsageAnimation from "../../../assets/Lading/Characteristics/Data Usage-2.json";
import FileFoldAnimation from "../../../assets/Lading/Characteristics/file and folder.json";
import GDPRAnimation from "../../../assets/Lading/Characteristics/GDPR-2.json";
import NotificationAnimation from "../../../assets/Lading/Characteristics/notification.json";
import SecurityAnimation from "../../../assets/Lading/Characteristics/Security.json";
import TimeAnimation from "../../../assets/Lading/Characteristics/time.json";
import ValidationAnimation from "../../../assets/Lading/Characteristics/Validation.json";

// Create a motion version of Card first
const MotionCard = motion.create(Card);

// Entonces estilizar el componente de motion
const StyledCard = styled(MotionCard)`
  width: clamp(220px, 22vw, 280px); // Reducido de 260px, 25vw, 320px
  height: clamp(140px, 14vw, 160px); // Reducido de 150px, 16vw, 180px
  margin: clamp(4px, 0.8vw, 8px); // Reducido de 6px, 1vw, 12px
  border-radius: 20px;
  background: ${props => props.$isHovered 
    ? 'linear-gradient(135deg, #FFFFFF 0%, #FAFAFE 50%, #F7F6FF 100%)'
    : 'white'};
  box-shadow: ${props => props.$isHovered
    ? '0 4px 16px rgba(167,159,254,0.1)'
    : '0 4px 16px rgba(0, 0, 0, 0.05)'};
  transition: all 0.3s ease;
  border: none;
  position: relative;
  overflow: hidden;
  
  .ant-card-body {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: clamp(12px, 2vw, 20px);
    height: 100%;
    position: relative;
    z-index: 1;
  }
  
  @media (max-width: 768px) {
    width: 200px; // Reducido de 240px
    height: 130px; // Reducido de 140px
    margin: 4px; // Reducido de 5px
  }
  
  @media (max-width: 480px) {
    width: 180px; // Reducido de 220px
    height: 120px; // Reducido de 130px
    margin: 3px; // Reducido de 4px
    border-radius: 16px; // Bordes menos pronunciados
    
    .ant-card-body {
      padding: 10px; // Padding reducido
    }
  }
`;

// Mejoras adicionales en los elementos internos de la tarjeta

const ShineEffect = styled.div`
  position: absolute;
  inset: 0;
  opacity: 0.15; // Reduced from 0.3 to 0.15
  pointer-events: none;
  background: ${props => `radial-gradient(
    circle at ${props.$mouseX}px ${props.$mouseY}px,
    rgba(167,159,254,0.5) 0%,
    rgba(167,159,254,0) 60%
  )`};
`;

const IconWrapper = styled.div`
  width: clamp(32px, 3.5vw, 42px); // Reducido de 36px, 4vw, 48px
  height: clamp(32px, 3.5vw, 42px);
  border-radius: 50%;
  background: ${props => props.$isHovered 
    ? 'rgba(99, 91, 255, 0.12)'
    : 'rgba(99, 91, 255, 0.1)'};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: clamp(6px, 0.8vw, 10px); // Reducido de 8px, 1vw, 12px
  transition: all 0.3s ease;
  transform: ${props => props.$isHovered ? 'scale(1.05)' : 'scale(1)'};
  
  @media (max-width: 480px) {
    width: 28px; // Reducido de 32px
    height: 28px;
    margin-bottom: 4px; // Reducido de 6px
  }
`;

const StyledLottie = styled(Lottie)`
  width: clamp(22px, 2.5vw, 28px);
  height: clamp(22px, 2.5vw, 28px);
  object-fit: contain;
  
  @media (max-width: 480px) {
    width: 20px;
    height: 20px;
  }
`;

const Title = styled.h3`
  font-size: clamp(13px, 1.4vw, 15px); // Reducido de 14px, 1.6vw, 16px
  font-weight: 600;
  color: ${props => props.$isHovered ? '#5F5999' : '#1F2937'};
  margin: 0 0 clamp(3px, 0.5vw, 5px) 0; // Reducido de 4px, 0.6vw, 6px
  transition: color 0.3s ease;
  
  @media (max-width: 480px) {
    font-size: 11px; // Reducido de 12px
    margin-bottom: 2px;
  }
`;

const Description = styled.p`
  font-size: clamp(10px, 1.2vw, 12px); // Reducido de 11px, 1.3vw, 13px
  color: ${props => props.$isHovered ? '#7A73A8' : '#6B7280'};
  margin: 0;
  line-height: 1.4;
  transition: color 0.3s ease;
  
  @media (max-width: 480px) {
    font-size: 9px; // Reducido de 10px
    line-height: 1.3;
    display: -webkit-box;
    -webkit-line-clamp: 2; // Reducido de 3 a 2 líneas
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;

const characteristics = [
  {
    icon: <StyledLottie animationData={ValidationAnimation} loop={true} />,
    title: "Validación Automática",
    description: "Sistema inteligente de verificación de documentos y datos."
  },
  {
    icon: <StyledLottie animationData={TimeAnimation} loop={true} />,
    title: "Consulta en Tiempo Real",
    description: "Verifica el estado de tu registro y accede a tu información al instante."
  },
  {
    icon: <StyledLottie animationData={SecurityAnimation} loop={true} />,
    title: "Mayor Seguridad",
    description: "Facilita la identificación de motocicletas robadas o irregulares."
  },
  {
    icon: <StyledLottie animationData={NotificationAnimation} loop={true} />,
    title: "Notificaciones Instantáneas",
    description: "Recibe alertas sobre tu registro y vencimientos."
  },
  {
    icon: <StyledLottie animationData={FileFoldAnimation} loop={true} />,
    title: "Gestión Documental",
    description: "Almacenamiento seguro de todos los documentos relacionados con tu registro"
  },
  {
    icon: <StyledLottie animationData={DataUsageAnimation} loop={true} />,
    title: "Consulta en Tiempo Real",
    description: "Verifica el estado de tu registro y accede a tu información al instante."
  },
  {
    icon: <StyledLottie animationData={AnalyticsAnimation} loop={true} />,
    title: "Estadísticas y Reportes",
    description: "Análisis detallado para la toma de decisiones municipales."
  },
  {
    icon: <StyledLottie animationData={GDPRAnimation} loop={true} />,
    title: "Protección de Datos",
    description: "Máxima seguridad en el manejo de información personal y documentos."
  }
];

// Define card animation variants
const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 20,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  }
};

function CharactericsCards({ className }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRefs = useRef([]);

  const handleMouseMove = (e, index) => {
    if (cardRefs.current[index]) {
      const rect = cardRefs.current[index].getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  return (
    <div className={className}>
      {characteristics.map((item, index) => (
        <StyledCard
          key={index}
          ref={el => cardRefs.current[index] = el}
          $isHovered={hoveredIndex === index}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
          onMouseMove={(e) => handleMouseMove(e, index)}
          initial="hidden"
          animate="visible"
          variants={cardVariants}
        >
          {hoveredIndex === index && (
            <ShineEffect
              $mouseX={mousePosition.x}
              $mouseY={mousePosition.y}
            />
          )}
          <IconWrapper $isHovered={hoveredIndex === index}>
            {item.icon}
          </IconWrapper>
          <Title $isHovered={hoveredIndex === index}>
            {item.title}
          </Title>
          <Description $isHovered={hoveredIndex === index}>
            {item.description}
          </Description>
        </StyledCard>
      ))}
    </div>
  );
}

export default CharactericsCards;