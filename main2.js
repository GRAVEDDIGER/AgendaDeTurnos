//////////////////////////
// VARIABLES GLOBALES   //
//////////////////////////
let arrayTabla1 = []; //ARRAY QUE REPRESENTA TODOS LOS VALORES DE LA TABLA GUARDADOS COMO ARRAY DE OBJETOS
let diaSemana = "lunes"; //VARIABLE QUE ALMACENA EL DIA DE LA SEMANA SELECCIONADO EN EL TAB BAR
const diaTab = document.querySelectorAll("ul .nav-item button");
let contador = 0;

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
      if (str1 == str2) {
        condicion = false;
      } else {
        condicion = true;
      }
    });
  } else condicion = true;
  return condicion;
}
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

//BOTON QUE AGREGA LOS DATOS INGRESADOS COMO UNA ROW DE LA TABLA
const botonAgregar = document
  .getElementById("btnAgregar")
  .addEventListener("click", () => {
    document.getElementById("duplicado1").classList.add("turnoDuplicado"); //si el alerta de valor duplicado esta la elimina
    const fragmento = new DocumentFragment();
    //crea instancia de objeto con los datos de los inputs
    const objetoTabla1 = new Tabla1(
      diaSemana,
      document.querySelectorAll("input")[0].value,
      document.querySelectorAll("input")[1].value,
      document.querySelectorAll("input")[2].value
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
      templateTurnos
        .querySelector("tr td img")
        .setAttribute("id", contador.toString()); //AGREGA UN ID CRECIENTE COINCIDENTE CON EL INDICE DEL ARRAY

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
const eliminar = document
  .querySelector("table")
  .addEventListener("click", (e) => {
    if (e.target.classList.contains("trashcan")) {
      let indice = parseInt(e.target.id);
      arrayTabla1.splice(indice, 1); //elimina el valor del array
      e.target.parentNode.parentNode.parentNode.removeChild(
        e.target.parentNode.parentNode // remoeve lafila dela tabla
      );
    }
  });

////////////////////////////////////////////////
//funcion que evalua superposicion  dehorarios//
////////////////////////////////////////////////
const superposicion = () => {
  let condicion = false;
  arrayTabla1.forEach((item) => {
    const dias = arrayTabla1.filter((e) => e.dia === item.dia); //genera un array con los dias que se repiten
    if (dias.length > 1) {
      dias.shift();
      const valor = dias.forEach((repetido) => {
        if (
          (item.inicio >= repetido.inicio && item.inicio <= repetido.fin) ||
          (item.fin >= repetido.inicio && item.fin <= repetido.fin)
        ) {
          condicion = true;
        }
        return condicion;
      });
      if (valor) {
        console.log("Hay superposicion horaria");
      }
      console.log(dias);
    }
  });
};
