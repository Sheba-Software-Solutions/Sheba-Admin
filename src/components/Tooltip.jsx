import React, { useState } from 'react';

const Tooltip = ({ children, content, show = true }) => {
  const [isVisible, setIsVisible] = useState(false);

  if (!show || !content) {
    return children;
  }

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap z-50 shadow-lg">
          {content}
          <div className="absolute right-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-4 border-b-4 border-r-4 border-transparent border-r-gray-900"></div>
        </div>
      )}
    </div>
  );
};

export default Tooltip;