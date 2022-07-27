///////////////////////
// VARIABLES GLOBALES//
///////////////////////
let respuestaProfesionales;
let respuestaPacientes;
let mapProfesionales = {};
let mapPacientes = {};
let flatCalendario;
let opciones = {
  inline: true
};
////////////////
//  funciones //
////////////////


////////////////////////
//MANIPULACION DEL DOM//
////////////////////////
// AL TERMINAR LA CARGA HACE UN REQUEST AL SERVIDOR Y AL TERMINAR GENERA LAS LISTAS DE LOS SELECT DEL MODAL
document.addEventListener("DOMContentLoaded", async () => {
  await request();
  const fragmento = new DocumentFragment();
  profesionalObj.forEach((objeto, indice) => {
    const opcion = `${objeto.apellido} ${objeto.nombre} ${objeto.especialidad}`;
    const elemento = document.createElement("option");
    elemento.value = opcion;
    fragmento.appendChild(elemento);
    mapProfesionales[opcion] = indice;

  });
  await request();
  const fragmentoPaciente = new DocumentFragment();
  pacienteObj.forEach((objeto, indice) => {
    const opcionPaciente = `${objeto.apellido} ${objeto.nombre} ${objeto.dni}`;
//    //console.log("pacientes", opcionPaciente)
    const elemento = document.createElement("option");
    elemento.value = opcionPaciente;
    fragmentoPaciente.appendChild(elemento)
    // GENERA UN MAP DONDE LA CLAVE ES LA CADENA ASIGNADA AL SELECT DEL DATALIST Y EL INDICE ES EL INDICE DEL ARRAY DE PROFESIONALES
    mapPacientes[opcionPaciente] = indice
  });
  document.getElementById("datalistOptions").appendChild(fragmento)
  document.getElementById("dataOpcionesPacientes").appendChild(fragmentoPaciente)

});

