import React from 'react';
import styled from 'styled-components';
import { Typography, Row, Col, Timeline, Card } from 'antd';
import { 
  CheckCircleFilled, 
  CalendarOutlined, 
  UserOutlined, 
  InfoCircleOutlined,
  DownloadOutlined,
  CloseCircleFilled,
  LoadingOutlined
} from '@ant-design/icons';
import { useTheme } from '../../../../context/ThemeContext';
import { useLanguage } from '../../../../context/LanguageContext';
import MainButton from '../MainButton';
import DescargarCarnet from '../DescargarCarnet';
import { formatDate } from '../../../../utils/dateUtils';
// Importar hook de notificaciones personalizado
import { useNotification } from '../../CommonComponts/ToastNotifications';

const { Title, Text } = Typography;

const StatusCard = styled(Card)`
  border-radius: 8px;
  margin-bottom: 24px;
  border: 1px solid ${props => props.theme.token.titleColor}15;

  .ant-card-body {
    padding: 24px;
    
    @media (max-width: 576px) {
      padding: 16px;
    }
    
    @media (max-width: 480px) {
      padding: 12px;
    }
  }
`;

const StatusHeaderContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
  
  @media (max-width: 576px) {
    margin-bottom: 16px;
  }
`;

const StatusIcon = styled.div`
  margin-right: 16px;
  font-size: 32px;
  color: #52c41a;
  
  @media (max-width: 576px) {
    font-size: 28px;
    margin-right: 12px;
  }
  
  @media (max-width: 480px) {
    font-size: 24px;
    margin-right: 10px;
  }
`;

const StatusInfo = styled.div`
  flex: 1;
`;

const StatusTitle = styled(Title)`
  margin: 0 0 4px 0 !important;
  font-size: 20px !important;
  
  @media (max-width: 576px) {
    font-size: 18px !important;
  }
  
  @media (max-width: 480px) {
    font-size: 16px !important;
  }
`;

const StatusDate = styled(Text)`
  display: flex;
  align-items: center;
  color: ${props => props.theme.token.textColor}90;
  
  @media (max-width: 480px) {
    font-size: 13px;
  }
`;

const TimelineContainer = styled.div`
  margin-top: 24px;
  
  @media (max-width: 576px) {
    margin-top: 16px;
  }
`;

const TimelineTitle = styled(Title)`
  font-size: 16px !important;
  margin-bottom: 16px !important;
  
  @media (max-width: 480px) {
    font-size: 15px !important;
    margin-bottom: 12px !important;
  }
`;

const TimelineItemContent = styled.div`
  background: ${props => props.theme.token.contentBg};
  padding: 12px;
  border-radius: 4px;
  border: 1px solid ${props => props.theme.token.titleColor}10;
  
  @media (max-width: 480px) {
    padding: 8px;
  }
`;

const TimelineItemTitle = styled(Text)`
  font-weight: 600;
  margin-bottom: 4px;
  display: block;
  
  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

const TimelineItemDate = styled(Text)`
  font-size: 12px;
  color: ${props => props.theme.token.textColor}90;
  display: block;
  margin-bottom: 8px;
  
  @media (max-width: 480px) {
    font-size: 11px;
    margin-bottom: 6px;
  }
`;

const TimelineItemDescription = styled(Text)`
  display: block;
  
  @media (max-width: 480px) {
    font-size: 13px;
  }
`;

const DetailsRow = styled(Row)`
  margin-bottom: 16px;
  
  @media (max-width: 576px) {
    margin-bottom: 12px;
  }
`;

const DetailLabel = styled(Text)`
  color: ${props => props.theme.token.textColor}90;
  font-size: 14px;
  display: block;
  margin-bottom: 4px;
  
  @media (max-width: 480px) {
    font-size: 13px;
    margin-bottom: 2px;
  }
`;

