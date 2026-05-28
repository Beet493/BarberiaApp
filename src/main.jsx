import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom" // se utiliza para que se modifique automaticamente
import App from "./App"
import "./index.css"
import { FavoritosProvider } from './context/FavoritosContext'
ReactDOM.createRoot(document.getElementById("root")).render(
 
    <BrowserRouter>
     <FavoritosProvider>
      <App />
      </FavoritosProvider>
    </BrowserRouter>

)