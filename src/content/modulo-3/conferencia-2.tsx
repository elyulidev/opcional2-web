import type { ConferenciaData } from '../../types';
import { CodeBlock } from '../../components/CodeBlock';

export const data: ConferenciaData = {
  titulo: "3.2 Timers y Mocking de tiempo",
  objetivos: [
    "Compreender a necessidade de manipular o tempo em testes",
    "Usar setSystemTime() e Fake Timers",
    "Avançar o tempo artificialmente para debugar delays"
  ],
  contenido: (
    <>
      <p>
        Imagine testar uma cache que expira em 24 horas, ou um sistema de debouncing que aguarda 500ms. O desenvolvedor não pode construir uma suíte de CI que de fato fica parada 24 horas!
      </p>

      <h2>O uso de Fake Timers</h2>
      <p>
        O Bun oferece utilitários poderosos integrados no seu motor, como <code>jest.useFakeTimers()</code> (sim, exposto via a variável global compatível <code>jest</code> ou <code>mock</code>) e as funções globais próprias do Bun.
      </p>
      
      <CodeBlock 
        language="typescript" 
        code={`import { test, expect, jest } from "bun:test";

test("a cache expira após 24h", () => {
  // Congela o tempo do relógio da CPU
  jest.useFakeTimers(); 
  
  const cache = new OpcionalCache();
  cache.set("a", 1, { expiraEmMilisegundos: 86400000 });
  
  expect(cache.get("a")).toBe(1);
  
  // Avança o relógio mágico artificialmente em 24 horas + 1 ms
  jest.advanceTimersByTime(86400001);
  
  expect(cache.get("a")).toBeNull(); // Cache deve estar apagada!
  
  // Limpa tudo de volta pro normal
  jest.useRealTimers();
});`} 
      />

      <h2>Fixando o "Momento Atual" com setSystemTime()</h2>
      <p>
        Muitas lógicas financeiras dependem de `new Date()`. Se é meia noite ou fim de mês faz total diferença no domínio bancário.
      </p>
      
      <CodeBlock 
        language="typescript" 
        code={`import { test, expect, jest } from "bun:test";

test("Gera fatura corretamente no dia 31 de janeiro", () => {
  jest.useFakeTimers();
  jest.setSystemTime(new Date("2024-01-31T12:00:00Z"));
  
  const relatorio = gerarRelatorioMensal();
  // ... validações
  
  jest.useRealTimers();
});`} 
      />

      <div className="bg-slate-100 dark:bg-slate-800 p-4 border-l-4 border-slate-400 rounded-md mt-6">
        <p className="font-semibold mb-2">Um Alerta sobre Avanço de Tempo Assíncrono</p>
        <p className="text-sm">Ao falsificar cronômetros (`setTimeout`), se uma Promise esperar internamente esse cronômetro, certifique-se de disparar `advanceTimersByTime` APÓS ela ter sido enfileirada, ou chame `jest.runAllTimers()` para drenar a fila do Node/Bun imediatamente.</p>
      </div>
    </>
  ),
  ejercicios: [
    {
      titulo: "Limites em Datas Comemorativas",
      descripcion: "Crie uma pequena classe 'CupomDeAniversario' baseada na data atual. Escreva testes usando `jest.setSystemTime()` para fazer o Bun viajar no tempo no dia exato do desconto e no dia pós-aniversário provando que ele espira."
    }
  ]
};
