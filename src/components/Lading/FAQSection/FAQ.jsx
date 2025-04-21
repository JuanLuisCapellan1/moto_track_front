import React, { useEffect } from 'react';
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import FAQSection from './FAQSection';

const Container = styled(motion.div)`
  max-width: 1400px;
  margin: 0 auto;
  padding: 40px 24px;
  
  @media (max-width: 768px) {
    padding: 15px 16px;
  }
`;

const Bubble = styled(motion.div)`
  display: inline-block;
  padding: 0.7rem 4rem;
  border-radius: 9999px; 
  background: transparent;
  color: #000000;
  font-weight: 500;
  margin-bottom: 1.5rem;
  border: 1px solid rgba(0, 0, 0, 0.50);
  
  @media (max-width: 768px) {
    padding: 0.5rem 2rem;
    font-size: 0.9rem;
  }
`;

// Animation variants - clean animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut",
      when: "beforeChildren",
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

function FAQ() {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: "-50px 0px"
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <Container
      id="faq"
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
    >
      
      <motion.div variants={itemVariants}>
        <FAQSection />
      </motion.div>
    </Container>
  );
}

export default FAQ;