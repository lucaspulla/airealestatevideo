import OpenAI from 'openai';

// In a real application, you would use environment variables
const apiKey = import.meta.env.VITE_OPENAI_API_KEY || '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';

const openai = new OpenAI({
  apiKey,
  dangerouslyAllowBrowser: true, // For demo purposes - in production, call API from backend
});

export interface TextGenerationParams {
  propertyType?: string;
  location?: string;
  keyFeatures?: string;
  targetAudience?: string;
  callToAction?: string;
}

export const generateMarketingTexts = async (params: TextGenerationParams) => {
  try {
    const { propertyType, location, keyFeatures, targetAudience, callToAction } = params;
    
    const prompt = `
      Create 3 compelling, short marketing texts for a ${propertyType || 'property'} 
      ${location ? `in ${location}` : ''}.
      ${keyFeatures ? `Key features include: ${keyFeatures}.` : ''}
      ${targetAudience ? `Target audience: ${targetAudience}.` : ''}
      ${callToAction ? `Include this call to action: ${callToAction}` : ''}
      
      Each text should be between 50-100 words, be compelling, professional, and highlight 
      the unique aspects of the property. Format the output as an array of 3 strings.
    `;

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a professional real estate marketing copywriter. Create compelling, concise marketing text.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.7,
    });

    // Parse the response to extract the three texts
    const content = response.choices[0]?.message.content || '';
    
    // Clean up the response content and extract the texts
    // In real implementation, this would need robust text parsing
    // This is a simplified approach
    const textMatches = content.match(/["'](.+?)["']/g) || [];
    const texts = textMatches
      .map(match => match.replace(/^["']|["']$/g, ''))
      .slice(0, 3);
    
    // If we couldn't parse properly, return default placeholders
    if (texts.length < 3) {
      return [
        `Descubra o charme único deste ${propertyType || 'imóvel'} ${location ? `em ${location}` : ''}. Com características distintas e localização privilegiada, é a escolha perfeita para você. ${callToAction || 'Entre em contato hoje mesmo!'}`,
        `Oportunidade imperdível: ${propertyType || 'imóvel'} ${location ? `em ${location}` : ''} com todas as comodidades que você procura. Ideal para ${targetAudience || 'você e sua família'}. ${callToAction || 'Agende uma visita!'}`,
        `${propertyType || 'Propriedade'} extraordinária ${location ? `em ${location}` : ''} com ${keyFeatures || 'características exclusivas'}. Projetado para ${targetAudience || 'proporcionar conforto e elegância'}. ${callToAction || 'Não perca esta oportunidade!'}`,
      ];
    }
    
    return texts;
  } catch (error) {
    console.error('Error generating marketing texts:', error);
    return [
      'Texto de marketing 1 - Não foi possível gerar texto personalizado.',
      'Texto de marketing 2 - Não foi possível gerar texto personalizado.',
      'Texto de marketing 3 - Não foi possível gerar texto personalizado.',
    ];
  }
};