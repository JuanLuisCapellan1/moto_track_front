import React, { useState } from 'react';
import { Form, Upload, Row, Col, Typography, Input } from 'antd';
import { InboxOutlined, CheckCircleFilled, CloseCircleFilled, LoadingOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useTheme } from '../../../../context/ThemeContext';
import { useLanguage } from '../../../../context/LanguageContext';
import { usePrimaryColor } from '../../../../context/PrimaryColorContext';

const { Dragger } = Upload;
const { Text } = Typography;

const FormContainer = styled.div`
  margin-top: 20px;
  display: flex;
`;

const inputBorderRadius = '10px';
const inputBorderWidth = '2px';

const StyledFormItem = styled(Form.Item)`
  margin-bottom: 20px;
  
  .ant-form-item-label > label {
    color: ${props => props.theme.token.titleColor};
    font-weight: 500;
  }
  
  .ant-form-item-required::before {
    display: none !important;
  }
  
  .ant-form-item-label > label.ant-form-item-required:not(.ant-form-item-required-mark-optional)::after {
    display: none !important;
  }
`;

const StyledDragger = styled(Dragger)`
  background-color: transparent !important;
  border: ${inputBorderWidth} dashed ${props => props.$isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)'} !important;
  border-radius: ${inputBorderRadius} !important;
  
  &:hover {
    border-color: ${props => props.$primaryColor} !important;
  }
  
  .ant-upload-text {
    color: ${props => props.$isDarkMode ? '#fff' : '#000'};
  }
  
  .ant-upload-hint {
    color: ${props => props.$isDarkMode ? 'rgba(255, 255, 255, 0.65)' : 'rgba(0, 0, 0, 0.65)'};
  }
  
  .ant-upload-drag-icon {
    color: ${props => props.$primaryColor};
  }
`;

const FileStatusContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 8px;
`;

const FileStatusText = styled(Text)`
  margin-left: 8px;
  color: ${props => props.$status === 'success' 
    ? '#52c41a' 
    : props.$status === 'error' 
      ? '#ff4d4f' 
      : props.$isDarkMode ? '#fff' : '#000'};
`;

const UploadWrapper = styled.div`
  width: 100%;
