import type { ConferenciaData } from "../../types";
import { CodeBlock } from "../../components/CodeBlock";
import { Box } from "../../components/CourseComponents";

export const data: ConferenciaData = {
	titulo: "3.6 Mocking avançado: retornos, implementações e reset",
	objetivos: [
		"Combinar múltiplas técnicas de mocking num único teste complexo.",
		"Usar mockReturnValueOnce em sequências para simular comportamentos evolutivos.",
		"Criar fábricas de mocks reutilizáveis para evitar repetição entre ficheiros de teste.",
		"Testar cenários de erro em cascata onde múltiplas dependências falham.",
		"Usar mock.calls e mock.results para verificações avançadas de comportamento.",
		"Aplicar o padrão de reset completo entre suites para garantir isolamento total.",
		"Identificar e corrigir os anti-padrões mais comuns no mocking avançado.",
	],
	contenido: (
		<>
			{/* METADATA DA CONFERÊNCIA */}
			<div className='flex flex-wrap gap-4 mb-10'>
				<span className='px-4 py-2 bg-zinc-900 text-white dark:bg-zinc-100 dark:text-black font-black uppercase text-sm brutalist-shadow'>
					⏱️ Duração: 2 Horas
				</span>
				<span className='px-4 py-2 bg-primary text-white font-black uppercase text-sm brutalist-shadow'>
					🔑 Pré-requisitos: Conferências 3.2 a 3.5 concluídas
				</span>
			</div>

			{/* INTRODUÇÃO */}
			<Box className='bg-primary/10 border-black dark:border-white mb-16 p-10 shadow-[12px_12px_0px_0px_rgba(255,50,150,1)] dark:shadow-[12px_12px_0px_0px_rgba(255,50,150,0.5)] relative overflow-hidden'>
				<h3 className='text-3xl font-black uppercase mb-6 text-primary flex items-center gap-3'>
					<span className='w-12 h-12 flex items-center justify-center bg-black text-white dark:bg-white dark:text-black rounded-full text-xl'>
						🚀
					</span>
					Mocking Profissional: Do Isolamento à Integração
				</h3>
				<div className='space-y-4 text-lg leading-relaxed text-zinc-800 dark:text-zinc-200'>
					<p>
						Já conheces as ferramentas individuais. Agora vamos aprender a
						orquestrá-las. Na vida real, os sistemas têm múltiplas dependências
						agindo em simultâneo: bases de dados que falham, APIs com limites de
						taxa (rate limiting) e caches que expiram.
					</p>
					<p className='font-black text-2xl py-6 px-8 border-l-8 border-primary bg-white dark:bg-zinc-900 shadow-brutalist uppercase italic tracking-tighter text-primary'>
						"Testar a perfeição é fácil. Testar o caos exige maestria."
					</p>
				</div>
			</Box>

			{/* PARTE 1 */}
			<section className='mb-24 relative'>
				<h2 className='text-4xl font-black uppercase mb-8 flex items-center gap-4 group'>
					<span className='px-4 py-2 bg-black text-white dark:bg-white dark:text-black group-hover:bg-primary transition-colors font-black'>
						PARTE 1
					</span>
					<span className='border-b-8 border-primary font-black uppercase'>
						Sequências de Evolução
					</span>
				</h2>

				<Box className='border-zinc-900 dark:border-zinc-100 shadow-brutalist mb-8'>
					<p className='text-lg mb-6'>
						Usa o <code>mockReturnValueOnce()</code> em cadeia para simular um
						sistema que tenta, falha, tenta de novo e finalmente recupera.
					</p>
					<CodeBlock
						language='typescript'
						code={`const servico = mock()\n  .mockResolvedValueOnce({ sucesso: false }) // falha 1ª\n  .mockResolvedValueOnce({ sucesso: false }) // falha 2ª\n  .mockResolvedValueOnce({ sucesso: true });  // sucesso 3ª\n\nconst r = await processarComRetry(servico);\nexpect(r.tentativas).toBe(3);`}
					/>
				</Box>
			</section>

			{/* PARTE 2 */}
			<section className='mb-24 relative'>
				<div className='absolute -right-10 top-20 text-[10rem] text-emerald-500/5 font-black pointer-events-none uppercase'>
					FACTORY
				</div>
				<h2 className='text-4xl font-black uppercase mb-12 flex items-center gap-4'>
					<span className='px-4 py-2 bg-emerald-500 text-white font-black uppercase'>
						PARTE 2
					</span>
					<span className='border-b-8 border-emerald-500 font-black uppercase'>
						Fábricas de Mocks Reutilizáveis
					</span>
				</h2>

				<Box className='border-emerald-500 p-0 overflow-hidden mb-8'>
					<div className='p-4 bg-emerald-500 text-white font-black uppercase text-xs tracking-widest'>
						Don't Repeat Your Mocks (DRYM)
					</div>
					<div className='p-8'>
						<p className='text-lg mb-6'>
							Em vez de configurar os mesmos repositórios em 20 ficheiros de
							teste, cria uma função factory que devolve os mocks prontos.
						</p>
						<CodeBlock
							language='typescript'
							code={`export function criarRepoMock() {\n  return {\n    buscar: mock(async () => ({ id: 1, nome: "Padrão" })),\n    guardar: mock(async () => true)\n  };\n}`}
						/>
					</div>
				</Box>
			</section>

			{/* PARTE 3 */}
			<section className='mb-24'>
				<h2 className='text-4xl font-black uppercase mb-12 flex items-center gap-4 text-secondary'>
					<span className='px-4 py-2 bg-secondary text-white font-black uppercase'>
						PARTE 3
					</span>
					<span className='border-b-8 border-secondary font-black uppercase'>
						Erros em Cascata
					</span>
				</h2>

				<div className='space-y-6'>
					<p className='text-lg leading-relaxed'>
						Testa cenários onde a falha de uma dependência (como a validação de
						conta) interrompe imediatamente e dispara outras (como o registo de
						auditoria e notificação).
					</p>
					<Box className='border-secondary bg-secondary/5'>
						<h4 className='font-black uppercase mb-4'>Fluxo de Falha</h4>
						<ul className='space-y-3 font-bold'>
							<li className='flex items-center gap-2'>
								<span className='text-secondary'>✖</span> API de Pagamento
								(Timeout)
							</li>
							<li className='flex items-center gap-2'>
								<span className='text-emerald-500'>✔</span> Auditoria (Regista
								falha)
							</li>
							<li className='flex items-center gap-2'>
								<span className='text-emerald-500'>✔</span> Email (Notifica
								Utilizador)
							</li>
						</ul>
					</Box>
				</div>
			</section>

			{/* PARTE 4 */}
			<section className='mb-24'>
				<h2 className='text-4xl font-black uppercase mb-12 flex items-center gap-4'>
					<span className='px-4 py-2 bg-red-600 text-white font-black uppercase'>
						PARTE 4
					</span>
					<span className='border-b-8 border-red-600 font-black uppercase'>
						Anti-padrões: O que evitar
					</span>
				</h2>

				<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					<Box className='border-red-600 bg-red-50 dark:bg-red-950/20'>
						<h5 className='font-black uppercase text-red-600 mb-2'>
							Mocks que sabem demais
						</h5>
						<p className='text-sm italic'>
							Testar <strong>COMO</strong> a função funciona (ex: chamou o repo
							2 vezes) em vez de <strong>O QUE</strong> ela devolve.
						</p>
					</Box>
					<Box className='border-red-600 bg-red-50 dark:bg-red-950/20'>
						<h5 className='font-black uppercase text-red-600 mb-2'>
							Teste do Mock
						</h5>
						<p className='text-sm italic'>
							Configurar o mock para retornar "X" e logo a seguir dar{" "}
							<code>expect(valor).toBe("X")</code>. Estás a testar o framework,
							não o teu código!
						</p>
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
						"Sequências — Simula estados evolutivos de sucesso e falha.",
						"Factories — Centraliza a criação de mocks para garantir consistência.",
						"Cascata — Valida interações complexas entre múltiplos subsistemas.",
						"Comportamento — Foca os testes no resultado final, não na implementação interna.",
						"Reset — Mantém as suites isoladas recriando os mocks a cada teste.",
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
						Cria a <strong>Fábrica ISPM</strong> em{" "}
						<code>src/modulo-02/avancado/fabrica-ispm.ts</code>:
					</p>
					<ul className='space-y-4 font-bold uppercase text-sm tracking-tight'>
						<li>
							1. Implementa o <code>criarMockServicoPauta()</code> com
							lançamentos e médias.
						</li>
						<li>
							2. Testa o encerramento de pautas onde 1 falha mas as outras 14
							devem completar com sucesso.
						</li>
						<li>
							3. Usa o <code>mockImplementation</code> para simular atrasos ou
							efeitos colaterais.
						</li>
						<li>
							4. Garante que os testes verificam se os emails foram enviados
							apenas para os alunos aprovados.
						</li>
					</ul>
					<div className='p-8 bg-zinc-950 text-white font-black italic uppercase tracking-tight text-center mt-10 shadow-brutalist'>
						"O teste avançado é a rede de segurança que permite refactorar
						sistemas complexos com confiança absoluta."
					</div>
				</div>
			</Box>

			{/* FOOTER */}
			<div className='flex items-center justify-between border-t-8 border-black dark:border-white pt-12 pb-32 mb-20'>
				<p className='font-black uppercase text-2xl italic text-primary'>
					Conferência 3.6 — Fim
				</p>
				<p className='font-black uppercase text-2xl italic text-zinc-400'>
					Próxima: 3.7 — Workshop Prático: Mocks Reais
				</p>
			</div>
		</>
	),
	ejercicios: [],
};
