import { Outlet, useLocation, Navigate } from 'react-router-dom';
import { MODULOS } from '../content/constants';

export function Conferencias() {
  const location = useLocation();
  
  if (location.pathname === '/conferencias' || location.pathname === '/conferencias/') {
    const firstModulo = MODULOS[0];
    const firstConf = firstModulo?.conferencias[0];
    if (firstConf) {
      return <Navigate to={`/conferencias/${firstConf.path}`} replace />;
    }
  }

  return (
    <div className="h-full relative max-w-5xl mx-auto p-4 md:p-6 lg:p-8 animate-in fade-in duration-300">
      <div className="bg-light-bg dark:bg-dark-bg border-4 border-zinc-900 dark:border-zinc-100 shadow-[8px_8px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_rgba(255,255,255,0.2)] overflow-hidden min-h-[70vh]">
        <Outlet />
      </div>
    </div>
  );
}
