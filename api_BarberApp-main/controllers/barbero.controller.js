const Barbero = require("../models/barbero.model")
const { cloudinary } = require("../cloudinary")

class BarberoController {

  static guardarPerfil = async (req, res) => {
    try {
      const { usuarioId, ubicacion, precio, telefono, horarios, nombreTienda, whatsapp } = req.body

      const barbero = await Barbero.findOneAndUpdate(
        { usuario: usuarioId },
        { ubicacion, precio, telefono, horarios, nombreTienda, whatsapp },
        { new: true, upsert: true }
      )

      res.status(200).json(barbero)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  static subirFoto = async (req, res) => {
    try {
      const { usuarioId } = req.body
      const fotoUrl = req.file.path // Cloudinary nos da la URL aqui

      const barbero = await Barbero.findOneAndUpdate(
        { usuario: usuarioId },
        { foto: fotoUrl },
        { new: true, upsert: true }
      )

      res.status(200).json({ foto: fotoUrl, barbero })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  static obtenerPerfil = async (req, res) => {
    try {
      const barbero = await Barbero.findOne({ usuario: req.params.id })
      res.status(200).json(barbero)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  static obtenerTodos = async (req, res) => {
    try {
      const barberos = await Barbero.find().populate("usuario", "nombre")
      res.status(200).json(barberos)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }
}

module.exports = BarberoController