import React from 'react';
import { Row, Col, Space } from 'antd';
import styled from 'styled-components';
import { 
  SearchOutlined, 
  FilePdfOutlined, 
  FilterOutlined,
  PlusOutlined
} from '@ant-design/icons';
import Inputs from './Inputs';
import MainButton from './MainButton';
import SecondaryButton from './SecondaryButton';
import { useLanguage } from '../../../context/LanguageContext';
import { usePrimaryColor } from '../../../context/PrimaryColorContext';

const FilterContainer = styled.div`
  margin-bottom: 24px;
  position: relative;
  overflow: hidden;
  width: 100%;
`;

const SearchRow = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  width: 100%;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 12px;
  }
`;

const SearchCol = styled.div`
  flex: 1;
  min-width: 200px;
  
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const ButtonsWrapper = styled.div`
  display: flex;
  gap: 16px;
  height: 100%;
  
  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-between;
  }
`;

const ExportButton = styled(MainButton)`
  height: 40px; /* Match the input height */
  display: flex;
  align-items: center;
  
  @media (max-width: 768px) {
    flex: 1;
  }
`;

const FilterButton = styled(SecondaryButton)`
  height: 40px; /* Match the input height */
  display: flex;
  align-items: center;
  
  @media (max-width: 768px) {
    flex: 1;
  }
`;

// New add button using the primary color
const AddButton = styled(MainButton)`
  height: 40px;
  display: flex;
  align-items: center;
  background-color: ${props => props.$primaryColor};
  border-color: ${props => props.$primaryColor};
  
  &:hover, &:focus {
    background-color: ${props => props.$primaryColor}dd;
    border-color: ${props => props.$primaryColor}dd;
  }
  
  @media (max-width: 768px) {
    flex: 1;
    margin-bottom: 0;
  }
`;

// Option to specify a custom search placeholder
const FilterBar = ({ 
  onSearch, 
  onFilterClick, 
  onExportPDF,
  showAddButton = false,
  onAddClick,
  searchPlaceholder
}) => {
  const { language } = useLanguage();
  const { primaryColor } = usePrimaryColor();
  
  const translations = {
    es: {
      searchPlaceholder: searchPlaceholder || 'Buscar...',
      filters: 'Filtros',
      exportPDF: 'Exportar PDF',
      addEmployee: 'Agregar Empleado'
    },
    en: {
      searchPlaceholder: searchPlaceholder || 'Search...',
      filters: 'Filters',
      exportPDF: 'Export PDF',
      addEmployee: 'Add Employee'
    }
  };

  const t = translations[language] || translations.es;

  return (
    <FilterContainer>
      <SearchRow>
        <SearchCol>
          <Inputs
            placeholder={t.searchPlaceholder}
            prefix={<SearchOutlined />}
            onChange={(e) => onSearch('all', e.target.value)}
          />
        </SearchCol>
        
        <ButtonsWrapper>
          {/* Place Add Button here between search and filter buttons */}
          {showAddButton && (
            <AddButton
              icon={<PlusOutlined />}
              onClick={onAddClick}
              $primaryColor={primaryColor}
            >
              {t.addEmployee}
            </AddButton>
          )}
        
          <FilterButton
            icon={<FilterOutlined />}
            onClick={onFilterClick}
          >
            {t.filters}
          </FilterButton>
          
          <ExportButton
            icon={<FilePdfOutlined />}
            onClick={onExportPDF}
          >
            {t.exportPDF}
          </ExportButton>
        </ButtonsWrapper>
      </SearchRow>
    </FilterContainer>
  );
};

export default FilterBar;