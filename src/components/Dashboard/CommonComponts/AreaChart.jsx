import React, { useState, useMemo, useEffect } from 'react';
import { 
  AreaChart as RechartsArea, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip,
  ResponsiveContainer 
} from 'recharts';
import { Radio, Space, Select, notification } from 'antd';
import styled from 'styled-components';
import { useLanguage } from '../../../context/LanguageContext';
import { usePrimaryColor } from '../../../context/PrimaryColorContext';
import { useTheme } from '../../../context/ThemeContext';
import { useAuth } from '../../../context/AuthContext';
import axios from 'axios';

const ChartWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: 100%;
`;

const ChartContainer = styled.div`
  background: ${props => props.theme.token.contentBg};
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  height: 400px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow: hidden;
  border: 1px solid ${props => props.theme.token.titleColor}25;
`;

const ChartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const ChartControls = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
  
  @media (max-width: 576px) {
    width: 100%;
    justify-content: space-between;
  }
`;

const Title = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${props => props.theme.token.titleColor};
  margin: 0;
`;

const YearSelector = styled(Select)`
  width: auto !important;
  min-width: 85px;
  
  .ant-select-selector {
    border-color: ${props => props.theme.token.borderColorSplit} !important;
    height: 24px !important; /* Match Radio.Button small size */
    padding-top: 0 !important;
    padding-bottom: 0 !important;
    display: flex !important;
    align-items: center !important;
  }
  
  .ant-select-selection-item {
    line-height: 22px !important;
    padding: 0 4px !important;
  }
