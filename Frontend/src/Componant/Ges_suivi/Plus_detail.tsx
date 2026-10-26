import React, { useState } from 'react';
import { ArrowUp } from 'lucide-react';


interface DailyAppointment {
  id: number;
  time: string;
  name: string;
  phone: string;
  avatar: string;
  reason: string;
  type: string;
  
}

interface UpcomingAppointment {
  id: number;
  date: string;
  time: string;
  name: string;
  avatar: string;
  reason: string;
  type: String;
  tour:String;
  note:String;
}

// --- JEU DE DONNÉES SIMULÉ (MOCK DATA) ---
const initialDailyAppointments: DailyAppointment[] = [
  {
    id: 1,
    time: 'Poids',
    name: '68,5kg',
    phone: '+237 6 98 76 54 32',
    avatar: 'https://unsplash.com',
    reason: '1,3kg',
    type: '60,5kg',
    
  },
  {
    id: 2,
    time: 'IMC',
    name: '24,6',
    phone: '+237 6 75 43 21 09',
    avatar: 'https://unsplash.com',
    reason: '0,6',
    type: '21-23',
   
  },
  {
    id: 3,
    time: 'Masse grasse',
    name: '28,3%',
    phone: '+237 6 55 12 98 31',
    avatar: 'https://unsplash.com',
    reason: '1.8%',
    type: '22%',
    
  },
  {
    id: 4,
    time: 'Masse musculaire',
    name: '42,1kg',
    phone: '+237 6 50 12 98 31',
    avatar: 'https://unsplash.com',
    reason: '0.7kg',
    type: '45kg',

  },
   {
    id: 5,
    time: 'Tour de taille',
    name: '78cm',
    phone: '+237 6 50 12 98 31',
    avatar: 'https://unsplash.com',
    reason: '1cm',
    type: '60',

  },
   {
    id: 6,
    time: 'Metabolisme de base ',
    name: '1450kcal',
    phone: '+237 6 50 12 98 31',
    avatar: 'https://unsplash.com',
    reason: '150kcal',
    type: '-',

  }
];

const initialUpcomingAppointments: UpcomingAppointment[] = [
  {
    id: 101,
    date: '08 Septembre 2026',
    time: '68,5',
    name: '68,5',
    avatar: 'https://unsplash.com',
    reason: '24,6',
    type: '28,3%',
    tour:'78cm',
    note: 'Bonne Adhesion',
   
  },
  
  {
    id: 103,
    date: '26 Août 2026',
    time: '68,5',
    name: '68,5',
    avatar: 'https://unsplash.com',
    reason: '24,6',
    type: '28,3%',
    tour:'78cm',
    note: 'Ajustement du plan',
  },
    
  {
    id: 104,
   date: '05 juillet 2026',
    time: '68,5',
    name: '68,5',
    avatar: 'https://unsplash.com',
    reason: '24,6',
    type: '28,3%',
    tour:'78cm',
    note: ' Evolution',
  },
  {
    id: 105,
    date: '20 juin 2026',
    time: '68,5',
    name: '68,5',
    avatar: 'https://unsplash.com',
    reason: '24,6',
    type: '28,3%',
    tour:'78cm',
    note: 'Debut suivi', 
  },
  {
    id: 106,
    date: '06 juin 2026',
    time: '68,5',
    name: '68,5',
    avatar: 'https://unsplash.com',
    reason: '24,6',
    type: '28,3%',
    tour:'78cm',
    note: '-', 
  }
];

