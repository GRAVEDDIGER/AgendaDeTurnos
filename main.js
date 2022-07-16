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
class Paciente {
  constructor(apellido, nombre, calle, numero, cpa, telefono, dni, localidad) {
    this.apellido = apellido;
    this.nombre = nombre;
    this.telefono = telefono;
    this.direccion = 
      {
        calle: calle,
        numero: numero,
        cPostal: cpa,
        localidad: localidad
      },
    
    this.dni = dni
  }
  guardarLocal() {
    localStorage.setItem("pacientes", JSON.stringify(this));
  }
}
class generadorHoras {
  constructor(hora) {
    this[hora] = "libre";
  }
}
class Profesional {
  constructor(
    ivTurnos =0,
    inicio ="",
    fin="",
    horas=[],
    nombre,
    apellido,
    dni,
    especialidad,
    matricula,
    telefono
    
  ) {
    this.configuracionTurnos = {
      dias: {
        lunes: [
          {
            ivTurnos: ivTurnos,
            inicio: inicio,
            fin: fin,
            horas: horas,
          },
        ],
        martes: [
          {
            ivTurnos: ivTurnos,
            inicio: inicio,
            fin: fin,
            horas: horas,
          },
        ],
        miercoles: [
          {
            ivTurnos: ivTurnos,
            inicio: inicio,
            fin: fin,
            horas: horas,          },
        ],

        jueves: [
          {
            ivTurnos: ivTurnos,
            inicio: inicio,
            fin: fin,
            horas: horas,          },
        ],

        viernes: [
          {
            ivTurnos: ivTurnos,
            inicio: inicio,
            fin: fin,
            horas: horas,          },
        ],

        sabado: [
          {
            ivTurnos: ivTurnos,
            inicio: inicio,
            fin: fin,
            horas: horas,          },
        ],

        domingo: [
          {
            ivTurnos: ivTurnos,
            inicio: inicio,
            fin: fin,
            horas: horas,          },
        ],
      },
    };
    this.nombre = nombre;
    this.apellido = apellido;
    this.dni = dni;
    this.especialidad = especialidad;
    this.telefono = telefono;
    this.matricula = matricula;
  }
  guardarLocal() {
    localStorage.setItem("profesionales", JSON.stringify(profesionalObj));
  }
  generarTurnos() {
    //metodo que configura un array de objeto con los turnos del profesional
    const objetoAIterar = this.configuracionTurnos.dias;
    Object.keys(objetoAIterar).forEach((dia) => {
      // if (objetoAIterar[dia][0].horas !== []) objetoAIterar[dia][0].horas = [];
      let horaInicial, minutosIniciales, horaFinal, minutosFinales;
      let horaString,
        minString = "";

      Object.keys(objetoAIterar[dia]).forEach((horario) => {
        if (objetoAIterar[dia][horario].ivTurnos !== 0) {
          console.log(objetoAIterar[dia][horario].inicio.split(":"));
          [horaInicial, minutosIniciales] =
            objetoAIterar[dia][horario].inicio.split(":");
          [horaFinal, minutosFinales] =
            objetoAIterar[dia][horario].fin.split(":");
          let diferenciaEnMinutos =
            (new Date().setHours(horaFinal, minutosFinales) -
              new Date().setHours(horaInicial, minutosIniciales)) /
            60000;
          let min = parseInt(minutosIniciales);
          let hora = parseInt(horaInicial);
          let intervaloTurnos = parseInt(objetoAIterar[dia][horario].ivTurnos);
          let horarioProfesional=""
          for (
            let index = 0;
            index <= diferenciaEnMinutos - intervaloTurnos;
            index += intervaloTurnos
          ) {
            hora.toString().length < 2
              ? (horaString = "0" + hora.toString())
              : (horaString = hora.toString());
            min.toString().length < 2
              ? (minString = "0" + min.toString())
              : (minString = min.toString());
            let clave = `"'${horaString}:${minString}'": "libre",`//  '"' + horaString + ":" + minString + '"'+':"libre",';
            horarioProfesional +=clave;
            // objetoAIterar[dia][0].horas.push(new generadorHoras(clave));
            min += intervaloTurnos;

            if (min >= 60) {
              min -= 60;
              hora++;
            }
            console.log("String",horarioProfesional)
          }
          horarioProfesional = '{'+ horarioProfesional.substring(0,horarioProfesional.length-1)+'}'
          console.log(horarioProfesional)
          objetoAIterar[dia][0].horas=JSON.parse(horarioProfesional)
        }
      });
    });
  }
}

