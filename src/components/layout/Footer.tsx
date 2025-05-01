import React from 'react';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-3">Criador de Vídeos IA</h3>
            <p className="text-primary-200 text-sm">
              Crie vídeos profissionais para seu empreendimento imobiliário ou negócio com facilidade, usando o poder da inteligência artificial.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-3">Links Úteis</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-primary-200 hover:text-white transition-colors">
                  Como Funciona
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-200 hover:text-white transition-colors">
                  Planos e Preços
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-200 hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-200 hover:text-white transition-colors">
                  Blog
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-3">Contato</h3>
            <ul className="space-y-2 text-sm">
              <li className="text-primary-200">
                contato@criadordevideos.com.br
              </li>
              <li className="text-primary-200">
                +55 (11) 3456-7890
              </li>
              <li className="mt-4">
                <div className="flex space-x-4">
                  <a href="#" className="text-primary-200 hover:text-white transition-colors">
                    Facebook
                  </a>
                  <a href="#" className="text-primary-200 hover:text-white transition-colors">
                    Instagram
                  </a>
                  <a href="#" className="text-primary-200 hover:text-white transition-colors">
                    LinkedIn
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-primary-700 mt-8 pt-6 text-center text-sm text-primary-300">
          <p className="flex items-center justify-center">
            Feito com <Heart size={14} className="mx-1 text-accent-400" /> no Brasil
          </p>
          <p className="mt-2">
            &copy; {new Date().getFullYear()} Criador de Vídeos com IA. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;