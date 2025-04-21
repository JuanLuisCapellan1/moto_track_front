import React from 'react';
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import CollaborationIntroduction from './CollaborationIntroduction';
import CollaborationCarousel from './CollaborationCarosuel';

const CollaborationContainer = styled(motion.section)`
  width: 100%;
  padding: 2rem 0;
  width: 100%;
  padding: 20px 0;
  overflow: hidden; /* Añadir esta línea */
  overflow-y: scroll;

  @media (max-width: 992px) {
    padding: 1.5rem 0;
  }
  
  @media (max-width: 768px) {
    padding: 1rem 0;
  }
`;


function Collaboration() {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.05, // Lowered from 0.1
    rootMargin: "-20px 0px" // Changed from -50px
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  // Animation variants - optimized for faster appearance
  const containerVariants = {
    hidden: { 
      opacity: 0 
    },
    visible: { 
      opacity: 1,
      transition: {
        duration: 0.2, // Reduced from 0.6
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.05 // Reduced from 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 10 // Reduced from 20
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.3, // Reduced from 0.5
        ease: "easeInOut" // Changed for snappier animation
      }
    }
  };

  return (
    <CollaborationContainer
      id="collaboration"
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
    >
     
      <CollaborationIntroduction />
      <CollaborationCarousel />
    </CollaborationContainer>
  );
}

export default Collaboration;