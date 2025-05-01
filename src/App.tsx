import React from 'react';
import { Toaster } from 'react-hot-toast';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ProgressBar from './components/layout/ProgressBar';
import ImageUploader from './components/upload/ImageUploader';
import TemplateSelector from './components/templates/TemplateSelector';
import TextGenerator from './components/textGeneration/TextGenerator';
import VideoPreview from './components/videoPreview/VideoPreview';
import VideoDownload from './components/download/VideoDownload';
import useProjectStore from './store/ProjectStore';
import { Loader2 } from 'lucide-react';

function App() {
  const { currentStep, isLoading } = useProjectStore();
  
  // Render the appropriate step component based on the current step
  const renderStepComponent = () => {
    switch (currentStep) {
      case 'upload-images':
        return <ImageUploader />;
      case 'select-template':
        return <TemplateSelector />;
      case 'generate-text':
        return <TextGenerator />;
      case 'preview-video':
        return <VideoPreview />;
      case 'download-video':
        return <VideoDownload />;
      default:
        return <ImageUploader />;
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Toaster position="top-center" />
      
      <Header />
      
      <ProgressBar />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <Loader2 size={40} className="mx-auto text-primary-600 animate-spin" />
                <p className="mt-4 text-gray-600">Carregando...</p>
              </div>
            </div>
          ) : (
            renderStepComponent()
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;