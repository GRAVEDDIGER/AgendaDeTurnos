///////////////////////
//VARIABLES GENERALES//
///////////////////////

profesionalObjetoRequest =async function (){return await profesionalRequest();}
profesionalObjetoRequest().then(response=> profesionalObjeto=response)
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
const validable=[domApellidoProfesional,domNombreProfesional,domTelefonoProfesional]

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
/////////////////////////
//EVENT LISTENERS MODAL//
/////////////////////////
botonAgregar.addEventListener("click", () => {
  document.getElementById("duplicado1").classList.add("turnoDuplicado"); //si el alerta de valor duplicado esta la elimina
  const fragmento = new DocumentFragment();
  //crea instancia de objeto con los datos de los inputs
  const objetoTabla = ModificarTurnoModal.crearObjetoTabla();

  if (Validaciones.validarTabla(objetoTabla)) {
    //verifica
    ModificarTurnoModal.crearTemplateTabla(objetoTabla);
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

botonSalir.addEventListener("click", (e) => {
  const remover = cuerpoTabla.querySelectorAll("td");
  remover.forEach((e) => {
    e.remove();
  });
  limpiarModal();
  arrayTabla = [];
});

const eliminar = document
  .querySelector("table")
  .addEventListener("click", (e) => {
    if (e.target.classList.contains("trashcan")) {
      document.getElementById("superposicion").classList.add("turnoDuplicado"); //ELIMINA EL ERROR DE SUPERPOSICION

      const objetoSeleccionado = ModificarTurnoModal.crearObjetoEliminar(e);
      arrayTabla.forEach((item) => {
        if (OtrasFunciones.compararObjetos(item, objetoSeleccionado)) {
          arrayTabla.splice(item, 1);
          e.target.parentNode.parentNode.parentNode.removeChild(
            e.target.parentNode.parentNode
          );
        }
      });
    }
  });

//////////////////
//BOTON GUARDAR //
//////////////////
const botonGuardar = document
  .getElementById("botonGuardar")
  .addEventListener("click", () => {
    if (Validaciones.superposicion()) {
      document
        .getElementById("superposicion")
        .classList.remove("turnoDuplicado");
    } else {
      elModal.hide();
    }
  });


  ///////////////////////////////
  // EVENT LISTENERS PRINCIPAL //
  ///////////////////////////////

  domDniProfesional.addEventListener("change",e=>{
    const indice = Validaciones.validarDniOc(e.target,profesionalObjeto,botonEnviarProfesional)
    if (indice !==-1) Profesional2.extraerDatosProfesional(indice,validable,botonEnviarProfesional);
  });

  domNombreProfesional.addEventListener("change",e=>Validaciones.validarNombreOc(e.target,botonEnviarProfesional));
  domApellidoProfesional.addEventListener("change",e=>Validaciones.validarApellidoOc(e.target,botonEnviarProfesional));
  domTelefonoProfesional.addEventListener("change",e=> Validaciones.validarTelefonoOc(e.target,botonEnviarProfesional))

  botonEnviarProfesional.addEventListener("click",()=>{
    const profesionalTransitorio=FabricaDeObjetos.generarProfesional();
    const validacionDni =Validaciones.validarDniOc(domDniProfesional,profesionalObjeto,botonEnviarProfesional);
    if (validacionDni) {
      if (Validaciones.validarTodo(validable,botonEnviarProfesional)) {
        if (validacionDni === -1) {
          profesionalObjeto =[...profesionalObjeto,profesionalTransitorio];
          const ultimo = profesionalObjeto.length - 1;
          profesionalObjeto[ultimo].generarTurnos();
          profesionalObjeto[ultimo].guardarLocal();
        }else {
          profesionalObjeto[validacionDni] =profesionalTransitorio;
          profesionalObjeto[validacionDni].generarTurnos();
          profesionalObjeto[validacionDni].guardarLocal();
        }
      }else { 
        swal({title:"Error!",text:"Hay datos que no pasan la validacion",icon:"error",})
      }
    }else {
      swal({
        title: "Error!",
        text: "No es un DNI valido!",
        icon: "error",
      });
    }
    OtrasFunciones.limpiarInputs();
    OtrasFunciones.limpiarModal();
  })
