import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import UsersIntroduction from './UsersIntroduction';
import UsersCards from './UsersCards';
import UsersGrid from './UsersGrid';

const UsersContainer = styled(motion.div)`
  width: 100%;
  min-height: auto;
  background-color: #000000;
  display: flex;
  flex-direction: column; 
  
  @media (max-width: 768px) {
    padding-bottom: 2rem;
  }
`;

const ContentWrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  
  @media (max-width: 768px) {
    padding: 0 0.5rem;
  }
`;

// Animation variants - Optimized for faster appearance
const containerVariants = {
  hidden: { 
    opacity: 0 
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.2, // Reduced from 0.5
      ease: "easeOut",
      when: "beforeChildren",
      staggerChildren: 0.05 // Reduced from 0.1
    }
  }
};

const itemVariants = {
  hidden: { 
    opacity: 0,
    y: 10 // Reduced from 15 for subtler movement
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

const Users = () => {
  const [selectedCard, setSelectedCard] = useState(1); // Default to Ciudadanos
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

  return (
    <UsersContainer 
      id="users"
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
    > 
      <motion.div variants={itemVariants}>
        <UsersIntroduction />
      </motion.div>
      <ContentWrapper variants={itemVariants}>
        <motion.div variants={itemVariants}>
          <UsersCards 
            selectedCard={selectedCard} 
            onCardSelect={setSelectedCard} 
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <UsersGrid selectedCard={selectedCard} />
        </motion.div>
      </ContentWrapper>
    </UsersContainer>
  );
};

export default Users;