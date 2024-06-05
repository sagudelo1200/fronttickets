
//Conectado con borrar usuario Para eliminar usuario
// Const para declarar variables
const eliminaRegistro = async(event) => {

    // El try-catch para manejar errores que puedan ocurrir durante la ejecucion
    try{
        const result = await Swal.fire({
            title: "Estas seguro?",
            text: "No podras revertirlo!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, borralo!"
        });

            if (result.isConfirmed) {
                if(borrar(event)){
            await Swal.fire({
                title: "Borrado!",
                text: "Tu archivo ha sido borrado.",
                icon: "success"
            });
            window.location.href="/usuario";
            } else {
                console.log("no lo mostro verdadero");
            }
            }
    } catch (error){
        console.error("Error al eliminar el registro:", error);
    }
};

//Para salir de sesion
const salirLogin = () => {
    document.cookie = "token=";
    window.location.href = "/salir"
}

//Para registrarse
const registrarUsuario = (req, res) => {
    
    const usuario = document.getElementById('usuario').value;
    const nombre = document.getElementById('nombre').value;
    const contrasena = document.getElementById('contrasena').value;
  
    const url = "https://backlogin-production.up.railway.app/usuario";

    
    const headers = {
        'Content-Type': 'application/json'
    }

    const options = {
        method: "POST",
        body: JSON.stringify({
            "iduser": null,
            "user": usuario,
            "name": nombre,
            "password": contrasena
        }),
        headers
    }
    // El Fetch realiza solicitudes http para obtener o enviar datos
    fetch(url, options)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            alert('Registro guardado' + data)
        })
        .catch(error => {
            alert("Error al guardar el registro", error)
        })
}

//PARA CONVERTIR ARCHIVO YA SUBIDO
const blobToBase64 = (blob) => {
    return new Promise( (resolve, reject) =>{
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
            resolve(reader.result.split(',')[1]);
            // "data:image/jpg;base64,    =sdCXDSAsadsadsa"
        };
    });
};

//PARA CONVERTIR ARCHIVO DESPUES DE HABER SIDO ENVIADO
const b64ToBlob = async(b64, type)=>{
    const blob = await fetch(`data:${type};base64,${b64}`);
    return blob;
};

//Enviar ticket
const crearTicket = async(req, res) => {
    //El Document.getElemtbyid para acceder a un elemento mediante su atributo id en HTML
    const fecha = document.getElementById('fecha').value;
    const nombre_usuario = document.getElementById('nombre_usuario').value;
    const email_cliente = document.getElementById('email_cliente').value;
    const prioridad = document.getElementById('prioridad').value;
    const mensaje = document.getElementById('mensaje').value;
    // const archivo = document.getElementById('archivo');
   


    const url = "https://backtickets-production.up.railway.app/api/tickets";

    const headers = {
     'Content-Type': 'application/json'
     }
     const myBlob = archivo.files[0];
     const carturado = await blobToBase64(myBlob); 
     archivo = (await b64ToBlob(carturado ,"png"));

     const options = {
        method: "POST",
        body: JSON.stringify({
            "id": null,
            fecha,
            nombre_usuario,
            email_cliente,
            prioridad,
            mensaje,
            archivo
            
       }),
       headers
    }
  

    fetch(url, options)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            alert('Ticket enviado' + data)
        })
        .catch(error => {
            alert("Error al enviar el ticket", error)
        })
}

//Al darle al boton modifica cargar los datos para modificar
const cargarUsuario = (event) =>{
   
    document.getElementById('iduser').value = event.target.parentElement.parentElement.children[0].innerHTML;
    document.getElementById('user').value = event.target.parentElement.parentElement.children[1].innerHTML;
    document.getElementById('name').value = event.target.parentElement.parentElement.children[2].innerHTML;
    document.getElementById('password').value = event.target.parentElement.parentElement.children[3].innerHTML;
  
}

