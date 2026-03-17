import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import type { ConferenciaData } from "../types";

// O Vite permite fazer lazy load global de arquivos via import.meta.glob
const modules = import.meta.glob("../content/*/*.tsx");

export function ConferenceReader() {
	const { moduloId, conferenciaId } = useParams();
	const [data, setData] = useState<ConferenciaData | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const loadContent = async () => {
			setLoading(true);
			try {
				const path = `../content/${moduloId}/${conferenciaId}.tsx`;
				if (modules[path]) {
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					const mod = (await modules[path]()) as any;
					setData(mod.data);
				} else {
					setData(null);
				}
			} catch (e) {
				console.error(e);
			} finally {
				setLoading(false);
			}
		};
		loadContent();
	}, [moduloId, conferenciaId]);

	if (loading) {
		return (
			/* Envolvemos en un div w-full para que el Outlet ocupe todo el ancho.
         Usamos exactamente las mismas clases de padding y margen que el return final.
      */
			<div className='w-full min-h-screen'>
				<div className='p-6 md:p-10 lg:p-14 max-w-5xl mx-auto animate-pulse'>
					{/* Skeleton del Título: Igualamos el border y padding del h1 real */}
					<div className='inline-block border-b-8 border-zinc-800 pb-6 mb-8 w-full max-w-2xl'>
						<div className='h-12 lg:h-16 bg-zinc-800/50 w-full'></div>
					</div>

					{/* Skeleton de Objetivos:
              Forzamos w-full para que no se colapse horizontalmente
          */}
					<div className='bg-zinc-900/30 border-4 border-zinc-800 p-6 lg:p-8 mb-12 shadow-[6px_6px_0px_rgba(30,30,30,1)] w-full'>
						<div className='flex items-center gap-3 mb-6'>
							<div className='w-12 h-8 bg-zinc-800'></div>
							<div className='h-6 bg-zinc-800 w-48'></div>
						</div>
						<div className='space-y-4'>
							<div className='h-4 bg-zinc-800 w-full'></div>
							<div className='h-4 bg-zinc-800 w-11/12'></div>
						</div>
					</div>

					{/* Skeleton del Texto del contenido */}
					<div className='space-y-6 w-full'>
						<div className='h-4 bg-zinc-800/50 w-full'></div>
						<div className='h-4 bg-zinc-800/50 w-full'></div>
						<div className='h-4 bg-zinc-800/50 w-4/5'></div>
						<div className='h-4 bg-zinc-800/50 w-full'></div>
					</div>
				</div>
			</div>
		);
	}

	if (!data) {
		return (
			<div className='p-12 text-center'>
				<h2 className='text-2xl font-serif font-bold text-slate-800 dark:text-slate-200 mb-2'>
					Conteúdo não encontrado
				</h2>
				<p className='text-slate-500 dark:text-slate-400'>
					O módulo ou conferência solicitada ({moduloId}/{conferenciaId}) não
					existe.
				</p>
			</div>
		);
	}

	return (
		<div className='p-6 md:p-10 lg:p-14 min-h-screen max-w-5xl mx-auto animate-in fade-in duration-500'>
			<h1 className='text-4xl lg:text-6xl font-serif font-black text-zinc-900 dark:text-white mb-8 leading-[1.1] uppercase tracking-tighter border-b-8 border-primary pb-6 inline-block'>
				{data.titulo}
			</h1>

			{data.objetivos && data.objetivos.length > 0 && (
				<div className='bg-light-surface dark:bg-dark-surface border-4 border-zinc-900 dark:border-zinc-100 shadow-[6px_6px_0px_#ec4899] dark:shadow-[6px_6px_0px_#ec4899] p-6 lg:p-8 mb-12'>
					<h3 className='font-serif font-black uppercase text-zinc-900 dark:text-white mb-6 flex items-center gap-3 text-xl tracking-tight'>
						<span className='bg-primary text-white px-2 py-1 border-2 border-zinc-900 dark:border-white shadow-[2px_2px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_rgba(255,255,255,1)]'>
							OBJ
						</span>{" "}
						Objetivos de Aprendizagem
					</h3>
					<ul className='space-y-3 text-zinc-800 dark:text-zinc-200 font-medium text-lg'>
						{data.objetivos.map((obj, i) => (
							<li key={i} className='flex gap-4 items-start'>
								<span className='text-primary font-black text-xl leading-none mt-1'>
									→
								</span>
								<span>{obj}</span>
							</li>
						))}
					</ul>
				</div>
			)}

			{/* Estilos para que os elementos HTML dentro de 'contenido' apareçam adequadamente formatados */}
			<div
				className="
        text-zinc-800 dark:text-zinc-200 leading-relaxed text-lg
        prose-headings:font-serif prose-headings:font-black prose-headings:text-zinc-900 dark:prose-headings:text-white prose-headings:uppercase prose-headings:tracking-tight
        prose-h2:text-3xl prose-h2:mt-16 prose-h2:mb-6 prose-h2:pb-4 prose-h2:border-b-4 prose-h2:border-zinc-900 dark:prose-h2:border-zinc-100 prose-h2:inline-block
        prose-h3:text-2xl prose-h3:mt-12 prose-h3:mb-4 prose-h3:text-primary
        prose-p:mb-6 prose-p:text-lg prose-p:font-medium
        prose-ul:list-none prose-ul:ml-0 prose-ul:space-y-3 prose-ul:mb-8
        prose-li:relative prose-li:pl-6 prose-li:font-medium
        prose-li:before:content-['▹'] prose-li:before:absolute prose-li:before:left-0 prose-li:before:text-secondary prose-li:before:font-bold
        prose-strong:text-zinc-950 dark:prose-strong:text-white prose-strong:font-black prose-strong:bg-primary/20 prose-strong:px-1
        prose-code:px-2 prose-code:py-1 prose-code:bg-zinc-900 dark:prose-code:bg-zinc-800 prose-code:text-secondary prose-code:border-2 prose-code:border-zinc-900 dark:prose-code:border-transparent prose-code:shadow-[2px_2px_0px_rgba(0,0,0,1)] dark:prose-code:shadow-none prose-code:text-sm prose-code:font-mono font-bold
      "
			>
				{data.contenido}
			</div>

			{data.ejercicios && data.ejercicios.length > 0 && (
				<div className='mt-20 pt-12 border-t-8 border-zinc-900 dark:border-zinc-100'>
					<h2 className='text-4xl font-serif font-black mb-10 text-white dark:text-zinc-900 uppercase tracking-tight inline-block bg-secondary px-4 py-2 border-4 border-zinc-900 dark:border-white shadow-[6px_6px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_rgba(255,255,255,1)] -rotate-1'>
						Exercícios Práticos
					</h2>
					<div className='grid gap-8'>
						{data.ejercicios.map((ej, i) => (
							<div
								key={i}
								className='bg-light-bg dark:bg-dark-bg p-6 md:p-8 border-4 border-zinc-900 dark:border-zinc-100 shadow-[8px_8px_0px_#06b6d4] dark:shadow-[8px_8px_0px_#06b6d4] relative'
							>
								<div className='absolute -top-4 -left-4 w-12 h-12 flex items-center justify-center bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-black font-mono text-xl border-2 border-transparent shadow-[4px_4px_0px_#ec4899] dark:shadow-[4px_4px_0px_#ec4899] z-10 rotate-3'>
									{i + 1}
								</div>
								<h4 className='font-black text-zinc-900 dark:text-white text-xl mb-4 uppercase mt-2 pl-4 border-l-4 border-secondary'>
									{ej.titulo}
								</h4>
								<p className='text-zinc-700 dark:text-zinc-300 text-lg font-medium pl-4'>
									{ej.descripcion}
								</p>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
}
