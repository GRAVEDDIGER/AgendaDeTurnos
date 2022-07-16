///////////////////////
// VARIABLES GLOBALES//
///////////////////////
let respuestaProfesionales;
let respuestaPacientes;
let mapProfesionales = {};
let mapPacientes = {};
let flatCalendario;
let opciones = { inline: true };
////////////////
//  funciones //
////////////////


////////////////////////
//MANIPULACION DEL DOM//
////////////////////////
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

  const fragmentoPaciente = new DocumentFragment();
  pacienteObj.forEach((objeto, indice) => {
    const opcionPaciente = `${objeto.apellido} ${objeto.nombre} ${objeto.dni}`;
    console.log("pacientes", opcionPaciente)
    const elemento = document.createElement("option");
    elemento.value = opcionPaciente;
    fragmentoPaciente.appendChild(elemento)
    mapPacientes[opcionPaciente] = indice
  }
  );
  document.getElementById("datalistOptions").appendChild(fragmento)
  document.getElementById("dataOpcionesPacientes").appendChild(fragmentoPaciente)

});

const profesionalIngreso = document.getElementById("dataListProfesionales").addEventListener("change", console.log("dadada"))

const calendarioElemento = document.getElementById("calendario");
flatpickr(calendarioElemento, opciones);
const calendarioDias = document.querySelectorAll("div .flatpickr-day");

document.getElementById("dataListProfesionales").addEventListener("change", () => {
  const fechasArray = []
  const objetoTurnos = profesionalObj[mapProfesionales[document.getElementById("dataListProfesionales").value]].configuracionTurnos.turnos
  const anosArray = Object.keys(objetoTurnos)
  anosArray.forEach(ano => {
    const mesesArray = Object.keys(objetoTurnos[ano])
    mesesArray.forEach(mes => {
      const diasArray = Object.keys(objetoTurnos[ano][mes])
      diasArray.forEach(dia => {
        fechasArray.push(new Date(ano.substring(1, ano.length), mes.substring(1, mes.length), dia.substring(1, dia.length)))
      })
    })
  })

  flatpickr(document.getElementById("calendario"), { inline: true }).destroy();
  const opciones = { inline: true, enable: fechasArray };
  flatpickr(document.getElementById("calendario"), opciones);
  document.querySelectorAll("div .flatpickr-day").forEach(dia => {
    dia.addEventListener("mouseup", (e) => {

      const fechaTurno = e.target.ariaLabel;
      const ano = new Date(fechaTurno).getFullYear();
      const mes = new Date(fechaTurno).getMonth();
      const diaTurno = new Date(fechaTurno).getDate();
      const fragmento = new DocumentFragment();
      const indiceProfesionales = mapProfesionales[document.getElementById("dataListProfesionales").value];
      const turnos = profesionalObj[indiceProfesionales].configuracionTurnos.turnos
      const objetoDia = turnos["a" + ano]["m" + mes]["d" + diaTurno];
      Object.keys(objetoDia).forEach(hora => {
        Object.keys(objetoDia[hora]).forEach(minutos => {
          if (objetoDia[hora][minutos] === "libre") {
            let horaLimpia, minutosLimpios;
            ((hora.substring(1, hora.length)).length < 2) ? horaLimpia = "0" + hora.substring(1, hora.length) : horaLimpia = hora.substring(1, hora.length);
            ((minutos.substring(1, minutos.length)).length < 2) ? minutosLimpios = "0" + minutos.substring(1, minutos.length) : minutosLimpios = minutos.substring(1, minutos.length);

            const etiqueta = document.createElement("li")
            const contenido = horaLimpia + ":" + minutosLimpios;
            const nuevoElemento = etiqueta.textContent = contenido
            fragmento.appendChild(etiqueta);
          }
        })
      })
      document.getElementById("ulHorarios").appendChild(fragmento)
      const nodoHtml = document.querySelectorAll(".horarios li")
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


})

const guardarTurno = document.getElementById("guardarTurno")
guardarTurno.addEventListener("click",()=>{
  const profesional = profesionalObj[mapProfesionales[document.getElementById("dataListProfesionales").value]].configuracionTurnos.turnos
  const fechaTurno = document.getElementById("calendario").value
  const ano = new Date(fechaTurno).getFullYear();
  const mes = new Date(fechaTurno).getMonth();
  const dia = new Date(fechaTurno).getDate();
  [hora,minuto] = document.getElementById("divHorarios").value.toString().split(":")
  hora=parseInt(hora).toString()
  minuto=parseInt(minuto).toString();
  const dniPaciente =pacienteObj[mapPacientes[document.getElementById("dataListPacientes").value]].dni;
  profesional["a"+ano]["m"+mes]["d"+dia]["h"+hora]["m"+minuto] = dniPaciente

  console.log(profesional)
})

