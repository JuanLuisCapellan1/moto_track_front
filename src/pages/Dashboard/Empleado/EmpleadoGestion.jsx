import React, { useState, useEffect, useRef } from 'react';
import { Row, Col, Spin } from 'antd';
import styled from 'styled-components';
import FilterBar from '../../../components/Dashboard/CommonComponts/Filterbar';
import GestionFilter from '../../../components/Dashboard/EmpleadoComponents/GestionComponents/GestionFilter';
import GestionTable from '../../../components/Dashboard/EmpleadoComponents/GestionComponents/GestionTable';
import { exportTableToPdf } from '../../../components/Dashboard/CommonComponts/ExportTablePdf';
import { useTheme } from '../../../context/ThemeContext';
import { useLanguage } from '../../../context/LanguageContext';
import { REGISTRO_STATUS } from '../../../data/registrosData';
import { useNotification } from '../../../components/Dashboard/CommonComponts/ToastNotifications';
import { useAuth } from '../../../context/AuthContext';
import axios from 'axios';

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

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  width: 100%;
`;

function EmpleadoGestion() {
  const { theme, currentTheme } = useTheme();
  const { language } = useLanguage();
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilters, setActiveFilters] = useState({
    brand: 'all',
    model: 'all',
    status: 'all',
    dateRange: null
  });
  const api_url = import.meta.env.VITE_API_URL;
  const { getAccessToken } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  const notification = useNotification();
  const tableColumnsRef = useRef([]);

  const statuses = [
    { id: 'Aprobada', name: 'Aprobada' },
    { id: 'Pendiente', name: 'Pendiente' },
    { id: 'Rechazada', name: 'Rechazada' }
  ];
  
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${api_url}/api/solicitud/empleado/todas`, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`
        }
      });
      
      if (response.data.success) {
        setFilteredData(response.data);
        setOriginalData(response.data); // Store original data for filtering
      } else {
        notification.warning(
          language === 'en' ? 'warning' : 'Cuidado',
          language === 'en' ? 'No request has been assigned to this employee' : 'No ha sido asignada ninguna solicitud a este empleado'
        );
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      notification.error(
        'Error',
        'Error al cargar los datos. Por favor, intente nuevamente.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch data from API
  useEffect(() => {
    fetchData();
  }, []);

  const toggleFilters = () => {
    setFiltersVisible(!filtersVisible);
  };
  
  // Search function
  const handleSearch = (field, value) => {
    setSearchTerm(value);
    applyFiltersAndSearch(value, activeFilters);
  };
  
  // Filter function
  const handleApplyFilters = (filters) => {
    setActiveFilters(filters);
    applyFiltersAndSearch(searchTerm, filters);
    setFiltersVisible(false);
  };
  
  const applyFiltersAndSearch = (search, filters) => {
    let result = originalData;

    // Apply search if there's a search term
    if (search && search.trim() !== '') {
      const lowercaseSearch = search.toLowerCase();
      if (result.data) {
        result = {
          ...result,
          data: result.data.filter(record =>
            record.solicitud.idSolicitud.toString().includes(lowercaseSearch) ||
            `${record.ciudadano.nombres} ${record.ciudadano.apellidos}`.toLowerCase().includes(lowercaseSearch) ||
            record.vehiculo.chasis.toLowerCase().includes(lowercaseSearch)
          )
        };
      }
    }

    // Apply filters
    if (result.data) {
      let filteredResults = result.data;
      console.log('Filtered Results:', filters);
      console.log('Original Data:', filteredResults);
      if (filters.brand && filters.brand !== 'all') {
        filteredResults = filteredResults.filter(
          record => record.vehiculo.marca.nombre === filters.brand
        );
      }

      if (filters.model && filters.model !== 'all') {
        filteredResults = filteredResults.filter(
          record => record.vehiculo.modelo.nombre === filters.model
        );
      }

      if (filters.status && filters.status !== 'all') {
        filteredResults = filteredResults.filter(
          record => record.solicitud.estadoDecision === filters.status
        );
      }

      if (filters.dateRange && filters.dateRange[0] && filters.dateRange[1]) {
        const startDate = filters.dateRange[0].startOf('day');
        const endDate = filters.dateRange[1].endOf('day');
        
        filteredResults = filteredResults.filter(record => {
          const recordDate = new Date(record.solicitud.fechaRegistro);
          return recordDate >= startDate.toDate() && recordDate <= endDate.toDate();
        });
      }

      // Check if no results were found
      if (filteredResults.length < 1) {
        notification.info(
          language === 'es' ? 'No se encontraron resultados' : 'No results found',
          language === 'es' ? 'Intenta con otros filtros' : 'Try other filters'
        );
      }

      result = { ...result, data: filteredResults };
    }

    setFilteredData(result);
  };

  // Handler functions for the table actions
  const handleView = (record) => {
    console.log('View details for:', record);
  };

  const handleReview = (record) => {
    console.log('Review application:', record);
  };

  const handleCarnet = (record) => {
    console.log('Generate card for:', record);
  };

  const handleTableReady = (columns) => {
    tableColumnsRef.current = columns;
  };

  const handleExportPDF = async () => {
    try {
      if (!tableColumnsRef.current || tableColumnsRef.current.length === 0) {
        notification.warning({
          message: language === 'es' ? 'Advertencia' : 'Warning',
          description: language === 'es' 
            ? 'No hay datos disponibles para exportar'
            : 'No data available to export'
        });
        return;
      }
  
      if (!filteredData.data || filteredData.data.length === 0) {
        notification.warning({
          message: language === 'es' ? 'Advertencia' : 'Warning',
          description: language === 'es'
            ? 'No hay registros para exportar'
            : 'No records to export'
        });
        return;
      }
  
      // Generate subtitle based on active filters
      const subtitleParts = [];
  
      if (activeFilters.brand && activeFilters.brand !== 'all') {
        const brand = filteredData.data.find(record => 
          record.vehiculo.marca.id === activeFilters.brand
        )?.vehiculo.marca.nombre;
        if (brand) subtitleParts.push(`Marca: ${brand}`);
      }
  
      if (activeFilters.model && activeFilters.model !== 'all') {
        const model = filteredData.data.find(record => 
          record.vehiculo.modelo.id === activeFilters.model
        )?.vehiculo.modelo.nombre;
        if (model) subtitleParts.push(`Modelo: ${model}`);
      }
  
      if (activeFilters.status && activeFilters.status !== 'all') {
        const status = statuses.find(s => s.id === activeFilters.status)?.name;
        if (status) subtitleParts.push(`Estado: ${status}`);
      }
  
      if (activeFilters.dateRange?.[0] && activeFilters.dateRange?.[1]) {
        const startDate = activeFilters.dateRange[0].format('DD/MM/YYYY');
        const endDate = activeFilters.dateRange[1].format('DD/MM/YYYY');
        subtitleParts.push(`Período: ${startDate} - ${endDate}`);
      }
  
      // Transform the data before passing it to exportTableToPdf
      const transformedData = filteredData.data.map(record => ({
        id: record.solicitud.idSolicitud,
        ciudadano: `${record.ciudadano.nombres} ${record.ciudadano.apellidos}`,
        fechaSolicitud: new Date(record.solicitud.fechaRegistro).toLocaleDateString('es-ES'),
        marca: record.vehiculo.marca.nombre,
        modelo: record.vehiculo.modelo.nombre,
        chasis: record.vehiculo.chasis,
        estado: record.solicitud.estadoDecision,
        fechaDecision: record.solicitud.fechaDecision 
          ? new Date(record.solicitud.fechaDecision).toLocaleDateString('es-ES')
          : 'Pendiente'
      }));
  
      await exportTableToPdf({
        columns: tableColumnsRef.current,
        data: transformedData, // Pass the transformed data directly
        fileName: language === 'es' ? 'registro-motocicletas' : 'motorcycle-registry',
        title: language === 'es' ? 'Registro de Motocicletas' : 'Motorcycle Registry',
        subtitle: subtitleParts.join(' | '),
        notificationSystem: notification
      });
  
    } catch (error) {
      console.error('Export error:', error);
      notification.error({
        message: language === 'es' ? 'Error' : 'Error',
        description: language === 'es'
          ? 'Error al generar el PDF. Por favor, intente nuevamente.'
          : 'Error generating PDF. Please try again.'
      });
    }
  };
  

  const handleRefreshData = async () => {
    try {
      await fetchData();
    } catch (error) {
      console.error('Error refreshing data:', error);
      notification.error(
        language === 'en' ? 'Error' : 'Error',
        language === 'en' 
          ? 'Error refreshing data. Please try again.' 
          : 'Error al actualizar los datos. Por favor, intente nuevamente.'
      );
    }
  };

  return (
    <ResponsiveContainer>
      <Row gutter={[16, 24]} className="dashboard-row">
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <SectionContainer>
            <FilterBar
              onFilterClick={toggleFilters}
              onSearch={handleSearch}
              onExportPDF={handleExportPDF}
              searchPlaceholder={language === 'es' ? 'Buscar solicitud...' : 'Search request...'}
            />
            
            <GestionFilter 
              isVisible={filtersVisible}
              onClose={() => setFiltersVisible(false)}
              onApplyFilters={handleApplyFilters}
              statuses={statuses}
            />
            
            <Spin spinning={isLoading} tip={language === 'es' ? "Cargando datos..." : "Loading data..."}>
              <GestionTable
                registrosData={filteredData.data || []}
                onView={handleView}
                onReview={handleReview}
                onCarnet={handleCarnet}
                onTableReady={handleTableReady}
                onRefresh={handleRefreshData}
              />
            </Spin>
          </SectionContainer>
        </Col>
      </Row>
    </ResponsiveContainer>
  );
}

export default EmpleadoGestion;