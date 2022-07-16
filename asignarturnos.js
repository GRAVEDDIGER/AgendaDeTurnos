///////////////////////
// VARIABLES GLOBALES//
///////////////////////
let respuestaProfesionales;
let respuestaPacientes;
let mapProfesionales={};
let mapPacientes={};
let flatCalendario;
////////////////
//  funciones //
////////////////

////////////////////////
//MANIPULACION DEL DOM//
////////////////////////
document.addEventListener("DOMContentLoaded", async () => {
  await request();
  const fragmento = new DocumentFragment();
  profesionalObj.forEach((objeto,indice) => {
    const opcion = `${objeto.apellido} ${objeto.nombre} ${objeto.especialidad}`;
    const elemento = document.createElement("option");
    elemento.value = opcion;
    fragmento.appendChild(elemento);
    mapProfesionales[opcion] =indice;
  });
  
  const fragmentoPaciente =new DocumentFragment();
  pacienteObj.forEach((objeto,indice)=>{
    const opcionPaciente = `${objeto.apellido} ${objeto.nombre} ${objeto.dni}`;
    console.log("pacientes",opcionPaciente)
    const elemento = document.createElement("option");
    elemento.value=opcionPaciente;
    fragmentoPaciente.appendChild(elemento)
    mapPacientes[opcionPaciente]=indice;
  })
  document.getElementById("datalistOptions").appendChild(fragmento);
  document.getElementById("dataOpcionesPacientes").appendChild(fragmentoPaciente)
  
});
let opciones = {
  inline: true

}


const calendarioElemento = document.getElementById("calendario");
flatpickr(calendarioElemento, opciones);
document.querySelector(".flatpickr-days").addEventListener("click", () => {
  console.log("adrian")
});
const profesionalIngreso = document.getElementById("dataListProfesionales")
profesionalIngreso.addEventListener("change",()=>{
const fechasArray=[]
  const objetoTurnos=profesionalObj[mapProfesionales[profesionalIngreso.value]].configuracionTurnos.turnos
  const anosArray=Object.keys(objetoTurnos)
  anosArray.forEach( ano =>{
    const mesesArray =Object.keys(objetoTurnos[ano])
    mesesArray.forEach(mes =>{
      const diasArray=Object.keys(objetoTurnos[ano][mes])
      diasArray.forEach(dia=>{
        fechasArray.push(new Date(ano.substring(1,ano.length),mes.substring(1,mes.length),dia.substring(1,dia.length)))
      })
    })
  })

 flatpickr(document.getElementById("calendario"),{inline:true}).destroy()
 const opciones ={inline:true,enable:fechasArray}
 flatpickr(document.getElementById("calendario"),opciones)
})