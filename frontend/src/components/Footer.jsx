import React from 'react';
import { Instagram, Linkedin, Facebook, Rocket } from 'lucide-react';

const Footer = ({ data }) => {
  return (
    <footer className="bg-black text-white py-12 border-t border-neutral-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Top Section */}
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Logo & Description */}
            <div className="md:col-span-2">
              <div className="mb-4">
                <img 
                  src="https://customer-assets.emergentagent.com/job_maquina-crescimento/artifacts/a54bf2we_image.png" 
                  alt="MSD Logo" 
                  className="h-16"
                />
              </div>
              <p className="text-amber-500 font-semibold text-lg mb-3">
                {data.tagline}
              </p>
              <p className="text-neutral-400 max-w-md">
                {data.description}
              </p>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="font-bold text-lg mb-4">Redes Sociais</h4>
              <div className="flex gap-4">
                <a 
                  href={data.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-neutral-800 hover:bg-amber-500 rounded-lg flex items-center justify-center transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a 
                  href={data.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-neutral-800 hover:bg-amber-500 rounded-lg flex items-center justify-center transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a 
                  href={data.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-neutral-800 hover:bg-amber-500 rounded-lg flex items-center justify-center transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-neutral-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-neutral-500 text-sm">
              © {new Date().getFullYear()} MSD - Mark's Sucesso Digital. Todos os direitos reservados.
            </p>
            <div className="flex items-center gap-2 text-neutral-500 text-sm">
              <Rocket className="w-4 h-4 text-amber-500" />
              <span>Construído com tecnologia e estratégia</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
