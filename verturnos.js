const respuesta = await request()
/////////////////////////
// VARIABLES GLOBALES  //
/////////////////////////
const opciones = {
    inline: true
}
let profesionalCadena;
let mapProfesional = {}
const datalistProfesional = document.getElementById("dataListProfesionales");
let calendario = document.getElementById("calendario");
///////////////
// FUNCIONES //
///////////////
const iniciarCaledario = opciones => flatpickr(calendario, opciones);
const limpiarHora=(hora) =>{
    hora=hora.substring(1,hora.length)
    if (hora.length <2) hora ="0"+hora  
    return hora
}



/////////////////
//funciones dom//
/////////////////
const iniciarDatalist = () => {
    const fragmento = new DocumentFragment()

    profesionalObj.forEach((profesional, indice) => {
        profesionalCadena = `${profesional.apellido} ${profesional.nombre} ${profesional.especialidad}`;
        mapProfesional[profesionalCadena] = indice;
        const elemento = document.createElement("option");
        elemento.value = profesionalCadena;
        fragmento.appendChild(elemento);
    })
    datalistProfesional.appendChild(fragmento);
};
const agregarEventListenerDatalist = () => {
    document.getElementById("dataListProfesionales").addEventListener("change", e => {
       if (document.getElementById("dataListProfesionales").value !== "") { 
        let arrayDeFechas = [];
        const objetoTurnos = profesionalObj[mapProfesional[datalistProfesional.value]].configuracionTurnos.turnos
        objetoTurnos.porClave((anoClave, ano) => {
            ano.porClave((mesClave, mes) => {
                mes.porClave((diaClave, dia) => {
                    const anoString = anoClave.substring(1, ano.length)
                    const mesString = mesClave.substring(1, ano.length)
                    const diaString = diaClave.substring(1, ano.length)
                    arrayDeFechas.push(new Date(anoString, mesString, diaString))
                })
            })
        })

        flatpickr(calendario, opciones).destroy()
        iniciarCaledario({
            inline: true,
            enable: arrayDeFechas
        })}

    })
};
const botonGuardar = document.getElementById("botonGuardar")
botonGuardar.addEventListener("click",evento=>{
    let dia , mes, ano;
    const arrayTurnos=[]
    const fechaSeleccionada = calendario.value;
    [ano,mes,dia] = fechaSeleccionada.split("-");
    mes="m"+(parseInt(mes)-1).toString()
    ano="a"+ano
    dia="d"+dia
    const turnosProfesional =profesionalObj[mapProfesional[  datalistProfesional.value]].configuracionTurnos.turnos
    turnosProfesional[ano][mes][dia].porClave((claveHora,objetoHora)=>{
        const horaLimpia=limpiarHora(claveHora)
        objetoHora.porClave((minutosClave,minutosObjeto)=>{
            const minutosLimpios =limpiarHora(minutosClave)
            if (minutosObjeto!=='libre') arrayTurnos.push(new ListadoDeTurnos(horaLimpia,minutosLimpios,minutosObjeto))
            
        })
    })
    console.log(arrayTurnos)
    const fragmento =new DocumentFragment;
    arrayTurnos.forEach(turno =>{
        const indicePaciente= pacienteObj.findIndex(paciente =>{if (paciente.dni===turno.dni) return paciente})
        const templateTurnos = document.getElementById("templateTurnos").content
        console.log(document.getElementById("templateTurnos").querySelectorAll("td"))
        document.getElementById("templateTurnos").content.querySelectorAll("td")[0].textContent=turno.hora +":" +turno.minutos;
        document.getElementById("templateTurnos").content.querySelectorAll("td")[1].textContent=pacienteObj[indicePaciente].apellido;
        document.getElementById("templateTurnos").content.querySelectorAll("td")[2].textContent=pacienteObj[indicePaciente].nombre;
        document.getElementById("templateTurnos").content.querySelectorAll("td")[3].textContent=pacienteObj[indicePaciente].dni;
        document.getElementById("templateTurnos").content.querySelectorAll("td")[4].textContent=pacienteObj[indicePaciente].telefono;
        const clon =  document.getElementById("templateTurnos").content.cloneNode(true);
        fragmento.appendChild(clon)

      
     })
     document.querySelector("table tbody").appendChild(fragmento)

})

/////////////////////
// LOGICA PRINCIPAL//
/////////////////////

iniciarCaledario(opciones);
iniciarDatalist();
agregarEventListenerDatalist();