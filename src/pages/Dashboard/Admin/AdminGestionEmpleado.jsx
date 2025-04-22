import React, { useState, useEffect, useRef } from 'react';
import { Row, Col, Spin } from 'antd'; // Importa Spin
import EmpleadosMetricsCards from '../../../components/Dashboard/AdminComponents/GestionDeEmpleados/EmpleadosMetricsCards';
import FilterBar from '../../../components/Dashboard/CommonComponts/Filterbar';
import GestionFilter from '../../../components/Dashboard/AdminComponents/GestionDeEmpleados/GestionFilter';
import GestionTable from '../../../components/Dashboard/AdminComponents/GestionDeEmpleados/GestionTable';
import { exportTableToPdf } from '../../../components/Dashboard/CommonComponts/ExportTablePdf';
import { useTheme } from '../../../context/ThemeContext';
import { useLanguage } from '../../../context/LanguageContext';
import { useNotification } from '../../../components/Dashboard/CommonComponts/ToastNotifications';
import { usePrimaryColor } from '../../../context/PrimaryColorContext';
import styled from 'styled-components';
import CrearEditarEmpleado from '../../../components/Dashboard/AdminComponents/GestionDeEmpleados/Crear&EditarEmpleado';
import axios from 'axios';
import { useAuth } from '../../../context/AuthContext';
import { data } from 'react-router-dom';

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

