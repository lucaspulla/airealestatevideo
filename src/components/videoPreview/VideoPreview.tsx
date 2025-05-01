import React, { useState, useEffect } from 'react';
import { ArrowLeft, Loader2, FilmIcon } from 'lucide-react';
import useProjectStore from '../../store/ProjectStore';
import { getMockVideoPreview, renderVideo, VideoRenderParams } from '../../services/videoService';
import { getTemplateById } from '../../data/templates';

const VideoPreview: React.FC = () => {
  const { 
    currentProject, 
    prevStep, 
    nextStep,
    setVideoUrl
  } = useProjectStore();
  
  const [isRendering, setIsRendering] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const template = getTemplateById(currentProject.templateId);
  const selectedText = currentProject.marketingTexts?.[currentProject.selectedTextIndex || 0] || '';
  
  useEffect(() => {
    // Set up the preview video based on the selected template
    if (template) {
      setPreviewUrl(getMockVideoPreview(template.id));
    }
  }, [template]);
  
  const handleRenderVideo = async () => {
    setIsRendering(true);
    setError(null);
    
    try {
      // Get the URLs for all uploaded images
      const imageUrls = currentProject.images.map(img => img.url);
      
      const params: VideoRenderParams = {
        imageUrls,
        templateId: currentProject.templateId,
        marketingText: selectedText,
        title: currentProject.title
      };
      
      const videoUrl = await renderVideo(params);
      setVideoUrl(videoUrl);
      nextStep();
    } catch (err) {
      console.error('Error rendering video:', err);
      setError('Ocorreu um erro ao renderizar o vídeo. Por favor, tente novamente.');
    } finally {
      setIsRendering(false);
    }
  };
  
  return (
    <div className="step-container">
      <h2 className="section-title">4. Preview do Vídeo</h2>
      <p className="text-gray-600 mb-4">
        Veja como ficará seu vídeo com as imagens, template e texto selecionados.
        Quando estiver satisfeito, clique em "Renderizar Vídeo" para gerar a versão final.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="card">
            <div className="aspect-video bg-gray-900 relative overflow-hidden">
              {previewUrl ? (
                <video
                  src={previewUrl}
                  controls
                  className="w-full h-full object-contain"
                  playsInline
                  poster={template?.thumbnailUrl}
                ></video>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <FilmIcon size={48} className="text-gray-500" />
                </div>
              )}
            </div>
            
            <div className="p-4">
              <h3 className="font-medium">{template?.name || 'Template'}</h3>
              
              <div className="mt-4 space-y-2">
                <div>
                  <h4 className="text-sm font-medium text-gray-700">Imagens</h4>
                  <div className="flex mt-2 space-x-2">
                    {currentProject.images.map((image, index) => (
                      <div key={image.id} className="w-16 h-16 rounded overflow-hidden border border-gray-200">
                        <img 
                          src={image.url} 
                          alt={`Imagem ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="pt-2">
                  <h4 className="text-sm font-medium text-gray-700">Texto</h4>
                  <p className="text-sm text-gray-600 mt-1 border-l-4 border-primary-200 pl-3 py-1 bg-gray-50">
                    {selectedText || 'Nenhum texto selecionado'}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {error && (
            <div className="mt-4 p-3 bg-error-50 text-error-700 rounded-md">
              {error}
            </div>
          )}
        </div>
        
        <div>
          <div className="card p-4">
            <h3 className="font-medium mb-4">Detalhes do Projeto</h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-700">Título do Projeto</h4>
                <p className="text-sm text-gray-600">{currentProject.title}</p>
              </div>
              
              {currentProject.propertyType && (
                <div>
                  <h4 className="text-sm font-medium text-gray-700">Tipo de Imóvel</h4>
                  <p className="text-sm text-gray-600">{currentProject.propertyType}</p>
                </div>
              )}
              
              {currentProject.location && (
                <div>
                  <h4 className="text-sm font-medium text-gray-700">Localização</h4>
                  <p className="text-sm text-gray-600">{currentProject.location}</p>
                </div>
              )}
              
              <div>
                <h4 className="text-sm font-medium text-gray-700">Template</h4>
                <p className="text-sm text-gray-600">{template?.name || 'Não selecionado'}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-700">Imagens</h4>
                <p className="text-sm text-gray-600">{currentProject.images.length} imagens</p>
              </div>
            </div>
            
            <div className="mt-6">
              <button
                onClick={handleRenderVideo}
                className="btn-primary w-full flex items-center justify-center"
                disabled={isRendering}
              >
                {isRendering ? (
                  <>
                    <Loader2 size={18} className="mr-2 animate-spin" />
                    Renderizando vídeo...
                  </>
                ) : (
                  'Renderizar Vídeo'
                )}
              </button>
              
              <p className="text-xs text-gray-500 mt-2 text-center">
                Este processo pode levar alguns minutos, dependendo da complexidade do vídeo.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-between mt-8">
        <button
          onClick={prevStep}
          className="btn-secondary flex items-center"
          disabled={isRendering}
        >
          <ArrowLeft size={16} className="mr-1" />
          Voltar
        </button>
      </div>
    </div>
  );
};

export default VideoPreview;