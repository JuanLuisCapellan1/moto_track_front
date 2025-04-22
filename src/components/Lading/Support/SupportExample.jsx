import React, { useState, useEffect } from 'react';
import { Form, Input, Button, message } from 'antd';
import styled from 'styled-components';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import axios from 'axios';

const FormContainer = styled(motion.div)`
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  background-color: white;
`;

const Title = styled(motion.h2)`
  font-size: 1.5rem;
  margin-bottom: 0.8rem;
  color: #333;
  text-align: center;
`;

const StyledForm = styled(Form)`
  .ant-form-item-label > label {
    font-weight: 500;
    color: #333;
    font-size: 0.9rem;
    margin-bottom: 0.2rem;
  }

  .ant-form-item {
    margin-bottom: 0.8rem;
  }

  .ant-input {
    border-radius: 8px;
    padding: 8px 12px;
    border: 1px solid #e2e8f0;
    
    &:focus, &:hover {
      border-color: #6366f1;
      box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2);
    }
  }

  .ant-input-textarea {
    min-height: 100px;
  }
`;

const FormItemContainer = styled(motion.div)`
  width: 100%;
  margin-bottom: 0.8rem;
`;

const SubmitButton = styled(motion.div)`
  width: 100%;
  margin-top: 1rem;
  
  button {
    border-radius: 50px;
    padding: 0.7rem 1.3rem;
    height: auto;
    font-size: 0.9rem;
    background: #6366f1 !important;
    box-shadow: 0 2px 8px rgba(99, 102, 241, 0.2);
    border: none;
    width: 100%;
    
    &:hover {
      background: rgba(99, 102, 241, 0.8)!important;
      box-shadow: 0 2px 12px rgba(99, 102, 241, 0.3);
    }
    
    &:active {
      background: rgba(99, 102, 241, 0.6) !important;
    }
    
    &:focus {
      background: #6366f1!important;
      border-color: transparent;
    }
    
    &.ant-btn-loading {
      background: rgba(99, 102, 241, 0.7)!important;
      opacity: 0.8;
    }
  }
`;

const SuccessMessage = styled(motion.div)`
  text-align: center;
  padding: 2rem;
  background-color: #f0fdf4;
  border-radius: 12px;
  border: 1px solid #86efac;
  margin-top: 1rem;
  
  h3 {
    color: #166534;
    margin-bottom: 0.5rem;
  }
  
  p {
    color: #166534;
  }
`;

function SupportExample() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const controls = useAnimation();
  const api_url = import.meta.env.VITE_API_URL;

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.05, // Lowered from 0.2
    rootMargin: "-20px 0px" // Added to make it trigger sooner
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const handleSubmit = async (values) => {
    setLoading(true);
    
    try {
      const response = await axios.post(`${api_url}/api/contact`, {
        nombre: values.nombre,
        correo: values.email,
        asunto: values.asunto,
        mensaje: values.mensaje
      });

      if (response.data.success === true) {
        // Primero muestra el mensaje de éxito
        setSuccess(true);
        
        // Espera a que la animación de éxito se complete antes de resetear
        setTimeout(() => {
          form.resetFields();
        }, 300); // 300ms es la duración de la animación

        // Reset success message after 5 seconds
        setSuccess(false);
      } else {
        message.error('Hubo un error al enviar el mensaje. Por favor, inténtelo de nuevo.');
      }     
    } catch (error) {
      message.error('Hubo un error al enviar el mensaje. Por favor, inténtelo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  // Animation variants - optimized for faster appearance
  const containerVariants = {
    hidden: { 
      opacity: 0,
      y: 20, // Reduced from 30
      scale: 0.99 // Increased from 0.98 for subtler effect
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.3, // Reduced from 0.6
        ease: "easeOut", // Simplified from custom easing
        when: "beforeChildren",
        staggerChildren: 0.05 // Reduced from 0.1
      }
    }
  };

  const titleVariants = {
    hidden: { 
      opacity: 0, 
      y: -5 // Reduced from -10 for subtler movement
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.3, // Reduced from 0.5
        ease: "easeOut"
      }
    }
  };

  const formItemVariants = {
    hidden: { 
      opacity: 0, 
      y: 10 // Reduced from 15
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.3, // Reduced from 0.5
        ease: "easeOut"
      }
    }
  };

  const buttonVariants = {
    hidden: { 
      opacity: 0, 
      y: 10, // Reduced from 15
      scale: 0.98 // Increased from 0.95 for subtler effect
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.3, // Reduced from 0.5
        ease: "easeOut",
        delay: 0.05 // Reduced from 0.2
      }
    },
    hover: {
      scale: 1.02, // Reduced from 1.03 for subtler effect
      transition: { duration: 0.2 } // Reduced from 0.3
    },
    tap: {
      scale: 0.98, // Increased from 0.97 for subtler effect
      transition: { duration: 0.1 }
    }
  };

  const successVariants = {
    hidden: { 
      opacity: 0, 
      y: 10, // Reduced from 20
      scale: 0.95 // Increased from 0.9 for subtler effect
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { 
        type: "spring",
        stiffness: 300, // Increased from 200 for snappier animation
        damping: 20 // Increased from 15 for faster stabilization
      }
    }
  };

  return (
    <FormContainer
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
    >
      <Title variants={titleVariants}>Envíenos un mensaje</Title>
      
      <AnimatePresence mode="wait">
        {success ? (
          <SuccessMessage
            key="success"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={successVariants}
          >
            <motion.h3
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              ¡Mensaje enviado con éxito!
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              Gracias por contactarnos. Nos pondremos en contacto con usted lo antes posible.
            </motion.p>
          </SuccessMessage>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <StyledForm
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
              requiredMark={false}
              preserve={false}
            >
              <FormItemContainer variants={formItemVariants}>
                <Form.Item
                  label="Nombre"
                  name="nombre"
                  rules={[{ required: true, message: 'Por favor ingrese su nombre' }]}
                >
                  <Input placeholder="Su nombre completo" />
                </Form.Item>
              </FormItemContainer>
              
              <FormItemContainer variants={formItemVariants}>
                <Form.Item
                  label="Correo Electrónico"
                  name="email"
                  rules={[
                    { required: true, message: 'Por favor ingrese su correo electrónico' },
                    { type: 'email', message: 'Por favor ingrese un correo electrónico válido' }
                  ]}
                >
                  <Input placeholder="Su correo electrónico" />
                </Form.Item>
              </FormItemContainer>
              
              <FormItemContainer variants={formItemVariants}>
                <Form.Item
                  label="Asunto"
                  name="asunto"
                  rules={[{ required: true, message: 'Por favor ingrese el asunto' }]}
                >
                  <Input placeholder="Asunto de su mensaje" />
                </Form.Item>
              </FormItemContainer>
              
              <FormItemContainer variants={formItemVariants}>
                <Form.Item
                  label="Mensaje"
                  name="mensaje"
                  rules={[{ required: true, message: 'Por favor escriba su mensaje' }]}
                >
                  <Input.TextArea placeholder="Escriba un mensaje aquí" rows={6} />
                </Form.Item>
              </FormItemContainer>
              
              <SubmitButton 
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <Form.Item>
                  <Button 
                    type="primary" 
                    htmlType="submit" 
                    loading={loading}
                  >
                    Enviar mensaje
                  </Button>
                </Form.Item>
              </SubmitButton>
            </StyledForm>
          </motion.div>
        )}
      </AnimatePresence>
    </FormContainer>
  );
}

export default SupportExample;