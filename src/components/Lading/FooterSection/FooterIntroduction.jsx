import React from 'react';
import styled from 'styled-components';
import { Typography } from 'antd';
import { FacebookOutlined, InstagramOutlined, LinkedinOutlined, TwitterOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const FooterSection = styled.div`
  text-align: left;
  color: #fff;
  padding: 0; // Remove padding to align with other sections
`;

const StyledTitle = styled(Title)`
  color: #fff !important;
  font-size: 1.75rem !important; // Increased to match other sections
  margin-bottom: 1.5rem !important; // Increased to match other sections
  font-weight: 700 !important;
  height: 40px; /* Fixed height for alignment */
  display: flex;
  align-items: center;
  margin-top: 0 !important; // Ensure no extra top margin
`;

const StyledParagraph = styled(Paragraph)`
  color: #ccc !important;
  font-size: 0.9rem !important;
  line-height: 1.8 !important; // Increased from 1.6
  margin-bottom: 1.5rem !important;
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 20px; // Increased from 16px
  margin-top: 1.5rem; // Increased from 1rem
`;

const SocialIcon = styled.a`
  color: #fff;
  font-size: 1.8rem; // Increased from 1.5rem
  transition: color 0.3s ease;
  padding: 0.5rem; // Added padding for larger click area
  
  &:hover {
    color: #6c63ff;
  }
`;

const FooterIntroduction = () => {
  return (
    <FooterSection>
      <StyledTitle level={3}>MotoTrack</StyledTitle>
      <StyledParagraph>
        Sistema de Registro y Control de Motocicletas Digital para Santo Domingo. 
        Transformando la gestión vehicular con tecnología moderna y segura.
      </StyledParagraph>
      
      <SocialIcons>
        <SocialIcon href="#" target="_blank" rel="noopener noreferrer">
          <FacebookOutlined />
        </SocialIcon>
        <SocialIcon href="#" target="_blank" rel="noopener noreferrer">
          <TwitterOutlined />
        </SocialIcon>
        <SocialIcon href="#" target="_blank" rel="noopener noreferrer">
          <InstagramOutlined />
        </SocialIcon>
        <SocialIcon href="#" target="_blank" rel="noopener noreferrer">
          <LinkedinOutlined />
        </SocialIcon>
      </SocialIcons>
    </FooterSection>
  );
};

export default FooterIntroduction;