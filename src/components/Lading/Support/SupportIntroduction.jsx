import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import styled from 'styled-components';
import { Typography, Space, Divider } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';
import Lottie from "lottie-react";

// Import Lottie animations
import ContactAnimation from "../../../assets/Lading/Support/contact.json";
import LocationAnimation from "../../../assets/Lading/Support/location-2.json";
import MailAnimation from "../../../assets/Lading/Support/mail-2.json";

const { Title, Paragraph, Text } = Typography;

// Contenedor principal con alineación a la izquierda
const SectionWrapper = styled(motion.section)`
  text-align: left;
  padding: 2rem 1rem;
  max-width: 700px;
  
  @media (max-width: 768px) {
    padding: 1.5rem 0.5rem;
  }
`;

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
  max-width: 450px;
  margin: 0 0 1.5rem 0 !important;
  color: #666 !important;
  font-size: 1.1rem !important;
  line-height: 1.6 !important;
  word-wrap: break-word !important;
  
  @media (max-width: 768px) {
    font-size: 1rem !important;
  }
`;

const ContactSection = styled(motion.div)`
  margin-top: 2rem;
`;

const ContactItem = styled(motion.div)`
  margin-bottom: 1.5rem;
`;

const ContactHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const ContactTitle = styled(Text)`
  font-size: 1.25rem;
  font-weight: 500;
`;

const ContactInfo = styled(motion.span)`
  display: block;
  font-size: 1rem;
  margin-left: 1.75rem;
  color: #666;
`;

const LottieIcon = styled(motion.div)`
  width: 40px;
  height: 40px;
  margin-right: 0.5rem;
`;

const SupportIntroduction = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.05, // Lowered from 0.2
    rootMargin: "-20px 0px" // Added to make it trigger sooner
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  // Animation variants - optimized for faster appearance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.2, // Reduced from 0.6
        when: "beforeChildren",
        staggerChildren: 0.05 // Reduced from 0.15
      }
    }
  };
  
  const titleVariants = {
    hidden: { 
      opacity: 0, 
      y: 10 // Reduced from 20 for subtler movement
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.3, // Reduced from 0.6
        ease: "easeOut",
        // Removed spring physics for faster animation
      }
    }
  };
  
  const paragraphVariants = {
    hidden: { 
      opacity: 0, 
      y: 10 // Reduced from 15 for subtler movement
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.3, // Reduced from 0.5
        ease: "easeOut",
        delay: 0.05 // Reduced from 0.1
      }
    }
  };
  
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.3, // Reduced from 0.5
        when: "beforeChildren",
        staggerChildren: 0.05, // Reduced from 0.2
        delay: 0.1 // Reduced from 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { 
      opacity: 0, 
      x: -10 // Reduced from -15 for subtler movement
    },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.3, // Reduced from 0.5
        ease: "easeOut", // Simplified from custom easing
        when: "beforeChildren",
        staggerChildren: 0.05 // Reduced from 0.1
      }
    }
  };
  
  const lottieVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.9, // Increased from 0.7
      rotate: -5 // Reduced from -10 for subtler effect
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      rotate: 0,
      transition: { 
        duration: 0.3, // Reduced from 0.5
        type: "spring",
        stiffness: 300, // Increased from 200 for snappier movement
        damping: 20 // Increased from 15 for faster stabilization
      }
    }
  };
  
  const infoVariants = {
    hidden: { 
      opacity: 0, 
      y: 5 // Reduced from 10 for subtler movement
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.2, // Reduced from 0.4
        ease: "easeOut"
      }
    }
  };

  return (
    <SectionWrapper
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
    >
      <StyledTitle level={2} variants={titleVariants}>
        Contáctenos
      </StyledTitle>
      <StyledParagraph variants={paragraphVariants}>
        Si tiene alguna pregunta o necesita asistencia, nuestro equipo de soporte está disponible para ayudarle.
      </StyledParagraph>

      <ContactSection variants={sectionVariants}>
        <ContactItem variants={itemVariants}>
          <ContactHeader>
            <LottieIcon variants={lottieVariants}>
              <Lottie 
                animationData={ContactAnimation} 
                loop={true}
              />
            </LottieIcon>
            <ContactTitle>Teléfono</ContactTitle>
          </ContactHeader>
          <ContactInfo variants={infoVariants}>+1 (809) 555-0123</ContactInfo>
          <ContactInfo variants={infoVariants}>
            <ClockCircleOutlined style={{ marginRight: '8px', fontSize: '0.9rem' }} />
            Lunes a Viernes, 8:00 AM - 5:00 PM
          </ContactInfo>
        </ContactItem>

        <ContactItem variants={itemVariants}>
          <ContactHeader>
            <LottieIcon variants={lottieVariants}>
              <Lottie 
                animationData={MailAnimation} 
                loop={true}
              />
            </LottieIcon>
            <ContactTitle>Correo Electrónico</ContactTitle>
          </ContactHeader>
          <ContactInfo variants={infoVariants}>servicio.mototrack@gmail.com</ContactInfo>
        </ContactItem>

        <ContactItem variants={itemVariants}>
          <ContactHeader>
            <LottieIcon variants={lottieVariants}>
              <Lottie 
                animationData={LocationAnimation} 
                loop={true}
              />
            </LottieIcon>
            <ContactTitle>Dirección</ContactTitle>
          </ContactHeader>
          <ContactInfo variants={infoVariants}>Ayuntamiento de Santo Domingo Este</ContactInfo>
          <ContactInfo variants={infoVariants}>Carretera Mella Km. 7½</ContactInfo>
          <ContactInfo variants={infoVariants}>Santo Domingo Este, Rep. Dom.</ContactInfo>
        </ContactItem>
      </ContactSection>
    </SectionWrapper>
  );
};

export default SupportIntroduction;