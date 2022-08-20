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
///////////////////////////////
// CLASE DEL OBJETO PACIENTE //
///////////////////////////////
class Paciente {
  constructor(apellido, nombre, calle, numero, cpa, telefono, dni, localidad) {
    this.apellido = apellido;
    this.nombre = nombre;
    this.telefono = telefono;
    (this.direccion = {
      calle: calle,
      numero: numero,
      cPostal: cpa,
      localidad: localidad,
    }),
    (this.dni = dni);
  }


  guardarLocal() {
    localStorage.setItem("pacientes", JSON.stringify(pacienteObj));
  }
  //FUNCIONES DE ITERACION
  *[Symbol.iterator]() {
    const claves = Object.keys(this);
    let valores = []
    claves.forEach(e => {
      valores.push(this[e])
    })

    for (let i = 1; i < valores.length; i++) {
      yield valores[i];
    }
  }
  porCada(callback) {
    let item;
    for (item of this) {
      if (typeof item !== 'function') callback(item)
    }
  }
  porClave(callback) {
    let clave;
    for (clave in this) {
      const valor = this[clave]
      if (typeof valor !== 'function')
        if (clave !== "undefined") callback(clave, this[clave])
    }
  }
}
///////////////////////////////////////////////////////////////////////////////
// OBJETO CONFIGURACIONTURNOS QUE SE ENCUENTRA DENTRO DEL OBJETO PROFESIONAL //
///////////////////////////////////////////////////////////////////////////////
class ConfiguracionTurnos {
  constructor(ivTurnos, inicio, fin, turnos) {
    this.turnos = new Turnos()
    this.dias = new Semana(ivTurnos, inicio, fin)
  }
  /////////////////////////////////////////
  //FUNCION GENERADORA EN SYMBOL.ITERATOR//
  /////////////////////////////////////////
  [Symbol.iterator] = function* () {
    const claves = Object.keys(this);
    let valores = []
    claves.forEach(e => {
      valores.push(this[e])
    })

    for (let i = 1; i < valores.length; i++) {
      yield valores[i];
    }
  }
  addProperty = (propiedad, valor) => {
    this[propiedad] = valor
  }
  ///////////////////////////////////////////////////////
  //FUNCION SIMILAR AL FOREACH SIN USO LA VOY A REMOVER//
  ///////////////////////////////////////////////////////
  porCada = (callback) => {
    let item;
    for (item of this) {
      if (typeof item !== 'function') callback(item)
    }
  }
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //FUNCION SIMILAR A FOREACH QUE ITERA POR CLAVES Y DEVUELVE EN CALLBACK UNA VARIABLE QUE MUESTRA LA CLAVE Y OTRA EL VALOR//
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  porClave = (callback) => {
    let clave;
    for (clave in this) {
      const valor = this[clave]
      if (typeof valor !== 'function')
        if (clave !== "undefined") callback(clave, this[clave])
    }
  }
}
/////////////////////////////////////////////////////////////////
//OBJETO TURNOS QUE SE ENCUENTRA DENTRO DE CONFIGURACION TURNOS//
/////////////////////////////////////////////////////////////////
class Turnos {
  constructor() {}
    [Symbol.iterator] = function* () {
      const claves = Object.keys(this);
      let valores = []
      claves.forEach(e => {
        valores.push(this[e])
      })

      for (let i = 1; i < valores.length; i++) {
        yield valores[i];
      }
    }
  addProperty = (propiedad, valor) => {
    this[propiedad] = valor
  }
  porCada = (callback) => {
    let item;
    for (item of this) {
      if (typeof item !== 'function') callback(item)
    }
  }
  porClave = (callback) => {
    let clave;
    for (clave in this) {
      const valor = this[clave]
      if (typeof valor !== 'function')
        if (clave !== "undefined") callback(clave, this[clave])
    }
  }
}

/////////////////////////////////////////////////////////////////
//OBJETO SEMANA QUE SE ENCUENTRA DENTRO DE CONFIGURACION TURNOS//
/////////////////////////////////////////////////////////////////


