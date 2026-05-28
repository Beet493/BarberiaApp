import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Axios from "axios"

export function Login() {
  const [vista, setVista] = useState("login") // "login" | "elegir" | "registro"
  const [rol, setRol] = useState("")
  const [nombre, setNombre] = useState("")
  const [correo, setCorreo] = useState("")
  const [contrasena, setContrasena] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const manejarLogin = async (e) => {
    e.preventDefault()
    try {
      const res = await Axios.post("http://localhost:4000/api/login", { correo, contrasena })
      console.log(res.data)
      localStorage.setItem("token", res.data.token)
      localStorage.setItem("rol", res.data.rol)
      localStorage.setItem("nombre", res.data.nombre)
      localStorage.setItem("id", res.data.id)
      res.data.rol === "barbero" ? navigate("/admin/perfil") : navigate("/home")
    } catch {
      setError("Correo o contraseña incorrectos")
    }
  }

  const manejarRegistro = async (e) => {
    e.preventDefault()
    try {
      await Axios.post("http://localhost:4000/api/registro", { nombre, correo, contrasena, rol })
      setVista("login")
      setError("Cuenta creada, ya puedes iniciar sesión")
    } catch {
      setError("El correo ya está registrado")
    }
  }

  const elegirRol = (rolElegido) => {
    setRol(rolElegido)
    setVista("registro")
    setError("")
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#1a2550] px-8 text-white">

      <div className="text-5xl mb-2">✂️ 💈 ✂️</div>
      <h1 className="text-5xl font-black tracking-widest text-center leading-tight">BARBER</h1>
      <div className="flex items-center gap-3 mb-4">
        <span className="text-2xl">•</span>
        <h1 className="text-5xl font-black tracking-widest">SHOP</h1>
        <span className="text-2xl">•</span>
      </div>

      {/* VISTA LOGIN */}
      {vista === "login" && (
        <>
          <p className="font-bold text-sm mb-1">Iniciar Sesión</p>
          <p className="text-xs text-white/70 text-center mb-6">Introduce tu correo y contraseña</p>

          {error && <p className={`text-xs mb-4 ${error.includes("creada") ? "text-green-400" : "text-red-400"}`}>{error}</p>}

          <form onSubmit={manejarLogin} className="flex flex-col gap-3 w-full max-w-xs">
            <input type="email" placeholder="email@domain.com"
              className="bg-white/10 border border-white/25 rounded-xl px-4 py-3 text-sm placeholder:text-white/50 outline-none focus:border-blue-300"
              value={correo} onChange={(e) => setCorreo(e.target.value)} />
            <input type="password" placeholder="Contraseña"
              className="bg-white/10 border border-white/25 rounded-xl px-4 py-3 text-sm placeholder:text-white/50 outline-none focus:border-blue-300"
              value={contrasena} onChange={(e) => setContrasena(e.target.value)} />
            <button type="submit" className="bg-black text-white py-3 rounded-xl font-bold text-sm hover:bg-gray-800 transition mt-1">
              Continuar
            </button>
          </form>

          <button onClick={() => { setVista("elegir"); setError("") }}
            className="text-xs text-white/50 mt-4 underline hover:text-white">
            ¿No tienes cuenta? Crear una
          </button>
        </>
      )}

      {/* VISTA ELEGIR ROL */}
      {vista === "elegir" && (
        <>
          <p className="font-bold text-sm mb-1">¿Cómo quieres registrarte?</p>
          <p className="text-xs text-white/70 text-center mb-8">Elige una opción para continuar</p>

          <div className="flex gap-4 w-full max-w-xs">
            <button onClick={() => elegirRol("cliente")}
              className="flex-1 bg-white/10 border border-white/25 rounded-xl py-6 flex flex-col items-center gap-2 hover:bg-white/20 transition">
              <span className="text-3xl">👤</span>
              <span className="font-bold text-sm">Soy Cliente</span>
              <span className="text-xs text-white/50">Quiero reservar citas</span>
            </button>
            <button onClick={() => elegirRol("barbero")}
              className="flex-1 bg-white/10 border border-white/25 rounded-xl py-6 flex flex-col items-center gap-2 hover:bg-white/20 transition">
              <span className="text-3xl">✂️</span>
              <span className="font-bold text-sm">Soy Barbero</span>
              <span className="text-xs text-white/50">Quiero ofrecer servicios</span>
            </button>
          </div>

          <button onClick={() => setVista("login")}
            className="text-xs text-white/50 mt-6 underline hover:text-white">
            ← Volver al login
          </button>
        </>
      )}

      {/* VISTA REGISTRO */}
      {vista === "registro" && (
        <>
          <p className="font-bold text-sm mb-1">
            Crear cuenta como {rol === "barbero" ? "Barbero ✂️" : "Cliente 👤"}
          </p>
          <p className="text-xs text-white/70 text-center mb-6">Llena tus datos para registrarte</p>

          {error && <p className="text-red-400 text-xs mb-4">{error}</p>}

          <form onSubmit={manejarRegistro} className="flex flex-col gap-3 w-full max-w-xs">
            <input type="text" placeholder="Nombre completo"
              className="bg-white/10 border border-white/25 rounded-xl px-4 py-3 text-sm placeholder:text-white/50 outline-none focus:border-blue-300"
              value={nombre} onChange={(e) => setNombre(e.target.value)} />
            <input type="email" placeholder="email@domain.com"
              className="bg-white/10 border border-white/25 rounded-xl px-4 py-3 text-sm placeholder:text-white/50 outline-none focus:border-blue-300"
              value={correo} onChange={(e) => setCorreo(e.target.value)} />
            <input type="password" placeholder="Contraseña"
              className="bg-white/10 border border-white/25 rounded-xl px-4 py-3 text-sm placeholder:text-white/50 outline-none focus:border-blue-300"
              value={contrasena} onChange={(e) => setContrasena(e.target.value)} />
            <button type="submit" className="bg-black text-white py-3 rounded-xl font-bold text-sm hover:bg-gray-800 transition mt-1">
              Crear cuenta
            </button>
          </form>

          <button onClick={() => setVista("elegir")}
            className="text-xs text-white/50 mt-4 underline hover:text-white">
            ← Volver
          </button>
        </>
      )}

    </div>
  )
}