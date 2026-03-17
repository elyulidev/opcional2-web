import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { ChatModal } from "./ChatModal";

export function Layout() {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	return (
		/* Este es el contenedor padre que limita todo a 7xl */
		<div className='flex h-dvh max-w-7xl mx-auto bg-light-surface dark:bg-dark-surface text-zinc-900 dark:text-zinc-100 font-sans noise-bg relative overflow-hidden'>
			<Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

			<div className='flex-1 flex flex-col min-w-0 h-screen relative'>
				<Header onMenuClick={() => setIsSidebarOpen(true)} />

				<main className='flex-1 overflow-y-auto w-full relative'>
					<div className='min-h-full pb-24 w-full'>
						<Outlet />
					</div>

					{/* BOTÓN AQUÍ: Usamos 'sticky' para que flote sobre el scroll
              pero se mantenga alineado al borde derecho del contenedor 'main' */}
					<div className='sticky bottom-16 flex justify-end px-6 pointer-events-none h-0 z-50'>
						<div className='pointer-events-auto'>
							<ChatModal />
						</div>
					</div>
				</main>
			</div>
		</div>
	);
}
