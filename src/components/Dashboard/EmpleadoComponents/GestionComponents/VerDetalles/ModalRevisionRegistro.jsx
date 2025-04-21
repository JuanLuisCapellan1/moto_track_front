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
import { useAuth } from '../../../../../context/AuthContext';
import axios from 'axios';

// ...rest of the file stays the same

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
  const api_url = import.meta.env.VITE_API_URL;
  const { getAccessToken } = useAuth();
  const [personalData, setPersonalData] = useState(null);

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
  }, [visible, data?.idsolicitud]);

  const datosPersonalesContent = data ? (
    <DatosPersonalesConfirmation userData={
      {
        nombres: data.ciudadano.nombres,
        apellidos: data.ciudadano.apellidos,
        fechaNacimiento: data.ciudadano.fechaNacimiento,
        sexo: data.ciudadano.sexo,
        cedula: data.ciudadano.cedula,
        telefono: data.ciudadano.telefono,
        estadoCivil: data.ciudadano.estadoCivil,
        correo: data.ciudadano.correo,
        ubicacion: {
          direccion: data.ciudadano.ubicacion.direccion,
        }
      }
    } />
  ) : null;

  const datosMotocicletaContent = data ? (
    <DatosMotocicletasConfirmation motoData={
      {
        vehiculo: {
          marca: {
            nombre: data.vehiculo.marca.nombre,
          },
          modelo: {
            nombre: data.vehiculo.modelo.nombre,
          },
          año: data.vehiculo.año,
          color: data.vehiculo.color,
          cilindraje: data.vehiculo.cilindraje,
          tipoUso: data.vehiculo.tipoUso,
          chasis: data.vehiculo.chasis,
        },
        ...(data.seguro?.proveedor && data.seguro?.numeroPoliza ? {
          seguro: {
            proveedor: data.seguro.proveedor,
            numeroPoliza: data.seguro.numeroPoliza,
          }
        } : {})
      }
    } />
  ) : null;

  const documentosContent = data ? (
    <DocumentosConfirmationParaVerDetalles data={
      {
        solicitud: {
          documentos: {
            licencia: data.solicitud.documentos.licencia,
            cedula: data.solicitud.documentos.cedula,
            ...(data.solicitud.documentos.seguro ? { seguro: data.solicitud.documentos.seguro } : {}),
            facturaVehiculo: data.solicitud.documentos.facturaVehiculo,
          }
        }
      }
    } />
  ) : null;


  // Use the appropriate detail component based on status
  const getEstadoContent = () => {
    if (!data) return null;

    if (isReviewMode && data.solicitud.estadoDecision === 'Pendiente') {
      // Show review form when in review mode and status is pending
      return (
        <EstadoReview
          data={data}
          isReviewMode={isReviewMode}
          onApprove={()=> {
            notification.success(
              language === 'en' ? 'Success' : 'Éxito',
              language === 'en' ? 'Data refreshed successfully' : 'Datos actualizados exitosamente'
            );
            onClose();
            refreshData();
          }}
          onReject={() => {
            notification.success(
              language === 'en' ? 'Success' : 'Éxito',
              language === 'en' ? 'Application rejected successfully' : 'Solicitud rechazada exitosamente'
            );
            onClose();
            refreshData();
          }}
        />
      );
    } else {
      // Show appropriate detail view based on status
      switch (mapEstadoToStatusTag(data.solicitud.estadoDecision)) {
        case REGISTRO_STATUS.APROBADO:
          return <DetalleAprobado data={data} />;
        case REGISTRO_STATUS.RECHAZADO:
          return <DetalleRechazado data={data} isCityzen={false} />;
        case REGISTRO_STATUS.PENDIENTE:
        default:
          return <DetallePendiente data={data} />;
      }
    }
  };

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
            {isReviewMode ? t.reviewApplication : t.viewDetails}
          </ModalTitle>
          <StatusTag status={mapEstadoToStatusTag(data.solicitud.estadoDecision)} />
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
