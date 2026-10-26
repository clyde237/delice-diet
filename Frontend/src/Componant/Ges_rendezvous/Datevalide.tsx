import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Save,  } from 'lucide-react';

interface PlageHoraire {
  debut: string;
  fin: string;
}

interface Jour {
  nom: string;
  disponible: boolean;
  plages: PlageHoraire[];
}

const jourInitiaux: Jour[] = [
  { nom: 'Lundi', disponible: true, plages: [{ debut: '08:00', fin: '17:00' }] },
  { nom: 'Mardi', disponible: true, plages: [{ debut: '08:00', fin: '17:00' }] },
  { nom: 'Mercredi', disponible: true, plages: [{ debut: '08:00', fin: '17:00' }] },
  { nom: 'Jeudi', disponible: true, plages: [{ debut: '08:00', fin: '17:00' }] },
  { nom: 'Vendredi', disponible: true, plages: [{ debut: '08:00', fin: '17:00' }] },
  { nom: 'Samedi', disponible: true, plages: [{ debut: '08:00', fin: '17:00' }] },
  { nom: 'Dimanche', disponible: true, plages: [{ debut: '08:00', fin: '17:00' }] },
];

export default function Datevalide() {
  const [jours, setJours] = useState<Jour[]>(jourInitiaux);
  const [disponibilitesEnregistrees, setDisponibilitesEnregistrees] = useState<Jour[]>([]);

  // Charger les données sauvegardées au démarrage de la page
  useEffect(() => {
    const sauvegarde = localStorage.getItem('disponibilitesDieteticien');
    if (sauvegarde) {
      const donneesParsees = JSON.parse(sauvegarde);
      setJours(donneesParsees);
      setDisponibilitesEnregistrees(donneesParsees);
    }
  }, []);

  // Activer ou désactiver un jour
  const changerDisponibilite = (index: number) => {
    setJours(
      jours.map((j, i) => (i === index ? { ...j, disponible: !j.disponible } : j))
    );
  };

  // Modifier une heure au format texte (ex: 08:30)
  const modifierHeure = (
    jourIndex: number,
    plageIndex: number,
    type: 'debut' | 'fin',
    valeur: string
  ) => {
    setJours(
      jours.map((j, ji) => {
        if (ji !== jourIndex) return j;
        const nouvellesPlages = j.plages.map((p, pi) =>
          pi === plageIndex ? { ...p, [type]: valeur } : p
        );
        return { ...j, plages: nouvellesPlages };
      })
    );
  };

  // Ajouter une nouvelle plage horaire
  const ajouterPlage = (jourIndex: number) => {
    setJours(
      jours.map((j, i) =>
        i === jourIndex
          ? { ...j, plages: [...j.plages, { debut: '14:00', fin: '17:00' }] }
          : j
      )
    );
  };

  // Supprimer une plage horaire
  const supprimerPlage = (jourIndex: number, plageIndex: number) => {
    setJours(
      jours.map((j, i) =>
        i === jourIndex
          ? { ...j, plages: j.plages.filter((_, pi) => pi !== plageIndex) }
          : j
      )
    );
  };

  // Enregistrer les disponibilités
  const enregistrerDisponibilites = () => {
    localStorage.setItem('disponibilitesDieteticien', JSON.stringify(jours));
    setDisponibilitesEnregistrees(jours); // Met à jour l'affichage en bas instantanément
    
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto p-4">
      {/* SECTION 1 : Formulaire de définition des horaires */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
        {/* Titre */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-slate-900">
            Définir mes jours et heures disponibles
          </h2>
        
        </div>

        {/* Les 7 jours */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-3">
          {jours.map((jour, jourIndex) => (
            <div
              key={jour.nom}
              className={`rounded-xl border p-4 transition flex flex-col justify-between ${
                jour.disponible ? 'border-green-200 bg-white shadow-sm' : 'border-gray-200 bg-gray-50 opacity-70'
              }`}
            >
              <div>
                {/* Nom du jour */}
                <div className="flex items-center gap-2 mb-4">
                  <input
                    type="checkbox"
                    checked={jour.disponible}
                    onChange={() => changerDisponibilite(jourIndex)}
                    className="w-5 h-5 accent-green-700 cursor-pointer"
                  />
                  <span className="font-semibold text-gray-800">{jour.nom}</span>
                </div>

                {/* Plages horaires */}
                <div className="space-y-3">
                  {jour.plages.map((plage, plageIndex) => (
                    <div key={plageIndex} className="flex items-center gap-1">
                      {/* Heure début */}
                      <input
                        type="text"
                        placeholder="08:00"
                        maxLength={5}
                        value={plage.debut}
                        disabled={!jour.disponible}
                        onChange={(e) =>
                          modifierHeure(jourIndex, plageIndex, 'debut', e.target.value)
                        }
                        className="w-full min-w-0 border border-gray-200 rounded-lg px-2 py-1.5 text-center text-sm disabled:bg-gray-100 disabled:text-gray-400 focus:outline-none focus:border-green-600"
                      />
                      <span className="text-gray-400 text-xs">-</span>

                      {/* Heure fin */}
                      <input
                        type="text"
                        placeholder="17:00"
                        maxLength={5}
                        value={plage.fin}
                        disabled={!jour.disponible}
                        onChange={(e) =>
                          modifierHeure(jourIndex, plageIndex, 'fin', e.target.value)
                        }
                        className="w-full min-w-0 border border-gray-200 rounded-lg px-2 py-1.5 text-center text-sm disabled:bg-gray-100 disabled:text-gray-400 focus:outline-none focus:border-green-600"
                      />

                      {/* Supprimer */}
                      {jour.plages.length > 1 && (
                        <button
                          type="button"
                          onClick={() => supprimerPlage(jourIndex, plageIndex)}
                          className="text-red-500 hover:text-red-700 p-1 shrink-0"
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Bouton Ajouter */}
              <div className="flex justify-center mt-4">
                <button
                  type="button"
                  disabled={!jour.disponible}
                  onClick={() => ajouterPlage(jourIndex)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg bg-green-50 text-green-700 hover:bg-green-100 disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bouton enregistrer */}
        <div className="flex justify-end mt-6">
          <button
            type="button"
            onClick={enregistrerDisponibilites}
            className="flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white px-5 py-2.5 rounded-lg font-medium shadow-sm transition cursor-pointer"
          >
            <Save size={18} />
            Enregistrer les disponibilités
          </button>
        </div>
      </div>

      {/* SECTION 2 : Affichage dynamique des horaires enregistrés */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-4 border-b border-slate-200 pb-3">
        
          <h3 className="text-lg font-bold text-slate-900">Vos horaires de consultation enregistrés</h3>
        </div>

        {disponibilitesEnregistrees.length === 0 ? (
          <p className="text-gray-500 text-sm italic">Aucun horaire enregistré pour le moment. 
          Définissez vos heures et cliquez sur Enregistrer.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {disponibilitesEnregistrees.map((jour) => (
              <div key={jour.nom} className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-slate-800">{jour.nom}</span>
                  <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${
                    jour.disponible ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {jour.disponible ? 'Disponible' : 'Fermé'}
                  </span>
                </div>
                
                <div className="space-y-1">
                  {jour.disponible ? (
                    jour.plages.map((plage, idx) => (
                      <div key={idx} className="text-sm text-slate-600 font-medium">
                        • {plage.debut} à {plage.fin}
                      </div>
                    ))
                  ) : (
                    <div className="text-sm text-gray-400 italic">Pas de rendez vous</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
