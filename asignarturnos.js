let respuestaProfesionales;
let respuestaPacientes;

const request = async () => {
  const resultadoProfesionales = await axios("../datos.json");
  console.log(resultadoProfesionales.data);
  respuestaProfesionales = await resultadoProfesionales;
  respuestaProfesionales.data.forEach((e, i, a) => {
    profesionalObj[i] = new Profesional(0,"","",[],e.nombre,e.apellido,e.dni,e.especialidad,e.matricula,e.telefono)//e.configuracionTurnos.ivTurnos,e.nombre,e.apellido,e.dni,e.especialidad,e.matricula,e.telefono);
    profesionalObj[i].configuracionTurnos = e.configuracionTurnos
  });
  const resultadoPacientes = await axios("../paciente.json");
  console.log(resultadoPacientes)
  respuestaPacientes=await resultadoPacientes;
  respuestaPacientes.data.forEach((e,i,a)=>{
    console.log(e)
    pacienteObj[i]= new Paciente(e.apellido,e.nombre,e.direccion.calle,e.direccion.numero,e.direccion.cPostal,e.telefono,e.dni,e.direccion.localidad);
  })
};
document.addEventListener("DOMContentLoaded", async () => {
  await request();
  const fragmento = new DocumentFragment();
  profesionalObj.forEach((objeto) => {
    const opcion = `${objeto.apellido} ${objeto.nombre} ${objeto.especialidad}`;
    const elemento = document.createElement("option");
    elemento.value = opcion;
    fragmento.appendChild(elemento);
  });
  
  const fragmentoPaciente =new DocumentFragment();
  pacienteObj.forEach((objeto)=>{
    const opcionPaciente = `${objeto.apellido} ${objeto.nombre} ${objeto.dni}`;
    console.log("pacientes",opcionPaciente)
    const elemento = document.createElement("option");
    elemento.value=opcionPaciente;
    fragmentoPaciente.appendChild(elemento)
  })
  document.getElementById("datalistOptions").appendChild(fragmento);
  document.getElementById("dataOpcionesPacientes").appendChild(fragmentoPaciente)
  
});
let opciones = {
  inline: true
}
const calendarioElemento = document.getElementById("calendario")
flatpickr(calendarioElemento, opciones)
document.querySelector(".flatpickr-days").addEventListener("click", () => {
  console.log("adrian")
})