`;

const Documentos = ({ form }) => {
  const { theme, currentTheme } = useTheme();
  const { language } = useLanguage();
  const { primaryColor } = usePrimaryColor();
  const isDarkMode = currentTheme === 'themeDark';
  
  const [fileStatuses, setFileStatuses] = useState({
    driverLicense: null,
    vehicleInsurance: null,
    idCard: null,
    motorInvoice: null
  });
  
  const [fileURLs, setFileURLs] = useState({
    driverLicense: null,
    vehicleInsurance: null,
    idCard: null,
    motorInvoice: null
  });
  
  const translations = {
    es: {
      driverLicense: 'Licencia de Conducir',
      driverLicenseRequired: 'Por favor suba su licencia de conducir',
      vehicleInsurance: 'Seguro de Vehículo',
      vehicleInsuranceRequired: 'Por favor suba su seguro de vehículo',
      idCard: 'Cédula de Identidad (ambos lados)',
      idCardRequired: 'Por favor suba su cédula de identidad',
      motorInvoice: 'Documento de factura del motor',
      motorInvoiceRequired: 'Por favor suba la factura del motor',
      clickToUpload: 'Haga click para subir',
      dragOrClick: 'Arrastre archivos aquí o haga click',
      fileTypes: 'Formatos soportados: JPG, PNG, PDF',
      uploading: 'Subiendo...',
      uploadSuccess: 'Archivo subido exitosamente',
      uploadFailed: 'Error al subir el archivo',
      maxSize: 'Tamaño máximo: 5MB'
    },
    en: {
      driverLicense: 'Driver\'s License',
      driverLicenseRequired: 'Please upload your driver\'s license',
      vehicleInsurance: 'Vehicle Insurance',
      vehicleInsuranceRequired: 'Please upload your vehicle insurance',
      idCard: 'ID Card (both sides)',
      idCardRequired: 'Please upload your ID card',
      motorInvoice: 'Motor Invoice Document',
      motorInvoiceRequired: 'Please upload the motor invoice',
      clickToUpload: 'Click to upload',
      dragOrClick: 'Drag files here or click',
      fileTypes: 'Supported formats: JPG, PNG, PDF',
      uploading: 'Uploading...',
      uploadSuccess: 'File uploaded successfully',
      uploadFailed: 'Failed to upload file',
      maxSize: 'Maximum size: 5MB'
    }
  };
  
  const t = translations[language] || translations.es;
  
  const renderFileStatus = (documentType) => {
    const status = fileStatuses[documentType];
    
    if (!status) return null;
    
    let icon;
    let text;
    
    if (status === 'uploading') {
      icon = <LoadingOutlined style={{ color: primaryColor }} />;
      text = t.uploading;
    } else if (status === 'success') {
      icon = <CheckCircleFilled style={{ color: '#52c41a' }} />;
      text = t.uploadSuccess;
    } else if (status === 'error') {
      icon = <CloseCircleFilled style={{ color: '#ff4d4f' }} />;
      text = t.uploadFailed;
    }
    
    return (
      <FileStatusContainer>
        {icon}
        <FileStatusText $status={status} $isDarkMode={isDarkMode}>
          {text}
        </FileStatusText>
      </FileStatusContainer>
    );
  };
  
  const handleUploadChange = (info, documentType) => {
    const { status } = info.file;
  
    if (status === 'uploading') {
      setFileStatuses(prev => ({ ...prev, [documentType]: 'uploading' }));
      return;
    }
  
    if (status === 'done') {
      setFileStatuses(prev => ({ ...prev, [documentType]: 'success' }));
  
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result;
        setFileURLs(prev => ({ ...prev, [documentType]: dataUrl }));
  
        const fileName = info.file.name;
        const fileExtension = fileName.split('.').pop().toUpperCase();
  
        // Actualizar los valores en el formulario con los nombres de campo exactos
        const fieldUpdates = {};
        fieldUpdates[`${documentType}URL`] = dataUrl;
        fieldUpdates[`${documentType}Name`] = fileName;
        fieldUpdates[`${documentType}Type`] = fileExtension;
        
        form.setFieldsValue(fieldUpdates);
        
        // Log para verificar que se están estableciendo los valores correctamente
        console.log(`File uploaded for ${documentType}:`, {
          url: dataUrl.substring(0, 50) + '...',
          name: fileName,
          type: fileExtension,
          fieldNames: Object.keys(fieldUpdates)
        });
      };
  
      reader.readAsDataURL(info.file.originFileObj);
    } else if (status === 'error') {
      setFileStatuses(prev => ({ ...prev, [documentType]: 'error' }));
    }
  };
  
  const uploadProps = (documentType) => ({
    name: 'file',
    multiple: false,
    action: 'https://api.example.com/upload', // Reemplaza con tu endpoint real
    onChange: (info) => handleUploadChange(info, documentType),
    accept: '.jpg,.jpeg,.png,.pdf',
    maxSize: 5 * 1024 * 1024, // 5MB
    beforeUpload: (file) => {
      const isValidSize = file.size <= 5 * 1024 * 1024;
      if (!isValidSize) {
        setFileStatuses(prev => ({ ...prev, [documentType]: 'error' }));
        return false;
      }
      return true;
    },
    customRequest: ({ onSuccess, file }) => {
      setTimeout(() => {
        onSuccess("ok", null);
      }, 1500);
    }
  });

  // Get hasInsurance value from form
  const hasInsurance = form.getFieldValue('hasInsurance');
  console.log('Has Insurance:', hasInsurance);
  return (
    <FormContainer>
      <Form form={form} layout="vertical" requiredMark={false} style={{ width: '100%' }}>
        {/* Campos ocultos para almacenar datos */}
        <Form.Item name="driverLicenseURL" hidden><Input /></Form.Item>
        <Form.Item name="vehicleInsuranceURL" hidden><Input /></Form.Item>
        <Form.Item name="idCardURL" hidden><Input /></Form.Item>
        <Form.Item name="motorInvoiceURL" hidden><Input /></Form.Item>
        
        <Form.Item name="driverLicenseName" hidden><Input /></Form.Item>
        <Form.Item name="vehicleInsuranceName" hidden><Input /></Form.Item>
        <Form.Item name="idCardName" hidden><Input /></Form.Item>
        <Form.Item name="motorInvoiceName" hidden><Input /></Form.Item>
        
        <Form.Item name="driverLicenseType" hidden><Input /></Form.Item>
        <Form.Item name="vehicleInsuranceType" hidden><Input /></Form.Item>
        <Form.Item name="idCardType" hidden><Input /></Form.Item>
        <Form.Item name="motorInvoiceType" hidden><Input /></Form.Item>
        
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <StyledFormItem 
              name="driverLicense" 
              label={t.driverLicense}
              rules={[{ required: true, message: t.driverLicenseRequired }]}
              theme={theme}
            >
              <UploadWrapper>
                <StyledDragger 
                  {...uploadProps('driverLicense')}
                  $isDarkMode={isDarkMode}
                  $primaryColor={primaryColor}
                >
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined style={{ color: primaryColor, fontSize: 48 }} />
                  </p>
                  <p className="ant-upload-text">{t.dragOrClick}</p>
                  <p className="ant-upload-hint">
                    {t.fileTypes}<br />
                    {t.maxSize}
                  </p>
                </StyledDragger>
                {renderFileStatus('driverLicense')}
              </UploadWrapper>
            </StyledFormItem>
          </Col>
          
          {/* Conditionally render vehicle insurance upload */}
          {hasInsurance === 'yes' && (
            <Col span={24}>
              <StyledFormItem 
                name="vehicleInsurance" 
                label={t.vehicleInsurance}
                rules={[{ required: true, message: t.vehicleInsuranceRequired }]}
                theme={theme}
              >
                <UploadWrapper>
                  <StyledDragger 
                    {...uploadProps('vehicleInsurance')}
                    $isDarkMode={isDarkMode}
                    $primaryColor={primaryColor}
                  >
                    <p className="ant-upload-drag-icon">
                      <InboxOutlined style={{ color: primaryColor, fontSize: 48 }} />
                    </p>
                    <p className="ant-upload-text">{t.dragOrClick}</p>
                    <p className="ant-upload-hint">
                      {t.fileTypes}<br />
                      {t.maxSize}
                    </p>
                  </StyledDragger>
                  {renderFileStatus('vehicleInsurance')}
                </UploadWrapper>
              </StyledFormItem>
            </Col>
          )}
          
          <Col span={24}>
            <StyledFormItem 
              name="idCard" 
              label={t.idCard}
              rules={[{ required: true, message: t.idCardRequired }]}
              theme={theme}
            >
              <UploadWrapper>
                <StyledDragger 
                  {...uploadProps('idCard')}
                  $isDarkMode={isDarkMode}
                  $primaryColor={primaryColor}
                >
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined style={{ color: primaryColor, fontSize: 48 }} />
                  </p>
                  <p className="ant-upload-text">{t.dragOrClick}</p>
                  <p className="ant-upload-hint">
                    {t.fileTypes}<br />
                    {t.maxSize}
                  </p>
                </StyledDragger>
                {renderFileStatus('idCard')}
              </UploadWrapper>
            </StyledFormItem>
          </Col>
          
          <Col span={24}>
            <StyledFormItem 
              name="motorInvoice" 
              label={t.motorInvoice}
              rules={[{ required: true, message: t.motorInvoiceRequired }]}
              theme={theme}
            >
              <UploadWrapper>
                <StyledDragger 
                  {...uploadProps('motorInvoice')}
                  $isDarkMode={isDarkMode}
                  $primaryColor={primaryColor}
                >
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined style={{ color: primaryColor, fontSize: 48 }} />
                  </p>
                  <p className="ant-upload-text">{t.dragOrClick}</p>
                  <p className="ant-upload-hint">
                    {t.fileTypes}<br />
                    {t.maxSize}
                  </p>
                </StyledDragger>
                {renderFileStatus('motorInvoice')}
              </UploadWrapper>
            </StyledFormItem>
          </Col>
        </Row>
      </Form>
    </FormContainer>
  );
};

export default Documentos;
