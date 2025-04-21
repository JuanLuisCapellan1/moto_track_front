import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import LoginImage from '../../assets/Auth/Login.png';
import RegisterImage from '../../assets/Auth/Register.jpg';
import HomeIcon from '../../assets/Auth/home.json';

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
  user-select: none;
  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  pointer-events: none;
`;

const HomeButtonWrapper = styled.div`
  position: absolute;
  top: 30px;
  left: 30px;
  z-index: 10;
`;

const HomeButton = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #ffffff6e;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 8px;
  transition: transform 0.2s ease, background-color 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
    background-color: #ffffffa0;
  }
`;

const Tooltip = styled.div`
  position: absolute;
  left: 60px;
  top: 10px;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 14px;
  white-space: nowrap;
  opacity: ${props => (props.$isVisible ? '1' : '0')};
  transform: translateX(${props => (props.$isVisible ? '0' : '-10px')});
  transition: opacity 0.3s ease, transform 0.3s ease;
  pointer-events: none;
  
  &:before {
    content: '';
    position: absolute;
    left: -6px;
    top: 50%;
    transform: translateY(-50%);
    border-width: 6px 6px 6px 0;
    border-style: solid;
    border-color: transparent rgba(0, 0, 0, 0.7) transparent transparent;
  }
`;

const LottieContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const SideImage = ({ type = 'login' }) => {
  const navigate = useNavigate();
  const [showTooltip, setShowTooltip] = useState(false);
  
  const handleHomeClick = () => {
    navigate('/');
  };
  
  return (
    <Container>
      <Image 
        src={type === 'login' ? LoginImage : RegisterImage} 
        alt={type === 'login' ? 'Login' : 'Register'} 
      />
      <HomeButtonWrapper>
        <HomeButton 
          onClick={handleHomeClick}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          aria-label="Ir a la página principal"
        >
          <LottieContainer>
            <Lottie 
              animationData={HomeIcon} 
              loop={true}
              autoplay={true}
            />
          </LottieContainer>
        </HomeButton>
        <Tooltip $isVisible={showTooltip}>Ir a la página principal</Tooltip>
      </HomeButtonWrapper>
    </Container>
  );
};

export default SideImage;