// const Cita = require("../models/citas.model")

// class CitaController{
//     static crearCita =async (req,res)=>{
//         try {
//             const datos =req.body
//             const newcita = await Cita.create(datos)
//             res.status(200).json(newcita)
//         } catch (error){
//             return console.log(error.error)
//         }
//     }
//         static obtenerCita=async(req,res)=>{
//             try{
//                 const citas=await Cita.find()
//                 res.status(200).json(citas )
//             }catch (error){
//                 return console.log(error.error)
//             }
//         }
// }
//     module.exports = CitaController
const Cita = require("../models/cita.model");
const Barbero = require("../models/barbero.model"); 

class CitaController {
  static crearCita = async (req, res) => {
    try {
      const { fecha, hora, barberoId } = req.body; 

      const dias = ["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"];
      const fechaLocal = new Date(fecha + "T12:00:00");
      const diaSemana = dias[fechaLocal.getDay()];

      
      const barbero = await Barbero.findOne({ usuario: barberoId });
      if (!barbero) {
        return res.status(400).json({ message: "Barbero no encontrado" });
      }
      const horario = barbero.horarios.find(h => h.dia === diaSemana);
      if (!horario) {
        return res.status(400).json({ message: "El barbero no trabaja ese día" });
      }
      if (hora < horario.apertura || hora > horario.cierre) {
        return res.status(400).json({ message: "Fuera de horario" });
      }

      const nuevaCita = await Cita.create(req.body);
      res.status(200).json(nuevaCita);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  static obtenerCitas = async (req, res) => {
    try {
      const citas = await Cita.find();
      res.status(200).json(citas);
    } catch (error) {
      return console.log(error.error)
    }
  };


  static obtenerCitasPorBarbero = async (req, res) => {
    try {
      const citas = await Cita.find({ barberoId: req.params.barberoId })
      res.status(200).json(citas)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  };

  static cambiarEstado = async (req, res) => {
    try {
      const { id } = req.params
      const { estado } = req.body
      const cita = await Cita.findByIdAndUpdate(id, { estado }, { new: true })
      res.status(200).json(cita)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  };
static eliminarCita = async (req, res) => {

  try {
    await Cita.findByIdAndDelete(req.params.id)
    res.status(200).json({
      message: "Cita eliminada"
    })
  } catch (error) {
    res.status(500).json({
      error: error.message
    })
  }
};

static editarCita = async (req, res) => {

  try {

    const cita = await Cita.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )

    res.status(200).json(cita)

  } catch (error) {

    res.status(500).json({ error: error.message })

  }

}
  
}

module.exports = CitaController;