function AdminGestionEmpleado() {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const { primaryColor } = usePrimaryColor();
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilters, setActiveFilters] = useState({
    cedula: '',
    cargo: 'all',
    status: 'all'
  });
  const [showCreateEditModal, setShowCreateEditModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const { getAccessToken } = useAuth();
  const [loading, setLoading] = useState(true); // Estado para el spinner
  const [employees, setEmployees] = useState(null);
  const notification = useNotification();
  const tableColumnsRef = useRef([]);
  
  const fetchDataEmployee = async () => {
    try {
      setLoading(true); // Mostrar spinner
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/adminEmployees`, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        }
      });
      if (response?.success === false) {
        notification.error(
          language === 'es' ? 'Error' : 'Error',
          language === 'es' ? 'Error al cargar los empleados' : 'Error loading employees'
        );
        return;
      }
      setFilteredData(response?.data);
      setOriginalData(response?.data); // Guardar datos originales
    } catch (error) {
      console.error('Error fetching employee data:', error);
      notification.error(
        language === 'es' ? 'Error' : 'Error',
        language === 'es' ? 'Error al cargar los empleados' : 'Error loading employees'
      );
    } finally {
      setLoading(false); // Ocultar spinner
    }
  };

  const fetchEmployees = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/statistics/dashboard?=vista=empleados`, {
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
  
  // Initialize with employee data
  useEffect(() => {
    fetchDataEmployee();
    fetchEmployees();
  }, []);

  // Extract unique roles and statuses for filters
  const cargos = [
    { id: 'Administrador', name: language === 'es' ? 'Administrador' : 'Administrator' },
    { id: 'Empleado', name: language === 'es' ? 'Empleado' : 'Employee' },
    { id: 'Agente de Registro y Verificación Vehicular', name: language === 'es' ? 'Agente de Registro y Verificación Vehicular' : 'Vehicle Registration and Verification Agent' },
    { id: 'Analista de Monitoreo y Control', name: language === 'es' ? 'Analista de Monitoreo y Control' : 'Monitoring and Control Analyst' },
    { id: 'Supervisor', name: language === 'es' ? 'Supervisor' : 'Supervisor' }
  ];
  
  const statuses = [
    { id: 'activo', name: language === 'es' ? 'Activo' : 'Active' },
    { id: 'deshabilitado', name: language === 'es' ? 'Deshabilitado' : 'Disabled' },
    { id: 'inactivo', name: language === 'es' ? 'Inactivo' : 'Inactive'}
  ];
  
  const toggleFilters = () => {
    setFiltersVisible(!filtersVisible);
  };

  const handleSearch = (field, value) => {
    setSearchTerm(value);
    applyFiltersAndSearch(value, activeFilters); // Aplica los filtros con cada cambio en el campo de búsqueda
  };

  const handleApplyFilters = (filters) => {
    setActiveFilters(filters);
    applyFiltersAndSearch(searchTerm, filters);
    setFiltersVisible(false);
  };

  const applyFiltersAndSearch = (search, filters) => {
    let result = [...originalData.data]; // Create a copy of the original data array

    if (filters.cedula && filters.cedula.trim() !== '') {
      const lowercaseCedula = filters.cedula;
      result = result.filter(employee =>
        employee?.datosPersonales?.cedula && employee.datosPersonales.cedula.includes(lowercaseCedula)
      );
    }

    if (filters.cargo && filters.cargo !== 'all') {
      result = result.filter(employee => 
        employee?.datosPersonales?.tipoPersona?.nombre === filters.cargo
      );
    }

    if (filters.status && filters.status !== 'all') {
      result = result.filter(employee => employee.estado === filters.status);
    }

    if (search && search.trim() !== '') {
      const lowercaseSearch = search.toLowerCase();
      result = result.filter(employee =>
        `${employee.nombres} ${employee.apellidos}`.toLowerCase().includes(lowercaseSearch) ||
        (employee?.datosPersonales?.cedula && 
         employee.datosPersonales.cedula.toLowerCase().includes(lowercaseSearch))
      );
    }

    if (result.length < 1) {
      notification.info(
        language === 'es' ? 'No se encontraron resultados' : 'No results found',
        language === 'es' ? 'Intenta con otros filtros' : 'Try other filters'
      );
    }

    // Update filteredData with the new structure
    setFilteredData({ data: result });
  };

  // Handler functions for the table actions
  const handleView = (record) => {
    notification.info(
      language === 'es' ? 'Ver Empleado' : 'View Employee',
      `ID: ${record.id} - ${record.nombres} ${record.apellidos}`
    );
  };

  const handleEdit = (record) => {
    setSelectedEmployee(record);
    setShowCreateEditModal(true);
  };

  const handleDelete = async (record) => {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_API_URL}/api/user`, {
        data: { idUsuario: record.id },
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      });

      if (response?.data?.success) {
        notification.success(
          language === 'es' ? 'Empleado eliminado' : 'Employee deleted',
          language === 'es' ? 'El empleado ha sido eliminado exitosamente' : 'The employee has been successfully deleted'
        );
        await fetchDataEmployee(); 
      } else {
      notification.error(
        language === 'es' ? 'Error' : 'Error',
        language === 'es' ? 'No se pudo eliminar el empleado' : 'Failed to delete the employee'
      );
      }
    } catch (error) {
      console.error('Error deleting employee:', error);
      notification.error(
      language === 'es' ? 'Error' : 'Error',
      language === 'es' ? 'Ocurrió un error al eliminar el empleado' : 'An error occurred while deleting the employee'
      );
    }
  };

  const handleActivate = (record) => {
    // Activate employee
    const updatedData = filteredData.map(item => 
      item.id === record.id ? { ...item, estado: 'ACTIVO' } : item
    );
    setFilteredData(updatedData);
  };

  const handleDeactivate = (record) => {
    // Deactivate employee
    const updatedData = filteredData.map(item => 
      item.id === record.id ? { ...item, estado: 'INACTIVO' } : item
    );
    setFilteredData(updatedData);
  };

  const handleAddEmployee = () => {
    setSelectedEmployee(null); // Ensure no employee is selected
    setShowCreateEditModal(true);
  };

  const handleTableReady = (columns) => {
    tableColumnsRef.current = columns;
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

      // Asegúrate de pasar solo los datos filtrados, no el objeto completo
      await exportTableToPdf({
        columns: tableColumnsRef.current,
        data: { data: filteredData.data }, // Envuelve los datos en un objeto con propiedad data
        fileName: language === 'es' ? 'empleados' : 'employees',
        title: language === 'es' ? 'Lista de Empleados' : 'Employee List',
        notificationSystem: notification,
        exportEmployees: true
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

  const handleCloseModal = async () => {
    setShowCreateEditModal(false);
    setSelectedEmployee(null);
    await fetchDataEmployee(); // Refresh data after closing modal
  };

  return (
    <Spin spinning={loading} tip="Cargando empleados..."> {/* Spinner envuelve todo el contenido */}
      <ResponsiveContainer>
        <Row gutter={[16, 24]} className="dashboard-row">
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <SectionContainer>
              <EmpleadosMetricsCards data={employees} /> 
            </SectionContainer>
          </Col>
        </Row>
        
        <Row gutter={[16, 24]} className="dashboard-row">
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <SectionContainer>
              <FilterBar 
                onFilterClick={toggleFilters}
                onSearch={handleSearch}
                onExportPDF={handleExportPDF}
                showAddButton={true}
                onAddClick={handleAddEmployee}
                searchPlaceholder={language === 'es' ? 'Buscar empleado...' : 'Search employee...'}
              />
              
              <GestionFilter 
                isVisible={filtersVisible}
                onClose={() => setFiltersVisible(false)}
                onApplyFilters={handleApplyFilters}
                cargos={cargos}
                statuses={statuses}
              />
              
              <GestionTable 
                empleadosData={filteredData}
                onView={handleView}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onActivate={handleActivate}
                onDeactivate={handleDeactivate}
                onTableReady={handleTableReady}
              />
            </SectionContainer>
          </Col>
        </Row>

        <CrearEditarEmpleado
          visible={showCreateEditModal}
          onClose={handleCloseModal}
          empleadoData={selectedEmployee}
          isEditing={!!selectedEmployee}
        />
      </ResponsiveContainer>
    </Spin>
  );
}

export default AdminGestionEmpleado;