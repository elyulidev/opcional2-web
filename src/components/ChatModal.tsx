import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Bot } from "lucide-react";
import { cn } from "../lib/utils";
import { COURSE_NAME } from "../content/constants";

interface Message {
	role: "user" | "assistant";
	content: string;
}

export function ChatModal() {
	const [isOpen, setIsOpen] = useState(false);
	const [messages, setMessages] = useState<Message[]>([
		{
			role: "assistant",
			content: `Olá! Sou seu assistente de IA da disciplina ${COURSE_NAME}. Como posso ajudar você no seu aprendizado hoje?`,
		},
	]);
	const [input, setInput] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const messagesEndRef = useRef<HTMLDivElement>(null);

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	};

	useEffect(() => {
		scrollToBottom();
	}, [messages, isOpen]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!input.trim() || isLoading) return;

		const userMessage = input.trim();
		setInput("");
		setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
		setIsLoading(true);

		try {
			const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

			let aiResponseText = "";

			if (apiKey) {
				const res = await fetch(
					`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
					{
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({
							system_instruction: {
								parts: [
									{
										text: "Você é um tutor de programação prestativo focando no uso do runtime Bun.js. Você está ajudando alunos de 4º ano universitário na disciplina Opcional 2. Mantenha as respostas concisas, técnicas mas pedagogicamente claras.",
									},
								],
							},
							contents: [
								...messages,
								{ role: "user", content: userMessage },
							].map((m) => ({
								role: m.role === "assistant" ? "model" : "user",
								parts: [{ text: m.content }],
							})),
						}),
					},
				);
				const data = await res.json();
				aiResponseText =
					data?.candidates?.[0]?.content?.parts?.[0]?.text ||
					"Desculpe, não consegui processar a resposta.";
			} else {
				await new Promise((r) => setTimeout(r, 800));
				aiResponseText =
					"Esta é uma resposta de demonstração. Defina a variável VITE_GEMINI_API_KEY no seu ambiente preencher com a chave real da API Gemini.";
			}

			setMessages((prev) => [
				...prev,
				{ role: "assistant", content: aiResponseText },
			]);
		} catch {
			setMessages((prev) => [
				...prev,
				{
					role: "assistant",
					content:
						"Ops! Ocorreu um erro ao comunicar com a IA. Tente novamente mais tarde.",
				},
			]);
		} finally {
			setIsLoading(false);
		}
	};

	if (!isOpen) {
		return (
			<button
				onClick={() => setIsOpen(true)}
				className='p-4 bg-primary hover:bg-primary-hover text-white translate-x-0 translate-y-0 hover:-translate-x-1 hover:-translate-y-1 shadow-[4px_4px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_rgba(255,255,255,0.2)] transition-all z-50 group flex items-center justify-center border-2 border-zinc-900 rounded-none w-14 h-14'
				aria-label='Abrir assistente IA'
			>
				<MessageSquare className='w-6 h-6' />
			</button>
		);
	}

	return (
		<div className='fixed bottom-6 right-6 w-85 md:w-100 h-137.5 md:h-150 max-h-[85vh] border-4 border-zinc-900 dark:border-zinc-100 shadow-[8px_8px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_rgba(255,255,255,0.2)] bg-light-bg dark:bg-dark-bg flex flex-col z-50 overflow-hidden animate-in slide-in-from-bottom-5'>
			<div className='flex items-center justify-between p-4 border-b-4 border-zinc-900 dark:border-zinc-100 bg-secondary dark:bg-secondary text-white'>
				<div className='flex items-center gap-3'>
					<div className='p-2 bg-white text-secondary border-2 border-zinc-900 dark:border-white shadow-[2px_2px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_rgba(255,255,255,1)]'>
						<Bot className='w-5 h-5' />
					</div>
					<div>
						<h3 className='font-bold text-lg leading-none'>TestBot IA</h3>
						<p className='text-xs opacity-90 font-medium'>
							Assistente do curso
						</p>
					</div>
				</div>
				<button
					onClick={() => setIsOpen(false)}
					className='text-white hover:text-zinc-900 dark:hover:text-black transition-colors p-1.5 border-2 border-transparent hover:border-zinc-900 dark:hover:border-zinc-100 hover:bg-white'
				>
					<X className='w-6 h-6' />
				</button>
			</div>

			<div className='flex-1 overflow-y-auto p-4 space-y-4 bg-light-surface dark:bg-dark-surface noise-bg'>
				{messages.map((m, i) => (
					<div
						key={i}
						className={cn(
							"flex w-full flex-col",
							m.role === "user" ? "items-end" : "items-start",
						)}
					>
						<div
							className={cn(
								"px-4 py-3 text-sm max-w-[85%] leading-relaxed border-2 border-zinc-900 dark:border-zinc-100 shadow-[3px_3px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_rgba(255,255,255,0.2)]",
								m.role === "user"
									? "bg-primary text-white"
									: "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100",
							)}
						>
							{m.content}
						</div>
					</div>
				))}
				{isLoading && (
					<div className='max-w-[85%] px-4 py-3 border-2 border-zinc-900 dark:border-zinc-100 bg-white dark:bg-zinc-900 text-zinc-500 shadow-[3px_3px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_rgba(255,255,255,0.2)] text-sm flex gap-1 items-center'>
						<span className='animate-bounce'>●</span>
						<span className='animate-bounce' style={{ animationDelay: "0.2s" }}>
							●
						</span>
						<span className='animate-bounce' style={{ animationDelay: "0.4s" }}>
							●
						</span>
					</div>
				)}
				<div ref={messagesEndRef} />
			</div>

			<form
				onSubmit={handleSubmit}
				className='p-4 border-t-4 border-zinc-900 dark:border-zinc-100 bg-light-bg dark:bg-dark-bg flex gap-3'
			>
				<input
					type='text'
					value={input}
					onChange={(e) => setInput(e.target.value)}
					placeholder='Pergunte sobre Bun.js...'
					className='flex-1 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 px-4 py-2 border-2 border-zinc-900 dark:border-zinc-100 text-sm focus:outline-none focus:border-secondary focus:ring-0 shadow-[3px_3px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_rgba(255,255,255,0.2)] transition-all font-medium'
				/>
				<button
					type='submit'
					disabled={!input.trim() || isLoading}
					className='p-3 bg-secondary hover:bg-secondary-hover text-white border-2 border-zinc-900 dark:border-zinc-100 disabled:opacity-50 transition-colors shadow-[3px_3px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_rgba(255,255,255,0.2)] active:translate-x-1 active:translate-y-1 active:shadow-none'
				>
					<Send className='w-5 h-5' />
				</button>
			</form>
		</div>
	);
}
