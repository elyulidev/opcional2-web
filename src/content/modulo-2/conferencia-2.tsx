import type { ConferenciaData } from "../../types";
import { CodeBlock } from "../../components/CodeBlock";
import { Callout, Box } from "../../components/CourseComponents";

export const data: ConferenciaData = {
	titulo: "2.2 O ciclo de vida de um teste: Arrange, Act, Assert (AAA)",
	objetivos: [
		"Aplicar o padrão AAA de forma consciente e consistente em qualquer teste que escreva.",
		"Usar os hooks beforeEach, afterEach, beforeAll e afterAll para eliminar repetição nos testes.",
		"Explicar a diferença entre beforeEach e beforeAll com exemplos concretos.",
		"Identificar quando o estado compartilhado entre testes é um problema e como evitá-lo.",
		"Organizar suites de testes complexas de forma limpa e legível usando describe aninhado.",
		"Reconhecer os quatro estados possíveis de um teste: passou, falhou, pulado e pendente.",
	],
	contenido: (
		<>
			{/* METADATA DA CONFERÊNCIA */}
			<div className='flex flex-wrap gap-4 mb-10'>
				<span className='px-4 py-2 bg-zinc-900 text-white dark:bg-zinc-100 dark:text-black font-black uppercase text-sm brutalist-shadow'>
					⏱️ Duração: 1 Hora
				</span>
				<span className='px-4 py-2 bg-primary text-white font-black uppercase text-sm brutalist-shadow'>
					🔑 Pré-requisitos: Conferência 2.1 concluída
				</span>
			</div>

			{/* INTRODUÇÃO */}
			<Box className='bg-primary/10 border-black dark:border-white mb-16 p-10 shadow-[12px_12px_0px_0px_rgba(255,50,150,1)] dark:shadow-[12px_12px_0px_0px_rgba(255,50,150,0.5)]'>
				<h3 className='text-3xl font-black uppercase mb-6 text-primary flex items-center gap-3'>
					<span className='w-12 h-12 flex items-center justify-center bg-black text-white dark:bg-white dark:text-black rounded-full text-xl'>
						🔄
					</span>
					Introdução — O ciclo de vida completo
				</h3>
				<div className='space-y-4 text-lg leading-relaxed text-zinc-800 dark:text-zinc-200'>
					<p>
						Na conferência anterior aprendemos a anatomia de um único teste.
						Hoje vamos subir um nível e ver o que acontece quando temos muitos
						testes juntos.
					</p>
					<p>
						Quando você tem 5 testes que testam a mesma função, todos precisam
						de dados parecidos para começar. Escrever o mesmo setup em cada
						teste é tedioso, propenso a erros, e difícil de manter. Se o setup
						mudar, você tem de alterar 5 lugares.
					</p>
					<p className='font-black text-2xl py-6 px-8 border-l-8 border-primary bg-white dark:bg-zinc-900 shadow-brutalist uppercase italic tracking-tighter'>
						"Existe uma solução elegante para isso. Mas antes de apresentá-la,
						precisamos entender bem o padrão AAA com mais profundidade."
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
						O padrão AAA revisitado com profundidade
					</span>
				</h2>

				<div className='space-y-12'>
					<div>
						<h3 className='text-2xl font-black mb-6 uppercase border-l-8 border-primary pl-4'>
							Por que o Arrange é mais importante do que parece
						</h3>
						<p className='text-lg mb-8 leading-relaxed font-medium'>
							O Arrange não é apenas "declarar variáveis". É construir o cenário
							em que o teste vai ocorrer. Um cenário bem construído torna o
							teste claro. Um cenário mal construído esconde o que realmente
							está sendo testado.
						</p>

						<div className='grid grid-cols-1 xl:grid-cols-2 gap-8'>
							<Box className='bg-red-50 dark:bg-red-900/10 border-red-500'>
								<p className='text-red-500 font-bold uppercase mb-4'>
									❌ Arrange confuso — Ruído irrelevante
								</p>
								<CodeBlock
									language='typescript'
									code={`test("calcula o total do carrinho com desconto", () => {\n  const produto1 = { id: 1, nome: "Caderno", preco: 500, categoria: "papelaria", estoque: 10 };\n  const produto2 = { id: 2, nome: "Caneta", preco: 100, categoria: "papelaria", estoque: 50 };\n  const produto3 = { id: 3, nome: "Régua", preco: 200, categoria: "papelaria", estoque: 30 };\n  const cliente = { id: 42, nome: "Ana", email: "ana@email.com", vip: false, endereco: "Rua A" };\n  const carrinho = { cliente, produtos: [produto1, produto2, produto3], dataCriacao: new Date() };\n  const desconto = 10;\n\n  const total = calcularTotalComDesconto(carrinho.produtos, desconto);\n\n  expect(total).toBe(720);\n});`}
								/>
							</Box>
							<Box className='bg-green-50 dark:bg-green-900/10 border-green-500'>
								<p className='text-green-500 font-bold uppercase mb-4'>
									✅ Arrange limpo — Apenas o necessário
								</p>
								<CodeBlock
									language='typescript'
									code={`test("calcula o total do carrinho com desconto", () => {\n  const produtos = [\n    { preco: 500 },\n    { preco: 100 },\n    { preco: 200 },\n  ];\n  const desconto = 10; // 10%\n\n  const total = calcularTotalComDesconto(produtos, desconto);\n\n  expect(total).toBe(720); // 800 - 10% = 720\n});`}
								/>
							</Box>
						</div>

						<Callout
							type='tip'
							title='Regra de ouro do Arrange'
							className='mt-8'
						>
							Inclua apenas os dados que são relevantes para o comportamento que
							está sendo testado. O resto é ruído que distrai o leitor.
						</Callout>
					</div>

					<div>
						<h3 className='text-2xl font-black mb-6 uppercase border-l-8 border-secondary pl-4 text-secondary'>
							O Act deve ser uma única linha
						</h3>
						<p className='text-lg mb-8 leading-relaxed font-medium'>
							O Act deve ser, idealmente, uma única chamada de função. Se o seu
							Act tem 3 ou 4 linhas, é sinal de que o teste está verificando
							demais, ou que a função foi mal projetada.
						</p>

						<div className='grid grid-cols-1 xl:grid-cols-2 gap-8'>
							<div className='space-y-4'>
								<p className='font-bold text-red-500 uppercase'>
									❌ Múltiplas ações
								</p>
								<CodeBlock
									language='typescript'
									code={`test("processa pedido", () => {\n  const pedido = criarPedido(produtos);\n\n  // Act tem 4 linhas — qual delas está sendo verificada?\n  validarPedido(pedido);\n  calcularFrete(pedido);\n  aplicarDesconto(pedido);\n  const resultado = finalizarPedido(pedido);\n\n  expect(resultado.status).toBe("confirmado");\n});`}
								/>
							</div>
							<div className='space-y-4'>
								<p className='font-bold text-green-500 uppercase'>
									✅ Ação única e focada
								</p>
								<CodeBlock
									language='typescript'
									code={`test("finalizar pedido retorna status confirmado", () => {\n  const pedido = criarPedidoJaProcessado(); // o Arrange faz a preparação\n\n  const resultado = finalizarPedido(pedido); // Act é uma linha\n\n  expect(resultado.status).toBe("confirmado");\n});`}
								/>
							</div>
						</div>
					</div>

					<div>
						<h3 className='text-2xl font-black mb-6 uppercase border-l-8 border-primary pl-4'>
							O Assert deve ser verificável por um humano
						</h3>
						<p className='text-lg mb-8 leading-relaxed font-medium'>
							O Assert deve ser tão claro que qualquer pessoa — mesmo sem
							conhecer o código — entenda o que está sendo verificado.
						</p>

						<div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
							<Box className='border-red-500 bg-red-50/50 dark:bg-red-950/10'>
								<p className='font-bold text-red-500 mb-2 uppercase'>
									❌ Assert obscuro
								</p>
								<div className='p-4 bg-zinc-900 text-white font-mono rounded'>
									expect(resultado).toBe(2592000000);
								</div>
								<p className='mt-2 text-sm italic opacity-70'>
									O que significa este número?
								</p>
							</Box>
							<Box className='border-green-500 bg-green-50/50 dark:bg-green-950/10'>
								<p className='font-bold text-green-500 mb-2 uppercase'>
									✅ Assert claro
								</p>
								<div className='p-4 bg-zinc-900 text-white font-mono rounded'>
									const TRINTA_DIAS_EM_MS = 30 * 24 * 60 * 60 * 1000;
									<br />
									expect(resultado).toBe(TRINTA_DIAS_EM_MS);
								</div>
								<p className='mt-2 text-sm italic opacity-70'>
									Agora tem contexto e significado.
								</p>
							</Box>
						</div>
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
						O problema da repetição
					</span>
				</h2>

				<p className='text-lg mb-8 leading-relaxed font-medium'>
					Imagine que precisamos testar um sistema de carrinho de compras. Sem
					reutilização de setup, os nossos testes tornam-se redundantes.
				</p>

				<div className='grid grid-cols-1 xl:grid-cols-2 gap-10'>
					<div className='space-y-6'>
						<h3 className='text-xl font-black uppercase text-secondary underline'>
							Ficheiro de Lógica
						</h3>
						<CodeBlock
							language='typescript'
							code={`// src/modulo-01/carrinho.ts\n\nexport interface Produto {\n  nome: string;\n  preco: number;\n  quantidade: number;\n}\n\nexport interface Carrinho {\n  produtos: Produto[];\n}\n\nexport function adicionarProduto(carrinho: Carrinho, produto: Produto): Carrinho {\n  const existe = carrinho.produtos.find(p => p.nome === produto.nome);\n  if (existe) {\n    return {\n      produtos: carrinho.produtos.map(p =>\n        p.nome === produto.nome\n          ? { ...p, quantidade: p.quantidade + produto.quantidade }\n          : p\n      )\n    };\n  }\n  return { produtos: [...carrinho.produtos, produto] };\n}\n\nexport function removerProduto(carrinho: Carrinho, nomeProduto: string): Carrinho {\n  return { produtos: carrinho.produtos.filter(p => p.nome !== nomeProduto) };\n}\n\nexport function calcularTotal(carrinho: Carrinho): number {\n  return carrinho.produtos.reduce((total, p) => total + (p.preco * p.quantidade), 0);\n}\n\nexport function contarItens(carrinho: Carrinho): number {\n  return carrinho.produtos.reduce((total, p) => total + p.quantidade, 0);\n}`}
						/>
					</div>
					<div className='space-y-6'>
						<h3 className='text-xl font-black uppercase text-red-500 underline'>
							Versão Repetitiva (RUIM)
						</h3>
						<CodeBlock
							language='typescript'
							code={`import { expect, test } from "bun:test";\nimport { calcularTotal, contarItens, removerProduto } from "./carrinho";\n\ntest("calcula o total corretamente", () => {\n  const carrinho = { produtos: [\n    { nome: "Caderno", preco: 500, quantidade: 2 },\n    { nome: "Caneta", preco: 100, quantidade: 3 },\n  ]};\n  expect(calcularTotal(carrinho)).toBe(1300);\n});\n\ntest("conta os itens corretamente", () => {\n  const carrinho = { produtos: [\n    { nome: "Caderno", preco: 500, quantidade: 2 },\n    { nome: "Caneta", preco: 100, quantidade: 3 },\n  ]};\n  expect(contarItens(carrinho)).toBe(5);\n});\n\ntest("remove produto do carrinho", () => {\n  const carrinho = { produtos: [\n    { nome: "Caderno", preco: 500, quantidade: 2 },\n    { nome: "Caneta", preco: 100, quantidade: 3 },\n  ]};\n  const resultado = removerProduto(carrinho, "Caderno");\n  expect(resultado.produtos).toHaveLength(1);\n});`}
						/>
					</div>
				</div>

				<Box className='bg-primary text-white border-zinc-900 mt-12'>
					<p className='text-xl font-black uppercase italic'>
						"Se o formato do Produto mudar, você terá de alterar 3, 20 ou 30
						lugares. A solução? Hooks de ciclo de vida."
					</p>
				</Box>
			</section>

			{/* PARTE 3 */}
			<section className='mb-24 relative'>
				<div className='absolute -left-16 top-0 hidden xl:block'>
					<span className='text-8xl font-black text-black/5 dark:text-white/5 select-none'>
						03
					</span>
				</div>
				<h2 className='text-4xl font-black uppercase mb-12 flex items-center gap-4'>
					<span className='px-4 py-2 bg-black text-white dark:bg-white dark:text-black'>
						PARTE 3
					</span>
					<span className='border-b-8 border-primary'>
						Os hooks: beforeEach, afterEach, beforeAll...
					</span>
				</h2>

				<p className='text-lg mb-10 leading-relaxed font-medium'>
					Hooks são funções especiais que o Bun executa automaticamente em
					momentos específicos do ciclo de vida dos testes.
				</p>

				<div className='space-y-16'>
					<div>
						<h3 className='text-2xl font-black mb-6 uppercase border-l-8 border-primary pl-4'>
							beforeEach — Executado antes de cada teste
						</h3>
						<CodeBlock
							language='typescript'
							code={`import { expect, test, describe, beforeEach } from "bun:test";\nimport { adicionarProduto, removerProduto, calcularTotal, contarItens, Carrinho } from "./carrinho";\n\ndescribe("Carrinho de compras", () => {\n\n  let carrinho: Carrinho;\n\n  beforeEach(() => {\n    // Cada teste começa com um carrinho fresco\n    carrinho = {\n      produtos: [\n        { nome: "Caderno", preco: 500, quantidade: 2 },\n        { nome: "Caneta", preco: 100, quantidade: 3 },\n      ]\n    };\n  });\n\n  test("calcula o total corretamente", () => {\n    expect(calcularTotal(carrinho)).toBe(1300);\n  });\n\n  test("conta os itens corretamente", () => {\n    expect(contarItens(carrinho)).toBe(5);\n  });\n});`}
						/>
						<Callout type='warning' title='Ponto Crítico' className='mt-6'>
							O <code>beforeEach</code> recria o estado **antes de cada teste**.
							Isso garante isolamento total. Se um teste modifica o objeto, o
							próximo teste não será afetado.
						</Callout>
					</div>

					<div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
						<Box className='border-secondary h-full'>
							<h4 className='text-xl font-black uppercase mb-4 text-secondary'>
								afterEach
							</h4>
							<p className='text-lg mb-4'>
								Executado depois de cada teste. Ideal para **limpeza
								(cleanup)**.
							</p>
							<ul className='list-disc list-inside space-y-2 font-medium'>
								<li>Fechar conexões</li>
								<li>Limpar ficheiros temporários</li>
								<li>Resetar mocks ou contadores</li>
							</ul>
						</Box>
						<Box className='border-primary h-full'>
							<h4 className='text-xl font-black uppercase mb-4 text-primary'>
								beforeAll & afterAll
							</h4>
							<p className='text-lg mb-4'>
								Executados **uma única vez** (no início e no fim da suite).
							</p>
							<p className='text-sm italic opacity-70'>
								Útil para operações caras: inicializar servidores, carregar
								bases de dados gigantes, etc.
							</p>
						</Box>
					</div>

					<Box className='bg-zinc-950 text-white p-10'>
						<h3 className='text-2xl font-black uppercase text-primary mb-6 italic tracking-tight'>
							O ciclo de vida visualizado
						</h3>
						<div className='font-mono text-lg space-y-2 border-l-4 border-zinc-700 pl-6'>
							<p className='text-zinc-500'>beforeAll ─ Executa 1 vez</p>
							<p className='pl-4 text-primary'>
								beforeEach ─ Executa para Teste 1
							</p>
							<p className='pl-8 text-white'>test("Teste 1")</p>
							<p className='pl-4 text-secondary'>
								afterEach ─ Executa para Teste 1
							</p>
							<p className='pl-4 text-primary'>
								beforeEach ─ Executa para Teste 2
							</p>
							<p className='pl-8 text-white'>test("Teste 2")</p>
							<p className='pl-4 text-secondary'>
								afterEach ─ Executa para Teste 2
							</p>
							<p className='text-zinc-500'>afterAll ─ Executa 1 vez</p>
						</div>
					</Box>
				</div>
			</section>

			{/* PARTE 4 */}
			<section className='mb-24'>
				<h2 className='text-4xl font-black uppercase mb-12 flex items-center gap-4'>
					<span className='px-4 py-2 bg-black text-white dark:bg-white dark:text-black'>
						PARTE 4
					</span>
					<span className='border-b-8 border-secondary'>
						Describe aninhado: Organização de Elite
					</span>
				</h2>
				<p className='text-lg mb-8 leading-relaxed font-medium'>
					Podemos aninhar blocos <code>describe</code> para criar uma hierarquia
					clara que se lê como frases em linguagem natural.
				</p>

				<CodeBlock
					language='typescript'
					code={`describe("autenticar", () => {\n  let usuario: Usuario;\n  beforeEach(() => { /* setup base */ });\n\n  describe("quando a senha está correta", () => {\n    test("retorna 'autenticado'", () => { ... });\n    test("zera as tentativas falhadas", () => { ... });\n  });\n\n  describe("quando a senha está incorreta", () => {\n    test("incrementa as tentativas falhadas", () => { ... });\n    test("bloqueia a conta após 3 erros", () => { ... });\n  });\n\n  describe("quando a conta está bloqueada", () => {\n    beforeEach(() => { usuario.bloqueado = true; });\n    test("impede o login mesmo com senha correta", () => { ... });\n  });\n});`}
				/>

				<Box className='mt-8 bg-zinc-100 dark:bg-zinc-800 border-none p-8'>
					<p className='text-lg font-black uppercase mb-4 text-primary italic'>
						Saída no terminal:
					</p>
					<div className='space-y-1 font-mono text-sm'>
						<p className='text-green-500'>
							✓ autenticar &gt; quando a senha está correta &gt; retorna
							'autenticado'
						</p>
						<p className='text-green-500'>
							✓ autenticar &gt; quando a senha está correta &gt; zera as
							tentativas falhadas
						</p>
						<p className='text-green-500'>
							✓ autenticar &gt; quando a conta está bloqueada &gt; impede o
							login...
						</p>
					</div>
					<p className='mt-6 text-sm font-medium italic'>
						"Lê-se como documentação viva. É o que chamamos de BDD (Behavior
						Driven Development) em pequena escala."
					</p>
				</Box>
			</section>

			{/* PARTE 5 */}
			<section className='mb-24'>
				<h2 className='text-4xl font-black uppercase mb-12 flex items-center gap-4'>
					<span className='px-4 py-2 bg-black text-white dark:bg-white dark:text-black'>
						PARTE 5
					</span>
					<span className='border-b-8 border-primary'>
						Os quatro estados de um teste
					</span>
				</h2>

				<div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
					<div className='space-y-4'>
						<h4 className='text-xl font-black uppercase text-green-500'>
							1. Passou ✓
						</h4>
						<p className='text-lg font-medium'>
							As expectativas foram cumpridas.
						</p>
					</div>
					<div className='space-y-4'>
						<h4 className='text-xl font-black uppercase text-red-500'>
							2. Falhou ✗
						</h4>
						<p className='text-lg font-medium'>
							Ocorreu um erro ou a expectativa não bateu.
						</p>
					</div>
					<div className='space-y-4 p-6 border-4 border-zinc-400 bg-zinc-100 dark:bg-zinc-900'>
						<h4 className='text-xl font-black uppercase text-zinc-500 italic'>
							3. Pulado (Skipped)
						</h4>
						<CodeBlock
							language='typescript'
							code={`test.skip("...", () => { ... });`}
						/>
						<p className='text-sm'>
							Para desativar temporariamente sem apagar o código. Use com
							cautela!
						</p>
					</div>
					<div className='space-y-4 p-6 border-4 border-primary bg-primary/5'>
						<h4 className='text-xl font-black uppercase text-primary italic'>
							4. Pendente (Todo)
						</h4>
						<CodeBlock
							language='typescript'
							code={`test.todo("deve rejeitar emails inválidos");`}
						/>
						<p className='text-sm'>
							Excelente para planejar o trabalho antes de começar a codificar.
						</p>
					</div>
				</div>
			</section>

			{/* PARTE 6 */}
			<section className='mb-24 relative overflow-hidden'>
				<div className='absolute right-0 top-0 text-[20rem] font-black text-red-500/5 -z-10 rotate-12'>
					!
				</div>
				<h2 className='text-4xl font-black uppercase mb-12 flex items-center gap-4'>
					<span className='px-4 py-2 bg-red-500 text-white'>PERIGO</span>
					<span className='border-b-8 border-red-500'>
						O perigo do estado partilhado
					</span>
				</h2>

				<div className='grid grid-cols-1 xl:grid-cols-2 gap-10'>
					<div className='space-y-6'>
						<h3 className='text-xl font-black uppercase text-red-500 flex items-center gap-2'>
							<span>❌ O Pesadelo</span>
						</h3>
						<CodeBlock
							language='typescript'
							code={`describe("carrinho", () => {\n  // ERRO: Criado UMA VEZ para todos\n  const carrinho = { produtos: [] };\n\n  test("teste 1", () => {\n    carrinho.produtos.push("X");\n    expect(carrinho.produtos).toHaveLength(1);\n  });\n\n  test("teste 2", () => {\n    // FALHA! O carrinho já tem "X"\n    expect(carrinho.produtos).toHaveLength(0);\n  });\n});`}
						/>
						<p className='text-sm italic text-red-600 dark:text-red-400'>
							Este bug é frustrante: o Teste 2 falha por causa da sujeira do
							Teste 1.
						</p>
					</div>
					<div className='space-y-6'>
						<h3 className='text-xl font-black uppercase text-green-500 flex items-center gap-2'>
							<span>✅ A Salvação</span>
						</h3>
						<CodeBlock
							language='typescript'
							code={`describe("carrinho", () => {\n  let carrinho;\n\n  beforeEach(() => {\n    // Recriado ANTES DE CADA UM\n    carrinho = { produtos: [] };\n  });\n\n  test("teste 1", () => { ... });\n  test("teste 2", () => {\n    // PASSA! Carrinho está vazio e novo\n    expect(carrinho.produtos).toHaveLength(0);\n  });\n});`}
						/>
						<p className='text-sm italic text-green-600 dark:text-green-400'>
							Isolamento total. A ordem dos testes deixa de importar.
						</p>
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
						"AAA Profundo — Arrange mínimo e relevante, Act de uma linha, Assert autoexplicativo.",
						"Hooks — beforeEach garante que cada teste comece com a 'ficha limpa'.",
						"beforeAll vs beforeEach — Use All para conexões pesadas e Each para isolamento de dados.",
						"Hierarquia — Describe aninhado transforma testes em documentação legível.",
						"Estados — Skipped para dívida técnica, Todo para planejamento e ✗ para falhas.",
						"Fuga de Estado — Nunca compartilhe variáveis mutáveis entre testes sem resetá-las.",
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
					<span className='text-6xl animate-bounce'>🏦</span>
				</h3>
				<div className='space-y-8 text-xl font-medium leading-relaxed text-zinc-800 dark:text-zinc-200'>
					<p>
						Crie o arquivo <code>src/modulo-02/banco.ts</code> com a seguinte
						classe:
					</p>
					<CodeBlock
						language='typescript'
						code={`export class ContaBancaria {\n  private saldo: number;\n  readonly titular: string;\n\n  constructor(titular: string, saldoInicial: number) { ... }\n\n  depositar(valor: number): void { ... }      // lança erro se valor <= 0\n  levantar(valor: number): void { ... }       // lança erro se saldo insuficiente\n                                              // lança erro se valor <= 0\n  getSaldo(): number { ... }\n  getTitular(): string { ... }\n}`}
					/>
					<p className='font-black text-2xl border-l-8 border-primary pl-6 py-4 bg-white dark:bg-black uppercase italic'>
						Implemente a classe e crie src/modulo-02/banco.test.ts usando:
					</p>
					<ul className='space-y-4'>
						<li className='flex gap-4'>
							<span className='text-primary font-black'>•</span>
							<code>beforeEach</code> para criar uma conta fresca antes de cada
							teste.
						</li>
						<li className='flex gap-4'>
							<span className='text-primary font-black'>•</span>
							<code>describe</code> aninhado para cenários: "ao depositar", "ao
							levantar", "saldo insuficiente".
						</li>
						<li className='flex gap-4'>
							<span className='text-primary font-black'>•</span>
							Pelo menos 2 testes em cada cenário.
						</li>
						<li className='flex gap-4'>
							<span className='text-primary font-black'>•</span>
							Pelo menos 1 uso de <code>test.todo</code> para futuras
							funcionalidades.
						</li>
					</ul>
				</div>
			</Box>

			{/* FOOTER */}
			<div className='flex items-center justify-between border-t-8 border-black dark:border-white pt-12 pb-32 mb-20'>
				<p className='font-black uppercase text-2xl italic text-primary'>
					Conferência 2.2 — Fim
				</p>
				<p className='font-black uppercase text-2xl italic text-zinc-400'>
					Próxima: 2.3 — Tipos de testes: unitários, de integração e E2E
				</p>
			</div>
		</>
	),
	ejercicios: [],
};
