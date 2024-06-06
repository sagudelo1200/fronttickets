import { create } from 'html-pdf';
import { exec } from 'child_process';

export const generar = async (req, res) => {


  //Los campos que enviaran desde su pagina
  const id = req.query.iduser;
  const user = req.query.user;
  const name = req.query.name;
  


  // HTML que quieres convertir a PDF
  const htmlContent = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Carta de Ascenso</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f4f4f4;
    }
    .container {
      max-width: 600px;
      margin: 20px auto;
      padding: 20px;
      background-color: #fff;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      position: relative;
      overflow: hidden;
    }
    .header-image {
      position: absolute;
      top: 0;
      right: 0;
      max-width: 150px;
      height: auto;
    }
    .header-bar {
      position: absolute;
      top: 0;
      left: 0;
      width: 10px;
      height: 100%;
      background-color: #4CAF50; /* Cambia este color si deseas otro */
    }
    .footer-bar {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 10px;
      height: 100%;
      background-color: #4CAF50; /* Cambia este color si deseas otro */
    }
    h2 {
      color: #333;
    }
    p {
      color: #555;
      line-height: 1.6;
    }
    .contact-info {
      margin-top: 20px;
    }
    .contact-info p {
      margin: 5px 0;
    }
    .contact-info p span {
      font-weight: bold;
    }
  </style>
  </head>
  <body>
 
  <div class="container">
    <div class="header-bar"></div>
    <div class="footer-bar"></div>
   
    <h2>Informe de Registro</h2>
    <p>Estimado/a ${name},</p>
    <p>Bienvenido! Nos complace informarte que te has registrado a nuestra pagina TickDesk. Aqui podras crear, actualizar y seguir el estado de tus tickets en tiempo real.</p>
    <p>Encuentra problemas frecuentes para ayudarte a resolver problemas comunes. </p>
    <p>Por favor, encuentra a continuación tus datos actualizados:</p>
    <div class="contact-info">
      <p><span>Usuario:</span> ${user}</p>
      <p><span>Nombre:</span> ${name}</p>
    </div>
    <p>Te felicitamos por unirte a nuestra comunidad y esperamos que disfrutes de todas las ventajas que ofrecemos. No dudes en explorar todas las funcionalidades y sacar elmaximo provecho de nuestra plataforma.</p>
    <p>Atentamente,</p>
    <p>Gabriel y Luisa<br>
    Administradores<br>
    TickDesk</p>
  </div>
 
  </body>
  </html>
 `;


  // Opciones para la generación del PDF
  const options = { format: 'Letter' }; // Formato de página


  // Convertir HTML a PDF
  const iduser = await create(htmlContent, options).toFile(`./documento${id}.pdf`, function (err, res) {
    if (err) {
      return console.log(err);
    }
    // Abrir el archivo PDF en una nueva ventana después de crearlo
    exec(`start /B ./documento${id}.pdf`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error al abrir el archivo: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`Error: ${stderr}`);
        return;
      }
      console.log(`Archivo PDF abierto correctamente.`);
    });
  });
}
