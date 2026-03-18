import type { ConferenciaData } from "../../types";
import { CodeBlock } from "../../components/CodeBlock";
import { Concept, Callout, Box } from "../../components/CourseComponents";

export const data: ConferenciaData = {
	titulo: "1.1 Por que testar software? A história de um desastre real",
	objetivos: [
		"Explicar por que o teste automatizado existe e qual problema ele resolve.",
		"Identificar situações reais onde a ausência de testes causa falhas graves.",
		"Diferenciar teste manual de teste automatizado.",
		"Nomear os três superpoderes dos testes: confiança, documentação e deteção antecipada.",
		"Reconhecer o bun:test como a ferramenta central do curso.",
		"Adotar a mentalidade de um bom testador: questionar o caminho feliz.",
	],
	contenido: (
		<>
			<Box className='bg-primary/10 border-primary mb-12'>
				<div className='flex flex-wrap gap-4 text-sm mb-4'>
					<span className='px-3 py-1 bg-primary text-white font-black uppercase'>
						Módulo 1 — Preparação e Boas-Vindas
					</span>
					<span className='px-3 py-1 bg-zinc-900 text-white font-black uppercase dark:bg-zinc-100 dark:text-zinc-900'>
						Duração: 1 hora
					</span>
					<span className='px-3 py-1 border-2 border-zinc-900 font-black uppercase dark:border-zinc-100'>
						Pré-requisitos: Nenhum
					</span>
				</div>
				<p className='text-xl leading-relaxed'>
					Olá, bem-vindos ao curso! Antes de escrever uma única linha de código,
					precisamos de responder a uma pergunta fundamental:{" "}
					<strong>
						"Para que serve testar? Não basta correr o programa e ver se
						funciona?"
					</strong>
				</p>
			</Box>

			<section className='mb-16'>
				<h2 className='text-4xl font-black uppercase mb-8 border-b-8 border-primary inline-block'>
					PARTE 1 — O Desastre da NASA (370M$)
				</h2>
				<div className='grid grid-cols-1 lg:grid-cols-2 gap-10 items-center'>
					<div className='space-y-4'>
						<p>
							Em 1999, a NASA lançou a sonda{" "}
							<strong>Mars Climate Orbiter</strong>. Anos de trabalho e centenas
							de milhões de dólares investidos.
						</p>
						<p>
							Após 9 meses de viagem, a sonda desintegrou-se na atmosfera de
							Marte. O motivo? <strong>Simples:</strong>
						</p>
						<Box className='bg-zinc-900 text-zinc-900 dark:bg-white dark:text-white p-6'>
							<p className='font-mono text-white dark:text-zinc-600'>
								Equipa A: Sistema Métrico (Metros/Kg)
								<br />
								Equipa B: Sistema Imperial (Pés/Libras)
							</p>
							<p className='mt-4 text-primary font-black'>
								Ninguém verificou se as unidades eram compatíveis.
							</p>
						</Box>
						<p className='italic text-sm'>
							Um teste simples de 5 linhas teria detectado este bug
							imediatamente.
						</p>
					</div>
					<div className='bg-zinc-100 dark:bg-zinc-800 p-8 border-4 border-zinc-900 dark:border-white shadow-[12px_12px_0px_#ec4899] rotate-2'>
						<h4 className='font-black text-2xl mb-4'>🚀 OS NÚMEROS:</h4>
						<ul className='space-y-4 text-lg'>
							<li className='flex justify-between border-b-2 border-zinc-300 dark:border-zinc-700 pb-2'>
								<span>Custo:</span>
								<span className='font-black text-primary'>$327,600,000</span>
							</li>
							<li className='flex justify-between border-b-2 border-zinc-300 dark:border-zinc-700 pb-2'>
								<span>Falha:</span>
								<span className='font-black'>Erro de Unidade</span>
							</li>
							<li className='flex justify-between'>
								<span>Tempo:</span>
								<span className='font-black'>9 Meses Perdidos</span>
							</li>
						</ul>
					</div>
				</div>
			</section>

			<section className='mb-16'>
				<h2 className='text-3xl font-black uppercase mb-8'>
					PARTE 2 — Situações do dia a dia
				</h2>
				<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
					<Box className='border-blue-500 shadow-[4px_4px_0px_#3b82f6]'>
						<div className='text-4xl mb-4'>🏦</div>
						<h4 className='font-black uppercase mb-2'>O Sistema Bancário</h4>
						<p className='text-sm'>
							Cálculo de juros que funciona com depósitos, mas crasha com
							valores negativos (dívidas). O banco perde dinheiro durante
							semanas.
						</p>
					</Box>
					<Box className='border-amber-500 shadow-[4px_4px_0px_#f59e0b]'>
						<div className='text-4xl mb-4'>🛒</div>
						<h4 className='font-black uppercase mb-2'>A Loja Online</h4>
						<p className='text-sm'>
							Desconto de 50% que funciona para 1 produto, mas derruba o
							servidor na Black Friday quando o carrinho está vazio.
						</p>
					</Box>
					<Box className='border-green-500 shadow-[4px_4px_0px_#22c55e]'>
						<div className='text-4xl mb-4'>🎓</div>
						<h4 className='font-black uppercase mb-2'>O Sistema Académico</h4>
						<p className='text-sm'>
							Sistema de notas que crasha ao tentar dividir por zero quando um
							aluno falha uma avaliação. Dados de uma semana perdidos.
						</p>
					</Box>
				</div>
			</section>

			<Concept title='O que é testar software?'>
				<div className='flex flex-col md:flex-row gap-8 items-start'>
					<div className='flex-1'>
						<p className='mb-4'>
							Imagina que és um cozinheiro. Vais servir o prato ao cliente sem o
							provar? Claro que não!
						</p>
						<p className='font-bold text-primary text-xl'>
							Testar software é provar o código antes de o servir ao utilizador.
						</p>
						<p className='mt-4'>
							Mas provar manualmente é lento e falível. Se tens 200 pratos no
							menu, não podes provar todos cada vez que mudas o sal de um deles.
						</p>
					</div>
					<Box className='md:w-1/3 bg-secondary text-white border-zinc-900'>
						<h4 className='font-black uppercase mb-2 dark: dark:text-white text-zinc-900'>
							A Solução:
						</h4>
						<p className='text-sm  italic'>
							Testes automatizados são robôs inspetores que trabalham 24h, não
							se cansam e verificam tudo em segundos.
						</p>
					</Box>
				</div>
			</Concept>

			<section className='my-20'>
				<h2 className='text-3xl font-black uppercase mb-8'>
					PARTE 4 — Vamos ver código real
				</h2>
				<p className='mb-6 text-lg'>
					Imagina esta função simples para calcular o preço final:
				</p>

				<div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
					<div className='space-y-4'>
						<h4 className='font-black text-sm uppercase text-zinc-500'>
							Lógica de Negócio (preco.ts)
						</h4>
						<CodeBlock
							language='typescript'
							code={`function calcularPrecoFinal(preco: number, desconto: number): number {
  return preco - (preco * desconto / 100);
}`}
						/>
						<p className='text-sm text-zinc-600 dark:text-zinc-400'>
							Parece correta? Vamos ver o que os testes dizem...
						</p>
					</div>

					<div className='space-y-4 font-mono text-sm'>
						<h4 className='font-black text-sm uppercase text-zinc-500'>
							Teste Automatizado (preco.test.ts)
						</h4>
						<div className='bg-zinc-900 text-zinc-300 p-6 border-4 border-zinc-900 rounded-none overflow-x-auto'>
							<CodeBlock
								language='typescript'
								code={`import { expect, test, describe } from "bun:test";

describe("calcularPrecoFinal", () => {
  test("calcula valores normais", () => {
    expect(calcularPrecoFinal(100, 10)).toBe(90);
  });

  test("não aceita preço negativo!", () => {
    const resultado = calcularPrecoFinal(100, 110);
    expect(resultado).toBeGreaterThanOrEqual(0);
  });
});`}
							/>
						</div>
					</div>
				</div>

				<Callout title='O Bug Encontrado' type='warning' className='mt-10'>
					<p className='mb-4'>
						Ao correr <code>bun test</code>, o segundo teste vai FALHAR. Porquê?
					</p>
					<div className='bg-red-500/10 border-2 border-red-500 p-4 font-mono text-red-500'>
						✗ calcularPrecoFinal {" > "} não aceita preço negativo!
						<br />
						Expected: {">"}= 0<br />
						Received: -10
					</div>
					<p className='mt-4 font-bold'>
						O teste encontrou um bug real antes de chegar ao utilizador!
					</p>
				</Callout>
			</section>

			<section className='mb-20'>
				<h2 className='text-3xl font-black uppercase mb-8 text-center'>
					Os 3 Superpoderes dos Testes
				</h2>
				<div className='space-y-8'>
					<div className='flex flex-col md:flex-row gap-8 items-center bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 p-8 border-4 border-primary'>
						<div className='text-6xl'>🛡️</div>
						<div className='flex-1'>
							<h3 className='text-2xl font-black uppercase text-primary'>
								1. Confiança para mudar
							</h3>
							<p className='opacity-80'>
								Podes alterar 50 funções e saber em 2 segundos se algo quebrou.
								É a tua rede de segurança.
							</p>
						</div>
					</div>

					<div className='flex flex-col md:flex-row gap-8 items-center border-4 border-zinc-900 dark:border-white p-8'>
						<div className='text-6xl'>📜</div>
						<div className='flex-1'>
							<h3 className='text-2xl font-black uppercase'>
								2. Documentação Viva
							</h3>
							<p className='opacity-70'>
								Os testes explicam como o código deve funcionar. Se o código
								mudar, o teste falha, obrigando a atualizar a "documentação".
							</p>
						</div>
					</div>

					<div className='flex flex-col md:flex-row gap-8 items-center bg-secondary text-white p-8 border-4 border-zinc-900 dark:border-white shadow-[8px_8px_0px_#ec4899]'>
						<div className='text-6xl'>🔍</div>
						<div className='flex-1'>
							<h3 className='text-2xl font-black uppercase text-zinc-900'>
								3. Deteção Antecipada
							</h3>
							<p className='text-zinc-900 font-bold'>
								Corrigir um bug em desenvolvimento é 10 a 100x mais barato do
								que em produção.
							</p>
						</div>
					</div>
				</div>
			</section>

			<section className='mb-20'>
				<h2 className='text-3xl font-black uppercase mb-8'>
					PARTE 6 — Por que Bun?
				</h2>
				<div className='grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch'>
					<div className='space-y-6'>
						<p>
							Existem muitas ferramentas (Jest, Vitest, Mocha), mas o Bun é
							especial porque é um <strong>All-in-One</strong>.
						</p>
						<ul className='space-y-4'>
							<li className='flex gap-3'>
								<span className='font-black text-primary'>⚡</span>
								<span>
									<strong>Zig Performance:</strong> 27x mais rápido que o Jest.
								</span>
							</li>
							<li className='flex gap-3'>
								<span className='font-black text-primary'>📦</span>
								<span>
									<strong>TS Nativo:</strong> Zero configurações de Babel ou
									esbuild.
								</span>
							</li>
							<li className='flex gap-3'>
								<span className='font-black text-primary'>🎯</span>
								<span>
									<strong>Simplicidade:</strong> Tudo num único comando binário.
								</span>
							</li>
						</ul>
					</div>
					<Box className='bg-zinc-100 dark:bg-zinc-800 border-zinc-900 shadow-none'>
						<h4 className='font-black uppercase mb-4 text-center'>
							Comparação de Velocidade
						</h4>
						<div className='space-y-4'>
							<div>
								<div className='flex justify-between text-xs font-bold mb-1 uppercase'>
									<span>Jest (Tradicional)</span>
									<span>8.4s</span>
								</div>
								<div className='w-full h-4 bg-zinc-300 dark:bg-zinc-700'>
									<div className='w-full h-full bg-zinc-500'></div>
								</div>
							</div>
							<div>
								<div className='flex justify-between text-xs font-bold mb-1 uppercase text-primary'>
									<span>BUN TEST</span>
									<span>0.3s</span>
								</div>
								<div className='w-full h-4 bg-zinc-300 dark:bg-zinc-700'>
									<div className='w-[4%] h-full bg-primary'></div>
								</div>
							</div>
						</div>
					</Box>
				</div>
			</section>

			<section className='my-20 p-10 bg-zinc-900 text-white border-4 border-primary relative overflow-hidden'>
				<div className='absolute top-0 right-0 p-4 rotate-12 opacity-10 blur-sm'>
					<div className='text-9xl font-black'>?</div>
				</div>
				<h3 className='text-3xl font-black uppercase mb-6'>
					A Mentalidade do Testador
				</h3>
				<p className='text-xl italic max-w-2xl'>
					"Um programador normal pensa: 'O meu código funciona, está correto.'
					UM BOM TESTADOR pensa: 'O meu código parece funcionar. Mas como posso
					provar que é impossível ele falhar?'"
				</p>
			</section>

			<Callout title='Resumo da Conferência' type='info'>
				<ul className='list-none space-y-2 font-bold'>
					<li>✅ A NASA perdeu 370M$ por falta de um teste de unidades.</li>
					<li>
						✅ Testar automatizadamente é ter robôs a inspecionar o código.
					</li>
					<li>✅ Superpoderes: Confiança, Documentação e Economia.</li>
					<li>✅ Bun: Velocidade extrema e suporte total a TypeScript.</li>
				</ul>
			</Callout>

			<div className='mt-20 p-10 border-4 border-zinc-900 dark:border-white bg-primary text-white brutalist-shadow-primary relative overflow-hidden'>
				<h3 className='text-4xl font-black uppercase mb-6'>
					🤔 Exercício para Pensar
				</h3>
				<div className='space-y-6 relative z-10'>
					<p>
						Pensa numa aplicação que usas no dia a dia (ex: App do Banco, MB
						Way, NetGiro).
					</p>
					<ul className='list-disc pl-6 space-y-3 font-bold'>
						<li>Quais são as funções mais críticas dessa app?</li>
						<li>
							O que acontece se essas funções receberem valores inesperados?
						</li>
						<li>Quem seria afetado se o sistema crashasse agora?</li>
					</ul>
				</div>
			</div>
		</>
	),
	ejercicios: [
		{
			titulo: "Reflexão: Erros Reais",
			descripcion:
				"Identifica um erro de software que tenhas experienciado como utilizador e descreve como um teste poderia tê-lo evitado.",
		},
		{
			titulo: "Diferença Fundamental",
			descripcion:
				"Explica com as tuas palavras por que é que testar manualmente um sistema grande é impossível no longo prazo.",
		},
	],
};