//Modificar usuario
const modificarUsuario = () => {
   
    const iduser = document.getElementById('iduser').value;
    const user = document.getElementById('user').value;
    const name = document.getElementById('name').value;
    const password = document.getElementById('password').value;
  
    const url = "https://backlogin-production.up.railway.app/api/usuario";

    let token = "";
    const cookieToken = document.cookie;
    console.log("error");
    if (cookieToken) {
        const cookies = cookieToken.split(';');
        cookies.forEach(cookie => {
            const [nombre, valor] = cookie.split('=');
            if (nombre.trim() === 'token') {//Reemplaza con el nombre de la cookie
                token = valor;
            }
        });
    } else {
        alert("Debe loguearse nuevamente");
        return
        
    }
    if (token == "") {
        alert("Debe loguearse nuevamente");
        return
    }
    
    const headers = {
        'x-access-token': token,
        'Content-Type': 'application/json'
    }

    const options = {
        method: "PUT",
        body: JSON.stringify({
            iduser,
            user,
            name,
            password
        }),
        headers
    }
    
    fetch(url, options)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            alert('Registro modificado' + data)
        })
        .catch(error => {
            alert("Error al modificar el registro", error)
        })
}

//Borrar usuario
const borrar = async(event) =>{
    //Async automaticamente devolvera una promesa, se pone antes de una funcion pata indicar que es asincrona
    let codigo = event.target.parentElement.parentElement.children[0].innerHTML;

    let token = "";
    const cookieToken = document.cookie;
    console.log("error");
    if (cookieToken) {
        const cookies = cookieToken.split(';');
        cookies.forEach(cookie => {
            const [nombre, valor] = cookie.split('=');
            if (nombre.trim() === 'token') {//Reemplaza con el nombre de la cookie
                token = valor;
            }
        });
    } else {
        alert("Debe loguearse nuevamente");
        return
        
    }
    if (token == "") {
        alert("Debe loguearse nuevamente");
        return
    }
    
    const headers = {
        'x-access-token': token,
        'Content-Type': 'application/json'
    }

    let retorno = false;

    const url = "https://backlogin-production.up.railway.app/api/usuario";
    const option = {
        method: "DELETE",
        body: JSON.stringify({ "iduser": codigo }),
        headers
    }
//Await pausa la funcion asincrona hasta que la promesa se resuelva
//permitiendo trabajar con el resultado de la promesa
    await fetch(url, option)
        .then(res => res.json())
        .then(data => {
            if(data.respuesta){
                retorno= true;
            }
        })
        .catch(error => alert(error))
    return retorno;
}

//Eviar encuesta
const crearEncuesta = (req, res) => {
    const satisfaccion = document.getElementById('satisfaccion').value;
    const ayudarecibida = document.getElementById('ayudarecibida').value;
    const soluciondelproblema = document.getElementById('soluciondelproblema').value;
  
   
    const url = "https://backtickets-production.up.railway.app/api/encuesta";


    const headers = {
     'Content-Type': 'application/json'
     }

     const options = {
        method: "POST",
        body: JSON.stringify({
            "id": null,
            satisfaccion,
            ayudarecibida,
            soluciondelproblema
            
       }),
       headers
    }
    
    fetch(url, options)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            alert('Encuesta enviada' + data)
        })
        .catch(error => {
            alert("Error al enviar encuesta", error)
        })
}

//Crear la solucion de tickets
const atencionTicket = (req, res) => {
    const serie = document.getElementById('serie').value;
    const estado_ticket = document.getElementById('estado_ticket').value;
    const solucion = document.getElementById('solucion').value;
  
    const url = "https://backtickets-production.up.railway.app/api/solucion";


    const headers = {
     'Content-Type': 'application/json'
     }

     const options = {
        method: "POST",
        body: JSON.stringify({
            serie,
            estado_ticket,
            solucion
       }),
       headers
    }
 
    fetch(url, options)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            alert('solucion enviada' + data)
        })
        .catch(error => {
            alert("Error al enviar la solucion", error)
        })
}

