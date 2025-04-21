import React, { useState, useEffect } from 'react';
import { Form, Radio, InputNumber, Select, Row, Col, notification } from 'antd';
import styled from 'styled-components';
import Inputs from '../../CommonComponts/Inputs';
import { useTheme } from '../../../../context/ThemeContext';
import { useLanguage } from '../../../../context/LanguageContext';
import { useAuth } from '../../../../context/AuthContext';
import axios from 'axios';
const { Option } = Select;

const FormContainer = styled.div`
  margin-top: 20px;
`;

// Common input styling variables to ensure consistency
const inputHeight = '48px';
const inputPadding = '8px 16px';
const inputFontSize = '16px';
const inputBorderRadius = '10px';
const inputBorderWidth = '2px';

const StyledFormItem = styled(Form.Item)`
  margin-bottom: 20px;
  
  .ant-form-item-label > label {
    color: ${props => props.theme.token.titleColor};
    font-weight: 500;
  }
  
  /* Hide red asterisks for required fields */
  .ant-form-item-required::before {
    display: none !important;
  }
  
  /* Hide red asterisks for required fields (alternative method) */
  .ant-form-item-label > label.ant-form-item-required:not(.ant-form-item-required-mark-optional)::after {
    display: none !important;
  }
  
  /* Ensure all input containers are the same height */
  .ant-input-wrapper, 
  .ant-select, 
  .ant-picker,
  .ant-radio-group,
  .ant-input-number {
    height: ${inputHeight} !important;
    line-height: ${inputHeight} !important;
  }
`;

const StyledRadioGroup = styled(Radio.Group)`
  width: 100%;
  height: ${inputHeight} !important;
  display: flex !important;
  align-items: center !important;
  
  .ant-radio-wrapper {
    color: ${props => props.theme.token.titleColor};
    height: 100%;
    display: flex;
    align-items: center;
  }
`;

const StyledInputNumber = styled(InputNumber)`
  width: 100%;
  height: ${inputHeight} !important;
  background-color: transparent;
  color: ${props => props.$isDarkMode ? '#fff' : '#000'};
  border: ${inputBorderWidth} solid ${props => props.$isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)'};
  border-radius: ${inputBorderRadius};
  padding: ${inputPadding};
  font-size: ${inputFontSize};
  
  .ant-input-number-input-wrap {
    height: 100%;
    display: flex;
    align-items: center;
  }
  
  input {
    height: 100%;
    padding: 0 !important;
    font-size: ${inputFontSize};
  }
  
  &:hover {
    border-color: ${props => props.$isDarkMode ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.4)'};
  }

  &:focus {
    border-color: ${props => props.$primaryColor};
    box-shadow: 0 0 5px ${props => props.$primaryColor}80;
    outline: none;
  }
`;

const StyledSelect = styled(Select)`
  width: 100%;
  
  .ant-select-selector {
    height: ${inputHeight} !important;
    background-color: transparent !important;
    color: ${props => props.$isDarkMode ? '#fff' : '#000'} !important;
    border: ${inputBorderWidth} solid ${props => props.$isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)'} !important;
    border-radius: ${inputBorderRadius} !important;
    padding: 0 16px !important;
    display: flex !important;
    align-items: center !important;
  }
  
  .ant-select-selection-item {
    display: flex !important;
    align-items: center !important;
    line-height: normal !important;
    font-size: ${inputFontSize};
  }
  
  &:hover .ant-select-selector {
    border-color: ${props => props.$isDarkMode ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.4)'} !important;
  }
  
  &.ant-select-focused .ant-select-selector {
    border-color: ${props => props.$primaryColor} !important;
    box-shadow: 0 0 5px ${props => props.$primaryColor}80 !important;
  }
`;