class Semana {
  constructor(ivTurnos, inicio, fin) {
      this.lunes = []
      this.martes = []
      this.miercoles = []
      this.jueves = []
      this.viernes = []
      this.sabado = []
      this.domingo = []

    }
    [Symbol.iterator] = function* () {
      const claves = Object.keys(this);
      let valores = []
      claves.forEach(e => {
        valores.push(this[e])
      })

      for (let i = 1; i < valores.length; i++) {
        yield valores[i];
      }
    }
  addProperty = (propiedad, valor) => {
    this[propiedad] = valor
  }
  porCada = (callback) => {
    let item;
    for (item of this) {
      if (typeof item !== 'function') callback(item)
    }
  }
  porClave = (callback) => {
    let clave;
    for (clave in this) {
      const valor = this[clave]
      if (typeof valor !== 'function')
        if (clave !== "undefined") callback(clave, this[clave])
    }
  }
}
/////////////////////////////////////////////////
//OBJETO DIA QUE SE ENCUENTRA DENTRO DE SEMANA //
/////////////////////////////////////////////////

class Dia {
  constructor(ivTurnos, inicio, fin) {
      this.ivTurnos = ivTurnos
      this.inicio = inicio
      this.fin = fin
    }
    [Symbol.iterator] = function* () {
      const claves = Object.keys(this);
      let valores = []
      claves.forEach(e => {
        valores.push(this[e])
      })

      for (let i = 1; i < valores.length; i++) {
        yield valores[i];
      }
    }
  porCada = (callback) => {
    let item;
    for (item of this) {
      if (typeof item !== 'function') callback(item)
    }
  }
  porClave = (callback) => {
    let clave;
    for (clave in this) {
      const valor = this[clave]
      if (typeof valor !== 'function')
        if (clave !== "undefined") callback(clave, this[clave])
    }
  }
}
/////////////////////////////////////////////////////////////////
//OBJETO QUE SE USA PARA PASAR LOS DATOS DEL LISTADO DE TURNOS //
/////////////////////////////////////////////////////////////////
class ListadoDeTurnos {
  constructor(hora, minutos, dni) {
    this.hora = hora
    this.minutos = minutos
    this.dni = dni

  }
}

