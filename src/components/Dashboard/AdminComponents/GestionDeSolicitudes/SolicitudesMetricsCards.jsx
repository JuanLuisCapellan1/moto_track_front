import React, { useEffect, useState } from 'react';
import { Row, Col } from 'antd';
import { 
  DatabaseOutlined, 
  CheckCircleOutlined, 
  SyncOutlined, 
  CloseCircleOutlined 
} from '@ant-design/icons';
import MetricCard from '../../CommonComponts/MetricCard';
import styled from 'styled-components';
import { useLanguage } from '../../../../context/LanguageContext';
import { useAuth } from '../../../../context/AuthContext';
import axios from 'axios';

const MetricsContainer = styled.div`
  margin-bottom: 24px;
`; 

function SolicitudesMetricsCards() {
  const { language } = useLanguage();
  const api_url = import.meta.env.VITE_API_URL;
  const { getAccessToken, currentUser } = useAuth();
  const [metricsSolicitude, setMetricsSolicitude] = useState(null);

  const translations = {
    es: {
      totalSolicitudes: {
        title: 'Total Solicitudes',
        subtitle: 'Solicitudes en el sistema'
      },
      aprobadas: {
        title: 'Aprobadas',
        subtitle: 'Solicitudes completadas'
      },
      enProceso: {
        title: 'En Proceso',
        subtitle: 'Pendientes de revisión'
      },
      rechazadas: {
        title: 'Rechazadas',
        subtitle: 'No cumplen requisitos'
      }
    },
    en: {
      totalSolicitudes: {
        title: 'Total Requests',
        subtitle: 'Requests in the system'
      },
      aprobadas: {
        title: 'Approved',
        subtitle: 'Completed requests'
      },
      enProceso: {
        title: 'In Progress',
        subtitle: 'Pending review'
      },
      rechazadas: {
        title: 'Rejected',
        subtitle: 'Don\'t meet requirements'
      }
    }
  };

  const t = translations[language] || translations.es;


  // Fetch metrics data from the API
  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await axios.get(`${api_url}/api/statistics/dashboard?=vista=solicitudes`, {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`
          }
        });
        setMetricsSolicitude(response.data.data);
      } catch (error) {
        console.error('Error fetching metrics:', error);
        notification.error({
          message: 'Error',
          description: 'Error fetching metrics data. Please try again later.'
        });
      }
    }
    fetchMetrics();
  }, []);

  const metricsData = [
    {
      id: 1,
      title: t.totalSolicitudes.title,
      icon: <DatabaseOutlined />,
      value: metricsSolicitude?.solicitudes?.total,
      subtitle: t.totalSolicitudes.subtitle,
      bubbleColor: '#e6f7ff',  // Light blue background
      iconColor: '#1890ff'     // Blue icon
    },
    {
      id: 2,
      title: t.aprobadas.title,
      icon: <CheckCircleOutlined />,
      value: metricsSolicitude?.solicitudes?.aprobadas,
      subtitle: t.aprobadas.subtitle,
      bubbleColor: '#f6ffed',  // Light green background
      iconColor: '#52c41a'     // Green icon
    },
    {
      id: 3,
      title: t.enProceso.title,
      icon: <SyncOutlined />,
      value: metricsSolicitude?.solicitudes?.pendientes,
      subtitle: t.enProceso.subtitle,
      bubbleColor: '#fff7e6',  // Light orange background
      iconColor: '#fa8c16'     // Orange icon
    },
    {
      id: 4,
      title: t.rechazadas.title,
      icon: <CloseCircleOutlined />,
      value: metricsSolicitude?.solicitudes?.rechazadas,
      subtitle: t.rechazadas.subtitle,
      bubbleColor: '#fff1f0',  // Light red background
      iconColor: '#f5222d'     // Red icon
    }
  ];

  return (
    <MetricsContainer>
      <Row gutter={[16, 16]}>
        {metricsData.map(metric => (
          <Col xs={24} sm={12} md={6} key={metric.id}>
            <MetricCard
              title={metric.title}
              icon={metric.icon}
              value={metric.value}
              subtitle={metric.subtitle}
              bubbleColor={metric.bubbleColor}
              iconColor={metric.iconColor}
            />
          </Col>
        ))}
      </Row>
    </MetricsContainer>
  );
}

export default SolicitudesMetricsCards;