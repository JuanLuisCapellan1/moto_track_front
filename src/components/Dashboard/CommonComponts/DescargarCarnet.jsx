import React from 'react';
import { Button, message, Modal } from 'antd';
import styled from 'styled-components';
import { DownloadOutlined, FilePdfOutlined, LoadingOutlined } from '@ant-design/icons';
import { jsPDF } from 'jspdf';
import { useTheme } from '../../../context/ThemeContext';
import sdeLogoImage from '../../../assets/Dashboard/CiudadanoDashbaord/AlcaldíaSantoDomingo.png';
import mototrackLogoImage from '../../../assets/Lading/MotoTrackLogo.png';

// Styled components
const DownloadButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PreviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;

const PreviewFrame = styled.div`
  width: 100%;
  max-width: 500px;
  height: 300px;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 16px;
  padding: 16px;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const PlateContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 20px 40px;
  margin: 10px 0 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  width: 80%;
  max-width: 300px;
`;

const PlateNumber = styled.div`
  font-size: 36px;
  font-weight: bold;
  text-align: center;
  letter-spacing: 0.5px; /* Reduce from 1px to 0.5px for less spacing */
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  width: 100%;
  max-width: 450px;
`;

const InfoItem = styled.div`
  margin-bottom: 8px;
`;

const InfoLabel = styled.div`
  font-size: 12px;
  color: #8c8c8c;
`;

const InfoValue = styled.div`
  font-size: 14px;
  font-weight: 500;
`;

/**
 * Component for generating and downloading motorcycle digital carnet as PDF
 */
const DescargarCarnet = ({ 
  motorcycleData = {}, 
  buttonProps = {}, 
  children,
  showPreview = false
}) => {
  const { theme } = useTheme();
  const [loading, setLoading] = React.useState(false);
  const [previewVisible, setPreviewVisible] = React.useState(false);
  
  // Function to generate and download the PDF
  const generateCarnetPDF = async () => {
    setLoading(true);
  
    try {
      const doc = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: [210, 150]
      });
  
      // Set white background
      doc.setFillColor(255, 255, 255);
      doc.rect(0, 0, 210, 150, 'F');
  
      // Add "Carnet Digital" title
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(36);
      doc.text('Carnet Digital', 105, 25, { align: 'center' });
  
      // Add plate number
      const plateText = motorcycleData.placa ?? 'N/A'; // Valor predeterminado
      doc.setFontSize(90);
      doc.text(plateText, 105, 70, { align: 'center' });
      // Add owner information
      const propietario = motorcycleData.propietario ?? 'Propietario no especificado';
      const modelo = motorcycleData.modelo ?? 'Modelo no especificado';
      const chasis = motorcycleData.chasis ?? 'Chasis no especificado';
      const fechaEmision = motorcycleData.fechaEmision
        ? new Date(motorcycleData.fechaEmision).toLocaleDateString()
        : 'Fecha no especificada';
  
      // Left column
      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(120, 120, 120);
      doc.text('Propietario', 30, 105);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(0, 0, 0);
      doc.text(propietario, 30, 112);
  
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(120, 120, 120);
      doc.text('Chasis', 30, 122);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(0, 0, 0);
      doc.text(chasis, 30, 129);
  
      // Right column
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(120, 120, 120);
      doc.text('Motocicleta', 140, 105);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(0, 0, 0);
      doc.text(modelo, 140, 112);
  
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(120, 120, 120);
      doc.text('Fecha de Emisión', 140, 122);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(0, 0, 0);
      doc.text(fechaEmision, 140, 129);
  
      // Save the PDF
      doc.save(`carnet-digital-${plateText}.pdf`);
      message.success('Carnet digital descargado correctamente');
    } catch (error) {
      console.error('Error generating PDF:', error);
      message.error('Error al generar el carnet digital');
    } finally {
      setLoading(false);
    }
  };
  
  // Show preview modal
  const showPreviewModal = () => {
    setPreviewVisible(true);
  };
  
  // Handle download from preview
  const handleDownloadFromPreview = async () => {
    await generateCarnetPDF();
    setPreviewVisible(false);
  };
  
  // Render button or use children
  const renderButton = () => {
    const handleClick = async () => {
      // First run the internal handler
      if (showPreview) {
        showPreviewModal();
      } else {
        await generateCarnetPDF();
      }
      
      // Then run the external handler if provided
      if (buttonProps.onClick) {
        buttonProps.onClick();
      }
    };

    if (children) {
      return React.cloneElement(children, {
        ...buttonProps,
        loading: loading,
        onClick: handleClick
      });
    }
    
    return (
      <DownloadButton
        type="primary"
        icon={loading ? <LoadingOutlined /> : <DownloadOutlined />}
        {...buttonProps}
        loading={loading}
        onClick={handleClick}
      >
        Descargar Carnet
      </DownloadButton>
    );
  };
  
  return (
    <>
      {renderButton()}
      
      <Modal
        title="Vista previa del Carnet Digital"
        open={previewVisible}
        onCancel={() => setPreviewVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setPreviewVisible(false)}>
            Cancelar
          </Button>,
          <Button 
            key="download" 
            type="primary" 
            icon={<DownloadOutlined />} 
            loading={loading}
            onClick={handleDownloadFromPreview}
          >
            Descargar PDF
          </Button>
        ]}
        width={600}
      >
        <PreviewContainer>
          <PreviewFrame>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <h2>Carnet Digital</h2>
            </div>
            
            <PlateContainer>
              <PlateNumber>{motorcycleData.placa}</PlateNumber>
            </PlateContainer>
            
            <InfoGrid>
              <InfoItem>
                <InfoLabel>Propietario</InfoLabel>
                <InfoValue>{motorcycleData.propietario}</InfoValue>
              </InfoItem>
              <InfoItem>
                <InfoLabel>Motocicleta</InfoLabel>
                <InfoValue>{motorcycleData.modelo}</InfoValue>
              </InfoItem>
              <InfoItem>
                <InfoLabel>Registro</InfoLabel>
                <InfoValue>{motorcycleData.registro}</InfoValue>
              </InfoItem>
              <InfoItem>
                <InfoLabel>Emisión</InfoLabel>
                <InfoValue>{motorcycleData.fechaEmision}</InfoValue>
              </InfoItem>
            </InfoGrid>
          </PreviewFrame>
          
          <div>
            <FilePdfOutlined style={{ marginRight: 8 }} />
            El PDF incluirá los logos oficiales y formato completo
          </div>
        </PreviewContainer>
      </Modal>
    </>
  );
};

export default DescargarCarnet;