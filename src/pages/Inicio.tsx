import { COURSE_CODE } from '../content/constants';
import { Link } from 'react-router-dom';
import { BookOpen, Terminal, CheckCircle2 } from 'lucide-react';

export function Inicio() {
  return (
    <div className="max-w-4xl mx-auto p-6 lg:p-12 animate-in fade-in duration-500">
      <div className="space-y-8 text-center pt-8 md:pt-16 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-2 border-2 border-zinc-900 dark:border-zinc-100 bg-secondary text-white font-bold uppercase tracking-wider text-xs shadow-[4px_4px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_rgba(255,255,255,1)]">
          <Terminal className="w-5 h-5" />
          <span>Disciplina {COURSE_CODE}</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-serif font-black tracking-tighter text-zinc-900 dark:text-white leading-[1.1] uppercase">
          Domine o Testing<br className="hidden md:block" />
          <span className="text-white bg-zinc-900 dark:text-zinc-900 dark:bg-white px-4 py-1 mt-2 inline-block -rotate-2 border-4 border-transparent shadow-[8px_8px_0px_#ec4899] dark:shadow-[8px_8px_0px_#ec4899]">
            com Bun.js
          </span>
        </h1>
        
        <p className="text-lg md:text-2xl text-zinc-700 dark:text-zinc-300 font-medium leading-relaxed mt-10 border-l-4 border-primary pl-6 text-left">
          Curso completo projetado para estudantes de 4º ano universitário. 
          Aprenda a construir software resiliente, testável e de alta performance usando o runtime JavaScript mais rápido do mercado.
        </p>
        
        <div className="pt-10 flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link 
            to="/conferencias" 
            className="flex items-center justify-center gap-3 w-full sm:w-auto bg-primary text-white border-2 border-zinc-900 dark:border-white px-8 py-4 font-bold text-lg uppercase tracking-wide transition-all shadow-[6px_6px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_rgba(255,255,255,1)] hover:translate-y-1 hover:translate-x-1 hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] dark:hover:shadow-[2px_2px_0px_rgba(255,255,255,1)]"
          >
            <BookOpen className="w-6 h-6" />
            Começar o Curso
          </Link>
          <a
            href="https://bun.sh/docs/cli/test"
            target="_blank"
            rel="noopener noreferrer" 
            className="flex items-center justify-center gap-3 w-full sm:w-auto bg-light-bg dark:bg-dark-bg text-zinc-900 dark:text-white border-2 border-zinc-900 dark:border-white px-8 py-4 font-bold text-lg uppercase tracking-wide transition-all hover:bg-zinc-100 dark:hover:bg-zinc-900 shadow-[6px_6px_0px_#06b6d4] dark:shadow-[6px_6px_0px_#06b6d4] hover:translate-y-1 hover:translate-x-1 hover:shadow-[2px_2px_0px_#06b6d4] dark:hover:shadow-[2px_2px_0px_#06b6d4]"
          >
            Documentação
          </a>
        </div>
      </div>
      
      {/* Features Grid */}
      <div className="grid md:grid-cols-3 gap-8 mt-32">
        {[
          { title: "Velocidade Extrema", desc: "Test runner nativo construído em Zig. Testes rodam 50-100x mais rápido que o Jest.", icon: Terminal },
          { title: "Sintaxe Familiar", desc: "Compatibilidade nativa com expect() e funções de mock do ecossistema Jest/Vitest.", icon: CheckCircle2 },
          { title: "Tudo em Um", desc: "Runtime, bundler, API server e package manager incluídos em um único binário ultraleve.", icon: BookOpen }
        ].map((feat, i) => (
          <div key={i} className="bg-light-surface dark:bg-dark-surface p-8 border-4 border-zinc-900 dark:border-zinc-100 shadow-[8px_8px_0px_#ec4899] dark:shadow-[8px_8px_0px_#ec4899] transition-transform hover:-translate-y-2 hover:-translate-x-2 hover:shadow-[16px_16px_0px_#06b6d4] dark:hover:shadow-[16px_16px_0px_#06b6d4]">
            <div className="w-16 h-16 bg-zinc-900 dark:bg-white flex items-center justify-center text-white dark:text-zinc-900 mb-8 border-2 border-transparent shadow-[4px_4px_0px_#06b6d4] dark:shadow-[4px_4px_0px_#06b6d4] rotate-3">
              <feat.icon className="w-8 h-8 -rotate-3" />
            </div>
            <h3 className="font-serif font-black text-2xl uppercase text-zinc-900 dark:text-white mb-4 tracking-tight leading-none">{feat.title}</h3>
            <p className="text-zinc-700 dark:text-zinc-300 font-medium leading-relaxed">{feat.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
