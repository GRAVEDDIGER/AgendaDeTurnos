//"use-strict"


//////////////////////////////////////////////////
// CLASES                                       //
//////////////////////////////////////////////////
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

class Horario {
  constructor(a, b) {
    this.horaInicio = a;
    this.horaFin = b;
  }
}

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

      dias: {
        lunes: [{
          ivTurnos: 0,
          inicio: "",
          fin: "",
          horas: []
        }],
        martes: [{
          ivTurnos: 0,
          inicio: "",
          fin: "",
          horas: [],
        }],
        miercoles: [{
          ivTurnos: 0,
          inicio: "",
          fin: "",
          horas: [],
        }],

        jueves: [{
          ivTurnos: 0,
          inicio: "",
          fin: "",
          horas: [],
        }],

        viernes: [{
          ivTurnos: 0,
          inicio: "",
          fin: "",
          horas: [],
        }],

        sabado: [{
          ivTurnos: 0,
          inicio: "",
          fin: "",
          horas: [],
        }],

        domingo: [{
          ivTurnos: 0,
          inicio: "",
          fin: "",
          horas: [],
        }],

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

//////////////////////////
// VARIABLES GLOBALES   //
//////////////////////////
let arrayTabla1 = []; //ARRAY QUE REPRESENTA TODOS LOS VALORES DE LA TABLA GUARDADOS COMO ARRAY DE OBJETOS
let diaSemana = "lunes"; //VARIABLE QUE ALMACENA EL DIA DE LA SEMANA SELECCIONADO EN EL TAB BAR
const diaTab = document.querySelectorAll("ul .nav-item button");
let contador = 0;
const pacientesLocal = JSON.parse(localStorage.getItem("pacientes"));
let localBolean;
if (localStorage.getItem("pacientes") === undefined || localStorage.getItem("pacientes") === null) localBolean = false;
else localBolean = true;
let opcion = 1;
let indice;
let profesionalObj = new Profesional();
let PacienteObj = new Paciente();

/////////////////////////////////////////////////
// funciones                                   //
/////////////////////////////////////////////////
//////////////////////////////////////////////////
// evalua que los intervalos no se supoerpongan //
//////////////////////////////////////////////////
const intervalos = ({
  inicio: itemInicio,
  fin: itemFin
}, {
  inicio: repetidosInicio,
  fin: repetidosFin
}, condicion) => {
  if ((parseInt(repetidosInicio) > parseInt(itemInicio)) && (parseInt(repetidosInicio) < parseInt(itemFin))) condicion = true
  if ((parseInt(repetidosFin) > parseInt(itemInicio)) && (parseInt(repetidosInicio) < parseInt(itemFin))) condicion = true
  return condicion
}
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