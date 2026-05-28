import { LogOut, User } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export function HeaderAdmin({ toggleSidebar }) {
  const navigate = useNavigate()
  const nombre = localStorage.getItem("nombre")

  const cerrarSesion = () => {
    localStorage.clear()
    navigate("/")
  }

  return (
    <header className="h-16 bg-gray-200 border-b border-gray-200 px-4 lg:px-15 flex items-center justify-between sticky top-0 z-30 shadow-sm">
      <div className="text-gray-400 text-sm font-medium">
        Panel / <span className="text-slate-800">Barbero</span>
      </div>

      <div className="flex items-center gap-3 pl-4 border-l border-gray-100">
        <p className="text-sm font-bold text-slate-700">Bienvenido: {nombre}</p>
        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center border border-gray-200">
          <User size={20} className="text-slate-500" />
        </div>
        <button onClick={cerrarSesion} className="p-2 text-gray-400 hover:text-red-500 transition-all">
          <LogOut size={20} />
        </button>
      </div>
    </header>
  )
}