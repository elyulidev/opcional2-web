import type { ConferenciaData } from "../../types";
import { CodeBlock } from "../../components/CodeBlock";
import { Callout, Box } from "../../components/CourseComponents";

export const data: ConferenciaData = {
	titulo: "3.3 spyOn() — espionando funções reais sem as destruir",
	objetivos: [
		"Explicar a diferença fundamental entre mock() e spyOn().",
		"Criar spies sobre métodos de objetos reais com spyOn().",
		"Usar mockImplementation e mockReturnValue em cima de um spy para alterar o comportamento temporariamente.",
		"Restaurar a implementação original com mockRestore() após cada teste.",
		"Identificar quando usar spyOn() em vez de mock() — e por quê.",
		"Aplicar spyOn() a módulos completos para interceptar importações.",
	],
	contenido: (
		<>
			{/* METADATA DA CONFERÊNCIA */}
			<div className='flex flex-wrap gap-4 mb-10'>
				<span className='px-4 py-2 bg-zinc-900 text-white dark:bg-zinc-100 dark:text-black font-black uppercase text-sm brutalist-shadow'>
					⏱️ Duração: 2 Horas
				</span>
				<span className='px-4 py-2 bg-primary text-white font-black uppercase text-sm brutalist-shadow'>
					🔑 Pré-requisitos: Conferência 3.2 concluída
				</span>
			</div>

			{/* INTRODUÇÃO */}
			<Box className='bg-primary/10 border-black dark:border-white mb-16 p-10 shadow-[12px_12px_0px_0px_rgba(255,50,150,1)] dark:shadow-[12px_12px_0px_0px_rgba(255,50,150,0.5)] relative overflow-hidden'>
				<h3 className='text-3xl font-black uppercase mb-6 text-primary flex items-center gap-3'>
					<span className='w-12 h-12 flex items-center justify-center bg-black text-white dark:bg-white dark:text-black rounded-full text-xl'>
						🕵️
					</span>
					Introdução — O espião que não mata o alvo
				</h3>
				<div className='space-y-4 text-lg leading-relaxed text-zinc-800 dark:text-zinc-200'>
					<p>
						Nas conferências anteriores, <code>mock()</code> substituía
						completamente a função original. A função real deixava de existir
						durante o teste — era um substituto total.
					</p>
					<p>
						Mas às vezes não queremos substituir. Queremos observar uma função
						real enquanto ela continua a funcionar normalmente — ou alterá-la só
						temporariamente e depois devolvê-la ao estado original.
					</p>
					<p>
						É exatamente para isso que existe o <code>spyOn()</code>.
					</p>
					<p className='font-black text-2xl py-6 px-8 border-l-8 border-primary bg-white dark:bg-zinc-900 shadow-brutalist uppercase italic tracking-tighter'>
						"mock() substitui. spyOn() observa — e pode interferir quando
						necessário."
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
						A Diferença Fundamental
					</span>
				</h2>

				<div className='space-y-6 text-lg leading-relaxed mb-10'>
					<p>
						A distinção entre <code>mock()</code> e <code>spyOn()</code> é
						conceptual antes de ser técnica.
					</p>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-10 mt-8'>
						<Box className='border-zinc-300 bg-zinc-50/50 dark:bg-zinc-900/50'>
							<h4 className='font-black uppercase text-xl mb-4'>mock()</h4>
							<p className='text-sm mb-4'>
								Cria uma função completamente nova do zero. Não existe função
								original — a função falsa é tudo o que há. É ideal quando a
								dependência nem existe ainda, ou quando queremos total controlo
								desde o início.
							</p>
						</Box>
						<Box className='border-primary shadow-brutalist bg-primary/5'>
							<h4 className='font-black uppercase text-xl mb-4 text-primary'>
								spyOn()
							</h4>
							<p className='text-sm mb-4'>
								Envolve uma função que já existe num objeto. A função real
								continua lá. O spy intercepta as chamadas, regista tudo, mas por
								defeito chama a implementação original de seguida. É ideal
								quando queremos verificar que uma função do sistema foi chamada
								— sem a quebrar.
							</p>
						</Box>
					</div>
				</div>

				<CodeBlock
					language='typescript'
					code={`import { spyOn } from "bun:test";

const servico = {
  calcular: (x: number) => x * 2,
};

// O spy envolve o método real — ele continua a funcionar
const spy = spyOn(servico, "calcular");

const resultado = servico.calcular(5);

// A função original correu e retornou 10
console.log(resultado); // 10

// Mas o spy registou tudo
expect(spy).toHaveBeenCalledWith(5);
expect(spy).toHaveBeenCalledTimes(1);`}
				/>
				<p className='mt-6 italic text-zinc-500'>
					O método <code>servico.calcular</code> ainda é o método original. O
					spy apenas se colocou "à frente" dele para observar.
				</p>
			</section>

			{/* PARTE 2 */}
			<section className='mb-24 relative overflow-hidden'>
				<div className='absolute -right-20 top-0 text-[15rem] leading-none text-emerald-500/5 font-black pointer-events-none'>
					CREAT
				</div>
				<h2 className='text-4xl font-black uppercase mb-12 flex items-center gap-4'>
					<span className='px-4 py-2 bg-emerald-500 text-white'>PARTE 2</span>
					<span className='border-b-8 border-emerald-500'>
						Sintaxe e Criação
					</span>
				</h2>

				<div className='space-y-6 text-lg mb-10'>
					<p>
						<code>spyOn()</code> recebe sempre dois argumentos: o objeto que
						contém o método, e o nome do método como string.
					</p>
					<Box className='border-emerald-500 bg-emerald-50/10'>
						<CodeBlock
							language='typescript'
							code={`import { spyOn, test, expect } from "bun:test";

// Objeto real com lógica de negócio
const repositorio = {
  buscarAluno: async (id: number) => {
    // Em produção, isto iria à base de dados
    return { id, nome: "Estudante Real", nota: 15 };
  },
};

test("o repositório é chamado com o id correto", async () => {
  const spy = spyOn(repositorio, "buscarAluno");

  const aluno = await repositorio.buscarAluno(7);

  // A função real correu — retornou dados reais
  expect(aluno.nome).toBe("Estudante Real");

  // E o spy registou a chamada
  expect(spy).toHaveBeenCalledWith(7);
});`}
						/>
					</Box>
					<p className='italic text-zinc-500'>
						Repara que não configurámos nenhum valor de retorno. O spy deixou a
						função original correr e apenas registou o que aconteceu.
					</p>
				</div>
			</section>

			{/* PARTE 3 */}
			<section className='mb-24'>
				<h2 className='text-4xl font-black uppercase mb-12 flex items-center gap-4'>
					<span className='px-4 py-2 bg-black text-white dark:bg-white dark:text-black'>
						PARTE 3
					</span>
					<span className='border-b-8 border-secondary'>
						Interferir Temporariamente
					</span>
				</h2>

				<div className='space-y-8 text-lg'>
					<p>
						O verdadeiro poder do <code>spyOn()</code> aparece quando combinamos
						observação com substituição temporária. Podemos usar os mesmos
						métodos que aprendemos na conferência anterior —{" "}
						<code>mockReturnValue</code>, <code>mockResolvedValue</code>,{" "}
						<code>mockImplementation</code> — mas desta vez em cima de uma
						função real.
					</p>
					<Box className='border-secondary shadow-brutalist'>
						<CodeBlock
							language='typescript'
							code={`import { spyOn, test, expect } from "bun:test";

const emailService = {
  enviar: async (destinatario: string, assunto: string) => {
    // Em produção, isto enviaria um email de verdade
    const resposta = await fetch("https://api.email.real/enviar", { /* ... */ });
    return resposta.ok;
  },
};

test("deve tentar enviar o email", async () => {
  // Interceptar para NÃO enviar email de verdade durante o teste
  const spy = spyOn(emailService, "enviar").mockResolvedValue(true);

  const resultado = await emailService.enviar("ana@ispm.ao", "Bem-vindo");

  // Verificar que foi chamado corretamente
  expect(spy).toHaveBeenCalledWith("ana@ispm.ao", "Bem-vindo");
  expect(resultado).toBe(true);
});`}
						/>
					</Box>
					<p className='italic text-zinc-500'>
						Aqui a função original (que enviaria um email real) nunca correu. O
						spy interceptou a chamada e devolveu <code>true</code> diretamente.
						Mas ao contrário de <code>mock()</code>, o método original ainda
						existe no objeto — podemos restaurá-lo a qualquer momento.
					</p>
				</div>
			</section>

			{/* PARTE 4 */}
			<section className='mb-24'>
				<h2 className='text-4xl font-black uppercase mb-12 flex items-center gap-4'>
					<span className='px-4 py-2 bg-zinc-950 text-white'>PARTE 4</span>
					<span className='border-b-8 border-zinc-950 dark:border-zinc-50'>
						mockRestore() — Devolver o Espião
					</span>
				</h2>

				<div className='space-y-8 text-lg'>
					<p>
						Esta é a diferença mais importante entre <code>spyOn()</code> e{" "}
						<code>mock()</code>. Depois do teste, podes restaurar a função
						original chamando <code>mockRestore()</code>.
					</p>
					<Box className='border-black dark:border-white bg-zinc-50 dark:bg-zinc-900'>
						<CodeBlock
							language='typescript'
							code={`import { spyOn, test, expect } from "bun:test";

const calculadora = {
  somar: (a: number, b: number) => a + b,
};

test("interceptar somar", () => {
  const spy = spyOn(calculadora, "somar").mockReturnValue(999);

  // Durante o teste, somar retorna sempre 999
  expect(calculadora.somar(1, 2)).toBe(999);

  // Restaurar a função original
  spy.mockRestore();

  // Agora somar volta a funcionar normalmente
  expect(calculadora.somar(1, 2)).toBe(3);
});`}
						/>
					</Box>

					<Callout
						type='info'
						title='Padrão recomendado — afterEach com mockRestore'
					>
						Quando usas <code>spyOn()</code>, o padrão correto é restaurar
						sempre depois de cada teste. Se não o fizeres, o spy continua ativo
						nos testes seguintes e pode causar falhas difíceis de diagnosticar.
					</Callout>

					<Box className='border-zinc-400 p-0 overflow-hidden'>
						<div className='p-4 bg-zinc-800 text-white font-black uppercase text-sm'>
							Uso correto do afterEach
						</div>
						<CodeBlock
							language='typescript'
							code={`import { spyOn, describe, test, expect, afterEach } from "bun:test";

const logger = {
  registar: (mensagem: string) => {
    // Em produção, escreve num ficheiro de log real
    console.log(\`[LOG] \${mensagem}\`);
  },
};

describe("módulo com logging", () => {
  let logSpy: ReturnType<typeof spyOn>;

  afterEach(() => {
    // Restaurar sempre depois de cada teste
    logSpy.mockRestore();
  });

  test("deve registar a mensagem correta", () => {
    logSpy = spyOn(logger, "registar").mockImplementation(() => {});
    logger.registar("Utilizador autenticado");

    expect(logSpy).toHaveBeenCalledWith("Utilizador autenticado");
  });

  test("outro teste — logger está restaurado", () => {
    // Aqui logger.registar é a função original novamente
    logSpy = spyOn(logger, "registar").mockImplementation(() => {});
    // ...
  });
});`}
						/>
					</Box>
				</div>
			</section>

			{/* PARTE 5 */}
			<section className='mb-24'>
				<h2 className='text-4xl font-black uppercase mb-12 flex items-center gap-4'>
					<span className='px-4 py-2 bg-primary text-white'>PARTE 5</span>
					<span className='border-b-8 border-primary'>
						Quando Usar spyOn() vs mock()
					</span>
				</h2>

				<div className='space-y-6 text-lg'>
					<p>A resposta depende do contexto:</p>
					<ul className='space-y-4'>
						<li className='flex gap-4 items-start'>
							<span className='w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-black shrink-0 mt-1 text-sm'>
								1
							</span>
							<p>
								Usa <code>mock()</code> quando estás a criar um substituto total
								para uma dependência externa — um repositório, um serviço de
								email, uma API. A função original não é relevante para o teste.
								Queres controlo total desde o início.
							</p>
						</li>
						<li className='flex gap-4 items-start'>
							<span className='w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-black shrink-0 mt-1 text-sm'>
								2
							</span>
							<p>
								Usa <code>spyOn()</code> quando já tens um objeto com
								implementação real e queres uma destas três coisas: verificar se
								um método foi chamado sem o substituir; substituí-lo
								temporariamente durante um teste e restaurá-lo depois; ou
								interceptar um método de um módulo importado.
							</p>
						</li>
					</ul>

					<div className='grid grid-cols-1 md:grid-cols-2 gap-8 mt-10'>
						<Box className='border-zinc-300'>
							<h4 className='font-black uppercase mb-4 text-sm opacity-50'>
								Cenário 1 — mock()
							</h4>
							<CodeBlock
								language='typescript'
								code={`// Estamos a criar um repositório falso do zero
const repositorioFalso = {
  buscar: mock(async () => ({ id: 1, nome: "Ana" })),
  guardar: mock(async () => true),
};`}
							/>
						</Box>
						<Box className='border-primary shadow-brutalist'>
							<h4 className='font-black uppercase mb-4 text-sm text-primary'>
								Cenário 2 — spyOn()
							</h4>
							<CodeBlock
								language='typescript'
								code={`// Temos um objeto real e queremos observar um método específico
import { sistemaDeNotificacoes } from "./notificacoes";

const spy = spyOn(sistemaDeNotificacoes, "enviarAlerta");
// A lógica real de enviarAlerta continua intacta nos outros testes`}
							/>
						</Box>
					</div>
				</div>
			</section>

			{/* PARTE 6 */}
			<section className='mb-24'>
				<h2 className='text-4xl font-black uppercase mb-12 flex items-center gap-4'>
					<span className='px-4 py-2 bg-red-500 text-white'>PARTE 6</span>
					<span className='border-b-8 border-red-500'>spyOn() em Módulos</span>
				</h2>

				<div className='space-y-8 text-lg'>
					<p>
						Um dos usos mais práticos do <code>spyOn()</code> é interceptar
						funções de módulos importados — incluindo módulos nativos do Bun e
						do Node.js. Isto é especialmente útil para testar código que usa{" "}
						<code>Date</code>, <code>Math.random()</code>, ou funções de I/O sem
						ter de reestruturar o código.
					</p>
					<Box className='border-red-500 bg-red-50/10'>
						<CodeBlock
							language='typescript'
							code={`import { spyOn, test, expect } from "bun:test";

// Espiar Math.random para tornar os testes determinísticos
test("gerador de códigos usa Math.random", () => {
  const randomSpy = spyOn(Math, "random").mockReturnValue(0.5);

  const codigo = gerarCodigoDesconto(); // usa Math.random internamente

  // Com random = 0.5, o código gerado é sempre previsível
  expect(codigo).toBe("DISC-500");
  expect(randomSpy).toHaveBeenCalledTimes(1);

  randomSpy.mockRestore();
});

// Espiar Date para controlar "hoje"
test("matrícula apenas disponível em Março", () => {
  const dateSpy = spyOn(globalThis, "Date").mockImplementation(
    () => new Date("2025-03-15") as unknown as Date
  );

  const resultado = verificarPeriodoMatricula();
  expect(resultado.disponivel).toBe(true);

  dateSpy.mockRestore();
});`}
						/>
					</Box>
				</div>
			</section>

			{/* PARTE 7 */}
			<section className='mb-24'>
				<h2 className='text-4xl font-black uppercase mb-12 flex items-center gap-4'>
					<span className='px-4 py-2 bg-zinc-400 text-white'>PARTE 7</span>
					<span className='border-b-8 border-zinc-400'>
						Inspecionar Chamadas com .mock
					</span>
				</h2>

				<div className='space-y-8 text-lg'>
					<p>
						Tal como com <code>mock()</code>, os spies expõem a propriedade{" "}
						<code>.mock</code> para inspeção manual de chamadas:
					</p>
					<Box className='border-zinc-400 bg-zinc-50 dark:bg-zinc-900'>
						<CodeBlock
							language='typescript'
							code={`const servicoReal = {
  processar: (dados: { id: number; valor: number }) => {
    return \`Processado: \${dados.id}\`;
  },
};

const spy = spyOn(servicoReal, "processar");

servicoReal.processar({ id: 1, valor: 100 });
servicoReal.processar({ id: 2, valor: 200 });

// Aceder ao histórico completo
spy.mock.calls;
// [[{ id: 1, valor: 100 }], [{ id: 2, valor: 200 }]]

// Verificar o primeiro argumento da segunda chamada
spy.mock.calls[1][0].valor; // 200

// Verificar resultados
spy.mock.results[0].value; // "Processado: 1"`}
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
						Tens um Sistema de Autenticação com um logger real e um serviço de
						token real. Queres testar a lógica de login sem escrever logs reais
						em ficheiros e sem gerar tokens criptográficos reais — mas também
						queres garantir que o logger e o gerador de tokens são chamados
						corretamente.
					</p>
					<Callout type='warning' title='Regra de Ouro'>
						O logger deve ser chamado tanto em caso de sucesso como de falha. O
						token só deve ser gerado quando o login tem sucesso. Usa{" "}
						<code>spyOn()</code> para espiar os métodos reais sem os destruir.
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
						Cole em <code>autenticacao.ts</code> — não o modifiques.
					</p>
					<Box className='p-0 overflow-hidden border-4 border-black dark:border-white shadow-brutalist'>
						<CodeBlock
							language='typescript'
							code={`// autenticacao.ts — Lógica de Negócio
export const logger = {
  info: (mensagem: string) => console.log(\`[INFO] \${mensagem}\`),
  erro: (mensagem: string) => console.error(\`[ERRO] \${mensagem}\`),
};

export const tokenService = {
  gerar: (userId: number): string => {
    // Em produção, gera um JWT real
    return \`token-real-\${userId}-\${Date.now()}\`;
  },
};

export interface IUserDB {
  verificarCredenciais(email: string, senha: string): Promise<{ id: number; nome: string } | null>;
}

export interface LoginResult {
  sucesso: boolean;
  token?: string;
  erro?: string;
}

export async function fazerLogin(
  email: string,
  senha: string,
  userDB: IUserDB
): Promise<LoginResult> {
  const utilizador = await userDB.verificarCredenciais(email, senha);

  if (!utilizador) {
    logger.erro(\`Tentativa de login falhada para: \${email}\`);
    return { sucesso: false, erro: "Credenciais inválidas." };
  }

  const token = tokenService.gerar(utilizador.id);
  logger.info(\`Login bem-sucedido para: \${utilizador.nome}\`);
  return { sucesso: true, token };
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
						Cria <code>autenticacao.test.ts</code> e preenche cada{" "}
						<code>/* ??? */</code>.
					</p>
					<Box className='p-0 overflow-hidden border-4 border-primary shadow-brutalist'>
						<CodeBlock
							language='typescript'
							code={`// autenticacao.test.ts — O teu trabalho começa aqui
import { spyOn, mock, describe, test, expect, afterEach } from "bun:test";
import { fazerLogin, logger, tokenService } from "./autenticacao";
import type { IUserDB } from "./autenticacao";

// ─── Mocks para a base de dados ──────────────────────────────
const dbComUtilizadorValido: IUserDB = {
  verificarCredenciais: mock(async () => ({ id: 5, nome: "Carlos" })),
};

const dbSemUtilizador: IUserDB = {
  verificarCredenciais: mock(async () => null),
};

// ─── Cenário 1: Login com falha ───────────────────────────────
describe("fazerLogin – credenciais inválidas", () => {
  let erroSpy: /* ??? */;

  afterEach(() => {
    /* ??? — restaurar o spy */
  });

  test("deve retornar sucesso = false", async () => {
    erroSpy = spyOn(logger, "erro")./* ??? */; // silenciar o log real
    const r = await fazerLogin("x@x.com", "errada", dbSemUtilizador);
    expect(r.sucesso).toBe(/* ??? */);
    expect(r.erro).toBe("Credenciais inválidas.");
  });

  test("deve chamar logger.erro com o email", async () => {
    erroSpy = spyOn(logger, "erro").mockImplementation(() => {});
    await fazerLogin("x@x.com", "errada", dbSemUtilizador);

    expect(erroSpy).toHaveBeenCalledWith(/* ??? */);
  });
});

// ─── Cenário 2: Login com sucesso ────────────────────────────
describe("fazerLogin – sucesso", () => {
  let infoSpy: /* ??? */;
  let tokenSpy: /* ??? */;

  afterEach(() => {
    /* ??? — restaurar os dois spies */
  });

  test("deve retornar sucesso = true e um token", async () => {
    infoSpy  = spyOn(logger, "info").mockImplementation(() => {});
    tokenSpy = spyOn(tokenService, "gerar").mockReturnValue("token-teste-999");
    const r = await fazerLogin("carlos@ispm.ao", "correta", dbComUtilizadorValido);

    expect(r.sucesso).toBe(true);
    expect(r.token).toBe(/* ??? */);
  });

  test("deve chamar tokenService.gerar com o id do utilizador", async () => {
    infoSpy  = spyOn(logger, "info").mockImplementation(() => {});
    tokenSpy = spyOn(tokenService, "gerar").mockReturnValue("token-qualquer");
    await fazerLogin("carlos@ispm.ao", "correta", dbComUtilizadorValido);

    expect(tokenSpy).toHaveBeenCalledWith(/* ??? */);
  });

  test("deve chamar logger.info com o nome do utilizador", async () => {
    infoSpy  = spyOn(logger, "info").mockImplementation(() => {});
    tokenSpy = spyOn(tokenService, "gerar").mockReturnValue("token-qualquer");
    await fazerLogin("carlos@ispm.ao", "correta", dbComUtilizadorValido);

    expect(infoSpy).toHaveBeenCalledWith(/* ??? */);
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
					<Callout type='info' title='Atenção ao afterEach'>
						Presta atenção especial ao <code>afterEach</code> — sem{" "}
						<code>mockRestore()</code>, os spies contaminam os testes seguintes.
					</Callout>
					<Box className='p-0 overflow-hidden border-4 border-emerald-500 bg-emerald-50/5 mt-4'>
						<CodeBlock
							language='typescript'
							code={`// autenticacao.test.ts — SOLUÇÃO COMPLETA
import { spyOn, mock, describe, test, expect, afterEach } from "bun:test";
import { fazerLogin, logger, tokenService } from "./autenticacao";
import type { IUserDB } from "./autenticacao";

const dbComUtilizadorValido: IUserDB = {
  verificarCredenciais: mock(async () => ({ id: 5, nome: "Carlos" })),
};

const dbSemUtilizador: IUserDB = {
  verificarCredenciais: mock(async () => null),
};

// ─── Cenário 1: Login com falha ───────────────────────────────
describe("fazerLogin – credenciais inválidas", () => {
  let erroSpy: ReturnType<typeof spyOn>;

  afterEach(() => {
    erroSpy.mockRestore();
  });

  test("deve retornar sucesso = false", async () => {
    erroSpy = spyOn(logger, "erro").mockImplementation(() => {});
    const r = await fazerLogin("x@x.com", "errada", dbSemUtilizador);
    expect(r.sucesso).toBe(false);
    expect(r.erro).toBe("Credenciais inválidas.");
  });

  test("deve chamar logger.erro com o email", async () => {
    erroSpy = spyOn(logger, "erro").mockImplementation(() => {});
    await fazerLogin("x@x.com", "errada", dbSemUtilizador);

    expect(erroSpy).toHaveBeenCalledWith("Tentativa de login falhada para: x@x.com");
  });
});

// ─── Cenário 2: Login com sucesso ────────────────────────────
describe("fazerLogin – sucesso", () => {
  let infoSpy: ReturnType<typeof spyOn>;
  let tokenSpy: ReturnType<typeof spyOn>;

  afterEach(() => {
    infoSpy.mockRestore();
    tokenSpy.mockRestore();
  });

  test("deve retornar sucesso = true e um token", async () => {
    infoSpy  = spyOn(logger, "info").mockImplementation(() => {});
    tokenSpy = spyOn(tokenService, "gerar").mockReturnValue("token-teste-999");
    const r = await fazerLogin("carlos@ispm.ao", "correta", dbComUtilizadorValido);

    expect(r.sucesso).toBe(true);
    expect(r.token).toBe("token-teste-999");
  });

  test("deve chamar tokenService.gerar com o id do utilizador", async () => {
    infoSpy  = spyOn(logger, "info").mockImplementation(() => {});
    tokenSpy = spyOn(tokenService, "gerar").mockReturnValue("token-qualquer");
    await fazerLogin("carlos@ispm.ao", "correta", dbComUtilizadorValido);

    expect(tokenSpy).toHaveBeenCalledWith(5); // id = 5 conforme o mock do DB
  });

  test("deve chamar logger.info com o nome do utilizador", async () => {
    infoSpy  = spyOn(logger, "info").mockImplementation(() => {});
    tokenSpy = spyOn(tokenService, "gerar").mockReturnValue("token-qualquer");
    await fazerLogin("carlos@ispm.ao", "correta", dbComUtilizadorValido);

    expect(infoSpy).toHaveBeenCalledWith("Login bem-sucedido para: Carlos");
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
							<strong>SPY SEM SUBSTITUIR</strong> — O spy em logger.erro deixa o
							método existir. Em produção ele continua a funcionar. No teste,
							silenciámos o output com mockImplementation mas verificámos a
							chamada.
						</p>
					</li>
					<li className='flex gap-4 items-start'>
						<span className='text-primary font-black text-2xl'>•</span>
						<p>
							<strong>SPY COM SUBSTITUIÇÃO</strong> — O spy em
							tokenService.gerar impediu a geração de um JWT real (que usaria
							Date.now() e seria imprevisível) e devolveu um valor fixo e
							controlável.
						</p>
					</li>
					<li className='flex gap-4 items-start'>
						<span className='text-primary font-black text-2xl'>•</span>
						<p>
							<strong>RESTORE OBRIGATÓRIO</strong> — Sem o afterEach com
							mockRestore(), o spy de um teste contaminaria os seguintes. O
							logger.info ficaria silenciado para sempre durante a suite de
							testes.
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
						"Observação — spyOn() envolve funções reais sem as destruir por padrão.",
						"Determinação — Use para domar Math.random() e Date.now().",
						"Substituição — Podes observar E substituir quando a lógica real tem efeitos indesejados.",
						"Higiene — spy.mockRestore() é obrigatório para evitar contaminação de testes.",
						"Classes — Excelente para verificar interações internas entre instâncias.",
						"Decision Guide — mock() para o novo; spyOn() para o existente.",
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
					Conferência 3.3 — Fim
				</p>
				<p className='font-black uppercase text-2xl italic text-zinc-400'>
					Próxima: 3.4 — Módulos e isolamento — mockModule() e fake timers
				</p>
			</div>
		</>
	),
	ejercicios: [],
};
