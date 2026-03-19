import type { ConferenciaData } from "../../types";
import { CodeBlock } from "../../components/CodeBlock";
import { Callout, Box } from "../../components/CourseComponents";

export const data: ConferenciaData = {
	titulo: "3.2 mock() e jest.fn() — criando funções falsas",
	objetivos: [
		"Criar funções falsas com mock() e entender o que retornam.",
		"Usar mockReturnValue, mockReturnValueOnce e mockResolvedValue para controlar retornos.",
		"Usar mockImplementation e mockImplementationOnce para comportamentos complexos.",
		"Verificar chamadas com toHaveBeenCalled, toHaveBeenCalledTimes, toHaveBeenCalledWith.",
		"Inspecionar o histórico de chamadas via mock.calls e mock.results.",
		"Limpar e resetar mocks com mockClear, mockReset e mockRestore.",
		"Substituir o mocking manual da conferência anterior por mocks automáticos do bun:test.",
	],
	contenido: (
		<>
			{/* METADATA DA CONFERÊNCIA */}
			<div className='flex flex-wrap gap-4 mb-10'>
				<span className='px-4 py-2 bg-zinc-900 text-white dark:bg-zinc-100 dark:text-black font-black uppercase text-sm brutalist-shadow'>
					⏱️ Duração: 2 Horas
				</span>
				<span className='px-4 py-2 bg-primary text-white font-black uppercase text-sm brutalist-shadow'>
					🔑 Pré-requisitos: Conferência 3.1 concluída
				</span>
			</div>

			{/* INTRODUÇÃO */}
			<Box className='bg-primary/10 border-black dark:border-white mb-16 p-10 shadow-[12px_12px_0px_0px_rgba(255,50,150,1)] dark:shadow-[12px_12px_0px_0px_rgba(255,50,150,0.5)] relative overflow-hidden'>
				<h3 className='text-3xl font-black uppercase mb-6 text-primary flex items-center gap-3'>
					<span className='w-12 h-12 flex items-center justify-center bg-black text-white dark:bg-white dark:text-black rounded-full text-xl'>
						🤖
					</span>
					Introdução — Do manual ao automático
				</h3>
				<div className='space-y-4 text-lg leading-relaxed text-zinc-800 dark:text-zinc-200'>
					<p>
						Na conferência anterior fizemos mocking manual. Funcionou, mas era trabalhoso: gerenciávamos variáveis globais e resetávamos tudo no braço.
					</p>
					<p>
						O bun:test tem ferramentas que automatizam todo esse trabalho. A função <code>mock()</code> cria funções falsas que rastreiam automaticamente cada chamada, argumento e retorno sem precisares de escrever código extra de rastreio.
					</p>
					<p className='font-black text-2xl py-6 px-8 border-l-8 border-primary bg-white dark:bg-zinc-900 shadow-brutalist uppercase italic tracking-tighter'>
						"O mock() do Bun é o teu novo melhor amigo para testes isolados."
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
						Criando a primeira função falsa
					</span>
				</h2>

				<Box className='border-zinc-900 dark:border-zinc-100'>
					<p className='text-lg mb-6 leading-relaxed'>
						O <code>mock()</code> cria um "spy vazio" que pode ser chamado como qualquer função normal.
					</p>
					<CodeBlock 
						language="typescript"
						code={`import { mock, expect } from "bun:test";\n\nconst funcaoFalsa = mock(() => {});\nfuncaoFalsa();\nfuncaoFalsa();\n\nexpect(funcaoFalsa).toHaveBeenCalledTimes(2);`}
					/>
				</Box>
				<Callout type='info' title='Nota Técnica' className='mt-8'>
					O <code>mock()</code> do Bun é o equivalente direto ao <code>jest.fn()</code> do ecossistema Jest. Se vires tutoriais de Jest, o conceito aplica-se 100% aqui.
				</Callout>
			</section>

			{/* PARTE 2 */}
			<section className='mb-24'>
				<h2 className='text-4xl font-black uppercase mb-12 flex items-center gap-4'>
					<span className='px-4 py-2 bg-black text-white dark:bg-white dark:text-black'>
						PARTE 2
					</span>
					<span className='border-b-8 border-emerald-500'>
						Controlando o Retorno
					</span>
				</h2>

				<div className='space-y-10'>
					<Box className='border-emerald-500'>
						<h4 className='text-xl font-black uppercase mb-4'>Sempre o mesmo valor</h4>
						<CodeBlock 
							language="typescript"
							code={`const login = mock(() => false);\nlogin.mockReturnValue(true);\n\nlogin(); // true\nlogin(); // true`}
						/>
					</Box>

					<Box className='border-emerald-500'>
						<h4 className='text-xl font-black uppercase mb-4'>Valor Único (Once)</h4>
						<CodeBlock 
							language="typescript"
							code={`const sensor = mock(() => 20);\nsensor.mockReturnValueOnce(25);\nsensor.mockReturnValueOnce(30);\n\nsensor(); // 25 (1ª chamada)\nsensor(); // 30 (2ª chamada)\nsensor(); // 20 (volta ao padrão)`}
						/>
					</Box>

					<Box className='border-emerald-500'>
						<h4 className='text-xl font-black uppercase mb-4'>Assíncrono (Promises)</h4>
						<CodeBlock 
							language="typescript"
							code={`const api = mock(async () => ({}));\napi.mockResolvedValue({ id: 1, status: "OK" });\n\nconst r = await api();\nexpect(r.id).toBe(1);`}
						/>
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
						Lógica Personalizada
					</span>
				</h2>

				<Box className='border-secondary bg-zinc-50 dark:bg-zinc-900'>
					<p className='text-lg mb-6'>
						Use o <code>mockImplementation</code> quando o retorno depender dos argumentos passados.
					</p>
					<CodeBlock 
						language="typescript"
						code={`const buscarNota = mock((disc: string) => 0);\n\nbuscarNota.mockImplementation((disc) => {\n  if (disc === "Programação Web") return 18;\n  return 10;\n});\n\nexpect(buscarNota("Programação Web")).toBe(18);`}
					/>
				</Box>
			</section>

			{/* PARTE 4 */}
			<section className='mb-24'>
				<h2 className='text-4xl font-black uppercase mb-12 flex items-center gap-4'>
					<span className='px-4 py-2 bg-primary text-white'>
						PARTE 4
					</span>
					<span className='border-b-8 border-primary'>
						Verificando Chamadas
					</span>
				</h2>

				<div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
					<Box className='border-black dark:border-white h-full'>
						<h4 className='font-black uppercase mb-2'>Matchers de Chamada</h4>
						<ul className='space-y-2 text-sm font-bold opacity-80'>
							<li>• toHaveBeenCalled()</li>
							<li>• toHaveBeenCalledTimes(n)</li>
							<li>• toHaveBeenCalledWith(...args)</li>
							<li>• toHaveBeenLastCalledWith(...args)</li>
						</ul>
					</Box>
					<Box className='border-black dark:border-white h-full'>
						<h4 className='font-black uppercase mb-2'>Inspeção Manual</h4>
						<CodeBlock 
							language="typescript"
							code={`// Acede ao histórico bruto\nconst args = mockFn.mock.calls[0];\nconst res = mockFn.mock.results[0].value;`}
						/>
					</Box>
				</div>
			</section>

			{/* PARTE 5 */}
			<section className='mb-24'>
				<h2 className='text-4xl font-black uppercase mb-12 flex items-center gap-4'>
					<span className='px-4 py-2 bg-zinc-400 text-white'>
						PARTE 5
					</span>
					<span className='border-b-8 border-zinc-400'>
						Limpando e Resetando
					</span>
				</h2>

				<div className='space-y-8'>
					<div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
						<Box className='border-zinc-400 bg-zinc-50/50 dark:bg-zinc-950/20'>
							<h4 className='font-black uppercase text-xl mb-4'>mockClear()</h4>
							<p className='text-sm mb-4'>Limpa o histórico (calls/results) mas mantém os retornos configurados.</p>
							<span className='text-[10px] bg-zinc-200 dark:bg-zinc-800 px-2 py-1 font-mono uppercase'>Ideal para beforeEach</span>
						</Box>
						<Box className='border-red-400 bg-red-50/10'>
							<h4 className='font-black uppercase text-xl mb-4'>mockReset()</h4>
							<p className='text-sm mb-4'>Limpa TUDO: histórico e os valores de retorno configurados.</p>
							<span className='text-[10px] bg-red-200 dark:bg-red-800 px-2 py-1 font-mono uppercase'>Hard Reset</span>
						</Box>
					</div>
				</div>
			</section>

			{/* PARTE 6 */}
			<section className='mb-24 relative overflow-hidden'>
				<div className='absolute -right-20 top-0 text-[15rem] leading-none text-primary/5 font-black pointer-events-none'>LAB</div>
				<h2 className='text-4xl font-black uppercase mb-12 flex items-center gap-4'>
					<span className='px-4 py-2 bg-black text-white dark:bg-white dark:text-black'>
						PARTE 6
					</span>
					<span className='border-b-8 border-primary'>
						Aplicação Prática Completa
					</span>
				</h2>

				<Box className='p-0 overflow-hidden border-4 border-black dark:border-white shadow-brutalist'>
					<div className='p-6 bg-primary text-white font-black uppercase tracking-tighter'>
						Sistema de Matrículas com Mock Automático
					</div>
					<CodeBlock 
						language="typescript"
						code={`describe("matricular", () => {\n  const emailMock = mock(async () => {});\n  const repoMock = mock(async () => true);\n\n  beforeEach(() => {\n    emailMock.mockClear();\n    repoMock.mockClear();\n  });\n\n  test("deve enviar email após matrícula", async () => {\n    await matricular(1, "Web", repoMock, emailMock);\n    expect(emailMock).toHaveBeenCalledWith("ana@ispm.ao", "Ana", "Web");\n  });\n});`}
					/>
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
						"mock() automatiza o rastreio que antes fazíamos manualmente.",
						"Valores de retorno podem ser fixos (mockReturnValue) ou sequenciais (Once).",
						"Funções assíncronas usam mockResolvedValue para simular rede ou BD.",
						"Matchers de chamada verificam não apenas se correu, mas COM QUÊ e QUANTAS VEZES.",
						"mockClear() é essencial no beforeEach para garantir testes isolados.",
						"mockImplementation permite simular lógica complexa em funções falsas.",
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
					<span className='text-6xl animate-bounce'>⛓️</span>
				</h3>
				<div className='space-y-8 text-xl font-medium leading-relaxed text-zinc-800 dark:text-zinc-200'>
					<p>
						Crie o ficheiro <code>src/modulo-02/processador-pagamentos.test.ts</code>:
					</p>
					<ul className='space-y-4 font-bold uppercase text-sm tracking-tight'>
						<li>1. Use mock() para simular o Serviço de Débito e o Serviço de Auditoria.</li>
						<li>2. Implemente o cenário feliz e o cenário de "Saldo Insuficiente".</li>
						<li>3. Use mockReturnValueOnce para simular uma falha na 1ª tentativa e sucesso na 2ª (Retry).</li>
						<li>4. Garanta com toHaveBeenCalledTimes que a auditoria é registada SEMPRE.</li>
					</ul>
					<div className='p-8 bg-zinc-950 text-white font-black italic uppercase tracking-tight text-center mt-10 shadow-brutalist'>
						"Automatize os seus testes e foque-se no que realmente importa: a lógica de negócio."
					</div>
				</div>
			</Box>

			{/* FOOTER */}
			<div className='flex items-center justify-between border-t-8 border-black dark:border-white pt-12 pb-32 mb-20'>
				<p className='font-black uppercase text-2xl italic text-primary'>
					Conferência 3.2 — Fim
				</p>
				<p className='font-black uppercase text-2xl italic text-zinc-400'>
					Próxima: 3.3 — spyOn() — espionando funções reais
				</p>
			</div>
		</>
	),
	ejercicios: [],
};
