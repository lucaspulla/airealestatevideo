export interface Template {
  id: string;
  name: string;
  description: string;
  thumbnailUrl: string;
  tags: string[];
  previewUrl?: string;
  layout?: {
    type: string;
    sections: {
      type: string;
      style: string;
      textPosition?: string;
      animation?: string;
    }[];
  };
}

export interface UploadedImage {
  id: string;
  file: File;
  url: string;
  uploadProgress?: number;
  error?: string;
}

export interface Project {
  id?: string;
  title: string;
  images: UploadedImage[];
  templateId: string;
  marketingTexts?: string[];
  selectedTextIndex?: number;
  propertyType?: string;
  location?: string;
  keyFeatures?: string;
  targetAudience?: string;
  callToAction?: string;
  videoUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}

export type CreationStep = 
  | 'upload-images'
  | 'select-template'
  | 'generate-text'
  | 'preview-video'
  | 'download-video';