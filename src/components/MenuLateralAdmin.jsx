import { useNavigate } from "react-router-dom"
import { User, CalendarClock, X, Menu, Store } from "lucide-react"

export function MenuLateralAdmin({ isOpen, toggleSidebar }) {
  const navigate = useNavigate()

  const ir = (ruta) => {
    navigate(ruta)
    toggleSidebar()
  }

  return (
    <>
      <button onClick={toggleSidebar} className="fixed top-4 left-4 z-40 bg-black text-white p-2 rounded-lg shadow-lg">
        <Menu size={22} />
      </button>

      {isOpen && <div className="fixed inset-0 bg-black/50 z-30" onClick={toggleSidebar} />}

      <div className={`
        fixed top-0 left-0 h-full w-64 bg-black text-white p-6 z-40
        transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">BarberApp 💈</h2>
          <button onClick={toggleSidebar} className="text-gray-400 hover:text-white">
            <X size={22} />
          </button>
        </div>

        <div className="space-y-4">
          <button onClick={() => ir("/admin/perfil")} className="flex items-center gap-2 w-full text-left hover:text-gray-400">
            <User size={20} /> Mi Perfil
          </button>
          <button onClick={() => ir("/admin/citas")} className="flex items-center gap-2 w-full text-left hover:text-gray-400">
            <CalendarClock size={20} /> Mis Citas
          </button>
          <button onClick={() => ir("/admin/tienda")} className="flex items-center gap-2 w-full text-left hover:text-gray-400">
            <Store size={20} /> Mi Tienda
          </button>
        </div>

      </div>
    </>
  )
}