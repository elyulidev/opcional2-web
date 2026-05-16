import type { ConferenciaData } from "../../types";
import { CodeBlock } from "../../components/CodeBlock";
import { Callout, Box } from "../../components/CourseComponents";

export const data: ConferenciaData = {
	titulo: "3.4 Mocking de Módulos Inteiros com mock.module()",
	objetivos: [
		"Explicar por que spyOn() não chega quando um módulo inteiro precisa de ser substituído.",
		"Usar mock.module() para substituir módulos locais e de terceiros nos testes.",
		"Entender o comportamento de hoisting do mock.module() e por que é diferente de spyOn().",
		"Combinar mock.module() com mock() para criar substitutos completos e verificáveis.",
		"Aplicar factory functions para retornar implementações diferentes por teste.",
		"Restaurar módulos com mock.restore() após os testes.",
		"Identificar os casos reais onde mock.module() é indispensável.",
	],
	contenido: (
		<>
			{/* METADATA DA CONFERÊNCIA */}
			<div className='flex flex-wrap gap-4 mb-10'>
				<span className='px-4 py-2 bg-zinc-900 text-white dark:bg-zinc-100 dark:text-black font-black uppercase text-sm brutalist-shadow'>
					⏱️ Duração: 2 Horas
				</span>
				<span className='px-4 py-2 bg-primary text-white font-black uppercase text-sm brutalist-shadow'>
					🔑 Pré-requisitos: Conferência 3.3 concluída
				</span>
			</div>

			{/* INTRODUÇÃO */}
			<Box className='bg-primary/10 border-black dark:border-white mb-16 p-10 shadow-[12px_12px_0px_0px_rgba(255,50,150,1)] dark:shadow-[12px_12px_0px_0px_rgba(255,50,150,0.5)] relative overflow-hidden'>
				<h3 className='text-3xl font-black uppercase mb-6 text-primary flex items-center gap-3'>
					<span className='w-12 h-12 flex items-center justify-center bg-black text-white dark:bg-white dark:text-black rounded-full text-xl'>
						📦
					</span>
					Introdução — O problema que spyOn() não resolve
				</h3>
				<div className='space-y-4 text-lg leading-relaxed text-zinc-800 dark:text-zinc-200'>
					<p>
						Nas conferências anteriores, <code>spyOn()</code> e{" "}
						<code>mock()</code> trabalhavam sobre objetos e funções que já
						estavam em memória. Tínhamos acesso direto ao objeto e espiávamos um
						método específico.
					</p>
					<p>
						Mas e quando o código que queremos testar importa um módulo
						diretamente no topo do ficheiro? Nesse caso, no momento em que o
						nosso teste corre, o módulo já foi carregado e as suas funções já
						estão ligadas ao código testado. <code>spyOn()</code> pode não
						chegar a tempo.
					</p>
					<p>
						<code>mock.module()</code> resolve isso substituindo o módulo
						inteiro antes de qualquer import acontecer.
					</p>
					<p className='font-black text-2xl py-6 px-8 border-l-8 border-primary bg-white dark:bg-zinc-900 shadow-brutalist uppercase italic tracking-tighter'>
						"spyOn() espiona um método. mock.module() substitui o fornecedor de
						todos os métodos."
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
						O Problema do Import Direto
					</span>
				</h2>

				<div className='space-y-6 text-lg mb-10'>
					<p>
						Considera este cenário: tens uma função que importa{" "}
						<code>bcrypt</code> para encriptar passwords. No teste, não queres
						que o bcrypt real corra — é lento, usa CPU e torna o teste não
						determinístico.
					</p>
					<Box className='border-zinc-900 dark:border-zinc-100 shadow-brutalist'>
						<CodeBlock
							language='typescript'
							code={`// auth.ts — código a testar
import bcrypt from "bcrypt";

export async function encriptarPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10); // 10 rounds — lento em testes!
}

export async function verificarPassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}`}
						/>
					</Box>
					<p className='text-zinc-500 italic mt-4'>
						Com <code>spyOn()</code>, tentarias fazer{" "}
						<code>spyOn(bcrypt, "hash")</code> — mas isso exige importar o
						bcrypt no teste também, e mesmo assim o bcrypt real é carregado. Com{" "}
						<code>mock.module()</code>, substituis o módulo inteiro antes de
						qualquer coisa acontecer.
					</p>
				</div>
			</section>

			{/* PARTE 2 */}
			<section className='mb-24 relative overflow-hidden'>
				<div className='absolute -right-20 top-0 text-[15rem] leading-none text-emerald-500/5 font-black pointer-events-none'>
					BASIC
				</div>
				<h2 className='text-4xl font-black uppercase mb-12 flex items-center gap-4'>
					<span className='px-4 py-2 bg-emerald-500 text-white'>PARTE 2</span>
					<span className='border-b-8 border-emerald-500'>
						Sintaxe Básica do mock.module()
					</span>
				</h2>

				<div className='space-y-6 text-lg'>
					<p>
						<code>mock.module()</code> recebe o caminho do módulo como primeiro
						argumento e uma factory function como segundo. A factory devolve um
						objeto que substitui todas as exportações do módulo.
					</p>
					<Box className='border-emerald-500 bg-emerald-50/10'>
						<CodeBlock
							language='typescript'
							code={`import { mock, test, expect } from "bun:test";

// Substituir o módulo bcrypt inteiro ANTES de qualquer import
mock.module("bcrypt", () => ({
  default: {
    hash: mock(async () => "hash-falso-para-testes"),
    compare: mock(async () => true),
  },
}));

// Agora este import recebe o módulo falso
import { encriptarPassword, verificarPassword } from "./auth";

test("encriptar password retorna um hash", async () => {
  const resultado = await encriptarPassword("minha-senha");
  expect(resultado).toBe("hash-falso-para-testes");
});

test("verificar password retorna true", async () => {
  const valido = await verificarPassword("minha-senha", "qualquer-hash");
  expect(valido).toBe(true);
});`}
						/>
					</Box>
					<Callout type='info' title='Nota Importante'>
						O <code>mock.module()</code> deve aparecer antes dos imports no
						ficheiro de teste. O Bun faz hoisting desta chamada automaticamente
						— ela é executada antes de qualquer módulo ser carregado.
					</Callout>
				</div>
			</section>

			{/* PARTE 3 */}
			<section className='mb-24 relative'>
				<div className='absolute -left-10 top-20 text-[10rem] text-secondary/5 font-black pointer-events-none uppercase'>
					HOIST
				</div>
				<h2 className='text-4xl font-black uppercase mb-12 flex items-center gap-4'>
					<span className='px-4 py-2 bg-black text-white dark:bg-white dark:text-black'>
						PARTE 3
					</span>
					<span className='border-b-8 border-secondary'>
						Hoisting — Por Que a Ordem Importa
					</span>
				</h2>

				<div className='space-y-6 text-lg leading-relaxed mb-10'>
					<p>
						Hoisting é o comportamento pelo qual o Bun move a execução do{" "}
						<code>mock.module()</code> para o topo do ficheiro, mesmo que no
						código escrito apareça depois dos imports. Isto é necessário porque
						os módulos ES são resolvidos estaticamente.
					</p>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
						<Box className='border-zinc-300'>
							<h4 className='font-black uppercase mb-4 text-sm opacity-50'>
								O que escreves:
							</h4>
							<CodeBlock
								language='typescript'
								code={`import { enviarEmail } from "./email-service";\nmock.module("./mailer", () => ({ \n  default: { send: mock(() => {}) } \n}));`}
							/>
						</Box>
						<Box className='border-secondary shadow-brutalist'>
							<h4 className='font-black uppercase mb-4 text-sm text-secondary'>
								O que o Bun executa:
							</h4>
							<CodeBlock
								language='typescript'
								code={`mock.module("./mailer", () => ({ \n  default: { send: mock(() => {}) } \n})); // ← hoistado\n\nimport { enviarEmail } from "./email-service"; // ← depois`}
							/>
						</Box>
					</div>
					<p className='text-sm italic mt-6'>
						Na prática, coloca sempre <code>mock.module()</code> antes dos teus
						imports no ficheiro de teste para tornar a intenção clara — mesmo
						que o Bun o faça automaticamente.
					</p>
				</div>
			</section>

			{/* PARTE 4 */}
			<section className='mb-24'>
				<h2 className='text-4xl font-black uppercase mb-12 flex items-center gap-4'>
					<span className='px-4 py-2 bg-zinc-950 text-white'>PARTE 4</span>
					<span className='border-b-8 border-zinc-950 dark:border-zinc-50'>
						Módulos Locais vs Módulos de Terceiros
					</span>
				</h2>

				<div className='space-y-8 text-lg'>
					<p>
						<code>mock.module()</code> funciona para ambos os tipos de módulos.
						A diferença está no caminho passado como primeiro argumento.
					</p>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
						<Box className='border-black dark:border-white h-full bg-zinc-50 dark:bg-zinc-900'>
							<h4 className='font-black uppercase mb-4 text-primary'>
								Módulos de Terceiros (npm)
							</h4>
							<CodeBlock
								language='typescript'
								code={`mock.module("nodemailer", () => ({\n  default: {\n    createTransport: mock(() => ({\n      sendMail: mock(async () => ({ \n        messageId: "fake-id-123" \n      })),\n    })),\n  },\n}));`}
							/>
						</Box>
						<Box className='border-black dark:border-white h-full bg-zinc-50 dark:bg-zinc-900'>
							<h4 className='font-black uppercase mb-4 text-secondary'>
								Módulos Locais
							</h4>
							<CodeBlock
								language='typescript'
								code={`mock.module("./database/connection", () => ({\n  default: mock(async () => ({\n    query: mock(async () => []),\n    close: mock(async () => {}),\n  })),\n}));\n\nmock.module("../services/email", () => ({\n  enviarBoasVindas: mock(async () => {}),\n  enviarAlerta:     mock(async () => {}),\n}));`}
							/>
						</Box>
					</div>
				</div>
			</section>

			{/* PARTE 5 */}
			<section className='mb-24'>
				<h2 className='text-4xl font-black uppercase mb-12 flex items-center gap-4'>
					<span className='px-4 py-2 bg-primary text-white'>PARTE 5</span>
					<span className='border-b-8 border-primary'>
						Combinar mock.module() com mock()
					</span>
				</h2>

				<div className='space-y-8 text-lg'>
					<p>
						O padrão mais útil é usar <code>mock()</code> dentro da factory
						function do <code>mock.module()</code>. Isto dá-te as funções falsas
						com todas as capacidades de verificação (
						<code>toHaveBeenCalledWith</code>, <code>mockResolvedValue</code>,
						etc.) mas aplicadas a módulos inteiros.
					</p>
					<Box className='border-primary shadow-brutalist'>
						<CodeBlock
							language='typescript'
							code={`import { mock, describe, test, expect, beforeEach } from "bun:test";

// Criar mocks com referências externas para verificação posterior
const hashMock    = mock(async (_pwd: string) => "hash-seguro-fixo");
const compareMock = mock(async (_pwd: string, _hash: string) => true);

mock.module("bcrypt", () => ({
  default: { hash: hashMock, compare: compareMock },
}));

import { encriptarPassword, verificarPassword } from "./auth";

describe("auth – com bcrypt mockado", () => {
  beforeEach(() => {
    hashMock.mockClear();
    compareMock.mockClear();
  });

  test("encriptarPassword chama hash com os rounds corretos", async () => {
    await encriptarPassword("segredo");
    expect(hashMock).toHaveBeenCalledWith("segredo", 10);
  });
});`}
						/>
					</Box>
				</div>
			</section>

			{/* PARTE 6 */}
			<section className='mb-24'>
				<h2 className='text-4xl font-black uppercase mb-12 flex items-center gap-4'>
					<span className='px-4 py-2 bg-red-500 text-white'>PARTE 6</span>
					<span className='border-b-8 border-red-500'>
						mock.restore() — Limpeza Global
					</span>
				</h2>

				<div className='space-y-8 text-lg'>
					<p>
						Ao contrário de <code>spyOn()</code> onde chamávamos{" "}
						<code>mockRestore()</code> em cada spy individualmente,{" "}
						<code>mock.module()</code> tem um método global:{" "}
						<code>mock.restore()</code>.
					</p>
					<Box className='border-red-500 bg-red-50/10'>
						<CodeBlock
							language='typescript'
							code={`import { mock, afterAll } from "bun:test";

mock.module("./notificacoes", () => ({
  enviar: mock(async () => {}),
}));

// Após TODOS os testes neste ficheiro, restaurar
afterAll(() => {
  mock.restore();
});`}
						/>
					</Box>
					<p className='text-sm italic opacity-70'>
						Para ficheiros de teste individuais, os mocks de módulo são
						automaticamente descartados quando o ficheiro termina — não é
						obrigatório chamar <code>mock.restore()</code> manualmente em cada
						caso, mas é uma boa prática em suites grandes.
					</p>
				</div>
			</section>

			{/* PARTE 7 */}
			<section className='mb-24'>
				<h2 className='text-4xl font-black uppercase mb-12 flex items-center gap-4'>
					<span className='px-4 py-2 bg-zinc-400 text-white'>PARTE 7</span>
					<span className='border-b-8 border-zinc-400'>
						Factory Functions Dinâmicas
					</span>
				</h2>

				<div className='space-y-8 text-lg'>
					<p>
						Podes fazer isso guardando referências aos mocks fora da factory e
						reconfigurando-os por teste — ou passando uma factory que lê de uma
						variável controlável.
					</p>
					<Box className='border-zinc-400 bg-zinc-50 dark:bg-zinc-900'>
						<CodeBlock
							language='typescript'
							code={`import { mock, test, expect } from "bun:test";

// Variável controlável externamente
let deveRetornarErro = false;

mock.module("./servico-externo", () => ({
  consultar: mock(async (id: number) => {
    if (deveRetornarErro) throw new Error("Serviço indisponível");
    return { id, status: "ativo" };
  }),
}));

import { verificarEstado } from "./gestor";

test("retorna estado ativo", async () => {
  deveRetornarErro = false;
  const estado = await verificarEstado(1);
  expect(estado.status).toBe("ativo");
});

test("propaga erro do serviço externo", async () => {
  deveRetornarErro = true;
  await expect(verificarEstado(1)).rejects.toThrow("Serviço indisponível");
});`}
						/>
					</Box>
				</div>
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
						Tens um sistema de Relatórios que depende de dois módulos: um
						cliente de base de dados (<code>pg</code>) e um serviço de geração
						de PDF (<code>pdfkit</code>). Queres testar a lógica do relatório
						sem tocar numa base de dados real nem gerar ficheiros PDF reais.
					</p>
					<Callout type='warning' title='Regra de Ouro'>
						A lógica de negócio deve ser testada em completo isolamento. Se o
						cliente de BD lançar um erro, o PDF não deve ser gerado. Usa
						referências externas aos mocks para verificar chamadas.
					</Callout>
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
						Cole em <code>relatorios.ts</code> — não o modifiques.
					</p>
					<Box className='p-0 overflow-hidden border-4 border-black dark:border-white shadow-brutalist'>
						<CodeBlock
							language='typescript'
							code={`// relatorios.ts — Lógica de Negócio
import { Pool } from "pg";
import PDFDocument from "pdfkit";

const pool = new Pool();

export interface RelatorioResult {
  sucesso: boolean;
  paginasGeradas?: number;
  erro?: string;
}

export async function gerarRelatorioAluno(alunoId: number): Promise<RelatorioResult> {
  let dados;
  try {
    const resultado = await pool.query(
      "SELECT nome, nota FROM alunos WHERE id = $1",
      [alunoId]
    );
    dados = resultado.rows[0];
  } catch (err) {
    return { sucesso: false, erro: "Erro ao consultar base de dados." };
  }

  if (!dados) {
    return { sucesso: false, erro: "Aluno não encontrado." };
  }

  const doc = new PDFDocument();
  doc.text(\`Relatório de: \${dados.nome}\`);
  doc.text(\`Nota Final: \${dados.nota}\`);
  doc.end();

  return { sucesso: true, paginasGeradas: 1 };
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
						Cria <code>relatorios.test.ts</code> e preenche cada{" "}
						<code>/* ??? */</code>.
					</p>
					<Box className='p-0 overflow-hidden border-4 border-primary shadow-brutalist'>
						<CodeBlock
							language='typescript'
							code={`// relatorios.test.ts — O teu trabalho começa aqui
import { mock, describe, test, expect, beforeEach } from "bun:test";

// ─── Referências externas para verificação ───────────────────
const queryMock   = mock(async () => ({ rows: [{ nome: "Ana", nota: 18 }] }));
const textMock    = mock(/* ??? */);
const endMock     = mock(/* ??? */);
const PDFDocMock  = mock(/* ??? */); // constructor que devolve objeto com text e end

// ─── Substituir módulos ANTES de qualquer import ─────────────
mock.module("pg", () => ({
  Pool: mock(/* ??? */), // constructor que devolve { query: queryMock }
}));

mock.module("pdfkit", () => ({
  default: /* ??? */,
}));

// ─── Import do módulo a testar — DEPOIS dos mocks ────────────
import { gerarRelatorioAluno } from "./relatorios";

// ─── Limpeza antes de cada teste ─────────────────────────────
beforeEach(() => {
  /* ??? — limpa os quatro mocks */
});

// ─── Cenário 1: Sucesso ───────────────────────────────────────
describe("gerarRelatorioAluno – sucesso", () => {
  test("deve retornar sucesso = true", async () => {
    const r = await gerarRelatorioAluno(1);
    expect(r.sucesso).toBe(/* ??? */);
    expect(r.paginasGeradas).toBe(1);
  });

  test("deve consultar a BD com o id correto", async () => {
    await gerarRelatorioAluno(7);
    expect(queryMock).toHaveBeenCalledWith(
      "SELECT nome, nota FROM alunos WHERE id = $1",
      /* ??? */
    );
  });

  test("deve escrever o nome e a nota no PDF", async () => {
    await gerarRelatorioAluno(1);
    expect(textMock).toHaveBeenCalledWith("Relatório de: Ana");
    expect(textMock).toHaveBeenCalledWith(/* ??? */);
  });
});

// ─── Cenário 2: Erro na BD ────────────────────────────────────
describe("gerarRelatorioAluno – erro na BD", () => {
  test("deve retornar sucesso = false", async () => {
    queryMock.mockRejectedValueOnce(new Error("Conexão recusada"));
    const r = await gerarRelatorioAluno(1);
    expect(r.sucesso).toBe(/* ??? */);
    expect(r.erro).toBe("Erro ao consultar base de dados.");
  });

  test("NÃO deve gerar PDF quando a BD falha", async () => {
    queryMock.mockRejectedValueOnce(new Error("Timeout"));
    await gerarRelatorioAluno(1);
    expect(PDFDocMock)./* ??? */; // o constructor nunca deve ser chamado
  });
});

// ─── Cenário 3: Aluno não encontrado ─────────────────────────
describe("gerarRelatorioAluno – aluno inexistente", () => {
  test("deve retornar erro de aluno não encontrado", async () => {
    queryMock.mockResolvedValueOnce({ rows: [] }); // BD não encontrou nada
    const r = await gerarRelatorioAluno(99);
    expect(r.erro).toBe(/* ??? */);
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
					<Callout type='info' title='Dica sobre Constructors'>
						Um constructor é uma função que, quando chamada com <code>new</code>
						, devolve um objeto. Com <code>mock()</code>, simulas isso
						retornando o objeto esperado.
					</Callout>
					<Box className='p-0 overflow-hidden border-4 border-emerald-500 bg-emerald-50/5 mt-4'>
						<CodeBlock
							language='typescript'
							code={`// relatorios.test.ts — SOLUÇÃO COMPLETA
import { mock, describe, test, expect, beforeEach } from "bun:test";

const queryMock  = mock(async () => ({ rows: [{ nome: "Ana", nota: 18 }] }));
const textMock   = mock((_texto: string) => {});
const endMock    = mock(() => {});
const PDFDocMock = mock(() => ({ text: textMock, end: endMock }));

mock.module("pg", () => ({
  Pool: mock(() => ({ query: queryMock })),
}));

mock.module("pdfkit", () => ({
  default: PDFDocMock,
}));

import { gerarRelatorioAluno } from "./relatorios";

beforeEach(() => {
  queryMock.mockClear();
  textMock.mockClear();
  endMock.mockClear();
  PDFDocMock.mockClear();
});

describe("gerarRelatorioAluno – sucesso", () => {
  test("deve retornar sucesso = true", async () => {
    const r = await gerarRelatorioAluno(1);
    expect(r.sucesso).toBe(true);
    expect(r.paginasGeradas).toBe(1);
  });

  test("deve consultar a BD com o id correto", async () => {
    await gerarRelatorioAluno(7);
    expect(queryMock).toHaveBeenCalledWith(
      "SELECT nome, nota FROM alunos WHERE id = $1",
      [7]
    );
  });

  test("deve escrever o nome e a nota no PDF", async () => {
    await gerarRelatorioAluno(1);
    expect(textMock).toHaveBeenCalledWith("Relatório de: Ana");
    expect(textMock).toHaveBeenCalledWith("Nota Final: 18");
  });
});

describe("gerarRelatorioAluno – erro na BD", () => {
  test("deve retornar sucesso = false", async () => {
    queryMock.mockRejectedValueOnce(new Error("Conexão recusada"));
    const r = await gerarRelatorioAluno(1);
    expect(r.sucesso).toBe(false);
    expect(r.erro).toBe("Erro ao consultar base de dados.");
  });

  test("NÃO deve gerar PDF quando a BD falha", async () => {
    queryMock.mockRejectedValueOnce(new Error("Timeout"));
    await gerarRelatorioAluno(1);
    expect(PDFDocMock).not.toHaveBeenCalled();
  });
});

describe("gerarRelatorioAluno – aluno inexistente", () => {
  test("deve retornar erro de aluno não encontrado", async () => {
    queryMock.mockResolvedValueOnce({ rows: [] });
    const r = await gerarRelatorioAluno(99);
    expect(r.erro).toBe("Aluno não encontrado.");
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
							<strong>MOCK DE CONSTRUCTOR</strong> — PDFDocument é instanciado
							com new. Para mockar um constructor, crias uma função que devolve
							o objeto esperado. O mock() trata o resto.
						</p>
					</li>
					<li className='flex gap-4 items-start'>
						<span className='text-primary font-black text-2xl'>•</span>
						<p>
							<strong>MÓDULOS DE TERCEIROS</strong> — pg e pdfkit são pacotes
							npm. mock.module() usa o nome exato do pacote, sem caminhos
							relativos.
						</p>
					</li>
					<li className='flex gap-4 items-start'>
						<span className='text-primary font-black text-2xl'>•</span>
						<p>
							<strong>REFERÊNCIAS EXTERNAS</strong> — Os mocks (queryMock,
							textMock) são criados fora da factory para que possas
							inspecioná-los nos testes.
						</p>
					</li>
					<li className='flex gap-4 items-start'>
						<span className='text-primary font-black text-2xl'>•</span>
						<p>
							<strong>PROTEÇÃO COM not.toHaveBeenCalled()</strong> — A garantia
							de que o PDF não é gerado quando a BD falha protege um requisito
							crítico do sistema.
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
						"mock.module() substitui um módulo inteiro antes de qualquer import ser resolvido.",
						"Hoisting garante que o mock está no lugar antes do código testado ser carregado.",
						"Para módulos de terceiros usa o nome do pacote; para módulos locais usa o caminho relativo.",
						"Combina mock.module() com mock() para criar substitutos verificáveis.",
						"Para mockar constructors, a factory devolve uma função que retorna o objeto esperado.",
						"mock.restore() limpa todos os mocks de módulo de uma vez — útil em afterAll.",
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
					Conferência 3.4 — Fim
				</p>
				<p className='font-black uppercase text-2xl italic text-zinc-400'>
					Próxima: 3.5 — Fake Timers — controlando o tempo nos testes
				</p>
			</div>
		</>
	),
	ejercicios: [],
};
