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
    },];
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
let profesionalObj = [];
let pacienteObj =[];
const diaTab = document.querySelectorAll("ul .nav-item button");
let contador = 0;
const pacientesLocal = JSON.parse(localStorage.getItem("pacientes"));
let localBolean;
if (localStorage.getItem("pacientes") === undefined || localStorage.getItem("pacientes") === null) localBolean = false;
else localBolean = true;
if (localStorage.getItem("profesionales") !== undefined || localStorage.getItem("profesionales") !== null) profesionalObj= JSON.parse(localStorage.getItem("profesionales"))
let opcion = 1;
let indice;


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

// const configurarPaciente = (dni) => {
//   let indice;
//   indice = validarDni(dni);
//   if (indice === 0) pacienteObj.dni[0] = dni;
//   pacienteObj.apellido[indice] = document.getElementById("apellido").value;
//   pacienteObj.nombre[indice] = document.getElementById("apellido").value;
//   telefonoPaciente(false, document.getElementById("telefono").value, indice);
//   pacienteObj.direccion[indice].calle = document.getElementById("calle").value;
//   pacienteObj.direccion[indice].numero =
//     document.getElementById("altura").value;
//   pacienteObj.direccion[indice].cPostal = document.getElementById("CPA").value;
//   pacienteObj.direccion[indice].localidad =
//     document.getElementById("localidad").value;


// limpiarPaciente();
// };
const generarPaciente=()=>{
  const pacienteTransitorio =new Paciente
  pacienteTransitorio.apellido=apellidoInput.value
  pacienteTransitorio.nombre=nombreInput.value
  pacienteTransitorio.dni=documentoInput.value
  pacienteTransitorio.telefono=telefonoInput.value
  pacienteTransitorio.direccion.calle=calleInput.value
  pacienteTransitorio.direccion.numero =alturaInput.value
  pacienteTransitorio.direccion.localidad=localidadInput.value
  pacienteTransitorio.direccion.cPostal=cpaInput.value 
  return pacienteTransitorio
}
const limpiarPaciente = () => { // generar un cleaner para todas las ventanas con un foreach 
  const limpiar = document.querySelectorAll("input")
console.log(limpiar)
limpiar.forEach(element =>{
  element.value=""
})

};


///////////////////////////////////////
//         VALIDACIONES              //
///////////////////////////////////////

const validarDniOc = (valor, arrayObjeto) => {
let resultado;
  const error = document.getElementById("errInv");
  if (isNaN(parseInt(valor)) || parseInt(valor) < 100000) {
    documentoInput.classList.toggle("error");
    document.getElementById("enviarPaciente").disabled = true;
    return false
  } else {
    documentoInput.classList.remove("error");
    document.getElementById("enviarPaciente").disabled = false;
    resultado= arrayObjeto.findIndex(objeto => {
      if (objeto.dniProfesional === valor) return valor
    })
    return resultado

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