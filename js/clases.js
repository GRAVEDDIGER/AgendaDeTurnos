 class ObjetoIterable {
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
    addProperty(propiedad, valor) {
        this[propiedad] = valor
    }
    porClave(callback) {
        let clave;
        for (clave in this) if (clave !== undefined) callback(clave, this[clave])
    }
}

 class Paciente2 extends ObjetoIterable {
    constructor(apellido, nombre, calle, numero, cpa, telefono, dni, localidad) {
        super(),
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
        localStorage.setItem("pacientes", JSON.stringify(pacienteObjeto));
    }

}
 class ConfiguracionTurnos2 extends ObjetoIterable {
    constructor(semana, turnos) {
        super(),
            this.dias = semana
        this.turnos = turnos
    }
}
 class Semana2 extends ObjetoIterable {
    constructor(dia) {
        super(),
            this.lunes = dia
        this.martes = dia
        this.miercoles = dia
        this.jueves = dia
        this.viernes = dia
        this.sabado = dia
        this.domingo = dia
    }
}
 class Turnos2 extends ObjetoIterable {
    constructor() {
        super(),
            this.turnos = {}
    }
}
 class Dia2 extends ObjetoIterable {
    constructor(ivTurnos, inicio, fin) {
        super(),
            this.ivTurnos = ivTurnos
        this.inicio = inicio
        this.fin = fin
    }
}
 class anoTurnos extends ObjetoIterable {
    constructor(ano) {
        super(),
            this[ano] = {}

    }
}
 class mesTurnos extends ObjetoIterable {
    constructor(mes) {
        super(),
            this[mes] = {}
    }
}
 class diaTurnos extends ObjetoIterable {
    constructor(dia) {
        super(),
            this[dia] = {}
    }
}
 class horaTurnos extends ObjetoIterable {
    constructor(hora) {
        super(),
            this[hora] = {}
    }
}
 class minutosTurnos extends ObjetoIterable {
    constructor(minutos, dni = '') {
        super(),
            this[minutos] = dni
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
            this.configuracionTurnos = new ConfiguracionTurnos2(new Semana2(new Dia2(ivTurnos, inicio, fin)), new Turnos2)
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
 class FabricaDeObjetos extends ObjetoIterable {

     generarPaciente(){
    
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
      };
}
 class Validaciones {

     validarDniOc(elemento, arrayObjeto,enviar) {
        let resultado;
        let valor=elemento.value;
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
    };
    // VALIDACIONES GENERALES DE APELLIDO, NOMBRE Y TELEFONO COMO DATOS REQUERIDOS 
     validarApellidoOc(elemento,enviar) {
      const  e=elemento.value;
        if (e.length < 3) {
            elemento.classList.add("error");
            enviar.disabled = true;
            return false;
        } else {
            elemento.classList.remove("error");
            enviar.disabled = false;
            return true;
        }
    };
    validarNombreOc(elemento,enviar) {
        const  e=elemento.value;
        if (e.length < 3) {
            elemento.classList.add("error");
            enviar.disabled = true;
            return false;
        } else {
            elemento.classList.remove("error");
            enviar.disabled = false;
            return true;
        }
    };
     validarTelefonoOc(elemento,enviar) {
        const e=elemento.value;
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
    };
     validarTodo (enviar) {
        if (this.validarApellidoOc(domApellido,enviar)) {
          if (this.validarNombreOc(domNombre,enviar)) {
            if (this.validarTelefonoOc(domTelefono,enviar)) return true;
          }
        }
        return false;
      };
}
 class Solicitud {

     

     
}
 class OtrasFunciones {
    // constructor(){
    //     this.limpiarPaciente=this.limpiarPaciente.bind(this);
    // }
    limpiarPaciente(){
        // generar un cleaner para todas las ventanas con un foreach
        const limpiar = document.querySelectorAll("input");
        //console.log(limpiar);
        limpiar.forEach((element) => {
          element.value = "";
        });
      };
}
const funcionesValidacion = new Validaciones();
const requestObject = new Solicitud();
const fabricaDeObjetos =new FabricaDeObjetos();




