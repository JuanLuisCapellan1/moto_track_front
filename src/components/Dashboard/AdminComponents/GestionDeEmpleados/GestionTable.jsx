import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Table, Space, Tooltip, Tag } from 'antd';
import { 
  InfoCircleOutlined, 
  EditOutlined,
  DeleteOutlined,
  CheckCircleOutlined,
  StopOutlined
} from '@ant-design/icons';
import styled, { createGlobalStyle } from 'styled-components';
import MainButton from '../../CommonComponts/MainButton';
import SecondaryButton from '../../CommonComponts/SecondaryButton';
import Modal from '../../CommonComponts/Modals';
import { usePrimaryColor } from '../../../../context/PrimaryColorContext';
import { useLanguage } from '../../../../context/LanguageContext';
import { useTheme } from '../../../../context/ThemeContext';
import { useNotification } from '../../CommonComponts/ToastNotifications';
import StatusTag, { USUARIO_STATUS } from '../../CommonComponts/StatusTag';
import { EMPLEADO_ROL } from '../../../../data/empleadosData';
import VerPerfil from '../../CommonComponts/VerPerfil';

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
    font-weight: 500; // Changed from 600 to 500
    font-size: 13px; // Added smaller font size for headers
    border-right: none;
    transition: background-color 0.3s ease, border-bottom 0.3s ease;
    padding: 12px 16px; // Added smaller padding to reduce header height
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
  
  // Enhanced row hover effects - kept lighter for contrast
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

// Update the ButtonContainer with borderless, transparent buttons and larger icons
const ButtonContainer = styled(Space)`
  display: flex;
  justify-content: center;
  gap: 8px; /* Reduced from 16px to 8px */
  width: 100%;
  
  button {
    min-width: 32px; /* Reduced from 40px */
    height: 32px; /* Reduced from 40px */
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    background: transparent;
    box-shadow: none;
    border-radius: 6px; /* Reduced from 8px */
    transition: all 0.2s ease;
    
    &:hover {
      transform: translateY(-2px);
      background: transparent;
      box-shadow: none;
    }
    
    .anticon {
      font-size: 16px; /* Reduced from 22px */
    }
  }
`;

// Role tag styling
const RoleTag = styled(Tag)`
  border-radius: 20px;
  font-weight: 500;
  padding: 2px 12px;
  text-transform: capitalize;
  font-size: 12px;
`;

const NameCell = styled.span`
  font-weight: 400; // Changed from 600 to 400
  font-size: 13px; // Changed from 14px to 13px
  color: ${props => props.theme?.token?.titleColor || '#000000'};
`;

