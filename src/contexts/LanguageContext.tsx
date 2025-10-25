import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

type Language = 'es' | 'en';

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

const translations = {
  es: {
    home: 'Inicio',
    about: 'Sobre Nosotros',
    calculator: 'Calculadora',
    contacts: 'Contactos',
    materials: 'Materiales',
    login: 'Iniciar Sesión',
    register: 'Registrarse',
    logout: 'Cerrar Sesión',
    profile: 'Perfil',
    email: 'Correo Electrónico',
    password: 'Contraseña',
    fullName: 'Nombre Completo',
    phone: 'Teléfono',
    forgotPassword: '¿Olvidaste tu contraseña?',
    resetPassword: 'Restablecer Contraseña',
    signIn: 'Iniciar Sesión',
    signUp: 'Registrarse',
    alreadyHaveAccount: '¿Ya tienes una cuenta?',
    dontHaveAccount: '¿No tienes una cuenta?',
    welcome: 'Bienvenido',
    welcomeBack: 'Bienvenido de nuevo',
    createAccount: 'Crear Cuenta',
    sendResetLink: 'Enviar Enlace de Restablecimiento',
    resetLinkSent: 'Se ha enviado un enlace de restablecimiento a tu correo',
    settings: 'Configuración',
    save: 'Guardar',
    cancel: 'Cancelar',
    updateProfile: 'Actualizar Perfil',
    language: 'Idioma',
    spanish: 'Español',
    english: 'Inglés',
    heroTitle: 'Construyendo el Futuro de República Dominicana',
    heroSubtitle: 'Expertos en construcción residencial y comercial con más de 20 años de experiencia',
    getStarted: 'Comenzar',
    ourServices: 'Nuestros Servicios',
    residentialConstruction: 'Construcción Residencial',
    commercialConstruction: 'Construcción Comercial',
    renovation: 'Renovación',
    consulting: 'Consultoría',
    aboutTitle: 'Sobre Nuestra Empresa',
    aboutDescription: 'Somos una empresa líder en construcción en República Dominicana, dedicada a crear espacios excepcionales que mejoran la vida de nuestros clientes.',
    calculatorTitle: 'Calculadora de Construcción',
    calculatorDescription: 'Calcula el costo estimado de tu proyecto de construcción',
    area: 'Área (m²)',
    projectType: 'Tipo de Proyecto',
    residential: 'Residencial',
    commercial: 'Comercial',
    calculate: 'Calcular',
    estimatedCost: 'Costo Estimado',
    contactTitle: 'Contáctanos',
    contactDescription: 'Estamos aquí para responder tus preguntas y ayudarte con tu proyecto',
    address: 'Dirección',
    addressValue: 'Santo Domingo, República Dominicana',
    phoneValue: '+1 (809) 555-0123',
    emailValue: 'info@construccion.do',
    materialsTitle: 'Materiales de Construcción',
    materialsDescription: 'Trabajamos con los mejores materiales del mercado',
    concrete: 'Concreto',
    steel: 'Acero',
    wood: 'Madera',
    ceramics: 'Cerámica',
    paint: 'Pintura',
    electrical: 'Eléctricos',
  },
  en: {
    home: 'Home',
    about: 'About Us',
    calculator: 'Calculator',
    contacts: 'Contacts',
    materials: 'Materials',
    login: 'Login',
    register: 'Register',
    logout: 'Logout',
    profile: 'Profile',
    email: 'Email',
    password: 'Password',
    fullName: 'Full Name',
    phone: 'Phone',
    forgotPassword: 'Forgot your password?',
    resetPassword: 'Reset Password',
    signIn: 'Sign In',
    signUp: 'Sign Up',
    alreadyHaveAccount: 'Already have an account?',
    dontHaveAccount: "Don't have an account?",
    welcome: 'Welcome',
    welcomeBack: 'Welcome back',
    createAccount: 'Create Account',
    sendResetLink: 'Send Reset Link',
    resetLinkSent: 'A reset link has been sent to your email',
    settings: 'Settings',
    save: 'Save',
    cancel: 'Cancel',
    updateProfile: 'Update Profile',
    language: 'Language',
    spanish: 'Spanish',
    english: 'English',
    heroTitle: 'Building the Future of Dominican Republic',
    heroSubtitle: 'Experts in residential and commercial construction with over 20 years of experience',
    getStarted: 'Get Started',
    ourServices: 'Our Services',
    residentialConstruction: 'Residential Construction',
    commercialConstruction: 'Commercial Construction',
    renovation: 'Renovation',
    consulting: 'Consulting',
    aboutTitle: 'About Our Company',
    aboutDescription: 'We are a leading construction company in the Dominican Republic, dedicated to creating exceptional spaces that enhance our clients\' lives.',
    calculatorTitle: 'Construction Calculator',
    calculatorDescription: 'Calculate the estimated cost of your construction project',
    area: 'Area (m²)',
    projectType: 'Project Type',
    residential: 'Residential',
    commercial: 'Commercial',
    calculate: 'Calculate',
    estimatedCost: 'Estimated Cost',
    contactTitle: 'Contact Us',
    contactDescription: 'We are here to answer your questions and help with your project',
    address: 'Address',
    addressValue: 'Santo Domingo, Dominican Republic',
    phoneValue: '+1 (809) 555-0123',
    emailValue: 'info@construccion.do',
    materialsTitle: 'Construction Materials',
    materialsDescription: 'We work with the best materials on the market',
    concrete: 'Concrete',
    steel: 'Steel',
    wood: 'Wood',
    ceramics: 'Ceramics',
    paint: 'Paint',
    electrical: 'Electrical',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { profile, updateProfile } = useAuth();
  const [language, setLanguageState] = useState<Language>('es');

  useEffect(() => {
    if (profile?.preferred_language) {
      setLanguageState(profile.preferred_language as Language);
    }
  }, [profile]);

  const setLanguage = async (lang: Language) => {
    setLanguageState(lang);
    if (profile) {
      await updateProfile({ preferred_language: lang });
    }
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['es']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
