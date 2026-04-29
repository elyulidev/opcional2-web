import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
	vscDarkPlus,
	oneLight,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import { Check, Copy } from "lucide-react";
import { useState, useEffect } from "react";

/** Observes the <html> element's class list to track the Tailwind dark mode class. */
function useDarkMode(): boolean {
	const [isDark, setIsDark] = useState(() =>
		document.documentElement.classList.contains("dark")
	);

	useEffect(() => {
		const el = document.documentElement;
		const observer = new MutationObserver(() => {
			setIsDark(el.classList.contains("dark"));
		});
		observer.observe(el, { attributes: true, attributeFilter: ["class"] });
		return () => observer.disconnect();
	}, []);

	return isDark;
}

export function CodeBlock({
	code,
	language,
	className,
}: {
	code: string;
	language: string;
	className?: string;
}) {
	const isDark = useDarkMode();
	const [copied, setCopied] = useState(false);

	const copy = () => {
		navigator.clipboard.writeText(code);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<div
			className={`relative group my-10 border-4 shadow-[8px_8px_0px_#ec4899]
        ${isDark
					? "border-zinc-100 bg-[#1E1E1E]"
					: "border-zinc-900 bg-[#FAFAFA]"
				}
        ${className || ""}`}
		>
			{/* Header bar */}
			<div
				className={`absolute top-0 right-0 py-2 flex items-center justify-between w-full px-4 border-b-4 z-10
          ${isDark
						? "bg-[#111111] border-zinc-700 text-white"
						: "bg-zinc-100 border-zinc-300 text-zinc-900"
					}`}
			>
				<span
					className={`text-sm font-mono font-bold uppercase tracking-widest
            ${isDark ? "text-secondary" : "text-primary"}`}
				>
					{language}
				</span>
				<button
					onClick={copy}
					className={`p-1.5 border-2 border-transparent transition-colors
            ${isDark
							? "hover:border-white"
							: "hover:border-zinc-600 hover:bg-zinc-200"
						}`}
					title='Copiar código'
				>
					{copied ? (
						<Check className='w-4 h-4 text-primary' />
					) : (
						<span
							className={isDark ? "text-white" : "text-zinc-600"}
						>
							<Copy className='w-4 h-4' />
						</span>
					)}
				</button>
			</div>

			{/* Code area */}
			<div className='pt-12 bg-transparent text-sm md:text-base font-mono'>
				<SyntaxHighlighter
					language={language}
					style={isDark ? vscDarkPlus : oneLight}
					customStyle={{
						margin: 0,
						padding: "1rem",
						background: "transparent",
					}}
					CodeTag='div'
				>
					{code}
				</SyntaxHighlighter>
			</div>
		</div>
	);
}
