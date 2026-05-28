const express = require("express")
const router = express.Router()
const BarberoController = require("../controllers/barbero.controller")
const { upload } = require("../cloudinary")

router.post("/barbero/perfil", BarberoController.guardarPerfil)
router.post("/barbero/foto", upload.single("foto"), BarberoController.subirFoto)
router.get("/barbero/perfil/:id", BarberoController.obtenerPerfil)
router.get("/barbero/todos", BarberoController.obtenerTodos)

module.exports = router