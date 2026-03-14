import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Check, Copy } from 'lucide-react';
import { useState } from 'react';

export function CodeBlock({ code, language, className }: { code: string, language: string, className?: string }) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`relative group border-4 border-zinc-900 dark:border-zinc-100 shadow-[8px_8px_0px_#ec4899] dark:shadow-[8px_8px_0px_#ec4899] my-10 bg-[#1E1E1E] ${className || ''}`}>
      <div className="absolute top-0 right-0 py-2 flex items-center justify-between w-full bg-zinc-900 dark:bg-[#111111] px-4 border-b-4 border-zinc-900 dark:border-zinc-100 z-10 text-white">
        <span className="text-sm font-mono font-bold uppercase tracking-widest text-secondary">{language}</span>
        <button 
          onClick={copy}
          className="p-1.5 border-2 border-transparent hover:border-white transition-colors"
          title="Copiar código"
        >
          {copied ? <Check className="w-4 h-4 text-primary" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>
      <div className="pt-12 bg-transparent text-sm md:text-base font-mono">
        <SyntaxHighlighter
          language={language}
          style={vscDarkPlus}
          customStyle={{ margin: 0, padding: '1rem', background: 'transparent' }}
          CodeTag="div"
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
