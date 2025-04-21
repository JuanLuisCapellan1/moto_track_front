import React from 'react';
import styled from 'styled-components';
import { Button, Divider } from 'antd';
import { CloseOutlined, FilterOutlined } from '@ant-design/icons';
import { useLanguage } from '../../../context/LanguageContext';
import { motion } from 'framer-motion';

const FilterContainer = styled.div`
  background: ${props => props.theme?.token?.contentBg || '#fff'};
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  padding: 24px;
  margin-bottom: 24px;
  border: 1px solid ${props => props.theme?.token?.titleColor || '#000'}25;
  position: relative;
  overflow: hidden;
  width: 100%;
`;

const FilterHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const FilterTitle = styled.h3`
  margin: 0;
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 500;
  
  .anticon {
    margin-right: 8px;
    font-size: 16px;
  }
`;

const CloseButton = styled(motion.button)`
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: ${props => props.theme.token.colorPrimary || '#635BFF'};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  z-index: 1000;
  
  @media (max-width: 480px) {
    top: 12px;
    right: 12px;
    width: 28px;
    height: 28px;
    font-size: 1.2rem;
  }
`;

const FilterBody = styled.div`
  margin-bottom: 24px;
`;

const FilterFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  
  @media (max-width: 576px) {
    flex-direction: column;
    
    button {
      width: 100%;
    }
  }
`;

const FilterSection = ({ 
  title, 
  children, 
  onClose, 
  onApply, 
  onClear,
  isVisible = true 
}) => {
  const { language } = useLanguage();
  
  const translations = {
    es: {
      filterTitle: title || 'Filtros',
      apply: 'Aplicar',
      clear: 'Limpiar'
    },
    en: {
      filterTitle: title || 'Filters',
      apply: 'Apply',
      clear: 'Clear'
    }
  };

  const t = translations[language] || translations.es;

  if (!isVisible) {
    return null;
  }

  return (
    <FilterContainer>
      <FilterHeader>
        <FilterTitle>
          <FilterOutlined /> {t.filterTitle}
        </FilterTitle>
      </FilterHeader>
      
      <CloseButton 
        onClick={onClose}
        whileHover={{ rotate: 180 }}
        transition={{ duration: 0.3 }}
        aria-label="Close filters"
      >
        <CloseOutlined />
      </CloseButton>
      
      <Divider style={{ margin: '0 0 20px 0' }} />
      
      <FilterBody>
        {children}
      </FilterBody>
      
      <FilterFooter>
        <Button onClick={onClear}>{t.clear}</Button>
        <Button type="primary" onClick={onApply}>{t.apply}</Button>
      </FilterFooter>
    </FilterContainer>
  );
};

export default FilterSection;