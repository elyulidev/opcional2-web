import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { ChatModal } from "./ChatModal";

export function Layout() {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	return (
		<div className='flex h-dvh w-full max-w-7xl mx-auto bg-light-surface dark:bg-dark-surface text-zinc-900 dark:text-zinc-100 font-sans noise-bg relative overflow-hidden'>
			<Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

			<div className='flex-1 flex flex-col min-w-0 relative'>
				<Header onMenuClick={() => setIsSidebarOpen(true)} />

				<main className='flex-1 overflow-y-auto relative flex flex-col'>
					<div className='min-h-full pb-24 flex-1'>
						<Outlet />
					</div>
					<div className='sticky top-[calc(100%-64px)] flex justify-end px-6 pointer-events-none h-0 z-50'>
						<div className='pointer-events-auto'>
							<ChatModal />
						</div>
					</div>
				</main>
			</div>
		</div>
	);
}
