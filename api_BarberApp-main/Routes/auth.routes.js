const express = require("express")
const router = express.Router()
const AuthController = require("../controllers/auth.controller")

router.post("/registro", AuthController.registro)
router.post("/login", AuthController.login)
router.put("/usuario/nombre", async (req, res) => {
  try {
    const Usuario = require("../models/usuario.model")
    const { usuarioId, nombre } = req.body
    const usuario = await Usuario.findByIdAndUpdate(usuarioId, { nombre }, { new: true })
    res.status(200).json({ nombre: usuario.nombre })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

module.exports = router