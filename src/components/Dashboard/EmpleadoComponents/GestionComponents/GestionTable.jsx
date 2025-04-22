import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Table, Space, Tooltip, Spin } from 'antd'; // Eliminar message de aquí
import styled from 'styled-components';
import { REGISTRO_STATUS } from '../../../../data/registrosData';
import StatusTag, { MOTO_STATUS } from '../../CommonComponts/StatusTag';
import MainButton from '../../CommonComponts/MainButton';
import SecondaryButton from '../../CommonComponts/SecondaryButton';
import { usePrimaryColor } from '../../../../context/PrimaryColorContext';
import { useLanguage } from '../../../../context/LanguageContext';
import { useTheme } from '../../../../context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import ModalRevisionRegistro from './VerDetalles/ModalRevisionRegistro';
import DescargarCarnet from '../../CommonComponts/DescargarCarnet';
import { formatDate } from '../../../../utils/dateUtils';
// Importar el hook de notificaciones personalizado
import { useNotification } from '../../CommonComponts/ToastNotifications';
// Import icon
import { DownloadOutlined } from '@ant-design/icons';
import { set } from 'lodash';

// Helper function to convert hex to rgba - moved outside component
const hexToRgba = (hex, alpha = 1) => {
  if (!hex) return `rgba(0, 0, 0, ${alpha})`;
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  width: 100%;
`;

// Container styled like FilterSection
const TableContainer = styled.div`
  background: ${props => props.theme?.token?.contentBg || '#fff'};
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  padding: 24px;
  margin-bottom: 24px;
  border: 1px solid ${props => props.theme.token.titleColor}25;
  position: relative;
  overflow-x: auto;

  /* Webkit scrollbar styles */
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${props => hexToRgba(props.theme?.token?.primaryColor || '#1890ff', 0.3)};
    border-radius: 4px;

    &:hover {
      background-color: ${props => hexToRgba(props.theme?.token?.primaryColor || '#1890ff', 0.5)};
    }
  }

  &::-webkit-scrollbar-track {
    background-color: ${props => props.theme?.token?.contentBg || '#f0f0f0'};
    border-radius: 4px;
  }

  /* Firefox scrollbar styles */
  scrollbar-width: thin;
  scrollbar-color: ${props => `${hexToRgba(props.theme?.token?.primaryColor || '#1890ff', 0.3)} ${props.theme?.token?.contentBg || '#f0f0f0'}`};
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

// Make the full width button take exactly the same space as two buttons would
const FullWidthButton = styled(MainButton)`
  width: calc(180px + 8px); /* Two buttons (90px each) + the gap */
  justify-content: center;
`;

// Make the full width secondary button
const FullWidthSecondaryButton = styled(SecondaryButton)`
  width: calc(180px + 8px); /* Two buttons (90px each) + the gap */
  justify-content: center;
`;

