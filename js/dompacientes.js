'use-strict'

pacienteObjeto=await pacientesRequest()

Validar =new Validaciones();

FuncionesGenerales=new OtrasFunciones();

Fabrica =new FabricaDeObjetos;
////////////////////////
//VARIABLES GLOBALES  //
////////////////////////




//////////////////////////////
//Event Listeners onChange  //
//////////////////////////////
domTelefono.addEventListener("change",()=> Validar.validarTelefonoOc(domTelefono,domEnviar));
domNombre.addEventListener("change",()=>Validar.validarNombreOc(domNombre,domEnviar));
domApellido.addEventListener("change",()=> Validar.validarApellidoOc(domApellido,domEnviar));
domDni.addEventListener("change",()=> Validar.validarDniOc(domDni,pacienteObjeto,domEnviar));

///////////////////////////////
//Event Listener click enviar//
///////////////////////////////

domEnviar.addEventListener("click", () => {
    // El valor de validacionDni sera false si no valida, -1 si es un valor nuevo y un numero si ya se encuentra 
    // en la base de datos
    const validacionDni = Validar.validarDniOc(domDni, pacienteObjeto,domEnviar) 
    const pacienteTransitorio = Fabrica.generarPaciente()
    let otrasValidar;
    if (validacionDni !== false) {
        otrasValidar = Validar.validarTodo(domEnviar)
       if (otrasValidar) {
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



