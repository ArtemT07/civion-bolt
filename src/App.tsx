import React, { useState } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { CalculatorPage } from './pages/CalculatorPage';
import { ContactsPage } from './pages/ContactsPage';
import { MaterialsPage } from './pages/MaterialsPage';
import { ProfilePage } from './pages/ProfilePage';

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
      default:
        return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <AuthProvider>
      <LanguageProvider>
        <div className="min-h-screen bg-gray-100">
          <Navbar currentPage={currentPage} onNavigate={setCurrentPage} />
          <main>{renderPage()}</main>
        </div>
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;
