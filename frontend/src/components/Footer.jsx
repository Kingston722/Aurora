import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className='font-poppins'>
    <footer className="bg-gray-800 text-gray-300 py-4 px-4 border-t border-gray-700">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between text-sm space-y-4 md:space-y-0">
        
        <div className="flex items-center gap-3">
          <img
            src="https://cdn-icons-png.flaticon.com/512/1055/1055687.png"
            alt="Aurora Logo"
            className="w-8 h-8"
          />
          <div className="flex flex-col">
            <span className="text-white font-semibold text-base">Cognifyz Internship</span>
            <span className="text-gray-400 text-xs">Powered by creativity & code</span>
          </div>
        </div>

        <div className="text-center space-y-0.5 text-xs">
          <p>© {new Date().getFullYear()} Cognifyz Internship. All rights reserved.</p>
          <p>
            Made with <span className="text-red-400">♥</span> by <span className="text-white font-medium">Harshvardhan Poredi</span>
          </p>
        </div>

        <div className="flex items-center gap-4 text-lg">
          <a
            href="https://github.com/Kingston722"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition"
            title="GitHub"
          >
            <FaGithub />
          </a>
          <a
            href="mailto:harshvardhanwork01@gmail.com"
            className="hover:text-white transition"
            title="Email"
          >
            <FaEnvelope />
          </a>
          <a
            href="https://www.linkedin.com/in/harshvardhan-poredi-744587329/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition"
            title="LinkedIn"
          >
            <FaLinkedin />
          </a>
        </div>
      </div>
    </footer>
    </div>
  );
};

export default Footer;
