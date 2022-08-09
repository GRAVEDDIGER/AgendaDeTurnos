async function profesionalRequest() {
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

};