import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import CharactericsCards from './CharactericsCards';

const CarouselContainer = styled.div`
  width: 100%;
  overflow: hidden;
  position: relative;
  background: transparent;
  padding: clamp(10px, 2vw, 20px) 0; // Reducido de 20px, 4vw, 40px
  display: flex;
  flex-direction: column;
  gap: clamp(10px, 2vw, 20px); // Reducido de 15px, 3vw, 30px

  @media (max-width: 768px) {
    padding: clamp(5px, 1vw, 10px) 0;
    gap: clamp(5px, 1vw, 10px);
  }
`;

const CarouselTrack = styled(motion.div)`
  display: flex;
  width: fit-content;
  will-change: transform; /* Optimiza las transformaciones */
  transition: transform 0.1s linear; /* Aumentado de 0.05s a 0.1s para más suavidad */
  
  @media (max-width: 768px) {
    transition: transform 0.15s linear; /* Más suave en móviles */
  }
`;

const StyledCharactericsCards = styled(motion(CharactericsCards))`
  display: flex;
  gap: clamp(10px, 2vw, 20px);
  &:hover {
    cursor: pointer;
  }
`;

const Platform = styled.div`
  width: 100%;
  overflow: hidden;
  
  &:nth-child(2) ${CarouselTrack} {
    margin-left: clamp(-50px, -8vw, -100px); // Offset responsive
  }
  
  @media (max-width: 768px) {
    &:nth-child(2) ${CarouselTrack} {
      margin-left: -30px; // Menor offset en móviles
    }
  }
`;

// Add container variants for appearance animation
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.05,
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

// Add row variants
const rowVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
      staggerChildren: 0.03
    }
  }
};

function CharacteristicInfiniteCarousel() {
  const [isPaused, setIsPaused] = useState(false);
  const [animationDuration, setAnimationDuration] = useState(40);
  const topControls = useAnimation();
  const bottomControls = useAnimation();
  const appearanceControls = useAnimation();
  const lastTimeRef = useRef(null);
  const animationRef = useRef(null);
  const topPositionRef = useRef(0);
  const bottomPositionRef = useRef(-1800);
  
  // Contador para gestionar múltiples interacciones de hover
  const hoverCountRef = useRef(0);
  
  // Use intersection observer to trigger appearance animation
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      appearanceControls.start("visible");
    }
  }, [appearanceControls, inView]);

  // Ajustar velocidad según el dispositivo
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setAnimationDuration(80); // Más lento en móviles (era 60)
      } else if (width < 1024) {
        setAnimationDuration(60); // Velocidad media en tablets
      } else {
        setAnimationDuration(40); // Velocidad normal en desktop
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Modificar la función de animación para que sea más suave en móviles
  const animate = (timestamp) => {
    if (!lastTimeRef.current) {
      lastTimeRef.current = timestamp;
    }
    
    const elapsed = (timestamp - lastTimeRef.current) / 1000;
    lastTimeRef.current = timestamp;
    
    // Reducir la velocidad de actualización en móviles
    const isMobile = window.innerWidth < 768;
    const updateInterval = isMobile ? 1000/30 : 1000/60; // 30fps en móvil, 60fps en desktop
    
    // Calcular velocidad según duración y dispositivo
    const pixelsPerSecond = 1800 / animationDuration;
    const smoothingFactor = isMobile ? 0.8 : 1; // Suavizar movimiento en móviles
    
    if (!isPaused) {
      // Actualizar posición con smoothing
      const delta = pixelsPerSecond * elapsed * smoothingFactor;
      
      // Actualizar posición top con interpolación
      topPositionRef.current -= delta;
      if (topPositionRef.current <= -1800) {
        topPositionRef.current = 0;
      }
      
      // Actualizar posición bottom con interpolación
      bottomPositionRef.current += delta;
      if (bottomPositionRef.current >= 0) {
        bottomPositionRef.current = -1800;
      }
      
      // Aplicar las actualizaciones con RAF
      if (timestamp % updateInterval < 16) {
        topControls.set({ x: Math.round(topPositionRef.current) });
        bottomControls.set({ x: Math.round(bottomPositionRef.current) });
      }
    }
    
    animationRef.current = requestAnimationFrame(animate);
  };
  
  // Iniciar y limpiar la animación
  useEffect(() => {
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, [isPaused, animationDuration]); // Solo re-crear cuando cambian estos valores

  // Manejadores de eventos mejorados para múltiples hovers
  const handleMouseEnter = () => {
    hoverCountRef.current += 1;
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    hoverCountRef.current -= 1;
    
    // Solo reanudar cuando no hay ningún hover activo
    if (hoverCountRef.current <= 0) {
      hoverCountRef.current = 0; // Reset para evitar contadores negativos
      setTimeout(() => {
        setIsPaused(false);
      }, 50);
    }
  };

  const handleTouchStart = () => {
    hoverCountRef.current += 1;
    setIsPaused(true);
  };

  const handleTouchEnd = () => {
    hoverCountRef.current -= 1;
    
    if (hoverCountRef.current <= 0) {
      hoverCountRef.current = 0;
      // Aumentar el delay antes de reanudar en móviles
      setTimeout(() => {
        setIsPaused(false);
      }, 150); // Aumentado de 50ms a 150ms
    }
  };

  // Manejador para las tarjetas individuales
  const handleCardHover = () => {
    setIsPaused(true);
  };

  const handleCardHoverEnd = () => {
    // No hacemos nada aquí porque ya se maneja en el handleMouseLeave del track
  };

  return (
    <CarouselContainer
      as={motion.div}
      ref={ref}
      initial="hidden"
      animate={appearanceControls}
      variants={containerVariants}
    >
      <Platform as={motion.div} variants={rowVariants}>
        <CarouselTrack
          animate={topControls}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          variants={rowVariants}
        >
          {/* Pasamos los handlers de hover a las cards */}
          <StyledCharactericsCards 
            variants={rowVariants}
            onMouseEnter={handleCardHover}
            onMouseLeave={handleCardHoverEnd}
          />
          <StyledCharactericsCards 
            variants={rowVariants}
            onMouseEnter={handleCardHover}
            onMouseLeave={handleCardHoverEnd}
          />
        </CarouselTrack>
      </Platform>

      <Platform as={motion.div} variants={rowVariants}>
        <CarouselTrack
          animate={bottomControls}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          variants={rowVariants}
        >
          <StyledCharactericsCards 
            variants={rowVariants}
            onMouseEnter={handleCardHover}
            onMouseLeave={handleCardHoverEnd}
          />
          <StyledCharactericsCards 
            variants={rowVariants}
            onMouseEnter={handleCardHover}
            onMouseLeave={handleCardHoverEnd}
          />
        </CarouselTrack>
      </Platform>
    </CarouselContainer>
  );
}

export default CharacteristicInfiniteCarousel;