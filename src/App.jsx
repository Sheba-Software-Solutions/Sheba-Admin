import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { AuthProvider, useAuth } from './hooks/useAuth';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import Clients from './pages/Clients';
import Content from './pages/Content';
import Blog from './pages/Blog';
import Careers from './pages/Careers';
import Communication from './pages/Communication';
import Settings from './pages/Settings';
import Layout from './components/Layout';
import Toast from './components/Toast';
import { useToast } from './hooks/useToast';
import LoadingSpinner from './components/LoadingSpinner';

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

// Layout wrapper for authenticated routes
const AuthenticatedLayout = () => {
  const { user, logout } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      showToast('Successfully logged out', 'success');
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      // Still logout locally even if API call fails
      logout();
      navigate('/login');
    }
  };

  return (
    <Layout user={user} onLogout={handleLogout}>
      <Outlet />
    </Layout>
  );
};

// App content component that uses auth context
function AppContent() {
  const { isAuthenticated, isLoading, login } = useAuth();

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Login route - accessible when not authenticated */}
        <Route 
          path="/login" 
          element={
            isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login onLogin={login} />
          } 
        />
        
        {/* Protected routes - only accessible when authenticated */}
        <Route element={
          <ProtectedRoute>
            <AuthenticatedLayout />
          </ProtectedRoute>
        }>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/content" element={<Content />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/communication" element={<Communication />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
        
        {/* Root and all other routes redirect based on authentication */}
        <Route 
          path="/" 
          element={
            isAuthenticated ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />
          } 
        />
        <Route 
          path="*" 
          element={
            isAuthenticated ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}

// Main App component that provides the AuthProvider
function App() {
  return (
    <AuthProvider>
      <AppContent />
      <Toast />
    </AuthProvider>
  );
}

export default App;
