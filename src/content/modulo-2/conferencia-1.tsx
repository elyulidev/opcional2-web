import type { ConferenciaData } from '../../types';
import { CodeBlock } from '../../components/CodeBlock';

export const data: ConferenciaData = {
  titulo: "2.1 Assertions y Matchers",
  objetivos: [
    "Dominar correspondencias essenciais: toBe, toEqual, toBeTruthy",
    "Trabalhar com números e strings de forma precisa",
    "Validar objetos, arrays e exceções (throws)"
  ],
  contenido: (
    <>
      <p>
        A função <code>expect()</code> é o motor por trás de cada asserção num teste. Ela recebe um valor ("o que recebemos") e retorna um objeto de matchers contendo métodos para avaliar se ele coincide com a expectativa ("o que esperamos").
      </p>

      <h2>Matchers Básicos</h2>
      <ul className="space-y-4">
        <li>
          <code>toBe()</code>: Utiliza a comparação estrita da igualdade na memória (Object.is). Perfeito para tipos primitivos (números, strings, booleanos).
        </li>
        <li>
          <code>toEqual()</code>: Executa uma verificação profunda (deep equality). Indispensável para Objetos e Arrays onde as instâncias em memória são independentes.
        </li>
      </ul>
      
      <CodeBlock 
        language="typescript" 
        code={`import { expect, test } from "bun:test";

test("comparação de literais vs objetos", () => {
  expect(10).toBe(10);
  expect("olá").toBe("olá");
  
  const obj1 = { id: 1 };
  const obj2 = { id: 1 };
  
  // expect(obj1).toBe(obj2); // ISSO FALHA! Instâncias diferentes na memória
  expect(obj1).toEqual(obj2); // SUCESSO! Conteúdo estrutural é o mesmo
});`} 
      />

      <h2>Truthy, Falsy, Undefined e Null</h2>
      <p>Validação de propriedades que indicam estados boleanos booleanos.</p>
      <CodeBlock 
        language="typescript" 
        code={`expect(user.isActive).toBeTruthy();
expect(false).toBeFalsy();
expect(user.email).toBeNull();
expect(user.idade).toBeUndefined();
expect(user.idade).toBeDefined();`} 
      />

      <h2>Strings e Números</h2>
      <p>O Bun providencia matchers úteis para faixas numéricas e padrão em textos.</p>
      <CodeBlock 
        language="typescript" 
        code={`// Números
expect(pontuacao).toBeGreaterThan(10);
expect(pontuacao).toBeGreaterThanOrEqual(10);
expect(0.1 + 0.2).toBeCloseTo(0.3); // Usado para floats devido à imprecisão matemática

// Strings
expect("Bun é incrível").toMatch(/incrível/); // Regex suportado
expect("Opcional 2").toContain("Opcional");`} 
      />

      <h2>Coleções (Arrays e Objetos)</h2>
      <CodeBlock 
        language="typescript" 
        code={`const modulos = ["Fundamentos", "Testing Asíncrono", "Integração"];
expect(modulos).toContain("Integração");
expect(modulos).toHaveLength(3);

const dev = { nome: "João", cargo: "Pleno" };
expect(dev).toHaveProperty("nome");`} 
      />

      <h2>Exceções</h2>
      <p>Você pode testar se seu código lança um erro, envolvendo-o numa função callback para que o matcher capture a exceção adequadamente:</p>
      <CodeBlock 
        language="typescript" 
        code={`function quebrar(): void {
  throw new Error("Falha no banco de dados");
}

expect(() => quebrar()).toThrow();
expect(() => quebrar()).toThrow("Falha"); // checa parte da mensagem`} 
      />
    </>
  ),
  ejercicios: [
    {
      titulo: "Construindo o Validador de Senhas",
      descripcion: "Crie uma suite de testes que verifique: 1) Que senhas curtas lançam erro usando toThrow, 2) que 'validar' retorna true (toBeTruthy) para senhas fortes e 3) que a lista de erros não contêm a string nula."
    }
  ]
};
