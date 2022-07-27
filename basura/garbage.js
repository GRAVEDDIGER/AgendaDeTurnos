// const definirHoras = (opcion) => {
//   //GUARDA LOS HORARIOS DE INICIO Y FIN EN LOS DIAS SELECCIONADOS
//   let respuesta;
//   switch (opcion) {
//     case 1:
//       respuesta = validarHora();
//       respuesta !== false ?
//         profesionalObj.configuracionTurnos.dias.lunes.push(
//           new Horario(respuesta[0], respuesta[1])
//         ) :
//         (alert("Debe ingresar la hora en formato HH:MM"), definirHoras());

//       break;
//     case 2:
//       respuesta = validarHora();
//       respuesta !== false ?
//         profesionalObj.configuracionTurnos.dias.martes.push(
//           new Horario(respuesta[0], respuesta[1])
//         ) :
//         (alert("Debe ingresar la hora en formato HH:MM"), definirHoras());
//       break;
//     case 3:
//       respuesta = validarHora();
//       respuesta !== false ?
//         profesionalObj.configuracionTurnos.dias.miercoles.push(
//           new Horario(respuesta[0], respuesta[1])
//         ) :
//         (alert("Debe ingresar la hora en formato HH:MM"), definirHoras());
//       break;
//     case 4:
//       respuesta = validarHora();
//       respuesta !== false ?
//         profesionalObj.configuracionTurnos.dias.jueves.push(
//           new Horario(respuesta[0], respuesta[1])
//         ) :
//         (alert("Debe ingresar la hora en formato HH:MM"), definirHoras());
//       break;
//     case 5:
//       respuesta = validarHora();
//       respuesta !== false ?
//         profesionalObj.configuracionTurnos.dias.viernes.push(
//           new Horario(respuesta[0], respuesta[1])
//         ) :
//         (alert("Debe ingresar la hora en formato HH:MM"), definirHoras());
//       break;
//     case 6:
//       respuesta = validarHora();
//       respuesta !== false ?
//         profesionalObj.configuracionTurnos.dias.sabado.push(
//           new Horario(respuesta[0], respuesta[1])
//         ) :
//         (alert("Debe ingresar la hora en formato HH:MM"), definirHoras());
//       break;
//     case 7:
//       respuesta = validarHora();
//       respuesta !== false ?
//         profesionalObj.configuracionTurnos.dias.domingo.push(
//           new Horario(respuesta[0], respuesta[1])
//         ) :
//         (alert("Debe ingresar la hora en formato HH:MM"), definirHoras());
//       break;
//   }
// };
// const diasAtencion = () => {
//   //CARGA LOS DIAS QUE EL PROFESIONAL ATIENDE EN UN ARRAY
//   let res = [];
//   let numero = 1;
//   const semana = profesionalObj.configuracionTurnos.dias;
//   for (dia in semana) {
//     if (semana[dia].length > 0) {
//       res.push(numero.toString().trim() + " - " + dia + "\n");
//       numero++;
//     }
//   }
//   return res;
// };
// const turnosLibres = (opcion) => {
//   //MUESTRA LOS TURNOS LIBRES Y PERMITE SELECCIONAR EL HORARIO. CARGA EL DNI DEL PACIENTE EN EL HORARIO
//   // EL PARAMETRO OPCION ES EL DATO SELECCIONADO POR EL USUARIO DEL DIA DE SEMANA

//   //console.log(profesionalObj.configuracionTurnos.dias[opcion].length);
//   const dia = profesionalObj.configuracionTurnos.dias[opcion];
//   let libres = [];
//   let numero = 1;

//   for (let index = 0; index < dia.length; index++) {
//     let horarios = dia[index];
//     libres[0] = "0 - Salir\n";
//     for (turno in horarios) {
//       if (horarios[turno] == "LIBRE") {
//         libres.push(numero + " - " + turno + "\n");
//         numero++;
//       }
//     }

