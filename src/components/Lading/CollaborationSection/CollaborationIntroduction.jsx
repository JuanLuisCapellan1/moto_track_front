import React from 'react';
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import IntroductionSection from '../CommonComponents/IntroductionSection';

// Create motion version of IntroductionSection
const MotionIntroductionSection = motion(IntroductionSection);

const StyledIntroductionSection = styled(MotionIntroductionSection)`
  .ant-typography {
    font-weight: bold !important;
  }
  
  @media (max-width: 768px) {
    padding: 0 15px;
  }
  
  @media (max-width: 480px) {
    padding: 0 10px;
  }
`;

const CollaborationWrapper = styled(motion.div)`
  width: 100%;
  padding: 20px 0;
  
  @media (max-width: 768px) {
    padding: 15px 0;
  }
`;

const CollaborationIntroduction = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.4, // Increased from 0.2 to delay trigger
    rootMargin: "-10px 0px" // Changed from -20px to delay trigger
  });

  useEffect(() => {
    if (inView) {
      // Add a small delay before starting the animation
      setTimeout(() => {
        controls.start("visible");
      }, 250); // Add 250ms delay before starting animations
    }
  }, [controls, inView]);

  // Improved animation variants - optimized for faster appearance once triggered
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.3,
        when: "beforeChildren",
        staggerChildren: 0.05,
        ease: "easeOut"
      }
    }
  };

  const titleVariants = {
    hidden: { 
      y: 15,
      opacity: 0, 
      skewY: 1
    },
    visible: { 
      y: 0, 
      opacity: 1,
      skewY: 0,
      transition: { 
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const subtitleVariants = {
    hidden: { 
      y: 10, 
      opacity: 0,
      scale: 0.98
    },
    visible: { 
      y: 0, 
      opacity: 1,
      scale: 1,
      transition: { 
        duration: 0.3,
        ease: "easeOut",
        delay: 0.05 // Small delay for subtitle
      }
    }
  };

  // Custom props for the IntroductionSection component
  const introProps = {
    animVariants: {
      sectionName: {
        hidden: { opacity: 0, y: -5 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: { duration: 0.2, ease: "easeOut" }
        }
      },
      title: titleVariants,
      subtitle: subtitleVariants
    }
  };

  return (
    <CollaborationWrapper
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
    >
      <StyledIntroductionSection
        sectionName="Colaboración"
        title="Nuestros Colaboradores"
        subtitle="Trabajamos en conjunto con instituciones gubernamentales y privadas para ofrecer un servicio integral."
        variants={{}}
        {...introProps}
      />
    </CollaborationWrapper>
  );
};

export default CollaborationIntroduction;