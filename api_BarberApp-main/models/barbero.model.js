const mongoose = require("mongoose")

const BarberoSchema = mongoose.Schema({
  usuario:      { type: mongoose.Schema.Types.ObjectId, ref: "usuario", required: true },
  nombreTienda: { type: String, default: "" },
  foto:         { type: String, default: "" },
  whatsapp:     { type: String, default: "" },
  ubicacion:    { type: String, default: "" },
  lat:          { type: Number, default: null }, 
  lng:          { type: Number, default: null }, 
  precio:       { type: String, default: "" },
  telefono:     { type: String, default: "" },
  horarios: [
    {
      dia:      { type: String },
      apertura: { type: String },
      cierre:   { type: String }
    }
  ]
}, { timestamps: true })

module.exports = mongoose.model("barbero", BarberoSchema)