//     //console.log(libres); //NO ENTIENDO PORQUE ME PONEUN ESPACIO DESPUES DE LA COMA
//   }
//   let opcionWhile = 1;
//   while (opcionWhile != 0) {
//     opcionWhile = prompt(`Elija el turno que desea:

//   ${libres}`);

//     if (opcionWhile != 0) {
//       let rta = prompt("DNI del paciente");
//       const turnoSel = libres[opcionWhile]
//         .substring(4, libres[opcionWhile].length - 1)
//         .toString()
//         .trim();
//       profesionalObj.configuracionTurnos.dias[opcion][
//         profesionalObj.configuracionTurnos.dias[opcion].length - 1
//       ][`${turnoSel}`] = rta;
//       //console.log("Turno Asignado");
//       opcionWhile = 0;
//     }
//   }
//   menuPrincipal();
// };
// const asignarTurno = () => {
//   //PERMITE SELECCIONAR EL DIA DE ATNECION DEL PROFESIONAL
//   let atencion = diasAtencion(); //LLAMA A LA FUNCION DIAS Y TRAE EL ARRAY ATENCION CON LOS DIAS DEL
//   // PROFESIONAL
//   let opcion = 1;

//   while (opcion != 0) {
//     opcion = prompt(`Elija el dia de atencion:
// 0 - Salir
// ${atencion}`); //NO SE PORQUE ME DEJA DESALINEADAS LAS OPCIONES
//     //EL OPERADOR TERNARIO LLAMA A LA FUNCION TURNOSLIBRES PASANDO COMO PARAMETRO EL DIA SELECCIONADO POR EL USR
//     // SI LA OPCION ES 0 TERMNA EL BUCLE
//     opcion != 0 ?
//       turnosLibres(
//         atencion[opcion - 1].substring(4, atencion[opcion - 1].length - 1)
//       ) :
//       (opcion = 0);
//   }
// };

// const configurarProfesional = () => {
//   profesionalObj.apellido = prompt(
//     "Apellido del profesional"
//   ).toUpperCase();
//   profesionalObj.nombre = prompt("Nombre del profesional").toUpperCase();
//   profesionalObj.dni = prompt("DNI del profesional").toUpperCase();
//   profesionalObj.especialidad = prompt(
//     "Especialidad del profesional"
//   ).toUpperCase();
//   profesionalObj.matriculaProfesional = prompt(
//     "Matricula del profesional"
//   ).toUpperCase();
//   profesionalObj.configuracionTurnos.ivTurnos = prompt(
//     "Intervalo de turnos"
//   ).toUpperCase();

//   let opcionSemana = 1;
//   while (opcionSemana !== 0) {
//     opcionSemana = prompt(`Elija la opcion deseada:
//                               0 - Salir
//                               1 - Lunes
//                               2 - Martes
//                               3 - Miercoles
//                               4 - Jueves
//                               5 - Viernes
//                               6 - Sabado
//                               7 - Domingo`);
//     opcionSemana = parseInt(opcionSemana);
//     isNaN(opcionSemana) || opcionSemana < 0 || opcionSemana > 7 ?
//       alert("La respuesta debe ser un numero del 0 al 7") :
//       definirHoras(opcionSemana);
//   }
//   configuracionOk
//     ?
//     profesionalObj.generarTurnos() :
//     (alert("Hay datos mal en la configuracion del profesional"),
//       configurarProfesional());
// };
// const configuracionOk = () => {
//   //EVALUA CON TRUE SI LOS DATOS NECESARIOS PARA GENERAR TURNOS ESTAN EN EL OBJ
//   const semana = profesionalObj.configuracionTurnos.dias;
//   let res = false;
//   for (dia in semana) {
//     if (
//       semana[dia].length > 1 &&
//       !parseInt(profesionalObj.configuracionTurnos.ivTurnos).isNaN
//     )
//       res = true;
//     return res;
//   }
// };
