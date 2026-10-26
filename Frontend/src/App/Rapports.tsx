import { useState } from 'react'
import Sidebar from "../Componant/Sidebar";
import Header from "../Componant/Header";
import RapportInterface from '../Componant/Ges_rapports/Rapport';


export default function Rapports() {
  const [sideBarCollapsed, setSideBarCollapsed] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');
  
  return (
    <div className='flex min-h-screen w-full bg-gray-50'>
      {/* Sidebar fixée sur le côté */}
      <div className='fixed top-0 left-0 h-screen bg-[#00c853] z-50'>
        <Sidebar
          collapsed={sideBarCollapsed}
          onToggle={() => setSideBarCollapsed(!sideBarCollapsed)}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>

      {/* Zone de contenu principal qui prend TOUTE la largeur restante */}
      <main className={`min-w-0 flex-1 flex flex-col p-6 transition-all duration-300 ${sideBarCollapsed ? 'ml-20' : 'ml-72'}`}>
        <Header
          sidebarCollapsed={sideBarCollapsed}
          onToggleSidebar={() => setSideBarCollapsed(!sideBarCollapsed)}
        />
        <RapportInterface />
      </main>
    </div>
  );
}
