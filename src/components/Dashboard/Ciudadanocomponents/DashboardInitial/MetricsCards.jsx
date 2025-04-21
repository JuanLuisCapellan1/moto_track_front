import React from 'react';
import { Row, Col, Spin } from 'antd';
import { CarOutlined, ProfileOutlined, CheckCircleOutlined, IdcardOutlined } from '@ant-design/icons';
import MetricCard from '../../CommonComponts/MetricCard';
import styled from 'styled-components';
import { useLanguage } from '../../../../context/LanguageContext';
import {useAuth} from '../../../../context/AuthContext';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNotification } from '../../CommonComponts/ToastNotifications';

const MetricsContainer = styled.div`
  margin-bottom: 24px;
`;

const MetricsCards = ({ refreshTrigger }) => {
  const { language } = useLanguage();
  const [metrics, setMetrics] = useState({
    active: 0,
    pending: 0,
    rejected: 0
  });
  const api_url = import.meta.env.VITE_API_URL;
  const { getAccessToken } = useAuth();
  const notification = useNotification();

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await axios.get(`${api_url}/api/statistics/ciudadano`, {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
          },
        });
        setMetrics(response.data.data);
      } catch (error) {
        console.error('Error fetching metrics:', error);
        notification.error({
          message: 'Error',
          description: 'Error al cargar los datos de las métricas.',
        });
        
        setMetrics({
          motocicletas: { activas: 0 },
          solicitudes: { pendientes: 0, aprobadas: 0, total: 0 },
        });
      }
    };

    fetchMetrics();
  }, [refreshTrigger]); // Add refreshTrigger as dependency

  const translations = {
    es: {
      totalMotorcycles: {
        title: 'Total Motocicletas',
        subtitle: 'Motocicletas registradas'
      },
      pending: {
        title: 'Pendientes',
        subtitle: 'Solicitudes en proceso de revisión'
      },
      approved: {
        title: 'Aprobadas',
        subtitle: 'Motocicletas con registro aprobado'
      },
      documents: {
        title: 'Documentos',
        subtitle: 'Carnés disponibles para descargar'
      }
    },
    en: {
      totalMotorcycles: {
        title: 'Total Motorcycles',
        subtitle: 'Motorcycles registered in the system'
      },
      pending: {
        title: 'Pending',
        subtitle: 'Requests in review process'
      },
      approved: {
        title: 'Approved',
        subtitle: 'Motorcycles with approved registration'
      },
      documents: {
        title: 'Documents',
        subtitle: 'ID cards available for download'
      }
    }
  };

  const t = translations[language] || translations.es;

  // Import Spin from antd at the top of your file if not already imported

  // Add a loading state check
  if (!metrics || Object.keys(metrics).length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <Spin size="large" />
      </div>
    );
  }

  const metricsData = [
    {
      id: 1,
      title: t.totalMotorcycles.title,
      icon: <CarOutlined />,
      value: metrics?.motocicletas?.activas || 0,
      subtitle: t.totalMotorcycles.subtitle,
      bubbleColor: '#e6f7ff',
      iconColor: '#1890ff'
    },
    {
      id: 2,
      title: t.pending.title,
      icon: <ProfileOutlined />,
      value: metrics?.solicitudes?.pendientes || 0,
      subtitle: t.pending.subtitle,
      bubbleColor: '#fff7e6',
      iconColor: '#fa8c16'
    },
    {
      id: 3,
      title: t.approved.title,
      icon: <CheckCircleOutlined />,
      value: metrics?.solicitudes?.aprobadas || 0,
      subtitle: t.approved.subtitle,
      bubbleColor: '#f6ffed',
      iconColor: '#52c41a'
    },
    {
      id: 4,
      title: t.documents.title,
      icon: <IdcardOutlined />,
      value: metrics?.solicitudes?.total || 0,
      subtitle: t.documents.subtitle,
      bubbleColor: '#f9f0ff',
      iconColor: '#722ed1'
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

export default MetricsCards;