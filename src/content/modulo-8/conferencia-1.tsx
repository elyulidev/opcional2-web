import type { ConferenciaData } from '../../types';
import { CodeBlock } from '../../components/CodeBlock';

export const data: ConferenciaData = {
  titulo: "8.1 Projeto 1: API REST con Testing Completo",
  objetivos: [
    "Aplicar os conceitos dos módulos anteriores em um projeto realista",
    "Modelar uma API de Tarefas (To-Do) CRUD Completa",
    "Escrever testes Unitários para Regras de Negócio",
    "Escrever Testes E2E (Integração) sobre a camada Web Elysia"
  ],
  contenido: (
    <>
      <p>
        A meta deste curso é que você construa e entregue aplicações do mundo real confiáveis, mantíveis e escaláveis. Neste projeto guiado, desenvolveremos uma <strong>API de Lista de Tarefas (To-Do App)</strong> usando Bun e SQLite in-memory, coberta 100% por testes.
      </p>

      <h2>A Arquitetura Simplificada</h2>
      <p>Nós separaremos estritamente a nossa aplicação em 3 camadas cruciais para a Testabilidade Limpa:</p>
      <ul className="mb-6 space-y-2">
        <li><strong>Models/Entities</strong>: Entidades puras e regras estáticas sem I/O.</li>
        <li><strong>Repository</strong>: A ponte com o SQLite (o único lugar que fala <code>SQL</code>).</li>
        <li><strong>Controllers/Routes</strong>: A camada HTTP gerenciada pelo Elysia que lê JSON e orquestra as dependências.</li>
      </ul>

      <h2>A Entidade (Pura)</h2>
      <CodeBlock 
        language="typescript" 
        code={`// src/domain/todo.ts
export class TodoEntity {
  constructor(
    public readonly id: string,
    public title: string,
    public isCompleted: boolean = false
  ) {
    if (title.length < 3) throw new Error("Título inválido");
  }

  concluir() { this.isCompleted = true; }
}`} 
      />

      <p>Teste as entidades isoladamente, sem precisar Mockar nada:</p>

      <CodeBlock 
        language="typescript" 
        code={`import { describe, test, expect } from "bun:test";
import { TodoEntity } from "./todo";

describe("Regras da Entidade Todo", () => {
  test("Impede criar com título minúsculo", () => {
    expect(() => new TodoEntity("1", "oi")).toThrow("Título inválido");
  });

  test("Marca como concluído corretamente", () => {
    const todo = new TodoEntity("1", "Dormir");
    todo.concluir();
    expect(todo.isCompleted).toBe(true);
  });
});`} 
      />

      <h2>O Repository (Base de Dados Local Mapeada)</h2>
      <CodeBlock 
        language="typescript" 
        code={`import { describe, beforeEach, afterEach, expect, test } from "bun:test";
import { Database } from "bun:sqlite";

describe("Todo Repository Integrado", () => {
  let db: Database;
  let repo: TodoRepo; // sua classe conectora do sql

  beforeEach(() => {
    // In Memory! O banco limpa magicamente por arquivo
    db = new Database(":memory:");
    db.run("CREATE TABLE todos (id TEXT, title TEXT, done BOOLEAN)");
    repo = new TodoRepo(db);
  });

  afterEach(() => db.close());

  test("Insere e lê corretamente o DB In Memory em Nanossegundos", () => {
    const res = repo.salvar(new TodoEntity("u1", "Lavar o carro"));
    expect(res).toBe(true);
    
    // Testa o fetch via metodo proprio
    const lista = repo.listarTodos();
    expect(lista).toHaveLength(1);
    expect(lista[0].title).toBe("Lavar o carro");
  });
});`} 
      />

      <h2>A Rota Real (Elysia.js) E2E Test Injetado</h2>
      <p>
        Por fim, amarramos o banco à camada Web, enviando payloads brutos HTTP:
      </p>

      <CodeBlock 
        language="typescript" 
        code={`import { app } from "./server";

describe("E2E Elysia routes", () => {
  test("POST /todos cria a tarefa corretamente via REST HTTP Injetado", async () => {
    const payloadBufferMock = JSON.stringify({ title: "Nova Tarefa POST" });
    
    // Pipeline Request de Mentira, Resposta de Verdade
    const respostaString = await app.handle(
      new Request('http://localhost/todos', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: payloadBufferMock
      })
    );

    const json = await respostaString.json();
    expect(respostaString.status).toBe(201); // Created!
    expect(json.id).toBeDefined();
  });
});`} 
      />
    </>
  ),
  ejercicios: [
    {
      titulo: "Construção Autônoma da Pipeline",
      descripcion: "Reproduza as 3 etapas na sua máquina local e conclua a API de Tarefas emulando o `bun test --coverage` exigindo 100% em Branchs do seu TodoEntity. Implementar PUT (Atualizar) e DELETE."
    }
  ]
};
