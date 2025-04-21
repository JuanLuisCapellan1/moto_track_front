import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Table, Space, Tooltip, Select } from 'antd';
import { 
  EyeOutlined, 
  UserSwitchOutlined,
  FileOutlined,
  DownloadOutlined
} from '@ant-design/icons';
import styled, { createGlobalStyle } from 'styled-components';
import { REGISTRO_STATUS } from '../../../../data/registrosData';
import { empleadosData } from '../../../../data/empleadosData';
import StatusTag, { MOTO_STATUS } from '../../CommonComponts/StatusTag';
import MainButton from '../../CommonComponts/MainButton';
import SecondaryButton from '../../CommonComponts/SecondaryButton';
import Modal from '../../CommonComponts/Modals';
import { usePrimaryColor } from '../../../../context/PrimaryColorContext';
import { useLanguage } from '../../../../context/LanguageContext';
import { useTheme } from '../../../../context/ThemeContext';
import ModalRevisionRegistro from './VerDetalles/ModalRevisionRegistro';
import DescargarCarnet from '../../CommonComponts/DescargarCarnet';
import { formatDate } from '../../../../utils/dateUtils';
import { useNotification } from '../../CommonComponts/ToastNotifications';
import { useAuth } from '../../../../context/AuthContext';
import axios from 'axios';
const { Option } = Select;

