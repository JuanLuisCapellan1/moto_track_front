import React, { useEffect } from 'react';
import styled from 'styled-components';

import Nav from '../../components/Lading/Nav/Nav';
import Hero from '../../components/Lading/Hero/Hero';
import Characteristic from '../../components/Lading/CharacteristicsSection/Characteristic';
import HowItWorks from '../../components/Lading/HowItWorksSection/HowItWorks';
import Users from '../../components/Lading/UsersSection/Users';
import Testimonials from '../../components/Lading/testimonialsSection/Testimonials';
import Collaboration from '../../components/Lading/CollaborationSection/Collaboration';
import FAQ from '../../components/Lading/FAQSection/FAQ';
import Support from '../../components/Lading/Support/Support';
import Prefooter from '../../components/Lading/PrefooterSection/Prefooter';
import Footer from '../../components/Lading/FooterSection/Footer';

const LandingContainer = styled.div`
  width: 100%;
  max-width: 100vw;
  position: relative;
  height: 100vh; /* Fixed height to contain scroll */
  overflow-y: auto; /* Enable vertical scrolling within the container */
  overflow-x: hidden; /* Prevent horizontal scrolling */
  margin: 0;
  padding: 0;
  
  /* Custom scrollbar styling */
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

const HeroSection = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  /* Removed min-height: 100vh to normalize spacing */
  padding: clamp(80px, 8vh, 100px) 0 clamp(40px, 5vw, 60px);
  position: relative;
  z-index: 1;
  
  @media (max-width: 768px) {
    padding: clamp(60px, 6vh, 80px) 0 clamp(30px, 4vw, 40px);
  }
`;

const Section = styled.section`
  width: 100%;
  padding: clamp(40px, 5vw, 60px) 0;
  position: relative;
  z-index: 1;
  /* Remove margin-top since we're normalizing spacing */
  margin: 0;
  
  @media (max-width: 768px) {
    padding: clamp(30px, 4vw, 40px) 0;
  }
`;

const BlackSection = styled.div`
  position: relative;
  width: 100%;
  background: black;
  color: white;
  z-index: 5;
  padding: 60px 0;
  margin-top: -10px;  /* Ajustado para mejor transición */
  height: auto;
  min-height: 600px;
  box-sizing: border-box;
  
  /* Suavizar transición con la sección anterior */
  &:before {
    content: '';
    position: absolute;
     margin-top: 10px;
    top: -100;
    left: -50vw;
    right: -50vw;
    bottom: 0;
    background: black;
    z-index: -1;
    transform: skewY(-5deg);
    transform-origin: 0 0;
  }
  
  /* Remover skew del contenedor principal */
  transform: none;
  
  /* Resto de los media queries... */
  
  @media (max-width: 768px) {
    padding: 40px 0;
    margin-top: -15px;
    min-height: 550px;
  }
  
  @media (min-width: 769px) and (max-width: 1399px) {
    padding: 60px 0;
    margin-top: -10px;
    min-height: 600px;
  }
  
  @media (min-width: 1400px) and (max-width: 1919px) {
    padding: 70px 0;
    margin-top: -5px;
    min-height: 650px;
  }
  
  @media (min-width: 1920px) {
    padding: 80px 0;
    margin-top: 0px;
    min-height: 700px;
  }
  
  /* Safari fix */
  -webkit-transform: skewY(-5deg);
  -webkit-transform-origin: 0 0;
`;

const UnskewedContent = styled.div`
  transform: skewY(5deg);
  -webkit-transform: skewY(5deg);
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  height: 100%;
  overflow-y: auto;
  
  @media (max-width: 768px) {
    padding: 30px 15px;
  }
`;

const BlackSectionContent = styled(Section)`
  margin: 0;
  padding: 20px 0;
  height: auto;
  overflow-y: visible;
`;

function LandingPage() {
  useEffect(() => {
    // Prevent body scrolling, all scrolling will be inside LandingContainer
    document.body.style.overflow = 'hidden';
    document.body.style.height = '100vh';
    
    // Cleanup
    return () => {
      document.body.style.overflow = '';
      document.body.style.height = '';
    };
  }, []);

  return (
    <>
    
      <LandingContainer>
        <Nav />
        
        <HeroSection id="hero">
          <Hero />
        </HeroSection>

        <Section id="characteristics">
          <Characteristic />
        </Section>

        <Section id="how-it-works" style={{ paddingBottom: "30px" }}>
          <HowItWorks />
        </Section>

        <BlackSection>
          <UnskewedContent>
            <BlackSectionContent id="users">
              <Users />
            </BlackSectionContent>
            <BlackSectionContent id="testimonials">
              <Testimonials />
            </BlackSectionContent>
          </UnskewedContent>
        </BlackSection>
     
        <Section id="collaboration">
          <Collaboration />
        </Section>

        <Section id="faq">
          <FAQ />
        </Section>

        <Section id="support">
          <Support />
        </Section>

        <Section id="prefooter" style={{ marginTop: 0 }}>
          <Prefooter />
        </Section>

        <Footer />
      </LandingContainer>
    </>
  );
}

export default LandingPage;