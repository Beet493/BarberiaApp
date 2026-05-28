import { createContext, useState } from "react"

export const FavoritosContext = createContext()

export function FavoritosProvider({ children }) {

  const [favoritos, setFavoritos] = useState([])

  const toggleFavorito = (barbero) => {
    const existe = favoritos.find(b => b.nombre === barbero.nombre)

    if (existe) {
      setFavoritos(favoritos.filter(b => b.nombre !== barbero.nombre))
    } else {
      setFavoritos([...favoritos, barbero])
    }
  }

  return (
    <FavoritosContext.Provider value={{ favoritos, toggleFavorito }}>
      {children}
    </FavoritosContext.Provider>
  )
}

/*
El Context es para que se globalize el codigo y se pueda usar en todo

Esto lo tengo en barberos.jsx en pages, esto lo usaba para que se guarde elfavoritos lo usaba con el usestate 

import { useState } from "react"
export function Barberos(){

  const [favoritos, setFavoritos] = useState([])

  const toggleFavorito = (barbero) => {
    const existe = favoritos.find(b => b.nombre === barbero.nombre)

    if (existe) {
      setFavoritos(favoritos.filter(b => b.nombre !== barbero.nombre))
    } else {
      setFavoritos([...favoritos, barbero])
    }
  }
*/