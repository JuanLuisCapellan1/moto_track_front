import React from 'react';
import styled from 'styled-components';
import { Typography, Divider } from 'antd';

const { Text } = Typography;

const FooterEndSection = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 0; // Removed horizontal padding
  margin-top: 1rem;
  // Removed background color 
  // Removed border-radius
  // Removed border
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
    padding: 1.5rem 0; // Adjusted to only vertical padding
  }
`;

const Copyright = styled(Text)`
  color: #ccc !important;
  font-size: 0.9rem !important;
  padding: 0.5rem 0;
`;

const FooterLinks = styled.div`
  display: flex;
  gap: 2rem;
  
  @media (max-width: 768px) {
    flex-wrap: wrap;
    justify-content: center;
  }
`;

const FooterLink = styled.a`
  color: #ccc;
  font-size: 0.9rem;
  transition: color 0.3s ease;
  padding: 0.5rem 0;
  
  &:hover {
    color: #fff;
  }
`;

const StyledDivider = styled(Divider)`
  background-color: rgba(255, 255, 255, 0.1);
  margin: 3rem 0 2rem;
`;

const FooterEnd = () => {
  return (
    <>
      <StyledDivider />
      <FooterEndSection>
        <Copyright>© 2025 MotoTrack. Todos los derechos reservados.</Copyright>
        
        <FooterLinks>
          <FooterLink href="/terminos">Términos y Condiciones</FooterLink>
          <FooterLink href="/privacidad">Política de Privacidad</FooterLink>
          <FooterLink href="/contactanos">Contáctanos</FooterLink>
        </FooterLinks>
      </FooterEndSection>
    </>
  );
};

export default FooterEnd;