//////////////////////////////////////////
// OBJETOS HTML PAGINA PACIENTES        //
//////////////////////////////////////////

// const inicio = window.addEventListener("DOMContentLoaded", (e) => {
//     if (localBolean) {
//         pacienteObj.leerLocal()
//     }
// });
document.addEventListener("DOMContentLoaded".request())
const calleInput = document.getElementById("calle");
const alturaInput = document.getElementById("altura");
const localidadInput = document.getElementById("localidad");
const cpaInput = document.getElementById("cpa");
const documentoInput = document.getElementById("dni");
documentoInput.addEventListener("change", (e) =>
  validarDniOc(parseInt(e.target.value), pacienteObj)
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
const validarTodo = () => {
  if (validarApellidoOc(apellidoInput.value)) {
    if (validarNombreOc(nombreInput.value)) {
      if (validarTelefonoOc(telefonoInput.value)) return true;
    }
  }
  return false;
};
const enviarPaciente = document.getElementById("enviarPaciente");
enviarPaciente.addEventListener("click", (e) => {
  const pacienteTransitorio = generarPaciente();
  const otrasValidaciones = validarTodo();
  const validacionDni = validarDniOc(documentoInput.value, pacienteObj);
  if (otrasValidaciones) {
    if (validacionDni === -1) pacienteObj.push(pacienteTransitorio);
    else if (validacionDni === false) {
      swal({
        title: "Error!",
        text: "No es un DNI valido!",
        icon: "error",
      });
    } else pacienteObj[validacionDni] = pacienteTransitorio;
  }
  limpiarPaciente();
});
