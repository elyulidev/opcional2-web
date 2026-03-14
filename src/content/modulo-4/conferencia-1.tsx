import type { ConferenciaData } from '../../types';
import { CodeBlock } from '../../components/CodeBlock';

export const data: ConferenciaData = {
  titulo: "4.1 Unit Testing Realidades Puras",
  objetivos: [
    "Compreender a definição raiz de Funções Puras",
    "Isolar componentes de efeitos colaterais complexos (Side Effects)",
    "Focar em 'Testabilidade' no design do código"
  ],
  contenido: (
    <>
      <p>
        O <strong>Unit Test</strong> ou <em>Teste Unitário</em> assume que você testará a menor unidade lógica do seu programa (geralmente uma única função ou classe isolada). Quando tratamos com o paradigma acadêmico, o nirvana do desenvolvimento é arquitetar a maioria possível do código como <em>Funções Puras</em>.
      </p>

      <h2>O Princípio da Função Pura</h2>
      <p>
        Funções puras obedecem a duas regras inquebráveis:
      </p>
      <ol className="list-decimal pl-6 my-4 space-y-2">
        <li><strong>Determinismo:</strong> Pela mesma entrada (inputs X, Y) ela SEMPRE retorna exatamente a mesma saída. (Concluímos então que ela não acessa <code>Date.now()</code> nem <code>Math.random()</code> na encolha).</li>
        <li><strong>Sem Efeitos Colaterais (No Side Effects):</strong> A função não altera variáveis externas a ela, não invoca <code>console.log</code>, nem dispara inserções silenciosas no banco ou chamadas HTTP. Pela arquitetura limpa, toda informação que ela precisa é passada por injeção (parâmetros).</li>
      </ol>
      
      <p><strong>Por que?</strong> Porque funções puras são banalmente imunes ao sofrimento de mocks, tornando os <em>unit tests</em> uma delícia e em milisegundos!</p>
      
      <CodeBlock 
        language="typescript" 
        code={`// ❌ IMPURA e DIFÍCIL de testar
let txContador = 0;
function calcularTaxaGlobal(valor) {
  txContador++; // Acessa variavel externa!
  return valor + (valor * ConfigDB.getTaxaLocalAtual()); // Acesso I/O pesado secreto!
}

// ✅ PURA e EXTREMAMENTE FÁCIL de testar
function calcularTaxa(valor, impostoLocal_Porcentagem) {
  return valor + (valor * impostoLocal_Porcentagem);
}`} 
      />

      <CodeBlock 
        language="typescript" 
        code={`import { test, expect } from "bun:test";

test("Calculo determinístico de imposto", () => {
  // Mock? Não precisa! Injetamos a dependência.
  expect(calculaTaxa(100, 0.2)).toBe(120);
});`} 
      />

      <h2>Inversão de Controle e Desacoplamento</h2>
      <p>
        Quando não for possível usar Pura Matemática / Transformações, você usará "Interfaces" para delegar o IO pra quem chamou o seu bloco, isso te deixará testar a regra de negócio central separada de arquivos reais.
      </p>
      
      <p className="text-slate-500 italic mt-6">Este é um paradigma ensinado também na Arquitetura Limpa (Clean Architecture) de Robert C. Martin.</p>
    </>
  ),
  ejercicios: [
    {
      titulo: "Purificando uma Rotina Suja",
      descripcion: "Dado um método `geraSlugEAtualizacaoNoDB(let titulo)`, separe a montagem string pura (`geraSlug`) de uma possível rotina side-effect que usa o db. Escreva um teste de uma linha validando a pureza de `geraSlug`."
    }
  ]
};