// Helper function to convert hex to rgba
const hexToRgba = (hex, alpha = 1) => {
  if (!hex) return `rgba(0, 0, 0, ${alpha})`;
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

// Container styled like FilterSection
const TableContainer = styled.div`
  background: ${props => props.theme?.token?.contentBg || '#fff'};
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  padding: 24px;
  margin-bottom: 24px;
  border: 1px solid ${props => props.theme.token.titleColor}25;
  position: relative;
  overflow: hidden;
`;

// Actualizar el estilo del TableTitle para que se vea bien fuera del contenedor
const TableTitle = styled.div`
  margin-bottom: 16px;
  
  h3 {
    font-size: 20px;
    font-weight: 500;
    margin: 0;
    color: ${props => props.theme?.token?.titleColor || '#000000'};
  }
`;

const StyledTable = styled(Table)`
  .ant-table-thead > tr > th {
    background-color: ${props => hexToRgba(props.$primaryColor, 0.75)};
    color: ${props => props.theme?.token?.titleColor || '#000000'};
    font-weight: 600;
    border-right: none;
    transition: background-color 0.3s ease, border-bottom 0.3s ease;
  }
  
  .ant-table-thead > tr > th:hover {
    // Increased opacity for hover state
    background-color: ${props => hexToRgba(props.$primaryColor, 0.85)} !important;
  }
  
  // Stronger background for sorted headers
  .ant-table-thead > tr > th.ant-table-column-sort {
    background-color: ${props => hexToRgba(props.$primaryColor, 0.85)};
    border-bottom: 2px solid ${props => props.$primaryColor} !important;
  }
  
  // Filter active state
  .ant-table-thead > tr > th.ant-table-column-has-actions.ant-table-column-has-filters.ant-table-filter-active {
    background-color: ${props => hexToRgba(props.$primaryColor, 0.85)};
    border-bottom: 2px solid ${props => props.$primaryColor} !important;
  }
  
  // Row hover effects - kept lighter for contrast
  .ant-table-tbody > tr:hover > td {
    background-color: ${props => hexToRgba(props.$primaryColor, 0.15)};
    transition: all 0.3s ease;
  }
  
  .ant-table-tbody > tr:hover {
    box-shadow: 0 0 8px ${props => hexToRgba(props.$primaryColor, 0.3)};
  }
  
  // Add left border indicator on hover
  .ant-table-tbody > tr:hover > td:first-child {
    border-left: 3px solid ${props => props.$primaryColor};
  }
  
  // Slightly darken text on hover for emphasis
  .ant-table-tbody > tr:hover > td {
    font-weight: 500;
  }
  
  .ant-table-tbody > tr.ant-table-row:hover {
    cursor: pointer;
  }
  
  // Improve text contrast in dark mode
  .ant-table-tbody > tr > td {
    color: ${props => props.theme?.token?.titleColor || 'inherit'};
  }
  
  // Fix pagination text color in dark mode
  .ant-pagination-item-link, .ant-pagination-item a {
    color: ${props => props.theme?.token?.titleColor || 'inherit'};
  }
  
  // Fix dropdown text in dark mode (for filters)
  .ant-dropdown-menu-item {
    color: ${props => props.theme?.token?.titleColor || 'inherit'};
  }
`;

// Update the ButtonContainer to handle the full-width case better
const ButtonContainer = styled(Space)`
  display: flex;
  justify-content: center;
  gap: 8px;
  width: 100%;
  
  button {
    min-width: 90px;
  }
`;

// Make the full width secondary button
const FullWidthSecondaryButton = styled(SecondaryButton)`
  width: calc(180px + 8px); /* Two buttons (90px each) + the gap */
  justify-content: center;
`;

// Estilos para el contenido del modal de asignación
const AssignModalContent = styled.div`
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  gap: 24px;
  
  h3 {
    font-size: 18px;
    font-weight: 500;
    margin: 0;
    // Use theme's title color for heading
    color: ${props => props.theme?.token?.titleColor || '#000000'};
    margin-bottom: 8px;
    text-align: center;
  }
  
  p {
    font-size: 14px;
    margin-bottom: 16px;
    // Use theme's text color for paragraph
    color: ${props => props.theme?.token?.textColor || '#666666'};
  }
  
  .select-container {
    margin-top: 8px;
  }
  
  .select-employee {
    width: 100%;
    
    // Style the Select component for dark mode
    &.ant-select {
      .ant-select-selector {
        background-color: ${props => props.theme?.token?.contentBg};
        border-color: ${props => props.theme?.token?.titleColor}25;
        color: ${props => props.theme?.token?.titleColor};
      }
      
      .ant-select-arrow {
        color: ${props => props.theme?.token?.titleColor};
      }

      .ant-select-selection-placeholder {
        color: ${props => props.theme?.token?.titleColor}88;
      }
    }
  }
  
  .buttons-container {
    display: flex;
    justify-content: center;
    gap: 12px;
    margin-top: 16px;
  }

  // Add styles for Select dropdown
  .ant-select-dropdown {
    background-color: ${props => props.theme?.token?.contentBg || '#FFFFFF'};
    
    .ant-select-item {
      color: ${props => props.theme?.token?.textColor || '#000000'};
      
      &:hover {
        background-color: ${props => props.theme?.token?.hoverBg || '#f5f5f5'};
      }
      
      &-selected {
        background-color: ${props => props.theme?.token?.primaryColor}15;
        color: ${props => props.theme?.token?.primaryColor};
      }
    }
  }

  // Estilos específicos para el dropdown en modo oscuro
  :global(.custom-dark-select-dropdown) {
    background-color: ${props => props.theme?.token?.contentBg || '#FFFFFF'} !important;
    
    .ant-select-item {
      color: ${props => props.theme?.token?.textColor || '#000000'} !important;
      background-color: ${props => props.theme?.token?.contentBg || '#FFFFFF'} !important;

      &:hover {
        background-color: ${props => `${props.theme?.token?.primaryColor}15` || '#f5f5f5'} !important;
      }

      &.ant-select-item-option-selected {
        background-color: ${props => `${props.theme?.token?.primaryColor}30` || '#f5f5f5'} !important;
        color: ${props => props.theme?.token?.primaryColor || '#000000'} !important;
      }
    }
  }
`;

// Update the GlobalStyle component with better dropdown styling
const GlobalStyle = createGlobalStyle`
  .custom-dark-select-dropdown {
    .ant-select-dropdown {
      background-color: ${props => props.theme?.token?.contentBg} !important;
      border: 1px solid ${props => props.theme?.token?.titleColor}25 !important;
      
      .ant-select-item {
        color: ${props => props.theme?.token?.titleColor} !important;

        &:hover {
          background-color: ${props => props.theme?.currentTheme === 'themeDark' 
            ? 'rgba(255, 255, 255, 0.1)' 
            : 'rgba(0, 0, 0, 0.05)'} !important;
        }

        &.ant-select-item-option-selected {
          background-color: ${props => props.theme?.token?.colorPrimary}20 !important;
          color: ${props => props.theme?.token?.colorPrimary} !important;
        }

        &.ant-select-item-option-active {
          background-color: ${props => props.theme?.currentTheme === 'themeDark'
            ? 'rgba(255, 255, 255, 0.15)'
            : 'rgba(0, 0, 0, 0.08)'} !important;
        }
      }
    }
  }
`;

function GestionTable({ solicitudesData = [], onView, onAssign, onTableReady, onRefresh }) {
  const { primaryColor } = usePrimaryColor();
  const { language } = useLanguage();
  const theme = useTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [assignModalVisible, setAssignModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [employeeData, setEmployeeData] = useState(null);
  const [isReviewMode, setIsReviewMode] = useState(false);
  const [data, setData] = useState([]);
  const notification = useNotification();

  const api_url = import.meta.env.VITE_API_URL;
  const { getAccessToken } = useAuth();

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

  useEffect(() => {
    if (Array.isArray(solicitudesData)) {
      setData(solicitudesData);
    }
  }, [solicitudesData]);

  // Agrega este useEffect para manejar el valor inicial
  useEffect(() => {
    if (assignModalVisible && selectedRecord?.empleado) {
      setSelectedEmployee(selectedRecord.empleado);
    }
  }, [assignModalVisible, selectedRecord]);

  // Create a lighter shade for gradient
  const getPrimaryColorLight = (hexColor) => {
    const hex = hexColor.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    
    // Make lighter variant
    const lighterR = Math.min(255, r + 40);
    const lighterG = Math.min(255, g + 40);
    const lighterB = Math.min(255, b + 40);
    
    return `#${lighterR.toString(16).padStart(2, '0')}${lighterG.toString(16).padStart(2, '0')}${lighterB.toString(16).padStart(2, '0')}`;
  };
  
  const primaryColorLight = getPrimaryColorLight(primaryColor);

  // Format date to a readable format for table display
  const formatTableDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === 'es' ? 'es-ES' : 'en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  // Map REGISTRO_STATUS to MOTO_STATUS for StatusTag
  const mapStatusToMotoStatus = (status) => {
    switch (status) {
      case 'Aprobada':
        return MOTO_STATUS.APROBADA;
      case 'Pendiente':
        return MOTO_STATUS.PENDIENTE;
      case 'Rechazada':
        return MOTO_STATUS.RECHAZADA;
      default:
        return MOTO_STATUS.PENDIENTE;
    }
  };

  // Table column translations
  const tableTranslations = {
    es: {
      id: 'ID',
      propietario: 'Propietario',
      marca: 'Marca',
      modelo: 'Modelo',
      fecha: 'Fecha',
      estado: 'Estado',
      asignado: 'Asignado a',
      acciones: 'Acciones',
      aprobado: 'Aprobado',
      pendiente: 'Pendiente',
      rechazado: 'Rechazado',
      ver: 'Ver',
      asignar: 'Asignar',
      reasignar: 'Reasignar',
      verDetalles: 'Ver detalles',
      asignarEmpleado: 'Asignar empleado',
      reasignarEmpleado: 'Reasignar empleado',
      gestionSolicitudes: 'Gestión de Solicitudes',
      rangoRegistros: (range, total) => `${range[0]}-${range[1]} de ${total} solicitudes`,
      seleccionarEmpleado: 'Seleccionar empleado',
      confirmar: 'Confirmar',
      cancelar: 'Cancelar',
      asignacionExitosa: 'Asignación exitosa',
      solicitudAsignada: 'La solicitud ha sido asignada correctamente.',
      descargarCarnet: 'Carnet',
      revisar: 'Revisar',
    },
    en: {
      id: 'ID',
      propietario: 'Owner',
      marca: 'Brand',
      modelo: 'Model',
      fecha: 'Date',
      estado: 'Status',
      asignado: 'Assigned to',
      acciones: 'Actions',
      aprobado: 'Approved',
      pendiente: 'Pending',
      rechazado: 'Rejected',
      ver: 'View',
      asignar: 'Assign',
      reasignar: 'Reassign',
      verDetalles: 'View details',
      asignarEmpleado: 'Assign employee',
      reasignarEmpleado: 'Reassign employee',
      gestionSolicitudes: 'Request Management',
      rangoRegistros: (range, total) => `${range[0]}-${range[1]} of ${total} requests`,
      seleccionarEmpleado: 'Select employee',
      confirmar: 'Confirm',
      cancelar: 'Cancel',
      asignacionExitosa: 'Assignment successful',
      solicitudAsignada: 'The request has been successfully assigned.',
      descargarCarnet: 'Card',
      revisar: 'Review',
    }
  };

  const t = tableTranslations[language] || tableTranslations.es;

  // Handler functions for row actions
  const handleView = (record, reviewMode = false, showingModalInternally = true) => {    
    // Only show notification if NOT showing modal internally
    if (!showingModalInternally) {
      notification.info(
        language === 'en' ? 'Request details' : 'Detalles de solicitud',
        language === 'en' 
          ? `Viewing details for request #${record.id}` 
          : `Viendo detalles para solicitud #${record.id}`
      );
    }
    
    // Set state variables to show the modal
    setSelectedRecord(record);
    setIsReviewMode(reviewMode);
    setModalVisible(true);
  };

  const handleAssign = (record) => {
    setSelectedRecord(record);
    setSelectedEmployee(record);
    setAssignModalVisible(true);
  };

  // Actualiza la función confirmAssignment
const confirmAssignment = async () => {
  if (selectedEmployee && selectedRecord && onAssign) {
    // Asegúrate de que la estructura del empleado sea correcta
    const assignedEmployee = {
      id: selectedEmployee.idPersona, // Usa el ID directamente del empleado seleccionado
      nombres: selectedEmployee.nombres,
      apellidos: selectedEmployee.apellidos
    };
    
    onAssign(selectedRecord, assignedEmployee);
  }
  closeAssignModal();
};

  const closeAssignModal = () => {
    setAssignModalVisible(false);
    setSelectedRecord(null);
    setSelectedEmployee(null);
  };

  const handleModalClose = () => {
    setModalVisible(false);
    setSelectedRecord(null);
    setIsReviewMode(false);
    if (onRefresh) {
      onRefresh();
    }
  };

  // Add refreshData function
  const refreshData = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call
      
      // Update the data state with fresh data
      if (solicitudesData && solicitudesData.length > 0) {
        setData([...solicitudesData]);
      }
      
      // Close the modal
      handleModalClose();
      
      // Show success notification
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

  const columns = useMemo(() => [
    {
      title: t.id,
      dataIndex: ['solicitud', 'idSolicitud'],
      key: 'id',
      sorter: (a, b) => a.solicitud.idSolicitud - b.solicitud.idSolicitud,
      width: '5%',
    },
    {
      title: t.propietario,
      key: 'propietario',
      render: (_, record) => `${record.ciudadano.nombres} ${record.ciudadano.apellidos}`,
      sorter: (a, b) => `${a.ciudadano.nombres} ${a.ciudadano.apellidos}`
        .localeCompare(`${b.ciudadano.nombres} ${b.ciudadano.apellidos}`),
      width: '20%',
    },
    {
      title: t.marca,
      dataIndex: ['vehiculo', 'marca', 'nombre'],
      key: 'marca',
      sorter: (a, b) => a.vehiculo.marca.nombre.localeCompare(b.vehiculo.marca.nombre),
      width: '10%',
    },
    {
      title: t.modelo,
      dataIndex: ['vehiculo', 'modelo', 'nombre'],
      key: 'modelo',
      sorter: (a, b) => a.vehiculo.modelo.nombre.localeCompare(b.vehiculo.modelo.nombre),
      width: '10%',
    },
    {
      title: t.fecha,
      dataIndex: ['solicitud', 'fechaRegistro'],
      key: 'fecha',
      render: (text) => formatTableDate(text),
      sorter: (a, b) => new Date(a.solicitud.fechaRegistro) - new Date(b.solicitud.fechaRegistro),
      width: '12%',
    },
    {
      title: t.estado,
      dataIndex: ['solicitud', 'estadoDecision'],
      key: 'estado',
      render: (status) => <StatusTag status={mapStatusToMotoStatus(status)} />,
      filters: [
        { text: t.aprobado, value: 'Aprobada' },
        { text: t.pendiente, value: 'Pendiente' },
        { text: t.rechazado, value: 'Rechazada' },
      ],
      onFilter: (value, record) => record.solicitud.estadoDecision === value,
      width: '12%',
    },
    {
      title: t.asignado,
      dataIndex: 'empleado',
      key: 'empleado',
      render: (empleado) => empleado ? `${empleado.nombres} ${empleado.apellidos}` : "-",
      width: '15%',
    },
    {
      title: t.acciones,
      key: 'acciones',
      render: (_, record) => {
        const estado = record.solicitud.estadoDecision;
        
        // Para solicitudes pendientes
        if (estado === 'Pendiente') {
          return (
            <ButtonContainer>
              <Tooltip title={t.verDetalles}>
                <SecondaryButton onClick={() => handleView(record, false)}>
                  {t.ver}
                </SecondaryButton>
              </Tooltip>
              <Tooltip title={t.asignarEmpleado}>
                <MainButton onClick={() => handleAssign(record)} icon={<UserSwitchOutlined />}>
                  {t.asignar}
                </MainButton>
              </Tooltip>
            </ButtonContainer>
          );
        }
        
        // Para solicitudes aprobadas
        if (estado === 'Aprobada') {
          return (
            <ButtonContainer>
              <Tooltip title={t.verDetalles}>
                <SecondaryButton onClick={() => handleView(record, false)}>
                  {t.ver}
                </SecondaryButton>
              </Tooltip>
              <Tooltip title={t.descargarCarnet}>
                <DescargarCarnet
                  motorcycleData={{
                    placa: record.matricula?.matriculaGenerada,
                    propietario: `${record.ciudadano.nombres} ${record.ciudadano.apellidos}`,
                    modelo: `${record.vehiculo.marca.nombre} ${record.vehiculo.modelo.nombre} (${record.vehiculo.año})`,
                    chasis: record.vehiculo.chasis,
                    fechaEmision: record.matricula?.fechaEmision,
                    registro: record.solicitud.idSolicitud
                  }}
                  showPreview={false}
                >
                  <MainButton icon={<DownloadOutlined />}>
                    {t.descargarCarnet}
                  </MainButton>
                </DescargarCarnet>
              </Tooltip>
            </ButtonContainer>
          );
        }
        
        // Para solicitudes rechazadas
        return (
          <ButtonContainer>
            <Tooltip title={t.verDetalles}>
              <FullWidthSecondaryButton onClick={() => handleView(record, false)}>
                {t.verDetalles}
              </FullWidthSecondaryButton>
            </Tooltip>
          </ButtonContainer>
        );
      },
      width: '16%',
      align: 'center',
    },
  ], [t, language, handleView, handleAssign]);

  // Make a ref to keep track if we've already sent the columns
  const columnsSentRef = useRef(false);

  // Update the useEffect
  useEffect(() => {
    // Only send columns once to prevent loops
    if (onTableReady && columns && !columnsSentRef.current) {
      const columnsForExport = columns.filter(col => col.key !== 'acciones').map(col => ({...col}));
      onTableReady(columnsForExport);
      columnsSentRef.current = true; // Mark that we've sent the columns
    }
  }, [columns, onTableReady]);


  return (
    <>
      <GlobalStyle theme={theme} $primaryColor={primaryColor} />
      <TableTitle $primaryColor={primaryColor}>
        <h3>{t.gestionSolicitudes}</h3>
      </TableTitle>
      
      <TableContainer>
        <StyledTable
          $primaryColor={primaryColor}
          $primaryColorLight={primaryColorLight}
          columns={columns}
          dataSource={data}
          rowKey="id"
          pagination={{ 
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total, range) => t.rangoRegistros(range, total)
          }}
        />
        
        {selectedRecord && (
          <ModalRevisionRegistro
            visible={modalVisible}
            onClose={handleModalClose}
            data={selectedRecord}
            isReviewMode={isReviewMode}
            refreshData={refreshData}
            zIndex={9999}
          />
        )}

        <Modal
          show={assignModalVisible}
          onClose={closeAssignModal}
          width="450px"
          height="auto"
          mobileHeight="300px"
        >
          <AssignModalContent>
            <h3>{selectedRecord?.asignadoA ? t.reasignarEmpleado : t.asignarEmpleado}</h3>
            
            <div className="select-container">
              <p>{t.seleccionarEmpleado}:</p>
              <Select
                className="select-employee"
                placeholder={t.seleccionarEmpleado}
                onChange={(value) => {
                  // Encuentra el empleado seleccionado
                  const employee = employeeData?.find(emp => emp.datosPersonales.idPersona === value);
                  setSelectedEmployee(employee);
                }}
                style={{ width: '100%' }}
                popupClassName="custom-dark-select-dropdown"
                dropdownStyle={{
                  backgroundColor: theme?.token?.contentBg,
                }}
                value={selectedEmployee?.idPersona}
                defaultValue={selectedRecord?.empleado?.idPersona}
              >
                {employeeData && employeeData.map(employee => (
                  <Option 
                    key={employee.datosPersonales.idPersona} 
                    value={employee.datosPersonales.idPersona}
                  >
                    {`${employee.nombres} ${employee.apellidos}`}
                  </Option>
                ))}
              </Select>
            </div>
            
            <div className="buttons-container">
              <SecondaryButton onClick={closeAssignModal}>
                {t.cancelar}
              </SecondaryButton>
              <MainButton 
                onClick={confirmAssignment}
                disabled={!selectedEmployee}
              >
                {t.confirmar}
              </MainButton>
            </div>
          </AssignModalContent>
        </Modal>
      </TableContainer>
    </>
  );
}

export default GestionTable;