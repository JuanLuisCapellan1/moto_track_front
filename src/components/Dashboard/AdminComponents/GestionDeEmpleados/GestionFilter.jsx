import React, { useState } from 'react';
import { Row, Col, Select, Form, Input } from 'antd';
import styled from 'styled-components';
import FilterSection from '../../CommonComponts/FilterSection';
import { useLanguage } from '../../../../context/LanguageContext';

const { Option } = Select;

const FormItem = styled(Form.Item)`
  margin-bottom: 16px;
`;

const GestionFilter = ({ 
  isVisible, 
  onClose, 
  onApplyFilters, 
  cargos = [],
  statuses = []
}) => {
  const [form] = Form.useForm();
  const { language } = useLanguage();

  // Translations
  const translations = {
    es: {
      filterTitle: 'Filtros de búsqueda',
      cedula: 'Cédula',
      cargo: 'Cargo',
      status: 'Estado',
      allCedulas: 'Todas las cédulas',
      allCargos: 'Todos los cargos',
      allStatuses: 'Todos los estados',
      cedulaPlaceholder: 'Buscar por cédula'
    },
    en: {
      filterTitle: 'Search Filters',
      cedula: 'ID Number',
      cargo: 'Position',
      status: 'Status',
      allCedulas: 'All ID numbers',
      allCargos: 'All positions',
      allStatuses: 'All statuses',
      cedulaPlaceholder: 'Search by ID number'
    }
  };

  const t = translations[language] || translations.es;

  const handleApply = () => {
    const values = form.getFieldsValue();
    onApplyFilters(values);
  };

  const handleClear = () => {
    form.resetFields();
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
          cedula: '',
          cargo: 'all',
          status: 'all'
        }}
      >
        <Row gutter={16}>
          <Col xs={24} sm={12} md={8} lg={8}>
            <FormItem name="cedula" label={t.cedula}>
              <Input 
                placeholder={t.cedulaPlaceholder}
                allowClear
              />
            </FormItem>
          </Col>
          
          <Col xs={24} sm={12} md={8} lg={8}>
            <FormItem name="cargo" label={t.cargo}>
              <Select placeholder={t.allCargos}>
                <Option value="all">{t.allCargos}</Option>
                {cargos?.map(cargo => (
                  <Option key={cargo.id || cargo.value} value={cargo.id || cargo.value}>
                    {cargo.name || cargo.label}
                  </Option>
                ))}
              </Select>
            </FormItem>
          </Col>
          
          <Col xs={24} sm={12} md={8} lg={8}>
            <FormItem name="status" label={t.status}>
              <Select placeholder={t.allStatuses}>
                <Option value="all">{t.allStatuses}</Option>
                {statuses?.map(status => (
                  <Option key={status.id || status.value} value={status.id || status.value}>
                    {status.name || status.label}
                  </Option>
                ))}
              </Select>
            </FormItem>
          </Col>
        </Row>
      </Form>
    </FilterSection>
  );
};

export default GestionFilter;