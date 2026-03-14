import type { ConferenciaData } from '../../types';
import { CodeBlock } from '../../components/CodeBlock';

export const data: ConferenciaData = {
  titulo: "1.2 Instalación y configuración inicial",
  objetivos: [
    "Instalar Bun en diferentes sistemas operativos",
    "Configurar un nuevo proyecto de testing",
    "Crear la estructura de carpetas recomendada",
    "Comprender el archivo de configuración bunfig.toml"
  ],
  contenido: (
    <>
      <p>
        Começar com o Bun é um processo direto. Diferente de outros ecossistemas onde você precisa instalar o Node.js, npm, nvm, TypeScript globalmente, etc., o Bun requer apenas um único comando de instalação.
      </p>

      <h2>Instalação do Bun</h2>
      <p>O método primário suportado para Linux, macOS e WSL é o script de instalação oficial. No Windows, ele não roda nativamente sem WSL ainda (mas a versão nativa está em desenvolvimento focado).</p>
      
      <CodeBlock 
        language="bash" 
        code={`# macOS, Linux, and Windows Subsystem for Linux (WSL)
curl -fsSL https://bun.sh/install | bash`} 
      />

      <p>Uma vez instalado, valide a instalação verificando a versão:</p>
      <CodeBlock language="bash" code="bun --version" />

      <h2>Configurando o Projeto do Zero</h2>
      <p>Para iniciar um novo projeto, o Bun dispõe de um comando de inicialização muito rápido que já cria um <code>package.json</code> e um <code>index.ts</code>.</p>
      
      <CodeBlock 
        language="bash" 
        code={`mkdir meu-projeto-voador
cd meu-projeto-voador
bun init`} 
      />

      <h2>Estrutura de Pastas Recomendada para Testes</h2>
      <p>
        Bun test runner vai automaticamente procurar por arquivos que contenham <code>.test.</code>, <code>.spec.</code>, ou que estejam dentro de pastas chamadas <code>__tests__</code>. 
        Uma estrutura robusta e limpa recomendada para a engenharia de software é separar a lógica dos testes, ou mantê-los fisicamente próximos se for um projeto grande. Modulo de testes separados é comum em bibliotecas menores.
      </p>

      <CodeBlock 
        language="plaintext" 
        code={`meu-projeto-voador/
├── src/
│   ├── math.ts
│   └── math.test.ts  # Teste colocalizado
├── tests/
│   ├── integration.test.ts # Teste isolado global
├── package.json
└── bunfig.toml`} 
      />

      <h2>O Arquivo <code>bunfig.toml</code></h2>
      <p>
        O <code>bunfig.toml</code> é o coração das configurações do Bun. Nele podemos definir diretivas de execução e pré-carregamentos de teste. Se quisermos rodar um script de "setup" antes de cada suíte começar, configuramos aqui.
      </p>

      <CodeBlock 
        language="toml" 
        code={`# Arquivo de configuração global do Bun
[test]
# Arquivo que rodará antes de todos os testes
preload = ["./tests/setup.ts"]

# Opcional: ignorar caminhos
smol = false
coverage = false`} 
      />
    </>
  ),
  ejercicios: [
    {
      titulo: "Hands-on Setup",
      descripcion: "Num diretório vazio, rode 'bun init', crie um arquivo 'math.ts' com uma função de subtração e escreva um 'math.test.ts'. Finalmente, crie o 'bunfig.toml' com um preload fake."
    }
  ]
};
