import React, { useState, useMemo } from "react";
// le statut du patient//
type Statut = "En progression" | "A surveiller";

interface Patient {
  uid: string; // identifiant interne unique, stable
  id: string; // Order ID affiché (peut se répéter)
  nom: string;
  age: number;
  Tel:string;
  evolution: string; // ex: "+2kg", "-1kg"
  statut: Statut;
  dateSuivi: string; // format YYYY-MM-DD
}

let uidCounter = 0;

function nextUid(): string {
  uidCounter += 1;
  return `uid-${uidCounter}`;
}
//patients de depart//

const initialPatients: Patient[] = [
  { uid: nextUid(), id: "#678", nom: "John Week", age: 45,Tel:"+237 657 456 432", evolution: "+2kg", statut: "En progression", dateSuivi: "2026-07-21" },
  { uid: nextUid(), id: "#098", nom: "Levie Akerman", age: 23,Tel:"+237 657 456 432", evolution: "-1kg", statut: "En progression", dateSuivi: "2026-09-01" },
  { uid: nextUid(), id: "#543", nom: "Eren Yeger", age: 39, Tel:"+237 657 456 432",evolution: "+2kg", statut: "A surveiller", dateSuivi: "2026-10-01" },
  { uid: nextUid(), id: "#678", nom: "Mikasa Arkermen", age: 45,Tel:"+237 657 456 432", evolution: "+2kg", statut: "En progression", dateSuivi: "2026-07-21" },
  { uid: nextUid(), id: "#098", nom: "Kibouchi Musane", age: 23,Tel:"+237 657 456 432", evolution: "-1kg", statut: "En progression", dateSuivi: "2026-09-01" },
  { uid: nextUid(), id: "#543", nom: "John Week", age: 39,Tel:"+237 657 456 432", evolution: "+2kg", statut: "A surveiller", dateSuivi: "2026-10-01" },
];
// GENERER UN ID ALEATOIRE//

function generateOrderId(): string {
  const n = Math.floor(100 + Math.random() * 900);
  return `#${n}`;
}
//OBTENIR LA DATE DU JOUR //

function todayIso(): string {
  const d = new Date();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${month}-${day}`;
}
//Satut du patients//
function StatusBadge({ statut }: { statut: Statut }) {
  const isConfirme = statut === "En progression";
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
        isConfirme ? "bg-green-100 text-green-700" : "bg-red-100 text-red-500"
      }`}
    >
      {statut}
    </span>
  );
}
//formulaire duu patient//
interface PatientForm {
  id: string;
  nom: string;
  age: string;
  Tel:string;
  evolution: string;
  statut: Statut;
  dateSuivi: string;
}

const emptyForm: PatientForm = {
  id: "",
  nom: "",
  age: "",
  Tel:"",
  evolution: "",
  statut: "A surveiller",
  dateSuivi: todayIso(),
};

type ModalMode = "create" | "view" | "edit" | null;

