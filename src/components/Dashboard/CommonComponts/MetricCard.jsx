import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useTheme } from '../../../context/ThemeContext';

const Card = styled(motion.div)`
  background: ${props => props.theme.token.contentBg};
  padding: 1.2rem;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  min-width: 240px;
  height: 135px;
  border-radius: 13px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  border: 1px solid ${props => props.theme.token.titleColor}25;
`;

const CardContent = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 100%;
  overflow: hidden;
  background: ${props => props.theme.token.contentBg};
`;

const IconWrapper = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  font-size: 1.25rem;
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.$bubbleColor || `rgba(${props.$rgbColor}, 0.2)`};
  border-radius: 50%;
  z-index: 2;
  
  svg {
    font-size: inherit;
    color: ${props => props.$iconColor || props.theme.token.colorPrimary};
  }
`;

const Title = styled.div`
  font-size: 0.95rem;
  color: ${props => props.theme.token.titleColor};
  margin-bottom: 0.6rem;
  padding-right: 48px;
  line-height: 1.2;
  font-weight: 500;
  white-space: normal;
  word-wrap: break-word;
`;

const Value = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: ${props => props.$valueColor || props.theme.token.colorPrimary};
  margin-bottom: 0.4rem;
  line-height: 1;
  
  span {
    font-size: 1.2rem;
    margin-left: 4px;
  }
`;

const Subtitle = styled.div`
  font-size: 0.85rem;
  color: ${props => props.theme.token.subtitleColor};
  font-weight: 400;
  line-height: 1.2;
  overflow-wrap: break-word;
  word-break: break-word;
  max-height: 2.4em;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  margin-top: auto;
`;

// Helper function to convert hex to rgb
const hexToRgb = (hex) => {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  const formattedHex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
  
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(formattedHex);
  return result ? 
    `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : 
    '65, 104, 88';
};

function MetricCard({ 
  title, 
  icon, 
  value, 
  subtitle, 
  color, 
  bubbleColor, 
  iconColor, 
  animate = true 
}) {
  const { theme } = useTheme();
  const defaultColor = theme.token.colorPrimary;
  const rgbColor = hexToRgb(color || defaultColor);
  
  // Use iconColor for the value color as well
  const valueColor = iconColor || color || defaultColor;
  
  return (
    <Card
      initial={animate ? { opacity: 0, y: 20 } : false}
      animate={animate ? { opacity: 1, y: 0 } : false}
      transition={{ duration: 0.5 }}
      color={color || defaultColor}
    >
      <CardContent>
        <IconWrapper 
          $rgbColor={rgbColor} 
          $bubbleColor={bubbleColor} 
          $iconColor={iconColor || color || defaultColor}
        >
          {icon}
        </IconWrapper>
        <Title>{title}</Title>
        <Value $valueColor={valueColor}>{value}</Value>
        {subtitle && <Subtitle>{subtitle}</Subtitle>}
      </CardContent>
    </Card>
  );
}

MetricCard.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  subtitle: PropTypes.string,
  color: PropTypes.string,
  bubbleColor: PropTypes.string,
  iconColor: PropTypes.string,
  animate: PropTypes.bool
};

export default MetricCard;