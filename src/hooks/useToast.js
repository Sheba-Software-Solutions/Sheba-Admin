import { useState, useCallback } from 'react';

export const useToast = () => {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((type, message, duration = 5000) => {
    const id = Date.now();
    const newToast = { id, type, message, duration };
    
    setToasts(prev => [...prev, newToast]);
    
    return id;
  }, []);

  const hideToast = useCallback((id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const showSuccess = useCallback((message, duration) => 
    showToast('success', message, duration), [showToast]);
  
  const showError = useCallback((message, duration) => 
    showToast('error', message, duration), [showToast]);
  
  const showWarning = useCallback((message, duration) => 
    showToast('warning', message, duration), [showToast]);
  
  const showInfo = useCallback((message, duration) => 
    showToast('info', message, duration), [showToast]);

  return {
    toasts,
    showToast,
    hideToast,
    showSuccess,
    showError,
    showWarning,
    showInfo
  };
};
