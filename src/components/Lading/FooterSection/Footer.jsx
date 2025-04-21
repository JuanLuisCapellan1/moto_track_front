import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Row, Col } from 'antd';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import FooterIntroduction from './FooterIntroduction';
import FooterLinks from './FooterLinks';
import FooterInfo from './FooterInfo';
import FooterSubscribe from './FooterSubscribe';
import FooterEnd from './FooterEnd';

const FooterContainer = styled(motion.footer)`
  background-color: #111;
  color: #fff;
  padding: 6rem 2rem 1rem;
  
  @media (max-width: 768px) {
    padding: 4rem 1rem 2rem;
  }
`;

const FooterContent = styled(motion.div)`
  width: 100%;
  padding-inline: 30px;
`;

const ColumnWrapper = styled(motion.div)`
  width: 100%;
  height: 100%;
`;

const SubscribeWrapper = styled(motion.div)`
  width: calc(100% + 15px);
`;

const Footer = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.05, // Lowered from 0.1 to trigger earlier
    rootMargin: "-50px 0px" // Changed from -100px to trigger sooner
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
        duration: 0.3, // Reduced from 0.7
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.05 // Reduced from 0.1
      }
    }
  };

  const contentVariants = {
    hidden: { 
      opacity: 0,
      y: 10 // Reduced from 20 for subtler movement
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3, // Reduced from 0.5
        ease: "easeOut", // Simplified from custom easing
        when: "beforeChildren",
        staggerChildren: 0.05 // Reduced from 0.15
      }
    }
  };

  const columnVariants = {
    hidden: { 
      opacity: 0,
      y: 15 // Reduced from 30 for subtler movement
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3, // Reduced from 0.5
        type: "spring",
        stiffness: 200, // Increased from 100 for snappier animation
        damping: 15 // Increased from 10 for faster stabilization
      }
    }
  };

  return (
    <FooterContainer
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
    >
      <FooterContent variants={contentVariants}>
        <Row gutter={[32, 48]}>
          <Col xs={24} sm={24} md={12} lg={6} xl={6}>
            <ColumnWrapper variants={columnVariants}>
              <FooterIntroduction />
            </ColumnWrapper>
          </Col>
          
          <Col xs={24} sm={12} md={12} lg={6} xl={6}>
            <ColumnWrapper variants={columnVariants}>
              <FooterLinks />
            </ColumnWrapper>
          </Col>
          
          <Col xs={24} sm={12} md={12} lg={6} xl={6}>
            <ColumnWrapper variants={columnVariants}>
              <FooterInfo />
            </ColumnWrapper>
          </Col>
          
          <Col xs={24} sm={24} md={12} lg={6} xl={6}>
            <ColumnWrapper variants={columnVariants}>
              <SubscribeWrapper>
                <FooterSubscribe />
              </SubscribeWrapper>
            </ColumnWrapper>
          </Col>
        </Row>
        
        <motion.div variants={contentVariants}>
          <FooterEnd />
        </motion.div>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;