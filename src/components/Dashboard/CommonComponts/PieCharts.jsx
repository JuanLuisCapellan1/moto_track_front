import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { PieChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import styled from 'styled-components';
import { useTheme } from '../../../context/ThemeContext';
import { usePrimaryColor } from '../../../context/PrimaryColorContext';
import { useLanguage } from '../../../context/LanguageContext';
import { useAuth } from '../../../context/AuthContext';
import axios from 'axios';
import { Spin } from 'antd';

// Register ECharts components
echarts.use([
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  PieChart,
  CanvasRenderer
]);

const ChartContainer = styled.div`
  background: ${props => props.theme.token.contentBg};
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  border: 1px solid ${props => props.theme.token.titleColor}25;
  height: 450px; // Altura fija para todos los componentes
`;

const ChartContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const ChartDiv = styled.div`
  flex: 3;
  min-height: 300px; // Altura mínima para el gráfico
`;

const BottomSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding-top: 1rem;
  border-top: 1px solid ${props => props.theme.token.titleColor}25;
`;

const Title = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${props => props.theme.token.titleColor};
  margin: 0 0 0.5rem 0;
`;

const LegendContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  margin-right: 1rem;
`;

const LegendColor = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${props => props.color};
  margin-right: 0.5rem;
`;

const LegendText = styled.div`
  color: ${props => props.theme.token.textColor};
  font-size: 0.8rem;
`;

const LegendPercentage = styled.div`
  color: ${props => props.theme.token.textColor};
  font-weight: 500;
  font-size: 0.8rem;
  margin-left: 0.3rem;
`;

const SpinContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

const PieChartComponent = ({ title, data, height = 250, loading = false }) => {
  const chartRef = useRef(null);
  const { theme } = useTheme();
  const { primaryColor } = usePrimaryColor();
  const { language } = useLanguage();
  
  const translations = {
    es: {
      noData: 'No hay datos disponibles'
    },
    en: {
      noData: 'No data available'
    }
  };
  
  const t = translations[language] || translations.es;
  
  // Set default data if none provided
  const chartData = data || [
    { name: 'Honda', value: 38, percentage: '38%', color: '#FF6384' },
    { name: 'Yamaha', value: 25, percentage: '25%', color: '#36A2EB' },
    { name: 'Suzuki', value: 19, percentage: '19%', color: '#FFCE56' },
    { name: 'Bajaj', value: 13, percentage: '13%', color: '#4BC0C0' },
    { name: 'Otras', value: 6, percentage: '6%', color: '#9966FF' }
  ];
  
  useEffect(() => {
    // Initialize chart
    if (chartRef.current) {
      const chart = echarts.init(chartRef.current);
      
      // Theme settings
      const textColor = theme.token.textColor;
      const titleColor = theme.token.titleColor;
      const bgColor = theme.token.contentBg;
      
      // Chart options
      const option = {
        backgroundColor: 'transparent', // Use transparent to respect container background
        tooltip: {
          trigger: 'item',
          formatter: '{b}: {c} ({d}%)',
          backgroundColor: bgColor,
          borderColor: theme.token.borderColor || bgColor,
          textStyle: {
            color: textColor
          }
        },
        series: [
          {
            name: title,
            type: 'pie',
            radius: ['40%', '70%'],
            center: ['50%', '50%'],
            avoidLabelOverlap: true,
            itemStyle: {
              borderRadius: 4,
              borderColor: bgColor,
              borderWidth: 2
            },
            label: {
              show: false  // Ensure labels are always hidden initially
            },
            emphasis: {
              focus: 'series',
              label: {
                show: false  // Also hide labels on emphasis
              },
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },
            labelLine: {
              show: false
            },
            data: chartData.map(item => ({
              value: item.value,
              name: item.name,
              itemStyle: {
                color: item.color
              }
            }))
          }
        ]
      };
      
      // Set chart option
      chart.setOption(option);
      
      // Handle resize
      const handleResize = () => {
        chart.resize();
      };
      
      window.addEventListener('resize', handleResize);
      
      // Redraw chart when theme changes
      const resizeObserver = new ResizeObserver(() => {
        chart.resize();
      });
      
      resizeObserver.observe(chartRef.current);
      
      return () => {
        chart.dispose();
        window.removeEventListener('resize', handleResize);
        resizeObserver.disconnect();
      };
    }
  }, [chartData, title, theme]); // Add theme as dependency to recreate chart when theme changes
  
  return (
    <div>
      <Title>{title}</Title>
      <ChartContainer>
        <ChartContent>
          {loading ? (
            <SpinContainer>
              <Spin size="large" />
            </SpinContainer>
          ) : (
            <>
              <ChartDiv ref={chartRef} style={{ height }} />
              <BottomSection>
                <LegendContainer>
                  {chartData.length > 0 ? (
                    chartData.map((item, index) => (
                      <LegendItem key={index}>
                        <LegendColor color={item.color} />
                        <LegendText>{item.name}</LegendText>
                        <LegendPercentage>{item.percentage}</LegendPercentage>
                      </LegendItem>
                    ))
                  ) : (
                    <LegendText>{t.noData}</LegendText>
                  )}
                </LegendContainer>
              </BottomSection>
            </>
          )}
        </ChartContent>
      </ChartContainer>
    </div>
  );
};

export const DistribucionPorMarca = ({ isAdmin = false }) => {
  const { language } = useLanguage();
  const api_url = import.meta.env.VITE_API_URL;
  const { getAccessToken } = useAuth();
  const [brands, setBrands] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        setLoading(true);
        let urlRequest = `${api_url}/api/statistics`;
        if(isAdmin) {
          urlRequest += '/dashboard?vista=distribucion';
        } else {
          urlRequest += '/empleado';
        }
        const response = await axios.get(urlRequest, {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`
          }
        });

        if (response.data.success) {
          setBrands(response.data.data.distribucion.marca);
        }
      } catch (error) {
        console.error('Error fetching brands:', error);
        notification.error({
          message: language === 'es' ? 'Error' : 'Error',
          description: language === 'es' 
            ? 'Error al cargar las marcas' 
            : 'Error loading brands',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
  }, []); 

  const translations = {
    es: {
      title: 'Distribución por Marca',
      honda: 'Honda',
      yamaha: 'Yamaha',
      suzuki: 'Suzuki',
      bajaj: 'Bajaj',
      others: 'Otras'
    },
    en: {
      title: 'Distribution by Brand',
      honda: 'Honda',
      yamaha: 'Yamaha',
      suzuki: 'Suzuki',
      bajaj: 'Bajaj',
      others: 'Others'
    }
  };

  const t = translations[language] || translations.es;

  // Transform brands data into the required format
  const chartData = brands.map((brand, index) => {
    const colors = [
      '#1890ff', '#fa8c16', '#52c41a', '#722ed1', '#f5222d', 
      '#13c2c2', '#eb2f96', '#faad14', '#a0d911', '#2f54eb',
      '#fa541c', '#9254de', '#36cfc9', '#bae637', '#40a9ff',
      '#ffa940', '#73d13d', '#597ef7', '#ff4d4f', '#95de64'
    ];
    return {
      name: brand.marca,
      value: brand.cantidad,
      percentage: brand.porcentaje,
      color: colors[index % colors.length]
    }
  });

  return (
    <PieChartComponent 
      title={t.title}
      data={chartData}
      loading={loading}
    />
  );
};

export const DistribucionPorTipo = ({ isAdmin = false }) => {
  const { language } = useLanguage();
  const api_url = import.meta.env.VITE_API_URL;
  const { getAccessToken } = useAuth();
  const [types, setTypes] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const translations = {
    es: {
      title: 'Distribución por Tipo',
      motorcycle: 'Motocicleta',
      scooter: 'Pasola',
      moped: 'Margarita',
      others: 'Otros'
    },
    en: {
      title: 'Distribution by Type',
      motorcycle: 'Motorcycle',
      scooter: 'Scooter',
      moped: 'Moped',
      others: 'Others'
    }
  };

  const t = translations[language] || translations.es;

  useEffect(() => {
    const fetchType = async () => {
      try {
        setLoading(true);
        let urlRequest = `${api_url}/api/statistics`;
        if(isAdmin) {
          urlRequest += '/dashboard?vista=distribucion';
        } else {
          urlRequest += '/empleado';
        }
        const response = await axios.get(urlRequest, {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`
          }
        });

        if (response.data.success) {
          setTypes(response.data.data.distribucion.tipo);
        }
      } catch (error) {
        console.error('Error fetching zones:', error);
        notification.error({
          message: language === 'es' ? 'Error' : 'Error',
          description: language === 'es' 
            ? 'Error al cargar las zonas' 
            : 'Error loading zonas',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchType();
  }, []); 

  const chartData = types.map((type, index) => {
    const colors = [
      '#1890ff', '#fa8c16', '#52c41a', '#722ed1', '#f5222d', 
      '#13c2c2', '#eb2f96', '#faad14', '#a0d911', '#2f54eb',
      '#fa541c', '#9254de', '#36cfc9', '#bae637', '#40a9ff',
      '#ffa940', '#73d13d', '#597ef7', '#ff4d4f', '#95de64'
    ];
    return {
      name: type.tipo,
      value: type.cantidad,
      percentage: type.porcentaje,
      color: colors[index % colors.length]
    }
  });

  return (
    <PieChartComponent 
      title={t.title}
      data={chartData}
      loading={loading}
    />
  );
};

