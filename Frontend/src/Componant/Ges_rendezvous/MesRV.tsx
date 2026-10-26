import React, { useState } from 'react';

// --- INTERFACES ET TYPES (TYPING) ---
type AppointmentType = 'Suivi' | 'Initiale' | 'Plan';
type AppointmentStatus = 'Confirmé' | 'En attente';

interface DailyAppointment {
  id: number;
  time: string;
  name: string;
  phone: string;
  avatar: string;
  reason: string;
  type: AppointmentType;
  status: AppointmentStatus;
}

interface UpcomingAppointment {
  id: number;
  date: string;
  time: string;
  name: string;
  avatar: string;
  reason: string;
  type: AppointmentType;
  status: AppointmentStatus;
}

// --- JEU DE DONNÉES SIMULÉ (MOCK DATA) ---
const initialDailyAppointments: DailyAppointment[] = [
  {
    id: 1,
    time: '09:00',
    name: 'Marie KAMGA',
    phone: '+237 6 98 76 54 32',
    avatar: 'https://unsplash.com',
    reason: 'Suivi nutritionnel',
    type: 'Suivi',
    status: 'Confirmé'
  },
  {
    id: 2,
    time: '10:30',
    name: 'Jean DUPONT',
    phone: '+237 6 75 43 21 09',
    avatar: 'https://unsplash.com',
    reason: 'Consultation initiale',
    type: 'Initiale',
    status: 'Confirmé'
  },
  {
    id: 3,
    time: '14:00',
    name: 'Fatou NDIAYE',
    phone: '+237 6 55 12 98 31',
    avatar: 'https://unsplash.com',
    reason: 'Plan alimentaire',
    type: 'Plan',
    status: 'Confirmé'
  },
  {
    id: 4,
    time: '12:00',
    name: 'Fato AYE',
    phone: '+237 6 50 12 98 31',
    avatar: 'https://unsplash.com',
    reason: 'Suivi nutritionnelle',
    type: 'Suivi',
    status: 'Confirmé'
  }
];

const initialUpcomingAppointments: UpcomingAppointment[] = [
  {
    id: 101,
    date: '26 Mai 2026',
    time: '09:00',
    name: 'Alain CHAMBA',
    avatar: 'https://unsplash.com',
    reason: 'Suivi nutritionnel',
    type: 'Suivi',
    status: 'Confirmé'
  },
  
  {
    id: 103,
    date: '27 Mai 2026',
    time: '10:00',
    name: 'Paul BIKOUMOU',
    avatar: 'https://unsplash.com',
    reason: 'Plan alimentaire',
    type: 'Plan',
    status: 'Confirmé'
  },
  {
    id: 104,
    date: '28 Mai 2026',
    time: '15:30',
    name: 'Aminat BELLA',
    avatar: 'https://unsplash.com',
    reason: 'Suivi nutritionnel',
    type: 'Suivi',
    status: 'En attente'
  },
  {
    id: 105,
    date: '29 Mai 2026',
    time: '09:30',
    name: 'Lucie NGOULA',
    avatar: 'https://unsplash.com',
    reason: 'Consultation initiale',
    type: 'Initiale',
    status: 'En attente'
  }
];

