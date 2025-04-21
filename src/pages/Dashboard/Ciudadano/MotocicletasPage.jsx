import React from 'react';
import styled from 'styled-components';
import MisMotocicletas from '../../../components/Dashboard/Ciudadanocomponents/MisMotocicletas/MisMotocicletas';

const PageContainer = styled.div`
  padding: 16px;
  
  @media (max-width: 576px) {
    padding: 8px;
  }
`;

function MotocicletasPage() {
  return (
    <PageContainer>
      <MisMotocicletas />
    </PageContainer>
  );
}

export default MotocicletasPage;