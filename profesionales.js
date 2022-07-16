//////////////////////////////
//      PAGINA PROFESIONALES//
//////////////////////////////

/////////////////////////////////////////
//FUNCION QUE CAPTURA DIA DE LA SEMANA //
/////////////////////////////////////////
const elModal = new bootstrap.Modal(document.getElementById("modal1"));

document.addEventListener("DOMContentLoaded", request());

diaTab.forEach((item) => {
  item.addEventListener("click", () => {
    let previo = document.getElementById(diaSemana);
    previo.classList.remove("active");
    item.classList.add("active");
    diaSemana = item.id;
  });
});
const superposicion = () => {
  let condicion = false;
  let repetidos = [];
  tabla: for (item of arrayTabla1) {
    let saltearEach = false;
    repetidos = arrayTabla1.forEach((e) => {
      if (e.dia === item.dia && JSON.stringify(e) !== JSON.stringify(item)) {
        condicion = intervalos(item, e, condicion) && (saltearEach = true);
      }
    });
    if (saltearEach) break tabla;
  }
  return condicion;
};
/////////////////////////////////////////////////////////////////////////////////
// FUNCION QUE BUSCA REGISTROS DUPLICADOS ANTES DE AGREGAR UNA FILA A LA TABLA //
/////////////////////////////////////////////////////////////////////////////////
function validarTabla(obj) {
  let condicion;
  if (arrayTabla1.length > 0) {
    arrayTabla1.forEach((item) => {
      let str1 = JSON.stringify(item);
      let str2 = JSON.stringify(obj);
      if (str1 === str2) {
        condicion = false;
      } else {
        condicion = true;
      }
    });
  } else condicion = true;
  return condicion;
}

//BOTON QUE AGREGA LOS DATOS INGRESADOS COMO UNA ROW DE LA TABLA
const botonAgregar = document
  .getElementById("btnAgregar")
  .addEventListener("click", () => {
    document.getElementById("duplicado1").classList.add("turnoDuplicado"); //si el alerta de valor duplicado esta la elimina
    const fragmento = new DocumentFragment();
    //crea instancia de objeto con los datos de los inputs
    const objetoTabla1 = new Tabla1(
      diaSemana,
      document.querySelectorAll(".modal input")[0].value,
      document.querySelectorAll(".modal input")[1].value,
      document.querySelectorAll(".modal input")[2].value
    );
    // verifica que el nuevo valor introducido no se encuentre en la tabla antes de agregar los datos
    if (validarTabla(objetoTabla1)) {
      const templateTurnos = document.getElementById(
        "configuracionTurnos"
      ).content;
      templateTurnos.querySelectorAll("tr td")[0].textContent = diaSemana;
      templateTurnos.querySelectorAll("tr td")[1].textContent =
        objetoTabla1.inicio;
      templateTurnos.querySelectorAll("tr td")[2].textContent =
        objetoTabla1.fin;
      templateTurnos.querySelectorAll("tr td")[3].textContent =
        objetoTabla1.intervalo;
      const clon = document
        .getElementById("configuracionTurnos")

        .content.cloneNode(true);

      fragmento.appendChild(clon);
      document.querySelector("table tbody").appendChild(fragmento);
      arrayTabla1.push(objetoTabla1);

      contador++;
    } //si el valor esta dulpicado entonces enciede el alerta
    else
      document.getElementById("duplicado1").classList.remove("turnoDuplicado");
  });
const limpiarModal = () => {
  const inputModal = document.querySelectorAll(".modal input");
  inputModal.forEach((e) => {
    e.value = "";
  });
};
const botonSalir = document.getElementById("botonSalir");
const cuerpoTabla = document.querySelector("tbody");
botonSalir.addEventListener("click", (e) => {
  const remover = cuerpoTabla.querySelectorAll("td");
  remover.forEach((e) => {
    e.remove();
  });
  limpiarModal();
  arrayTabla1 = [];
});
//EVENTO DELEGADO PARA QUE EL ICONO DE ELIMINAR PUEDA ELIMINAR LA FILA AL HACER CLICK
const botonGuardar = document
  .getElementById("botonGuardar")
  .addEventListener("click", () => {
    if (superposicion()) {
      document
        .getElementById("superposicion")
        .classList.remove("turnoDuplicado");
    } else {
      elModal.hide();
    }
  });

const eliminar = document
  .querySelector("table")
  .addEventListener("click", (e) => {
    if (e.target.classList.contains("trashcan")) {
      document.getElementById("superposicion").classList.add("turnoDuplicado"); //ELIMINA EL ERROR DE SUPERPOSICION

      const objetoSeleccionado = new Tabla1(
        e.target.parentNode.parentNode.querySelectorAll("td")[0].textContent,
        e.target.parentNode.parentNode.querySelectorAll("td")[1].textContent,
        e.target.parentNode.parentNode.querySelectorAll("td")[2].textContent,
        e.target.parentNode.parentNode.querySelectorAll("td")[3].textContent
      );
      console.log(objetoSeleccionado); //OBJETO QUE CONTIENE LOS DATOS DE LA FILA SELECCIONADA

      for (item in arrayTabla1) {
        const objetoString1 = JSON.stringify(arrayTabla1[item]);
        const objetoString2 = JSON.stringify(objetoSeleccionado);
        if (objetoString1 === objetoString2) {
          arrayTabla1.splice(item, 1);
          e.target.parentNode.parentNode.parentNode.removeChild(
            e.target.parentNode.parentNode
          );
          break;
        }
      }
    }
  });
