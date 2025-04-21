import React, { useState, useRef, useEffect } from 'react';
import { Carousel } from 'antd';
import styled from 'styled-components';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import CollaborationButton from './CollaborationButton';

// Import logos
import IntrantLogo from '../../../assets/Lading/Collaboration/INTRANTON.png';
import MopcLogo from '../../../assets/Lading/Collaboration/MOPCON.png';
import DigesettLogo from '../../../assets/Lading/Collaboration/DIGESETTON.png';
import DgiiLogo from '../../../assets/Lading/Collaboration/DGIION.png';

// Import background images
import IntrantBg from '../../../assets/Lading/Collaboration/CollaborationIntrant.png';
import MopcBg from '../../../assets/Lading/Collaboration/CollaborationMOPC.png';
import DigesettBg from '../../../assets/Lading/Collaboration/CollaborationDigesset.png';
import DgiiBg from '../../../assets/Lading/Collaboration/CollaborationDGII.png';

// Modify the Carousel component to better work with AnimatePresence
const StyledCarousel = styled(Carousel)`
  .slick-slide > div {
    position: relative;
  }
`;

const CarouselWrapper = styled(motion.div)`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  
  @media (max-width: 992px) {
    padding: 30px 15px;
  }
  
  @media (max-width: 768px) {
    padding: 20px 10px;
  }
`;

// Modify the SlideContainer to work better with exit animations
const SlideContainer = styled(motion.div)`
  position: relative;
  height: 500px;
  border-radius: 12px;
  overflow: hidden;
  
  @media (max-width: 992px) {
    height: 450px;
  }
  
  @media (max-width: 768px) {
    height: 600px;
  }
  
  @media (max-width: 576px) {
    height: 550px;
    border-radius: 8px;
  }
`;

const SlideBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${props => props.$image});
  background-size: cover;
  background-position: center;
`;

const ContentGrid = styled.div`
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: 60% 40%;
  height: 100%;
  padding: 40px;
  
  @media (max-width: 992px) {
    padding: 30px;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
    padding: 25px 20px;
  }
  
  @media (max-width: 576px) {
    padding: 20px 15px;
  }
`;

const TestimonialContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 40px;
  
  @media (max-width: 992px) {
    padding: 0 30px;
  }
  
  @media (max-width: 768px) {
    padding: 0 10px;
    order: 2;
  }
  
  @media (max-width: 576px) {
    padding: 0 5px;
  }
`;

const Quote = styled(motion.div)`
  color: white;
  font-size: 1.25rem;
  line-height: 1.6;
  margin-bottom: 20px;
  font-style: italic;
  
  @media (max-width: 1200px) {
    font-size: 1.2rem;
  }
  
  @media (max-width: 992px) {
    font-size: 1.1rem;
    margin-bottom: 15px;
  }
  
  @media (max-width: 768px) {
    font-size: 1rem;
    line-height: 1.5;
    margin-top: 20px;
  }
  
  @media (max-width: 576px) {
    font-size: 0.95rem;
    line-height: 1.4;
  }
`;

const Author = styled(motion.div)`
  color: white;
  font-size: 1.1rem;
  font-weight: 600;
  
  @media (max-width: 992px) {
    font-size: 1rem;
  }
  
  @media (max-width: 768px) {
    font-size: 0.95rem;
  }
  
  @media (max-width: 576px) {
    font-size: 0.9rem;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  
  @media (max-width: 768px) {
    order: 1;
    padding: 20px 0;
  }
  
  @media (max-width: 576px) {
    padding: 15px 0;
  }
`;

const Logo = styled(motion.img)`
  max-width: 80%;
  max-height: 80%;
  object-fit: contain;
  
  @media (max-width: 768px) {
    max-width: 70%;
    max-height: 120px;
  }
  
  @media (max-width: 576px) {
    max-width: 60%;
    max-height: 100px;
  }
`;

const carouselSettings = {
  autoplay: true,
  dots: false,
  effect: 'fade',
  autoplaySpeed: 5000,
  swipe: true,
  draggable: true,
  beforeChange: (_, next) => {},
};

