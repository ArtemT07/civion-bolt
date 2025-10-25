import React from 'react';
import { Building2, Hammer, Wrench, Lightbulb, ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

type HomePageProps = {
  onNavigate: (page: string) => void;
};

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const { t } = useLanguage();

  const services = [
    {
      icon: Building2,
      title: t('residentialConstruction'),
    },
    {
      icon: Hammer,
      title: t('commercialConstruction'),
    },
    {
      icon: Wrench,
      title: t('renovation'),
    },
    {
      icon: Lightbulb,
      title: t('consulting'),
    },
  ];

  return (
    <div className="min-h-screen">
      <section className="relative bg-gradient-to-br from-gray-50 via-white to-gray-50 py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-block mb-6">
              <div className="bg-[#177BFF] p-1 rounded-2xl">
                <div className="bg-white px-6 py-2 rounded-xl">
                  <p className="text-sm font-bold text-[#177BFF]">
                    República Dominicana
                  </p>
                </div>
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-[#1E293B] mb-6 leading-tight">
              {t('heroTitle')}
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 mb-10 leading-relaxed">
              {t('heroSubtitle')}
            </p>

            <button
              onClick={() => onNavigate('calculator')}
              className="group bg-[#177BFF] text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-600 transition-all transform hover:scale-105 shadow-2xl inline-flex items-center space-x-2"
            >
              <span>{t('getStarted')}</span>
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={24} />
            </button>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      <section className="py-20 bg-[#F7F8FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#1E293B] mb-4">
              {t('ourServices')}
            </h2>
            <div className="w-24 h-1 bg-[#177BFF] mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 border border-gray-100"
                >
                  <div className="w-16 h-16 bg-[#177BFF] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                    <Icon className="text-white" size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-[#1E293B] mb-3">
                    {service.title}
                  </h3>
                  <div className="w-12 h-1 bg-[#177BFF] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-[#1E293B] mb-6">
                {t('aboutTitle')}
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                {t('aboutDescription')}
              </p>
              <button
                onClick={() => onNavigate('about')}
                className="bg-[#177BFF] text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-all transform hover:scale-105 shadow-lg inline-flex items-center space-x-2"
              >
                <span>{t('about')}</span>
                <ArrowRight size={20} />
              </button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-[#177BFF] rounded-3xl transform rotate-3"></div>
              <div className="relative bg-white p-8 rounded-3xl shadow-2xl">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center p-6 bg-[#F7F8FA] rounded-xl">
                    <p className="text-4xl font-bold text-[#177BFF] mb-2">20+</p>
                    <p className="text-sm text-gray-600 font-medium">Años</p>
                  </div>
                  <div className="text-center p-6 bg-[#F7F8FA] rounded-xl">
                    <p className="text-4xl font-bold text-[#177BFF] mb-2">500+</p>
                    <p className="text-sm text-gray-600 font-medium">Proyectos</p>
                  </div>
                  <div className="text-center p-6 bg-[#F7F8FA] rounded-xl">
                    <p className="text-4xl font-bold text-[#177BFF] mb-2">100%</p>
                    <p className="text-sm text-gray-600 font-medium">Calidad</p>
                  </div>
                  <div className="text-center p-6 bg-[#F7F8FA] rounded-xl">
                    <p className="text-4xl font-bold text-[#177BFF] mb-2">24/7</p>
                    <p className="text-sm text-gray-600 font-medium">Soporte</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
