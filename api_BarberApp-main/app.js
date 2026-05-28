//Son las librerias para el servidor y validadcion
const express=require("express");
const cors=require("cors");
const bodyParser=require("body-parser");
//Importamos rutas

const CitaRouter = require("./routes/cita.routes")
const BarberoRouter = require("./routes/barbero.routes") // horario barbero

//Variable que obtiene los valores del express
const app=express();
const AuthRouter = require("./routes/auth.routes")

//configurar los http para validar a traves del cors
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}))
//usar el bodyparser para pasar el JSON
app.use(bodyParser.json())
//Aqui van las rutas

app.use("/api/",CitaRouter);
app.use("/api/", AuthRouter)
app.use("/api/", BarberoRouter)
module.exports=app;

