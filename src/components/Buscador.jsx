import React from 'react'

export function Buscador() {
  return (
    <div className="flex flex-col items-center">
      <input
        className="block w-1/2 mt-6 p-3 rounded-full border border-gray-300 shadow-md placeholder:text-gray-400"
        placeholder="Buscar barbería o corte..."
        type="text"
        name="search"
      />
    </div>
  )
}
