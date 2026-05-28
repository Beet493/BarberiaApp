const Usuario = require("../models/usuario.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const SECRETO = "barberapp123" // esta es la llave para firmar el token

class AuthController {

  // REGISTRO
  static registro = async (req, res) => {
    try {
      const { nombre, correo, contrasena, rol } = req.body

      // Revisa si el correo ya existe
      const existe = await Usuario.findOne({ correo })
      if (existe) {
        return res.status(400).json({ message: "El correo ya está registrado" })
      }

      // Encripta la contraseña antes de guardarla
      const contrasenaEncriptada = await bcrypt.hash(contrasena, 10)

      const nuevoUsuario = await Usuario.create({
        nombre,
        correo,
        contrasena: contrasenaEncriptada,
        rol
      })

      res.status(201).json({ message: "Usuario creado", usuario: nuevoUsuario })

    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  // LOGIN
  static login = async (req, res) => {
    try {
      const { correo, contrasena } = req.body

      // Busca el usuario
      const usuario = await Usuario.findOne({ correo })
      if (!usuario) {
        return res.status(400).json({ message: "Correo o contraseña incorrectos" })
      }

      // Compara la contraseña
      const contrasenaCorrecta = await bcrypt.compare(contrasena, usuario.contrasena)
      if (!contrasenaCorrecta) {
        return res.status(400).json({ message: "Correo o contraseña incorrectos" })
      }

      // Genera el token con el rol adentro
      const token = jwt.sign(
        { id: usuario._id, rol: usuario.rol, nombre: usuario.nombre },
        SECRETO,
        { expiresIn: "8h" }
      )

     res.status(200).json({ token, rol: usuario.rol, nombre: usuario.nombre, id: usuario._id })

    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

}

module.exports = AuthController