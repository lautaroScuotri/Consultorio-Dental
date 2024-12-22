document.getElementById("carritoIcon").addEventListener("click", () => {
    document.getElementById("carrito").classList.toggle("active");
});

const Carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let tratamientosDisponibles = [];

const productos = document.getElementById("productos");
const productosCarrito = document.getElementById("productosCarrito");
const total = document.getElementById("total");
const filtroInput = document.getElementById("filtroNombre");

async function cargarTratamientos() {
    try {
        const response = await fetch("./data.json");
        const data = await response.json();
        tratamientosDisponibles = data.tratamientos;
        mostrarTratamientos(tratamientosDisponibles);
    } catch (error) {
        console.error("Error al cargar el archivo JSON:", error);
    }
}

function agregarEventosBotones() {
    const botones = document.getElementsByClassName("botonesCompra");
    const arrayDeBotones = Array.from(botones);

    arrayDeBotones.forEach((btn) => {
        btn.addEventListener("click", (evento) => {
            const tratamientoId = parseInt(evento.target.dataset.id);
            const tratamiento = tratamientosDisponibles.find((t) => t.id === tratamientoId);

            const existente = Carrito.find((item) => item.id === tratamientoId);

            if (existente) {
                existente.cantidad++;
            } else {
                Carrito.push({ ...tratamiento, cantidad: 1 });
            }

            actualizarCarrito();

            Swal.fire({
                title: "¡Tratamiento agregado al carrito!",
                text: `${tratamiento.nombre}`,
                icon: "success",
                timer: 1500,
                toast: true,
                position: "top-right",
                showConfirmButton: false,
            });
        });
    });
}

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

    agregarEventosBotonesEliminar();

    localStorage.setItem("carrito", JSON.stringify(Carrito));

    actualizarTotal();
}

function actualizarTotal() {
    const totalCompra = Carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
    total.innerText = "$" + totalCompra.toFixed(2);
}

function filtrarTratamientos() {
    const filtro = filtroInput.value.toLowerCase();
    const tratamientosFiltrados = tratamientosDisponibles.filter((tratamiento) =>
        tratamiento.nombre.toLowerCase().includes(filtro)
    );
    mostrarTratamientos(tratamientosFiltrados);
}

function mostrarTratamientos(tratamientos) {
    productos.innerHTML = "";
    tratamientos.forEach((tratamiento) => {
        productos.innerHTML += `
            <div class="producto">
                <h3>${tratamiento.nombre}</h3>
                <p>Precio: $${tratamiento.precio}</p>
                <button class="botonesCompra" data-id="${tratamiento.id}">Agregar</button>
            </div>
        `;
    });

    agregarEventosBotones();
}

function completarCompra() {
    if (Carrito.length === 0) {
        Swal.fire({
            icon: "error",
            title: "El carrito está vacío.",
            text: "Agregue tratamientos antes de completar la compra.",
        });
        return;
    }

    const totalCompra = Carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

    Swal.fire({
        title: `Su compra total es $${totalCompra}.`,
        text: "¿Desea confirmar la compra?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Confirmar",
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: "¡Gracias por su compra!",
                icon: "success",
                footer: '<a href="https://api.whatsapp.com/send?phone=+543517524244&text=Consulta%20por%compra">Contáctanos por WhatsApp</a>',
                timer: 20000,
            });
            Carrito.length = 0;
            localStorage.removeItem("carrito");
            actualizarCarrito();
        }
    });
}

document.getElementById("cerrarCarrito").addEventListener("click", () => {
    document.getElementById("carrito").classList.remove("active");
});

filtroInput.addEventListener("input", filtrarTratamientos);
document.getElementById("completarCompra").addEventListener("click", completarCompra);

document.addEventListener("DOMContentLoaded", cargarTratamientos);