const colocarFilas = () => {
  const fragmento = new DocumentFragment();
  const templateTurnos = document.getElementById("configuracionTurnos").content;
  arrayTabla1.forEach((indice) => {
    templateTurnos.querySelectorAll("tr td")[0].textContent = indice.dia;
    templateTurnos.querySelectorAll("tr td")[1].textContent = indice.inicio;
    templateTurnos.querySelectorAll("tr td")[2].textContent = indice.fin;
    templateTurnos.querySelectorAll("tr td")[3].textContent = indice.intervalo;
  });
  const clon = templateTurnos.cloneNode(true);
  fragmento.appendChild(clon);
  document.querySelector("table tbody").appendChild(fragmento);
};
const extraerDatosProfesional = (indice) => {
  apellidoInput.value = profesionalObj[indice].apellido;
  nombreInput.value = profesionalObj[indice].nombre;
  telefonoInput.value = profesionalObj[indice].telefono;
  especialidadInput.value = profesionalObj[indice].especialidad;
  matriculaInput.value = profesionalObj[indice].matricula;
  const objetoIterar = profesionalObj[indice].configuracionTurnos.dias;
  Object.keys(objetoIterar).forEach((dia) => {
    Object.keys(objetoIterar[dia]).forEach((bandaHoraria) => {
      if (objetoIterar[dia][bandaHoraria].ivTurnos !== 0) {
        arrayTabla1.push(
          new Tabla1(
            dia,
            objetoIterar[dia][bandaHoraria].inicio,
            objetoIterar[dia][bandaHoraria].fin,
            objetoIterar[dia][bandaHoraria].ivTurnos
          )
        );
      }
    });
  });
  colocarFilas();
};
const enviarPaciente = document.getElementById("enviarPaciente");
const documentoInput = document.getElementById("dni");
documentoInput.addEventListener("change", (e) => {
  const dniDuplicado = validarDniOc(parseInt(e.target.value), profesionalObj);
  if (dniDuplicado !== -1) extraerDatosProfesional(dniDuplicado);
});
const apellidoInput = document.getElementById("apellido");
apellidoInput.addEventListener("change", (e) =>
  validarApellidoOc(e.target.value)
);

const nombreInput = document.getElementById("nombre");
nombreInput.addEventListener("change", (e) => validarNombreOc(e.target.value));

const telefonoInput = document.getElementById("telefono");
telefonoInput.addEventListener("change", (e) =>
  validarTelefonoOc(e.target.value)
);
const especialidadInput = document.getElementById("especialidad");
const matriculaInput = document.getElementById("matricula");
const generarProfesional = () => {
  const profesionalTransitorio = new Profesional();

  for (fila of arrayTabla1) {
    if (
      profesionalTransitorio.configuracionTurnos.dias[fila.dia][0].ivTurnos ===
      0
    ) {
      profesionalTransitorio.configuracionTurnos.dias[fila.dia][0].ivTurnos =
        fila.intervalo;
      profesionalTransitorio.configuracionTurnos.dias[fila.dia][0].inicio =
        fila.inicio;
      profesionalTransitorio.configuracionTurnos.dias[fila.dia][0].fin =
        fila.fin;
    } else {
      profesionalTransitorio.configuracionTurnos.dias[fila.dia].push({
        ivTurnos: fila.intervalo,
        inicio: fila.inicio,
        fin: fila.fin,
        horas: [],
      });
    }
  }
  profesionalTransitorio.apellido = apellidoInput.value;
  profesionalTransitorio.dni = documentoInput.value;
  profesionalTransitorio.nombre = nombreInput.value;
  profesionalTransitorio.especialidad = especialidadInput.value;
  profesionalTransitorio.telefono = telefonoInput.value;
  profesionalTransitorio.matricula = matriculaInput.value;

  return profesionalTransitorio;
};
const enviarProfesional = document
  .getElementById("enviarPaciente")
  .addEventListener("click", (e) => {
    const profesionalTransitorio = generarProfesional();
    const validacionDni = validarDniOc(
      parseInt(documentoInput.value),
      profesionalObj
    );
    switch (validacionDni) {
      case -1:
        profesionalObj.push(profesionalTransitorio);
        const ultimo = profesionalObj.length - 1;
        profesionalObj[ultimo].generarTurnos();
        break;

      case false:
        swal({
          title: "Error!",
          text: "No es un DNI valido!",
          icon: "error",
        });
        break;
      default:
        profesionalObj[validacionDni] = profesionalTransitorio;
        profesionalObj[profesionalObj.length - 1].generarTurnos();
        break;
    }

    localStorage.setItem("profesionales", JSON.stringify(profesionalObj));
    limpiarPaciente();
  });
const sheetId = "1KyAFa81gbNh3ts3UaNKVE-_vFz2tPwymtVe2Vea_Lgs";

const escribirSheet = async () => {
  axios();
};
