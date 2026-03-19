import type { ConferenciaData } from "../../types";
import { CodeBlock } from "../../components/CodeBlock";
import { Callout, Box } from "../../components/CourseComponents";

export const data: ConferenciaData = {
	titulo: "3.3 spyOn() — espionando funções reais sem as destruir",
	objetivos: [
		"Explicar a diferença fundamental entre mock() e spyOn() e quando usar cada um.",
		"Usar spyOn() para observar chamadas a métodos de objetos sem substituir o comportamento.",
		"Usar spyOn() combinado com mockReturnValue para substituir comportamento temporariamente.",
		"Restaurar funções originais com mockRestore() após cada teste.",
		"Espionar métodos de objetos globais como console, Math e Date.",
		"Identificar situações onde spyOn é a ferramenta correta e onde mock() é melhor.",
		"Evitar os erros mais comuns com spyOn, especialmente o vazamento de estado entre testes.",
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
					Introdução — Observar sem interferir
				</h3>
				<div className='space-y-4 text-lg leading-relaxed text-zinc-800 dark:text-zinc-200'>
					<p>
						Na conferência anterior usámos mock() para criar funções completamente falsas — substituições totais. A função original desaparece e a falsa toma o seu lugar.
					</p>
					<p>
						Mas há situações onde não queremos substituir a função. Queremos deixá-la funcionar normalmente e apenas observar o que acontece: foi chamada? Com que argumentos? Quantas vezes?
					</p>
					<p className='font-black text-2xl py-6 px-8 border-l-8 border-primary bg-white dark:bg-zinc-900 shadow-brutalist uppercase italic tracking-tighter'>
						"O spyOn() é o investigador particular dos teus testes."
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
						mock() vs spyOn()
					</span>
				</h2>

				<div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
					<Box className='border-zinc-300 opacity-60'>
						<h4 className='font-black uppercase text-xl mb-4'>mock()</h4>
						<p className='text-sm mb-4 italic'>Cria uma função NOVA. A original nunca é executada.</p>
						<CodeBlock language="typescript" code={`const falso = mock(() => 99);\nfalso(1, 2); // 99`} />
					</Box>
					<Box className='border-primary shadow-brutalist'>
						<h4 className='font-black uppercase text-xl mb-4'>spyOn()</h4>
						<p className='text-sm mb-4 italic'>Envolve o objeto REAL. A lógica original continua viva.</p>
						<CodeBlock language="typescript" code={`const spy = spyOn(obj, "somar");\nobj.somar(1, 2); // 3 (logica real!)\nexpect(spy).toHaveBeenCalled();`} />
					</Box>
				</div>
			</section>

			{/* PARTE 2 */}
			<section className='mb-24 relative overflow-hidden'>
				<div className='absolute -right-20 top-0 text-[15rem] leading-none text-emerald-500/5 font-black pointer-events-none'>OBS</div>
				<h2 className='text-4xl font-black uppercase mb-12 flex items-center gap-4'>
					<span className='px-4 py-2 bg-emerald-500 text-white'>
						PARTE 2
					</span>
					<span className='border-b-8 border-emerald-500'>
						Observar sem Interferir
					</span>
				</h2>

				<Box className='border-emerald-500 bg-emerald-50/10'>
					<p className='text-lg mb-6'>Ideal para testar se logs ou avisos foram disparados internamente.</p>
					<CodeBlock 
						language="typescript"
						code={`const spy = spyOn(logger, "info");\nprocessarPedido(pedido);\n\nexpect(spy).toHaveBeenCalledWith("Pedido processado!");\nspy.mockRestore(); // Essencial!`}
					/>
				</Box>
			</section>

			{/* PARTE 3 */}
			<section className='mb-24'>
				<h2 className='text-4xl font-black uppercase mb-12 flex items-center gap-4'>
					<span className='px-4 py-2 bg-black text-white dark:bg-white dark:text-black'>
						PARTE 3
					</span>
					<span className='border-b-8 border-secondary'>
						Controlando o Incontrolável
					</span>
				</h2>

				<div className='space-y-10'>
					<p className='text-lg'>Podes usar spyOn() para "domar" métodos que têm efeitos colaterais (como rede ou aleatoriedade) sem mudar a estrutura do objeto.</p>
					<Box className='border-secondary shadow-brutalist'>
						<CodeBlock 
							language="typescript"
							code={`// Fixamos um código aleatório para o teste ser determinístico\nconst spy = spyOn(servico, "gerarCodigo");\nspy.mockReturnValue("123456");\n\nconst r = await verificarIdentidade();\nexpect(r.codigo).toBe("123456");\n\nspy.mockRestore();`}
						/>
					</Box>
				</div>
			</section>

			{/* PARTE 4 */}
			<section className='mb-24'>
				<h2 className='text-4xl font-black uppercase mb-12 flex items-center gap-4'>
					<span className='px-4 py-2 bg-zinc-950 text-white'>
						PARTE 4
					</span>
					<span className='border-b-8 border-zinc-950 dark:border-zinc-50'>
						Espionando Globais
					</span>
				</h2>

				<div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
					<Box className='border-black dark:border-white h-full bg-zinc-50 dark:bg-zinc-900'>
						<h4 className='font-black uppercase mb-4 text-primary'>Controlar o Tempo</h4>
						<CodeBlock language="typescript" code={`spyOn(Date, "now")\n  .mockReturnValue(1710500000000);`} />
					</Box>
					<Box className='border-black dark:border-white h-full bg-zinc-50 dark:bg-zinc-900'>
						<h4 className='font-black uppercase mb-4 text-secondary'>Aleatoriedade</h4>
						<CodeBlock language="typescript" code={`spyOn(Math, "random")\n  .mockReturnValue(0); // vira determinístico`} />
					</Box>
				</div>
				<Callout type='warning' title='Silenciar Console' className='mt-8'>
					É prática comum usar <code>spyOn(console, "log").mockImplementation(() =&gt; {"{}"})</code> para manter o output do terminal limpo durante a execução de testes.
				</Callout>
			</section>

			{/* PARTE 5 */}
			<section className='mb-24'>
				<h2 className='text-4xl font-black uppercase mb-12 flex items-center gap-4'>
					<span className='px-4 py-2 bg-primary text-white'>
						PARTE 5
					</span>
					<span className='border-b-8 border-primary'>
						Classes e Instâncias
					</span>
				</h2>

				<Box className='border-primary p-0 overflow-hidden shadow-brutalist'>
					<div className='p-6 bg-primary text-white font-black uppercase tracking-widest text-sm'>
						Testando Interações entre Componentes
					</div>
					<CodeBlock 
						language="typescript"
						code={`const auth = new ServicoAuth();\nconst spy = spyOn(auth, "validarCredenciais");\n\nawait controlador.fazerLogin("admin@ispm.ao", "123");\n\nexpect(spy).toHaveBeenCalledWith("admin@ispm.ao", "123");\nspy.mockRestore();`}
					/>
				</Box>
			</section>

			{/* PARTE 6 */}
			<section className='mb-24'>
				<h2 className='text-4xl font-black uppercase mb-12 flex items-center gap-4'>
					<span className='px-4 py-2 bg-red-500 text-white'>
						PARTE 6
					</span>
					<span className='border-b-8 border-red-500'>
						Erro Crítico: Esquecer a Restauração
					</span>
				</h2>

				<Box className='border-red-500 bg-red-50/10'>
					<p className='text-lg mb-6 leading-relaxed'>
						Este é o erro mais frequente. Se não restaurares o spy, ele continuará a afetar outros testes de forma misteriosa.
					</p>
					<CodeBlock 
						language="typescript"
						code={`afterEach(() => {\n  // Garante que o estado é limpo após cada teste\n  mock.restoreAllMocks(); \n  // OU se guardaste o spy:\n  meuSpy.mockRestore();\n});`}
					/>
				</Box>
			</section>

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

			{/* EXERCÍCIO */}
			<Box className='border-8 border-black dark:border-white p-16 bg-primary/5 mb-32 group hover:bg-primary/10 transition-colors'>
				<h3 className='text-5xl font-black uppercase mb-10 flex items-center justify-between'>
					EXERCÍCIO PRÁTICO
					<span className='text-6xl animate-bounce'>🧪</span>
				</h3>
				<div className='space-y-8 text-xl font-medium leading-relaxed text-zinc-800 dark:text-zinc-200'>
					<p>
						Crie o ficheiro <code>src/modulo-02/sistema-cache.test.ts</code>:
					</p>
					<ul className='space-y-4 font-bold uppercase text-sm tracking-tight'>
						<li>1. Espione Date.now() para simular expiração de itens no cache.</li>
						<li>2. Espione console.warn para verificar avisos em chaves expiradas.</li>
						<li>3. Verifique a sequência de chamadas internas ao guardar um item.</li>
						<li>4. Use mockRestore() obrigatoriamente no afterEach.</li>
					</ul>
					<div className='p-8 bg-zinc-950 text-white font-black italic uppercase tracking-tight text-center mt-10 shadow-brutalist'>
						"Observa como um profissional, restaura como um mestre."
					</div>
				</div>
			</Box>

			{/* FOOTER */}
			<div className='flex items-center justify-between border-t-8 border-black dark:border-white pt-12 pb-32 mb-20'>
				<p className='font-black uppercase text-2xl italic text-primary'>
					Conferência 3.3 — Fim
				</p>
				<p className='font-black uppercase text-2xl italic text-zinc-400'>
					Próxima: 3.4 — Mocking de módulos inteiros
				</p>
			</div>
		</>
	),
	ejercicios: [],
};
