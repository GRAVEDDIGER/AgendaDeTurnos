async function verificarLocalStorage() {
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
    return respuestaProfesionales;
}
async function profesionalRequest() {
    let respuestaProfesionales = await verificarLocalStorage();
    let profesionalArray = [];
    profesionalArray[0] = new Profesional2;
    console.log(profesionalArray);
    respuestaProfesionales.data.forEach((e, i, a) => {
        const {
            nombre,
            apellido,
            dni,
            especialidad,
            matricula,
            telefono
        } = e;
        profesionalArray[i] = new Profesional2(0, "", "", nombre, apellido, dni, especialidad, matricula, telefono);
        console.log(e.configuracionTurnos);
        const {
            lunes,
            martes,
            miercoles,
            jueves,
            viernes,
            sabado,
            domingo
        } = e.configuracionTurnos.dias;
        profesionalArray[i].configuracionTurnos = new ConfiguracionTurnos2(new Semana2(lunes, martes, miercoles, jueves, viernes, sabado, domingo), new Turnos2);
        //ESTA PARTE DE LA FUNCION RECONSTRUYE EL ARBOL DE TURNOS
        const respuestaObjeto = e.configuracionTurnos.turnos
        // const profesionalObjeto = profesionalObjeto[i].configuracionTurnos.turnos
        //SE ITERA SOBRE LAS CLAVES DE LA RESPUESTA DEL OBJETO TURNOS SE VUELVE A ITERAR SOBRE CADA OBJETO AÑO LUEGO EN CADA OBJETO MES
        //CREA EL OBEJTO ANO LUEGI CREA EL OBJETO MES Y LUEGO EL OBJETO DIA EN EL OBJETO PROFESIONALOBJ

        profesionalArray[i].configuracionTurnos.turnos = crearArbolDeTurnos(respuestaObjeto, profesionalArray, i)

    }) //profesionalObjeto[i].configuracionTurnos = e.configuracionTurnos;
    //AQUI HACE EUL REQUEST DE PACIENTES Y LO PASA AL OBJETO PACIENTESOBJ
    return profesionalArray;
};

function crearArbolDeTurnos(respuestaObjeto) {
    console.log(respuestaObjeto.configuracionTurnos)
    const turnos = {};
    const respuesta=Object.keys(respuestaObjeto);
    respuesta.forEach((ano) => {
            turnos[ano] = new AnoTurnos();
        const respuestaAno =Object.keys(respuestaObjeto[ano])
        respuestaAno.forEach((mes) => {
                turnos[ano][mes] = new MesTurnos();
            // AQUI SE ITERA SOBRE CADA OBJETO DIA, CREOA EL OBJETO DIATURNO LUEGO ITERA SOBRE EL DIA Y SOBRE LAS HORAS 
            const respuestaMes = Object.keys(respuestaObjeto[ano][mes])
            respuestaMes.forEach((dia) => {
                    turnos[ano][mes][dia] = new DiaTurnos();
                Object.keys(respuestaObjeto[ano][mes][dia]).forEach(hora => {
                        turnos[ano][mes][dia][hora] = new HoraTurnos();
                    Object.keys(respuestaObjeto[ano][mes][dia][hora]).forEach(minutos => {
                            //AQUI PASA LOS TURNOS QUE SE ENCUENTRAN EN EL RESPONSE DIA.HORA AL OBJETO PROFESIONALOBJ
                            turnos[ano][mes][dia][hora][minutos] = respuestaObjeto[ano][mes][dia][hora][minutos];
                    })
                })
            })

        })
    })
    return turnos;
}