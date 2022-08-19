class ObjetoIterable {
  *[Symbol.iterator]() {
    const claves = Object.keys(this);
    let valores = [];
    claves.forEach((e) => {
      valores.push(this[e]);
    });

    for (let i = 1; i < valores.length; i++) {
      yield valores[i];
    }
  }
  addProperty(propiedad, valor) {
    this[propiedad] = valor;
  }
  porClave(callback) {
    let clave;
    for (clave in this) if (clave !== undefined) callback(clave, this[clave]);
  }
}

class Paciente2 extends ObjetoIterable {
  constructor(apellido, nombre, calle, numero, cpa, telefono, dni, localidad) {
    super(), (this.apellido = apellido);
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
    localStorage.setItem("pacientes", JSON.stringify(pacienteObjeto));
  }
}
class ConfiguracionTurnos2 extends ObjetoIterable {
  constructor(semana, turnos) {
    super(), (this.dias = semana);
    this.turnos = turnos;
  }
}
class Semana2 extends ObjetoIterable {
  constructor(lunes, martes, miercoles, jueves, viernes, sabado, domingo) {
    super(), (this.lunes = lunes);
    this.martes = martes;
    this.miercoles = miercoles;
    this.jueves = jueves;
    this.viernes = viernes;
    this.sabado = sabado;
    this.domingo = domingo;
  }
}
class Turnos2 extends ObjetoIterable {
  constructor() {
    super(), (this.turnos = {});
  }
}
class Dia2 extends ObjetoIterable {
  constructor(dia) {
    super(), (this.ivTurnos = dia.ivTurnos);
    this.inicio = dia.inicio;
    this.fin = dia.fin;
  }
}
class AnoTurnos extends ObjetoIterable {
  constructor(ano) {
    super();
  }
}
class MesTurnos extends ObjetoIterable {
  constructor(mes) {
    super();
  }
}
class DiaTurnos extends ObjetoIterable {
  constructor(dia) {
    super();
  }
}
class HoraTurnos extends ObjetoIterable {
  constructor(hora) {
    super();
  }
}
class MinutosTurnos extends ObjetoIterable {
  constructor(minutos, dni = "") {
    super(), (this[minutos] = dni);
  }
}
class Profesional2 extends ObjetoIterable {
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
    super(),
      (this.configuracionTurnos = new ConfiguracionTurnos2(
        new Semana2(new Dia2(ivTurnos, inicio, fin)),
        new Turnos2()
      ));
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
    objetoAIterar.porClave((diaClave, diaObjeto) => {
      let horaInicial, minutosIniciales, horaFinal, minutosFinales;
      if (diaObjeto.length > 0) {
        diaObjeto.forEach((horario) => {
          if (horario.ivTurnos !== 0) {
            [horaInicial, minutosIniciales] = horario.inicio.split(":");
            [horaFinal, minutosFinales] = horario.fin.split(":");
            let diferenciaEnMinutos =
              (new Date().setHours(horaFinal, minutosFinales) -
                new Date().setHours(horaInicial, minutosIniciales)) /
              60000;
            let min = parseInt(minutosIniciales);
            let hora = parseInt(horaInicial);
            let intervaloTurnos = parseInt(horario.ivTurnos);
            let horarioProfesional = "";
            let objetoSalida = new HoraTurno();
            objetoSalida = gererarObjetoDeSalida(
              diferenciaEnMinutos,
              intervaloTurnos,
              hora,
              min
            );
            const diasActivosProfesional = diasDelMes(diaClave);
            diasActivosProfesional.forEach((dia) => {
              completarArbolDeTurnos(dia, objetoSalida, this);
            });
          }
        });
      }
    });
  }
}
class Tabla {
  constructor(dia, inicio, fin, intervalo) {
    this.dia = dia;
    this.inicio = inicio;
    this.fin = fin;
    this.intervalo = intervalo;
  }
}
class FabricaDeObjetos extends ObjetoIterable {
  static generarPaciente() {
    const pacienteTransitorio = new Paciente2();
    pacienteTransitorio.apellido = domApellido.value;
    pacienteTransitorio.nombre = domNombre.value;
    pacienteTransitorio.dni = domDni.value;
    pacienteTransitorio.telefono = domTelefono.value;
    pacienteTransitorio.direccion.calle = domCalle.value;
    pacienteTransitorio.direccion.numero = domAltura.value;
    pacienteTransitorio.direccion.localidad = domLocalidad.value;
    pacienteTransitorio.direccion.cPostal = domCpa.value;
    return pacienteTransitorio;
  }
}
class Validaciones {
  static validarDniOc(elemento, arrayObjeto, enviar) {
    let resultado;
    let valor = elemento.value;
    if (isNaN(parseInt(valor)) || parseInt(valor) < 100000) {
      //SI NO ES UN DATO VALIDO DESACTIVA EL BOTON ENVIAR Y MUESTRA EL ERROR
      elemento.classList.toggle("error");
      enviar.disabled = true;
      return false;
    } else {
      // SI EL DATO ES VALIDO DESACTIVA CUALQUIER MENSAJE DE ERROR PREVIO Y ACTIVA EL BOTON ENVIAR
      elemento.classList.remove("error");
      enviar.disabled = false;
      // BUSCA SI EL DNI ESTA REPETIDO
      resultado = arrayObjeto.findIndex((objeto) => {
        if (parseInt(objeto.dni) === parseInt(valor)) return valor;
      });
      return resultado;
    }
  }
  // VALIDACIONES GENERALES DE APELLIDO, NOMBRE Y TELEFONO COMO DATOS REQUERIDOS
  static validarApellidoOc(elemento, enviar) {
    const e = elemento.value;
    if (e.length < 3) {
      elemento.classList.add("error");
      enviar.disabled = true;
      return false;
    } else {
      elemento.classList.remove("error");
      enviar.disabled = false;
      return true;
    }
  }
  static validarNombreOc(elemento, enviar) {
    const e = elemento.value;
    if (e.length < 3) {
      elemento.classList.add("error");
      enviar.disabled = true;
      return false;
    } else {
      elemento.classList.remove("error");
      enviar.disabled = false;
      return true;
    }
  }
  static validarTelefonoOc(elemento, enviar) {
    const e = elemento.value;
    let regexTelefono =
      /\(?[0-9]{3}[0-9]?[0-9]?\)?[-]?([0-9]{2})?[0-9]?[-]?[0-9]{2}[0-9]?[-]?[0-9]{4}/g;
    if (regexTelefono.test(e)) {
      elemento.classList.remove("error");
      enviar.disabled = false;
      return true;
    } else {
      elemento.classList.add("error");
      enviar.disabled = true;
      return false;
    }
  }
  static validarTodo(enviar) {
    if (this.validarApellidoOc(domApellido, enviar)) {
      if (this.validarNombreOc(domNombre, enviar)) {
        if (this.validarTelefonoOc(domTelefono, enviar)) return true;
      }
    }
    return false;
  }
static   validarTabla(obj) {
  let condicion;
  if (arrayTabla.length > 0) {
    arrayTabla.forEach((item) => {
      condicion=!OtrasFunciones.compararObjetos(obj,item);
    });
  } else condicion = true;
  return condicion;
}
  static superposicion(tabla) {
    //falta revisar
    let condicion = false;
    let repetidos = [];

    tabla: for (item of tabla) {
      let saltearEach = false;
      repetidos = arrayTabla1.forEach((e) => {
        if (e.dia === item.dia && JSON.stringify(e) !== JSON.stringify(item)) {
          condicion = intervalos(item, e, condicion) && (saltearEach = true);
        }
      });
      if (saltearEach) break tabla;
    }
    return condicion;
  }
}
class AgregarTurnoModal {
  static crearObjetoTabla(){
    const objeto = new Tabla(
      diaSemana,
      document.querySelectorAll(".modal input")[0].value,
      document.querySelectorAll(".modal input")[1].value,
      document.querySelectorAll(".modal input")[2].value)
      return objeto
  }
  static crearTemplateTabla(objeto){
    const templateTurnos = document.getElementById(
      "configuracionTurnos").content; //TEMPLATE DE LA ESTRUCTURA DE LA TABLA QUE SE MODIFICA EN LAS SIGUIENTES LINEAS 
    templateTurnos.querySelectorAll("tr td")[0].textContent = diaSemana;
    templateTurnos.querySelectorAll("tr td")[1].textContent =
      objeto.inicio;
    templateTurnos.querySelectorAll("tr td")[2].textContent =
      objeto.fin;
    templateTurnos.querySelectorAll("tr td")[3].textContent =
      objeto.intervalo;
  }
}
class OtrasFunciones {
  static limpiarPaciente() {
    // generar un cleaner para todas las ventanas con un foreach
    const limpiar = document.querySelectorAll("input");
    //console.log(limpiar);
    limpiar.forEach((element) => {
      if (!element.classList.contains("btn-info")) element.value = "";
    });
  }
  static compararObjetos(objeto1, objeto2) {
    if (!OtrasFunciones.compararClaves(objeto1, objeto2)) return false;
    const keys1 = Object.keys(objeto1);
    let condicion =true;
        keys1.forEach((key) => {
      if (typeof objeto1[key] !== typeof objeto2[key]) condicion=false;
      else {
        if (typeof objeto1 === "object") {
              if (!this.compararObjetos(objeto1[key],objeto2[key])){
              condicion=false;
          } 
        }
      }    
    });
    return condicion;
  }
    static compararClaves(objeto1, objeto2) {
    const claves1 = Object.keys(objeto1),
      claves2 = Object.keys(objeto2);
    if (!(claves1.length === claves2.length)) return false;
    claves1.forEach((clave) => {

      if (!claves2.includes(clave)) return false;
    });
    return true;
  }

}
const funcionesValidacion = new Validaciones();
const fabricaDeObjetos = new FabricaDeObjetos();
