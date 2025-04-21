import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import Hero_Welcome from './Hero_Welcome';
import Hero_ParallexEffect from './Hero_ParallexEffect';

// Create a motion version of the container
const HeroContainer = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: clamp(2rem, 4vw, 4rem);
  padding: clamp(1rem, 2vw, 2rem);
  max-width: 1400px;
  margin: 0 auto;
  place-items: center;
  margin-top: clamp(60px, 10vh, 80px);
  
  @media (max-width: 992px) {
    gap: clamp(1.5rem, 3vw, 3rem);
    margin-top: clamp(50px, 8vh, 60px);
  }

  @media (max-width: 840px) {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    padding: 1rem;
    text-align: center;
    margin-top: clamp(40px, 6vh, 45px);
    align-items: center;
  }

  @media (max-width: 480px) {
    margin-top: 30px;
    padding: 0.5rem;
    gap: 1rem;
  }
`;

// Ajustar el Hero_Welcome
const WelcomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: clamp(1.5rem, 3vw, 2rem);
  max-width: 600px;
  
  @media (max-width: 840px) {
    align-items: center;
    gap: 1rem;
    padding: 0 1rem;
    width: 100%;
    max-width: 500px;
  }

  @media (max-width: 480px) {
    gap: 0.75rem;
    padding: 0 0.5rem;
  }
`;

const Title = styled.h1`
  font-size: clamp(1.8rem, 3.5vw, 3rem);
  font-weight: bold;
  color: #1a1a1a;
  line-height: 1.2;
  margin: 0;
  
  @media (max-width: 840px) {
    text-align: center;
    font-size: clamp(1.6rem, 3vw, 2.5rem);
    line-height: 1.3;
  }

  @media (max-width: 480px) {
    font-size: clamp(1.4rem, 2.5vw, 1.8rem);
    line-height: 1.4;
  }
`;

const Subtitle = styled.p`
  font-size: clamp(0.9rem, 1.8vw, 1.3rem);
  color: #666;
  line-height: 1.5;
  margin: 0;
  
  @media (max-width: 840px) {
    text-align: center;
    font-size: clamp(0.85rem, 1.6vw, 1.1rem);
    line-height: 1.6;
    br {
      display: none;
    }
  }

  @media (max-width: 480px) {
    font-size: clamp(0.8rem, 1.4vw, 0.9rem);
    padding: 0 0.5rem;
  }
`;

// Ajustar el ParallaxWrapper
const ParallaxWrapper = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  
  @media (max-width: 840px) {
    margin-top: 1.5rem;
    max-width: 450px;
    margin: 0 auto;
  }

  @media (max-width: 480px) {
    margin-top: 1rem;
    max-width: 100%;
    padding: 0 0.5rem;
  }
`;

// Optimizar las animaciones
const containerVariants = {
  hidden: { 
    opacity: 0,
    y: 20
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: window.innerWidth < 768 ? 0.4 : 0.6,
      ease: "easeOut",
      when: "beforeChildren",
      staggerChildren: window.innerWidth < 768 ? 0.05 : 0.1
    }
  }
};

const welcomeVariants = {
  hidden: { y: window.innerWidth < 768 ? 30 : 60, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      damping: window.innerWidth < 768 ? 18 : 12,
      stiffness: window.innerWidth < 768 ? 250 : 200,
      delay: window.innerWidth < 768 ? 0.05 : 0.1
    }
  }
};

// Add animation for parallax wrapper
const parallaxVariants = {
  hidden: { y: window.innerWidth < 768 ? 40 : 80, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      damping: window.innerWidth < 768 ? 18 : 14,
      stiffness: window.innerWidth < 768 ? 150 : 120,
      delay: window.innerWidth < 768 ? 0.1 : 0.2
    }
  }
};

const Hero = () => {
  const [showParallax, setShowParallax] = useState(false);
  
  useEffect(() => {
    // Delay showing the parallax effect until after initial animation
    const timer = setTimeout(() => {
      setShowParallax(true);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <HeroContainer
      id="hero"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div variants={welcomeVariants}>
        <Hero_Welcome />
      </motion.div>
      <ParallaxWrapper
        variants={parallaxVariants}  // Use the new parallax variants
      >
        <AnimatePresence>
          {showParallax && <Hero_ParallexEffect />}
        </AnimatePresence>
      </ParallaxWrapper>
    </HeroContainer>
  );
}

export default Hero;
