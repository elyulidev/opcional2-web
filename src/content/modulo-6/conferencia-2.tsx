import type { ConferenciaData } from '../../types';
import { CodeBlock } from '../../components/CodeBlock';

export const data: ConferenciaData = {
  titulo: "6.2 Mejores prácticas y Clean Testing",
  objetivos: [
    "Dominar o sagrado fluxo A.A.A. (Arrange, Act, Assert)",
    "Diferenciar Testes Manteníveis x Frágeis e Flaky",
    "Garantir abrangência extrema focada em Casos-Limite (Edge Cases)"
  ],
  contenido: (
    <>
      <p>
        Para um projeto escalável não basta o teste não "crashar" o runner. Se o teste exige uma manutenção de 3 horas toda semana quando refatoramos a lógica, chamamos aquela suíte de teste de um "Pesadelo Frágil" (Fragile Nightmare). Ele vira um debito na empresa ao vez de uma malha de segurança.
      </p>

      <h2>O Princípio de Excelência A.A.A.</h2>
      <p>
        A regra de ouro, o <em>Holy Grail</em> do Clean Testing: Seus testes devem ser espaçados limpidamente nestas três letras invisíveis, e de forma bem linear de cima a baixo.
      </p>

      <CodeBlock 
        language="typescript" 
        code={`test("Permite agendamento e desconto via cupons nativos", () => {
    // 1️⃣ ARRANGE (Preparar): 
    // Monta o cenário completo, e preenche os arrays, mocka classes ou banco.
    // Todas as variáveis "Given" da documentação ficam aqui no topo espremidos.
    const service = new PagamentoService();
    const mockCliente = gerarMockBasicoVIP(); // Factory patterns ajudam o Arrange a não poluir espaço
    const pedidoValido = new Carrinho(200.00); 

    // 2️⃣ ACT (Agir):
    // A única coisa a ser testada num unit-test. Normalmente a invocação imperativa da função que devolve um único payload.
    // É o "When" da estória.
    const recibo = service.finalizarCompra(mockCliente, pedidoValido, "CUPOM20");

    // 3️⃣ ASSERT (Verificar/Validar):
    // Você não manipula nem executa mais nada no serviço. Os expect's brutos leem os logs de resposta passivamente.
    // "Then"...
    expect(recibo.status).toBe("APROVADO");
    expect(recibo.valorLiquido).toEqual(160.00); // Garante 20%
});`} 
      />

      <h2>Testes Manteníveis e Erradicando 'Flaky Tests'</h2>
      <ul className="space-y-4 my-6 list-disc pl-5">
        <li>
          <strong>Tightly Coupled Mocks (O pesadelo Mágico)</strong>: Nunca teste <em>Como</em> sua classe funciona internamente. Teste os <em>Comportamentos Retornados</em> na sua classe pública. Se o seu mock esconde funções gigantes para fingir que a refatoração do banco deu certo, o seu teste passou de Unitário e de confiança útil a apenas uma "Lousa em Branco Falsa". Deixe a classe falhar caso as dependencias mudem muito e force o TDD até o serviço real aprovar logicamente!
        </li>
        <li>
          <strong>Flaky Tests ("As Vezes Quebra")</strong>: Testes que só funcionam "toda hora" ou em "maquinas de desenvolvedor XPTO" quebram a pipeline de CI de surpresa. Ocorre quando você acopla I/O ou dependências de tempo global não congelados. Ou pior: depende da ORDEM deles! Um arquivo deve poder rodar solitariamente e dar <code>SUCCESS</code> não importando o resultado de arquivos testados no passado via global. Limpe as varíaveis no <code>afterEach</code> SEMPRE.
        </li>
      </ul>

      <h2>A Batalha dos Edge Cases</h2>
      <p>
        É muito fácil validar o fluxo ideal, e incrivelmente maçante testar fluxos irreais ou que beiram a insalubridade de um usuário que está querendo travar seu back-end. Casos limite costumam ocultar vetores perigosos e causar estouros de arrays.
      </p>

      <CodeBlock 
        language="typescript" 
        code={`// Um excelente engenheiro valida os contornos limites.
describe("Calculadora Fibonacci e Factorial Recursivos", () => {
  // O caminho feliz padrão
  it("deve computar perfeitamente fatorial 5 e não travar", () => { ... })
  
  // OS EDGE CASES!!!
  it("deve retornar 1 no Fatorial de Zero que é o limite Matemático da escala", () => { ... })
  it("deve rejeitar Números Negativos em Arrays sem quebrar a call stack com Maximum Size Reach", () => { ... })
  it("deve explodir uma exceção bonitinha se mandarem MAX_INTEGER BigInt", () => { ... })
});`} 
      />
    </>
  ),
  ejercicios: [
    {
      titulo: "Limpeza de um Spagetti Test",
      descripcion: "Você vai pegar um bloco gigante de código legado onde variáveis são setadas depois de expect's e a chamada HTTP de login ocorre múltiplas vezes até no assert. Vai reorganizá-lo em uma pirâmide A.A.A. pura de separação impecável."
    }
  ]
};
