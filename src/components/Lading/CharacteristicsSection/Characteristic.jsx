import React, { useEffect } from 'react';
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import IntroductionSection from '../CommonComponents/IntroductionSection';
import CharacteristicInfiniteCarousel from './CharacteristicInfiniteCarousel';

const SectionContainer = styled(motion.div)`
  width: 100%;
  overflow-x: hidden;
  padding-top: clamp(20px, 3vw, 40px);
  opacity: 0;
  
  .carousel-container {
    margin-top: clamp(20px, 2vw, 30px); // Reducido de 30px, 4vw, 50px
  }
`;

// Optimizar las variantes de animación
const containerVariants = {
  hidden: { 
    opacity: 0,
    y: 30
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
      when: "beforeChildren",
      delayChildren: 0.2
    }
  }
};

const childVariants = {
  hidden: { 
    opacity: 0,
    y: 10, // Reduced from 20 for subtler movement
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3, // Reduced from 0.5
      ease: "easeInOut" // Changed for faster animation curve
    }
  }
};

const Characteristic = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: "-50px 0px"
  });

  useEffect(() => {
    // Retrasar la animación para dar tiempo a que termine el hero
    let timeout;
    if (inView) {
      timeout = setTimeout(() => {
        controls.start("visible");
      }, 800); // Ajusta este valor según la duración de la animación del hero
    }
    
    return () => clearTimeout(timeout);
  }, [controls, inView]);

  return (
    <SectionContainer
      id="characteristics"
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
    >
      <motion.div variants={childVariants}>
        <IntroductionSection
          sectionName="Características"
          title="Beneficios del Sistema"
          subtitle="Nuestro sistema ofrece múltiples ventajas para ciudadanos y autoridades, 
          mejorando la gestión y control de motocicletas en Santo Domingo."
        />
      </motion.div>

      <motion.div className="carousel-container" variants={childVariants}>
        <CharacteristicInfiniteCarousel />
      </motion.div>
    </SectionContainer>
  );
};

export default Characteristic;
