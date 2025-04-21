import React, { useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Import active/inactive state images
import IntrantActive from '../../../assets/Lading/Collaboration/INTRANTACTIVE.png';
import IntrantOff from '../../../assets/Lading/Collaboration/INTRANTOFF.png';
import DgiiActive from '../../../assets/Lading/Collaboration/DGIIACTIVE.png';
import DgiiOff from '../../../assets/Lading/Collaboration/DGIIOFF.png';
import MopcActive from '../../../assets/Lading/Collaboration/MOPCACTIVE.png';
import MopcOff from '../../../assets/Lading/Collaboration/MOPCOFF.png';
import DigesettActive from '../../../assets/Lading/Collaboration/DIGESETTACTIVE.png';
import DigesettOff from '../../../assets/Lading/Collaboration/DIGESETTOFF.png';

const ButtonContainer = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 1200px;
  margin: 30px auto 0;
  padding: 0 20px;
  
  @media (max-width: 768px) {
    margin: 20px auto 0;
    padding: 0 15px;
    gap: 15px;
  }
  
  @media (max-width: 576px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, auto);
    justify-items: center;
    gap: 25px 40px;
    margin: 15px auto;
    padding: 0 30px;
    max-width: 360px;
  }
  
  @media (max-width: 480px) {
    gap: 20px 30px;
    padding: 0 20px;
  }
`;

const ButtonWrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 120px;
  
  @media (max-width: 768px) {
    width: 90px;
  }
  
  @media (max-width: 576px) {
    width: 100%;
  }
`;

// Progress indicator bar
const ProgressBar = styled.div`
  width: 100%;
  height: 1.5px;
  background-color: #e0e0e0;
  margin-bottom: 12px;
  border-radius: 0;
  position: relative;
  overflow: hidden;
  
  @media (max-width: 576px) {
    margin-bottom: 8px;
    height: 1px;
  }
`;

// Loading animation
const fillAnimation = keyframes`
  0% { width: 0; }
  100% { width: 100%; }
`;

// Colored fill for progress bar with animation
const ProgressFill = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background-color: ${props => props.color};
  width: ${props => props.$active ? '0' : '0'};
  animation: ${props => props.$active ? 
    css`${fillAnimation} 5s linear forwards` : 
    'none'
  };
`;

const NavButton = styled(motion.button)`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  transition: transform 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80px;
  padding-left: ${props => props.name === 'INTRANT' ? '10px' : '0'};

  &:hover {
    transform: scale(1.05);
  }
  
  @media (max-width: 768px) {
    height: 70px;
    padding-left: ${props => props.name === 'INTRANT' ? '5px' : '0'};
  }
  
  @media (max-width: 576px) {
    height: 60px;
  }
  
  @media (max-width: 480px) {
    height: 50px;
  }
`;

const ButtonImage = styled(motion.img)`
  height: ${props => {
    if (props.name === 'DIGESETT') return '70px'; 
    if (props.name === 'INTRANT') return '60px';
    return '45px';
  }};
  width: auto;
  object-fit: contain;
  vertical-align: middle;
  
  @media (max-width: 768px) {
    height: ${props => {
      if (props.name === 'DIGESETT') return '60px'; 
      if (props.name === 'INTRANT') return '50px';
      return '40px';
    }};
  }
  
  @media (max-width: 576px) {
    height: ${props => {
      if (props.name === 'DIGESETT') return '45px'; 
      if (props.name === 'INTRANT') return '40px';
      return '32px';
    }};
  }
  
  @media (max-width: 480px) {
    height: ${props => {
      if (props.name === 'DIGESETT') return '38px'; 
      if (props.name === 'INTRANT') return '32px';
      return '28px';
    }};
  }
`;

const CollaborationButton = ({ currentSlide, goToSlide }) => {
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
  
  // Button data with active/inactive images and progress bar colors
  const buttons = [
    { name: 'INTRANT', active: IntrantActive, inactive: IntrantOff, color: '#E15F2A' },
    { name: 'DGII', active: DgiiActive, inactive: DgiiOff, color: '#7EBA00' },
    { name: 'MOPC', active: MopcActive, inactive: MopcOff, color: '#F2780C' },
    { name: 'DIGESETT', active: DigesettActive, inactive: DigesettOff, color: '#029D3D' }
  ];
  
  // Auto-advance to next slide when progress bar completes
  useEffect(() => {
    if (currentSlide >= 0) {
      const timer = setTimeout(() => {
        const nextSlide = (currentSlide + 1) % buttons.length;
        goToSlide(nextSlide);
      }, 5000); // Match this with animation duration
      
      return () => clearTimeout(timer);
    }
  }, [currentSlide, goToSlide, buttons.length]);

  // Animation variants for buttons - optimized for faster appearance
  const containerVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4, // Faster from 0.6
        ease: "easeOut",
        staggerChildren: 0.05, // Faster from 0.1
        delayChildren: 0.1 // Faster from 0.2
      }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.3, // Faster from 0.4
        ease: "easeOut" 
      }
    }
  };

  return (
    <ButtonContainer
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
    >
      {buttons.map((button, index) => (
        <ButtonWrapper key={button.name} variants={buttonVariants}>
          <ProgressBar>
            <ProgressFill 
              $active={currentSlide === index} 
              color={button.color}
              key={`progress-${currentSlide}-${index}`}
            />
          </ProgressBar>
          <NavButton 
            name={button.name}
            onClick={() => goToSlide(index)}
            aria-label={`Go to ${button.name} slide`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            <ButtonImage 
              name={button.name}
              src={currentSlide === index ? button.active : button.inactive} 
              alt={`${button.name} ${currentSlide === index ? 'active' : 'inactive'}`}
              animate={currentSlide === index ? 
                { scale: [1, 1.05, 1], transition: { duration: 0.4 }} : 
                { scale: 1 }
              }
            />
          </NavButton>
        </ButtonWrapper>
      ))}
    </ButtonContainer>
  );
};

export default CollaborationButton;