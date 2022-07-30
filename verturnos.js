////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//PARA PROBAR ESTA PARTE HAY TURNO ASIGNADO EN DATOS.JSON PARA LA PROFESIONAL LUCIO ALICIA EN EL              //
//DIA 19/7 AL USARSE UN JSON PARA OBTENER EL OBJETO NO PUEDO GRABAR NUEVOS TURNOS, ESO LO RESUELVE EL BACKEND //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const elModal = new bootstrap.Modal(document.getElementById("modalTurnera")); //REPRESENTA EL MODAL DE LA PAGINA PARA PODERLO DESAPARECER CON CODIGO 

const respuesta = await request();
const respuesta2 = await pacientesRequest();
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
//CREA EL CALENDARIO DEFAULT
const iniciarCaledario = opciones => flatpickr(calendario, opciones);
//FUNCION QUE PERMITE GENERAR DE LA NOTACION DE HORA  DEL ARBOL  (h4 m15) una hora o minuto en notacion XX 
const limpiarHora=(hora) =>{
    hora=hora.substring(1,hora.length)
    if (hora.length <2) hora ="0"+hora  
    return hora
}



/////////////////
//funciones dom//
/////////////////
//genera las opciones del datalist y genera un map con clave = al string de la opcion y valor el indice el profesional correspondiente aese string
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
//al cambiar el datalist genera un arraydeFechas que contiene las fechas donde el profesional atiende
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
//elimina el calendario vigente
        flatpickr(calendario, opciones).destroy()
        //genera uno nuevo que solo tiene enabled las fechas que se encuentran en arraydefechas 
        iniciarCaledario({
            inline: true,
            enable: arrayDeFechas
        })}

    })
};
//boton del modal que genera un objeto con los datos de los turnos del dia seleccionado
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
    //obtiene la fecha del calendario la divide y se usa un destructuring para generar los datos de dia mes y año

    turnosProfesional[ano][mes][dia].porClave((claveHora,objetoHora)=>{ //itera las horas del profesional en el dia seleccionado 
        const horaLimpia=limpiarHora(claveHora) //genera un string  con la notacion XX de la hora 
        objetoHora.porClave((minutosClave,minutosObjeto)=>{ //itera sobre los minutos de las horas de los turnos del profesional 
            const minutosLimpios =limpiarHora(minutosClave)
            if (minutosObjeto!=='libre') arrayTurnos.push(new ListadoDeTurnos(horaLimpia,minutosLimpios,minutosObjeto)) //si el valor del turno 
            //iterado no es libre entonces se genera el objeto ListadoDeTurnos que contiene los datos basicos del turno encontrado.
        })
    })
    const fragmento =new DocumentFragment;
    arrayTurnos.forEach(turno =>{//este array contiene todos los turnos encontrados para el dia elegido 
        const indicePaciente= pacienteObj.findIndex(paciente =>{if (paciente.dni===turno.dni) return paciente}) //busca al paciente usando el DNI 
        //obtenido del turno y edevielve el indice del array pacienteObj 
        const templateTurnos = document.getElementById("templateTurnos").content //representa el template de la tabla de turnos
        document.getElementById("templateTurnos").content.querySelectorAll("td")[0].textContent=turno.hora +":" +turno.minutos;
        document.getElementById("templateTurnos").content.querySelectorAll("td")[1].textContent=pacienteObj[indicePaciente].apellido;
        document.getElementById("templateTurnos").content.querySelectorAll("td")[2].textContent=pacienteObj[indicePaciente].nombre;
        document.getElementById("templateTurnos").content.querySelectorAll("td")[3].textContent=pacienteObj[indicePaciente].dni;
        document.getElementById("templateTurnos").content.querySelectorAll("td")[4].textContent=pacienteObj[indicePaciente].telefono;
        // se modifica el template 
        //se clona 
        const clon =  document.getElementById("templateTurnos").content.cloneNode(true);
        //se agrega el clon al fragemento de esta manera se evita el reflow
        fragmento.appendChild(clon)

      
     })
     // se agrega el fragmento al  la tabla 
     document.querySelector("table tbody").appendChild(fragmento)
     elModal.hide();
})

/////////////////////
// LOGICA PRINCIPAL//
/////////////////////

iniciarCaledario(opciones);
iniciarDatalist();
agregarEventListenerDatalist();