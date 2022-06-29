//"use-strict"
//////////////////////////////////////////////////
// CLASES                                       //
//////////////////////////////////////////////////
const pacientesLocal = JSON.parse(localStorage.getItem("pacientes"));
let localBolean;
if (localStorage.getItem("pacientes") === undefined || localStorage.getItem("pacientes") === null) localBolean = false;
else localBolean = true;
class Paciente {
  constructor(apellido, nombre, calle, numero, cpa, telefono, dni, localidad) {
    this.apellido = [apellido];
    this.nombre = [nombre];
    this.telefono = [telefono];
    this.direccion = [{
      calle: calle,
      numero: numero,
      cPostal: cpa,
      localidad: localidad,
    }, ];
    this.dni = [dni];
  }
  guardarLocal() {
    localStorage.setItem("pacientes", JSON.stringify(this));
  }
  leerDniLocal() {
    if (localBolean) {
      pacientesLocal.dni.forEach((dni) => {
        if (this.dni[0] === undefined) this.dni[0] = dni;
        else this.dni.push(dni);
      });
    }
  }
  leerApellidoLocal() {
    if (localBolean) {
      pacientesLocal.apellido.forEach((apellido) => {
        if (this.apellido[0] === undefined) this.apellido[0] = apellido;
        else this.apellido.push(apellido);
      });
    }
  }
  leerNombreLocal() {
    if (localBolean) {
      pacientesLocal.nombre.forEach((nombre) => {
        if (this.nombre[0] === undefined) this.nombre[0] = nombre;
        else this.nombre.push(nombre);
      });
    }
  }
  leerTelefonoLocal() {
    if (localBolean) {
      pacientesLocal.telefono.forEach((telefono) => {
        if (this.telefono[0] === undefined) this.telefono[0] = telefono;
        else this.telefono.push(telefono);
      });
    }
  }
  leerDireccionLocal() {
    if (localBolean) {
      pacientesLocal.direccion.forEach((direccion) => {
        if (this.direccion[0] === undefined) this.direccion[0] = direccion;
        else this.direccion.push(direccion);
      });
    }
  }
  leerLocal() {
    if (localBolean) {
      this.leerDniLocal();
      this.leerApellidoLocal();
      this.leerNombreLocal();
      this.leerTelefonoLocal();
      this.leerDireccionLocal();
    }
  }
}
class Profesional {
  constructor(
    ivTurnos,
    nmProfesional,
    apProfesional,
    dniProfesional,
    matriculaProfesional,
    espProfesional,
    matProfesional,
    telProfesional
  ) {
    this.configuracionTurnos = {
      ivTurnos: ivTurnos,
      dias: {
        lunes: [],
        martes: [],
        miercoles: [],
        jueves: [],
        viernes: [],
        sabado: [],
        domingo: [],
      },
    };
    this.nmProfesional = nmProfesional;
    this.apProfesional = apProfesional;
    this.dniProfesional = dniProfesional;
    this.matriculaProfesional = matriculaProfesional;
    this.espProfesional = espProfesional;
    this.telProfesional = telProfesional;
    this.matProfesional = matProfesional;
  }
  generarTurnos() {
    //metodo que configura un array de objeto con los turnos del profesional
    for (let dia in this.configuracionTurnos.dias) {
      //loop que recorre los dias de la semana

      if (this.configuracionTurnos.dias[dia].length > 0) {
        //evalua si el dia de la semana recorrido tiene algun horario asignado
        for (let innerDia in this.configuracionTurnos.dias[dia]) {
          //for que recorre los horarios asignados a cada dia en particular
          const horaInicio =
            this.configuracionTurnos.dias[dia][innerDia].horaInicio.split(":");
          const horaFinal =
            this.configuracionTurnos.dias[dia][innerDia].horaFin.split(":");
          let [hi, mi] = horaInicio; // dectructuracion de los array en 4 variables de cadena
          let [hf, mf] = horaFinal;
          let intervalo = parseInt(this.configuracionTurnos.ivTurnos);
          let diferenciaHoras = new Date(
            new Date().setHours(parseInt(hf), parseInt(mf)) -
            new Date().setHours(parseInt(hi), parseInt(mi))
          ); //se parsean a entero los valores destructuradsos se generan dos dates y se restan me devuelve un date con la diferencia en ms
          let hor = parseInt(hi);
          let min = parseInt(mi);
          let horario = "";
          let maxMinutos = diferenciaHoras.valueOf() / 60000;
          for (let minutos = 0; minutos <= maxMinutos; minutos += intervalo) {
            min > 59 ? ((min = 0), hor++) : (min = min);

            horario +=
              '"' +
              (hor < 10 ? "0" + hor.toString().trim() : hor.toString().trim()) +
              ":" +
              (min < 10 ? "0" + min.toString().trim() : min.toString().trim()) +
              '"' +
              ":" +
              '"LIBRE",';
            min += intervalo;
          }
          horario = "{ " + horario.substring(0, horario.length - 1) + "}";
          this.configuracionTurnos.dias[dia].push(JSON.parse(horario));
        }
        //aca hay que generar el objeto con los turnos existentes
      }
    }
  }
}

