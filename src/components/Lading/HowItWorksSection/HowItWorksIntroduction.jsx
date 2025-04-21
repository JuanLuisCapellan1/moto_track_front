import React from 'react';
import { Typography, Space } from 'antd';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Lottie from "lottie-react";
import SuccessAnimation from "../../../assets/Lading/HowItWork/Success-2.json";

const { Title, Paragraph } = Typography;

// Contenedor principal con alineación a la izquierda
const SectionWrapper = styled(motion.section)`
  text-align: left;
  padding: 5rem 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
`;

// With this:
const StyledTitle = styled(motion(Title))`
  font-size: 2.5rem !important;
  margin-bottom: 1rem !important;
  max-width: 560px !important;
  word-wrap: break-word !important;

  @media (max-width: 768px) {
    font-size: 1.8rem !important;
  }
`;

const StyledParagraph = styled(motion.p)`
  max-width: 700px;
  margin: 0 !important;
  color: #666 !important;
  font-size: 1.1rem !important;
  line-height: 1.6 !important;
  word-wrap: break-word !important;
  
  @media (max-width: 768px) {
    font-size: 1rem !important;
  }
`;

const FeatureList = styled(motion.div)`
  width: 100%;
  max-width: 800px;
  margin: 2.5rem 0 0;
  display: flex;
  flex-direction: column;
  gap: 24px;
  
  @media (max-width: 768px) {
    margin: 1.5rem 0 0;
    gap: 16px;
  }
`;

const FeatureItem = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 16px;
  text-align: left;
  
  .animation-container {
    width: 30px;
    height: 30px;
    flex-shrink: 0;
  }
  
  @media (max-width: 768px) {
    gap: 12px;
    
    .animation-container {
      width: 24px;
      height: 24px;
    }
  }
`;

// Animation variants
const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const listItemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

const staggeredContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

function HowItWorksIntroduction() {
  return (
    <SectionWrapper variants={itemVariants}>
   <StyledTitle level={2} variants={itemVariants}>
  Experiencia de usuario intuitiva y eficiente
</StyledTitle>
      <StyledParagraph variants={itemVariants}>
        Diseñada para simplificar el proceso de registro y consulta, nuestra plataforma ofrece una interfaz moderna y fácil de usar.
      </StyledParagraph>

      <FeatureList variants={staggeredContainerVariants}>
        <FeatureItem variants={listItemVariants}>
          <div className="animation-container">
            <Lottie animationData={SuccessAnimation} loop={true} />
          </div>
          <Paragraph style={{ margin: 0, fontSize: 16 }}>
            Formularios intuitivos con validación en tiempo real
          </Paragraph>
        </FeatureItem>

        <FeatureItem variants={listItemVariants}>
          <div className="animation-container">
            <Lottie animationData={SuccessAnimation} loop={true} />
          </div>
          <Paragraph style={{ margin: 0, fontSize: 16 }}>
            Carga de documentos con previsualización
          </Paragraph>
        </FeatureItem>

        <FeatureItem variants={listItemVariants}>
          <div className="animation-container">
            <Lottie animationData={SuccessAnimation} loop={true} />
          </div>
          <Paragraph style={{ margin: 0, fontSize: 16 }}>
            Consulta del estado de trámites en pocos clics
          </Paragraph>
        </FeatureItem>

        <FeatureItem variants={listItemVariants}>
          <div className="animation-container">
            <Lottie animationData={SuccessAnimation} loop={true} />
          </div>
          <Paragraph style={{ margin: 0, fontSize: 16 }}>
            Descarga de matrícula en formato digital
          </Paragraph>
        </FeatureItem>

        <FeatureItem variants={listItemVariants}>
          <div className="animation-container">
            <Lottie animationData={SuccessAnimation} loop={true} />
          </div>
          <Paragraph style={{ margin: 0, fontSize: 16 }}>
            Panel de control personalizado para cada usuario
          </Paragraph>
        </FeatureItem>
      </FeatureList>
    </SectionWrapper>
  );
}

export default HowItWorksIntroduction;