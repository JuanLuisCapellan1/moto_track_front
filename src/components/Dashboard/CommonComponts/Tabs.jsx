import React from 'react';
import { Tabs as AntTabs } from 'antd';
import styled from 'styled-components';

// Move styled-components to use transient props (prefixed with $)
// to prevent them from being passed to DOM elements
const StyledTabs = styled(AntTabs)`
  .ant-tabs-nav {
    margin-bottom: ${props => props.$inModal ? '12px' : '24px'};
  }

  .ant-tabs-tab {
    padding: ${props => props.$inModal ? '8px 10px' : '12px 16px'};
    display: flex;
    align-items: center;
    transition: all 0.3s;
    
    .anticon {
      margin-right: 8px;
      font-size: ${props => props.$inModal ? '16px' : '18px'};
    }
  }

  // Justified space between tabs
  .ant-tabs-nav-list {
    width: 100%;
    display: flex;
    
    .ant-tabs-tab {
      flex: 1;
      text-align: center;
      justify-content: center;
      font-size: ${props => props.$inModal ? '14px' : 'inherit'};
    }
  }

  // Responsive styles for tablets
  @media (max-width: 768px) {
    .ant-tabs-nav {
      margin-bottom: ${props => props.$inModal ? '10px' : '20px'};
    }
    
    .ant-tabs-tab {
      padding: ${props => props.$inModal ? '6px 8px' : '10px 12px'};
      
      .anticon {
        font-size: ${props => props.$inModal ? '14px' : '16px'};
      }
    }
  }

  // Responsive styles for mobile
  @media (max-width: 576px) {
    .ant-tabs-nav-list {
      flex-wrap: ${props => props.$mobileWrap || props.$inModal ? 'wrap' : 'nowrap'};
      overflow-x: ${props => props.$mobileWrap || props.$inModal ? 'visible' : 'auto'};
    }
    
    .ant-tabs-tab {
      padding: ${props => props.$inModal ? '5px 6px' : '8px 10px'};
      font-size: ${props => props.$inModal ? '12px' : '14px'};
      
      .anticon {
        margin-right: ${props => props.$inModal ? '3px' : '4px'};
        font-size: ${props => props.$inModal ? '12px' : '14px'};
      }
      
      ${props => (props.$mobileWrap || props.$inModal) ? `
        flex: 0 0 ${props.$inModal ? '45%' : '48%'};
        margin-bottom: 6px;
      ` : ''}
    }
  }

  // Extra small screens
  @media (max-width: 480px) {
    .ant-tabs-nav {
      margin-bottom: ${props => props.$inModal ? '8px' : '16px'};
    }
    
    .ant-tabs-nav-list {
      ${props => props.$inModal ? `
        flex-wrap: wrap;
      ` : ''}
    }
    
    .ant-tabs-tab {
      ${props => props.$inModal ? `
        flex: 0 0 ${props.$ultraCompact ? '100%' : '45%'};
        padding: 4px 6px;
        font-size: 11px;
        margin-bottom: 4px;
        
        .anticon {
          font-size: 11px;
          margin-right: 2px;
        }
      ` : ''}
    }
  }

  // Special styles for modal context
  ${props => props.$inModal ? `
    &.ant-tabs-small .ant-tabs-tab {
      padding: 5px 6px;
    }
    
    .ant-tabs-ink-bar {
      height: 2px;
    }
    
    // Improve tab appearance in modals
    .ant-tabs-tab.ant-tabs-tab-active {
      font-weight: 600;
    }
  ` : ''}
  
  // Touch-friendly targets for mobile
  @media (max-width: 576px) {
    .ant-tabs-tab {
      min-height: ${props => props.$inModal ? '32px' : '40px'};
    }
  }
`;

const Tabs = ({ 
  activeKey, 
  onChange, 
  items = [], 
  centered = true,
  type = "card",
  className,
  mobileWrap = false,
  inModal = false,
  ultraCompact = false,
  mobileMode = "scrollable",
  ...props
}) => {
  // Make sure onChange is a function to prevent errors
  const handleChange = (key) => {
    if (typeof onChange === 'function') {
      onChange(key);
    }
  };

  // Sanitize props to prevent React warnings
  const { tabBarGutter, size, ...otherProps } = props;
  
  // Only pass standard props to the underlying AntTabs component
  const safeProps = {
    activeKey,
    onChange: handleChange,
    items,
    centered,
    type,
    className,
    tabBarGutter: tabBarGutter || (inModal ? 4 : undefined),
    size: size || (inModal ? "small" : "middle"),
    ...otherProps
  };

  return (
    <StyledTabs 
      {...safeProps}
      // Pass custom props with $ prefix to styled component
      $mobileWrap={mobileWrap}
      $inModal={inModal}
      $ultraCompact={ultraCompact}
      $mobileMode={mobileMode}
    />
  );
};

export default Tabs;