export const DistribucionPorZona = ({ isAdmin = false }) => {
  const { language } = useLanguage();
  const api_url = import.meta.env.VITE_API_URL;
  const { getAccessToken } = useAuth();
  const [zone, setZone] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    const fetchZone = async () => {
      try {
        setLoading(true);
        let urlRequest = `${api_url}/api/statistics`;
        if(isAdmin) {
          urlRequest += '/dashboard?vista=distribucion';
        } else {
          urlRequest += '/empleado';
        }
        const response = await axios.get(urlRequest, {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`
          }
        });

        if (response.data.success) {
          setZone(response.data.data.distribucion.municipio);
        }
      } catch (error) {
        console.error('Error fetching zones:', error);
        notification.error({
          message: language === 'es' ? 'Error' : 'Error',
          description: language === 'es' 
            ? 'Error al cargar las zonas' 
            : 'Error loading zonas',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchZone();
  }, []); 

  const translations = {
    es: {
      title: 'Distribución en Santo Domingo',
      frailes: 'Los Frailes',
      sanLuis: 'San Luis',
      caleta: 'La Caleta',
      victoria: 'La Victoria',
      others: 'Otros'
    },
    en: {
      title: 'Distribution in Santo Domingo',
      frailes: 'Los Frailes',
      sanLuis: 'San Luis',
      caleta: 'La Caleta',
      victoria: 'La Victoria',
      others: 'Others'
    }
  };

  const t = translations[language] || translations.es;

  // Transform brands data into the required format
  const chartData = zone.map((place, index) => {
    const colors = [
      '#1890ff', '#fa8c16', '#52c41a', '#722ed1', '#f5222d', 
      '#13c2c2', '#eb2f96', '#faad14', '#a0d911', '#2f54eb',
      '#fa541c', '#9254de', '#36cfc9', '#bae637', '#40a9ff',
      '#ffa940', '#73d13d', '#597ef7', '#ff4d4f', '#95de64'
    ];
    return {
      name: place.municipio,
      value: place.cantidad,
      percentage: place.porcentaje,
      color: colors[index % colors.length]
    }
  });

  return (
    <PieChartComponent 
      title={t.title}
      data={chartData}
      loading={loading}
    />
  );
};

export default PieChartComponent;