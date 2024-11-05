let tratamiento1 = "Limpieza dental";
let costo1 = 1500;

let tratamiento2 = "Empaste dental";
let costo2 = 3000;

let tratamiento3 = "Extracción de muela";
let costo3 = 5000;

let tratamiento4 = "Blanqueamiento dental";
let costo4 = 4000;

function solicitarDatosPaciente() {
    let nombre = prompt("Ingrese el nombre del paciente:");
    let edad = parseInt(prompt("Ingrese la edad del paciente:"));
    let motivo = prompt("Ingrese el motivo de la consulta:");
    console.log(`Paciente: ${nombre}, Edad: ${edad}, Motivo: ${motivo}`);
    return { nombre, edad, motivo };
}

function seleccionarTratamiento() {
    let mensaje = "Seleccione un tratamiento:\n";
    mensaje += "1. " + tratamiento1 + " - $" + costo1 + "\n";
    mensaje += "2. " + tratamiento2 + " - $" + costo2 + "\n";
    mensaje += "3. " + tratamiento3 + " - $" + costo3 + "\n";
    mensaje += "4. " + tratamiento4 + " - $" + costo4 + "\n";

    let seleccion = parseInt(prompt(mensaje));

    if (seleccion === 1) {
        alert("Ha elegido: " + tratamiento1 + " por $" + costo1);
        return { nombre: tratamiento1, costo: costo1 };
    } else if (seleccion === 2) {
        alert("Ha elegido: " + tratamiento2 + " por $" + costo2);
        return { nombre: tratamiento2, costo: costo2 };
    } else if (seleccion === 3) {
        alert("Ha elegido: " + tratamiento3 + " por $" + costo3);
        return { nombre: tratamiento3, costo: costo3 };
    } else if (seleccion === 4) {
        alert("Ha elegido: " + tratamiento4 + " por $" + costo4);
        return { nombre: tratamiento4, costo: costo4 };
    } else {
        alert("Selección no válida.");
        return null;
    }
}

function registrarCita(paciente, tratamiento) {
    let fecha = prompt("Ingrese la fecha de la cita (DD/MM/AAAA):");
    let hora = prompt("Ingrese la hora de la cita (HH:MM):");
    console.log(`Cita registrada para ${paciente.nombre} el ${fecha} a las ${hora}`);
    return { fecha, hora };
}


function confirmarConsulta(paciente, tratamiento, cita) {
    alert(`Resumen de la consulta:\n
Paciente: ${paciente.nombre}
Edad: ${paciente.edad}
Motivo de consulta: ${paciente.motivo}
Tratamiento seleccionado: ${tratamiento.nombre} - $${tratamiento.costo}
Fecha y hora de cita: ${cita.fecha} a las ${cita.hora}
`);
}

alert("Bienvenido al Simulador de Consultorio Dental");
const paciente = solicitarDatosPaciente();
const tratamiento = seleccionarTratamiento();

if (tratamiento) {
    const cita = registrarCita(paciente, tratamiento);
    confirmarConsulta(paciente, tratamiento, cita);
} else {
    alert("No se ha seleccionado un tratamiento, por lo tanto no se puede agendar la cita.");
}