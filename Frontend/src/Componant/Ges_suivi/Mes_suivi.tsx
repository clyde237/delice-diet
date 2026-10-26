
import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
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
  { uid: nextUid(), id: "#678", nom: "John Week", age: 45,Tel:" 657 456 432", evolution: "+2kg", statut: "En progression", dateSuivi: "2026-07-21" },
  { uid: nextUid(), id: "#098", nom: "Levie Akerman", age: 23,Tel:" 657 456 432", evolution: "-1kg", statut: "En progression", dateSuivi: "2026-09-01" },
  { uid: nextUid(), id: "#543", nom: "Eren Yeger", age: 39, Tel:" 657 456 432",evolution: "+2kg", statut: "A surveiller", dateSuivi: "2026-10-01" },
  { uid: nextUid(), id: "#678", nom: "Mikasa Arkermen", age: 45,Tel:" 657 456 432", evolution: "+2kg", statut: "En progression", dateSuivi: "2026-07-21" },
  { uid: nextUid(), id: "#098", nom: "Kibouchi Musane", age: 23,Tel:" 657 456 432", evolution: "-1kg", statut: "En progression", dateSuivi: "2026-09-01" },
  { uid: nextUid(), id: "#543", nom: "John Week", age: 39,Tel:" 657 456 432", evolution: "+2kg", statut: "A surveiller", dateSuivi: "2026-10-01" },
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
//formulaire du patient//
interface PatientForm {
  id: string;
  nom: string;
  age: string;
  Tel:String;
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
   
    setModalMode("create");
  }

  function openViewModal(p: Patient) {
    setSelectedUid(p.uid);
    setError(null);
   
    setModalMode("view");
    setOpenMenuUid(null);
  }

  function switchToEdit(p: Patient) {
    setForm({
      id: p.id,
      nom: p.nom,
      age: String(p.age),
      evolution: p.evolution,
      Tel:p.Tel,
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
  const navigate = useNavigate()

/* -------------------
--------------DEBUT--------*/

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      {/* Title + Action */}
      <div className=" flex items-center justify-between my-3">
         <div>
        <h2 className='text-2xl font-bold text-slate-800 '>Gestion des suivi</h2>
    </div>
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
                          onClick={() => navigate("/Suivi_detaille")}
                          className="block w-full px-3 py-2 text-left text-gray-700 hover:bg-gray-50"
                        >
                          Voir le suivi
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
    </div>
  );
}
