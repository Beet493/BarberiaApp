const Horario = require("../models/horario.model");

class HorarioController {

  // Crear cita
  static crearHorario = async (req, res) => {
    try {
      const datos = req.body;
      const newHorario = await Horario.create(datos);
      res.status(200).json(newHorario);
    } catch (error) {
      return console.log(error.error)
    }
  };

  // Obtener citas
  static obtenerHorarios = async (req, res) => {
    try {
      const horarios = await Horario.find();
      res.status(200).json(horarios);
    } catch (error) {
        return console.log(error.error)
    }
  };

}

module.exports = HorarioController