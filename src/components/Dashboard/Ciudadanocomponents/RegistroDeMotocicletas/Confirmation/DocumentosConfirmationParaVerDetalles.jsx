import React, { useState } from "react";
import styled from "styled-components";
import { Tag, Tooltip, Spin } from "antd";
import { motion } from "framer-motion";
import { 
  UserOutlined, 
  FilePdfOutlined, 
  FileImageOutlined, 
  EyeOutlined,
  IdcardOutlined,
  CarOutlined,
  SafetyCertificateOutlined
} from '@ant-design/icons';
import { useTheme } from "../../../../../context/ThemeContext";
import { useLanguage } from "../../../../../context/LanguageContext";
import { usePrimaryColor } from "../../../../../context/PrimaryColorContext";
// Importar el Modal personalizado
import Modal from "../../../CommonComponts/Modals";

// Importar imágenes
import registroMunicipalPDF from "../../../../../assets/Dashboard/CiudadanoDashbaord/Registro municipal de motocicletas .pdf";
import licenciaJPG from "../../../../../assets/Dashboard/CiudadanoDashbaord/licencia2.jpg";
import seguroPNG from "../../../../../assets/Dashboard/CiudadanoDashbaord/erseguro.png";
import cedulaJPG from "../../../../../assets/Dashboard/CiudadanoDashbaord/754CEDULARD800.jpg";

// Componentes estilizados
const Card = styled(motion.div)`
  max-width: 100%;
  margin: 0;
  border-radius: 0.5rem;
  overflow: hidden;
  border: 1px solid ${props => props.$isDarkMode ? '#374151' : '#e5e7eb'};
  box-shadow: ${props => props.$isDarkMode ? '0 4px 12px rgba(0, 0, 0, 0.3)' : '0 1px 2px rgba(0, 0, 0, 0.05)'};
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.$isDarkMode ? '0 6px 16px rgba(0, 0, 0, 0.4)' : '0 4px 8px rgba(0, 0, 0, 0.08)'};
  }
`;

const Header = styled.div`
  background-color: ${props => props.bgColor || '#3b82f6'};
  height: 0.5rem;
  width: 100%;
`;

const ContentContainer = styled.div`
  background-color: ${props => props.$isDarkMode 
    ? props.theme?.token?.sidebarBg || '#1f2937' 
    : props.theme?.token?.sidebarBg || '#f9fafb'};
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  padding: 0.75rem;
  flex: 1;
  
  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`;

const FlexContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
`;

const IconContainer = styled.div`
  background-color: ${props => props.$isDarkMode ? 'rgba(255, 255, 255, 0.1)' : props.bgColor || '#eff6ff'};
  border-radius: 50%;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  box-shadow: ${props => props.$isDarkMode ? '0 0 8px rgba(255, 255, 255, 0.1)' : 'none'};
`;

const InfoContainer = styled.div`
  flex: 1;
`;

const Title = styled.h2`
  font-size: 0.85rem;
  font-weight: 700;
  color: ${props => props.$isDarkMode ? '#f9fafb' : '#111827'};
  margin-bottom: 0.1rem;
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const Filename = styled.p`
  color: ${props => props.$isDarkMode ? '#d1d5db' : '#6b7280'};
  font-size: 0.75rem;
  margin-bottom: 0.25rem;
`;

const Description = styled.p`
  color: ${props => props.$isDarkMode ? '#9ca3af' : '#6b7280'};
  font-size: 0.7rem;
  
  @media (max-width: 768px) {
    font-size: 0.75rem;
  }
`;

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 0.75rem;
  background-color: ${props => props.$isDarkMode ? '#0F0F10' : '#F1F2F4'};
  border-top: 1px solid ${props => props.$isDarkMode ? '#374151' : '#e5e7eb'};
  
  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`;

const FileTypeContainer = styled.div`
  display: flex;
  align-items: center;
  color: ${props => props.color || '#3b82f6'};