class Horario {
  constructor(a, b) {
    this.horaInicio = a;
    this.horaFin = b;
  }
}
/////////////////////////////////////////////////
// funciones                                   //
/////////////////////////////////////////////////

const configurarProfesional = () => {
  profesionalObj.apProfesional = prompt(
    "Apellido del profesional"
  ).toUpperCase();
  profesionalObj.nmProfesional = prompt("Nombre del profesional").toUpperCase();
  profesionalObj.dniProfesional = prompt("DNI del profesional").toUpperCase();
  profesionalObj.espProfesional = prompt(
    "Especialidad del profesional"
  ).toUpperCase();
  profesionalObj.matriculaProfesional = prompt(
    "Matricula del profesional"
  ).toUpperCase();
  profesionalObj.configuracionTurnos.ivTurnos = prompt(
    "Intervalo de turnos"
  ).toUpperCase();

  let opcionSemana = 1;
  while (opcionSemana !== 0) {
    opcionSemana = prompt(`Elija la opcion deseada:
                              0 - Salir
                              1 - Lunes
                              2 - Martes
                              3 - Miercoles
                              4 - Jueves
                              5 - Viernes
                              6 - Sabado
                              7 - Domingo`);
    opcionSemana = parseInt(opcionSemana);
    isNaN(opcionSemana) || opcionSemana < 0 || opcionSemana > 7 ?
      alert("La respuesta debe ser un numero del 0 al 7") :
      definirHoras(opcionSemana);
  }
  configuracionOk
    ?
    profesionalObj.generarTurnos() :
    (alert("Hay datos mal en la configuracion del profesional"),
      configurarProfesional());
};
const configuracionOk = () => {
  //EVALUA CON TRUE SI LOS DATOS NECESARIOS PARA GENERAR TURNOS ESTAN EN EL OBJ
  const semana = profesionalObj.configuracionTurnos.dias;
  let res = false;
  for (dia in semana) {
    if (
      semana[dia].length > 1 &&
      !parseInt(profesionalObj.configuracionTurnos.ivTurnos).isNaN
    )
      res = true;
    return res;
  }
};
const validarHora = () => {
  //EVALUA SI LA EXPRESION DEVUELTA RESPONDE A HORA EN FORMATO 24 HS
  let regExHora = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
  let inicio = prompt("Hora de inicio (formato 24 hs)");
  let final = prompt("Hora de finalizacion (formato 24 hs)");
  if (regExHora.test(inicio) && regExHora.test(final)) return [inicio, final];
  else return false;
};
const definirHoras = (opcion) => {
  //GUARDA LOS HORARIOS DE INICIO Y FIN EN LOS DIAS SELECCIONADOS
  let respuesta;
  switch (opcion) {
    case 1:
      respuesta = validarHora();
      respuesta !== false ?
        profesionalObj.configuracionTurnos.dias.lunes.push(
          new Horario(respuesta[0], respuesta[1])
        ) :
        (alert("Debe ingresar la hora en formato HH:MM"), definirHoras());

      break;
    case 2:
      respuesta = validarHora();
      respuesta !== false ?
        profesionalObj.configuracionTurnos.dias.martes.push(
          new Horario(respuesta[0], respuesta[1])
        ) :
        (alert("Debe ingresar la hora en formato HH:MM"), definirHoras());
      break;
    case 3:
      respuesta = validarHora();
      respuesta !== false ?
        profesionalObj.configuracionTurnos.dias.miercoles.push(
          new Horario(respuesta[0], respuesta[1])
        ) :
        (alert("Debe ingresar la hora en formato HH:MM"), definirHoras());
      break;
    case 4:
      respuesta = validarHora();
      respuesta !== false ?
        profesionalObj.configuracionTurnos.dias.jueves.push(
          new Horario(respuesta[0], respuesta[1])
        ) :
        (alert("Debe ingresar la hora en formato HH:MM"), definirHoras());
      break;
    case 5:
      respuesta = validarHora();
      respuesta !== false ?
        profesionalObj.configuracionTurnos.dias.viernes.push(
          new Horario(respuesta[0], respuesta[1])
        ) :
        (alert("Debe ingresar la hora en formato HH:MM"), definirHoras());
      break;
    case 6:
      respuesta = validarHora();
      respuesta !== false ?
        profesionalObj.configuracionTurnos.dias.sabado.push(
          new Horario(respuesta[0], respuesta[1])
        ) :
        (alert("Debe ingresar la hora en formato HH:MM"), definirHoras());
      break;
    case 7:
      respuesta = validarHora();
      respuesta !== false ?
        profesionalObj.configuracionTurnos.dias.domingo.push(
          new Horario(respuesta[0], respuesta[1])
        ) :
        (alert("Debe ingresar la hora en formato HH:MM"), definirHoras());
      break;
  }
};
const diasAtencion = () => {
  //CARGA LOS DIAS QUE EL PROFESIONAL ATIENDE EN UN ARRAY
  let res = [];
  let numero = 1;
  const semana = profesionalObj.configuracionTurnos.dias;
  for (dia in semana) {
    if (semana[dia].length > 0) {
      res.push(numero.toString().trim() + " - " + dia + "\n");
      numero++;
    }
  }
  return res;
};
const turnosLibres = (opcion) => {
  //MUESTRA LOS TURNOS LIBRES Y PERMITE SELECCIONAR EL HORARIO. CARGA EL DNI DEL PACIENTE EN EL HORARIO
  // EL PARAMETRO OPCION ES EL DATO SELECCIONADO POR EL USUARIO DEL DIA DE SEMANA

  console.log(profesionalObj.configuracionTurnos.dias[opcion].length);
  const dia = profesionalObj.configuracionTurnos.dias[opcion];
  let libres = [];
  let numero = 1;

  for (let index = 0; index < dia.length; index++) {
    let horarios = dia[index];
    libres[0] = "0 - Salir\n";
    for (turno in horarios) {
      if (horarios[turno] == "LIBRE") {
        libres.push(numero + " - " + turno + "\n");
        numero++;
      }
    }

    console.log(libres); //NO ENTIENDO PORQUE ME PONEUN ESPACIO DESPUES DE LA COMA
  }
  let opcionWhile = 1;
  while (opcionWhile != 0) {
    opcionWhile = prompt(`Elija el turno que desea:
  
  ${libres}`);

    if (opcionWhile != 0) {
      let rta = prompt("DNI del paciente");
      const turnoSel = libres[opcionWhile]
        .substring(4, libres[opcionWhile].length - 1)
        .toString()
        .trim();
      profesionalObj.configuracionTurnos.dias[opcion][
        profesionalObj.configuracionTurnos.dias[opcion].length - 1
      ][`${turnoSel}`] = rta;
      console.log("Turno Asignado");
      opcionWhile = 0;
    }
  }
  menuPrincipal();
};
const asignarTurno = () => {
  //PERMITE SELECCIONAR EL DIA DE ATNECION DEL PROFESIONAL
  let atencion = diasAtencion(); //LLAMA A LA FUNCION DIAS Y TRAE EL ARRAY ATENCION CON LOS DIAS DEL
  // PROFESIONAL
  let opcion = 1;

  while (opcion != 0) {
    opcion = prompt(`Elija el dia de atencion:
0 - Salir
${atencion}`); //NO SE PORQUE ME DEJA DESALINEADAS LAS OPCIONES
    //EL OPERADOR TERNARIO LLAMA A LA FUNCION TURNOSLIBRES PASANDO COMO PARAMETRO EL DIA SELECCIONADO POR EL USR
    // SI LA OPCION ES 0 TERMNA EL BUCLE
    opcion != 0 ?
      turnosLibres(
        atencion[opcion - 1].substring(4, atencion[opcion - 1].length - 1)
      ) :
      (opcion = 0);
  }
};

