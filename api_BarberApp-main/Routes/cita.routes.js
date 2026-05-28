const express = require("express")
const router = express.Router()
const CitaController = require("../controllers/cita.controller")

router.post("/cita/crear", CitaController.crearCita)
router.get("/cita/buscar", CitaController.obtenerCitas)
router.get("/cita/barbero/:barberoId", CitaController.obtenerCitasPorBarbero)
router.put("/cita/estado/:id", CitaController.cambiarEstado)
router.delete("/cita/eliminar/:id", CitaController.eliminarCita)
router.put("/cita/editar/:id", CitaController.editarCita)
module.exports = router