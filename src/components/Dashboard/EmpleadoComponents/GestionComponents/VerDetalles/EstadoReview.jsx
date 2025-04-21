import React, { useState, useEffect } from 'react';
import { Form, Space, Typography, Popconfirm, Select, Input } from 'antd';
import styled from 'styled-components';
import { useLanguage } from '../../../../../context/LanguageContext';
import { useTheme } from '../../../../../context/ThemeContext';
import { usePrimaryColor } from '../../../../../context/PrimaryColorContext';
import { REGISTRO_STATUS } from '../../../../../data/registrosData';
import MainButton from '../../../CommonComponts/MainButton';
import { QuestionCircleOutlined } from '@ant-design/icons';
// Importar el hook de notificaciones
import { useNotification } from '../../../CommonComponts/ToastNotifications';
import { useAuth } from '../../../../../context/AuthContext';
import axios from 'axios';

const { Text } = Typography;
const { TextArea } = Input;

const ReviewContainer = styled.div`
  display: flex !important;
  flex-direction: column !important;
  gap: 24px !important;
`;

const ButtonGroup = styled(Space)`
  display: flex !important;
  justify-content: flex-end !important;
  margin-top: 24px !important;
`;

const StatusContainer = styled.div`
  margin-bottom: 24px !important;
`;

const StyledForm = styled(Form)`
  .ant-form-item-required::before {
    display: none !important;
  }
`;


const ModalContainer = styled.div`
  .ant-modal-wrap {
    z-index: 1050 !important;
  }
  
  .ant-modal {
    z-index: 1050 !important;
  }
`;

const StyledSelect = styled(Select)`
  && {
    width: 100%;
    
    .ant-select-dropdown {
      z-index: 1051 !important;
    }
  }
`;

// Actualiza el DropdownContainer
const DropdownContainer = styled.div`
  position: relative !important;
  width: 100% !important;

  .ant-select-dropdown {
    position: fixed !important;
    z-index: 1051 !important;
  }

  // Asegurarse que el dropdown esté sobre otros elementos
  .estado-select-dropdown,
  .motivo-rechazo-dropdown {
    z-index: 1051 !important;
  }
`;

// Update the StyledPopconfirm component to make it larger and force styles with !important
const StyledPopconfirm = styled(Popconfirm)`
  && {
    // Target the actual rendered popover elements
    &.ant-popover,
    .ant-popover,
    &.ant-popconfirm,
    .ant-popconfirm,
    &.ant-popconfirm-wrapper,
    .ant-popconfirm-wrapper,
    &.ant-popconfirm-content,
    .ant-popconfirm-content,
    &.ant-popover-content,
    .ant-popover-content,
    &.ant-popconfirm-inner,
    .ant-popconfirm-inner {
      z-index: 99999 !important;
    }
    
    .ant-popover-inner-content,
    .ant-popconfirm-inner-content {
      min-width: 350px !important;
      min-height: 350px !important;
      padding: 40px 30px !important;
      display: flex !important;
      flex-direction: column !important;
      justify-content: space-between !important;
    }
    
    .ant-popover-title,
    .ant-popconfirm-title {
      font-size: 22px !important;
      padding: 25px 25px !important;
      line-height: 1.6 !important;
      font-weight: 500 !important;
      margin-bottom: 20px !important;
    }
    
    .ant-popover-message,
    .ant-popconfirm-message {
      margin-bottom: 30px !important;
      font-size: 18px !important;
      line-height: 1.7 !important;
    }
    
    .ant-popover-buttons,
    .ant-popconfirm-buttons {
      margin-top: 40px !important;
      
      button {
        padding: 12px 30px !important;
        height: auto !important;
        font-size: 18px !important;
        border-radius: 6px !important;
      }
    }
  }
`;

// Actualiza las constantes de MOTIVOS_RECHAZO
const MOTIVOS_RECHAZO = {
  DOCUMENTOS_INVALIDOS: 'Documentos Inválidos',
  INFORMACION_INCOMPLETA: 'Información Incompleta',
  DUPLICADO: 'Datos Duplicados',
  VEHICULO_NO_CUMPLE: 'Datos del Vehiculo no cumplen',
  OTRO: 'Otro'
};

