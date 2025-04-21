import React from 'react';
import Tabs from '../../../CommonComponts/Tabs';
import { UserOutlined, CarOutlined, FileTextOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useLanguage } from '../../../../../context/LanguageContext';

const RegistrationTabs = styled(Tabs)`
  margin-bottom: 24px;
  
  @media (max-width: 576px) {
    margin-bottom: 16px;
  }
  
  .ant-tabs-nav {
    background-color: ${props => props.theme.token.contentBg};
    border-radius: 8px 8px 0 0;
    padding: 8px 8px 0;
    
    @media (max-width: 576px) {
      padding: 6px 6px 0;
    }
    
    @media (max-width: 480px) {
      padding: 4px 4px 0;
    }
  }
  
  // Force tabs to stay in one row
  .ant-tabs-nav-list {
    flex-wrap: nowrap !important;
    overflow-x: visible !important;
    
    @media (max-width: 480px) {
      width: 100%;
      
      .ant-tabs-tab {
        flex: 1 !important;
        max-width: 33.33% !important;
        min-width: 0 !important;
      }
    }
  }
  
  .ant-tabs-tab {
    @media (max-width: 576px) {
      padding: 4px 8px !important;
      font-size: 12px !important;
      
      .anticon {
        font-size: 12px !important;
        margin-right: 3px !important;
      }
    }
    
    @media (max-width: 480px) {
      padding: 3px 3px !important;
      font-size: 10px !important;
      text-align: center !important;
      
      .anticon {
        font-size: 11px !important;
        margin-right: 2px !important;
      }
    }
  }
  
  // Make the active tab indicator thinner
  .ant-tabs-ink-bar {
    height: 2px !important;
    
    @media (max-width: 480px) {
      height: 1px !important;
    }
  }
`;

/**
 * TabsRegistro - A specialized component for registration flow tabs
 */
const TabsRegistro = ({ 
  activeKey = "1",
  onChange,
  datosPersonalesContent, 
  datosMotocicletaContent, 
  documentosContent,
  tabsProps = {}
}) => {
  const { language } = useLanguage();
  
  // Create translations for tab labels
  const tabTranslations = {
    en: {
      personalData: {
        full: 'Personal Data',
        short: 'Personal'
      },
      motorcycleData: {
        full: 'Motorcycle Data',
        short: 'Moto'
      },
      documents: {
        full: 'Documents',
        short: 'Docs'
      }
    },
    es: {
      personalData: {
        full: 'Datos Personales',
        short: 'Personal'
      },
      motorcycleData: {
        full: 'Datos de Motocicleta',
        short: 'Moto'
      },
      documents: {
        full: 'Documentos',
        short: 'Docs'
      }
    }
  };
  
  // Get current translations
  const t = tabTranslations[language] || tabTranslations.es;
  
  // Get screen width to determine if we should use shortened labels
  const isMobile = window.innerWidth <= 480;
  
  const items = [
    {
      key: '1',
      label: (
        <span>
          <UserOutlined />
          {isMobile ? t.personalData.short : t.personalData.full}
        </span>
      ),
      children: datosPersonalesContent,
    },
    {
      key: '2',
      label: (
        <span>
          <CarOutlined />
          {isMobile ? t.motorcycleData.short : t.motorcycleData.full}
        </span>
      ),
      children: datosMotocicletaContent,
    },
    {
      key: '3',
      label: (
        <span>
          <FileTextOutlined />
          {isMobile ? t.documents.short : t.documents.full}
        </span>
      ),
      children: documentosContent,
    },
  ];

  return (
    <RegistrationTabs
      activeKey={activeKey}
      onChange={onChange}
      items={items}
      mobileWrap={false} // Changed to false to prevent wrapping
      ultraCompact={true}
      tabBarGutter={2} // Minimal gap between tabs
      {...tabsProps}
    />
  );
};

export default TabsRegistro;