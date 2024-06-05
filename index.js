import app from "./src/server.js";

//llama a app y da el mensaje de en que puerto estoy
app.listen(app.get("port"),()=>{
    console.log(`Conectado al puerto ${app.get('port')}`);
})