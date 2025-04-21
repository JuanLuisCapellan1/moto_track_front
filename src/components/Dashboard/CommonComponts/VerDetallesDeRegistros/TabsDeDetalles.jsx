import React from 'react';
import Tabs from '../Tabs';
import { UserOutlined, CarOutlined, FileTextOutlined, CheckCircleOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useLanguage } from '../../../../context/LanguageContext';

const DetailsTabs = styled(Tabs)`
  margin-bottom: 24px;
  
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
  
  .ant-tabs-tab {
    @media (max-width: 480px) {
      font-size: 13px;
    }
  }
`;

/**
 * TabsDeDetalles - A specialized component for viewing details of motorcycle registrations
 */
const TabsDeDetalles = ({ 
  activeKey = "1",
  onChange,
  datosPersonalesContent, 
  datosMotocicletaContent, 
  documentosContent,
  estadoContent,
  tabsProps = {}
}) => {
  const { language } = useLanguage();
  
  // Create translations for tab labels
  const tabTranslations = {
    en: {
      personalData: 'Personal Data',
      motorcycleData: 'Motorcycle Data',
      documents: 'Documents',
      status: 'Status'
    },
    es: {
      personalData: 'Datos Personales',
      motorcycleData: 'Datos de Motocicleta',
      documents: 'Documentos',
      status: 'Estado'
    }
  };
  
  const t = tabTranslations[language] || tabTranslations.es;
  
  // Create items array once to avoid recreating on each render
  const items = [
    {
      key: '1',
      label: (
        <span>
          <UserOutlined />
          {t.personalData}
        </span>
      ),
      children: datosPersonalesContent,
    },
    {
      key: '2',
      label: (
        <span>
          <CarOutlined />
          {t.motorcycleData}
        </span>
      ),
      children: datosMotocicletaContent,
    },
    {
      key: '3',
      label: (
        <span>
          <FileTextOutlined />
          {t.documents}
        </span>
      ),
      children: documentosContent,
    },
    {
      key: '4',
      label: (
        <span>
          <CheckCircleOutlined />
          {t.status}
        </span>
      ),
      children: estadoContent,
    }
  ];

  return (
    <DetailsTabs
      activeKey={activeKey}
      onChange={onChange}
      items={items}
      mobileWrap={true}
      ultraCompact={true}
      inModal={true}
      {...tabsProps}
    />
  );
};

export default TabsDeDetalles;