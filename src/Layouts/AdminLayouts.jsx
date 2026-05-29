import { useState } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { MenuLateral } from "../components"
import { Header } from "../components/Header"

export function AdminLayouts() {
  const [sideBar, setSideBar] = useState(false)

  const toggleSidebar = () => setSideBar(!sideBar)
  const navigate = useNavigate()
  return (
    <div className="flex bg-gray-100 text-slate-900 min-h-screen">


      <MenuLateral isOpen={sideBar} toggleSidebar={toggleSidebar} />

      <div className="flex-1 bg-gray-100 min-w-0 lg:ml-0">
        
        <Header toggleSidebar={toggleSidebar}/>
        

        {/* Botones de priuncipales, para que aprescas en toda la pagina,PRUIEBA preguntar si se deja o menor nel*/}
        <div className="flex flex-wrap justify-center gap-2 p-3">
          <button onClick={() => navigate("/citas")} className="px-4 py-2 rounded-lg border border-black-200 hover:bg-blue-600 hover:text-white transition">
            Citas
          </button>
          <button onClick={() => navigate("/miscitas")} className="px-4 py-2 rounded-lg border border-black-200 hover:bg-blue-600 hover:text-white transition">
             Mis Citas
          </button>
          <button onClick={() => navigate("/barberos")} className="px-4 py-2 rounded-lg border border-black-200 hover:bg-blue-600 hover:text-white transition">
            Barberos
          </button>
          <button onClick={() => navigate("/favoritos")} className="px-4 py-2 rounded-lg border border-black-200 hover:bg-blue-600 hover:text-white transition">
            Favoritos
          </button>
          <button onClick={() => navigate("/promociones")} className="px-4 py-2 rounded-lg border border-black-200 hover:bg-blue-600 hover:text-white transition">
            Promociones
          </button>
        </div>

      
        <Outlet />
      </div>

    </div>
  )
}
/*import { useState } from "react";


export function AdminLayouts({ children }) {
  const [sideBar, setsideBar] = useState(false);

  const toggleSidebar = () => setsideBar(!sideBar);

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden text-slate-900">
      <MenuLateral isOpen={sideBar} toggleSidebar={toggleSidebar} />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header userName="Dany" toggleSidebar={toggleSidebar}/>
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}*/

