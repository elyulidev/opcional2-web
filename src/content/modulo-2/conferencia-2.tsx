import type { ConferenciaData } from '../../types';
import { CodeBlock } from '../../components/CodeBlock';

export const data: ConferenciaData = {
  titulo: "2.2 Setup y Teardown",
  objetivos: [
    "Entender o ciclo de vida dos testes locais e globais",
    "Dominar beforeAll, afterAll, beforeEach e afterEach",
    "Gerenciar banco de dados ou resetar estado entre testes"
  ],
  contenido: (
    <>
      <p>
        Escrever bons testes isolados muitas vezes exige um estado limpo antes de iniciar. Quer seja para zerar um banco de dados em memória, apagar instâncias de classe, ou apenas reiniciar mock de tempo, você dependerá fortemente de <strong>Hooks de Vida (Lifecycles)</strong>.
      </p>

      <h2>O Ciclo de Vida: Hooks</h2>
      <ul className="space-y-2">
        <li><code>beforeAll</code>: Executa UMA VEZ antes de todos os testes naquele arquivo/bloco. Ideal para instanciar servidores de banco.</li>
        <li><code>afterAll</code>: Executa UMA VEZ após todo arquivo/bloco concluir. Usado para derrubar servidores e serviços pesados de IO.</li>
        <li><code>beforeEach</code>: Executa antes de CADA <code>it</code> ou <code>test</code> individualmente. Crucial para zerar banco ou arrays internos de classes.</li>
        <li><code>afterEach</code>: Executa após CADA teste rodar. Bom para limpar variáveis ou fechar arquivos deixados abertos.</li>
      </ul>
      
      <CodeBlock 
        language="typescript" 
        code={`import { describe, test, expect, beforeAll, afterAll, beforeEach } from "bun:test";

let bancoDeDados: any[];

beforeAll(() => {
  // Inicialização pesada
  console.log("🟢 Conectando ao Banco...");
});

afterAll(() => {
  console.log("🔴 Fechando Banco...");
});

// Reseta o estado ANTES DE CADA teste!
beforeEach(() => {
  bancoDeDados = ["Usuário_Admin"];
});

describe("Operações no DB em Memória", () => {
  test("deve poder inserir", () => {
    bancoDeDados.push("Usuário_1");
    expect(bancoDeDados).toHaveLength(2);
  });

  // O beforeEach rodou de novo aqui! A lista reseta para tamanho 1.
  test("deve poder deletar o root", () => {
    bancoDeDados.pop();
    expect(bancoDeDados).toHaveLength(0);
  });
});`} 
      />

      <h2>Escopo Temporal e Scoping de Blocks</h2>
      <p>
        Os Hooks respeitam o aninhamento dos blocos <code>describe</code>. Um <code>beforeEach</code> definido globalmente rodará em todos os describes abaixo. Um <code>beforeEach</code> dentro de um <code>describe</code> específico só rodará nos testes contidos lá. Isso permite a construção de configurações muito granulares.
      </p>
    </>
  ),
  ejercicios: [
    {
      titulo: "Limpeza de Histórico",
      descripcion: "Crie uma classe CaixaEletronico estática onde cada saque diminui uma quantia. No seu teste, implemente um beforeEach para resetar a quantia estática, permitindo que multiplos testes modifiquem o saldo mas encontrem ele inicializado no seu beforeEach de novo."
    }
  ]
};