const errDNI = () => {
  alert("DNI debe ser un numero");
  let dni = parseInt(prompt("Ingrese su DNI:"));
  if (dni.isNaN) errDNI();
  else PacienteObj.dni = dni;
};
const telefonoPaciente = (error, telefono, indice) => {
  let regexTelefono =
    /\(?[0-9]{3}[0-9]?[0-9]?\)?[-]?([0-9]{2})?[0-9]?[-]?[0-9]{2}[0-9]?[-]?[0-9]{4}/g;
  if (error) alert("ingresaste mal el numero de telefono");
  let condicion = regexTelefono.test(telefono);
  if (condicion) {
    PacienteObj.telefono[indice] = telefono;
  } else alert("Esta mal ingresado el telefono");
};
const validarDni = (item) => {
  //version optimizada de validarDni
  let documento = PacienteObj.dni;
  if (documento[0] === undefined) indice = 0;
  else {
    indice = documento.indexOf(item);
    if (indice === -1) {
      documento.push(item);
      agregarDomicilio();
      indice = documento.length - 1;
    } else alert("Ese DNI ya existe se modificaron los datos");
  }
  return indice;
};
// const validarDni = (item) => {
//   let documento;
//   let indice = 0;
//   item.isNaN ? errDNI() : (documento = PacienteObj.dni); //VRIFICA QUE LO INGRESADO SEA UN NUMERO DE LO CONTRARIO MUESTRA ERROR
//   if (documento.length > 1) {
//     //evalua repetidos si el documento tiene mas de un registro
//     indice = documento.indexOf(item);
//     if (indice == -1) {
//       documento.push(item);
//       agregarDomicilio();
//       indice = documento.length - 1;
//     } else alert("Ese DNI ya existe se modificaron los datos");
//   }
//   documento.length < 2 && documento[0] == undefined //se fija si el primer valor es undefined (ya que al definir la clase siempre me rellena el [0] como undefined)
//     ? ((documento[0] = item), (indice = 0)) //si el valor [0] es undefined entonces coloca ahi el primer valor y resetea el indice  a 0
//     : documento.length < 2 && documento[0] == item //si el valor no es undefined y es igual al que ingreso el user envia un alert y no define indice
//     ? (alert("DNI repetido"), (indice = 0))
//     : documento.length < 2
//     ? (documento.push(item),
//       agregarDomicilio(),
//       (indice = documento.length - 1)) // si hay menos de 2 valores en la bd y no se cumple el resto pushea el valor del usuarioo
//     : (documento = documento);

