import { EVALUACIONES } from '../content/constants';
import { Download, PieChart, Star } from 'lucide-react';

export function Avaliacao() {
  const downloadPDF = () => {
    const content = `
Critérios de Avaliação - Testing com Bun (Opcional 2)
=====================================================

${EVALUACIONES.map(e => `${e.nombre} (${e.porcentaje}%)\n-----------------------------------------------------\n${e.descripcion}\n\n`).join('')}
    `;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Avaliacao_Testing_Bun.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 lg:p-12 animate-in fade-in">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 border-b-8 border-zinc-900 dark:border-zinc-100 pb-8">
        <div>
          <h1 className="text-4xl md:text-6xl font-serif font-black text-zinc-900 dark:text-white mb-6 uppercase tracking-tight">
            Critérios de Avaliação
          </h1>
          <p className="text-zinc-700 dark:text-zinc-300 text-xl font-medium">
            Sistema de avaliação para a disciplina Opcional 2.
          </p>
        </div>
        <button 
          onClick={downloadPDF}
          className="flex items-center justify-center gap-3 bg-secondary hover:bg-secondary-hover text-white border-4 border-zinc-900 dark:border-white px-8 py-4 font-bold text-lg uppercase tracking-wide transition-all shadow-[6px_6px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_rgba(255,255,255,1)] hover:translate-y-1 hover:translate-x-1 hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] dark:hover:shadow-[2px_2px_0px_rgba(255,255,255,1)] whitespace-nowrap"
        >
          <Download className="w-6 h-6" />
          Baixar Regulamento
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        {EVALUACIONES.map((crit, idx) => (
          <div key={idx} className="bg-light-surface dark:bg-dark-surface p-8 lg:p-10 border-4 border-zinc-900 dark:border-zinc-100 shadow-[12px_12px_0px_#ec4899] dark:shadow-[12px_12px_0px_#ec4899] relative group hover:-translate-y-2 hover:-translate-x-2 hover:shadow-[20px_20px_0px_#06b6d4] dark:hover:shadow-[20px_20px_0px_#06b6d4] transition-all duration-300">
            <div className="absolute -top-6 -right-6 p-8 opacity-10 dark:opacity-20 pointer-events-none group-hover:scale-125 transition-transform duration-500 text-zinc-900 dark:text-white">
              <PieChart className="w-48 h-48" />
            </div>
            
            <div className="flex items-end justify-between mb-8 relative z-10">
              <div className="w-20 h-20 bg-zinc-900 dark:bg-white flex items-center justify-center border-2 border-transparent shadow-[6px_6px_0px_#06b6d4] dark:shadow-[6px_6px_0px_#06b6d4] rotate-3 group-hover:-rotate-6 transition-transform">
                <Star className="w-10 h-10 text-white dark:text-zinc-900" />
              </div>
              <span className="text-6xl lg:text-7xl font-mono font-black text-primary tracking-tighter drop-shadow-[2px_2px_0px_#000] dark:drop-shadow-[2px_2px_0px_#fff]">
                {crit.porcentaje}%
              </span>
            </div>
            
            <h3 className="text-3xl font-serif font-black text-zinc-900 dark:text-white mb-4 relative z-10 leading-none uppercase">
              {crit.nombre}
            </h3>
            
            <p className="text-zinc-700 dark:text-zinc-300 font-medium text-lg leading-relaxed relative z-10 border-l-4 border-secondary pl-4">
              {crit.descripcion}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
