import React from 'react';
import { Download, Share2, Loader2, Home, Repeat } from 'lucide-react';
import useProjectStore from '../../store/ProjectStore';

const VideoDownload: React.FC = () => {
  const { currentProject, resetProject } = useProjectStore();
  const [isDownloading, setIsDownloading] = React.useState(false);
  
  const videoUrl = currentProject.videoUrl;
  
  const handleDownload = () => {
    if (!videoUrl) return;
    
    setIsDownloading(true);
    
    // In a real implementation, this would trigger the download
    // For demo purposes, we're simulating the download process
    setTimeout(() => {
      // Create an anchor element to download the video
      const a = document.createElement('a');
      a.href = videoUrl;
      a.download = `${currentProject.title.replace(/\s+/g, '-').toLowerCase()}.mp4`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      
      setIsDownloading(false);
    }, 1500);
  };
  
  const handleNewProject = () => {
    resetProject();
  };
  
  return (
    <div className="step-container">
      <h2 className="section-title">5. Download do Vídeo</h2>
      <p className="text-gray-600 mb-6">
        Seu vídeo foi renderizado com sucesso! Você pode baixá-lo ou compartilhá-lo diretamente.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden shadow-lg">
            {videoUrl && (
              <video
                src={videoUrl}
                controls
                autoPlay
                className="w-full h-full object-contain"
                playsInline
              ></video>
            )}
          </div>
          
          <div className="mt-6 flex space-x-4">
            <button
              onClick={handleDownload}
              className="btn-primary flex-1 flex items-center justify-center"
              disabled={isDownloading || !videoUrl}
            >
              {isDownloading ? (
                <>
                  <Loader2 size={18} className="mr-2 animate-spin" />
                  Baixando...
                </>
              ) : (
                <>
                  <Download size={18} className="mr-2" />
                  Baixar Vídeo
                </>
              )}
            </button>
            
            <button
              className="btn-secondary flex items-center justify-center px-3"
              disabled={!videoUrl}
            >
              <Share2 size={18} />
            </button>
          </div>
        </div>
        
        <div className="card p-6">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Parabéns!</h3>
          
          <p className="text-gray-600 mb-4">
            Seu vídeo foi criado com sucesso. Você pode baixá-lo e utilizá-lo em suas campanhas de marketing.
          </p>
          
          <div className="bg-primary-50 border border-primary-100 rounded-lg p-4 mb-6">
            <h4 className="text-sm font-medium text-primary-800 mb-2">Detalhes do Vídeo</h4>
            
            <ul className="space-y-2 text-sm text-primary-700">
              <li><strong>Título:</strong> {currentProject.title}</li>
              <li><strong>Tipo:</strong> {currentProject.propertyType || 'Não especificado'}</li>
              <li><strong>Template:</strong> {currentProject.templateId}</li>
              <li><strong>Total de Imagens:</strong> {currentProject.images.length}</li>
              <li><strong>Duração estimada:</strong> 30 segundos</li>
            </ul>
          </div>
          
          <div className="flex flex-col space-y-3">
            <button
              onClick={handleNewProject}
              className="btn-accent flex items-center justify-center"
            >
              <Repeat size={18} className="mr-2" />
              Criar Novo Vídeo
            </button>
            
            <button
              className="btn-secondary flex items-center justify-center"
            >
              <Home size={18} className="mr-2" />
              Voltar para o Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoDownload;