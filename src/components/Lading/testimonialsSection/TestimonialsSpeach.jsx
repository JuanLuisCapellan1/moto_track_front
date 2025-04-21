import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion'; // Add AnimatePresence for smooth transitions

const SpeechContainer = styled.div`
  text-align: center;
  max-width: 900px;
  margin: 2rem auto;
  padding: 2rem 1rem;
  
  @media (max-width: 768px) {
    margin: 1rem auto;
    padding: 1.5rem 1rem;
  }
  
  @media (max-width: 480px) {
    padding: 1rem;
  }
`;

// Convert to motion components
const TestimonialText = styled(motion.p)`
  font-size: 1.4rem;
  line-height: 1.5;
  font-style: italic;
  color: #fff;
  margin-bottom: 1.2rem;
  font-weight: 400;
  
  @media (max-width: 992px) {
    font-size: 1.2rem;
  }
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin-bottom: 1rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1rem;
    line-height: 1.4;
  }
`;

const TestimonialAuthor = styled(motion.h3)`
  font-size: 1.2rem;
  color: rgb(255, 255, 255);
  margin-top: 1.2rem;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin-top: 1rem;
  }
  
  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

const OpeningQuote = styled.span`
  color: #635BFF;
  font-size: 1.6rem;
  margin-right: 4px;
  
  @media (max-width: 768px) {
    font-size: 1.4rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

const ClosingQuote = styled.span`
  color: #81E9FF;
  font-size: 1.6rem;
  margin-left: 4px;
  
  @media (max-width: 768px) {
    font-size: 1.4rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

// Animation variants for testimonial content
const testimonialVariants = {
  hidden: { 
    opacity: 0, 
    y: 10 
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.2,
      ease: "easeIn"
    }
  }
};

function TestimonialsSpeach({ currentUser }) {
  const testimonials = {
    'Armando Balcacer': "Registré mi moto en minutos con MotoTrack. Rápido, fácil y seguro. Gran avance para la gestión en Santo Domingo.",
    'Roamel Cabral': "MotoTrack simplificó todo el proceso de registro. Ahora tengo mi documentación al día sin complicaciones.",
    'Christopher Ciprian': "Excelente plataforma para mantener el control de mi moto. Interfaz intuitiva y proceso eficiente.",
    'Eric Collado': "La mejor solución para gestionar documentos de mi moto. Ahorré tiempo y esfuerzo.",
    'Manuel Guzman': "Registro rápido y seguro. MotoTrack hace todo más fácil para los motociclistas.",
    'Ashli Cuevas': "Increíble herramienta. Simplifican el proceso y ofrecen gran seguridad en cada paso.",
    'Francis De la Cruz': "MotoTrack revoluciona la gestión de motos. Proceso sencillo y resultados inmediatos.",
    'Alexander Gil': "Recomiendo MotoTrack. Sistema eficiente que facilita todos los trámites necesarios.",
    'Elersis Gomez': "Plataforma confiable y rápida. Exactamente lo que necesitábamos los motociclistas.",
    'Eduardo Grau': "Gran iniciativa. Ahora gestiono todo lo de mi moto desde mi celular.",
    'Derek Hernandez': "Servicio excepcional. MotoTrack hace el proceso de registro muy accesible.",
    'Jackson Martinez': "Facilidad y rapidez en cada trámite. MotoTrack es la solución que esperábamos.",
    'Gabriela Melo': "Proceso transparente y eficiente. MotoTrack cumple todas las expectativas.",
    'Laura Ogando': "Excelente servicio. Registro rápido y sin complicaciones innecesarias.",
    'Juan Olivo': "La mejor opción para gestionar documentos. Proceso simple y efectivo.",
    'Guillermo Pacanins': "MotoTrack hace todo más fácil. Registro completo en pocos pasos.",
    'Irving Penalo': "Sistema confiable y eficiente. Recomendado para todo motociclista.",
    'Leonardo Pezo': "Plataforma innovadora que simplifica trámites. Muy satisfecho con el servicio.",
    'Winston Pichardo': "Experiencia positiva con MotoTrack. Rápido, seguro y conveniente.",
    'Samuel Polanco': "Gran herramienta para motociclistas. Simplifica todos los procesos.",
    'Erick Savinon': "MotoTrack facilita la gestión documental. Servicio rápido y confiable.",
    'Eduardo Segura': "Proceso sencillo y efectivo. MotoTrack es la solución ideal.",
    'Jorge Tapia': "Excelente plataforma. Hace el registro de motos muy accesible.",
    'Alexander Trinidad': "Satisfecho con MotoTrack. Gestión eficiente y segura.",
    'Anni Yuen': "MotoTrack revoluciona el registro de motos. Sistema moderno y eficaz."
  };

  return (
    <SpeechContainer>
      <AnimatePresence mode="wait">
        {currentUser && (
          <motion.div
            key={currentUser}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={testimonialVariants}
          >
            <TestimonialText>
              <OpeningQuote>"</OpeningQuote>
              {testimonials[currentUser]}
              <ClosingQuote>"</ClosingQuote>
            </TestimonialText>
            <TestimonialAuthor>{currentUser}</TestimonialAuthor>
          </motion.div>
        )}
      </AnimatePresence>
    </SpeechContainer>
  );
}

export default TestimonialsSpeach;
