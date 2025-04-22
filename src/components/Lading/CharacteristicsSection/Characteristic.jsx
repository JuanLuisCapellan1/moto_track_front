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

// Modificar las variantes para tener animaciones distintas
const containerVariants = {
  hidden: { 
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
      when: "beforeChildren",
      staggerChildren: 0.2 // Aumentado para mayor separación entre animaciones
    }
  }
};

const introVariants = {
  hidden: { 
    opacity: 0,
    y: 30,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const carouselVariants = {
  hidden: { 
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut"
    }
  }
};

const Characteristic = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.01, // Aumentamos el threshold para que requiera más visibilidad
    rootMargin: "100px 0px", // Reducimos el margen para que active más tarde
  });

  useEffect(() => {
    if (inView) {
     
        controls.start("visible");
    
    }
  }, [controls, inView]);

  return (
    <SectionContainer
      id="characteristics"
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
    >
      <motion.div variants={introVariants}>
        <IntroductionSection
          sectionName="Características"
          title="Beneficios del Sistema"
          subtitle="Nuestro sistema ofrece múltiples ventajas para ciudadanos y autoridades, 
          mejorando la gestión y control de motocicletas en Santo Domingo."
        />
      </motion.div>

      <motion.div className="carousel-container" variants={carouselVariants}>
        <CharacteristicInfiniteCarousel />
      </motion.div>
    </SectionContainer>
  );
};

export default Characteristic;