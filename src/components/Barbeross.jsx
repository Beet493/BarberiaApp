import React from "react"
import { Heart } from "lucide-react"

export function Barbeross({ nombre, imagen, favorito, esFavorito, whatsapp, onVerPerfil }) {
  return (
    <div className="flex flex-col items-center">
      <img className="h-24 w-24 rounded-full object-cover" src={imagen} alt={nombre} />
      
      <h3 className="mt-2 text-lg font-semibold text-center min-h-[56px]">
        {nombre}
      </h3>

      <div className="flex gap-2 mt-2">
        <button
          onClick={() => favorito({ nombre, imagen })}
          className={`px-3 py-1 rounded-lg flex items-center justify-center transition 
            ${esFavorito ? "bg-pink-600 text-white" : "border border-purple-200 hover:bg-pink-600 hover:text-white"}`}
        >
          <Heart size={18} fill={esFavorito ? "white" : "none"} />
        </button>

        
        <a
          href={whatsapp ? `https://wa.me/52${whatsapp}` : "#"}
          target="_blank"
          rel="noreferrer"
          className="px-3 py-1 border border-purple-200 rounded-lg hover:bg-green-600 hover:text-white transition"
          >
            WhatsApp
        </a>
        
        <button 
          onClick={onVerPerfil}
          className="px-3 py-1 border border-purple-200 rounded-lg hover:bg-blue-600 hover:text-white transition text-sm"
        >
          Ver perfil
        </button>
      </div>
    </div>
  )
}