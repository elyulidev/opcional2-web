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
						Na conferência anterior fizemos mocking manual. Funcionou, mas era
						trabalhoso: gerenciávamos variáveis globais, resetávamos tudo "no
						braço" e não tínhamos forma nativa de verificar argumentos
						recebidos.
					</p>
					<p>
						O <code>bun:test</code> tem a função <code>mock()</code> que
						automatiza todo esse trabalho. Ela cria funções falsas que rastreiam
						automaticamente cada chamada, argumento e retorno — sem nenhum
						código extra de rastreio.
					</p>
					<p className='font-black text-2xl py-6 px-8 border-l-8 border-primary bg-white dark:bg-zinc-900 shadow-brutalist uppercase italic tracking-tighter'>
						"mock() é o que tornaria o exercício da aula anterior trivial."
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

				<div className='space-y-8'>
					<Box className='border-zinc-900 dark:border-zinc-100'>
						<p className='text-lg mb-6 leading-relaxed'>
							O <code>mock()</code> envolve qualquer função e devolve a mesma
							função — mas agora com superpoderes: ela regista cada chamada,
							cada argumento e cada retorno numa propriedade chamada{" "}
							<code>mock</code>.
						</p>
						<CodeBlock
							language='typescript'
							code={`import { mock, expect, test } from "bun:test";

// Envolves a função com mock()
const calcularDesconto = mock((preco: number) => preco * 0.9);

calcularDesconto(100); // retorna 90
calcularDesconto(200); // retorna 180

// A função regista tudo automaticamente
expect(calcularDesconto).toHaveBeenCalledTimes(2);
expect(calcularDesconto).toHaveBeenCalledWith(100);
expect(calcularDesconto).toHaveBeenLastCalledWith(200);`}
						/>
					</Box>

					<Callout type='info' title='mock() vs jest.fn()'>
						O <code>mock()</code> do Bun é o equivalente direto ao{" "}
						<code>jest.fn()</code> do ecossistema Jest. Se vires tutoriais de
						Jest, o conceito aplica-se 100% aqui — a API é intencionalmente
						compatível.
					</Callout>

					<Box className='border-zinc-400 bg-zinc-50 dark:bg-zinc-900'>
						<h4 className='font-black uppercase text-lg mb-4 text-primary'>
							O objeto <code>mock</code> interno
						</h4>
						<p className='text-sm mb-4'>
							Toda função criada com <code>mock()</code> tem uma propriedade{" "}
							<code>.mock</code> com o histórico completo de execuções:
						</p>
						<CodeBlock
							language='typescript'
							code={`const fn = mock((x: number) => x * 2);
fn(3); fn(5); fn(7);

fn.mock.calls;
// [[3], [5], [7]]   ← cada chamada com os seus argumentos

fn.mock.results;
// [{ type: "return", value: 6 },
//  { type: "return", value: 10 },
//  { type: "return", value: 14 }]`}
						/>
					</Box>
				</div>
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

				<p className='text-lg mb-8 leading-relaxed'>
					A parte mais poderosa do <code>mock()</code> é controlar o que a
					função falsa retorna — sem alterar o código que a usa. Existem três
					métodos principais, cada um para um cenário diferente:
				</p>

				<div className='space-y-10'>
					{/* mockReturnValue */}
					<Box className='border-emerald-500'>
						<div className='flex items-start gap-4 mb-4'>
							<span className='px-3 py-1 bg-emerald-500 text-white font-black uppercase text-xs shrink-0 mt-1'>
								SEMPRE
							</span>
							<div>
								<h4 className='text-xl font-black uppercase'>
									mockReturnValue
								</h4>
								<p className='text-sm text-zinc-500 mt-1'>
									Define um valor padrão que é retornado em TODAS as chamadas.
									Útil para simular um estado estável (ex: utilizador
									autenticado).
								</p>
							</div>
						</div>
						<CodeBlock
							language='typescript'
							code={`const estaAutenticado = mock(() => false); // padrão: não autenticado

// Força sempre retornar true
estaAutenticado.mockReturnValue(true);

estaAutenticado(); // true
estaAutenticado(); // true
estaAutenticado(); // true — não muda nunca`}
						/>
					</Box>

					{/* mockReturnValueOnce */}
					<Box className='border-emerald-500'>
						<div className='flex items-start gap-4 mb-4'>
							<span className='px-3 py-1 bg-emerald-700 text-white font-black uppercase text-xs shrink-0 mt-1'>
								1ª VEZ
							</span>
							<div>
								<h4 className='text-xl font-black uppercase'>
									mockReturnValueOnce
								</h4>
								<p className='text-sm text-zinc-500 mt-1'>
									Define um valor apenas para a próxima chamada — depois volta
									ao valor padrão. Perfeito para simular cenários de{" "}
									<strong>retry</strong>, falha temporária ou paginação.
								</p>
							</div>
						</div>
						<CodeBlock
							language='typescript'
							code={`const lerTemperatura = mock(() => 20); // padrão: 20°

lerTemperatura.mockReturnValueOnce(35); // leitura anómala
lerTemperatura.mockReturnValueOnce(32); // ainda alta

lerTemperatura(); // 35 (1ª chamada — anómala)
lerTemperatura(); // 32 (2ª chamada — ainda alta)
lerTemperatura(); // 20 (3ª em diante — volta ao padrão)

// Encadear vários Once cria uma sequência:
// mockReturnValueOnce → mockReturnValueOnce → mockReturnValue (padrão)`}
						/>
					</Box>

					{/* mockResolvedValue */}
					<Box className='border-emerald-500'>
						<div className='flex items-start gap-4 mb-4'>
							<span className='px-3 py-1 bg-teal-600 text-white font-black uppercase text-xs shrink-0 mt-1'>
								ASYNC
							</span>
							<div>
								<h4 className='text-xl font-black uppercase'>
									mockResolvedValue / mockRejectedValue
								</h4>
								<p className='text-sm text-zinc-500 mt-1'>
									Versões assíncronas de <code>mockReturnValue</code>. Simulam
									chamadas a APIs, bases de dados ou qualquer operação que
									retorna uma Promise.
								</p>
							</div>
						</div>
						<CodeBlock
							language='typescript'
							code={`const buscarUtilizador = mock(async (id: number) => null);

// Cenário feliz
buscarUtilizador.mockResolvedValue({ id: 1, nome: "Ana", email: "ana@ispm.ao" });
const user = await buscarUtilizador(1);
expect(user.nome).toBe("Ana");

// Cenário de erro de rede
buscarUtilizador.mockRejectedValueOnce(new Error("Timeout"));
await expect(buscarUtilizador(2)).rejects.toThrow("Timeout");`}
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

				<div className='space-y-8'>
					<Box className='border-secondary bg-zinc-50 dark:bg-zinc-900'>
						<div className='flex items-start gap-4 mb-4'>
							<div>
								<h4 className='text-xl font-black uppercase mb-2'>
									mockImplementation — Quando o retorno depende dos argumentos
								</h4>
								<p className='text-sm text-zinc-500 mb-6'>
									Use <code>mockImplementation</code> quando precisas de lógica
									condicional dentro do mock. Em vez de um valor fixo, defines
									uma função que recebe os mesmos argumentos e decide o que
									retornar.
								</p>
							</div>
						</div>
						<CodeBlock
							language='typescript'
							code={`const buscarNota = mock((disciplina: string) => 0);

buscarNota.mockImplementation((disc) => {
  const notas: Record<string, number> = {
    "Programação Web": 18,
    "Bases de Dados": 15,
    "Redes": 12,
  };
  return notas[disc] ?? 10; // 10 por padrão
});

expect(buscarNota("Programação Web")).toBe(18);
expect(buscarNota("Bases de Dados")).toBe(15);
expect(buscarNota("Disciplina Inexistente")).toBe(10);`}
						/>
					</Box>

					<Box className='border-secondary bg-zinc-50 dark:bg-zinc-900'>
						<h4 className='text-xl font-black uppercase mb-2'>
							mockImplementationOnce — Comportamento diferente na 1ª chamada
						</h4>
						<p className='text-sm text-zinc-500 mb-6'>
							Combina o poder do <code>Once</code> com lógica personalizada.
							Ideal para simular falha na primeira tentativa e sucesso na
							segunda (padrão Retry).
						</p>
						<CodeBlock
							language='typescript'
							code={`const enviarEmail = mock(async () => ({ ok: true }));

// Simular: 1ª tentativa falha, 2ª tentativa tem sucesso
enviarEmail.mockImplementationOnce(async () => {
  throw new Error("Servidor indisponível");
});

// 1ª chamada — lança exceção
await expect(enviarEmail()).rejects.toThrow("Servidor indisponível");

// 2ª chamada — usa o mock padrão e funciona
const r = await enviarEmail();
expect(r.ok).toBe(true);`}
						/>
					</Box>
				</div>
			</section>

			{/* PARTE 4 */}
			<section className='mb-24'>
				<h2 className='text-4xl font-black uppercase mb-12 flex items-center gap-4'>
					<span className='px-4 py-2 bg-primary text-white'>PARTE 4</span>
					<span className='border-b-8 border-primary'>
						Verificando Chamadas
					</span>
				</h2>

				<p className='text-lg mb-8'>
					Os matchers de chamada são o ponto onde o mock vai além do stub: não
					apenas retorna dados, como também permite afirmar{" "}
					<em>como o código usou a dependência</em>.
				</p>

				<div className='grid grid-cols-1 md:grid-cols-2 gap-8 mb-8'>
					<Box className='border-black dark:border-white'>
						<h4 className='font-black uppercase mb-4 text-primary'>
							Matchers Disponíveis
						</h4>
						<ul className='space-y-3 text-sm'>
							<li className='flex flex-col sm:flex-row sm:gap-3 gap-1'>
								<code className='text-primary font-black break-all'>
									toHaveBeenCalled()
								</code>
								<span className='text-zinc-500'>Foi chamado pelo menos 1×</span>
							</li>
							<li className='flex flex-col sm:flex-row sm:gap-3 gap-1'>
								<code className='text-primary font-black break-all'>
									toHaveBeenCalledTimes(n)
								</code>
								<span className='text-zinc-500'>Foi chamado exatamente n×</span>
							</li>
							<li className='flex flex-col sm:flex-row sm:gap-3 gap-1'>
								<code className='text-primary font-black break-all'>
									toHaveBeenCalledWith(...args)
								</code>
								<span className='text-zinc-500'>
									Alguma chamada usou estes argumentos
								</span>
							</li>
							<li className='flex flex-col sm:flex-row sm:gap-3 gap-1'>
								<code className='text-primary font-black break-all'>
									toHaveBeenLastCalledWith(...args)
								</code>
								<span className='text-zinc-500'>
									A última chamada usou estes argumentos
								</span>
							</li>
							<li className='flex flex-col sm:flex-row sm:gap-3 gap-1'>
								<code className='text-primary font-black break-all'>
									not.toHaveBeenCalled()
								</code>
								<span className='text-zinc-500'>
									Nunca foi chamado — proteção crítica!
								</span>
							</li>
						</ul>
					</Box>
					<Box className='border-black dark:border-white'>
						<h4 className='font-black uppercase mb-4'>
							Inspeção Manual via <code>.mock</code>
						</h4>
						<p className='text-xs text-zinc-500 mb-4'>
							Para cenários onde os matchers não chegam, acedes ao histórico
							bruto:
						</p>
						<CodeBlock
							language='typescript'
							className='my-0'
							code={`const fn = mock((a: string, b: number) => a + b);
fn("x", 1); fn("y", 2);

// Argumentos de cada chamada
fn.mock.calls;
// [["x", 1], ["y", 2]]

// Primeiro argumento da 2ª chamada
fn.mock.calls[1][0]; // "y"

// Resultado da 1ª chamada
fn.mock.results[0].value; // "x1"`}
						/>
					</Box>
				</div>

				<Box className='border-4 border-black dark:border-white p-0 overflow-hidden shadow-brutalist'>
					<div className='px-6 py-3 bg-black text-white dark:bg-white dark:text-black font-black uppercase text-sm wrap-break-word'>
						Exemplo real — verificar que o email de auditoria foi enviado com os
						dados corretos
					</div>
					<CodeBlock
						language='typescript'
						code={`import { mock, test, expect, beforeEach } from "bun:test";
import { processarPagamento } from "./pagamentos";

const auditoriaMock = mock(async (_userId: number, _valor: number) => {});

beforeEach(() => auditoriaMock.mockClear());

test("deve auditar com o id e valor corretos", async () => {
  await processarPagamento(42, 150.00, auditoriaMock);

  // Verificar se foi chamado exatamente 1×
  expect(auditoriaMock).toHaveBeenCalledTimes(1);

  // Verificar os argumentos exatos
  expect(auditoriaMock).toHaveBeenCalledWith(42, 150.00);
});`}
					/>
				</Box>
			</section>

			{/* PARTE 5 */}
			<section className='mb-24'>
				<h2 className='text-4xl font-black uppercase mb-12 flex items-center gap-4'>
					<span className='px-4 py-2 bg-zinc-400 text-white'>PARTE 5</span>
					<span className='border-b-8 border-zinc-400'>
						Limpando e Resetando
					</span>
				</h2>

				<p className='text-lg mb-8'>
					Entre testes, o estado do mock precisa de ser limpo para garantir
					isolamento. Existem três níveis de "limpeza", cada um mais radical que
					o anterior:
				</p>

				<div className='grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8 '>
					<Box className='border-emerald-500 bg-emerald-50/10'>
						<div className='flex items-center gap-2 mb-3 overflow-x-auto'>
							<span className='w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-black'>
								1
							</span>
							<h4 className='font-black uppercase text-xl text-emerald-600 dark:text-emerald-400'>
								mockClear()
							</h4>
						</div>
						<p className='text-sm mb-4'>
							Limpa apenas o <strong>histórico</strong> (<code>mock.calls</code>
							, <code>mock.results</code>). Os valores de retorno configurados
							com <code>mockReturnValue</code> são preservados.
						</p>
						<span className='inline-block text-[10px] bg-emerald-200 dark:bg-emerald-900 text-emerald-900 dark:text-emerald-200 px-2 py-1 font-mono uppercase font-black'>
							✅ Ideal para beforeEach
						</span>
					</Box>

					<Box className='border-amber-500 bg-amber-50/10'>
						<div className='flex items-center gap-2 mb-3'>
							<span className='w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center text-xs font-black'>
								2
							</span>
							<h4 className='font-black uppercase text-xl text-amber-600 dark:text-amber-400 overflow-x-auto'>
								mockReset()
							</h4>
						</div>
						<p className='text-sm mb-4'>
							Limpa o histórico <strong>E</strong> todos os valores de retorno
							configurados. A função volta a retornar <code>undefined</code> por
							padrão.
						</p>
						<span className='inline-block text-[10px] bg-amber-200 dark:bg-amber-900 text-amber-900 dark:text-amber-200 px-2 py-1 font-mono uppercase font-black'>
							⚠️ Hard Reset — uso cuidadoso
						</span>
					</Box>

					<Box className='border-red-500 bg-red-50/10'>
						<div className='flex items-center gap-2 mb-3'>
							<span className='w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center text-xs font-black'>
								3
							</span>
							<h4 className='font-black uppercase text-xl text-red-600 dark:text-red-400 overflow-x-auto'>
								mockRestore()
							</h4>
						</div>
						<p className='text-sm mb-4'>
							Usado com <code>spyOn()</code>. Restaura a função{" "}
							<strong>original</strong>, removendo o spy. Após chamar, a função
							volta a comportar-se como antes do spy.
						</p>
						<span className='inline-block text-[10px] bg-red-200 dark:bg-red-900 text-red-900 dark:text-red-200 px-2 py-1 font-mono uppercase font-black'>
							🔄 Apenas para spyOn — próxima conferência
						</span>
					</Box>
				</div>

				<Box className='border-zinc-400 p-0 overflow-hidden'>
					<div className='px-6 py-3 bg-zinc-800 text-white font-black uppercase text-sm'>
						Padrão recomendado — beforeEach com mockClear
					</div>
					<CodeBlock
						language='typescript'
						code={`import { mock, describe, test, expect, beforeEach } from "bun:test";

const emailMock = mock(async () => {});
const dbMock = mock(async () => null);

describe("meu módulo", () => {
  beforeEach(() => {
    // Limpa o histórico antes de cada teste
    // Os valores de retorno configurados são preservados
    emailMock.mockClear();
    dbMock.mockClear();
  });

  test("teste A", async () => {
    dbMock.mockResolvedValue({ id: 1 });
    // ...
  });

  test("teste B — começa com histórico limpo", async () => {
    expect(emailMock).not.toHaveBeenCalled(); // ✅
    // ...
  });
});`}
					/>
				</Box>
			</section>

			{/* PARTE 6 */}
			<section className='mb-24 relative overflow-hidden'>
				<div className='absolute -right-20 top-0 text-[15rem] leading-none text-primary/5 font-black pointer-events-none'>
					LAB
				</div>
				<h2 className='text-4xl font-black uppercase mb-12 flex items-center gap-4'>
					<span className='px-4 py-2 bg-black text-white dark:bg-white dark:text-black'>
						PARTE 6
					</span>
					<span className='border-b-8 border-primary'>
						Aplicação Prática Completa
					</span>
				</h2>

				<p className='text-lg mb-8'>
					Vamos reescrever o sistema de matrículas da conferência anterior, mas
					agora com <code>mock()</code> em vez de mocks manuais. Compara a
					diferença de boilerplate.
				</p>

				<Box className='p-0 overflow-hidden border-4 border-black dark:border-white shadow-brutalist mb-8'>
					<div className='p-6 bg-primary text-white font-black uppercase tracking-tighter flex justify-between items-center'>
						<span>Sistema de Matrículas — versão automática</span>
						<span className='text-xs opacity-70 font-normal normal-case'>
							matriculas.test.ts
						</span>
					</div>
					<CodeBlock
						language='typescript'
						code={`import { mock, describe, test, expect, beforeEach } from "bun:test";
import { matricular } from "./matriculas";

// ① Criar os mocks UMA VEZ fora dos testes
const gravarMatriculaMock = mock(async (_alunoId: number, _disc: string) => true);
const emailMock = mock(async (_email: string, _nome: string, _disc: string) => {});

// ② Limpar o histórico antes de cada teste (não o valor de retorno!)
beforeEach(() => {
  gravarMatriculaMock.mockClear();
  emailMock.mockClear();
});

describe("matricular", () => {

  test("cenário feliz — grava e envia email", async () => {
    // ③ Para este teste, a gravação tem sucesso
    gravarMatriculaMock.mockResolvedValue(true);

    await matricular(1, "Web", gravarMatriculaMock, emailMock);

    // ④ Verificar que AMBAS as dependências foram usadas corretamente
    expect(gravarMatriculaMock).toHaveBeenCalledWith(1, "Web");
    expect(emailMock).toHaveBeenCalledWith("ana@ispm.ao", "Ana", "Web");
  });

  test("falha na gravação — NÃO envia email", async () => {
    // ⑤ Simular falha no repositório
    gravarMatriculaMock.mockResolvedValue(false);

    await matricular(1, "Web", gravarMatriculaMock, emailMock);

    // ⑥ Se a gravação falhou, o email não deve ser enviado
    expect(gravarMatriculaMock).toHaveBeenCalledTimes(1);
    expect(emailMock).not.toHaveBeenCalled(); // ← proteção crítica
  });

  test("retry — falha na 1ª tentativa, sucesso na 2ª", async () => {
    // ⑦ Once encadeia: 1ª=falha, 2ª=sucesso
    gravarMatriculaMock.mockResolvedValueOnce(false);
    gravarMatriculaMock.mockResolvedValueOnce(true);

    await matricular(1, "Web", gravarMatriculaMock, emailMock);

    // A função de matrícula fez retry internamente
    expect(gravarMatriculaMock).toHaveBeenCalledTimes(2);
    expect(emailMock).toHaveBeenCalledTimes(1);
  });
});`}
					/>
				</Box>

				<Callout type='info' title='Compare com a versão manual'>
					Na conferência anterior, precisámos de variáveis globais (
					<code>emailEnviado = false</code>), resetes manuais e verificação de
					argumentos "artesanal". Aqui, tudo é declarativo, reutilizável e
					mantido pelo próprio framework.
				</Callout>
			</section>

			{/* EXERCÍCIO DE AULA */}
			<section className='mb-32'>
				<div className='flex items-center gap-6 mb-12'>
					<div className='px-6 py-3 bg-amber-400 text-black font-black uppercase text-lg shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)]'>
						🏫 EXERCÍCIO DE AULA
					</div>
					<div className='h-1 flex-1 bg-amber-400' />
				</div>

				{/* Cenário */}
				<Box className='border-amber-400 bg-amber-50/10 dark:bg-amber-900/10 mb-8'>
					<h4 className='text-2xl font-black uppercase mb-4 text-amber-600 dark:text-amber-400 flex items-center gap-3'>
						<span>📋</span> Cenário
					</h4>
					<p className='text-lg leading-relaxed mb-4'>
						Tens um <strong>Processador de Pagamentos</strong>. Quando um
						pagamento é submetido, o sistema deve:
					</p>
					<ol className='space-y-2 text-base font-medium list-decimal list-inside'>
						<li>Verificar se há saldo suficiente (serviço de débito).</li>
						<li>Se houver, processar o débito.</li>
						<li>Registar sempre na auditoria — com ou sem sucesso.</li>
						<li>Retornar o resultado da transação.</li>
					</ol>
					<Callout type='warning' title='Regras de Negócio'>
						A auditoria deve ser chamada <strong>sempre</strong>, mesmo quando o
						saldo é insuficiente. Usa <code>toHaveBeenCalledTimes</code> para
						garantir isso. Usa <code>mockReturnValueOnce</code> para simular o
						cenário de retry (falha depois sucesso).
					</Callout>
				</Box>

				{/* Passo 1 — Código de partida */}
				<div className='mb-8'>
					<div className='flex items-center gap-4 mb-4'>
						<span className='w-10 h-10 flex items-center justify-center bg-black text-white dark:bg-white dark:text-black font-black text-lg rounded-full shrink-0'>
							1
						</span>
						<h4 className='text-xl font-black uppercase'>
							Lógica de Negócio (já dada)
						</h4>
					</div>
					<p className='text-sm text-zinc-500 mb-4 ml-14'>
						Cole em{" "}
						<code className='bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5'>
							pagamentos.ts
						</code>{" "}
						— não o modifiques.
					</p>
					<Box className='p-0 overflow-hidden border-4 border-black dark:border-white shadow-brutalist'>
						<CodeBlock
							language='typescript'
							code={`// pagamentos.ts — Lógica de Negócio

export interface IDebitoService {
  verificarSaldo(userId: number, valor: number): Promise<boolean>;
  debitar(userId: number, valor: number): Promise<{ transacaoId: string }>;
}

export interface IAuditoriaService {
  registar(userId: number, valor: number, sucesso: boolean): Promise<void>;
}

export interface PagamentoResult {
  sucesso: boolean;
  transacaoId?: string;
  erro?: string;
}

export async function processarPagamento(
  userId: number,
  valor: number,
  debito: IDebitoService,
  auditoria: IAuditoriaService
): Promise<PagamentoResult> {
  const temSaldo = await debito.verificarSaldo(userId, valor);

  if (!temSaldo) {
    await auditoria.registar(userId, valor, false);
    return { sucesso: false, erro: "Saldo insuficiente." };
  }

  const { transacaoId } = await debito.debitar(userId, valor);
  await auditoria.registar(userId, valor, true);

  return { sucesso: true, transacaoId };
}`}
						/>
					</Box>
				</div>

				{/* Passo 2 — Código com lacunas */}
				<div className='mb-8'>
					<div className='flex items-center gap-4 mb-4'>
						<span className='w-10 h-10 flex items-center justify-center bg-primary text-white font-black text-lg rounded-full shrink-0'>
							2
						</span>
						<h4 className='text-xl font-black uppercase'>
							A Tua Missão — Preenche os espaços
						</h4>
					</div>
					<p className='text-sm text-zinc-500 mb-4 ml-14'>
						Cria{" "}
						<code className='bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5'>
							pagamentos.test.ts
						</code>{" "}
						e preenche cada{" "}
						<code className='bg-amber-200 dark:bg-amber-900 px-1'>
							{"/* ??? */"}
						</code>
						.
					</p>
					<Box className='p-0 overflow-hidden border-4 border-amber-400 shadow-[6px_6px_0px_0px_rgba(251,191,36,1)]'>
						<CodeBlock
							language='typescript'
							code={`// pagamentos.test.ts — O teu trabalho começa aqui
import { mock, describe, test, expect, beforeEach } from "bun:test";
import { processarPagamento } from "./pagamentos";
import type { IDebitoService, IAuditoriaService } from "./pagamentos";

// ─── Cria os mocks ────────────────────────────────────────────
const verificarSaldoMock = mock(async (_userId: number, _valor: number) => /* ??? */);
const debitarMock        = mock(async (_userId: number, _valor: number) => /* ??? */);
const auditoriaMock      = mock(async (_userId: number, _valor: number, _ok: boolean) => {});

const debitoService: IDebitoService = {
  verificarSaldo: verificarSaldoMock,
  debitar: debitarMock,
};
const auditoriaService: IAuditoriaService = { registar: auditoriaMock };

beforeEach(() => {
  /* ??? — limpa o histórico dos três mocks */
});

// ─── Cenário 1: Saldo insuficiente ────────────────────────────
describe("processarPagamento – saldo insuficiente", () => {
  test("deve retornar sucesso = false", async () => {
    verificarSaldoMock.mockResolvedValue(/* ??? */);

    const r = await processarPagamento(1, 500, debitoService, auditoriaService);
    expect(r.sucesso).toBe(/* ??? */);
    expect(r.erro).toBe("Saldo insuficiente.");
  });

  test("deve auditar mesmo sem saldo", async () => {
    verificarSaldoMock.mockResolvedValue(false);

    await processarPagamento(1, 500, debitoService, auditoriaService);

    expect(auditoriaMock).toHaveBeenCalledTimes(/* ??? */);
    expect(auditoriaMock).toHaveBeenCalledWith(1, 500, /* ??? */);
  });

  test("NÃO deve chamar debitar quando saldo insuficiente", async () => {
    verificarSaldoMock.mockResolvedValue(false);

    await processarPagamento(1, 500, debitoService, auditoriaService);

    expect(debitarMock)./* ??? */;
  });
});

// ─── Cenário 2: Pagamento com sucesso ────────────────────────
describe("processarPagamento – sucesso", () => {
  test("deve retornar o transacaoId", async () => {
    verificarSaldoMock.mockResolvedValue(/* ??? */);
    debitarMock.mockResolvedValue(/* ??? */);

    const r = await processarPagamento(1, 100, debitoService, auditoriaService);
    expect(r.sucesso).toBe(true);
    expect(r.transacaoId).toBe("TXN-001");
  });

  test("deve auditar com sucesso = true", async () => {
    verificarSaldoMock.mockResolvedValue(true);
    debitarMock.mockResolvedValue({ transacaoId: "TXN-002" });

    await processarPagamento(2, 200, debitoService, auditoriaService);

    expect(auditoriaMock).toHaveBeenCalledWith(2, 200, /* ??? */);
  });
});

// ─── Cenário 3: Retry ────────────────────────────────────────
describe("processarPagamento – retry", () => {
  test("1ª tentativa falha, 2ª tem sucesso", async () => {
    // Usa Once para encadear: false → true
    verificarSaldoMock./* ??? */(false);
    verificarSaldoMock./* ??? */(true);
    debitarMock.mockResolvedValue({ transacaoId: "TXN-003" });

    // Chamar 2 vezes (simulando retry externo)
    await processarPagamento(3, 50, debitoService, auditoriaService);
    await processarPagamento(3, 50, debitoService, auditoriaService);

    // Auditoria deve ter sido chamada 2 vezes (uma por tentativa)
    expect(auditoriaMock).toHaveBeenCalledTimes(/* ??? */);
  });
});`}
						/>
					</Box>
				</div>

				{/* Passo 3 — Solução */}
				<div className='mb-8'>
					<div className='flex items-center gap-4 mb-4'>
						<span className='w-10 h-10 flex items-center justify-center bg-emerald-500 text-white font-black text-lg rounded-full shrink-0'>
							3
						</span>
						<h4 className='text-xl font-black uppercase text-emerald-600 dark:text-emerald-400'>
							Solução de Referência
						</h4>
					</div>
					<Callout type='info' title='Só espreites depois de tentares!'>
						Foca-te especialmente no Cenário 3 — é onde o poder do{" "}
						<code>mockResolvedValueOnce</code> fica evidente.
					</Callout>
					<Box className='p-0 overflow-hidden border-4 border-emerald-500 shadow-[6px_6px_0px_0px_rgba(34,197,94,1)] mt-4'>
						<CodeBlock
							language='typescript'
							code={`// pagamentos.test.ts — SOLUÇÃO COMPLETA
import { mock, describe, test, expect, beforeEach } from "bun:test";
import { processarPagamento } from "./pagamentos";
import type { IDebitoService, IAuditoriaService } from "./pagamentos";

const verificarSaldoMock = mock(async (_u: number, _v: number) => true);
const debitarMock        = mock(async (_u: number, _v: number) => ({ transacaoId: "TXN-000" }));
const auditoriaMock      = mock(async (_u: number, _v: number, _ok: boolean) => {});

const debitoService: IDebitoService = {
  verificarSaldo: verificarSaldoMock,
  debitar: debitarMock,
};
const auditoriaService: IAuditoriaService = { registar: auditoriaMock };

beforeEach(() => {
  verificarSaldoMock.mockClear();
  debitarMock.mockClear();
  auditoriaMock.mockClear();
});

// ─── Cenário 1: Saldo insuficiente ────────────────────────────
describe("processarPagamento – saldo insuficiente", () => {
  test("deve retornar sucesso = false", async () => {
    verificarSaldoMock.mockResolvedValue(false);

    const r = await processarPagamento(1, 500, debitoService, auditoriaService);
    expect(r.sucesso).toBe(false);
    expect(r.erro).toBe("Saldo insuficiente.");
  });

  test("deve auditar mesmo sem saldo", async () => {
    verificarSaldoMock.mockResolvedValue(false);

    await processarPagamento(1, 500, debitoService, auditoriaService);

    expect(auditoriaMock).toHaveBeenCalledTimes(1);
    expect(auditoriaMock).toHaveBeenCalledWith(1, 500, false); // ← sucesso=false
  });

  test("NÃO deve chamar debitar quando saldo insuficiente", async () => {
    verificarSaldoMock.mockResolvedValue(false);

    await processarPagamento(1, 500, debitoService, auditoriaService);

    expect(debitarMock).not.toHaveBeenCalled();
  });
});

// ─── Cenário 2: Pagamento com sucesso ────────────────────────
describe("processarPagamento – sucesso", () => {
  test("deve retornar o transacaoId", async () => {
    verificarSaldoMock.mockResolvedValue(true);
    debitarMock.mockResolvedValue({ transacaoId: "TXN-001" });

    const r = await processarPagamento(1, 100, debitoService, auditoriaService);
    expect(r.sucesso).toBe(true);
    expect(r.transacaoId).toBe("TXN-001");
  });

  test("deve auditar com sucesso = true", async () => {
    verificarSaldoMock.mockResolvedValue(true);
    debitarMock.mockResolvedValue({ transacaoId: "TXN-002" });

    await processarPagamento(2, 200, debitoService, auditoriaService);

    expect(auditoriaMock).toHaveBeenCalledWith(2, 200, true); // ← sucesso=true
  });
});

// ─── Cenário 3: Retry ────────────────────────────────────────
describe("processarPagamento – retry", () => {
  test("1ª tentativa falha, 2ª tem sucesso", async () => {
    verificarSaldoMock.mockResolvedValueOnce(false); // 1ª chamada falha
    verificarSaldoMock.mockResolvedValueOnce(true);  // 2ª chamada tem sucesso
    debitarMock.mockResolvedValue({ transacaoId: "TXN-003" });

    await processarPagamento(3, 50, debitoService, auditoriaService); // falha
    await processarPagamento(3, 50, debitoService, auditoriaService); // sucesso

    // Auditoria chamada em CADA tentativa, independentemente do resultado
    expect(auditoriaMock).toHaveBeenCalledTimes(2);
  });
});`}
						/>
					</Box>
				</div>

				{/* Reflexão */}
				<Box className='bg-zinc-950 border-4 border-zinc-800 text-white p-8'>
					<h4 className='font-black uppercase text-lg mb-6 text-amber-400 tracking-widest'>
						💡 O Que Este Exercício Consolida
					</h4>
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
						<div className='space-y-2'>
							<span className='font-black uppercase text-xs bg-amber-400 text-black px-2 py-1'>
								mockClear
							</span>
							<p className='text-sm text-zinc-300'>
								Isola os testes entre si sem perder a configuração dos mocks.
							</p>
						</div>
						<div className='space-y-2'>
							<span className='font-black uppercase text-xs bg-emerald-500 text-white px-2 py-1'>
								mockResolvedValue
							</span>
							<p className='text-sm text-zinc-300'>
								Simula chamadas async a BD e APIs sem infraestrutura real.
							</p>
						</div>
						<div className='space-y-2'>
							<span className='font-black uppercase text-xs bg-primary text-white px-2 py-1'>
								toHaveBeenCalledWith
							</span>
							<p className='text-sm text-zinc-300'>
								Verifica não apenas "foi chamado" mas "foi chamado
								corretamente".
							</p>
						</div>
						<div className='space-y-2'>
							<span className='font-black uppercase text-xs bg-secondary text-white px-2 py-1'>
								Once encadeado
							</span>
							<p className='text-sm text-zinc-300'>
								Simula sequências de comportamento (falha → sucesso) sem estado
								manual.
							</p>
						</div>
					</div>
					<p className='mt-8 text-center font-black uppercase italic text-amber-400 text-lg animate-pulse'>
						Esta é a diferença entre mocking manual e mocking profissional!
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
						"mock() automatiza o rastreio que antes fazíamos manualmente com variáveis globais.",
						"Valores de retorno — mockReturnValue (sempre), Once (sequência), mockResolvedValue (async).",
						"mockImplementation — quando o retorno depende dos argumentos, usa lógica real.",
						"Matchers de chamada verificam não apenas se correu, mas COM QUÊ e QUANTAS VEZES.",
						"mockClear() no beforeEach é o padrão ouro para garantir testes isolados.",
						"mockReset() apaga também a configuração; mockRestore() é para spyOn (próxima conferência).",
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
