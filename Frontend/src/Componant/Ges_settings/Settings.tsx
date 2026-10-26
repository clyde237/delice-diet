import { useState } from 'react';
import {
	Bell,
	Building2,
	Camera,
	Check,
	CheckCircle2,
	ChevronRight,
	Clock3,
	Eye,
	EyeOff,
	Globe2,
	LockKeyhole,
	Mail,
	Palette,
	Save,
	ShieldCheck,
	Smartphone,
	UserRound,
} from 'lucide-react';

type SettingsTab = 'profil' | 'cabinet' | 'notifications' | 'confidentialite' | 'apparence' | 'securite';

type ProfileForm = {
	firstName: string;
	lastName: string;
	specialty: string;
	phone: string;
	email: string;
	bio: string;
};

const settingsNavigation: Array<{ id: SettingsTab; label: string; description: string; icon: typeof UserRound }> = [
	{ id: 'profil', label: 'Profil professionnel', description: 'Votre identité de diététicien', icon: UserRound },
	{ id: 'cabinet', label: 'Cabinet et horaires', description: 'Informations pratiques', icon: Building2 },
	{ id: 'notifications', label: 'Notifications', description: 'Alertes de suivi patient', icon: Bell },
	{ id: 'confidentialite', label: 'Confidentialité', description: 'Données et accès patients', icon: ShieldCheck },
	{ id: 'apparence', label: 'Apparence', description: 'Préférences de l’interface', icon: Palette },
	{ id: 'securite', label: 'Sécurité du compte', description: 'Mot de passe et connexion', icon: LockKeyhole },
];

const inputClassName = 'mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100';

