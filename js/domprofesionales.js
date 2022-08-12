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
const domEspecialidadProfesional = document.getElementById("especialidadProfesional");
const domMatriculaProfesional = document.getElementById("matriculaProfesional");
const diaTab = document.querySelectorAll("ul .nav-item button");
const botonEnviarProfesional = document.getElementById("enviarProfesional");
const configurarProfesional = document.getElementById("configurarAgenda");

//////////////////////
//       MODAL      //
//////////////////////

const botonAgregar = document.getElementById("btnAgregar")
const elModal = new bootstrap.Modal(document.getElementById("modal1"));
const nodeListInputs = document.querySelectorAll(".modal input") //REPRESENTA EL MODAL DE LA PAGINA PARA PODERLO DESAPARECER CON CODIGO