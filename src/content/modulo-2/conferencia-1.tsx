import type { ConferenciaData } from "../../types";
import { CodeBlock } from "../../components/CodeBlock";
import { Callout, Box } from "../../components/CourseComponents";

export const data: ConferenciaData = {
	titulo: "2.1 O que é um teste? Anatomia de um teste do zero",
	objetivos: [
		"Definir com precisão o que é um teste automatizado e quais são os seus componentes fundamentais.",
		"Identificar e nomear as três partes de um teste: Arrange, Act e Assert.",
		"Distinguir um teste bem escrito de um teste mal escrito, justificando a diferença.",
		"Usar corretamente test(), expect() e os matchers básicos: toBe(), toEqual(), toBeTruthy(), toBeFalsy(), toBeNull(), toBeUndefined().",
		"Compreender por que cada teste deve verificar uma única coisa.",
		"Reconhecer e interpretar mensagens de erro quando um teste falha.",
	],
	contenido: (
		<>
			{/* INTRODUÇÃO */}
			<Box className='bg-primary/10 border-black dark:border-white mb-16 p-10 shadow-[12px_12px_0px_0px_rgba(255,50,150,1)] dark:shadow-[12px_12px_0px_0px_rgba(255,50,150,0.5)]'>
				<h3 className='text-3xl font-black uppercase mb-6 text-primary flex items-center gap-3'>
					<span className='w-12 h-12 flex items-center justify-center bg-black text-white dark:bg-white dark:text-black rounded-full text-xl'>
						🔬
					</span>
					Introdução — O que exatamente é um teste?
				</h3>
				<div className='space-y-4 text-lg leading-relaxed text-zinc-800 dark:text-zinc-200'>
					<p>
						Nas conferências anteriores usamos testes sem parar para falar sobre
						eles. Agora vamos abrir o capô e entender o que está lá dentro.
					</p>
					<p>Um teste automatizado, na sua forma mais simples, é isto:</p>
					<p className='font-black text-2xl py-6 px-8 border-l-8 border-primary bg-white dark:bg-zinc-900 shadow-brutalist uppercase italic tracking-tighter'>
						"Um pedaço de código que chama outro pedaço de código e verifica se
						o resultado é o que se esperava."
					</p>
					<p>
						Só isso. Não há magia. Não há mistério. O que torna os testes
						poderosos não é a sua complexidade técnica — é a disciplina e a
						consistência com que são escritos.
					</p>
					<p>
						Vamos dissecar um teste como um biólogo disseca um organismo. Vamos
						ver cada célula, cada órgão, e entender para que serve.
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
						A anatomia básica de um teste
					</span>
				</h2>
				<p className='text-xl mb-10 font-medium text-zinc-700 dark:text-zinc-300'>
					Todo teste bem escrito tem exatamente três partes. Estas partes têm um
					nome famoso no mundo do testing:
					<br />
					<span className='text-2xl font-black text-primary mt-2 block underline decoration-secondary decoration-wavy'>
						Arrange — Act — Assert
					</span>
				</p>
				<p className='text-lg mb-8 italic'>
					Em português: Preparar — Agir — Verificar
				</p>

				<Box className='bg-secondary/5 border-secondary p-10 mb-12 shadow-brutalist'>
					<h3 className='text-2xl font-black uppercase mb-6 flex items-center gap-3'>
						<span className='w-12 h-12 flex items-center justify-center bg-secondary text-white rounded-lg'>
							🩺
						</span>
						A analogia do médico
					</h3>
					<div className='space-y-6 text-lg'>
						<p>
							Imagine um médico que quer testar se um novo medicamento baixa a
							pressão arterial.
						</p>
						<ul className='space-y-4'>
							<li className='flex gap-4'>
								<span className='font-black text-secondary bg-secondary/10 px-2 h-fit'>
									Arrange:
								</span>
								<div>
									O médico seleciona um paciente. Mede a pressão antes de dar o
									medicamento. Registra:{" "}
									<strong>pressão inicial = 160 mmHg</strong>. Prepara tudo.
								</div>
							</li>
							<li className='flex gap-4'>
								<span className='font-black text-secondary bg-secondary/10 px-2 h-fit'>
									Act:
								</span>
								<div>
									O médico administra o medicamento. Espera o tempo necessário.
								</div>
							</li>
							<li className='flex gap-4'>
								<span className='font-black text-secondary bg-secondary/10 px-2 h-fit'>
									Assert:
								</span>
								<div>
									O médico mede a pressão novamente. Verifica se está abaixo de
									140 mmHg como esperado. Se estiver, o teste passou. Se não
									estiver, o teste falhou.
								</div>
							</li>
						</ul>
					</div>
				</Box>

				<p className='text-lg mb-6'>Agora veja o mesmo padrão em código:</p>
				<CodeBlock
					language='typescript'
					code={`// src/modulo-01/anatomia.test.ts\n\nimport { expect, test } from "bun:test";\n\n// Uma função simples que vamos testar\nfunction calcularIdade(anoNascimento: number, anoAtual: number): number {\n  return anoAtual - anoNascimento;\n}\n\ntest("calcula corretamente a idade de uma pessoa", () => {\n\n  // ---- ARRANGE (Preparar) ----\n  // Preparamos os dados que o teste vai usar\n  const anoNascimento = 1995;\n  const anoAtual = 2025;\n  const idadeEsperada = 30;\n\n  // ---- ACT (Agir) ----\n  // Executamos a função que queremos testar\n  const idadeCalculada = calcularIdade(anoNascimento, anoAtual);\n\n  // ---- ASSERT (Verificar) ----\n  // Verificamos se o resultado é o que esperávamos\n  expect(idadeCalculada).toBe(idadeEsperada);\n\n});`}
				/>

				<div className='mt-12'>
					<Callout type='info' title='Por que separar em três partes?'>
						<p className='mb-4 font-medium leading-relaxed'>
							Esta separação não é apenas estética. Tem um propósito prático
							muito importante. Quando um teste falha, você precisa saber onde
							está o problema. Se o teste está organizado em AAA, você sabe
							imediatamente:
						</p>
						<ul className='grid grid-cols-1 md:grid-cols-3 gap-4'>
							<li className='p-4 bg-white dark:bg-zinc-800 border-2 border-black dark:border-white'>
								<strong>No Arrange:</strong> os dados de entrada estão errados
							</li>
							<li className='p-4 bg-white dark:bg-zinc-800 border-2 border-black dark:border-white'>
								<strong>No Act:</strong> a função está a ser chamada de forma
								incorreta
							</li>
							<li className='p-4 bg-white dark:bg-zinc-800 border-2 border-black dark:border-white'>
								<strong>No Assert:</strong> a sua expectativa sobre o resultado
								estava errada
							</li>
						</ul>
						<p className='mt-6 italic font-bold text-center'>
							"Um teste sem esta separação é como um relatório médico sem
							estrutura — contém informação, mas é difícil de interpretar quando
							algo corre mal."
						</p>
					</Callout>
				</div>
			</section>

			{/* PARTE 2 */}
			<section className='mb-24'>
				<h2 className='text-4xl font-black uppercase mb-12 flex items-center gap-4'>
					<span className='px-4 py-2 bg-black text-white dark:bg-white dark:text-black'>
						PARTE 2
					</span>
					<span className='border-b-8 border-secondary'>
						Dissecando cada componente
					</span>
				</h2>

				<div className='space-y-16'>
					<div>
						<h3 className='text-2xl font-black mb-6 uppercase border-l-8 border-primary pl-4'>
							O test() — O contentor
						</h3>
						<p className='text-lg mb-8 leading-relaxed font-medium'>
							O <code>test()</code> é o contentor. Ele define os limites de um
							teste: onde começa e onde termina. O seu primeiro argumento é o
							nome do teste, e este nome é crítico.
						</p>
						<Box className='bg-zinc-900 text-white p-8 border-none'>
							<p className='text-xl mb-6 font-black uppercase italic'>
								Um bom nome de teste responde à pergunta:{" "}
								<span className='text-yellow-400'>
									"O que acontece quando...?"
								</span>
							</p>
							<div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
								<div className='space-y-3'>
									<p className='text-red-500 font-bold uppercase text-xs tracking-widest'>
										❌ Nomes ruins — não dizem nada útil:
									</p>
									<div className='p-3 bg-red-900/30 border-2 border-red-500 text-sm font-mono'>
										test("teste 1", () =&gt; {"{...}"});
									</div>
									<div className='p-3 bg-red-900/30 border-2 border-red-500 text-sm font-mono'>
										test("função de desconto", () =&gt; {"{...}"});
									</div>
								</div>
								<div className='space-y-3'>
									<p className='text-green-500 font-bold uppercase text-xs tracking-widest'>
										✅ Nomes bons — dizem exatamente o que está sendo
										verificado:
									</p>
									<div className='p-3 bg-green-900/30 border-2 border-green-500 text-sm font-mono'>
										test("aplica 10% de desconto em produtos com preço maior que
										100", () =&gt; {"{...}"});
									</div>
									<div className='p-3 bg-green-900/30 border-2 border-green-500 text-sm font-mono'>
										test("lança erro quando o preço é negativo", () =&gt;{" "}
										{"{...}"});
									</div>
								</div>
							</div>
						</Box>
						<p className='mt-8 text-lg font-medium text-zinc-600 dark:text-zinc-400 italic'>
							"Por quê isso importa? Porque quando o teste falha, o nome é a
							primeira coisa que você vê no terminal."
						</p>
					</div>

					<div>
						<h3 className='text-2xl font-black mb-6 uppercase border-l-8 border-secondary pl-4'>
							O expect() — A afirmação
						</h3>
						<p className='text-lg mb-8 leading-relaxed font-medium'>
							O <code>expect()</code> é onde fazemos a afirmação. Ele recebe o
							valor real — o que a função realmente retornou — e o compara com o
							que esperávamos.
						</p>
						<Box className='bg-primary/5 border-primary p-8'>
							<p className='text-lg mb-6'>
								Pense no <strong>expect</strong> como um juiz. Você apresenta
								duas evidências: o que aconteceu e o que deveria ter acontecido.
							</p>
							<div className='flex flex-col md:flex-row items-center justify-center gap-6 text-2xl font-black uppercase'>
								<span className='px-4 py-2 bg-zinc-900 text-white dark:bg-zinc-100 dark:text-black'>
									expect
								</span>
								<span className='text-zinc-400'>( O QUE ACONTECEU )</span>
								<span className='text-primary decoration-double underline'>
									.matcher
								</span>
								<span className='text-zinc-400'>( O QUE ESPERÁVAMOS )</span>
							</div>
						</Box>
					</div>
				</div>
			</section>

			{/* PARTE 3 */}
			<section className='mb-24'>
				<h2 className='text-4xl font-black uppercase mb-12 flex items-center gap-4'>
					<span className='px-4 py-2 bg-black text-white dark:bg-white dark:text-black'>
						PARTE 3
					</span>
					<span className='border-b-8 border-primary'>
						Os matchers essenciais
					</span>
				</h2>

				<div className='space-y-16'>
					<div>
						<h3 className='text-2xl font-black mb-6 flex items-center gap-3'>
							<span className='w-12 h-12 flex items-center justify-center bg-blue-500 text-white rounded-full'>
								1
							</span>
							toBe() — Igualdade exata
						</h3>
						<p className='text-lg mb-6 leading-relaxed font-medium'>
							Verifica se dois valores são exatamente iguais. Usa o operador{" "}
							<code>===</code> internamente.
						</p>
						<CodeBlock
							language='typescript'
							code={`// src/modulo-01/matchers.test.ts\nimport { expect, test, describe } from "bun:test";\n\ndescribe("toBe — igualdade exata", () => {\n  test("números iguais passam", () => {\n    expect(2 + 2).toBe(4);\n  });\n\n  test("strings iguais passam", () => {\n    expect("olá" + " mundo").toBe("olá mundo");\n  });\n\n  test("booleanos", () => {\n    expect(true).toBe(true);\n    expect(false).toBe(false);\n  });\n});`}
						/>
						<Callout type='warning' title='ARMADILHA FATAL' className='mt-8'>
							<p className='font-bold text-xl mb-4'>
								toBe() não deve ser usado com objetos e arrays.
							</p>
							<CodeBlock
								language='typescript'
								code={`const obj1 = { nome: "João" };\nconst obj2 = { nome: "João" };\nexpect(obj1).toBe(obj2); // ← FALHA propositalmente`}
							/>
							<p className='mt-4 font-medium text-lg leading-relaxed'>
								Por quê? Porque <code>toBe</code> verifica se são o MESMO objeto
								na memória. Para o conteúdo, use <code>toEqual()</code>.
							</p>
						</Callout>
					</div>

					<div>
						<h3 className='text-2xl font-black mb-6 flex items-center gap-3'>
							<span className='w-12 h-12 flex items-center justify-center bg-green-500 text-white rounded-full'>
								2
							</span>
							toEqual() — Igualdade de conteúdo
						</h3>
						<p className='text-lg mb-6 leading-relaxed font-medium'>
							Verifica se dois valores têm o mesmo conteúdo, mesmo que sejam
							objetos diferentes na memória. Compara recursivamente cada
							propriedade.
						</p>
						<CodeBlock
							language='typescript'
							code={`test("objetos com mesmo conteúdo são iguais", () => {\n  const aluno1 = { nome: "Ana", nota: 15 };\n  const aluno2 = { nome: "Ana", nota: 15 };\n\n  // toBe falharia aqui, mas toEqual passa!\n  expect(aluno1).toEqual(aluno2);\n});\n\ntest("arrays com mesmo conteúdo são iguais", () => {\n  expect([10, 14, 16]).toEqual([10, 14, 16]);\n});`}
						/>
					</div>

					<div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
						<Box className='bg-zinc-100 dark:bg-zinc-800 border-black dark:border-white h-full'>
							<h3 className='text-2xl font-black mb-4 uppercase'>
								Truthy & Falsy
							</h3>
							<p className='mb-6 font-medium leading-relaxed'>
								Valores falsy: <code>false, 0, "", null, undefined, NaN</code>.
								Tudo o resto é truthy.
							</p>
							<CodeBlock
								language='typescript'
								code={`expect(1).toBeTruthy();\nexpect("").toBeFalsy();\nexpect([]).toBeTruthy(); // array vazio é truthy!`}
							/>
						</Box>
						<Box className='bg-primary/5 border-primary h-full'>
							<h3 className='text-2xl font-black mb-4 uppercase'>
								Null & Undefined
							</h3>
							<div className='space-y-4 font-medium'>
								<p>
									<code>null</code> → ausência intencional.
								</p>
								<p>
									<code>undefined</code> → propriedade não definida.
								</p>
								<CodeBlock
									language='typescript'
									code={`expect(null).toBeNull();\nexpect(indefinido).toBeUndefined();`}
								/>
							</div>
						</Box>
					</div>

					<Box className='bg-black text-white dark:bg-white dark:text-black py-12 text-center'>
						<h3 className='text-4xl font-black uppercase mb-4 italic tracking-widest'>
							O modificador .not
						</h3>
						<p className='text-xl font-medium tracking-tight uppercase'>
							Qualquer matcher pode ser negado com <strong>.not</strong>. É como
							colocar "não" antes da afirmação.
						</p>
						<div className='mt-8 text-2xl font-mono'>
							expect(resultado)<span className='text-primary'>.not</span>
							.toBe(0);
						</div>
					</Box>
				</div>
			</section>

			{/* PARTE 4 */}
			<section className='mb-24'>
				<h2 className='text-4xl font-black uppercase mb-8 flex items-center gap-4'>
					<span className='px-4 py-2 bg-black text-white dark:bg-white dark:text-black'>
						PARTE 4
					</span>
					<span className='border-b-8 border-secondary'>
						Um teste deve verificar uma única coisa
					</span>
				</h2>
				<p className='text-xl mb-12 font-medium leading-relaxed italic border-l-8 border-secondary pl-6'>
					Esta é uma das regras mais importantes do testing e uma das mais
					violadas por iniciantes.
				</p>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
					<div className='space-y-4'>
						<p className='font-black text-red-500 uppercase flex items-center gap-2'>
							<span className='w-6 h-6 flex items-center justify-center bg-red-500 text-white rounded-full'>
								X
							</span>
							ERRADO — O teste "Monstro"
						</p>
						<CodeBlock
							language='typescript'
							code={`test("cadastro de aluno", () => {\n  const aluno = cadastrarAluno("Ana", 20, "TI");\n  expect(aluno.nome).toBe("Ana");\n  expect(aluno.idade).toBe(20);\n  expect(aluno.ativo).toBe(true);\n  // ... mais 10 expects\n});`}
						/>
						<p className='text-sm italic opacity-70'>
							Se falha, você não sabe o que quebrou sem investigar linha a
							linha.
						</p>
					</div>
					<div className='space-y-4'>
						<p className='font-black text-green-500 uppercase flex items-center gap-2'>
							<span className='w-6 h-6 flex items-center justify-center bg-green-500 text-white rounded-full'>
								✓
							</span>
							CORRETO — Separação por Aspeto
						</p>
						<CodeBlock
							language='typescript'
							code={`describe("cadastrarAluno", () => {\n  test("define o nome corretamente", () => {\n    expect(cadastrarAluno("Ana", 20, "TI").nome).toBe("Ana");\n  });\n  test("inicia como ativo", () => {\n    expect(cadastrarAluno("Ana", 20, "TI").ativo).toBe(true);\n  });\n});`}
						/>
						<p className='text-sm italic opacity-70'>
							Agora o terminal diz exatamente qual aspeto falhou.
						</p>
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
						Lendo mensagens de erro
					</span>
				</h2>
				<p className='text-lg mb-8 font-medium'>
					Saber ler as mensagens de erro do Bun é uma habilidade fundamental.
					Vamos analisar uma falha proposital:
				</p>

				<Box className='relative p-0 overflow-hidden border-4 border-black dark:border-white shadow-[12px_12px_0px_0px_rgba(239,68,68,1)]'>
					<div className='bg-zinc-800 p-3 flex items-center justify-between border-b-2 border-black'>
						<span className='text-xs font-mono text-zinc-400 uppercase tracking-widest'>
							bun test failure report
						</span>
						<div className='w-2 h-2 rounded-full bg-red-500 animate-pulse' />
					</div>
					<div className='p-8 bg-zinc-950 font-mono text-sm leading-relaxed text-zinc-300'>
						<p className='mb-2 text-zinc-500'>bun test v1.2.4</p>
						<p className='mb-4 text-red-400 font-bold'>
							✗ calcula a média de três notas
						</p>
						<p className='mb-6 pl-4 border-l-2 border-zinc-800'>
							expect(received).toBeCloseTo(expected, precision)
							<br />
							<br />
							Expected: <span className='text-white'>13.33</span> (with
							precision 1)
							<br />
							Received: <span className='text-red-400'>40</span>{" "}
							<span className='text-zinc-600 italic'>
								← valor real retornado
							</span>
						</p>
						<div className='text-zinc-500 space-y-1'>
							<p>12 | const mediaCalculada = calcularMedia(notas);</p>
							<p>13 |</p>
							<p className='text-white'>
								<span className='text-primary'>❯</span> 14 |
								expect(mediaCalculada).toBeCloseTo(mediaEsperada, 1);
							</p>
							<p className='pl-8 font-black text-primary'>^</p>
						</div>
					</div>
				</Box>

				<div className='mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 text-center'>
					{[
						["✗", "Qual teste falhou"],
						["Expected", "O que esperávamos"],
						["Received", "O que recebemos"],
						["❯", "Linha exata do erro"],
					].map(([icon, label]) => (
						<div
							key={label}
							className='p-4 border-2 border-black dark:border-white bg-zinc-50 dark:bg-zinc-900'
						>
							<div className='text-2xl font-black mb-2 text-primary'>
								{icon}
							</div>
							<div className='text-xs font-black uppercase tracking-tight'>
								{label}
							</div>
						</div>
					))}
				</div>
			</section>

			{/* PARTE 6 */}
			<section className='mb-24'>
				<h2 className='text-4xl font-black uppercase mb-12 flex items-center gap-4'>
					<span className='px-4 py-2 bg-black text-white dark:bg-white dark:text-black'>
						PARTE 6
					</span>
					<span className='border-b-8 border-secondary'>
						Exemplo Real: Gestão de Notas
					</span>
				</h2>
				<p className='text-lg mb-12 font-medium'>
					Imagine que estamos desenvolvendo um sistema de gestão de notas para o
					ISPM. Juntamos tudo agora num exemplo completo.
				</p>
				<div className='grid grid-cols-1 xl:grid-cols-2 gap-10'>
					<div className='space-y-6'>
						<h3 className='text-xl font-black uppercase text-secondary underline'>
							Ficheiro de Lógica
						</h3>
						<CodeBlock
							language='typescript'
							code={`// src/modulo-01/gestao-notas.ts\n\nexport interface Aluno {\n  nome: string;\n  notas: number[];\n}\n\nexport function calcularMedia(notas: number[]): number {\n  if (notas.length === 0) return 0;\n  const soma = notas.reduce((acc, nota) => acc + nota, 0);\n  return soma / notas.length;\n}\n\nexport function determinarSituacao(media: number): string {\n  if (media < 0 || media > 20) throw new Error("Média inválida");\n  if (media >= 9.5) return "Aprovado";\n  return "Reprovado";\n}`}
						/>
					</div>
					<div className='space-y-6'>
						<h3 className='text-xl font-black uppercase text-primary underline'>
							Ficheiro de Teste
						</h3>
						<CodeBlock
							language='typescript'
							code={`// src/modulo-01/gestao-notas.test.ts\nimport { expect, test, describe } from "bun:test";\nimport { calcularMedia, determinarSituacao } from "./gestao-notas";\n\ndescribe("Gestão de Notas", () => {\n  test("calcula a média corretamente", () => {\n    expect(calcularMedia([10, 12, 14])).toBe(12);\n  });\n\n  test("determina situação de aprovação", () => {\n    expect(determinarSituacao(15)).toBe("Aprovado");\n    expect(determinarSituacao(9.5)).toBe("Aprovado");\n  });\n\n  test("determina situação de reprovação", () => {\n    expect(determinarSituacao(7)).toBe("Reprovado");\n  });\n\n  test("erro para médias impossíveis", () => {\n    expect(() => determinarSituacao(25)).toThrow("Média inválida");\n  });\n});`}
						/>
					</div>
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
						"Definição — Testar é chamar código e verificar se o resultado é o esperado de forma automatizada.",
						"Padrão AAA — Arrange (preparar), Act (agir) e Assert (verificar) é a base de ouro.",
						"test() e expect() — Os contentores e as afirmações que movem todo o sistema de testes.",
						"Matchers — toBe() para igualdade de valor, toEqual() para igualdade de estrutura em objetos.",
						"Uma coisa, um teste — Mantém os testes focados para que diagnósticos de erro sejam instantâneos.",
						"Mensagens de Erro — O Bun dá-te o Expected vs Received. Já não tens de adivinhar o que falhou.",
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
					<span className='text-6xl animate-bounce'>🏗️</span>
				</h3>
				<div className='space-y-8 text-xl font-medium leading-relaxed text-zinc-800 dark:text-zinc-200'>
					<p>
						Crie o arquivo <code>src/modulo-01/string-utils.ts</code> com estas
						funções:
					</p>
					<ul className='space-y-4'>
						<li className='flex flex-wrap gap-2 items-center'>
							<code className='bg-primary/20 px-2'>
								capitalizar(texto: string)
							</code>
							<span className='text-sm opacity-70 italic'>
								— "ana ferreira" → "Ana Ferreira"
							</span>
						</li>
						<li className='flex flex-wrap gap-2 items-center'>
							<code className='bg-primary/20 px-2'>
								contarPalavras(texto: string)
							</code>
							<span className='text-sm opacity-70 italic'>
								— "bom dia mundo" → 3
							</span>
						</li>
						<li className='flex flex-wrap gap-2 items-center'>
							<code className='bg-primary/20 px-2'>
								inverter(texto: string)
							</code>
							<span className='text-sm opacity-70 italic'>— "abc" → "cba"</span>
						</li>
					</ul>
					<p className='font-black text-2xl border-l-8 border-primary pl-6 py-4 bg-white dark:bg-black uppercase italic'>
						Implemente as funções e crie o seu respetivo ficheiro .test.ts
						usando o que aprendemos hoje.
					</p>
					<div className='p-6 bg-black text-white dark:bg-white dark:text-black font-black uppercase text-center mt-12 hover:scale-105 transition-transform cursor-default'>
						Use toEqual(), toBe(), toBeFalsy() e toBeTruthy() onde fizer
						sentido!
					</div>
				</div>
			</Box>

			{/* FOOTER */}
			<div className='flex items-center justify-between border-t-8 border-black dark:border-white pt-12 pb-32 mb-20'>
				<p className='font-black uppercase text-2xl italic text-primary'>
					Conferência 2.1 — Fim
				</p>
				<p className='font-black uppercase text-2xl italic text-zinc-400'>
					Próxima: 2.2 — O ciclo de vida de um teste (AAA)
				</p>
			</div>
		</>
	),
	ejercicios: [],
};
