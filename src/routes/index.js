import { Router } from "express";
import rutaLogin from "./routes.login.js";
import rutaDash from "./routes.dash.js";
import rutaTicket from "./routes.tickets.js";

const ruta = Router();

//Traer rutas
ruta.use("/", rutaLogin);
ruta.use("/", rutaDash);
ruta.use("/", rutaTicket);

export default ruta;