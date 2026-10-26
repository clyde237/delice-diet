import { useEffect, useMemo, useState } from 'react';

type FilterType = 'aujourdhui' | 'encours' | 'avenir' | 'passees';
type ViewMode = 'dashboard' | 'dayList' | 'chat';
type ConsultationStatus = 'En cours' | 'À venir' | 'Terminée';

interface Consultation {
  id: number;
  patient: string;
  objectif: string;
  date: string;
  heure: string;
  duree: string;
  avatar: string;
  status: ConsultationStatus;
  note: string;
}

interface Message {
  id: number;
  sender: 'patient' | 'dieteticien';
  text: string;
  time: string;
}

interface StatCard {
  id: number;
  label: string;
  value: string;
  detail: string;
  tone: 'emerald' | 'sky' | 'amber' | 'rose';
}

const stats: StatCard[] = [
  { id: 1, label: 'Consultations du jour', value: '06', detail: '+2 vs hier', tone: 'emerald' },
  { id: 2, label: 'Patients actifs', value: '142', detail: '92% de suivi', tone: 'sky' },
  { id: 3, label: 'Rappels envoyés', value: '18', detail: '5 en attente', tone: 'amber' },
  { id: 4, label: 'Taux d’adhésion', value: '94%', detail: '+4% ce mois', tone: 'rose' },
];

const consultations: Consultation[] = [
  {
    id: 1,
    patient: 'Mme Fanta Diallo',
    objectif: 'Suivi nutritionnel',
    date: 'Mardi 12 août',
    heure: '09:30 - 10:15',
    duree: '45 min',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    status: 'En cours',
    note: 'Plan adapté à l’objectif d’hydratation + équilibre énergétique.',
  },
  {
    id: 2,
    patient: 'M. Ibrahim Souley',
    objectif: 'Bilan alimentaire',
    date: 'Mercredi 13 août',
    heure: '11:00 - 11:45',
    duree: '45 min',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    status: 'À venir',
    note: 'Suivi de l’évolution du poids et de la prise alimentaire.',
  },
  {
    id: 3,
    patient: 'Mme N’Gouma Salif',
    objectif: 'Contrôle glycémique',
    date: 'Jeudi 14 août',
    heure: '15:00 - 15:45',
    duree: '45 min',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    status: 'À venir',
    note: 'Vérification des habitudes alimentaires et des apports glucidiques.',
  },
  {
    id: 4,
    patient: 'M. Koffi Amani',
    objectif: 'Plan de perte de poids',
    date: 'Vendredi 15 août',
    heure: '09:00 - 09:50',
    duree: '50 min',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80',
    status: 'À venir',
    note: 'Adaptation du menu hebdomadaire et suivi de la progression.',
  },
  {
    id: 5,
    patient: 'Mme Traoré Awa',
    objectif: 'Suivi post-partum',
    date: 'Lundi 11 août',
    heure: '10:00 - 10:40',
    duree: '40 min',
    avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=200&q=80',
    status: 'Terminée',
    note: 'Évolution positive sur l’apport énergétique et la récupération.',
  },
];

const initialMessagesByConsultation: Record<number, Message[]> = {
  1: [
    { id: 1, sender: 'patient', text: 'Bonjour docteur, j’ai bien suivi le plan d’hydratation.', time: '09:10' },
    { id: 2, sender: 'dieteticien', text: 'Très bien, continuons ainsi et observons votre appétit.', time: '09:12' },
    { id: 3, sender: 'patient', text: 'Merci, je vais faire attention aux snacks entre les repas.', time: '09:14' },
  ],
  2: [
    { id: 1, sender: 'patient', text: 'Je souhaite revoir mon bilan alimentaire avant la semaine prochaine.', time: '08:30' },
    { id: 2, sender: 'dieteticien', text: 'Très bien, on peut ajuster vos portions et votre routine.', time: '08:35' },
  ],
  3: [
    { id: 1, sender: 'patient', text: 'Je me sens mieux mais j’aimerais contrôler mes glucides.', time: 'Yesterday' },
  ],
  4: [
    { id: 1, sender: 'dieteticien', text: 'Nous pouvons renforcer la planification de repas pour la semaine.', time: '09:00' },
  ],
};

