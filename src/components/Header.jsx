import { LogOut, User, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export  function Header({ toggleSidebar }) {
  const navigate = useNavigate()
  const nombre = localStorage.getItem("nombre")
  return (
    <header className="h-16 bg-gray-200 border-b border-gray-200 px-4 lg:px-8 flex items-center justify-between sticky top-0 z-30 shadow-sm">
      <div className="flex items-center gap-4">
        {/* Botón Hamburguesa */}
        <button 
          onClick={toggleSidebar} 
          className="p-2 text-slate-600 lg:hidden hover:bg-slate-100 rounded-lg"
        >
          <Menu size={24} />
        </button>
        <div className="hidden sm:block text-gray-400 text-sm font-medium">
          Panel / <span className="text-slate-800">Cliente</span>
        </div>
      </div>

      <div className="flex items-center gap-3 lg:gap-6">
        <div className="flex items-center gap-3 pl-4 border-l border-gray-100">
          <div className="text-right xs:block">
            <p className="text-sm font-bold text-slate-700 leading-none">Bienvenido: {nombre}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center border border-gray-200">
            <User size={20} className="text-slate-500" />
          </div>
          <button  onClick={() => navigate("/")}className="p-2 text-gray-400 hover:text-red-500 transition-all">
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </header>

  )
}
