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
        localStorage.setItem("pacientes", JSON.stringify(pacienteObj));
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
        const pacienteTransitorio = new Paciente();
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
    validarDniOc(valor, arrayObjeto) {
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
    validarApellidoOc(e) {
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
    validarNombreOc(e) {
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
    validarTelefonoOc(e) {
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
    validarTodo () {
        if (validarApellidoOc(domApellido.value)) {
          if (validarNombreOc(domNombre.value)) {
            if (validarTelefonoOc(domTelefono.value)) return true;
          }
        }
        return false;
      };
}
class Solicitud {
    async pacientesRequest() {
        let respuestaPacientes = { data: [] };
        if (localStorage.getItem("pacientes")) {
            respuestaPacientes.data = JSON.parse(localStorage.getItem("pacientes"))
        }
        else {
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

    async request() {
        let respuestaProfesionales = { data: [] };
        if (localStorage.getItem("profesionales")) {
            respuestaProfesionales.data = JSON.parse(localStorage.getItem("profesionales"));
        }
        else {
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
}

const funcionesValidacion = new Validaciones();
const requestObject = new Solicitud();
const fabricaDeObjetos =new FabricaDeObjetos();




