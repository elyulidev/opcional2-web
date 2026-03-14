import type { ConferenciaData } from '../../types';
import { CodeBlock } from '../../components/CodeBlock';
import { Concept, Callout, Box } from '../../components/CourseComponents';

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
      <Concept title="¿Qué es Bun.js?">
        <p className="mb-4">
          <strong>Bun</strong> es un runtime de JavaScript/TypeScript ultra-rápido, todo en uno, que incluye:
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-4 font-mono text-[0.9em]">
          <li>Un runtime de JavaScript (alternativa a Node.js y Deno)</li>
          <li>Un bundler integrado</li>
          <li>Un transpilador de TypeScript</li>
          <li>Un package manager (como npm/yarn/pnpm)</li>
          <li>Un test runner nativo ⚡</li>
        </ul>
        <p>
          Fue creado por Jarred Sumner y está escrito en <strong className="text-primary text-2xl">Zig</strong>, lo que lo hace extremadamente rápido.
        </p>
      </Concept>

      <h2>¿Por qué usar Bun para testing?</h2>
      <h3>🚀 Velocidad extrema</h3>
      <Callout title="Comparativa de velocidad" type="tip">
        <ul className="space-y-2 mb-4 font-mono">
          <li><strong>Jest:</strong> ~3-5 segundos para 100 tests</li>
          <li><strong>Vitest:</strong> ~1-2 segundos para 100 tests</li>
          <li className="text-primary font-black text-xl"><strong>Bun:</strong> ~0.3-0.5 segundos para 100 tests ⚡</li>
        </ul>
        <p className="font-bold border-t-2 border-zinc-900/20 dark:border-zinc-100/20 pt-2 border-dashed">Bun es hasta <span className="text-2xl text-primary font-black">10-20x</span> más rápido que Jest en muchos casos.</p>
      </Callout>

      <h3>⚡ Todo integrado</h3>
      <p>No necesitas instalar dependencias adicionales:</p>
      <CodeBlock 
        language="bash" 
        code={`# Con Jest necesitas:
npm install --save-dev jest @types/jest ts-jest

# Con Bun ya está todo incluido:
bun install bun
# ¡Ya tienes testing listo!`} 
      />

      <h3>🎯 Compatibilidad con Jest API</h3>
      <p>Si conoces Jest, ya conoces Bun testing. Usa la misma sintaxis:</p>
      <CodeBlock 
        language="javascript" 
        code={`import { describe, test, expect } from "bun:test";

describe("mi grupo de tests", () => {
  test("suma 1 + 1", () => {
    expect(1 + 1).toBe(2);
  });
});`} 
      />

      <h3>🔥 TypeScript nativo</h3>
      <p>No necesitas configuración extra. Bun ejecuta TypeScript directamente:</p>
      <CodeBlock 
        language="typescript" 
        code={`// archivo.test.ts
import { test, expect } from "bun:test";

interface User {
  name: string;
  age: number;
}

test("TypeScript works out of the box", () => {
  const user: User = { name: "Ana", age: 25 };
  expect(user.name).toBe("Ana");
});`} 
      />

      <hr className="my-12 border-2 border-zinc-900 dark:border-zinc-100" />

      <h2>Arquitectura del Test Runner de Bun</h2>

      <h3>Componentes principales:</h3>
      <CodeBlock 
        language="text" 
        code={`┌─────────────────────────────────────┐
│       BUN TEST RUNNER               │
├─────────────────────────────────────┤
│ 1. Test Discovery                   │ ← Encuentra archivos *.test.ts
│    - Busca archivos de test         │
│    - Carga módulos                  │
├─────────────────────────────────────┤
│ 2. Test Execution Engine            │ ← Motor de ejecución rápido
│    - Paralelización automática      │
│    - Isolation entre tests          │
├─────────────────────────────────────┤
│ 3. Assertion Library                │ ← Compatible con Jest matchers
│    - expect() API                   │
│    - Matchers integrados            │
├─────────────────────────────────────┤
│ 4. Mocking System                   │ ← Sistema de mocks
│    - jest.fn()                      │
│    - jest.mock()                    │
├─────────────────────────────────────┤
│ 5. Reporter                         │ ← Resultados en consola
│    - Output formateado              │
│    - Coverage reports               │
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
            <span className="text-3xl">✅</span> Perfecto para:
          </h3>
          <ul className="list-none space-y-2 font-bold">
            <li>• Aplicaciones nuevas desde cero</li>
            <li>• APIs y backends Bun</li>
            <li>• Maximizar velocidad en CI/CD</li>
            <li>• Proyectos TypeScript puros</li>
          </ul>
        </Box>

        <Box className="border-amber-500 bg-amber-50 dark:bg-amber-950/10 shadow-[6px_6px_0px_#f59e0b]">
          <h3 className="text-2xl font-black uppercase mb-4 flex items-center gap-2">
            <span className="text-3xl">🤔</span> Considera si:
          </h3>
          <ul className="list-none space-y-2 font-bold">
            <li>• Necesitas plugins Jest específicos</li>
            <li>• Proyectos legacy muy masivos</li>
            <li>• Features de Jest no soportadas</li>
            <li>• Ecosistema Node.js crítico</li>
          </ul>
        </Box>
      </div>

      <h2>Comparativa rápida</h2>
      <div className="overflow-x-auto border-4 border-zinc-900 dark:border-zinc-100 shadow-[8px_8px_0px_#ec4899] dark:shadow-[8px_8px_0px_#ec4899] mb-12">
        <table className="w-full text-left border-collapse bg-light-surface dark:bg-dark-surface">
          <thead>
            <tr className="bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 uppercase font-black tracking-wider border-b-4 border-zinc-900 dark:border-zinc-100">
              <th className="p-4 border-r-4 border-zinc-900 dark:border-white">Feature</th>
              <th className="p-4 border-r-4 border-zinc-900 dark:border-white">Jest</th>
              <th className="p-4 border-r-4 border-zinc-900 dark:border-white">Vitest</th>
              <th className="p-4">Bun</th>
            </tr>
          </thead>
          <tbody className="font-medium text-lg">
            <tr className="border-b-4 border-zinc-900 dark:border-zinc-100 dark:text-zinc-200">
              <td className="p-4 font-black bg-zinc-100 dark:bg-zinc-800 border-r-4 border-zinc-900 dark:border-zinc-100">Velocidad</td>
              <td className="p-4 border-r-4 border-zinc-900 dark:border-zinc-100">🐌 Lento</td>
              <td className="p-4 border-r-4 border-zinc-900 dark:border-zinc-100">🏃 Rápido</td>
              <td className="p-4 text-primary font-black">🚀 Ultra rápido</td>
            </tr>
            <tr className="border-b-4 border-zinc-900 dark:border-zinc-100 dark:text-zinc-200">
              <td className="p-4 font-black bg-zinc-100 dark:bg-zinc-800 border-r-4 border-zinc-900 dark:border-zinc-100">Setup</td>
              <td className="p-4 border-r-4 border-zinc-900 dark:border-zinc-100">📦 Complejo</td>
              <td className="p-4 border-r-4 border-zinc-900 dark:border-zinc-100">📦 Medio</td>
              <td className="p-4 text-green-600 dark:text-green-400 font-bold">✅ Simple</td>
            </tr>
            <tr className="border-b-4 border-zinc-900 dark:border-zinc-100 dark:text-zinc-200">
              <td className="p-4 font-black bg-zinc-100 dark:bg-zinc-800 border-r-4 border-zinc-900 dark:border-zinc-100">TypeScript</td>
              <td className="p-4 border-r-4 border-zinc-900 dark:border-zinc-100">⚙️ Config necesaria</td>
              <td className="p-4 border-r-4 border-zinc-900 dark:border-zinc-100">⚙️ Config necesaria</td>
              <td className="p-4 text-green-600 dark:text-green-400 font-bold">✅ Nativo</td>
            </tr>
            <tr className="border-b-4 border-zinc-900 dark:border-zinc-100 dark:text-zinc-200">
              <td className="p-4 font-black bg-zinc-100 dark:bg-zinc-800 border-r-4 border-zinc-900 dark:border-zinc-100">Ecosistema</td>
              <td className="p-4 border-r-4 border-zinc-900 dark:border-zinc-100">🌟 Maduro</td>
              <td className="p-4 border-r-4 border-zinc-900 dark:border-zinc-100">🌱 Creciendo</td>
              <td className="p-4">🌱 Nuevo</td>
            </tr>
            <tr className="dark:text-zinc-200">
              <td className="p-4 font-black bg-zinc-100 dark:bg-zinc-800 border-r-4 border-zinc-900 dark:border-zinc-100">Compatibilidad</td>
              <td className="p-4 border-r-4 border-zinc-900 dark:border-zinc-100">100% Jest</td>
              <td className="p-4 border-r-4 border-zinc-900 dark:border-zinc-100">~95% Jest</td>
              <td className="p-4">~90% Jest</td>
            </tr>
          </tbody>
        </table>
      </div>

      <Concept title="Tu primer Glance">
        <p className="mb-6">Observa la simplicidad. Un archivo de lógica y su correspondiente test, sin carpetas <code>__tests__</code> ni configuraciones pesadas.</p>
        
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

      <p><strong>Ejecutar:</strong></p>
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

      <Callout title="Conceptos clave para recordar" type="warning" className="my-12">
        <ul className="list-none space-y-3 font-bold text-lg">
          <li className="flex gap-2 items-center"><span className="text-amber-600 dark:text-amber-400">→</span> Bun es un runtime completo, no solo una herramienta de testing.</li>
          <li className="flex gap-2 items-center"><span className="text-amber-600 dark:text-amber-400">→</span> Testing está incluido de fábrica - no necesitas instalaciones extra.</li>
          <li className="flex gap-2 items-center"><span className="text-amber-600 dark:text-amber-400">→</span> Compatible con Jest - fácil de aprender si conoces Jest.</li>
          <li className="flex gap-2 items-center"><span className="text-amber-600 dark:text-amber-400">→</span> Ultra rápido - optimizado para velocidad desde el diseño.</li>
          <li className="flex gap-2 items-center"><span className="text-amber-600 dark:text-amber-400">→</span> TypeScript nativo - cero configuración necesaria.</li>
        </ul>
      </Callout>
      
      <p className="mt-12 text-xl font-bold p-6 bg-secondary text-white border-4 border-zinc-900 dark:border-white shadow-[6px_6px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_rgba(255,255,255,1)]">
        En la próxima clase (1.2) aprenderemos a instalar Bun, configurar un proyecto desde cero, y escribir nuestros primeros tests reales.
      </p>
    </>
  ),
  ejercicios: [
    {
      titulo: "Ejercicio 1: Investigación",
      descripcion: "Visita la documentación oficial de Bun (https://bun.sh) y lee la sección de testing. Anota 3 diferencias que encuentres entre Bun y tu framework de testing actual (o Jest si no has usado ninguno)."
    },
    {
      titulo: "Ejercicio 2: Reflexión",
      descripcion: "Responde: ¿Por qué crees que Bun es más rápido que Jest? ¿En qué tipo de proyecto considerarías usar Bun para testing? ¿Qué preocupaciones tendrías al adoptar Bun en un proyecto existente?"
    },
    {
      titulo: "Ejercicio 3: Comparación",
      descripcion: "Investiga y compara: Tiempo de ejecución de tests en Jest vs Bun (busca benchmarks). Tamaño de node_modules con Jest vs sin dependencias adicionales con Bun. Comunidad y soporte actual de ambas herramientas."
    }
  ]
};
