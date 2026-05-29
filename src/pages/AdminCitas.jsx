import { useState, useEffect } from "react"
import Axios from "axios"
import { Trash2,Pencil } from "lucide-react"
import API from "../../api"

const COLORES = {
  pendiente:   "bg-yellow-100 text-yellow-700",
  aceptada:    "bg-green-100 text-green-700",
  rechazada:   "bg-red-100 text-red-700",
  completada:  "bg-blue-100 text-blue-700"
}

export function AdminCitas() {
  const barberoId = localStorage.getItem("id")
  const [citas, setCitas] = useState([])
  const [cargando, setCargando] = useState(true)
  const [editando, setEditando] = useState(null)
const [nuevaFecha, setNuevaFecha] = useState("")
const [nuevaHora, setNuevaHora] = useState("")

  const cargarCitas = async () => {
    try {
      const res = await Axios.get(`${API}/api/cita/barbero/${barberoId}`)
      setCitas(res.data)
    } catch (error) {
      console.log(error)
    } finally {
      setCargando(false)
    }
  }

  useEffect(() => {
    cargarCitas()
  }, [])

  const cambiarEstado = async (id, estado) => {
    try {
      await Axios.put(`${API}/api/cita/estado/${id}`, { estado })
      cargarCitas()
    } catch (error) {
      console.log(error)
    }
  }

  const eliminarCita = async (id) => {

  const confirmar = window.confirm("¿Eliminar esta cita?")

  if (!confirmar) return

  try {

    await Axios.delete(`http://localhost:4000/api/cita/eliminar/${id}`)

    cargarCitas()

  } catch (error) {

    console.log(error)

  }

}
const editarCita = (cita) => {
  setEditando(cita._id)
  setNuevaFecha(cita.fecha)
  setNuevaHora(cita.hora)
}
const guardarCambios = async (id) => {

  try {

    await Axios.put(
      `http://localhost:4000/api/cita/editar/${id}`,
      {
        fecha: nuevaFecha,
        hora: nuevaHora
      }
    )

    setEditando(null)

    cargarCitas()

  } catch (error) {

    console.log(error)

  }

}

  if (cargando) return <p className="text-center mt-10 text-gray-400">Cargando citas...</p>

  return (
    <div className="max-w-2xl mx-auto py-4 space-y-4">

      <h2 className="text-2xl font-bold text-gray-800">Mis Citas</h2>

      {citas.length === 0 ? (
        <p className="text-center text-gray-400 mt-10">No tienes citas aún</p>
      ) : (
        citas.map((cita) => (
          <div key={cita._id} className="bg-white rounded-2xl p-5 shadow-sm space-y-3">

            {/* Info de la cita */}
            <div className="flex justify-between items-center">
              <div>
                <p className="font-bold text-gray-800">{cita.cliente}</p>
                <p className="text-sm text-gray-500">{cita.fecha} — {cita.hora}</p>
                {editando === cita._id && (

  <div className="space-y-2 mt-3">

    <input
      type="date"
      value={nuevaFecha}
      onChange={(e) => setNuevaFecha(e.target.value)}
      className="w-full border rounded-xl px-3 py-2 text-sm"
    />

    <input
      type="time"
      value={nuevaHora}
      onChange={(e) => setNuevaHora(e.target.value)}
      className="w-full border rounded-xl px-3 py-2 text-sm"
    />

    <button
      onClick={() => guardarCambios(cita._id)}
      className="w-full bg-black text-white py-2 rounded-xl text-sm font-bold"
    >
      Guardar cambios
    </button>

  </div>

)}
              </div>
                <div className="flex items-center gap-1">
              <span className={`text-xs font-bold px-3 py-1 rounded-full ${COLORES[cita.estado]}`}>
                {cita.estado}
              </span>
              {(cita.estado === "completada" || cita.estado === "rechazada") && (

  <div className="flex items-center gap-2">

    <button
      onClick={() => editarCita(cita)}
      className="text-blue-500 hover:text-blue-700 transition"
    >
      <Pencil size={18} />
    </button>

    <button
      onClick={() => eliminarCita(cita._id)}
      className="text-red-500 hover:text-red-700 transition"
    >
      <Trash2 size={18} />
    </button>

  </div>

)}
  </div>
</div>
        {/* Botones según estado */}
        
      {cita.estado === "pendiente" && (
      
    <div className="flex gap-2">
   
     <button
   onClick={() => cambiarEstado(cita._id, "aceptada")}
   className="flex-1 bg-green-500 text-white py-2 rounded-xl text-sm font-bold hover:bg-green-600 transition">
                    Aceptar
                </button>
                <button
                  onClick={() => cambiarEstado(cita._id, "rechazada")}
                  className="flex-1 bg-red-500 text-white py-2 rounded-xl text-sm font-bold hover:bg-red-600 transition">
                  Rechazar
                </button>
              </div> 
      )}
        {cita.estado === "aceptada" && (
              <button
    onClick={() => cambiarEstado(cita._id, "completada")}
    className="w-full bg-blue-500 text-white py-2 rounded-xl text-sm font-bold hover:bg-blue-600 transition">
    Marcar como completada
  </button>
             
              
            )}
          </div>
        ))
      )}  

    </div>
  )
}