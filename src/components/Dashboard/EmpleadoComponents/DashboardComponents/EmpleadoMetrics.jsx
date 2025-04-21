import React, { useEffect } from 'react';
import { Row, Col, notification } from 'antd';
import { 
  FileSearchOutlined, 
  CheckCircleOutlined, 
  IdcardOutlined, 
  PieChartOutlined
} from '@ant-design/icons';
import MetricCard from '../../CommonComponts/MetricCard';
import styled from 'styled-components';
import { useLanguage } from '../../../../context/LanguageContext';
import { useAuth } from '../../../../context/AuthContext';
import axios from 'axios';

const MetricsContainer = styled.div`
  margin-bottom: 24px;
`;


function EmpleadoMetrics() {
  const { language } = useLanguage();
  const api_url = import.meta.env.VITE_API_URL;
  const { getAccessToken } = useAuth();
  const [metrics, setMetrics] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const translations = {
    es: {
      assignedRequests: {
        title: 'Solicitudes Asignadas',
        subtitle: 'Pendientes por gestionar'
      },
      processedToday: {
        title: 'Procesadas Hoy',
        subtitle: 'Trámites finalizados hoy'
      },
      issuedRegistrations: {
        title: 'Matrículas Emitidas',
        subtitle: 'Nuevas matrículas registradas'
      },
      approvalRate: {
        title: 'Tasa de Aprobación',
        subtitle: 'Registros confirmados'
      }
    },
    en: {
      assignedRequests: {
        title: 'Assigned Requests',
        subtitle: 'Pending to process'
      },
      processedToday: {
        title: 'Processed Today',
        subtitle: 'Procedures completed today'
      },
      issuedRegistrations: {
        title: 'Issued Registrations',
        subtitle: 'New registrations recorded'
      },
      approvalRate: {
        title: 'Approval Rate',
        subtitle: 'Confirmed registrations'
      }
    }
  };

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await axios.get(`${api_url}/api/statistics/empleado`, {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`
          }
        });
        if (response.data.success) {
          setMetrics(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching metrics:', error);
        notification.error({
          message: language === 'es' ? 'Error' : 'Error',
          description: language === 'es' 
            ? 'Error al cargar las métricas' 
            : 'Error loading metrics',
        });
      }
    }
    fetchMetrics();
  }, []);
  const t = translations[language] || translations.es;

  const metricsData = [
    {
      id: 1,
      title: t.assignedRequests.title,
      icon: <FileSearchOutlined />,
      value: metrics?.solicitudes?.pendientes,
      subtitle: t.assignedRequests.subtitle,
      bubbleColor: '#fff7e6',  // Naranja claro para el fondo
      iconColor: '#fa8c16'     // Naranja para el icono
    },
    {
      id: 2,
      title: t.processedToday.title,
      icon: <CheckCircleOutlined />,
      value: metrics?.solicitudes?.procesadasHoy,
      subtitle: t.processedToday.subtitle,
      bubbleColor: '#f6ffed',  // Verde claro para el fondo
      iconColor: '#52c41a'     // Verde para el icono
    },
    {
      id: 3,
      title: t.issuedRegistrations.title,
      icon: <IdcardOutlined />,
      value: metrics?.solicitudes?.aprobadas,
      subtitle: t.issuedRegistrations.subtitle,
      bubbleColor: '#e6f7ff',  // Azul claro para el fondo
      iconColor: '#1890ff'     // Azul para el icono
    },
    {
      id: 4,
      title: t.approvalRate.title,
      icon: <PieChartOutlined />,
      value: `${metrics?.solicitudes?.tasaAprobacion}%`,
      subtitle: t.approvalRate.subtitle,
      bubbleColor: '#f9f0ff',  // Morado claro para el fondo
      iconColor: '#722ed1'     // Morado para el icono
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

export default EmpleadoMetrics;