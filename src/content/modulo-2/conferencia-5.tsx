import type { ConferenciaData } from "../../types";
import { CodeBlock } from "../../components/CodeBlock";
import { Callout, Box } from "../../components/CourseComponents";

export const data: ConferenciaData = {
	titulo: "2.5 Matchers: como verificar resultados de forma precisa",
	objetivos: [
		"Usar com precisão todos os matchers essenciais do bun:test e saber exatamente quando aplicar cada um.",
		"Distinguir toBe de toEqual de toStrictEqual e escolher o correto para cada situação.",
		"Usar matchers para arrays: toContain, toContainEqual, toHaveLength, toIncludeSameMembers.",
		"Usar matchers para strings: toContain, toMatch com expressões regulares.",
		"Usar matchers para números: toBeCloseTo, toBeGreaterThan, toBeLessThan e variantes.",
		"Usar expect.any(), expect.arrayContaining() e expect.objectContaining() para verificações flexíveis.",
		"Criar matchers personalizados para regras de negócio específicas.",
	],
	contenido: (
		<>
			{/* METADATA DA CONFERÊNCIA */}
			<div className='flex flex-wrap gap-4 mb-10'>
				<span className='px-4 py-2 bg-zinc-900 text-white dark:bg-zinc-100 dark:text-black font-black uppercase text-sm brutalist-shadow'>
					⏱️ Duração: 2 Horas
				</span>
				<span className='px-4 py-2 bg-primary text-white font-black uppercase text-sm brutalist-shadow'>
					🔑 Pré-requisitos: Conferências 2.1 a 2.4 concluídas
				</span>
			</div>

			{/* INTRODUÇÃO */}
			<Box className='bg-primary/10 border-black dark:border-white mb-16 p-10 shadow-[12px_12px_0px_0px_rgba(255,50,150,1)] dark:shadow-[12px_12px_0px_0px_rgba(255,50,150,0.5)] relative overflow-hidden'>
				<h3 className='text-3xl font-black uppercase mb-6 text-primary flex items-center gap-3'>
					<span className='w-12 h-12 flex items-center justify-center bg-black text-white dark:bg-white dark:text-black rounded-full text-xl'>
						🪚
					</span>
					Introdução — A ferramenta certa para o trabalho certo
				</h3>
				<div className='space-y-4 text-lg leading-relaxed text-zinc-800 dark:text-zinc-200'>
					<p>
						Imagine um carpinteiro com uma única ferramenta: um martelo. Ele
						pode fazer alguma coisa com isso, mas vai usar o martelo para
						parafusar, para cortar, para medir — resultados medíocres em tudo.
					</p>
					<p>
						Um bom carpinteiro tem a ferramenta certa para cada trabalho: serra
						para cortar, chave para parafusar, fita para medir.
					</p>
					<p className='font-black text-2xl py-6 px-8 border-l-8 border-primary bg-white dark:bg-zinc-900 shadow-brutalist uppercase italic tracking-tighter'>
						"Os matchers são as ferramentas do testing. Nesta conferência vamos
						construir o seu arsenal completo."
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
						A família da igualdade
					</span>
				</h2>

				<div className='space-y-12'>
					<Box className='border-zinc-900 dark:border-zinc-100'>
						<h4 className='text-2xl font-black uppercase mb-4 text-primary italic'>
							1. toBe — Identidade
						</h4>
						<p className='text-lg mb-6 leading-relaxed'>
							Compara referências na memória (===). Perfeito para números,
							strings e booleanos. Para objetos, verifica se é o **mesmo**
							objeto físico.
						</p>
						<CodeBlock
							language='typescript'
							code={`expect(2 + 2).toBe(4);\nconst a = { nome: "Ana" };\nconst b = a;\nexpect(a).toBe(b); // Passa\nexpect(a).not.toBe({ nome: "Ana" }); // Passa (são objetos diferentes na memória)`}
						/>
					</Box>

					<Box className='border-zinc-900 dark:border-zinc-100'>
						<h4 className='text-2xl font-black uppercase mb-4 text-secondary italic'>
							2. toEqual — Conteúdo
						</h4>
						<p className='text-lg mb-6 leading-relaxed'>
							Compara o conteúdo de forma recursiva (Deep Equality). Ideal para
							objetos e arrays. Ignora se propriedades têm valor{" "}
							<code>undefined</code>.
						</p>
						<CodeBlock
							language='typescript'
							code={`const a = { nome: "Ana", idade: 22 };\nconst b = { nome: "Ana", idade: 22 };\nexpect(a).toEqual(b); // Passa`}
						/>
					</Box>

					<Box className='border-zinc-900 dark:border-zinc-100'>
						<h4 className='text-2xl font-black uppercase mb-4 italic'>
							3. toStrictEqual — Estrito
						</h4>
						<p className='text-lg mb-6 leading-relaxed'>
							Mais rigoroso que <code>toEqual</code>. Distingue entre uma
							propriedade ausente e uma com valor <code>undefined</code>, e
							verifica instâncias de classes.
						</p>
						<CodeBlock
							language='typescript'
							code={`expect({ n: "Ana", e: undefined }).not.toStrictEqual({ n: "Ana" });`}
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
						Matchers para Arrays
					</span>
				</h2>

				<div className='grid grid-cols-1 xl:grid-cols-2 gap-10'>
					<Box className='border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/10'>
						<h4 className='text-xl font-black uppercase mb-4'>
							Verificar Tamanho
						</h4>
						<CodeBlock
							language='typescript'
							code={`expect([1, 2, 3]).toHaveLength(3);\nexpect([]).toHaveLength(0);`}
						/>
					</Box>
					<Box className='border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/10'>
						<h4 className='text-xl font-black uppercase mb-4'>
							Verificar Elemento
						</h4>
						<CodeBlock
							language='typescript'
							code={`expect(["Ana", "Carlos"]).toContain("Ana");\nexpect(alunos).toContainEqual({ id: 1, nome: "Ana" });`}
						/>
					</Box>
				</div>
				<Callout type='info' title='Dica Pro' className='mt-8'>
					Use <code>toContainEqual</code> quando o array contém objetos. O{" "}
					<code>toContain</code> usa comparação de identidade (===) e falhará
					com objetos literais novos.
				</Callout>
			</section>

			{/* PARTE 3 */}
			<section className='mb-24'>
				<h2 className='text-4xl font-black uppercase mb-12 flex items-center gap-4'>
					<span className='px-4 py-2 bg-black text-white dark:bg-white dark:text-black'>
						PARTE 3
					</span>
					<span className='border-b-8 border-secondary'>
						Matchers para Strings
					</span>
				</h2>

				<div className='space-y-8'>
					<Box className='border-secondary'>
						<h4 className='text-xl font-black uppercase mb-4'>
							Substrings e Regex
						</h4>
						<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
							<CodeBlock
								language='typescript'
								code={`// Substring simples\nexpect("ISPM - Angola").toContain("ISPM");`}
							/>
							<CodeBlock
								language='typescript'
								code={`// Expressão Regular (Regex)\nexpect("2021001").toMatch(/^\\d{7}$/);`}
							/>
						</div>
					</Box>
					<Box className='p-10 bg-zinc-950 text-white border-none shadow-brutalist'>
						<h4 className='text-xl font-black uppercase mb-4 text-secondary'>
							Validação de Email
						</h4>
						<CodeBlock
							language='typescript'
							code={`const email = "ana.ferreira@ispm.ao";\nexpect(email).toMatch(/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/);`}
						/>
					</Box>
				</div>
			</section>

			{/* PARTE 4 */}
			<section className='mb-24'>
				<h2 className='text-4xl font-black uppercase mb-12 flex items-center gap-4'>
					<span className='px-4 py-2 bg-black text-white dark:bg-white dark:text-black'>
						PARTE 4
					</span>
					<span className='border-b-8 border-zinc-900 dark:border-zinc-100'>
						Matchers para Números
					</span>
				</h2>

				<div className='space-y-12'>
					<Box className='bg-primary/5'>
						<h4 className='text-2xl font-black uppercase mb-4 italic'>
							⚖️ O problema dos decimais (Floating Point)
						</h4>
						<p className='text-lg mb-6 leading-relaxed'>
							Em computação, <code>0.1 + 0.2</code> não é exatamente{" "}
							<code>0.3</code>. Use <code>toBeCloseTo</code> para comparar
							números decimais sem sofrer com erros de precisão.
						</p>
						<CodeBlock
							language='typescript'
							code={`expect(0.1 + 0.2).toBeCloseTo(0.3, 5); // 5 casas de precisão`}
						/>
					</Box>

					<div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
						<Box className='border-black dark:border-white'>
							<h4 className='text-xl font-black uppercase mb-4'>Magnitude</h4>
							<ul className='space-y-2 font-bold italic uppercase tracking-tighter'>
								<li>• toBeGreaterThan(n)</li>
								<li>• toBeGreaterThanOrEqual(n)</li>
								<li>• toBeLessThan(n)</li>
								<li>• toBeLessThanOrEqual(n)</li>
							</ul>
						</Box>
						<Box className='border-black dark:border-white'>
							<h4 className='text-xl font-black uppercase mb-4'>
								Casos Especiais
							</h4>
							<ul className='space-y-2 font-bold italic uppercase tracking-tighter'>
								<li>• toBeNaN()</li>
								<li>• toBeFinite()</li>
								<li>• toBeInteger()</li>
							</ul>
						</Box>
					</div>
				</div>
			</section>

			{/* PARTE 5 */}
			<section className='mb-24'>
				<h2 className='text-4xl font-black uppercase mb-12 flex items-center gap-4'>
					<span className='px-4 py-2 bg-black text-white dark:bg-white dark:text-black'>
						PARTE 5
					</span>
					<span className='border-b-8 border-primary'>
						Matchers Assimétricos (Flexibilidade)
					</span>
				</h2>

				<div className='space-y-10'>
					<p className='text-xl font-medium'>
						Estes permitem-nos verificar partes de um objeto sem saber (ou sem
						importar) o valor exato de outros campos.
					</p>

					<Box className='border-primary shadow-[10px_10px_0px_0px_#ff3296]'>
						<h4 className='text-xl font-black uppercase mb-6'>
							expect.any() e objectContaining()
						</h4>
						<CodeBlock
							language='typescript'
							code={`const usuario = {\n  id: Math.random(),\n  nome: "Ana",\n  criadoEm: new Date()\n};\n\nexpect(usuario).toEqual({\n  id: expect.any(Number),\n  nome: "Ana",\n  criadoEm: expect.any(Date)\n});`}
						/>
					</Box>

					<Box className='border-secondary shadow-[10px_10px_0px_0px_#00E5FF]'>
						<h4 className='text-xl font-black uppercase mb-6'>
							expect.arrayContaining()
						</h4>
						<CodeBlock
							language='typescript'
							code={`const permissoes = ["ler", "escrever", "executar", "admin"];\n\n// Verifica se contém PELO MENOS estes elementos, em qualquer ordem.\nexpect(permissoes).toEqual(expect.arrayContaining(["admin", "ler"]));`}
						/>
					</Box>
				</div>
			</section>

			{/* PARTE 6 */}
			<section className='mb-24'>
				<h2 className='text-4xl font-black uppercase mb-12 flex items-center gap-4'>
					<span className='px-4 py-2 bg-zinc-950 text-white'>PARTE 6</span>
					<span className='border-b-8 border-zinc-950 dark:border-zinc-50'>
						Matchers Personalizados
					</span>
				</h2>

				<Box className='p-12 border-4 border-black dark:border-white bg-zinc-50 dark:bg-zinc-900'>
					<p className='text-lg mb-8'>
						Podemos estender as funcionalidades do <code>expect</code> para
						criar matchers que expressem regras de negócio reais do ISPM.
					</p>
					<CodeBlock
						language='typescript'
						code={`expect.extend({\n  toBeNotaAprovacao(recebido: number) {\n    const passa = recebido >= 9.5;\n    return {\n      pass: passa,\n      message: () => passa \n        ? \`Esperava que \${recebido} NÃO fosse aprovação\` \n        : \`Esperava que \${recebido} fosse aprovação (>= 9.5)\`\n    };\n  }\n});\n\n// Uso legível:\nexpect(mediaFinal).toBeNotaAprovacao();`}
					/>
				</Box>
			</section>

			{/* PARTE 7 */}
			<section className='mb-24 relative overflow-hidden'>
				<div className='absolute -right-20 top-0 text-[20rem] text-primary/5 font-black pointer-events-none'>
					REF
				</div>
				<h2 className='text-4xl font-black uppercase mb-12 flex items-center gap-4'>
					<span className='px-4 py-2 bg-black text-white dark:bg-white dark:text-black'>
						PARTE 7
					</span>
					<span className='border-b-8 border-primary'>
						Guia de Referência Rápida
					</span>
				</h2>

				<Box className='p-0 overflow-hidden border-8 border-black shadow-brutalist'>
					<div className='grid grid-cols-1 md:grid-cols-2 text-sm md:text-base font-bold'>
						<div className='p-8 bg-zinc-950 text-white space-y-4 border-r-4 border-white'>
							<h5 className='text-primary uppercase text-2xl font-black mb-6'>
								IGUALDADE & VERDADE
							</h5>
							<p>
								<span className='text-primary'>toBe(v)</span> — Identidade (===)
							</p>
							<p>
								<span className='text-primary'>toEqual(v)</span> — Conteúdo
								(profundo)
							</p>
							<p>
								<span className='text-primary'>toBeTruthy()</span> — Avalia como
								True
							</p>
							<p>
								<span className='text-primary'>
									toBeNull() / toBeUndefined()
								</span>
							</p>
						</div>
						<div className='p-8 bg-white dark:bg-zinc-900 text-black dark:text-white space-y-4'>
							<h5 className='text-secondary uppercase text-2xl font-black mb-6'>
								NÚMEROS & OUTROS
							</h5>
							<p>
								<span className='text-secondary'>toBeCloseTo(n, casas)</span> —
								Floats
							</p>
							<p>
								<span className='text-secondary'>toBeGreaterThan(n)</span> —
								&gt; n
							</p>
							<p>
								<span className='text-secondary'>toMatch(regex)</span> — Padrões
								String
							</p>
							<p>
								<span className='text-secondary'>toThrow(msg)</span> —
								Exceptions
							</p>
						</div>
					</div>
				</Box>
			</section>

			{/* RESUMO */}
			<section className='my-32 p-16 bg-zinc-950 text-white border-8 border-primary shadow-[20px_20px_0px_0px_rgba(255,50,150,0.5)] relative overflow-hidden'>
				<div className='absolute -right-20 -bottom-20 w-80 h-80 bg-primary/20 rounded-full blur-[100px]' />
				<h3 className='text-6xl font-black uppercase mb-12 relative z-10 text-primary italic'>
					RESUMO
				</h3>
				<div className='space-y-6 relative z-10'>
					{[
						"Família Igualdade — toBe para primitivos, toEqual para objetos/arrays.",
						"Especialidades — toBeCloseTo para decimais, toMatch para regex em strings.",
						"Arrays Profissionais — toContainEqual para procurar objetos dentro de listas.",
						"Flexibilidade — Matchers assimétricos permitem ignorar campos aleatórios (ids, datas).",
						"Expressividade — Matchers personalizados tornam as regras de negócio legíveis por humanos.",
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
						Crie o ficheiro{" "}
						<code>src/modulo-01/matchers-exercicio.test.ts</code> e realize as
						seguintes validações:
					</p>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
						<div className='p-6 bg-white dark:bg-zinc-900 border-4 border-black dark:border-white shadow-brutalist'>
							<h4 className='font-black uppercase mb-4 text-emerald-500'>
								1. Regex & Strings
							</h4>
							<p className='text-sm'>
								Valide um número de telefone angolano (+244) usando um regex no
								match().
							</p>
						</div>
						<div className='p-6 bg-white dark:bg-zinc-900 border-4 border-black dark:border-white shadow-brutalist'>
							<h4 className='font-black uppercase mb-4 text-amber-500'>
								2. Assimétricos
							</h4>
							<p className='text-sm'>
								Verifique um objeto de resposta de API que contém um ID (Número)
								e uma Data aleatórios.
							</p>
						</div>
					</div>
					<div className='p-8 bg-zinc-950 text-white font-black italic uppercase tracking-tight text-center'>
						"Crie também um matcher personalizado chamado
						toBePresencaSuficiente() que verifique se o valor é &gt;= 75."
					</div>
				</div>
			</Box>

			{/* FOOTER */}
			<div className='flex items-center justify-between border-t-8 border-black dark:border-white pt-12 pb-32 mb-20'>
				<p className='font-black uppercase text-2xl italic text-primary'>
					Conferência 2.5 — Fim
				</p>
				<p className='font-black uppercase text-2xl italic text-zinc-400'>
					Próxima: 2.6 — Organização de testes com describe, it e test
				</p>
			</div>
		</>
	),
	ejercicios: [],
};
