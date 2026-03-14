import type { ConferenciaData } from '../../types';
import { CodeBlock } from '../../components/CodeBlock';

export const data: ConferenciaData = {
  titulo: "5.2 Testing de aplicaciones full-stack y Elysia",
  objetivos: [
    "Familiarizar-se com os padrões de teste no Elysia.js",
    "Escrever E2E (End-to-End) básicos via roteadores backend/frontend",
    "Mockar instâncias de banco num framework Web Real"
  ],
  contenido: (
    <>
      <p>
        O <strong>Elysia.js</strong> é sem dúvida o framework HTTP mais elogiado do ecossistema Bun. Ele e o Bun formam uma dupla imbatível, semelhante ao <code>Express + Node.js</code> de uma década atrás, mas tipado e incrivelmente mais performático.
      </p>

      <h2>Roteamento TDD com Elysia</h2>
      <p>
        A equipe Elysia desenvolveu a arquitetura de modo que você não precise de fato instanciar portas TCP da rede caso queira rodar fluxos internamente. O Elysia consegue injetar Requests "falsos" no pipeline através dos métodos internos, ou pelo seu plugin de testes famoso chamado <code>edenTreaty</code>.
      </p>

      <CodeBlock 
        language="typescript" 
        code={`import { describe, expect, it } from 'bun:test'
import { Elysia } from 'elysia'

const app = new Elysia()
  .get('/', () => 'Olá Testing!')
  .post('/novo', ({ body }) => body)

describe('MeuApp Elysia', () => {
  it('responde e retorna mundo no GET /', async () => {
    // Elysia permite chamar .handle() passando um objeto Request puro nativo!
    // Ele processa os middlewares internamente sem requisições reais de tcp
    const response = await app.handle(new Request('http://localhost/'))
    
    expect(response.status).toBe(200);
    expect(await response.text()).toBe('Olá Testing!');
  });
})`} 
      />

      <h2>Testando Rotas com Plugins e Middlewares complexos</h2>
      <p>
        Se a sua rota tiver plugins de Autorização (JWT / Hooks localizados de onRequest), testá-la enviando "Payloads falsificados e Injetados" é a forma recomendada.
      </p>

      <CodeBlock 
        language="typescript" 
        code={`it('POST aceita JSON e serializa devidamente', async () => {
  const dadosEnviados = { userId: 5, payload: "teste secreto" };

  const response = await app.handle(
    new Request('http://localhost/novo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dadosEnviados)
    })
  );

  expect(response.status).toBe(200);
  const data = await response.json();
  
  expect(data.userId).toBe(5);
});`} 
      />

      <h2>End-to-End (E2E) Básico no Full-Stack</h2>
      <p>
        Quando nós empacotamos o Frontend (React/HTMX) rodando servido pelo mesmo app Bun, os testes podem solicitar diretamente um DOM inteiro, retornando o HTML. E usar bibliotecas como <code>jsdom</code> (ou o runner de testes <code>happy-dom</code> no Bun) para avaliar o que renderizou!
      </p>

      <div className="mt-8 bg-slate-100 dark:bg-slate-800 p-5 rounded-lg border border-slate-300 dark:border-slate-700">
        <h3 className="font-semibold mb-2 flex items-center gap-2"><span role="img" aria-label="Aviso">🚀</span> Padrão Eden (Elysia Client)</h3>
        <p className="text-sm">
          A documentação avançada do Elysia recomenda fortemente o uso do plugin Eden Treaty nos testes E2E. Isso cria um cliente fortemente tipado, onde você consumirá <code>app.api.novo.post()</code> no seu script de teste em vez de URLs brutas como strings. Dessa forma, quebrar uma URL do backend instantaneamente apitará no TypesCript vermelho do seu teste de frontend!
        </p>
      </div>

    </>
  ),
  ejercicios: [
    {
      titulo: "Construindo Roteamentos com TDD",
      descripcion: "Inicialize o Elysia (simulado ou real se possível) e gere 3 testes usando a técnica de injeção `app.handle(new Request(...))` explorando middlewares de erro, um com status 400 e outro de reposta em texto plano."
    }
  ]
};
