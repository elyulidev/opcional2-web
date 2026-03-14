import type { ConferenciaData } from '../../types';
import { CodeBlock } from '../../components/CodeBlock';

export const data: ConferenciaData = {
  titulo: "3.1 Promises y Async/Await",
  objetivos: [
    "Testar funções que retornam Promises de forma limpa",
    "Garantir resolução e rejeição corretas",
    "Entender a necessidade de async/await no it callback",
    "Configurar Timeouts adequados"
  ],
  contenido: (
    <>
      <p>
        O JavaScript moderno é inerentemente assíncrono. Seja lendo um arquivo, consultando o banco de dados ou realizando requests de rede. O framework de testes precisa saber esperar o "momento futuro" em que a sua Promise vai resolver. O Bun suporta assincronismo perfeitamente no <code>test</code> e no <code>it</code>.
      </p>

      <h2>O uso do Async/Await</h2>
      <p>
        A forma mais fácil e recomendada de testar funções que retornam Promises é marcando o próprio callback do seu teste como <code>async</code>.
      </p>
      
      <CodeBlock 
        language="typescript" 
        code={`import { test, expect } from "bun:test";
import { buscarUsuarioNoBanco } from "./bd";

test("deve buscar o usuário 1 com sucesso", async () => {
  // O runtime do Bun entende que precisa esperar por 'await' antes de finalizar o teste
  const user = await buscarUsuarioNoBanco(1);
  
  expect(user).toBeDefined();
  expect(user.nome).toBe("Alice");
});`} 
      />

      <h2>Matchers Assíncronos: <code>resolves</code> e <code>rejects</code></h2>
      <p>
        Uma sintaxe alternativa e muitas vezes mais limpa é chamar o expect diretamente na sua Promise, encadeado com modificadores.
      </p>
      
      <CodeBlock 
        language="typescript" 
        code={`test("deve resolver para Alice usando resolves", async () => {
  const queryPromise = buscarUsuarioNoBanco(1);
  
  // Note o 'await' no EXPECT, não na query
  await expect(queryPromise).resolves.toHaveProperty("nome", "Alice");
});

test("deve rejeitar promise se usuário não existir", async () => {
  const badQuery = buscarUsuarioNoBanco(999);
  
  await expect(badQuery).rejects.toThrow("Usuário não encontrado");
});`} 
      />

      <h2>Gerenciando o Timeout</h2>
      <p>
        O padrão é que um teste falhe se uma Promise demorar muito (usualmente 5 segundos). Você pode aumentar esse timeout passando um terceiro argumento no <code>test</code> ou <code>it</code>.
      </p>
      
      <CodeBlock 
        language="typescript" 
        code={`test("processamento noturno gigante", async () => {
  await emitirRelatoriosAnuais();
  expect(true).toBe(true);
}, 30000); // Espera até 30 segundos`} 
      />
    </>
  ),
  ejercicios: [
    {
      titulo: "O Repositório Fantasma",
      descripcion: "Crie uma função `fakeFetch()` que retorna uma Promise que resolve após 300ms com uma string. Crie 2 testes que a utilizem. Um com `await fakeFetch()` simples, e o outro encadeando `await expect(fakeFetch()).resolves...`."
    }
  ]
};
