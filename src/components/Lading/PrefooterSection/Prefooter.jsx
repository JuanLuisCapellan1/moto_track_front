import React, { useEffect } from 'react';
import styled from 'styled-components';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom'; // Import for navigation
import LandingButtonPrimary from '../CommonComponents/LandingButtonPrimary';
import LandingButtonSecondary from '../CommonComponents/LandingButtonSecondary';
import PrefooterImg from '../../../assets/Lading/PreFooter/Prefoot.png';

// Container para todo el prefooter - ajustado padding en móviles
const PrefooterContainer = styled(motion.section)`
  position: relative;
  width: 100%;
  padding: 4rem 0;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  
  @media (max-width: 840px) {
    padding: 2.5rem 1rem;
  }
  
  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
  
  @media (max-width: 480px) {
    padding: 1.5rem 0.5rem;
  }
`;

// Imagen de fondo - altura ajustada para móviles
const BackgroundImage = styled(motion.div)`
  width: 100%;
  max-width: 1400px;
  height: 450px;
  border-radius: 30px;
  background-image: url(${PrefooterImg});
  background-size: cover;
  background-position: center;
  position: relative;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5); /* Dark overlay for better text visibility */
  }
  
  @media (max-width: 840px) {
    height: 400px;
    border-radius: 25px;
  }
  
  @media (max-width: 768px) {
    height: 350px;
    border-radius: 20px;
  }
  
  @media (max-width: 480px) {
    height: 300px;
    border-radius: 15px;
  }
`;

// Contenedor del contenido - padding ajustado para móviles
const ContentOverlay = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  text-align: center;
  z-index: 2;
  
  @media (max-width: 840px) {
    padding: 1.75rem;
    justify-content: center;
  }
  
  @media (max-width: 768px) {
    padding: 1.5rem;
    justify-content: center;
  }
  
  @media (max-width: 480px) {
    padding: 1rem;
    justify-content: center;
  }
`;

// Título con tamaños más apropiados para móviles
const Title = styled(motion.h2)`
  color: white;
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  font-weight: 700;
  margin-bottom: 1rem;
  line-height: 1.2;
  
  @media (max-width: 840px) {
    font-size: clamp(1.4rem, 3.5vw, 2rem);
    margin-bottom: 0.9rem;
  }
  
  @media (max-width: 480px) {
    font-size: clamp(1.2rem, 3vw, 1.5rem);
    margin-bottom: 0.75rem;
  }
`;

// Descripción con tamaños más apropiados para móviles
const Description = styled(motion.p)`
  color: white;
  font-size: clamp(0.9rem, 2vw, 1.1rem);
  max-width: 800px;
  margin-bottom: 2rem;
  
  @media (max-width: 840px) {
    font-size: clamp(0.85rem, 1.8vw, 1rem);
    margin-bottom: 1.75rem;
    max-width: 90%;
    line-height: 1.4;
  }
  
  @media (max-width: 480px) {
    font-size: clamp(0.8rem, 1.6vw, 0.9rem);
    margin-bottom: 1.5rem;
    max-width: 95%;
    line-height: 1.3;
  }
`;

// Contenedor de botones mejorado para móviles
const ButtonContainer = styled(motion.div)`
  display: flex;
  gap: 1rem;
  
  @media (max-width: 840px) {
    flex-direction: column;
    width: 100%;
    max-width: 280px;
    gap: 0.75rem;
  }
  
  @media (max-width: 480px) {
    max-width: 240px;
    gap: 0.6rem;
  }
`;

// Wrapper para botones individuales - optimizado para móviles
const ButtonWrapper = styled(motion.div)`
  @media (max-width: 840px) {
    width: 100%;
    
    button {
      width: 100%;
      padding: 0.75rem 1.5rem;
      font-size: 0.9rem;
    }
  }
  
  @media (max-width: 480px) {
    button {
      padding: 0.7rem 1.25rem;
      font-size: 0.85rem;
    }
  }
`;

const Prefooter = () => {
  const navigate = useNavigate(); // Add navigation hook
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.05,
    rootMargin: "-20px 0px"
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  // Functions to navigate with a slight delay for visual feedback
  const handleRegisterRedirect = () => {
    setTimeout(() => {
      navigate('/register');
    }, 200);
  };
  
  const handleLoginRedirect = () => {
    setTimeout(() => {
      navigate('/login');
    }, 200);
  };

  // Animation variants - optimized for faster appearance
  const containerVariants = {
    hidden: { 
      opacity: 0 
    },
    visible: { 
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.05
      }
    }
  };

  const backgroundVariants = {
    hidden: { 
      opacity: 0,
      scale: 1.03
    },
    visible: { 
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  const contentVariants = {
    hidden: { 
      opacity: 0
    },
    visible: { 
      opacity: 1,
      transition: {
        duration: 0.2,
        when: "beforeChildren",
        staggerChildren: 0.05
      }
    }
  };

  const titleVariants = {
    hidden: { 
      opacity: 0,
      y: 10,
      scale: 0.98
    },
    visible: { 
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.3,
        type: "spring",
        stiffness: 200,
        damping: 20
      }
    }
  };

  const descriptionVariants = {
    hidden: { 
      opacity: 0,
      y: 10
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
        delay: 0.05
      }
    }
  };

  const buttonContainerVariants = {
    hidden: { 
      opacity: 0
    },
    visible: { 
      opacity: 1,
      transition: {
        duration: 0.2,
        when: "beforeChildren",
        staggerChildren: 0.05,
        delay: 0.1
      }
    }
  };

  const buttonVariants = {
    hidden: { 
      opacity: 0,
      y: 5,
      scale: 0.98
    },
    visible: { 
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.3,
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    },
    hover: {
      scale: 1.03,
      transition: { 
        duration: 0.2,
        ease: "easeOut"
      }
    },
    tap: {
      scale: 0.97,
      transition: { 
        duration: 0.1 
      }
    }
  };

  return (
    <PrefooterContainer
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
    >
      <BackgroundImage variants={backgroundVariants}>
        <ContentOverlay variants={contentVariants}>
          <Title variants={titleVariants}>
            Registre su Motocicleta Hoy
          </Title>
          <Description variants={descriptionVariants}>
            Cumpla con la normativa municipal y contribuya a la seguridad de Santo Domingo Este.
          </Description>
          <ButtonContainer variants={buttonContainerVariants}>
            <ButtonWrapper 
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={handleRegisterRedirect} // Now navigates to /register
            >
              <LandingButtonPrimary>
                Comenzar Registro
              </LandingButtonPrimary>
            </ButtonWrapper>
            <ButtonWrapper 
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={handleLoginRedirect} // Navigates to /login
            >
              <LandingButtonSecondary variant="white">
                Consultar Estado
              </LandingButtonSecondary>
            </ButtonWrapper>
          </ButtonContainer>
        </ContentOverlay>
      </BackgroundImage>
    </PrefooterContainer>
  );
};

export default Prefooter;