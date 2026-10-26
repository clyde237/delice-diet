import { useMemo, useState } from 'react';
import {
	ArrowLeft,
	CheckCheck,
	Clock3,
	MoreHorizontal,
	Paperclip,
	Phone,
	Search,
	Send,
	Smile,
	UserRound,
	Video,
} from 'lucide-react';

type ChatMessage = {
	id: number;
	text: string;
	time: string;
	sender: 'patient' | 'dietitian';
};

type Conversation = {
	id: number;
	name: string;
	initials: string;
	objective: string;
	lastMessage: string;
	time: string;
	unread: number;
	online: boolean;
	messages: ChatMessage[];
};

const initialConversations: Conversation[] = [
	{
		id: 1,
		name: 'Mme Fanta Diallo',
		initials: 'FD',
		objective: 'Perte de poids progressive',
		lastMessage: 'Merci docteur, je vais essayer ce menu.',
		time: '09:42',
		unread: 2,
		online: true,
		messages: [
			{ id: 1, text: 'Bonjour docteur, je voulais vous parler de mon petit déjeuner.', time: '09:30', sender: 'patient' },
			{ id: 2, text: 'Bonjour Fanta, je vous écoute. Avez-vous des difficultés avec le menu proposé ?', time: '09:34', sender: 'dietitian' },
			{ id: 3, text: 'Oui, je manque parfois de temps le matin.', time: '09:38', sender: 'patient' },
			{ id: 4, text: 'Merci pour la précision. Je vais vous proposer une option rapide et équilibrée.', time: '09:40', sender: 'dietitian' },
			{ id: 5, text: 'Merci docteur, je vais essayer ce menu.', time: '09:42', sender: 'patient' },
		],
	},
	{
		id: 2,
		name: 'M. Ibrahim Souley',
		initials: 'IS',
		objective: 'Prise de masse musculaire',
		lastMessage: 'Je termine mon entraînement à 18h.',
		time: 'Hier',
		unread: 0,
		online: false,
		messages: [
			{ id: 1, text: 'Bonjour Ibrahim, comment se passe votre récupération ?', time: 'Hier 16:20', sender: 'dietitian' },
			{ id: 2, text: 'Très bien. Je termine mon entraînement à 18h.', time: 'Hier 16:45', sender: 'patient' },
		],
	},
	{
		id: 3,
		name: 'Mme Salif N’Gouma',
		initials: 'SN',
		objective: 'Contrôle glycémique',
		lastMessage: 'Le rendez-vous de jeudi me convient.',
		time: 'Lun',
		unread: 1,
		online: true,
		messages: [
			{ id: 1, text: 'Bonsoir, le rendez-vous de jeudi me convient.', time: 'Lun 18:12', sender: 'patient' },
			{ id: 2, text: 'Parfait, je vous confirme le rendez-vous à 10h.', time: 'Lun 18:20', sender: 'dietitian' },
		],
	},
];

const avatarColors = ['bg-emerald-100 text-emerald-700', 'bg-amber-100 text-amber-700', 'bg-sky-100 text-sky-700'];