`;

const CustomTooltip = ({ active, payload, label, language, primaryColor, theme }) => {
  const translations = {
    es: {
      total: 'Total',
      approved: 'Aprobadas',
      rejected: 'Rechazadas',
      requests: 'solicitudes'
    },
    en: {
      total: 'Total',
      approved: 'Approved',
      rejected: 'Rejected',
      requests: 'requests'
    }
  };
  
  const t = translations[language] || translations.es;
  
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          background: theme.token.componentBackground || theme.token.contentBg,
          padding: '8px 12px',
          border: `1px solid ${theme.token.borderColorSplit}`,
          borderRadius: '6px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          color: theme.token.textColor
        }}
      >
        <p style={{ 
          margin: '0 0 8px', 
          fontWeight: 500, 
          color: theme.token.textColor,
          borderBottom: `1px solid ${theme.token.borderColorSplit}`,
          paddingBottom: '4px'
        }}>
          {label}
        </p>
        {payload.map((entry, index) => {
          let color;
          let label;
          
          switch(entry.dataKey) {
            case 'total':
              color = primaryColor;
              label = t.total;
              break;
            case 'aprobadas':
              color = '#52c41a';
              label = t.approved;
              break;
            case 'rechazadas':
              color = '#ff4d4f';
              label = t.rejected;
              break;
            default:
              color = entry.color;
              label = entry.name;
          }
          
          return (
            <p 
              key={`item-${index}`} 
              style={{ 
                margin: '4px 0',
                color: theme.token.textColor,
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <span style={{ 
                display: 'inline-block',
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: color,
                marginRight: '4px'
              }} />
              <span style={{ marginRight: '8px' }}>{label}:</span>
              <span style={{ 
                fontWeight: 500,
                color: color
              }}>
                {entry.value} {entry.dataKey === 'total' ? t.requests : ''}
              </span>
            </p>
          );
        })}
      </div>
    );
  }
  return null;
};

const AreaChart = ({ data, isAdmin = false }) => {
  const { language } = useLanguage();
  const { primaryColor } = usePrimaryColor();
  const { theme } = useTheme();
  const [timePeriod, setTimePeriod] = useState('year');
  const [selectedYear, setSelectedYear] = useState(2025); // Default to current year
  const api_url = import.meta.env.VITE_API_URL;
  const { getAccessToken } = useAuth();
  const [dataSolcitud, setDataSolicitud] = useState(null);
  
  const currentYear = 2025; // Since user mentioned 2025 is current year

  const [chartData, setChartData] = useState({
    periodoLabel: '',
    año: currentYear,
    datos: []
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Map time periods to API parameters
        const periodMap = {
          'week': 'semana',
          'month': 'mes',
          'quarter': 'trimestre',
          'year': 'año'
        };

        let urlRequest = '';
        if(isAdmin){
          urlRequest = `${api_url}/api/statistics/dashboard?periodo=${periodMap[timePeriod]}&vista=tendencias`;
        } else {
          urlRequest = `${api_url}/api/statistics/empleado?periodo=${periodMap[timePeriod]}`;
        }

        const response = await axios.get(
          urlRequest, 
          {
            headers: {
              Authorization: `Bearer ${getAccessToken()}`
            }
          }
        );

        if (response.data.success) {
          const tendencias = response.data.data.tendencias;
          setChartData(tendencias);
          setSelectedYear(tendencias.año);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        notification.error({
          message: language === 'es' ? 'Error' : 'Error',
          description: language === 'es' 
            ? 'Error al cargar los datos de solicitudes' 
            : 'Error loading request data',
        });
      }
    };

    fetchData();
  }, [timePeriod]); // Add timePeriod as dependency
  
  // Generate available years (current year -3 to current year +1)
  const availableYears = useMemo(() => {
    return Array.from({ length: 5 }, (_, i) => currentYear - 3 + i);
  }, [currentYear]);
  
  const translations = {
    es: {
      title: 'Tendencias de solicitudes',
      week: 'Semana',
      month: 'Mes',
      quarter: 'Trimestre',
      year: 'Año',
      weekdays: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
      months: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
      selectYear: 'Año:'
    },
    en: {
      title: 'Request Trends',
      week: 'Week',
      month: 'Month',
      quarter: 'Quarter',
      year: 'Year',
      weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      selectYear: 'Year:'
    }
  };
  
  const t = translations[language] || translations.es;
  
  const processedChartData = useMemo(() => {
    if (!chartData.datos) return [];

    return chartData.datos.map(item => ({
      month: item.periodo,
      total: item.total,
      aprobadas: item.aprobadas,
      rechazadas: item.rechazadas
    }));
  }, [chartData]);

  // Replace the maxValue calculation
  const maxValue = useMemo(() => {
    const max = Math.max(...processedChartData.map(item => item.total));
    // If max is less than 50, round up to nearest 5
    if (max <= 50) {
      return Math.ceil(max / 5) * 5;
    }
    // Otherwise, round up to nearest 10
    return Math.ceil(max / 10) * 10;
  }, [processedChartData]);

  // Update the yTicks generation
  const yTicks = useMemo(() => {
    const tickCount = 6; // Changed to 6 for better division
    let tickInterval;
    
    if (maxValue <= 50) {
      // For values up to 50, use intervals of 5
      tickInterval = 5;
      return Array.from(
        { length: Math.ceil(maxValue / tickInterval) + 1 }, 
        (_, i) => i * tickInterval
      ).filter(tick => tick <= maxValue);
    } else {
      // For larger values, use dynamic intervals
      tickInterval = Math.ceil(maxValue / (tickCount - 1));
      return Array.from(
        { length: tickCount }, 
        (_, i) => Math.round(i * tickInterval)
      );
    }
  }, [maxValue]);

  return (
    <ChartWrapper>
      <ChartHeader>
        <Title>{t.title}</Title>
        <ChartControls>
          <Radio.Group 
            value={timePeriod} 
            onChange={e => setTimePeriod(e.target.value)}
            buttonStyle="solid"
            size="small"
          >
            <Radio.Button value="week">{t.week}</Radio.Button>
            <Radio.Button value="month">{t.month}</Radio.Button>
            <Radio.Button value="year">{t.year}</Radio.Button>
          </Radio.Group>
          <YearSelector
            value={selectedYear}
            onChange={setSelectedYear}
            options={availableYears.map(year => ({ value: year, label: year }))}
            size="small"
            dropdownMatchSelectWidth={false}
            disabled={true} // Disable year selector as it comes from API
          />
        </ChartControls>
      </ChartHeader>
      <ChartContainer theme={theme}>
        <div style={{ width: '100%', height: 320 }}>
          <ResponsiveContainer>
            <RechartsArea
              data={processedChartData}
              margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={primaryColor} stopOpacity={0.3}/>
                  <stop offset="50%" stopColor={primaryColor} stopOpacity={0.2}/>
                  <stop offset="75%" stopColor={primaryColor} stopOpacity={0.15}/>
                  <stop offset="88%" stopColor={primaryColor} stopOpacity={0.1}/>
                  <stop offset="94%" stopColor={primaryColor} stopOpacity={0.08}/>
                  <stop offset="97%" stopColor={primaryColor} stopOpacity={0.06}/>
                  <stop offset="100%" stopColor={primaryColor} stopOpacity={0.05}/>
                </linearGradient>
              </defs>
              <CartesianGrid 
                strokeDasharray="3 3" 
                vertical={false}
                stroke={theme.token.borderColorSplit}
              />
              <XAxis 
                dataKey="month" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: theme.token.textColor, fontSize: 12 }}
                padding={{ left: 30, right: 30 }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fill: theme.token.textColor, fontSize: 12 }}
                domain={[0, maxValue]}
                ticks={yTicks}
                allowDecimals={false}
                minTickGap={10}
              />
              <Tooltip content={
                <CustomTooltip 
                  language={language} 
                  primaryColor={primaryColor} 
                  theme={theme}
                />
              } />
              <Area
                type="monotone"
                dataKey="total"
                stroke={primaryColor}
                strokeWidth={3}
                fill="url(#colorTotal)"
              />
              <Area
                type="monotone"
                dataKey="aprobadas"
                stroke="#52c41a"
                strokeWidth={2}
                fill="none"
                strokeDasharray="5 5"
              />
              <Area
                type="monotone"
                dataKey="rechazadas"
                stroke="#ff4d4f"
                strokeWidth={2}
                fill="none"
                strokeDasharray="5 5"
              />
            </RechartsArea>
          </ResponsiveContainer>
        </div>
      </ChartContainer>
    </ChartWrapper>
  );
};

export default AreaChart;