import { BIBLIOGRAFIA } from '../content/constants';
import { ExternalLink, Book, FileText, Globe, Download } from 'lucide-react';

export function Bibliografia() {
  return (
    <div className="max-w-4xl mx-auto p-6 lg:p-12 animate-in fade-in">
      <div className="mb-12 border-b-8 border-zinc-900 dark:border-zinc-100 pb-8">
        <h1 className="text-4xl md:text-6xl font-serif font-black text-zinc-900 dark:text-white mb-6 uppercase tracking-tight">
          Bibliografia Sugerida
        </h1>
        <p className="text-zinc-700 dark:text-zinc-300 text-xl font-medium max-w-2xl">
          Materiais de referência recomendados para aprofundamento nos tópicos de testes de software e Bun.js.
        </p>
      </div>

      <div className="bg-light-bg dark:bg-dark-bg border-4 border-zinc-900 dark:border-zinc-100 shadow-[8px_8px_0px_#06b6d4] dark:shadow-[8px_8px_0px_#06b6d4] overflow-hidden">
        <div className="divide-y-4 divide-zinc-900 dark:divide-zinc-100">
          {BIBLIOGRAFIA.map((item, idx) => (
            <div key={idx} className="p-6 sm:p-8 flex items-start gap-6 bg-light-surface dark:bg-dark-surface hover:bg-white dark:hover:bg-zinc-900 transition-colors group">
              <div className="mt-1 shrink-0 w-16 h-16 bg-zinc-900 dark:bg-white flex items-center justify-center border-2 border-transparent shadow-[4px_4px_0px_#ec4899] dark:shadow-[4px_4px_0px_#ec4899] group-hover:-rotate-6 transition-transform">
                {item.tipo === 'Livro' && <Book className="w-8 h-8 text-white dark:text-zinc-900" />}
                {item.tipo === 'Artigo' && <FileText className="w-8 h-8 text-white dark:text-zinc-900" />}
                {item.tipo === 'Oficial' && <Globe className="w-8 h-8 text-white dark:text-zinc-900" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3">
                  <h3 className="font-black text-zinc-900 dark:text-white font-serif text-2xl leading-none uppercase tracking-tight">
                    {item.titulo}
                  </h3>
                  <span className="inline-flex py-1.5 px-3 bg-primary text-white text-xs font-bold uppercase tracking-widest border-2 border-zinc-900 dark:border-white shadow-[2px_2px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_rgba(255,255,255,1)] shrink-0">
                    {item.tipo}
                  </span>
                </div>
                <p className="text-zinc-600 dark:text-zinc-400 text-base mb-6 flex items-center gap-3 font-mono font-bold">
                  <span className="text-zinc-900 dark:text-white bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5">{item.autor}</span>
                  <span className="text-primary">•</span>
                  <span className="text-zinc-900 dark:text-white bg-secondary/20 px-2 py-0.5">{item.ano}</span>
                </p>
                
                <div className="flex flex-wrap gap-4">
                  {item.enlace && (
                    <a 
                      href={item.enlace}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-4 py-2 text-sm font-bold uppercase hover:bg-secondary dark:hover:bg-secondary transition-colors border-2 border-transparent shadow-[2px_2px_0px_#ec4899] dark:shadow-[2px_2px_0px_#ec4899] hover:translate-x-1 hover:translate-y-1 hover:shadow-none w-fit"
                    >
                      Aceder ao Recurso <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                  {item.downloadUrl && (
                    <a 
                      href={item.downloadUrl}
                      download
                      className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2 text-sm font-bold uppercase hover:bg-primary-hover transition-colors border-2 border-transparent shadow-[2px_2px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_rgba(255,255,255,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none w-fit"
                    >
                      Descarregar PDF <Download className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
