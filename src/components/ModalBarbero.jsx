import { MapContainer, TileLayer, Marker } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"
import { X } from "lucide-react"

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
})

export function ModalBarbero({ barbero, onClose }) {
  console.log(barbero)
  if (!barbero) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">

        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b">
          <h2 className="text-xl font-bold">{barbero.nombreTienda || barbero.usuario?.nombre}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-black">
            <X size={22} />
          </button>
        </div>

        <div className="p-5 space-y-4">

          {/* Foto y nombre */}
          <div className="flex items-center gap-4">
            <img
              src={barbero.foto || "https://img.freepik.com/fotos-premium/primer-plano-fotografia-hombre-elegante-posando-traje-tradicional_999340-16017.jpg"}
              alt={barbero.nombreTienda}
              className="w-20 h-20 rounded-full object-cover border-4 border-gray-100"
            />
            <div>
              <p className="font-bold text-gray-800">{barbero.usuario?.nombre}</p>
              {barbero.precio && <p className="text-sm text-gray-500">💰 {barbero.precio}</p>}
              {barbero.telefono && <p className="text-sm text-gray-500">📞 {barbero.telefono}</p>}
            </div>
          </div>

          {/* Horario */}
          {barbero.horarios?.length > 0 && (
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="font-bold text-gray-700 mb-2">🕐 Horario</p>
              {barbero.horarios.map((h, i) => (
                <p key={i} className="text-sm text-gray-600">
                  {h.dia}: {h.apertura} - {h.cierre}
                </p>
              ))}
            </div>
          )}

          {/* Mapa */}
         {/* Ubicación */}
{barbero.ubicacion && (
  <div className="bg-gray-50 rounded-xl p-4">
    <p className="font-bold text-gray-700 mb-1">📍 Dirección</p>
    <p className="text-sm text-gray-600">{barbero.ubicacion}</p>
    <a
  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(barbero.ubicacion)}`}
  target="_blank"
  rel="noreferrer"
  className="block mt-3 text-center bg-blue-500 text-white py-2 rounded-xl text-sm font-bold hover:bg-blue-600 transition"
>
  🗺️ Ver ubicación
</a>
  </div>
)}

{/* Mapa */}
{barbero.lat && barbero.lng && (
  <div>
    <p className="font-bold text-gray-700 mb-2">🗺️ Ubicación en mapa</p>

    <div
      style={{ height: "200px", zIndex: 0, position: "relative" }}
      className="rounded-xl overflow-hidden border"
    >
      <MapContainer
        key={`mapa-${barbero._id}`}
        center={[barbero.lat, barbero.lng]}
        zoom={15}
        style={{ height: "100%", width: "100%" }}
        zoomControl={false}
        dragging={false}
        scrollWheelZoom={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={[barbero.lat, barbero.lng]} />
      </MapContainer>
    </div>

    <a
      href={`https://www.google.com/maps?q=${barbero.lat},${barbero.lng}`}
      target="_blank"
      rel="noreferrer"
      className="block w-full text-center bg-blue-500 text-white py-2 rounded-xl text-sm font-bold hover:bg-blue-600 transition mt-2"
    >
      🧭 Cómo llegar
    </a>
  </div>
)}

          {/* WhatsApp */}
          {barbero.whatsapp && (
            <a
              href={`https://wa.me/52${barbero.whatsapp}`}
              target="_blank"
              rel="noreferrer"
              className="block w-full text-center bg-green-500 text-white py-3 rounded-xl font-bold hover:bg-green-600 transition"
            >
              WhatsApp
            </a>
          )}

        </div>
      </div>
    </div>
  )
}