import { useMemo, useState } from 'react';

// Valeurs utilisées pour classer les objectifs et les repas.
type GoalType = 'perte' | 'prise' | 'equilibre' | 'diabetique' | 'sport';
type MealType = 'Petit déjeuner' | 'Déjeuner' | 'Collation' | 'Dîner';

// Données issues du compte rendu de consultation du patient.
type ConsultationReport = {
  patient: string;
  objectif: string;
  age: number;
  poids: number;
  taille: number;
  imc: number;
  besoin: string;
  allergies: string[];
  preferences: string[];
  contraintes: string[];
  habitudes: string[];
};

// Structure modifiable d'un repas dans le plan alimentaire.
type MealPlan = {
  id: number;
  type: MealType;
  title: string;
  items: string[];
  calories: number;
  note: string;
};

// Patients de démonstration et informations nutritionnelles associées.
const consultationReports: ConsultationReport[] = [
  {
    patient: 'Mme Fanta Diallo',
    objectif: 'Perte de poids progressive',
    age: 29,
    poids: 72,
    taille: 1.68,
    imc: 25.5,
    besoin: 'Réduire les grignotages et améliorer l’équilibre alimentaire',
    allergies: ['Arachides'],
    preferences: ['Légumes verts', 'Poisson', 'Fruit'],
    contraintes: ['Pas de temps le matin', 'Repas de midi rapide'],
    habitudes: ['Petit déjeuner léger', 'Dîner tardif'],
  },
  {
    patient: 'M. Ibrahim Souley',
    objectif: 'Prise de masse musculaire',
    age: 34,
    poids: 63,
    taille: 1.74,
    imc: 20.8,
    besoin: 'Augmenter l’apport énergétique et la récupération post-entraînement',
    allergies: [],
    preferences: ['Viande blanche', 'Riz', 'Avocat'],
    contraintes: ['Travail très chargé', 'Pas de repas trop lourds'],
    habitudes: ['Sport 4 fois/semaine', 'Snacking avant entraînement'],
  },
  {
    patient: 'Mme Salif N’Gouma',
    objectif: 'Contrôle glycémique',
    age: 42,
    poids: 80,
    taille: 1.62,
    imc: 30.5,
    besoin: 'Stabiliser la glycémie et réduire les pics de faim',
    allergies: ['Lactose'],
    preferences: ['Quinoa', 'Légumineuses', 'Yaourt végétal'],
    contraintes: ['Hyperglycémie', 'Faim le soir'],
    habitudes: ['Grignotage sucré', 'Mauvaise hydratation'],
  },
];

// Couleurs d'affichage utilisées pour les différents objectifs.
const goalStyles: Record<GoalType, string> = {
  perte: 'bg-rose-50 text-rose-700 ring-1 ring-rose-100',
  prise: 'bg-amber-50 text-amber-700 ring-1 ring-amber-100',
  equilibre: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100',
  diabetique: 'bg-sky-50 text-sky-700 ring-1 ring-sky-100',
  sport: 'bg-violet-50 text-violet-700 ring-1 ring-violet-100',
};

