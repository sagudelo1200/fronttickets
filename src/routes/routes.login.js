import { Router } from "express";
import { listarLogin, ingresarLogin, salirLogin, registrarUsuario, inicio } from "../controllers/controllers.login.js";
import {generar} from "../controllers/controller.informes.js";
const rutaLogin = Router();

//para ingresar a cada ruta del usuario
rutaLogin.get("/inicio", inicio);
rutaLogin.get("/login", ingresarLogin);
rutaLogin.get("/usuario", listarLogin);
rutaLogin.get("/registro", registrarUsuario);
rutaLogin.get("/salir", salirLogin);
rutaLogin.get("/reporte", generar);

export default rutaLogin;