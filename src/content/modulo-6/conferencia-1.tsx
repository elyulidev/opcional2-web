import type { ConferenciaData } from '../../types';
import { CodeBlock } from '../../components/CodeBlock';

export const data: ConferenciaData = {
  titulo: "6.1 Coverage con Bun",
  objetivos: [
    "Habilitar os relatórios de cobertura de código (Code Coverage) no Bun",
    "Acessar os relatórios LCOV ou de leitura terminal",
    "Criar limiares mínimos vitais de Coverage para CI pipeline",
    "Configurar exclusões inteligentes de arquivos"
  ],
  contenido: (
    <>
      <p>
        Saber que os seus testes passam é ótimo. Porém, a pergunta que assombra a engenharia em refatorações massivas é: <em>"Quantos % das minhas linhas e if-elses estão sendo sequer testados?"</em>. Para medir a área cega no farol dos testes da sua aplicação, entra o <strong>Code Coverage</strong>.
      </p>

      <h2>Coverage Embutido</h2>
      <p>
        Ao contrário de outros ecossistemas (Istambul/nyc, c8, etc) onde você deve instalar e configurar pesados injetores extras nos bundles, o Bun gera o Code Coverage no mesmo nível do seu motor de forma transparente e <strong>embutida</strong>.
      </p>
      
      <p>Basta adicionar a flag CLI:</p>
      <CodeBlock language="bash" code="bun test --coverage" />

      <h2>Terminal x LCOV</h2>
      <p>
        O comando acima imprimirá as estatísticas de Linhas (Lines), Funções (Funcs), Declarações (Stmts) e Ramos (Branches) diretamente e colorido no seu terminal.
        <br/>
        Contudo, para uso do SonarQube, Github Actions ou IDEs, arquivos LCOV (.info) ou pastas HTMl são requisitados. Podemos especificar isso como reporter.
      </p>

      <CodeBlock 
        language="toml" 
        code={`# bunfig.toml
[test]
coverage = true
coverageReporter = ["text", "lcov", "html"]  # Gera pasta coverage local!`} 
      />

      <h2>Métricas em Thresholds Absolutos</h2>
      <p>
        Um pipeline sólido impede que desenvolvedores lancem recursos sem testar ao colocar Minimum Thresholds (Limiares Constantes de Qualidade de % de código testado). O Bun pode abortar processos estritamente com código de erro 1 se o PR submetido for mais ignorante do que o Threshold estípulado na configuração geral.
      </p>

      <CodeBlock 
        language="toml" 
        code={`# bunfig.toml
[test.coverageThreshold]
# Valores decimais onde 1 é 100% da sua base de código
lines = 0.8
functions = 0.8
statements = 0.85
statementsPerFile = 0.5  # Bloqueia arquivos absurdamente não unitariamente testados`} 
      />

      <h2>Ignorando Arquivos Inúteis do Coverage</h2>
      <p>Você não precisará testar dezenas de Models ORMs esqueléticas vazias, nem o arquivo index raiz que dá boot na porta, nem declarações de Type, etc. A flag de ignore impede que sua média geral caia no relatório injustamente.</p>
      
      <CodeBlock 
        language="toml" 
        code={`# bunfig.toml
[test]
# Descartará estas pastas e arquivos específicos da estatística geral
coverageIgnore = [".eslintrc*", "config/**", "scripts/**", "**/*.d.ts"]`} 
      />
    </>
  ),
  ejercicios: [
    {
      titulo: "Furtivo ao Pipeline",
      descripcion: "Edite o terminal virtual de um bunfig de demonstração criando uma regra `coverageThreshold` onde as métricas de linhas perdoam apenas 10% do código global como não-testado e requeira no mínimo 95% de testagem dos Ramos. Exclua a pasta /assets e /cache."
    }
  ]
};
