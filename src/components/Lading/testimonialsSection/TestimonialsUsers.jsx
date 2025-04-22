import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Tooltip } from 'antd';

const TestimonialsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0.2rem 0;
  
  @media (max-width: 768px) {
    gap: 0.5rem;
    padding: 1rem 0;
  }
`;

const UserRow = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
  
  @media (max-width: 768px) {
    gap: 0.5rem;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;

  /* Aplicar solo cuando está activo */
  ${props => props.$isActive && `
    box-shadow: 0 0 20px 5px #81E9FF;
    border: 2px solid #BAB6FF;
  `}
  
  @media (max-width: 992px) {
    width: 50px;
    height: 50px;
  }
  
  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
  }
  
  @media (max-width: 480px) {
    width: 32px;
    height: 32px;
  }
`;

const UserImage = styled(motion.img)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
`;

function TestimonialsUsers({ setCurrentUser, currentUser }) {
  const users = [
    { name: 'Armando Balcacer', imageUrl: 'https://res.cloudinary.com/dx87s3lws/image/upload/v1745287334/user-1_rmqj6n.png' },
    { name: 'Roamel Cabral', imageUrl: 'https://res.cloudinary.com/dx87s3lws/image/upload/v1745287335/user-2_w5nn3n.png' },
    { name: 'Christopher Ciprian', imageUrl: 'https://res.cloudinary.com/dx87s3lws/image/upload/v1745287335/user-3_ro4uty.png' },
    { name: 'Eric Collado', imageUrl: 'https://res.cloudinary.com/dx87s3lws/image/upload/v1745287336/user-4_oe7pv8.png' },
    { name: 'Manuel Guzman', imageUrl: 'https://res.cloudinary.com/dx87s3lws/image/upload/v1745287336/user-5_wd5byz.png' },
    { name: 'Ashli Cuevas', imageUrl: 'https://res.cloudinary.com/dx87s3lws/image/upload/v1745287335/user-6_euohfm.png' },
    { name: 'Francis De la Cruz', imageUrl: 'https://res.cloudinary.com/dx87s3lws/image/upload/v1745287334/user-7_bowkqq.png' },
    { name: 'Alexander Gil', imageUrl: 'https://res.cloudinary.com/dx87s3lws/image/upload/v1745287336/user-8_nwpupw.png' },
    { name: 'Elersis Gomez', imageUrl: 'https://res.cloudinary.com/dx87s3lws/image/upload/v1745287335/user-9_oyrf2f.png' },
    { name: 'Eduardo Grau', imageUrl: 'https://res.cloudinary.com/dx87s3lws/image/upload/v1745287336/user-10_b8dpvx.png' },
    { name: 'Derek Hernandez', imageUrl: 'https://res.cloudinary.com/dx87s3lws/image/upload/v1745287336/user-11_ku885p.png' },
    { name: 'Jackson Martinez', imageUrl: 'https://res.cloudinary.com/dx87s3lws/image/upload/v1745287336/user-12_mp2hmk.png' },
    { name: 'Gabriela Melo', imageUrl: 'https://res.cloudinary.com/dx87s3lws/image/upload/v1745287336/user-13_ywgbls.png' },
    { name: 'Laura Ogando', imageUrl: 'https://res.cloudinary.com/dx87s3lws/image/upload/v1745287336/user-14_jigwnq.png' },
    { name: 'Juan Olivo', imageUrl: 'https://res.cloudinary.com/dx87s3lws/image/upload/v1745287336/user-15_wymgmy.png' },
    { name: 'Guillermo Pacanins', imageUrl: 'https://res.cloudinary.com/dx87s3lws/image/upload/v1745287336/user-16_uuzi0d.png' },
    { name: 'Irving Penalo', imageUrl: 'https://res.cloudinary.com/dx87s3lws/image/upload/v1745287336/user-17_tu0xkj.png' },
    { name: 'Leonardo Pezo', imageUrl: 'https://res.cloudinary.com/dx87s3lws/image/upload/v1745287337/user-18_p3xusg.png' },
    { name: 'Winston Pichardo', imageUrl: 'https://res.cloudinary.com/dx87s3lws/image/upload/v1745287337/user-19_g2jvfz.png' },
    { name: 'Samuel Polanco', imageUrl: 'https://res.cloudinary.com/dx87s3lws/image/upload/v1745287337/user-20_accgs6.png' },
    { name: 'Erick Savinon', imageUrl: 'https://res.cloudinary.com/dx87s3lws/image/upload/v1745287337/user-21_ymrx1k.png' },
    { name: 'Eduardo Segura', imageUrl: 'https://res.cloudinary.com/dx87s3lws/image/upload/v1745287337/user-22_szvfn3.png' },
    { name: 'Jorge Tapia', imageUrl: 'https://res.cloudinary.com/dx87s3lws/image/upload/v1745287337/user-24_gwphtg.png' },
    { name: 'Alexander Trinidad', imageUrl: 'https://res.cloudinary.com/dx87s3lws/image/upload/v1745287337/user-25_qn5adw.png' },
    { name: 'Anni Yuen', imageUrl: 'https://res.cloudinary.com/dx87s3lws/image/upload/v1745287337/user-23_gpx9ud.png' }
  ];

  // State to track if we're on mobile view
  const [isMobile, setIsMobile] = useState(false);
  
  // Update isMobile state based on screen size
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    // Initial check
    checkIfMobile();
    
    // Add event listener
    window.addEventListener('resize', checkIfMobile);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  // For desktop: split into 2 rows
  const topUsers = users.slice(0, 13);
  const bottomUsers = users.slice(13);

  // For mobile: split into 3 rows with odd numbers (9, 7, 9)
  const firstRowMobile = users.slice(0, 9);  // 9 users (odd)
  const secondRowMobile = users.slice(9, 16); // 7 users (odd)
  const thirdRowMobile = users.slice(16);    // 9 users (odd)

  // Enhanced animation variants - optimized for faster appearance
  const imageAnimation = {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    hover: {
      scale: 1.05, // Mantener solo la escala en hover
      transition: { duration: 0.2 }
    },
    tap: {
      scale: 0.95
    },
    exit: { opacity: 0, scale: 0.9 }
  };

  // Helper function to render a row of users with staggered animations
  const renderUserRow = (usersList, rowIndex, placementDirection) => (
    <UserRow>
      {usersList.map((user, index) => (
        <Tooltip key={index} title={user.name} placement={placementDirection}>
          <ImageContainer $isActive={currentUser === user.name}>
            <UserImage
              onClick={() => setCurrentUser(user.name)}
              src={user.imageUrl}
              alt={user.name}
              initial="initial"
              animate="animate"
              exit="exit"
              whileHover="hover"
              whileTap="tap"
              variants={imageAnimation}
              transition={{ 
                duration: 0.3, // Reduced from 0.4
                delay: index * 0.03, // Reduced from 0.05 for faster staggering
                type: "spring",
                stiffness: 300, // Increased from 260 for snappier movement
                damping: 15 // Decreased from 20 for faster bounce
              }}
            />
          </ImageContainer>
        </Tooltip>
      ))}
    </UserRow>
  );

  return (
    <TestimonialsContainer>
      {isMobile ? (
        // Mobile layout: 3 rows with odd numbers (9-7-9)
        <>
          {renderUserRow(firstRowMobile, 0, "top")}
          {renderUserRow(secondRowMobile, 1, "top")}
          {renderUserRow(thirdRowMobile, 2, "bottom")}
        </>
      ) : (
        // Desktop layout: 2 rows
        <>
          {renderUserRow(topUsers, 0, "top")}
          {renderUserRow(bottomUsers, 1, "bottom")}
        </>
      )}
    </TestimonialsContainer>
  );
}

export default TestimonialsUsers;