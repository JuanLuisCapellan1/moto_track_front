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
`;

const FAQIntroductionWrapper = styled(motion.div)`
  width: 100%;
  padding: 40px 0 20px;
  
  @media (max-width: 768px) {
    padding: 30px 0 15px;
  }
`;

const FAQIntroduction = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.7,
        when: "beforeChildren",
        staggerChildren: 0.2,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const titleVariants = {
    hidden: { 
      y: 30, 
      opacity: 0, 
      skewY: 1.5
    },
    visible: { 
      y: 0, 
      opacity: 1,
      skewY: 0,
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 12, 
        mass: 1.2 
      }
    }
  };

  const subtitleVariants = {
    hidden: { 
      y: 20, 
      opacity: 0,
      scale: 0.98
    },
    visible: { 
      y: 0, 
      opacity: 1,
      scale: 1,
      transition: { 
        duration: 0.6, 
        ease: "easeOut",
        delay: 0.2
      }
    }
  };

  // Custom props for the IntroductionSection component
  const introProps = {
    animVariants: {
      sectionName: {
        hidden: { opacity: 0, y: -10 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: { duration: 0.5, ease: "easeOut" }
        }
      },
      title: titleVariants,
      subtitle: subtitleVariants
    }
  };

  return (
    <FAQIntroductionWrapper
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
    >
      <StyledIntroductionSection
        sectionName="FAQ"
        title="Preguntas Frecuentes"
        subtitle="Respuestas a las dudas más comunes sobre el Sistema de Registro y Control de Motocicletas."
        variants={{}}
        {...introProps}
      />
    </FAQIntroductionWrapper>
  );
};

export default FAQIntroduction;