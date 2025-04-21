import React, { useEffect, useState } from 'react';
import { Row, Col, notification } from 'antd';
import { 
  TeamOutlined, 
  CrownOutlined, 
  UserAddOutlined, 
  UserSwitchOutlined 
} from '@ant-design/icons';
import MetricCard from '../../CommonComponts/MetricCard';
import styled from 'styled-components';
import { useLanguage } from '../../../../context/LanguageContext';
import { useAuth } from '../../../../context/AuthContext';
import axios from 'axios';

const MetricsContainer = styled.div`
  margin-bottom: 24px;
`;

function EmpleadosMetricsCards() {
  const { language } = useLanguage();
  const api_url = import.meta.env.VITE_API_URL;
  const { getAccessToken, currentUser } = useAuth();
  const [employees, setEmployees] = useState(null);
  const translations = {
    es: {
      totalEmpleados: {
        title: 'Total Empleados',
        subtitle: 'Personal activo en el sistema'
      },
      administradores: {
        title: 'Administradores',
        subtitle: 'Con acceso completo al sistema'
      },
      nuevosEmpleados: {
        title: 'Nuevos Empleados',
        subtitle: 'Incorporados este mes'
      },
      empleadosActivos: {
        title: 'Empleados Activos',
        subtitle: 'En funciones actualmente'
      }
    },
    en: {
      totalEmpleados: {
        title: 'Total Employees',
        subtitle: 'Active personnel in the system'
      },
      administradores: {
        title: 'Administrators',
        subtitle: 'With full system access'
      },
      nuevosEmpleados: {
        title: 'New Employees',
        subtitle: 'Joined this month'
      },
      empleadosActivos: {
        title: 'Active Employees',
        subtitle: 'Currently working'
      }
    }
  };

  const t = translations[language] || translations.es;

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(`${api_url}/api/statistics/dashboard?=vista=empleados`, {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`
          }
        });
        setEmployees(response.data.data);
      } catch (error) {
        console.error('Error fetching employees:', error);
        notification.error({
          message: 'Error',
          description: 'No se pudieron cargar los empleados. Por favor, inténtelo de nuevo más tarde.'
        });
      }
    };
    fetchEmployees();
  });

  const metricsData = [
    {
      id: 1,
      title: t.totalEmpleados.title,
      icon: <TeamOutlined />,
      value: employees?.usuarios?.empleados?.total,
      subtitle: t.totalEmpleados.subtitle,
      bubbleColor: '#e6f7ff',  // Light blue background
      iconColor: '#1890ff'     // Blue icon
    },
    {
      id: 2,
      title: t.administradores.title,
      icon: <CrownOutlined />,
      value: employees?.usuarios?.administradores,
      subtitle: t.administradores.subtitle,
      bubbleColor: '#fff7e6',  // Light orange background
      iconColor: '#fa8c16'     // Orange icon
    },
    {
      id: 3,
      title: t.nuevosEmpleados.title,
      icon: <UserAddOutlined />,
      value: employees?.usuarios?.empleados?.nuevosEsteMes,
      subtitle: t.nuevosEmpleados.subtitle,
      bubbleColor: '#f6ffed',  // Light green background
      iconColor: '#52c41a'     // Green icon
    },
    {
      id: 4,
      title: t.empleadosActivos.title,
      icon: <UserSwitchOutlined />,
      value: employees?.usuarios?.empleados?.activos,
      subtitle: t.empleadosActivos.subtitle,
      bubbleColor: '#f9f0ff',  // Light purple background
      iconColor: '#722ed1'     // Purple icon
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

export default EmpleadosMetricsCards;