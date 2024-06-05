import { Router } from "express";
import { crearTicket, listarTicket, crearEncuesta, atencionTicket, problemasFrecuentes, 
    inicio, informes, caracteristicas, solucion,
 chat} from "../controllers/controllers.ticket.js";

const rutaTicket = Router();

//PARA PODER INGRESAR A CADA RUTA DE LOS TICKETS
rutaTicket.get("/tickets", crearTicket);
rutaTicket.get("/ticket", listarTicket);
rutaTicket.get("/encuesta", crearEncuesta);
rutaTicket.get("/atencion", atencionTicket);
rutaTicket.get("/problemas", problemasFrecuentes);
rutaTicket.get("/inicio", inicio);
rutaTicket.get("/informes", informes);
rutaTicket.get("/caracteristicas", caracteristicas);
rutaTicket.get("/solucion", solucion)
rutaTicket.get("/chat", chat);

//Export se usa para exportar funciones desde un modulo a otro
 export default rutaTicket;
