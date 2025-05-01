import React from 'react';
import { templates } from '../../data/templates';
import { ArrowLeft, PlayCircle, Check } from 'lucide-react';
import clsx from 'clsx';
import useProjectStore from '../../store/ProjectStore';

const TemplateSelector: React.FC = () => {
  const { currentProject, setTemplateId, prevStep, nextStep } = useProjectStore();
  const { templateId } = currentProject;
  
  const [previewTemplate, setPreviewTemplate] = React.useState<string | null>(null);

  const handleSelectTemplate = (id: string) => {
    setTemplateId(id);
    setPreviewTemplate(null); // Close preview when selecting
  };
  
  const handleNext = () => {
    if (templateId) {
      nextStep();
    }
  };
  
  return (
    <div className="step-container">
      <h2 className="section-title">2. Selecione um template</h2>
      <p className="text-gray-600 mb-4">
        Escolha um template que melhor se adapte ao seu estilo e objetivo de marketing.
      </p>
      
      {/* Template preview modal */}
      {previewTemplate && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg overflow-hidden max-w-3xl w-full">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="font-medium">
                {templates.find(t => t.id === previewTemplate)?.name}
              </h3>
              <button
                onClick={() => setPreviewTemplate(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>
            <div className="aspect-video bg-black">
              <video
                src={templates.find(t => t.id === previewTemplate)?.previewUrl}
                controls
                autoPlay
                className="w-full h-full object-contain"
              ></video>
            </div>
            <div className="p-4 flex justify-between">
              <button
                onClick={() => setPreviewTemplate(null)}
                className="btn-secondary"
              >
                Fechar
              </button>
              <button
                onClick={() => {
                  handleSelectTemplate(previewTemplate);
                  setPreviewTemplate(null);
                }}
                className="btn-primary"
              >
                Selecionar Este Template
              </button>
            </div>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {templates.map((template) => (
          <div 
            key={template.id}
            className={clsx(
              "card transition-all duration-300 group",
              templateId === template.id ? "ring-2 ring-primary-500" : "hover:shadow-lg"
            )}
          >
            <div className="aspect-video bg-gray-100 relative overflow-hidden">
              <img 
                src={template.thumbnailUrl} 
                alt={template.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => setPreviewTemplate(template.id)}
                  className="btn-secondary flex items-center space-x-1"
                >
                  <PlayCircle size={16} />
                  <span>Ver Preview</span>
                </button>
              </div>
              
              {templateId === template.id && (
                <div className="absolute top-2 right-2 bg-success-500 text-white rounded-full p-1">
                  <Check size={16} />
                </div>
              )}
            </div>
            
            <div className="p-4">
              <h3 className="font-medium text-gray-900">{template.name}</h3>
              <p className="text-sm text-gray-600 mt-1">{template.description}</p>
              
              <div className="flex flex-wrap mt-3 gap-2">
                {template.tags.map((tag) => (
                  <span 
                    key={tag} 
                    className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              <button
                onClick={() => handleSelectTemplate(template.id)}
                className={clsx(
                  "w-full mt-4",
                  templateId === template.id ? "btn-success" : "btn-primary"
                )}
              >
                {templateId === template.id ? 'Selecionado' : 'Selecionar'}
              </button>
            </div>
          </div>
        ))}
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
          disabled={!templateId}
        >
          Avançar
        </button>
      </div>
    </div>
  );
};

import { X } from 'lucide-react';

export default TemplateSelector;