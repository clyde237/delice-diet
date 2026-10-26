import React from 'react'
import image2 from '../../assets/image2.png';

// --- INTERFACES ET TYPES (TYPING) ---

type AppointmentStatus = 'Confirmé' | 'En attente';

interface DailyAppointment {
  id: number;
  time: string;
  name: string;
  phone: string;
  reason: string;
  status: AppointmentStatus;
}

interface UpcomingAppointment {
  id: number;
  date: string;
  time: string;
  name: string;
  reason: string;
  status: AppointmentStatus;
}

// --- JEU DE DONNÉES SIMULÉ (MOCK DATA) ---
const initialDailyAppointments: DailyAppointment[] = [
  {
    id: 1,
    time: '09:00',
    name: 'Marie KAMGA',
    phone: '+237 6 98 76 54 32',
    reason: 'Suivi nutritionnel',
    status: 'Confirmé'
  },
  {
    id: 2,
    time: '10:30',
    name: 'Jean DUPONT',
    phone: '+237 6 75 43 21 09',
    reason: 'Consultation initiale',
    status: 'Confirmé'
  },
  {
    id: 3,
    time: '14:00',
    name: 'Fatou NDIAYE',
    phone: '+237 6 55 12 98 31',
    reason: 'Plan alimentaire',
    status: 'Confirmé'
  },
  {
    id: 4,
    time: '12:00',
    name: 'Fato AYE',
    phone: '+237 6 50 12 98 31',
    reason: 'Suivi nutritionnelle',
    status: 'Confirmé'
  }
];

const initialUpcomingAppointments: UpcomingAppointment[] = [
  {
    id: 101,
    date: '26 Mai 2026',
    time: '09:00',
    name: 'Alain CHAMBA',
    reason: 'Suivi nutritionnel',
    status: 'Confirmé'
  },
  
  {
    id: 103,
    date: '27 Mai 2026',
    time: '10:00',
    name: 'Paul BIKOUMOU',
    reason: 'Plan alimentaire',
    status: 'Confirmé'
  },
  {
    id: 104,
    date: '28 Mai 2026',
    time: '15:30',
    name: 'Aminat BELLA',
    reason: 'Suivi nutritionnel',
    status: 'En attente'
  },
  {
    id: 105,
    date: '29 Mai 2026',
    time: '09:30',
    name: 'Lucie NGOULA',
    reason: 'Consultation initiale',
    status: 'En attente'
  }
];



function Profil() {
  return (
    <div className='bg-white border border-slate-100 rounded-2xl shadow my-6 flex items-center justify-between '>
         <div className='flex items-center space-x-3 p-6'>
                <img src={image2}
                    className='w-15 h-15 rounded-full ring-1 '/>
                 <div className='hidden md:block'>
                 
                    <p className='text-xl font-medium  text-slate-800'>
                    John Week
                    </p>
                    <p className='text-sm my-2 text-slate-500'>
                     ID :#678   . 45 ans  . Homme
                    </p>
                    <p  className='text-sm my-2 text-slate-500'>
                      678 474 388       john.week@email.com   
                    </p>
                </div>
           </div>
             <div className='flex items-center space-x-3 pl-8 border-l border-slate-300'>
                    <div className='hidden md:block  '>
                       <p className='text-xs font-semibold my-2 text-slate-500'>
                            Dernières consultation
                   </p>
                        <p className='text-sm font-medium my-2 text-slate-800'>
                            20 Aout
                        </p>
                        <p className='text-xs font-semibold text-slate-500'>
                            Il y a 9 jours
                        </p>
                    </div>
                </div>
                <div className='flex items-center space-x-3 pl-8 border-l border-slate-400'>
                    <div className='hidden md:block'>
                      <p className='text-xs font-semibold my-2 text-slate-500'>
                            Prochaines consultation
                        </p>
                        <p className='text-sm font-medium my-2 text-slate-800'>
                          31  
                        </p>
                        <p className='text-xs font-semibold text-slate-500'>
                            Dans 2 jours 
                        </p>
                    </div>
                </div>
                <div className='flex items-center space-x-3 pl-8 border-l border-slate-400'>
                    <div className='hidden md:block'>
                      <p className='text-xs font-semibold my-2 text-slate-500'>
                            Objectifs principal
                        </p>
                        <p className='text-sm font-semibold my-2 text-slate-800'>
                            perte de poids
                        </p>
                        <p className='text-xs font-semibold text-orange-500'>
                            -8 kg
                        </p>
                    </div>
                </div>
           <div>

           </div>

    </div>
  )
}

export default Profil