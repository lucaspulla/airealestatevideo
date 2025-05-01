import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, X, Image as ImageIcon, AlertCircle } from 'lucide-react';
import { UploadedImage } from '../../types';
import clsx from 'clsx';
import useProjectStore from '../../store/ProjectStore';

const MAX_FILES = 3;
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

const ImageUploader: React.FC = () => {
  const { currentProject, setImages, removeImage, nextStep } = useProjectStore();
  const [error, setError] = useState<string | null>(null);
  
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (currentProject.images.length + acceptedFiles.length > MAX_FILES) {
      setError(`Você pode enviar no máximo ${MAX_FILES} imagens.`);
      return;
    }

    // Filter files that exceed maximum size or have incorrect types
    const invalidFiles: { file: File; reason: string }[] = [];
    const validFiles = acceptedFiles.filter(file => {
      if (file.size > MAX_FILE_SIZE) {
        invalidFiles.push({ file, reason: 'tamanho' });
        return false;
      }
      
      if (!ACCEPTED_TYPES.includes(file.type)) {
        invalidFiles.push({ file, reason: 'tipo' });
        return false;
      }
      
      return true;
    });
    
    // Show error for invalid files
    if (invalidFiles.length > 0) {
      setError(`${invalidFiles.length} ${invalidFiles.length === 1 ? 'arquivo inválido' : 'arquivos inválidos'} (tamanho máximo: 5MB, formatos aceitos: JPG, PNG, WEBP)`);
    } else {
      setError(null);
    }
    
    const newImages: UploadedImage[] = validFiles.map(file => ({
      id: Math.random().toString(36).substring(2, 9),
      file,
      url: URL.createObjectURL(file),
    }));
    
    setImages([...currentProject.images, ...newImages]);
  }, [currentProject.images, setImages]);
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'image/webp': ['.webp'],
    },
    maxSize: MAX_FILE_SIZE,
    maxFiles: MAX_FILES,
  });
  
  const handleRemoveImage = (id: string) => {
    removeImage(id);
    setError(null);
  };
  
  const handleNext = () => {
    if (currentProject.images.length > 0) {
      nextStep();
    } else {
      setError('Por favor, envie pelo menos uma imagem para continuar.');
    }
  };
  
  return (
    <div className="step-container">
      <h2 className="section-title">1. Envie suas imagens</h2>
      <p className="text-gray-600 mb-4">
        Selecione até 3 imagens de alta qualidade para seu vídeo. Recomendamos imagens com resolução mínima de 1920x1080px.
      </p>
      
      <div
        {...getRootProps()}
        className={clsx(
          "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
          isDragActive 
            ? "border-primary-500 bg-primary-50" 
            : "border-gray-300 hover:border-primary-400 hover:bg-gray-50"
        )}
      >
        <input {...getInputProps()} />
        
        <UploadCloud size={48} className={clsx(
          "mx-auto mb-4",
          isDragActive ? "text-primary-500" : "text-gray-400"
        )} />
        
        <p className="text-lg font-medium">
          {isDragActive ? 'Solte as imagens aqui' : 'Arraste e solte imagens ou clique para selecionar'}
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Formatos suportados: JPG, PNG, WEBP (máx. 5MB por arquivo)
        </p>
      </div>
      
      {error && (
        <div className="mt-4 p-3 bg-error-50 text-error-700 rounded-md flex items-start">
          <AlertCircle size={20} className="mr-2 flex-shrink-0 mt-0.5" />
          <p>{error}</p>
        </div>
      )}
      
      {currentProject.images.length > 0 && (
        <div className="mt-6">
          <h3 className="text-sm font-medium text-gray-700 mb-3">
            Imagens enviadas ({currentProject.images.length}/{MAX_FILES})
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {currentProject.images.map((image) => (
              <div key={image.id} className="relative group card">
                <div className="aspect-video bg-gray-100 overflow-hidden">
                  <img 
                    src={image.url} 
                    alt={`Imagem ${image.id}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <button
                  onClick={() => handleRemoveImage(image.id)}
                  className="absolute top-2 right-2 bg-white text-gray-700 rounded-full p-1 shadow-md hover:bg-error-500 hover:text-white transition-colors"
                >
                  <X size={16} />
                </button>
                
                <div className="p-3 border-t border-gray-100">
                  <p className="text-sm text-gray-600 truncate">
                    {image.file.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {(image.file.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>
              </div>
            ))}
            
            {Array.from({ length: MAX_FILES - currentProject.images.length }).map((_, index) => (
              <div 
                key={`empty-${index}`}
                {...getRootProps()}
                className="aspect-video border-2 border-dashed border-gray-200 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-primary-400 hover:bg-gray-50 transition-colors"
              >
                <ImageIcon size={24} className="text-gray-400 mb-2" />
                <p className="text-sm text-gray-500">Adicionar imagem</p>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="flex justify-end mt-8">
        <button
          onClick={handleNext}
          className="btn-primary"
          disabled={currentProject.images.length === 0}
        >
          Avançar
        </button>
      </div>
    </div>
  );
};

export default ImageUploader;