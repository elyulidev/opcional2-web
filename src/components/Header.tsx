import { Menu } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { COURSE_CODE } from '../content/constants';

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="h-16 border-b-2 border-light-border dark:border-dark-border bg-light-bg dark:bg-dark-bg sticky top-0 z-30 flex items-center justify-between px-4 lg:px-8">
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuClick}
          className="p-2 -ml-2 rounded-none border-2 border-transparent lg:hidden hover:border-black dark:hover:border-white text-zinc-900 dark:text-zinc-100 transition-all"
        >
          <Menu className="w-6 h-6" />
        </button>
        <span className="font-mono text-sm px-3 py-1 bg-primary text-white font-bold border-2 border-primary tracking-tight uppercase shadow-[2px_2px_0px_#000] dark:shadow-[2px_2px_0px_#fff]">
          {COURSE_CODE}
        </span>
      </div>
      
      <div className="flex items-center gap-4">
        <ThemeToggle />
      </div>
    </header>
  );
}
