import { Link, useLocation } from 'react-router-dom';
import { MODULOS, NAV_LINKS } from '../content/constants';
import { ChevronDown, ChevronRight, BookOpen, LayoutDashboard, FileText, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { cn } from '../lib/utils';

export function Sidebar({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const location = useLocation();
  const [expandedModules, setExpandedModules] = useState<string[]>([]);

  const toggleModule = (id: string) => {
    setExpandedModules(prev => 
      prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
    );
  };

  const icons = {
    'Início': LayoutDashboard,
    'Conferências': BookOpen,
    'Bibliografia': FileText,
    'Avaliação': CheckCircle
  };

  return (
    <>
      <div 
        className={cn(
          "fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden transition-opacity",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )} 
        onClick={onClose} 
      />
      <aside 
        className={cn(
          "fixed top-0 left-0 bottom-0 z-50 w-72 bg-light-surface dark:bg-dark-surface border-r-2 border-light-border dark:border-dark-border flex flex-col transition-transform duration-300 lg:translate-x-0 lg:static",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="p-6 border-b-2 border-light-border dark:border-dark-border bg-light-bg dark:bg-dark-bg flex items-center gap-3">
          <img src="/logo.png" alt="Testing com Bun Logo" className="w-12 h-12 object-contain border-2 border-zinc-900 dark:border-zinc-100 brutalist-shadow" />
          <h2 className="text-2xl font-serif font-black text-zinc-900 dark:text-white flex flex-col uppercase tracking-tighter leading-none">
            Testing <span className="text-primary font-mono text-xl tracking-normal lowercase mt-1">com Bun</span>
          </h2>
        </div>
        
        <nav className="flex-1 overflow-y-auto p-4 space-y-4">
          {NAV_LINKS.map(link => {
            const Icon = icons[link.title as keyof typeof icons];
            const isActive = link.path === '/' ? location.pathname === '/' : location.pathname.startsWith(link.path);
            
            return (
              <div key={link.path}>
                <Link 
                  to={link.path}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 border-2 transition-all font-bold uppercase tracking-wide text-sm",
                    isActive 
                      ? "bg-secondary text-white border-secondary dark:border-secondary brutalist-shadow -translate-x-0.5 -translate-y-0.5" 
                      : "bg-light-bg dark:bg-dark-bg text-zinc-700 dark:text-zinc-300 border-light-border dark:border-dark-border hover:border-zinc-900 dark:hover:border-zinc-100"
                  )}
                  onClick={() => {
                    if (link.title !== 'Conferências') onClose();
                  }}
                >
                  {Icon && <Icon className="w-5 h-5" />}
                  {link.title}
                </Link>
                
                {link.title === 'Conferências' && isActive && (
                  <div className="mt-4 ml-4 pl-4 border-l-2 border-zinc-900 dark:border-zinc-100 space-y-3 cursor-pointer">
                    {MODULOS.map(modulo => {
                      const isExpanded = expandedModules.includes(modulo.id) || location.pathname.includes(modulo.id);
                      return (
                        <div key={modulo.id} className="select-none">
                          <div 
                            className="flex items-center justify-between py-2 px-2 border-b-2 border-transparent hover:border-primary dark:hover:border-primary text-zinc-800 dark:text-zinc-200 transition-colors"
                            onClick={() => toggleModule(modulo.id)}
                          >
                            <span className="font-bold uppercase text-xs tracking-wider truncate">{modulo.titulo}</span>
                            {isExpanded ? <ChevronDown className="w-5 h-5 shrink-0 text-primary" /> : <ChevronRight className="w-5 h-5 shrink-0" />}
                          </div>
                          
                          {isExpanded && (
                            <div className="mt-2 ml-2 space-y-2">
                              {modulo.conferencias.map(conf => {
                                const isConfActive = location.pathname === `/conferencias/${conf.path}`;
                                return (
                                  <Link
                                    key={conf.id}
                                    to={`/conferencias/${conf.path}`}
                                    onClick={onClose}
                                    className={cn(
                                      "block py-2 px-3 border-2 transition-all text-sm font-medium truncate",
                                      isConfActive
                                        ? "bg-light-bg dark:bg-dark-bg border-primary text-primary shadow-[2px_2px_0px_#ec4899]"
                                        : "border-transparent text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                                    )}
                                    title={conf.titulo}
                                  >
                                    {conf.titulo}
                                  </Link>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