//////////////////////////
// VARIABLES GLOBALES   //
//////////////////////////
let arrayTabla1 = []; //ARRAY QUE REPRESENTA TODOS LOS VALORES DE LA TABLA GUARDADOS COMO ARRAY DE OBJETOS
let diaSemana = "lunes"; //VARIABLE QUE ALMACENA EL DIA DE LA SEMANA SELECCIONADO EN EL TAB BAR
let profesionalObj = [];
let pacienteObj = [];
const diaTab = document.querySelectorAll("ul .nav-item button");
let contador = 0;
// const pacientesLocal = JSON.parse(localStorage.getItem("pacientes"));
// const profesionalesLocal = JSON.parse(localStorage.getItem("profesionales"));
// if (profesionalesLocal != null) profesionalObj = profesionalesLocal;
// if (pacientesLocal != null) pacienteObj = pacientesLocal;

console.log(profesionalObj);

let opcion = 1;
let indice;

/////////////////////////////////////////////////
// funciones                                   //
/////////////////////////////////////////////////
//////////////////////////////////////////////////
// evalua que los intervalos no se supoerpongan //
//////////////////////////////////////////////////
const intervalos = (
  { inicio: itemInicio, fin: itemFin },
  { inicio: repetidosInicio, fin: repetidosFin },
  condicion
) => {
  if (
    parseInt(repetidosInicio) > parseInt(itemInicio) &&
    parseInt(repetidosInicio) < parseInt(itemFin)
  )
    condicion = true;
  if (
    parseInt(repetidosFin) > parseInt(itemInicio) &&
    parseInt(repetidosInicio) < parseInt(itemFin)
  )
    condicion = true;
  return condicion;
};

const generarPaciente = () => {
  const pacienteTransitorio = new Paciente();
  pacienteTransitorio.apellido = apellidoInput.value;
  pacienteTransitorio.nombre = nombreInput.value;
  pacienteTransitorio.dni = documentoInput.value;
  pacienteTransitorio.telefono = telefonoInput.value;
  pacienteTransitorio.direccion.calle = calleInput.value;
  pacienteTransitorio.direccion.numero = alturaInput.value;
  pacienteTransitorio.direccion.localidad = localidadInput.value;
  pacienteTransitorio.direccion.cPostal = cpaInput.value;
  return pacienteTransitorio;
};
const limpiarPaciente = () => {
  // generar un cleaner para todas las ventanas con un foreach
  const limpiar = document.querySelectorAll("input");
  console.log(limpiar);
  limpiar.forEach((element) => {
    element.value = "";
  });
};

///////////////////////////////////////
//         VALIDACIONES              //
///////////////////////////////////////

const validarDniOc = (valor, arrayObjeto) => {
  let resultado;
  if (isNaN(parseInt(valor)) || parseInt(valor) < 100000) {
    documentoInput.classList.toggle("error");
    document.getElementById("enviarPaciente").disabled = true;
    return false;
  } else {
    documentoInput.classList.remove("error");
    document.getElementById("enviarPaciente").disabled = false;
    resultado = arrayObjeto.findIndex((objeto) => {
      if (parseInt(objeto.dni) === parseInt(valor)) return valor;
    });
    return resultado;
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
