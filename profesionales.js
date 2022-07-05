//////////////////////////////
//      PAGINA PROFESIONALES//
//////////////////////////////

/////////////////////////////////////////
//FUNCION QUE CAPTURA DIA DE LA SEMANA //
/////////////////////////////////////////
diaTab.forEach((item) => {
    item.addEventListener("click", () => {
        let previo = document.getElementById(diaSemana);
        previo.classList.remove("active");
        item.classList.add("active");
        diaSemana = item.id;
    });
});
/////////////////////////////////////////////////////////////////////////////////
// FUNCION QUE BUSCA REGISTROS DUPLICADOS ANTES DE AGREGAR UNA FILA A LA TABLA //
/////////////////////////////////////////////////////////////////////////////////
function validarTabla(obj) {
    let condicion;
    if (arrayTabla1.length > 0) {
        arrayTabla1.forEach((item) => {
            let str1 = JSON.stringify(item);
            let str2 = JSON.stringify(obj);
            if (str1 === str2) {
                condicion = false;
            } else {
                condicion = true;
            }
        });
    } else condicion = true;
    return condicion;
}

//BOTON QUE AGREGA LOS DATOS INGRESADOS COMO UNA ROW DE LA TABLA
const botonAgregar = document
    .getElementById("btnAgregar")
    .addEventListener("click", () => {
        document.getElementById("duplicado1").classList.add("turnoDuplicado"); //si el alerta de valor duplicado esta la elimina
        const fragmento = new DocumentFragment();
        //crea instancia de objeto con los datos de los inputs
        const objetoTabla1 = new Tabla1(
            diaSemana,
            document.querySelectorAll(".modal input")[0].value,
            document.querySelectorAll(".modal input")[1].value,
            document.querySelectorAll(".modal input")[2].value
        );
        // verifica que el nuevo valor introducido no se encuentre en la tabla antes de agregar los datos
        if (validarTabla(objetoTabla1)) {
            const templateTurnos = document.getElementById(
                "configuracionTurnos"
            ).content;
            templateTurnos.querySelectorAll("tr td")[0].textContent = diaSemana;
            templateTurnos.querySelectorAll("tr td")[1].textContent =
                objetoTabla1.inicio;
            templateTurnos.querySelectorAll("tr td")[2].textContent =
                objetoTabla1.fin;
            templateTurnos.querySelectorAll("tr td")[3].textContent =
                objetoTabla1.intervalo;
            const clon = document
                .getElementById("configuracionTurnos")

                .content.cloneNode(true);

            fragmento.appendChild(clon);
            document.querySelector("table tbody").appendChild(fragmento);
            arrayTabla1.push(objetoTabla1);

            contador++;
        } //si el valor esta dulpicado entonces enciede el alerta
        else
            document.getElementById("duplicado1").classList.remove("turnoDuplicado");
    });

//EVENTO DELEGADO PARA QUE EL ICONO DE ELIMINAR PUEDA ELIMINAR LA FILA AL HACER CLICK
const botonGuardar = document
    .getElementById("botonGuardar")
    .addEventListener("click", () => {
        if (superposicion()) {
            document
                .getElementById("superposicion")
                .classList.remove("turnoDuplicado");
        } else {
            const elModal = new bootstrap.Modal(document.getElementById("modal1"))
            elModal.hide()
            // document.querySelector(".modal").hide() //.classList.add("d-none")
            //guardar en objeto
        }
    });

const eliminar = document
    .querySelector("table")
    .addEventListener("click", (e) => {
        if (e.target.classList.contains("trashcan")) {
            document.getElementById("superposicion").classList.add("turnoDuplicado"); //ELIMINA EL ERROR DE SUPERPOSICION

            const objetoSeleccionado = new Tabla1(
                e.target.parentNode.parentNode.querySelectorAll("td")[0].textContent,
                e.target.parentNode.parentNode.querySelectorAll("td")[1].textContent,
                e.target.parentNode.parentNode.querySelectorAll("td")[2].textContent,
                e.target.parentNode.parentNode.querySelectorAll("td")[3].textContent
            );
            console.log(objetoSeleccionado); //OBJETO QUE CONTIENE LOS DATOS DE LA FILA SELECCIONADA

            for (item in arrayTabla1) {
                const objetoString1 = JSON.stringify(arrayTabla1[item]);
                const objetoString2 = JSON.stringify(objetoSeleccionado);
                if (objetoString1 === objetoString2) {
                    arrayTabla1.splice(item, 1);
                    e.target.parentNode.parentNode.parentNode.removeChild(
                        e.target.parentNode.parentNode
                    );
                    break;
                }
            }
        }
    });
const enviarPaciente = document.getElementById("enviarPaciente")
const documentoInput = document.getElementById("dni");
documentoInput.addEventListener("change", (e) =>
    validarDniOc(parseInt(e.target.value))
);
const apellidoInput = document.getElementById("apellido");
apellidoInput.addEventListener("change", (e) =>
    validarApellidoOc(e.target.value)
);

const nombreInput = document.getElementById("nombre");
nombreInput.addEventListener("change", (e) => validarNombreOc(e.target.value));

const telefonoInput = document.getElementById("telefono");
telefonoInput.addEventListener("change", (e) =>
    validarTelefonoOc(e.target.value)
);
const enviarProfesional = document.getElementById("enviarProfesional").addEventListener("click", e => {
    const profesionalTransitorio = new Profesional
    for (fila of arrayTabla1) {
        if (profesionalTransitorio.configuracionTurnos.dias[fila.dia][0].ivTurnos === 0) {
            profesionalTransitorio.configuracionTurnos.dias[fila.dia][0].ivTurnos = fila.intervalo
            profesionalTransitorio.configuracionTurnos.dias[fila.dia][0].inicio = fila.inicio
            profesionalTransitorio.configuracionTurnos.dias[fila.dia][0].fin = fila.fin
        } else {
            profesionalTransitorio.configuracionTurnos.dias[fila.dia].push({
                ivTurnos: fila.intervalo,
                inicio: fila.inicio,
                fin: fila.fin,
                horas: []
            })
        }
    }
    profesionalObj.configuracionTurnos = profesionalTransitorio.configuracionTurnos
    console.log(profesionalObj)

})



/////////////////////////////////////////////////
//funcion que evalua superposicion  de horarios//
/////////////////////////////////////////////////

const superposicion = () => {
    let condicion = false;
    let repetidos = [];
    tabla: for (item of arrayTabla1) {
        let saltearEach = false;
        repetidos = arrayTabla1.forEach((e) => {
            if ((e.dia === item.dia) && (JSON.stringify(e) !== JSON.stringify(item))) {
                condicion = intervalos(item, e, condicion) && (saltearEach = true)
            }

        })
        if (saltearEach) break tabla;
        console.log(repetidos);
        //     for (repetido of repetidos) {
        //         condicion = intervalos(item, repetido, condicion)
        //         if (condicion) break tabla;

        //     }
        // }

    }
    return condicion;
};