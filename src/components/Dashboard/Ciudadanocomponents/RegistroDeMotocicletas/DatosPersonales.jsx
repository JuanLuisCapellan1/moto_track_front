import React from 'react';
import { Form, Radio, DatePicker, Select, Row, Col, notification } from 'antd';
import styled from 'styled-components';
import Inputs from '../../CommonComponts/Inputs';
import { useTheme } from '../../../../context/ThemeContext';
import { useLanguage } from '../../../../context/LanguageContext';
import axios from 'axios';
import { useAuth } from '../../../../context/AuthContext';
import { useEffect, useState } from 'react';
const { Option } = Select;
import moment from 'moment';

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

const StyledDatePicker = styled(DatePicker)`
  width: 100%;
  height: ${inputHeight} !important;
  background-color: transparent;
  color: ${props => props.$isDarkMode ? '#fff' : '#000'};
  border: ${inputBorderWidth} solid ${props => props.$isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)'};
  border-radius: ${inputBorderRadius};
  padding: ${inputPadding};
  font-size: ${inputFontSize};
  
  .ant-picker-input {
    height: 100%;
    display: flex;
    align-items: center;
  }
  
  &:hover {
    border-color: ${props => props.$isDarkMode ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.4)'};
  }

  &:focus {
    border-color: ${props => props.$primaryColor};
    box-shadow: 0 0 5px ${props => props.$primaryColor}80;
    outline: none;
  }
  
  input {
    height: 100%;
    font-size: ${inputFontSize};
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
  
  /* Make dropdown position consistent */
  &.ant-select-dropdown {
    position: absolute;
    z-index: 1050;
  }
`;

