import type { ConferenciaData } from "../../types";
import { CodeBlock } from "../../components/CodeBlock";
import { Callout, Box } from "../../components/CourseComponents";

export const data: ConferenciaData = {
	titulo: "2.3 Tipos de testes: unitários, de integração e end-to-end",
	objetivos: [
		"Definir com precisão os três tipos principais de testes: unitários, de integração e end-to-end.",
		"Identificar qual tipo de teste aplicar em cada situação concreta.",
		"Explicar a pirâmide de testes e justificar por que a base é formada por testes unitários.",
		"Reconhecer as vantagens e limitações de cada tipo de teste.",
		"Escrever exemplos reais dos três tipos usando bun:test.",
		"Compreender por que testes unitários são o foco principal deste curso.",
	],
	contenido: (
		<>
			{/* METADATA DA CONFERÊNCIA */}
			<div className='flex flex-wrap gap-4 mb-10'>
				<span className='px-4 py-2 bg-zinc-900 text-white dark:bg-zinc-100 dark:text-black font-black uppercase text-sm brutalist-shadow'>
					⏱️ Duração: 2 Horas
				</span>
				<span className='px-4 py-2 bg-primary text-white font-black uppercase text-sm brutalist-shadow'>
					🔑 Pré-requisitos: Conferências 2.1 e 2.2 concluídas
				</span>
			</div>

			{/* INTRODUÇÃO */}
			<Box className='bg-primary/10 border-black dark:border-white mb-16 p-10 shadow-[12px_12px_0px_0px_rgba(255,50,150,1)] dark:shadow-[12px_12px_0px_0px_rgba(255,50,150,0.5)] relative overflow-hidden'>
				<div className='absolute -right-10 -top-10 text-9xl text-primary/10 font-black'>?</div>
				<h3 className='text-3xl font-black uppercase mb-6 text-primary flex items-center gap-3'>
					<span className='w-12 h-12 flex items-center justify-center bg-black text-white dark:bg-white dark:text-black rounded-full text-xl'>
						🤔
					</span>
					Introdução — A pergunta que todo iniciante faz
				</h3>
				<div className='space-y-4 text-lg leading-relaxed text-zinc-800 dark:text-zinc-200'>
					<p>
						Depois de aprender a escrever testes, a próxima pergunta natural é: "O que exatamente devo testar? Testo cada função individualmente? Testo o sistema inteiro? Testo tudo ao mesmo tempo?"
					</p>
					<p>
						Esta é uma das perguntas mais importantes do mundo do testing. E a resposta não é simples — depende do que você quer verificar, com que velocidade, e com que nível de confiança.
					</p>
					<p className='font-black text-2xl py-6 px-8 border-l-8 border-primary bg-white dark:bg-zinc-900 shadow-brutalist uppercase italic tracking-tighter'>
						"Ao longo dos anos, a indústria de software desenvolveu uma forma de pensar sobre isso que ficou conhecida como a Pirâmide de Testes."
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
				<h2 className='text-4xl font-black uppercase mb-12 flex items-center gap-4 group'>
					<span className='px-4 py-2 bg-black text-white dark:bg-white dark:text-black group-hover:bg-primary transition-colors'>
						PARTE 1
					</span>
					<span className='border-b-8 border-primary'>
						A Pirâmide de Testes
					</span>
				</h2>

				<div className='grid grid-cols-1 xl:grid-cols-2 gap-12 items-center'>
					<Box className='bg-zinc-950 text-white p-10 border-none relative overflow-hidden'>
						<div className='flex flex-col items-center space-y-2 relative z-10 font-black uppercase italic tracking-tight'>
							<div className='w-24 h-12 bg-rose-500 flex items-center justify-center border-4 border-white transform hover:scale-110 transition-transform cursor-help shadow-lg' title="Poucos, lentos e caros">E2E</div>
							<div className='w-48 h-12 bg-amber-500 flex items-center justify-center border-4 border-white transform hover:scale-110 transition-transform cursor-help shadow-lg' title="Médios e moderados">Integração</div>
							<div className='w-72 h-12 bg-emerald-500 flex items-center justify-center border-4 border-white transform hover:scale-110 transition-transform cursor-help shadow-lg' title="Muitos, rápidos e baratos">Unitários</div>
						</div>
						<div className='absolute top-0 right-0 w-full h-full opacity-10 flex items-center justify-center pointer-events-none'>
							<span className='text-[20rem]'>🔺</span>
						</div>
					</Box>
					<div className='space-y-6'>
						<p className='text-xl italic font-medium leading-relaxed border-l-8 border-primary pl-6 py-4 bg-zinc-100 dark:bg-zinc-800'>
							A pirâmide nos diz três coisas fundamentais:
						</p>
						<ul className='space-y-4 text-lg'>
							<li className='flex gap-4'>
								<span className='w-8 h-8 rounded-full bg-black text-white dark:bg-white dark:text-black flex items-center justify-center shrink-0 font-bold italic'>1</span>
								<p><strong>A base deve ser a maior:</strong> Muitos unitários, alguns de integração, poucos end-to-end.</p>
							</li>
							<li className='flex gap-4'>
								<span className='w-8 h-8 rounded-full bg-black text-white dark:bg-white dark:text-black flex items-center justify-center shrink-0 font-bold italic'>2</span>
								<p><strong>Velocidade vs Custo:</strong> Quanto mais alto, mais lento e caro é o teste.</p>
							</li>
							<li className='flex gap-4'>
								<span className='w-8 h-8 rounded-full bg-black text-white dark:bg-white dark:text-black flex items-center justify-center shrink-0 font-bold italic'>3</span>
								<p><strong>Complementaridade:</strong> Cada camada verifica coisas diferentes. Não são substitutos.</p>
							</li>
						</ul>
					</div>
				</div>
			</section>

			{/* PARTE 2 */}
			<section className='mb-24'>
				<h2 className='text-4xl font-black uppercase mb-12 flex items-center gap-4'>
					<span className='px-4 py-2 bg-black text-white dark:bg-white dark:text-black'>
						PARTE 2
					</span>
					<span className='border-b-8 border-secondary'>
						Testes Unitários
					</span>
				</h2>

				<div className='space-y-12'>
					<Box className='bg-emerald-50/50 dark:bg-emerald-950/10 border-emerald-500 p-8'>
						<h3 className='text-2xl font-black mb-4 uppercase text-emerald-600 flex items-center gap-2'>
							<span className='text-4xl'>🔬</span> O que são?
						</h3>
						<p className='text-lg leading-relaxed'>
							Um teste unitário verifica uma <strong>única unidade</strong> de código num isolamento total. Uma "unidade" é normalmente uma função, um método, ou uma classe pequena. Não se importa com bancos de dados, rede ou sistema de ficheiros.
						</p>
					</Box>

					<div className='grid grid-cols-1 xl:grid-cols-2 gap-10'>
						<Box className='bg-zinc-900 text-white p-10 border-none shadow-[10px_10px_0px_#10b981]'>
							<h4 className='text-xl font-black uppercase mb-4 text-emerald-400'>🩺 A analogia do mecânico</h4>
							<p className='text-lg leading-relaxed mb-6'>
								Imagine um mecânico que quer verificar o motor de um carro. Ele não dirige 100km na estrada. Ele retira o motor, coloca-o numa bancada e testa cada peça: o alternador, o carburador, a correia.
							</p>
							<p className='italic text-zinc-400'>"Retirar a função do contexto para a bancada de testes."</p>
						</Box>
						<div className='space-y-4'>
							<h4 className='text-xl font-black uppercase border-b-4 border-emerald-500 pb-2 mb-6'>Características</h4>
							<ul className='space-y-3 font-bold text-lg'>
								<li className='flex items-center gap-3'><span className='text-emerald-500'>✔</span> Rápidos: milissegundos</li>
								<li className='flex items-center gap-3'><span className='text-emerald-500'>✔</span> Isolados: sem efeitos colaterais</li>
								<li className='flex items-center gap-3'><span className='text-emerald-500'>✔</span> Determinísticos: sempre o mesmo resultado</li>
								<li className='flex items-center gap-3'><span className='text-emerald-500'>✔</span> Focados: uma só responsabilidade</li>
							</ul>
						</div>
					</div>

					<div>
						<h3 className='text-2xl font-black mb-6 uppercase text-emerald-600'>Exemplo Prático: Validador</h3>
						<CodeBlock 
							language="typescript"
							code={`// src/modulo-01/tipos-testes/validador.test.ts\nimport { expect, test, describe } from "bun:test";\nimport { validarNome, validarEmail, validarIdade } from "./validador";\n\ndescribe("validarNome", () => {\n  test("retorna null para nome válido", () => {\n    expect(validarNome("Ana Ferreira")).toBeNull();\n  });\n\n  test("retorna erro para nome muito curto", () => {\n    const erro = validarNome("A");\n    expect(erro).toBe("Nome deve ter pelo menos 2 caracteres");\n  });\n});\n\ndescribe("validarIdade", () => {\n  test("retorna erro para menor de 18 anos", () => {\n    expect(validarIdade(17)).toBe("Deve ter pelo menos 18 anos");\n  });\n});`}
						/>
						<Box className='mt-8 bg-zinc-950 text-white p-6 border-none text-center'>
							<p className='text-2xl font-black uppercase italic'>
								"21 testes em 3 milissegundos. Esta é a velocidade do unitário."
							</p>
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
					<span className='border-b-8 border-amber-500'>
						Testes de Integração
					</span>
				</h2>

				<div className='space-y-12'>
					<Box className='bg-amber-50/50 dark:bg-amber-950/10 border-amber-500 p-8'>
						<h3 className='text-2xl font-black mb-4 uppercase text-amber-600 flex items-center gap-2'>
							<span className='text-4xl'>⚙️</span> O que são?
						</h3>
						<p className='text-lg leading-relaxed'>
							Um teste de integração verifica se <strong>duas ou mais unidades</strong> funcionam corretamente juntas. A pergunta é: "Estas peças que funcionam individualmente, também funcionam quando conectadas?"
						</p>
					</Box>

					<div className='grid grid-cols-1 xl:grid-cols-2 gap-10'>
						<Box className='bg-zinc-100 dark:bg-zinc-800 p-10 border-l-8 border-amber-500 brutalist-shadow'>
							<h4 className='text-xl font-black uppercase mb-4 text-amber-600 italic'>🩺 A analogia continuada</h4>
							<p className='text-lg leading-relaxed mb-6'>
								O mecânico já testou o motor e a caixa de câmbio individualmente. Agora ele verifica se, ao acoplar o motor à caixa, a rotação é transmitida corretamente.
							</p>
						</Box>
						<div className='space-y-4'>
							<h4 className='text-xl font-black uppercase border-b-4 border-amber-500 pb-2 mb-6'>Contratos de Interface</h4>
							<p className='text-lg font-medium'>
								Muitos bugs aparecem apenas nas interfaces entre as peças: quando o Módulo A envia dados num formato que o Módulo B não espera.
							</p>
						</div>
					</div>

					<div>
						<h3 className='text-2xl font-black mb-6 uppercase text-amber-600'>Exemplo: Serviço e Repositório</h3>
						<CodeBlock 
							language="typescript"
							code={`test("processa pedido com produtos disponíveis", () => {\n  const itens = [\n    { produtoId: 1, quantidade: 2 }, \n    { produtoId: 2, quantidade: 3 }, \n  ];\n\n  const resultado = processarPedido(itens);\n\n  expect(resultado.sucesso).toBe(true);\n  expect(resultado.total).toBe(1300);\n\n  // Ponto chave da integração: verificar o efeito colateral no outro módulo\n  const caderno = repositorioProdutos.buscarPorId(1);\n  expect(caderno?.estoque).toBe(8); // era 10, comprou 2\n});`}
						/>
						<Callout type='info' title='Repare na diferença' className='mt-8'>
							No teste de integração, verificamos não apenas o retorno da função, mas se houve a comunicação correta com o repositório/banco de dados.
						</Callout>
					</div>
				</div>
			</section>

			{/* PARTE 4 */}
			<section className='mb-24'>
				<h2 className='text-4xl font-black uppercase mb-12 flex items-center gap-4'>
					<span className='px-4 py-2 bg-black text-white dark:bg-white dark:text-black'>
						PARTE 4
					</span>
					<span className='border-b-8 border-rose-500'>
						Testes End-to-End (E2E)
					</span>
				</h2>

				<div className='space-y-12'>
					<Box className='bg-rose-50/50 dark:bg-rose-950/10 border-rose-500 p-8'>
						<h3 className='text-2xl font-black mb-4 uppercase text-rose-600 flex items-center gap-2'>
							<span className='text-4xl'>🚗</span> O que são?
						</h3>
						<p className='text-lg leading-relaxed'>
							Um teste end-to-end verifica o sistema <strong>do início ao fim</strong> (ponta a ponta), simulando um utilizador real. Da interface até ao banco de dados, passando por todas as camadas.
						</p>
					</Box>

					<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
						<Box className='bg-rose-500 text-white border-zinc-900'>
							<h4 className='font-black uppercase mb-2'>Lentos</h4>
							<p className='text-sm opacity-90'>Podem demorar segundos ou minutos para executar um único fluxo.</p>
						</Box>
						<Box className='bg-rose-600 text-white border-zinc-900'>
							<h4 className='font-black uppercase mb-2'>Caros</h4>
							<p className='text-sm opacity-90'>Precisam de um ambiente completo (servidor, banco, browser).</p>
						</Box>
						<Box className='bg-rose-700 text-white border-zinc-900'>
							<h4 className='font-black uppercase mb-2'>Realistas</h4>
							<p className='text-sm opacity-90'>Verificam a experiência real do utilizador sem simulações.</p>
						</Box>
					</div>

					<div>
						<h3 className='text-2xl font-black mb-6 uppercase text-rose-600'>E2E com Elysia.js</h3>
						<CodeBlock 
							language="typescript"
							code={`test("POST /utilizadores cria novo utilizador", async () => {\n  const novoUtilizador = { nome: "Beatriz Santos", email: "beatriz@ispm.ao" };\n\n  const resposta = await app.handle(\n    new Request("http://localhost/utilizadores", {\n      method: "POST",\n      headers: { "Content-Type": "application/json" },\n      body: JSON.stringify(novoUtilizador),\n    })\n  );\n\n  expect(resposta.status).toBe(201);\n  const criado = await resposta.json();\n  expect(criado.nome).toBe("Beatriz Santos");\n});`}
						/>
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
						Comparação direta
					</span>
				</h2>

				<Box className='p-0 overflow-hidden border-8 border-black dark:border-white shadow-brutalist'>
					<table className='w-full text-left'>
						<thead className='bg-black text-white dark:bg-white dark:text-black uppercase'>
							<tr>
								<th className='p-4 border-r-2 border-white dark:border-black'>Cenário</th>
								<th className='p-4'>Abordagem do Teste</th>
							</tr>
						</thead>
						<tbody className='text-lg font-bold'>
							<tr className='border-b-4 border-black dark:border-white hover:bg-emerald-500/10'>
								<td className='p-4 border-r-2 border-black dark:border-white text-emerald-600'>Unitário</td>
								<td className='p-4 italic'>"A função calcularDesconto(100, 10) retorna 90?"</td>
							</tr>
							<tr className='border-b-4 border-black dark:border-white hover:bg-amber-500/10'>
								<td className='p-4 border-r-2 border-black dark:border-white text-amber-600'>Integração</td>
								<td className='p-4 italic'>"O carrinhoService.aplicarCupao("DES10") atualiza o total para 90?"</td>
							</tr>
							<tr className='hover:bg-rose-500/10'>
								<td className='p-4 border-r-2 border-black dark:border-white text-rose-600'>E2E</td>
								<td className='p-4 italic'>"Ao clicar no botão "Aplicar Cupão", o utilizador vê o novo total no ecrã?"</td>
							</tr>
						</tbody>
					</table>
				</Box>
			</section>

			{/* PARTE 6 */}
			<section className='mb-24'>
				<h2 className='text-4xl font-black uppercase mb-12 flex items-center gap-4'>
					<span className='px-4 py-2 bg-black text-white dark:bg-white dark:text-black'>
						PARTE 6
					</span>
					<span className='border-b-8 border-secondary'>
						A Proporção Ideal
					</span>
				</h2>
				
				<div className='grid grid-cols-1 md:grid-cols-3 gap-10 text-center uppercase tracking-tighter'>
					<div className='p-10 bg-emerald-100 dark:bg-emerald-950/20 border-4 border-emerald-500 brutalist-shadow'>
						<span className='text-6xl font-black text-emerald-600'>70%</span>
						<p className='text-xl font-black mt-2'>Unitários</p>
						<p className='text-xs font-bold opacity-60 mt-1'>Toda a lógica de negócio</p>
					</div>
					<div className='p-10 bg-amber-100 dark:bg-amber-950/20 border-4 border-amber-500 brutalist-shadow'>
						<span className='text-6xl font-black text-amber-600'>20%</span>
						<p className='text-xl font-black mt-2'>Integração</p>
						<p className='text-xs font-bold opacity-60 mt-1'>Conexões entre peças</p>
					</div>
					<div className='p-10 bg-rose-100 dark:bg-rose-950/20 border-4 border-rose-500 brutalist-shadow'>
						<span className='text-6xl font-black text-rose-600'>10%</span>
						<p className='text-xl font-black mt-2'>E2E</p>
						<p className='text-xs font-bold opacity-60 mt-1'>Fluxos mais críticos</p>
					</div>
				</div>

				<Callout type='warning' title='Por que esta proporção?' className='mt-16'>
					A resposta é económica e prática. 500 testes E2E demorariam 40 minutos para executar. 500 testes unitários demoram menos de 1 segundo. <strong>Velocidade é vida para um programador.</strong>
				</Callout>
			</section>

			{/* RESUMO */}
			<section className='my-32 p-16 bg-zinc-950 text-white border-8 border-primary shadow-[20px_20px_0px_0px_rgba(255,50,150,0.5)] relative overflow-hidden'>
				<div className='absolute -right-20 -bottom-20 w-80 h-80 bg-primary/20 rounded-full blur-[100px]' />
				<h3 className='text-6xl font-black uppercase mb-12 relative z-10 text-primary italic'>
					RESUMO
				</h3>
				<div className='space-y-6 relative z-10'>
					{[
						"Pirâmide — Começa com muitos unitários, alguns de integração e poucos E2E.",
						"Unitários — Rápidos (ms), isolados e determinísticos. A base de tudo.",
						"Integração — Verificam os contratos e as interfaces entre dois ou mais módulos.",
						"End-to-End — Realistas mas caros e lentos. Simulam a jornada do utilizador.",
						"Complementaridade — Níveis de teste são camadas de segurança adicionais, não substitutos.",
						"Mocking — Técnica essencial para isolar unidades mesmo com dependências externas.",
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
					<span className='text-6xl animate-bounce'>📚</span>
				</h3>
				<div className='space-y-8 text-xl font-medium leading-relaxed text-zinc-800 dark:text-zinc-200'>
					<p>
						Crie um mini sistema de biblioteca com dois ficheiros:
					</p>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
						<div className='p-6 bg-white dark:bg-zinc-900 border-4 border-black dark:border-white'>
							<h4 className='font-black uppercase mb-4 text-emerald-500'>Lógica (src/modulo-02/biblioteca.ts)</h4>
							<ul className='space-y-2 text-sm'>
								<li>• Função pura <code>calcularMulta(dias, preco)</code></li>
								<li>• Serviço <code>servicoBiblioteca</code> com buscar, emprestar e devolver.</li>
							</ul>
						</div>
						<div className='p-6 bg-white dark:bg-zinc-900 border-4 border-black dark:border-white'>
							<h4 className='font-black uppercase mb-4 text-amber-500'>Testes (src/modulo-02/biblioteca.test.ts)</h4>
							<ul className='space-y-2 text-sm'>
								<li>• Pelo menos 4 testes unitários para a multa.</li>
								<li>• Pelo menos 3 testes de integração para o serviço.</li>
							</ul>
						</div>
					</div>
					<p className='font-black text-2xl border-l-8 border-primary pl-6 py-4 bg-white dark:bg-black uppercase italic'>
						Identifique nos comentários do código qual tipo de teste é cada um!
					</p>
				</div>
			</Box>

			{/* FOOTER */}
			<div className='flex items-center justify-between border-t-8 border-black dark:border-white pt-12 pb-32 mb-20'>
				<p className='font-black uppercase text-2xl italic text-primary'>
					Conferência 2.3 — Fim
				</p>
				<p className='font-black uppercase text-2xl italic text-zinc-400'>
					Próxima: 2.4 — Primeira bateria de testes reais com Bun
				</p>
			</div>
		</>
	),
	ejercicios: [],
};
