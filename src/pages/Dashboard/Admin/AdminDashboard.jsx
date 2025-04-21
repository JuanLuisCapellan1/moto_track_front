import React from 'react';
import { Row, Col } from 'antd';
import styled from 'styled-components';
import DashboardMetricsCards from '../../../components/Dashboard/AdminComponents/DashboarInitial/DashboardMetricsCards';
import AreaChart from '../../../components/Dashboard/CommonComponts/AreaChart';
import { DistribucionPorMarca, DistribucionPorTipo, DistribucionPorZona } from '../../../components/Dashboard/CommonComponts/PieCharts';
import { useLanguage } from '../../../context/LanguageContext';

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

function AdminDashboard() {
  const { language } = useLanguage();

  return (
    <ResponsiveContainer>
      {/* Metrics Cards */}
      <Row gutter={[16, 24]} className="dashboard-row">
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <SectionContainer>
            <DashboardMetricsCards />
          </SectionContainer>
        </Col>
      </Row>
      
      {/* Area Chart Section */}
      <Row gutter={[16, 24]} className="dashboard-row">
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <SectionContainer style={{ height: '450px' }}>
            <AreaChart isAdmin={true}/>
          </SectionContainer>
        </Col>
      </Row>
      
      {/* Pie Charts Section */}
      <Row gutter={[16, 24]} className="dashboard-row">
        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
          <SectionContainer>
            <DistribucionPorMarca isAdmin={true} />
          </SectionContainer>
        </Col>
        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
          <SectionContainer>
            <DistribucionPorTipo isAdmin={true}/>
          </SectionContainer>
        </Col>
        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
          <SectionContainer>
            <DistribucionPorZona isAdmin={true} />
          </SectionContainer>
        </Col>
      </Row>
    </ResponsiveContainer>
  );
}

export default AdminDashboard;