
import { useContext } from "react"
import { FavoritosContext } from "../context/FavoritosContext"
import { Barbeross } from "../components"

export function Favoritos() {

  const { favoritos, toggleFavorito } = useContext(FavoritosContext)

  return (
    <div>
      <h1 className="text-2xl font-bold text-center mt-6">
        Mis Favoritos che
      </h1>

      <div className="flex justify-center mt-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">

          {favoritos.length === 0 ? (
            <p>No tienes favoritos aún</p>
          ) : (
            favoritos.map((b, i) => (
              <Barbeross
                key={i} //Se puede quitar, asi que quitar
                nombre={b.nombre}
                imagen={b.imagen}
                favorito={toggleFavorito}
                esFavorito={true}
              />
            ))
          )}

        </div>
      </div>
    </div>
  )
}
