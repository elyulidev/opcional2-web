import type { ConferenciaData } from '../../types';
import { CodeBlock } from '../../components/CodeBlock';

export const data: ConferenciaData = {
  titulo: "3.3 Testing de APIs y HTTP",
  objetivos: [
    "Fazer mocking da API fetch nativa do Bun",
    "Testar manipulação de JSON e erros em chamadas de rede",
    "Distinguir Teste de Integração Real x Mocks"
  ],
  contenido: (
    <>
      <p>
        Softwares raramente vivem ilhados, eles o tempo todo buscam dados via <code>fetch</code>. O Bun implementa <code>fetch()</code> da mesma forma rápida e moderna que os navegadores (sem bibliotecas de terceiros como axios ou node-fetch).
      </p>

      <h2>Mocking do <code>fetch</code> Global</h2>
      <p>
        Para testar uma função que consome uma API externa sem realmente derrubar a API com milhares de requisições de CI, nós injetamos ("mockamos") a função global.
      </p>
      
      <CodeBlock 
        language="typescript" 
        code={`import { test, expect, mock } from "bun:test";
import { getBitcoinPrice } from "./finance";

test("API de Bitcoin processa o json corretamente", async () => {
  // Intercepta e substitui
  globalThis.fetch = mock(() =>
    Promise.resolve(new Response(JSON.stringify({ price: 50000 })))
  );

  const price = await getBitcoinPrice();
  
  expect(price).toBe(50000);
  expect(globalThis.fetch).toHaveBeenCalledTimes(1);
});`} 
      />

      <h2>Simulando Erros da Rede (500, 404, Offline)</h2>
      <p>Os desenvolvedores amam focar no "caminho feliz". Testes servem justamente para estressarmos os caminhos de choro. E se a rede cair ou o servidor retornar um Gateway Timeout (504)?</p>
      
      <CodeBlock 
        language="typescript" 
        code={`test("deve tratar queda repentina de rede na requisição externa", async () => {
  globalThis.fetch = mock(() => Promise.reject(new Error("Network Failure")));

  // Testando o fallback ou try-catch elegante da nossa aplicação
  const response = await getBitcoinPrice(); 
  expect(response).toEqual("Não foi possível buscar a cotação");
});

test("Trata reposta com status 404", async () => {
  globalThis.fetch = mock(() => Promise.resolve(new Response("Not Found", { status: 404 })));
  
  await expect(getBitcoinPrice()).rejects.toThrow("Moeda Inexistente");
});`} 
      />

      <h2>Caminho com Integração (Sem Mock)</h2>
      <p>
        Se a sua suite não é de "Unit Test" mas de E2E ou Integração, você chamará um container docker real ou URL de staging local. Nesses casos, basta usar <code>fetch</code> sem mocar! Por conta da API embutida rápida do Bun, você consegue chamar a DB em frações de segundo.
      </p>
    </>
  ),
  ejercicios: [
    {
      titulo: "Sua própria API de Cotações",
      descripcion: "Crie uma função async chamada `buscaEstatisticasGitHub(username)`. Escreva 2 testes: Um mockando um JSON amigável (Status 200) usando `new Response()`, e um gerando um erro 403 de Rate Limiting e validando seu try/catch."
    }
  ]
};
