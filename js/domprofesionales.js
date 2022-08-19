///////////////////////
//VARIABLES GENERALES//
///////////////////////
profesionalObjeto = await profesionalRequest();

////////////////////////
//    VARIABLES DOM   //
////////////////////////

const domApellidoProfesional = document.getElementById("apellidoProfesional");
const domNombreProfesional = document.getElementById("nombreProfesional");
const domDniProfesional = document.getElementById("dniProfesional");
const domTelefonoProfesional = document.getElementById("telefonoProfesional");
const domEspecialidadProfesional = document.getElementById(
  "especialidadProfesional"
);
const domMatriculaProfesional = document.getElementById("matriculaProfesional");
const diaTab = document.querySelectorAll("ul .nav-item button");
const botonEnviarProfesional = document.getElementById("enviarProfesional");
const configurarProfesional = document.getElementById("configurarAgenda");

//////////////////////
//       MODAL      //
//////////////////////

const botonAgregar = document.getElementById("btnAgregar");
const elModal = new bootstrap.Modal(document.getElementById("modal1"));
const nodeListInputs = document.querySelectorAll(".modal input"); //REPRESENTA EL MODAL DE LA PAGINA PARA PODERLO DESAPARECER CON CODIGO
const botonSalir = document.getElementById("botonSalir");
const cuerpoTabla = document.querySelector("tbody");
///////////////////////
//EVENT LISTENERS    //
///////////////////////
diaTab.forEach((item) => {
  item.addEventListener("click", () => {
    let previo = document.getElementById(diaSemana);
    previo.classList.remove("active");
    item.classList.add("active");
    diaSemana = item.id;
  });
});

botonAgregar.addEventListener("click", () => {
  document.getElementById("duplicado1").classList.add("turnoDuplicado"); //si el alerta de valor duplicado esta la elimina
  const fragmento = new DocumentFragment();
  //crea instancia de objeto con los datos de los inputs
  const objetoTabla = AgregarTurnoModal.crearObjetoTabla();

  if (Validaciones.validarTabla(objetoTabla)) {
    //verifica
AgregarTurnoModal.crearTemplateTabla(objetoTabla);
    const clon = document
      .getElementById("configuracionTurnos")
      .content.cloneNode(true);
    fragmento.appendChild(clon);
    //SE HACE APPENDCHILD DEL FRAGMENTO A LA TABLA
    document.querySelector("table tbody").appendChild(fragmento);
    arrayTabla.push(objetoTabla);
    //contador++;
  } else
    document.getElementById("duplicado1").classList.remove("turnoDuplicado");
});
////////////////////////////////////////////
//AL HACER CLICK EN SALIR ELIMINA LOS DATOS
//DE LA TABLA Y LLAMA A LIMPIARMODAL()
// LUEGO CIERRA EL MODAL
////////////////////////////////////////////
botonSalir.addEventListener("click", (e) => {
  const remover = cuerpoTabla.querySelectorAll("td");
  remover.forEach((e) => {
    e.remove();
  });
  limpiarModal();
  arrayTabla1 = [];
});

