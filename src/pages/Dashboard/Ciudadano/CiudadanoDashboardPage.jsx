import React, { useState } from 'react';
import { Typography, Row, Col } from 'antd';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import MetricsCards from '../../../components/Dashboard/Ciudadanocomponents/DashboardInitial/MetricsCards';
import InitialWarning from '../../../components/Dashboard/Ciudadanocomponents/DashboardInitial/InitialWarning';
import MisMotocicletas from '../../../components/Dashboard/Ciudadanocomponents/MisMotocicletas/MisMotocicletas';



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


function CiudadanoDashboardPage() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [refreshMetricsTrigger, setRefreshMetricsTrigger] = useState(0);
  
  const handleViewAllMotos = () => {
    navigate('/panel/ciudadano/motocicletas');
  };
  
  const handleAddNewMoto = () => {
    navigate('/panel/ciudadano/registrar');
  };

  const handleRefreshMetrics = () => {
    setRefreshMetricsTrigger(prev => prev + 1);
  };

  return (
    <ResponsiveContainer>
      <Row gutter={[16, 24]} className="dashboard-row">
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <MetricsCards refreshTrigger={refreshMetricsTrigger} />
        </Col>
      </Row>
      
      {/* <Row gutter={[16, 16]} className="dashboard-row">
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <InitialWarning />
        </Col>
      </Row> */}
      
      <Row gutter={[24, 24]}>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          
            <MisMotocicletas
              isPreview={true}
              onViewAll={handleViewAllMotos}
              onAddNew={handleAddNewMoto}
              onRefreshMetrics={handleRefreshMetrics}
            />
        
        </Col>
      </Row>
    </ResponsiveContainer>
  );
}

export default CiudadanoDashboardPage;