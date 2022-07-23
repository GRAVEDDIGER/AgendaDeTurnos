
const extraerDatosPaciente = (indice) =>{

}
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
    if (condicion === -1) {
        apellidoInput.value = pacienteObj[condicion].apellido
        nombreInput.value = pacienteObj[condicion].nombre
        Input.value = pacienteObj[condicion].nombre

    }
}
);