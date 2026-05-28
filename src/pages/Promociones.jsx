import React, { useEffect, useState } from "react"
import Axios from "axios"

const promociones = [
  {
    titulo: "Corte + Barba",
    descripcion: "Llévate corte y barba a precio especial",
    precio: "$180"
  },
  {
    titulo: "Fade Premium",
    descripcion: "Incluye diseño y lavado",
    precio: "$200"
  }
]

export function Promociones() {

  const [barberos, setBarberos] = useState([])
  const [promoSeleccionada, setPromoSeleccionada] = useState(null)

  const cliente = localStorage.getItem("nombre")

  // Cargar barberos
  useEffect(() => {

    const cargarBarberos = async () => {

      try {

        const res = await Axios.get("http://localhost:4000/api/barbero/todos")

        setBarberos(res.data)

      } catch (error) {

        console.log(error)

      }

    }

    cargarBarberos()

  }, [])

  // Crear cita automática
  const agendarPromo = async (barbero) => {
const hoy = new Date()

const dias = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado"
]

const diaSemana = dias[hoy.getDay()]

// buscar horario del barbero
const horario = barbero.horarios.find(
  h => h.dia === diaSemana
)

if (!horario) {
  return alert("El barbero no trabaja hoy")
}
    try {

      await Axios.post("http://localhost:4000/api/cita/crear", {

        cliente,

        barbero: barbero.usuario.nombre,

        barberoId: barbero.usuario._id,

        fecha: new Date().toISOString().split("T")[0],

        hora: horario.apertura,
    
        servicio: promoSeleccionada.titulo

      })

      alert("Promoción agendada")

      setPromoSeleccionada(null)

    } catch (error) {

      console.log(error)

    }

  }

  return (

    <div className="max-w-5xl mx-auto py-6 px-4">

      <h1 className="text-3xl font-bold text-center mb-8">
        Promociones 
      </h1>

      {/* Cards promociones */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {promociones.map((promo, index) => (

          <div
            key={index}
            className="bg-white rounded-2xl shadow-md p-5 space-y-4"
          >

            <h2 className="text-2xl font-bold">
              {promo.titulo}
            </h2>

            <p className="text-gray-500">
              {promo.descripcion}
            </p>

            <div className="flex justify-between items-center">

              <span className="text-xl font-bold text-green-600">
                {promo.precio}
              </span>

              <button
                onClick={() => setPromoSeleccionada(promo)}
                className="bg-black text-white px-4 py-2 rounded-xl hover:bg-gray-800 transition"
              >
                Agendar
              </button>

            </div>

          </div>

        ))}

      </div>

      {/* Modal seleccionar barbero */}
      {promoSeleccionada && (

        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

          <div className="bg-white rounded-2xl p-6 w-[350px] space-y-4">

            <h2 className="text-xl font-bold text-center">
              Elige un barbero 💈
            </h2>

            <div className="space-y-3">

              {barberos.map((b) => (

                <button
                  key={b._id}
                  onClick={() => agendarPromo(b)}
                  className="w-full border rounded-xl p-3 hover:bg-gray-100 transition text-left"
                >

                  <p className="font-bold">
                    {b.nombreTienda || b.usuario?.nombre}
                  </p>

                  {b.precio && (
                    <p className="text-sm text-gray-500">
                      {b.precio}
                    </p>
                  )}

                </button>

              ))}

            </div>

            <button
              onClick={() => setPromoSeleccionada(null)}
              className="w-full bg-red-500 text-white py-2 rounded-xl hover:bg-red-600 transition"
            >
              Cancelar
            </button>

          </div>

        </div>

      )}

    </div>

  )

}