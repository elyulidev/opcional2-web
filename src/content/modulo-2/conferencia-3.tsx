import type { ConferenciaData } from '../../types';
import { CodeBlock } from '../../components/CodeBlock';

export const data: ConferenciaData = {
  titulo: "2.3 Organización de tests",
  objetivos: [
    "Estruturar testes organicamente com describe",
    "Implementar métodos práticos para depuração (skip e only)",
    "Documentar testes planejados (todo)"
  ],
  contenido: (
    <>
      <p>
        Um código de testes não estruturado se torna difícil de ler muito rápido. Quando você chega de dezenas para centenas de testes, a organização visual e hierárquica define se sua suíte irá encolher seu tempo de debug ou enlouquecer o seu time no board diário.
      </p>

      <h2>O Bloco <code>describe</code> e Aninhamento</h2>
      <p>
        O <code>describe</code> agrupa logicamente os blocos de teste, permitindo uma sub-divisão legível no terminal. Quando os testes falham, o test runner imprime toda a cadeia dos blocos, mostrando o exato domínio quebrado.
      </p>
      
      <CodeBlock 
        language="typescript" 
        code={`import { describe, test, expect } from "bun:test";

describe("Modulo de Pagamento", () => {
  describe("Cartão de Crédito", () => {
    test("deve recusar cartão expirado", () => { /* ... */ });
    test("deve autorizar cartão válido", () => { /* ... */ });
  });

  describe("PIX", () => {
    test("deve confirmar chaves aleatórias em milisegundos", () => { /* ... */ });
  });
});`} 
      />

      <h2>Depuração Focada: <code>.only</code> e <code>.skip</code></h2>
      <p>
        No decorrer do desenvolvimento, frequentemente você precisa de resolver uma falha num teste único no meio de uma suite pesada, ou quer temporariamente desativar testes confusos de uma suíte até consertar um subsistema defeituoso.
      </p>
      
      <CodeBlock 
        language="typescript" 
        code={`// Pulará esse teste e o marcará no report como 'Skipped'
test.skip("Teste obsoleto do DB v1", () => {
  expect(true).toBe(false); 
});

// Apenas este será executado, O RESTANTE DO ARQUIVO SERÁ IGNORADO!
test.only("Focando na Depuração Atual", () => {
  console.log("Testando em detalhe");
  expect(1).toBe(1);
});`} 
      />
      
      <div className="bg-amber-50 dark:bg-amber-900/20 rounded-md p-4 border-l-4 border-amber-500 mb-6">
        <p className="text-sm text-amber-900 dark:text-amber-200"><strong>Dica:</strong> É comum na indústria causar incidentes no CI ao usar o <code>.only</code> e cometer o erro de deixá-lo no Git e dar "Merge". Ele faz com que todos os outros testes parem de passar! Felizmente os linters hoje conseguem pegar isso.</p>
      </div>

      <h2>Rascunho Rápido: <code>.todo</code></h2>
      <p>
        Para TDD raiz ou para garantir que não se esqueça de edgecases, você pode fazer uma lista descritiva.
      </p>
      <CodeBlock 
        language="typescript" 
        code={`// Isso mostrará como um teste amarelo PENDENTE no log. 
// Você nem sequer passa um callback pra ele.
test.todo("Deve conseguir processar limite diário excedente amanhã.");`} 
      />
    </>
  ),
  ejercicios: [
    {
      titulo: "Limpeza de Arquitetura",
      descripcion: "Forneça 3 exemplos onde test.skip seria um 'bad practice' em desenvolvimento e onde ele seria justificado. Refatore aquele array usando describes aninhados."
    }
  ]
};