const DatosMotocicletas = ({ form }) => {
  const { theme, currentTheme } = useTheme();
  const { language } = useLanguage();
  const isDarkMode = currentTheme === 'themeDark';
  const [hasInsurance, setHasInsurance] = useState(form.getFieldValue('hasInsurance') || 'yes');
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [insurance, setInsurance] = useState([]);
  const [selectedModel, setSelectedModel] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const api_url = import.meta.env.VITE_API_URL;
  const { getAccessToken } = useAuth();

  const translations = {
    es: {
      brand: 'Marca',
      brandPlaceholder: 'Seleccione la marca',
      brandRequired: 'Por favor seleccione una marca',
      model: 'Modelo',
      modelPlaceholder: 'Seleccione el modelo',
      modelRequired: 'Por favor seleccione un modelo',
      year: 'Año',
      yearRequired: 'Por favor ingrese el año',
      color: 'Color',
      colorPlaceholder: 'Color',
      colorRequired: 'Por favor seleccione un color',
      engineSize: 'Cilindraje (cc)',
      engineSizeRequired: 'Por favor ingrese el cilindraje',
      useType: 'Tipo de Uso',
      useTypeRequired: 'Por favor seleccione el tipo de uso',
      personal: 'Personal',
      commercial: 'Empresarial',
      delivery: 'Transporte',
      recreational: 'Recreativo',
      sports: 'Deportivo',
      chassisNumber: 'Número de Chasis',
      chassisPlaceholder: 'Número de chasis',
      chassisRequired: 'Por favor ingrese el número de chasis',
      insurance: 'Seguro',
      insuranceRequired: 'Por favor indique si tiene seguro',
      yes: 'Si',
      no: 'No',
      insuranceProvider: 'Seleccione su proveedor de seguro',
      insuranceProviderRequired: 'Por favor seleccione su proveedor de seguro',
      policyNumber: 'Número de Póliza',
      policyPlaceholder: 'Ingrese el número de póliza',
      policyRequired: 'Por favor ingrese el número de póliza'
    },
    en: {
      brand: 'Brand',
      brandPlaceholder: 'Select the brand',
      brandRequired: 'Please select a brand',
      model: 'Model',
      modelPlaceholder: 'Select the model',
      modelRequired: 'Please select a model',
      year: 'Year',
      yearRequired: 'Please enter the year',
      color: 'Color',
      colorPlaceholder: 'Color',
      colorRequired: 'Please select a color',
      engineSize: 'Engine Size (cc)',
      engineSizeRequired: 'Please enter the engine size',
      useType: 'Type of Use',
      useTypeRequired: 'Please select the type of use',
      personal: 'Personal',
      commercial: 'Empresarial',
      delivery: 'Transporte',
      recreational: 'Recreativo',
      sports: 'Deportivo',
      chassisNumber: 'Chassis Number',
      chassisPlaceholder: 'Chassis number',
      chassisRequired: 'Please enter the chassis number',
      insurance: 'Insurance',
      insuranceRequired: 'Please indicate if you have insurance',
      yes: 'Yes',
      no: 'No',
      insuranceProvider: 'Select your insurance provider',
      insuranceProviderRequired: 'Please select your insurance provider',
      policyNumber: 'Policy Number',
      policyPlaceholder: 'Enter the policy number',
      policyRequired: 'Please enter the policy number'
    }
  };
  
  const t = translations[language] || translations.es;

  // Fetch brands from API
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await axios.get(`${api_url}/api/marca`, {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
          },
        });
        setBrands(response.data.data);
      } catch (error) {
        console.error('Error fetching brands:', error);
        notification.error({
          message: 'Error',
          description: 'Error fetching brands. Please try again later.',
        });
      }
    }
    fetchBrands();
  });

  const fetchModels = async (idBrand) => {
    try {
      const response = await axios.get(`${api_url}/api/modelo?idMarca=${idBrand}`, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      });
      setModels(response.data.data);
    } catch (error) {
      console.error('Error fetching models:', error);
      notification.error({
        message: language === 'es' ? 'Error' : 'Error',
        description: language === 'es' 
          ? 'Error al obtener los modelos. Por favor intente más tarde.' 
          : 'Error fetching models. Please try again later.',
      });
    }
  }

  // Mock insurance providers
  const insuranceProviders = [
    { value: 'Mapfre', label: 'Mapfre' },
    { value: 'Seguros Sura', label: 'Seguros Sura' },
    { value: 'Seguros Universal', label: 'Seguros Universal' },
    { value: 'Seguros Banreservas', label: 'Seguros Banreservas' },
    { value: 'La Colonial de Seguros', label: 'La Colonial de Seguros' },
    { value: 'Humano Seguros', label: 'Humano Seguros' },
  ];

  // Define color options
  const colorOptions = [
    { value: 'Negro', label: 'Negro / Black' },
    { value: 'Blanco', label: 'Blanco / White' },
    { value: 'Rojo', label: 'Rojo / Red' },
    { value: 'Azul', label: 'Azul / Blue' },
    { value: 'Verde', label: 'Verde / Green' },
    { value: 'Amarillo', label: 'Amarillo / Yellow' },
    { value: 'Naranja', label: 'Naranja / Orange' },
    { value: 'Morado', label: 'Morado / Purple' },
    { value: 'Gris', label: 'Gris / Gray' },
    { value: 'Plateado', label: 'Plateado / Silver' },
  ];

  // Handle brand change
  const handleBrandChange = async (value, option) => {
    setSelectedBrand(value);
    // Guarda el ID y nombre de la marca
    form.setFieldsValue({
      brand: {
        id: value,
        nombre: option.children
      },
      // Resetea el modelo cuando cambia la marca
      model: undefined 
    });
    await fetchModels(value);
  };

  // Agrega un handler para el cambio de modelo
  const handleModelChange = (value, option) => {
    setSelectedModel(value); // Add this line to track selected model
    form.setFieldsValue({
      model: {
        id: value,
        nombre: option.children
      }
    });
  };

  // Actualizar el useEffect para que maneje los cambios
  useEffect(() => {
    const currentInsurance = form.getFieldValue('hasInsurance');
    if (currentInsurance !== undefined) {
      setHasInsurance(currentInsurance);
    }
  }, [form]);

  // Actualizar el handler del RadioGroup
  const handleInsuranceChange = (e) => {
    const value = e.target.value;
    setHasInsurance(value);
    
    // Si cambia a "no", limpiar los campos de seguro
    if (value === 'no') {
      form.setFieldsValue({
        insuranceProvider: undefined,
        policyNumber: undefined
      });
    }
  };

  // Set initial values for the form fields
  useEffect(() => {
    // Only set if the field doesn't already have a value
    form.getFieldValue('hasInsurance') === undefined && 
      form.setFieldsValue({ hasInsurance: 'yes' });
  }, [form]);

  return (
    <FormContainer>
      <Form form={form} layout="vertical" requiredMark={false}>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <StyledFormItem 
              name={["brand", "id"]} 
              label={t.brand}
              rules={[{ required: true, message: t.brandRequired }]}
              theme={theme}
            >
              <StyledSelect 
                $isDarkMode={isDarkMode}
                placeholder={t.brandPlaceholder}
                onChange={handleBrandChange}
              >
                {brands.map(brand => (
                  <Option key={brand.id} value={brand.id}>
                    {brand.nombre}
                  </Option>
                ))}
              </StyledSelect>
            </StyledFormItem>
          </Col>
          
          <Col xs={24} md={12}>
            <StyledFormItem 
              name={["model", "id"]} 
              label={t.model}
              rules={[{ required: true, message: t.modelRequired }]}
              theme={theme}
            >
              <StyledSelect
                $isDarkMode={isDarkMode}
                placeholder={t.modelPlaceholder}
                disabled={!selectedBrand}
                onChange={handleModelChange}
                value={form.getFieldValue(['model', 'id'])}
              >
                {selectedBrand && models?.map(model => (
                  <Option key={model.id} value={model.id}>
                    {model.nombre}
                  </Option>
                ))}
              </StyledSelect>
            </StyledFormItem>
          </Col>
          
          <Col xs={24} md={12}>
            <StyledFormItem 
              name="year" 
              label={t.year}
              rules={[{ required: true, message: t.yearRequired }]}
              theme={theme}
            >
              <StyledInputNumber 
                min={1970} 
                max={2025} 
                $isDarkMode={isDarkMode}
                placeholder={t.year}
              />
            </StyledFormItem>
          </Col>
          
          <Col xs={24} md={12}>
            <StyledFormItem 
              name="color" 
              label={t.color}
              rules={[{ required: true, message: t.colorRequired }]}
              theme={theme}
            >
              <StyledSelect 
                $isDarkMode={isDarkMode}
                placeholder={t.colorPlaceholder}
              >
                {colorOptions.map(color => (
                  <Option key={color.value} value={color.value}>
                    {color.label}
                  </Option>
                ))}
              </StyledSelect>
            </StyledFormItem>
          </Col>
          
          <Col xs={24} md={12}>
            <StyledFormItem 
              name="engineSize" 
              label={t.engineSize}
              rules={[{ required: true, message: t.engineSizeRequired }]}
              theme={theme}
            >
              <StyledInputNumber 
                min={50}
                max={2000}
                $isDarkMode={isDarkMode}
                placeholder="cc"
              />
            </StyledFormItem>
          </Col>
          
          <Col xs={24} md={12}>
            <StyledFormItem 
              name="useType" 
              label={t.useType}
              rules={[{ required: true, message: t.useTypeRequired }]}
              theme={theme}
            >
              <StyledSelect $isDarkMode={isDarkMode}>
                <Option value="Personal">{t.personal}</Option>
                <Option value="Empresarial">{t.commercial}</Option>
                <Option value="Transporte">{t.delivery}</Option>
                <Option value="Recreativo">{t.recreational}</Option>
                <Option value="Deportivo">{t.sports}</Option>
              </StyledSelect>
            </StyledFormItem>
          </Col>
          
          <Col span={24}>
            <StyledFormItem 
              name="chassisNumber" 
              label={t.chassisNumber}
              rules={[
                { required: true, message: t.chassisRequired },
                { 
                  len: 17, 
                  message: language === 'es' 
                    ? 'El número de chasis debe tener exactamente 17 caracteres'
                    : 'The chassis number must be exactly 17 characters long'
                }
              ]}
              theme={theme}
            >
              <Inputs placeholder={t.chassisPlaceholder} />
            </StyledFormItem>
          </Col>
          
          <Col span={24}>
            <StyledFormItem 
              name="hasInsurance" 
              label={t.insurance}
              rules={[{ required: true, message: t.insuranceRequired }]}
              theme={theme}
            >
              <StyledRadioGroup onChange={handleInsuranceChange}>
                <Radio value="yes">{t.yes}</Radio>
                <Radio value="no">{t.no}</Radio>
              </StyledRadioGroup>
            </StyledFormItem>
          </Col>
          
          {hasInsurance === 'yes' && (
            <>
              <Col xs={24} md={12}>
                <StyledFormItem 
                  name="insuranceProvider" 
                  label={t.insuranceProvider}
                  rules={[{ required: true, message: t.insuranceProviderRequired }]}
                  theme={theme}
                >
                  <StyledSelect $isDarkMode={isDarkMode}>
                    {insuranceProviders.map(provider => (
                      <Option key={provider.value} value={provider.value}>
                        {provider.label}
                      </Option>
                    ))}
                  </StyledSelect>
                </StyledFormItem>
              </Col>
              
              <Col xs={24} md={12}>
                <StyledFormItem
                  name="policyNumber" 
                  label={t.policyNumber}
                  rules={[{ required: true, message: t.policyRequired }]}
                  theme={theme}
                >
                  <Inputs placeholder={t.policyPlaceholder} />
                </StyledFormItem>
              </Col>
            </>
          )}
        </Row>
      </Form>
    </FormContainer>
  );
};

export default DatosMotocicletas;