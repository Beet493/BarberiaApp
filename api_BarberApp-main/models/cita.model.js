// const mongoose = require("mongoose")

// const CitaSchema = mongoose.Schema({
//     cliente:{type:String,require:true, uppercase:true},
//     barbero:{type:String,require:true},
//     fecha:{type:String,require:true},
//     hora:{type:String,require:true},
//     servicio:{type:String}
// },{timestamps:true})

// module.exports=mongoose.model("cita",CitaSchema)

const mongoose = require("mongoose");

const CitaSchema = mongoose.Schema({
  cliente:  { type: String, required: true },
  barbero:  { type: String, required: true },
  barberoId: { type: mongoose.Schema.Types.ObjectId, ref: "usuario" },
  fecha:    { type: String, required: true },
  hora:     { type: String, required: true },
  servicio: { type: String },
  estado:   { type: String, enum: ["pendiente", "aceptada", "rechazada", "completada"], default: "pendiente" }
}, { timestamps: true });

module.exports = mongoose.model("cita", CitaSchema);