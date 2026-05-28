import { useNavigate } from "react-router-dom"
import {Imagen} from "../components"
import { Buscador } from "../components"
import { Barbeross } from "../components"
import { useContext } from "react"
import { FavoritosContext } from "../context/FavoritosContext"

export function Home() {

const { favoritos, toggleFavorito } = useContext(FavoritosContext)
 const navigate = useNavigate()
  return (

<div>
      <div className="flex justify-center mt-6  gap-10 overflow-x-auto">
       

      </div>
      <Buscador/>
      <Imagen/>
      <h1 className="text-2xl font-bold text-center mt-6">
          Barberos
      </h1>
      <div className="flex justify-center mt-6">
        <div className="flex gap-10 overflow-x-auto">
          
      <Barbeross
      nombre="Erin Lindford"
      imagen="https://img.freepik.com/fotos-premium/primer-plano-fotografia-hombre-elegante-posando-traje-tradicional_999340-16017.jpg"
      favorito={toggleFavorito}
      esFavorito={favoritos.some(b => b.nombre === "Erin Lindford")}
      onVerPerfil={() => {}}
      />
      <Barbeross
      nombre="Pulpo Tigre"
      imagen="https://img.freepik.com/fotos-premium/primer-plano-fotografia-hombre-elegante-posando-traje-tradicional_999340-16017.jpg"
      favorito={toggleFavorito}
      esFavorito={favoritos.some(b => b.nombre === "Pulpo Tigre")}
      onVerPerfil={() => {}}
      />
        </div>
      </div>
</div>
  )
}