/////////////////////////////////////////////////////////////////////////////////////////////
//OBJETO ANO QUE SE UBICA DENTRO DEL OBJETO TURNOS REPRESENTA A TODOS LOS TURNOS DE ESE AÑO//
/////////////////////////////////////////////////////////////////////////////////////////////
class Ano {
  constructor() {


  }
  addProperty = (propiedad, valor) => {
      this[propiedad] = valor
    }
    [Symbol.iterator] = function* () {
      const claves = Object.keys(this);
      let valores = []
      claves.forEach(e => {
        valores.push(this[e])
      })

      for (let i = 1; i < valores.length; i++) {
        yield valores[i];
      }
    }
  porCada = (callback) => {
    let item;
    for (item of this) {
      if (typeof item !== 'function') callback(item)
    }
  }
  porClave = (callback) => {
    let clave;
    for (clave in this) {
      const valor = this[clave]
      if (typeof valor !== 'function')
        if (clave !== "undefined") callback(clave, this[clave])
    }
  }
}
/////////////////////////////////////////////////////////////////////////////////////////////
//OBJETO MES QUE SE UBICA DENTRO DEL OBJETO ANO REPRESENTA A TODOS LOS TURNOS DE ESE MES//
/////////////////////////////////////////////////////////////////////////////////////////////
class Mes {
  constructor() {


  }
  addProperty = (propiedad, valor) => {
    this[propiedad] = valor
  }
  // addObject = (objeto) => {
  //   this=objeto    
  // }
  [Symbol.iterator] = function* () {
    const claves = Object.keys(this);
    let valores = []
    claves.forEach(e => {
      valores.push(this[e])
    })

    for (let i = 1; i < valores.length; i++) {
      yield valores[i];
    }
  }
  porCada = (callback) => {
    let item;
    for (item of this) {
      if (typeof item !== 'function') callback(item)
    }
  }
  porClave = (callback) => {
    let clave;
    for (clave in this) {
      const valor = this[clave]
      if (typeof valor !== 'function')
        if (clave !== "undefined") callback(clave, this[clave])
    }
  }
}
//////////////////////////////////////////////////////////////////////////////////////////
//OBJETO DIA QUE SE UBICA DENTRO DEL OBJETO MES REPRESENTA A TODOS LOS TURNOS DE ESE DIA//
//////////////////////////////////////////////////////////////////////////////////////////
class DiaTurno {
  constructor(dia, valor) {
      this[dia] = valor

    }
    [Symbol.iterator] = function* () {
      const claves = Object.keys(this);
      let valores = []
      claves.forEach(e => {
        valores.push(this[e])
      })

      for (let i = 1; i < valores.length; i++) {
        yield valores[i];
      }
    }
  addProperty = (propiedad, valor) => {
    this[propiedad] = valor
  }
  porCada = (callback) => {
    let item;
    for (item of this) {
      if (typeof item !== 'function') callback(item)
    }
  }
  porClave = (callback) => {
    let clave;
    for (clave in this) {
      const valor = this[clave]
      if (typeof valor !== 'function')
        if (clave !== "undefined") callback(clave, this[clave])
    }
  }
}
/////////////////////////////////////////////////////////////////////////////////////////////////
//OBJETO HORATURNO QUE SE UBICA DENTRO DEL OBJETO DIA REPRESENTA A TODOS LOS TURNOS DE ESA HORA//
/////////////////////////////////////////////////////////////////////////////////////////////////
class HoraTurno {
  constructor() {


  }
  addProperty = (propiedad, valor) => {
      this[propiedad] = valor
    }
    [Symbol.iterator] = function* () {
      const claves = Object.keys(this);
      let valores = []
      claves.forEach(e => {
        valores.push(this[e])
      })

      for (let i = 1; i < valores.length; i++) {
        yield valores[i];
      }
    }
  porCada = (callback) => {
    let item;
    for (item of this) {
      if (typeof item !== 'function') callback(item)
    }
  }
  porClave = (callback) => {
    let clave;
    for (clave in this) {
      const valor = this[clave]
      if (typeof valor !== 'function')
        if (clave !== "undefined") callback(clave, this[clave])
    }
  }
}
///////////////////////////////////////////////////////////////////////////////////////////
//OBJETO MINUTOS QUE SE UBICA DENTRO DEL HORAS TURNOS REPRESENTA AL TURNO DE ESE HORARIO //
///////////////////////////////////////////////////////////////////////////////////////////
class Minutos {
  constructor() {}
  addProperty = (propiedad, valor) => {
      this[propiedad] = valor
    }
    [Symbol.iterator] = function* () {
      const claves = Object.keys(this);
      let valores = []
      claves.forEach(e => {
        valores.push(this[e])
      })

      for (let i = 1; i < valores.length; i++) {
        yield valores[i];
      }
    }
  porCada = (callback) => {
    let item;
    for (item of this) {
      if (typeof item !== 'function') callback(item)
    }
  }
  porClave = (callback) => {
    let clave;
    for (clave in this) {
      const valor = this[clave]
      if (typeof valor !== 'function')
        if (clave !== "undefined") callback(clave, this[clave])
    }
  }
}
class generadorHoras {
  constructor(hora) {
    this[hora] = "libre";
  }
}

//////////////////////////////////////////////////////////////////////////////////////////////////
//OBJETO PROFESIONAL CONTIENE TODOS LOS DATOS DEL PROFESIONAL, LA CONFIGURACION DE LA TURNERA Y //
//LOS TURNOS GENERADOS
//////////////////////////////////////////////////////////////////////////////////////////////////

class Profesional {
  constructor(
    ivTurnos = 0,
    inicio = "",
    fin = "",
    nombre,
    apellido,
    dni,
    especialidad,
    matricula,
    telefono,
    turnos = {}
  ) {
    this.configuracionTurnos = new ConfiguracionTurnos(ivTurnos, inicio, fin, turnos)
    this.nombre = nombre;
    this.apellido = apellido;
    this.dni = dni;
    this.especialidad = especialidad;
    this.telefono = telefono;
    this.matricula = matricula;
  }
  //FUNCION QUE GUARDA EN LOCALSTORAGE AL ARRAYDEOBJETOS PROFESIONALOBJ
  guardarLocal() {
      localStorage.setItem("profesionales", JSON.stringify(profesionalObj));
    }
    [Symbol.iterator] = function* () {
      const claves = Object.keys(this);
      let valores = []
      claves.forEach(e => {
        valores.push(this[e])
      })

      for (let i = 1; i < valores.length; i++) {
        yield valores[i];
      }
    }
  porCada = (callback) => {
    let item;
    for (item of this) {
      if (typeof item !== 'function') callback(item)
    }
  }
  porClave = (callback) => {
    let clave;
    for (clave in this) {
      const valor = this[clave]
      if (typeof valor !== 'function')
        if (clave !== "undefined") callback(clave, this[clave])
    }
  }

