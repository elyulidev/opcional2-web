import type { ConferenciaData } from '../../types';
import { CodeBlock } from '../../components/CodeBlock';

export const data: ConferenciaData = {
  titulo: "4.3 Testing de TypeScript",
  objetivos: [
    "Aproveitar o suporte nativo do Bun ao TypeScript",
    "Testar manipulações de tipos e interfaces",
    "Utilizar utility types (expectTypeOf) em testes estruturais"
  ],
  contenido: (
    <>
      <p>
        O <strong>Bun</strong> é um runtime de JavaScript e TypeScript de primeira classe. Ao contrário do Node.js, onde precisamos do <code>ts-node</code> ou de compiladores intermediários, o Bun executa os arquivos <code>.ts</code> ou <code>.tsx</code> diretamente, transpilando "on the fly" em frações de milissegundos.
      </p>

      <h2>Tipagem Estática em Testes</h2>
      <p>
        A maior vantagem em usar TypeScript nas suas suítes de teste é a possibilidade de validar a <strong>estrutura</strong> do dado que você espera, antes mesmo que o código seja executado, graças aos erros de compilação.
      </p>

      <CodeBlock 
        language="typescript" 
        code={`import { expect, test } from "bun:test";
import type { UserStatus } from "./types";

test("Status do usuário deve ser um tipo válido", () => {
  // TypeScript ajuda no autocomplete e na validação!
  const currentStatus: UserStatus = "active";
  
  expect(currentStatus).toBe("active");
});`} 
      />

      <h2>Testando Tipos com <code>expectTypeOf</code></h2>
      <p>
        Algumas vezes, a sua lógica central reside puramente no TypeScript (mapped types, generics complexos). Para testar exclusivamente o sistema de tipos (sem gerar código executável), o ecossistema de testes costuma utilizar utilitários estáticos. (<em>Nota: Em Vitest isso é build-in, no Bun você pode usar pacotes como `expect-type` ou validar assinaturas manualmente na asserção estática</em>).
      </p>

      <CodeBlock 
        language="typescript" 
        code={`// Garantindo que uma variável só possa ser de certo tipo
function processar(dado: string | number) {
  if (typeof dado === "number") {
    // O TS sabe que aqui "dado" é garantidamente number
    const transformado: number = dado * 2;
    return transformado;
  }
  return dado.toLowerCase();
}`} 
      />

      <h2>Type Assertions (As) no Setup</h2>
      <p>
        Ao realizar Mocks, frequentemente precisamos usar asserções de tipo para enganar o compilador TS fingindo que o Mock é a classe real.
      </p>

      <CodeBlock 
        language="typescript" 
        code={`import { mock } from "bun:test";
import { Database } from "./db";

const mockDb = {
  query: mock(() => Promise.resolve([]))
} as unknown as Database; // Coerção de Tipo para Mocks parciais`} 
      />
    </>
  ),
  ejercicios: [
    {
      titulo: "Generics e Mocks com TS",
      descripcion: "Crie uma interface `Repositorio<T>`. Instancie um Mock falso usando Type Assertion `as Repositorio<Usuario>` e passe-o para um service, atestando que a tipagem do serviço não reclame."
    }
  ]
};
