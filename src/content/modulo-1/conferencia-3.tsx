import type { ConferenciaData } from '../../types';
import { CodeBlock } from '../../components/CodeBlock';

export const data: ConferenciaData = {
  titulo: "1.3 Tu primer test con Bun",
  objetivos: [
    "Aprender la sintaxis básica (describe, test, it, expect)",
    "Comprender cómo ejecutar tests mediante CLI",
    "Dominar las opciones básicas de la CLI",
    "Utilizar el watch mode para el desarrollo continuo"
  ],
  contenido: (
    <>
      <p>
        Agora que temos nosso ambiente configurado, é hora de sujar as mãos com código de verdade. Vamos explorar como construir e rodar o seu primeiro teste utilizando as sintaxes mais comuns.
      </p>

      <h2>Sintaxe Básica</h2>
      <p>
        A biblioteca nativa do Bun é exportada através de um pacote interno chamado <code>bun:test</code>. É de lá que importamos nossas funções construtoras de testes.
      </p>
      
      <CodeBlock 
        language="typescript" 
        code={`import { describe, it, expect, test } from "bun:test";
import { validarIdade } from "./validador"; // sua funçao

describe("Validador de Idade", () => {
  it("deve rejeitar uma idade negativa", () => {
    expect(() => validarIdade(-5)).toThrow();
  });

  // 'test' é um alias idêntico a 'it'
  test("deve aceitar uma idade acima de 18", () => {
    expect(validarIdade(20)).toBe(true);
  });
});`} 
      />

      <h2>Executando e Controlando via CLI</h2>
      <p>
        Para executar o arquivo, usamos a CLI do Bun:
      </p>
      <CodeBlock language="bash" code="bun test" />
      
      <p>O Bun automaticamente escaneia seu projeto, ignora o <code>node_modules</code> e executa todos os arquivos correspondentes.</p>

      <h3>Opções úteis de CLI</h3>
      <ul className="space-y-3">
        <li>
          <code>bun test nome_do_arquivo</code>
          <p className="text-sm text-slate-500 mt-1">Roda apenas um arquivo específico.</p>
        </li>
        <li>
          <code>bun test -t "deve aceitar"</code>
          <p className="text-sm text-slate-500 mt-1">O parâmetro -t filtra a execução pelo nome do teste ou do <code>describe</code> (padrão regex ou string).</p>
        </li>
        <li>
          <code>bun test --timeout 5000</code>
          <p className="text-sm text-slate-500 mt-1">Muda o tempo de timeout padrão antes que um teste asíncrono falhe (ótimo para CI lentos).</p>
        </li>
      </ul>

      <h2>O Modo de Visualização (Watch Mode)</h2>
      <p>
        O <em>Watch mode</em> revoluciona a experiência de desenvolvimento (DX). Em vez de rodar o comando manualmente após cada mudança, o Bun mantém o processo aberto, observando alterações no sistema de arquivos. Quando você salva um arquivo, ele detecta quais dependências foram modificadas e roda os testes afetados quase instantaneamente.
      </p>
      
      <CodeBlock language="bash" code="bun test --watch" />
    </>
  ),
  ejercicios: [
    {
      titulo: "Prática Dirigida",
      descripcion: "Crie uma função `calcularJurosSimples(capital, taxa, tempo)` num arquivo `financas.ts`. Crie um teste com 3 cenários diferentes (it) para validação. Execute os testes usando watch mode."
    }
  ]
};