  ///////////////////////////////////////////////////////////////////////////////
  //METODO QUE GENERA EL ARBOL DE TURNOS DENTRO DE CONFIGURACIONTURNOS.TURNOS //
  //FALTA OPTIMIZAR USANDO LOS ITERADORES
  ///////////////////////////////////////////////////////////////////////////////
  generarTurnos = () => {
    //metodo que configura un array de objeto con los turnos del profesional
    const objetoAIterar = this.configuracionTurnos.dias;
    objetoAIterar.porClave((diaClave, diaObjeto) => {
      let horaInicial, minutosIniciales, horaFinal, minutosFinales;
      if (diaObjeto.length > 0) {
        diaObjeto.forEach((horario) => {
          if (horario.ivTurnos !== 0) {
            [horaInicial, minutosIniciales] =
            horario.inicio.split(":");
            [horaFinal, minutosFinales] =
            horario.fin.split(":");
            let diferenciaEnMinutos =
              (new Date().setHours(horaFinal, minutosFinales) -
                new Date().setHours(horaInicial, minutosIniciales)) /
              60000;
            let min = parseInt(minutosIniciales);
            let hora = parseInt(horaInicial);
            let intervaloTurnos = parseInt(horario.ivTurnos);
            let horarioProfesional = "";
            let objetoSalida = new HoraTurno();
            objetoSalida = gererarObjetoDeSalida(diferenciaEnMinutos, intervaloTurnos, hora, min);
            const diasActivosProfesional = diasDelMes(diaClave)
            diasActivosProfesional.forEach(dia => {
              completarArbolDeTurnos(dia, objetoSalida, this)
            })

          }
        })
      }
    })
  }
}

//////////////////////////
// VARIABLES GLOBALES   //
//////////////////////////
let arrayTabla1 = []; //ARRAY QUE REPRESENTA TODOS LOS VALORES DE LA TABLA GUARDADOS COMO ARRAY DE OBJETOS
let diaSemana = "lunes"; //VARIABLE QUE ALMACENA EL DIA DE LA SEMANA SELECCIONADO EN EL TAB BAR
let profesionalObj = [];
let pacienteObj = [];
let mapPacientes = {};

const diaTab = document.querySelectorAll("ul .nav-item button");
let contador = 0;
const ObjetoDiaSemana = {
  0: "domingo",
  1: "lunes",
  2: "martes",
  3: "miercoles",
  4: "jueves",
  5: "viernes",
  6: "sabado"
};
let opcion = 1;
let indice;

/////////////////////////////////////////////////
// funciones                                   //
/////////////////////////////////////////////////
const pacientesRequest = async () => {
  let respuestaPacientes = {
    data: []
  };
  if (localStorage.getItem("pacientes")) {
    respuestaPacientes.data = JSON.parse(localStorage.getItem("pacientes"))
  } else {
    //resultadoPacientes = await axios("../paciente.json");
    respuestaPacientes = await axios("../paciente.json");
    //respuestaPacientes = await resultadoPacientes;
  }
  respuestaPacientes.data.forEach((e, i, a) => {
    pacienteObj[i] = new Paciente(
      e.apellido,
      e.nombre,
      e.direccion.calle,
      e.direccion.numero,
      e.direccion.cPostal,
      e.telefono,
      e.dni,
      e.direccion.localidad
    );
  })
}

