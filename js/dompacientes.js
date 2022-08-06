///////////////////////
// VARIABLES DEL DOM //
///////////////////////
const domNombre = document.getElementById("nombre");
const domApellido = document.getElementById("apellido");
const domDni = document.getElementById("dni");
const domTelefono = document.getElementById("telefono");
const domCalle = document.getElementById("calle");
const domAltura = document.getElementById("altura");
const domLocalidad = document.getElementById("localidad");
const domCpa = document.getElementById("cpa");
const domEnviar = document.getElementById("enviarPaciente");

//////////////////////////////
//Event Listeners onChange  //
//////////////////////////////

domNombre.addEventListener("change", funcionesValidacion.validarNombreOc(domNombre.value))
domApellido.addEventListener("change", funcionesValidacion.validarApellidoOc(domApellido.value))
domDni.addEventListener("change", funcionesValidacion.validarDniOc(domDni.value))
domTelefono.addEventListener("change", funcionesValidacion.validarTelefonoOc(domTelefono.value))

///////////////////////////////
//Event Listener click enviar//
///////////////////////////////

domEnviar.addEventListener("click", () => {
    // El valor de validacionDni sera false si no valida, -1 si es un valor nuevo y un numero si ya se encuentra 
    // en la base de datos
    const validacionDni = funcionesValidacion.validarDniOc(domDni, pacienteObjeto) 
    const pacienteTransitorio = fabricaDeObjetos.generarPaciente()
    let otrasValidaciones;
    if (validacionDni !== false) {
        otrasValidaciones = funcionesValidacion.validarTodo()
       if (otrasValidaciones) {
            if (validacionDni ===-1) {
                pacienteObjeto.push(pacienteTransitorio);
                pacienteObjeto[length-1].guardarLocal();
            }else{
                pacienteObjeto[validacionDni] = pacienteTransitorio
                pacienteObjeto[validacionDni].guardarLocal();
            }
            
        }
    } else {
        swal({
            title: "Error!",
            text: "No es un DNI valido!",
            icon: "error",
        });
    }
}
)