//   return indice; //devuelve el valor indice que se usara apara guardar el resto de los datos
// };
const agregarDomicilio = () => {
  PacienteObj.direccion.push({
    calle: "",
    numero: "",
    cPostal: "",
    localidad: "",
  });
};
const configurarPaciente = (dni) => {
  let indice;
  indice = validarDni(dni);
  // if (indice !== undefined) {
  if (indice === 0) PacienteObj.dni[0] = dni;
  PacienteObj.apellido[indice] = document.getElementById("apellido").value;
  PacienteObj.nombre[indice] = document.getElementById("apellido").value;
  telefonoPaciente(false, document.getElementById("telefono").value, indice);
  PacienteObj.direccion[indice].calle = document.getElementById("calle").value;
  PacienteObj.direccion[indice].numero =
    document.getElementById("altura").value;
  PacienteObj.direccion[indice].cPostal = document.getElementById("CPA").value;
  PacienteObj.direccion[indice].localidad =
    document.getElementById("localidad").value;

  limpiarPaciente();
};
const limpiarPaciente = () => {
  document.getElementById("apellido").value = "";
  document.getElementById("nombre").value = "";
  document.getElementById("dni").value = "";
  document.getElementById("telefono").value = "";
  document.getElementById("calle").value = "";
  document.getElementById("localidad").value = "";
  document.getElementById("altura").value = "";
  document.getElementById("CPA").value = "";
};
//////////////////////////////////////////
// LOGICA PRINCIPAL                     //
//////////////////////////////////////////

