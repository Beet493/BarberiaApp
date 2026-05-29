import { useState, useEffect } from "react"
import Axios from "axios"
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"
import API from "../api"

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
})

const DIAS = ["L", "M", "X", "J", "V", "S", "D"]
const DIAS_NOMBRES = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"]
const HORAS = Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, "0")}:00`)

function SelectorUbicacion({ setLat, setLng }) {
  useMapEvents({
    click(e) {
      setLat(e.latlng.lat)
      setLng(e.latlng.lng)
    }
  })
  return null
}
export function AdminPerfil() {
  const usuarioId = localStorage.getItem("id")

  const [ubicacion, setUbicacion] = useState("")
  const [precio, setPrecio] = useState("")
  const [telefono, setTelefono] = useState("")
  const [diasSeleccionados, setDiasSeleccionados] = useState([])
  const [apertura, setApertura] = useState("08:00")
  const [cierre, setCierre] = useState("18:00")
  const [guardado, setGuardado] = useState(false)
  const [error, setError] = useState("")

  const [lat, setLat] = useState(17.80615) // coordenadas de Balancán por default
  const [lng, setLng] = useState(-91.53751)

  // Cargar perfil existente
  useEffect(() => {
    const cargarPerfil = async () => {
      try {
        await Axios.get(`${API}/api/barbero/perfil/${usuarioId}`)
        if (res.data) {
          setUbicacion(res.data.ubicacion || "")
          setPrecio(res.data.precio || "")
          setTelefono(res.data.telefono || "")
          if (res.data.lat) setLat(res.data.lat)
          if (res.data.lng) setLng(res.data.lng)
          if (res.data.horarios?.length > 0) {
            const diasGuardados = res.data.horarios.map(h =>
              DIAS[DIAS_NOMBRES.indexOf(h.dia)]
            )
            setDiasSeleccionados(diasGuardados)
            setApertura(res.data.horarios[0].apertura)
            setCierre(res.data.horarios[0].cierre)
          }
        }
      } catch (error) {
        console.log(error)
      }
    }
    cargarPerfil()
  }, [])

  const toggleDia = (dia) => {
    setDiasSeleccionados(prev =>
      prev.includes(dia) ? prev.filter(d => d !== dia) : [...prev, dia]
    )
  }

  const guardar = async () => {
    try {
      const horarios = diasSeleccionados.map(diaCorto => ({
        dia: DIAS_NOMBRES[DIAS.indexOf(diaCorto)],
        apertura,
        cierre
      }))

      await Axios.post(`${API}/api/barbero/perfil`, {
        usuarioId,
        ubicacion,
        lat, 
        lng, 
        precio,
        telefono,
        horarios
      })
      
      setGuardado(true)
      setError("")
      setTimeout(() => setGuardado(false), 3000)
    } catch (error) {
      setError("Error al guardar, intenta de nuevo")
    }
  }

  return (
    <div className="max-w-md mx-auto space-y-6 py-4 bg-white">

      <h2 className="text-2xl font-bold text-gray-800">Mi Perfil</h2>

      {/* Info básica */}
      <div className="bg-white rounded-2xl p-5 shadow-sm space-y-4">
        <h3 className="font-bold text-gray-700">Información básica</h3>
        
        <div>
          <p className="text-sm text-gray-500 mb-1">Ubicación — haz click en el mapa</p>
          <div className="rounded-xl overflow-hidden border" style={{ height: "250px", zIndex: 0, position:"relative" }}>
            <MapContainer key="Mapa-Barbero" center={[lat, lng]} zoom={14} style={{ height: "100%", width: "100%" }}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker position={[lat, lng]} />
              <SelectorUbicacion setLat={setLat} setLng={setLng} />
            </MapContainer>
          </div>
          <p className="text-xs text-gray-400 mt-1">Lat: {lat.toFixed(5)} | Lng: {lng.toFixed(5)}</p>
          <div>
  <p className="text-sm text-gray-500 mb-1">
    Dirección
  </p>

  <input
    type="text"
    placeholder="Ej: Balancán Centro, Tabasco"
    className="w-full border rounded-xl px-4 py-2 text-sm outline-none focus:border-blue-400"
    value={ubicacion}
    onChange={(e) => setUbicacion(e.target.value)}
  />
</div>
        </div>

        <div>
          <p className="text-sm text-gray-500 mb-1">Precio</p>
          <input
            type="text"
            placeholder="Ej: $80 - $150"
            className="w-full border rounded-xl px-4 py-2 text-sm outline-none focus:border-blue-400"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
          />
        </div>

        <div>
          <p className="text-sm text-gray-500 mb-1">Teléfono</p>
          <input
            type="text"
            placeholder="Ej: 5212345678"
            className="w-full border rounded-xl px-4 py-2 text-sm outline-none focus:border-blue-400"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
          />
        </div>
      </div>

      {/* Horario */}
      <div className="bg-white rounded-2xl p-5 shadow-sm space-y-4">
        <h3 className="font-bold text-gray-700">Horario de atención</h3>

        <div>
          <p className="text-sm text-gray-500 mb-3">Días</p>
          <div className="flex gap-2">
            {DIAS.map((dia) => (
              <button
                key={dia}
                onClick={() => toggleDia(dia)}
                className={`w-10 h-10 rounded-full font-bold text-sm transition
                  ${diasSeleccionados.includes(dia)
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                  }`}
              >
                {dia}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <p className="text-sm text-gray-500 mb-1">Apertura</p>
            <select
              value={apertura}
              onChange={(e) => setApertura(e.target.value)}
              className="w-full border rounded-xl px-3 py-2 text-sm outline-none focus:border-blue-400"
            >
              {HORAS.map(h => <option key={h} value={h}>{h}</option>)}
            </select>
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-500 mb-1">Cierre</p>
            <select
              value={cierre}
              onChange={(e) => setCierre(e.target.value)}
              className="w-full border rounded-xl px-3 py-2 text-sm outline-none focus:border-blue-400"
            >
              {HORAS.map(h => <option key={h} value={h}>{h}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Mensajes */}
      {guardado && <p className="text-green-500 text-sm text-center font-bold">✅ Perfil guardado correctamente</p>}
      {error && <p className="text-red-500 text-sm text-center">{error}</p>}

      {/* Botón guardar */}
      <button
        onClick={guardar}
        className="w-full bg-black text-white py-4 rounded-2xl font-bold hover:bg-gray-800 transition"
      >
        Guardar perfil
      </button>

    </div>
  )
}