const GestionTable = ({ registrosData = [], onView, onReview, onCarnet, onTableReady, onRefresh }) => {
  const { primaryColor } = usePrimaryColor();
  const { language, translations } = useLanguage();
  const theme = useTheme();
  const navigate = useNavigate();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isReviewMode, setIsReviewMode] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  // Usar el hook de notificaciones
  const notification = useNotification();

  useEffect(() => {
    setLoading(true);
    if (registrosData && registrosData.length > 0) {
      setData(registrosData);
    }
    setLoading(false);
  }, [registrosData]);

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

  // Table column translations
  const tableTranslations = {
    es: {
      id: 'ID',
      owner: 'Propietario',
      brand: 'Marca',
      model: 'Modelo',
      date: 'Fecha',
      status: 'Estado',
      actions: 'Acciones',
      approved: 'Aprobado',
      pending: 'Pendiente',
      rejected: 'Rechazado',
      view: 'Ver',
      review: 'Revisar',
      card: 'Carnet',
      viewDetails: 'Ver detalles',
      reviewRequest: 'Revisar solicitud',
      generateCard: 'Generar carnet',
      recordsManagement: 'Gestión de Registros',
      recordsRange: (range, total) => `${range[0]}-${range[1]} de ${total} registros`,
      downloadingCard: 'Descargando carnet digital'
    },
    en: {
      id: 'ID',
      owner: 'Owner',
      brand: 'Brand',
      model: 'Model',
      date: 'Date',
      status: 'Status',
      actions: 'Actions',
      approved: 'Approved',
      pending: 'Pending',
      rejected: 'Rejected',
      view: 'View',
      review: 'Review',
      card: 'Card',
      viewDetails: 'View details',
      reviewRequest: 'Review request',
      generateCard: 'Generate card',
      recordsManagement: 'Records Management',
      recordsRange: (range, total) => `${range[0]}-${range[1]} of ${total} records`,
      downloadingCard: 'Downloading digital card'
    }
  };

  const t = tableTranslations[language] || tableTranslations.es;

  // Handler functions for row actions
  const handleView = (record) => {
    setSelectedRecord(record);
    setIsReviewMode(false);
    setModalVisible(true);
  };
  
  const handleReview = (record) => {
    setSelectedRecord(record);
    setIsReviewMode(true);
    setModalVisible(true);
  };
  
  const handleCarnet = (record) => {
    if (onCarnet) {
      onCarnet(record);
    }
  };

  // Prepare carnet data from registration record
  const prepareCarnetData = (record) => {
    return {
      placa: record.matricula.matriculaGenerada || '',
      propietario: `${record.ciudadano.nombres} ${record.ciudadano.apellidos}`,
      modelo: `${record.vehiculo.marca.nombre} ${record.vehiculo.modelo.nombre} (${record.vehiculo.año})`,
      chasis: record.vehiculo.chasis,
      fechaEmision: record.solicitud.fechaProcesada
    };
  };

  const handleModalClose = () => {
    setModalVisible(false);
    setSelectedRecord(null);
    setIsReviewMode(false);
  };

  // Add refreshData function
  const refreshData = async () => {
    try {
      // In a real app, this would be an API call to fetch fresh data
      // For now, we'll just simulate a refresh with the existing data
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call
      
      // Update the data state
      // In a real app, you would fetch new data from the API
      setData([...registrosData]);
      
      // Close the modal
      handleModalClose();
    } catch (error) {
      console.error('Error refreshing data:', error);
    }
  };

  const columns = useMemo(() => [
    {
      title: t.id,
      dataIndex: ['solicitud', 'idSolicitud'],
      key: 'idSolicitud',
      sorter: (a, b) => a.solicitud.idSolicitud - b.solicitud.idSolicitud,
      width: '5%',
    },
    {
      title: t.owner,
      render: (record) => `${record.ciudadano.nombres} ${record.ciudadano.apellidos}`,
      key: 'propietario',
      sorter: (a, b) => 
        `${a.ciudadano.nombres} ${a.ciudadano.apellidos}`.localeCompare(
          `${b.ciudadano.nombres} ${b.ciudadano.apellidos}`
        ),
      width: '25%',
    },
    {
      title: t.brand,
      dataIndex: ['vehiculo', 'marca', 'nombre'],
      key: 'marca',
      sorter: (a, b) => 
        a.vehiculo.marca.nombre.localeCompare(b.vehiculo.marca.nombre),
      width: '12%',
    },
    {
      title: t.model,
      dataIndex: ['vehiculo', 'modelo', 'nombre'],
      key: 'modelo',
      sorter: (a, b) => 
        a.vehiculo.modelo.nombre.localeCompare(b.vehiculo.modelo.nombre),
      width: '12%',
    },
    {
      title: t.date,
      dataIndex: ['solicitud', 'fechaRegistro'],
      key: 'fecha',
      render: (text) => formatTableDate(text),
      sorter: (a, b) => 
        new Date(a.solicitud.fechaRegistro) - new Date(b.solicitud.fechaRegistro),
      width: '13%',
    },
    {
      title: t.status,
      dataIndex: ['solicitud', 'estadoDecision'],
      key: 'estado',
      render: (status) => {
        const motoStatus = mapEstadoToStatusTag(status);
        return <StatusTag status={motoStatus} />;
      },
      filters: [
        { text: t.approved, value: 'Aprobada' },
        { text: t.pending, value: 'Pendiente' },
        { text: t.rejected, value: 'Rechazada' },
      ],
      onFilter: (value, record) => record.solicitud.estadoDecision === value,
      width: '13%',
    },
    {
      title: t.actions,
      key: 'acciones',
      render: (_, record) => {
        switch (record.solicitud.estadoDecision) {
          case 'Pendiente':
            return (
              <ButtonContainer>
                <Tooltip title={t.viewDetails}>
                  <SecondaryButton onClick={() => handleView(record)}>
                    {t.view}
                  </SecondaryButton>
                </Tooltip>
                <Tooltip title={t.reviewRequest}>
                  <MainButton onClick={() => handleReview(record)}>
                    {t.review}
                  </MainButton>
                </Tooltip>
              </ButtonContainer>
            );
          case 'Aprobada':
            // Use DescargarCarnet component for approved records with showPreview=false
            return (
              <ButtonContainer>
                <Tooltip title={t.viewDetails}>
                  <SecondaryButton onClick={() => handleView(record)}>
                    {t.view}
                  </SecondaryButton>
                </Tooltip>
                <Tooltip title={t.generateCard}>
                  <DescargarCarnet
                    motorcycleData={prepareCarnetData(record)}
                    showPreview={false} // Changed to false to download instantly without preview
                    buttonProps={{
                      onClick: () => {
                        notification.success(
                          language === 'en' ? 'Card Generated' : 'Carnet Generado',
                          language === 'en' ? 'The motorcycle card has been successfully generated' : 'El carnet de motocicleta ha sido generado exitosamente'
                        );
                        // Call the onCarnet callback if provided
                        if (onCarnet) onCarnet(record);
                      }
                    }}
                  >
                    <MainButton icon={<DownloadOutlined />}>
                      {t.card}
                    </MainButton>
                  </DescargarCarnet>
                </Tooltip>
              </ButtonContainer>
            );
          case 'Rechazada':
            return (
              <ButtonContainer>
                <Tooltip title={t.viewDetails}>
                  <FullWidthSecondaryButton onClick={() => handleView(record)}>
                    {t.viewDetails}
                  </FullWidthSecondaryButton>
                </Tooltip>
              </ButtonContainer>
            );
          default:
            return null;
        }
      },
      width: '20%',
      align: 'center',
    },
  ], [t, primaryColor, notification, language]); // Añadir notification y language como dependencias

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
  }, [columns, onTableReady]); // We can include dependencies now since we have the ref check

  const mapEstadoToStatusTag = (estado) => {
    switch (estado) {
      case 'Aprobada':
        return 'MOTO_APROBADA';
      case 'Rechazada':
        return 'MOTO_RECHAZADA';
      case 'Pendiente':
        return 'MOTO_PENDIENTE';
      default:
        return 'MOTO_PENDIENTE';
    }
  };

  return (
    <>
      {/* Título fuera del contenedor */}
      <TableTitle $primaryColor={primaryColor}>
        <h3>{t.recordsManagement}</h3>
      </TableTitle>
      
      {/* Contenedor de la tabla sin el título */}
      <TableContainer>
        {loading ? (
          <SpinnerContainer>
            <Spin
              size="large" 
              tip={language === 'es' ? "Cargando registros..." : "Loading records..."}
            />
          </SpinnerContainer>
        ) : (
          <StyledTable
            $primaryColor={primaryColor}
            $primaryColorLight={primaryColorLight}
            columns={columns}
            dataSource={data} // Change this to use the data state instead of registrosData directly
            rowKey="id"
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showTotal: (total, range) => t.recordsRange(range, total)
            }}
            loading={loading}
          />
        )}
        
        {selectedRecord && (
          <ModalRevisionRegistro
            visible={modalVisible}
            onClose={handleModalClose}
            data={selectedRecord}
            isReviewMode={isReviewMode}
            refreshData={onRefresh} // Now refreshData is defined
          />
        )}
      </TableContainer>
    </>
  );
};

export default GestionTable;