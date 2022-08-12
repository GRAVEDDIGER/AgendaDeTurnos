'use-strict'
pacienteObjeto = await pacientesRequest()

Validar = new Validaciones();

FuncionesGenerales = new OtrasFunciones();

Fabrica = new FabricaDeObjetos;
////////////////////////
//VARIABLES GLOBALES  //
////////////////////////
let pacienteObjeto = [];
let Validar;
let Solicitar;
let FuncionesGenerales;
let Fabrica;
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
domTelefono.addEventListener("change", () => Validaciones.validarTelefonoOc(domTelefono, domEnviar));
domNombre.addEventListener("change", () => Validaciones.validarNombreOc(domNombre, domEnviar));
domApellido.addEventListener("change", () => Validaciones.validarApellidoOc(domApellido, domEnviar));
domDni.addEventListener("change", () => Validaciones.validarDniOc(domDni, pacienteObjeto, domEnviar));

///////////////////////////////
//Event Listener click enviar//
///////////////////////////////

domEnviar.addEventListener("click", () => {
    // El valor de validacionDni sera false si no valida, -1 si es un valor nuevo y un numero si ya se encuentra 
    // en la base de datos
    const validacionDni = Validaciones.validarDniOc(domDni, pacienteObjeto, domEnviar)
    const pacienteTransitorio = FabricaDeObjetos.generarPaciente()
    let otrasValidar;
    if (validacionDni !== false) {
        otrasValidar = Validaciones.validarTodo(domEnviar)
        if (otrasValidar) {
            if (validacionDni === -1) {
                pacienteObjeto.push(pacienteTransitorio);
                pacienteObjeto[length].guardarLocal();
            } else {
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
    OtrasFunciones.limpiarPaciente()
})