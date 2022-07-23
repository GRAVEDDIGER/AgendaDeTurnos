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
    (this.direccion = {
      calle: calle,
      numero: numero,
      cPostal: cpa,
      localidad: localidad,
    }),
    (this.dni = dni);
  }
  guardarLocal() {
    localStorage.setItem("pacientes", JSON.stringify(this));
  }
}

class ConfiguracionTurnos {
  constructor(ivTurnos, inicio, fin, turnos) {
      this.turnos = new Turnos()
      this.dias = new Semana(ivTurnos, inicio, fin)
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
        if (clave!== "undefined") callback(clave, this[clave])
    }
  }
}
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
        if (clave!== "undefined") callback(clave, this[clave])
    }
  }
}
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
        if (clave!== "undefined") callback(clave, this[clave])
    }
  }
}
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
        if (clave!== "undefined") callback(clave, this[clave])
    }
  }
}
class ListadoDeTurnos {constructor(hora,minutos,dni){
  this.hora=hora
  this.minutos=minutos
  this.dni=dni

}}
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
        if (clave!== "undefined") callback(clave, this[clave])
    }
  }
}
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
        if (clave!== "undefined") callback(clave, this[clave])
    }
  }
}
class DiaTurno {
  constructor(dia,valor) {
    this[dia]=valor

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
        if (clave!== "undefined") callback(clave, this[clave])
    }
  }
}
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
        if (clave!== "undefined") callback(clave, this[clave])
    }
  }
}
class generadorHoras {
  constructor(hora) {
    this[hora] = "libre";
  }
}
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
        if (clave!== "undefined") callback(clave, this[clave])
    }
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
          let horarioProfesional = "";
          let objetoSalida = new HoraTurno

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
            console.log("String", horarioProfesional);
          }
         
          const diasActivosProfesional = diasDelMes(dia)
          diasActivosProfesional.forEach(dia => {
            const diaDelMes = "d" + new Date(dia).getDate().toString();
            const mes = "m" + new Date(dia).getMonth().toString();
            const ano = "a" + new Date(dia).getFullYear().toString();
            if (this.configuracionTurnos.turnos[ano] === undefined)
              this.configuracionTurnos.turnos.addProperty(ano, new Ano());
            if (this.configuracionTurnos.turnos[ano][mes] === undefined)
              this.configuracionTurnos.turnos[ano].addProperty(mes, new Mes());
            if (this.configuracionTurnos.turnos[ano][mes][diaDelMes] === undefined) {
              this.configuracionTurnos.turnos[ano][mes].addProperty(diaDelMes, new DiaTurno());
              this.configuracionTurnos.turnos[ano][mes].addProperty(diaDelMes, objetoSalida)
            }

          })
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
const ObjetoDiaSemana = {
  0: "domingo",
  1: "lunes",
  2: "martes",
  3: "miercoles",
  4: "jueves",
  5: "viernes",
  6: "sabado"
};
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
const diasDelMes = (diaLetras) => {
  console.log(diaLetras)
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
const request = async () => {
  const resultadoProfesionales = await axios("../datos.json");
  console.log(resultadoProfesionales.data);
  respuestaProfesionales = await resultadoProfesionales;
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
    for (item in profesionalObj[i].configuracionTurnos.dias) {
      if (item !== "porCada") {
        if (item !== "porClave") {
          if (item !== "addProperty") {
            e.configuracionTurnos.dias[item].forEach(horario => {
              profesionalObj[i].configuracionTurnos.dias[item].push(new Dia(horario.ivTurnos, horario.inicio, horario.fin))
            })
          }
        }
      }
    }
    const respuestaObjeto =e.configuracionTurnos.turnos
    const profesionalObjeto =profesionalObj[i].configuracionTurnos.turnos
    Object.keys(respuestaObjeto).forEach(ano =>{
      profesionalObj[i].configuracionTurnos.turnos[ano]= new Ano()
      Object.keys(respuestaObjeto[ano]).forEach(mes=>{
        profesionalObj[i].configuracionTurnos.turnos[ano][mes]= new Mes()
        Object.keys(respuestaObjeto[ano][mes]).forEach(dia =>{
        profesionalObjeto[ano][mes][dia] = new DiaTurno();
        Object.keys(respuestaObjeto[ano][mes][dia]).forEach(hora=>{
          profesionalObjeto[ano][mes][dia][hora]=new HoraTurno()
          Object.keys(respuestaObjeto[ano][mes][dia][hora]).forEach(minutos=>{
            profesionalObjeto[ano][mes][dia][hora][minutos] =respuestaObjeto[ano][mes][dia][hora][minutos]

          })
        })
        })
        
      })
    })
  }) //profesionalObj[i].configuracionTurnos = e.configuracionTurnos;

  const resultadoPacientes = await axios("../paciente.json");
  console.log(resultadoPacientes);
  respuestaPacientes = await resultadoPacientes;
  respuestaPacientes.data.forEach((e, i, a) => {
    console.log(e);
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
  });
};



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