const mongoose = require("mongoose")

const HorarioSchema = mongoose.Schema({
    dia: { type:String,required:true},
    apertura:{type:String,required:true},
    cierre:{type:String,required:true}
},{timestamps:true})

module.exports = mongoose.model("horario",HorarioSchema)