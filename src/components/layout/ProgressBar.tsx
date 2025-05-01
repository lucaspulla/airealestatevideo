import React from 'react';
import clsx from 'clsx';
import { Check, Image, Layout, Type, FileVideo, Download } from 'lucide-react';
import useProjectStore from '../../store/ProjectStore';
import { CreationStep } from '../../types';

interface StepProps {
  step: CreationStep;
  label: string;
  icon: React.ReactNode;
  isActive: boolean;
  isCompleted: boolean;
  onClick: () => void;
  isClickable: boolean;
}

const Step: React.FC<StepProps> = ({ 
  label, 
  icon, 
  isActive, 
  isCompleted, 
  onClick,
  isClickable
}) => {
  return (
    <div 
      className={clsx(
        "flex-1 relative",
        isClickable && "cursor-pointer"
      )}
      onClick={isClickable ? onClick : undefined}
    >
      <div className="flex items-center justify-center">
        <div 
          className={clsx(
            "w-10 h-10 rounded-full flex items-center justify-center z-10 transition-all duration-300",
            isActive ? "bg-primary-600 text-white" : 
            isCompleted ? "bg-success-500 text-white" : 
            "bg-gray-200 text-gray-500"
          )}
        >
          {isCompleted ? <Check size={20} /> : icon}
        </div>
      </div>
      <div className="mt-2 text-center">
        <span className={clsx(
          "text-sm transition-colors",
          isActive ? "text-primary-700 font-medium" : 
          isCompleted ? "text-success-700" : 
          "text-gray-500"
        )}>
          {label}
        </span>
      </div>
    </div>
  );
};

const ProgressBar: React.FC = () => {
  const { currentStep, setCurrentStep, currentProject } = useProjectStore();
  
  const steps: { step: CreationStep; label: string; icon: React.ReactNode }[] = [
    { step: 'upload-images', label: 'Imagens', icon: <Image size={18} /> },
    { step: 'select-template', label: 'Template', icon: <Layout size={18} /> },
    { step: 'generate-text', label: 'Texto', icon: <Type size={18} /> },
    { step: 'preview-video', label: 'Preview', icon: <FileVideo size={18} /> },
    { step: 'download-video', label: 'Download', icon: <Download size={18} /> }
  ];
  
  const currentStepIndex = steps.findIndex(s => s.step === currentStep);
  
  // Determine if a step is clickable based on the state of the project
  const isStepClickable = (step: CreationStep, index: number): boolean => {
    if (index <= currentStepIndex) return true;
    
    switch (step) {
      case 'select-template':
        return currentProject.images.length > 0;
      case 'generate-text':
        return currentProject.images.length > 0 && !!currentProject.templateId;
      case 'preview-video':
        return currentProject.images.length > 0 && 
               !!currentProject.templateId && 
               !!currentProject.marketingTexts?.length;
      case 'download-video':
        return !!currentProject.videoUrl;
      default:
        return false;
    }
  };
  
  return (
    <div className="w-full py-6 px-4 bg-white border-b border-gray-200">
      <div className="container mx-auto max-w-4xl">
        <div className="flex justify-between">
          {steps.map((step, index) => {
            // Add connecting lines between steps
            let connector = null;
            if (index < steps.length - 1) {
              connector = (
                <div className={clsx(
                  "absolute top-5 left-1/2 w-full h-0.5 -translate-y-1/2",
                  index < currentStepIndex ? "bg-success-500" : "bg-gray-200"
                )} />
              );
            }
            
            const isStepActive = currentStep === step.step;
            const isStepCompleted = index < currentStepIndex;
            const clickable = isStepClickable(step.step, index);
            
            return (
              <React.Fragment key={step.step}>
                <div className="relative flex-1">
                  {connector}
                  <Step
                    step={step.step}
                    label={step.label}
                    icon={step.icon}
                    isActive={isStepActive}
                    isCompleted={isStepCompleted}
                    onClick={() => setCurrentStep(step.step)}
                    isClickable={clickable}
                  />
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;