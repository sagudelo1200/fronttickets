//Import para importar funciones o valores exportados desde otro modulo para utilizarlos en el archivo actual
import { Router } from "express";
import { mostrarDash } from "../controllers/controllers.dash.js";

const rutaDash = Router();

//Rutas de el dash
rutaDash.get("/dash", mostrarDash);

export default rutaDash;