`;

const StyledIcon = styled.span`
  font-size: 1.25rem;
  color: ${props => props.color || '#3b82f6'};
  opacity: ${props => props.$isDarkMode ? 0.9 : 1};
`;

const ViewButton = styled(motion.button)`
  color: ${props => props.color || '#3b82f6'};
  background: ${props => props.$isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'none'};
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.4rem;
  border-radius: 50%;
  
  &:hover {
    background: ${props => props.$isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.05)'};
  }
`;

const DocumentsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

const PageTitle = styled.h1`
  font-size: 1.25rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 1rem;
  color: ${props => props.$isDarkMode ? '#f9fafb' : '#111827'};
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin-bottom: 0.75rem;
  }
`;

const PageContainer = styled.div`
  padding: 1rem;
  
  @media (max-width: 768px) {
    padding: 0.75rem;
  }
`;

const PreviewImage = styled.img`
  width: 100%;
  max-height: 70vh;
  object-fit: contain;
`;

const PreviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 20px;
`;

const PreviewTitle = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 1.5rem;
  text-align: center;
  color: ${props => props.$isDarkMode ? '#f9fafb' : '#111827'};
`;

const DownloadLink = styled.a`
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background-color: ${props => props.color || props.primaryColor || '#635BFF'};
  color: white;
  border-radius: 0.5rem;
  text-decoration: none;
  font-weight: 500;
  margin-top: 1rem;
  transition: all 0.2s ease;
  
  &:hover {
    opacity: 0.9;
    transform: translateY(-2px);
  }
`;

// Add these new styled components
const PDFMessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  text-align: center;
  padding: 1.5rem;
  border-radius: 0.5rem;
  background-color: ${props => props.$isDarkMode 
    ? props.theme?.token?.contentBg || '#111827' 
    : props.theme?.token?.contentBg || '#f8f9fa'};
`;

const PDFMessage = styled.p`
  margin-bottom: 1rem;
  color: ${props => props.$isDarkMode ? '#d1d5db' : '#6b7280'};
  font-size: 1rem;
`;

const ButtonContainer = styled.div`
  margin-top: 1rem;
`;

