import type { ConferenciaData } from '../../types';

export const data: ConferenciaData = {
  titulo: "9.1 Comunidad y recursos para el Siguiente Nivel",
  objetivos: [
    "Acessar os canais oficias de documentação do Bun.js",
    "Saber como contribuir com o Runtime no projeto OpenSource",
    "Descobrir ferramentas associadas para Testes robustos"
  ],
  contenido: (
    <>
      <p>
        O aprendizado nunca termina. O Bun.js sendo construído do zero, evoluí radicalmente a cada par de meses, melhorando imensamente sua performance e compatibilidade de ecossistema. Permanecer em contato com a documentação oficial e projetos associados é o dever do engenheiro moderno capacitado.
      </p>

      <h2>Caminhos Recomendados</h2>
      <ul className="mb-6 space-y-3 list-disc pl-5 text-slate-700 dark:text-slate-300">
        <li>
          <strong>Documentação do Runtime de Teste:</strong> Essa é sua fonte final de verdade. Eles explicam opções globais sub-documentadas e os polyfills do Jest expostos no momento de forma muito limpa. <br />
          <a href="https://bun.sh/docs/cli/test" className="text-cyan-600 dark:text-cyan-400 underline" target="_blank" rel="noopener noreferrer">bun.sh/docs/cli/test</a>
        </li>
        <li>
          <strong>O Ecossistema Elysia:</strong> O verdadeiro companheiro nativo do Bun. Se for testar, documentada mente, utilize a framework desenhada por quem entende de velocidade no backend. <br />
          <a href="https://elysiajs.com" className="text-cyan-600 dark:text-cyan-400 underline" target="_blank" rel="noopener noreferrer">elysiajs.com</a>
        </li>
      </ul>

      <h2>Buscando por Soluções de Código, Comunidade e Reportando Bugs</h2>
      <p>
        Se a documentação oficial não sanar a sua dúvida ou você desconfiar de uma falha do motor de compatibilidade de Node, a melhor abordagem é observar o Issue Tracker e unir-se ao painel da comunidade onde o core Team está incrivelmente ativo!
      </p>

      <ul className="list-disc pl-5 mt-4 mb-8 text-slate-700 dark:text-slate-300">
        <li><strong>Github Repositório:</strong> <a href="https://github.com/oven-sh/bun" className="text-cyan-600 dark:text-cyan-400 underline" target="_blank" rel="noopener noreferrer">github.com/oven-sh/bun</a> (Busque pelas "Issues" e Filtre por [TestRunner])</li>
        <li><strong>Discord Oficial do Bun:</strong> Frequentemente, o próprio fundador (Jarred Sumner) te responde a dúvidas profundíssimas de Node Poliyfils e V8 engine. Pesquise o menu "Discord" na homepage.</li>
      </ul>

      <h2>Agradecimento da Cadeira</h2>
      <p className="border-t border-slate-200 dark:border-slate-800 pt-6 mt-6">
        A equipe da disciplina acadêmica Opcional 2 espera firmemente que este guia interativo de Software Testing impulsionará incrivelmente as suas capacidades práticas de codificar e garantir a qualidade real nos futuros projetos que assumir ao se deparar no vasto mundo do JavaScript backend e Node/Bun Runtimes!
      </p>

      <div className="flex justify-center mt-12 mb-6 text-5xl">
        🍞🚀
      </div>
    </>
  ),
  ejercicios: []
};
