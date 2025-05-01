import { create } from 'zustand';
import { Project, UploadedImage, CreationStep } from '../types';

interface ProjectState {
  currentProject: Project;
  currentStep: CreationStep;
  isLoading: boolean;
  
  // Actions
  setImages: (images: UploadedImage[]) => void;
  removeImage: (imageId: string) => void;
  setTemplateId: (templateId: string) => void;
  setMarketingTexts: (texts: string[]) => void;
  selectMarketingText: (index: number) => void;
  setProjectTitle: (title: string) => void;
  setVideoUrl: (url: string) => void;
  setPropertyInfo: (info: {
    propertyType?: string;
    location?: string;
    keyFeatures?: string;
    targetAudience?: string;
    callToAction?: string;
  }) => void;
  setCurrentStep: (step: CreationStep) => void;
  nextStep: () => void;
  prevStep: () => void;
  resetProject: () => void;
  setLoading: (isLoading: boolean) => void;
}

// Initial empty project
const initialProject: Project = {
  title: 'Novo Projeto',
  images: [],
  templateId: '',
  marketingTexts: [],
  selectedTextIndex: 0,
};

const useProjectStore = create<ProjectState>((set) => ({
  currentProject: { ...initialProject },
  currentStep: 'upload-images',
  isLoading: false,
  
  setImages: (images) => set((state) => ({
    currentProject: { ...state.currentProject, images }
  })),
  
  removeImage: (imageId) => set((state) => ({
    currentProject: {
      ...state.currentProject,
      images: state.currentProject.images.filter(img => img.id !== imageId)
    }
  })),
  
  setTemplateId: (templateId) => set((state) => ({
    currentProject: { ...state.currentProject, templateId }
  })),
  
  setMarketingTexts: (texts) => set((state) => ({
    currentProject: { ...state.currentProject, marketingTexts: texts }
  })),
  
  selectMarketingText: (index) => set((state) => ({
    currentProject: { ...state.currentProject, selectedTextIndex: index }
  })),
  
  setProjectTitle: (title) => set((state) => ({
    currentProject: { ...state.currentProject, title }
  })),
  
  setVideoUrl: (videoUrl) => set((state) => ({
    currentProject: { ...state.currentProject, videoUrl }
  })),
  
  setPropertyInfo: (info) => set((state) => ({
    currentProject: { ...state.currentProject, ...info }
  })),
  
  setCurrentStep: (currentStep) => set({ currentStep }),
  
  nextStep: () => set((state) => {
    const steps: CreationStep[] = [
      'upload-images',
      'select-template',
      'generate-text',
      'preview-video',
      'download-video'
    ];
    
    const currentIndex = steps.indexOf(state.currentStep);
    if (currentIndex < steps.length - 1) {
      return { currentStep: steps[currentIndex + 1] };
    }
    return {};
  }),
  
  prevStep: () => set((state) => {
    const steps: CreationStep[] = [
      'upload-images',
      'select-template',
      'generate-text',
      'preview-video',
      'download-video'
    ];
    
    const currentIndex = steps.indexOf(state.currentStep);
    if (currentIndex > 0) {
      return { currentStep: steps[currentIndex - 1] };
    }
    return {};
  }),
  
  resetProject: () => set({
    currentProject: { ...initialProject },
    currentStep: 'upload-images'
  }),
  
  setLoading: (isLoading) => set({ isLoading }),
}));

export default useProjectStore;