export default function PatientList() {
  const [patients, setPatients] = useState<Patient[]>(initialPatients);
  const [tableSearch, setTableSearch] = useState("");
  const [modalMode, setModalMode] = useState<ModalMode>(null);
  const [selectedUid, setSelectedUid] = useState<string | null>(null);
  const [form, setForm] = useState<PatientForm>(emptyForm);
  const [error, setError] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [openMenuUid, setOpenMenuUid] = useState<string | null>(null);

  const filteredPatients = useMemo(() => {
    const q = tableSearch.trim().toLowerCase();
    if (!q) return patients;
    return patients.filter((p) => {
      const matchesNom = p.nom.toLowerCase().includes(q);
      const matchesId = p.id.toLowerCase().includes(q);
      return matchesNom || matchesId;
    });
  }, [patients, tableSearch]);

  const selectedPatient = useMemo(
    () => patients.find((p) => p.uid === selectedUid) || null,
    [patients, selectedUid]
  );

  function openCreateModal() {
    setForm({ ...emptyForm, dateSuivi: todayIso() });
    setError(null);
    setSelectedUid(null);
    setConfirmDelete(false);
    setModalMode("create");
  }

  function openViewModal(p: Patient) {
    setSelectedUid(p.uid);
    setError(null);
    setConfirmDelete(false);
    setModalMode("view");
    setOpenMenuUid(null);
  }

  function switchToEdit(p: Patient) {
    setForm({
      id: p.id,
      nom: p.nom,
      age: String(p.age),
      evolution: p.evolution,
      Tel:String(p.Tel),
      statut: p.statut,
      dateSuivi: p.dateSuivi,
    });
    setError(null);
    setSelectedUid(p.uid);
    setModalMode("edit");
  }

  function closeModal() {
    setModalMode(null);
    setSelectedUid(null);
    setConfirmDelete(false);
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!form.nom.trim() || !form.age.trim() ||!form.Tel.trim() || !form.dateSuivi.trim()) {
      setError("Merci de remplir au minimum le nom, l'âge et la date du suivi.");
      return;
    }

    const ageNumber = parseInt(form.age, 10);
    if (Number.isNaN(ageNumber) || ageNumber <= 0) {
      setError("L'âge doit être un nombre valide.");
      return;
    }
     const cleanTel = form.Tel.trim().replace(/\s+/g, ""); 
  const phoneRegex = /^\d{9}$/; // Vérifie qu'il y a exactement 9 chiffres

  if (!phoneRegex.test(cleanTel)) {
    setError("Le numéro de téléphone doit contenir exactement 9 chiffres.");
    return;
  }

    if (modalMode === "create") {
      const newPatient: Patient = {
        uid: nextUid(),
        id: generateOrderId(),
        nom: form.nom.trim(),
        age: ageNumber,
        Tel:cleanTel,
        evolution: form.evolution.trim() || "—",
        statut: form.statut,
        dateSuivi: form.dateSuivi,
      };
      setPatients((prev) => [newPatient, ...prev]);
    } else if (modalMode === "edit" && selectedUid) {
      setPatients((prev) =>
        prev.map((p) =>
          p.uid === selectedUid
            ? {
                ...p,
                id: form.id.trim() || p.id,
                nom: form.nom.trim(),
                age: ageNumber,
                Tel:cleanTel,
                evolution: form.evolution.trim() || "—",
                statut: form.statut,
                dateSuivi: form.dateSuivi,
              }
            : p
        )
      );
    }

    closeModal();
  }

  function handleDelete() {
    if (!selectedUid) return;
    setPatients((prev) => prev.filter((p) => p.uid !== selectedUid));
    closeModal();
  }