export default function Plus_detail () {
  // États fortement typés avec TypeScript
  const [dailyAppointments] = useState<DailyAppointment[]>(initialDailyAppointments);
  const [upcomingAppointments, setUpcomingAppointments] = useState<UpcomingAppointment[]>(initialUpcomingAppointments);

  // Fonction pour basculer le statut du rendez-vous futur
  const toggleStatus = (id: number): void => {
    setUpcomingAppointments(prev =>
      prev.map(apt => {
        if (apt.id === id) {
          return {
            ...apt,
            status: apt.status === 'En attente' ? 'Confirmé' : 'En attente'
          };
        }
        return apt;
      })
    );
  };

  // Composant interne Typé pour le Badge de Type
  const TypeBadge = ({ type }: { type: AppointmentType }) => {
    const styles: Record<AppointmentType, string> = {
      Suivi: 'bg-emerald-50 text-emerald-600',
      Initiale: 'bg-blue-50 text-blue-600',
      Plan: 'bg-orange-50 text-orange-600'
    };
    return (
      <span className={`text-xm px-2 py-0.5 rounded-sm font-semibold ${styles[type]}`}>
        {type}
      </span>
    );
  };
  return (
    <div className="max-w-7xl mx-auto p-6 space-y-2 bg-gray-50 min-h-screen font-sans antialiased text-gray-800">
      
      {/* SECTION SUPERIEURE : Grille 2 colonnes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">

        {/* BLOC 2 : Rendez-vous du jour */}
        <div className="bg-white rounded-xl border border-gray-100 p-5 flex flex-col justify-between shadow-xs">
          <div>
            {/* En-tête */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-1">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">Indicateurs corporels</h2>
                  {/*<p className="text-xs text-gray-500 font-medium">Dimanche 25 Mai 2026</p>*/}
                </div>
              </div>
              <span className="bg-gray-100 text-gray-600 text-xs px-2.5 py-1 rounded-full font-medium">
                 i
              </span>
            </div>

            {/* Tableau */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-xs font-semibold text-gray-400 uppercase border-b border-gray-200">
                    <th className="pb-3 font-medium">Indicateur</th>
                    <th className="pb-3 font-medium">Actuel</th>
                    <th className="pb-3 font-medium">Evolution</th>
                    <th className="pb-3 font-medium">Objectif</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 text-sm ">
                  {dailyAppointments.map((apt) => (
                    <tr key={apt.id} className="hover:bg-gray-50/50 transition">
                      <td className="py-5 font-medium text-gray-800">{apt.time}</td>
                      <td className="py-5 font-medium text-gray-800">{apt.name} </td>
                      <td className="py-5 text-green-600 font-medium flex justify-center items-center ">
                        <ArrowUp className='w-4 '/>{apt.reason}</td>
                      <td className="py-5 fond-medium"><TypeBadge type={apt.type} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* BLOC 3 : Historique des suivis du patient */}
      
            {/* En-tête */}
             <div className="bg-white rounded-xl border border-gray-100 p-5 flex flex-col justify-between shadow-xs">
          <div>
          
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-1">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">Historique des suivis</h2>
                </div>
              </div>
            </div>
            {/* Tableau */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-xs font-semibold text-gray-400 uppercase border-b border-gray-100">
                    <th className="pb-3 font-medium">Date</th>
                    <th className="pb-3 font-medium">Poids(kg)</th>
                    <th className="pb-3 font-medium">IMC</th>
                    <th className="pb-3 font-medium">Masse grasse</th>
                    <th className="pb-3 font-medium">Tour de taille</th>
                    <th className="pb-3 font-medium">Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 text-sm">
                  {upcomingAppointments.map((apt) => (
                    <tr key={apt.id} className="hover:bg-gray-50/50 transition">
                      <td className="py-3.5 font-medium text-gray-800">{apt.date}</td>
                      <td className="py-5">
                      <div className="font-medium text-gray-800">{apt.name}</div>
                      </td>
                      <td className="py-6 text-gray-600 font-medium">{apt.reason}</td>
                      <td className="py-6"><TypeBadge type={apt.type} /></td>
                       <td className="py-6 text-gray-600 font-medium">{apt.tour}</td>
                        <td className="py-6 text-gray-600 font-medium">{apt.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {/*<div className="border-t border-gray-100 pt-4 mt-6 text-center">
            <button className="text-emerald-600 hover:text-emerald-700 font-bold text-sm inline-flex items-center gap-2 cursor-pointer transition">
              Voir tous  
              <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </button>
          </div>*/}
        </div>
      </div>

      {/* SECTION INFERIEURE : 4. Historique des rendez-vous */}
      <div className="bg-white rounded-xl border border-gray-100 p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-xs">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Observations & Recommendations</h2>
          <p className="text-sm text-gray-500 font-medium mt-1"> Patiente motivée, bonne observation du plan alimentaire
             </p>
             <p className="text-sm text-gray-500 font-medium mt-1"> 
             Augmenter legèrement l'apport en protéïne</p>

        </div>
        
        <button className="w-full md:w-auto flex items-center justify-between gap-6 border border-gray-200 rounded-xl p-4 hover:border-emerald-500 hover:bg-emerald-50/20 transition group cursor-pointer">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-50 text-emerald-600 w-10 h-10 rounded-lg flex items-center justify-center text-lg group-hover:bg-emerald-100 transition">
              <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-3 3h.008v.008H18v-.008ZM15.75 12h.008v.008h-.008V12Zm0 3h.008v.008h-.008V15Zm0 3h.008v.008h-.008V18Zm-3-6h.008v.008H12.75V12Zm0 3h.008v.008H12.75V15Zm-3-3h.008v.008H9.75V12Zm0 3h.008v.008H9.75V15Z" />
              </svg>
            </div>
            <div className="text-left">
              <div className="font-bold text-green-900 text-sm">Nouveau Suivi </div>
            </div>
          </div>
          <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-gray-400 group-hover:text-emerald-600 transition">
            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>
      </div>
  );
}

