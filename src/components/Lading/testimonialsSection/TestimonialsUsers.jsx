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
    { name: 'Armando Balcacer' },
    { name: 'Roamel Cabral' },
    { name: 'Christopher Ciprian' },
    { name: 'Eric Collado' },
    { name: 'Manuel Guzman' },
    { name: 'Ashli Cuevas' },
    { name: 'Francis De la Cruz' },
    { name: 'Alexander Gil' },
    { name: 'Elersis Gomez' },
    { name: 'Eduardo Grau' },
    { name: 'Derek Hernandez' },
    { name: 'Jackson Martinez' },
    { name: 'Gabriela Melo' },
    { name: 'Laura Ogando' },
    { name: 'Juan Olivo' },
    { name: 'Guillermo Pacanins' },
    { name: 'Irving Penalo' },
    { name: 'Leonardo Pezo' },
    { name: 'Winston Pichardo' },
    { name: 'Samuel Polanco' },
    { name: 'Erick Savinon' },
    { name: 'Eduardo Segura' },
    { name: 'Jorge Tapia' },
    { name: 'Alexander Trinidad' },
    { name: 'Anni Yuen' } // Fixed: Changed from 'Anni Chang'
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
      {usersList.map((user, index) => {
        // Calculate the global index for the image source
        let globalIndex;
        
        if (isMobile) {
          // For mobile view with odd rows
          globalIndex = rowIndex === 0 ? index + 1 : 
                        rowIndex === 1 ? index + 10 : 
                        index + 17;
        } else {
          // For desktop view
          globalIndex = rowIndex === 0 ? index + 1 : index + 14;
        }

        // Special cases handling
        let imageSrc = '';
        if (user.name === 'Anni Yuen') {
          imageSrc = '/src/assets/Lading/testimonials/user-25.png'; // Updated to correct image number
        } else if (user.name === 'Leonardo Pezo') {
          imageSrc = '/src/assets/Lading/testimonials/user-18.png'; // Updated to correct image number
        } else if (user.name === 'Armando Balcacer') {
          // Handle first user explicitly
          imageSrc = '/src/assets/Lading/testimonials/user-1.png';
        } else {
          imageSrc = `/src/assets/Lading/testimonials/user-${globalIndex}.png`;
        }

        return (
          <Tooltip key={index} title={user.name} placement={placementDirection}>
            <ImageContainer $isActive={currentUser === user.name}>
              <UserImage
                onClick={() => setCurrentUser(user.name)}
                src={imageSrc}
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
        );
      })}
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