/* -------------------
--------------DEBUT--------*/

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      {/* Title + Action */}
      <div className=" flex items-center justify-between my-3">
         <div>
        <h2 className='text-2xl font-bold text-slate-800 '>Gestion des patients</h2>
    </div>
        <button
          onClick={openCreateModal}
          className="rounded-full bg-green-700 px-5 py-2.5  text-sm font-semibold uppercase tracking-wide text-white shadow-sm hover:bg-green-600"
        >
          Nouveau patients
        </button>
      </div>

      {/* Table card */}
      <div className="rounded-xl bg-white p-5 shadow-sm">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-baseline gap-2">
            <h2 className="text-base font-semibold text-gray-800">Listes des patients</h2>
            <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-500">
              {patients.length} patient{patients.length > 1 ? "s" : ""} au total
            </span>
          </div>

          <div className="relative w-full max-w-xs">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            >
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
              <path d="M21 21l-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              value={tableSearch}
              onChange={(e) => setTableSearch(e.target.value)}
              placeholder="Rechercher par nom ou ID (#678)..."
              className="w-full rounded-lg border border-gray-200 bg-white py-2 pl-9 pr-3 text-sm text-gray-700 outline-none focus:border-green-400"
            />
          </div>
        </div>

        {tableSearch.trim() && (
          <p className="mb-3 text-xs text-gray-400">
            {filteredPatients.length} résultat{filteredPatients.length > 1 ? "s" : ""} sur {patients.length}
          </p>
        )}

        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] border-collapse text-sm">
            <thead>
              <tr className="text-left text-gray-700">
                <th className="pb-3 pr-4 font-xl">Order ID</th>
                <th className="pb-3 pr-4 font-xl">Nom du patients</th>
                <th className="pb-3 pr-4 font-xl">Age</th>
                 <th className="pb-3 pr-4 font-xl">Tel</th>
                <th className="pb-3 pr-4 font-xl">Evolution</th>
                <th className="pb-3 pr-4 font-xl">Statut</th>
                <th className="pb-3 pr-4 font-xl">Date du suivis</th>
                <th className="pb-3 font-normal"></th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.map((p) => (
                <tr key={p.uid} className="border-t border-gray-300 hover:bg-gray-50">
                  <td className="py-4 pr-4 text-gray-900">{p.id}</td>
                  <td className="py-4 pr-4 font-medium text-gray-700">{p.nom}</td>
                  <td className="py-4 pr-4 text-gray-900">{p.age} ans</td>
                  <td className="py-4 pr-4 text-gray-900">{p.Tel} </td>
                  <td className="py-4 pr-4 text-gray-900">{p.evolution}</td>
                  <td className="py-4 pr-4">
                    <StatusBadge statut={p.statut} />
                  </td>
                  <td className="py-4 pr-4 text-gray-900">{p.dateSuivi}</td>
                  <td className="relative py-4 text-gray-900">
                    <button
                      aria-label="Options"
                      onClick={() => setOpenMenuUid(openMenuUid === p.uid ? null : p.uid)}
                      className="rounded p-1 hover:bg-gray-200"
                    >
                      ⋯
                    </button>
                    {openMenuUid === p.uid && (
                      <div className="absolute right-0 z-10 mt-1 w-40 rounded-lg border border-gray-100 bg-white py-1 text-left text-sm shadow-lg">
                        <button
                          onClick={() => openViewModal(p)}
                          className="block w-full px-3 py-2 text-left text-gray-700 hover:bg-gray-50"
                        >
                          Voir le profil
                        </button>
                        <button
                          onClick={() => switchToEdit(p)}
                          className="block w-full px-3 py-2 text-left text-gray-700 hover:bg-gray-50"
                        >
                          Modifier
                        </button>
                        <button
                          onClick={() => {
                            setSelectedUid(p.uid);
                            setConfirmDelete(true);
                            setModalMode("view");
                            setOpenMenuUid(null);
                          }}
                          className="block w-full px-3 py-2 text-left text-red-500 hover:bg-red-50"
                        >
                          Supprimer
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
              {filteredPatients.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-gray-400">
                    Aucun patient ne correspond à votre recherche.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Nouveau patient / Profil / Edition */}
      {modalMode && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onClick={closeModal}
        >
          <div
            className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800">
                {modalMode === "create" && "Nouveau patient"}
                {modalMode === "view" && "Profil du patient"}
                {modalMode === "edit" && "Modifier le patient"}
              </h3>
              <button
                onClick={closeModal}
                aria-label="Fermer"
                className="rounded p-1 text-gray-400 hover:bg-gray-100"
              >
                ✕
              </button>
            </div>

            {/* Mode VIEW : profil en lecture seule + confirmation suppression */}
            {modalMode === "view" && selectedPatient && (
              <div className="space-y-4">
                {confirmDelete ? (
                  <div className="space-y-4">
                    <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                      Voulez-vous vraiment supprimer <strong>{selectedPatient.nom}</strong> ? Cette action est
                      irréversible.
                    </div>
                    <div className="flex justify-end gap-3">
                      <button
                        onClick={() => setConfirmDelete(false)}
                        className="rounded-full border border-gray-200 px-5 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50"
                      >
                        Annuler
                      </button>
                      <button
                        onClick={handleDelete}
                        className="rounded-full bg-red-500 px-5 py-2 text-sm font-semibold text-white hover:bg-red-600"
                      >
                        Confirmer la suppression
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
                      <div>
                        <dt className="text-xs font-medium text-gray-900">Order ID</dt>
                        <dd className="text-gray-800">{selectedPatient.id}</dd>
                      </div>
                      <div>
                        <dt className="text-xs font-medium text-gray-900">Nom du patient</dt>
                        <dd className="text-gray-800">{selectedPatient.nom}</dd>
                      </div>
                      <div>
                        <dt className="text-xs font-medium text-gray-900">Age</dt>
                        <dd className="text-gray-800">{selectedPatient.age} ans</dd>
                      </div>
                      <div>
                        <dt className="text-xs font-medium text-gray-900">Tel</dt>
                        <dd className="text-gray-800">{selectedPatient.Tel} </dd>
                      </div>
                      <div>
                        <dt className="text-xs font-medium text-gray-900">Evolution</dt>
                        <dd className="text-gray-800">{selectedPatient.evolution}</dd>
                      </div>
                      <div>
                        <dt className="text-xs font-medium text-gray-900">Statut</dt>
                        <dd>
                          <StatusBadge statut={selectedPatient.statut} />
                        </dd>
                      </div>
                      <div>
                        <dt className="text-xs font-medium text-gray-900">Date du suivi</dt>
                        <dd className="text-gray-900">{selectedPatient.dateSuivi}</dd>
                      </div>
                    </dl>

                    <div className="flex justify-end gap-3 pt-2">
                      <button
                        onClick={() => setConfirmDelete(true)}
                        className="rounded-full border border-red-200 px-5 py-2 text-sm font-medium text-red-500 hover:bg-red-50"
                      >
                        Supprimer
                      </button>
                      <button
                        onClick={() => switchToEdit(selectedPatient)}
                        className="rounded-full bg-green-500 px-5 py-2 text-sm font-semibold text-white hover:bg-green-600"
                      >
                        Modifier
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Mode CREATE / EDIT : formulaire */}


            {(modalMode === "create" || modalMode === "edit") && (
              <form onSubmit={handleSubmit} className="space-y-4">
                {modalMode === "edit" && (
                  <div>
                    <label className="mb-1 block text-xs font-medium text-gray-900">Order ID</label>
                    <input
                      name="id"
                      value={form.id}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-500 outline-none focus:border-green-400"
                    />
                  </div>
                )}

                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-900">
                    Nom du patient
                  </label>
                  <input
                    name="nom"
                    required
                    value={form.nom}
                    onChange={handleChange}
                    placeholder=" Jean Dupont"
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-green-400"
                  />
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="text-xs font-medium text-gray-900">
                      Age 
                    </label>
                    <input
                      name="age"
                      type="number"
                      required
                      min={0}
                      value={form.age}
                      onChange={handleChange}
                      placeholder=" 30 ans"
                      className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-green-400"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-gray-900">Evolution</label>
                    <input
                      name="evolution"
                      value={form.evolution}
                      onChange={handleChange}
                      placeholder="Ex : +2kg"
                      className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-green-400"
                    />
                  </div>
                     <div>
                    <label className="mb-1 block text-xs font-medium text-gray-900">
                      Tel 
                    </label>
                    <input
                      name="tel"
                      type="tel"
                      required
                      value={form.Tel}
                      onChange={handleChange}
                      placeholder="Tel : 6xx xxx xxx"
                      className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-green-400"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-1 block text-xs font-medium text-gray-900">Statut</label>
                    <select
                      name="statut"
                      value={form.statut}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-green-400"
                    >
                      <option value="En attente">En progression</option>
                      <option value="Confirmé">A surveiller</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-gray-900">Date du suivi</label>
                    <input
                      name="dateSuivi"
                      type="date"
                      value={form.dateSuivi}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-green-400"
                    />
                  </div>
                </div>

                {error && (
                  <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
                    {error}
                  </div>
                )}

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="rounded-full border border-gray-200 px-5 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="rounded-full bg-green-500 px-5 py-2 text-sm font-semibold text-white hover:bg-green-600"
                  >
                    {modalMode === "create" ? "Ajouter" : "Enregistrer les modifications"}
                  </button>
                </div>
                </div>
              </form>

            )}
          </div>
          </div>
      )}
    </div>
  );
}
