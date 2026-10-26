import React, { useState } from 'react'
import Sidebar from "../Componant/Sidebar";
import Header from "../Componant/Header";
import Tableau from '../Componant/Tableau_de_bord/Tableau';
import { useNavigate } from 'react-router-dom';

 export default function Dashbord() {
  const navigate = useNavigate();
  
  

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
    

       <main className={`flex-1 p-6 transition-all duration-300 ${sideBarCollapsed ? 'ml-20' : 'ml-72'}`}>
          <div className='flex-1 flex flex-col'>
            <Header 
              sidebarCollapsed={sideBarCollapsed}
              onToggleSidebar={() => setSideBarCollapsed(!sideBarCollapsed)}
            />
            <Tableau/>
          </div>
        </main>
      </div>

    
  );
  {React}
}

