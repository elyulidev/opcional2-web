import type { ConferenciaData } from "../../types";
import { CodeBlock } from "../../components/CodeBlock";
import { Callout, Box } from "../../components/CourseComponents";

export const data: ConferenciaData = {
	titulo: "3.4 Mocking de módulos inteiros com mock.module()",
	objetivos: [
		"Explicar por que o mocking de módulos é necessário quando spyOn() e mock() não são suficientes.",
		"Usar mock.module() para interceptar importações de módulos inteiros.",
		"Fazer mock de módulos locais do próprio projeto.",
		"Fazer mock de módulos externos (pacotes npm/bun).",
		"Usar mock.module() com fábricas para controlar o comportamento dinamicamente.",
		"Restaurar módulos ao estado original com mock.restore().",
		"Identificar os padrões mais comuns de uso de mock.module() em projetos reais.",
	],
	contenido: (
		<>
			{/* METADATA DA CONFERÊNCIA */}
			<div className='flex flex-wrap gap-4 mb-10'>
				<span className='px-4 py-2 bg-zinc-900 text-white dark:bg-zinc-100 dark:text-black font-black uppercase text-sm brutalist-shadow'>
					⏱️ Duração: 2 Horas
				</span>
				<span className='px-4 py-2 bg-primary text-white font-black uppercase text-sm brutalist-shadow'>
					🔑 Pré-requisitos: Conferências 3.2 e 3.3 concluídas
				</span>
			</div>

			{/* INTRODUÇÃO */}
			<Box className='bg-primary/10 border-black dark:border-white mb-16 p-10 shadow-[12px_12px_0px_0px_rgba(255,50,150,1)] dark:shadow-[12px_12px_0px_0px_rgba(255,50,150,0.5)] relative overflow-hidden'>
				<h3 className='text-3xl font-black uppercase mb-6 text-primary flex items-center gap-3'>
					<span className='w-12 h-12 flex items-center justify-center bg-black text-white dark:bg-white dark:text-black rounded-full text-xl'>
						📦
					</span>
					Introdução — Interceptar a Importação
				</h3>
				<div className='space-y-4 text-lg leading-relaxed text-zinc-800 dark:text-zinc-200'>
					<p>
						Até aqui usamos spyOn() em objetos existentes. Mas e se a função estiver "solta" (standalone) e for importada diretamente no topo do ficheiro?
					</p>
					<p>
						Quando o código faz <code>import {"{ enviarEmail }"} from "./servico"</code>, não há um objeto óbvio para espionarmos. O <code>mock.module()</code> resolve isto interceptando o sistema de módulos do Bun.
					</p>
					<p className='font-black text-2xl py-6 px-8 border-l-8 border-primary bg-white dark:bg-zinc-900 shadow-brutalist uppercase italic tracking-tighter'>
						"Controla o que entra no teu código antes mesmo dele carregar."
					</p>
				</div>
			</Box>

			{/* PARTE 1 */}
			<section className='mb-24 relative'>
				<h2 className='text-4xl font-black uppercase mb-8 flex items-center gap-4 group'>
					<span className='px-4 py-2 bg-black text-white dark:bg-white dark:text-black group-hover:bg-primary transition-colors'>
						PARTE 1
					</span>
					<span className='border-b-8 border-primary'>
						Como funciona o Interceptador
					</span>
				</h2>

				<Box className='border-zinc-900 dark:border-zinc-100 shadow-brutalist'>
					<p className='text-lg mb-6 leading-relaxed'>
						O Bun permite-te dizer: "Sempre que alguém pedir por este caminho, entrega este mock em vez do ficheiro real".
					</p>
					<div className='p-6 bg-zinc-100 dark:bg-zinc-800 font-mono text-sm leading-relaxed border-l-4 border-primary'>
						<div className='text-emerald-500 font-bold'>// Fluxo do Bun:</div>
						<div className='mt-2'>1. Encontra mock.module("caminho")</div>
						<div>2. Regista a fábrica de mocks</div>
						<div>3. Carrega o código do teste</div>
						<div>4. Intercepta o <span className='bg-primary text-white px-1'>import</span> e devolve o mock ✓</div>
					</div>
				</Box>
			</section>

			{/* PARTE 2 */}
			<section className='mb-24'>
				<h2 className='text-4xl font-black uppercase mb-12 flex items-center gap-4'>
					<span className='px-4 py-2 bg-black text-white dark:bg-white dark:text-black'>
						PARTE 2
					</span>
					<span className='border-b-8 border-emerald-500'>
						Mocking de Módulos Locais
					</span>
				</h2>

				<div className='space-y-6'>
					<Callout type='danger' title='A Regra de Ouro' className='mb-8'>
						O <code>mock.module()</code> TEM de ser chamado ANTES de importares o ficheiro que queres testar.
					</Callout>
					<Box className='border-emerald-500 p-0 overflow-hidden'>
						<div className='p-4 bg-emerald-500 text-white font-black uppercase text-xs tracking-widest'>Teste de Fluxo de Pedidos</div>
						<CodeBlock 
							language="typescript"
							code={`import { mock } from "bun:test";\n\nconst emailMock = mock(() => {});\n\nmock.module("./servico-email", () => ({\n  enviar: emailMock\n}));\n\n// Só agora importamos o sistema que usa o email\nimport { processar } from "./processador";`}
						/>
					</Box>
				</div>
			</section>

			{/* PARTE 3 */}
			<section className='mb-24 relative'>
				<div className='absolute -left-10 top-20 text-[10rem] text-secondary/5 font-black pointer-events-none uppercase'>NPM</div>
				<h2 className='text-4xl font-black uppercase mb-12 flex items-center gap-4'>
					<span className='px-4 py-2 bg-black text-white dark:bg-white dark:text-black'>
						PARTE 3
					</span>
					<span className='border-b-8 border-secondary'>
						Módulos Externos e Nativos
					</span>
				</h2>

				<div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
					<Box className='border-secondary h-full'>
						<h4 className='font-black uppercase mb-4'>Bibliotecas (npm)</h4>
						<CodeBlock 
							language="typescript"
							code={`mock.module("axios", () => ({\n  default: {\n    get: mock(async () => ({}))\n  }\n}));`}
						/>
					</Box>
					<Box className='border-secondary h-full'>
						<h4 className='font-black uppercase mb-4'>Node Nativo</h4>
						<CodeBlock 
							language="typescript"
							code={`mock.module("node:fs", () => ({\n  readFileSync: mock(() => "data"),\n  existsSync: mock(() => true)\n}));`}
						/>
					</Box>
				</div>
			</section>

			{/* PARTE 4 */}
			<section className='mb-24'>
				<h2 className='text-4xl font-black uppercase mb-12 flex items-center gap-4'>
					<span className='px-4 py-2 bg-zinc-950 text-white'>
						PARTE 4
					</span>
					<span className='border-b-8 border-zinc-950 dark:border-zinc-50'>
						Mock Parcial
					</span>
				</h2>

				<Box className='border-zinc-900 dark:border-white bg-zinc-50 dark:bg-zinc-900'>
					<p className='text-lg mb-6 italic'>"Quero o original, mas com uma pequena alteração."</p>
					<CodeBlock 
						language="typescript"
						code={`const moduloReal = await import("./utils");\n\nmock.module("./utils", () => ({\n  ...moduloReal, // mantém o original\n  agora: mock(() => "2024-03-15") // altera só um!\n}));`}
					/>
				</Box>
			</section>

			{/* PARTE 5 & 6 */}
			<section className='mb-24'>
				<h2 className='text-4xl font-black uppercase mb-12 flex items-center gap-4'>
					<span className='px-4 py-2 bg-primary text-white'>
						PARTE 5
					</span>
					<span className='border-b-8 border-primary'>
						Restauração Global
					</span>
				</h2>

				<Box className='border-primary bg-primary/5'>
					<p className='text-lg mb-6 leading-relaxed'>
						Diferente do <code>mockRestore()</code> de spies, para módulos usamos <code>mock.restore()</code> no <code>afterAll</code> para limpar todos os interceptadores de uma vez.
					</p>
					<CodeBlock 
						language="typescript"
						code={`afterAll(() => {\n  mock.restore(); // Limpa todos os mock.module()\n});`}
					/>
				</Box>
			</section>

			{/* ARREPENDIMENTO / PITFALLS */}
			<section className='mb-24'>
				<h2 className='text-3xl font-black uppercase mb-8 border-l-8 border-red-500 pl-4'>
					Armadilhas Comuns
				</h2>
				<div className='space-y-4'>
					<div className='p-6 border-2 border-black dark:border-white bg-red-500/5'>
						<p className='font-black uppercase text-sm text-red-500 mb-2'>1. Erro de Caminho</p>
						<p className='text-sm italic opacity-80'>O caminho no <code>mock.module()</code> tem de ser EXACTAMENTE o mesmo usado no import do ficheiro real.</p>
					</div>
					<div className='p-6 border-2 border-black dark:border-white bg-red-500/5'>
						<p className='font-black uppercase text-sm text-red-500 mb-2'>2. Exportações em Falta</p>
						<p className='text-sm italic opacity-80'>Se o módulo real exporta 5 coisas e tu só mockas 1, as outras 4 serão <code>undefined</code> no código real.</p>
					</div>
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
						"Problema — Funções importadas diretamente não têm um objeto pai para spyOn().",
						"Mecânica — mock.module() intercepta o fluxo do sistema de módulos do Bun.",
						"Prioridade — Deve ser declarado ANTES do import do módulo que consome a dependência.",
						"Escopo — Pode ser usado para módulos locais, pacotes npm e módulos nativos do Node/Bun.",
						"Higiene — Use mock.restore() no afterAll para limpar o sistema de módulos.",
						"Partial Mocking — Permite manter partes reais e substituir apenas o problemático.",
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
					<span className='text-6xl animate-bounce'>🏗️</span>
				</h3>
				<div className='space-y-8 text-xl font-medium leading-relaxed text-zinc-800 dark:text-zinc-200'>
					<p>
						Crie o gerador de relatórios em <code>src/modulo-02/modulos/gerador-relatorios.test.ts</code>:
					</p>
					<ul className='space-y-4 font-bold uppercase text-sm tracking-tight'>
						<li>1. Use mock.module() para interceptar o <code>node:fs</code> (readFileSync/writeFileSync).</li>
						<li>2. Intercepte o serviço de email local para testar o envio sem efeitos reais.</li>
						<li>3. Teste o cenário de "Ficheiro não encontrado" e o cenário feliz.</li>
						<li>4. Garanta que o <code>mock.restore()</code> é chamado no final da suite.</li>
					</ul>
					<div className='p-8 bg-zinc-950 text-white font-black italic uppercase tracking-tight text-center mt-10 shadow-brutalist'>
						"Intercepte o sistema antes que ele intercepte o seu tempo de desenvolvimento."
					</div>
				</div>
			</Box>

			{/* FOOTER */}
			<div className='flex items-center justify-between border-t-8 border-black dark:border-white pt-12 pb-32 mb-20'>
				<p className='font-black uppercase text-2xl italic text-primary'>
					Conferência 3.4 — Fim
				</p>
				<p className='font-black uppercase text-2xl italic text-zinc-400'>
					Próxima: 3.5 — Mocking de Tempo: setSystemTime
				</p>
			</div>
		</>
	),
	ejercicios: [],
};
