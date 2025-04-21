import React from 'react';
import styled from 'styled-components';
import { Typography, Row, Col, Timeline, Card } from 'antd';
import { 
  ClockCircleFilled, 
  CalendarOutlined, 
  UserOutlined, 
  InfoCircleOutlined,
  LoadingOutlined
} from '@ant-design/icons';
import { useTheme } from '../../../../context/ThemeContext';
import { useLanguage } from '../../../../context/LanguageContext';
import { formatDate } from '../../../../utils/dateUtils';

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
  color: #F28C28; // Orange for pending status
  
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

const StepInfo = styled.div`
  background: ${props => props.theme.token.contentBg};
  border: 1px solid ${props => props.theme.token.titleColor}15;
  border-radius: 8px;
  padding: 16px;
  margin-top: 16px;
  
  @media (max-width: 480px) {
    padding: 12px;
    margin-top: 12px;
  }
`;

const EstimatedTime = styled.div`
  display: flex;
  align-items: center;
  margin-top: 8px;
  color: #F28C28;
`;

/**
 * DetallePendiente - Component to display pending details for a motorcycle registration
 * 
 * @param {Object} props
 * @param {Object} props.data - Registration data
 */
const DetallePendiente = ({ data = {} }) => {
  const { theme } = useTheme();
  const { language } = useLanguage();
  
  // Create translations
  const translations = {
    en: {
      requestInProcess: "Request in Process",
      requestDate: "Request date",
      currentStatus: "Current status",
      estimatedProcessTime: "Estimated process time",
      observations: "Observations",
      whatsNext: "What's next?",
      nextStepDescription: "Your request will be evaluated by our team. We will verify the provided documentation and motorcycle information. Once the review is completed, you will receive a notification with the result.",
      estimatedTimeRemaining: "Estimated remaining time",
      requestHistory: "Request History",
      documentReview: "Document Review",
      inReview: "In Review",
      waitingForApplicant: "Waiting for Applicant",
      technicalVerification: "Technical Verification",
      received: "Received"
    },
    es: {
      requestInProcess: "Solicitud en Proceso",
      requestDate: "Fecha de solicitud",
      currentStatus: "Estado actual",
      estimatedProcessTime: "Tiempo estimado de proceso",
      observations: "Observaciones",
      whatsNext: "¿Qué sigue?",
      nextStepDescription: "Su solicitud será evaluada por nuestro equipo. Verificaremos la documentación proporcionada y la información de la motocicleta. Una vez completada la revisión, recibirá una notificación con el resultado.",
      estimatedTimeRemaining: "Tiempo estimado restante",
      requestHistory: "Historial de la Solicitud",
      documentReview: "Revisión de Documentos",
      inReview: "En Revisión",
      waitingForApplicant: "Esperando Respuesta",
      technicalVerification: "Verificación Técnica",
      received: "Recibida"
    }
  };
  
  // Get current translations
  const t = translations[language] || translations.es;
  
  // Get the current status from the first historial item if available
  const currentStatus = data.pendienteDetalles?.historial?.[0]?.estado || t.inReview;
  const currentStatusText = getLocalizedStatus(currentStatus, t);

  // Prepare data for display
  const pendingData = {
    fechaSolicitud: formatDate(data.fechaSolicitud || new Date().toISOString(), language === 'en' ? 'en-US' : 'es-DO'),
    estadoActual: currentStatusText,
    tiempoEstimado: '5-7 días hábiles',
    observaciones: 'Su solicitud está siendo procesada. Recibirá una notificación cuando haya cambios en el estado.',
    historial: [
      {
        estado: 'In Review',
        fecha: formatDate(data?.solicitud?.fechaProcesada) || 'Sin fecha',
        responsable: `Lic. ${data?.empleado?.nombres || 'No asignado'}  ${data?.empleado?.apellidos || 'No asignado'}`,
        descripcion: "Solicitud en revisión por el departamento de registro.",
      },
      {
        estado: 'Received',
        fecha: formatDate(data?.solicitud?.fechaRegistro) || 'Sin fecha',
        responsable: "Sistema",
        descripcion: "Solicitud recibida y en espera de aprobación.",
      }
    ]
  };

  return (
    <div>
      <StatusCard theme={theme}>
        <StatusHeaderContainer>
          <StatusIcon>
            <ClockCircleFilled />
          </StatusIcon>
          <StatusInfo>
            <StatusTitle level={4} theme={theme}>
              {t.requestInProcess}
            </StatusTitle>
            <StatusDate theme={theme}>
              <CalendarOutlined style={{ marginRight: 8 }} />
              {t.requestDate}: {pendingData.fechaSolicitud}
            </StatusDate>
          </StatusInfo>
        </StatusHeaderContainer>

        <DetailsRow gutter={[24, 0]}>
          <Col xs={24} sm={12}>
            <DetailLabel theme={theme}>{t.currentStatus}</DetailLabel>
            <DetailValue>
              <LoadingOutlined style={{ marginRight: 8, color: '#F28C28' }} />
              {pendingData.estadoActual}
            </DetailValue>
          </Col>
          <Col xs={24} sm={12}>
            <DetailLabel theme={theme}>{t.estimatedProcessTime}</DetailLabel>
            <DetailValue>{pendingData.tiempoEstimado}</DetailValue>
          </Col>
        </DetailsRow>

        <DetailLabel theme={theme}>{t.observations}</DetailLabel>
        <DetailValue>
          <InfoCircleOutlined style={{ marginRight: 8 }} />
          {pendingData.observaciones}
        </DetailValue>

        <StepInfo theme={theme}>
          <TimelineItemTitle>{t.whatsNext}</TimelineItemTitle>
          <TimelineItemDescription>
            {t.nextStepDescription}
          </TimelineItemDescription>
          <EstimatedTime theme={theme}>
            <ClockCircleFilled style={{ marginRight: 8, color: '#F28C28' }} />
            {t.estimatedTimeRemaining}: {pendingData.tiempoEstimado}
          </EstimatedTime>
        </StepInfo>
      </StatusCard>

      <TimelineContainer>
        <TimelineTitle level={4} theme={theme}>
          {t.requestHistory}
        </TimelineTitle>
        
        {pendingData.historial.length > 0 ? (
          <Timeline
            items={pendingData.historial.map((item, index) => ({
              dot: getStatusDot(item.estado),
              color: getStatusColor(item.estado),
              children: (
                <TimelineItemContent theme={theme}>
                  <TimelineItemTitle>{item.estado}</TimelineItemTitle>
                  <TimelineItemDate theme={theme}>{item.fecha} - {item.responsable}</TimelineItemDate>
                  <TimelineItemDescription>{item.descripcion}</TimelineItemDescription>
                </TimelineItemContent>
              )
            }))}
          />
        ) : (
          <TimelineItemContent theme={theme}>
            <TimelineItemDescription>No hay registros en el historial.</TimelineItemDescription>
          </TimelineItemContent>
        )}
      </TimelineContainer>
    </div>
  );
};

