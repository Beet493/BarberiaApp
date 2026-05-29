import { useState, useEffect } from "react"
import Axios from "axios"
import API from "../api"

const COLORES = {
  pendiente:  "bg-yellow-100 text-yellow-700",
  aceptada:   "bg-green-100 text-green-700",
  rechazada:  "bg-red-100 text-red-700",
  completada: "bg-blue-100 text-blue-700"
}

export function MisCitas() {
  const clienteNombre = localStorage.getItem("nombre")
  const [citas, setCitas] = useState([])
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    const cargar = async () => {
      try {
        const res = await Axios.get(`${API}/api/cita/cliente/${clienteNombre}`)
        setCitas(res.data)
      } catch (error) {
        console.log(error)
      } finally {
        setCargando(false)
      }
    }
    cargar()
  }, [])

  if (cargando) return <p className="text-center mt-10 text-gray-400">Cargando...</p>

  return (
    <div className="max-w-md mx-auto py-4 space-y-4">
      <h2 className="text-2xl font-bold text-gray-800">Mis Citas</h2>

      {citas.length === 0 ? (
        <p className="text-center text-gray-400 mt-10">No tienes citas aún</p>
      ) : (
        citas.map((cita) => (
          <div key={cita._id} className="bg-white rounded-2xl p-4 shadow-sm space-y-2">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-bold text-gray-800">{cita.barbero}</p>
                <p className="text-sm text-gray-500">{cita.fecha} — {cita.hora}</p>
                {cita.servicio && <p className="text-sm text-gray-500">{cita.servicio}</p>}
              </div>
              <span className={`text-xs font-bold px-3 py-1 rounded-full ${COLORES[cita.estado]}`}>
                {cita.estado}
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  )
}