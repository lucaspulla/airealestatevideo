import React, { useState } from 'react';
import { ArrowLeft, Loader2, RefreshCw, Check } from 'lucide-react';
import useProjectStore from '../../store/ProjectStore';
import { generateMarketingTexts, TextGenerationParams } from '../../services/openai';
import clsx from 'clsx';

const TextGenerator: React.FC = () => {
  const { 
    currentProject, 
    setMarketingTexts, 
    selectMarketingText, 
    setPropertyInfo,
    prevStep, 
    nextStep,
    setLoading,
  } = useProjectStore();
  
  const [formData, setFormData] = useState<TextGenerationParams>({
    propertyType: currentProject.propertyType || '',
    location: currentProject.location || '',
    keyFeatures: currentProject.keyFeatures || '',
    targetAudience: currentProject.targetAudience || '',
    callToAction: currentProject.callToAction || '',
  });
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setPropertyInfo({ [name]: value });
  };
  
  const handleGenerateText = async () => {
    if (!formData.propertyType) {
      setError('Por favor, informe o tipo de imóvel/empreendimento');
      return;
    }
    
    setIsGenerating(true);
    setError(null);
    
    try {
      const texts = await generateMarketingTexts(formData);
      setMarketingTexts(texts);
      selectMarketingText(0); // Select the first text by default
    } catch (err) {
      setError('Erro ao gerar textos. Por favor, tente novamente.');
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };
  
  const handleNext = () => {
    if (currentProject.marketingTexts?.length && currentProject.selectedTextIndex !== undefined) {
      nextStep();
    } else {
      setError('Por favor, gere e selecione um texto para continuar.');
    }
  };
  
  return (
    <div className="step-container">
      <h2 className="section-title">3. Gere textos com IA</h2>
      <p className="text-gray-600 mb-4">
        Forneça informações sobre seu imóvel ou empreendimento para gerar 
        textos persuasivos para seu vídeo.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <form className="space-y-4">
            <div>
              <label htmlFor="propertyType" className="label">
                Tipo de imóvel/empreendimento *
              </label>
              <input
                type="text"
                id="propertyType"
                name="propertyType"
                className="input"
                placeholder="Ex: Apartamento, Casa, Loja comercial"
                value={formData.propertyType}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div>
              <label htmlFor="location" className="label">
                Localização
              </label>
              <input
                type="text"
                id="location"
                name="location"
                className="input"
                placeholder="Ex: Centro de São Paulo, Jardins, Zona Sul"
                value={formData.location}
                onChange={handleInputChange}
              />
            </div>
            
            <div>
              <label htmlFor="keyFeatures" className="label">
                Características principais
              </label>
              <textarea
                id="keyFeatures"
                name="keyFeatures"
                className="textarea min-h-[80px]"
                placeholder="Ex: 3 quartos, 2 banheiros, piscina, academia, próximo ao metrô"
                value={formData.keyFeatures}
                onChange={handleInputChange}
              />
            </div>
            
            <div>
              <label htmlFor="targetAudience" className="label">
                Público-alvo
              </label>
              <input
                type="text"
                id="targetAudience"
                name="targetAudience"
                className="input"
                placeholder="Ex: Famílias, Empresários, Investidores"
                value={formData.targetAudience}
                onChange={handleInputChange}
              />
            </div>
            
            <div>
              <label htmlFor="callToAction" className="label">
                Chamada para ação
              </label>
              <input
                type="text"
                id="callToAction"
                name="callToAction"
                className="input"
                placeholder="Ex: Agende uma visita hoje mesmo"
                value={formData.callToAction}
                onChange={handleInputChange}
              />
            </div>
            
            <button
              type="button"
              onClick={handleGenerateText}
              className="btn-primary w-full flex items-center justify-center"
              disabled={isGenerating}
            >
              {isGenerating ? (
                <>
                  <Loader2 size={18} className="mr-2 animate-spin" />
                  Gerando textos...
                </>
              ) : (
                <>
                  <RefreshCw size={18} className="mr-2" />
                  {currentProject.marketingTexts?.length ? 'Gerar novos textos' : 'Gerar textos'}
                </>
              )}
            </button>
            
            {error && (
              <div className="p-3 bg-error-50 text-error-700 rounded-md">
                {error}
              </div>
            )}
          </form>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">
            Textos gerados
          </h3>
          
          {currentProject.marketingTexts?.length ? (
            <div className="space-y-4">
              {currentProject.marketingTexts.map((text, index) => (
                <div 
                  key={index}
                  className={clsx(
                    "p-4 rounded-lg border cursor-pointer transition-all",
                    currentProject.selectedTextIndex === index 
                      ? "border-primary-500 bg-primary-50" 
                      : "border-gray-200 hover:border-primary-200"
                  )}
                  onClick={() => selectMarketingText(index)}
                >
                  <div className="flex items-start">
                    <div className="flex-grow">
                      <p className="text-sm text-gray-800">{text}</p>
                    </div>
                    {currentProject.selectedTextIndex === index && (
                      <div className="ml-3 text-primary-600">
                        <Check size={20} />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="h-full flex items-center justify-center p-8 border-2 border-dashed border-gray-200 rounded-lg bg-gray-50">
              <div className="text-center">
                <p className="text-gray-500">
                  {isGenerating 
                    ? 'Gerando textos para seu vídeo...' 
                    : 'Preencha o formulário e clique em "Gerar textos" para ver opções de texto para seu vídeo.'}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="flex justify-between mt-8">
        <button
          onClick={prevStep}
          className="btn-secondary flex items-center"
        >
          <ArrowLeft size={16} className="mr-1" />
          Voltar
        </button>
        
        <button
          onClick={handleNext}
          className="btn-primary"
          disabled={!currentProject.marketingTexts?.length || currentProject.selectedTextIndex === undefined}
        >
          Avançar
        </button>
      </div>
    </div>
  );
};

export default TextGenerator;