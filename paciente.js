//////////////////////////////////////////
// OBJETOS HTML PAGINA PACIENTES        //
//////////////////////////////////////////

// HACE UN REQUEST A UN JSON EN EL SERVIDOR. 
const respuesta=await pacientesRequest();


// FUNCION QUE REALIZA TODAS LAS VALIDACIONES ANTES DE GUARDAR UN NUEVO PACIENTE 
const validarTodo = () => {
  if (validarApellidoOc(apellidoInput.value)) {
    if (validarNombreOc(nombreInput.value)) {
      if (validarTelefonoOc(telefonoInput.value)) return true;
    }
  }
  return false;
};

// AL HACER CLICK EN EL BOTON ENVIAR PRIMERO LLAMA A LA FUNCION GENERARPACIENTE QUE ESTA EN MAIN.JS 
// ESA FUNCION GENERA UN OBJETO TRANSITORIO CON LO DATOS QUE INGRESO EL PACIENTE.
// LUEGO LLAMA A LA FUNCION VALIDAR TODO PARA EVALUAR QUE LOS DATOS NECESARIOS ESTEN INGRESADOS Y QUE CUMPLAN CRITERIOS 
// POR ULTIMO VALIDA EL DNI Y SE FIJA SI EL DNI YA SE ENCUENTRA EN LA BASE DE DATOS. SI SE ENCUENTRA EN LA BASE DE DATOS MODIFICA EL REGISTRO
// SI NO ES VALIDO GENERA UNA ALERTA DE ERROR Y SI NO SE ENCUENTRA GENERA UN NUEVO REGISTRO 

const enviarPaciente = document.getElementById("enviarPaciente");
enviarPaciente.addEventListener("click", (e) => {
  const pacienteTransitorio = generarPaciente();
  const otrasValidaciones = validarTodo();
  const validacionDni = validarDniOc(documentoInput.value, pacienteObj);
  if (otrasValidaciones) {
    if (validacionDni === -1) {pacienteObj.push(pacienteTransitorio);
    pacienteObj[pacienteObj.length-1].guardarLocal()
    }
    else if (validacionDni === false) {
      swal({
        title: "Error!",
        text: "No es un DNI valido!",
        icon: "error",
      });
    } else {pacienteObj[validacionDni] = pacienteTransitorio;
      pacienteObj[validacionDni].guardarLocal()
    }
  }
  
  limpiarInputs();
});
