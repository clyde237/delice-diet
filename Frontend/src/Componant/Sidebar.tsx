import React from 'react'
import Logo from '../assets/Logo.jpg'
import { useState } from 'react';
import { 
  LayoutDashboard,
  Users,
  CalendarDays,
  Activity,
  Stethoscope,
  Utensils,
  MessageCircle,
  BarChart3,
  Settings,
} from 'lucide-react'
// 1. Ajout de useLocation ici
import { useNavigate, useLocation } from 'react-router-dom';

const menuItems = [
  {
   id: 'dashboard',
   icon: LayoutDashboard,
   label: 'Tableau de bord',
   path: '/Dashbord' // On associe directement l'URL ici
  },
  {
    id:'patients',
    icon: Users,
    label: 'Patients',
    path: '/Patient'
  },
  {
    id:'appointments',
    icon: CalendarDays,
    label: 'Rendez-vous',
    path: '/appointments'
  },
  {
    id:'monitoring',
    icon: Activity,
    label: 'Suivi',
    path: '/monitoring'
  },
  {
    id:'consultations',
    icon: Stethoscope,
    label: 'Consultations',
    path: '/consultations'
  },
  { 
    id:'meal-plan',
    icon:Utensils,
    label:'Plan alimentaire',
    path: '/meal-plan'
  },
  {
    id:'messages',
    icon:MessageCircle,
    label:'Messages',
    badge: '3',
    path: '/messages'
  },
  {
    id:'reports',
    icon:BarChart3,
    label:'Rapports',
    path: '/reports'
  },
  {
    id:'settints',
    icon:Settings,
    label:'Paramètres',
    path: '/settings'
  },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  currentPage: string;
  onPageChange: (page: string) => void;
}

export default function Sidebar({ collapsed, onToggle, currentPage, onPageChange }: SidebarProps) {
  const [expandedItems, setExpendedItems] = useState(new Set(["monitoring"]));
  
  // 2. Initialisation des hooks de navigation et de localisation
  const navigate = useNavigate();
  const location = useLocation();

  const toggleExpanded = (itemid: any) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(itemid)) {
      newExpanded.delete(itemid);
    } else {
      newExpanded.add(itemid);
    }
    setExpendedItems(newExpanded);
  };

  return (
    <div className={`h-screen transition-all duration-300 ease-in-out bg-green-600 backdrop-blur-xl border-white ${collapsed ? 'w-20' : 'w-72'}`}>
      
      {/* Logo */}
      <div className='p-4 border-b border-white/40'>
        <div className='flex items-center space-x-3 p-3'>
          <div className='w-10 h-10 flex items-center justify-center shadow-lg'>
            <img src={Logo} className='logo rounded-4xl' alt="Logo" />
          </div>
          {!collapsed && (
            <div>
              <h1 className='text-xl font-bold'>Diet heathly App</h1>
              <p className='text-xs text-white'>Dieteticien</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className='flex-1 p-4 space-y-2 overflow-y-auto'>
        {menuItems.map((item) => {
          // 3. On vérifie si l'URL courante correspond au chemin du bouton
          const isItemActive = location.pathname === item.path;

          return (
            <div key={item.id}>
              <button
                className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200 ${
                  isItemActive
                    ? "bg-green-50 shadow-lg shadow-green-800 text-green-600 font-semibold"
                    : "hover:bg-green-300 text-white"
                }`}
                onClick={() => {
                  onPageChange(item.id);
                  // Redirection vers le chemin configuré dans le tableau
                  navigate(item.path);
                }}
              >
                {/* BLOC GAUCHE : Icône + Texte + Badge */}
                <div className='flex items-center space-x-3'>
                  <item.icon className={`w-5 h-5 transition-colors duration-200 ${isItemActive ? 'text-green-600' : 'text-white'}`} />
                  {!collapsed && (
                    <span className='font-medium ml-2'>{item.label}</span>
                  )}
                  {!collapsed && item.badge && (
                    <span className='px-2 py-1 text-xs bg-red-500 text-white rounded-full'>
                      {item.badge}
                    </span>
                  )}
                </div>         
              </button>
            </div>
          );
        })}
      </nav>
    </div>
  );
}
