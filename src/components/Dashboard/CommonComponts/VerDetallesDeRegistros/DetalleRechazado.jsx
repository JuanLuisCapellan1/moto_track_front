import React from 'react';
import styled from 'styled-components';
import { Typography, Row, Col, Timeline, Card } from 'antd';
import { 
  CloseCircleFilled, 
  CalendarOutlined, 
  UserOutlined, 
  InfoCircleOutlined,
  ExclamationCircleOutlined,
  PlusCircleOutlined,
  LoadingOutlined
} from '@ant-design/icons';
import { useTheme } from '../../../../context/ThemeContext';
import { useLanguage } from '../../../../context/LanguageContext';
import MainButton from '../MainButton';
import { useNavigate } from 'react-router-dom';
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
  color: #f5222d;
  
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

const RejectionReasonCard = styled.div`
  background: ${props => props.$isDanger ? '#fff2f0' : props.theme.token.contentBg};
  border: 1px solid ${props => props.$isDanger ? '#ffccc7' : props.theme.token.titleColor}15;
  border-radius: 8px;
  padding: 16px;
  margin-top: 16px;
  
  @media (max-width: 480px) {
    padding: 12px;
    margin-top: 12px;
  }
`;

const RejectionReasonTitle = styled(Text)`
  font-weight: 600;
  font-size: 16px;
  color: #f5222d;
  display: block;
  margin-bottom: 8px;
  
  @media (max-width: 480px) {
    font-size: 14px;
    margin-bottom: 6px;
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
    
    button {
      width: 100%;
    }
  }
`;

/**
 * DetalleRechazado - Component to display rejection details for a motorcycle registration
 */
const DetalleRechazado = ({ data = {}, isCityzen, onEditRequest }) => {
  const { theme, currentTheme } = useTheme();
  const { language } = useLanguage();
  const isDarkMode = currentTheme === 'themeDark';
  const navigate = useNavigate();
  
  // Create translations
  const translations = {
    en: {
      rejectedRequest: "Rejected Request",
      rejectionDate: "Rejection date",
      rejectedBy: "Rejected by",
      rejectionReason: "Rejection reason",
      rejectionDetails: "Rejection details",
      createNewRequest: "Create New Request",
      requestHistory: "Request History",
      rejected: "Rejected",
      inReview: "In Review",
      received: "Received"
    },
    es: {
      rejectedRequest: "Solicitud Rechazada",
      rejectionDate: "Fecha de rechazo",
      rejectedBy: "Rechazado por",
      rejectionReason: "Motivo de rechazo",
      rejectionDetails: "Detalles del rechazo",
      createNewRequest: "Crear Nueva Solicitud",
      requestHistory: "Historial de la Solicitud",
      rejected: "Rechazada",
      inReview: "En revisión",
      received: "Recibida"
    }
  };
  
  // Get current translations
  const t = translations[language] || translations.es;
  
  // Format rejection data
  const rejectionData = {
    fechaRechazo: formatDate(data?.solicitud?.fechaProcesada) || 'Sin fecha',
    rechazadoPor: (data?.empleado?.nombres + " " + data?.empleado?.apellidos) || 'No asignado',
    motivoRechazo: data?.solicitud?.motivoRechazo || 'No especificado',
    detalleRechazo: data?.solicitud?.detalleRechazo || 'Sin detalles adicionales',
    historial: [
      {
        estado: "Rejected",
        fecha: data?.solicitud?.fechaProcesada || 'Sin fecha',
        responsable: (data?.empleado?.nombres + " " + data?.empleado?.apellidos) || 'No asignado',
        descripcion: "Solicitud rechazada por documentación incompleta según normativa vigente."
      },
      {
        estado: "In Review",
        fecha: data?.solicitud?.fechaProcesada || 'Sin fecha',
        responsable: (data?.empleado?.nombres + " " + data?.empleado?.apellidos) || 'No asignado',
        descripcion: "Documentación en revisión por el departamento de tránsito"
      },
      {
        estado: "Received",
        fecha: data?.solicitud?.fechaRegistro || 'Sin fecha',
        responsable: "Sistema",
        descripcion: "Solicitud recibida y registrada en el sistema"
      }
    ]
  };


  // Handle navigation to registration page
  const handleNewRequest = () => {
    if (onEditRequest) {
      onEditRequest();
    } else {
      navigate('/panel/ciudadano/registrar');
    }
  };

  return (
    <div>
      <StatusCard theme={theme}>
        <StatusHeaderContainer>
          <StatusIcon>
            <CloseCircleFilled />
          </StatusIcon>
          <StatusInfo>
            <StatusTitle level={4} theme={theme}>
              {t.rejectedRequest}
            </StatusTitle>
            <StatusDate theme={theme}>
              <CalendarOutlined style={{ marginRight: 8 }} />
              {t.rejectionDate}: {rejectionData.fechaRechazo}
            </StatusDate>
          </StatusInfo>
        </StatusHeaderContainer>

        <DetailsRow gutter={[24, 0]}>
          <Col xs={24} sm={12}>
            <DetailLabel theme={theme}>{t.rejectedBy}</DetailLabel>
            <DetailValue>
              <UserOutlined style={{ marginRight: 8 }} />
              {rejectionData.rechazadoPor}
            </DetailValue>
          </Col>
          <Col xs={24} sm={12}>
            <DetailLabel theme={theme}>{t.rejectionReason}</DetailLabel>
            <DetailValue>{rejectionData.motivoRechazo}</DetailValue>
          </Col>
        </DetailsRow>

        <RejectionReasonCard theme={theme} $isDanger={!isDarkMode}>
          <RejectionReasonTitle>
            <ExclamationCircleOutlined style={{ marginRight: 8 }} />
            {t.rejectionDetails}
          </RejectionReasonTitle>
          <TimelineItemDescription>
            {rejectionData.detalleRechazo}
          </TimelineItemDescription>
        </RejectionReasonCard>
        
        {
          isCityzen && (
            <ButtonsContainer>
              <MainButton 
                icon={<PlusCircleOutlined />}
                onClick={handleNewRequest}
                size={window.innerWidth <= 480 ? "middle" : "default"}
              >
                {t.createNewRequest}
              </MainButton>
            </ButtonsContainer>
          )
        }
      </StatusCard>

      <TimelineContainer>
        <TimelineTitle level={4} theme={theme}>
          {t.requestHistory}
        </TimelineTitle>
        
        <Timeline
          items={rejectionData.historial.map((item) => ({
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

// Helper functions to determine timeline status colors and icons
const getStatusColor = (status) => {
  switch (status) {
    case 'Rechazada':
    case 'Rejected':
      return '#E53935';
    case 'En revisión':
    case 'In Review':
    case 'Technical Verification':
    case 'Technical Inspection':
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
    case 'Rechazada':
    case 'Rejected':
      return <CloseCircleFilled style={{ color: '#E53935' }} />;
    case 'En revisión':
    case 'In Review':
    case 'Technical Verification':
    case 'Technical Inspection':
    case 'Document Verification':
      return <LoadingOutlined style={{ color: '#F28C28' }} />;
    case 'Recibida':
    case 'Received':
      return <CalendarOutlined style={{ color: '#A6A6A6' }} />;
    default:
      return <InfoCircleOutlined style={{ color: '#A6A6A6' }} />;
  }
};

export default DetalleRechazado;