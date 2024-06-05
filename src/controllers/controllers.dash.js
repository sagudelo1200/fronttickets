import { config } from "dotenv";
import { validarToken } from "./controllers.login.js";
config()

//Mostrar dashboard
export const mostrarDash = (req, res)=>{

    let token = "";

    const cookieToken = req.headers.cookie;
    const url = process.env.URL_BACK;

    if (cookieToken) {
        const cookies = cookieToken.split(';');
        cookies.forEach(cookie => {
            const [nombre, valor] = cookie.split('=');
            if (nombre.trim() === 'token') {//Reemplaza con el nombre de la cookie
                token = valor;
            }
        });
    }
    let datos = validarToken(token);
    if (datos !==""){
        res.render("views.dash.ejs", {"datos":datos});
        return;
    }
    res.redirect("/login.html");
}