function GestionTable({ empleadosData = [], onView, onEdit, onDelete, onActivate, onDeactivate, onTableReady }) {
  const { primaryColor } = usePrimaryColor();
  const { language } = useLanguage();
  const theme = useTheme();
  const notification = useNotification();
  const [data, setData] = useState([]);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [confirmAction, setConfirmAction] = useState(null);
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    if (empleadosData.data && empleadosData.data.length > 0) {
      setData(empleadosData.data);
    }
  }, [empleadosData.data]);

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

  // Table column translations
  const tableTranslations = {
    es: {
      id: 'ID',
      name: 'Nombre',
      phone: 'Teléfono',
      role: 'Rol',
      cargo: 'Cargo',
      tipoUsuario: 'Tipo Usuario',
      cedula: 'Cédula',
      status: 'Estado',
      actions: 'Acciones',
      active: 'Activo',
      disable: 'Deshabilitado',
      inactive: 'Inactivo',
      admin: 'Administrador',
      empleado: 'Empleado',
      agent: 'Agente',
      analist: 'Analista',
      supervisor: 'Supervisor',
      gestion: 'Gestión de Empleados',
      rangoRegistros: (range, total) => `${range[0]}-${range[1]} de ${total} empleados`,
      confirmDelete: '¿Está seguro que desea eliminar este empleado?',
      confirmDeactivate: '¿Está seguro que desea desactivar este empleado?',
      confirmActivate: '¿Está seguro que desea activar este empleado?',
      cancel: 'Cancelar',
      confirm: 'Confirmar',
      employeeUpdated: 'Empleado actualizado',
      employeeDeleted: 'Empleado eliminado',
      statusChanged: 'Estado cambiado',
      deleteTitle: 'Eliminar empleado',
      activateTitle: 'Activar empleado',
      deactivateTitle: 'Desactivar empleado',
      email: 'Correo Electrónico',
    },
    en: {
      id: 'ID',
      name: 'Name',
      phone: 'Phone',
      role: 'Role',
      cargo: 'Position',
      tipoUsuario: 'User Type',
      cedula: 'ID Number',
      status: 'Status',
      actions: 'Actions',
      active: 'Active',
      disable: 'Disable',
      inactive: 'Inactive',
      admin: 'Administrator',
      empleado: 'Employee',
      agent: 'Agent',
      analist: 'Analyst',
      supervisor: 'Supervisor',
      gestion: 'Employee Management',
      rangoRegistros: (range, total) => `${range[0]}-${range[1]} of ${total} employees`,
      confirmDelete: 'Are you sure you want to delete this employee?',
      confirmDeactivate: 'Are you sure you want to deactivate this employee?',
      confirmActivate: 'Are you sure you want to activate this employee?',
      cancel: 'Cancel',
      confirm: 'Confirm',
      employeeUpdated: 'Employee updated',
      employeeDeleted: 'Employee deleted',
      statusChanged: 'Status changed',
      deleteTitle: 'Delete employee',
      activateTitle: 'Activate employee',
      deactivateTitle: 'Deactivate employee',
      email: 'Email',
    }
  };

  const t = tableTranslations[language] || tableTranslations.es;

  // Handler functions for row actions
  const handleView = (record) => {
    setSelectedEmployee(record);
    
    setShowProfile(true);
  
    // Remove the onView call that might be triggering notifications
    // if (onView) {
    //   onView(record);
    // }
  };

  const handleEdit = (record) => {
    if (onEdit) {
      onEdit(record);
    }
  };

  const handleDelete = (record) => {
    setSelectedEmployee(record);
    setConfirmAction('delete');
    setConfirmModalVisible(true);
  };

  const handleActivate = (record) => {
    setSelectedEmployee(record);
    setConfirmAction('activate');
    setConfirmModalVisible(true);
  };

  const handleDeactivate = (record) => {
    setSelectedEmployee(record);
    setConfirmAction('deactivate');
    setConfirmModalVisible(true);
  };

  const confirmModal = () => {
    if (!selectedEmployee) return;

    if (confirmAction === 'delete' && onDelete) {
      onDelete(selectedEmployee);
      notification.success(t.employeeDeleted, '');
    } else if (confirmAction === 'activate' && onActivate) {
      onActivate(selectedEmployee);
      notification.success(t.statusChanged, '');
    } else if (confirmAction === 'deactivate' && onDeactivate) {
      onDeactivate(selectedEmployee);
      notification.success(t.statusChanged, '');
    }

    closeConfirmModal();
  };

  const closeConfirmModal = () => {
    setConfirmModalVisible(false);
    setSelectedEmployee(null);
    setConfirmAction(null);
  };

  const getConfirmationMessage = () => {
    if (confirmAction === 'delete') {
      return t.confirmDelete;
    } else if (confirmAction === 'activate') {
      return t.confirmActivate;
    } else if (confirmAction === 'deactivate') {
      return t.confirmDeactivate;
    }
    return '';
  };

  const getConfirmationTitle = () => {
    if (confirmAction === 'delete') {
      return t.deleteTitle;
    } else if (confirmAction === 'activate') {
      return t.activateTitle;
    } else if (confirmAction === 'deactivate') {
      return t.deactivateTitle;
    }
    return '';
  };

  const columns = useMemo(() => [
    {
      title: t.id,
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => a.id - b.id,
      width: '5%',
    },
    {
      title: t.name,
      dataIndex: 'nombre',
      key: 'nombre',
      render: (_, record) => (
        <NameCell>
          {record.nombres} {record.apellidos}
        </NameCell>
      ),
      sorter: (a, b) => `${a.nombres} ${a.apellidos}`.localeCompare(`${b.nombres} ${b.apellidos}`),
      width: '16%', // Reduced from 20% to 16%
    },
    {
      title: t.email,
      dataIndex: 'correo',
      key: 'email',
      width: '20%',
      ellipsis: true,
      hidden: true, // Custom property to identify columns we want to include in PDF
    },
    {
      title: t.phone,
      dataIndex: 'telefono',
      key: 'telefono',
      render: (_, data) => {
        // Plain text role representation without bubbles
        let roleText;
        if(data?.datosPersonales?.telefono){
            roleText = data.datosPersonales.telefono.replace(
            /^(\d{3})(\d{3})(\d{4})$/,
            "$1-$2-$3"
            );
        }else {
          roleText = 'No disponible';
        }
        
        return <span style={{ fontWeight: '500' }}>{roleText}</span>;
      },
      width: '12%', // Increased from 10% to 12%
    },
    {
      title: t.tipoUsuario,
      dataIndex: 'tipoUsuario',
      key: 'tipoUsuario',
      render: (_, typeUser) => {
        let roleText;
        if (typeUser?.tipoUsuario?.nombre === EMPLEADO_ROL.ADMIN) {
          roleText = t.admin;
        } else if (typeUser?.tipoUsuario?.nombre === EMPLEADO_ROL.EMPLEADO) {
          roleText = t.empleado;
        } else {
          roleText = 'No disponible';
        }
        
        return <span style={{ fontWeight: '500' }}>{roleText}</span>;
      },
      filters: [
        { text: t.admin, value: EMPLEADO_ROL.ADMIN },
        { text: t.empleado, value: EMPLEADO_ROL.EMPLEADO },
      ],
      onFilter: (value, record) => {
        return record?.tipoUsuario?.nombre === value;
      },
      width: '12%',
    },
    {
      title: t.cedula,
      dataIndex: 'cedula',
      key: 'cedula',
      render: (_, data) => {
        // Plain text role representation without bubbles
        let roleText;
        if(data?.datosPersonales?.cedula){
            roleText = data.datosPersonales.cedula.replace(
            /^(\d{3})(\d{7})(\d{1})$/,
            "$1-$2-$3"
            );
        }else {
          roleText = 'No disponible';
        }
        
        return <span style={{ fontWeight: '500' }}>{roleText}</span>;
      },
      width: '12%', // Increased from 10% to 12%
    },
    {
      title: t.status,
      dataIndex: 'estado',
      key: 'estado',
      render: (estado) => {
        if (estado == 'activo') {
          return <StatusTag status={USUARIO_STATUS.ACTIVO} />;
        } else if (estado == 'deshabilitado') {
          return <StatusTag status={USUARIO_STATUS.DESHABILITADO} />;
        }
        return <StatusTag status={USUARIO_STATUS.INACTIVO} />
      },
      filters: [
        { text: t.active, value: 'activo' },
        { text: t.disable, value: 'deshabilitado' },
        { text: t.inactive, value: 'inactivo' }
      ],
      onFilter: (value, record) => record.estado === value,
      width: '10%',
    },
    {
      title: t.actions,
      key: 'actions',
      render: (_, record) => {
        const isPrimaryColorBlueish = primaryColor.toLowerCase().includes('17') || 
                                      primaryColor.toLowerCase().includes('00') || 
                                      primaryColor.toLowerCase().includes('33');
        
        return (
          <ButtonContainer>
            <Tooltip title={t.view}>
              <SecondaryButton 
                onClick={() => handleView(record)} 
                icon={<InfoCircleOutlined style={{ color: primaryColor, fontSize: '18px' }} />} 
              />
            </Tooltip>
            <Tooltip title={t.edit}>
              <SecondaryButton 
                onClick={() => handleEdit(record)} 
                icon={<EditOutlined style={{ color: isPrimaryColorBlueish ? '#52c41a' : '#1777FF', fontSize: '18px' }} />} 
              />
            </Tooltip>
            <Tooltip title={t.delete}>
              <SecondaryButton 
                onClick={() => handleDelete(record)} 
                icon={<DeleteOutlined style={{ color: '#EF4444', fontSize: '18px' }} />} 
              />
            </Tooltip>
          </ButtonContainer>
        );
      },
      width: '12%',
      align: 'center',
    },
  ], [t, primaryColor, language, notification]);

  // Make a ref to keep track if we've already sent the columns
  const columnsSentRef = useRef(false);

  // Update the useEffect
  useEffect(() => {
    // Only send columns once to prevent loops
    if (onTableReady && columns && !columnsSentRef.current) {
      // Include all columns except actions, including hidden ones
      const columnsForExport = columns
        .filter(col => col.key !== 'actions')
        .map(col => {
          const columnCopy = {...col};
          delete columnCopy.responsive; // Remove responsive property for PDF
          delete columnCopy.hidden; // Remove hidden property
          return columnCopy;
        });
      onTableReady(columnsForExport);
      columnsSentRef.current = true; // Mark that we've sent the columns
    }
  }, [columns, onTableReady]);

  // Modify the StyledTable props to only show visible columns
  const visibleColumns = columns.filter(col => !col.hidden);

  return (
    <>
      {/* Título fuera del contenedor */}
      <TableTitle>
        <h3>{t.gestion}</h3>
      </TableTitle>
      
      {/* Contenedor de la tabla sin el título */}
      <TableContainer>
        <StyledTable
          $primaryColor={primaryColor}
          $primaryColorLight={primaryColorLight}
          columns={visibleColumns} // Use filtered columns here
          dataSource={data}
          rowKey="id"
          pagination={{ 
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total, range) => t.rangoRegistros(range, total)
          }}
        />
        
        {/* Confirmation Modal */}
        <Modal
          show={confirmModalVisible}
          onClose={closeConfirmModal}
          width="450px"
          height="auto"
          mobileHeight="auto"
        >
          <div style={{ padding: '20px 0' }}>
            <h3 style={{ 
              fontSize: '18px', 
              marginBottom: '16px',
              color: theme?.token?.titleColor,
              textAlign: 'center'
            }}>
              {getConfirmationTitle()}
            </h3>
            
            <p style={{ 
              marginBottom: '24px',
              color: theme?.token?.textColor,
              textAlign: 'center'
            }}>
              {getConfirmationMessage()}
            </p>
            
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              gap: '12px' 
            }}>
              <SecondaryButton onClick={closeConfirmModal}>
                {t.cancel}
              </SecondaryButton>
              <MainButton 
                onClick={confirmModal}
                type={confirmAction === 'delete' ? 'danger' : 'primary'}
              >
                {t.confirm}
              </MainButton>
            </div>
          </div>
        </Modal>
      </TableContainer>
      
      {/* Add VerPerfil modal */}
      <VerPerfil 
        show={showProfile}
        visible={showProfile}
        onClose={() => setShowProfile(false)}
        currentUser={selectedEmployee} // Pass selected employee as currentUser
      />
    </>
  );
}

export default GestionTable;