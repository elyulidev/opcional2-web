import type { ConferenciaData } from "../../types";
import { CodeBlock } from "../../components/CodeBlock";
import { Box } from "../../components/CourseComponents";

export const data: ConferenciaData = {
	titulo: "2.4 Testes com bun:test — primeira bateria de testes reais",
	objetivos: [
		"Usar com confiança todos os recursos principais da API bun:test: test, describe, expect, beforeEach, afterEach, beforeAll, afterAll.",
		"Aplicar os matchers mais usados no dia a dia: toBe, toEqual, toContain, toHaveLength, toThrow, toBeCloseTo, toMatchObject, toHaveProperty.",
		"Escrever uma bateria completa de testes para um módulo real com múltiplas funções interdependentes.",
		"Usar bun test com flags úteis para filtrar, observar e reportar testes.",
		"Identificar e corrigir os erros mais comuns que aparecem ao escrever testes pela primeira vez.",
		"Organizar uma suite de testes de forma profissional, legível e sustentável.",
	],
	contenido: (
		<>
			{/* METADATA DA CONFERÊNCIA */}
			<div className='flex flex-wrap gap-4 mb-10'>
				<span className='px-4 py-2 bg-zinc-900 text-white dark:bg-zinc-100 dark:text-black font-black uppercase text-sm brutalist-shadow'>
					⏱️ Duração: 2 Horas
				</span>
				<span className='px-4 py-2 bg-primary text-white font-black uppercase text-sm brutalist-shadow'>
					🔑 Pré-requisitos: Conferências 2.1, 2.2 e 2.3 concluídas
				</span>
			</div>

			{/* INTRODUÇÃO */}
			<Box className='bg-primary/10 border-black dark:border-white mb-16 p-10 shadow-[12px_12px_0px_0px_rgba(255,50,150,1)] dark:shadow-[12px_12px_0px_0px_rgba(255,50,150,0.5)] relative overflow-hidden'>
				<h3 className='text-3xl font-black uppercase mb-6 text-primary flex items-center gap-3'>
					<span className='w-12 h-12 flex items-center justify-center bg-black text-white dark:bg-white dark:text-black rounded-full text-xl'>
						🚀
					</span>
					Introdução — Da teoria à prática real
				</h3>
				<div className='space-y-4 text-lg leading-relaxed text-zinc-800 dark:text-zinc-200'>
					<p>Nas conferências anteriores construímos uma base sólida:</p>
					<ul className='list-disc list-inside space-y-2 font-bold'>
						<li>Sabemos o que é um teste e como estruturá-lo com AAA</li>
						<li>Sabemos usar hooks para eliminar repetição</li>
						<li>Sabemos distinguir unitários de integração de E2E</li>
					</ul>
					<p>
						Agora chegou a hora de juntar tudo isso e escrever uma bateria real
						de testes para um sistema com alguma complexidade. Não mais exemplos
						simples de calculadora. Vamos testar um módulo de gestão de
						estudantes com regras de negócio reais.
					</p>
					<p className='font-black text-2xl py-6 px-8 border-l-8 border-primary bg-white dark:bg-zinc-900 shadow-brutalist uppercase italic tracking-tighter'>
						"Vamos explorar matchers avançados e consolidar a organização de
						suites profissionais."
					</p>
				</div>
			</Box>

			{/* PARTE 1 */}
			<section className='mb-24 relative'>
				<div className='absolute -left-16 top-0 hidden xl:block'>
					<span className='text-8xl font-black text-black/5 dark:text-white/5 select-none'>
						01
					</span>
				</div>
				<h2 className='text-4xl font-black uppercase mb-8 flex items-center gap-4 group'>
					<span className='px-4 py-2 bg-black text-white dark:bg-white dark:text-black group-hover:bg-primary transition-colors'>
						PARTE 1
					</span>
					<span className='border-b-8 border-primary'>
						O sistema ISPM: Gestão de Estudantes
					</span>
				</h2>

				<p className='text-lg mb-8 leading-relaxed font-medium'>
					O módulo que vamos testar tem regras complexas de aprovação, cálculo
					de médias e geração de estatísticas de turma.
				</p>

				<CodeBlock
					language='typescript'
					code={`// src/modulo-01/gestao-estudantes.ts\n\nexport interface Disciplina {\n  nome: string;\n  notaFrequencia: number;  // 0 a 20\n  notaExame: number;       // 0 a 20\n  presenca: number;        // 0 a 100 (percentagem)\n}\n\n// A nota final é calculada como: frequência × 40% + exame × 60%\n// O estudante está aprovado se a nota final for ≥ 9.5 e a presença for ≥ 75%\n\nexport function calcularNotaFinal(notaFrequencia: number, notaExame: number): number {\n  if (notaFrequencia < 0 || notaFrequencia > 20) throw new Error("Frequência inválida");\n  if (notaExame < 0 || notaExame > 20) throw new Error("Exame inválido");\n\n  const resultado = notaFrequencia * 0.4 + notaExame * 0.6;\n  return Math.round(resultado * 10) / 10;\n}\n\nexport function determinarSituacaoDisciplina(notaFinal: number, presenca: number): string {\n  if (presenca < 75) return "Reprovado por Falta";\n  return notaFinal >= 9.5 ? "Aprovado" : "Reprovado";\n}`}
				/>
			</section>

			{/* PARTE 2 */}
			<section className='mb-24 relative overflow-hidden'>
				<h2 className='text-4xl font-black uppercase mb-12 flex items-center gap-4'>
					<span className='px-4 py-2 bg-black text-white dark:bg-white dark:text-black'>
						PARTE 2
					</span>
					<span className='border-b-8 border-secondary'>
						Novos matchers (A Ferramenta)
					</span>
				</h2>

				<div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
					<Box className='border-secondary bg-secondary/5'>
						<h4 className='text-xl font-black uppercase mb-4 text-secondary'>
							toContain()
						</h4>
						<p className='text-sm mb-4'>
							Verifica se um array ou string contém um elemento/substring.
						</p>
						<CodeBlock
							language='typescript'
							code={`expect(["Ana", "Carlos"]).toContain("Ana");\nexpect("Reprovado por Falta").toContain("Falta");`}
						/>
					</Box>
					<Box className='border-primary bg-primary/5'>
						<h4 className='text-xl font-black uppercase mb-4 text-primary'>
							toThrow()
						</h4>
						<p className='text-sm mb-4'>
							Verifica se uma função lança um erro. **Sempre use arrow
							function!**
						</p>
						<CodeBlock
							language='typescript'
							code={`expect(() => calcular(-1)).toThrow("inválida");`}
						/>
					</Box>
					<Box className='border-zinc-900 dark:border-zinc-100 bg-zinc-100 dark:bg-zinc-800'>
						<h4 className='text-xl font-black uppercase mb-4'>
							toMatchObject()
						</h4>
						<p className='text-sm mb-4'>
							Verifica se um objeto contém certas propriedades (ignora o resto).
						</p>
						<CodeBlock
							language='typescript'
							code={`expect(boletim).toMatchObject({ situacao: "Aprovado" });`}
						/>
					</Box>
					<Box className='border-zinc-900 dark:border-zinc-100 bg-zinc-100 dark:bg-zinc-800'>
						<h4 className='text-xl font-black uppercase mb-4'>
							Comparações Numéricas
						</h4>
						<p className='text-sm mb-4'>Verifica limites de valores.</p>
						<CodeBlock
							language='typescript'
							code={`expect(media).toBeGreaterThanOrEqual(9.5);\nexpect(presenca).toBeLessThan(75);`}
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
					<span className='border-b-8 border-primary'>
						A Bateria de Testes Real
					</span>
				</h2>

				<p className='text-lg mb-8 leading-relaxed font-medium italic border-l-8 border-primary pl-6 py-4 bg-zinc-50 dark:bg-zinc-900'>
					"Uma suite bem organizada usa dados de apoio (estudantes mockados) e
					descreve os comportamentos em cenários claros."
				</p>

				<CodeBlock
					language='typescript'
					code={`// src/modulo-01/gestao-estudantes.test.ts\nimport { expect, test, describe, beforeEach } from "bun:test";\nimport { calcularNotaFinal, determinarSituacaoDisciplina, gerarBoletim } from "./gestao-estudantes";\n\n// --- DADOS DE APOIO ---\nconst estudanteAprovado = { matricula: "2021001", nome: "Ana", disciplinas: [...] };\n\ndescribe("calcularNotaFinal", () => {\n  test("aplica a fórmula 40/60 corretamente", () => {\n    expect(calcularNotaFinal(10, 10)).toBe(10);\n  });\n\n  test("lança erro para entradas negativas", () => {\n    expect(() => calcularNotaFinal(-1, 10)).toThrow("Nota de frequência inválida");\n  });\n});\n\ndescribe("determinarSituacaoDisciplina", () => {\n  test("reprova por falta mesmo com nota 20", () => {\n    expect(determinarSituacaoDisciplina(20, 50)).toBe("Reprovado por Falta");\n  });\n\n  test("aprova com nota 9.5 e presença 75%", () => {\n    expect(determinarSituacaoDisciplina(9.5, 75)).toBe("Aprovado");\n  });\n});`}
				/>
			</section>

			{/* PARTE 4 */}
			<section className='mb-24'>
				<h2 className='text-4xl font-black uppercase mb-12 flex items-center gap-4'>
					<span className='px-4 py-2 bg-black text-white dark:bg-white dark:text-black'>
						PARTE 4
					</span>
					<span className='border-b-8 border-zinc-900 dark:border-zinc-100'>
						Executando e lendo resultados
					</span>
				</h2>

				<Box className='bg-zinc-950 text-white p-8 border-none overflow-x-auto shadow-brutalist'>
					<div className='font-mono text-sm leading-relaxed whitespace-pre'>
						<p className='text-zinc-500 mb-4'>bun test v1.2.4</p>
						<p className='text-zinc-300 font-bold mb-2 uppercase tracking-widest'>
							src/modulo-01/gestao-estudantes.test.ts:
						</p>
						<p className='text-white mt-4'>calcularNotaFinal</p>
						<p className='text-zinc-400 pl-4'>cálculos corretos</p>
						<p className='text-green-500 pl-8'>
							✓ aplica a fórmula 40/60 corretamente [0.07ms]
						</p>
						<p className='text-green-500 pl-8'>
							✓ pesa mais o exame do que a frequência [0.04ms]
						</p>
						<p className='text-zinc-400 pl-4 mt-2'>
							validação de entradas inválidas
						</p>
						<p className='text-green-500 pl-8'>
							✓ lança erro para nota negativa [0.05ms]
						</p>
						<p className='text-white mt-6 font-black uppercase'>
							Total: 38 pass, 0 fail
						</p>
						<p className='text-zinc-500 italic mt-2'>Finished in 4.87ms</p>
					</div>
				</Box>
				<p className='mt-8 text-lg font-medium italic text-center'>
					"38 testes em menos de 5ms. Eficiência total."
				</p>
			</section>

			{/* PARTE 5 */}
			<section className='mb-24'>
				<h2 className='text-4xl font-black uppercase mb-12 flex items-center gap-4'>
					<span className='px-4 py-2 bg-black text-white dark:bg-white dark:text-black'>
						PARTE 5
					</span>
					<span className='border-b-8 border-secondary'>
						Flags para produtividade
					</span>
				</h2>

				<div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
					<Box className='border-secondary'>
						<h4 className='text-xl font-black uppercase mb-4 text-secondary'>
							Filtrar por nome
						</h4>
						<CodeBlock
							language='bash'
							code={`bun test --test-name-pattern "calcular"`}
						/>
						<p className='text-sm mt-4 italic'>
							Executa apenas os testes cujo nome contém o padrão.
						</p>
					</Box>
					<Box className='border-primary'>
						<h4 className='text-xl font-black uppercase mb-4 text-primary'>
							Modo Watch
						</h4>
						<CodeBlock language='bash' code={`bun test --watch`} />
						<p className='text-sm mt-4 italic'>
							Re-executa automaticamente ao salvar qualquer ficheiro.
						</p>
					</Box>
				</div>
			</section>

			{/* PARTE 6 */}
			<section className='mb-24'>
				<h2 className='text-4xl font-black uppercase mb-12 flex items-center gap-4'>
					<span className='px-4 py-2 bg-red-500 text-white'>PARTE 6</span>
					<span className='border-b-8 border-red-500'>
						Erros Comuns (⚠️ Evite isto!)
					</span>
				</h2>

				<div className='space-y-6'>
					<Box className='border-red-500 bg-red-50/50 dark:bg-red-950/10'>
						<h4 className='text-xl font-black uppercase mb-2 text-red-600 font-serif italic tracking-tight underline'>
							1. toThrow sem Arrow Function
						</h4>
						<div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-4'>
							<div className='p-4 bg-white dark:bg-zinc-900 border-2 border-red-500'>
								<p className='text-xs font-black text-red-500 uppercase mb-2'>
									❌ Errado
								</p>
								<code>expect(funcao()).toThrow()</code>
							</div>
							<div className='p-4 bg-white dark:bg-zinc-900 border-2 border-green-500'>
								<p className='text-xs font-black text-green-500 uppercase mb-2'>
									✅ Correto
								</p>
								<code>expect(() =&gt; funcao()).toThrow()</code>
							</div>
						</div>
					</Box>
					<Box className='border-zinc-900 dark:border-zinc-100 bg-zinc-100 dark:bg-zinc-800'>
						<h4 className='text-xl font-black uppercase mb-2 font-serif italic tracking-tight underline'>
							2. toBe vs toEqual em objetos
						</h4>
						<p className='text-lg'>
							<code>toBe</code> compara o endereço de memória.{" "}
							<code>toEqual</code> compara o conteúdo das propriedades.
						</p>
					</Box>
					<Box className='border-zinc-900 dark:border-zinc-100 bg-zinc-100 dark:bg-zinc-800'>
						<h4 className='text-xl font-black uppercase mb-2 font-serif italic tracking-tight underline'>
							3. Testar implementação vs comportamento
						</h4>
						<p className='text-lg italic'>
							"Teste o RESULTADO final, não COMO o loop foi escrito
							internamente."
						</p>
					</Box>
				</div>
			</section>

			{/* RESUMO */}
			<section className='my-32 p-16 bg-zinc-950 text-white border-8 border-primary shadow-[20px_20px_0px_0px_rgba(255,50,150,0.5)] relative overflow-hidden'>
				<div className='absolute -right-20 -bottom-20 w-80 h-80 bg-primary/20 rounded-full blur-[100px]' />
				<h3 className='text-6xl font-black uppercase mb-12 relative z-10 text-primary italic'>
					RESUMO
				</h3>
				<div className='space-y-6 relative z-10'>
					{[
						"Sistema Real — Aprendemos a testar regras complexas (fórmula 40/60, faltas, boletim).",
						"Novos Matchers — toThrow, toMatchObject, toContain e toHaveLength aumentam o poder de verificação.",
						"Organização Profissional — Suite dividida em cenários claros usando dados de suporte mockados.",
						"Flags Úteis — --watch e --test-name-pattern tornam o desenvolvimento muito mais ágil.",
						"Anti-patterns — Identificamos os erros de iniciantes que quebram a suite ou produzem falsos positivos.",
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
					<span className='text-6xl animate-bounce'>📑</span>
				</h3>
				<div className='space-y-8 text-xl font-medium leading-relaxed text-zinc-800 dark:text-zinc-200'>
					<p>
						Crie o arquivo <code>src/modulo-02/sistema-matriculas.ts</code> com
						as regras:
					</p>
					<ul className='space-y-4 list-disc list-inside bg-white dark:bg-zinc-900 p-8 border-4 border-black dark:border-white'>
						<li>Matricular estudante (máximo 5 disciplinas por aluno)</li>
						<li>Verificar vagas (máximo 30 por disciplina)</li>
						<li>Cálculo de taxa de ocupação da turma</li>
					</ul>
					<p className='font-black text-2xl border-l-8 border-primary pl-6 py-4 uppercase italic'>
						Implemente a classe e crie o respetivo ficheiro .test.ts usando
						TODOS os matchers aprendidos hoje.
					</p>
					<div className='p-6 bg-black text-white dark:bg-white dark:text-black font-black uppercase text-center mt-12'>
						Use toThrow() para os limites e toMatchObject() para os dados do
						aluno!
					</div>
				</div>
			</Box>

			{/* FOOTER */}
			<div className='flex items-center justify-between border-t-8 border-black dark:border-white pt-12 pb-32 mb-20'>
				<p className='font-black uppercase text-2xl italic text-primary'>
					Conferência 2.4 — Fim
				</p>
				<p className='font-black uppercase text-2xl italic text-zinc-400'>
					Próxima: 2.5 — Matchers: Precisão Total
				</p>
			</div>
		</>
	),
	ejercicios: [],
};
