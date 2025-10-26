import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FolderOpen, 
  Users, 
  FileText, 
  PenTool,
  Briefcase,
  MessageSquare, 
  Settings, 
  LogOut,
  Menu,
  X,
  Bell,
  Search,
  User,
  ChevronDown,
  ChevronRight,
  UserCheck
} from 'lucide-react';
import Tooltip from './Tooltip';

const Layout = ({ children, user, onLogout }) => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    const saved = localStorage.getItem('sidebarCollapsed');
    return saved ? JSON.parse(saved) : false;
  });
  const [expandedMenus, setExpandedMenus] = useState(() => {
    const saved = localStorage.getItem('expandedMenus');
    return saved ? JSON.parse(saved) : {};
  });

  // Save sidebar state to localStorage
  const toggleSidebar = () => {
    const newState = !sidebarCollapsed;
    setSidebarCollapsed(newState);
    localStorage.setItem('sidebarCollapsed', JSON.stringify(newState));
  };

  // Toggle submenu expansion
  const toggleSubmenu = (menuName) => {
    const newState = {
      ...expandedMenus,
      [menuName]: !expandedMenus[menuName]
    };
    setExpandedMenus(newState);
    localStorage.setItem('expandedMenus', JSON.stringify(newState));
  };

  // Auto-expand careers menu if on careers-related page
  useEffect(() => {
    if (location.pathname === '/careers' || location.pathname === '/job-applications') {
      if (!expandedMenus.Careers) {
        const newState = { ...expandedMenus, Careers: true };
        setExpandedMenus(newState);
        localStorage.setItem('expandedMenus', JSON.stringify(newState));
      }
    }
  }, [location.pathname, expandedMenus]);

  // Extract user role from user object
  const userRole = user?.role || 'admin';

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Projects', href: '/projects', icon: FolderOpen },
    { name: 'Clients', href: '/clients', icon: Users },
    { name: 'Content', href: '/content', icon: FileText },
    { name: 'Blog', href: '/blog', icon: PenTool },
    { 
      name: 'Careers', 
      icon: Briefcase,
      submenu: [
        { name: 'Job Postings', href: '/careers', icon: Briefcase },
        { name: 'Applications', href: '/job-applications', icon: UserCheck }
      ]
    },
    { name: 'Communication', href: '/communication', icon: MessageSquare },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  const isActive = (path) => location.pathname === path;
  
  const isSubmenuActive = (submenu) => {
    return submenu.some(item => location.pathname === item.href);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-gray-600 bg-opacity-75 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-30 bg-white shadow-xl transform transition-all duration-300 ease-in-out
        lg:static lg:inset-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        ${sidebarCollapsed ? 'lg:w-16 sidebar-collapsed' : 'lg:w-64'}
        w-64
      `}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className={`flex items-center h-16 px-6 bg-gradient-to-r from-blue-600 to-purple-600 ${
            sidebarCollapsed ? 'justify-center' : 'justify-between'
          }`}>
            {/* Logo Section */}
            {sidebarCollapsed ? (
              /* Centered hamburger when collapsed */
              <Tooltip content="Expand Sidebar" show={true}>
                <button
                  onClick={toggleSidebar}
                  className="text-white hover:text-white/80 p-2 rounded transition-colors"
                >
                  <Menu className="w-6 h-6" />
                </button>
              </Tooltip>
            ) : (
              /* Full logo and controls when expanded */
              <>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                    <LayoutDashboard className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-white text-xl font-bold">Sheba Admin</span>
                </div>
                <div className="flex items-center gap-2">
                  {/* Desktop Sidebar Toggle Button */}
                  <Tooltip content="Collapse Sidebar" show={false}>
                    <button
                      onClick={toggleSidebar}
                      className="hidden lg:block text-white hover:text-white/80 p-1 rounded transition-colors"
                    >
                      <Menu className="w-5 h-5" />
                    </button>
                  </Tooltip>
                  
                  {/* Mobile Close Button */}
                  <button
                    onClick={() => setSidebarOpen(false)}
                    className="lg:hidden text-white hover:text-gray-200"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </>
            )}
          </div>

          {/* User Info */}
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-blue-600" />
              </div>
              {!sidebarCollapsed && (
                <div>
                  <p className="font-semibold text-gray-900">Admin User</p>
                  <p className="text-sm text-gray-500 capitalize">{userRole}</p>
                </div>
              )}
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-6 py-4 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              
              // Handle items with submenus
              if (item.submenu) {
                const isExpanded = expandedMenus[item.name];
                const hasActiveSubmenu = isSubmenuActive(item.submenu);
                
                return (
                  <div key={item.name}>
                    <Tooltip content={item.name} show={sidebarCollapsed}>
                      <button
                        onClick={() => !sidebarCollapsed && toggleSubmenu(item.name)}
                        className={`sidebar-item w-full flex items-center gap-3 text-sm font-medium ${
                          hasActiveSubmenu
                            ? 'active text-white'
                            : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                        } ${sidebarCollapsed ? 'justify-center' : 'justify-between'}`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="w-5 h-5" />
                          {!sidebarCollapsed && item.name}
                        </div>
                        {!sidebarCollapsed && (
                          <div className="transition-transform duration-200">
                            {isExpanded ? (
                              <ChevronDown className="w-4 h-4" />
                            ) : (
                              <ChevronRight className="w-4 h-4" />
                            )}
                          </div>
                        )}
                      </button>
                    </Tooltip>
                    
                    {/* Submenu items */}
                    {!sidebarCollapsed && isExpanded && (
                      <div className="ml-8 mt-2 space-y-1">
                        {item.submenu.map((subItem) => {
                          const SubIcon = subItem.icon;
                          return (
                            <Link
                              key={subItem.name}
                              to={subItem.href}
                              className={`sidebar-item flex items-center gap-3 text-sm font-medium ${
                                isActive(subItem.href)
                                  ? 'active text-white'
                                  : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                              }`}
                              onClick={() => setSidebarOpen(false)}
                            >
                              <SubIcon className="w-4 h-4" />
                              {subItem.name}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              }
              
              // Handle regular menu items
              return (
                <Tooltip key={item.name} content={item.name} show={sidebarCollapsed}>
                  <Link
                    to={item.href}
                    className={`sidebar-item flex items-center gap-3 text-sm font-medium ${
                      isActive(item.href)
                        ? 'active text-white'
                        : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                    } ${sidebarCollapsed ? 'justify-center' : ''}`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <Icon className="w-5 h-5" />
                    {!sidebarCollapsed && item.name}
                  </Link>
                </Tooltip>
              );
            })}
          </nav>

          {/* Logout */}
          <div className="px-6 py-4 border-t border-gray-200">
            <Tooltip content="Sign Out" show={sidebarCollapsed}>
              <button
                onClick={onLogout}
                className={`sidebar-item w-full flex items-center gap-3 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 ${
                  sidebarCollapsed ? 'justify-center' : ''
                }`}
              >
                <LogOut className="w-5 h-5" />
                {!sidebarCollapsed && 'Sign Out'}
              </button>
            </Tooltip>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className={`flex-1 transition-all duration-300 ${
        sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'
      }`}>
        {/* Top bar */}
        <div className="sticky top-0 z-10 bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-6">
            <div className="flex items-center gap-4">
              {/* Hamburger menu for mobile */}
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-gray-500 hover:text-gray-700"
              >
                <Menu className="w-6 h-6" />
              </button>
              
              {/* Search */}
              <div className="hidden md:block relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Notifications */}
              <button className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* Profile */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-blue-600" />
                </div>
                <span className="hidden md:block text-sm font-medium text-gray-700 capitalize">{userRole}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="min-h-screen bg-gray-50 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