const testimonials = [
  {
    quote: "«Regular el tránsito de motocicletas en una ciudad en crecimiento es un desafío enorme. Gracias a MotoTrack, hemos logrado integrar las normativas del INTRANT en una plataforma digital que facilita la fiscalización y permite un control más efectivo del parque vehicular.»",
    author: "Milton Morrison, Representante del INTRANT",
    logo: IntrantLogo,
    background: IntrantBg
  },
  {
    quote: "«La modernización del registro vehicular es esencial para garantizar la transparencia y el cumplimiento tributario. Con MotoTrack, hemos optimizado la matriculación de motocicletas, asegurando que cada propietario cumpla con sus obligaciones de manera sencilla y eficiente. Este sistema nos permite mejorar el control fiscal y reducir la evasión.»",
    author: "Eddy O. Arango, Representante del DGII",
    logo: DgiiLogo,
    background: DgiiBg
  },
  {
    quote: "«El ordenamiento vial y la seguridad en nuestras carreteras requieren herramientas innovadoras. MotoTrack nos permite monitorear de manera más efectiva la circulación de motocicletas, contribuyendo a la planificación de infraestructura y mejorando la movilidad urbana. Con esta plataforma, fortalecemos la fiscalización y promovemos un tránsito más seguro para todos.»",
    author: "Eduardo Estrella Virella, Representante del MOPC",
    logo: MopcLogo,
    background: MopcBg
  },
  {
    quote: "«La seguridad vial depende de herramientas que permitan actuar con rapidez y precisión. MotoTrack ha sido clave para que DIGESETT pueda verificar matrículas y antecedentes en tiempo real, mejorando la supervisión y reduciendo las irregularidades en la circulación de motocicletas.»",
    author: "Francisco Osoria de la Cruz, Representante del DIGESETT",
    logo: DigesettLogo,
    background: DigesettBg
  }
];

const CollaborationCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const carouselRef = useRef();
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

  const goToSlide = (index) => {
    if (!isAnimating) {
      setIsAnimating(true);
      carouselRef.current.goTo(index);
    }
  };

  const handleBeforeChange = (_, next) => {
    setCurrentSlide(next);
  };

  const handleAfterChange = () => {
    setIsAnimating(false);
  };

  const settings = {
    ...carouselSettings,
    beforeChange: handleBeforeChange,
    afterChange: handleAfterChange,
    speed: 500, // Faster transition speed
  };

  // Animation variants - optimized for faster appearance
  const containerVariants = {
    hidden: { opacity: 0, y: 20 }, // Reduced from y: 30
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.3, // Reduced from 0.5
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.05 // Reduced from 0.1
      }
    }
  };

  const slideVariants = {
    hidden: { opacity: 0, scale: 0.98 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.3, // Reduced from 0.5
        ease: "easeOut" 
      }
    },
    exit: {
      opacity: 0,
      scale: 0.98, // Increased from 0.95 for subtler effect
      transition: {
        duration: 0.2, // Reduced from 0.4
        ease: "easeInOut"
      }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 10 }, // Reduced from y: 20
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.3, // Reduced from 0.4
        ease: "easeOut" 
      }
    },
    exit: {
      opacity: 0,
      y: -5, // Reduced from -10
      transition: {
        duration: 0.2, // Reduced from 0.3
        ease: "easeIn"
      }
    }
  };

  const logoVariants = {
    hidden: { opacity: 0, scale: 0.9 }, // Increased from 0.8
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.3, // Reduced from 0.5
        ease: "easeInOut",
        delay: 0.05 // Reduced from 0.1
      }
    },
    exit: {
      opacity: 0,
      scale: 0.95, // Increased from 0.9
      transition: {
        duration: 0.2, // Reduced from 0.3
        ease: "easeIn"
      }
    }
  };

  return (
    <CarouselWrapper
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
    >
      <StyledCarousel ref={carouselRef} {...settings}>
        {testimonials.map((testimonial, index) => (
          <div key={index}>
            <AnimatePresence mode="wait">
              <SlideContainer 
                key={`slide-${index}-${currentSlide === index}`}
                variants={slideVariants}
                initial={currentSlide === index ? "hidden" : "exit"}
                animate={currentSlide === index ? "visible" : "exit"}
                exit="exit"
              >
                <SlideBackground $image={testimonial.background} />
                <ContentGrid>
                  <TestimonialContent>
                    <AnimatePresence mode="wait">
                      {currentSlide === index && (
                        <>
                          <Quote 
                            key={`quote-${index}`}
                            variants={contentVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                          >
                            {testimonial.quote}
                          </Quote>
                          <Author 
                            key={`author-${index}`}
                            variants={contentVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                          >
                            {testimonial.author}
                          </Author>
                        </>
                      )}
                    </AnimatePresence>
                  </TestimonialContent>
                  <LogoContainer>
                    <AnimatePresence mode="wait">
                      {currentSlide === index && (
                        <Logo
                          key={`logo-${index}`}
                          src={testimonial.logo}
                          alt="Organization Logo"
                          variants={logoVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                        />
                      )}
                    </AnimatePresence>
                  </LogoContainer>
                </ContentGrid>
              </SlideContainer>
            </AnimatePresence>
          </div>
        ))}
      </StyledCarousel>
      
      <CollaborationButton 
        currentSlide={currentSlide} 
        goToSlide={goToSlide}
        isAnimating={isAnimating}
      />
    </CarouselWrapper>
  );
};

export default CollaborationCarousel;