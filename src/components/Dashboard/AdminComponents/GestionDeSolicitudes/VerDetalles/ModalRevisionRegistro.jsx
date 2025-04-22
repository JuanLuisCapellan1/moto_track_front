import React, { useState, useEffect } from 'react';
import { Typography } from 'antd';
import styled from 'styled-components';
import { useLanguage } from '../../../../../context/LanguageContext';
import Modal from '../../../CommonComponts/Modals';
import TabsDeDetalles from '../../../CommonComponts/VerDetallesDeRegistros/TabsDeDetalles';
import StatusTag from '../../../CommonComponts/StatusTag';
import DatosPersonalesConfirmation from '../../../Ciudadanocomponents/RegistroDeMotocicletas/Confirmation/DatosPersonalesConfirmation';
import DatosMotocicletasConfirmation from '../../../Ciudadanocomponents/RegistroDeMotocicletas/Confirmation/DatosMotocicletasConfirmation';
import DocumentosConfirmationParaVerDetalles from '../../../Ciudadanocomponents/RegistroDeMotocicletas/Confirmation/DocumentosConfirmationParaVerDetalles';
import EstadoReview from './EstadoReview';
import { useNotification } from '../../../CommonComponts/ToastNotifications';
import { REGISTRO_STATUS } from '../../../../../data/registrosData';
import DetalleAprobado from '../../../CommonComponts/VerDetallesDeRegistros/DetalleAprobado';
import DetalleRechazado from '../../../CommonComponts/VerDetallesDeRegistros/DetalleRechazado';
import DetallePendiente from '../../../CommonComponts/VerDetallesDeRegistros/DetallePendiente';

const { Title } = Typography;

const ModalTitle = styled(Title)`
  margin-bottom: 24px !important;
  font-size: 20px !important;
  margin: 0 !important;
  
  @media (max-width: 576px) {
    font-size: 18px !important;
  }
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
  
  @media (max-width: 576px) {
    margin-bottom: 16px;
  }
`;

const ModalContent = styled.div`
  margin-top: 40px;
  
  @media (max-width: 576px) {
    margin-top: 30px;
  }
`;

const ModalRevisionRegistro = ({ 
  visible, 
  onClose, 
  data, 
  isReviewMode = false,
  refreshData 
}) => {
  const [activeTab, setActiveTab] = useState("1");
  const [processingStatus, setProcessingStatus] = useState(false);
  const { language } = useLanguage();
  const notification = useNotification();
  
  const translations = {
    en: {
      viewDetails: "Registration Details",
      reviewApplication: "Review Registration",
      unavailableStatus: "Status not available"
    },
    es: {
      viewDetails: "Detalles del Registro",
      reviewApplication: "Revisar Registro",
      unavailableStatus: "Estado no disponible"
    }
  };
  
  const t = translations[language] || translations.es;
  
  useEffect(() => {
    if (visible) {
      setActiveTab("1");
    }
  }, [visible, data?.id]);

  const datosPersonalesContent = data ? (
    <DatosPersonalesConfirmation userData={data.ciudadano} />
  ) : null;

  const datosMotocicletaContent = data ? (
    <DatosMotocicletasConfirmation motoData={data} />
  ) : null;

  // Ensure we're passing the correct props to the DocumentosConfirmationParaVerDetalles component
  const documentosContent = data ? (
    <DocumentosConfirmationParaVerDetalles data={data} />
  ) : null;

  const handleStatusUpdate = async (status, comments) => {
    try {
      setProcessingStatus(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Refresh data if the function exists
      if (refreshData) {
        await refreshData();
      }
      
      // Close modal immediately without delay
      onClose();
      
      return true; // Return success
    } catch (error) {
      console.error('Error updating status:', error);
      notification.error(
        language === 'en' ? 'Error' : 'Error',
        language === 'en' 
          ? 'An error occurred while updating the status' 
          : 'Ocurrió un error al actualizar el estado'
      );
      return false; // Return failure
    } finally {
      setProcessingStatus(false);
    }
  };

  // Use the appropriate detail component based on status
  const getEstadoContent = () => {
    if (!data) return null;
    if (isReviewMode && data?.solicitud.estadoDecision === REGISTRO_STATUS.PENDIENTE) {
      // Show review form when in review mode and status is pending
      return (
        <EstadoReview 
          data={data}
          isReviewMode={isReviewMode}
          onApprove={async (comments) => {
            await handleStatusUpdate('aprobado', comments);
          }}
          onReject={async (comments) => {
            await handleStatusUpdate('rechazado', comments);
          }}
        />
      );
    } else {
      // Show appropriate detail view based on status
      switch (data?.solicitud?.estadoDecision) {
        case 'Aprobada':
          return <DetalleAprobado data={data} />;
        case 'Rechazada':
          return <DetalleRechazado data={data} />;
        case 'Pendiente':
        default:
          return <DetallePendiente data={data} />;
      }
    }
  };

  if (!data) return null;
  return (
    <Modal
      show={visible}
      onClose={onClose}
      width="800px"
      height="auto"
      mobileWidth="95%"
      mobileHeight="90vh"
      zIndex={9999} // Use high z-index to ensure visibility
    >
      <ModalContent>
        <TitleContainer>
          <ModalTitle level={4}>
            {isReviewMode ? t.reviewApplication : t.viewDetails}
          </ModalTitle>
          <StatusTag status={
            data?.solicitud?.estadoDecision === 'Pendiente' ? REGISTRO_STATUS.PENDIENTE : data?.solicitud?.estadoDecision === 'Aprobada' ? REGISTRO_STATUS.APROBADO : REGISTRO_STATUS.RECHAZADO
          } />
        </TitleContainer>

        <TabsDeDetalles
          activeKey={activeTab}
          onChange={setActiveTab}
          datosPersonalesContent={datosPersonalesContent}
          datosMotocicletaContent={datosMotocicletaContent}
          documentosContent={documentosContent}
          estadoContent={getEstadoContent()}
        />
      </ModalContent>
    </Modal>
  );
};

export default ModalRevisionRegistro;