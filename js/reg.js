const inputNombre = document.getElementById("inputNombre");
const inputEmail = document.getElementById("inputEmail");
const inputDireccion = document.getElementById("inputDireccion");
const inputCiudad = document.getElementById("inputCiudad");

const btnRegistro = document.getElementById("btnRegistro");

function recuperaData() {
    const dataReg = JSON.parse(localStorage.getItem("dataReg")) || {};
    // Acceder a los valores, por ejemplo:
    console.log("Nombre recuperado:", dataReg.nombre);
    console.log("Email recuperado:", dataReg.email);
    console.log("Dirección recuperada:", dataReg.direccion);
    console.log("Ciudad recuperada:", dataReg.ciudad);
}

function guardaData() {
    const dataRegistro = {
        nombre: inputNombre.value,
        email: inputEmail.value,
        direccion: inputDireccion.value,
        ciudad: inputCiudad.value,
    };
    localStorage.setItem("dataReg", JSON.stringify(dataRegistro));

    // Después de guardar los datos, también recupera y muestra los datos
    recuperaData();
}

btnRegistro.addEventListener("click", guardaData);
