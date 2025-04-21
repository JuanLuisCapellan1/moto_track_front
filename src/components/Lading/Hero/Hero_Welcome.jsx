import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom'; // Import for navigation

// Import the button components
import LandingButtonPrimary from '../CommonComponents/LandingButtonPrimary';
import LandingButtonSecondary from '../CommonComponents/LandingButtonSecondary';

import profile1 from '../../../assets/Lading/Hero/user1.png';
import profile2 from '../../../assets/Lading/Hero/user2.png';
import profile3 from '../../../assets/Lading/Hero/user3.png';
import profile4 from '../../../assets/Lading/Hero/user4.png';

const WelcomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding-top: 0.8rem;

  @media (max-width: 840px) {
    align-items: center;
    text-align: center;
    gap: 1.5rem;
  }
`;

const Title = styled.h1`
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: bold;
  color: #1a1a1a;
  margin-bottom: 1.5rem;
  line-height: 1.2;

  @media (max-width: 840px) {
    font-size: clamp(1.8rem, 3vw, 2.5rem);
    margin-bottom: 1rem;
    max-width: 600px;
  }
`;

const Subtitle = styled.p`
  font-size: clamp(1.1rem, 2vw, 1.3rem);
  color: #666;
  margin-bottom: 2rem;
  line-height: 1.5;

  @media (max-width: 840px) {
    font-size: clamp(0.9rem, 1.8vw, 1.1rem);
    margin-bottom: 1.5rem;
    max-width: 500px;
    br {
      display: none;
    }
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;

  @media (max-width: 840px) {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1.5rem;
    width: 100%;
    max-width: 400px;
  }

  @media (max-width: 480px) {
    max-width: 300px;
    gap: 0.75rem;
    margin-bottom: 1rem;
  }
`;

const MotionWrapper = styled(motion.div)`
  @media (max-width: 840px) {
    width: 100%;
    
    button {
      width: 100%;
      justify-content: center;
    }
  }
`;

const StatsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 840px) {
    flex-direction: column;
    gap: 0.75rem;
  }
`;

const AvatarGroup = styled.div`
  display: flex;
  align-items: center;

  img {
    width: 38px;
    height: 38px;
    border-radius: 50%;
    border: 2px solid white;
    margin-right: -10px;

    @media (max-width: 768px) {
      width: 34px;
      height: 34px;
    }

    @media (max-width: 480px) {
      width: 30px;
      height: 30px;
      margin-right: -8px;
    }
  }
`;

const StatsText = styled.div`
  font-size: 1rem;
  color: #666;
   
  strong {
    color: #6366f1;
    font-weight: 700;
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    font-size: 0.85rem;
    text-align: center;
  }
`;

function Hero_Welcome() {
  const navigate = useNavigate(); // Hook for navigation
  
  // Handler functions for button clicks
  const handleRegisterClick = () => {
    navigate('/register');
  };
  
  const handleLoginClick = () => {
    navigate('/login');
  };
  
  return (
    <WelcomeContainer>
      <div>
        <Title>Registro y Control de Motocicletas Digital</Title>
        <Subtitle>
          Transformando la gestión vehicular con una plataforma{' '}
          <br />
          moderna, segura y eficiente para ciudadanos y autoridades.
        </Subtitle>
      </div>
      
      <ButtonGroup>
        <MotionWrapper
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }} // Adding faster transition
        >
          <LandingButtonPrimary onClick={handleRegisterClick}>
            Registrar Motocicleta
          </LandingButtonPrimary>
        </MotionWrapper>
        
        <MotionWrapper
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }} // Adding faster transition
        >
          <LandingButtonSecondary onClick={handleLoginClick}>
            Consultar Estado
          </LandingButtonSecondary>
        </MotionWrapper>
      </ButtonGroup>

      <StatsContainer>
        <AvatarGroup>
          <img src={profile1} alt="Profile 1" />
          <img src={profile2} alt="Profile 2" />
          <img src={profile3} alt="Profile 3" />
          <img src={profile4} alt="Profile 4" />
        </AvatarGroup>
        <StatsText>
          <strong className='strong'>+10,000</strong> motocicletas registradas
        </StatsText>
      </StatsContainer>
    </WelcomeContainer>
  );
}

export default Hero_Welcome;