// Add new styled component for the spinner container
const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
`;

const DocumentCard = ({ 
  title, 
  fileName, 
  description, 
  fileType = "PDF", 
  iconColor, 
  bgColor, 
  iconBgColor,
  icon,
  filePath
}) => {
  const { currentTheme } = useTheme();
  const { primaryColor } = usePrimaryColor(); // Add this line to get primaryColor
  const isDarkMode = currentTheme === 'themeDark';
  const [previewVisible, setPreviewVisible] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  
  // Determine icon based on fileType
  const getFileIcon = () => {
    return fileType.toUpperCase() === "PDF" ? 
      <FilePdfOutlined style={{ color: iconColor, fontSize: '1rem', marginRight: '0.25rem' }} /> : 
      <FileImageOutlined style={{ color: iconColor, fontSize: '1rem', marginRight: '0.25rem' }} />;
  };

  const showPreview = () => {
    setPreviewVisible(true);
  };

  const handleClose = () => {
    setPreviewVisible(false);
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  return (
    <>
      <Card 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        $isDarkMode={isDarkMode}
      >
        {/* Header color bar */}
        <Header bgColor={bgColor} />

        <ContentContainer $isDarkMode={isDarkMode}>
          {/* Main content */}
          <Content>
            <FlexContainer>
              {/* Icon */}
              <IconContainer bgColor={iconBgColor} $isDarkMode={isDarkMode}>
                <StyledIcon color={iconColor}>
                  {icon}
                </StyledIcon>
              </IconContainer>

              {/* Document information */}
              <InfoContainer>
                <Title $isDarkMode={isDarkMode}>{title}</Title>
                <Filename $isDarkMode={isDarkMode}>{fileName}</Filename>
                <Description $isDarkMode={isDarkMode}>{description}</Description>
              </InfoContainer>
            </FlexContainer>
          </Content>

          {/* Footer with file type and actions */}
          <Footer $isDarkMode={isDarkMode}>
            <FileTypeContainer color={iconColor}>
              {getFileIcon()}
              <Tag color={iconColor}>{fileType.toUpperCase()}</Tag>
            </FileTypeContainer>

            <Tooltip title="Ver documento">
              <ViewButton 
                color={iconColor}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={showPreview}
                $isDarkMode={isDarkMode}
              >
                <EyeOutlined style={{ fontSize: '1rem' }} />
              </ViewButton>
            </Tooltip>
          </Footer>
        </ContentContainer>
      </Card>

      {/* Usar el Modal personalizado en lugar del de Ant Design */}
      <Modal 
        show={previewVisible} 
        onClose={handleClose}
        width={fileType.toUpperCase() === "JPG" || fileType.toUpperCase() === "PNG" || fileType.toUpperCase() === "JPEG" ? "80%" : "500px"}
        height={fileType.toUpperCase() === "JPG" || fileType.toUpperCase() === "PNG" || fileType.toUpperCase() === "JPEG" ? "80vh" : "auto"}
        mobileHeight="70vh"
        zIndex={9999}
      >
        <PreviewContainer>
          <PreviewTitle $isDarkMode={isDarkMode}>
            {title} - {fileName}
          </PreviewTitle>
          
          {fileType && (fileType.toUpperCase() === "JPG" || fileType.toUpperCase() === "PNG" || fileType.toUpperCase() === "JPEG") ? (
            <>
              {imageLoading && (
                <SpinnerContainer>
                  <Spin size="large" />
                </SpinnerContainer>
              )}
              <PreviewImage 
                src={filePath} 
                alt={fileName}
                onLoad={handleImageLoad}
                style={{ display: imageLoading ? 'none' : 'block' }}
              />
            </>
          ) : (
            fileType && fileType.toUpperCase() === "PDF" ? (
              <>
                <p>Vista previa de PDF no disponible directamente.</p>
                <DownloadLink 
                  href={filePath} 
                  download={fileName}
                  color={primaryColor}
                  primaryColor={primaryColor}
                >
                  Descargar PDF
                </DownloadLink>
              </>
            ) : (
              <p>Tipo de archivo no soportado.</p>
            )
          )}
        </PreviewContainer>
      </Modal>
    </>
  );
};

const getFileExtension = (filePath) => {
  // Verificar si filePath es una cadena válida
  if (typeof filePath !== 'string' || !filePath.includes('.')) return 'UNKNOWN';

  try {
    // Extraer la última parte de la URL (el nombre del archivo)
    const fileName = filePath.split('/').pop();
    // Extraer la extensión del archivo
    const extension = fileName.split('.').pop().toUpperCase();
    return extension;
  } catch (error) {
    console.error('Error extracting file extension:', error);
    return 'UNKNOWN';
  }
};

const getFileNameFromUrl = (url) => {
  if (typeof url !== 'string' || !url.includes('/')) {
    return 'UNKNOWN';
  }

  try {
    // Extraer la última parte de la URL (el nombre del archivo)
    const fileName = url.split('/').pop();
    return fileName || 'UNKNOWN';
  } catch (error) {
    console.error('Error extracting file name:', error);
    return 'UNKNOWN';
  }
};

// Demo de los cuatro tipos de documentos
export default function DocumentosConfirmation({ data }) {
  const { currentTheme } = useTheme();
  const { language } = useLanguage();
  const isDarkMode = currentTheme === 'themeDark';
  
  // Translations object
  const translations = {
    en: {
      pageTitle: "Required Documents",
      license: {
        title: "Driver's License",
        fileName: "License.jpg",
        description: "Official document authorizing vehicle operation"
      },
      insurance: {
        title: "Vehicle Insurance",
        fileName: "insurance.pdf",
        description: "Active insurance policy for the motorcycle"
      },
      id: {
        title: "National ID",
        fileName: "id.png", // Cambiado a PNG
        description: "Official identity document (both sides)"
      },
      registration: {
        title: "Motor Invoice",
        fileName: "motor_invoice.pdf",
        description: "Purchase invoice document for the motorcycle"
      }
    },
    es: {
      pageTitle: "Documentos Requeridos",
      license: {
        title: "Licencia de Conducir",
        fileName: "Licencia.jpg",
        description: "Documento oficial que autoriza a conducir vehículos"
      },
      insurance: {
        title: "Seguro de Vehículo",
        fileName: "seguro.pdf",
        description: "Póliza de seguro vigente para la motocicleta"
      },
      id: {
        title: "Cédula de Identidad",
        fileName: "cedula.png", // Cambiado a PNG
        description: "Documento de identidad oficial (ambos lados)"
      },
      registration: {
        title: "Factura del Motor",
        fileName: "factura_motor.pdf",
        description: "Documento de factura de compra del motor"
      }
    }
  };

  // Get current language translations, defaulting to Spanish
  const t = translations[language] || translations.es;

  // Document data with specific color themes per document
  const documents = [
    {
      id: 1,
      title: t.license.title,
      fileName: getFileNameFromUrl(data?.solicitud?.documentos?.licencia),
      description: t.license.description,
      fileType: getFileExtension(data?.solicitud?.documentos?.licencia),
      // Blue
      bgColor: "#1890ff",
      iconBgColor: "#e6f7ff", 
      icon: <IdcardOutlined />,
      filePath: data?.solicitud?.documentos?.licencia
    },
      ...(data?.solicitud?.documentos?.seguro ? [{
        id: 2,
        title: t.insurance.title,
        fileName: getFileNameFromUrl(data?.solicitud?.documentos?.seguro),
        description: t.insurance.description,
        fileType: getFileExtension(data?.solicitud?.documentos?.seguro),
        iconColor: "#52c41a", // Green
        bgColor: "#52c41a",
        iconBgColor: "#f6ffed",
        icon: <SafetyCertificateOutlined />,
        filePath: data?.solicitud?.documentos?.seguro
      }] : []),
    {
      id: 3,
      title: t.id.title,
      fileName: getFileNameFromUrl(data?.solicitud?.documentos?.cedula),
      description: t.id.description,
      fileType: getFileExtension(data?.solicitud?.documentos?.cedula),
      iconColor: "#fa8c16", // Orange
      bgColor: "#fa8c16",
      iconBgColor: "#fff7e6",
      icon: <UserOutlined />,
      filePath: data?.solicitud?.documentos?.cedula
    },
    {
      id: 4,
      title: t.registration.title,
      fileName: getFileNameFromUrl(data?.solicitud?.documentos?.facturaVehiculo),
      description: t.registration.description,
      fileType: getFileExtension(data?.solicitud?.documentos?.facturaVehiculo),
      iconColor: "#722ed1", // Purple
      bgColor: "#722ed1",
      iconBgColor: "#f9f0ff",
      icon: <CarOutlined />,
      filePath: data?.solicitud?.documentos?.facturaVehiculo
    }
  ];

  return (
    <PageContainer>
      <PageTitle $isDarkMode={isDarkMode}>
        {t.pageTitle}
      </PageTitle>
      
      <DocumentsGrid>
        {documents.map((doc) => (
          <DocumentCard 
            key={doc.id}
            title={doc.title}
            fileName={doc.fileName}
            description={doc.description}
            fileType={doc.fileType}
            iconColor={doc.iconColor}
            bgColor={doc.bgColor}
            iconBgColor={doc.iconBgColor}
            icon={doc.icon}
            filePath={doc.filePath}
          />
        ))}
      </DocumentsGrid>
    </PageContainer>
  );
}