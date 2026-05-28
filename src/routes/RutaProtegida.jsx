import { Navigate } from "react-router-dom"

export function RutaProtegida({ rolRequerido, children }) {
  const token = localStorage.getItem("token")
  const rol = localStorage.getItem("rol")

  // Si no tiene token, manda al login
  if (!token) return <Navigate to="/" />

  // Si el rol no coincide, manda al home
  if (rolRequerido && rol !== rolRequerido) return <Navigate to="/home" />

  return children
}