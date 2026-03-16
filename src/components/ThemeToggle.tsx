import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import { cn } from '../lib/utils';

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggle = () => {
    const nextTheme = !isDark;
    setIsDark(nextTheme);
    localStorage.setItem('theme', nextTheme ? 'dark' : 'light');
  };

  return (
    <button 
      onClick={toggle}
      className="group relative p-3 bg-white dark:bg-zinc-900 border-4 border-zinc-900 dark:border-zinc-100 shadow-[4px_4px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_rgba(255,255,255,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] dark:hover:shadow-[2px_2px_0px_rgba(255,255,255,1)] transition-all active:scale-95 overflow-hidden"
      aria-label="Alternar tema"
    >
      <div className={cn(
        "transition-transform duration-500",
        isDark ? "rotate-360" : "rotate-0"
      )}>
        {isDark ? (
          <Sun className="w-6 h-6 text-yellow-500 fill-yellow-500" />
        ) : (
          <Moon className="w-6 h-6 text-indigo-600 fill-indigo-600" />
        )}
      </div>
      
      {/* Subtle hover effect layer */}
      <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-10 transition-opacity" />
    </button>
  );
}
