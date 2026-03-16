import type { ConferenciaData } from '../../types';
import { CodeBlock } from '../../components/CodeBlock';
import { Concept, Callout, Box } from '../../components/CourseComponents';

export const data: ConferenciaData = {
  titulo: "1.2 Instalação e configuração inicial",
  objetivos: [
    "Instalar o Bun em diferentes sistemas operativos (Linux, macOS, Windows)",
    "Configurar um projeto do zero usando 'bun init'",
    "Compreender a estrutura de pastas recomendada para testing",
    "Configurar o ficheiro 'bunfig.toml' para personalizar o test runner",
    "Otimizar o TypeScript e o VS Code para desenvolvimento com Bun"
  ],
  contenido: (
    <>
      <Concept title="Instalação do Bun">
        <p className="mb-4">
          O Bun é distribuído como um binário único, o que torna a sua instalação extremamente simples em qualquer plataforma.
        </p>
      </Concept>

      <h2>🐧 Linux e macOS</h2>
      <p>A forma mais fácil é usar o script de instalação oficial:</p>
      <CodeBlock 
        language="bash" 
        code={`curl -fsSL https://bun.sh/install | bash`} 
      />
      
      <Box className="my-6">
        <h4 className="font-bold uppercase mb-2">O que este script faz:</h4>
        <ul className="list-disc pl-6 space-y-1">
          <li>Descarrega o binário do Bun</li>
          <li>Instala-o em <code>~/.bun/bin</code></li>
          <li>Atualiza o teu <code>PATH</code> automaticamente</li>
        </ul>
      </Box>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
        <div className="p-4 border-2 border-zinc-900 dark:border-zinc-100 bg-zinc-50 dark:bg-zinc-900">
          <p className="font-bold mb-2">Verificar instalação:</p>
          <CodeBlock language="bash" code={`bun --version`} />
        </div>
        <div className="p-4 border-2 border-zinc-900 dark:border-zinc-100 bg-zinc-50 dark:bg-zinc-900">
          <p className="font-bold mb-2">Atualizar o Bun:</p>
          <CodeBlock language="bash" code={`bun upgrade`} />
        </div>
      </div>

      <h2>🪟 Windows</h2>
      <div className="space-y-6">
        <Box className="border-cyan-500">
          <p><strong>Opção 1: Usando PowerShell (Recomendado)</strong></p>
          <CodeBlock language="powershell" code={`powershell -c "irm bun.sh/install.ps1 | iex"`} />
        </Box>

        <Box>
          <p><strong>Opção 2: Usando WSL (Windows Subsystem for Linux)</strong></p>
          <CodeBlock language="bash" code={`# Primeiro instala o WSL se não o tiveres
wsl --install

# Dentro do WSL, usa o comando de Linux
curl -fsSL https://bun.sh/install | bash`} />
        </Box>

        <Box className="border-primary">
          <p><strong>Opção 3: Usando Scoop</strong></p>
          <CodeBlock language="powershell" code={`scoop install bun`} />
        </Box>
      </div>

      <h2>🐳 Docker</h2>
      <p>Se preferires usar Docker para isolar o teu ambiente:</p>
      <CodeBlock 
        language="dockerfile" 
        code={`# Dockerfile
FROM oven/bun:1

WORKDIR /app

COPY package.json .
COPY bun.lockb .

RUN bun install

COPY . .

CMD ["bun", "test"]`} 
      />

      <hr className="my-12 border-2 border-zinc-900 dark:border-zinc-100" />

      <h2>Configuração do projeto do zero</h2>
      
      <h3>Paso 1: Criar um novo projeto</h3>
      <CodeBlock 
        language="bash" 
        code={`# Criar diretório do projeto
mkdir meu-projeto-testing
cd meu-projeto-testing

# Inicializar projeto com o Bun
bun init`} 
      />

      <Callout title="O comando bun init" type="info">
        <p>O <code>bun init</code> ajuda-te a começar com um projeto minimalista e tenta adivinhar padrões sensatos.</p>
        <CodeBlock language="text" code={`package name (meu-projeto-testing): 
entry point (index.ts): `} />
        <p className="mt-2 text-sm">Pressiona <strong>Enter</strong> para aceitar os valores por defeito.</p>
      </Callout>

      <h3>Paso 2: Estrutura de pastas recomendada</h3>
      <p>Organiza o teu projeto desta maneira para manter a escalabilidade:</p>
      <CodeBlock 
        language="text" 
        code={`meu-projeto-testing/
├── src/
│   ├── index.ts              # Ponto de entrada
│   ├── utils/
│   │   ├── math.ts           # Código de produção
│   │   └── math.test.ts      # Testes
│   ├── services/
│   │   ├── user.service.ts
│   │   └── user.service.test.ts
│   └── models/
│       ├── user.model.ts
│       └── user.model.test.ts
├── tests/
│   ├── integration/          # Testes de integração
│   │   └── api.test.ts
│   └── e2e/                  # Testes end-to-end
│       └── flows.test.ts
├── package.json
├── tsconfig.json
├── bunfig.toml              # Configuração do Bun
└── README.md`} 
      />

      <h3>Paso 3: Configurar o package.json</h3>
      <CodeBlock 
        language="json" 
        code={`{
  "name": "meu-projeto-testing",
  "version": "1.0.0",
  "module": "src/index.ts",
  "type": "module",
  "scripts": {
    "test": "bun test",
    "test:watch": "bun test --watch",
    "test:coverage": "bun test --coverage"
  },
  "devDependencies": {
    "@types/bun": "latest"
  },
  "peerDependencies": {
    "typescript": "^5.0.0"
  }
}`} 
      />

      <h2>Arquivo de configuração bunfig.toml</h2>
      <p>O Bun usa um arquivo de configuração opcional chamado <code>bunfig.toml</code>.</p>
      
      <Concept title="Configuração básica para testing">
        <CodeBlock 
          language="toml" 
          code={`# bunfig.toml

[test]
# Padrão para encontrar arquivos de test
# Por defeito: ["**/*.test.{js|jsx|ts|tsx}", "**/*_test.{js|jsx|ts|tsx}"]
preload = ["./tests/setup.ts"]  # Arquivos a carregar antes dos testes

# Timeout por defeito para testes (em ms)
timeout = 5000

# Coverage
coverage = false  # Desativado por defeito
coverageThreshold = 80  # Percentagem mínima de coverage

# Bail
bail = false  # Não parar ao primeiro erro`} 
        />
      </Concept>

      <h3>Configurações avançadas</h3>
      <CodeBlock 
        language="toml" 
        code={`[test]
root = "./src"      # Diretório raiz para testes
parallel = true    # Execução paralela (true por defeito)

[install.cache]
dir = ".bun-cache" # Configurar cache de dependências`} 
      />

      <h2>Configuração de TypeScript</h2>
      <p>Podemos otimizar o <code>tsconfig.json</code> para uma melhor experiência de testing:</p>
      <CodeBlock 
        language="json" 
        code={`{
  "compilerOptions": {
    "target": "ESNext",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "types": ["bun-types"],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@tests/*": ["./tests/*"]
    },
    "strict": true,
    "skipLibCheck": true
  }
}`} 
      />

      <hr className="my-12 border-2 border-zinc-900 dark:border-zinc-100" />

      <h2>Exemplo completo: Primeiro projeto configurado</h2>
      
      <Box className="bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 p-0 border-0">
        <div className="p-4 border-b border-zinc-700 dark:border-zinc-300 font-mono text-sm opacity-70">
          src/utils/math.ts
        </div>
        <CodeBlock 
          language="typescript" 
          code={`export function add(a: number, b: number): number {
  return a + b;
}

export function divide(a: number, b: number): number {
  if (b === 0) throw new Error("Não se pode dividir por zero");
  return a / b;
}`} 
        />
      </Box>

      <div className="my-6"></div>

      <Box className="bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 p-0 border-0">
        <div className="p-4 border-b border-zinc-700 dark:border-zinc-300 font-mono text-sm opacity-70">
          src/utils/math.test.ts
        </div>
        <CodeBlock 
          language="typescript" 
          code={`import { describe, test, expect } from "bun:test";
import { add, divide } from "./math";

describe("Math utilities", () => {
  test("soma dois números corretamente", () => {
    expect(add(2, 3)).toBe(5);
  });

  test("lança erro ao dividir por zero", () => {
    expect(() => divide(10, 0)).toThrow("Não se pode dividir por zero");
  });
});`} 
        />
      </Box>

      <Callout title="Comandos úteis" type="tip" className="mt-8">
        <ul className="space-y-2 font-mono text-sm">
          <li><strong>bun test</strong> - Executar todos os testes</li>
          <li><strong>bun test --watch</strong> - Modo automático</li>
          <li><strong>bun test --coverage</strong> - Ver cobertura de código</li>
        </ul>
      </Callout>

      <div className="mt-12 bg-secondary p-8 border-4 border-zinc-900 dark:border-white text-white">
        <h3 className="text-2xl font-black uppercase mb-4">🚀 Próximo Passo</h3>
        <p className="text-lg font-medium">
          Na Aula 1.3, escreveremos o nosso primeiro conjunto de testes completo e exploraremos a fundo a API de assertions do Bun.
        </p>
      </div>
    </>
  ),
  ejercicios: [
    {
      titulo: "Exercício 1: Setup completo",
      descripcion: "Instala o Bun no teu sistema operativo e cria um novo projeto chamado 'learning-bun-testing'. Configura a estrutura de pastas recomendada."
    },
    {
      titulo: "Exercício 2: Configuração Personalizada",
      descripcion: "Cria um arquivo 'bunfig.toml' e configura um timeout de 10 segundos e ativa o coverage por defeito."
    },
    {
      titulo: "Exercício 3: Math Utilities",
      descripcion: "Implementa as funções subtract e multiply no ficheiro math.ts e escreve os seus respetivos testes."
    }
  ]
};
