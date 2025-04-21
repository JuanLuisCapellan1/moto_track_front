import React, { useState } from 'react';
import Tabs from '../../CommonComponts/Tabs';
import { CheckCircleOutlined, SyncOutlined, CloseCircleOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useLanguage } from '../../../../context/LanguageContext';

const MotorcycleTabs = styled(Tabs)`
  margin-bottom: 24px;
  
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
    padding: 8px 16px;
    
    @media (max-width: 576px) {
      padding: 6px 10px;
      margin: 0 4px 0 0;
      font-size: 13px;
      
      .anticon {
        margin-right: 4px;
      }
    }
    
    @media (max-width: 480px) {
      padding: 4px 6px !important;
      font-size: 12px !important;
      text-align: center !important;
      
      .anticon {
        font-size: 12px !important;
        margin-right: 3px !important;
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
 * TabsMotocicletas - Component for displaying tabs of different motorcycle statuses
 */
const TabsMotocicletas = ({ 
  activeComponent, 
  pendingComponent, 
  rejectedComponent,
  onTabChange 
}) => {
  const handleTabChange = (key) => {
    if (onTabChange) {
      onTabChange(key);
    }
  };

  const [activeTab, setActiveTab] = useState("1");
  const { language } = useLanguage();
  
  // Create tab translations based on language
  const tabTranslations = {
    en: {
      active: 'Active',
      pending: 'Pending',
      rejected: 'Rejected'
    },
    es: {
      active: 'Activas',
      pending: 'Pendientes',
      rejected: 'Rechazadas'
    }
  };
  
  const t = tabTranslations[language] || tabTranslations.es;
  
  // Get screen width to determine if we should use shortened labels
  const isMobile = window.innerWidth <= 480;
  
  const items = [
    {
      key: '1',
      label: (
        <span>
          <CheckCircleOutlined />
          {t.active}
        </span>
      ),
      children: activeComponent,
    },
    {
      key: '2',
      label: (
        <span>
          <SyncOutlined spin />
          {t.pending}
        </span>
      ),
      children: pendingComponent,
    },
    {
      key: '3',
      label: (
        <span>
          <CloseCircleOutlined />
          {t.rejected}
        </span>
      ),
      children: rejectedComponent,
    },
  ];

  return (
    <MotorcycleTabs
      activeKey={activeTab}
      onChange={(key) => {
        setActiveTab(key);
        handleTabChange(key);
      }}
      items={items}
      mobileWrap={false}
      tabBarGutter={2}
    />
  );
};

export default TabsMotocicletas;
