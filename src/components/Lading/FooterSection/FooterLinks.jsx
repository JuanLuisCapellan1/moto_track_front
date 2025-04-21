import React from 'react';
import styled from 'styled-components';
import { Typography } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom'; // Import for navigation

const { Title } = Typography;

const LinksSection = styled.div`
  text-align: left;
  color: #fff;
`;

const StyledTitle = styled(Title)`
  color: #fff !important;
  font-size: 1.75rem !important;
  margin-bottom: 1.5rem !important;
  font-weight: 700 !important;
  height: 40px; /* Fixed height for alignment */
  display: flex;
  align-items: center;
  margin-top: 0 !important;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
    color: #6c63ff !important;
  }
`;

const LinksList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const LinkItem = styled.li`
  margin-bottom: 1.25rem; // Increased from 0.75rem
  padding: 0.25rem 0; // Added vertical padding
`;

const StyledLink = styled.a`
  color: #ccc;
  display: flex;
  align-items: center;
  transition: color 0.3s ease, transform 0.2s ease; /* Added transform transition */
  font-size: 0.95rem; // Slightly increased
  padding: 0.25rem 0; // Added padding
  cursor: pointer;
  
  &:hover {
    color: #fff;
    transform: translateX(5px); /* Small shift on hover for better feedback */
  }
`;

const IconWrapper = styled.span`
  margin-right: 8px;
  display: flex;
  align-items: center;
  color: #6c63ff; /* Purple color for the icons */
  transition: transform 0.2s ease;
  
  ${StyledLink}:hover & {
    transform: translateX(2px); /* Icon moves a bit more for emphasis */
  }
`;

const FooterLinks = () => {
  const navigate = useNavigate(); // Add navigation hook

  // Handle link clicks with navigation
  const handleLinkClick = (event, target) => {
    event.preventDefault();
    
    if (target === 'register') {
      // Navigate to register page
      setTimeout(() => {
        navigate('/register');
      }, 200);
    } 
    else if (target === 'status') {
      // Navigate to login page
      setTimeout(() => {
        navigate('/login');
      }, 200);
    } 
    else {
      // Scroll to section on the landing page
      const element = document.getElementById(target);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <LinksSection>
      <StyledTitle level={3}>Enlaces Rápidos</StyledTitle>
      
      <LinksList>
        <LinkItem>
          <StyledLink 
            onClick={(e) => handleLinkClick(e, 'register')}
          >
            <IconWrapper><RightOutlined /></IconWrapper>
            Registrar Motocicleta
          </StyledLink>
        </LinkItem>
        
        <LinkItem>
          <StyledLink 
            onClick={(e) => handleLinkClick(e, 'status')}
          >
            <IconWrapper><RightOutlined /></IconWrapper>
            Consultar Estado
          </StyledLink>
        </LinkItem>
        
        <LinkItem>
          <StyledLink 
            onClick={(e) => handleLinkClick(e, 'faq')}
          >
            <IconWrapper><RightOutlined /></IconWrapper>
            Preguntas Frecuentes
          </StyledLink>
        </LinkItem>
        
        <LinkItem>
          <StyledLink 
            onClick={(e) => handleLinkClick(e, 'support')}
          >
            <IconWrapper><RightOutlined /></IconWrapper>
            Soporte Técnico
          </StyledLink>
        </LinkItem>
        
        <LinkItem>
          <StyledLink 
            onClick={(e) => handleLinkClick(e, 'characteristics')}
          >
            <IconWrapper><RightOutlined /></IconWrapper>
            Características
          </StyledLink>
        </LinkItem>
        
        <LinkItem>
          <StyledLink 
            onClick={(e) => handleLinkClick(e, 'how-it-works')}
          >
            <IconWrapper><RightOutlined /></IconWrapper>
            Cómo Funciona
          </StyledLink>
        </LinkItem>
      </LinksList>
    </LinksSection>
  );
};

export default FooterLinks;