const DetailValue = styled(Text)`
  font-size: 16px;
  font-weight: 500;
  display: block;
  
  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 24px;
  
  @media (max-width: 576px) {
    margin-top: 16px;
  }
  
  @media (max-width: 480px) {
    justify-content: center;
  }
  
  button {
    @media (max-width: 480px) {
      width: 100%;
    }
  }
`;

/**
 * DetalleAprobado - Component to display approval details for a motorcycle registration
 */
const DetalleAprobado = ({ data = {} }) => {
  const { theme } = useTheme();
  const { language } = useLanguage();
  // Usar el hook de notificaciones
  const notification = useNotification();
  
  // Translations
  const translations = {
    en: {
      approvedRequest: "Approved Request",
      approvalDate: "Approval date",
      approvedBy: "Approved by",
      assignedPlate: "Assigned License Plate Number",
      observations: "Observations",
      downloadCard: "Download Card",
      requestHistory: "Request History",
      approved: "Approved",
      inReview: "In Review",
      received: "Received",
      downloading: "Downloading card with data"
    },
    es: {
      approvedRequest: "Solicitud Aprobada",
      approvalDate: "Fecha de aprobación",
      approvedBy: "Aprobado por",
      assignedPlate: "Número de Placa Asignada",
      observations: "Observaciones",
      downloadCard: "Descargar Carnet",
      requestHistory: "Historial de la Solicitud",
      approved: "Aprobada",
      inReview: "En revisión",
      received: "Recibida",
      downloading: "Descargando carnet con datos"
    }
  };
  
  // Get current translations
  const t = translations[language] || translations.es;
  
  // Format approval data
  const approvalData = {
    fechaAprobacion: formatDate(data?.solicitud?.fechaProcesada) || 'Sin fecha',
    aprobadoPor: (data?.empleado?.nombres + " " + data?.empleado?.apellidos) || 'No asignado',
    numeroPlaca: data?.matricula?.matriculaGenerada || 'No asignado',
    observaciones: data?.solicitud?.detalleRechazo || 'Sin observaciones',
    historial: [
      {
        estado: 'Approved',
        fecha: data?.matricula?.fechaProcesada || 'Sin fecha',
        responsable: `Lic. ${data?.empleado?.nombres || 'No asignado'}  ${data?.empleado?.apellidos || 'No asignado'}`,
        descripcion: "Solicitud aprobada y placa asignada. Documentación completa.",
      },
      {
        estado: 'In Review',
        fecha: data?.solicitud?.fechaProcesada || 'Sin fecha',
        responsable: `Lic. ${data?.empleado?.nombres || 'No asignado'}  ${data?.empleado?.apellidos || 'No asignado'}`,
        descripcion: "Solicitud en revisión por el departamento de registro.",
      },
      {
        estado: 'Received',
        fecha: data?.solicitud?.fechaRegistro || 'Sin fecha',
        responsable: "Sistema",
        descripcion: "Solicitud recibida y en espera de aprobación.",
      }
    ]
  };

  // Prepare data for the carnet PDF
  const carnetData = {
    placa: approvalData.numeroPlaca,
    propietario: `${data?.ciudadano?.nombres}  ${data?.ciudadano?.apellidos}` || 'Propietario no especificado',
    modelo: `${data?.vehiculo?.modelo?.nombre || ''} ${data?.vehiculo?.marca?.nombre || ''} ${'('+ data?.vehiculo?.modelo?.año + ')' || ''}`,
    chasis: data?.vehiculo?.chasis || 'No especificado',
    fechaEmision: data?.matricula?.fechaEmision
  };

  return (
    <div>
      <StatusCard theme={theme}>
        <StatusHeaderContainer>
          <StatusIcon>
            <CheckCircleFilled />
          </StatusIcon>
          <StatusInfo>
            <StatusTitle level={4} theme={theme}>
              {t.approvedRequest}
            </StatusTitle>
            <StatusDate theme={theme}>
              <CalendarOutlined style={{ marginRight: 8 }} />
              {t.approvalDate}: {approvalData.fechaAprobacion}
            </StatusDate>
          </StatusInfo>
        </StatusHeaderContainer>

        <DetailsRow gutter={[16, 16]}>
          <Col xs={24} sm={12}>
            <DetailLabel theme={theme}>{t.approvedBy}</DetailLabel>
            <DetailValue>
              <UserOutlined style={{ marginRight: 8 }} />
              {approvalData.aprobadoPor}
            </DetailValue>
          </Col>
          <Col xs={24} sm={12}>
            <DetailLabel theme={theme}>{t.assignedPlate}</DetailLabel>
            <DetailValue>{approvalData.numeroPlaca}</DetailValue>
          </Col>
        </DetailsRow>

        <DetailLabel theme={theme}>{t.observations}</DetailLabel>
        <DetailValue>
          <InfoCircleOutlined style={{ marginRight: 8 }} />
          {approvalData.observaciones}
        </DetailValue>

        <ButtonsContainer>
          <DescargarCarnet 
            motorcycleData={carnetData}
            showPreview={false}
            buttonProps={{
              onClick: () => {
                // Usar notification.info para mostrar que se está descargando (igual que en GestionTable)
                notification.info(
                  language === 'en' ? 'Downloading' : 'Descargando',
                  language === 'en' ? 'The motorcycle card is being generated' : 'El carnet de motocicleta se está generando'
                );
                
                // Mostrar notificación de éxito después de un breve retraso para simular la descarga
                setTimeout(() => {
                  notification.success(
                    language === 'en' ? 'Card Generated' : 'Carnet Generado',
                    language === 'en' ? 'The motorcycle card has been successfully generated' : 'El carnet de motocicleta ha sido generado exitosamente'
                  );
                }, 1000);
              }
            }}
          >
            <MainButton
              icon={<DownloadOutlined />}
              size={window.innerWidth <= 480 ? "middle" : "default"}
            >
              {t.downloadCard}
            </MainButton>
          </DescargarCarnet>
        </ButtonsContainer>
      </StatusCard>

      <TimelineContainer>
        <TimelineTitle level={4} theme={theme}>
          {t.requestHistory}
        </TimelineTitle>
        
        <Timeline
          items={approvalData.historial.map((item) => ({
            dot: getStatusDot(item.estado),
            color: getStatusColor(item.estado),
            children: (
              <TimelineItemContent theme={theme}>
                <TimelineItemTitle>{item.estado}</TimelineItemTitle>
                <TimelineItemDate theme={theme}>
                  {formatDate(item.fecha)} - {item.responsable}
                </TimelineItemDate>
                <TimelineItemDescription>{item.descripcion}</TimelineItemDescription>
              </TimelineItemContent>
            )
          }))}
        />
      </TimelineContainer>
    </div>
  );
};

// Helper functions (keep these the same)
const getStatusColor = (status) => {
  switch (status) {
    case 'Aprobada':
    case 'Approved':
      return '#1AAA4C'; 
    case 'Rechazada':
    case 'Rejected':  
      return '#E53935'; 
    case 'En revisión':
    case 'In Review':
    case 'Technical Verification':
    case 'Document Verification':  
      return '#F28C28'; 
    case 'Recibida':
    case 'Received':
      return '#A6A6A6'; 
    default:
      return '#A6A6A6';
  }
};

const getStatusDot = (status) => {
  switch (status) {
    case 'Aprobada':
    case 'Approved':
      return <CheckCircleFilled style={{ color: '#1AAA4C' }} />;
    case 'Rechazada':
    case 'Rejected':
      return <CloseCircleFilled style={{ color: '#E53935' }} />;
    case 'En revisión':
    case 'In Review':
    case 'Technical Verification':
    case 'Document Verification':
      return <LoadingOutlined style={{ color: '#F28C28' }} />;
    case 'Recibida':
    case 'Received':
      return <CalendarOutlined style={{ color: '#A6A6A6' }} />;
    default:
      return <InfoCircleOutlined style={{ color: '#A6A6A6' }} />;
  }
};

export default DetalleAprobado;