export default function MessagesInterface() {
	const [conversations, setConversations] = useState(initialConversations);
	const [selectedConversationId, setSelectedConversationId] = useState(1);
	const [searchTerm, setSearchTerm] = useState('');
	const [draftMessage, setDraftMessage] = useState('');
	const [showConversationList, setShowConversationList] = useState(true);

	const selectedConversation = conversations.find((conversation) => conversation.id === selectedConversationId) ?? conversations[0];

	const filteredConversations = useMemo(() => {
		const normalizedSearch = searchTerm.trim().toLowerCase();
		if (!normalizedSearch) return conversations;

		return conversations.filter((conversation) =>
			`${conversation.name} ${conversation.objective} ${conversation.lastMessage}`.toLowerCase().includes(normalizedSearch),
		);
	}, [conversations, searchTerm]);

	const selectConversation = (conversationId: number) => {
		setSelectedConversationId(conversationId);
		setShowConversationList(false);
		setConversations((currentConversations) =>
			currentConversations.map((conversation) =>
				conversation.id === conversationId ? { ...conversation, unread: 0 } : conversation,
			),
		);
	};

	const sendMessage = () => {
		const text = draftMessage.trim();
		if (!text) return;

		setConversations((currentConversations) =>
			currentConversations.map((conversation) => {
				if (conversation.id !== selectedConversationId) return conversation;

				const nextMessage: ChatMessage = {
					id: Date.now(),
					text,
					time: 'À l’instant',
					sender: 'dietitian',
				};

				return {
					...conversation,
					lastMessage: text,
					time: 'À l’instant',
					messages: [...conversation.messages, nextMessage],
				};
			}),
		);
		setDraftMessage('');
	};

	return (
		<section className="mt-5 min-h-[calc(100vh-7rem)] overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
			<div className="grid min-h-[calc(100vh-7rem)] lg:grid-cols-[320px_minmax(0,1fr)]">
				<aside className={`${showConversationList ? 'flex' : 'hidden'} min-w-0 flex-col border-r border-slate-200 bg-slate-50 lg:flex`}>
					<div className="border-b border-slate-200 bg-white p-5">
						<div className="flex items-center justify-between gap-3">
							<div>
								<p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-600">Communication</p>
								<h1 className="mt-1 text-xl font-black text-slate-900">Messages</h1>
							</div>
							<span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700">
								{conversations.reduce((total, conversation) => total + conversation.unread, 0)} non lus
							</span>
						</div>

						<div className="relative mt-5">
							<Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
							<input
								type="search"
								value={searchTerm}
								onChange={(event) => setSearchTerm(event.target.value)}
								placeholder="Rechercher un patient"
								className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-3 text-sm text-slate-800 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
							/>
						</div>
					</div>

					<div className="flex-1 space-y-1 overflow-y-auto p-3">
						<div className="px-2 pb-2 pt-1 text-xs font-bold uppercase tracking-[0.16em] text-slate-400">Conversations récentes</div>
						{filteredConversations.map((conversation, index) => (
							<button
								key={conversation.id}
								type="button"
								onClick={() => selectConversation(conversation.id)}
								className={`flex w-full items-start gap-3 rounded-2xl p-3 text-left transition ${
									selectedConversationId === conversation.id
										? 'bg-emerald-100/70 ring-1 ring-emerald-200'
										: 'hover:bg-white hover:shadow-sm'
								}`}
							>
								<span className={`relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-xs font-black ${avatarColors[index % avatarColors.length]}`}>
									{conversation.initials}
									{conversation.online && <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-emerald-500" />}
								</span>

								<span className="min-w-0 flex-1">
									<span className="flex items-center justify-between gap-2">
										<span className="truncate text-sm font-bold text-slate-900">{conversation.name}</span>
										<span className="shrink-0 text-[11px] text-slate-400">{conversation.time}</span>
									</span>
									<span className="mt-1 block truncate text-xs text-slate-500">{conversation.lastMessage}</span>
									<span className="mt-2 block truncate text-[11px] text-slate-400">{conversation.objective}</span>
								</span>

								{conversation.unread > 0 && (
									<span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-emerald-600 px-1 text-[10px] font-bold text-white">
										{conversation.unread}
									</span>
								)}
							</button>
						))}

						{filteredConversations.length === 0 && (
							<div className="px-3 py-10 text-center text-sm text-slate-500">Aucune conversation trouvée.</div>
						)}
					</div>
				</aside>

				<main className={`${showConversationList ? 'hidden' : 'flex'} min-w-0 flex-col bg-white lg:flex`}>
					<header className="flex items-center justify-between border-b border-slate-200 px-4 py-4 sm:px-6">
						<div className="flex min-w-0 items-center gap-3">
							<button
								type="button"
								onClick={() => setShowConversationList(true)}
								className="rounded-xl p-2 text-slate-500 hover:bg-slate-100 lg:hidden"
								aria-label="Retour aux conversations"
							>
								<ArrowLeft className="h-5 w-5" />
							</button>

							<span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm font-black text-emerald-700">
								{selectedConversation.initials}
							</span>
							<div className="min-w-0">
								<div className="flex items-center gap-2">
									<h2 className="truncate text-base font-black text-slate-900">{selectedConversation.name}</h2>
									{selectedConversation.online && <span className="h-2 w-2 rounded-full bg-emerald-500" />}
								</div>
								<p className="truncate text-xs text-slate-500">
									{selectedConversation.online ? 'En ligne' : 'Hors ligne'} · {selectedConversation.objective}
								</p>
							</div>
						</div>

						<div className="flex items-center gap-1 text-slate-500">
							<button type="button" className="rounded-xl p-2 hover:bg-slate-100" aria-label="Appeler">
								<Phone className="h-4 w-4" />
							</button>
							<button type="button" className="rounded-xl p-2 hover:bg-slate-100" aria-label="Démarrer une vidéo">
								<Video className="h-4 w-4" />
							</button>
							<button type="button" className="rounded-xl p-2 hover:bg-slate-100" aria-label="Plus d’options">
								<MoreHorizontal className="h-5 w-5" />
							</button>
						</div>
					</header>

					<div className="flex-1 overflow-y-auto bg-[linear-gradient(to_bottom,#f8fafc,#ffffff)] px-4 py-5 sm:px-8">
						<div className="mx-auto flex max-w-3xl items-center justify-center gap-2 text-[11px] font-medium text-slate-400">
							<span className="h-px flex-1 bg-slate-200" />
							<span>Aujourd’hui</span>
							<span className="h-px flex-1 bg-slate-200" />
						</div>

						<div className="mx-auto mt-6 max-w-3xl space-y-4">
							{selectedConversation.messages.map((message) => (
								<div key={message.id} className={`flex ${message.sender === 'dietitian' ? 'justify-end' : 'justify-start'}`}>
									<div className={`max-w-[85%] sm:max-w-[70%] ${message.sender === 'dietitian' ? 'items-end' : 'items-start'} flex flex-col`}>
										<div className={`rounded-2xl px-4 py-3 text-sm leading-6 shadow-sm ${
											message.sender === 'dietitian'
												? 'rounded-br-md bg-emerald-600 text-white'
												: 'rounded-bl-md bg-white text-slate-700 ring-1 ring-slate-200'
										}`}>
											{message.text}
										</div>
										<div className="mt-1 flex items-center gap-1 px-1 text-[10px] text-slate-400">
											<span>{message.time}</span>
											{message.sender === 'dietitian' && <CheckCheck className="h-3.5 w-3.5 text-emerald-500" />}
										</div>
									</div>
								</div>
							))}
						</div>
					</div>

					<footer className="border-t border-slate-200 bg-white p-4 sm:p-5">
						<div className="mx-auto flex max-w-3xl items-end gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-2 focus-within:border-emerald-300 focus-within:ring-2 focus-within:ring-emerald-100">
							<button type="button" className="rounded-xl p-2 text-slate-400 hover:bg-white hover:text-slate-600" aria-label="Joindre un fichier">
								<Paperclip className="h-5 w-5" />
							</button>
							<textarea
								value={draftMessage}
								onChange={(event) => setDraftMessage(event.target.value)}
								onKeyDown={(event) => {
									if (event.key === 'Enter' && !event.shiftKey) {
										event.preventDefault();
										sendMessage();
									}
								}}
								placeholder="Écrire un message..."
								rows={1}
								className="max-h-28 min-h-10 flex-1 resize-none bg-transparent px-2 py-2 text-sm text-slate-800 outline-none placeholder:text-slate-400"
							/>
							<button type="button" className="rounded-xl p-2 text-slate-400 hover:bg-white hover:text-slate-600" aria-label="Ajouter un emoji">
								<Smile className="h-5 w-5" />
							</button>
							<button
								type="button"
								onClick={sendMessage}
								disabled={!draftMessage.trim()}
								className="rounded-xl bg-emerald-600 p-2.5 text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-40"
								aria-label="Envoyer le message"
							>
								<Send className="h-4 w-4" />
							</button>
						</div>
						<div className="mx-auto mt-2 flex max-w-3xl items-center justify-center gap-1 text-[10px] text-slate-400">
							<Clock3 className="h-3 w-3" />
							<span>Les messages sont réservés au suivi nutritionnel du patient.</span>
						</div>
					</footer>
				</main>

				{!showConversationList && (
					<div className="pointer-events-none absolute hidden items-center justify-center text-slate-400 lg:hidden">
						<UserRound className="h-4 w-4" />
					</div>
				)}
			</div>
		</section>
	);
}