const profesionalObj = new Profesional();
let PacienteObj = new Paciente();
let opcion = 1;
let indice;

// menuPrincipal()
//////////////////////////////////////////
// OBJETOS HTML                        //
//////////////////////////////////////////

const inicio = window.addEventListener("DOMContentLoaded", (e) => {
  if (localBolean) {
    PacienteObj.leerLocal()
  }
});

const documentoInput = document.getElementById("dni");
documentoInput.addEventListener("change", (e) =>
  validarDniOc(parseInt(e.target.value))
);
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
const enviarPaciente = document.getElementById("enviarPaciente");
enviarPaciente.addEventListener("click", (e) => {
  e.preventDefault();
  const dniPaciente = document.getElementById("dni");
  if (
    validarDniOc(parseInt(documentoInput.value)) &&
    validarApellidoOc(apellidoInput.value) &&
    validarNombreOc(nombreInput.value) &&
    validarTelefonoOc(telefonoInput.value)
  ) {
    configurarPaciente(dniPaciente.value);
    PacienteObj.guardarLocal();
  } else alert("Hay datos requeridos con errores");
});

///////////////////////////////////////
//         VALIDACIONES              //
///////////////////////////////////////

const validarDniOc = (valor) => {
  const documentos = PacienteObj.dni;
  const error = document.getElementById("errInv");
  if (documentos.includes(valor.toString())) {
    //SE FIJA SI YA ESTA REGISTRADO EN EL OBJETO
    error.classList.remove("invisibleErr");
    error.classList.add("naranja");
    //aca debberia hacer un pull de datos del objeto
  } else {
    error.classList.add("invisibleErr");
    error.classList.remove("naranja");
  }
  if (isNaN(valor) || parseInt(valor) < 100000) {
    //EVALUA QUE SEA UN NUMERO
    documentoInput.classList.toggle("error");
    document.getElementById("enviarPaciente").disabled = true;
    return false;
  } else {
    documentoInput.classList.remove("error");
    document.getElementById("enviarPaciente").disabled = false;
    return true;
  }
};

const validarApellidoOc = (e) => {
  if (e.length < 3) {
    apellidoInput.classList.add("error");
    enviarPaciente.disabled = true;
    return false;
  } else {
    apellidoInput.classList.remove("error");
    enviarPaciente.disabled = false;
    return true;
  }
};
const validarNombreOc = (e) => {
  if (e.length < 3) {
    nombreInput.classList.add("error");
    enviarPaciente.disabled = true;
    return false;
  } else {
    nombreInput.classList.remove("error");
    enviarPaciente.disabled = false;
    return true;
  }
};
const validarTelefonoOc = (e) => {
  let regexTelefono =
    /\(?[0-9]{3}[0-9]?[0-9]?\)?[-]?([0-9]{2})?[0-9]?[-]?[0-9]{2}[0-9]?[-]?[0-9]{4}/g;
  if (regexTelefono.test(e)) {
    telefonoInput.classList.remove("error");
    enviarPaciente.disabled = false;
    return true;
  } else {
    telefonoInput.classList.add("error");
    enviarPaciente.disabled = true;
    return false;
  }
};
//////////////////////////////
//         modal            //
//////////////////////////////

