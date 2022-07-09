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
    this.apellido = [apellido];
    this.nombre = [nombre];
    this.telefono = [telefono];
    this.direccion = [
      {
        calle: calle,
        numero: numero,
        cPostal: cpa,
        localidad: localidad,
      },
    ];
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
            ivTurnos: 0,
            inicio: "",
            fin: "",
            horas: [],
          },
        ],
        martes: [
          {
            ivTurnos: 0,
            inicio: "",
            fin: "",
            horas: [],
          },
        ],
        miercoles: [
          {
            ivTurnos: 0,
            inicio: "",
            fin: "",
            horas: [],
          },
        ],

        jueves: [
          {
            ivTurnos: 0,
            inicio: "",
            fin: "",
            horas: [],
          },
        ],

        viernes: [
          {
            ivTurnos: 0,
            inicio: "",
            fin: "",
            horas: [],
          },
        ],

        sabado: [
          {
            ivTurnos: 0,
            inicio: "",
            fin: "",
            horas: [],
          },
        ],

        domingo: [
          {
            ivTurnos: 0,
            inicio: "",
            fin: "",
            horas: [],
          },
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
  guardarLocal(){
    localStorage.setItem("profesionales",JSON.stringify(profesionalObj))
  }
  generarTurnos() {
    //metodo que configura un array de objeto con los turnos del profesional
    keys(this.configuracionTurnos.dias).forEach((dia) => {
      let horaInicial,minutosIniciales,horaFinal,minutosFinales;
      let horaString,minString=""
      if (dia.length > 0) {
        keys(this.configuracionTurnos.dias[dia]).forEach((horario) => {
                  
          console.log(this.configuracionTurnos.dias[dia][horario].inicio.split(":"));
          [horaInicial,minutosIniciales] =this.configuracionTurnos.dias[dia][horario].inicio.split(":");
          [horaFinal,minutosFinales] =this.configuracionTurnos.dias[dia][horario].fin.split(":");
          let diferenciaEnMinutos =(new Date().setHours(horaFinal, minutosFinales) -new Date().setHours(horaInicial, minutosIniciales)) /60000;
          let min = parseInt(minutosIniciales);
          let hora = parseInt(horaInicial);
          let intervaloTurnos=parseInt(this.configuracionTurnos.dias[dia][horario].ivTurnos)
          for (let index = 0;index <= diferenciaEnMinutos-intervaloTurnos; index += intervaloTurnos ) {
            (hora.toString().length<2) ?  horaString="0"+hora.toString() : horaString= hora.toString();
            (min.toString().length<2) ?  minString="0"+min.toString() : minString= min.toString();
            this.configuracionTurnos.dias[dia][0].horas.push(`${horaString}:${minString}`);
            min += intervaloTurnos;
            if (min >= 60) {
              min -= 60;
              hora++;
            }
          }
        });
      }
    });
  }
};


//////////////////////////
// VARIABLES GLOBALES   //
//////////////////////////
let arrayTabla1 = []; //ARRAY QUE REPRESENTA TODOS LOS VALORES DE LA TABLA GUARDADOS COMO ARRAY DE OBJETOS
let diaSemana = "lunes"; //VARIABLE QUE ALMACENA EL DIA DE LA SEMANA SELECCIONADO EN EL TAB BAR
let profesionalObj = [];
let pacienteObj = [];
const diaTab = document.querySelectorAll("ul .nav-item button");
let contador = 0;
const pacientesLocal = JSON.parse(localStorage.getItem("pacientes"));
const profesionalesLocal=JSON.parse(localStorage.getItem("profesionales"))
if (profesionalesLocal!=null)  profesionalObj=profesionalesLocal;
if (pacientesLocal!=null)  pacienteObj=pacientesLocal;


console.log(profesionalObj)


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
  const error = document.getElementById("errInv");
  if (isNaN(parseInt(valor)) || parseInt(valor) < 100000) {
    documentoInput.classList.toggle("error");
    document.getElementById("enviarPaciente").disabled = true;
    return false;
  } else {
    documentoInput.classList.remove("error");
    document.getElementById("enviarPaciente").disabled = false;
    resultado = arrayObjeto.findIndex((objeto) => {
      if (objeto.dni === valor) return valor;
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
