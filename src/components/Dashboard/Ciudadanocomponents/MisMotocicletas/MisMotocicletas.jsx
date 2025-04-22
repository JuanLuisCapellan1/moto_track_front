import React, { useState, useEffect } from 'react';
import { Typography, Empty, Tooltip, Spin } from 'antd';
import { PlusOutlined, DownloadOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { usePrimaryColor } from '../../../../context/PrimaryColorContext';
import { useLanguage } from '../../../../context/LanguageContext';
import TabsMotocicletas from './TabsMotocicletas';
import SolicitudesCards from './SolicitudesCards';
import VerDetallesMotocicleta from './VerDetallesMotocicleta';
import { MOTO_STATUS } from '../../CommonComponts/StatusTag';
import MainButton from '../../CommonComponts/MainButton';
import DescargarCarnet from '../../CommonComponts/DescargarCarnet';
import { mockMotocicletas, findMotoById, hasReachedActiveLimit } from '../../../../data/motorcycleService';
import { useNotification } from '../../CommonComponts/ToastNotifications';
import axios from 'axios';
import { useAuth } from '../../../../context/AuthContext';

const { Title } = Typography;

const PageHeader = styled.div`
  margin-bottom: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  @media (max-width: 576px) {
    flex-direction: column;
    align-items: flex-start;
    
    > h4 {
      margin-bottom: 16px;
    }
  }
`;

const TabContent = styled.div`
  padding: 16px 0;
`;

const AddButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  
  @media (max-width: 576px) {
    width: 100%;
    flex-direction: column;
    align-items: flex-start;
    
    button {
      width: 100%;
    }
  }
`;

const LimitMessage = styled.span`
  margin-right: 12px;
  color: ${props => props.color || props.theme.primaryColor};
  display: flex;
  align-items: center;
  font-weight: 500;
  
  .anticon {
    margin-right: 4px;
  }
  
  @media (max-width: 576px) {
    margin-bottom: 8px;
    margin-right: 0;
  }
`;

/**
 * MisMotocicletas - Component for displaying and managing motorcycles
 * 
 * @param {Object} props
 * @param {boolean} props.showHeader - Whether to show the header with the title and add button
 * @param {string} props.title - Title to display in the header
 * @param {boolean} props.isPreview - Whether this is a preview section (with limited number of items)
 * @param {Function} props.onAddNew - Function to call when adding a new motorcycle
 * @param {Function} props.onViewAll - Function to call when viewing all motorcycles
 * @param {Function} props.onRefreshMetrics - Function to call when refreshing metrics
 */
function MisMotocicletas({ 
  showHeader = true, 
  title, 
  isPreview = false,
  onAddNew,
  onViewAll,
  onRefreshMetrics // Add this prop
}) {
  const { primaryColor } = usePrimaryColor();
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [selectedMoto, setSelectedMoto] = useState(null);
  const [detailsVisible, setDetailsVisible] = useState(false);
  const notification = useNotification();
  const api_url = import.meta.env.VITE_API_URL;
  const { getAccessToken } = useAuth();
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Translation objects
  const translations = {
    en: {
      title: "My Motorcycles",
      registerButton: "Register New Motorcycle",
      viewDetails: "View Details",
      viewRequest: "View Request",
      downloadCard: "Download Card",
      viewAll: "View all",
      limitMessage: "Limit of 2 active motorcycles reached",
      limitTooltip: "You can only have a maximum of 2 active motorcycles",
      noActive: "You don't have active motorcycles",
      noPending: "You don't have pending requests",
      noRejected: "You don't have rejected requests",
      fields: {
        plate: "License Plate",
        color: "Color",
        chassis: "Chassis",
        registrationDate: "Registration Date",
        requestDate: "Request Date",
        useType: "Usage Type",
        rejectionReason: "Rejection Reason"
      }
    },
    es: {
      title: "Mis Motocicletas",
      registerButton: "Registrar Nueva Motocicleta",
      viewDetails: "Ver Detalles",
      viewRequest: "Ver Solicitud",
      downloadCard: "Descargar Carnet",
      viewAll: "Ver todas",
      limitMessage: "Límite de 2 motocicletas activas alcanzado",
      limitTooltip: "Solo puede tener un máximo de 2 motocicletas activas",
      noActive: "No tienes motocicletas activas",
      noPending: "No tienes solicitudes pendientes",
      noRejected: "No tienes solicitudes rechazadas",
      fields: {
        plate: "Placa",
        color: "Color",
        chassis: "Chasis",
        registrationDate: "Fecha de Registro",
        requestDate: "Fecha de Solicitud",
        useType: "Tipo de uso",
        rejectionReason: "Motivo de Rechazo"
      }
    }
  };

  // Get current translations
  const t = translations[language] || translations.es;
  const defaultTitle = t.title;
  
  const fetchSolicitude = async (estado) => {
    try {
      const response = await axios.get(`${api_url}/api/solicitud/mis-solicitudes`, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
        params: { estado },
      });
      return response.data.data;
    } catch (error) {
      console.error('Error fetching solicitudes:', error);
      notification.error(
        language === 'en' ? 'Error Fetching Requests' : 'Error al Obtener Solicitudes',
        language === 'en'
          ? 'An error occurred while fetching the requests. Please try again later.'
          : 'Ocurrió un error al obtener las solicitudes. Por favor, inténtelo de nuevo más tarde.'
      );
      throw error;
    }
  };

  // Check URL for motorcycle ID to view
  useEffect(() => {
    const viewId = searchParams.get('view');
    if (viewId) {
      const moto = findMotoById(viewId);
      if (moto) {
        setSelectedMoto(moto);
        setDetailsVisible(true);
      }
    }
  }, [searchParams]);

  const handleCreateNew = () => {
    if (onAddNew) {
      onAddNew();
    } else {
      navigate('/panel/ciudadano/registrar');
    }
  };

  const handleViewDetails = (moto) => {
    setSelectedMoto(moto);
    setDetailsVisible(true);
    // Update URL without reloading the page
    if (!isPreview) {
      navigate(`/panel/ciudadano/motocicletas?view=${moto.id}`, { replace: true });
    }
  };

  const closeDetails = () => {
    setDetailsVisible(false);
    // Remove the view parameter from URL
    if (!isPreview) {
      navigate('/panel/ciudadano/motocicletas', { replace: true });
    }
  };

  // Filter data if in preview mode
  const getPreviewData = (data, limit = 2) => {
    if (isPreview) {
      return data.slice(0, limit);
    }
    return data;
  };

  const refreshData = () => {
    setRefreshTrigger(prev => prev + 1);
    // Call the metrics refresh callback if provided
    if (onRefreshMetrics) {
      onRefreshMetrics();
    }
  };

  // Component for Active Motorcycles tab
  const MotocicletasActivas = () => {
    const [activeMotos, setActiveMotos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const fetchActiveMotos = async () => {
        try {
          setLoading(true);
          const data = await fetchSolicitude('Aprobada');
          setActiveMotos(getPreviewData(data));
        } catch (error) {
          console.error('Error fetching active motorcycles:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchActiveMotos();
    }, [refreshTrigger]);

    return (
      <TabContent>
        <Spin spinning={loading}>
          {activeMotos.length > 0 ? (
            activeMotos.map(moto => (
              <SolicitudesCards
                key={moto.solicitud.idSolicitud}
                data={moto}
                infoFields={[
                  { 
                    key: 'matricula.matriculaGenerada', 
                    label: t.fields.plate,
                    getValue: (data) => data.matricula.matriculaGenerada
                  },
                  { 
                    key: 'vehiculo.chasis', 
                    label: t.fields.chassis,
                    getValue: (data) => data.vehiculo.chasis
                  },
                  { 
                    key: 'solicitud.fechaRegistro', 
                    label: t.fields.registrationDate,
                    getValue: (data) => new Date(data.solicitud.fechaRegistro).toLocaleDateString()
                  },
                  { 
                    key: 'vehiculo.tipoUso', 
                    label: t.fields.useType,
                    getValue: (data) => data.vehiculo.tipoUso
                  }
                ]}
                actions={[
                  {
                    label: t.viewDetails,
                    onClick: () => handleViewDetails(moto),
                    primary: false
                  },
                  {
                    component: (
                      <DescargarCarnet
                        motorcycleData={{
                          placa: moto.matricula.matriculaGenerada,
                          propietario: `${moto.ciudadano.nombres} ${moto.ciudadano.apellidos}`,
                          modelo: `${moto.vehiculo.marca.nombre} ${moto.vehiculo.modelo.nombre}`,
                          chasis: moto.vehiculo.chasis,
                          fechaEmision: moto.matricula.fechaEmision,
                          registro: moto.solicitud.idSolicitud
                        }}
                        showPreview={false}
                        buttonProps={{
                          onClick: () => {
                            notification.success(
                              language === 'en' ? 'Card Generated' : 'Carnet Generado',
                              language === 'en' ? 'The motorcycle card has been successfully generated' : 'El carnet de motocicleta ha sido generado exitosamente'
                            );
                          }
                        }}
                      >
                        <MainButton
                          icon={<DownloadOutlined />}
                        >
                          {t.downloadCard}
                        </MainButton>
                      </DescargarCarnet>
                    ),
                    showAsComponent: true
                  }
                ]}
              />
            ))
          ) : (
            <Empty 
              description={t.noActive} 
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
          )}
        </Spin>
      </TabContent>
    );
  };

  // Component for Pending Motorcycles tab
  const MotocicletasPendientes = () => {
    const [pendingMotos, setPendingMotos] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
      const fetchPendingMotos = async () => {
        try {
          setLoading(true);
          const data = await fetchSolicitude('Pendiente');
          setPendingMotos(getPreviewData(data));
        } catch (error) {
          console.error('Error fetching pending motorcycles:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchPendingMotos();
    }, [refreshTrigger]);

    return (
      <TabContent>
        <Spin spinning={loading}>
          {pendingMotos.length > 0 ? (
            pendingMotos.map(moto => (
              <SolicitudesCards
                key={moto.solicitud.idSolicitud}
                data={moto}
                infoFields={[
                  { 
                    key: 'vehiculo.modelo.color', 
                    label: t.fields.color,
                    getValue: (data) => data.vehiculo.color
                  },
                  { 
                    key: 'vehiculo.chasis', 
                    label: t.fields.chassis,
                    getValue: (data) => data.vehiculo.chasis
                  },
                  { 
                    key: 'solicitud.fechaRegistro', 
                    label: t.fields.requestDate,
                    getValue: (data) => new Date(data.solicitud.fechaRegistro).toLocaleDateString()
                  },
                  { 
                    key: 'vehiculo.tipoUso', 
                    label: t.fields.useType,
                    getValue: (data) => data.vehiculo.tipoUso
                  }
                ]}
                actions={[
                  {
                    label: t.viewRequest,
                    onClick: () => handleViewDetails(moto),
                    primary: false
                  }
                ]}
              />
            ))
          ) : (
            <Empty 
              description={t.noPending} 
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
          )}
        </Spin>
      </TabContent>
    );
  };

  // Component for Rejected Motorcycles tab
  const MotocicletasRechazadas = () => {
    const [rejectedMotos, setRejectedMotos] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
      const fetchRejectedMotos = async () => {
        try {
          setLoading(true);
          const data = await fetchSolicitude('Rechazada');
          setRejectedMotos(getPreviewData(data));
        } catch (error) {
          console.error('Error fetching rejected motorcycles:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchRejectedMotos();
    }, [refreshTrigger]);

    return (
      <TabContent>
        <Spin spinning={loading}>
          {rejectedMotos.length > 0 ? (
            rejectedMotos.map(moto => (
              <SolicitudesCards
                key={moto.solicitud.idSolicitud}
                data={moto}
                infoFields={[
                  { 
                    key: 'solicitud.estadoDecision', 
                    label: t.fields.plate,
                    getValue: (data) => data.solicitud.estadoDecision
                  },
                  { 
                    key: 'vehiculo.chasis', 
                    label: t.fields.chassis,
                    getValue: (data) => data.vehiculo.chasis
                  },
                  { 
                    key: 'solicitud.motivoRechazo', 
                    label: t.fields.rejectionReason,
                    getValue: (data) => data.solicitud.motivoRechazo || 'No especificado'
                  },
                  { 
                    key: 'vehiculo.tipoUso', 
                    label: t.fields.useType,
                    getValue: (data) => data.vehiculo.tipoUso
                  }
                ]}
                actions={[
                  {
                    label: t.viewDetails,
                    onClick: () => handleViewDetails(moto),
                    primary: false
                  }
                ]}
              />
            ))
          ) : (
            <Empty 
              description={t.noRejected} 
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
          )}
        </Spin>
      </TabContent>
    );
  };

  return (
    <div>
      {showHeader && (
        <PageHeader>
          <Title level={4}>{title || defaultTitle}</Title>
          <AddButtonContainer>
            {hasReachedActiveLimit && (
              <LimitMessage color={primaryColor}>
                <InfoCircleOutlined /> {t.limitMessage}
              </LimitMessage>
            )}
            <Tooltip 
              title={hasReachedActiveLimit ? t.limitTooltip : ""}
            >
              <span>
                <MainButton
                  icon={<PlusOutlined />}
                  onClick={handleCreateNew}
                  disabled={hasReachedActiveLimit}
                >
                  {t.registerButton}
                </MainButton>
              </span>
            </Tooltip>
          </AddButtonContainer>
        </PageHeader>
      )}

      <TabsMotocicletas 
        activeComponent={<MotocicletasActivas />}
        pendingComponent={<MotocicletasPendientes />}
        rejectedComponent={<MotocicletasRechazadas />}
        onTabChange={refreshData}
      />

      <VerDetallesMotocicleta
        visible={detailsVisible}
        onClose={closeDetails}
        data={selectedMoto}
      />
    </div>
  );
}

export default MisMotocicletas;