import type { ConferenciaData } from '../../types';
import { CodeBlock } from '../../components/CodeBlock';
import { Concept, Callout, Box } from '../../components/CourseComponents';

export const data: ConferenciaData = {
  titulo: "1.1 Introdução ao Bun e ao seu ecossistema de testing",
  objetivos: [
    "Compreender o que é o Bun.js e por que usá-lo para testing",
    "Conhecer as vantagens sobre o Jest, Vitest e outros frameworks",
    "Entender a arquitetura do test runner do Bun",
    "Identificar o grau de compatibilidade com o Jest API"
  ],
  contenido: (
    <>
      <Concept title="O que é o Bun.js?">
        <p className="mb-4">
          <strong>Bun</strong> é um runtime de JavaScript/TypeScript ultra-rápido, tudo-em-um, que inclui:
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-4 font-mono text-[0.9em]">
          <li>Um runtime de JavaScript (alternativa ao Node.js e Deno)</li>
          <li>Um bundler integrado</li>
          <li>Um transpilador de TypeScript</li>
          <li>Um gestor de pacotes (como npm/yarn/pnpm)</li>
          <li>Um test runner nativo ⚡</li>
        </ul>
        <p>
          Foi criado por Jarred Sumner e está escrito em <strong className="text-primary text-2xl">Zig</strong>, o que o torna extremamente rápido.
        </p>
      </Concept>

      <h2>Por que usar o Bun para testing?</h2>
      <h3>🚀 Velocidade extrema</h3>
      <Callout title="Comparação de velocidade" type="tip">
        <ul className="space-y-2 mb-4 font-mono">
          <li><strong>Jest:</strong> ~3-5 segundos para 100 testes</li>
          <li><strong>Vitest:</strong> ~1-2 segundos para 100 testes</li>
          <li className="text-primary font-black text-xl"><strong>Bun:</strong> ~0.3-0.5 segundos para 100 testes ⚡</li>
        </ul>
        <p className="font-bold border-t-2 border-zinc-900/20 dark:border-zinc-100/20 pt-2 border-dashed">O Bun é até <span className="text-2xl text-primary font-black">10-20x</span> mais rápido que o Jest em muitos casos.</p>
      </Callout>

      <h3>⚡ Tudo integrado</h3>
      <p>Não precisas de instalar dependências adicionais:</p>
      <CodeBlock 
        language="bash" 
        code={`# Com o Jest precisas de:
npm install --save-dev jest @types/jest ts-jest

# Com o Bun já está tudo incluído:
bun install bun
# Já tens o testing pronto!`} 
      />

      <h3>🎯 Compatibilidade com o Jest API</h3>
      <p>Se conheces o Jest, já conheces o testing do Bun. Usa a mesma sintaxe:</p>
      <CodeBlock 
        language="javascript" 
        code={`import { describe, test, expect } from "bun:test";

describe("o meu grupo de testes", () => {
  test("soma 1 + 1", () => {
    expect(1 + 1).toBe(2);
  });
});`} 
      />

      <h3>🔥 TypeScript nativo</h3>
      <p>Não precisas de configuração extra. O Bun executa TypeScript diretamente:</p>
      <CodeBlock 
        language="typescript" 
        code={`// ficheiro.test.ts
import { test, expect } from "bun:test";

interface User {
  name: string;
  age: number;
}

test("TypeScript funciona nativamente", () => {
  const user: User = { name: "Ana", age: 25 };
  expect(user.name).toBe("Ana");
});`} 
      />

      <hr className="my-12 border-2 border-zinc-900 dark:border-zinc-100" />

      <h2>Arquitectura del Test Runner de Bun</h2>

      <h3>Componentes principais:</h3>
      <CodeBlock 
        language="text" 
        code={`┌─────────────────────────────────────┐
│       BUN TEST RUNNER               │
├─────────────────────────────────────┤
│ 1. Test Discovery                   │ ← Encontra ficheiros *.test.ts
│    - Procura ficheiros de teste     │
│    - Carrega módulos                │
├─────────────────────────────────────┤
│ 2. Test Execution Engine            │ ← Motor de execução rápido
│    - Paralelização automática      │
│    - Isolamento entre testes        │
├─────────────────────────────────────┤
│ 3. Assertion Library                │ ← Compatível com o Jest matchers
│    - expect() API                   │
│    - Matchers integrados            │
├─────────────────────────────────────┤
│ 4. Mocking System                   │ ← Sistema de mocks
│    - jest.fn()                      │
│    - jest.mock()                    │
├─────────────────────────────────────┤
│ 5. Reporter                         │ ← Resultados na consola
│    - Output formatado               │
│    - Relatórios de Coverage         │
└─────────────────────────────────────┘`} 
      />

      <h3>Características clave:</h3>
      <Box className="my-8">
        <p><strong>1. Ejecución paralela por defecto</strong></p>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">Bun utiliza sub-procesos ligeros para ejecutar tests en paralelo sin el overhead de Node.js.</p>
      </Box>
      <CodeBlock 
        language="javascript" 
        code={`// Bun ejecuta estos tests en paralelo automáticamente
test("test 1", async () => { /* ... */ });
test("test 2", async () => { /* ... */ });
test("test 3", async () => { /* ... */ });`} 
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-10">
        <Box className="border-cyan-500 shadow-[4px_4px_0px_#06b6d4]">
          <h4 className="font-black uppercase mb-2">2. Aislamiento de módulos</h4>
          <p>Cada archivo de test se ejecuta en su propio contexto, evitando interferencias entre suites.</p>
        </Box>
        <Box className="border-primary shadow-[4px_4px_0px_#ec4899]">
          <h4 className="font-black uppercase mb-2">3. HMR (Hot Module Replacement)</h4>
          <p>En modo watch, Bun detecta qué tests dependen de qué archivos y solo re-ejecuta lo estrictamente necesario.</p>
        </Box>
      </div>

      <h2>Compatibilidad con Jest API</h2>
      <Callout title="Migración desde Jest" type="info">
        <p>Bun implementa gran parte de la API de Jest, lo que facilita la migración:</p>
        <CodeBlock 
          language="javascript" 
          code={`// Todas estas funcionan en Bun
describe(), test(), it()
expect()
beforeAll(), afterAll()
beforeEach(), afterEach()
jest.fn(), jest.spyOn()
jest.mock()
.toBe(), .toEqual(), .toMatchObject()`} 
        />
      </Callout>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
        <Box className="bg-amber-50 dark:bg-amber-950/20 border-amber-500">
          <h4 className="font-black uppercase mb-2">⚠️ Import de bun:test</h4>
          <p className="text-sm">A diferencia de Jest, Bun requiere importar las funciones explícitamente.</p>
          <CodeBlock 
            language="javascript" 
            code={`import { test } from "bun:test";`} 
          />
        </Box>
        <Box className="bg-green-50 dark:bg-green-950/20 border-green-500">
          <h4 className="font-black uppercase mb-2">✅ Cero Configuración</h4>
          <p className="text-sm">No necesitas un <code>jest.config.js</code>. Bun funciona "out-of-the-box".</p>
        </Box>
      </div>

      <Callout title="Limitaciones actuales" type="warning">
        <p>Algunas features avanzadas aún no están soportadas o están en desarrollo:</p>
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li><code>jest.requireActual()</code> (En desarrollo)</li>
          <li>Opciones de configuración muy específicas de entornos Node.js</li>
        </ul>
      </Callout>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
        <Box className="border-green-500 bg-green-50 dark:bg-green-950/10 shadow-[6px_6px_0px_#22c55e]">
          <h3 className="text-2xl font-black uppercase mb-4 flex items-center gap-2">
            <span className="text-3xl">✅</span> Perfeito para:
          </h3>
          <ul className="list-none space-y-2 font-bold">
            <li>• Aplicações novas desde o zero</li>
            <li>• APIs e backends com o Bun</li>
            <li>• Maximizar a velocidade em CI/CD</li>
            <li>• Projetos TypeScript puros</li>
          </ul>
        </Box>

        <Box className="border-amber-500 bg-amber-50 dark:bg-amber-950/10 shadow-[6px_6px_0px_#f59e0b]">
          <h3 className="text-2xl font-black uppercase mb-4 flex items-center gap-2">
            <span className="text-3xl">🤔</span> Considera se:
          </h3>
          <ul className="list-none space-y-2 font-bold">
            <li>• Precisas de plugins do Jest específicos</li>
            <li>• Projetos legacy muito massivos</li>
            <li>• Funcionalidades do Jest não suportadas</li>
            <li>• Ecossistema Node.js crítico</li>
          </ul>
        </Box>
      </div>

      <h2>Comparação rápida</h2>
      <div className="overflow-x-auto border-4 border-zinc-900 dark:border-zinc-100 shadow-[8px_8px_0px_#ec4899] dark:shadow-[8px_8px_0px_#ec4899] mb-12">
        <table className="w-full text-left border-collapse bg-light-surface dark:bg-dark-surface">
          <thead>
            <tr className="bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 uppercase font-black tracking-wider border-b-4 border-zinc-900 dark:border-zinc-100">
              <th className="p-4 border-r-4 border-zinc-900 dark:border-white">Funcionalidade</th>
              <th className="p-4 border-r-4 border-zinc-900 dark:border-white">Jest</th>
              <th className="p-4 border-r-4 border-zinc-900 dark:border-white">Vitest</th>
              <th className="p-4">Bun</th>
            </tr>
          </thead>
          <tbody className="font-medium text-lg">
            <tr className="border-b-4 border-zinc-900 dark:border-zinc-100 dark:text-zinc-200">
              <td className="p-4 font-black bg-zinc-100 dark:bg-zinc-800 border-r-4 border-zinc-900 dark:border-zinc-100">Velocidade</td>
              <td className="p-4 border-r-4 border-zinc-900 dark:border-zinc-100">🐌 Lento</td>
              <td className="p-4 border-r-4 border-zinc-900 dark:border-zinc-100">Runner Rápido</td>
              <td className="p-4 text-primary font-black">🚀 Ultra rápido</td>
            </tr>
            <tr className="border-b-4 border-zinc-900 dark:border-zinc-100 dark:text-zinc-200">
              <td className="p-4 font-black bg-zinc-100 dark:bg-zinc-800 border-r-4 border-zinc-900 dark:border-zinc-100">Setup</td>
              <td className="p-4 border-r-4 border-zinc-900 dark:border-zinc-100">📦 Complexo</td>
              <td className="p-4 border-r-4 border-zinc-900 dark:border-zinc-100">📦 Médio</td>
              <td className="p-4 text-green-600 dark:text-green-400 font-bold">✅ Simples</td>
            </tr>
            <tr className="border-b-4 border-zinc-900 dark:border-zinc-100 dark:text-zinc-200">
              <td className="p-4 font-black bg-zinc-100 dark:bg-zinc-800 border-r-4 border-zinc-900 dark:border-zinc-100">TypeScript</td>
              <td className="p-4 border-r-4 border-zinc-900 dark:border-zinc-100">⚙️ Requer configuração</td>
              <td className="p-4 border-r-4 border-zinc-900 dark:border-zinc-100">⚙️ Requer configuração</td>
              <td className="p-4 text-green-600 dark:text-green-400 font-bold">✅ Nativo</td>
            </tr>
            <tr className="border-b-4 border-zinc-900 dark:border-zinc-100 dark:text-zinc-200">
              <td className="p-4 font-black bg-zinc-100 dark:bg-zinc-800 border-r-4 border-zinc-900 dark:border-zinc-100">Ecossistema</td>
              <td className="p-4 border-r-4 border-zinc-900 dark:border-zinc-100">🌟 Maduro</td>
              <td className="p-4 border-r-4 border-zinc-900 dark:border-zinc-100">🌱 Em crescimento</td>
              <td className="p-4">🌱 Novo</td>
            </tr>
            <tr className="dark:text-zinc-200">
              <td className="p-4 font-black bg-zinc-100 dark:bg-zinc-800 border-r-4 border-zinc-900 dark:border-zinc-100">Compatibilidade</td>
              <td className="p-4 border-r-4 border-zinc-900 dark:border-zinc-100">100% Jest</td>
              <td className="p-4 border-r-4 border-zinc-900 dark:border-zinc-100">~95% Jest</td>
              <td className="p-4">~90% Jest</td>
            </tr>
          </tbody>
        </table>
      </div>

      <Concept title="O teu primeiro Olhar">
        <p className="mb-6">Observa a simplicidade. Um ficheiro de lógica e o seu teste correspondente, sem pastas <code>__tests__</code> ou configurações pesadas.</p>
        
        <div className="space-y-4">
          <CodeBlock 
            language="typescript" 
            code={`// calculator.ts
export function add(a: number, b: number): number {
  return a + b;
}

export function multiply(a: number, b: number): number {
  return a * b;
}`} 
          />

          <CodeBlock 
            language="typescript" 
            code={`// calculator.test.ts
import { describe, test, expect } from "bun:test";
import { add, multiply } from "./calculator";

describe("Calculator", () => {
  test("adds two numbers correctly", () => {
    expect(add(2, 3)).toBe(5);
  });
});`} 
          />
        </div>
      </Concept>

      <p><strong>Executar:</strong></p>
      <CodeBlock 
        language="bash" 
        code={`bun test`} 
      />

      <p><strong>Output:</strong></p>
      <CodeBlock 
        language="text" 
        code={`✓ Calculator > adds two numbers correctly
✓ Calculator > multiplies two numbers correctly

2 pass
0 fail
Ran 2 tests in 12ms`} 
      />

      <Callout title="Conceitos-chave a recordar" type="warning" className="my-12">
        <ul className="list-none space-y-3 font-bold text-lg">
          <li className="flex gap-2 items-center"><span className="text-amber-600 dark:text-amber-400">→</span> O Bun é um runtime completo, não apenas uma ferramenta de testing.</li>
          <li className="flex gap-2 items-center"><span className="text-amber-600 dark:text-amber-400">→</span> O testing já vem incluído de fábrica - não precisas de instalações extra.</li>
          <li className="flex gap-2 items-center"><span className="text-amber-600 dark:text-amber-400">→</span> Compatível com o Jest - fácil de aprender se já conheces o Jest.</li>
          <li className="flex gap-2 items-center"><span className="text-amber-600 dark:text-amber-400">→</span> Ultra rápido - otimizado para velocidade desde o design.</li>
          <li className="flex gap-2 items-center"><span className="text-amber-600 dark:text-amber-400">→</span> TypeScript nativo - zero configuração necessária.</li>
        </ul>
      </Callout>
      
      <p className="mt-12 text-xl font-bold p-6 bg-secondary text-white border-4 border-zinc-900 dark:border-white shadow-[6px_6px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_rgba(255,255,255,1)]">
        Na próxima aula (1.2) aprenderemos a instalar o Bun, configurar um projeto do zero, e escrever os nossos primeiros testes reais.
      </p>
    </>
  ),
  ejercicios: [
    {
      titulo: "Exercício 1: Investigação",
      descripcion: "Visita a documentação oficial do Bun (https://bun.sh) e lê a secção de testing. Anota 3 diferenças que encontres entre o Bun e o teu framework de testing atual (ou o Jest se ainda não usaste nenhum)."
    },
    {
      titulo: "Exercício 2: Reflexão",
      descripcion: "Responde: Porque acreditas que o Bun é mais rápido que o Jest? Em que tipo de projeto considerarias usar o Bun para testing? Que preocupações terias ao adotar o Bun num projeto existente?"
    },
    {
      titulo: "Exercício 3: Comparação",
      descripcion: "Investiga e compara: Tempo de execução de testes no Jest vs Bun (procura benchmarks). Tamanho de node_modules com Jest vs sem dependências adicionais com o Bun. Comunidade e suporte atual de ambas as ferramentas."
    }
  ]
};
