// Scrollbar styling
export const scrollbarStyles = `
  .modern-scrollbar {
    scrollbar-width: thin;
    scrollbar-color: rgba(87, 87, 87, 0.5) transparent;
  }
  
  .modern-scrollbar::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  
  .modern-scrollbar::-webkit-scrollbar-track {
    background: transparent;
  }
  
  .modern-scrollbar::-webkit-scrollbar-thumb {
    background-color: rgba(87, 87, 87, 0.5);
    border-radius: 20px;
    transition: background-color 0.2s ease;
  }
  
  .modern-scrollbar::-webkit-scrollbar-thumb:hover {
    background-color: rgba(120, 120, 120, 0.7);
  }
  
  /* Horizontal scrollbar enhanced styling */
  .modern-scrollbar::-webkit-scrollbar:horizontal {
    height: 6px;
    margin-top: 4px;
  }
  
  .modern-scrollbar::-webkit-scrollbar-thumb:horizontal {
    border-radius: 10px;
    background-color: rgba(87, 87, 87, 0.6); 
  }
  
  .conversation-tabs {
    padding-bottom: 8px;
    margin-bottom: -8px;
  }
  
  /* Dark mode adjustments */
  .dark .modern-scrollbar {
    scrollbar-color: rgba(150, 150, 150, 0.5) transparent;
  }
  
  .dark .modern-scrollbar::-webkit-scrollbar-thumb {
    background-color: rgba(150, 150, 150, 0.5);
  }
  
  .dark .modern-scrollbar::-webkit-scrollbar-thumb:hover {
    background-color: rgba(180, 180, 180, 0.7);
  }
  
  .dark .modern-scrollbar::-webkit-scrollbar-thumb:horizontal {
    background-color: rgba(150, 150, 150, 0.6);
  }
  
  /* Theme transition styles */
  .color-theme-in-transition,
  .color-theme-in-transition *,
  .color-theme-in-transition *:before,
  .color-theme-in-transition *:after {
    transition: all 0.3s ease-out !important;
    transition-delay: 0 !important;
  }
`;

// Category Images
export const getCategoryImage = (category: string): string => {
  const categoryImages: Record<string, string> = {
    'Home Repair':
      'https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG9tZSUyMHJlcGFpcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=80',
    'Gardening':
      'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Z2FyZGVuaW5nfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=80',
    'Cooking':
      'https://images.unsplash.com/photo-1490645935967-10de6ba1a506?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGNvb2tpbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=80',
    'Cleaning':
      'https://images.unsplash.com/photo-1603791440384-56cd371ee9fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2xlYW5pbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=80',
    'Tech': 'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dGVjaCUyMHN1cHBvcnR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=80',
    'Education':
      'https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx8ZWR1Y2F0aW9ufGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=80',
    'Fitness':
      'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Zml0bmVzc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=80',
  };
  return (
    categoryImages[category]
    || 'https://images.unsplash.com/photo-1600880292203-943569645149?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c2VydmljZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=80'
  );
};
