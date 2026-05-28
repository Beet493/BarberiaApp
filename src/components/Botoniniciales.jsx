import React from 'react'


export function Botoniniciales() {
  return 
  const { favoritos, toggleFavorito } = useContext(FavoritosContext)
 const navigate = useNavigate()
  return (

<div>
      <div className="flex justify-center mt-6  gap-10 overflow-x-auto">

        <button 
          onClick={()=> navigate("/citas")} className="px-5 py-1 border border-purple-200 rounded-lg hover:bg-blue-600 hover:text-white transition">
          Citas
        </button>

        <button
          onClick ={() => navigate("/barberos")}className="px-4 py-1 border border-purple-200 rounded-lg hover:bg-blue-600 hover:text-white transition">
          Barberos
        </button>

        <button onClick={() => navigate("/favoritos")}className="px-3 py-1 border border-purple-200 rounded-lg hover:bg-blue-600 hover:text-white transition">
        Favoritos ({favoritos.length})
        </button>

        <button
        onClick ={() => navigate("/promociones") }className="px-3 py-1 border border-purple-200 rounded-lg hover:bg-blue-600 hover:text-white transition">
          Promociones
        </button>

      </div>

    </div>
  )  
}