// Modèles de plans générés selon l'objectif nutritionnel.
const defaultPlans: Record<GoalType, MealPlan[]> = {
  perte: [
    { id: 1, type: 'Petit déjeuner', title: 'Petit déjeuner léger', items: ['Yaourt grec 0% + fruits', 'Noix de cajou', 'Thé vert'], calories: 320, note: 'Réduit le risque de grignotage.' },
    { id: 2, type: 'Déjeuner', title: 'Repas équilibré', items: ['Poulet grillé', 'Salade verte', 'Quinoa', '1/2 avocat'], calories: 540, note: 'Protéines + fibres pour la satiété.' },
    { id: 3, type: 'Collation', title: 'Collation saine', items: ['Pomme', 'Fromage blanc'], calories: 180, note: 'À prendre en milieu d’après-midi.' },
    { id: 4, type: 'Dîner', title: 'Dîner léger', items: ['Poisson au four', 'Légumes vapeur', 'Petit bol de riz complet'], calories: 470, note: 'Favorise un dîner plus digestif.' },
  ],
  prise: [
    { id: 1, type: 'Petit déjeuner', title: 'Petit déjeuner énergisant', items: ['Avoine', 'Lait végétal', 'Banane', 'Amandes'], calories: 520, note: 'Assure un bon départ calorique.' },
    { id: 2, type: 'Déjeuner', title: 'Repas à forte densité nutritionnelle', items: ['Poulet + riz', 'Pois chiches', 'Légumes', 'Huile d’olive'], calories: 700, note: 'Apport calorique important sans déséquilibre.' },
    { id: 3, type: 'Collation', title: 'Collation de récupération', items: ['Smoothie banane + lait', 'Pain complet', 'Beurre de cacahuète'], calories: 400, note: 'Idéal avant ou après sport.' },
    { id: 4, type: 'Dîner', title: 'Dîner reconstituant', items: ['Viande maigre', 'Pommes de terre', 'Légumes', 'Huile'], calories: 630, note: 'Aide à la masse musculaire.' },
  ],
  equilibre: [
    { id: 1, type: 'Petit déjeuner', title: 'Petit déjeuner équilibré', items: ['Oatmeal', 'Fruits', 'Noix'], calories: 400, note: 'Bonne base énergétique.' },
    { id: 2, type: 'Déjeuner', title: 'Menu varié', items: ['Poisson', 'Légumes', 'Céréales complètes'], calories: 560, note: 'Régularise la digestion.' },
    { id: 3, type: 'Collation', title: 'Collation douce', items: ['Fruit frais', 'huile de graines'], calories: 220, note: 'Légère et rassasiante.' },
    { id: 4, type: 'Dîner', title: 'Dîner stable', items: ['Volaille', 'Salade', 'Riz complet'], calories: 520, note: 'Favorise l’équilibre global.' },
  ],
  diabetique: [
    { id: 1, type: 'Petit déjeuner', title: 'Petit déjeuner stable', items: ['Oeufs', 'Légumes', 'Pain complet'], calories: 360, note: 'Faible index glycémique.' },
    { id: 2, type: 'Déjeuner', title: 'Repas rassasiant', items: ['Poulet', 'Quinoa', 'Salade verte'], calories: 500, note: 'Réduit les pics glycémiques.' },
    { id: 3, type: 'Collation', title: 'Collation contrôlée', items: ['Pomme', 'Noix'], calories: 150, note: 'Sans sucre ajouté.' },
    { id: 4, type: 'Dîner', title: 'Dîner modéré', items: ['Poisson', 'Légumes verts', 'Patate douce'], calories: 480, note: 'Alternative énergétique stable.' },
  ],
  sport: [
    { id: 1, type: 'Petit déjeuner', title: 'Petit déjeuner pré-entraînement', items: ['Banane', 'Avoine', 'Yaourt'], calories: 450, note: 'Fuel avant effort.' },
    { id: 2, type: 'Déjeuner', title: 'Repas post-entraînement', items: ['Poulet', 'Riz', 'Légumes', 'Avocat'], calories: 620, note: 'Aide à la récupération.' },
    { id: 3, type: 'Collation', title: 'Collation de performance', items: ['Smoothie protéines', 'Fruit'], calories: 260, note: 'Restaure les réserves.' },
    { id: 4, type: 'Dîner', title: 'Dîner de récupération', items: ['Saumon', 'Patates douces', 'Salade'], calories: 600, note: 'Apport nutritionnel complet.' },
  ],
};

// Copie un plan pour éviter de modifier directement les modèles par défaut.
const clonePlan = (plan: MealPlan[]) => plan.map((meal) => ({ ...meal, items: [...meal.items] }));

// Déduit la catégorie nutritionnelle à partir de l'objectif du patient.
const getGoalType = (objectif: string): GoalType => {
  const text = objectif.toLowerCase();
  if (text.includes('perte')) return 'perte';
  if (text.includes('prise') || text.includes('masse')) return 'prise';
  if (text.includes('diab')) return 'diabetique';
  if (text.includes('sport') || text.includes('muscle')) return 'sport';
  return 'equilibre';
};

// Images affichées dans la vue du plan enregistré.
const mealImages: Record<MealType, string> = {
  'Petit déjeuner': 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=900&q=80',
  Déjeuner: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80',
  Collation: 'https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?auto=format&fit=crop&w=900&q=80',
  Dîner: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80',
};

