import React from 'react';
import styled from 'styled-components';
import { Collapse, Divider } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import FAQIntroduction from './FAQIntroduction';

// Increased max-width to use more screen space
const FAQContainer = styled.section`
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  padding: 2rem 2rem 6rem;
  
  @media (max-width: 768px) {
    padding: 1.5rem 1rem 5rem;
  }
`;

// Enhanced styling with larger elements
const StyledCollapse = styled(Collapse)`
  background: transparent;
  border: none;
  width: 100%;
  
  .ant-collapse-item {
    margin-bottom: 0;
    border: none;
    border-radius: 0 !important;
    overflow: hidden;
    transition: all 0.3s ease;
  }
  
  .ant-collapse-header {
    font-weight: 700 !important;
    font-size: 1.25rem !important;
    padding: 24px 32px !important;
    align-items: center !important;
    color: #333 !important;
    
    @media (max-width: 768px) {
      font-size: 1.1rem !important;
      padding: 20px 24px !important;
    }
  }
  
  .ant-collapse-content {
    border-top: none;
  }
  
  .ant-collapse-content-box {
    padding: 0 32px 28px !important;
    font-size: 1.1rem;
    line-height: 1.8;
    color: #555;
    
    @media (max-width: 768px) {
      padding: 0 24px 24px !important;
      font-size: 1rem;
      line-height: 1.7;
    }
  }
  
  // Primary color styling for active panels
  .ant-collapse-item-active .ant-collapse-header {
    color: #6366f1 !important;
  }
`;

const StyledDivider = styled(Divider)`
  margin: 0 !important;
  border-color: rgba(99, 102, 241, 0.1);
`;

// FAQ data structure remains the same
const faqData = [
  {
    question: "¿Qué documentos necesito para registrar mi motocicleta?",
    answer: "En MotoTrack se requiere la carga digital de documentos esenciales: cédula de identidad, factura de compra, certificado de propiedad y, para vehículos importados, la documentación de importación. La plataforma guía al usuario sobre el formato y la calidad requerida para cada archivo, facilitando la validación en tiempo real."
  },
  {
    question: "¿Cuánto tiempo toma el proceso de registro?",
    answer: "Gracias a la automatización y validación instantánea que ofrece MotoTrack, el tiempo de procesamiento se reduce considerablemente. Aunque factores externos (como la verificación por parte de la DGII o el ayuntamiento) pueden influir, el sistema está diseñado para brindar respuesta en un plazo que puede ir de algunas horas hasta 1 o 2 días hábiles."
  },
  {
    question: "¿Cómo puedo verificar el estado de mi solicitud?",
    answer: "MotoTrack incorpora un panel de control personal donde los usuarios pueden consultar en tiempo real el estado de su solicitud. Además, la plataforma envía notificaciones automáticas a través de correo electrónico y, en algunos casos, mediante SMS, asegurando que el usuario esté informado en cada etapa del proceso."
  },
  {
    question: "¿Qué hago si mi solicitud es rechazada?",
    answer: "En caso de rechazo, el sistema MotoTrack notifica al usuario indicando el o los motivos específicos (por ejemplo, documentos incompletos o de baja calidad). Se ofrecerán recomendaciones claras para subsanar el inconveniente, y el usuario podrá corregir la información o volver a cargar la documentación requerida sin necesidad de iniciar un nuevo proceso desde cero."
  },
  {
    question: "¿La matrícula digital tiene la misma validez que la física?",
    answer: "Sí, la matrícula digital emitida a través de MotoTrack cuenta con la misma validez legal que la física, ya que se integra con la emisión oficial a cargo de la DGII. La digitalización garantiza además la autenticidad y el fácil acceso al historial del vehículo."
  },
  {
    question: "¿Puedo realizar el trámite completamente en línea?",
    answer: "El principal objetivo de MotoTrack es facilitar el registro de manera digital. Por ello, la mayoría del trámite se puede realizar en línea mediante la plataforma, incluyendo la carga de documentos y la consulta del estado de la solicitud. En algunos casos, podría requerirse una verificación física puntual (por ejemplo, la toma de una fotografía de la motocicleta), pero estas situaciones serán debidamente indicadas al usuario."
  },
  {
    question: "¿Cuáles son los costos asociados al registro de la motocicleta?",
    answer: "Los costos pueden incluir la tarifa de registro, impuestos locales y cargos administrativos. MotoTrack muestra de forma transparente la estructura tarifaria en su portal, actualizada según la normativa vigente y en coordinación con las entidades oficiales, lo que permite al usuario conocer el detalle de cada costo antes de iniciar el proceso."
  },
  {
    question: "¿Qué hago si pierdo alguno de los documentos requeridos?",
    answer: "Si un documento se extravía, el usuario deberá gestionar su duplicado o copia certificada ante la entidad correspondiente. La plataforma MotoTrack orienta al ciudadano sobre el procedimiento a seguir y, una vez obtenido el documento, permite la actualización del registro de manera sencilla y directa, minimizando retrasos en el proceso."
  }
];

const FAQSection = () => {
  // Transform faqData into the format expected by Collapse's items prop
  const collapseItems = faqData.map((item, index) => ({
    key: `faq-panel-${index}`,
    label: item.question,
    children: (
      <>
        <div>{item.answer}</div>
        {index < faqData.length - 1 && (
          <div className="divider-container" style={{ marginTop: '20px' }}>
            <StyledDivider />
          </div>
        )}
      </>
    )
  }));

  return (
    <>
      <FAQIntroduction />
      <FAQContainer>
        <StyledCollapse 
          bordered={false}
          expandIconPosition="end"
          items={collapseItems}
          expandIcon={({ isActive }) => 
            isActive ? 
              <UpOutlined style={{ color: '#6366f1', fontSize: '18px' }} /> : 
              <DownOutlined style={{ fontSize: '18px', color: '#6366f1' }} />
          }
        />
      </FAQContainer>
    </>
  );
};

export default FAQSection;