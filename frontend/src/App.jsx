import React, { useState } from 'react';
import Aurora from './Aurora';
import Footer from './components/Footer';
import { Github } from 'lucide-react';
import Navbar from './components/Navbar';
import Level1 from './components/pages/Level1';
import Level2 from './components/pages/Level2';
import Level3 from './components/pages/Level3';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderContent = () => {
    switch (currentPage) {
      case 'level1':
        return <Level1 />;
      case 'level2':
        return <Level2 />;
      case 'level3':
        return <Level3 />;
        default:
          return (
            <div className='font-poppins'>
            <div className="w-full max-w-5xl text-center space-y-10">
              <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-pink-400">
                Welcome to Aurora!!
              </h1>
              <p className="text-xl text-gray-300">
                Where the Northern Lights Meet Southern Logic.
              </p>
        
              <div className="bg-white/5 backdrop-blur-3xl rounded-xl p-8 shadow-xl border border-white/10">
                <h2 className="text-3xl font-semibold text-cyan-300 mb-6">Internship Overview</h2>
                
                <div className="text-left space-y-4 text-gray-200 text-lg">
                  <div className="bg-white/10 p-4 rounded-lg shadow-sm hover:bg-white/20 transition-all">
                    💡 Designed a multi-level gamified platform with interactive tasks and challenges.
                  </div>
                  <div className="bg-white/10 p-4 rounded-lg shadow-sm hover:bg-white/20 transition-all">
                    🔄 Integrated backend logic using RESTful Spring Boot APIs.
                  </div>
                  <div className="bg-white/10 p-4 rounded-lg shadow-sm hover:bg-white/20 transition-all">
                    ⚙️ Created animated visuals using WebGL and custom cursor shaders.
                  </div>
                  <div className="bg-white/10 p-4 rounded-lg shadow-sm hover:bg-white/20 transition-all">
                    🎨 Built a modern UI with React, Tailwind CSS, and Lucide Icons.
                  </div>
                </div>
        
                <h3 className="text-2xl font-semibold text-red-400 mt-10 mb-4 text-center">Tech Stack Used</h3>
                <div className="flex flex-wrap justify-center gap-6">
                  <div className="bg-white/10 p-4 rounded-xl flex flex-col items-center w-28 hover:bg-white/20">
                    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg" alt="React" className="w-10 h-10 mb-2" />
                    <span className="text-white text-sm">React</span>
                  </div>
                  <div className="bg-white/10 p-4 rounded-xl flex flex-col items-center w-28 hover:bg-white/20">
                    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/spring/spring-original.svg" alt="Spring Boot" className="w-10 h-10 mb-2" />
                    <span className="text-white text-sm">Spring Boot</span>
                  </div>
                  <div className="bg-white/10 p-4 rounded-xl flex flex-col items-center w-28 hover:bg-white/20">
                    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="JavaScript" className="w-10 h-10 mb-2" />
                    <span className="text-white text-sm">JavaScript</span>
                  </div>
                  <div className="bg-white/10 p-4 rounded-xl flex flex-col items-center w-28 hover:bg-white/20">
                    <img src="src\images\tailwindcss-mark.d52e9897.svg" alt="Tailwind" className="w-15 h-10 mb-2" />
                    <span className="text-white text-sm">Tailwind CSS</span>
                  </div>
                  <div className="bg-white/10 p-4 rounded-xl flex flex-col items-center w-28 hover:bg-white/20">
                    <img src="src\images\webgl_wht.svg" alt="WebGL" className="w-20 h-10 mb-2" />
                    <span className="text-white text-sm">WebGL</span>
                  </div>
                </div>
        
                <div className="flex justify-center mt-10">
                  <a
                    href="https://github.com/Kingston722/Aurora"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                  >
                    <Github size={20} />
                    <span>View on GitHub</span>
                  </a>
                </div>
              </div>
            </div>
            </div>
          );
        
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-900 text-white overflow-hidden">
      <Aurora
        colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
        blend={0.5}
        amplitude={1.0}
        speed={0.5}
      />
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-8 pt-24">
        {renderContent()}
      </div>
      <Footer/>
    </div>
    
  );
}

export default App;
