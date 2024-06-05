import{config} from "dotenv";
config()

//Ir a crear ticket ticket
export const crearTicket = (req, res) => {
    res.render("views.crearticket.ejs", {"datos":"Gabriel"});
}

//Ir a crear encuesta
export const crearEncuesta = (req, res) => {
    res.render("views.crearencuesta.ejs", {"datos":"Gabriel"});
}

//Ir a la lista de tickets
export const listarTicket = async(req, res) => {
   
    const url = process.env.URL_BACKEND + "/tickets";

    

    const blob = new Blob([string], {
        type: 'image/jpeg' // or whatever your Content-Type is
      });
    const string = await blob.text();

    fetch(url)
    .then(respuesta=>respuesta.json())
    .then(data=>{
        const type = blob.type;
        const blob2 = new Blob([string], {type: type});
        
        res.render("views.listatickets.ejs",
        {
            "datos": "ho@gmail.com",
            "data":data
        });
    })
    .catch(error=>console.error(error))
}

//Ir a atencion ticket
export const atencionTicket = (req, res) => {
    res.render("views.atencionticket.ejs", {"datos":"luisa"});
}

//ir a problemas frecuentes
export const problemasFrecuentes = (req, res) => {
    res.render("views.problemas.ejs", {"datos":"luisa"});
}

//ir a inicio
export const inicio = (req, res) => {
    res.render("views.inicio.ejs", {"datos":"luisa"});
}

//ir a informes
export const informes = (req, res) => {
    res.render("views.informes.ejs", {"datos":"luisa"});
}

//ir a caracteristicas
export const caracteristicas = (req, res) => {
    res.render("views.caracteristicas.ejs", {"datos":"luisa"});
}

//ir a solucion
export const solucion = (req, res) => {
    const url = process.env.URL_BACKEND + "/solucion";

    fetch(url)
    .then(respuesta=>respuesta.json())
    .then(data=>{
        res.render("views.solucion.ejs",
        {
            "datos": "ho@gmail.com",
            "data":data
          
        });
    })
    .catch(error=>console.error(error))
}

//Ir al chat
export const chat = (req, res) => {
    //El res.render para generar una vista o plantillas
    res.render("views.chat.ejs", {"datos":"luisa"});
}