export default function PlanAlimentaire() {
  // Etat de navigation, d'aperçu et de confirmation d'enregistrement.
  const [selectedPatientIndex, setSelectedPatientIndex] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const [savedMessage, setSavedMessage] = useState('');

  // Plans indépendants conservés pour chaque patient.
  const [mealPlans, setMealPlans] = useState<Record<string, MealPlan[]>>({
    'Mme Fanta Diallo': clonePlan(defaultPlans.perte),
    'M. Ibrahim Souley': clonePlan(defaultPlans.prise),
    'Mme Salif N’Gouma': clonePlan(defaultPlans.diabetique),
  });

  // Patient actif et plan affiché dans l'éditeur.
  const selectedPatient = consultationReports[selectedPatientIndex];
  const patientGoal = getGoalType(selectedPatient.objectif);
  const plan = mealPlans[selectedPatient.patient] ?? clonePlan(defaultPlans[patientGoal]);

  // Calcul du résumé en fonction des valeurs modifiées par le diététicien.
  const summary = useMemo(() => {
    const totalCalories = plan.reduce((sum, meal) => sum + Number(meal.calories || 0), 0);
    return {
      totalCalories,
      meals: plan.length,
      notes: selectedPatient.besoin,
    };
  }, [plan, selectedPatient.besoin]);

  // Modifie le type, le titre, les calories ou la note d'un repas.
  const updateMealField = (
    mealId: number,
    field: 'type' | 'title' | 'calories' | 'note',
    value: string | number,
  ) => {
    setMealPlans((previous) => ({
      ...previous,
      [selectedPatient.patient]: (previous[selectedPatient.patient] ?? plan).map((meal) =>
        meal.id === mealId ? { ...meal, [field]: value } : meal,
      ),
    }));
  };

  // Modifie le nom d'un aliment dans la composition d'un repas.
  const updateMealItem = (mealId: number, itemIndex: number, value: string) => {
    setMealPlans((previous) => ({
      ...previous,
      [selectedPatient.patient]: (previous[selectedPatient.patient] ?? plan).map((meal) => {
        if (meal.id !== mealId) return meal;

        const nextItems = [...meal.items];
        nextItems[itemIndex] = value;

        return { ...meal, items: nextItems };
      }),
    }));
  };

  // Ajoute un champ aliment vide dans le repas sélectionné.
  const addMealItem = (mealId: number) => {
    setMealPlans((previous) => ({
      ...previous,
      [selectedPatient.patient]: (previous[selectedPatient.patient] ?? plan).map((meal) =>
        meal.id === mealId ? { ...meal, items: [...meal.items, 'Nouvel aliment'] } : meal,
      ),
    }));
  };

  // Supprime un aliment de la composition du repas.
  const removeMealItem = (mealId: number, itemIndex: number) => {
    setMealPlans((previous) => ({
      ...previous,
      [selectedPatient.patient]: (previous[selectedPatient.patient] ?? plan).map((meal) => {
        if (meal.id !== mealId) return meal;

        return { ...meal, items: meal.items.filter((_, index) => index !== itemIndex) };
      }),
    }));
  };

  // Confirme l'enregistrement et affiche immédiatement le plan final.
  const handleSavePlan = () => {
    setSavedMessage(`Plan enregistré pour ${selectedPatient.patient}.`);
    setShowPreview(true);
  };

  return (
    <div className="w-full bg-slate-100 p-4 sm:p-6 lg:p-8">
      <div className="w-full space-y-5">
        {/* En-tête de la page et actions principales. */}
        <header className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600">Plan alimentaire</p>
              <h1 className="mt-2 text-2xl font-black text-slate-900 sm:text-3xl">Programmation nutritionnelle</h1>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setShowPreview((value) => !value)}
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
              >
                {showPreview ? 'Masquer l’aperçu' : 'Voir l’aperçu'}
              </button>

              <button
                type="button"
                onClick={handleSavePlan}
                className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
              >
                Enregistrer
              </button>
            </div>
          </div>

          {savedMessage && (
            <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
              {savedMessage}
            </div>
          )}
        </header>

        {/* Navigation des patients et contenu du plan actif. */}
        <section className="grid items-start gap-5 xl:grid-cols-[minmax(220px,280px)_minmax(0,1fr)]">
          {/* Liste compacte des patients disponibles. */}
          <aside className="h-fit rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-black text-slate-900">Patients</h2>
              <span className="rounded-full bg-slate-100 px-2 py-1 text-[10px] font-bold uppercase text-slate-600">
                {consultationReports.length}
              </span>
            </div>

            <div className="space-y-3">
              {consultationReports.map((patient, index) => {
                const patientGoalType = getGoalType(patient.objectif);

                return (
                  <button
                    key={patient.patient}
                    type="button"
                    onClick={() => {
                      setSelectedPatientIndex(index);
                      setSavedMessage('');
                    }}
                    className={`w-full rounded-2xl border p-3 text-left transition ${
                      selectedPatientIndex === index
                        ? 'border-emerald-300 bg-emerald-50'
                        : 'border-slate-200 bg-slate-50 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-bold text-slate-900">{patient.patient}</p>
                        <p className="text-xs text-slate-500">{patient.objectif}</p>
                      </div>

                      <span className={`rounded-full px-2 py-1 text-[10px] font-bold ${goalStyles[patientGoalType]}`}>
                        {patient.objectif}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </aside>

          <main className="space-y-5 xl:space-y-0 xl:contents">
            {/* Profil et indicateurs principaux du patient sélectionné. */}
            <section className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200 xl:col-start-2 xl:row-start-2">
              <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Patient sélectionné</p>
                  <h2 className="mt-2 text-xl font-black text-slate-900">{selectedPatient.patient}</h2>
                </div>

                <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${goalStyles[patientGoal]}`}>
                  {selectedPatient.objectif}
                </span>
              </div>

              <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <div className="rounded-2xl bg-slate-50 p-3">
                  <p className="text-xs text-slate-500">Âge</p>
                  <p className="mt-2 text-xl font-black text-slate-900">{selectedPatient.age} ans</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-3">
                  <p className="text-xs text-slate-500">Poids</p>
                  <p className="mt-2 text-xl font-black text-slate-900">{selectedPatient.poids} kg</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-3">
                  <p className="text-xs text-slate-500">Taille</p>
                  <p className="mt-2 text-xl font-black text-slate-900">{selectedPatient.taille} m</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-3">
                  <p className="text-xs text-slate-500">IMC</p>
                  <p className="mt-2 text-xl font-black text-slate-900">{selectedPatient.imc}</p>
                </div>
              </div>
            </section>

            {/* Besoins issus de la consultation et résumé calorique. */}
            <section className="grid gap-5 xl:col-start-2 xl:row-start-3 xl:grid-cols-[1.1fr_0.9fr]">
              <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
                <h3 className="text-lg font-black text-slate-900">Besoins observés</h3>

                <div className="mt-5 space-y-4 text-sm text-slate-600">
                  <div className="rounded-2xl bg-emerald-50 p-4 ring-1 ring-emerald-100">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-700">Besoin principal</p>
                    <p className="mt-2 leading-6">{selectedPatient.besoin}</p>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Allergies</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {selectedPatient.allergies.length ? (
                          selectedPatient.allergies.map((entry) => (
                            <span key={entry} className="rounded-full bg-white px-2.5 py-1 text-xs font-medium text-slate-700 ring-1 ring-slate-200">
                              {entry}
                            </span>
                          ))
                        ) : (
                          <span className="text-xs text-slate-500">Aucune allergie signalée</span>
                        )}
                      </div>
                    </div>

                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Préférences</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {selectedPatient.preferences.map((entry) => (
                          <span key={entry} className="rounded-full bg-white px-2.5 py-1 text-xs font-medium text-slate-700 ring-1 ring-slate-200">
                            {entry}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Contraintes</p>
                      <ul className="mt-3 space-y-2">
                        {selectedPatient.contraintes.map((entry) => (
                          <li key={entry} className="flex items-start gap-2 text-xs">
                            <span className="mt-1 h-2 w-2 rounded-full bg-emerald-500" />
                            <span>{entry}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Habitudes</p>
                      <ul className="mt-3 space-y-2">
                        {selectedPatient.habitudes.map((entry) => (
                          <li key={entry} className="flex items-start gap-2 text-xs">
                            <span className="mt-1 h-2 w-2 rounded-full bg-sky-500" />
                            <span>{entry}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl bg-slate-900 p-5 text-white shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-300">Résumé</p>
                <div className="mt-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-300">Calories totales</span>
                    <span className="text-2xl font-black">{summary.totalCalories} kcal</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-300">Repas</span>
                    <span className="text-lg font-bold">{summary.meals}</span>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-300">Recommandation</p>
                    <p className="mt-2 text-sm leading-6 text-slate-200">{summary.notes}</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Editeur des repas, aliments, calories et notes. */}
            <section className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200 xl:col-start-2 xl:row-start-1">
              <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-lg font-black text-slate-900">Plan alimentaire modifiable</h3>
                  <p className="mt-1 text-sm text-slate-500">Adaptez chaque repas selon les besoins du patient.</p>
                </div>

                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 ring-1 ring-emerald-100">
                  {patientGoal.toUpperCase()}
                </span>
              </div>

              <div className="grid grid-cols-1 gap-5">
                {plan.map((meal) => (
                  <div key={meal.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <div className="mb-4 flex items-center justify-between gap-3">
                      <select
                        value={meal.type}
                        onChange={(event) => updateMealField(meal.id, 'type', event.target.value)}
                        className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 outline-none ring-0 focus:border-emerald-300"
                      >
                        {['Petit déjeuner', 'Déjeuner', 'Collation', 'Dîner'].map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>

                      <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-2 py-2">
                        <input
                          type="number"
                          value={meal.calories}
                          onChange={(event) => updateMealField(meal.id, 'calories', Number(event.target.value) || 0)}
                          className="w-20 bg-transparent text-right text-sm font-bold text-slate-800 outline-none"
                        />
                        <span className="text-xs font-medium text-slate-500">kcal</span>
                      </div>
                    </div>

                    <label className="block text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Titre du repas</label>
                    <input
                      type="text"
                      value={meal.title}
                      onChange={(event) => updateMealField(meal.id, 'title', event.target.value)}
                      className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none focus:border-emerald-300"
                    />

                    <div className="mt-4">
                      <label className="block text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Composition</label>
                      <div className="mt-2 space-y-2">
                        {meal.items.map((item, index) => (
                          <div key={`${meal.id}-${index}`} className="flex items-center gap-2">
                            <input
                              type="text"
                              value={item}
                              onChange={(event) => updateMealItem(meal.id, index, event.target.value)}
                              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-emerald-300"
                            />

                            <button
                              type="button"
                              onClick={() => removeMealItem(meal.id, index)}
                              className="rounded-lg border border-red-200 bg-red-50 px-2 py-2 text-xs font-semibold text-red-600 hover:bg-red-100"
                            >
                              ✕
                            </button>
                          </div>
                        ))}
                      </div>

                      <button
                        type="button"
                        onClick={() => addMealItem(meal.id)}
                        className="mt-3 rounded-full border border-dashed border-emerald-300 bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700 hover:bg-emerald-100"
                      >
                        + Ajouter un aliment
                      </button>
                    </div>

                    <div className="mt-4">
                      <label className="block text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Note</label>
                      <textarea
                        value={meal.note}
                        onChange={(event) => updateMealField(meal.id, 'note', event.target.value)}
                        rows={3}
                        className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-emerald-300"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Vue finale du plan enregistré avec les photos des repas. */}
            {showPreview && (
              <section className="rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-200 sm:p-5 xl:col-start-1 xl:row-start-2">
                <div className="flex flex-col gap-1 border-b border-slate-100 pb-4 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600">Plan enregistré</p>
                    <h3 className="mt-1 text-lg font-black text-slate-900">Repas de {selectedPatient.patient}</h3>
                  </div>
                  <p className="text-sm text-slate-500">{summary.totalCalories} kcal au total</p>
                </div>

                <div className="mt-4 grid grid-cols-1 gap-4">
                  {plan.map((meal) => (
                    <article key={`preview-${meal.id}`} className="flex h-full flex-col rounded-2xl bg-slate-50 p-3 ring-1 ring-slate-200">
                      <img
                        src={mealImages[meal.type]}
                        alt={meal.type}
                        className="h-32 w-full rounded-xl object-cover"
                      />

                      <div className="mt-3 flex items-center justify-between gap-2">
                        <p className="text-sm font-black text-slate-900">{meal.type}</p>
                        <span className="shrink-0 text-xs font-bold text-slate-500">{meal.calories} kcal</span>
                      </div>

                      <h4 className="mt-2 text-sm font-bold leading-5 text-slate-800">{meal.title}</h4>

                      <ul className="mt-3 flex-1 space-y-1.5 text-sm text-slate-600">
                        {meal.items.map((item, index) => (
                          <li key={`${meal.id}-saved-item-${index}`} className="flex items-start gap-2">
                            <span className="mt-1 h-2 w-2 rounded-full bg-emerald-500" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>

                      <p className="mt-3 rounded-xl bg-white px-3 py-2 text-xs leading-5 text-slate-600 ring-1 ring-slate-200">
                        {meal.note}
                      </p>
                    </article>
                  ))}
                </div>
              </section>
            )}
          </main>
        </section>
      </div>
    </div>
  );
}
