import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { ChatModal } from "./ChatModal";

export function Layout() {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	return (
		<div className='flex h-screen max-w-7xl mx-auto bg-light-surface dark:bg-dark-surface text-zinc-900 dark:text-zinc-100 font-sans noise-bg'>
			<Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

			<div className='flex-1 flex flex-col min-w-0 h-screen overflow-hidden relative'>
				<Header onMenuClick={() => setIsSidebarOpen(true)} />

				<main className='flex-1 overflow-y-auto w-full relative'>
					<div className='min-h-full pb-24'>
						<Outlet />
					</div>
				</main>
				{/* CONTENEDOR FANTASMA PARA EL BOTÓN */}
				<div className='fixed inset-0 pointer-events-none z-50 max-w-7xl mx-auto'>
					<div className='relative h-full w-full'>
						<div className='absolute bottom-6 right-14 pointer-events-auto'>
							<ChatModal />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
