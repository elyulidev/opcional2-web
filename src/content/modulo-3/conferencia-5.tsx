import type { ConferenciaData } from "../../types";
import { CodeBlock } from "../../components/CodeBlock";
import { Box } from "../../components/CourseComponents";

export const data: ConferenciaData = {
	titulo: "3.5 Mocking de Tempo: setSystemTime e Datas Controladas",
	objetivos: [
		"Explicar por que testes que dependem do tempo real são não determinísticos e frágeis.",
		"Usar setSystemTime() do bun:test para congelar o relógio num momento específico.",
		"Testar lógica baseada em datas — prazos, períodos, expiração de tokens — de forma previsível.",
		"Usar useFakeTimers() e useRealTimers() para controlar setTimeout e setInterval nos testes.",
		"Avançar o tempo manualmente com jest.advanceTimersByTime() dentro de um ambiente de fake timers.",
		"Aplicar o padrão correto de restauração para garantir isolamento entre testes.",
	],
	contenido: (
		<>
			{/* METADATA DA CONFERÊNCIA */}
			<div className='flex flex-wrap gap-4 mb-10'>
				<span className='px-4 py-2 bg-zinc-900 text-white dark:bg-zinc-100 dark:text-black font-black uppercase text-sm brutalist-shadow'>
					⏱️ Duração: 2 Horas
				</span>
				<span className='px-4 py-2 bg-primary text-white font-black uppercase text-sm brutalist-shadow'>
					🔑 Pré-requisitos: Conferência 3.4 concluída
				</span>
			</div>

			{/* INTRODUÇÃO */}
			<Box className='bg-primary/10 border-black dark:border-white mb-16 p-10 shadow-[12px_12px_0px_0px_rgba(255,50,150,1)] dark:shadow-[12px_12px_0px_0px_rgba(255,50,150,0.5)] relative overflow-hidden'>
				<h3 className='text-3xl font-black uppercase mb-6 text-primary flex items-center gap-3'>
					<span className='w-12 h-12 flex items-center justify-center bg-black text-white dark:bg-white dark:text-black rounded-full text-xl'>
						⏰
					</span>
					Introdução — O problema dos testes que dependem do relógio real
				</h3>
				<div className='space-y-4 text-lg leading-relaxed text-zinc-800 dark:text-zinc-200'>
					<p>
						Imagina que tens uma função que verifica se o período de matrículas
						está aberto. A lógica diz: "matrículas abertas em Março". Se o teu
						teste correr em Abril, falha. Se correr em Março, passa. O mesmo
						código, resultados diferentes consoante o mês em que o teste é
						executado.
					</p>
					<p>
						Isto é um teste <strong>não determinístico</strong> — o resultado
						depende de algo fora do controlo do programador. É uma das formas
						mais traiçoeiras de fragilidade num conjunto de testes.
					</p>
					<p>
						A solução é o mesmo princípio que aplicámos a bases de dados e
						emails: substituir a dependência real pelo equivalente controlado.
						Em vez do relógio do sistema operativo, usamos um relógio falso que
						nós controlamos.
					</p>
					<p className='font-black text-2xl py-6 px-8 border-l-8 border-primary bg-white dark:bg-zinc-900 shadow-brutalist uppercase italic tracking-tighter'>
						"Um teste que falha às 23:59 mas passa às 00:01 não é um teste — é
						uma armadilha."
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
						setSystemTime() — Congelar o Relógio
					</span>
				</h2>

				<div className='space-y-6 text-lg mb-10'>
					<p>
						O <code>bun:test</code> exporta <code>setSystemTime()</code>. Quando
						chamada, congela o valor que <code>new Date()</code> e{" "}
						<code>Date.now()</code> retornam para aquele valor fixo. Todo o
						código que corra depois vê essa data como "agora".
					</p>
					<Box className='border-zinc-900 dark:border-zinc-100 shadow-brutalist'>
						<CodeBlock
							language='typescript'
							code={`import { setSystemTime, test, expect } from "bun:test";

test("hoje é 15 de Março de 2025", () => {
  // Congelar o relógio neste momento exato
  setSystemTime(new Date("2025-03-15T10:00:00Z"));

  // Qualquer código que use Date.now() ou new Date() vê esta data
  const agora = new Date();
  expect(agora.getFullYear()).toBe(2025);
  expect(agora.getMonth()).toBe(2); // Março = índice 2 em JavaScript
  expect(agora.getDate()).toBe(15);
});`}
						/>
					</Box>
					<p className='mt-6'>
						<code>setSystemTime()</code> aceita um objeto Date, um timestamp
						numérico ou uma string ISO 8601:
					</p>
					<div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-4'>
						<div className='p-4 bg-zinc-100 dark:bg-zinc-800 font-mono text-xs border-l-4 border-primary'>
							setSystemTime(new Date("2025-03-15"));
						</div>
						<div className='p-4 bg-zinc-100 dark:bg-zinc-800 font-mono text-xs border-l-4 border-primary'>
							setSystemTime(1741996800000);
						</div>
						<div className='p-4 bg-zinc-100 dark:bg-zinc-800 font-mono text-xs border-l-4 border-primary'>
							setSystemTime("2025-03-15");
						</div>
					</div>
				</div>
			</section>

			{/* PARTE 2 */}
			<section className='mb-24 relative overflow-hidden'>
				<div className='absolute -right-20 top-0 text-[15rem] leading-none text-emerald-500/5 font-black pointer-events-none'>
					RESET
				</div>
				<h2 className='text-4xl font-black uppercase mb-12 flex items-center gap-4'>
					<span className='px-4 py-2 bg-emerald-500 text-white'>PARTE 2</span>
					<span className='border-b-8 border-emerald-500'>
						Restaurar o Relógio Real
					</span>
				</h2>

				<div className='space-y-6 text-lg'>
					<p>
						Depois de cada teste que usa <code>setSystemTime()</code>, é
						obrigatório restaurar o relógio real. A restauração faz-se chamando{" "}
						<code>setSystemTime()</code> sem argumentos.
					</p>
					<Box className='border-emerald-500 bg-emerald-50/10'>
						<CodeBlock
							language='typescript'
							code={`import { setSystemTime, test, expect, afterEach } from "bun:test";

afterEach(() => {
  // Restaurar o relógio real após cada teste
  setSystemTime();
});

test("teste com data congelada", () => {
  setSystemTime(new Date("2025-03-15"));
  const agora = new Date();
  expect(agora.getFullYear()).toBe(2025);
});

test("este teste vê a data real do sistema", () => {
  const agora = new Date();
  expect(agora.getFullYear()).toBeGreaterThanOrEqual(2025);
});`}
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
						Testando Lógica de Datas de Negócio
					</span>
				</h2>

				<div className='space-y-8 text-lg'>
					<p>
						Com <code>setSystemTime()</code>, podes testar cada ramo da lógica
						(prazos, inscrições, validade de tokens) sem esperar pelo mês ou
						hora certa.
					</p>
					<Box className='border-secondary shadow-brutalist'>
						<CodeBlock
							language='typescript'
							code={`import { setSystemTime, describe, test, expect, afterEach } from "bun:test";
import { verificarPeriodoMatricula } from "./matriculas";

describe("período de matrícula", () => {
  afterEach(() => setSystemTime());

  test("deve estar aberto em Março", () => {
    setSystemTime(new Date("2025-03-15"));
    expect(verificarPeriodoMatricula()).toBe(true);
  });

  test("deve abrir exatamente a 1 de Março à meia-noite", () => {
    setSystemTime(new Date("2025-03-01T00:00:00Z"));
    expect(verificarPeriodoMatricula()).toBe(true);
  });

  test("deve fechar após 31 de Março às 23:59", () => {
    setSystemTime(new Date("2025-03-31T23:59:59Z"));
    expect(verificarPeriodoMatricula()).toBe(true);

    setSystemTime(new Date("2025-04-01T00:00:00Z"));
    expect(verificarPeriodoMatricula()).toBe(false);
  });
});`}
						/>
					</Box>
				</div>
			</section>

			{/* PARTE 4 */}
			<section className='mb-24'>
				<h2 className='text-4xl font-black uppercase mb-12 flex items-center gap-4'>
					<span className='px-4 py-2 bg-zinc-950 text-white'>PARTE 4</span>
					<span className='border-b-8 border-zinc-950 dark:border-zinc-50'>
						Expiração de Tokens e Sessões
					</span>
				</h2>

				<div className='space-y-8 text-lg'>
					<p>
						Verificar se um token expirou depende de comparar "agora" com a data
						de expiração. Podemos simular o futuro facilmente:
					</p>
					<Box className='border-black dark:border-white bg-zinc-50 dark:bg-zinc-900'>
						<CodeBlock
							language='typescript'
							code={`test("token expira após 1 hora", () => {
  setSystemTime(new Date("2025-06-01T10:00:00Z"));
  const token = criarToken({ userId: 1 });

  // Avançar o relógio 61 minutos — token expirado
  setSystemTime(new Date("2025-06-01T11:01:00Z"));

  const resultado = validarToken(token);
  expect(resultado.valido).toBe(false);
  expect(resultado.motivo).toBe("Token expirado.");
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
						useFakeTimers() — Controlar setTimeout e setInterval
					</span>
				</h2>

				<div className='space-y-8 text-lg'>
					<p>
						<code>setSystemTime()</code> controla <code>Date</code>, mas não
						afeta timers assíncronos. Para isso, usamos{" "}
						<code>jest.useFakeTimers()</code>.
					</p>
					<Box className='border-primary shadow-brutalist'>
						<CodeBlock
							language='typescript'
							code={`import { jest, test, expect } from "bun:test";

test("setTimeout não dispara até avançarmos o tempo", () => {
  jest.useFakeTimers();
  let disparado = false;
  setTimeout(() => { disparado = true; }, 5000);

  expect(disparado).toBe(false);

  // Avançar 5 segundos manualmente
  jest.advanceTimersByTime(5000);

  expect(disparado).toBe(true);
  jest.useRealTimers(); // restaurar
});`}
						/>
					</Box>
				</div>
			</section>

			{/* PARTE 6 */}
			<section className='mb-24'>
				<h2 className='text-4xl font-black uppercase mb-12 flex items-center gap-4'>
					<span className='px-4 py-2 bg-zinc-400 text-white'>PARTE 6</span>
					<span className='border-b-8 border-zinc-400'>
						Padrões Práticos com Fake Timers
					</span>
				</h2>

				<div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
					<Box className='border-zinc-400 h-full'>
						<h4 className='font-black uppercase mb-4'>Retry com Backoff</h4>
						<CodeBlock
							language='typescript'
							code={`jest.useFakeTimers();\n// ... iniciar operacao\n\njest.advanceTimersByTime(1000); // 1s\njest.advanceTimersByTime(2000); // 2s\n\nexpect(mock).toHaveBeenCalledTimes(3);`}
						/>
					</Box>
					<Box className='border-zinc-400 h-full'>
						<h4 className='font-black uppercase mb-4'>Polling (setInterval)</h4>
						<CodeBlock
							language='typescript'
							code={`jest.useFakeTimers();\niniciarPolling(mock, 30000);\n\njest.advanceTimersByTime(30000);\nexpect(mock).toHaveBeenCalledTimes(1);\n\njest.advanceTimersByTime(30000);\nexpect(mock).toHaveBeenCalledTimes(2);`}
						/>
					</Box>
				</div>
			</section>

			{/* PARTE 7 */}
			<section className='mb-24'>
				<h2 className='text-4xl font-black uppercase mb-12 flex items-center gap-4'>
					<span className='px-4 py-2 bg-red-500 text-white'>PARTE 7</span>
					<span className='border-b-8 border-red-500'>
						Combinar setSystemTime com Fake Timers
					</span>
				</h2>

				<div className='space-y-8 text-lg'>
					<p>
						São complementares: <code>setSystemTime()</code> controla o valor da
						data, <code>useFakeTimers()</code> controla quando os callbacks
						disparam.
					</p>
					<Box className='border-red-500 bg-red-50/10'>
						<CodeBlock
							language='typescript'
							code={`test("sessão expira e callback de logout é chamado", () => {
  setSystemTime(new Date("2025-09-01T08:00:00Z"));
  jest.useFakeTimers();
  const logoutMock = mock(() => {});

  iniciarSessao({ userId: 1, onExpirar: logoutMock });

  // Avançar 30 minutos
  jest.advanceTimersByTime(30 * 60 * 1000);
  expect(logoutMock).toHaveBeenCalledTimes(1);
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
						Tens um sistema de gestão de exames no ISPM com três regras
						temporais:
					</p>
					<ul className='list-disc list-inside space-y-2 text-base font-medium'>
						<li>Inscrições abertas apenas entre 1 e 15 de cada mês.</li>
						<li>Resultado disponível 48 horas após o exame.</li>
						<li>
							Notificação automática enviada 24 horas antes do prazo de entrega
							de notas.
						</li>
					</ul>
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
						Cole em <code>exames.ts</code> — não o modifiques.
					</p>
					<Box className='p-0 overflow-hidden border-4 border-black dark:border-white shadow-brutalist'>
						<CodeBlock
							language='typescript'
							code={`// exames.ts — Lógica de Negócio
export function inscricoesAbertas(): boolean {
  const dia = new Date().getDate();
  return dia >= 1 && dia <= 15;
}

export function resultadoDisponivel(dataExame: Date): boolean {
  const agora = Date.now();
  const quarentaOitoHoras = 48 * 60 * 60 * 1000;
  return agora - dataExame.getTime() >= quarentaOitoHoras;
}

export function deveNotificarEntrega(prazoEntrega: Date): boolean {
  const agora = Date.now();
  const vinteQuatroHoras = 24 * 60 * 60 * 1000;
  const diferenca = prazoEntrega.getTime() - agora;
  return diferenca > 0 && diferenca <= vinteQuatroHoras;
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
						Cria <code>exames.test.ts</code> e preenche cada{" "}
						<code>/* ??? */</code>.
					</p>
					<Box className='p-0 overflow-hidden border-4 border-primary shadow-brutalist'>
						<CodeBlock
							language='typescript'
							code={`// exames.test.ts — O teu trabalho começa aqui
import { setSystemTime, describe, test, expect, afterEach } from "bun:test";
import { inscricoesAbertas, resultadoDisponivel, deveNotificarEntrega } from "./exames";

afterEach(() => /* ??? */);

// ─── Regra 1: Inscrições ──────────────────────────────────────
describe("inscricoesAbertas", () => {
  test("deve estar aberta no dia 1", () => {
    setSystemTime(new Date("2025-09-01"));
    expect(inscricoesAbertas()).toBe(/* ??? */);
  });

  test("deve estar aberta no dia 15", () => {
    setSystemTime(/* ??? */);
    expect(inscricoesAbertas()).toBe(true);
  });

  test("deve estar fechada no dia 16", () => {
    setSystemTime(new Date("2025-09-16"));
    expect(inscricoesAbertas()).toBe(/* ??? */);
  });
});

// ─── Regra 2: Resultado Disponível ───────────────────────────
describe("resultadoDisponivel", () => {
  test("não disponível 24 horas após o exame", () => {
    setSystemTime(new Date("2025-09-10T12:00:00Z"));
    const dataExame = new Date("2025-09-09T12:00:00Z"); // 24h antes
    expect(resultadoDisponivel(dataExame)).toBe(/* ??? */);
  });

  test("disponível exatamente 48 horas após o exame", () => {
    setSystemTime(new Date("2025-09-11T12:00:00Z")); // "agora"
    const dataExame = new Date(/* ??? */); // exame foi 48h antes
    expect(resultadoDisponivel(dataExame)).toBe(true);
  });
});

// ─── Regra 3: Notificação de Entrega ─────────────────────────
describe("deveNotificarEntrega", () => {
  test("deve notificar quando faltam exatamente 24h", () => {
    setSystemTime(new Date("2025-09-20T10:00:00Z")); // "agora"
    const prazo = new Date(/* ??? */); // prazo é exatamente 24h depois
    expect(deveNotificarEntrega(prazo)).toBe(/* ??? */);
  });

  test("NÃO deve notificar quando o prazo já passou", () => {
    setSystemTime(new Date("2025-09-21T10:00:00Z")); // depois do prazo
    const prazo = new Date("2025-09-20T10:00:00Z"); // prazo ontem
    expect(deveNotificarEntrega(prazo)).toBe(/* ??? */);
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
							code={`// exames.test.ts — SOLUÇÃO COMPLETA
import { setSystemTime, describe, test, expect, afterEach } from "bun:test";
import { inscricoesAbertas, resultadoDisponivel, deveNotificarEntrega } from "./exames";

afterEach(() => setSystemTime());

describe("inscricoesAbertas", () => {
  test("deve estar aberta no dia 1", () => {
    setSystemTime(new Date("2025-09-01"));
    expect(inscricoesAbertas()).toBe(true);
  });

  test("deve estar aberta no dia 15", () => {
    setSystemTime(new Date("2025-09-15"));
    expect(inscricoesAbertas()).toBe(true);
  });

  test("deve estar fechada no dia 16", () => {
    setSystemTime(new Date("2025-09-16"));
    expect(inscricoesAbertas()).toBe(false);
  });
});

describe("resultadoDisponivel", () => {
  test("não disponível 24 horas após o exame", () => {
    setSystemTime(new Date("2025-09-10T12:00:00Z"));
    const dataExame = new Date("2025-09-09T12:00:00Z");
    expect(resultadoDisponivel(dataExame)).toBe(false);
  });

  test("disponível exatamente 48 horas após o exame", () => {
    setSystemTime(new Date("2025-09-11T12:00:00Z"));
    const dataExame = new Date("2025-09-09T12:00:00Z"); // 48h antes
    expect(resultadoDisponivel(dataExame)).toBe(true);
  });
});

describe("deveNotificarEntrega", () => {
  test("deve notificar quando faltam exatamente 24h", () => {
    setSystemTime(new Date("2025-09-20T10:00:00Z"));
    const prazo = new Date("2025-09-21T10:00:00Z"); // 24h depois
    expect(deveNotificarEntrega(prazo)).toBe(true);
  });

  test("NÃO deve notificar quando o prazo já passou", () => {
    setSystemTime(new Date("2025-09-21T10:00:00Z"));
    const prazo = new Date("2025-09-20T10:00:00Z");
    expect(deveNotificarEntrega(prazo)).toBe(false);
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
							<strong>LIMITES EXATOS</strong> — Testamos as fronteiras (dia 15
							vs 16, 48h exatas). É aqui que os bugs temporais reais vivem.
						</p>
					</li>
					<li className='flex gap-4 items-start'>
						<span className='text-primary font-black text-2xl'>•</span>
						<p>
							<strong>ARITMÉTICA DE TIMESTAMPS</strong> — Com{" "}
							<code>setSystemTime()</code> controlamos o "agora" e podemos
							validar cálculos baseados em milissegundos.
						</p>
					</li>
					<li className='flex gap-4 items-start'>
						<span className='text-primary font-black text-2xl'>•</span>
						<p>
							<strong>AFTEREACH COMO PROTEÇÃO</strong> — Sem restaurar a data, a
							contaminação entre testes causaria falhas misteriosas na suite.
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
						"setSystemTime(data) congela o que Date.now() e new Date() retornam.",
						"setSystemTime() sem argumentos restaura o relógio real — obrigatório no afterEach.",
						"Testar nos limites exatos — primeiro dia, último dia, segundo antes, segundo depois — é crucial.",
						"jest.useFakeTimers() suspende setTimeout e setInterval.",
						"jest.advanceTimersByTime(ms) avança o relógio virtual manualmente.",
						"Testes de tempo determinísticos correm igual em qualquer data ou hora real.",
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
					Conferência 3.5 — Fim
				</p>
				<p className='font-black uppercase text-2xl italic text-zinc-400'>
					Próxima: 3.6 — Mocking Avançado de Implementações
				</p>
			</div>
		</>
	),
	ejercicios: [],
};
