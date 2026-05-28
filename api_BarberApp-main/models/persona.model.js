const mongoose=require("mongoose");

const PersonaSchema=mongoose.Schema({
    nombre:{type:String, required:true, uppercase:true},
    telefono:{type:Number, required:true, trim:true, default:9342222},
    correo:String,
    nomuser:String
}, {timestamps:true})

module.exports=mongoose.model("persona",PersonaSchema);