const EstadoReview = ({ 
  data, 
  isReviewMode, 
  onApprove, 
  onReject 
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('Pendiente');
  const [pendingStatus, setPendingStatus] = useState(null);
  const [motivoRechazo, setMotivoRechazo] = useState(null);
  const { language } = useLanguage();
  const { isDarkMode } = useTheme();
  const { primaryColor } = usePrimaryColor();
  // Usar el hook de notificaciones
  const notification = useNotification();
  const api_url = import.meta.env.VITE_API_URL;
  const { getAccessToken } = useAuth();

  const translations = {
    en: {
      status: "Status",
      pending: "Pending",
      approved: "Approved",
      rejected: "Rejected",
      comments: "Comments",
      notes: "Notes",
      save: "Save Changes",
      commentsPlaceholder: "Add your comments here...",
      commentsRequired: "Please provide comments before proceeding",
      notesPlaceholder: "Add your notes here...",
      notesRequired: "Please provide notes before proceeding",
      statusRequired: "Please select a status",
      confirmApprove: "Are you sure you want to approve this registration?",
      confirmReject: "Are you sure you want to reject this registration?",
      confirmTitle: "Confirm Status Change",
      yes: "Accept", 
      no: "No",
      cancel: "Cancel",
      // Nuevas traducciones
      rejectionReason: "Rejection Reason",
      invalidDocuments: "Invalid Documents",
      incompleteInformation: "Incomplete Information",
      duplicate: "Duplicate Registration",
      vehicleNonCompliant: "Vehicle Does Not Meet Requirements",
      other: "Other Reason",
      rejectionReasonRequired: "Please select a rejection reason",
      notesMinLength: 'Notes must be at least 5 characters long',
    },
    es: {
      status: "Estado",
      pending: "Pendiente",
      approved: "Aprobada",
      rejected: "Rechazada",
      comments: "Comentarios",
      notes: "Notas",
      save: "Guardar Cambios",
      commentsPlaceholder: "Agregue sus comentarios aquí...",
      commentsRequired: "Por favor proporcione comentarios antes de continuar",
      notesPlaceholder: "Agregue sus notas aquí...",
      notesRequired: "Por favor proporcione una nota antes de continuar",
      statusRequired: "Por favor seleccione un estado",
      confirmApprove: "¿Está seguro que desea aprobar este registro?",
      confirmReject: "¿Está seguro que desea rechazar este registro?",
      confirmTitle: "Confirmar Cambio de Estado",
      yes: "Aceptar",
      no: "No",
      cancel: "Cancelar",
      // Nuevas traducciones
      rejectionReason: "Motivo de Rechazo",
      invalidDocuments: "Documentos Inválidos",
      incompleteInformation: "Información Incompleta",
      duplicate: "Registro Duplicado",
      vehicleNonCompliant: "Vehículo No Cumple Requisitos",
      other: "Otro Motivo",
      rejectionReasonRequired: "Por favor seleccione un motivo de rechazo",
      notesMinLength: 'Las notas deben tener al menos 5 caracteres',
    }
  };

  const t = translations[language] || translations.es;

  const handleStatusChange = (value) => {
    if (value !== 'Pendiente') {
      setPendingStatus(value);
    } else {
      setSelectedStatus(value);
      form.setFieldsValue({ comments: '' });
    }
  };

  const handleConfirm = () => {
    // Set the new status in state and form
    setSelectedStatus(pendingStatus);
    form.setFieldsValue({ status: pendingStatus });
    setPendingStatus(null);
    
    // Reset or set rejection reason based on status
    if (pendingStatus !== REGISTRO_STATUS.RECHAZADO) {
      setMotivoRechazo(null);
      form.setFieldsValue({ rejectionReason: undefined });
    }
  };

  const handleCancel = () => {
    setPendingStatus(null);
    form.setFieldsValue({ 
      status: selectedStatus
    });
  };

  const handleMotivoRechazoChange = (value) => {
    setMotivoRechazo(value);
    form.setFieldsValue({ rejectionReason: value });
  };

  const getConfirmTitle = () => {
    return pendingStatus === 'Aprobada'
      ? t.confirmApprove 
      : t.confirmReject;
  };

  const handleSubmit = async () => {
    try {
      // If still pending, do nothing
      if (selectedStatus === 'Pendiente') {
        return;
      }
      
      const values = await form.validateFields();
      setLoading(true);
      
      // Log what's being submitted
      console.log("Formulario validado correctamente", {
        ...values,
        status: selectedStatus // Make sure we log the correct status
      });
      

      switch (selectedStatus) {
        case 'Aprobada':
          console.log("Procesando aprobación...");
          let boyData = {
            "idSolicitud": data.solicitud.idSolicitud,
            "estadoDecision": values.status,
            "notaRevision": values.notes,
          }
          await axios.put(`${api_url}/api/solicitud/procesar`, boyData, {
            headers: {
              Authorization: `Bearer ${getAccessToken()}`,
              'Content-Type': 'application/json'
            },
          });

          // Show success notification before closing modal
          notification.success(
            language === 'en' ? 'Registration Approved' : 'Registro Aprobado',
            language === 'en' ? 'The registration has been successfully approved' : 'El registro ha sido aprobado exitosamente'
          );
          
          // Small pause for notification to be visible
          await new Promise(resolve => setTimeout(resolve, 500));
          
          onApprove();
          
          break;
          
        case 'Rechazada':
          const bodyData = {
            "idSolicitud": data.solicitud.idSolicitud,
            "estadoDecision": values.status,
            "motivoRechazo": getMotivoRechazoTexto(values.rejectionReason),
            "detalleRechazo": values.comments
          }
          console.log("Procesando rechazo...");
          await axios.put(`${api_url}/api/solicitud/procesar`, bodyData, {
            headers: {
              Authorization: `Bearer ${getAccessToken()}`,
              'Content-Type': 'application/json'
            },
          });
          
          // Show rejection notification
          notification.info(
            language === 'en' ? 'Registration Rejected' : 'Registro Rechazado',
            language === 'en' ? `Rejection reason: ${motivoRechazo}` : `Motivo de rechazo: ${motivoRechazo}`
          );
          
          // Small pause for notification to be visible
          await new Promise(resolve => setTimeout(resolve, 500));
          
          onReject();
          
          break;
          
        default:
          // Handle pending status if needed
          break;
      }
    } catch (error) {
      console.error('Error en handleSubmit:', error);
      // Show error notification
      notification.error(
        language === 'en' ? 'Error' : 'Error',
        language === 'en' ? 'An error occurred while processing the request' : 'Ocurrió un error al procesar la solicitud'
      );
    } finally {
      setLoading(false);
    }
  };

  const getMotivoRechazoTexto = (motivo) => {
    switch (motivo) {
      case MOTIVOS_RECHAZO.DOCUMENTOS_INVALIDOS:
        return language === 'en' ? "Invalid Documents" : "Documentos Inválidos";
      case MOTIVOS_RECHAZO.INFORMACION_INCOMPLETA:
        return language === 'en' ? "Incomplete Information" : "Información Incompleta";
      case MOTIVOS_RECHAZO.DUPLICADO:
        return language === 'en' ? "Duplicate Registration" : "Registro Duplicado";
      case MOTIVOS_RECHAZO.VEHICULO_NO_CUMPLE:
        return language === 'en' ? "Vehicle Does Not Meet Requirements" : "Vehículo No Cumple Requisitos";
      case MOTIVOS_RECHAZO.OTRO:
        return language === 'en' ? "Other Reason" : "Otro Motivo";
      default:
        return language === 'en' ? "" : "";
    }
  };

  // Asegurarnos de que el popconfirm se cierre correctamente
  useEffect(() => {
    // Limpiar cualquier confirmación pendiente cuando el status cambia
    setPendingStatus(null);
  }, [selectedStatus]);

  // If not in review mode or registration is not pending, show status text
  if (!isReviewMode || data.solicitud.estadoDecision !== 'Pendiente') {
    return (
      <div>
        <Text type="secondary">
          {data.solicitud.estadoDecision === 'Pendiente' 
            ? "Esta solicitud está pendiente de revisión"
            : data.solicitud.estadoDecision === 'Aprobada'
            ? "Esta solicitud ha sido aprobada"
            : "Esta solicitud ha sido rechazada"
          }
        </Text>
      </div>
    );
  }

  return (
    <ReviewContainer>
      <StyledForm form={form} layout="vertical" onFinish={handleSubmit}>
        <StatusContainer>
          <Form.Item
            name="status"
            label={t.status}
            initialValue={'Pendiente'}
            rules={[{ required: true, message: t.statusRequired }]}
          >
            <DropdownContainer>
              <StyledSelect 
                onChange={handleStatusChange}
                getPopupContainer={(trigger) => trigger.parentElement}
                dropdownStyle={{ zIndex: 1051 }}
                style={{ width: '100%' }}
                value={selectedStatus}
              >
                <Select.Option value={'Pendiente'}>{t.pending}</Select.Option>
                <Select.Option value={'Aprobada'}>{t.approved}</Select.Option>
                <Select.Option value={'Rechazada'}>{t.rejected}</Select.Option>
              </StyledSelect>
            </DropdownContainer>
          </Form.Item>
        </StatusContainer>

        {pendingStatus && (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 99990, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ 
              position: 'fixed', 
              top: 0, 
              left: 0, 
              width: '100%', 
              height: '100%', 
              backgroundColor: 'rgba(0, 0, 0, 0.45)', 
              zIndex: 99990 
            }} />
            <StyledPopconfirm
              title={getConfirmTitle()}
              open={pendingStatus !== null}
              onConfirm={handleConfirm}
              onCancel={handleCancel}
              okText={t.yes}
              cancelText={t.cancel}
              $isDarkMode={isDarkMode}
              $primaryColor={primaryColor}
              icon={<QuestionCircleOutlined style={{ color: '#faad14', fontSize: '18px' }} />}
              getPopupContainer={() => document.body}
              overlayClassName="highest-z-index-popconfirm"
              overlayStyle={{ 
                zIndex: 99999,
                maxWidth: '400px'
              }}
              placement="center"
              destroyTooltipOnHide
            />
          </div>
        )}

        {selectedStatus === 'Rechazada' && (
          <Form.Item
            name="rejectionReason"
            label={t.rejectionReason}
            rules={[{ required: true, message: t.rejectionReasonRequired }]}
            initialValue={motivoRechazo}
          >
            <DropdownContainer>
              <StyledSelect
                onChange={handleMotivoRechazoChange}
                getPopupContainer={triggerNode => triggerNode.parentElement}
                popupClassName="motivo-rechazo-dropdown"
                value={motivoRechazo}
              >
                <Select.Option value={MOTIVOS_RECHAZO.DOCUMENTOS_INVALIDOS}>{t.invalidDocuments}</Select.Option>
                <Select.Option value={MOTIVOS_RECHAZO.INFORMACION_INCOMPLETA}>{t.incompleteInformation}</Select.Option>
                <Select.Option value={MOTIVOS_RECHAZO.DUPLICADO}>{t.duplicate}</Select.Option>
                <Select.Option value={MOTIVOS_RECHAZO.VEHICULO_NO_CUMPLE}>{t.vehicleNonCompliant}</Select.Option>
                <Select.Option value={MOTIVOS_RECHAZO.OTRO}>{t.other}</Select.Option>
              </StyledSelect>
            </DropdownContainer>
          </Form.Item>
        )}

        {selectedStatus !== 'Pendiente' && (
          <>
            {selectedStatus === 'Rechazada' && (
              <Form.Item
                name="comments"
                label={t.comments}
                rules={[{ required: true, message: t.commentsRequired }]}
              >
                <TextArea
                  rows={4}
                  placeholder={t.commentsPlaceholder}
                />
              </Form.Item>
            )}

            <Form.Item
              name="notes"
              label={t.notes}
              rules={[
                { required: true, message: t.notesRequired },
                { min: 5, message: t.notesMinLength }
              ]}
            >
              <TextArea
                rows={4}
                placeholder={t.notesPlaceholder}
              />
            </Form.Item>
          </>
        )}

        <ButtonGroup>
          <MainButton
            htmlType="submit"
            loading={loading}
            disabled={selectedStatus === 'Pendiente'}
            style={{
              opacity: selectedStatus === 'Pendiente' ? 0.5 : 1,
              cursor: selectedStatus === 'Pendiente' ? 'not-allowed' : 'pointer'
            }}
          >
            {t.save}
          </MainButton>
        </ButtonGroup>
      </StyledForm>
    </ReviewContainer>
  );
};

export default EstadoReview;
