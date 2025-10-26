import React, { useState } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { CalculatorPage } from './pages/CalculatorPage';
import { ContactsPage } from './pages/ContactsPage';
import { MaterialsPage } from './pages/MaterialsPage';
import { ProfilePage } from './pages/ProfilePage';
import { DashboardPage } from './pages/DashboardPage';
import { UserManagementPage } from './pages/UserManagementPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { MaterialsManagementPage } from './pages/MaterialsManagementPage';
import { CMSPage } from './pages/CMSPage';
import { DynamicCMSPage } from './pages/DynamicCMSPage';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={setCurrentPage} />;
      case 'about':
        return <AboutPage />;
      case 'calculator':
        return <CalculatorPage />;
      case 'contacts':
        return <ContactsPage />;
      case 'materials':
        return <MaterialsPage />;
      case 'profile':
        return <ProfilePage />;
      case 'dashboard':
        return <DashboardPage onNavigate={setCurrentPage} />;
      case 'users':
        return <UserManagementPage />;
      case 'projects':
        return <ProjectsPage />;
      case 'materials-management':
        return <MaterialsManagementPage />;
      case 'cms':
        return <CMSPage onNavigate={setCurrentPage} />;
      default:
        if (currentPage.startsWith('cms-')) {
          const slug = currentPage.replace('cms-', '');
          return <DynamicCMSPage slug={slug} />;
        }
        return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <AuthProvider>
      <LanguageProvider>
        <ThemeProvider>
          <div className="min-h-screen">
            <Navbar currentPage={currentPage} onNavigate={setCurrentPage} />
            <main>{renderPage()}</main>
          </div>
        </ThemeProvider>
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;
