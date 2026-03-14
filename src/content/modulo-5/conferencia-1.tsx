import type { ConferenciaData } from '../../types';
import { CodeBlock } from '../../components/CodeBlock';

export const data: ConferenciaData = {
  titulo: "5.1 Testing de APIs REST",
  objetivos: [
    "Usar o ecossistema Bun para testar endpoints REST genéricos",
    "Integrar Supertest com Servidores Bun",
    "Testar Autenticação e Autorização",
    "Validar esquemas complexos usando Zod nos retornos"
  ],
  contenido: (
    <>
      <p>
        As APIs REST são a espinha dorsal da web atual. Quando testamos contratos e payloads HTTP, o clássico da indústria é a biblioteca <code>supertest</code>. No entanto, por causa das APIs embutidas do Bun como o <code>fetch</code> e ferramentas de tipagem estrita como <code>Zod</code>, a necessidade de plugins pesados diminuiu muito.
      </p>

      <h2>O Padrão sem Supertest (Testes Nativos)</h2>
      <p>
        A velocidade atroz do Bun permite instanciar e matar o seu servidor web dezenas de vezes por segundo no background. Consequentemente, fazer requisições <code>fetch()</code> contra ele na porta <code>localhost</code> se torna quase instantâneo.
      </p>

      <CodeBlock 
        language="typescript" 
        code={`import { expect, test, beforeAll, afterAll } from "bun:test";
import { app } from "./meu-backend";

let serverUrl: string;

beforeAll(() => {
  // Inicialização do servidor na porta 0 vai dar uma porta livre dinâmica!
  const server = Bun.serve({
    port: 0,
    fetch: app.fetch,
  });
  serverUrl = \`http://\${server.hostname}:\${server.port}\`;
});

// A rota real da API pode ser testada com o Fetch puro do navegador
test("GET /api/public retorna { ok: true }", async () => {
  const req = await fetch(\`\${serverUrl}/api/public\`);
  const body = await req.json();

  expect(req.status).toBe(200);
  expect(body).toEqual({ ok: true });
});`} 
      />

      <h2>Testando Autenticação (JWT)</h2>
      <p>
        Enviar tokens falsos ou credenciais inválidas para ver se a aplicação responde 401:
      </p>
      
      <CodeBlock 
        language="typescript" 
        code={`test("GET /api/secure/profile rejeita sem Authorization Header", async () => {
  const req = await fetch(\`\${serverUrl}/api/secure/profile\`);
  
  expect(req.status).toBe(401);
});

test("GET /api/secure/profile aceita JWT válido", async () => {
  const validToken = gerarTestTokenMock();
  
  const req = await fetch(\`\${serverUrl}/api/secure/profile\`, {
    headers: { Authorization: \`Bearer \${validToken}\` }
  });
  
  expect(req.status).toBe(200);
  expect(await req.json()).toHaveProperty("user");
});`} 
      />

      <h2>Validação e Contratos com Schemas (Zod)</h2>
      <p>
        Garantir o formado do Payload sem checar campo por campo:
      </p>

      <CodeBlock 
        language="typescript" 
        code={`import { z } from "zod";

const UsuarioSchema = z.object({
  id: z.string().uuid(),
  nome: z.string().min(2),
  role: z.enum(["admin", "user"])
});

test("O formato do Payload deve aderir estritamente ao Schema Zod", async () => {
  const req = await fetch(\`\${serverUrl}/api/users/1\`);
  const body = await req.json();

  // Se falhar o parse términal do teste avisa qual chave foi violada
  expect(() => UsuarioSchema.parse(body)).not.toThrow();
});`} 
      />
    </>
  ),
  ejercicios: [
    {
      titulo: "TDD em API",
      descripcion: "Num arquivo, monte um Bun.serve() que retorna erro 405 se não for do método `POST`. Crie um teste usando um `fetch` passando na variável `method: 'GET'` e preveja a quebra (status 405)."
    }
  ]
};
