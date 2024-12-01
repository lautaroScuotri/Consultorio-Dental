document.getElementById("carritoIcon").addEventListener("click", () => {
    document.getElementById("carrito").classList.toggle("active");
});

// Carrito y datos iniciales
const Carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const tratamientosDisponibles = [
    { id: 1, nombre: "Limpieza Dental", precio: 1500 },
    { id: 2, nombre: "Empaste Dental", precio: 3000 },
    { id: 3, nombre: "Extracción de Muela", precio: 5000 },
    { id: 4, nombre: "Blanqueamiento Dental", precio: 4000 },
];

const productos = document.getElementById("productos");
const productosCarrito = document.getElementById("productosCarrito");
const total = document.getElementById("total");
const carritoIcon = document.getElementById("carritoIcon");

// Función para agregar eventos a botones "Comprar"
function agregarEventosBotones() {
    const botones = document.getElementsByClassName("botonesCompra");
    const arrayDeBotones = Array.from(botones);

    arrayDeBotones.forEach((btn) => {
        btn.addEventListener("click", (evento) => {
            const tratamientoId = parseInt(evento.target.dataset.id);
            const tratamiento = tratamientosDisponibles.find((t) => t.id === tratamientoId);

            // Verificar si ya existe en el carrito
            const existente = Carrito.find((item) => item.id === tratamientoId);

            if (existente) {
                existente.cantidad++;
            } else {
                Carrito.push({ ...tratamiento, cantidad: 1 });
            }

            actualizarCarrito();
        });
    });
}

// Función para agregar eventos a botones "Eliminar"
function agregarEventosBotonesEliminar() {
    const botones = document.getElementsByClassName("botonesEliminar");
    const arrayDeBotones = Array.from(botones);

    arrayDeBotones.forEach((btn) => {
        btn.addEventListener("click", (evento) => {
            const tratamientoId = parseInt(evento.target.dataset.id);

            const index = Carrito.findIndex((item) => item.id === tratamientoId);

            if (index !== -1) {
                const item = Carrito[index];
                if (item.cantidad > 1) {
                    item.cantidad--;
                } else {
                    Carrito.splice(index, 1);
                }
            }

            actualizarCarrito();
        });
    });
}

// Función para actualizar el carrito
function actualizarCarrito() {
    productosCarrito.innerHTML = "";

    Carrito.forEach((item) => {
        productosCarrito.innerHTML += `
            <div class="producto">
                <h3>${item.nombre}</h3>
                <p>Precio: $${item.precio}</p>
                <p>Cantidad: ${item.cantidad}</p>
                <button class="botonesEliminar" data-id="${item.id}">Eliminar</button>
            </div>
        `;
    });

    // Actualizar eventos y total
    agregarEventosBotonesEliminar();

    localStorage.setItem("carrito", JSON.stringify(Carrito));

    total.innerText = "$" + Carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

    carritoIcon.children[0].innerText = Carrito.reduce((acc, item) => acc + item.cantidad, 0);
}

// Render inicial de los tratamientos disponibles
document.addEventListener("DOMContentLoaded", () => {
    tratamientosDisponibles.forEach((tratamiento) => {
        productos.innerHTML += `
            <div class="producto">
                <h3>${tratamiento.nombre}</h3>
                <p>Precio: $${tratamiento.precio}</p>
                <button class="botonesCompra" data-id="${tratamiento.id}">Agregar</button>
            </div>
        `;
    });

    agregarEventosBotones();
    actualizarCarrito();
});