//////////////////////////
// VARIABLES GLOBALES   //
//////////////////////////
let arrayTabla1 = []; //ARRAY QUE REPRESENTA TODOS LOS VALORES DE LA TABLA GUARDADOS COMO ARRAY DE OBJETOS
let diaSemana = "lunes"; //VARIABLE QUE ALMACENA EL DIA DE LA SEMANA SELECCIONADO EN EL TAB BAR
const diaTab = document.querySelectorAll("ul .nav-item button");
let contador = 0;

/////////////////////////////////////////
//FUNCION QUE CAPTURA DIA DE LA SEMANA //
/////////////////////////////////////////
diaTab.forEach((item) => {
  item.addEventListener("click", () => {
    let previo = document.getElementById(diaSemana);
    previo.classList.remove("active");
    item.classList.add("active");
    diaSemana = item.id;
  });
});
/////////////////////////////////////////////////////////////////////////////////
// FUNCION QUE BUSCA REGISTROS DUPLICADOS ANTES DE AGREGAR UNA FILA A LA TABLA //
/////////////////////////////////////////////////////////////////////////////////
function validarTabla(obj) {
  let condicion;
  if (arrayTabla1.length > 0) {
    arrayTabla1.forEach((item) => {
      let str1 = JSON.stringify(item);
      let str2 = JSON.stringify(obj);
      if (str1 == str2) {
        condicion = false;
      } else {
        condicion = true;
      }
    });
  } else condicion = true;
  return condicion;
}
//////////////////////////////////////////////////
//CLASE DE OBJETO CON LA CONFIGURACION DE TURNOS//
//////////////////////////////////////////////////

class Tabla1 {
  constructor(dia, inicio, fin, intervalo) {
    this.dia = dia;
    this.inicio = inicio;
    this.fin = fin;
    this.intervalo = intervalo;
  }
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

//EVENTO DELEGADO PARA QUE EL ICONO DE ELIMINAR PUEDA ELIMINAR LA FILA AL HACER CLICK
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
        const comparacion1 = JSON.stringify(arrayTabla1[item]);
        const comparacion2 = JSON.stringify(objetoSeleccionado);
        if (comparacion1 == comparacion2) {
          arrayTabla1.splice(item, 1);
          e.target.parentNode.parentNode.parentNode.removeChild(
            e.target.parentNode.parentNode
          );
          break;
        }
      }
    }
  }); // remoeve lafila dela tabla

/////////////////////////////////////////////////
//funcion que evalua superposicion  de horarios//
/////////////////////////////////////////////////

const superposicion = () => {
  let condicion = false;
  let repetidos = [];
  for (item of arrayTabla1) {
    repetidos = arrayTabla1.filter((e) => {
      if (e.dia == item.dia && JSON.stringify(e) !== JSON.stringify(item))
        return true;
    });
    console.log(repetidos);
    for (repetido of repetidos) {
      if (
        (parseInt(item.inicio) >= parseInt(repetido.inicio) &&
          parseInt(item.inicio) <= parseInt(repetido.fin)) ||
        (parseInt(item.fin) >= parseInt(repetido.inicio) &&
          parseInt(item.fin) <= parseInt(repetido.fin))
      ) {
        condicion = true;
        break;
      }
    }
  }
  return condicion;
};

const botonGuardar = document
  .getElementById("botonGuardar")
  .addEventListener("click", () => {
    if (superposicion()) {
      document
        .getElementById("superposicion")
        .classList.remove("turnoDuplicado");
    } else {
      document.querySelector("modal").classList.add("d-none");
    }
  });