const gererarObjetoDeSalida = (diferenciaEnMinutos, intervaloTurnos, hora, min) => {
  let objetoSalida = new HoraTurno();

  //
  for (
    let index = 0; index <= diferenciaEnMinutos - intervaloTurnos; index += intervaloTurnos
  ) {

    let horaString = "h" + hora.toString()
    let minutosString = "m" + min.toString()
    if (objetoSalida[horaString] === undefined) objetoSalida.addProperty(horaString, new Minutos())
    if (objetoSalida[horaString][minutosString] === undefined) objetoSalida[horaString].addProperty(minutosString, "libre")

    min += intervaloTurnos;

    if (min >= 60) {
      min -= 60;
      hora++;
    }
  }
  return objetoSalida
}
//////////////////////////////////////
const completarArbolDeTurnos = (dia, objetoSalida, objeto) => {
  const diaDelMes = "d" + new Date(dia).getDate().toString();
  const mes = "m" + new Date(dia).getMonth().toString();
  const ano = "a" + new Date(dia).getFullYear().toString();
  if (objeto.configuracionTurnos.turnos[ano] === undefined)
    objeto.configuracionTurnos.turnos.addProperty(ano, new Ano());
  if (objeto.configuracionTurnos.turnos[ano][mes] === undefined)
    objeto.configuracionTurnos.turnos[ano].addProperty(mes, new Mes());
  if (objeto.configuracionTurnos.turnos[ano][mes][diaDelMes] === undefined) {
    objeto.configuracionTurnos.turnos[ano][mes].addProperty(diaDelMes, new DiaTurno());
    objeto.configuracionTurnos.turnos[ano][mes].addProperty(diaDelMes, objetoSalida)
  }
}
// const crearArbolDeTurnos = (respuestaObjeto, profesionalObjeto, i) => {
//   Object.keys(respuestaObjeto).forEach(ano => {
//     profesionalObjeto[ano] = new Ano()
//     Object.keys(respuestaObjeto[ano]).forEach(mes => {
//       profesionalObjeto[ano][mes] = new Mes()
//       // AQUI SE ITERA SOBRE CADA OBJETO DIA, CREOA EL OBJETO DIATURNO LUEGO ITERA SOBRE EL DIA Y SOBRE LAS HORAS 
//       Object.keys(respuestaObjeto[ano][mes]).forEach(dia => {
//         profesionalObjeto[ano][mes][dia] = new DiaTurno();
//         Object.keys(respuestaObjeto[ano][mes][dia]).forEach(hora => {
//           profesionalObjeto[ano][mes][dia][hora] = new HoraTurno()
//           Object.keys(respuestaObjeto[ano][mes][dia][hora]).forEach(minutos => {
//             //AQUI PASA LOS TURNOS QUE SE ENCUENTRAN EN EL RESPONSE DIA.HORA AL OBJETO PROFESIONALOBJ
//             profesionalObjeto[ano][mes][dia][hora][minutos] = respuestaObjeto[ano][mes][dia][hora][minutos]

//           })
//         })
//       })

//     })
//   })
// }
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//FUNCION QUE RECIBE UNA CADENA CON EL DIA DE LA SEMANA Y DEVUELVE UN ARRAY DE OBJETOS DATE DE LOS DIAS DEL MES QUE CUMPEN CON EL STRING//
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const diasDelMes = (diaLetras) => {

  let ano = new Date().getFullYear();
  let mes = new Date().getMonth();
  let dia = new Date().getDate();
  let resultado = []
  for (let index = 0; index < 3; index++) {
    const diasDelMesActual = new Date(ano, mes + 1, 0).getDate();
    for (dia; dia < diasDelMesActual; dia++) {
      const condicion = new Date(ano, mes, dia).getDay();
      if (ObjetoDiaSemana[condicion] === diaLetras) {
        resultado.push(new Date(ano, mes, dia));
      }

    }
    mes++;
    dia = 1
  }
  return resultado;
}
///////////////////////////////////////////////////////////////////////////////////////////////
//FUNCION QUE HACE UN GET A UN JSON Y OBTIENE LOS DATOS DE LOS PROFESIONALES Y LOS PACIENTES //
//LUEGO ARMA LOS OBJETOS SEGUN SU ESTRUCTURA ORIGNIAL 
const request = async () => {
  let respuestaProfesionales = {
    data: []
  };
  if (localStorage.getItem("profesionales")) {
    respuestaProfesionales.data = JSON.parse(localStorage.getItem("profesionales"));
  } else {
    resultadoProfesionales = await axios("../datos.json");
    //console.log(resultadoProfesionales.data);

    respuestaProfesionales = await resultadoProfesionales;
  }
  respuestaProfesionales.data.forEach((e, i, a) => {
    profesionalObj[i] = new Profesional();
    profesionalObj[i].nombre = e.nombre
    profesionalObj[i].apellido = e.apellido
    profesionalObj[i].dni = e.dni
    profesionalObj[i].especialidad = e.especialidad
    profesionalObj[i].matricula = e.matricula
    profesionalObj[i].telefono = e.telefono;
    profesionalObj[i].configuracionTurnos = new ConfiguracionTurnos();
    profesionalObj[i].configuracionTurnos.dias = new Semana()
    //ESTE FOR ENTRA EN EL OBJETO PROFESIONAL.CONFIGURACIONTURNOS.DIAS E ITERA EN LOS DIAS DE LA SEMANA
    // ITEM REPRESENTA A LA CLAVE DEL DIA DE LA SEMANA, LOS CONDICIONALES EVITAN LOS METODOS DEFINIDAS POR MI EN EL OBJETO
    const objetoDias = profesionalObj[i].configuracionTurnos.dias
    const respuestaDias = e.configuracionTurnos.dias
    objetoDias.porClave((diaClave, diaObjeto) => {
      respuestaDias[diaClave].forEach(horario => {
        diaObjeto.push(new Dia(horario.ivTurnos, horario.inicio, horario.fin))

      })
    })
    //ESTA PARTE DE LA FUNCION RECONSTRUYE EL ARBOL DE TURNOS
    const respuestaObjeto = e.configuracionTurnos.turnos
    const profesionalObjeto = profesionalObj[i].configuracionTurnos.turnos
    //SE ITERA SOBRE LAS CLAVES DE LA RESPUESTA DEL OBJETO TURNOS SE VUELVE A ITERAR SOBRE CADA OBJETO AÑO LUEGO EN CADA OBJETO MES
    //CREA EL OBEJTO ANO LUEGI CREA EL OBJETO MES Y LUEGO EL OBJETO DIA EN EL OBJETO PROFESIONALOBJ

    crearArbolDeTurnos(respuestaObjeto, profesionalObjeto, i)

  }) //profesionalObj[i].configuracionTurnos = e.configuracionTurnos;
  //AQUI HACE EUL REQUEST DE PACIENTES Y LO PASA AL OBJETO PACIENTESOBJ
  pacientesRequest()

};


