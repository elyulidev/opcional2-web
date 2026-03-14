import type { ConferenciaData } from '../../types';
import { CodeBlock } from '../../components/CodeBlock';

export const data: ConferenciaData = {
  titulo: "1.1 Introducción a Bun y su ecosistema de testing",
  objetivos: [
    "Comprender qué es Bun.js y por qué usarlo para testing",
    "Conocer las ventajas sobre Jest, Vitest y otros frameworks",
    "Entender la arquitectura del test runner de Bun",
    "Identificar el grado de compatibilidad con Jest API"
  ],
  contenido: (
    <>
      <p>
        <strong>Bun.js</strong> não é apenas mais um runtime de JavaScript; ele foi construído do zero em <strong>Zig</strong> focado na inicialização rápida e desempenho máximo de execução. Ele se apresenta como um kit de ferramentas abrangente (all-in-one) que atua como interpretador, resolvedor de pacotes, test runner e bundler.
      </p>

      <h2>O que é Bun.js e por que usá-lo para testes?</h2>
      <p>
        No ecossistema atual liderado por Node.js e ferramentas construídas em cima dele, configurar um ambiente de testes pode envolver várias bibliotecas: Jest ou Vitest, TypeScript (ts-jest), e Babel. O Bun unifica tudo isso nativamente, removendo a necessidade de longos processos de configuração e transpiladores adicionais. O test runner nativo <code>bun test</code> já vem embutido por padrão.
      </p>

      <h2>Vantagens sobre Jest, Vitest e outros frameworks</h2>
      <ul>
        <li><strong>Velocidade C-like:</strong> Construído sobre o potente motor JavaScriptCore (o motor do Safari), foca na redução drástica do tempo de "cold-start". Testes no Bun rodam até 100 vezes mais rápido que no Jest.</li>
        <li><strong>Sem configuração transpiladora:</strong> Ele suporta execução direta de arquivos <code>.ts</code>, <code>.tsx</code>, e <code>.jsx</code>. Não é preciso instalar e configurar Babel, tsc ou SWC para rodar testes.</li>
        <li><strong>Módulos de Sistema e HTTP Integrados:</strong> Oferece APIs nativas ultra velozes (<code>Bun.file</code>, <code>Bun.serve</code>) que tornam os testes de IO muito mais ágeis.</li>
      </ul>

      <h2>Arquitetura do test runner do Bun</h2>
      <p>
        Diferente do Jest, que cria um grande overhead criando múltiplos threads de ambiente V8 para isolar contextos (sandboxes pesados), o Bun otimiza isso usando sub-processos mais leves, inicializando as variáveis globais rapidamente usando o JSC. Essa arquitetura sacrifica ligeiramente certo isolamento em prol de velocidade massiva.
      </p>

      <h2>Compatibilidade com a API do Jest</h2>
      <p>
        Uma das maiores prioridades do Bun foi não quebrar códigos existentes. O Bun imita a API global do Jest com muita fidelidade. Sintaxes populares do dia a dia como <code>describe</code>, <code>test</code>, <code>it</code>, e as assertions encadeadas de <code>expect</code> rodam sem você perceber que não está no Jest.
      </p>
      
      <p>Veja como um teste básico em Bun parece exatamente um teste básico de Jest:</p>
      
      <CodeBlock 
        language="typescript" 
        code={`import { expect, test } from "bun:test";

test("A compatibilidade matemática do universo prevalece", () => {
  expect(1 + 1).toBe(2);
});

// Com async
test("Esperar uma promise também funciona como de costume", async () => {
  const result = await Promise.resolve("sucesso");
  expect(result).toEqual("sucesso");
});`} 
      />
    </>
  ),
  ejercicios: [
    {
      titulo: "Análise de Comparação Estrutural",
      descripcion: "Crie um documento simples resumindo as diferenças arquiteturais entre Node.js (V8) e Bun (JSC), e como essa mudança afeta o 'cold-start' na execução das suítes de teste."
    }
  ]
};