function Toggle({ enabled, onChange, label }: { enabled: boolean; onChange: () => void; label: string }) {
	return (
		<button
			type="button"
			role="switch"
			aria-checked={enabled}
			aria-label={label}
			onClick={onChange}
			className={`relative h-6 w-11 shrink-0 rounded-full transition ${enabled ? 'bg-emerald-600' : 'bg-slate-300'}`}
		>
			<span className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition ${enabled ? 'left-6' : 'left-1'}`} />
		</button>
	);
}

export default function SettingsInterface() {
	const [activeTab, setActiveTab] = useState<SettingsTab>('profil');
	const [savedMessage, setSavedMessage] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [profile, setProfile] = useState<ProfileForm>({
		firstName: 'Jean',
		lastName: 'Kouassi',
		specialty: 'Diététicien nutritionniste',
		phone: '+225 07 00 00 00 00',
		email: 'jean.kouassi@diethealthly.app',
		bio: 'J’accompagne mes patients vers une alimentation équilibrée, progressive et adaptée à leur quotidien.',
	});
	const [notifications, setNotifications] = useState({ messages: true, appointments: true, reports: true, reminders: false });
	const [privacy, setPrivacy] = useState({ autoLock: true, consultationHistory: true });
	const [cabinet, setCabinet] = useState({ name: 'Cabinet Diet Healthy', address: 'Cocody, Abidjan', hours: '08:00 - 18:00', language: 'Français' });
	const [appearance, setAppearance] = useState({ density: 'Confortable', accent: 'Émeraude' });

	const updateProfile = (field: keyof ProfileForm, value: string) => {
		setProfile((currentProfile) => ({ ...currentProfile, [field]: value }));
		setSavedMessage('');
	};

	const updateCabinet = (field: keyof typeof cabinet, value: string) => {
		setCabinet((currentCabinet) => ({ ...currentCabinet, [field]: value }));
		setSavedMessage('');
	};

	const handleSave = () => {
		setSavedMessage('Vos paramètres ont été enregistrés.');
	};

	return (
		<section className="mt-5 min-h-[calc(100vh-7rem)] space-y-5">
			<header className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
				<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
					<div>
						<p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600">Espace diététicien</p>
						<h1 className="mt-2 text-2xl font-black text-slate-900 sm:text-3xl">Paramètres de l’application</h1>
						<p className="mt-2 text-sm text-slate-500">Personnalisez votre espace de travail et votre suivi des patients.</p>
					</div>

					<button
						type="button"
						onClick={handleSave}
						className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-700"
					>
						<Save className="h-4 w-4" />
						Enregistrer
					</button>
				</div>

				{savedMessage && (
					<div className="mt-4 flex items-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
						<CheckCircle2 className="h-4 w-4" />
						{savedMessage}
					</div>
				)}
			</header>

			<div className="grid items-start gap-5 xl:grid-cols-[300px_minmax(0,1fr)]">
				<aside className="rounded-3xl border border-slate-200 bg-white p-3 shadow-sm">
					<div className="mb-3 px-3 py-2">
						<p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">Votre espace</p>
					</div>

					<nav className="space-y-1" aria-label="Sections des paramètres">
						{settingsNavigation.map((item) => {
							const Icon = item.icon;
							const isActive = activeTab === item.id;

							return (
								<button
									key={item.id}
									type="button"
									onClick={() => setActiveTab(item.id)}
									className={`flex w-full items-center gap-3 rounded-2xl p-3 text-left transition ${isActive ? 'bg-emerald-50 text-emerald-800 ring-1 ring-emerald-100' : 'text-slate-600 hover:bg-slate-50'}`}
								>
									<span className={`rounded-xl p-2 ${isActive ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
										<Icon className="h-4 w-4" />
									</span>
									<span className="min-w-0 flex-1">
										<span className="block text-sm font-bold">{item.label}</span>
										<span className="mt-0.5 block truncate text-[11px] text-slate-400">{item.description}</span>
									</span>
									<ChevronRight className={`h-4 w-4 ${isActive ? 'text-emerald-600' : 'text-slate-300'}`} />
								</button>
							);
						})}
					</nav>

					<div className="mt-4 rounded-2xl bg-slate-900 p-4 text-white">
						<div className="flex items-center gap-2 text-emerald-300">
							<ShieldCheck className="h-4 w-4" />
							<span className="text-xs font-bold">Compte professionnel</span>
						</div>
						<p className="mt-2 text-xs leading-5 text-slate-300">Vos paramètres concernent uniquement votre espace de travail de diététicien.</p>
					</div>
				</aside>

				<main className="min-w-0 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
					{activeTab === 'profil' && (
						<div className="space-y-6">
							<div>
								<h2 className="text-xl font-black text-slate-900">Profil professionnel</h2>
								<p className="mt-1 text-sm text-slate-500">Ces informations peuvent être visibles sur vos échanges et rapports patients.</p>
							</div>

							<div className="flex flex-col gap-4 rounded-2xl bg-slate-50 p-4 sm:flex-row sm:items-center">
								<div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-lg font-black text-emerald-700">JK
									<button type="button" className="absolute -bottom-1 -right-1 rounded-full border-2 border-white bg-emerald-600 p-1.5 text-white" aria-label="Modifier la photo">
										<Camera className="h-3.5 w-3.5" />
									</button>
								</div>
								<div>
									<p className="font-black text-slate-900">{profile.firstName} {profile.lastName}</p>
									<p className="mt-1 text-sm text-slate-500">{profile.specialty}</p>
								</div>
							</div>

							<div className="grid gap-4 md:grid-cols-2">
								<label className="text-sm font-semibold text-slate-700">Prénom<input value={profile.firstName} onChange={(event) => updateProfile('firstName', event.target.value)} className={inputClassName} /></label>
								<label className="text-sm font-semibold text-slate-700">Nom<input value={profile.lastName} onChange={(event) => updateProfile('lastName', event.target.value)} className={inputClassName} /></label>
								<label className="text-sm font-semibold text-slate-700">Spécialité<input value={profile.specialty} onChange={(event) => updateProfile('specialty', event.target.value)} className={inputClassName} /></label>
								<label className="text-sm font-semibold text-slate-700">Téléphone<div className="relative"><Smartphone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" /><input value={profile.phone} onChange={(event) => updateProfile('phone', event.target.value)} className={`${inputClassName} pl-9`} /></div></label>
								<label className="text-sm font-semibold text-slate-700 md:col-span-2">Adresse e-mail<div className="relative"><Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" /><input type="email" value={profile.email} onChange={(event) => updateProfile('email', event.target.value)} className={`${inputClassName} pl-9`} /></div></label>
								<label className="text-sm font-semibold text-slate-700 md:col-span-2">Présentation<textarea value={profile.bio} onChange={(event) => updateProfile('bio', event.target.value)} rows={4} className={inputClassName} /></label>
							</div>
						</div>
					)}

					{activeTab === 'cabinet' && (
						<div className="space-y-6">
							<div><h2 className="text-xl font-black text-slate-900">Cabinet et horaires</h2><p className="mt-1 text-sm text-slate-500">Organisez les informations pratiques utilisées pour votre activité.</p></div>
							<div className="grid gap-4 md:grid-cols-2">
								<label className="text-sm font-semibold text-slate-700 md:col-span-2">Nom du cabinet<input value={cabinet.name} onChange={(event) => updateCabinet('name', event.target.value)} className={inputClassName} /></label>
								<label className="text-sm font-semibold text-slate-700 md:col-span-2">Adresse professionnelle<input value={cabinet.address} onChange={(event) => updateCabinet('address', event.target.value)} className={inputClassName} /></label>
								<label className="text-sm font-semibold text-slate-700">Horaires d’ouverture<div className="relative"><Clock3 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" /><input value={cabinet.hours} onChange={(event) => updateCabinet('hours', event.target.value)} className={`${inputClassName} pl-9`} /></div></label>
								<label className="text-sm font-semibold text-slate-700">Langue de travail<div className="relative"><Globe2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" /><select value={cabinet.language} onChange={(event) => updateCabinet('language', event.target.value)} className={`${inputClassName} pl-9`}><option>Français</option><option>English</option></select></div></label>
							</div>
							<div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-4 text-sm leading-6 text-emerald-900">Ces informations servent à préparer vos rendez-vous et à contextualiser vos communications avec les patients.</div>
						</div>
					)}

					{activeTab === 'notifications' && (
						<div className="space-y-6">
							<div><h2 className="text-xl font-black text-slate-900">Notifications de suivi</h2><p className="mt-1 text-sm text-slate-500">Choisissez les événements qui doivent attirer votre attention.</p></div>
							<div className="divide-y divide-slate-100 rounded-2xl border border-slate-200">
								{[
									{ key: 'messages' as const, icon: Mail, title: 'Nouveaux messages', description: 'Recevoir une alerte lorsqu’un patient vous écrit.' },
									{ key: 'appointments' as const, icon: Clock3, title: 'Rendez-vous', description: 'Rappels de rendez-vous et demandes de confirmation.' },
									{ key: 'reports' as const, icon: Bell, title: 'Rapports à consulter', description: 'Être averti lorsqu’un nouveau rapport patient est disponible.' },
									{ key: 'reminders' as const, icon: Check, title: 'Rappels de suivi', description: 'Recevoir un rappel lorsqu’une réévaluation est prévue.' },
								].map((item) => {
									const Icon = item.icon;
									return <div key={item.key} className="flex items-center justify-between gap-4 p-4"><div className="flex items-center gap-3"><span className="rounded-xl bg-slate-100 p-2 text-slate-600"><Icon className="h-4 w-4" /></span><div><p className="text-sm font-bold text-slate-800">{item.title}</p><p className="mt-1 text-xs text-slate-500">{item.description}</p></div></div><Toggle label={item.title} enabled={notifications[item.key]} onChange={() => setNotifications((current) => ({ ...current, [item.key]: !current[item.key] }))} /></div>;
								})}
							</div>
						</div>
					)}

					{activeTab === 'confidentialite' && (
						<div className="space-y-6">
							<div><h2 className="text-xl font-black text-slate-900">Confidentialité et données</h2><p className="mt-1 text-sm text-slate-500">Contrôlez la manière dont vos données professionnelles et celles de vos patients sont utilisées.</p></div>
							<div className="space-y-3">
								<div className="flex items-start gap-3 rounded-2xl border border-slate-200 p-4"><ShieldCheck className="mt-0.5 h-5 w-5 text-emerald-600" /><div><p className="text-sm font-bold text-slate-800">Données protégées</p><p className="mt-1 text-xs leading-5 text-slate-500">Les informations patients restent accessibles uniquement depuis votre espace professionnel.</p></div></div>
								<div className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 p-4"><div><p className="text-sm font-bold text-slate-800">Verrouillage automatique</p><p className="mt-1 text-xs text-slate-500">Verrouiller la session après 15 minutes d’inactivité.</p></div><Toggle label="Verrouillage automatique" enabled={privacy.autoLock} onChange={() => setPrivacy((current) => ({ ...current, autoLock: !current.autoLock }))} /></div>
								<div className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 p-4"><div><p className="text-sm font-bold text-slate-800">Historique des consultations</p><p className="mt-1 text-xs text-slate-500">Conserver l’historique pour assurer la continuité du suivi.</p></div><Toggle label="Historique des consultations" enabled={privacy.consultationHistory} onChange={() => setPrivacy((current) => ({ ...current, consultationHistory: !current.consultationHistory }))} /></div>
							</div>
						</div>
					)}

					{activeTab === 'apparence' && (
						<div className="space-y-6">
							<div><h2 className="text-xl font-black text-slate-900">Apparence de l’espace</h2><p className="mt-1 text-sm text-slate-500">Adaptez l’interface à votre rythme de travail quotidien.</p></div>
							<div className="grid gap-5 md:grid-cols-2">
								<div><p className="text-sm font-bold text-slate-800">Densité de l’interface</p><div className="mt-3 flex gap-2">{['Compacte', 'Confortable'].map((density) => <button key={density} type="button" onClick={() => setAppearance((current) => ({ ...current, density }))} className={`rounded-xl border px-4 py-2 text-sm font-semibold ${appearance.density === density ? 'border-emerald-400 bg-emerald-50 text-emerald-700' : 'border-slate-200 text-slate-600 hover:bg-slate-50'}`}>{density}</button>)}</div></div>
								<div><p className="text-sm font-bold text-slate-800">Couleur d’accent</p><div className="mt-3 flex gap-2">{['Émeraude', 'Bleu'].map((accent) => <button key={accent} type="button" onClick={() => setAppearance((current) => ({ ...current, accent }))} className={`flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-semibold ${appearance.accent === accent ? 'border-emerald-400 bg-emerald-50 text-emerald-700' : 'border-slate-200 text-slate-600 hover:bg-slate-50'}`}><span className={`h-3 w-3 rounded-full ${accent === 'Émeraude' ? 'bg-emerald-500' : 'bg-sky-500'}`} />{accent}</button>)}</div></div>
							</div>
							<div className="rounded-2xl bg-slate-50 p-5"><p className="text-sm font-bold text-slate-800">Aperçu</p><div className="mt-4 flex items-center gap-3 rounded-xl bg-white p-3 shadow-sm ring-1 ring-slate-200"><span className="h-9 w-9 rounded-lg bg-emerald-100" /><span className="h-3 w-32 rounded-full bg-slate-200" /><span className="ml-auto h-8 w-20 rounded-lg bg-emerald-600" /></div></div>
						</div>
					)}

					{activeTab === 'securite' && (
						<div className="space-y-6">
							<div><h2 className="text-xl font-black text-slate-900">Sécurité du compte</h2><p className="mt-1 text-sm text-slate-500">Maintenez votre accès professionnel protégé.</p></div>
							<div className="grid gap-4 md:grid-cols-2">
								<label className="text-sm font-semibold text-slate-700 md:col-span-2">Mot de passe actuel<div className="relative"><input type={showPassword ? 'text' : 'password'} defaultValue="motdepasse" className={`${inputClassName} pr-10`} /><button type="button" onClick={() => setShowPassword((value) => !value)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" aria-label="Afficher ou masquer le mot de passe">{showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button></div></label>
								<label className="text-sm font-semibold text-slate-700">Nouveau mot de passe<input type="password" className={inputClassName} /></label>
								<label className="text-sm font-semibold text-slate-700">Confirmer le mot de passe<input type="password" className={inputClassName} /></label>
							</div>
							<div className="flex items-start gap-3 rounded-2xl bg-amber-50 p-4 text-amber-900 ring-1 ring-amber-100"><LockKeyhole className="mt-0.5 h-5 w-5 shrink-0" /><p className="text-sm leading-6">Utilisez un mot de passe unique d’au moins 8 caractères pour protéger les données de votre cabinet.</p></div>
						</div>
					)}
				</main>
			</div>
		</section>
	);
}
