import type { ConferenciaData } from "../../types";
import { CodeBlock } from "../../components/CodeBlock";
import { Callout, Box } from "../../components/CourseComponents";

export const data: ConferenciaData = {
	titulo: "2.6 Organização de testes com describe, it e test",
	objetivos: [
		"Usar describe, test e it com consciência e propósito, entendendo a diferença entre os dois últimos.",
		"Organizar suites de testes complexas usando hierarquias de describe que comunicam intenção claramente.",
		"Aplicar as convenções de nomenclatura profissionais: Given/When/Then e Should.",
		"Usar test.only e describe.only para focar em testes específicos durante o desenvolvimento.",
		"Usar test.skip e describe.skip para desativar testes temporariamente com responsabilidade.",
		"Identificar os sinais de uma suite de testes mal organizada e aplicar refatorações concretas.",
		"Criar um ficheiro de configuração de testes reutilizável para o projeto.",
	],
	contenido: (
		<>
			{/* METADATA DA CONFERÊNCIA */}
			<div className='flex flex-wrap gap-4 mb-10'>
				<span className='px-4 py-2 bg-zinc-900 text-white dark:bg-zinc-100 dark:text-black font-black uppercase text-sm brutalist-shadow'>
					⏱️ Duração: 2 Horas
				</span>
				<span className='px-4 py-2 bg-primary text-white font-black uppercase text-sm brutalist-shadow'>
					🔑 Pré-requisitos: Conferências 2.1 a 2.5 concluídas
				</span>
			</div>

			{/* INTRODUÇÃO */}
			<Box className='bg-primary/10 border-black dark:border-white mb-16 p-10 shadow-[12px_12px_0px_0px_rgba(255,50,150,1)] dark:shadow-[12px_12px_0px_0px_rgba(255,50,150,0.5)] relative overflow-hidden'>
				<h3 className='text-3xl font-black uppercase mb-6 text-primary flex items-center gap-3'>
					<span className='w-12 h-12 flex items-center justify-center bg-black text-white dark:bg-white dark:text-black rounded-full text-xl'>
						📚
					</span>
					Introdução — A organização importa tanto quanto o código
				</h3>
				<div className='space-y-4 text-lg leading-relaxed text-zinc-800 dark:text-zinc-200'>
					<p>
						Pense numa biblioteca. Se os livros estivessem empilhados
						aleatoriamente no chão, a biblioteca seria inútil. A organização por
						categorias, autores e títulos é o que torna a biblioteca valiosa.
					</p>
					<p>
						No testing é igual. Você pode ter 500 testes excelentes, mas se
						estiverem desorganizados o valor da suite desaparece. Quando um
						teste falha às 2 da manhã num deploy, você precisa encontrar o
						problema em segundos.
					</p>
					<p className='font-black text-2xl py-6 px-8 border-l-8 border-primary bg-white dark:bg-zinc-900 shadow-brutalist uppercase italic tracking-tighter'>
						"A organização de testes não é cosmética. É funcional."
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
						test vs it — qual a diferença?
					</span>
				</h2>

				<div className='grid grid-cols-1 xl:grid-cols-2 gap-10 items-start'>
					<Box className='border-zinc-900 dark:border-zinc-100'>
						<h4 className='text-xl font-black uppercase mb-4 text-primary'>
							Estilo Técnico (test)
						</h4>
						<p className='text-sm mb-4 italic'>
							Lê-se como uma especificação técnica direta.
						</p>
						<CodeBlock
							language='typescript'
							code={`test("calcula a soma corretamente", () => {\n  expect(1 + 1).toBe(2);\n});`}
						/>
					</Box>
					<Box className='border-zinc-900 dark:border-zinc-100'>
						<h4 className='text-xl font-black uppercase mb-4 text-secondary'>
							Estilo Natural (it)
						</h4>
						<p className='text-sm mb-4 italic'>
							O <code>it</code> completa a frase com o <code>describe</code>.
						</p>
						<CodeBlock
							language='typescript'
							code={`describe("a função soma", () => {\n  it("deve calcular o total corretamente", () => {\n    expect(1 + 1).toBe(2);\n  });\n});`}
						/>
					</Box>
				</div>
				<p className='mt-8 text-lg font-medium border-l-4 border-primary pl-4'>
					No Bun, ambos são aliases e funcionam exatamente igual. O importante é
					manter a consistência no projeto.
				</p>
			</section>

			{/* PARTE 2 */}
			<section className='mb-24'>
				<h2 className='text-4xl font-black uppercase mb-12 flex items-center gap-4'>
					<span className='px-4 py-2 bg-black text-white dark:bg-white dark:text-black'>
						PARTE 2
					</span>
					<span className='border-b-8 border-emerald-500'>
						Hierarquias de describe
					</span>
				</h2>

				<div className='space-y-8'>
					<p className='text-xl font-black uppercase italic tracking-tighter'>
						Fase Profissional: Hierarquia por cenário
					</p>
					<Box className='border-emerald-500 p-0 overflow-hidden shadow-brutalist'>
						<CodeBlock
							language='typescript'
							code={`describe("autenticar", () => {\n  describe("quando as credenciais estão corretas", () => {\n    test("retorna status 'autenticado'", () => { ... });\n    test("gera um token de sessão", () => { ... });\n  });\n\n  describe("quando a conta está bloqueada", () => {\n    test("retorna 'bloqueada' mesmo com senha certa", () => { ... });\n  });\n});`}
						/>
					</Box>
					<Box className='mt-8 bg-zinc-100 dark:bg-zinc-800 border-none p-8'>
						<p className='text-lg font-black uppercase mb-4 text-primary italic'>
							Saída no terminal:
						</p>
						<p className='font-mono text-sm text-green-500'>
							✓ autenticar &gt; quando as credenciais estão corretas &gt;
							retorna status 'autenticado'
						</p>
						<p className='font-mono text-sm text-green-500'>
							✓ autenticar &gt; quando as credenciais estão corretas &gt; gera
							um token de sessão
						</p>
						<p className='font-mono text-sm text-green-500'>
							✓ autenticar &gt; quando a conta está bloqueada &gt; retorna
							'bloqueada' mesmo com senha certa
						</p>
					</Box>
				</div>
			</section>

			{/* PARTE 3 */}
			<section className='mb-24'>
				<h2 className='text-4xl font-black uppercase mb-12 flex items-center gap-4'>
					<span className='px-4 py-2 bg-black text-white dark:bg-white dark:text-black'>
						PARTE 3
					</span>
					<span className='border-b-8 border-secondary'>
						Convenções Profissionais
					</span>
				</h2>

				<div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
					<Box className='border-secondary bg-secondary/5'>
						<h4 className='text-xl font-black uppercase mb-4'>
							Given/When/Then (GWT)
						</h4>
						<p className='text-xs font-bold uppercase mb-4 opacity-60'>
							Focado em BDD e histórias
						</p>
						<ul className='space-y-2 text-sm'>
							<li>• **Given**: Dado que a conta tem saldo</li>
							<li>• **When**: Quando transfiro 500</li>
							<li>• **Then**: Então o saldo reduz</li>
						</ul>
					</Box>
					<Box className='border-primary bg-primary/5'>
						<h4 className='text-xl font-black uppercase mb-4'>
							Convenção Should
						</h4>
						<p className='text-xs font-bold uppercase mb-4 opacity-60'>
							Simples e Direto
						</p>
						<ul className='space-y-2 text-sm'>
							<li>• deve autenticar com sucesso</li>
							<li>• não deve permitir acesso anónimo</li>
							<li>• deve lançar erro se o email for inválido</li>
						</ul>
					</Box>
				</div>
			</section>

			{/* PARTE 4 */}
			<section className='mb-24 relative overflow-hidden'>
				<div className='absolute -right-10 top-20 text-[15rem] leading-none text-red-500/5 font-black pointer-events-none'>
					ONLY
				</div>
				<h2 className='text-4xl font-black uppercase mb-12 flex items-center gap-4'>
					<span className='px-4 py-2 bg-red-500 text-white'>PARTE 4</span>
					<span className='border-b-8 border-red-500'>
						test.only e describe.only
					</span>
				</h2>

				<Box className='bg-zinc-50 dark:bg-zinc-900 border-red-500'>
					<p className='text-lg mb-6 leading-relaxed'>
						Durante o desenvolvimento, foca-te apenas no que estás a trabalhar.
						O Bun ignorará todos os outros testes do ficheiro.
					</p>
					<CodeBlock
						language='typescript'
						code={`// Apenas os testes dentro deste describe serão executados\ndescribe.only("modulo-em-desenvolvimento", () => {\n  test("teste critico", () => { ... });\n});`}
					/>
					<Callout
						type='warning'
						title='⚠️ PERIGO'
						className='mt-8 border-red-500'
					>
						**Nunca faças commit com .only!** Isso fará com que todos os outros
						testes sejam ignorados na pipeline de CI/CD, permitindo que bugs
						passem.
					</Callout>
				</Box>
			</section>

			{/* PARTE 5 */}
			<section className='mb-24'>
				<h2 className='text-4xl font-black uppercase mb-12 flex items-center gap-4'>
					<span className='px-4 py-2 bg-zinc-400 text-white'>PARTE 5</span>
					<span className='border-b-8 border-zinc-400'>
						test.skip e describe.skip
					</span>
				</h2>

				<p className='text-lg mb-8'>
					Desativa testes temporariamente sem os apagar. Útil para
					funcionalidades ainda não implementadas.
				</p>
				<CodeBlock
					language='typescript'
					code={`test.skip("pagamento com Multicaixa Express", () => {\n  // Integração ainda não concluída pelo provedor\n});`}
				/>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-8'>
					<div className='p-4 border-l-4 border-green-500 bg-green-50/20'>
						<span className='font-black text-green-600 uppercase text-xs'>
							✅ Uso Correto
						</span>
						<p className='text-sm'>
							Funcionalidade em desenvolvimento ativo ou serviço externo
							indisponível.
						</p>
					</div>
					<div className='p-4 border-l-4 border-red-500 bg-red-50/20'>
						<span className='font-black text-red-600 uppercase text-xs'>
							❌ Uso Incorreto
						</span>
						<p className='text-sm'>
							Esconder falhas sem investigar "porque deve estar estragado".
						</p>
					</div>
				</div>
			</section>

			{/* PARTE 6 */}
			<section className='mb-24'>
				<h2 className='text-4xl font-black uppercase mb-12 flex items-center gap-4'>
					<span className='px-4 py-2 bg-primary text-white'>PARTE 6</span>
					<span className='border-b-8 border-primary'>
						Refatoração de Suites
					</span>
				</h2>

				<div className='space-y-6'>
					<p className='text-lg'>
						Identifica os sinais de uma suite caótica: nomes genéricos, blocos
						gigante sem separação, ausência de contexto.
					</p>
					<div className='grid grid-cols-1 xl:grid-cols-2 gap-8 mt-10'>
						<Box className='border-zinc-300 dark:border-zinc-700 opacity-60'>
							<h5 className='font-black uppercase mb-4 text-zinc-400 italic strike-through'>
								Caos (Antes)
							</h5>
							<ul className='text-xs font-mono space-y-1'>
								<li>test("ok", ...)</li>
								<li>test("erro", ...)</li>
								<li>test("admin", ...)</li>
							</ul>
						</Box>
						<Box className='border-primary shadow-brutalist'>
							<h5 className='font-black uppercase mb-4 text-primary italic'>
								Profissional (Depois)
							</h5>
							<ul className='text-xs font-mono space-y-1'>
								<li>describe("autenticar") {`{`}</li>
								<li className='pl-4'>describe("com senha certa") {`{`}</li>
								<li className='pl-8'>it("deve entrar")</li>
							</ul>
						</Box>
					</div>
				</div>
			</section>

			{/* PARTE 7 */}
			<section className='mb-24'>
				<h2 className='text-4xl font-black uppercase mb-12 flex items-center gap-4'>
					<span className='px-4 py-2 bg-zinc-950 text-white dark:bg-white dark:text-black'>
						PARTE 7
					</span>
					<span className='border-b-8 border-zinc-950 dark:border-zinc-50'>
						Configuração Global: bunfig.toml
					</span>
				</h2>

				<Box className='bg-zinc-950 text-white p-10 border-none shadow-brutalist'>
					<p className='text-lg mb-6 leading-relaxed text-zinc-400 uppercase font-black'>
						Setup Centralizado
					</p>
					<CodeBlock
						language='toml'
						code={`# bunfig.toml\n[test]\npreload = ["./src/test-setup.ts"]\ntimeout = 5000\ninclude = ["src/**/*.test.ts"]`}
					/>
					<p className='mt-6 text-sm italic'>
						Ficheiros de setup permitem injetar matchers e variáveis de ambiente
						em TODOS os testes automaticamente.
					</p>
				</Box>
			</section>

			{/* RESUMO */}
			<section className='my-32 p-16 bg-zinc-950 text-white border-8 border-primary shadow-[20px_20px_0px_0px_rgba(255,50,150,0.5)] relative overflow-hidden'>
				<div className='absolute -right-20 -top-20 w-80 h-80 bg-primary/20 rounded-full blur-[100px]' />
				<h3 className='text-6xl font-black uppercase mb-12 relative z-10 text-primary italic'>
					RESUMO
				</h3>
				<div className='space-y-6 relative z-10'>
					{[
						"Aliases — test para especificações técnicas, it para frases naturais.",
						"Hierarquias — Use describe para criar árvores de cenários que narram o comportamento.",
						"Convenções — Given/When/Then ou Should garantem consistência entre equipas.",
						"Focus & Skip — Ferramentas de desenvolvimento para focar no que importa ou ignorar o temporal.",
						"Sinais de Qualidade — Legibilidade, isolamento absoluto e responsabilidade única.",
						"Bunfig — Centralize o setup global (matchers, env) para evitar repetição.",
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
						Crie o ficheiro <code>src/modulo-01/sistema-hotel.test.ts</code> e
						teste um sistema de reservas de hotel:
					</p>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
						<div className='p-6 bg-white dark:bg-zinc-900 border-4 border-emerald-500 shadow-brutalist'>
							<h4 className='font-black uppercase mb-4 text-emerald-500'>
								Obrigatoriedade GWT
							</h4>
							<p className='text-sm italic'>
								Use describe("dado que...") e it("entao...") em toda a suite.
							</p>
						</div>
						<div className='p-6 bg-white dark:bg-zinc-900 border-4 border-amber-500 shadow-brutalist'>
							<h4 className='font-black uppercase mb-4 text-amber-500'>
								Cenários de Fronteira
							</h4>
							<p className='text-sm italic'>
								Data de saída antes da entrada, quartos lotados e cancelamentos
								impossíveis.
							</p>
						</div>
					</div>
					<div className='p-8 bg-zinc-950 text-white font-black italic uppercase tracking-tight text-center relative'>
						<div className='absolute left-2 top-2 text-primary'>⚠️</div>
						Mínimo de 16 testes e o output deve ler como frases perfeitas em
						português!
					</div>
				</div>
			</Box>

			{/* CONTEXTO DE CONCLUSÃO DO MÓDULO */}
			<section className='mb-32 p-12 border-8 border-black dark:border-white bg-zinc-100 dark:bg-zinc-800'>
				<div className='flex items-center gap-6 mb-8'>
					<div className='w-20 h-20 bg-green-500 flex items-center justify-center text-white text-4xl font-black rounded-br-3xl border-4 border-black'>
						✓
					</div>
					<div>
						<h4 className='text-4xl font-black uppercase leading-none'>
							Módulo 2 Completo
						</h4>
						<p className='text-zinc-500 font-bold uppercase tracking-widest'>
							Fundamentos do Testing
						</p>
					</div>
				</div>
				<p className='text-lg leading-relaxed mb-6 font-medium'>
					Percorremos o caminho completo: desde a anatomia de um teste, passando
					pela pirâmide e matchers, até à organização profissional. Estás pronto
					para o próximo nível.
				</p>
				<div className='bg-primary text-white p-6 inline-block font-black uppercase italic tracking-tighter transform hover:-rotate-1 transition-transform'>
					No Módulo 3 entramos no coração do curso: MOCKING.
				</div>
			</section>

			{/* FOOTER */}
			<div className='flex items-center justify-between border-t-8 border-black dark:border-white pt-12 pb-32 mb-20'>
				<p className='font-black uppercase text-2xl italic text-primary'>
					Conferência 2.6 — Fim
				</p>
				<p className='font-black uppercase text-2xl italic text-zinc-400'>
					Próxima: 3.1 — O Segredo dos Mocks
				</p>
			</div>
		</>
	),
	ejercicios: [],
};
