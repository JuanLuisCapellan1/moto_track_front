import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Steps, Card, Input as AntdInput, Select as AntdSelect, Radio } from "antd";
import { CheckOutlined, UploadOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";

const Container = styled(motion.div)`
  max-width: 1000px; /* Reduced from 1200px */
  margin: 0 auto;
  padding: 1.5rem; /* Reduced from 2rem */
  
  @media (max-width: 768px) {
    padding: 1rem 0.5rem;
  }
`;

// Create a motion version of Card first
const MotionCard = motion.create(Card);

// Then style the motion component
const StyledCard = styled(MotionCard)`
  max-width: 650px; /* Reduced from 800px */
  margin: 0 auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 768px) {
    .ant-card-body {
      padding: 16px 12px;
    }
  }
`;

// Fixed height regardless of content - increased height for mobile
const CardContent = styled.div`
  height: 527px; /* Altura para desktop */
  display: flex;
  flex-direction: column;
  position: relative;
  overflow-y: auto;
  
  @media (max-width: 768px) {
    height: 680px; /* Aumentado de 620px para mostrar los campos adicionales de seguro */
  }
`;

const FormSection = styled.div`
  margin-bottom: 0.75rem; /* Reduced from 1rem */
  flex: 1;
  
  @media (max-width: 768px) {
    margin-bottom: 0.5rem;
  }
`;

// Smaller container specifically for document section
const DocumentFormSection = styled(FormSection)`
  max-height: 430px; /* Reduced from 580px */
  overflow-y: auto;
  padding-right: 10px;
  
  & > div:last-child {
    margin-bottom: 20px; /* Reduced from 30px */
  }
  
  @media (max-width: 768px) {
    max-height: 380px;
    padding-right: 3px;
    
    & > div:last-child {
      margin-bottom: 12px;
    }
  }
`;

const FieldContainer = styled.div`
  margin-bottom: 0.75rem; /* Reduced from 1rem */
  
  @media (max-width: 768px) {
    margin-bottom: 0.5rem;
  }
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  
  @media (max-width: 768px) {
    font-size: 0.85rem;
    margin-bottom: 0.2rem;
  }
`;

// Smaller upload containers
const UploadContainer = styled.div`
  border: 2px dashed ${(props) => (props.$active ? "#635BFF" : "#ccc")};
  border-radius: 8px;
  padding: 12px; /* Reduced from 16px */
  text-align: center;
  background-color: ${(props) => (props.$active ? "#F0F5FF" : "transparent")};
  transition: all 0.3s;
  cursor: pointer;
  
  @media (max-width: 768px) {
    padding: 6px;
    border-width: 1px;
    
    p {
      font-size: 0.85rem;
      margin-top: 2px;
    }
  }
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem; /* Reduced from 1rem */
  margin-bottom: 0.75rem; /* Reduced from 1rem */
  
  @media (max-width: 768px) {
    gap: 0.35rem;
    margin-bottom: 0.4rem;
  }
`;

const Column = styled.div`
  flex: 1;
  min-width: 200px;
  
  @media (max-width: 768px) {
    min-width: 100%;
  }
`;

const AnimatedDiv = styled(motion.div)`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

// Enhanced steps with larger circles, visible titles and connecting line
const StyledSteps = styled(Steps)`
  margin: 1.5rem 0;
  padding: 0 0.75rem;
  
  /* Increase step icon size */
  .ant-steps-item-icon {
    width: 36px;
    height: 36px;
    line-height: 36px;
    font-size: 16px;
  }
  
  /* Style for active step */
  .ant-steps-item-process .ant-steps-item-icon {
    background-color: #635BFF;
    border-color: #635BFF;
  }
  
  /* Style for completed steps */
  .ant-steps-item-finish .ant-steps-item-icon {
    border-color: #635BFF;
    background-color: #fff;
  }
  
  .ant-steps-item-finish .ant-steps-item-icon > .ant-steps-icon {
    color: #635BFF;
  }
  
  /* Make connecting lines thinner and consistent */
  .ant-steps-item-container > .ant-steps-item-content > .ant-steps-item-title::after {
    height: 1px !important;
    top: 16px !important;
  }
  
  /* Finished line color with consistent height */
  .ant-steps-item-finish > .ant-steps-item-container > .ant-steps-item-content > .ant-steps-item-title::after {
    background-color: #635BFF;
  }
  
  /* Pending line color with consistent height */
  .ant-steps-item-wait > .ant-steps-item-container > .ant-steps-item-content > .ant-steps-item-title::after {
    background-color: #e8e8e8;
  }
  
  /* Style step titles */
  .ant-steps-item-title {
    font-size: 14px;
    color: #666;
    font-weight: 500;
  }
  
  /* Active step title */
  .ant-steps-item-process .ant-steps-item-title {
    color: #635BFF;
    font-weight: 600;
  }
  
  /* Completed step title */
  .ant-steps-item-finish .ant-steps-item-title {
    color: #635BFF;
  }
  
  @media (max-width: 768px) {
    margin: 1rem 0;
    padding: 0 0.25rem;
    
    /* Force horizontal layout on mobile */
    &.ant-steps-vertical {
      display: flex !important;
      flex-direction: row !important;
    }
    
    /* Ensure steps are displayed horizontally with proper spacing */
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    
    .ant-steps-item {
      padding-right: 0 !important;
      margin-right: 0 !important;
      flex: 1;
    }
    
    .ant-steps-item-icon {
      width: 28px;
      height: 28px;
      line-height: 28px;
      font-size: 14px;
      margin: 0 auto;
    }
    
    .ant-steps-item-container {
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    
    /* Remove title for cleaner horizontal layout */
    .ant-steps-item-title {
      display: none;
    }
    
    /* Adjust connecting lines */
    .ant-steps-item-tail {
      padding: 0 !important;
      margin: 0 !important;
      position: absolute;
      top: 14px;
      left: 50%;
      width: 100%;
      height: 1px !important;
    }
    
    .ant-steps-item-container > .ant-steps-item-content > .ant-steps-item-title::after {
      top: 14px !important;
      left: calc(50% + 16px) !important;
      width: calc(100% - 32px) !important;
    }
    
    /* Force horizontal layout */
    .ant-steps-item {
      display: inline-block !important;
      flex: 1;
    }
  }
`;

// Styled inputs to appear enabled but smaller on mobile
const StyledInput = styled(AntdInput)`
  &.ant-input[readonly] {
    background-color: #fff;
    border-color: #d9d9d9;
    cursor: text;
    color: rgba(0, 0, 0, 0.85);
    box-shadow: none;
  }
  
  &:hover {
    border-color: #635BFF;
  }
  
  @media (max-width: 768px) {
    height: 28px;
    font-size: 0.85rem;
    padding: 2px 6px;
    
    &.ant-input[type="date"] {
      padding: 0 6px;
    }
  }
`;

const StyledSelect = styled(AntdSelect)`
  &.ant-select-disabled .ant-select-selector {
    background-color: #fff !important;
    color: rgba(0, 0, 0, 0.85) !important;
    cursor: text;
  }
  
  &:hover .ant-select-selector {
    border-color: #635BFF !important;
  }
  
  @media (max-width: 768px) {
    .ant-select-selector {
      height: 28px !important;
      padding: 0 6px !important;
    }
    
    .ant-select-selection-item {
      line-height: 26px !important;
      font-size: 0.85rem;
    }
  }
`;

const AnimatedTitle = styled(motion.h2)`
  margin-bottom: 0.5rem;
  color: #333;
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
    margin-bottom: 0.3rem;
  }
`;

const { Option } = AntdSelect;

export default function HowItWorksExample() {
  const [currentStep, setCurrentStep] = useState(1);
  const [progress, setProgress] = useState(25);
  const [isAnimating, setIsAnimating] = useState(true);
  const [resetAnimation, setResetAnimation] = useState(false);

  // Datos personales actualizados
  const [personalData, setPersonalData] = useState({
    nombre: "",
    sexo: "",
    cedula: "",
    telefono: "",
    estadoCivil: "",
    fechaNacimiento: "",
    correo: "",
    direccion: "",
    sector: "",
  });

  // Datos de la motocicleta actualizados
  const [motorcycleData, setMotorcycleData] = useState({
    marca: "",
    modelo: "",
    año: "",
    color: "",
    cilindraje: "",
    tipoUso: "",
    numeroChasis: "",
    tieneSeguro: "",
    proveedorSeguro: "",
    numeroPoliza: "",
  });

  // Documentos
  const [documents, setDocuments] = useState({
    licenciaConducir: false,
    seguroVehiculo: false,
    cedulaIdentidad: false,
    documentoDerecho: false,
  });

  const containerRef = useRef(null);

  // Función para simular escritura de texto
  const typeText = (text, setter, delay, callback) => {
    let i = 0;
    const typing = setInterval(() => {
      if (i <= text.length) {
        setter(text.substring(0, i));
        i++;
      } else {
        clearInterval(typing);
        if (callback) setTimeout(callback, 500); // Increased from 100ms
      }
    }, delay); // Removed the 0.4 multiplier to use full delay value
    return typing;
  };

  // Animación para llenar los datos personales
  const animatePersonalData = () => {
    setTimeout(() => {
      typeText("Ilia Topuria", (value) =>
        setPersonalData((prev) => ({ ...prev, nombre: value })), 40, () => { // Increased from 20
          setTimeout(() => {
            setPersonalData((prev) => ({ ...prev, sexo: "masculino" }));
            setTimeout(() => {
              typeText("402-1234567-8", (value) =>
                setPersonalData((prev) => ({ ...prev, cedula: value })), 40, () => { // Increased from 20
                  setTimeout(() => {
                    typeText("809-555-1234", (value) =>
                      setPersonalData((prev) => ({ ...prev, telefono: value })), 40, () => { // Increased from 20
                        setTimeout(() => {
                          setPersonalData((prev) => ({ ...prev, estadoCivil: "soltero" }));
                          setTimeout(() => {
                            setPersonalData((prev) => ({ ...prev, fechaNacimiento: "1997-01-21" }));
                            setTimeout(() => {
                              typeText("ilia.topuria@example.com", (value) =>
                                setPersonalData((prev) => ({ ...prev, correo: value })), 40, () => { // Increased from 20
                                  setTimeout(() => {
                                    typeText("Calle Principal #123", (value) =>
                                      setPersonalData((prev) => ({ ...prev, direccion: value })), 40, () => { // Increased from 20
                                        setTimeout(() => {
                                          setPersonalData((prev) => ({ ...prev, sector: "Villa Faro" }));
                                          setTimeout(() => {
                                            setCurrentStep(2);
                                            setProgress(50);
                                            if (containerRef.current) containerRef.current.scrollTop = 0;
                                          }, 600); // Increased from 150
                                        }, 400); // Increased from 100
                                      }
                                    );
                                  }, 400); // Increased from 100
                                }
                              );
                            }, 400); // Increased from 100
                          }, 400); // Increased from 100
                        }, 400); // Increased from 100
                      }
                    );
                  }, 400); // Increased from 100
                }
              );
            }, 400); // Increased from 100
          }, 400); // Increased from 100
        }
      );
    }, 800); // Increased from 300
  };

  // Animación para llenar los datos de la motocicleta
  const animateMotorcycleData = () => {
    setTimeout(() => {
      setMotorcycleData((prev) => ({ ...prev, marca: "Yamaha" }));
      setTimeout(() => {
        setMotorcycleData((prev) => ({ ...prev, modelo: "MT-07" }));
        setTimeout(() => {
          setMotorcycleData((prev) => ({ ...prev, año: "2023" }));
          setTimeout(() => {
            setMotorcycleData((prev) => ({ ...prev, color: "Negro" }));
            setTimeout(() => {
              typeText("689cc", (value) =>
                setMotorcycleData((prev) => ({ ...prev, cilindraje: value })), 20, () => {
                  setTimeout(() => {
                    setMotorcycleData((prev) => ({ ...prev, tipoUso: "Personal" }));
                    setTimeout(() => {
                      typeText("JYARM0415PA012345", (value) =>
                        setMotorcycleData((prev) => ({ ...prev, numeroChasis: value })), 20, () => {
                          setTimeout(() => {
                            setMotorcycleData((prev) => ({ ...prev, tieneSeguro: "si" }));
                            setTimeout(() => {
                              setMotorcycleData((prev) => ({ ...prev, proveedorSeguro: "Mapfre" }));
                              setTimeout(() => {
                                typeText("MPF-789456123", (value) =>
                                  setMotorcycleData((prev) => ({ ...prev, numeroPoliza: value })), 20, () => {
                                    setTimeout(() => {
                                      setCurrentStep(3);
                                      setProgress(75);
                                      if (containerRef.current) containerRef.current.scrollTop = 0;
                                    }, 150);
                                  }
                                );
                              }, 100);
                            }, 100);
                          }, 100);
                        }
                      );
                    }, 100);
                  }, 100);
                }
              );
            }, 100);
          }, 100);
        }, 100);
      }, 100);
    }, 300);
  };

  // Animación para la carga de documentos
  const animateDocuments = () => {
    setTimeout(() => {
      setDocuments((prev) => ({ ...prev, licenciaConducir: true }));
      setTimeout(() => {
        setDocuments((prev) => ({ ...prev, seguroVehiculo: true }));
        setTimeout(() => {
          setDocuments((prev) => ({ ...prev, cedulaIdentidad: true }));
          setTimeout(() => {
            setDocuments((prev) => ({ ...prev, documentoDerecho: true }));
            setTimeout(() => {
              setCurrentStep(4);
              setProgress(100);
              if (containerRef.current) containerRef.current.scrollTop = 0;
              setTimeout(() => {
                setResetAnimation(true);
              }, 3000);
            }, 150);
          }, 200);
        }, 200);
      }, 200);
    }, 300);
  };

  useEffect(() => {
    if (!isAnimating) return;
    let timeoutId;
    if (currentStep === 1) {
      timeoutId = animatePersonalData();
    } else if (currentStep === 2) {
      timeoutId = animateMotorcycleData();
    } else if (currentStep === 3) {
      timeoutId = animateDocuments();
    }
    return () => clearTimeout(timeoutId);
  }, [currentStep, isAnimating]);

  useEffect(() => {
    if (resetAnimation) {
      setCurrentStep(1);
      setProgress(25);
      setPersonalData({
        nombre: "",
        sexo: "",
        cedula: "",
        telefono: "",
        estadoCivil: "",
        fechaNacimiento: "",
        correo: "",
        direccion: "",
        sector: "",
      });
      setMotorcycleData({
        marca: "",
        modelo: "",
        año: "",
        color: "",
        cilindraje: "",
        tipoUso: "",
        numeroChasis: "",
        tieneSeguro: "",
        proveedorSeguro: "",
        numeroPoliza: "",
      });
      setDocuments({
        licenciaConducir: false,
        seguroVehiculo: false,
        cedulaIdentidad: false,
        documentoDerecho: false,
      });
      setResetAnimation(false);
      if (containerRef.current) containerRef.current.scrollTop = 0;
    }
  }, [resetAnimation]);

  const stepDescriptions = [
    "Ingrese sus datos personales para el registro",
    "Ingrese la información de su motocicleta",
    "Todos los documentos deben estar vigentes y ser legibles. Formatos aceptados: PDF, JPG o PNG.",
    "Su información ha sido enviada exitosamente. Un representante se pondrá en contacto en las próximas 24-48 horas.",
  ];

  return (
    <Container 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      ref={containerRef}
    >
      <StyledCard
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
      >
        <StyledSteps
          current={currentStep - 1}
          direction="horizontal"
          items={[
            { title: "" },
            { title: "" },
            { title: "" },
            { title: "" },
          ]}
        />
        
        <CardContent>
          <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
            <p>{stepDescriptions[currentStep - 1]}</p>
          </div>
          
          {currentStep === 1 && (
            <AnimatedDiv initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
              <FormSection>
                <Row>
                  <Column>
                    <Label htmlFor="nombre">Nombre Completo</Label>
                    <StyledInput id="nombre" value={personalData.nombre} readOnly />
                  </Column>
                  <Column>
                    <Label htmlFor="sexo">Sexo</Label>
                    <StyledSelect value={personalData.sexo || undefined} style={{ width: "100%" }} disabled>
                      <Option value="masculino">Masculino</Option>
                      <Option value="femenino">Femenino</Option>
                      <Option value="otro">Otro</Option>
                    </StyledSelect>
                  </Column>
                </Row>
                <FieldContainer>
                  <Label htmlFor="cedula">Cédula de Identidad / Pasaporte</Label>
                  <StyledInput id="cedula" value={personalData.cedula} readOnly />
                </FieldContainer>
                <Row>
                  <Column>
                    <Label htmlFor="telefono">Teléfono</Label>
                    <StyledInput id="telefono" value={personalData.telefono} readOnly />
                  </Column>
                  <Column>
                    <Label htmlFor="estadoCivil">Estado Civil</Label>
                    <StyledSelect value={personalData.estadoCivil || undefined} style={{ width: "100%" }} disabled>
                      <Option value="soltero">Soltero/a</Option>
                      <Option value="casado">Casado/a</Option>
                      <Option value="divorciado">Divorciado/a</Option>
                      <Option value="viudo">Viudo/a</Option>
                    </StyledSelect>
                  </Column>
                  <Column>
                    <Label htmlFor="fechaNacimiento">Fecha de Nacimiento</Label>
                    <StyledInput id="fechaNacimiento" type="date" value={personalData.fechaNacimiento} readOnly />
                  </Column>
                </Row>
                <FieldContainer>
                  <Label htmlFor="correo">Correo Electrónico</Label>
                  <StyledInput id="correo" type="email" value={personalData.correo} readOnly />
                </FieldContainer>
                <Row>
                  <Column>
                    <Label htmlFor="direccion">Dirección</Label>
                    <StyledInput id="direccion" value={personalData.direccion} readOnly />
                  </Column>
                  <Column>
                    <Label htmlFor="sector">Sector</Label>
                    <StyledSelect value={personalData.sector || undefined} style={{ width: "100%" }} disabled>
                      <Option value="Villa Faro">Villa Faro, Santo Domingo Este</Option>
                      <Option value="Piantini">Piantini</Option>
                      <Option value="Naco">Naco</Option>
                      <Option value="Arroyo Hondo">Arroyo Hondo</Option>
                    </StyledSelect>
                  </Column>
                </Row>
              </FormSection>
            </AnimatedDiv>
          )}
          {currentStep === 2 && (
            <AnimatedDiv initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
              <FormSection>
                <Row>
                  <Column>
                    <Label htmlFor="marca">Marca</Label>
                    <StyledSelect value={motorcycleData.marca || undefined} style={{ width: "100%" }} disabled>
                      <Option value="Yamaha">Yamaha</Option>
                      <Option value="Honda">Honda</Option>
                      <Option value="Suzuki">Suzuki</Option>
                      <Option value="Kawasaki">Kawasaki</Option>
                      <Option value="Bajaj">Bajaj</Option>
                    </StyledSelect>
                  </Column>
                  <Column>
                    <Label htmlFor="modelo">Modelo</Label>
                    <StyledSelect value={motorcycleData.modelo || undefined} style={{ width: "100%" }} disabled>
                      <Option value="MT-07">MT-07</Option>
                      <Option value="CBR 250">CBR 250</Option>
                      <Option value="YZF R3">YZF R3</Option>
                      <Option value="Ninja 400">Ninja 400</Option>
                      <Option value="Pulsar NS200">Pulsar NS200</Option>
                    </StyledSelect>
                  </Column>
                </Row>
                <Row>
                  <Column>
                    <Label htmlFor="año">Año</Label>
                    <StyledSelect value={motorcycleData.año || undefined} style={{ width: "100%" }} disabled>
                      <Option value="2023">2023</Option>
                      <Option value="2022">2022</Option>
                      <Option value="2021">2021</Option>
                      <Option value="2020">2020</Option>
                      <Option value="2019">2019</Option>
                    </StyledSelect>
                  </Column>
                  <Column>
                    <Label htmlFor="color">Color</Label>
                    <StyledSelect value={motorcycleData.color || undefined} style={{ width: "100%" }} disabled>
                      <Option value="Negro">Negro</Option>
                      <Option value="Rojo">Rojo</Option>
                      <Option value="Azul">Azul</Option>
                      <Option value="Blanco">Blanco</Option>
                      <Option value="Gris">Gris</Option>
                    </StyledSelect>
                  </Column>
                  <Column>
                    <Label htmlFor="cilindraje">Cilindraje (cc)</Label>
                    <StyledInput id="cilindraje" value={motorcycleData.cilindraje} readOnly />
                  </Column>
                </Row>
                <Row>
                  <Column>
                    <Label htmlFor="tipoUso">Tipo de Uso</Label>
                    <StyledSelect value={motorcycleData.tipoUso || undefined} style={{ width: "100%" }} disabled>
                      <Option value="Personal">Personal</Option>
                      <Option value="Comercial">Comercial</Option>
                      <Option value="Deportivo">Deportivo</Option>
                    </StyledSelect>
                  </Column>
                  <Column>
                    <Label htmlFor="numeroChasis">Número de Chasis</Label>
                    <StyledInput id="numeroChasis" value={motorcycleData.numeroChasis} readOnly />
                  </Column>
                </Row>
                <FieldContainer>
                  <Label>Seguro</Label>
                  <Radio.Group value={motorcycleData.tieneSeguro} disabled>
                    <Radio value="si">Sí</Radio>
                    <Radio value="no">No</Radio>
                  </Radio.Group>
                </FieldContainer>
                {motorcycleData.tieneSeguro === "si" && (
                  <Row>
                    <Column>
                      <Label htmlFor="proveedorSeguro">Proveedor de Seguro</Label>
                      <StyledSelect value={motorcycleData.proveedorSeguro || undefined} style={{ width: "100%" }} disabled>
                        <Option value="Mapfre">Mapfre</Option>
                        <Option value="Seguros Patria">Seguros Patria</Option>
                        <Option value="Seguros Universal">Seguros Universal</Option>
                        <Option value="Seguros Sura">Seguros Sura</Option>
                      </StyledSelect>
                    </Column>
                    <Column>
                      <Label htmlFor="numeroPoliza">Número de Póliza</Label>
                      <StyledInput id="numeroPoliza" value={motorcycleData.numeroPoliza} readOnly />
                    </Column>
                  </Row>
                )}
              </FormSection>
            </AnimatedDiv>
          )}
          
          {currentStep === 3 && (
            <AnimatedDiv initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
              <DocumentFormSection>
                {/* Document upload sections */}
                <FieldContainer>
                  <Label>Licencia de Conducir</Label>
                  <UploadContainer $active={documents.licenciaConducir} onClick={() => {}}>
                    <UploadOutlined style={{ fontSize: "20px", marginBottom: "4px", color: documents.licenciaConducir ? "#635BFF" : "#aaa" }} />
                    {documents.licenciaConducir ? (
                      <p style={{ color: "#635BFF", fontWeight: "500", margin: "0" }}>Archivo subido: licencia_conducir.pdf</p>
                    ) : (
                      <p style={{ color: "#777", margin: "0" }}>Haga click para subir</p>
                    )}
                  </UploadContainer>
                </FieldContainer>

                <FieldContainer>
                  <Label>Seguro de Vehículo</Label>
                  <UploadContainer $active={documents.seguroVehiculo} onClick={() => {}}>
                    <UploadOutlined style={{ fontSize: "20px", marginBottom: "4px", color: documents.seguroVehiculo ? "#635BFF" : "#aaa" }} />
                    {documents.seguroVehiculo ? (
                      <p style={{ color: "#635BFF", fontWeight: "500", margin: "0" }}>Archivo subido: seguro_vehiculo.pdf</p>
                    ) : (
                      <p style={{ color: "#777", margin: "0" }}>Haga click para subir</p>
                    )}
                  </UploadContainer>
                </FieldContainer>

                <FieldContainer>
                  <Label>Cédula de Identidad (ambos lados)</Label>
                  <UploadContainer $active={documents.cedulaIdentidad} onClick={() => {}}>
                    <UploadOutlined style={{ fontSize: "20px", marginBottom: "4px", color: documents.cedulaIdentidad ? "#635BFF" : "#aaa" }} />
                    {documents.cedulaIdentidad ? (
                      <p style={{ color: "#635BFF", fontWeight: "500", margin: "0" }}>Archivo subido: cedula_identidad.jpg</p>
                    ) : (
                      <p style={{ color: "#777", margin: "0" }}>Haga click para subir</p>
                    )}
                  </UploadContainer>
                </FieldContainer>
              
              </DocumentFormSection>
            </AnimatedDiv>
          )}
          
          {currentStep === 4 && (
            <AnimatedDiv 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ duration: 0.8 }}
              style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
            >
              <div style={{ textAlign: "center", padding: "2rem" }}>
                <div
                  style={{
                    marginBottom: "1rem",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#F0F5FF",
                    borderRadius: "50%",
                    width: "96px",
                    height: "96px"
                  }}
                >
                  <CheckOutlined style={{ fontSize: "48px", color: "#635BFF" }} />
                </div>
                <h2 style={{ marginBottom: "0.5rem" }}>¡Registro Completado con Éxito!</h2>
                <p style={{ marginBottom: "1rem", color: "#777" }}>
                  Gracias por completar el registro de su motocicleta. Hemos recibido toda su información y documentos correctamente.
                </p>
                <p style={{ marginBottom: "1rem", color: "#777" }}>
                  Un representante se pondrá en contacto con usted en las próximas 24-48 horas para confirmar los detalles.
                </p>
              </div>
            </AnimatedDiv>
          )}
        </CardContent>
      </StyledCard>
    </Container>
  );
}