// Helper function to get localized status
const getLocalizedStatus = (status, translations) => {
  switch (status) {
    case 'Document Review':
      return translations.documentReview;
    case 'In Review':
      return translations.inReview;
    case 'Waiting for Applicant':
      return translations.waitingForApplicant;
    case 'Technical Verification':
      return translations.technicalVerification;
    case 'Received':
      return translations.received;
    default:
      return status;
  }
};

// Helper functions to determine timeline status colors and icons
const getStatusColor = (status) => {
  if (status.includes('Revisión') || status.includes('Document Review') || 
      status.includes('En Revisión') || status.includes('In Review')) {
    return '#F28C28'; // orange
  } else if (status.includes('Esperando') || status.includes('Waiting')) {
    return '#faad14'; // yellow
  } else if (status.includes('Verificación') || status.includes('Technical')) {
    return '#1890ff'; // blue
  } else if (status.includes('Recibida') || status.includes('Received')) {
    return '#A6A6A6'; // gray
  }
  return '#F28C28'; // default orange
};

const getStatusDot = (status) => {
  if (status.includes('Revisión') || status.includes('Document Review') || 
      status.includes('En Revisión') || status.includes('In Review') ||
      status.includes('Verificación') || status.includes('Technical') ||
      status.includes('Esperando') || status.includes('Waiting')) {
    return <LoadingOutlined />;
  } else if (status.includes('Recibida') || status.includes('Received')) {
    return <ClockCircleFilled />;
  }
  return <InfoCircleOutlined />;
};

export default DetallePendiente;