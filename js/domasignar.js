
profesionalRequest().then(respuesta => profesionalObjeto =respuesta);
pacientesRequest().then(respuesta => pacienteObjeto=respuesta)
let flatCalendario;
let opciones = {
  inline: true
};
///////////////////
// DOM variables //
///////////////////
const calendario=document.getElementById("calendario")
flatpickr(calendario,opciones)