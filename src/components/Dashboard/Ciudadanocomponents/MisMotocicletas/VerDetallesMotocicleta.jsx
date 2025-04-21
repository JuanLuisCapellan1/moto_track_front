import React, { useState, useEffect } from 'react';
import { Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useLanguage } from '../../../../context/LanguageContext';

import Modal from '../../CommonComponts/Modals';
import TabsDeDetalles from '../../CommonComponts/VerDetallesDeRegistros/TabsDeDetalles';
import DetalleAprobado from '../../CommonComponts/VerDetallesDeRegistros/DetalleAprobado';
import DetallePendiente from '../../CommonComponts/VerDetallesDeRegistros/DetallePendiente';
import DetalleRechazado from '../../CommonComponts/VerDetallesDeRegistros/DetalleRechazado';
import DatosPersonalesConfirmation from '../RegistroDeMotocicletas/Confirmation/DatosPersonalesConfirmation';
import DatosMotocicletasConfirmation from '../RegistroDeMotocicletas/Confirmation/DatosMotocicletasConfirmation';
import DocumentosConfirmationParaVerDetalles from '../RegistroDeMotocicletas/Confirmation/DocumentosConfirmationParaVerDetalles';
import StatusTag, { MOTO_STATUS } from '../../CommonComponts/StatusTag';

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
  margin-top: 40px; // Space for the close button
  
  @media (max-width: 576px) {
    margin-top: 30px;
  }
`;

/**
 * VerDetallesMotocicleta - Component for viewing motorcycle registration details
 * 
 * @param {Object} props
 * @param {boolean} props.visible - Whether the modal is visible
 * @param {Function} props.onClose - Function to close the modal
 * @param {Object} props.data - Motorcycle data
 */
const VerDetallesMotocicleta = ({ visible, onClose, data }) => {
  const [activeTab, setActiveTab] = useState("1");
  const navigate = useNavigate();
  const { language } = useLanguage();
  
  // Translations
  const translations = {
    en: {
      details: "Details of",
      unavailableStatus: "Status not available",
      downloading: "Downloading circulation card for moto ID:",
      editing: "Editing request for moto ID:"
    },
    es: {
      details: "Detalles de",
      unavailableStatus: "Estado no disponible",
      downloading: "Descargando tarjeta de circulación para moto ID:",
      editing: "Editando solicitud de moto ID:"
    }
  };
  
  // Get current translations
  const t = translations[language] || translations.es;

  // Reset active tab when the modal opens with new data
  useEffect(() => {
    if (visible) {
      setActiveTab("1");
    }
  }, [visible, data?.solicitud?.idSolicitud]);
  
  // Handle download card for approved motorcycles
  const handleDownloadCard = () => {
  };
  
  // Handle edit request for rejected motorcycles
  const handleEditRequest = () => {
    console.log(`${t.editing} ${data?.id}`);
    onClose();
    // Navigate to edit page with pre-filled data
    navigate(`/panel/ciudadano/registrar?edit=${data?.id}`);
  };
  
  // Memoize tab content to prevent unnecessary re-renders
  const datosPersonalesContent = <DatosPersonalesConfirmation userData={data?.ciudadano} />;
  const datosMotocicletaContent = data ? <DatosMotocicletasConfirmation motoData={data} /> : null;
  
  const documentosContent = <DocumentosConfirmationParaVerDetalles data={data} />;

  const mapApiStatusToInternal = (apiStatus) => {
    switch (apiStatus) {
      case 'Aprobada':
        return 'MOTO_APROBADA';
      case 'Pendiente':
        return 'MOTO_PENDIENTE';
      case 'Rechazada':
        return 'MOTO_RECHAZADA';
      default:
        return 'UNKNOWN'; // Valor por defecto si no coincide
    }
  };

  // Render appropriate status component based on motorcycle state
  const renderEstadoContent = () => {
    if (!data) return null;
  
    // Usar una variable local para almacenar el estado mapeado
    const mappedStatus = mapApiStatusToInternal(data?.solicitud?.estadoDecision);
    switch (mappedStatus) {
      case MOTO_STATUS.APROBADA:
        return <DetalleAprobado data={data} onDownloadCard={handleDownloadCard} />;
      case MOTO_STATUS.PENDIENTE:
        return <DetallePendiente data={data} />;
      case MOTO_STATUS.RECHAZADA:
        return <DetalleRechazado data={data} onEditRequest={handleEditRequest} />;
      default:
        return <div>{t.unavailableStatus}</div>;
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
    >
      <ModalContent>
        <TitleContainer>
          <ModalTitle level={4}>
            {t.details} {(`${data.vehiculo.marca.nombre} ${data.vehiculo.modelo.nombre} (${data.vehiculo.año})`) || "No disponible"}
          </ModalTitle>
          <StatusTag status={mapApiStatusToInternal(data.solicitud.estadoDecision) || MOTO_STATUS.PENDIENTE} />
        </TitleContainer>
        
        <TabsDeDetalles
          activeKey={activeTab}
          onChange={setActiveTab}
          datosPersonalesContent={datosPersonalesContent}
          datosMotocicletaContent={datosMotocicletaContent}
          documentosContent={documentosContent}
          estadoContent={renderEstadoContent()}
        />
      </ModalContent>
    </Modal>
  );
};

export default VerDetallesMotocicleta;