const DatosPersonales = ({ form }) => {
  const { theme, currentTheme } = useTheme();
  const { language } = useLanguage();
  const isDarkMode = currentTheme === 'themeDark';
  const api_url = import.meta.env.VITE_API_URL;
  const { getAccessToken } = useAuth();
  const [initialPersonalData, setInitialPersonalData] = useState([]);
  const [provincias, setProvincias] = useState([]);
  const [municipios, setMunicipios] = useState([]);
  const [selectedProvincia, setSelectedProvincia] = useState(null);

  const translations = {
    es: {
      fullName: 'Nombre Completo',
      fullNamePlaceholder: 'Ingrese su nombre completo',
      fullNameRequired: 'Por favor ingrese su nombre completo',
      gender: 'Sexo',
      genderRequired: 'Por favor seleccione su sexo',
      male: 'Masculino',
      female: 'Femenino',
      other: 'Otro',
      idDocument: 'Cédula de Identidad / Pasaporte',
      idPlaceholder: '000-0000000-0',
      idRequired: 'Por favor ingrese su cédula de identidad o pasaporte',
      phone: 'Teléfono',
      phonePlaceholder: '(000) 000-0000',
      phoneRequired: 'Por favor ingrese su número de teléfono',
      maritalStatus: 'Estado Civil',
      maritalStatusRequired: 'Por favor seleccione su estado civil',
      single: 'Soltero/a',
      married: 'Casado/a',
      divorced: 'Divorciado/a',
      widowed: 'Viudo/a',
      birthDate: 'Fecha de Nacimiento',
      birthDateRequired: 'Por favor seleccione su fecha de nacimiento',
      email: 'Correo Electrónico',
      emailPlaceholder: 'ejemplo@correo.com',
      emailRequired: 'Por favor ingrese su correo electrónico',
      address: 'Dirección',
      addressPlaceholder: 'Ingrese su dirección',
      addressRequired: 'Por favor ingrese su dirección',
      sector: 'Sector',
      sectorPlaceholder: 'Seleccione su sector',
      sectorRequired: 'Por favor seleccione su sector',
      province: 'Provincia',
      provincePlaceholder: 'Seleccione su provincia',
      provinceRequired: 'Por favor seleccione su provincia',
      municipality: 'Municipio',
      municipalityPlaceholder: 'Seleccione su municipio',
      municipalityRequired: 'Por favor seleccione su municipio'
    },
    en: {
      fullName: 'Full Name',
      fullNamePlaceholder: 'Enter your full name',
      fullNameRequired: 'Please enter your full name',
      gender: 'Gender',
      genderRequired: 'Please select your gender',
      male: 'Male',
      female: 'Female',
      other: 'Other',
      idDocument: 'ID / Passport',
      idPlaceholder: '000-0000000-0',
      idRequired: 'Please enter your ID or passport number',
      phone: 'Phone',
      phonePlaceholder: '(000) 000-0000',
      phoneRequired: 'Please enter your phone number',
      maritalStatus: 'Marital Status',
      maritalStatusRequired: 'Please select your marital status',
      single: 'Single',
      married: 'Married',
      divorced: 'Divorced',
      widowed: 'Widowed',
      birthDate: 'Birth Date',
      birthDateRequired: 'Please select your birth date',
      email: 'Email',
      emailPlaceholder: 'example@email.com',
      emailRequired: 'Please enter your email address',
      address: 'Address',
      addressPlaceholder: 'Enter your address',
      addressRequired: 'Please enter your address',
      sector: 'Sector',
      sectorPlaceholder: 'Select your sector',
      sectorRequired: 'Please select your sector',
      province: 'Province',
      provincePlaceholder: 'Select your province',
      provinceRequired: 'Please select your province',
      municipality: 'Municipality',
      municipalityPlaceholder: 'Select your municipality',
      municipalityRequired: 'Please select your municipality'
    }
  };
  
  const getPersonalData = async () => {
    try {
      const personalData = await axios.get(`${api_url}/api/profileToken`, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      });
      setInitialPersonalData(personalData.data.data);
    } catch (error) {
      console.error('Error fetching personal data:', error);
      notification.error({
        message: language === 'es' ? 'Error' : 'Error',
        description: language === 'es' ? 'No se pudo obtener los datos personales.' : 'Could not fetch personal data.',
        placement: 'topRight',
        duration: 3,
      });      
    }
  }

  const fetchProvincias = async () => {
    try {
      const response = await axios.get(`${api_url}/api/provincia`, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      });
      if (response.data.success) {
        setProvincias(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching provincias:', error);
      notification.error({
        message: language === 'es' ? 'Error' : 'Error',
        description: language === 'es' 
          ? 'Error al cargar las provincias' 
          : 'Error loading provinces',
      });
    }
  };

  const fetchMunicipios = async (provinciaId) => {
    try {
      const response = await axios.get(`${api_url}/api/municipio?idProvincia=${provinciaId}`, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      });
      if (response.data.success) {
        setMunicipios(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching municipios:', error);
      notification.error({
        message: language === 'es' ? 'Error' : 'Error',
        description: language === 'es' 
          ? 'Error al cargar los municipios' 
          : 'Error loading municipalities',
      });
    }
  };

  useEffect(() => {
    getPersonalData();
    fetchProvincias();
  }, []);

  const formatCedula = (cedula) => {
    if (!cedula) return undefined;
    // Remove any non-digit characters
    const cleaned = cedula.replace(/\D/g, '');
    // Check if we have the correct length
    if (cleaned.length !== 11) return cedula;
    // Format with dashes
    return `${cleaned.substring(0, 3)}-${cleaned.substring(3, 10)}-${cleaned.substring(10)}`;
  };

  // Helper function to format phone number
  const formatPhone = (phone) => {
    if (!phone) return undefined;
    // Remove any non-digit characters
    const cleaned = phone.replace(/\D/g, '');
    // Check if we have the correct length
    if (cleaned.length !== 10) return phone;
    // Format with dashes
    return `${cleaned.substring(0, 3)}-${cleaned.substring(3, 6)}-${cleaned.substring(6)}`;
  };

  console.log('Initial Personal Data:', initialPersonalData);
  useEffect(() => {
    if (initialPersonalData?.datosPersonales?.ubicacion) {
      const { ubicacion } = initialPersonalData.datosPersonales;
      const formValues = {};
      
      // Nombres
      if (initialPersonalData.nombres) {
        formValues.firstName = initialPersonalData.nombres;
      }
  
      // Apellidos
      if (initialPersonalData.apellidos) {
        formValues.lastName = initialPersonalData.apellidos;
      }
  
      // Género
      if (initialPersonalData.datosPersonales.sexo) {
        formValues.gender = initialPersonalData.datosPersonales.sexo.toLowerCase() === 'm' ? 'male' : 'female';
      }
  
      // Cédula
      if (initialPersonalData.datosPersonales.cedula) {
        formValues.idDocument = formatCedula(initialPersonalData.datosPersonales.cedula);
      }
  
      // Teléfono
      if (initialPersonalData.datosPersonales.telefono) {
        formValues.phone = formatPhone(initialPersonalData.datosPersonales.telefono);
      }
  
      // Estado Civil
      if (initialPersonalData.datosPersonales.estadoCivil) {
        formValues.maritalStatus = initialPersonalData.datosPersonales.estadoCivil.toLowerCase();
      }
  
      // Fecha de Nacimiento
      if (initialPersonalData.datosPersonales.fechaNacimiento) {
        formValues.birthDate = moment(initialPersonalData.datosPersonales.fechaNacimiento);
      }
  
      // Correo
      if (initialPersonalData.correo) {
        formValues.email = initialPersonalData.correo;
      }
  
      // Dirección
      if (initialPersonalData.datosPersonales.ubicacion?.direccion) {
        formValues.address = initialPersonalData.datosPersonales.ubicacion.direccion;
      }
  
      // Provincia
      if (initialPersonalData.datosPersonales.ubicacion?.provincia?.id && initialPersonalData.datosPersonales.ubicacion?.provincia?.nombre) {
        formValues.provincia = {
          id: initialPersonalData.datosPersonales.ubicacion.provincia.id,
          nombre: initialPersonalData.datosPersonales.ubicacion.provincia.nombre
        };
      }
  
      // Municipio
      if (initialPersonalData.datosPersonales.ubicacion?.municipio?.id && initialPersonalData.datosPersonales.ubicacion?.municipio?.nombre) {
        formValues.municipio = {
          id: initialPersonalData.datosPersonales.ubicacion.municipio.id,
          nombre: initialPersonalData.datosPersonales.ubicacion.municipio.nombre
        };
      }
  
      // Handle provincia and municipio
      if (ubicacion.provincia?.id) {
        // Set provincia
        formValues.provincia = {
          id: ubicacion.provincia.id,
          nombre: ubicacion.provincia.nombreProvincia
        };
        
        // Set selectedProvincia and fetch municipios
        setSelectedProvincia(ubicacion.provincia.id);
        fetchMunicipios(ubicacion.provincia.id).then(() => {
          // Set municipio after municipios are fetched
          if (ubicacion.municipio?.id) {
            formValues.municipio = {
              id: ubicacion.municipio.id,
              nombre: ubicacion.municipio.nombreMunicipio
            };
            form.setFieldsValue(formValues);
          }
        });
      }
  
      // Set all other form values
      form.setFieldsValue(formValues);
    }
  }, [initialPersonalData, form]);

  const t = translations[language] || translations.es;

  // Add these validation functions at the top of your component
  const validateCedula = (_, value) => {
    if (!value) {
      return Promise.reject(new Error('Por favor ingrese su cédula'));
    }
    
    // Remove any non-digit characters for validation
    const cleaned = value.replace(/\D/g, '');
    
    // Check if it has exactly 11 digits
    if (cleaned.length !== 11) {
      return Promise.reject(new Error('La cédula debe tener 11 dígitos'));
    }
    
    // Check if it matches the format XXX-XXXXXXX-X
    const cedulaRegex = /^\d{3}-\d{7}-\d{1}$/;
    if (!cedulaRegex.test(value)) {
      return Promise.reject(new Error('Formato inválido. Use: XXX-XXXXXXX-X'));
    }
  
    return Promise.resolve();
  };
  
  const validatePhone = (_, value) => {
    if (!value) {
      return Promise.reject(new Error('Por favor ingrese su teléfono'));
    }
    
    // Remove any non-digit characters for validation
    const cleaned = value.replace(/\D/g, '');
    
    // Check if it has exactly 10 digits
    if (cleaned.length !== 10) {
      return Promise.reject(new Error('El teléfono debe tener 10 dígitos'));
    }
    
    // Check if it matches the format XXX-XXX-XXXX
    const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;
    if (!phoneRegex.test(value)) {
      return Promise.reject(new Error('Formato inválido. Use: XXX-XXX-XXXX'));
    }
  
    return Promise.resolve();
  };

  const handleProvinciaChange = async (value) => {
    setSelectedProvincia(value);
    form.setFieldsValue({ municipio: undefined }); // Clear municipio when provincia changes
    await fetchMunicipios(value);
  };

  return (
    <FormContainer>
      <Form form={form} layout="vertical" requiredMark={false}>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <StyledFormItem
              name="firstName" 
              label={language === 'es' ? 'Nombres' : 'First Names'}
              rules={[
                { required: true, message: language === 'es' ? 'Por favor ingrese sus nombres' : 'Please enter your first names' },
                { pattern: /^[A-Za-zÁáÉéÍíÓóÚúÑñ\s]+$/, 
                  message: language === 'es' ? 'Solo se permiten letras' : 'Only letters are allowed' }
              ]}
              theme={theme}
            >
              <Inputs
                placeholder={language === 'es' ? 'Ingrese sus nombres' : 'Enter your first names'} 
                initialValue={initialPersonalData?.nombres}
              />
            </StyledFormItem>
          </Col>

          <Col xs={24} md={12}>
            <StyledFormItem
              name="lastName" 
              label={language === 'es' ? 'Apellidos' : 'Last Names'}
              rules={[
                { required: true, message: language === 'es' ? 'Por favor ingrese sus apellidos' : 'Please enter your last names' },
                { pattern: /^[A-Za-zÁáÉéÍíÓóÚúÑñ\s]+$/, 
                  message: language === 'es' ? 'Solo se permiten letras' : 'Only letters are allowed' }
              ]}
              theme={theme}
            >
              <Inputs placeholder={language === 'es' ? 'Ingrese sus apellidos' : 'Enter your last names'} />
            </StyledFormItem>
          </Col>
          
          <Col xs={24} md={12}>
            <StyledFormItem 
              name="gender" 
              label={t.gender}
              rules={[{ required: true, message: t.genderRequired }]}
              theme={theme}
            >
              <StyledRadioGroup>
                <Radio value="male">{t.male}</Radio>
                <Radio value="female">{t.female}</Radio>
              </StyledRadioGroup>
            </StyledFormItem>
          </Col>
          
          {/* Rest of the form remains the same */}
          <Col xs={24} md={12}>
            <StyledFormItem 
              name="idDocument" 
              label={t.idDocument}
              rules={[
                { required: true, message: t.idRequired },
                { validator: validateCedula }
              ]}
              theme={theme}
            >
              <Inputs 
                placeholder={t.idPlaceholder}
                onChange={(e) => {
                  const formatted = formatCedula(e.target.value);
                  form.setFieldsValue({ idDocument: formatted });
                }}
              />
            </StyledFormItem>
          </Col>
          
          <Col xs={24} md={12}>
            <StyledFormItem 
              name="phone" 
              label={t.phone}
              rules={[
                { required: true, message: t.phoneRequired },
                { validator: validatePhone }
              ]}
              theme={theme}
            >
              <Inputs 
                placeholder={t.phonePlaceholder}
                onChange={(e) => {
                  const formatted = formatPhone(e.target.value);
                  form.setFieldsValue({ phone: formatted });
                }}
              />
            </StyledFormItem>
          </Col>
          
          <Col xs={24} md={12}>
            <StyledFormItem 
              name="maritalStatus" 
              label={t.maritalStatus}
              rules={[{ required: true, message: t.maritalStatusRequired }]}
              theme={theme}
            >
              <StyledSelect $isDarkMode={isDarkMode}>
                <Option value="soltero">{t.single}</Option>
                <Option value="casado">{t.married}</Option>
                <Option value="divorciado">{t.divorced}</Option>
                <Option value="viudo ">{t.widowed}</Option>
              </StyledSelect>
            </StyledFormItem>
          </Col>
          
          <Col xs={24} md={12}>
            <StyledFormItem 
              name="birthDate" 
              label={t.birthDate}
              rules={[{ required: true, message: t.birthDateRequired }]}
              theme={theme}
            >
              <StyledDatePicker 
                $isDarkMode={isDarkMode}
                format="DD/MM/YYYY"
              />
            </StyledFormItem>
          </Col>
          
          <Col xs={24} md={12}>
            <StyledFormItem 
              name="email" 
              label={t.email}
              rules={[
                { required: true, message: t.emailRequired },
                { type: 'email', message: language === 'es' ? 'Por favor ingrese un correo electrónico válido' : 'Please enter a valid email address' }
              ]}
              theme={theme}
            >
              <Inputs placeholder={t.emailPlaceholder} />
            </StyledFormItem>
          </Col>
          
          <Col span={24}>
            <StyledFormItem 
              name="address" 
              label={t.address}
              rules={[{ required: true, message: t.addressRequired }]}
              theme={theme}
            >
              <Inputs placeholder={t.addressPlaceholder} />
            </StyledFormItem>
          </Col>

          <Col xs={24} md={12}>
            <StyledFormItem
              name={["provincia", "id"]}
              label={t.province}
              rules={[{ required: true, message: t.provinceRequired }]}
              theme={theme}
            >
              <StyledSelect
                $isDarkMode={isDarkMode}
                placeholder={t.provincePlaceholder}
                onChange={handleProvinciaChange}
              >
                {provincias.map(provincia => (
                  <Option key={provincia.id} value={provincia.id}>
                    {provincia.nombreProvincia}
                  </Option>
                ))}
              </StyledSelect>
            </StyledFormItem>
          </Col>

          <Col xs={24} md={12}>
            <StyledFormItem
              name={["municipio", "id"]}
              label={t.municipality}
              rules={[{ required: true, message: t.municipalityRequired }]}
              theme={theme}
            >
              <StyledSelect
                $isDarkMode={isDarkMode}
                placeholder={t.municipalityPlaceholder}
                disabled={!selectedProvincia}
              >
                {municipios.map(municipio => (
                  <Option key={municipio.id} value={municipio.id}>
                    {municipio.nombreMunicipio}
                  </Option>
                ))}
              </StyledSelect>
            </StyledFormItem>
          </Col>
        </Row>
      </Form>
    </FormContainer>
  );
};

export default DatosPersonales;