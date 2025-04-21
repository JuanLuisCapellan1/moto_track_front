import React from 'react';
import { Typography, Row, Col } from 'antd';
import styled from 'styled-components';
import EmpleadoMetrics from '../../../components/Dashboard/EmpleadoComponents/DashboardComponents/EmpleadoMetrics';
import AreaChart from '../../../components/Dashboard/CommonComponts/AreaChart';
import { DistribucionPorMarca, DistribucionPorTipo, DistribucionPorZona } from '../../../components/Dashboard/CommonComponts/PieCharts';
import { useLanguage } from '../../../context/LanguageContext';

const { Title } = Typography;

const ResponsiveContainer = styled.div`
  padding: 0 16px;
  
  @media (max-width: 768px) {
    padding: 0 8px;
  }
  
  .dashboard-row {
    margin-bottom: 24px;
    
    @media (max-width: 576px) {
      margin-bottom: 16px;
    }
  }
`;

const SectionContainer = styled.div`


  
  @media (max-width: 576px) {
    padding: 8px;
  }
`;

function EmpleadoDashboard() {
  const { language } = useLanguage();
  
  const translations = {
    es: {
      pendingRequestsTitle: 'Solicitudes Pendientes',
      recentActivityTitle: 'Actividad Reciente',
      trendsTitle: 'Tendencias'
    },
    en: {
      pendingRequestsTitle: 'Pending Requests',
      recentActivityTitle: 'Recent Activity',
      trendsTitle: 'Trends'
    }
  };

  const t = translations[language] || translations.es;

  // Data for the chart with monthly breakdown for the year
  const requestData = {
    year: [
      { month: 'Ene', total: 420 },
      { month: 'Feb', total: 380 },
      { month: 'Mar', total: 450 },
      { month: 'Abr', total: 520 },
      { month: 'May', total: 580 },
      { month: 'Jun', total: 620 },
      { month: 'Jul', total: 680 },
      { month: 'Ago', total: 520 },
      { month: 'Sep', total: 380 },
      { month: 'Oct', total: 620 },
      { month: 'Nov', total: 480 },
      { month: 'Dic', total: 780 }
    ],
    quarter: [
      { month: 'Oct', total: 620 },
      { month: 'Nov', total: 480 },
      { month: 'Dic', total: 780 },
      { month: 'Ene', total: 650 }
    ],
    month: [
      { month: 'Sem 1', total: 180 },
      { month: 'Sem 2', total: 220 },
      { month: 'Sem 3', total: 160 },
      { month: 'Sem 4', total: 240 }
    ],
    week: [
      { month: 'Lun', total: 45 },
      { month: 'Mar', total: 52 },
      { month: 'Mié', total: 38 },
      { month: 'Jue', total: 62 },
      { month: 'Vie', total: 70 },
      { month: 'Sáb', total: 48 },
      { month: 'Dom', total: 35 }
    ]
  };

  return (
    <ResponsiveContainer>
      {/* Metrics Cards */}
      <Row gutter={[16, 24]} className="dashboard-row">
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <SectionContainer>
            <EmpleadoMetrics />
          </SectionContainer>
        </Col>
      </Row>
      
      {/* Area Chart Section - Adjusted to match PieCharts width */}
      <Row gutter={[16, 24]} className="dashboard-row">
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <SectionContainer style={{ height: '450px' }}>  {/* Match height with PieCharts */}
            <AreaChart />
          </SectionContainer>
        </Col>
      </Row>
      
      {/* Pie Charts Section */}
      <Row gutter={[16, 24]} className="dashboard-row">
        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
          <SectionContainer>
            <DistribucionPorMarca />
          </SectionContainer>
        </Col>
        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
          <SectionContainer>
            <DistribucionPorTipo />
          </SectionContainer>
        </Col>
        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
          <SectionContainer>
            <DistribucionPorZona />
          </SectionContainer>
        </Col>
      </Row>
    </ResponsiveContainer>
  );
}

export default EmpleadoDashboard;