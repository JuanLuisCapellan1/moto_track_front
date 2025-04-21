import React from 'react';
import styled from 'styled-components';
import { Typography } from 'antd';
import Lottie from 'lottie-react';
import { ClockCircleOutlined } from '@ant-design/icons';

// Import Lottie JSON files
import phoneAnimation from '../../../assets/Lading/Footer/Calling V3.json';
import mailAnimation from '../../../assets/Lading/Footer/mail-4.json';
import locationAnimation from '../../../assets/Lading/Footer/location-4.json';

const { Title, Text } = Typography;

const ContactSection = styled.div`
  text-align: left;
  color: #fff;
`;

const StyledTitle = styled(Title)`
  color: #fff !important;
  font-size: 1.75rem !important;
  margin-bottom: 1.5rem !important;
  font-weight: 700 !important;
  height: 40px; /* Fixed height for alignment */
  display: flex;
  align-items: center;
  margin-top: 0 !important;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
    color: #6c63ff !important;
  }
`;

const ContactItem = styled.div`
  margin-bottom: 1.75rem; // Increased from 1rem
  display: flex;
  align-items: flex-start;
`;

const IconWrapper = styled.span`
  margin-right: 12px; // Increased from 10px4
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6c63ff;
  padding-top: 2px;
`;

const LottieWrapper = styled.div`
  width: 32px; // Increased from 24px
  height: 32px; // Increased from 24px
  margin-right: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const ContactText = styled(Text)`
  color: #ccc !important;
  font-size: 0.9rem !important;
  line-height: 1.8 !important; // Increased from 1.4
  margin-bottom: 0.25rem; // Added bottom margin
`;

const FooterInfo = () => {
  return (
    <ContactSection>
      <StyledTitle level={3}>Contacto</StyledTitle>
      
      <ContactItem>
        <LottieWrapper>
          <Lottie
            animationData={phoneAnimation}
            loop={true}
            autoplay={true}
            style={{ width: '100%', height: '100%' }}
            rendererSettings={{
              preserveAspectRatio: 'xMidYMid slice'
            }}
            // Added speed setting to make animations faster
            speed={1.5} // Increased from default 1
          />
        </LottieWrapper>
        <ContactInfo>
          <ContactText>+1 (809) 555-0123</ContactText>
          <ContactText>
            <ClockCircleOutlined style={{ marginRight: '5px', fontSize: '0.8rem' }} />
            Lunes a Viernes, 8:00 AM - 5:00 PM
          </ContactText>
        </ContactInfo>
      </ContactItem>
      
      <ContactItem>
        <LottieWrapper>
          <Lottie
            animationData={mailAnimation}
            loop={true}
            autoplay={true}
            style={{ width: '100%', height: '100%' }}
            rendererSettings={{
              preserveAspectRatio: 'xMidYMid slice'
            }}
            speed={1.5} // Increased from default 1
          />
        </LottieWrapper>
        <ContactInfo>
          <ContactText>servicio.mototrack@gmail.com</ContactText>
        </ContactInfo>
      </ContactItem>
      
      <ContactItem>
        <LottieWrapper>
          <Lottie
            animationData={locationAnimation}
            loop={true}
            autoplay={true}
            style={{ width: '100%', height: '100%' }}
            rendererSettings={{
              preserveAspectRatio: 'xMidYMid slice'
            }}
            speed={1.5} // Increased from default 1
          />
        </LottieWrapper>
        <ContactInfo>
          <ContactText>Ayuntamiento de Santo Domingo Este</ContactText>
          <ContactText>Carretera Mella Km. 7½</ContactText>
          <ContactText>Santo Domingo Este, Rep. Dom.</ContactText>
        </ContactInfo>
      </ContactItem>
    </ContactSection>
  );
};

export default FooterInfo;