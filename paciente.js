//////////////////////////////////////////
// OBJETOS HTML PAGINA PACIENTES        //
//////////////////////////////////////////

const inicio = window.addEventListener("DOMContentLoaded", (e) => {
    if (localBolean) {
        PacienteObj.leerLocal()
    }
});

const documentoInput = document.getElementById("dni");
documentoInput.addEventListener("change", (e) =>
    validarDniOc(parseInt(e.target.value))
);
const apellidoInput = document.getElementById("apellido");
apellidoInput.addEventListener("change", (e) =>
    validarApellidoOc(e.target.value)
);

const nombreInput = document.getElementById("nombre");
nombreInput.addEventListener("change", (e) => validarNombreOc(e.target.value));

const telefonoInput = document.getElementById("telefono");
telefonoInput.addEventListener("change", (e) =>
    validarTelefonoOc(e.target.value)
);
const enviarPaciente = document.getElementById("enviarPaciente").addEventListener("click", (e) => {
    e.preventDefault();
    const dniPaciente = document.getElementById("dni");
    if (
        validarDniOc(parseInt(documentoInput.value)) &&
        validarApellidoOc(apellidoInput.value) &&
        validarNombreOc(nombreInput.value) &&
        validarTelefonoOc(telefonoInput.value)
    ) {
        configurarPaciente(dniPaciente.value);
        PacienteObj.guardarLocal();
    } else alert("Hay datos requeridos con errores");
});