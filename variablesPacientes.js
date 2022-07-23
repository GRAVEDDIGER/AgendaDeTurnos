
///////////////////////////////////////////////////////
// VARIABLES DE LA PAGINA CONFIGURACION DE PACIENTES //
///////////////////////////////////////////////////////
// LAS VARIABLES XXXXInput representan a los input de la pagina 
// Todos los datos que son requeridos tienen validacion y tienen asignado un evento onChange para validar 
// aparte al enviar los datos se vuelve a correr la validacion de esos elementos 
// en el evento change del input del DNI al encontrar un valor que ya esta en la base de datos obtiene los datos y los pasa a los input
// para modificar los datos 
const calleInput = document.getElementById("calle");
const alturaInput = document.getElementById("altura");
const localidadInput = document.getElementById("localidad");
const cpaInput = document.getElementById("cpa");
const documentoInput = document.getElementById("dni");
documentoInput.addEventListener("change", (e) =>
  validarDniOc(parseInt(e.target.value), pacienteObj)
);
const apellidoInput = document.getElementById("apellido");
apellidoInput.addEventListener("change", (e) =>{ 
   validarApellidoOc(e.target.value)
  
}
);

const nombreInput = document.getElementById("nombre");
nombreInput.addEventListener("change", (e) => validarNombreOc(e.target.value));

const telefonoInput = document.getElementById("telefono");
telefonoInput.addEventListener("change", (e) =>
  validarTelefonoOc(e.target.value)
);
documentoInput.addEventListener("change", (e) =>
  {
    const condicion =validarDniOc(parseInt(e.target.value), pacienteObj)
    if (condicion !== -1) {
        apellidoInput.value = pacienteObj[condicion].apellido
        nombreInput.value = pacienteObj[condicion].nombre
        telefonoInput.value = pacienteObj[condicion].telefono
        calleInput.value = pacienteObj[condicion].direccion.calle
        alturaInput.value = pacienteObj[condicion].direccion.numero
        localidadInput.value = pacienteObj[condicion].direccion.localidad
        cpaInput.value= pacienteObj[condicion].direccion.cPostal


    }
}
);