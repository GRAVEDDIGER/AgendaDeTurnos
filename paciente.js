//////////////////////////////////////////
// OBJETOS HTML PAGINA PACIENTES        //
//////////////////////////////////////////

const respuesta=await request()

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
