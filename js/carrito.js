document.addEventListener("DOMContentLoaded", () => {
    const tablaDetalle = document.querySelector("table tbody");
    const totalCarrito = document.querySelector("td#totalCarrito");
    const btnComprar = document.querySelector("button#btnComprar");

    const carrito = JSON.parse(localStorage.getItem("miCarrito")) || [];

    function crearFilaHTML({ imagen, nombre, precio }) {
        return `<tr>
                    <td class="imagen-emoji"><img src="${imagen}" alt="${nombre}" style="width: 50px; height: 50px;"></td>
                    <td>${nombre}</td>
                    <td>$ ${precio.toFixed(2)}</td>
                </tr>`;
    }

    function cargarCarrito() {
        if (tablaDetalle) {
            tablaDetalle.innerHTML = "";
            const fragmento = document.createDocumentFragment();
            carrito.forEach((producto) => {
                const filaHTML = crearFilaHTML(producto);
                const tr = document.createElement("tr");
                tr.innerHTML = filaHTML;
                fragmento.appendChild(tr);
            });
            tablaDetalle.appendChild(fragmento);
            mostrarTotalCarrito();
        }
    }

    function mostrarTotalCarrito() {
        let montoTotalCarrito = carrito.reduce((acc, producto) => acc + producto.precio, 0);

        if (totalCarrito) {
            totalCarrito.textContent = `$ ${montoTotalCarrito.toFixed(2)}`;
        }
    }

    cargarCarrito();

    if (btnComprar) {
        btnComprar.addEventListener("click", () => {
            Swal.fire({
                title: "¡Gracias por tu compra!",
                text: "Tu pedido ha sido procesado con éxito.",
                icon: "success",
                confirmButtonText: "Volver a la página principal",
                allowOutsideClick: false,
                allowEscapeKey: false,
                allowEnterKey: false
            }).then(() => {
                localStorage.removeItem("miCarrito");
                location.href = "index.html";
            });
        });
    }
});
