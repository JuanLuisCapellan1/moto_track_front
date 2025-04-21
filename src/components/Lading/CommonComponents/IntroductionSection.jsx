import React from 'react';
import styled from 'styled-components';
import { Typography } from 'antd';

const { Title, Paragraph } = Typography;

// Contenedor principal para centrar todo
const SectionWrapper = styled.section`
  text-align: center;
  padding: 5rem 1.5rem; /* Increased padding */
  max-width: 1200px;
  margin: 0 auto;
`;

// "Burbuja" para el nombre de la sección
const Bubble = styled.div`
  display: inline-block;
  padding: 0.7rem 4rem; /* Increased padding */
  border-radius: 9999px; 
  background: transparent;
  color: ${props => props.$textColor || '#000000'}; /* Updated to use $textColor */
  font-weight: 500;
  margin-bottom: 1.5rem; /* Increased margin */
  border: 1px solid ${props => props.$borderColor || 'rgba(0, 0, 0, 0.50)'}; /* Updated to use $borderColor */
`;

const StyledTitle = styled(Title)`
  font-size: 2.5rem !important; /* Larger title */
  margin-bottom: 1rem !important;
`;

const StyledParagraph = styled(Paragraph)`
  max-width: 800px; /* Increased max-width */
  margin: 0 auto !important;
  color: ${props => props.$subtitleColor || '#666'} !important; /* Updated to use $subtitleColor */
  font-size: 1.1rem !important; /* Larger text */
  line-height: 1.6 !important;
`;

const IntroductionSection = ({ 
  sectionName, 
  title, 
  subtitle, 
  bubbleTextColor, 
  bubbleBorderColor,
  subtitleColor 
}) => {
  return (
    <SectionWrapper>
      <Bubble $textColor={bubbleTextColor} $borderColor={bubbleBorderColor}>{sectionName}</Bubble>
      <StyledTitle level={2}>{title}</StyledTitle>
      <StyledParagraph $subtitleColor={subtitleColor}>
        {subtitle}
      </StyledParagraph>
    </SectionWrapper>
  );
};

export default IntroductionSection;