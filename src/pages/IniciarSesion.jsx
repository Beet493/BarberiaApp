import { useState } from "react" // permite guardar y actualizar datos dentro del componente.
import { useNavigate } from "react-router-dom" //Permite cambiar de ruta dentro de la aplicación

export function IniciarSesion() {

  const [correo, agregarCorreo] = useState("")
  const [contraseña, agregarContraseña] = useState("")
  const navegar = useNavigate()

  const manejarEnvio = (evento) => {
    evento.preventDefault() //para que no se recargue la pagina mientras se escribe

    if(correo && contraseña){ // si no esta vacio los dos entra a la app pelana
      navegar("/inicio")
    }
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">

      <div className="bg-white p-8 rounded-xl shadow-md w-80">

        <h2 className="text-2xl font-bold mb-6 text-center">
          Iniciar Sesión
        </h2>

        <form onSubmit={manejarEnvio} className="flex flex-col gap-4">

          <input
            type="email"
            placeholder="Correo"
            className="border p-2 rounded"
            value={correo}
            onChange={(e) => agregarCorreo(e.target.value)}
          />

          <input
            type="password"
            placeholder="Contraseña"
            className="border p-2 rounded"
            value={contraseña}
            onChange={(e) => agregarContraseña(e.target.value)}
          />

          <button
            type="submit"
            className="bg-pink-500 text-white  p-2 rounded hover:bg-gray-800 transition"
          >
            Entrar
          </button>

        </form>

      </div>
    </div>
  )
}
