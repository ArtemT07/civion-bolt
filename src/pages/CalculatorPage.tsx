import React, { useState, useEffect } from 'react';
import { Calculator, DollarSign, Save, Package, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

type Material = {
  id: string;
  name_es: string;
  name_en: string;
  category_id: string;
  final_price: number;
  unit: string;
  photo_url?: string;
};

type SelectedMaterial = {
  material_id: string;
  name: string;
  quantity: number;
  unit_price: number;
  total_price: number;
};

export const CalculatorPage: React.FC = () => {
  const { t, language } = useLanguage();
  const { user } = useAuth();
  const [area, setArea] = useState<string>('');
  const [projectType, setProjectType] = useState<'residential' | 'commercial'>('residential');
  const [projectName, setProjectName] = useState<string>('');
  const [baseCost, setBaseCost] = useState<number>(0);
  const [materials, setMaterials] = useState<Material[]>([]);
  const [selectedMaterials, setSelectedMaterials] = useState<SelectedMaterial[]>([]);
  const [showMaterialsModal, setShowMaterialsModal] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [calculated, setCalculated] = useState(false);

  useEffect(() => {
    loadMaterials();
  }, []);

  const loadMaterials = async () => {
    try {
      const { data, error } = await supabase
        .from('materials')
        .select('*')
        .eq('is_active', true);

      if (error) throw error;
      setMaterials(data || []);
    } catch (error) {
      console.error('Error loading materials:', error);
    }
  };

  const calculateCost = () => {
    const areaNum = parseFloat(area);
    if (isNaN(areaNum) || areaNum <= 0) return;

    const costPerSquareMeter = projectType === 'residential' ? 1200 : 1800;
    const total = areaNum * costPerSquareMeter;
    setBaseCost(total);
    setCalculated(true);
  };

  const addMaterial = (material: Material) => {
    const materialName = language === 'es' ? material.name_es : material.name_en;
    const existing = selectedMaterials.find(m => m.material_id === material.id);

    if (existing) {
      setSelectedMaterials(selectedMaterials.map(m =>
        m.material_id === material.id
          ? { ...m, quantity: m.quantity + 1, total_price: (m.quantity + 1) * m.unit_price }
          : m
      ));
    } else {
      setSelectedMaterials([
        ...selectedMaterials,
        {
          material_id: material.id,
          name: materialName,
          quantity: 1,
          unit_price: material.final_price,
          total_price: material.final_price,
        },
      ]);
    }
  };

  const removeMaterial = (materialId: string) => {
    setSelectedMaterials(selectedMaterials.filter(m => m.material_id !== materialId));
  };

  const updateMaterialQuantity = (materialId: string, quantity: number) => {
    if (quantity <= 0) {
      removeMaterial(materialId);
      return;
    }
    setSelectedMaterials(selectedMaterials.map(m =>
      m.material_id === materialId
        ? { ...m, quantity, total_price: quantity * m.unit_price }
        : m
    ));
  };

  const getMaterialsCost = () => {
    return selectedMaterials.reduce((sum, m) => sum + m.total_price, 0);
  };

  const getTotalCost = () => {
    return baseCost + getMaterialsCost();
  };

  const saveProject = async () => {
    if (!user || !projectName.trim()) {
      alert(t('pleaseEnterProjectName'));
      return;
    }

    try {
      const { error } = await supabase.from('projects').insert({
        user_id: user.id,
        name: projectName,
        area: parseFloat(area),
        project_type: projectType,
        base_cost: baseCost,
        materials_cost: getMaterialsCost(),
        total_cost: getTotalCost(),
        selected_materials: selectedMaterials,
      });

      if (error) throw error;

      // Track analytics
      await supabase.from('site_analytics').insert({
        event_type: 'project_created',
        user_id: user.id,
        metadata: { project_name: projectName, total_cost: getTotalCost() },
      });

      alert(t('projectSaved'));
      setShowSaveModal(false);
      setProjectName('');
    } catch (error) {
      console.error('Error saving project:', error);
      alert(t('errorSavingProject'));
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-DO', {
      style: 'currency',
      currency: 'DOP',
    }).format(amount);
  };

  return (
    <div className="min-h-screen relative py-16">
      <div className="absolute inset-0 -z-10">
        <img
          src="https://images.pexels.com/photos/3862630/pexels-photo-3862630.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="Calculator background"
          className="w-full h-full object-cover opacity-10"
        />
      </div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-red-600 to-blue-600 rounded-2xl mb-6 shadow-lg">
            <Calculator className="text-white" size={40} />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            {t('calculatorTitle')}
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-blue-600 mx-auto rounded-full mb-6"></div>
          <p className="text-xl text-gray-600">
            {t('calculatorDescription')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Calculator Form */}
          <div className="lg:col-span-2">
            <div className="bg-gray-50 rounded-3xl shadow-2xl p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('basicCalculation')}</h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-lg font-semibold text-gray-900 mb-3">
                    {t('area')}
                  </label>
                  <input
                    type="number"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    placeholder="100"
                    className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all text-lg"
                    min="0"
                    step="0.01"
                  />
                </div>

                <div>
                  <label className="block text-lg font-semibold text-gray-900 mb-3">
                    {t('projectType')}
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => setProjectType('residential')}
                      className={`p-6 rounded-xl border-2 transition-all transform hover:scale-105 ${
                        projectType === 'residential'
                          ? 'border-red-600 bg-gradient-to-br from-red-50 to-white shadow-lg'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <p className={`text-xl font-bold mb-2 ${
                        projectType === 'residential' ? 'text-red-600' : 'text-gray-900'
                      }`}>
                        {t('residential')}
                      </p>
                      <p className="text-sm text-gray-600">DOP 1,200/m²</p>
                    </button>

                    <button
                      onClick={() => setProjectType('commercial')}
                      className={`p-6 rounded-xl border-2 transition-all transform hover:scale-105 ${
                        projectType === 'commercial'
                          ? 'border-blue-600 bg-gradient-to-br from-blue-50 to-white shadow-lg'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <p className={`text-xl font-bold mb-2 ${
                        projectType === 'commercial' ? 'text-blue-600' : 'text-gray-900'
                      }`}>
                        {t('commercial')}
                      </p>
                      <p className="text-sm text-gray-600">DOP 1,800/m²</p>
                    </button>
                  </div>
                </div>

                <button
                  onClick={calculateCost}
                  className="w-full bg-gradient-to-r from-red-600 to-blue-600 text-white py-5 rounded-xl font-bold text-lg hover:from-red-700 hover:to-blue-700 transition-all transform hover:scale-105 shadow-xl flex items-center justify-center space-x-2"
                >
                  <Calculator size={24} />
                  <span>{t('calculate')}</span>
                </button>
              </div>

              {calculated && (
                <div className="mt-8 space-y-4">
                  <button
                    onClick={() => setShowMaterialsModal(true)}
                    className="w-full bg-white border-2 border-gray-300 text-gray-900 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-all flex items-center justify-center space-x-2"
                  >
                    <Package size={20} />
                    <span>{t('selectMaterials')}</span>
                  </button>

                  {user && (
                    <button
                      onClick={() => setShowSaveModal(true)}
                      className="w-full bg-green-600 text-white py-4 rounded-xl font-semibold hover:bg-green-700 transition-all flex items-center justify-center space-x-2"
                    >
                      <Save size={20} />
                      <span>{t('saveProject')}</span>
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Cost Breakdown */}
          {calculated && (
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 sticky top-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6">{t('costBreakdown')}</h2>

                <div className="space-y-4">
                  <div className="pb-4 border-b border-gray-200">
                    <p className="text-sm text-gray-600 mb-1">{t('baseCost')}</p>
                    <p className="text-2xl font-bold text-gray-900">{formatCurrency(baseCost)}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {parseFloat(area)} m² × {formatCurrency(projectType === 'residential' ? 1200 : 1800)}
                    </p>
                  </div>

                  {selectedMaterials.length > 0 && (
                    <div className="pb-4 border-b border-gray-200">
                      <p className="text-sm text-gray-600 mb-3">{t('selectedMaterials')}</p>
                      <div className="space-y-2 max-h-48 overflow-y-auto">
                        {selectedMaterials.map((material) => (
                          <div key={material.material_id} className="flex items-center justify-between text-sm">
                            <div className="flex-1">
                              <p className="font-medium text-gray-900">{material.name}</p>
                              <p className="text-gray-500">
                                {material.quantity} × {formatCurrency(material.unit_price)}
                              </p>
                            </div>
                            <p className="font-semibold text-gray-900">{formatCurrency(material.total_price)}</p>
                          </div>
                        ))}
                      </div>
                      <div className="mt-3 pt-3 border-t border-gray-100">
                        <div className="flex justify-between">
                          <p className="text-sm font-semibold text-gray-700">{t('materialsCost')}</p>
                          <p className="text-sm font-bold text-gray-900">{formatCurrency(getMaterialsCost())}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="pt-2">
                    <div className="flex items-center justify-center mb-3">
                      <DollarSign className="text-red-600" size={28} />
                    </div>
                    <p className="text-sm text-gray-600 text-center mb-2">{t('totalCost')}</p>
                    <p className="text-4xl font-bold bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent text-center">
                      {formatCurrency(getTotalCost())}
                    </p>
                  </div>
                </div>

                <p className="text-xs text-gray-500 mt-6 text-center">
                  {language === 'es'
                    ? '* Estimado aproximado. El costo final puede variar.'
                    : '* Approximate estimate. Final cost may vary.'}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Materials Selection Modal */}
      {showMaterialsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">{t('selectMaterials')}</h3>
              <button
                onClick={() => setShowMaterialsModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {materials.map((material) => (
                <div
                  key={material.id}
                  className="border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => addMaterial(material)}
                >
                  {material.photo_url && (
                    <img
                      src={material.photo_url}
                      alt={language === 'es' ? material.name_es : material.name_en}
                      className="w-full h-32 object-cover rounded-lg mb-3"
                    />
                  )}
                  <h4 className="font-semibold text-gray-900 mb-2">
                    {language === 'es' ? material.name_es : material.name_en}
                  </h4>
                  <p className="text-sm text-gray-600 mb-2">{material.unit}</p>
                  <p className="text-lg font-bold text-blue-600">
                    {formatCurrency(material.final_price)}
                  </p>
                </div>
              ))}
            </div>

            {selectedMaterials.length > 0 && (
              <div className="mt-6 border-t border-gray-200 pt-6">
                <h4 className="font-semibold text-gray-900 mb-4">{t('selectedMaterials')}</h4>
                <div className="space-y-3">
                  {selectedMaterials.map((material) => (
                    <div key={material.material_id} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{material.name}</p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <input
                          type="number"
                          min="1"
                          value={material.quantity}
                          onChange={(e) => updateMaterialQuantity(material.material_id, parseInt(e.target.value) || 0)}
                          className="w-20 px-2 py-1 border border-gray-300 rounded text-center"
                        />
                        <p className="font-semibold text-gray-900 w-32 text-right">
                          {formatCurrency(material.total_price)}
                        </p>
                        <button
                          onClick={() => removeMaterial(material.material_id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <X size={20} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={() => setShowMaterialsModal(false)}
              className="mt-6 w-full bg-gradient-to-r from-red-600 to-blue-600 text-white py-3 rounded-xl font-semibold hover:from-red-700 hover:to-blue-700 transition-all"
            >
              {t('done')}
            </button>
          </div>
        </div>
      )}

      {/* Save Project Modal */}
      {showSaveModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">{t('saveProject')}</h3>
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder={t('projectName')}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4"
            />
            <div className="flex space-x-3">
              <button
                onClick={() => setShowSaveModal(false)}
                className="flex-1 bg-gray-100 text-gray-900 px-4 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-all"
              >
                {t('cancel')}
              </button>
              <button
                onClick={saveProject}
                className="flex-1 bg-gradient-to-r from-red-600 to-blue-600 text-white px-4 py-3 rounded-xl font-semibold hover:from-red-700 hover:to-blue-700 transition-all"
              >
                {t('save')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