const filters: { key: FilterType; label: string }[] = [
  { key: 'aujourdhui', label: 'Aujourd’hui' },
  { key: 'encours', label: 'En cours' },
  { key: 'avenir', label: 'À venir' },
  { key: 'passees', label: 'Passées' },
];

const toneClasses = {
  emerald: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100',
  sky: 'bg-sky-50 text-sky-700 ring-1 ring-sky-100',
  amber: 'bg-amber-50 text-amber-700 ring-1 ring-amber-100',
  rose: 'bg-rose-50 text-rose-700 ring-1 ring-rose-100',
};

const statusClasses: Record<ConsultationStatus, string> = {
  'En cours': 'bg-emerald-100 text-emerald-700',
  'À venir': 'bg-sky-100 text-sky-700',
  Terminée: 'bg-slate-200 text-slate-700',
};

export default function ConsultationInterface() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('aujourdhui');
  const [selectedConsultationId, setSelectedConsultationId] = useState<number>(1);
  const [viewMode, setViewMode] = useState<ViewMode>('dashboard');
  const [draftMessage, setDraftMessage] = useState('');
  const [messagesByConsultation, setMessagesByConsultation] = useState<Record<number, Message[]>>(initialMessagesByConsultation);

  const filteredConsultations = useMemo(() => {
    switch (activeFilter) {
      case 'encours':
        return consultations.filter((item) => item.status === 'En cours');
      case 'avenir':
        return consultations.filter((item) => item.status === 'À venir');
      case 'passees':
        return consultations.filter((item) => item.status === 'Terminée');
      case 'aujourdhui':
      default:
        return consultations.filter((item) => item.status !== 'Terminée');
    }
  }, [activeFilter]);

  useEffect(() => {
    if (!filteredConsultations.some((item) => item.id === selectedConsultationId)) {
      const fallback = filteredConsultations[0] ?? consultations[0];
      setSelectedConsultationId(fallback.id);
    }
  }, [filteredConsultations, selectedConsultationId]);

  const selectedConsultation =
    filteredConsultations.find((item) => item.id === selectedConsultationId) ??
    consultations.find((item) => item.id === selectedConsultationId) ??
    consultations[0];

  const handleSelectConsultation = (id: number) => {
    setSelectedConsultationId(id);
    setViewMode('chat');
  };

  const handleNewConsultation = () => {
    setActiveFilter('aujourdhui');
    setViewMode('dayList');
  };

  const handleSendMessage = () => {
    if (!draftMessage.trim()) return;

    const newMessage: Message = {
      id: Date.now(),
      sender: 'dieteticien',
      text: draftMessage.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessagesByConsultation((prev) => ({
      ...prev,
      [selectedConsultation.id]: [...(prev[selectedConsultation.id] ?? []), newMessage],
    }));

    setDraftMessage('');
  };

  const totalCounts = {
    all: consultations.length,
    enCours: consultations.filter((item) => item.status === 'En cours').length,
    aVenir: consultations.filter((item) => item.status === 'À venir').length,
    terminees: consultations.filter((item) => item.status === 'Terminée').length,
  };

  const todayConsultations = consultations.filter((item) => item.status !== 'Terminée');

  if (viewMode === 'dayList') {
    return (
      <div className="min-h-screen bg-slate-100 p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-5xl rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
          <div className="mb-5 flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600">Consultations du jour</p>
              <h2 className="mt-2 text-2xl font-black text-slate-900">Liste des rendez-vous</h2>
            </div>
            <button
              type="button"
              onClick={() => setViewMode('dashboard')}
              className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700"
            >
              Retour
            </button>
          </div>

          <div className="space-y-3">
            {todayConsultations.map((consultation) => (
              <button
                key={consultation.id}
                type="button"
                onClick={() => handleSelectConsultation(consultation.id)}
                className="flex w-full items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3 text-left transition hover:border-emerald-300 hover:bg-emerald-50/50"
              >
                <img src={consultation.avatar} alt={consultation.patient} className="h-12 w-12 rounded-full object-cover" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate text-sm font-bold text-slate-900">{consultation.patient}</p>
                    <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${statusClasses[consultation.status]}`}>
                      {consultation.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">{consultation.objectif}</p>
                  <div className="mt-1 flex flex-wrap gap-3 text-[11px] text-slate-500">
                    <span>{consultation.date}</span>
                    <span>{consultation.heure}</span>
                    <span>{consultation.duree}</span>
                  </div>
                </div>
                <span className="rounded-full bg-white px-3 py-2 text-xs font-bold text-slate-700 ring-1 ring-slate-200">
                  Ouvrir
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (viewMode === 'chat') {
    const currentMessages = messagesByConsultation[selectedConsultation.id] ?? [];

    return (
      <div className="min-h-screen bg-slate-100 p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <header className="flex items-center justify-between border-b border-slate-200 bg-emerald-50 px-4 py-4 sm:px-6">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setViewMode('dayList')}
                className="rounded-full bg-white px-3 py-2 text-xs font-bold text-slate-700 ring-1 ring-slate-200"
              >
                ← Retour
              </button>
              <img src={selectedConsultation.avatar} alt={selectedConsultation.patient} className="h-11 w-11 rounded-full object-cover" />
              <div>
                <h2 className="text-base font-black text-slate-900">{selectedConsultation.patient}</h2>
                <p className="text-xs text-slate-500">{selectedConsultation.objectif}</p>
              </div>
            </div>
            <span className={`rounded-full px-3 py-1 text-[10px] font-bold ${statusClasses[selectedConsultation.status]}`}>
              {selectedConsultation.status}
            </span>
          </header>

          <div className="space-y-4 bg-slate-50 p-4 sm:p-6">
            {currentMessages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'dieteticien' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm shadow-sm ${
                    message.sender === 'dieteticien'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-white text-slate-700 ring-1 ring-slate-200'
                  }`}
                >
                  <p>{message.text}</p>
                  <div className={`mt-1 text-[10px] ${message.sender === 'dieteticien' ? 'text-emerald-100' : 'text-slate-400'}`}>
                    {message.time}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-2 border-t border-slate-200 bg-white p-4 sm:p-5">
            <input
              value={draftMessage}
              onChange={(event) => setDraftMessage(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  handleSendMessage();
                }
              }}
              placeholder="Écrire un message au patient..."
              className="flex-1 rounded-full border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 focus:border-emerald-400 focus:outline-none"
            />
            <button
              type="button"
              onClick={handleSendMessage}
              className="rounded-full bg-emerald-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-emerald-700"
            >
              Envoyer
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="flex flex-col gap-4 rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-emerald-600">Cabinet nutrition</p>
            <h1 className="mt-2 text-2xl font-black text-slate-900 sm:text-3xl">Consultations</h1>
          </div>

          <div className="flex items-center gap-3">
            <button className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-100">
              Filtrer
            </button>
            <button
              type="button"
              onClick={handleNewConsultation}
              className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
            >
              + Nouvelle consultation
            </button>
          </div>
        </header>

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.id} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${toneClasses[stat.tone]}`}>
                  {stat.value}
                </span>
              </div>
              <div className="mt-5 flex items-end justify-between gap-3">
                <p className="text-3xl font-black text-slate-900">{stat.value}</p>
                <p className="text-xs font-medium text-slate-500">{stat.detail}</p>
              </div>
            </div>
          ))}
        </section>

        <section className="rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-200 sm:p-5">
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter.key}
                type="button"
                onClick={() => setActiveFilter(filter.key)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  activeFilter === filter.key
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.45fr_0.85fr]">
          <div className="space-y-5">
            <div className="rounded-3xl bg-linear-to-br from-emerald-50 via-white to-emerald-100 p-5 ring-1 ring-emerald-100 shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">Patient prioritaire</p>
                  <h2 className="mt-2 text-xl font-black text-slate-900">{selectedConsultation.patient}</h2>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-bold ${statusClasses[selectedConsultation.status]}`}>
                  {selectedConsultation.status}
                </span>
              </div>

              <div className="mt-5 grid gap-4 md:grid-cols-[auto_1fr] md:items-center">
                <img src={selectedConsultation.avatar} alt={selectedConsultation.patient} className="h-16 w-16 rounded-full object-cover ring-4 ring-white" />
                <div>
                  <p className="text-sm font-semibold text-slate-700">{selectedConsultation.objectif}</p>
                  <div className="mt-2 flex flex-wrap gap-3 text-xs text-slate-500">
                    <span>{selectedConsultation.date}</span>
                    <span>•</span>
                    <span>{selectedConsultation.heure}</span>
                    <span>•</span>
                    <span>{selectedConsultation.duree}</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 rounded-2xl bg-white/80 p-4 ring-1 ring-slate-200">
                <p className="text-sm font-semibold text-slate-700">Note de consultation</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">{selectedConsultation.note}</p>
              </div>
            </div>

            <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-black text-slate-900">Agenda du jour</h3>
                <span className="text-sm font-medium text-slate-500">{filteredConsultations.length} résultat(s)</span>
              </div>

              <div className="space-y-3">
                {filteredConsultations.map((consultation) => (
                  <div
                    key={consultation.id}
                    className={`flex flex-col gap-3 rounded-2xl border p-3 transition sm:flex-row sm:items-center ${
                      selectedConsultation.id === consultation.id
                        ? 'border-emerald-300 bg-emerald-50/60'
                        : 'border-slate-200 bg-slate-50 hover:border-emerald-200 hover:bg-emerald-50/40'
                    }`}
                  >
                    <img src={consultation.avatar} alt={consultation.patient} className="h-12 w-12 rounded-full object-cover" />

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <p className="truncate text-sm font-bold text-slate-900">{consultation.patient}</p>
                          <p className="text-xs text-slate-500">{consultation.objectif}</p>
                        </div>
                        <span className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold ${statusClasses[consultation.status]}`}>
                          {consultation.status}
                        </span>
                      </div>
                      <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-500">
                        <span>{consultation.date}</span>
                        <span>{consultation.heure}</span>
                        <span>{consultation.duree}</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleSelectConsultation(consultation.id)}
                      className="rounded-full bg-white px-3 py-2 text-xs font-bold text-slate-700 ring-1 ring-slate-200 transition hover:bg-slate-100"
                    >
                      Détails
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside className="space-y-5">
            <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-black text-slate-900">Calendrier</h3>
                <button className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-600">Août</button>
              </div>

              <div className="grid grid-cols-7 gap-2 text-center text-[10px] font-bold uppercase tracking-wide text-slate-400">
                {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((day) => (
                  <span key={day}>{day}</span>
                ))}
              </div>

              <div className="mt-3 grid grid-cols-7 gap-2 text-center text-sm text-slate-600">
                {Array.from({ length: 4 }).map((_, index) => (
                  <span key={`empty-${index}`} className="h-9" />
                ))}

                {Array.from({ length: 31 }, (_, index) => index + 1).map((day) => (
                  <button
                    key={day}
                    className={`flex h-9 items-center justify-center rounded-full text-sm font-semibold transition ${
                      day === 12
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'hover:bg-slate-100 text-slate-600'
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-3xl bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 p-5 text-white shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-300">Détails</p>

              <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center gap-3">
                  <img src={selectedConsultation.avatar} alt={selectedConsultation.patient} className="h-11 w-11 rounded-full object-cover ring-2 ring-white/20" />
                  <div>
                    <p className="text-sm font-bold">{selectedConsultation.patient}</p>
                    <p className="text-xs text-slate-300">{selectedConsultation.objectif}</p>
                  </div>
                </div>

                <div className="mt-4 space-y-3 text-sm text-slate-200">
                  <div className="flex justify-between gap-3">
                    <span>Date</span>
                    <span className="font-semibold text-white">{selectedConsultation.date}</span>
                  </div>
                  <div className="flex justify-between gap-3">
                    <span>Heure</span>
                    <span className="font-semibold text-white">{selectedConsultation.heure}</span>
                  </div>
                  <div className="flex justify-between gap-3">
                    <span>Durée</span>
                    <span className="font-semibold text-white">{selectedConsultation.duree}</span>
                  </div>
                  <div className="flex justify-between gap-3">
                    <span>Statut</span>
                    <span className="font-semibold text-white">{selectedConsultation.status}</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-300">Consultations</span>
                  <span className="text-lg font-black">{totalCounts.all}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-300">En cours</span>
                  <span className="text-lg font-black">{totalCounts.enCours}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-300">À venir</span>
                  <span className="text-lg font-black">{totalCounts.aVenir}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-300">Terminées</span>
                  <span className="text-lg font-black">{totalCounts.terminees}</span>
                </div>
              </div>
            </div>
          </aside>
        </section>
      </div>
    </div>
  );
}
