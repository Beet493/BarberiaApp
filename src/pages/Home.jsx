import { useNavigate } from "react-router-dom"
import { Imagen } from "../components"
import { Buscador } from "../components"
import { Barbeross } from "../components"
import { ModalBarbero } from "../components"
import { useContext, useEffect, useState } from "react"
import { FavoritosContext } from "../context/FavoritosContext"
import Axios from "axios"
import API from "../api"

export function Home() {
  const { favoritos, toggleFavorito } = useContext(FavoritosContext)
  const [barberos, setBarberos] = useState([])
  const [barberoSeleccionado, setBarberoSeleccionado] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const cargar = async () => {
      try {
        const res = await Axios.get(`${API}/api/barbero/todos`)
        setBarberos(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    cargar()
  }, [])

  return (
    <div>
      <Buscador />
      <Imagen />
      <h1 className="text-2xl font-bold text-center mt-6">Barberos</h1>
      <div className="flex justify-center mt-6">
        <div className="grid grid-cols-2 gap-8 justify-items-center">
          {barberos.map((b) => (
            <Barbeross
              key={b._id}
              nombre={b.nombreTienda || b.usuario?.nombre}
              imagen={b.foto || "https://img.freepik.com/fotos-premium/primer-plano-fotografia-hombre-elegante-posando-traje-tradicional_999340-16017.jpg"}
              whatsapp={b.whatsapp}
              favorito={toggleFavorito}
              esFavorito={favoritos.some(f => f.nombre === (b.nombreTienda || b.usuario?.nombre))}
              onVerPerfil={() => setBarberoSeleccionado(b)}
            />
          ))}
        </div>
      </div>

      <ModalBarbero
        barbero={barberoSeleccionado}
        onClose={() => setBarberoSeleccionado(null)}
      />
    </div>
  )
}