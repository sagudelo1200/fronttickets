import jwt from 'jsonwebtoken';
import{config} from "dotenv";
import { localsName } from 'ejs';
config()

//Listar Login
export const listarLogin = (req, res)=>{

    const url = process.env.URL_BACK + "/usuario";

    fetch(url)
    .then(respuesta=>respuesta.json())
    .then(data=>{
        res.render("views.login.ejs",
        {
            "datos": "hola@gmail.com",
            "data":data
          
        });
    })
    .catch(error=>console.error(error))
}

//Registrar usuario
export const registrarUsuario = (req, res) => {
    res.render("login.html", 
    {
        "datos":"luisa", 
        "data": data
    });
}

//Verificar Token
export const validarToken = (token) => {
    let respuesta = "";
    const secret = process.env.JWT_SECRET;
    if (!token){
        return "";
    }
    // Verificar y decodificar token
    jwt.verify(token, secret, (error, decodedToken) => {
        if(error){
            //Error al verificar el token
            console.error('Error al verificar el token:', error);
            return ""
        } else {
            //token verificado correctamente, puedes acceder

            respuesta=decodedToken;
        }
    });
    return respuesta;
}

//Salir de la pagina
export const salirLogin = (req, res) => {
    res.redirect("/login.html");
}

//Ir al inicio de la pagina
export const inicio = (req, res) => {
    res.render("views.inicio.ejs", {"datos":"Luisa"});
}



