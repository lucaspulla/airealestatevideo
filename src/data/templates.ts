import { Template } from '../types';

export const templates: Template[] = [
  {
    id: 'template-1',
    name: 'Imobiliária Moderna',
    description: 'Template ideal para apartamentos e casas modernas, com transições elegantes e efeitos suaves.',
    thumbnailUrl: 'https://images.pexels.com/photos/1546166/pexels-photo-1546166.jpeg?auto=compress&cs=tinysrgb&w=600',
    tags: ['Imobiliária', 'Moderno', 'Elegante'],
    previewUrl: 'https://assets.mixkit.co/videos/preview/mixkit-real-estate-agent-showing-a-large-house-to-a-client-32747-large.mp4'
  },
  {
    id: 'template-2',
    name: 'Destaque Comercial',
    description: 'Perfeito para lojas, escritórios e espaços comerciais, com foco em mostrar detalhes de infraestrutura.',
    thumbnailUrl: 'https://images.pexels.com/photos/269077/pexels-photo-269077.jpeg?auto=compress&cs=tinysrgb&w=600',
    tags: ['Comercial', 'Negócios', 'Profissional'],
    previewUrl: 'https://assets.mixkit.co/videos/preview/mixkit-young-woman-looking-at-flats-with-a-real-estate-agent-32742-large.mp4'
  },
  {
    id: 'template-3',
    name: 'Luxo & Exclusividade',
    description: 'Desenvolvido para imóveis de alto padrão, com efeitos cinematográficos e estilo sofisticado.',
    thumbnailUrl: 'https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg?auto=compress&cs=tinysrgb&w=600',
    tags: ['Luxo', 'Premium', 'Alto Padrão'],
    previewUrl: 'https://assets.mixkit.co/videos/preview/mixkit-tour-of-a-luxurious-beach-villa-during-the-day-32747-large.mp4'
  },
  {
    id: 'template-4',
    name: 'Investimento Imobiliário',
    description: 'Template profissional para apresentação de oportunidades de investimento, com foco em dados e retorno financeiro.',
    thumbnailUrl: 'https://images.pexels.com/photos/323705/pexels-photo-323705.jpeg?auto=compress&cs=tinysrgb&w=600',
    tags: ['Investimento', 'ROI', 'Profissional'],
    previewUrl: 'https://assets.mixkit.co/videos/preview/mixkit-real-estate-agent-showing-modern-house-to-couple-32748-large.mp4',
    layout: {
      type: 'investment',
      sections: [
        {
          type: 'hero',
          style: 'fullscreen-overlay',
          textPosition: 'center'
        },
        {
          type: 'stats',
          style: 'dark-overlay',
          animation: 'fade-in'
        },
        {
          type: 'cta',
          style: 'fullscreen-image',
          textPosition: 'center'
        }
      ]
    }
  }
];

export const getTemplateById = (id: string): Template | undefined => {
  return templates.find(template => template.id === id);
};