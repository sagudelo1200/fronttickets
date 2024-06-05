
//Para poder iniciar sesión con token incluido
const logueese = () => {
    const user = document.getElementById("user");
    const password = document.getElementById("password");


    let option = {
        method:"POST",
        headers:{
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "user":user.value,
            "password":password.value
        })
    }
    let url = "https://backlogin-production.up.railway.app/api/login";

    fetch(url, option)
    .then(res => res.json())
    .then(data => {

        document.cookie= `token=${data.token}`;
        console.log(data.token);
        if(data.token !== undefined){
        window.location.href="/dash";
        }else{
            alertify.error('Clave errada');
        }

    })
    .catch(error => console.error(error.message));

}

//Diseño en movimiento de el login
const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});

