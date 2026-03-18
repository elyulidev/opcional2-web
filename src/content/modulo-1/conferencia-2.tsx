import type { ConferenciaData } from "../../types";
import { CodeBlock } from "../../components/CodeBlock";
import { Callout, Box } from "../../components/CourseComponents";

export const data: ConferenciaData = {
	titulo: "1.2 Instalação e configuração do ambiente com Bun",
	objetivos: [
		"Instalar o Bun corretamente no seu sistema operativo (Linux, macOS ou Windows) e verificar a instalação com bun --version.",
		"Criar um projeto TypeScript do zero usando bun init e compreender cada arquivo gerado (package.json, tsconfig.json, .gitignore).",
		"Configurar o tsconfig.json com as opções essenciais para o curso (strict, bun-types).",
		"Organizar a estrutura de pastas de um projeto de testes seguindo as convenções do curso.",
		"Escrever um arquivo de teste .test.ts básico com describe, test e expect, e executá-lo com bun test.",
		"Usar os principais flags do comando bun test: --watch, --coverage, --test-name-pattern e --reporter verbose.",
		"Configurar scripts de conveniência no package.json para os fluxos de trabalho mais comuns.",
	],
	contenido: (
		<>
			{/* INTRODUÇÃO */}
			<Box className='bg-primary/10 border-black dark:border-white mb-16 p-10 shadow-[12px_12px_0px_0px_rgba(255,50,150,1)] dark:shadow-[12px_12px_0px_0px_rgba(255,50,150,0.5)]'>
				<h3 className='text-3xl font-black uppercase mb-6 text-primary flex items-center gap-3'>
					<span className='w-12 h-12 flex items-center justify-center bg-black text-white dark:bg-white dark:text-black rounded-full text-xl'>
						📝
					</span>
					Introdução — Antes de cozinhar, prepare a cozinha
				</h3>
				<div className='space-y-4 text-lg leading-relaxed text-zinc-800 dark:text-zinc-200'>
					<p>
						Na conferência anterior, entendemos por que testar é fundamental.
						Agora vamos preparar o nosso ambiente de trabalho.
					</p>
					<p>
						Pense assim: um cozinheiro profissional, antes de preparar qualquer
						prato, organiza a cozinha. Coloca as facas no lugar certo, verifica
						se o fogão funciona, separa os ingredientes. Se a cozinha estiver
						desorganizada, mesmo o melhor cozinheiro vai produzir um prato ruim.
					</p>
					<p>
						O mesmo vale para programação. Um ambiente bem configurado elimina
						obstáculos desnecessários e permite que você se concentre no que
						importa: escrever código e testes de qualidade.
					</p>
				</div>
				<div className='mt-8 pt-6 border-t-4 border-black/10 dark:border-white/10'>
					<p className='font-black mb-4 uppercase text-sm tracking-widest text-primary'>
						Nesta conferência vamos:
					</p>
					<ul className='grid grid-cols-1 md:grid-cols-2 gap-3'>
						{[
							"Instalar o Bun no sistema",
							"Criar o nosso primeiro projeto",
							"Entender a estrutura de pastas",
							"Executar o primeiro teste real juntos",
						].map((item, i) => (
							<li key={i} className='flex items-center gap-2 font-bold group'>
								<span className='w-6 h-6 flex items-center justify-center bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 text-xs rounded-sm group-hover:bg-primary transition-colors'>
									{i + 1}
								</span>
								{item}
							</li>
						))}
					</ul>
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
					<span className='border-b-8 border-primary'>O que é o Bun?</span>
				</h2>
				<p className='text-xl mb-10 font-medium text-zinc-700 dark:text-zinc-300'>
					Na conferência anterior dissemos que Bun é um{" "}
					<span className='bg-primary/20 dark:bg-primary/40 px-1'>
						"runtime, bundler, gestor de pacotes e test runner"
					</span>
					. Vamos entender o que isso significa na prática.
				</p>

				<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					{[
						{
							title: "Runtime",
							desc: "Significa que o Bun executa código JavaScript e TypeScript diretamente. Assim como o Node.js, mas muito mais rápido. Quando você digita bun arquivo.ts, o Bun lê o TypeScript, compila internamente e executa — tudo em milissegundos, sem configuração.",
							color: "border-blue-500",
						},
						{
							title: "Bundler",
							desc: "Significa que o Bun consegue pegar vários arquivos do seu projeto e juntá-los num único arquivo otimizado para produção, como o Webpack ou Vite fazem — mas integrado, sem instalar nada extra.",
							color: "border-purple-500",
						},
						{
							title: "Gestor de pacotes",
							desc: "Significa que o Bun substitui o npm e o yarn. Em vez de npm install, usamos bun install. É drasticamente mais rápido — instala dependências de um projeto Node.js típico em 2 a 3 segundos, comparado com 30 a 60 segundos do npm.",
							color: "border-green-500",
						},
						{
							title: "Test runner",
							desc: "Significa que o Bun tem um sistema de testes embutido chamado bun:test, compatível com a API do Jest. É o que vamos usar durante todo este curso.",
							color: "border-amber-500",
						},
					].map((item) => (
						<Box
							key={item.title}
							className={`border-4 ${item.color} hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)] transition-all bg-white dark:bg-zinc-900`}
						>
							<h4 className='text-xl font-black uppercase mb-3 flex items-center justify-between'>
								{item.title}
								<span
									className={`w-3 h-3 rounded-full ${item.color.replace("border-", "bg-")}`}
								/>
							</h4>
							<p className='text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium'>
								{item.desc}
							</p>
						</Box>
					))}
				</div>
				<Box className='mt-8 bg-pink-500 text-white dark:bg-pink-500 dark:text-black border-none text-center py-6'>
					<p className='text-2xl font-black uppercase'>
						Tudo isso num único binário. Instala uma vez, tem tudo.
					</p>
				</Box>
			</section>

			{/* PARTE 2 */}
			<section className='mb-24'>
				<h2 className='text-4xl font-black uppercase mb-12 flex items-center gap-4'>
					<span className='px-4 py-2 bg-black text-white dark:bg-white dark:text-black'>
						PARTE 2
					</span>
					<span className='border-b-8 border-secondary'>Instalação</span>
				</h2>

				<div className='space-y-12'>
					<div className='group'>
						<h3 className='text-2xl font-black mb-6 flex items-center gap-3'>
							<span className='w-12 h-12 flex items-center justify-center bg-zinc-200 dark:bg-zinc-800 rounded-lg'>
								🍎
							</span>
							No Linux e macOS
						</h3>
						<p className='mb-4 font-medium'>
							Abra o terminal e execute este único comando:
						</p>
						<CodeBlock
							language='bash'
							code='curl -fsSL https://bun.sh/install | bash'
						/>

						<div className='mt-8'>
							<p className='mb-4 text-zinc-500 font-bold uppercase text-xs tracking-widest'>
								Aguarde a instalação terminar. Vai ver algo como:
							</p>
							<Box className='relative p-0 overflow-hidden border-4 border-black dark:border-white shadow-brutalist'>
								<div className='bg-zinc-800 dark:bg-zinc-950 p-2 flex items-center gap-2 border-b-2 border-black dark:border-white'>
									<div className='flex gap-1.5'>
										<div className='w-3 h-3 rounded-full bg-red-500' />
										<div className='w-3 h-3 rounded-full bg-yellow-500' />
										<div className='w-3 h-3 rounded-full bg-green-500' />
									</div>
									<span className='text-[10px] text-zinc-400 font-mono flex-1 text-center'>
										terminal — bash
									</span>
								</div>
								<div className='p-6 bg-black text-green-400 font-mono text-sm leading-relaxed'>
									########################################################################
									100.0%
									<br />
									bun was installed successfully to ~/.bun/bin/bun
									<br />
									<br />
									<span className='text-blue-400'>
										Added "~/.bun/bin" to $PATH in "~/.bashrc"
									</span>
									<br />
									<br />
									To get started, run:
									<br />
									&nbsp;&nbsp;exec /bin/bash
									<br />
									&nbsp;&nbsp;bun --version
								</div>
							</Box>
						</div>
						<p className='mt-8 mb-4 font-medium'>
							Depois, feche o terminal e abra novamente (ou execute{" "}
							<code>exec /bin/bash</code> como sugerido). Então verifique a
							instalação:
						</p>
						<CodeBlock language='bash' code='bun --version' />
					</div>

					<div className='pt-12 border-t-8 border-black dark:border-white border-dashed'>
						<h3 className='text-2xl font-black mb-6 flex items-center gap-3'>
							<span className='w-12 h-12 flex items-center justify-center bg-zinc-200 dark:bg-zinc-800 rounded-lg'>
								🪟
							</span>
							No Windows
						</h3>
						<p className='mb-4 font-medium'>
							No Windows, a instalação é feita pelo PowerShell. Abra o
							PowerShell como administrador e execute:
						</p>
						<CodeBlock
							language='powershell'
							code='powershell -c "irm bun.sh/install.ps1 | iex"'
						/>
						<p className='mt-6 mb-4 font-medium'>
							Depois feche e abra novamente o PowerShell e verifique:
						</p>
						<CodeBlock language='powershell' code='bun --version' />
						<Callout type='tip' title='Recomendação importante para Windows'>
							Use o Windows Subsystem for Linux (WSL2) sempre que possível. O
							Bun funciona no Windows nativo, mas o WSL2 oferece melhor
							compatibilidade e performance. Se a sua máquina permitir,
							configure o WSL2 com Ubuntu.
						</Callout>
					</div>

					<Box className='bg-primary/5 border-primary p-8'>
						<h3 className='text-xl font-black mb-4 uppercase'>
							Verificando a instalação completa
						</h3>
						<p className='mb-6 italic font-medium'>
							Após instalar, vamos confirmar que tudo está a funcionar. Execute:
						</p>
						<CodeBlock
							language='bash'
							code={`bun --version      # versão do runtime\nbun pm --version   # versão do gestor de pacotes (mesmo binário)`}
						/>
						<div className='mt-6 p-4 bg-zinc-100 dark:bg-zinc-800 border-2 border-black dark:border-white font-mono text-sm inline-block'>
							<p>Resultado esperado:</p>
							<p className='text-primary font-bold'>1.x.x</p>
							<p className='text-primary font-bold'>1.x.x</p>
						</div>
					</Box>
				</div>
			</section>

			{/* PARTE 3 */}
			<section className='mb-24'>
				<h2 className='text-4xl font-black uppercase mb-8 flex items-center gap-4'>
					<span className='px-4 py-2 bg-black text-white dark:bg-white dark:text-black'>
						PARTE 3
					</span>
					<span className='border-b-8 border-zinc-900 dark:border-zinc-100'>
						Criando o primeiro projeto
					</span>
				</h2>
				<p className='text-lg mb-8 font-medium'>
					Agora vamos criar o projeto que usaremos durante todo o curso. Pense
					nisto como criar a pasta da disciplina.
				</p>
				<CodeBlock
					language='bash'
					code={`# Cria a pasta do projeto\nmkdir curso-testing-bun\n\n# Entra na pasta\ncd curso-testing-bun\n\n# Inicializa o projeto com Bun\nbun init`}
				/>
				<div className='mt-10'>
					<p className='mb-4 font-black uppercase text-sm text-primary'>
						O comando bun init vai fazer algumas perguntas:
					</p>
					<Box className='bg-zinc-900 text-zinc-300 p-8 font-mono text-sm leading-relaxed border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]'>
						<span className='text-zinc-500 capitalize'>
							bun init helps you get started with a minimal project and tries to
						</span>
						<br />
						<span className='text-zinc-500 capitalize'>
							guess sensible defaults. Press ^C anytime to quit.
						</span>
						<br />
						<br />
						package name (curso-testing-bun):{" "}
						<span className='text-white'>
							[pressione Enter — aceita o nome]
						</span>
						<br />
						entry point (index.ts):{" "}
						<span className='text-white'>
							[pressione Enter — aceita index.ts]
						</span>
						<br />
						<br />
						<span className='text-green-400 font-bold'>Done!</span> A
						package.json file was created.
						<br />
						&nbsp;&nbsp;<span className='text-blue-400'>+</span> index.ts
						<br />
						&nbsp;&nbsp;<span className='text-blue-400'>+</span> .gitignore
						<br />
						&nbsp;&nbsp;<span className='text-blue-400'>+</span> tsconfig.json
						<br />
						&nbsp;&nbsp;<span className='text-blue-400'>+</span> README.md
					</Box>
				</div>

				<div className='mt-12'>
					<Box className='bg-zinc-50 dark:bg-zinc-900 border-4 border-black dark:border-white p-10'>
						<h4 className='text-xl font-black mb-6 uppercase border-l-8 border-primary pl-4'>
							Estrutura do Projeto (File Tree)
						</h4>
						<div className='font-mono text-lg space-y-2 text-zinc-700 dark:text-zinc-300'>
							<div className='flex items-center gap-3'>
								<span className='text-primary'>📂</span> curso-testing-bun/
							</div>
							<div className='flex items-center gap-3 pl-8'>
								<span className='text-zinc-400'>├──</span>
								<span className='bg-primary/10 px-2'>index.ts</span>
								<span className='text-sm text-zinc-500'>
									← ponto de entrada da aplicação
								</span>
							</div>
							<div className='flex items-center gap-3 pl-8'>
								<span className='text-zinc-400'>├──</span>
								<span className='bg-zinc-100 dark:bg-zinc-800 px-2 font-bold'>
									package.json
								</span>
								<span className='text-sm text-zinc-500'>
									← configuração do projeto e dependências
								</span>
							</div>
							<div className='flex items-center gap-3 pl-8'>
								<span className='text-zinc-400'>├──</span>
								<span className='bg-zinc-100 dark:bg-zinc-800 px-2'>
									tsconfig.json
								</span>
								<span className='text-sm text-zinc-500'>
									← configuração do TypeScript
								</span>
							</div>
							<div className='flex items-center gap-3 pl-8'>
								<span className='text-zinc-400'>├──</span> .gitignore{" "}
								<span className='text-sm text-zinc-500'>
									← arquivos que o Git deve ignorar
								</span>
							</div>
							<div className='flex items-center gap-3 pl-8'>
								<span className='text-zinc-400'>└──</span> README.md{" "}
								<span className='text-sm text-zinc-500'>
									← documentação do projeto
								</span>
							</div>
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
					<span className='border-b-8 border-primary'>O package.json</span>
				</h2>
				<p className='text-lg mb-8'>
					Abra o arquivo package.json que foi criado. Vai ver algo assim:
				</p>
				<CodeBlock
					language='json'
					code={`{
  "name": "curso-testing-bun",
  "version": "1.0.0",
  "scripts": {
    "test": "bun test"
  },
  "devDependencies": {
    "@types/bun": "latest"
  },
  "peerDependencies": {
    "typescript": "^5.0.0"
  }
}`}
				/>
				<Box className='mt-10 bg-zinc-50 dark:bg-zinc-900 border-none'>
					<h4 className='font-black uppercase mb-6 text-primary tracking-tighter text-2xl'>
						Vamos entender cada parte:
					</h4>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
						{[
							{
								label: "name",
								desc: "O nome do projeto. Apenas identificação.",
							},
							{
								label: "version",
								desc: "A versão atual do projeto. Começa em 1.0.0 por convenção.",
							},
							{
								label: "scripts",
								desc: 'Atalhos de comandos. O "test": "bun test" significa que quando você digitar bun run test no terminal, o Bun vai executar bun test. Conveniente.',
							},
							{
								label: "devDependencies",
								desc: "Dependências que só existem durante o desenvolvimento, não vão para produção. O @types/bun dá ao TypeScript informações sobre os tipos do Bun.",
							},
						].map((item) => (
							<div
								key={item.label}
								className='flex flex-col gap-4 p-4 border-l-4 border-black dark:border-white'
							>
								<div className='font-black text-primary font-mono bg-primary/10 px-2 self-start'>
									{item.label}
								</div>
								<p className='text-sm font-medium leading-relaxed uppercase italic'>
									— {item.desc}
								</p>
							</div>
						))}
					</div>
				</Box>
			</section>

			{/* PARTE 5 */}
			<section className='mb-24'>
				<h2 className='text-4xl font-black uppercase mb-8 flex items-center gap-4'>
					<span className='px-4 py-2 bg-black text-white dark:bg-white dark:text-black'>
						PARTE 5
					</span>
					<span className='border-b-8 border-secondary'>Organização</span>
				</h2>
				<p className='text-lg mb-8 italic text-zinc-600 dark:text-zinc-400 font-medium'>
					Vamos criar uma estrutura organizada que usaremos durante todo o
					curso. Cada módulo terá a sua própria pasta:
				</p>
				<CodeBlock
					language='bash'
					code={`mkdir -p src/modulo-01 src/modulo-02 src/modulo-03`}
				/>
				<div className='mt-12'>
					<Box className='border-black dark:border-white p-8 relative overflow-hidden bg-white dark:bg-zinc-950'>
						<div className='absolute right-0 top-0 w-32 h-32 bg-secondary opacity-10 blur-3xl rounded-full' />
						<h4 className='font-black uppercase mb-8 text-xl tracking-widest'>
							A estrutura completa ficará assim:
						</h4>
						<div className='font-mono text-zinc-700 dark:text-zinc-300 space-y-1 text-lg'>
							<p className='flex items-center gap-2'>
								<span className='text-secondary'>📂</span> curso-testing-bun/
							</p>
							<p className='flex items-center gap-2 pl-6'>
								<span className='text-zinc-400'>└──</span>{" "}
								<span className='text-primary'>📂</span> src/
							</p>
							{[
								["modulo-01", "fundamentos do testing"],
								["modulo-02", "mocking"],
								["modulo-03", "testes assíncronos"],
							].map(([folder, info]) => (
								<p key={folder} className='flex items-center gap-2 pl-12'>
									<span className='text-zinc-400'>├──</span>{" "}
									<span className='px-2 bg-zinc-100 dark:bg-zinc-800 font-bold'>
										{folder}/
									</span>
									<span className='text-sm opacity-50 italic'>← {info}</span>
								</p>
							))}
							<p className='flex items-center gap-2 pl-6'>
								<span className='text-zinc-400'>├──</span> index.ts
							</p>
							<p className='flex items-center gap-2 pl-6'>
								<span className='text-zinc-400'>├──</span> package.json
							</p>
							<p className='flex items-center gap-2 pl-6'>
								<span className='text-zinc-400'>├──</span> tsconfig.json
							</p>
							<p className='flex items-center gap-2 pl-6'>
								<span className='text-zinc-400'>└──</span> README.md
							</p>
						</div>
					</Box>
				</div>
			</section>

			{/* PARTE 6 */}
			<section className='mb-24'>
				<h2 className='text-4xl font-black uppercase mb-8 flex items-center gap-4'>
					<span className='px-4 py-2 bg-black text-white dark:bg-white dark:text-black'>
						PARTE 6
					</span>
					<span className='border-b-8 border-primary'>O tsconfig.json</span>
				</h2>
				<p className='text-lg mb-8'>
					O arquivo <code>tsconfig.json</code> configura como o TypeScript se
					comporta. O Bun cria um já funcional, mas vamos melhorá-lo para o
					nosso curso.
				</p>
				<p className='mb-4 font-black uppercase text-xs text-primary'>
					Abra o tsconfig.json e substitua o conteúdo por este:
				</p>
				<CodeBlock
					language='json'
					code={`{
  "compilerOptions": {
    "target": "ESNext",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "skipLibCheck": true,
    "types": ["bun-types"]
  },
  "include": ["src/**/*.ts", "*.ts"],
  "exclude": ["node_modules"]
}`}
				/>
				<div className='mt-12 space-y-8'>
					<h4 className='text-2xl font-black italic'>
						Vamos entender as opções mais importantes:
					</h4>
					<div className='space-y-6'>
						{[
							{
								label: '"strict": true',
								desc: "Ativa todas as verificações rigorosas do TypeScript. Isso significa que o TypeScript vai reclamar quando você tentar fazer coisas perigosas, como usar uma variável que pode ser null sem verificar antes. É como ter um co-piloto exigente — irrita um pouco no início, mas salva você de muitos acidentes.",
							},
							{
								label: '"types": ["bun-types"]',
								desc: "Diz ao TypeScript que queremos os tipos do Bun disponíveis globalmente. Sem isso, o TypeScript não reconheceria funções como Bun.file() ou o bun:test.",
							},
							{
								label: '"include": ["src/**/*.ts", "*.ts"]',
								desc: "Diz ao TypeScript para processar todos os arquivos .ts dentro de src/ e na raiz do projeto.",
							},
						].map((item) => (
							<div key={item.label} className='group'>
								<div className='flex items-center gap-3 mb-2'>
									<div className='w-4 h-4 bg-primary' />
									<code className='text-lg font-black text-zinc-900 dark:text-zinc-100 group-hover:text-primary transition-colors'>
										{item.label}
									</code>
								</div>
								<p className='pl-7 text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed text-base italic'>
									— {item.desc}
								</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* PARTE 7 */}
			<section className='mb-24'>
				<h2 className='text-4xl font-black uppercase mb-12 flex items-center gap-4'>
					<span className='px-4 py-2 bg-black text-white dark:bg-white dark:text-black'>
						PARTE 7
					</span>
					<span className='border-b-8 border-secondary'>
						O primeiro teste real
					</span>
				</h2>
				<p className='text-xl mb-12 font-black text-center text-primary uppercase animate-pulse'>
					🚀 Chegou o momento que todos esperavam. Vamos escrever e executar o
					primeiro teste real.
				</p>

				<div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
					<div className='space-y-6'>
						<h3 className='text-xl font-black uppercase border-l-4 border-black dark:border-white pl-3'>
							1. O Código (SUT)
						</h3>
						<p className='text-sm italic'>
							Primeiro, crie o arquivo com a função que vamos testar:
						</p>
						<CodeBlock
							language='typescript'
							code={`// src/modulo-01/calculadora.ts\n\n// Uma calculadora simples — nosso primeiro cobaia para testes\n\nexport function somar(a: number, b: number): number {\n  return a + b;\n}\n\nexport function subtrair(a: number, b: number): number {\n  return a - b;\n}\n\nexport function multiplicar(a: number, b: number): number {\n  return a * b;\n}\n\nexport function dividir(a: number, b: number): number {\n  // Atenção: divisão por zero é um problema real!\n  if (b === 0) {\n    throw new Error("Não é possível dividir por zero");\n  }\n  return a / b;\n}`}
						/>
					</div>
					<div className='space-y-6'>
						<h3 className='text-xl font-black uppercase border-l-4 border-black dark:border-white pl-3'>
							2. O Teste
						</h3>
						<p className='text-sm italic'>Agora, crie o arquivo de teste:</p>
						<CodeBlock
							language='typescript'
							code={`// src/modulo-01/calculadora.test.ts\n\n// Importamos as ferramentas de teste do Bun\nimport { expect, test, describe } from "bun:test";\n\n// Importamos as funções que queremos testar\nimport { somar, subtrair, multiplicar, dividir } from "./calculadora";\n\n// 'describe' cria um grupo de testes relacionados\ndescribe("Calculadora", () => {\n\n  describe("somar", () => {\n    test("soma dois números positivos", () => {\n      const a = 5; const b = 3;\n      const resultado = somar(a, b);\n      expect(resultado).toBe(8);\n    });\n  });\n\n  describe("dividir", () => {\n    test("resultado pode ser decimal", () => {\n      expect(dividir(10, 3)).toBeCloseTo(3.333, 2);\n    });\n\n    test("lança erro ao dividir por zero", () => {\n      expect(() => dividir(10, 0)).toThrow("Não é possível dividir por zero");\n    });\n  });\n\n});`}
						/>
					</div>
				</div>

				<div className='mt-20'>
					<div className='flex items-center gap-6 mb-8'>
						<div className='h-1 flex-1 bg-black dark:bg-white' />
						<p className='font-black uppercase text-2xl px-6 border-4 border-black dark:border-white'>
							Executar os testes
						</p>
						<div className='h-1 flex-1 bg-black dark:bg-white' />
					</div>
					<CodeBlock language='bash' code='bun test' />

					<Box className='relative mt-12 p-0 overflow-hidden border-4 border-black dark:border-white shadow-[12px_12px_0px_0px_rgba(34,197,94,1)]'>
						<div className='bg-zinc-800 p-3 flex items-center justify-between border-b-2 border-black'>
							<span className='text-xs font-mono text-zinc-400 capitalize underline'>
								bun output
							</span>
							<div className='w-2 h-2 rounded-full bg-green-500 animate-pulse' />
						</div>
						<div className='p-8 bg-zinc-950 font-mono text-sm leading-relaxed text-zinc-300'>
							<p className='mb-2 text-zinc-500'>bun test v1.x.x</p>
							<p className='mb-4'>src/modulo-01/calculadora.test.ts:</p>
							<p className='text-green-400'>
								✓ Calculadora {">"} somar {">"} soma dois números positivos
								[0.08ms]
							</p>
							<p className='text-green-400'>
								✓ Calculadora {">"} dividir {">"} resultado pode ser decimal
								[0.04ms]
							</p>
							<p className='text-green-400'>
								✓ Calculadora {">"} dividir {">"} lança erro ao dividir por zero
								[0.05ms]
							</p>
							<br />
							<p className='font-bold underline text-white'>
								11 pass, 0 fail (Exemplo demonstrativo)
							</p>
						</div>
					</Box>
					<p className='mt-10 text-center text-lg font-bold italic text-zinc-600 dark:text-zinc-400'>
						11 testes passaram em menos de 1 milissegundo cada. Isso é o poder
						do Bun.
					</p>
				</div>
			</section>

			{/* PARTE 8 */}
			<section className='mb-24'>
				<h2 className='text-4xl font-black uppercase mb-12 flex items-center gap-4'>
					<span className='px-4 py-2 bg-black text-white dark:bg-white dark:text-black'>
						PARTE 8
					</span>
					<span className='border-b-8 border-primary'>Comandos úteis</span>
				</h2>
				<p className='text-lg mb-10'>
					O <code>bun test</code> tem várias opções úteis que vamos usar ao
					longo do curso. Veja os principais:
				</p>

				<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					{[
						{ cmd: "bun test", desc: "Executar todos os testes" },
						{
							cmd: 'bun test --test-name-pattern "somar"',
							desc: 'Executa apenas os testes cujo nome contém "somar"',
						},
						{
							cmd: "bun test --watch",
							desc: "Executa em modo watch (re-executa quando o arquivo muda). Muito útil durante o desenvolvimento!",
						},
						{ cmd: "bun test --coverage", desc: "Ver cobertura de código" },
						{
							cmd: "bun test --reporter verbose",
							desc: "Executar com mais detalhes (verbose)",
						},
					].map((item) => (
						<Box
							key={item.cmd}
							className='border-2 border-black dark:border-white p-6 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors'
						>
							<code className='block mb-4 p-2 bg-zinc-900 text-green-400 text-sm font-mono border-l-4 border-primary'>
								{item.cmd}
							</code>
							<p className='text-sm font-medium text-zinc-600 dark:text-zinc-400 leading-relaxed italic'>
								— {item.desc}
							</p>
						</Box>
					))}
				</div>

				<Callout
					type='info'
					title='O modo --watch merece atenção especial'
					className='mt-10'
				>
					<ol className='list-decimal ml-6 space-y-2 mt-4 text-zinc-800 dark:text-zinc-200'>
						<li>
							Você abre um terminal com <code>bun test --watch</code>
						</li>
						<li>O terminal fica "vivo", à espera</li>
						<li>
							Você edita e salva um arquivo <code>.ts</code>
						</li>
						<li>Os testes executam automaticamente em menos de 1 segundo</li>
						<li>Você vê o resultado imediatamente</li>
					</ol>
					<p className='mt-4 font-bold uppercase tracking-tighter'>
						É como ter um assistente ao lado que verifica o seu trabalho cada
						vez que você salva.
					</p>
				</Callout>
			</section>

			{/* PARTE 9 */}
			<section className='mb-24'>
				<h2 className='text-4xl font-black uppercase mb-8 flex items-center gap-4'>
					<span className='px-4 py-2 bg-black text-white dark:bg-white dark:text-black'>
						PARTE 9
					</span>
					<span className='border-b-8 border-secondary'>Nomenclatura</span>
				</h2>
				<p className='text-xl mb-10 font-bold'>
					Uma dúvida comum: como devo chamar os meus arquivos de teste?
				</p>
				<p className='mb-8 text-lg'>
					O Bun procura automaticamente por arquivos que seguem estes padrões:
				</p>
				<div className='flex flex-wrap gap-4 mb-10'>
					{["*.test.ts", "*.test.tsx", "*.spec.ts", "*.spec.tsx"].map(
						(pattern) => (
							<div
								key={pattern}
								className='px-6 py-4 bg-zinc-900 text-white font-mono border-4 border-black dark:border-white shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)]'
							>
								{pattern}
							</div>
						),
					)}
				</div>
				<p className='text-lg leading-relaxed mb-8'>
					A convenção que seguiremos neste curso é simples: se o arquivo com o
					código se chama <code>calculadora.ts</code>, o arquivo de teste se
					chama <code>calculadora.test.ts</code>. Ficam na mesma pasta, lado a
					lado.
				</p>
				<Box className='bg-zinc-100 dark:bg-zinc-900 border-l-8 border-primary p-6'>
					<p className='font-black uppercase text-lg text-primary mb-2'>
						Benefício Enorme:
					</p>
					<p className='font-medium text-zinc-700 dark:text-zinc-300'>
						Quando você abre a pasta, vê imediatamente quais arquivos têm testes
						e quais não têm. Não precisa ir procurar numa pasta separada.
					</p>
				</Box>
			</section>

			{/* PARTE 10 */}
			<section className='mb-24'>
				<h2 className='text-4xl font-black uppercase mb-8 flex items-center gap-4'>
					<span className='px-4 py-2 bg-black text-white dark:bg-white dark:text-black'>
						PARTE 10
					</span>
					<span className='border-b-8 border-primary'>Scripts Úteis</span>
				</h2>
				<p className='text-lg mb-8'>
					Vamos melhorar o package.json para ter atalhos convenientes:
				</p>
				<CodeBlock
					language='json'
					code={`"scripts": {\n  "test": "bun test",\n  "test:watch": "bun test --watch",\n  "test:coverage": "bun test --coverage",\n  "test:verbose": "bun test --reporter verbose"\n}`}
				/>
				<div className='mt-8 grid grid-cols-2 md:grid-cols-4 gap-4'>
					{[
						["bun run test", "todos os testes"],
						["bun run test:watch", "modo watch"],
						["bun run test:coverage", "relatório de cobertura"],
						["bun run test:verbose", "detalhes completos"],
					].map(([cmd, label]) => (
						<div
							key={cmd}
							className='p-4 border-2 border-black dark:border-white text-center'
						>
							<div className='font-mono text-xs font-black truncate bg-primary/20 mb-2 py-1'>
								{cmd}
							</div>
							<p className='text-[10px] font-black uppercase tracking-widest leading-none'>
								{label}
							</p>
						</div>
					))}
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
						"Instalo o Bun — um único binário que substitui Node.js, npm, Jest e Webpack ao mesmo tempo.",
						"Criamos o projeto base — com bun init, que gerou automaticamente package.json, tsconfig.json e a estrutura inicial.",
						'Configuramos o TypeScript — com "strict": true para máxima segurança e "types": ["bun-types"] para os tipos do Bun.',
						"Escrevemos o primeiro teste real — 11 testes para uma calculadora simples, todos passando.",
						"Aprendemos os comandos essenciais — bun test, --watch, --coverage, --test-name-pattern.",
						"Estabelecemos a convenção — arquivos de teste ficam ao lado dos arquivos de código, com o sufixo .test.ts.",
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
						Crie um arquivo{" "}
						<code className='bg-primary/20 px-2'>
							src/modulo-01/conversor.ts
						</code>{" "}
						com uma função{" "}
						<code>celsiusParaFahrenheit(celsius: number): number</code>.
					</p>
					<p className='font-black text-2xl border-l-8 border-primary pl-6 py-4 bg-white dark:bg-black uppercase'>
						A fórmula é:{" "}
						<span className='text-primary'>F = (C × 9/5) + 32</span>
					</p>
					<p>
						Depois crie o arquivo{" "}
						<code className='bg-primary/20 px-2 text-zinc-900 dark:text-zinc-100 font-bold'>
							src/modulo-01/conversor.test.ts
						</code>{" "}
						e escreva pelo menos 4 testes:
					</p>
					<ul className='space-y-4 font-black uppercase italic tracking-tighter'>
						<li className='flex items-center gap-4 hover:translate-x-4 transition-transform'>
							<span className='w-4 h-4 bg-primary rounded-full' />
							Converter 0°C (deve dar 32°F)
						</li>
						<li className='flex items-center gap-4 hover:translate-x-4 transition-transform'>
							<span className='w-4 h-4 bg-primary rounded-full' />
							Converter 100°C (deve dar 212°F)
						</li>
						<li className='flex items-center gap-4 hover:translate-x-4 transition-transform'>
							<span className='w-4 h-4 bg-primary rounded-full' />
							Converter -40°C (deve dar -40°F)
						</li>
						<li className='flex items-center gap-4 hover:translate-x-4 transition-transform'>
							<span className='w-4 h-4 bg-primary rounded-full' />
							Converter 37°C (deve dar ~98.6°F, use <code>toBeCloseTo</code>)
						</li>
					</ul>
					<p className='p-6 bg-black text-white dark:bg-white dark:text-black font-black uppercase text-center mt-12 hover:scale-105 transition-transform cursor-default'>
						Execute com bun test e confirme que todos passam.
					</p>
				</div>
			</Box>

			{/* FOOTER */}
			<div className='flex items-center justify-between border-t-8 border-black dark:border-white pt-12 pb-32 mb-20'>
				<p className='font-black uppercase text-2xl italic text-primary'>
					Conferência 1.2 — Fim
				</p>
				<p className='font-black uppercase text-2xl italic text-zinc-400'>
					Próxima: 2.1 — Anatomia de um teste
				</p>
			</div>
		</>
	),
	ejercicios: [],
};
