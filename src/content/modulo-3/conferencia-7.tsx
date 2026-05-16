import type { ConferenciaData } from "../../types";
import { CodeBlock } from "../../components/CodeBlock";
import { Box } from "../../components/CourseComponents";

export const data: ConferenciaData = {
	titulo: "3.7 Workshop Prático: Testando um Sistema com Mocks Reais",
	objetivos: [
		"Aplicar todas as ferramentas do Módulo 3 num sistema completo e realista.",
		"Decidir autonomamente qual ferramenta de mocking usar para cada dependência.",
		"Organizar uma suite de testes com múltiplos níveis de describe e beforeEach aninhados.",
		"Verificar fluxos completos de ponta a ponta com mocks seletivos em cada camada.",
		"Identificar e corrigir problemas de estado partilhado numa suite com muitos testes.",
		"Produzir uma suite que sirva como documentação viva do comportamento do sistema.",
	],
	contenido: (
		<>
			{/* METADATA DA CONFERÊNCIA */}
			<div className='flex flex-wrap gap-4 mb-10'>
				<span className='px-4 py-2 bg-zinc-900 text-white dark:bg-zinc-100 dark:text-black font-black uppercase text-sm brutalist-shadow'>
					⏱️ Duração: 2 Horas
				</span>
				<span className='px-4 py-2 bg-primary text-white font-black uppercase text-sm brutalist-shadow'>
					🔑 Pré-requisitos: Conferências 3.1 a 3.6 concluídas
				</span>
			</div>

			{/* INTRODUÇÃO */}
			<Box className='bg-primary/10 border-black dark:border-white mb-16 p-10 shadow-[12px_12px_0px_0px_rgba(255,50,150,1)] dark:shadow-[12px_12px_0px_0px_rgba(255,50,150,0.5)] relative overflow-hidden'>
				<h3 className='text-3xl font-black uppercase mb-6 text-primary flex items-center gap-3'>
					<span className='w-12 h-12 flex items-center justify-center bg-black text-white dark:bg-white dark:text-black rounded-full text-xl'>
						🏗️
					</span>
					Introdução — Da ferramenta ao sistema
				</h3>
				<div className='space-y-4 text-lg leading-relaxed text-zinc-800 dark:text-zinc-200'>
					<p>
						Nas seis conferências anteriores aprendeste cada ferramenta isoladamente. Agora o desafio muda: tens um sistema com quatro camadas, sete dependências e doze regras de negócio. Não há indicação de qual ferramenta usar onde — essa decisão é tua.
					</p>
					<p>
						Um workshop não é uma conferência. Não há exposição teórica. Há um sistema, há requisitos, e há testes para escrever. A teoria aparece apenas quando precisas de recordar algo específico.
					</p>
					<p className='font-black text-2xl py-6 px-8 border-l-8 border-primary bg-white dark:bg-zinc-900 shadow-brutalist uppercase italic tracking-tighter'>
						"Saber usar mock() é uma competência. Saber quando e porquê usá-lo é sabedoria de engenharia."
					</p>
				</div>
			</Box>

			{/* O SISTEMA */}
			<section className='mb-24 relative'>
				<h2 className='text-4xl font-black uppercase mb-12 flex items-center gap-4'>
					<span className='px-4 py-2 bg-black text-white dark:bg-white dark:text-black'>
						O SISTEMA
					</span>
					<span className='border-b-8 border-primary'>
						Gestão de Épocas de Exame — ISPM
					</span>
				</h2>

				<div className='space-y-8 text-lg'>
					<p>Quando um docente submete uma pauta, o sistema executa um pipeline com quatro etapas sequenciais. Cada etapa depende do sucesso da anterior:</p>
					
					<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
						{[
							{ t: "ETAPA 1: Validação", d: "Verificar se a época está aberta e se o docente tem permissão." },
							{ t: "ETAPA 2: Processamento", d: "Calcular estatísticas da turma (média, aprovados/reprovados)." },
							{ t: "ETAPA 3: Persistência", d: "Guardar na BD e gerar o PDF no sistema de ficheiros." },
							{ t: "ETAPA 4: Notificação", d: "Email aos aprovados e registo em log de auditoria." }
						].map((step, i) => (
							<Box key={i} className='border-zinc-300 h-full'>
								<h4 className='font-black uppercase mb-2 text-primary'>{step.t}</h4>
								<p className='text-sm leading-relaxed'>{step.d}</p>
							</Box>
						))}
					</div>
				</div>
			</section>

			{/* PARTE 1 */}
			<section className='mb-24 relative overflow-hidden'>
				<h2 className='text-4xl font-black uppercase mb-12 flex items-center gap-4'>
					<span className='px-4 py-2 bg-zinc-950 text-white'>
						PARTE 1
					</span>
					<span className='border-b-8 border-zinc-950 dark:border-zinc-50'>
						O Código do Sistema (já dado)
					</span>
				</h2>

				<div className='space-y-6 text-lg'>
					<p>Este é o código que vais testar. Cole em <code>epocas.ts</code> — não o modifiques durante o workshop.</p>
					<Box className='border-zinc-900 dark:border-zinc-100 p-0 overflow-hidden shadow-brutalist'>
						<CodeBlock 
							language="typescript"
							code={`// epocas.ts — Sistema de Gestão de Épocas de Exame
export interface Aluno { id: number; nome: string; email: string; nota: number; }
export interface Pauta { disciplina: string; docenteId: number; alunos: Aluno[]; }
export interface EstatisticasTurma { media: number; aprovados: number; reprovados: number; total: number; }

export interface IEpocaService { estaAberta(): boolean; }
export interface IPermissaoService { docentePodeSubmeter(id: number, disc: string): Promise<boolean>; }
export interface IGerarPdfService { gerar(p: Pauta, s: EstatisticasTurma): Promise<Buffer>; }
export interface IPautaRepository { guardar(p: Pauta, s: EstatisticasTurma, pdf: Buffer): Promise<{ pautaId: string }>; }
export interface IEmailService { notificarAprovados(a: Aluno[], d: string): Promise<void>; }
export interface IAuditoriaService { registar(dId: number, pId: string, s: EstatisticasTurma): Promise<void>; }

export function calcularEstatisticas(alunos: Aluno[]): EstatisticasTurma {
  const total = alunos.length;
  const aprovados = alunos.filter(a => a.nota >= 10).length;
  const reprovados = total - aprovados;
  const media = Math.round(alunos.reduce((soma, a) => soma + a.nota, 0) / total);
  return { media, aprovados, reprovados, total };
}

export async function submeterPauta(
  pauta: Pauta, epoca: IEpocaService, permissao: IPermissaoService,
  gerarPdf: IGerarPdfService, repository: IPautaRepository,
  email: IEmailService, auditoria: IAuditoriaService
): Promise<{ sucesso: boolean; pautaId?: string; estatisticas?: EstatisticasTurma; motivo?: string }> {
  if (!epoca.estaAberta()) return { sucesso: false, motivo: "Época de exames encerrada." };
  const temPermissao = await permissao.docentePodeSubmeter(pauta.docenteId, pauta.disciplina);
  if (!temPermissao) return { sucesso: false, motivo: "Docente sem permissão para esta disciplina." };

  const stats = calcularEstatisticas(pauta.alunos);
  const pdfBuffer = await gerarPdf.gerar(pauta, stats);
  const { pautaId } = await repository.guardar(pauta, stats, pdfBuffer);

  const aprovados = pauta.alunos.filter(a => a.nota >= 10);
  await email.notificarAprovados(aprovados, pauta.disciplina);
  await auditoria.registar(pauta.docenteId, pautaId, stats);

  return { sucesso: true, pautaId, estatisticas: stats };
}`}
						/>
					</Box>
				</div>
			</section>

			{/* PARTE 2 */}
			<section className='mb-24'>
				<h2 className='text-4xl font-black uppercase mb-12 flex items-center gap-4'>
					<span className='px-4 py-2 bg-emerald-500 text-white'>
						PARTE 2
					</span>
					<span className='border-b-8 border-emerald-500'>
						Análise Antes de Testar
					</span>
				</h2>

				<div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
					<Box className='border-emerald-500'>
						<h4 className='font-black uppercase mb-4 text-emerald-600'>1. Natureza</h4>
						<p className='text-sm leading-relaxed'>Identifica se é síncrona ou assíncrona. <code>estaAberta</code> precisa de <code>mock()</code> síncrono. <code>gerarPdf</code> precisa de retornar um <code>Buffer</code> falso.</p>
					</Box>
					<Box className='border-emerald-500'>
						<h4 className='font-black uppercase mb-4 text-emerald-600'>2. Falhas</h4>
						<p className='text-sm leading-relaxed'>O que acontece se o docente não tiver permissão? Ou se a BD estiver offline? Cada etapa do pipeline deve ter um teste de erro.</p>
					</Box>
					<Box className='border-emerald-500 shadow-brutalist'>
						<h4 className='font-black uppercase mb-4 text-emerald-600'>3. Críticos</h4>
						<p className='text-sm leading-relaxed'>Regra de nota &gt;= 10. Email apenas para aprovados. Auditoria obrigatória em caso de sucesso.</p>
					</Box>
				</div>
			</section>

			{/* PARTE 3 */}
			<section className='mb-24'>
				<h2 className='text-4xl font-black uppercase mb-12 flex items-center gap-4'>
					<span className='px-4 py-2 bg-secondary text-white font-black'>
						PARTE 3
					</span>
					<span className='border-b-8 border-secondary font-black uppercase'>
						Dados de Teste Partilhados
					</span>
				</h2>

				<Box className='border-secondary bg-zinc-50 dark:bg-zinc-900'>
					<CodeBlock 
						language="typescript"
						code={`const turmaCompleta: Aluno[] = [\n  { id: 1, nome: "Ana Silva", email: "ana@ispm.ao", nota: 18 },\n  { id: 2, nome: "Bruno Costa", email: "bruno@ispm.ao", nota: 12 },\n  { id: 3, nome: "Carlos Melo", email: "carlos@ispm.ao", nota: 8 },\n  { id: 4, nome: "Diana Lopes", email: "diana@ispm.ao", nota: 9 },\n  { id: 5, nome: "Eduardo Neto", email: "edu@ispm.ao", nota: 15 },\n];\n\nconst pautaRedes: Pauta = {\n  disciplina: "Redes de Computadores",\n  docenteId: 42,\n  alunos: turmaCompleta,\n};`}
					/>
				</Box>
			</section>

			{/* PARTE 4 */}
			<section className='mb-24'>
				<h2 className='text-4xl font-black uppercase mb-12 flex items-center gap-4'>
					<span className='px-4 py-2 bg-zinc-400 text-white font-black'>
						PARTE 4
					</span>
					<span className='border-b-8 border-zinc-400 font-black uppercase'>
						Testes Unitários de calcularEstatisticas
					</span>
				</h2>

				<div className='space-y-6'>
					<p className='text-lg'>Função pura: sem dependências, ponto de partida ideal.</p>
					<Box className='border-zinc-400'>
						<CodeBlock 
							language="typescript"
							code={`describe("calcularEstatisticas", () => {\n  test("conta aprovados (nota >= 10) e reprovados", () => {\n    const stats = calcularEstatisticas(turmaCompleta);\n    expect(stats.aprovados).toBe(3);\n    expect(stats.reprovados).toBe(2);\n  });\n  test("calcula a média arredondada", () => {\n    const stats = calcularEstatisticas(turmaCompleta);\n    expect(stats.media).toBe(12);\n  });\n});`}
						/>
					</Box>
				</div>
			</section>

			{/* EXERCÍCIO PRINCIPAL */}
			<section className='mb-32'>
				<div className='flex items-center gap-6 mb-12'>
					<div className='px-6 py-3 bg-primary text-white font-black uppercase text-lg shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)]'>
						🏫 EXERCÍCIO PRINCIPAL
					</div>
					<div className='h-1 flex-1 bg-primary' />
				</div>

				<div className='space-y-12'>
					<p className='text-xl leading-relaxed'>Preenche os espaços usando todo o conhecimento do Módulo 3.</p>
					
					<Box className='p-0 overflow-hidden border-4 border-primary shadow-brutalist'>
						<CodeBlock
							language='typescript'
							code={`// epocas.test.ts — O teu trabalho começa aqui
import { mock, describe, test, expect, beforeEach } from "bun:test";
import { submeterPauta } from "./epocas";

// ─── Criar os mocks ───────────────────────────────────────────
const estaAbertaMock  = mock(/* ??? */);
const podeSumeterMock = mock(/* ??? */);
const gerarPdfMock    = mock(/* ??? */);
const guardarMock     = mock(/* ??? */);
const notificarMock   = mock(/* ??? */);
const auditoriaMock   = mock(/* ??? */);

// ─── Reset mínimo ─────────────────────────────────────────────
beforeEach(() => {
  /* ??? — limpa o histórico de todos os mocks */
});

describe("submeterPauta – época encerrada", () => {
  test("deve retornar sucesso = false", async () => {
    estaAbertaMock./* ??? */(false);
    const r = await submeterPauta(pautaRedes, {estaAberta: estaAbertaMock}, ...);
    expect(r.sucesso).toBe(false);
  });
});

describe("submeterPauta – sucesso completo", () => {
  test("deve notificar apenas aprovados", async () => {
    estaAbertaMock.mockReturnValue(true);
    podeSumeterMock.mockResolvedValue(true);
    gerarPdfMock.mockResolvedValue(Buffer.from("pdf"));
    guardarMock.mockResolvedValue({ pautaId: "P-123" });

    await submeterPauta(...);
    
    const alunos = notificarMock.mock.calls[0][0];
    expect(alunos).toHaveLength(/* ??? */); // 3 alunos
  });
});`}
						/>
					</Box>
				</div>
			</section>

			{/* SOLUÇÃO COMPLETA */}
			<section className='mb-32'>
				<h3 className='text-3xl font-black uppercase mb-8 flex items-center gap-4'>
					<span className='w-10 h-10 flex items-center justify-center bg-emerald-500 text-white rounded-full'>✓</span>
					Solução Completa
				</h3>
				<Box className='border-emerald-500 bg-emerald-50/5 p-0 overflow-hidden'>
					<CodeBlock 
						language="typescript"
						code={`// epocas.test.ts — SOLUÇÃO COMPLETA
import { mock, describe, test, expect, beforeEach } from "bun:test";
import { submeterPauta } from "./epocas";

const estaAbertaMock  = mock(() => true);
const podeSumeterMock = mock(async () => true);
const gerarPdfMock    = mock(async () => Buffer.from("pdf-falso"));
const guardarMock     = mock(async () => ({ pautaId: "PAUTA-001" }));
const notificarMock   = mock(async () => {});
const auditoriaMock   = mock(async () => {});

beforeEach(() => {
  estaAbertaMock.mockClear(); podeSumeterMock.mockClear();
  gerarPdfMock.mockClear(); guardarMock.mockClear();
  notificarMock.mockClear(); auditoriaMock.mockClear();
});

describe("submeterPauta", () => {
  test("sucesso: salva, notifica e audita", async () => {
    const r = await submeterPauta(pautaRedes, 
      {estaAberta: estaAbertaMock}, {docentePodeSubmeter: podeSumeterMock},
      {gerar: gerarPdfMock}, {guardar: guardarMock},
      {notificarAprovados: notificarMock}, {registar: auditoriaMock}
    );

    expect(r.sucesso).toBe(true);
    expect(notificarMock.mock.calls[0][0]).toHaveLength(3);
    expect(auditoriaMock).toHaveBeenCalledWith(42, "PAUTA-001", expect.any(Object));
  });
});`}
					/>
				</Box>
			</section>

			{/* DECISÕES DE DESIGN */}
			<Box className='border-zinc-900 border-4 mb-24 p-12 bg-primary/5'>
				<h4 className='text-2xl font-black uppercase mb-6 flex items-center gap-3'>
					<span className='text-3xl'>💡</span> Decisões de Design da Suite
				</h4>
				<ul className='space-y-4 font-medium'>
					<li><strong>expect.objectContaining</strong> — Confirmar que as estatísticas têm os campos certos sem ser frágil à ordem.</li>
					<li><strong>mock.calls[0][2]</strong> — Acesso posicional para verificar argumentos onde não existe matcher direto (ex: o buffer).</li>
					<li><strong>not.toContain</strong> — Mais legível para humanos ao verificar que reprovados não receberam email.</li>
				</ul>
			</Box>

			{/* RESUMO DO MÓDULO 3 */}
			<section className='my-32 p-16 bg-zinc-950 text-white border-8 border-primary shadow-[20px_20px_0px_0px_rgba(255,50,150,0.5)] relative overflow-hidden'>
				<div className='absolute -right-20 -top-20 w-80 h-80 bg-primary/20 rounded-full blur-[100px]' />
				<h3 className='text-6xl font-black uppercase mb-12 relative z-10 text-primary italic'>
					RESUMO DO MÓDULO 3
				</h3>
				<div className='space-y-6 relative z-10'>
					{[
						"Conferência 3.1 — O problema das dependências reais e a solução conceptual.",
						"Conferência 3.2 — mock() automatiza o rastreio e retornos controlados.",
						"Conferência 3.3 — spyOn() observa sem destruir; mockRestore() restaura.",
						"Conferência 3.4 — mock.module() intercepta módulos antes do import.",
						"Conferência 3.5 — setSystemTime() e useFakeTimers() dominam o tempo.",
						"Conferência 3.6 — Gestão avançada: mockClear vs mockReset vs mockRestore.",
						"Conferência 3.7 — Workshop Integrado: Suite como documentação viva.",
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
					Módulo 3 — Concluído
				</p>
				<p className='font-black uppercase text-2xl italic text-zinc-400'>
					Próximo: Módulo 4 — Testes assíncronos
				</p>
			</div>
		</>
	),
	ejercicios: [],
};