//////////////////////////////////////////////////
// FUNCION LLAMADA DESDE PROFESIONALES.HTML     //
// evalua que los intervalos no se supoerpongan //
//////////////////////////////////////////////////


const intervalos = ({
    inicio: itemInicio,
    fin: itemFin
  }, {
    inicio: repetidosInicio,
    fin: repetidosFin
  },
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


/////////////////////////////////////////////////////////////////////////////
//FUNCION QUE GENERA UN OBJETO TRANSITORIO TOMANDO LOS DATOS DE LOS INPUTS //
/////////////////////////////////////////////////////////////////////////////
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
////////////////////////////////////////////////////////
//FUNCION QUE VACIA LOS INPUTS DE LA PAGINA INDEX.HTML//
////////////////////////////////////////////////////////
const limpiarInputs = () => {
  // generar un cleaner para todas las ventanas con un foreach
  const limpiar = document.querySelectorAll("input");
  //console.log(limpiar);
  limpiar.forEach((element) => {
    element.value = "";
  });
};

///////////////////////////////////////
//         VALIDACIONES              //
///////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////
//FUNCION QUE VALIDA EL DNI SE LE PASA UN VALOR Y UN ARRAY DE OBJETOS PARA QUE ANALICE              //
//PUEDE DEVOLVER FALSE CUANDO EL DATO INGRESADO NO ES COMPATIBLE CON UN DNI, -1 SI ES UN DNI VALIDO //
//Y NO EXISTE EN LA BASE DE DATOS Y DEVUELVE OTRO NUMERO SI ES VALIDO Y SE ENCUENTRA EN LA BD       //
//////////////////////////////////////////////////////////////////////////////////////////////////////
const validarDniOc = (valor, arrayObjeto) => {
  let resultado;
  if (isNaN(parseInt(valor)) || parseInt(valor) < 100000) {
    //SI NO ES UN DATO VALIDO DESACTIVA EL BOTON ENVIAR Y MUESTRA EL ERROR
    documentoInput.classList.toggle("error");
    document.getElementById("enviarPaciente").disabled = true;
    return false;
  } else {
    // SI EL DATO ES VALIDO DESACTIVA CUALQUIER MENSAJE DE ERROR PREVIO Y ACTIVA EL BOTON ENVIAR 
    documentoInput.classList.remove("error");
    document.getElementById("enviarPaciente").disabled = false;
    // BUSCA SI EL DNI ESTA REPETIDO 
    resultado = arrayObjeto.findIndex((objeto) => {
      if (parseInt(objeto.dni) === parseInt(valor)) return valor;
    });
    return resultado;
  }
};
// VALIDACIONES GENERALES DE APELLIDO, NOMBRE Y TELEFONO COMO DATOS REQUERIDOS 
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