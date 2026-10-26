
import { useState } from 'react';

type FilterType = 'aujourdhui' | 'encours' | 'avenir' | 'passees';

interface StatCard {
  id: number;
  title: string;
  count: number;
  action?: string;
  primary?: boolean;
  subtext?: string;
  icon: string;
  filterTarget?: FilterType;
}

interface Consultation {
  id: number;
  name: string;
  date: string;
  type: string;
  avatar: string;
  status: 'En cours' | 'À venir' | 'Terminée';
  time?: string;
}

export default function GestionConsultations() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('aujourdhui');

  const stats: StatCard[] = [
    {
      id: 1,
      title: "Consultation d'aujourd'hui",
      count: 1,
      action: 'Voir la consultation',
      primary: true,
      filterTarget: 'aujourdhui',
      icon: '📅',
    },
    {
      id: 2,
      title: 'Consultations en cours',
      count: 1,
      action: 'Voir',
      primary: false,
      filterTarget: 'encours',
      icon: '🕒',
    },
    {
      id: 3,
      title: 'Prochaines consultations',
      count: 5,
      action: 'Voir',
      primary: false,
      filterTarget: 'avenir',
      icon: '🗓️',
    },
    {
      id: 4,
      title: 'Total du mois (août)',
      count: 18,
      subtext: '+2 par rapport à juillet',
      icon: '📊',
    },
  ];

  const consultationDuJour: Consultation = {
    id: 100,
    name: 'Mme Fanta Diallo',
    date: 'Mardi 12 août 2025',
    time: '09:30 - 10:15',
    type: 'Suivi nutritionnel',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    status: 'En cours',
  };

  const prochainesConsultations: Consultation[] = [
    {
      id: 1,
      name: 'M. Ibrahim Souley',
      date: 'Mer. 13 août 2025 - 09:00',
      type: 'Suivi nutritionnel',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      status: 'À venir',
    },
    {
      id: 2,
      name: "Mme N'Gouma Salif",
      date: 'Jeu. 14 août 2025 - 10:30',
      type: 'Bilan alimentaire',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
      status: 'À venir',
    },
    {
      id: 3,
      name: 'M. Koffi Amani',
      date: 'Ven. 15 août 2025 - 11:00',
      type: 'Suivi nutritionnel',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80',
      status: 'À venir',
    },
  ];

  const consultationsPassees: Consultation[] = [
    {
      id: 4,
      name: 'Mme Traoré Awa',
      date: 'Lun. 11 août 2025 - 10:00',
      type: 'Plan alimentaire',
      avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=200&q=80',
      status: 'Terminée',
    },
    {
      id: 5,
      name: 'M. Diarra Abdoulaye',
      date: 'Sam. 9 août 2025 - 14:30',
      type: 'Suivi nutritionnel',
      avatar: 'https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=200&q=80',
      status: 'Terminée',
    },
    {
      id: 6,
      name: 'Mme Koné Fatou',
      date: 'Jeu. 7 août 2025 - 09:00',
      type: 'Bilan alimentaire',
      avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80',
      status: 'Terminée',
    },
  ];

  const daysInMonth: number[] = Array.from({ length: 31 }, (_, i) => i + 1);
  const blanks: number[] = Array.from({ length: 4 }, (_, i) => i);

  const visibleList: Consultation[] =
    activeFilter === 'avenir'
      ? prochainesConsultations
      : activeFilter === 'passees'
        ? consultationsPassees
        : [consultationDuJour];

  return (
    <div className="min-h-screen bg-slate-50/50 p-4 sm:p-6 lg:p-8 font-sans text-slate-800 antialiased">
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Consultations</h1>
          <p className="text-sm text-slate-500 mt-1">Suivez et gérez toutes vos consultations en un seul endroit.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {stats.map((stat) => (
              <div key={stat.id} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm flex flex-col justify-between min-h-40">
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-[13px] font-bold text-slate-600 leading-tight">{stat.title}</span>
                    <span className="text-xl bg-slate-50 p-1 rounded-lg">{stat.icon}</span>
                  </div>
                  <p className="text-3xl font-black text-slate-900 pt-2">{stat.count}</p>
                  {stat.subtext && <p className="text-xs text-emerald-600 font-bold">{stat.subtext}</p>}
                </div>

                {stat.action && (
                  <button
                    onClick={() => stat.filterTarget && setActiveFilter(stat.filterTarget)}
                    className={`w-full py-2 px-3 text-xs font-bold rounded-xl transition-all shadow-sm ${
                      stat.primary
                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                        : 'bg-emerald-50/60 hover:bg-emerald-50 text-emerald-700'
                    }`}
                  >
                    {stat.action}
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="lg:col-span-4 bg-white border border-slate-100 rounded-2xl p-4 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between px-1 mb-3">
              <button className="text-slate-400 hover:text-slate-600 text-sm font-bold transition">‹</button>
              <h2 className="text-xs font-black text-slate-900 tracking-wider uppercase">Août 2025</h2>
              <button className="text-slate-400 hover:text-slate-600 text-sm font-bold transition">›</button>
            </div>

            <div className="grid grid-cols-7 gap-y-2 text-center text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
              {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((day) => (
                <div key={day}>{day}</div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-y-1 text-center text-xs font-bold text-slate-700">
              {blanks.map((blank) => (
                <div key={`blank-${blank}`} />
              ))}
              {daysInMonth.map((day) => (
                <div key={day} className="flex items-center justify-center h-7 w-7 mx-auto">
                  <span
                    className={`w-full h-full flex items-center justify-center rounded-full transition cursor-pointer ${
                      day === 12 ? 'bg-emerald-600 text-white font-extrabold shadow-sm' : 'hover:bg-slate-100 text-slate-800'
                    }`}
                  >
                    {day}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 border-b border-slate-200/60 pb-3">
          {(['aujourdhui', 'encours', 'avenir', 'passees'] as FilterType[]).map((filter) => {
            const labels: Record<FilterType, string> = {
              aujourdhui: "Consultations d'aujourd'hui",
              encours: 'En cours (1)',
              avenir: 'À venir (5)',
              passees: 'Passées (12)',
            };

            return (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  activeFilter === filter
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-white border border-slate-200 text-slate-500 hover:text-slate-700 hover:border-slate-300'
                }`}
              >
                {labels[filter]}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
          {(activeFilter === 'aujourdhui' || activeFilter === 'encours') && (
            <div className="bg-emerald-50/40 border border-emerald-100/60 rounded-2xl p-5 space-y-5 transition-all">
              <div>
                <h3 className="text-sm font-black text-slate-900">Consultation d'aujourd'hui</h3>
                <p className="text-xs text-slate-500 font-medium mt-0.5">{consultationDuJour.date}</p>
              </div>

              <div className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm space-y-4">
                <div className="flex items-center gap-3">
                  <img
                    src={consultationDuJour.avatar}
                    alt={consultationDuJour.name}
                    className="w-12 h-12 rounded-full object-cover shadow-inner"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="text-sm font-bold text-slate-900 truncate">{consultationDuJour.name}</h4>
                      <span className="bg-emerald-50 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap">
                        {consultationDuJour.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">{consultationDuJour.type}</p>
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-3 text-sm text-slate-600 space-y-2">
                  <p className="flex justify-between">
                    <span>Heure</span>
                    <span className="font-semibold text-slate-800">{consultationDuJour.time}</span>
                  </p>
                  <p className="flex justify-between">
                    <span>Type</span>
                    <span className="font-semibold text-slate-800">{consultationDuJour.type}</span>
                  </p>
                </div>
              </div>
            </div>
          )}

          {(activeFilter === 'avenir' || activeFilter === 'passees' || activeFilter === 'aujourdhui' || activeFilter === 'encours') && (
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
              <h3 className="text-sm font-black text-slate-900 mb-4">
                {activeFilter === 'avenir' ? 'Prochaines consultations' : activeFilter === 'passees' ? 'Consultations passées' : 'Liste détaillée'}
              </h3>

              <div className="space-y-3">
                {visibleList.map((consultation) => (
                  <div key={consultation.id} className="flex items-center gap-3 border border-slate-100 rounded-xl p-3 bg-slate-50/60">
                    <img src={consultation.avatar} alt={consultation.name} className="w-10 h-10 rounded-full object-cover" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm font-bold text-slate-900 truncate">{consultation.name}</p>
                        <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-white text-slate-600 border border-slate-200">
                          {consultation.status}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">{consultation.date}</p>
                      <p className="text-xs text-green-800 mt-0.5 font-semibold">{consultation.type}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
            <h3 className="text-sm font-black text-slate-900 mb-4">Résumé</h3>
            <div className="space-y-3 text-sm text-slate-600">
              <div className="flex justify-between">
                <span>Rendez-vous aujourd’hui</span>
                <span className="font-bold text-slate-900">1</span>
              </div>
              <div className="flex justify-between">
                <span>En cours</span>
                <span className="font-bold text-slate-900">1</span>
              </div>
              <div className="flex justify-between">
                <span>À venir</span>
                <span className="font-bold text-slate-900">5</span>
              </div>
              <div className="flex justify-between">
                <span>Terminées</span>
                <span className="font-bold text-slate-900">12</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


