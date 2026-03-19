import type { ConferenciaData } from "../../types";
import { CodeBlock } from "../../components/CodeBlock";
import { Box } from "../../components/CourseComponents";

export const data: ConferenciaData = {
	titulo: "3.7 Workshop prático: testando um sistema com mocks reais",
	objetivos: [
		"Aplicar todas as técnicas do Módulo 3 num sistema completo e realista.",
		"Tomar decisões conscientes sobre qual técnica de mocking usar em cada situação.",
		"Estruturar uma suite de testes profissional para um sistema com múltiplas camadas.",
		"Identificar o que testar e o que não testar num sistema real.",
		"Escrever testes que documentam as regras de negócio de forma clara e permanente.",
		"Completar o ciclo completo: sistema → identificar dependências → mockar → testar → verificar.",
	],
	contenido: (
		<>
			{/* METADATA DA CONFERÊNCIA */}
			<div className='flex flex-wrap gap-4 mb-10'>
				<span className='px-4 py-2 bg-zinc-900 text-white dark:bg-zinc-100 dark:text-black font-black uppercase text-sm brutalist-shadow'>
					⏱️ Duração: 2 Horas
				</span>
				<span className='px-4 py-2 bg-primary text-white font-black uppercase text-sm brutalist-shadow'>
					🔑 Pré-requisitos: Conferências 3.1 a 3.6 concluídas
				</span>
			</div>

			{/* INTRODUÇÃO */}
			<Box className='bg-primary/10 border-black dark:border-white mb-16 p-10 shadow-[12px_12px_0px_0px_rgba(255,50,150,1)] dark:shadow-[12px_12px_0px_0px_rgba(255,50,150,0.5)] relative overflow-hidden'>
				<h3 className='text-3xl font-black uppercase mb-6 text-primary flex items-center gap-3 underline decoration-double'>
					Workshop Prático Total
				</h3>
				<div className='space-y-4 text-lg leading-relaxed text-zinc-800 dark:text-zinc-200'>
					<p>
						Chegámos ao fim do Módulo 3. É hora de consolidar tudo:{" "}
						<code>mock()</code>, <code>spyOn()</code>,{" "}
						<code>mock.module()</code> e <code>setSystemTime()</code>.
					</p>
					<p>
						Vamos construir o{" "}
						<strong>SAC (Sistema de Avaliação Contínua)</strong>. Nenhuma teoria
						nova — apenas engenharia real.
					</p>
					<p className='font-black text-2xl py-6 px-8 border-l-8 border-primary bg-white dark:bg-zinc-900 shadow-brutalist uppercase italic tracking-tighter text-primary'>
						"O teste é o contrato vivo entre a tua intenção e a tua
						implementação."
					</p>
				</div>
			</Box>

			{/* O SISTEMA */}
			<section className='mb-24 relative'>
				<h2 className='text-4xl font-black uppercase mb-8 flex items-center gap-4 group'>
					<span className='px-4 py-2 bg-black text-white dark:bg-white dark:text-black group-hover:bg-primary transition-colors font-black uppercase'>
						O Desafio
					</span>
					<span className='border-b-8 border-primary font-black uppercase'>
						Sistema de Avaliação Contínua
					</span>
				</h2>

				<Box className='border-zinc-900 dark:border-zinc-100 shadow-brutalist mb-8'>
					<h4 className='font-black uppercase mb-4 text-primary underline underline-offset-4'>
						Regras de Negócio:
					</h4>
					<ul className='space-y-4 font-bold uppercase text-sm leading-relaxed'>
						<li className='flex gap-3'>
							<span className='text-primary'>➜</span> 2 Avaliações Parciais (AP1
							+ AP2). Média Frequência = (AP1 + AP2) / 2.
						</li>
						<li className='flex gap-3'>
							<span className='text-primary'>➜</span> Para Exame: Frequência
							&gt;= 8.0.
						</li>
						<li className='flex gap-3'>
							<span className='text-primary'>➜</span> Nota Final: Frequência ×
							40% + Exame × 60%.
						</li>
						<li className='flex gap-3'>
							<span className='text-primary'>➜</span> Aprovado: Nota Final &gt;=
							9.5 E Presenças &gt;= 75%.
						</li>
					</ul>
				</Box>
			</section>

			{/* PARTE 1 - CONSTRUÇÃO */}
			<section className='mb-24'>
				<h2 className='text-4xl font-black uppercase mb-12 flex items-center gap-4'>
					<span className='px-4 py-2 bg-black text-white dark:bg-white dark:text-black font-black uppercase tracking-widest'>
						Parte 1
					</span>
					<span className='border-b-8 border-emerald-500 font-black uppercase'>
						Estrutura Camada por Camada
					</span>
				</h2>

				<div className='space-y-6 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-8'>
					<Box className='border-emerald-500 h-full'>
						<h4 className='font-black uppercase mb-4'>
							1. Modos Puros (Cálculos)
						</h4>
						<p className='text-sm mb-4'>
							Lógica matemática sem efeitos colaterais. Testa-se sem qualquer
							mock.
						</p>
						<CodeBlock
							language='typescript'
							code={`export function calcNotaFinal(freq, exame) {\n  return freq * 0.4 + exame * 0.6;\n}`}
						/>
					</Box>
					<Box className='border-emerald-500 h-full shadow-brutalist'>
						<h4 className='font-black uppercase mb-4'>
							2. Camada de Serviço (SAC)
						</h4>
						<p className='text-sm mb-4'>
							Onde as peças se juntam. Aqui os mocks são essenciais para isolar
							a BD e o Email.
						</p>
						<CodeBlock
							language='typescript'
							code={`class SAC {\n  constructor(repo, email, pdf) {}\n  async fecharPauta(id) { ... }\n}`}
						/>
					</Box>
				</div>
			</section>

			{/* PARTE 2 - TESTES COMPLETOS */}
			<section className='mb-24 relative'>
				<div className='absolute -left-10 top-20 text-[10rem] text-secondary/5 font-black pointer-events-none uppercase'>
					SUITE
				</div>
				<h2 className='text-4xl font-black uppercase mb-12 flex items-center gap-4'>
					<span className='px-4 py-2 bg-secondary text-white font-black uppercase'>
						Parte 2
					</span>
					<span className='border-b-8 border-secondary font-black uppercase'>
						O Workshop de Testes
					</span>
				</h2>

				<Box className='border-secondary bg-zinc-50 dark:bg-zinc-900 overflow-hidden p-0'>
					<div className='p-4 bg-secondary text-white font-black uppercase text-xs tracking-widest'>
						Fábrica Integrada de Mocks
					</div>
					<div className='p-8'>
						<CodeBlock
							language='typescript'
							code={`function organizarMocks() {\n  return {\n    repo: { buscar: mock(async () => ...) },\n    email: { enviar: mock(async () => true) },\n    calendario: { estaAberto: mock(async () => true) }\n  };\n}`}
						/>
						<p className='mt-6 text-lg'>
							O segredo para uma suite limpa é recriar este objeto de mocks a
							cada teste no <code>beforeEach</code>.
						</p>
					</div>
				</Box>
			</section>

			{/* PRINCÍPIOS FINAIS */}
			<section className='my-32 p-16 bg-zinc-950 text-white border-8 border-primary shadow-[20px_20px_0px_0px_rgba(255,50,150,0.5)] relative overflow-hidden'>
				<div className='absolute -right-20 -top-20 w-80 h-80 bg-primary/20 rounded-full blur-[100px]' />
				<h3 className='text-6xl font-black uppercase mb-12 relative z-10 text-primary italic underline'>
					O que aprendemos no Módulo 3
				</h3>
				<div className='space-y-8 relative z-10'>
					{[
						{
							p: "Isola o que varia",
							d: "Tempo, rede e dados externos devem ser previsíveis.",
						},
						{
							p: "Comportamento > Implementação",
							d: "Testa o QUE o código faz, não COMO ele faz.",
						},
						{
							p: "Factories DRY",
							d: "Centraliza a criação de dados para evitar testes frágeis.",
						},
						{
							p: "Zero Efeitos Colaterais",
							d: "Valida se o email saiu e se o PDF foi gerado na ordem certa.",
						},
					].map((principle, i) => (
						<div
							key={i}
							className='border-l-4 border-primary pl-6 flex flex-col gap-1'
						>
							<span className='text-2xl font-black uppercase'>
								{principle.p}
							</span>
							<span className='text-zinc-400 font-bold text-sm tracking-wide'>
								{principle.d}
							</span>
						</div>
					))}
				</div>
			</section>

			{/* RESULTADOS ESPERADOS */}
			<Box className='border-zinc-900 border-4 mb-24 p-12 bg-white dark:bg-zinc-900'>
				<h4 className='text-3xl font-black uppercase mb-8 decoration-emerald-500 underline decoration-8'>
					Output do Bun (Reportagem)
				</h4>
				<div className='bg-black p-8 rounded font-mono text-zinc-400 text-sm leading-relaxed overflow-x-auto shadow-inner'>
					<p className='text-emerald-500'>
						[PASS] src/modulo-03/workshop/sac.test.ts
					</p>
					<p className='ml-4'>✓ deve lançar nota com sucesso [0.09ms]</p>
					<p className='ml-4'>✓ deve reprovar por faltas [0.05ms]</p>
					<p className='ml-4'>✓ deve validar período de calendário [0.07ms]</p>
					<p className='ml-4'>✓ deve enviar email após fechar pauta [0.06ms]</p>
					<p className='mt-4 text-emerald-400 font-bold'>46 pass, 0 fail</p>
					<p className='text-zinc-600'>Finished in 8.21ms</p>
				</div>
			</Box>

			{/* CHECKLIST DE MÓDULO */}
			<Box className='bg-primary text-white border-0 py-16 px-12 relative overflow-hidden mb-32 brutalist-shadow'>
				<div className='absolute -right-5 -top-5 text-[12rem] opacity-20 rotate-12 font-black select-none'>
					CHECK!
				</div>
				<h3 className='text-5xl font-black uppercase mb-10 italic'>
					Módulo 3: Concluído
				</h3>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 font-black uppercase text-xs tracking-widest'>
					<div className='flex items-center gap-3'>
						<span className='w-6 h-6 bg-white text-primary flex items-center justify-center rounded-sm text-[10px]'>
							✓
						</span>{" "}
						Mocking Manual
					</div>
					<div className='flex items-center gap-3'>
						<span className='w-6 h-6 bg-white text-primary flex items-center justify-center rounded-sm text-[10px]'>
							✓
						</span>{" "}
						mock() & jest.fn()
					</div>
					<div className='flex items-center gap-3'>
						<span className='w-6 h-6 bg-white text-primary flex items-center justify-center rounded-sm text-[10px]'>
							✓
						</span>{" "}
						spyOn() & Globais
					</div>
					<div className='flex items-center gap-3'>
						<span className='w-6 h-6 bg-white text-primary flex items-center justify-center rounded-sm text-[10px]'>
							✓
						</span>{" "}
						mock.module() Interceptors
					</div>
					<div className='flex items-center gap-3'>
						<span className='w-6 h-6 bg-white text-primary flex items-center justify-center rounded-sm text-[10px]'>
							✓
						</span>{" "}
						Time Travel (setSystemTime)
					</div>
					<div className='flex items-center gap-3'>
						<span className='w-6 h-6 bg-white text-primary flex items-center justify-center rounded-sm text-[10px]'>
							✓
						</span>{" "}
						Mock Factories
					</div>
				</div>
			</Box>

			{/* FOOTER */}
			<div className='flex items-center justify-between border-t-8 border-black dark:border-white pt-12 pb-32 mb-20'>
				<p className='font-black uppercase text-2xl italic text-primary'>
					Módulo 3 Finalizado
				</p>
				<p className='font-black uppercase text-2xl italic text-zinc-400'>
					Próximo: Módulo 4 — Testes Assíncronos & APIs
				</p>
			</div>
		</>
	),
	ejercicios: [],
};
