import { useState } from "react"
import { useNavigate, Outlet } from "react-router-dom"
import { LogOut, User, CalendarClock } from "lucide-react"

export function Admin() {
  const navigate = useNavigate()
  const nombre = localStorage.getItem("nombre")
  const [menuAbierto, setMenuAbierto] = useState(false)

  const cerrarSesion = () => {
    localStorage.clear()
    navigate("/")
  }

  const ir = (ruta) => {
    navigate(ruta)
    setMenuAbierto(false)
  }

  return (
    <div className="flex min-h-screen">

      {/* Fondo oscuro en móvil */}
      {menuAbierto && (
        <div className="fixed inset-0 bg-black/50 z-20 md:hidden" onClick={() => setMenuAbierto(false)} />
      )}

      {/* Menú lateral */}
      <div className={`
        fixed top-0 left-0 h-full w-64 bg-black text-white p-6 z-30
        transition-transform duration-300
        ${menuAbierto ? "translate-x-0" : "-translate-x-full"}
        md:static md:translate-x-0
      `}>
        <h2 className="text-xl font-bold mb-8">✂️ BarberApp</h2>

        <div className="space-y-4">
          <button onClick={() => ir("/admin/perfil")} className="flex items-center gap-2 w-full text-left hover:text-gray-400">
            <User size={20} /> Mi Perfil
          </button>
          <button onClick={() => ir("/admin/citas")} className="flex items-center gap-2 w-full text-left hover:text-gray-400">
            <CalendarClock size={20} /> Mis Citas
          </button>
        </div>

        <button onClick={cerrarSesion} className="absolute bottom-6 flex items-center gap-2 text-red-400 hover:text-red-300">
          <LogOut size={20} /> Cerrar sesión
        </button>
      </div>

      {/* Contenido */}
      <div className="flex-1 bg-gray-100">
        {/* Header móvil */}
        <div className="bg-black text-white px-4 py-3 flex items-center gap-3 md:hidden">
          <button onClick={() => setMenuAbierto(true)} className="text-white">
            ☰
          </button>
          <span className="font-bold">Hola, {nombre}</span>
        </div>

        <div className="p-4">
          <Outlet />
        </div>
      </div>

    </div>
  )
}