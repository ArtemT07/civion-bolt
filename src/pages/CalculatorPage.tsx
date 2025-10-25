import React, { useState } from 'react';
import { Calculator, DollarSign } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const CalculatorPage: React.FC = () => {
  const { t, language } = useLanguage();
  const [area, setArea] = useState<string>('');
  const [projectType, setProjectType] = useState<'residential' | 'commercial'>('residential');
  const [estimatedCost, setEstimatedCost] = useState<number | null>(null);

  const calculateCost = () => {
    const areaNum = parseFloat(area);
    if (isNaN(areaNum) || areaNum <= 0) return;

    const costPerSquareMeter = projectType === 'residential' ? 1200 : 1800;
    const total = areaNum * costPerSquareMeter;
    setEstimatedCost(total);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-DO', {
      style: 'currency',
      currency: 'DOP',
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-[#F7F8FA] py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-[#177BFF] rounded-2xl mb-6 shadow-lg">
            <Calculator className="text-white" size={40} />
          </div>
          <h1 className="text-5xl font-bold text-[#1E293B] mb-4">
            {t('calculatorTitle')}
          </h1>
          <div className="w-24 h-1 bg-[#177BFF] mx-auto rounded-full mb-6"></div>
          <p className="text-xl text-gray-600">
            {t('calculatorDescription')}
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100">
          <div className="space-y-8">
            <div>
              <label className="block text-lg font-semibold text-[#1E293B] mb-3">
                {t('area')}
              </label>
              <input
                type="number"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                placeholder="100"
                className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#177BFF] focus:border-transparent transition-all text-lg"
                min="0"
                step="0.01"
              />
            </div>

            <div>
              <label className="block text-lg font-semibold text-[#1E293B] mb-3">
                {t('projectType')}
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={() => setProjectType('residential')}
                  className={`p-6 rounded-xl border-2 transition-all transform hover:scale-105 ${
                    projectType === 'residential'
                      ? 'border-[#177BFF] bg-blue-50 shadow-lg'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <p className={`text-xl font-bold mb-2 ${
                    projectType === 'residential' ? 'text-[#177BFF]' : 'text-[#1E293B]'
                  }`}>
                    {t('residential')}
                  </p>
                  <p className="text-sm text-gray-600">
                    DOP 1,200/m²
                  </p>
                </button>

                <button
                  onClick={() => setProjectType('commercial')}
                  className={`p-6 rounded-xl border-2 transition-all transform hover:scale-105 ${
                    projectType === 'commercial'
                      ? 'border-[#177BFF] bg-blue-50 shadow-lg'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <p className={`text-xl font-bold mb-2 ${
                    projectType === 'commercial' ? 'text-[#177BFF]' : 'text-[#1E293B]'
                  }`}>
                    {t('commercial')}
                  </p>
                  <p className="text-sm text-gray-600">
                    DOP 1,800/m²
                  </p>
                </button>
              </div>
            </div>

            <button
              onClick={calculateCost}
              className="w-full bg-[#177BFF] text-white py-5 rounded-xl font-bold text-lg hover:bg-blue-600 transition-all transform hover:scale-105 shadow-xl flex items-center justify-center space-x-2"
            >
              <Calculator size={24} />
              <span>{t('calculate')}</span>
            </button>

            {estimatedCost !== null && (
              <div className="mt-8 p-8 bg-blue-50 rounded-2xl border-2 border-gray-100 animate-fade-in">
                <div className="flex items-center justify-center mb-4">
                  <DollarSign className="text-[#177BFF]" size={32} />
                </div>
                <p className="text-center text-gray-600 font-semibold mb-2">
                  {t('estimatedCost')}
                </p>
                <p className="text-center text-5xl font-bold text-[#177BFF]">
                  {formatCurrency(estimatedCost)}
                </p>
                <p className="text-center text-sm text-gray-500 mt-4">
                  {language === 'es'
                    ? '* Este es un estimado aproximado. El costo final puede variar según especificaciones y materiales.'
                    : '* This is an approximate estimate. Final cost may vary based on specifications and materials.'}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 text-center">
            <p className="text-3xl font-bold text-[#177BFF] mb-2">DOP 1,200</p>
            <p className="text-sm text-gray-600">
              {language === 'es' ? 'Por m² Residencial' : 'Per m² Residential'}
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 text-center">
            <p className="text-3xl font-bold text-[#177BFF] mb-2">DOP 1,800</p>
            <p className="text-sm text-gray-600">
              {language === 'es' ? 'Por m² Comercial' : 'Per m² Commercial'}
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 text-center">
            <p className="text-3xl font-bold text-[#177BFF] mb-2">24/7</p>
            <p className="text-sm text-gray-600">
              {language === 'es' ? 'Soporte al Cliente' : 'Customer Support'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
