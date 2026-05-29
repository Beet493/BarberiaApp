import { useState, useEffect } from "react"
import Axios from "axios"
import API from "../../api"

export function AdminTienda() {
  const usuarioId = localStorage.getItem("id")
  const [nombreTienda, setNombreTienda] = useState("")
  const [whatsapp, setWhatsapp] = useState("")
  const [foto, setFoto] = useState(null)
  const [fotoPreview, setFotoPreview] = useState(null)
  const [fotoActual, setFotoActual] = useState("")
  const [guardado, setGuardado] = useState(false)
  const [error, setError] = useState("")
  const [cargando, setCargando] = useState(false)

  useEffect(() => {
    const cargar = async () => {
      try {
        const res = await Axios.get(`${API}/api/barbero/perfil/${usuarioId}`)
        if (res.data) {
          setNombreTienda(res.data.nombreTienda || "")
          setWhatsapp(res.data.whatsapp || "")
          setFotoActual(res.data.foto || "")
        }
      } catch (error) {
        console.log(error)
      }
    }
    cargar()
  }, [])

  const elegirFoto = (e) => {
    const archivo = e.target.files[0]
    if (archivo) {
      setFoto(archivo)
      setFotoPreview(URL.createObjectURL(archivo))
    }
  }

  const subirFoto = async () => {
    if (!foto) return
    setCargando(true)
    try {
      const formData = new FormData()
      formData.append("foto", foto)
      formData.append("usuarioId", usuarioId)

      const res = await Axios.post(`${API}/api/barbero/foto`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      })
      setFotoActual(res.data.foto)
      setFoto(null)
      setFotoPreview(null)
    } catch (error) {
      setError("Error al subir la foto")
    } finally {
      setCargando(false)
    }
  }

  const guardar = async () => {
    try {
      await Axios.post(`${API}/api/barbero/perfil`, {
        usuarioId,
        nombreTienda,
        whatsapp
      })
      setGuardado(true)
      setError("")
      setTimeout(() => setGuardado(false), 3000)
    } catch (error) {
      setError("Error al guardar")
    }
  }

  return (
    <div className="max-w-md mx-auto py-4 space-y-4">

      <h2 className="text-2xl font-bold text-gray-800">Mi Tienda</h2>

      {/* Foto */}
      <div className="bg-white rounded-2xl p-5 shadow-sm space-y-4">
        <h3 className="font-bold text-gray-700">Foto de perfil</h3>

        {/* Preview */}
        <div className="flex justify-center">
          <img
            src={fotoPreview || fotoActual || "https://via.placeholder.com/150?text=Sin+foto"}
            alt="foto barbero"
            className="w-32 h-32 rounded-full object-cover border-4 border-gray-200"
          />
        </div>

        {/* Input foto */}
        <input
          type="file"
          accept="image/*"
          onChange={elegirFoto}
          className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-black file:text-white file:cursor-pointer"
        />

        {fotoPreview && (
          <button
            onClick={subirFoto}
            disabled={cargando}
            className="w-full bg-blue-500 text-white py-2 rounded-xl text-sm font-bold hover:bg-blue-600 transition disabled:opacity-50"
          >
            {cargando ? "Subiendo..." : "Subir foto"}
          </button>
        )}
      </div>

      {/* Info tienda */}
      <div className="bg-white rounded-2xl p-5 shadow-sm space-y-4">
        <h3 className="font-bold text-gray-700">Información de tu tienda</h3>

        <div>
          <p className="text-sm text-gray-500 mb-1">Nombre de tu barbería</p>
          <input
            type="text"
            placeholder="Ej: Barber Shop Moy"
            className="w-full border rounded-xl px-4 py-2 text-sm outline-none focus:border-blue-400"
            value={nombreTienda}
            onChange={(e) => setNombreTienda(e.target.value)}
          />
        </div>

        <div>
          <p className="text-sm text-gray-500 mb-1">WhatsApp</p>
          <input
            type="text"
            placeholder="Ej: 5212345678"
            className="w-full border rounded-xl px-4 py-2 text-sm outline-none focus:border-blue-400"
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
          />
        </div>
      </div>

      {guardado && <p className="text-green-500 text-sm text-center font-bold">✅ Tienda guardada correctamente</p>}
      {error && <p className="text-red-500 text-sm text-center">{error}</p>}

      <button
        onClick={guardar}
        className="w-full bg-black text-white py-4 rounded-2xl font-bold hover:bg-gray-800 transition"
      >
        Guardar
      </button>

    </div>
  )
}