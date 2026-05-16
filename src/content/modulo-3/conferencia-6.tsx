import type { ConferenciaData } from "../../types";
import { CodeBlock } from "../../components/CodeBlock";
import { Box } from "../../components/CourseComponents";

export const data: ConferenciaData = {
	titulo: "3.6 Mocking Avançado: Retornos, Implementações e Reset",
	objetivos: [
		"Dominar a diferença prática entre mockReturnValue, mockResolvedValue e mockImplementation em cenários complexos.",
		"Encadear sequências de retornos com Once para simular fluxos multi-etapa.",
		"Usar mockImplementation para lógica condicional dentro de mocks.",
		"Distinguir com precisão mockClear, mockReset e mockRestore e saber qual usar em cada situação.",
		"Identificar e corrigir os erros mais comuns de estado partilhado entre testes.",
		"Aplicar estratégias de reset numa suite de testes realista com múltiplos cenários.",
	],
	contenido: (
		<>
			{/* METADATA DA CONFERÊNCIA */}
			<div className='flex flex-wrap gap-4 mb-10'>
				<span className='px-4 py-2 bg-zinc-900 text-white dark:bg-zinc-100 dark:text-black font-black uppercase text-sm brutalist-shadow'>
					⏱️ Duração: 2 Horas
				</span>
				<span className='px-4 py-2 bg-primary text-white font-black uppercase text-sm brutalist-shadow'>
					🔑 Pré-requisitos: Conferência 3.5 concluída
				</span>
			</div>

			{/* INTRODUÇÃO */}
			<Box className='bg-primary/10 border-black dark:border-white mb-16 p-10 shadow-[12px_12px_0px_0px_rgba(255,50,150,1)] dark:shadow-[12px_12px_0px_0px_rgba(255,50,150,0.5)] relative overflow-hidden'>
				<h3 className='text-3xl font-black uppercase mb-6 text-primary flex items-center gap-3'>
					<span className='w-12 h-12 flex items-center justify-center bg-black text-white dark:bg-white dark:text-black rounded-full text-xl'>
						🔬
					</span>
					Introdução — De utilizador a mestre do mock
				</h3>
				<div className='space-y-4 text-lg leading-relaxed text-zinc-800 dark:text-zinc-200'>
					<p>
						Até aqui aprendeste as ferramentas individualmente:{" "}
						<code>mock()</code>, <code>spyOn()</code>,{" "}
						<code>mock.module()</code>, <code>setSystemTime()</code>. Usaste
						cada uma no seu contexto natural.
					</p>
					<p>
						Esta conferência é diferente. Não introduz ferramentas novas.
						Aprofunda as que já tens, expõe os erros que os programadores
						cometem quando as combinam, e apresenta os padrões que tornam uma
						suite de testes verdadeiramente robusta.
					</p>
					<p className='font-black text-2xl py-6 px-8 border-l-8 border-primary bg-white dark:bg-zinc-900 shadow-brutalist uppercase italic tracking-tighter'>
						"A diferença entre testes frágeis e testes confiáveis raramente está
						nas asserções — está na gestão do estado dos mocks."
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
						Revisão com Profundidade — Os Três Métodos de Retorno
					</span>
				</h2>

				<div className='space-y-10 text-lg leading-relaxed'>
					<p>
						Já conheces os métodos de retorno, mas em cenários reais, a escolha
						entre eles tem consequências que vão além do óbvio.
					</p>

					{/* mockReturnValue */}
					<Box className='border-zinc-300'>
						<h4 className='font-black uppercase text-xl mb-4'>
							mockReturnValue
						</h4>
						<p className='text-sm mb-4 italic'>Para valores síncronos fixos.</p>
						<CodeBlock
							language='typescript'
							code={`const obterConfiguracao = mock(() => ({}));
obterConfiguracao.mockReturnValue({
  timeout: 5000,
  tentativas: 3,
});

const config1 = obterConfiguracao();
const config2 = obterConfiguracao();

// ARMADILHA: config1 === config2 — é o MESMO objeto em memória
config1.timeout = 9999;
console.log(config2.timeout); // 9999 — efeito colateral inesperado!`}
						/>
					</Box>

					{/* mockImplementation */}
					<Box className='border-primary shadow-brutalist'>
						<h4 className='font-black uppercase text-xl mb-4 text-primary'>
							mockImplementation
						</h4>
						<p className='text-sm mb-4 italic'>
							Cria um objeto novo em cada chamada — ideal para evitar mutações
							partilhadas.
						</p>
						<CodeBlock
							language='typescript'
							code={`obterConfiguracao.mockImplementation(() => ({
  timeout: 5000,
  tentativas: 3,
}));

// Cada chamada recebe um objeto NOVO
const c1 = obterConfiguracao();
c1.timeout = 0;
console.log(obterConfiguracao().timeout); // 5000 (seguro!)`}
						/>
					</Box>

					{/* mockResolvedValue */}
					<Box className='border-zinc-300'>
						<h4 className='font-black uppercase text-xl mb-4'>
							mockResolvedValue
						</h4>
						<p className='text-sm mb-4 italic'>
							Ergonomia para Promises síncronas. Equivalente a
							Promise.resolve(x).
						</p>
						<CodeBlock
							language='typescript'
							code={`// Usa mockResolvedValue para retornos fixos
buscarAluno.mockResolvedValue({ id: 1, nome: "Ana" });

// Usa mockImplementation quando o retorno depende dos argumentos
buscarAluno.mockImplementation(async (id) => ({
  id,
  nome: id === 1 ? "Ana" : "Carlos",
}));`}
						/>
					</Box>
				</div>
			</section>

			{/* PARTE 2 */}
			<section className='mb-24 relative overflow-hidden'>
				<div className='absolute -right-20 top-0 text-[15rem] leading-none text-emerald-500/5 font-black pointer-events-none'>
					ONCE
				</div>
				<h2 className='text-4xl font-black uppercase mb-12 flex items-center gap-4'>
					<span className='px-4 py-2 bg-emerald-500 text-white'>PARTE 2</span>
					<span className='border-b-8 border-emerald-500'>
						Sequências com Once — Encadeamento Avançado
					</span>
				</h2>

				<div className='space-y-6 text-lg'>
					<p>
						Os valores <code>Once</code> são consumidos em ordem FIFO (First-In,
						First-Out). Quando todos terminam, o mock volta ao valor padrão.
					</p>
					<Box className='border-emerald-500 bg-emerald-50/10'>
						<CodeBlock
							language='typescript'
							code={`const lerSensor = mock(() => 20); // padrão: 20°C

lerSensor.mockReturnValueOnce(45); // 1ª
lerSensor.mockReturnValueOnce(42); // 2ª
lerSensor.mockReturnValueOnce(38); // 3ª

lerSensor(); // 45
lerSensor(); // 42
lerSensor(); // 38
lerSensor(); // 20 (volta ao padrão)`}
						/>
					</Box>

					<Box className='border-emerald-500 bg-emerald-50/10 mt-10'>
						<h4 className='font-black uppercase mb-4'>
							Cenário: Falhas Transitórias
						</h4>
						<CodeBlock
							language='typescript'
							code={`const autenticar = mock(async () => ({ valido: true }));

autenticar.mockRejectedValueOnce(new Error("Token expirado"));
autenticar.mockRejectedValueOnce(new Error("Timeout de rede"));
autenticar.mockResolvedValue({ valido: true }); // padrão

// 1ª falha, 2ª falha, 3ª funciona...`}
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
						Os Três Níveis de Reset — Análise Completa
					</span>
				</h2>

				<div className='grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10'>
					<Box className='border-emerald-500'>
						<h4 className='font-black uppercase text-xl mb-4 text-emerald-600'>
							mockClear()
						</h4>
						<p className='text-sm mb-4'>
							Limpa apenas o <strong>histórico</strong> (chamadas e resultados).
							Preserva a configuração de retornos.
						</p>
						<p className='text-xs font-black uppercase bg-emerald-100 text-emerald-700 p-2 inline-block'>
							Uso: beforeEach (Padrão)
						</p>
					</Box>
					<Box className='border-amber-500'>
						<h4 className='font-black uppercase text-xl mb-4 text-amber-600'>
							mockReset()
						</h4>
						<p className='text-sm mb-4'>
							Limpa histórico <strong>E</strong> configuração. A função volta a
							retornar <code>undefined</code>.
						</p>
						<p className='text-xs font-black uppercase bg-amber-100 text-amber-700 p-2 inline-block'>
							Uso: Reconfiguração Total
						</p>
					</Box>
					<Box className='border-red-500 shadow-brutalist'>
						<h4 className='font-black uppercase text-xl mb-4 text-red-600'>
							mockRestore()
						</h4>
						<p className='text-sm mb-4'>
							Limpa tudo <strong>E</strong> restaura a implementação original.
							Exclusivo para <code>spyOn()</code>.
						</p>
						<p className='text-xs font-black uppercase bg-red-100 text-red-700 p-2 inline-block'>
							Uso: afterEach com Spies
						</p>
					</Box>
				</div>

				<Box className='border-zinc-400 bg-zinc-50 dark:bg-zinc-900'>
					<CodeBlock
						language='typescript'
						code={`const logger = { registar: (msg: string) => console.log(msg) };
const spy = spyOn(logger, "registar").mockImplementation(() => {});

logger.registar("silenciado");
spy.mockRestore();

// logger.registar volta a ser o console.log real
logger.registar("de volta ao console");`}
					/>
				</Box>
			</section>

			{/* PARTE 4 */}
			<section className='mb-24'>
				<h2 className='text-4xl font-black uppercase mb-12 flex items-center gap-4'>
					<span className='px-4 py-2 bg-zinc-950 text-white'>PARTE 4</span>
					<span className='border-b-8 border-zinc-950 dark:border-zinc-50'>
						Erros Comuns e Como Evitá-los
					</span>
				</h2>

				<div className='space-y-6'>
					<Box className='border-red-500 bg-red-50/5'>
						<h5 className='font-black uppercase text-red-600 mb-2'>
							1. Acumulação de Chamadas
						</h5>
						<p className='text-sm mb-4'>
							Esquecer o reset e levar o histórico de um teste para o seguinte.
						</p>
						<CodeBlock
							language='typescript'
							code={`beforeEach(() => mock.mockClear()); // A vacina universal`}
						/>
					</Box>
					<Box className='border-red-500 bg-red-50/5'>
						<h5 className='font-black uppercase text-red-600 mb-2'>
							2. Mutação de Objeto Partilhado
						</h5>
						<p className='text-sm mb-4'>
							Configurar um objeto literal como retorno em vez de usar uma
							fábrica ou implementation.
						</p>
						<CodeBlock
							language='typescript'
							code={`// Errado: mockReturnValue({ x: 1 })\n// Certo: mockImplementation(() => ({ x: 1 }))`}
						/>
					</Box>
					<Box className='border-red-500 bg-red-50/5'>
						<h5 className='font-black uppercase text-red-600 mb-2'>
							3. Configurar Once fora do teste
						</h5>
						<p className='text-sm'>
							Se definires um <code>Once</code> fora do <code>test()</code>, o
							primeiro teste que correr vai consumi-lo, deixando os outros "na
							mão".
						</p>
					</Box>
				</div>
			</section>

			{/* PARTE 5 */}
			<section className='mb-24'>
				<h2 className='text-4xl font-black uppercase mb-12 flex items-center gap-4'>
					<span className='px-4 py-2 bg-primary text-white'>PARTE 5</span>
					<span className='border-b-8 border-primary'>
						Padrão Profissional — Suite Completa
					</span>
				</h2>

				<Box className='border-primary shadow-brutalist'>
					<CodeBlock
						language='typescript'
						code={`import { mock, describe, test, expect, beforeEach } from "bun:test";

const validarMock = mock(async () => true);
const gravarMock  = mock(async () => ({ vagaId: "V-001" }));

beforeEach(() => {
  validarMock.mockClear();
  gravarMock.mockClear();
});

describe("inscrição com retry", () => {
  test("recupera na 2ª tentativa", async () => {
    validarMock.mockResolvedValue(true);
    // 1ª falha, 2ª sucesso
    gravarMock.mockRejectedValueOnce(new Error("Timeout"));
    gravarMock.mockResolvedValueOnce({ vagaId: "V-200" });

    const r = await processar(1, "Redes", validarMock, gravarMock);

    expect(r.sucesso).toBe(true);
    expect(gravarMock).toHaveBeenCalledTimes(2);
  });
});`}
					/>
				</Box>
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
						Tens um sistema de Avaliação de Trabalhos do ISPM. Quando um
						trabalho é submetido, o sistema deve:
					</p>
					<ol className='list-decimal list-inside space-y-2 text-base font-medium'>
						<li>
							Verificar se o aluno tem entregas em atraso (bloqueia a avaliação
							se sim).
						</li>
						<li>
							Calcular a nota final com base em três critérios ponderados.
						</li>
						<li>Guardar a avaliação na base de dados.</li>
						<li>Notificar o aluno por email com a nota final.</li>
					</ol>
				</Box>

				{/* Passo 1 — Código de partida */}
				<div className='mb-12'>
					<div className='flex items-center gap-4 mb-4'>
						<span className='w-10 h-10 flex items-center justify-center bg-black text-white dark:bg-white dark:text-black font-black text-lg rounded-full shrink-0'>
							1
						</span>
						<h4 className='text-xl font-black uppercase'>
							Lógica de Negócio (já dada)
						</h4>
					</div>
					<p className='text-sm text-zinc-500 mb-4 ml-14'>
						Cole em <code>avaliacao.ts</code> — não o modifiques.
					</p>
					<Box className='p-0 overflow-hidden border-4 border-black dark:border-white shadow-brutalist'>
						<CodeBlock
							language='typescript'
							code={`// avaliacao.ts — Lógica de Negócio
export type TipoAvaliacao = "laboratorio" | "projeto" | "exame";

export interface ICriterioService {
  obterPesos(tipo: TipoAvaliacao): Promise<{ c1: number; c2: number; c3: number }>;
}

export interface IPersistenciaService {
  guardarNota(alunoId: number, nota: number, tipo: TipoAvaliacao): Promise<{ avaliacaoId: string }>;
}

export interface INotificacaoService {
  notificarAluno(alunoId: number, nota: number, avaliacaoId: string): Promise<void>;
}

export interface IValidacaoService {
  temEntregasAtrasadas(alunoId: number): Promise<boolean>;
}

export async function avaliarTrabalho(
  alunoId: number,
  tipo: TipoAvaliacao,
  notas: { c1: number; c2: number; c3: number },
  validacao: IValidacaoService,
  criterios: ICriterioService,
  persistencia: IPersistenciaService,
  notificacao: INotificacaoService
): Promise<{ sucesso: boolean; nota?: number; avaliacaoId?: string; motivo?: string }> {
  const atrasado = await validacao.temEntregasAtrasadas(alunoId);
  if (atrasado) return { sucesso: false, motivo: "Aluno tem entregas em atraso." };

  const pesos = await criterios.obterPesos(tipo);
  const notaFinal = Math.round(notas.c1 * pesos.c1 + notas.c2 * pesos.c2 + notas.c3 * pesos.c3);
  const { avaliacaoId } = await persistencia.guardarNota(alunoId, notaFinal, tipo);
  await notificacao.notificarAluno(alunoId, notaFinal, avaliacaoId);

  return { sucesso: true, nota: notaFinal, avaliacaoId };
}`}
						/>
					</Box>
				</div>

				{/* Passo 2 — Código com lacunas */}
				<div className='mb-12'>
					<div className='flex items-center gap-4 mb-4'>
						<span className='w-10 h-10 flex items-center justify-center bg-primary text-white font-black text-lg rounded-full shrink-0'>
							2
						</span>
						<h4 className='text-xl font-black uppercase'>
							A Tua Missão — Preenche os espaços
						</h4>
					</div>
					<p className='text-sm text-zinc-500 mb-4 ml-14'>
						Cria <code>avaliacao.test.ts</code> e preenche cada{" "}
						<code>/* ??? */</code>.
					</p>
					<Box className='p-0 overflow-hidden border-4 border-primary shadow-brutalist'>
						<CodeBlock
							language='typescript'
							code={`// avaliacao.test.ts — O teu trabalho começa aqui
import { mock, describe, test, expect, beforeEach } from "bun:test";
import { avaliarTrabalho } from "./avaliacao";

const temAtrasadasMock = mock(async () => false);
const obterPesosMock   = mock(async () => ({ c1: 0, c2: 0, c3: 0 }));
const guardarNotaMock  = mock(async () => ({ avaliacaoId: "" }));
const notificarMock    = mock(async () => {});

const validacao = { temEntregasAtrasadas: temAtrasadasMock };
const criterios = { obterPesos: obterPesosMock };
const persistencia = { guardarNota: guardarNotaMock };
const notificacao = { notificarAluno: notificarMock };

beforeEach(() => {
  /* ??? — limpa apenas o histórico dos mocks */
});

describe("avaliarTrabalho – bloqueado por atraso", () => {
  test("deve retornar sucesso = false", async () => {
    temAtrasadasMock.mockResolvedValue(true);
    const r = await avaliarTrabalho(1, "laboratorio", {c1:10, c2:10, c3:10}, validacao, criterios, persistencia, notificacao);
    expect(r.sucesso).toBe(false);
  });
});

describe("avaliarTrabalho – laboratório (pesos 40/40/20)", () => {
  test("calcula a nota correta", async () => {
    temAtrasadasMock.mockResolvedValue(false);
    obterPesosMock.mockImplementation(async () => ({ c1: 0.4, c2: 0.4, c3: 0.2 }));
    guardarNotaMock.mockResolvedValue({ avaliacaoId: "AV-001" });

    const r = await avaliarTrabalho(1, "laboratorio", { c1: 20, c2: 15, c3: 10 }, validacao, criterios, persistencia, notificacao);

    expect(r.nota).toBe(/* ??? */); // 8+6+2
    expect(guardarNotaMock).toHaveBeenCalledWith(1, /* ??? */, "laboratorio");
  });
});

describe("avaliarTrabalho – retry na persistência", () => {
  test("recupera na 2ª tentativa", async () => {
    temAtrasadasMock.mockResolvedValue(false);
    obterPesosMock.mockResolvedValue({ c1: 0.4, c2: 0.4, c3: 0.2 });

    guardarNotaMock./* ??? */(new Error("Timeout"));
    guardarNotaMock./* ??? */({ avaliacaoId: "AV-002" });

    await avaliarTrabalho(1, "laboratorio", {c1:20, c2:20, c3:20}, validacao, criterios, persistencia, notificacao);

    expect(guardarNotaMock).toHaveBeenCalledTimes(2);
    expect(notificarMock).toHaveBeenCalledTimes(1);
  });
});`}
						/>
					</Box>
				</div>

				{/* Passo 3 — Solução */}
				<div>
					<div className='flex items-center gap-4 mb-4'>
						<span className='w-10 h-10 flex items-center justify-center bg-emerald-500 text-white font-black text-lg rounded-full shrink-0'>
							3
						</span>
						<h4 className='text-xl font-black uppercase'>
							Solução de Referência
						</h4>
					</div>
					<Box className='p-0 overflow-hidden border-4 border-emerald-500 bg-emerald-50/5 mt-4'>
						<CodeBlock
							language='typescript'
							code={`// avaliacao.test.ts — SOLUÇÃO COMPLETA
import { mock, describe, test, expect, beforeEach } from "bun:test";
import { avaliarTrabalho } from "./avaliacao";

const temAtrasadasMock = mock(async () => false);
const obterPesosMock   = mock(async () => ({ c1: 0, c2: 0, c3: 0 }));
const guardarNotaMock  = mock(async () => ({ avaliacaoId: "" }));
const notificarMock    = mock(async () => {});

const validacao = { temEntregasAtrasadas: temAtrasadasMock };
const criterios = { obterPesos: obterPesosMock };
const persistencia = { guardarNota: guardarNotaMock };
const notificacao = { notificarAluno: notificarMock };

beforeEach(() => {
  temAtrasadasMock.mockClear();
  obterPesosMock.mockClear();
  guardarNotaMock.mockClear();
  notificarMock.mockClear();
});

describe("avaliarTrabalho", () => {
  test("calcula nota e notifica em laboratório", async () => {
    temAtrasadasMock.mockResolvedValue(false);
    obterPesosMock.mockResolvedValue({ c1: 0.4, c2: 0.4, c3: 0.2 });
    guardarNotaMock.mockResolvedValue({ avaliacaoId: "AV-LAB-001" });

    const r = await avaliarTrabalho(2, "laboratorio", { c1: 20, c2: 15, c3: 10 }, validacao, criterios, persistencia, notificacao);

    expect(r.nota).toBe(16);
    expect(guardarNotaMock).toHaveBeenCalledWith(2, 16, "laboratorio");
    expect(notificarMock).toHaveBeenCalledWith(2, 16, "AV-LAB-001");
  });

  test("recupera de falha na persistência", async () => {
    temAtrasadasMock.mockResolvedValue(false);
    obterPesosMock.mockResolvedValue({ c1: 0.5, c2: 0.5, c3: 0 });

    guardarNotaMock.mockRejectedValueOnce(new Error("Timeout"));
    guardarNotaMock.mockResolvedValueOnce({ avaliacaoId: "AV-RETRY" });

    await avaliarTrabalho(3, "projeto", {c1:10, c2:10, c3:0}, validacao, criterios, persistencia, notificacao);

    expect(guardarNotaMock).toHaveBeenCalledTimes(2);
    expect(notificarMock).toHaveBeenCalledWith(3, 10, "AV-RETRY");
  });
});`}
						/>
					</Box>
				</div>
			</section>

			{/* O QUE ESTE EXERCÍCIO CONSOLIDA */}
			<Box className='border-8 border-black dark:border-white p-16 bg-primary/5 mb-32'>
				<h3 className='text-3xl font-black uppercase mb-10'>
					💡 O Que Este Exercício Consolida
				</h3>
				<ul className='space-y-6 text-lg'>
					<li className='flex gap-4 items-start'>
						<span className='text-primary font-black text-2xl'>•</span>
						<p>
							<strong>mockClear NO beforeEach</strong> — Preserva a configuração
							básica mas isola as contagens de chamadas entre testes.
						</p>
					</li>
					<li className='flex gap-4 items-start'>
						<span className='text-primary font-black text-2xl'>•</span>
						<p>
							<strong>Once PARA SEQUÊNCIAS</strong> — Permite testar
							comportamentos de falha seguidos de sucesso de forma
							determinística.
						</p>
					</li>
					<li className='flex gap-4 items-start'>
						<span className='text-primary font-black text-2xl'>•</span>
						<p>
							<strong>CÁLCULO E PERSISTÊNCIA</strong> — Valida que os dados
							calculados são exatamente os mesmos que são enviados para a
							persistência e notificação.
						</p>
					</li>
				</ul>
			</Box>

			{/* RESUMO */}
			<section className='my-32 p-16 bg-zinc-950 text-white border-8 border-primary shadow-[20px_20px_0px_0px_rgba(255,50,150,0.5)] relative overflow-hidden'>
				<div className='absolute -right-20 -top-20 w-80 h-80 bg-primary/20 rounded-full blur-[100px]' />
				<h3 className='text-6xl font-black uppercase mb-12 relative z-10 text-primary italic'>
					RESUMO
				</h3>
				<div className='space-y-6 relative z-10'>
					{[
						"Mutação — mockReturnValue retorna sempre o mesmo objeto; usa mockImplementation para objetos novos.",
						"Lógica — mockImplementation é para retornos que dependem de argumentos ou lógica condicional.",
						"Sequências — Once consome em ordem FIFO e cai no valor padrão quando esgotado.",
						"mockClear — Limpa histórico e preserva configuração (uso em beforeEach).",
						"mockReset — Apaga também a configuração; usa apenas para reconfiguração total.",
						"mockRestore — Exclusivo de spyOn(); restaura a função original.",
						"mock.calls[i][j] — Ferramenta para verificar o j-ésimo argumento da i-ésima chamada.",
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
