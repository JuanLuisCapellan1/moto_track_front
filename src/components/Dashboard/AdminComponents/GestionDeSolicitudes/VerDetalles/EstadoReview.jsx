import React, { useState, useEffect } from 'react';
import { Form, Space, Typography, Popconfirm, Select, Input } from 'antd';
import styled from 'styled-components';
import { useLanguage } from '../../../../../context/LanguageContext';
import { useTheme } from '../../../../../context/ThemeContext';
import { usePrimaryColor } from '../../../../../context/PrimaryColorContext';
import { REGISTRO_STATUS } from '../../../../../data/registrosData';
import MainButton from '../../../CommonComponts/MainButton';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { useNotification } from '../../../CommonComponts/ToastNotifications';

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

// Fix z-index issues with a styled Select component
const StyledSelect = styled(Select)`
  && {
    .rc-select-dropdown {
      z-index: 9999 !important; 
    }
  }
`;

// This div will be used to properly contain the dropdown
const DropdownContainer = styled.div`
  position: relative !important;
  z-index: 9000 !important;
`;

// Update the StyledPopconfirm component to make it larger and force styles with !important
const StyledPopconfirm = styled(Popconfirm)`
  && {
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

// Motivos de rechazo
const MOTIVOS_RECHAZO = {
  DOCUMENTOS_INVALIDOS: 'DOCUMENTOS_INVALIDOS',
  INFORMACION_INCOMPLETA: 'INFORMACION_INCOMPLETA',
  DUPLICADO: 'DUPLICADO',
  VEHICULO_NO_CUMPLE: 'VEHICULO_NO_CUMPLE',
  OTRO: 'OTRO'
};

const EstadoReview = ({ 
  data, 
  isReviewMode, 
  onApprove, 
  onReject 
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(REGISTRO_STATUS.PENDIENTE);
  const [pendingStatus, setPendingStatus] = useState(null);
  const [motivoRechazo, setMotivoRechazo] = useState(null);
  const { language } = useLanguage();
  const { isDarkMode } = useTheme();
  const { primaryColor } = usePrimaryColor();
  const notification = useNotification();

  const translations = {
    en: {
      status: "Status",
      pending: "Pending",
      approved: "Approved",
      rejected: "Rejected",
      comments: "Comments",
      save: "Save Changes",
      commentsPlaceholder: "Add your comments here...",
      commentsRequired: "Please provide comments before proceeding",
      statusRequired: "Please select a status",
      confirmApprove: "Are you sure you want to approve this registration?",
      confirmReject: "Are you sure you want to reject this registration?",
      confirmTitle: "Confirm Status Change",
      yes: "Accept", 
      no: "No",
      cancel: "Cancel",
      rejectionReason: "Rejection Reason",
      invalidDocuments: "Invalid Documents",
      incompleteInformation: "Incomplete Information",
      duplicate: "Duplicate Registration",
      vehicleNonCompliant: "Vehicle Does Not Meet Requirements",
      other: "Other Reason",
      rejectionReasonRequired: "Please select a rejection reason"
    },
    es: {
      status: "Estado",
      pending: "Pendiente",
      approved: "Aprobado",
      rejected: "Rechazado",
      comments: "Comentarios",
      save: "Guardar Cambios",
      commentsPlaceholder: "Agregue sus comentarios aquí...",
      commentsRequired: "Por favor proporcione comentarios antes de continuar",
      statusRequired: "Por favor seleccione un estado",
      confirmApprove: "¿Está seguro que desea aprobar este registro?",
      confirmReject: "¿Está seguro que desea rechazar este registro?",
      confirmTitle: "Confirmar Cambio de Estado",
      yes: "Aceptar",
      no: "No",
      cancel: "Cancelar",
      rejectionReason: "Motivo de Rechazo",
      invalidDocuments: "Documentos Inválidos",
      incompleteInformation: "Información Incompleta",
      duplicate: "Registro Duplicado",
      vehicleNonCompliant: "Vehículo No Cumple Requisitos",
      other: "Otro Motivo",
      rejectionReasonRequired: "Por favor seleccione un motivo de rechazo"
    }
  };

  const t = translations[language] || translations.es;

  const handleStatusChange = (value) => {
    if (value !== REGISTRO_STATUS.PENDIENTE) {
      setPendingStatus(value);
    } else {
      setSelectedStatus(value);
      form.setFieldsValue({ comments: '' });
    }
  };

  const handleConfirm = () => {
    setSelectedStatus(pendingStatus);
    form.setFieldsValue({ status: pendingStatus });
    setPendingStatus(null);
    
    if (pendingStatus !== REGISTRO_STATUS.RECHAZADO) {
      setMotivoRechazo(null);
      form.setFieldsValue({ rejectionReason: undefined });
    } else {
      setMotivoRechazo(MOTIVOS_RECHAZO.DOCUMENTOS_INVALIDOS);
      form.setFieldsValue({ rejectionReason: MOTIVOS_RECHAZO.DOCUMENTOS_INVALIDOS });
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
  };

  const getConfirmTitle = () => {
    return pendingStatus === REGISTRO_STATUS.APROBADO 
      ? t.confirmApprove 
      : t.confirmReject;
  };

  const handleSubmit = async () => {
    try {
      if (selectedStatus === REGISTRO_STATUS.PENDIENTE) {
        return;
      }
      
      const values = await form.validateFields();
      setLoading(true);
      
      switch (selectedStatus) {
        case REGISTRO_STATUS.APROBADO:
          
          notification.success(
            language === 'en' ? 'Registration Approved' : 'Registro Aprobado',
            language === 'en' ? 'The registration has been successfully approved' : 'El registro ha sido aprobado exitosamente'
          );
          
          await new Promise(resolve => setTimeout(resolve, 500));
          
          if (typeof onApprove === 'function') {
            await onApprove(values.comments);
          } else {
            console.warn("onApprove is not defined");
          }
          
          break;
          
        case REGISTRO_STATUS.RECHAZADO:
          
          const motivoTexto = getMotivoRechazoTexto(values.rejectionReason);
          const comentarioCompleto = `${motivoTexto}: ${values.comments}`;
          
          notification.info(
            language === 'en' ? 'Registration Rejected' : 'Registro Rechazado',
            language === 'en' ? `Rejection reason: ${motivoTexto}` : `Motivo de rechazo: ${motivoTexto}`
          );
          
          await new Promise(resolve => setTimeout(resolve, 500));
          
          if (typeof onReject === 'function') {
            await onReject(comentarioCompleto);
          } else {
            console.warn("onReject is not defined");
          }
          
          break;
          
        default:
          break;
      }
    } catch (error) {
      console.error('Error en handleSubmit:', error);
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
        return language === 'en' ? "Rejection" : "Rechazo";
    }
  };

  useEffect(() => {
    setPendingStatus(null);
  }, [selectedStatus]);

  if (!isReviewMode || data.estado !== REGISTRO_STATUS.PENDIENTE) {
    return (
      <div>
        <Text type="secondary">
          {data.estado === REGISTRO_STATUS.PENDIENTE 
            ? "Esta solicitud está pendiente de revisión"
            : data.estado === REGISTRO_STATUS.APROBADO
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
            initialValue={REGISTRO_STATUS.PENDIENTE}
            rules={[{ required: true, message: t.statusRequired }]}
          >
            <DropdownContainer>
              <StyledSelect 
                onChange={handleStatusChange}
                getPopupContainer={triggerNode => triggerNode.parentElement}
                popupClassName="estado-select-dropdown"
                value={selectedStatus}
              >
                <Select.Option value={REGISTRO_STATUS.PENDIENTE}>{t.pending}</Select.Option>
                <Select.Option value={REGISTRO_STATUS.APROBADO}>{t.approved}</Select.Option>
                <Select.Option value={REGISTRO_STATUS.RECHAZADO}>{t.rejected}</Select.Option>
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

        {selectedStatus === REGISTRO_STATUS.RECHAZADO && (
          <Form.Item
            name="rejectionReason"
            label={t.rejectionReason}
            rules={[{ required: true, message: t.rejectionReasonRequired }]}
            initialValue={motivoRechazo || MOTIVOS_RECHAZO.DOCUMENTOS_INVALIDOS}
          >
            <DropdownContainer>
              <StyledSelect
                onChange={handleMotivoRechazoChange}
                getPopupContainer={triggerNode => triggerNode.parentElement}
                popupClassName="motivo-rechazo-dropdown"
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

        {selectedStatus !== REGISTRO_STATUS.PENDIENTE && (
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

        <ButtonGroup>
          <MainButton
            htmlType="submit"
            loading={loading}
            disabled={selectedStatus === REGISTRO_STATUS.PENDIENTE}
            style={{
              opacity: selectedStatus === REGISTRO_STATUS.PENDIENTE ? 0.5 : 1,
              cursor: selectedStatus === REGISTRO_STATUS.PENDIENTE ? 'not-allowed' : 'pointer'
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