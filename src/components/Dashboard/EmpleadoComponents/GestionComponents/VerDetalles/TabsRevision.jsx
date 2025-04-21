import React from 'react';
import { Tabs } from 'antd';
import styled from 'styled-components';
import { 
  UserOutlined, 
  CarOutlined, 
  FileTextOutlined, 
  AuditOutlined 
} from '@ant-design/icons';
import { useLanguage } from '../../../../../context/LanguageContext';
import DatosPersonalesConfirmation from '../../../Ciudadanocomponents/RegistroDeMotocicletas/Confirmation/DatosPersonalesConfirmation';
import DatosMotocicletasConfirmation from '../../../Ciudadanocomponents/RegistroDeMotocicletas/Confirmation/DatosMotocicletasConfirmation';
import DocumentosConfirmation from '../../../Ciudadanocomponents/RegistroDeMotocicletas/Confirmation/DocumentosConfirmationParaVerDetalles';
import Estado from './Estado';

const StyledTabs = styled(Tabs)`
  .ant-tabs-nav {
    margin-bottom: 24px;
  }
  
  .ant-tabs-tab {
    padding: 12px 16px;
  }
  
  .ant-tabs-content {
    background-color: ${props => props.$isDarkMode ? '#1f2937' : '#ffffff'};
    border-radius: 8px;
    padding: 24px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    border: 1px solid ${props => props.$isDarkMode ? '#374151' : '#e5e7eb'};
  }
  
  .ant-tabs-tab-active {
    font-weight: 600;
  }
  
  @media (max-width: 768px) {
    .ant-tabs-tab {
      padding: 8px 12px;
      margin: 0 4px 0 0;
    }
    
    .ant-tabs-content {
      padding: 16px;
    }
  }
`;

const TabsRevision = ({ solicitud, isDarkMode, isEditMode = false, refreshData }) => {
  const { language } = useLanguage();
  
  const translations = {
    en: {
      personalData: 'Personal Data',
      motorcycleData: 'Motorcycle Data',
      documents: 'Documents',
      status: 'Status'
    },
    es: {
      personalData: 'Datos Personales',
      motorcycleData: 'Datos de la Motocicleta',
      documents: 'Documentos',
      status: 'Estado'
    }
  };
  
  const t = translations[language] || translations.es;
  
  return (
    <StyledTabs 
      defaultActiveKey="1" 
      $isDarkMode={isDarkMode}
      items={[
        {
          key: '1',
          label: (
            <span>
              <UserOutlined />
              {t.personalData}
            </span>
          ),
          children: <DatosPersonalesConfirmation userData={solicitud.datosPersonales} />
        },
        {
          key: '2',
          label: (
            <span>
              <CarOutlined />
              {t.motorcycleData}
            </span>
          ),
          children: <DatosMotocicletasConfirmation motoData={solicitud.datosMotocicleta} />
        },
        {
          key: '3',
          label: (
            <span>
              <FileTextOutlined />
              {t.documents}
            </span>
          ),
          children: <DocumentosConfirmation documentosData={solicitud.documentos} />
        },
        {
          key: '4',
          label: (
            <span>
              <AuditOutlined />
              {t.status}
            </span>
          ),
          children: (
            <Estado 
              solicitud={solicitud} 
              isDarkMode={isDarkMode}
              isEditMode={isEditMode}
              refreshData={refreshData}
            />
          ),
          disabled: solicitud.estado !== 'pendiente' && !isEditMode
        }
      ]}
    />
  );
};

export default TabsRevision;