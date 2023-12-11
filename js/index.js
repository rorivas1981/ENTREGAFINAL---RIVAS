const API_URL = "js/productos.json";
const carrito = JSON.parse(localStorage.getItem("miCarrito")) || [];
const productos = [];

const contenedor = document.getElementById("contenedorMercaderias");
const btnCarrito = document.getElementById("carrito-icon");
const inputBuscar = document.getElementById("inputBuscar");

function crearCardHTML({ id, imagen, nombre, precio }) {
    return `<div class="div-card">
                <div class="imagen"><img src="${imagen}" alt="${nombre}"></div>
                <div class="producto">${nombre}</div>
                <div class="importe">USD ${precio}</div>
                <button id="${id}" class="add-to-cart">Agregar al carrito</button>
            </div>`;
}

async function obtenerProductos() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        productos.push(...data);
        cargarProductos();
    } catch (error) {
        console.error(error);
        // Considera manejar el error de manera más específica aquí si es necesario
        // contenedor.innerHTML = crearCardError();
    }
}

function cargarProductos() {
    if (contenedor) {
        contenedor.innerHTML = "";
        if (productos.length > 0) {
            const fragmento = document.createDocumentFragment();
            productos.forEach(producto => {
                const cardHTML = crearCardHTML(producto);
                const div = document.createElement("div");
                div.innerHTML = cardHTML;
                fragmento.appendChild(div.firstChild);
            });
            contenedor.appendChild(fragmento);
            activarClickEnBotones();
        }
    }
}

function activarClickEnBotones() {
    const botonesAgregar = document.querySelectorAll("button.add-to-cart");
    botonesAgregar.forEach((boton) => {
        boton.addEventListener("click", (e) => {
            const id = parseInt(e.target.id);
            const productoSeleccionado = productos.find((producto) => producto.id === id);
            if (!carrito.some(item => item.id === id)) {
                carrito.push({ ...productoSeleccionado });
                localStorage.setItem("miCarrito", JSON.stringify(carrito));
                mostrarMensaje(`${productoSeleccionado.nombre} se agregó al carrito`, "success");
            } else {
                mostrarMensaje(`${productoSeleccionado.nombre} ya está en el carrito`, "warning");
            }
        });
    });
}

function mostrarMensaje(mensaje, tipo) {
    Swal.fire({
        text: mensaje,
        icon: tipo,
        toast: true,
        position: 'top-end',
        timer: 3000,
        showConfirmButton: false
    });
}

function cargarProductosFiltrados(textoBusqueda) {
    if (contenedor) {
        contenedor.innerHTML = "";
        const resultados = productos.filter((producto) => producto.nombre.toLowerCase().includes(textoBusqueda));
        if (resultados.length > 0) {
            const fragmento = document.createDocumentFragment();
            resultados.forEach(producto => {
                const cardHTML = crearCardHTML(producto);
                const div = document.createElement("div");
                div.innerHTML = cardHTML;
                fragmento.appendChild(div.firstChild);
            });
            contenedor.appendChild(fragmento);
            activarClickEnBotones();
        } else {
           
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    obtenerProductos();

    if (btnCarrito) {
        btnCarrito.addEventListener("mousemove", () => {
            btnCarrito.title = carrito.length > 0 ? `${carrito.length} productos en carrito`
                : "Carrito sin productos";
        });
    }

    if (inputBuscar) {
        inputBuscar.addEventListener("input", () => {
            let textoBusqueda = inputBuscar.value.trim().toLowerCase();
            cargarProductosFiltrados(textoBusqueda);
        });
    }

    if (btnCarrito) {
        btnCarrito.addEventListener("click", () => {
            if (carrito.length > 0) {
                location.href = "pago.html";
            }
        });
    }
});
