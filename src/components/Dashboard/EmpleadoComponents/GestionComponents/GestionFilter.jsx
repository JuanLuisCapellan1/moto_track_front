import React, { useState, useEffect, useMemo } from 'react';
import { Row, Col, Select, DatePicker, Form, notification } from 'antd';
import styled from 'styled-components';
import FilterSection from '../../CommonComponts/FilterSection';
import { useLanguage } from '../../../../context/LanguageContext';
import { useAuth } from '../../../../context/AuthContext';
import axios from 'axios';

const { Option } = Select;
const { RangePicker } = DatePicker;

const FormItem = styled(Form.Item)`
  margin-bottom: 16px;
`;

const GestionFilter = ({ 
  isVisible, 
  onClose, 
  onApplyFilters, 
  statuses = []
}) => {
  const [form] = Form.useForm();
  const { language } = useLanguage();
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(false);
  const api_url = import.meta.env.VITE_API_URL;
  const { getAccessToken } = useAuth();

  // Fetch brands on component mount
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${api_url}/api/marca`, {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`
          }
        });

        if (response.data.success) {
          setBrands(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching brands:', error);
        notification.error({
          message: language === 'es' ? 'Error' : 'Error',
          description: language === 'es' 
            ? 'Error al cargar las marcas' 
            : 'Error loading brands',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
  }, [language]); 

  // Fetch models when brand changes
  const fetchModels = async (brandId) => {
    if (brandId === 'all') {
      setModels([]);
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(`${api_url}/api/modelo?idMarca=${brandId}`, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`
        }
      });

      if (response.data.success) {
        setModels(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching models:', error);
      notification.error({
        message: language === 'es' ? 'Error' : 'Error',
        description: language === 'es' 
          ? 'Error al cargar los modelos' 
          : 'Error loading models',
      });
    } finally {
      setLoading(false);
    }
  };

  const translations = {
    es: {
      filterTitle: 'Filtros de búsqueda',
      brand: 'Marca',
      model: 'Modelo',
      status: 'Estado',
      registrationDate: 'Fecha de registro',
      allBrands: 'Todas las marcas',
      allModels: 'Todos los modelos',
      allStatuses: 'Todos los estados',
      dateRange: 'Rango de fechas'
    },
    en: {
      filterTitle: 'Search Filters',
      brand: 'Brand',
      model: 'Model',
      status: 'Status',
      registrationDate: 'Registration Date',
      allBrands: 'All brands',
      allModels: 'All models',
      allStatuses: 'All statuses',
      dateRange: 'Date range'
    }
  };

  const t = translations[language] || translations.es;
  
  const handleBrandChange = (value) => {
    setSelectedBrand(value);
    form.setFieldValue('model', 'all');
    fetchModels(value);
  };
  
  const handleApply = () => {
    const values = form.getFieldsValue();
    onApplyFilters(values);
  };
  
  const handleClear = () => {
    form.resetFields();
    setSelectedBrand('all');
  };

  return (
    <FilterSection 
      title={t.filterTitle}
      isVisible={isVisible}
      onClose={onClose}
      onApply={handleApply}
      onClear={handleClear}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          brand: 'all',
          model: 'all',
          status: 'all',
          dateRange: null
        }}
      >
        <Row gutter={16}>
          <Col xs={24} sm={12} md={6} lg={6}>
            <FormItem 
              name="brand" 
              label={t.brand}
            >
              <Select 
                placeholder={t.allBrands}
                onChange={handleBrandChange}
                loading={loading}
              >
                <Option value="all">{t.allBrands}</Option>
                {brands.map(brand => (
                  <Option key={brand.id} value={brand.nombre}>{brand.nombre}</Option>
                ))}
              </Select>
            </FormItem>
          </Col>
          
          <Col xs={24} sm={12} md={6} lg={6}>
            <FormItem 
              name="model" 
              label={t.model}
            >
              <Select 
                placeholder={t.allModels}
                disabled={selectedBrand === 'all' || loading}
                loading={loading}
              >
                <Option value="all">{t.allModels}</Option>
                {models.map(model => (
                  <Option key={model.id} value={model.nombre}>{model.nombre}</Option>
                ))}
              </Select>
            </FormItem>
          </Col>
          
          <Col xs={24} sm={12} md={6} lg={6}>
            <FormItem 
              name="status" 
              label={t.status}
            >
              <Select placeholder={t.allStatuses}>
                <Option value="all">{t.allStatuses}</Option>
                {statuses.map(status => (
                  <Option key={status.id} value={status.id}>{status.name}</Option>
                ))}
              </Select>
            </FormItem>
          </Col>
          
          <Col xs={24} sm={12} md={6} lg={6}>
            <FormItem 
              name="dateRange" 
              label={t.registrationDate}
            >
              <RangePicker 
                style={{ width: '100%' }} 
                placeholder={[t.dateRange, t.dateRange]}
              />
            </FormItem>
          </Col>
        </Row>
      </Form>
    </FilterSection>
  );
};

export default GestionFilter;