//Enviar comentarios
const caracteristicas = (req, res) => {
    const comentario = document.getElementById('comentario').value;
    const caracteristica = document.getElementById('caracteristica').value;
   
    const url = "https://backtickets-production.up.railway.app/api/caracteristicas";


    const headers = {
     'Content-Type': 'application/json'
     }

     const options = {
        method: "POST",
        body: JSON.stringify({
            comentario,
            caracteristica
       }),
       headers
    }
    
    fetch(url, options)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            alert('comentario enviado' + data)
        })
        .catch(error => {
            alert("Error al enviar comentario", error)
        })
}

//Al darle al boton modifica cargar datos a modificar
const cargarTicket = (event) =>{
   
    document.getElementById('serie').value = event.target.parentElement.parentElement.children[0].innerHTML;
    document.getElementById('estado_ticket').value = event.target.parentElement.parentElement.children[1].innerHTML;
    document.getElementById('solucion').value = event.target.parentElement.parentElement.children[2].innerHTML;
    document.getElementById('usuario').value = event.target.parentElement.parentElement.children[3].innerHTML;
  
}

//Modificar datos del ticket
const modificarTicket = () => {
   
    const serie = document.getElementById('serie').value;
    const estado_ticket = document.getElementById('estado_ticket').value;
    const solucion = document.getElementById('solucion').value;
    const usuario = document.getElementById('usuario').value;
  
    const url = "https://backtickets-production.up.railway.app/api/solucion";

    const headers = {
        'Content-Type': 'application/json'
    }

    const options = {
        method: "PUT",
        body: JSON.stringify({
            serie,
            estado_ticket,
            solucion,
            usuario
        }),
        headers
    }
 
    fetch(url, options)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            alert('Estado y solucion modificadas' + data)
        })
        .catch(error => {
            alert("Error al modificar el estado", error)
        })
}

//Funcionamiento del chat
document.addEventListener('DOMContentLoaded', () => {
    const chatWindow = document.getElementById('chat-window');
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');

    sendButton.addEventListener('click', sendMessage);
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    function sendMessage() {
        const userMessage = messageInput.value.trim();
        if (userMessage !== '') {
            appendMessage('Usuario', userMessage);
            messageInput.value = '';
            chatWindow.scrollTop = chatWindow.scrollHeight;
            botResponse(userMessage);
        }
    }

    function appendMessage(sender, message, isBot = false) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('chat-message');
        if (isBot) messageElement.classList.add('bot');
        messageElement.innerHTML = `<span class="username">${sender}:</span> ${message}`;
        chatWindow.appendChild(messageElement);
    }

    function botResponse(userMessage) {
        let response = 'Lo siento, no entiendo tu mensaje.';

        // Respuestas predefinidas
        const responses = {
            'hola': '¡Hola! ¿En qué puedo ayudarte?',
            'necesito ayuda con un problema': '¡Claro! Cuentame tu problema.',
            'tengo problemas para iniciar sesion': 'Asegúrate de que estás ingresando tu nombre de usuario y contraseña correctos. Verifica que la tecla de bloqueo de mayúsculas no esté activada',
            'muchas gracias': 'Espero que te haya servido la ayuda.'
        };

        userMessage = userMessage.toLowerCase();

        for (const key in responses) {
            if (userMessage.includes(key)) {
                response = responses[key];
                break;
            }
        }

        setTimeout(() => {
            appendMessage('Bot', response, true);
            chatWindow.scrollTop = chatWindow.scrollHeight;
        }, 1000);
    }
});

//Abrir ticket y que lleve a atencion de ticket
const abrir = () => {
    //Window.location,href para redirigir a otra pagina
    window.location.href = "/atencion"
}

//Crear reporte
const reporte = (event) => {
const iduser = event.target.parentElement.parentElement.children[0].innerHTML;
const user = event.target.parentElement.parentElement.children[1].innerHTML;
const name = event.target.parentElement.parentElement.children[2].innerHTML;

const url= `/reporte?
iduser=${iduser}&
user=${user}&
name=${name}`;

window.open(url);
}