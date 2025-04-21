import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import TestimonialsIntroduction from './TestimonialsIntroduction';
import TestimonialsUsers from './TestimonialsUsers';
import TestimonialsSpeach from './TestimonialsSpeach';

// Update to use motion.section
const TestimonialsContainer = styled(motion.section)`
  padding: 2rem 0;
  background: #000;
  
  @media (max-width: 992px) {
    padding: 1.5rem 0;
  }
  
  @media (max-width: 768px) {
    padding: 1.25rem 0;
  }
  
  @media (max-width: 480px) {
    padding: 1rem 0;
  }
`;

// Add animation variants - optimized for faster appearance
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
      staggerChildren: 0.05 // Reduced from 0.15
    }
  }
};

const childVariants = {
  hidden: { 
    opacity: 0,
    y: 10 // Reduced from 20 for subtler movement
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

function Testimonials() {
  // List of all users - FIX: Change "Anni Chang" to "Anni Yuen"
  const users = [
    'Armando Balcacer', 'Roamel Cabral', 'Christopher Ciprian', 
    'Eric Collado', 'Manuel Guzman', 'Ashli Cuevas', 
    'Francis De la Cruz', 'Alexander Gil', 'Elersis Gomez', 
    'Eduardo Grau', 'Derek Hernandez', 'Jackson Martinez', 
    'Gabriela Melo', 'Laura Ogando', 'Juan Olivo', 
    'Guillermo Pacanins', 'Irving Penalo', 'Leonardo Pezo', 
    'Winston Pichardo', 'Samuel Polanco', 'Erick Savinon', 
    'Eduardo Segura', 'Jorge Tapia', 'Alexander Trinidad', 
    'Anni Yuen' // Fixed: Changed from 'Anni Chang' to 'Anni Yuen'
  ];
  
  // Animation controls
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.05, // Lowered from 0.1
    rootMargin: "-20px 0px" // Changed from -50px to make it trigger sooner
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);
  
  // Function to get a random user name
  const getRandomUser = () => {
    const randomIndex = Math.floor(Math.random() * users.length);
    return users[randomIndex];
  };
  
  // Initialize with a random user name
  const [currentUser, setCurrentUser] = useState(getRandomUser());
  
  // Change the user automatically at intervals
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentUser(getRandomUser());
    }, 5000); // Change every 5 seconds
    
    // Clean up the interval when component unmounts
    return () => clearInterval(intervalId);
  }, []);

  return (
    <TestimonialsContainer 
      id="testimonials"
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
    >
      <motion.div variants={childVariants}>
        <TestimonialsIntroduction />
      </motion.div>
      
      <motion.div variants={childVariants}>
        <TestimonialsUsers 
          currentUser={currentUser} 
          setCurrentUser={setCurrentUser} 
        />
      </motion.div>
      
      <motion.div variants={childVariants}>
        <TestimonialsSpeach 
          currentUser={currentUser} 
        />
      </motion.div>
    </TestimonialsContainer>
  );
}

export default Testimonials;