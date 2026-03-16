import { type ReactNode } from "react";
import { cn } from "../lib/utils";
import { AlertTriangle, Info, Lightbulb, Zap } from "lucide-react";

interface CalloutProps {
	title?: string;
	children: ReactNode;
	type?: "info" | "warning" | "tip" | "danger";
	className?: string;
}

export function Callout({
	title,
	children,
	type = "info",
	className,
}: CalloutProps) {
	const styles = {
		info: "bg-cyan-100 dark:bg-cyan-950/30 border-cyan-500 brutalist-shadow-secondary",
		warning:
			"bg-amber-100 dark:bg-amber-950/30 border-amber-500 shadow-[4px_4px_0px_#f59e0b]",
		tip: "bg-fuchsia-100 dark:bg-fuchsia-950/30 border-primary brutalist-shadow-primary",
		danger:
			"bg-rose-100 dark:bg-rose-950/30 border-rose-500 shadow-[4px_4px_0px_#f43f5e]",
	};

	const icons = {
		info: <Info className='w-6 h-6 text-cyan-600 dark:text-cyan-400' />,
		warning: (
			<AlertTriangle className='w-6 h-6 text-amber-600 dark:text-amber-400' />
		),
		tip: <Lightbulb className='w-6 h-6 text-primary' />,
		danger: <Zap className='w-6 h-6 text-rose-600 dark:text-rose-400' />,
	};

	return (
		<div
			className={cn(
				"p-6 my-8 border-4 border-zinc-900 dark:border-zinc-100 relative",
				styles[type],
				className,
			)}
		>
			<div className='absolute -top-5 -left-5 bg-zinc-900 dark:bg-zinc-100 p-2 border-2 border-transparent brutalist-shadow rotate-3 z-10'>
				{icons[type]}
			</div>
			{title && (
				<h4 className='font-serif font-black text-xl mb-2 text-zinc-900 dark:text-white uppercase mt-2'>
					{title}
				</h4>
			)}
			<div className='text-zinc-800 dark:text-zinc-200 font-medium text-lg leading-relaxed'>
				{children}
			</div>
		</div>
	);
}

export function Concept({
	title,
	children,
}: {
	title: string;
	children: ReactNode;
}) {
	return (
		<div className='my-10 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 p-8 border-4 border-transparent shadow-[8px_8px_0px_#06b6d4] hover:translate-x-1 hover:-translate-y-1 transition-transform'>
			<h3 className='text-3xl font-black font-serif uppercase tracking-tight mb-4 flex items-center gap-3 text-white dark:text-zinc-900'>
				<span className='bg-primary text-white px-3 py-1 border-2 border-white dark:border-zinc-900 brutalist-shadow -rotate-2'>
					DEF
				</span>
				{title}
			</h3>
			<div className='text-xl font-medium leading-relaxed opacity-90'>
				{children}
			</div>
		</div>
	);
}

export function Box({
	children,
	className,
}: {
	children: ReactNode;
	className?: string;
}) {
	return (
		<div
			className={cn(
				"p-6 my-6 bg-light-surface dark:bg-dark-surface border-4 border-zinc-900 dark:border-zinc-100 brutalist-shadow-lg",
				className,
			)}
		>
			<div className='text-lg font-bold text-zinc-800 dark:text-zinc-200'>
				{children}
			</div>
		</div>
	);
}
