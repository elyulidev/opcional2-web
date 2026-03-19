import type { ConferenciaData } from "../../types";
import { CodeBlock } from "../../components/CodeBlock";
import { Callout, Box } from "../../components/CourseComponents";

export const data: ConferenciaData = {
	titulo: "3.1 O que é um Mock? Controlar o mundo para testar",
	objetivos: [
		"Explicar com suas próprias palavras o que é um mock e qual problema ele resolve.",
		"Distinguir os três tipos de dublês de teste: stubs, mocks e spies.",
		"Identificar quando uma função tem dependências que precisam ser controladas nos testes.",
		"Explicar por que testar com dependências reais (banco de dados, APIs, relógio) é problemático.",
		"Reconhecer o padrão de injeção de dependências e como ele facilita o mocking.",
		"Escrever os primeiros exemplos de mocking manual — sem ferramentas ainda, apenas com funções substitutas.",
	],
	contenido: (
		<>
			{/* METADATA DA CONFERÊNCIA */}
			<div className='flex flex-wrap gap-4 mb-10'>
				<span className='px-4 py-2 bg-zinc-900 text-white dark:bg-zinc-100 dark:text-black font-black uppercase text-sm brutalist-shadow'>
					⏱️ Duração: 2 Horas
				</span>
				<span className='px-4 py-2 bg-primary text-white font-black uppercase text-sm brutalist-shadow'>
					🔑 Pré-requisitos: Módulo 2 completo
				</span>
			</div>

			{/* INTRODUÇÃO */}
			<Box className='bg-primary/10 border-black dark:border-white mb-16 p-10 shadow-[12px_12px_0px_0px_rgba(255,50,150,1)] dark:shadow-[12px_12px_0px_0px_rgba(255,50,150,0.5)] relative overflow-hidden'>
				<h3 className='text-3xl font-black uppercase mb-6 text-primary flex items-center gap-3'>
					<span className='w-12 h-12 flex items-center justify-center bg-black text-white dark:bg-white dark:text-black rounded-full text-xl'>
						🎭
					</span>
					Introdução — O problema que o mocking resolve
				</h3>
				<div className='space-y-4 text-lg leading-relaxed text-zinc-800 dark:text-zinc-200'>
					<p>
						Até agora testamos funções puras: previsíveis e fáceis. Mas o mundo
						real envolve base de dados, APIs externas, emails, relógios e
						ficheiros.
					</p>
					<p>
						O mundo exterior é imprevisível, lento, caro e difícil de controlar.
						O mocking é a nossa solução para criar ambientes de teste estáveis e
						rápidos.
					</p>
					<p className='font-black text-2xl py-6 px-8 border-l-8 border-primary bg-white dark:bg-zinc-900 shadow-brutalist uppercase italic tracking-tighter'>
						"O mocking permite-nos controlar o incontrolável."
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
						O Problema do Mundo Real
					</span>
				</h2>

				<Box className='border-zinc-900 dark:border-zinc-100'>
					<h4 className='text-xl font-black uppercase mb-4 text-primary italic'>
						O pesadelo das dependências reais
					</h4>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-8 mt-6'>
						<div className='p-4 border-2 border-black dark:border-white'>
							<span className='font-black uppercase text-xs bg-black text-white px-2 py-1'>
								DADOS
							</span>
							<p className='text-sm mt-2'>
								Bancos de dados reais exigem setup complexo, são lentos e falham
								por rede.
							</p>
						</div>
						<div className='p-4 border-2 border-black dark:border-white'>
							<span className='font-black uppercase text-xs bg-primary text-white px-2 py-1'>
								EFEITOS
							</span>
							<p className='text-sm mt-2'>
								Enviar emails reais de teste 50 vezes por dia satura caixas de
								correio.
							</p>
						</div>
						<div className='p-4 border-2 border-black dark:border-white'>
							<span className='font-black uppercase text-xs bg-secondary text-white px-2 py-1'>
								TEMPO
							</span>
							<p className='text-sm mt-2'>
								Testar regras datadas (ex: matrículas só em Março) depende do
								mês atual.
							</p>
						</div>
						<div className='p-4 border-2 border-black dark:border-white'>
							<span className='font-black uppercase text-xs bg-emerald-500 text-white px-2 py-1'>
								CUSTO
							</span>
							<p className='text-sm mt-2'>
								APIs externas de pagamento ou SMS cobram dinheiro real por cada
								teste.
							</p>
						</div>
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
						A Analogia do Dublê
					</span>
				</h2>
				<Box className='bg-emerald-50/20 border-emerald-500 shadow-brutalist p-10 flex flex-col md:flex-row gap-8 items-center'>
					<div className='text-6xl'>🎬</div>
					<div className='space-y-4'>
						<p className='text-lg leading-relaxed'>
							Pense num filme de ação. O ator protagonista não salta de prédios
							em chamas. Usa-se um **dublê**.
						</p>
						<p className='text-lg leading-relaxed'>
							O dublê tem a mesma aparência (interface), faz o que o diretor
							manda e permite repetir a cena com segurança. Nos testes, os mocks
							são os dublês das nossas dependências perigosas.
						</p>
					</div>
				</Box>
			</section>

			{/* PARTE 3 */}
			<section className='mb-24 relative'>
				<div className='absolute -left-10 top-20 text-[10rem] text-primary/5 font-black pointer-events-none'>
					FAKE
				</div>
				<h2 className='text-4xl font-black uppercase mb-12 flex items-center gap-4'>
					<span className='px-4 py-2 bg-black text-white dark:bg-white dark:text-black'>
						PARTE 3
					</span>
					<span className='border-b-8 border-secondary'>
						Tipos de Dublês de Teste
					</span>
				</h2>

				<div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
					<Box className='border-zinc-400'>
						<h4 className='font-black uppercase mb-2 text-primary'>Stub</h4>
						<p className='text-xs opacity-60 mb-4'>O Passivo</p>
						<p className='text-sm mb-6'>
							Apenas fornece dados fixos. Como um figurante no fundo da cena.
						</p>
						<div className='bg-zinc-100 dark:bg-zinc-800 p-2 text-[10px] font-mono'>
							{`{ buscar: () => ({ id: 1 }) }`}
						</div>
					</Box>
					<Box className='border-zinc-950 dark:border-zinc-50'>
						<h4 className='font-black uppercase mb-2 text-primary'>Mock</h4>
						<p className='text-xs opacity-60 mb-4'>O Ativo</p>
						<p className='text-sm mb-6'>
							Verifica se foi chamado corretamente (argumentos, contagem).
						</p>
						<div className='bg-zinc-100 dark:bg-zinc-800 p-2 text-[10px] font-mono'>
							{`expect(mock).toHaveBeenCalledWith(...)`}
						</div>
					</Box>
					<Box className='border-secondary'>
						<h4 className='font-black uppercase mb-2 text-secondary'>Spy</h4>
						<p className='text-xs opacity-60 mb-4'>O Observador</p>
						<p className='text-sm mb-6'>
							Observa a função real sem substituir o seu comportamento original.
						</p>
						<div className='bg-zinc-100 dark:bg-zinc-800 p-2 text-[10px] font-mono'>
							{`const spy = spyOn(realObj, "method")`}
						</div>
					</Box>
				</div>
			</section>

			{/* PARTE 4 */}
			<section className='mb-24'>
				<h2 className='text-4xl font-black uppercase mb-12 flex items-center gap-4'>
					<span className='px-4 py-2 bg-black text-white dark:bg-white dark:text-black'>
						PARTE 4
					</span>
					<span className='border-b-8 border-primary'>
						Injeção de Dependências
					</span>
				</h2>

				<div className='space-y-10'>
					<Box className='border-red-500 bg-red-50/10'>
						<h4 className='text-xl font-black uppercase mb-4 text-red-500'>
							❌ Hardcoded (Difícil de Testar)
						</h4>
						<CodeBlock
							language='typescript'
							code={`async function processar() {\n  // Dependência criada dentro da função\n  const db = new BancoDeDadosReal();\n  const dados = await db.buscar();\n}`}
						/>
					</Box>
					<Box className='border-emerald-500 bg-emerald-50/10'>
						<h4 className='text-xl font-black uppercase mb-4 text-emerald-500'>
							✅ Injetada (Testável)
						</h4>
						<CodeBlock
							language='typescript'
							code={`async function processar(db: IDatabase) {\n  // Dependência é recebida como parâmetro\n  const dados = await db.buscar();\n}`}
						/>
					</Box>
					<Callout type='info' title='Mudança de Mentalidade'>
						Em vez de carregar as suas ferramentas, a função recebe as
						ferramentas prontas de quem a chama. Isto permite-nos passar
						"ferramentas de brincar" (mocks) durante os testes.
					</Callout>
				</div>
			</section>

			{/* PARTE 5 */}
			<section className='mb-24'>
				<h2 className='text-4xl font-black uppercase mb-12 flex items-center gap-4'>
					<span className='px-4 py-2 bg-zinc-950 text-white'>PARTE 5</span>
					<span className='border-b-8 border-zinc-950 dark:border-zinc-50'>
						Mocking Manual (A Base)
					</span>
				</h2>

				<div className='space-y-6 text-lg'>
					<p>
						Para entender o conceito, vamos construir mocks à mão sem usar
						ferramentas automáticas ainda.
					</p>
					<Box className='p-0 overflow-hidden border-4 border-black dark:border-white shadow-brutalist'>
						<CodeBlock
							language='typescript'
							code={`// Mock manual de um repositório\nconst repoMock: IRepositorio = {\n  buscarPorId: async (id) => ({\n    id, nome: "Ana", matriculaAtiva: true\n  }),\n  contar: async () => 2\n};\n\n// Podemos injetar este objeto no teste da nossa lógica`}
						/>
					</Box>
					<Callout type='info' title='Poder do Mocking'>
						Ao usar este mock, eliminamos 100% da necessidade de ter um servidor
						SQL online para testar se a nossa regra de negócio de "limite de
						disciplinas" funciona.
					</Callout>
				</div>
			</section>

			{/* PARTE 6 */}
			<section className='mb-24'>
				<h2 className='text-4xl font-black uppercase mb-12 flex items-center gap-4'>
					<span className='px-4 py-2 bg-primary text-white'>PARTE 6</span>
					<span className='border-b-8 border-primary'>
						Limitações do Manual
					</span>
				</h2>

				<div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
					<Box className='border-black dark:border-white bg-zinc-50 dark:bg-zinc-900'>
						<h4 className='font-black uppercase mb-4 text-primary'>
							Boilerplate Excessivo
						</h4>
						<p className='text-sm'>
							Em projetos reais, precisaríamos criar dezenas de objetos manuais
							para cada cenário (sucesso, erro, timeout).
						</p>
					</Box>
					<Box className='border-black dark:border-white bg-zinc-50 dark:bg-zinc-900'>
						<h4 className='font-black uppercase mb-4 text-secondary'>
							Verificação Frágil
						</h4>
						<p className='text-sm'>
							Para saber se uma função foi chamada, temos de usar variáveis
							globais manuais (ex: <code>emailEnviado = true</code>).
						</p>
					</Box>
				</div>
				<p className='mt-8 text-center font-black uppercase italic text-2xl animate-pulse'>
					É por isto que o Bun nos dá ferramentas automáticas!
				</p>
			</section>

			{/* RESUMO */}
			<section className='my-32 p-16 bg-zinc-950 text-white border-8 border-primary shadow-[20px_20px_0px_0px_rgba(255,50,150,0.5)] relative overflow-hidden'>
				<div className='absolute -right-20 -top-20 w-80 h-80 bg-primary/20 rounded-full blur-[100px]' />
				<h3 className='text-6xl font-black uppercase mb-12 relative z-10 text-primary italic'>
					RESUMO
				</h3>
				<div className='space-y-6 relative z-10'>
					{[
						"Problema — Dependências reais são lentas, caras e imprevisíveis.",
						"Mocks — Dublês controlados que substituem partes reais perigosas do sistema.",
						"Stubs vs Mocks — O stub só dá dados; o mock dá dados e permite verificar o uso.",
						"Injeção de Dependências — O padrão arquitetural obrigatório para que o mocking funcione.",
						"Mocking Manual — Útil para entender o conceito, mas verboso em escala.",
						"Próximo Passo — No Bun usaremos mock() e spyOn() para automatizar tudo isto.",
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
					<span className='text-6xl animate-bounce'>🧪</span>
				</h3>
				<div className='space-y-8 text-xl font-medium leading-relaxed text-zinc-800 dark:text-zinc-200'>
					<p>
						Crie o sistema de biblioteca em{" "}
						<code>src/modulo-02/sistema-biblioteca.test.ts</code>:
					</p>
					<ul className='space-y-4 font-bold uppercase text-sm tracking-tight'>
						<li>
							1. Defina interfaces para Repositório de Livros e Serviço de
							Notificações.
						</li>
						<li>
							2. Crie uma função <code>emprestarLivro</code> que injeta essas
							dependências.
						</li>
						<li>
							3. Implemente mocks manuais para cenários de "Livro Indisponível"
							e "Sucesso".
						</li>
						<li>
							4. Garanta que a notificação NÃO é enviada quando o empréstimo
							falha.
						</li>
					</ul>
					<div className='p-8 bg-zinc-950 text-white font-black italic uppercase tracking-tight text-center relative mt-10'>
						"Prove que consegue controlar o comportamento da função SEM usar uma
						base de dados real."
					</div>
				</div>
			</Box>

			{/* FOOTER */}
			<div className='flex items-center justify-between border-t-8 border-black dark:border-white pt-12 pb-32 mb-20'>
				<p className='font-black uppercase text-2xl italic text-primary'>
					Conferência 3.1 — Fim
				</p>
				<p className='font-black uppercase text-2xl italic text-zinc-400'>
					Próxima: 3.2 — mock() e jest.fn() — criando funções falsas
				</p>
			</div>
		</>
	),
	ejercicios: [],
};