export default function MesRV() {
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
      <span className={`text-xs px-2 py-0.5 rounded-sm font-semibold ${styles[type]}`}>
        {type}
      </span>
    );
  };

  // Composant interne Typé pour le Badge de Statut
  const StatusBadge = ({ status, onClick }: { status: AppointmentStatus; onClick?: () => void }) => {
    const isConfirmed = status === 'Confirmé';
    return (
      <span 
        onClick={onClick}
        className={`text-xs px-2.5 py-1 rounded-md font-medium transition-all ${
          isConfirmed 
            ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100' 
            : 'bg-orange-50 text-orange-700 hover:bg-orange-100'
        } ${onClick ? 'cursor-pointer' : 'cursor-default'}`}
        title={onClick ? "Cliquez pour modifier le statut" : undefined}
      >
        {status}
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
                  <h2 className="text-lg font-bold text-gray-900">Rendez-vous du jour</h2>
                  <p className="text-xs text-gray-500 font-medium">Dimanche 25 Mai 2026</p>
                </div>
              </div>
              <span className="bg-gray-100 text-gray-600 text-xs px-2.5 py-1 rounded-full font-medium">
                {dailyAppointments.length} rendez-vous
              </span>
            </div>

            {/* Tableau */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-xs font-semibold text-gray-400 uppercase border-b border-gray-100">
                    <th className="pb-3 font-medium">Heure</th>
                    <th className="pb-3 font-medium">Patient</th>
                    <th className="pb-3 font-medium">Motif</th>
                    <th className="pb-3 font-medium">Type</th>
                    <th className="pb-3 font-medium">Statut</th>
                    <th className="pb-3"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 text-sm">
                  {dailyAppointments.map((apt) => (
                    <tr key={apt.id} className="hover:bg-gray-50/50 transition">
                      <td className="py-3.5 font-bold text-gray-900">{apt.time}</td>
                      <td className="py-5">
                            <div className="font-bold text-gray-900">{apt.name}</div>
                            <div className="text-xs text-gray-400 font-medium">{apt.phone}</div>
                      </td>
                      <td className="py-6 text-gray-600 font-medium">{apt.reason}</td>
                      <td className="py-6"><TypeBadge type={apt.type} /></td>
                      <td className="py-6"><StatusBadge status={apt.status} /></td>
                      <td className="py-6 text-right text-gray-400 hover:text-gray-600 cursor-pointer">
                        <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 inline">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12" />
                        </svg>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="border-t border-gray-100  text-center">
            <button className="text-emerald-600 hover:text-emerald-700 font-bold text-sm inline-flex items-center 
             cursor-pointer transition">
              Voir tous les rendez-vous du jour 
              <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </button>
          </div>
        </div>

        {/* BLOC 3 : Prochains rendez-vous */}
      
            {/* En-tête */}
             <div className="bg-white rounded-xl border border-gray-100 p-5 flex flex-col justify-between shadow-xs">
          <div>
          
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-1">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">Prochain rendez-vous</h2>
                </div>
              </div>
              <span className="bg-gray-100 text-gray-600 text-xs px-2.5 py-1 rounded-full font-medium">
                {dailyAppointments.length} rendez-vous
              </span>
            </div>
            {/* Tableau */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-xs font-semibold text-gray-400 uppercase border-b border-gray-100">
                    <th className="pb-3 font-medium">Date</th>
                    <th className="pb-3 font-medium">Patient</th>
                    <th className="pb-3 font-medium">Motif</th>
                    <th className="pb-3 font-medium">Type</th>
                    <th className="pb-3 font-medium">Statut</th>
                    <th className="pb-3"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm">
                  {upcomingAppointments.map((apt) => (
                    <tr key={apt.id} className="hover:bg-gray-50/50 transition">
                      <td className="py-3.5 font-bold text-gray-900">{apt.date}</td>
                      <td className="py-5">
                            <div className="font-bold text-gray-900">{apt.name}</div>
                      </td>
                      <td className="py-6 text-gray-600 font-medium">{apt.reason}</td>
                      <td className="py-6"><TypeBadge type={apt.type} /></td>
                       <td className="py-2">
                        <StatusBadge status={apt.status} onClick={() => toggleStatus(apt.id)} />
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
           
                        

          <div className="border-t border-gray-100 pt-4 mt-6 text-center">
            <button className="text-emerald-600 hover:text-emerald-700 font-bold text-sm inline-flex items-center gap-2 cursor-pointer transition">
              Voir tous les prochains rendez-vous 
              <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* SECTION INFERIEURE : 4. Historique des rendez-vous */}
      <div className="bg-white rounded-xl border border-gray-100 p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-xs">
        <div>
          <h2 className="text-lg font-bold text-gray-900"> Historique des rendez-vous</h2>
          <p className="text-sm text-gray-500 font-medium mt-1">Consultez l'historique de vos rendez-vous.</p>
        </div>
        
        <button className="w-full md:w-auto flex items-center justify-between gap-6 border border-gray-200 rounded-xl p-4 hover:border-emerald-500 hover:bg-emerald-50/20 transition group cursor-pointer">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-50 text-emerald-600 w-10 h-10 rounded-lg flex items-center justify-center text-lg group-hover:bg-emerald-100 transition">
              <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-3 3h.008v.008H18v-.008ZM15.75 12h.008v.008h-.008V12Zm0 3h.008v.008h-.008V15Zm0 3h.008v.008h-.008V18Zm-3-6h.008v.008H12.75V12Zm0 3h.008v.008H12.75V15Zm-3-3h.008v.008H9.75V12Zm0 3h.008v.008H9.75V15Z" />
              </svg>
            </div>
            <div className="text-left">
              <div className="font-bold text-gray-900 text-sm">Voir l'historique </div>
              <div className="text-xs text-gray-400 font-medium">sur les 30 derniers jours</div>
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

