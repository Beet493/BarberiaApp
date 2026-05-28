const Persona = require("../models/persona.model");

class PersonaController {
  static createPersona = async (req, res) => {
    try {
      const datos = req.body;
      const newperson = await Persona.create(datos);
      res.status(200).json(newperson);
    } catch (error) {
      return console.log(error.error);
    }
  };

  static obtenerDatos=async(req,res)=>{
try {
    const buscarPersonas= await Persona.find();
    res.status(200).json(buscarPersonas);
} catch (error) {
    return console.log(error.error);
}
  }
}

module.exports = PersonaController;
