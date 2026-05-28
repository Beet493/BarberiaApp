import { useState, useEffect } from "react"
import Axios from "axios"

const SERVICIOS = ["Corte clásico", "Corte fade", "Barba", "Corte + Barba", "Tinte"]

export function Citas() {
  const clienteNombre = localStorage.getItem("nombre")
  const [barberos, setBarberos] = useState([])
  const [barberoSeleccionado, setBarberoSeleccionado] = useState(null)
  const [horasDisponibles, setHorasDisponibles] = useState([])
  const [fecha, setFecha] = useState("")
  const [hora, setHora] = useState("")
  const [servicio, setServicio] = useState("")
  const [enviado, setEnviado] = useState(false)
  const [error, setError] = useState("")

  // Cargar barberos
  useEffect(() => {
    const cargar = async () => {
      try {
        const res = await Axios.get("http://localhost:4000/api/barbero/todos")
        setBarberos(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    cargar()
  }, [])

  // Cuando cambia fecha o barbero, calcular horas disponibles
  useEffect(() => {
    if (!barberoSeleccionado || !fecha) return

    const dias = ["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"]
    const fechaLocal = new Date(fecha + "T12:00:00")
    const diaSemana = dias[fechaLocal.getDay()]

    const horario = barberoSeleccionado.horarios?.find(h => h.dia === diaSemana)

    if (!horario) {
      setHorasDisponibles([])
      setError("El barbero no trabaja ese día")
      return
    }

    setError("")
    const horas = []
    let actual = parseInt(horario.apertura)
    const fin = parseInt(horario.cierre)
    while (actual < fin) {
      horas.push(`${actual.toString().padStart(2, "0")}:00`)
      actual++
    }
    setHorasDisponibles(horas)
    setHora("")
  }, [barberoSeleccionado, fecha])

  const agendarCita = async (e) => {
    e.preventDefault()
    setError("")
    try {
      await Axios.post("http://localhost:4000/api/cita/crear", {
        cliente: clienteNombre,
        barbero: barberoSeleccionado.usuario.nombre,
        barberoId: barberoSeleccionado.usuario._id,
        fecha,
        hora,
        servicio
      })
      setEnviado(true)
      setBarberoSeleccionado(null)
      setFecha("")
      setHora("")
      setServicio("")
      setTimeout(() => setEnviado(false), 3000)
    } catch (error) {
      setError(error.response?.data?.message || "Error al agendar cita")
    }
  }

  return (
    <div className="max-w-md mx-auto py-4 space-y-4">

      <h2 className="text-2xl font-bold text-gray-800 text-center">Agendar Cita</h2>

      {enviado && <p className="text-green-500 font-bold text-center">✅ Cita agendada correctamente</p>}
      {error && <p className="text-red-500 text-sm text-center">{error}</p>}

      <form onSubmit={agendarCita} className="space-y-4">

        {/* Elegir barbero */}
        <div className="bg-white rounded-2xl p-5 shadow-sm space-y-3">
          <h3 className="font-bold text-gray-700 text-center">Elige tu Barbero/Barberia</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

  {barberos.map((b) => (

    <div
      key={b._id}
      onClick={() => {
        setBarberoSeleccionado(b)
        setFecha("")
        setHorasDisponibles([])
      }}
      className={`
        cursor-pointer rounded-2xl p-4 border transition-all duration-300 shadow-sm
        hover:scale-105 hover:shadow-lg
        ${barberoSeleccionado?._id === b._id
          ? "bg-black text-white border-black"
          : "bg-white border-gray-200 hover:border-black"}
      `}
    >

      {/* Imagen */}
      <div className="flex justify-center mb-3">

        <img
          src={b.foto || "https://img.freepik.com/fotos-premium/primer-plano-fotografia-hombre-elegante-posando-traje-tradicional_999340-16017.jpg"}
          alt="barbero"
          className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
        />

      </div>

      {/* Nombre */}
      <h2 className="text-center font-bold text-lg">
        {b.nombreTienda || b.usuario?.nombre}
      </h2>

      {/* Dueño */}
      {b.nombreTienda && (
        <p className="text-center text-sm opacity-80">
          {b.usuario?.nombre}
        </p>
      )}

      {/* Especialidad */}
      <p className="text-center text-xs mt-1 opacity-70">
        Fade • Barba • Estilo
      </p>

{/*Dias del barbero*/}
<p className="text-center text-xs mt-2 font-medium opacity-80">
  📅 {
    b.horarios?.map(h => h.dia.slice(0,3)).join(" • ")
  }
</p>

      {/* Precio */}
      {b.precio && (
        <p className="text-center mt-3 text-xl font-bold">
          ${b.precio}
        </p>
      )}
    </div>

  ))}

</div>
        </div>

        {/* Fecha */}
        {barberoSeleccionado && (
          <div className="bg-white rounded-2xl p-5 shadow-sm space-y-2">
            <h3 className="font-bold text-gray-700 text-center">Elige la fecha</h3>
            <input
              type="date"
              className="w-full border rounded-xl px-4 py-2 text-sm outline-none focus:border-blue-400"
              value={fecha}
              min={new Date().toISOString().split("T")[0]}
              onChange={(e) => setFecha(e.target.value)}
            />
          </div>
        )}

        {/* Horas disponibles */}
        {horasDisponibles.length > 0 && (
          <div className="bg-white rounded-2xl p-5 shadow-sm space-y-3">
            <h3 className="font-bold text-gray-700 text-center">Elige la hora</h3>
            <div className="grid grid-cols-4 gap-2">
              {horasDisponibles.map((h) => (
                <button
                  type="button"
                  key={h}
                  onClick={() => setHora(h)}
                  className={`py-2 rounded-xl text-sm font-bold transition
                    ${hora === h
                      ? "bg-black text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                >
                  {h}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Servicio */}
        {hora && (
          <div className="bg-white rounded-2xl p-5 shadow-sm space-y-3">
            <h3 className="font-bold text-gray-700 text-center">Elige el servicio</h3>
            <div className="grid grid-cols-2 gap-2">
              {SERVICIOS.map((s) => (
                <button
                  type="button"
                  key={s}
                  onClick={() => setServicio(s)}
                  className={`py-2 rounded-xl text-sm font-bold transition
                    ${servicio === s
                      ? "bg-black text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Botón agendar */}
        {servicio && (
          <button
            type="submit"
            className="w-full bg-black text-white py-4 rounded-2xl font-bold hover:bg-gray-800 transition"
          >
            Agendar Cita
          </button>
        )}

      </form>
    </div>
  )
}