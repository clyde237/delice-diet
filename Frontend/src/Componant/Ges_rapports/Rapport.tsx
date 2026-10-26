import { useMemo, useState } from 'react';
import {
	AlertTriangle,
	ArrowUpRight,
	BarChart3,
	CalendarDays,
	CheckCircle2,
	ChevronRight,
	Clock3,
	Download,
	FileText,
	Search,
	SlidersHorizontal,
	TrendingDown,
	TrendingUp,
} from 'lucide-react';

type ReportStatus = 'À consulter' | 'En cours' | 'Archivé';

type PatientReport = {
	id: number;
	patient: string;
	initials: string;
	type: string;
	date: string;
	status: ReportStatus;
	objective: string;
	summary: string;
	recommendation: string;
	nextStep: string;
	weight: string;
	weightChange: string;
	bmi: string;
	adherence: number;
	risk: 'Faible' | 'Modéré' | 'Élevé';
};

const reports: PatientReport[] = [
	{
		id: 1,
		patient: 'Mme Fanta Diallo',
		initials: 'FD',
		type: 'Bilan de suivi',
		date: '12 juin 2026',
		status: 'À consulter',
		objective: 'Perte de poids progressive',
		summary: 'La patiente suit régulièrement les recommandations. Les grignotages du soir restent le principal point à travailler.',
		recommendation: 'Conserver les repas riches en fibres et préparer une collation planifiée pour la fin de journée.',
		nextStep: 'Réévaluation du poids et des habitudes dans 14 jours.',
		weight: '71,2 kg',
		weightChange: '-0,8 kg',
		bmi: '25,2',
		adherence: 82,
		risk: 'Faible',
	},
	{
		id: 2,
		patient: 'M. Ibrahim Souley',
		initials: 'IS',
		type: 'Rapport sportif',
		date: '10 juin 2026',
		status: 'En cours',
		objective: 'Prise de masse musculaire',
		summary: 'La récupération est satisfaisante, mais l’apport énergétique reste insuffisant les jours d’entraînement.',
		recommendation: 'Ajouter une collation post-entraînement et augmenter progressivement la portion de féculents complets.',
		nextStep: 'Contrôle des apports et de la récupération à la prochaine séance.',
		weight: '64,1 kg',
		weightChange: '+1,1 kg',
		bmi: '21,2',
		adherence: 74,
		risk: 'Modéré',
	},
	{
		id: 3,
		patient: 'Mme Salif N’Gouma',
		initials: 'SN',
		type: 'Bilan glycémique',
		date: '08 juin 2026',
		status: 'À consulter',
		objective: 'Contrôle glycémique',
		summary: 'La fréquence des boissons sucrées diminue, mais la faim du soir et l’hydratation doivent encore être surveillées.',
		recommendation: 'Maintenir des horaires réguliers et remplacer les boissons sucrées par de l’eau aromatisée sans sucre.',
		nextStep: 'Appel de suivi cette semaine et vérification du carnet alimentaire.',
		weight: '79,4 kg',
		weightChange: '-0,6 kg',
		bmi: '30,3',
		adherence: 61,
		risk: 'Élevé',
	},
	{
		id: 4,
		patient: 'M. Karim Traoré',
		initials: 'KT',
		type: 'Synthèse mensuelle',
		date: '02 juin 2026',
		status: 'Archivé',
		objective: 'Équilibre alimentaire',
		summary: 'Les habitudes sont stabilisées et les objectifs du mois ont été atteints.',
		recommendation: 'Poursuivre le rythme actuel et conserver une activité physique régulière.',
		nextStep: 'Prochain bilan mensuel.',
		weight: '68,5 kg',
		weightChange: '-1,4 kg',
		bmi: '23,7',
		adherence: 91,
		risk: 'Faible',
	},
];

const statusStyles: Record<ReportStatus, string> = {
	'À consulter': 'bg-amber-50 text-amber-700 ring-1 ring-amber-100',
	'En cours': 'bg-sky-50 text-sky-700 ring-1 ring-sky-100',
	Archivé: 'bg-slate-100 text-slate-600 ring-1 ring-slate-200',
};

const riskStyles = {
	Faible: 'text-emerald-700 bg-emerald-50',
	Modéré: 'text-amber-700 bg-amber-50',
	Élevé: 'text-rose-700 bg-rose-50',
};

