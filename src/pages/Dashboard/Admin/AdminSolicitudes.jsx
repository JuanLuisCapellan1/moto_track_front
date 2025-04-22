import React, { useState, useEffect, useRef } from 'react';
import { Row, Col, Spin } from 'antd';
import styled from 'styled-components';
import SolicitudesMetricsCards from '../../../components/Dashboard/AdminComponents/GestionDeSolicitudes/SolicitudesMetricsCards';
import FilterBar from '../../../components/Dashboard/CommonComponts/Filterbar';
import GestionFilter from '../../../components/Dashboard/AdminComponents/GestionDeSolicitudes/GestionFilter';
import GestionTable from '../../../components/Dashboard/AdminComponents/GestionDeSolicitudes/GestionTable';
import { exportTableToPdf } from '../../../components/Dashboard/CommonComponts/ExportTablePdf';
import { useTheme } from '../../../context/ThemeContext';
import { useLanguage } from '../../../context/LanguageContext';
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

function AdminSolicitudes() {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilters, setActiveFilters] = useState({
    brand: 'all',
    model: 'all',
    status: 'all',
    employee: ['all'],
    dateRange: null
  });
  const [isLoading, setIsLoading] = useState(true);
  const [refreshMetricsTrigger, setRefreshMetricsTrigger] = useState(0);
  const [employeeData, setEmployeeData] = useState([]);

  const api_url = import.meta.env.VITE_API_URL;
  const { getAccessToken } = useAuth();
  const notification = useNotification();
  const tableColumnsRef = useRef([]);

  // Fetch data from API
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${api_url}/api/solicitud/admin/todas?vista=completo`, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`
        }
      });
      
      if (response.data.success) {
        setFilteredData(response.data);
        setOriginalData(response.data);
        setRefreshMetricsTrigger(prev => prev + 1);
      } else {
        notification.error(
          language === 'en' ? 'Error' : 'Error',
          language === 'en' ? 'Error loading requests' : 'Error al cargar las solicitudes'
        );
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      notification.error({
        message: language === 'es' ? 'Error' : 'Error',
        description: language === 'es' 
          ? 'Error al cargar los datos. Por favor, intente nuevamente.' 
          : 'Error loading data. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`${api_url}/api/availableEmployees`, {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
          },
        });
        if (response.data.success === true) {
          const empleadosData = response.data;
          setEmployeeData(empleadosData.data);
        }
      } catch (error) {
        console.error('Error fetching employees:', error);
        notification.error({
          message: language === 'es' ? 'Error' : 'Error',
          description: language === 'es' 
            ? 'Error al obtener empleados' 
            : 'Error fetching employees'
        });
      }
    };
    fetchEmployee();
  }, []);

  const toggleFilters = () => {
    setFiltersVisible(!filtersVisible);
  };

  const handleSearch = (field, value) => {
    setSearchTerm(value);
    applyFiltersAndSearch(value, activeFilters);
  };

  const handleApplyFilters = (filters) => {
    setActiveFilters(filters);
    applyFiltersAndSearch(searchTerm, filters);
    setFiltersVisible(false);
  };

  const applyFiltersAndSearch = (search, filters) => {
    let result = { ...originalData }; // Copia la estructura completa
    let filteredResults = [...originalData.data]; // Trabaja con los datos
  
    // Aplicar búsqueda
    if (search && search.trim() !== '') {
      const lowercaseSearch = search.toLowerCase();
      filteredResults = filteredResults.filter(record =>
        record.solicitud.idSolicitud.toString().includes(lowercaseSearch) ||
        `${record.ciudadano.nombres} ${record.ciudadano.apellidos}`.toLowerCase().includes(lowercaseSearch) ||
        record.vehiculo.chasis.toLowerCase().includes(lowercaseSearch)
      );
    }
  
    // Aplicar filtros
    if (filters.brand && filters.brand !== 'all') {
      filteredResults = filteredResults.filter(
        record => record.vehiculo.marca.idMarca === filters.brand
      );
    }
  
    if (filters.model && filters.model !== 'all') {
      filteredResults = filteredResults.filter(
        record => record.vehiculo.modelo.idModelo === filters.model
      );
    }
  
    if (filters.status && filters.status !== 'all') {
      filteredResults = filteredResults.filter(
        record => record.solicitud.estadoDecision === filters.status
      );
    }
  
    if (filters.employee && Array.isArray(filters.employee) && !filters.employee.includes('all')) {
      filteredResults = filteredResults.filter(record =>
        filters.employee.includes(record.empleado?.idPersona?.toString())
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
  
    // Actualizar filteredData manteniendo la estructura
    setFilteredData({
      ...result,
      data: filteredResults
    });
  };

  const handleView = (record) => {
    // Handle view logic
  };

  const handleAssign = async (record, assignedEmployee) => {
    try {
      const response = await axios.put(`${api_url}/api/solicitud/asignar`, {
        idSolicitud: record.solicitud.idSolicitud,
        idEmpleado: assignedEmployee.id
      }, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`
        }
      });

      if (response.data.success) {
        await fetchData(); // Espera a que se complete fetchData
        
        // Usa el hook useNotification correctamente
        notification.success(language === 'es' ? 'Exito' : 'Success',
          language === 'es' ? 'La solicitud ha sido asignada al empleado correctamente' : 'The request has been successfully assigned to the employee',
          language === 'es' 
            ? 'La solicitud ha sido asignada al empleado correctamente' 
            : 'The request has been successfully assigned to the employee'
        );
      }
    } catch (error) {
      console.error('Error while updating employee assigned to solicitude:', error);
      
      // Maneja el error correctamente
      notification.error({
        message: language === 'es' ? 'Error' : 'Error',
        description: language === 'es'
          ? 'Error al asignar el empleado' 
          : 'Error assigning employee'
      });
    }
  };

  const handleTableReady = (columns) => {
    tableColumnsRef.current = columns;
  };

  const handleRefreshData = async () => {
    await fetchData();
  };

  const handleExportPDF = async () => {
    try {
      // Verifica si hay datos para exportar
      if (!tableColumnsRef.current || !filteredData?.data?.length) {
        notification.warning({
          message: language === 'es' ? 'Advertencia' : 'Warning',
          description: language === 'es'
            ? 'No hay datos para exportar'
            : 'No data to export'
        });
        return;
      }

      const subtitleParts = [];
      
      // Add filter information to subtitle
      if (activeFilters.brand && activeFilters.brand !== 'all') {
        const brand = filteredData.data.find(record => 
          record.vehiculo.marca.idMarca === activeFilters.brand
        )?.vehiculo.marca.nombre;
        if (brand) subtitleParts.push(`Marca: ${brand}`);
      }

      // Transform the filtered data
      const transformedData = {
        data: filteredData.data.map(record => ({
          id: record.solicitud.idSolicitud,
          ciudadano: `${record.ciudadano.nombres} ${record.ciudadano.apellidos}`,
          fechaSolicitud: new Date(record.solicitud.fechaRegistro).toLocaleDateString('es-ES'),
          marca: record.vehiculo.marca.nombre,
          modelo: record.vehiculo.modelo.nombre,
          chasis: record.vehiculo.chasis,
          estado: record.solicitud.estadoDecision,
          empleado: record.empleado 
            ? `${record.empleado.nombres} ${record.empleado.apellidos}`
            : 'No asignado'
        }))
      };

      await exportTableToPdf({
        columns: tableColumnsRef.current,
        data: transformedData, // Pasamos el objeto con la estructura correcta
        fileName: language === 'es' ? 'solicitudes-admin' : 'admin-requests',
        title: language === 'es' ? 'Gestión de Solicitudes' : 'Request Management',
        subtitle: subtitleParts.join(' | '),
        notificationSystem: notification
      });

    } catch (error) {
      console.error('Export error:', error);
      notification.error({
        message: language === 'es' ? 'Error' : 'Error',
        description: language === 'es'
          ? 'Error al generar el PDF'
          : 'Error generating PDF'
      });
    }
  };

  const refreshData = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      if (solicitudesData && solicitudesData.length > 0) {
        setData([...solicitudesData]);
      }
      handleModalClose();
      notification.success({
        message: language === 'es' ? 'Actualizado' : 'Updated',
        description: language === 'es' 
          ? 'Los datos han sido actualizados correctamente' 
          : 'The data has been updated successfully'
      });
    } catch (error) {
      console.error('Error refreshing data:', error);
      notification.error({
        message: language === 'es' ? 'Error' : 'Error',
        description: language === 'es' 
          ? 'Ocurrió un error al actualizar los datos' 
          : 'An error occurred while updating the data'
      });
    }
  };

  return (
    <ResponsiveContainer>
      <Row gutter={[16, 24]} className="dashboard-row">
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <SolicitudesMetricsCards refreshTrigger={refreshMetricsTrigger} />
        </Col>
      </Row>
      
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
              statuses={[{id: 1, name: 'Aprobada'}, {id: 2, name: 'Rechazada'}, {id: 3, name: 'Pendiente'}]}
            />
            
            <Spin spinning={isLoading} tip={language === 'es' ? "Cargando datos..." : "Loading data..."}>
              <GestionTable
                solicitudesData={filteredData.data || []}
                onView={handleView}
                onAssign={handleAssign}
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

export default AdminSolicitudes;