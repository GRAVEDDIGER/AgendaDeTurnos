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

const validarHora = () => {
  //EVALUA SI LA EXPRESION DEVUELTA RESPONDE A HORA EN FORMATO 24 HS
  let regExHora = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
  let inicio = prompt("Hora de inicio (formato 24 hs)");
  let final = prompt("Hora de finalizacion (formato 24 hs)");
  if (regExHora.test(inicio) && regExHora.test(final)) return [inicio, final];
  else return false;
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
      if (str1 === str2) {
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
  }); // remoeve lafila dela tabla

/////////////////////////////////////////////////
//funcion que evalua superposicion  de horarios//
/////////////////////////////////////////////////

const superposicion = () => {
  let condicion = false;
  let repetidos = [];
  for (item of arrayTabla1) {
    repetidos = arrayTabla1.filter((e) => {
      if (e.dia === item.dia && JSON.stringify(e) !== JSON.stringify(item))
        return true;
    });
    console.log(repetidos);
    for (repetido of repetidos) {
      if (intervalos(item, repetido)) break;

    }
  }
  return condicion;
};
//////////////////////////////////////////////////
// evalua que los intervalos no se supoerpongan //
//////////////////////////////////////////////////
const intervalos = ({
  inicio: itemInicio,
  fin: itemFin
}, {
  inicio: repetidosInicio,
  fin: repetidosFin
}) => {
  let condicion = false;
  if ((parseInt(itemInicio) >= parseInt(repetidosInicio)) && (itemInicio <= parseInt(repetidosFin))) condicion = true
  if ((parseInt(itemFin) >= parseInt(repetidosInicio)) && (parseInt(itemFin) <= parseInt(repetidosFin))) condicion = true
  return condicion
}
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