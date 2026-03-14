import type { ConferenciaData } from '../../types';
import { CodeBlock } from '../../components/CodeBlock';

export const data: ConferenciaData = {
  titulo: "7.1 Performance testing (Benchmarking, Optimización)",
  objetivos: [
    "Diferenciar Jest Runtime Performance vs Bun Test",
    "Usar bibliotecas como mitata (se recomendado) ou funções cronometradas",
    "Rodar Benchmark de componentes e algorítmos densos",
    "Dicas valiosas de Speed-Up no Bun."
  ],
  contenido: (
    <>
      <p>
        Sabe qual a vantagem que o Bun traz naturalmente nativo na sua filosofia e porquê nós não o testamos da mesma maneira que arquitetávamos em ecossistemas JS primitivos? Performance pura e Benchmark out-of-the-box focado no VSC (Velocidade por Ciclo).
      </p>

      <h2>O Milagre do Boot-Time Oculto e Setup Nativo</h2>
      <p>No Node.js/Jest, mais de 60% do <em>"Test Runner Time"</em> gasto em Pipelines CI se resume somente a "Acordar threads e bootar Compiladores Ts", gerando a falsa lentidão em projetos gigantes. O que leva 13s numa suíte Babel no Bun costuma rodar na casa de `40 - 200 milisegundos`. A velocidade te dá permissão ao TDD imediato e fluxo <em>"Watch Hot-reloading"</em> real sem atrito cognitivo.</p>

      <h2>Micro-Benchmarking da Sua Lógica Limitante na Arquitetura</h2>
      <p>Não há API <code>bun bench</code> nativa no escopo de Testing atualmente de maneira similar ao Deno. Porém o ecossistema frequentemente mescla suites de Unit test injetando ferramentas de contagem ultrarrápidas de Ticks de CPU (ex: Biblioteca <strong>mitata</strong> padrão da comunidade ou API de performance básica `performance.now()`).</p>

      <CodeBlock 
        language="typescript" 
        code={`import { describe, test, expect } from "bun:test";
import { criptografiaPesada, hashBunNativeAlgo } from "./securityUtils";

describe("Segurança Algorítmica Crítica", () => {

  test("Deve codificar sem ultrapassar métrica P95 de 15ms de Tensão Web", () => {
    // Para benchmarks sujos em funções e garantias E2E
    const t0 = performance.now();
    for(let i = 0; i < 500; i++) {
        criptografiaPesada("payload...");
    }
    const tF = performance.now();
    
    // Performance é Regressão! Uma regressão falha a pipeline!
    expect(tF - t0).toBeLessThan(15); 
  });

  test("BunNativeCrypto roda mais rapido", () => {
    // ... teste comparativo similar ...
  });
});`} 
      />

      <h2>Descobrindo Memory Leaks vs Lixeira</h2>
      <p>Ao se ter Suites massivais no CI (Milhares e Milhares de arquivos Test rodando), desenvolvedores Jest percebem que os trabalhadores Node engasgam travando a Memória RAM, dando exceções `OutOfMemory`. O motor WebKit Core do Bun usa uma coleta de Lixo (Garbage Collection) síncrona/concorrente mais severa.</p>

      <div className="bg-red-50 dark:bg-red-900/10 rounded p-4 border border-red-200 dark:border-red-900/30">
        <h3 className="text-red-800 dark:text-red-400 font-bold flex items-center gap-2"><span role="img" aria-label="Aviso Fogo">🔥</span> Dica Prática Profiling Lento no Bun</h3>
        <p className="text-sm mt-2 text-slate-700 dark:text-slate-300">
          Você encontrou um sub-teste engasgando! O culpado é 1 entre 4.000 it's do seu projeto. O comando <code>bun test --timeout 500</code> irá falhar explicitamente qualquer requisição ou async hook que gaste processamento pesado demais. Fazer a busca binária de arquivos defeituosos de Timeout é brutal e indolor no ecossistema atual. TDD na mão!
        </p>
      </div>
    </>
  ),
  ejercicios: [
    {
      titulo: "Constipação O(N^3)",
      descripcion: "Crie um algoritmo matemático burro que soma array multi-dimensional repetidamente (um for triplo). Num arquivo de teste, envolva no `performance.now()` e injete arrays crescentes até gerar uma falha com `toBeLessThan(10)` e meça."
    }
  ]
};