export default function RapportInterface() {
	const [selectedReportId, setSelectedReportId] = useState(1);
	const [searchTerm, setSearchTerm] = useState('');
	const [statusFilter, setStatusFilter] = useState<'Tous' | ReportStatus>('Tous');
	const [showFilters, setShowFilters] = useState(false);

	const filteredReports = useMemo(() => {
		const normalizedSearch = searchTerm.trim().toLowerCase();

		return reports.filter((report) => {
			const matchesStatus = statusFilter === 'Tous' || report.status === statusFilter;
			const matchesSearch = !normalizedSearch || `${report.patient} ${report.type} ${report.objective}`.toLowerCase().includes(normalizedSearch);
			return matchesStatus && matchesSearch;
		});
	}, [searchTerm, statusFilter]);

	const selectedReport = reports.find((report) => report.id === selectedReportId) ?? filteredReports[0] ?? reports[0];

	const handlePrint = () => {
		window.print();
	};

	return (
		<section className="mt-5 min-h-[calc(100vh-7rem)] space-y-5">
			<header className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
				<div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
					<div>
						<p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600">Suivi nutritionnel</p>
						<h1 className="mt-2 text-2xl font-black text-slate-900 sm:text-3xl">Rapports patients</h1>
						<p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">Consultez les évolutions, les alertes et les prochaines recommandations de vos patients.</p>
					</div>

					<div className="flex flex-wrap items-center gap-3">
						<div className="flex items-center gap-2 rounded-2xl bg-emerald-50 px-4 py-3 text-emerald-800">
							<BarChart3 className="h-5 w-5" />
							<div>
								<p className="text-lg font-black">{reports.length}</p>
								<p className="text-[11px] font-medium">rapports ce mois</p>
							</div>
						</div>
						<button
							type="button"
							onClick={handlePrint}
							className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
						>
							<Download className="h-4 w-4" />
							Exporter
						</button>
					</div>
				</div>
			</header>

			<div className="grid gap-5 xl:grid-cols-[minmax(300px,0.8fr)_minmax(0,1.5fr)]">
				<section className="min-w-0 rounded-3xl border border-slate-200 bg-white shadow-sm">
					<div className="border-b border-slate-200 p-4 sm:p-5">
						<div className="flex items-center justify-between gap-3">
							<div>
								<h2 className="text-lg font-black text-slate-900">Rapports récents</h2>
								<p className="mt-1 text-xs text-slate-500">{filteredReports.length} résultat(s)</p>
							</div>
							<button
								type="button"
								onClick={() => setShowFilters((value) => !value)}
								className={`rounded-xl p-2 transition ${showFilters ? 'bg-emerald-100 text-emerald-700' : 'text-slate-500 hover:bg-slate-100'}`}
								aria-label="Afficher les filtres"
							>
								<SlidersHorizontal className="h-5 w-5" />
							</button>
						</div>

						<div className="relative mt-4">
							<Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
							<input
								type="search"
								value={searchTerm}
								onChange={(event) => setSearchTerm(event.target.value)}
								placeholder="Rechercher un patient ou un rapport"
								className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-3 text-sm text-slate-800 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
							/>
						</div>

						{showFilters && (
							<div className="mt-4 flex flex-wrap gap-2">
								{(['Tous', 'À consulter', 'En cours', 'Archivé'] as const).map((filter) => (
									<button
										key={filter}
										type="button"
										onClick={() => setStatusFilter(filter)}
										className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
											statusFilter === filter ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
										}`}
									>
										{filter}
									</button>
								))}
							</div>
						)}
					</div>

					<div className="space-y-2 p-3">
						{filteredReports.map((report) => (
							<button
								key={report.id}
								type="button"
								onClick={() => setSelectedReportId(report.id)}
								className={`w-full rounded-2xl border p-3 text-left transition ${
									selectedReport.id === report.id
										? 'border-emerald-300 bg-emerald-50/70'
										: 'border-transparent hover:border-slate-200 hover:bg-slate-50'
								}`}
							>
								<div className="flex items-start gap-3">
									<span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-black text-slate-700">
										{report.initials}
									</span>
									<span className="min-w-0 flex-1">
										<span className="flex items-center justify-between gap-2">
											<span className="truncate text-sm font-bold text-slate-900">{report.patient}</span>
											<span className="shrink-0 text-[11px] text-slate-400">{report.date}</span>
										</span>
										<span className="mt-1 block truncate text-xs text-slate-500">{report.type}</span>
										<span className="mt-2 flex items-center justify-between gap-2">
											<span className={`rounded-full px-2 py-1 text-[10px] font-bold ${statusStyles[report.status]}`}>{report.status}</span>
											<ChevronRight className="h-4 w-4 text-slate-400" />
										</span>
									</span>
								</div>
							</button>
						))}

						{filteredReports.length === 0 && <p className="px-3 py-10 text-center text-sm text-slate-500">Aucun rapport trouvé.</p>}
					</div>
				</section>

				<section className="min-w-0 space-y-5">
					<div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
						<div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
							<div className="flex items-start gap-3">
								<span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm font-black text-emerald-700">
									{selectedReport.initials}
								</span>
								<div>
									<div className="flex flex-wrap items-center gap-2">
										<h2 className="text-xl font-black text-slate-900">{selectedReport.patient}</h2>
										<span className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${statusStyles[selectedReport.status]}`}>{selectedReport.status}</span>
									</div>
									<p className="mt-1 text-sm text-slate-500">{selectedReport.type} · {selectedReport.date}</p>
								</div>
							</div>

							<button
								type="button"
								onClick={handlePrint}
								className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50"
							>
								<FileText className="h-4 w-4" />
								Imprimer le rapport
							</button>
						</div>

						<div className="mt-5 rounded-2xl bg-slate-50 p-4">
							<p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">Objectif suivi</p>
							<p className="mt-2 text-sm font-bold text-slate-800">{selectedReport.objective}</p>
						</div>

						<div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
							<div className="rounded-2xl border border-slate-200 p-4">
								<p className="text-xs text-slate-500">Poids actuel</p>
								<p className="mt-2 text-xl font-black text-slate-900">{selectedReport.weight}</p>
								<p className="mt-1 flex items-center gap-1 text-xs font-semibold text-emerald-600"><TrendingDown className="h-3.5 w-3.5" />{selectedReport.weightChange}</p>
							</div>
							<div className="rounded-2xl border border-slate-200 p-4">
								<p className="text-xs text-slate-500">IMC</p>
								<p className="mt-2 text-xl font-black text-slate-900">{selectedReport.bmi}</p>
								<p className="mt-1 text-xs text-slate-500">Dernière mesure</p>
							</div>
							<div className="rounded-2xl border border-slate-200 p-4">
								<p className="text-xs text-slate-500">Adhésion</p>
								<p className="mt-2 text-xl font-black text-slate-900">{selectedReport.adherence}%</p>
								<div className="mt-2 h-1.5 rounded-full bg-slate-100"><div className="h-1.5 rounded-full bg-emerald-500" style={{ width: `${selectedReport.adherence}%` }} /></div>
							</div>
							<div className="rounded-2xl border border-slate-200 p-4">
								<p className="text-xs text-slate-500">Niveau de vigilance</p>
								<span className={`mt-2 inline-flex rounded-full px-2.5 py-1 text-xs font-bold ${riskStyles[selectedReport.risk]}`}>{selectedReport.risk}</span>
							</div>
						</div>
					</div>

					<div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
						<article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
							<div className="flex items-center gap-2">
								<span className="rounded-xl bg-emerald-100 p-2 text-emerald-700"><FileText className="h-4 w-4" /></span>
								<h3 className="font-black text-slate-900">Synthèse du rapport</h3>
							</div>
							<p className="mt-4 text-sm leading-7 text-slate-600">{selectedReport.summary}</p>
							<div className="mt-5 rounded-2xl bg-emerald-50 p-4 ring-1 ring-emerald-100">
								<p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-700">Recommandation</p>
								<p className="mt-2 text-sm leading-6 text-emerald-950">{selectedReport.recommendation}</p>
							</div>
						</article>

						<article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
							<div className="flex items-center gap-2">
								{selectedReport.risk === 'Élevé' ? <AlertTriangle className="h-5 w-5 text-rose-500" /> : <CheckCircle2 className="h-5 w-5 text-emerald-500" />}
								<h3 className="font-black text-slate-900">Prochaine étape</h3>
							</div>
							<p className="mt-4 text-sm leading-7 text-slate-600">{selectedReport.nextStep}</p>
							<div className="mt-5 flex items-center gap-2 text-xs font-semibold text-slate-500"><CalendarDays className="h-4 w-4" />Suivi recommandé selon le dernier bilan</div>
							<button type="button" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-emerald-700 hover:text-emerald-800">Ouvrir le suivi <ArrowUpRight className="h-4 w-4" /></button>
						</article>
					</div>

					<div className="grid gap-5 sm:grid-cols-3">
						<div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"><div className="flex items-center gap-2 text-slate-500"><Clock3 className="h-4 w-4" /><span className="text-xs font-semibold">Dernier rapport</span></div><p className="mt-3 text-sm font-bold text-slate-900">{selectedReport.date}</p></div>
						<div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"><div className="flex items-center gap-2 text-slate-500"><TrendingUp className="h-4 w-4" /><span className="text-xs font-semibold">Objectif actuel</span></div><p className="mt-3 truncate text-sm font-bold text-slate-900">{selectedReport.objective}</p></div>
						<div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"><div className="flex items-center gap-2 text-slate-500"><BarChart3 className="h-4 w-4" /><span className="text-xs font-semibold">Progression</span></div><p className="mt-3 text-sm font-bold text-slate-900">{selectedReport.adherence}% d’adhésion</p></div>
					</div>
				</section>
			</div>
		</section>
	);
}
