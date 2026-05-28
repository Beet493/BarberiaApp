import { Routes, Route, Navigate } from "react-router-dom"
import { Login, Home, Gestion, Citas, Barberos, Favoritos, Promociones, Admin, AdminPerfil, AdminCitas, AdminTienda } from "../pages"
import { AdminLayouts, AdminLayoutsBarbero } from "../Layouts"
import { RutaProtegida } from "./RutaProtegida"

export function Rutas() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      {/* Rutas cliente */}
      <Route element={<AdminLayouts />}>
        <Route path="/home" element={<Home />} />
        <Route path="/gestion" element={<Gestion />} />
        <Route path="/citas" element={<Citas />} />
        <Route path="/barberos" element={<Barberos />} />
        <Route path="/favoritos" element={<Favoritos />} />
        <Route path="/promociones" element={<Promociones />} />
      </Route>

      {/* Rutas barbero*/}
      <Route element={<AdminLayoutsBarbero />}>
        <Route path="/admin/perfil" element={
          <RutaProtegida rolRequerido="barbero"><AdminPerfil /></RutaProtegida>
        }/>
        <Route path="/admin/citas" element={
          <RutaProtegida rolRequerido="barbero"><AdminCitas /></RutaProtegida>
        }/>
        <Route path="/admin/tienda" element={
          <RutaProtegida rolRequerido="barbero"><AdminTienda /></RutaProtegida>
        }/>
      </Route>

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}