// const profesionalIngreso = document.getElementById("dataListProfesionales").addEventListener("change", //console.log("dadada"))
//CREA UN ELEMENTO INLINE CON EL CALENDARIO USANDO LA LIBRERIA FLATPICKR 
const calendarioElemento = document.getElementById("calendario");
flatpickr(calendarioElemento, opciones);
const calendarioDias = document.querySelectorAll("div .flatpickr-day");
//AL CAMBIAR EL VALUE DEL DATALISTPROFESIONALES GENERA UN NUEVO CALENDARIO QUE SOLO TIENE ENABLED LAS FECHAS EN LAS QUE EL PROFESIONAL ATIENDE
document.getElementById("dataListProfesionales").addEventListener("change", () => {
  if (document.getElementById("dataListProfesionales").value !== "") {
    const fechasArray = []
    const objetoTurnos = profesionalObj[mapProfesionales[document.getElementById("dataListProfesionales").value]].configuracionTurnos.turnos
    // ITERA SOBRE LAS CLAVES DEL OBJETO TURNOS (LOS AÑOS)
    objetoTurnos.porClave((ano, anoObjeto) => {
      //ITERA SOBRE LOS MESES DE CADA AÑO 
      objetoTurnos[ano].porClave((mes, mesObjeto) => {
        //ITERA SOBRE LOS DIAS DE CADA MES 
        objetoTurnos[ano][mes].porClave((diaClave, dia) => {
          //AGREGA EL CADA DIA PRESENTE EN EL OBJETO PROFESIONAL AL ELEMENTO FECHASARRAY

          fechasArray.push(new Date(ano.substring(1, ano.length), mes.substring(1, mes.length), diaClave.substring(1, diaClave.length)))
        })
      })
    })
    //BORRA EL CALENDARIO ANTERIOR 
    flatpickr(document.getElementById("calendario"), {
      inline: true
    }).destroy();
    //GENERA UN NUEVO CALENDARIO QE TIENE ENABLED SOLO LOS DIAS QUE ESTAN EN FECHASARRAY
    const opciones = {
      inline: true,
      enable: fechasArray
    };
    flatpickr(document.getElementById("calendario"), opciones);
    //EVENTLISENER QUE  AL HACER CLICK EN UN DIA DEL CALENDARIO GENERA LOS HORARIOS DISPONIBLES POR EL PROFESIONAL 
    document.querySelectorAll("div .flatpickr-day").forEach(dia => {
      dia.addEventListener("click", (e) => {
        borrarHorarios()
        const fechaTurno = e.target.ariaLabel; //OBTIENE LA FECHA SELECCIONADA POR EL USUARIO 
        const ano = new Date(fechaTurno).getFullYear(); //TOMA LA FECHA SELECCIONADA Y LA PASA A UN OBJETO DATE Y DE AHI EXTRAE EL AÑO
        const mes = new Date(fechaTurno).getMonth(); //HACE LO MISMO CON EL MES 
        const diaTurno = new Date(fechaTurno).getDate(); //Y CON EL DIA 
        const fragmento = new DocumentFragment();
        const indiceProfesionales = mapProfesionales[document.getElementById("dataListProfesionales").value]; //OBTIENE EL INDICE DEL PROFESIONAL SELECCIONADO
        const turnos = profesionalObj[indiceProfesionales].configuracionTurnos.turnos //REPRESENTA AL OBJETO TURNOS DENTRO DEL PROFESIONAL SELECCIONADO
        const objetoDia = turnos["a" + ano]["m" + mes]["d" + diaTurno]; //REPRESENTA AL DIA DEL OBJETO TURNOS DEL PROFESIONAL SELECCIONADO 
        objetoDia.porClave((horaClave, horaObjeto) => { //UTILIZA LA FUNCION ITERADORA ITERANDO ENTRE LAS HORAS DEL OBJETO
          horaObjeto.porClave((minutosClave, minutosObjeto) => { //AQUI ITERA ENTRE LOS MINUTOS DEL OBJETO 
            if (minutosObjeto === 'libre') {
              let horaLimpia, minutosLimpios;
              //EL OPERADOR TERNARIO GENERA 2 STRINGS HORALIMPIO Y MINUTOSLIMPIO CON LA NOTACION XX:XX
              ((horaClave.substring(1, horaClave.length)).length < 2) ? horaLimpia = "0" + horaClave.substring(1, horaClave.length): horaLimpia = horaClave.substring(1, horaClave.length);
              ((minutosClave.substring(1, minutosClave.length)).length < 2) ? minutosLimpios = "0" + minutosClave.substring(1, minutosClave.length): minutosLimpios = minutosClave.substring(1, minutosClave.length);
              const etiqueta = document.createElement("li")
              const contenido = horaLimpia + ":" + minutosLimpios;
              const nuevoElemento = etiqueta.textContent = contenido
              fragmento.appendChild(etiqueta);
              //SE AGREGA EL HORARIO AL FRAGMENTO
            }
          })
        })

        document.getElementById("ulHorarios").appendChild(fragmento)
        //SE AGREGA EL FRAGMENTO AL DIV DE LOS HORARIOS 
        const nodoHtml = document.querySelectorAll(".horarios li")
        //AL HACER CLICK SOBRE UN ITEM DEL UL DE HORARIOS LE PONE LA CLASE AZUL Y SE LA SACA A TODOS LOS OTROS QUE YA LA TENGAN 
        nodoHtml.forEach(nodo => {
          nodo.addEventListener("click", (e) => {
            document.getElementById("divHorarios").value = e.target.textContent
            document.getElementById("divHorarios").value = document.getElementById("divHorarios").value
            document.querySelectorAll(".horarios li").forEach(item => {
              item.classList.remove("fondoAzul")
            })
            e.target.classList.add("fondoAzul")
          })
        })
      })
    });


  }
})
const pacienteIngreso = document.getElementById("dataListPacientes")
const profesionalInput = document.getElementById("dataListProfesionales")
//FUNCION QUE BORRA EL CALENDARIO Y L DEJA SIN DISABLES
const borrarCalendario = () => {
  flatpickr(document.getElementById("calendario"), {
    inline: true
  }).destroy()
  flatpickr(document.getElementById("calendario"), {
    inline: true
  })
}
//FUNCION QUE BORRA LOS ITEMS DE ULHORARIOS 
const borrarHorarios = () => {
  const ulHorarios = document.querySelectorAll(".horarios li")
  ulHorarios.forEach(nodoHTML => {
    nodoHTML.remove()
  })
}
//EVENTLISTENER QUE HAL HACER CLICK EN GUARDAR GENERA EL ARBOL DE TURNO DEL TURNO ASIGNADO 
const guardarTurno = document.getElementById("guardarTurno")
guardarTurno.addEventListener("click", () => {
  const profesional = profesionalObj[mapProfesionales[document.getElementById("dataListProfesionales").value]].configuracionTurnos.turnos
  const fechaTurno = document.getElementById("calendario").value
  let anoCadena, mesCadena, diaCadena, hora, minuto;
  [anoCadena, mesCadena, diaCadena] = fechaTurno.split("-");
  const ano = new Date(anoCadena, mesCadena, diaCadena).getFullYear();
  const mes = (new Date(anoCadena, mesCadena, diaCadena).getMonth()) - 1;
  const dia = new Date(anoCadena, mesCadena, diaCadena).getDate();

  [hora, minuto] = document.getElementById("divHorarios").value.toString().split(":");
  hora = parseInt(hora);
  minuto = parseInt(minuto).toString();
  const dniPaciente = pacienteObj[mapPacientes[document.getElementById("dataListPacientes").value]].dni;
  profesional["a" + ano]["m" + mes]["d" + dia]["h" + hora]["m" + minuto] = dniPaciente;
  borrarHorarios()
  borrarCalendario()
  profesionalInput.value = ""
  pacienteIngreso.value = ""
  //ASI QUEDA EL OBJETO PROFESIONALOBJ ACTUALIZADO SOLO QUEDA ENVIARLO AL BACKEND 
  //EN EL SIMULADOR AL NO HABER BACKEND EL TURNO NO QUEDA GUARDADO EN NINGUN LADO.
})