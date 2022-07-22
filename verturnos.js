const respuesta = await request()
/////////////////////////
// VARIABLES GLOBALES  //
/////////////////////////
const opciones = {
    inline: true
}
let profesionalCadena;
let mapProfesional = {}
const datalistProfesional = document.getElementById("dataListProfesionales");
const calendario = document.querySelector(".calendario");
let arrayDeFechas = [];
///////////////
// FUNCIONES //
///////////////
const iniciarCaledario = opciones => flatpickr(calendario, opciones);



/////////////////
//funciones dom//
/////////////////
const iniciarDatalist = () => {
    const fragmento = new DocumentFragment()

    profesionalObj.forEach((profesional, indice) => {
        profesionalCadena = `${profesional.apellido} ${profesional.nombre} ${profesional.especialidad}`;
        mapProfesional[profesionalCadena] = indice;
        const elemento = document.createElement("option");
        elemento.value = profesionalCadena;
        fragmento.appendChild(elemento);
    })
    datalistProfesional.appendChild(fragmento);
};
const agregarEventListenerDatalist = () => {
    document.getElementById("dataListProfesionales").addEventListener("change", e => {
        const objetoTurnos = profesionalObj[mapProfesional[datalistProfesional.value]].configuracionTurnos.turnos
        objetoTurnos.porClave((anoClave, ano) => {
            ano.porClave((mesClave, mes) => {
                mes.porClave((diaClave, dia) => {
                    const anoString = anoClave.substring(1, ano.length)
                    const mesString = mesClave.substring(1, ano.length)
                    const diaString = diaClave.substring(1, ano.length)
                    arrayDeFechas.push(new Date(anoString, mesString, diaString))
                })
            })
        })
        flatpickr(calendario, opciones).destroy
        const calendario = iniciarCaledario({
            inline: true,
            enable: arrayDeFechas
        })
    })
};
/////////////////////
// LOGICA PRINCIPAL//
/////////////////////

iniciarCaledario(opciones);
iniciarDatalist();
agregarEventListenerDatalist();