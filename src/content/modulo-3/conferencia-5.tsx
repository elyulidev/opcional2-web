import type { ConferenciaData } from "../../types";
import { CodeBlock } from "../../components/CodeBlock";
import { Callout, Box } from "../../components/CourseComponents";

export const data: ConferenciaData = {
	titulo: "3.5 Mocking de tempo: setSystemTime e datas controladas",
	objetivos: [
		"Explicar por que o tempo é uma das dependências mais problemáticas nos testes.",
		"Usar setSystemTime() do bun:test para fixar o relógio do sistema num momento específico.",
		"Testar código que depende de new Date(), Date.now(), e setTimeout.",
		"Usar jest.useFakeTimers() e jest.advanceTimersByTime() para controlar timers.",
		"Testar lógica de expiração, prazos, agendamentos e períodos de tempo.",
		"Restaurar o tempo real após cada teste com setSystemTime() sem argumentos.",
		"Combinar mocking de tempo com outros tipos de mocks para cenários complexos.",
	],
	contenido: (
		<>
			{/* METADATA DA CONFERÊNCIA */}
			<div className='flex flex-wrap gap-4 mb-10'>
				<span className='px-4 py-2 bg-zinc-900 text-white dark:bg-zinc-100 dark:text-black font-black uppercase text-sm brutalist-shadow'>
					⏱️ Duração: 2 Horas
				</span>
				<span className='px-4 py-2 bg-primary text-white font-black uppercase text-sm brutalist-shadow'>
					🔑 Pré-requisitos: Conferências 3.4 concluída
				</span>
			</div>

			{/* INTRODUÇÃO */}
			<Box className='bg-primary/10 border-black dark:border-white mb-16 p-10 shadow-[12px_12px_0px_0px_rgba(255,50,150,1)] dark:shadow-[12px_12px_0px_0px_rgba(255,50,150,0.5)] relative overflow-hidden'>
				<h3 className='text-3xl font-black uppercase mb-6 text-primary flex items-center gap-3'>
					<span className='w-12 h-12 flex items-center justify-center bg-black text-white dark:bg-white dark:text-black rounded-full text-xl'>
						⌛
					</span>
					Introdução — O Tempo é o Inimigo
				</h3>
				<div className='space-y-4 text-lg leading-relaxed text-zinc-800 dark:text-zinc-200'>
					<p>
						O tempo é a dependência mais traiçoeira. Ele é não-determinístico: cada vez que chamas <code>new Date()</code>, obténs um valor diferente.
					</p>
					<p>
						Como testar se uma sessão expira em 30 minutos sem esperar 30 minutos reais? Como testar uma promoção que só abre em Dezembro se estamos em Março? O Bun dá-te o poder de "parar" e "viajar" no tempo.
					</p>
					<p className='font-black text-2xl py-6 px-8 border-l-8 border-primary bg-white dark:bg-zinc-900 shadow-brutalist uppercase italic tracking-tighter text-primary'>
						"Congela o relógio e torna o aleatório em algo previsível."
					</p>
				</div>
			</Box>

			{/* PARTE 1 */}
			<section className='mb-24 relative'>
				<h2 className='text-4xl font-black uppercase mb-8 flex items-center gap-4 group'>
					<span className='px-4 py-2 bg-black text-white dark:bg-white dark:text-black group-hover:bg-primary transition-colors'>
						PARTE 1
					</span>
					<span className='border-b-8 border-primary font-black uppercase'>
						setSystemTime() — Comando Total
					</span>
				</h2>

				<Box className='border-zinc-900 dark:border-zinc-100'>
					<p className='text-lg mb-6 leading-relaxed'>
						Este comando substitui o relógio global do Bun por um que tu controlas.
					</p>
					<CodeBlock 
						language="typescript"
						code={`import { setSystemTime } from "bun:test";\n\n// Fixa para 15 de Março de 2024\nsetSystemTime(new Date("2024-03-15T12:00:00Z"));\n\nconsole.log(new Date().getFullYear()); // 2024`}
					/>
					<Callout type='danger' title='Regra Obrigatória' className='mt-8'>
						Sempre limpa o tempo no <code>afterEach</code> usando <code>setSystemTime()</code> sem argumentos para não contaminar outros testes.
					</Callout>
				</Box>
			</section>

			{/* PARTE 2 */}
			<section className='mb-24'>
				<h2 className='text-4xl font-black uppercase mb-12 flex items-center gap-4'>
					<span className='px-4 py-2 bg-black text-white dark:bg-white dark:text-black font-black'>
						PARTE 2
					</span>
					<span className='border-b-8 border-emerald-500 font-black uppercase'>
						Testando Datas Reais
					</span>
				</h2>

				<div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
					<Box className='border-emerald-500 h-full'>
						<h4 className='font-black uppercase mb-4 text-emerald-600'>Horários Comerciais</h4>
						<p className='text-sm mb-4'>Testa comportamentos que só ocorrem das 8h às 18h simplesmente movendo o ponteiro.</p>
						<CodeBlock language="typescript" code={`setSystemTime(new Date("2024-03-18T05:00:00"));\nexpect(isComercial()).toBe(false);`} />
					</Box>
					<Box className='border-emerald-500 h-full shadow-brutalist'>
						<h4 className='font-black uppercase mb-4 text-emerald-600'>Aniversários</h4>
						<p className='text-sm mb-4'>Verifica se o sistema calcula a idade correta antes e depois do dia do aniversário.</p>
						<CodeBlock language="typescript" code={`setSystemTime(new Date("2024-10-10"));\nexpect(calcIdade("2000-10-10")).toBe(24);`} />
					</Box>
				</div>
			</section>

			{/* PARTE 3 */}
			<section className='mb-24'>
				<h2 className='text-4xl font-black uppercase mb-12 flex items-center gap-4'>
					<span className='px-4 py-2 bg-secondary text-white font-black'>
						PARTE 3
					</span>
					<span className='border-b-8 border-secondary font-black uppercase'>
						Expiração e Sessões
					</span>
				</h2>

				<Box className='border-secondary bg-zinc-50 dark:bg-zinc-900'>
					<p className='text-lg mb-6'>Simula a passagem do tempo para verificar se tokens de acesso ou sessões de login invalidam-se como esperado.</p>
					<CodeBlock 
						language="typescript"
						code={`const sessao = criarSessao(1, 30); // 30 min\n\n// Viajamos 31 minutos para o futuro\nconst agora = Date.now();\nsetSystemTime(new Date(agora + 31 * 60 * 1000));\n\nexpect(validarSessao(sessao.id)).toBe(false);`}
					/>
				</Box>
			</section>

			{/* PARTE 4 */}
			<section className='mb-24'>
				<h2 className='text-4xl font-black uppercase mb-12 flex items-center gap-4'>
					<span className='px-4 py-2 bg-zinc-950 text-white font-black'>
						PARTE 4
					</span>
					<span className='border-b-8 border-zinc-950 dark:border-zinc-50 font-black uppercase'>
						Controlar Timers (setTimeout)
					</span>
				</h2>

				<div className='space-y-6'>
					<p className='text-lg leading-relaxed font-bold'>
						Para <code>setTimeout</code> e <code>setInterval</code>, o Bun suporta <code>jest.useFakeTimers()</code>.
					</p>
					<Box className='border-zinc-500 shadow-brutalist'>
						<CodeBlock 
							language="typescript"
							code={`import { jest } from "bun:test";\n\njest.useFakeTimers();\n\ndebounceFn();\njest.advanceTimersByTime(500);\n\nexpect(fn).toHaveBeenCalled();`}
						/>
					</Box>
				</div>
			</section>

			{/* RESUMO */}
			<section className='my-32 p-16 bg-zinc-950 text-white border-8 border-primary shadow-[20px_20px_0px_0px_rgba(255,50,150,0.5)] relative overflow-hidden'>
				<div className='absolute -right-20 -top-20 w-80 h-80 bg-primary/20 rounded-full blur-[100px]' />
				<h3 className='text-6xl font-black uppercase mb-12 relative z-10 text-primary italic'>
					RESUMO
				</h3>
				<div className='space-y-6 relative z-10'>
					{[
						"Não-Determinismo — O tempo muda a cada execução; mocks tornam-no fixo.",
						"setSystemTime() — Comando principal para manipular o relógio global.",
						"Resetar — É crítico limpar o tempo no afterEach() para evitar bugs silenciosos.",
						"Viagem no Tempo — Adiciona milissegundos ao timestamp atual para simular o futuro.",
						"Fake Timers — Use jest.useFakeTimers() para lidar com setTimeout sem esperar segundos reais.",
						"Aplicação — Ideal para testar expirações de JWT, sessões e promoções sazonais.",
					].map((line, i) => (
						<div key={i} className='flex gap-4 items-start'>
							<span className='text-primary font-black text-2xl'>➜</span>
							<p className='text-xl font-bold uppercase leading-tight tracking-tighter'>
								{line}
							</p>
						</div>
					))}
				</div>
			</section>

			{/* EXERCÍCIO */}
			<Box className='border-8 border-black dark:border-white p-16 bg-primary/5 mb-32 group hover:bg-primary/10 transition-colors'>
				<h3 className='text-5xl font-black uppercase mb-10 flex items-center justify-between'>
					EXERCÍCIO PRÁTICO
					<span className='text-6xl animate-bounce'>⏱️</span>
				</h3>
				<div className='space-y-8 text-xl font-medium leading-relaxed text-zinc-800 dark:text-zinc-200'>
					<p>
						Crie o sistema de reservas em <code>src/modulo-02/tempo/sistema-reservas.test.ts</code>:
					</p>
					<ul className='space-y-4 font-bold uppercase text-sm tracking-tight'>
						<li>1. Implemente uma regra de "Desconto Madrugador" (8h às 10h).</li>
						<li>2. Use setSystemTime() para provar que o desconto só é aplicado nesse horário.</li>
						<li>3. Crie uma função <code>cancelarReservaAntiga</code> que expira reservas com +24h.</li>
						<li>4. Viaje no tempo (25 horas) e valide se o estado da reserva mudou.</li>
					</ul>
					<div className='p-8 bg-zinc-950 text-white font-black italic uppercase tracking-tight text-center mt-10 shadow-brutalist'>
						"Seja o senhor do tempo nos seus testes. Nunca espere por um cronómetro real."
					</div>
				</div>
			</Box>

			{/* FOOTER */}
			<div className='flex items-center justify-between border-t-8 border-black dark:border-white pt-12 pb-32 mb-20'>
				<p className='font-black uppercase text-2xl italic text-primary'>
					Conferência 3.5 — Fim
				</p>
				<p className='font-black uppercase text-2xl italic text-zinc-400'>
					Próxima: 3.6 — Mocking Avançado de Implementações
				</p>
			</div>
		</>
	),
	ejercicios: [],
};
