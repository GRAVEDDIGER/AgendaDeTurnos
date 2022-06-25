let diaSemana = "lunes"; //VARIABLE QUE ALMACENA EL DIA DE LA SEMANA SELECCIONADO EN EL TAB BAR 
const diaTab = document.querySelectorAll("ul .nav-item button");
let contador=0
console.log(diaTab);
let datos;

diaTab.forEach((item) => {
  item.addEventListener("click", () => {
    let previo = document.getElementById(diaSemana);
    previo.classList.remove("active");
    item.classList.add("active");
    diaSemana = item.id;
  });
});

class Tabla1  {
  constructor (dia,inicio,fin,intervalo){
  this.dia=dia
  this.inicio=inicio
  this.fin=fin
  this.intervalo=intervalo }
}
let arrayTabla1 =[]
//BOTON QUE AGREGA LOS DATOS INGRESADOS COMO UNA ROW DE LA TABLA 
const botonAgregar = document.getElementById("btnAgregar").addEventListener("click", () => { 
 const fragmento = new DocumentFragment();
  
  const templateTurnos = document.getElementById("configuracionTurnos").content
  templateTurnos.querySelectorAll("tr td")[0].textContent = diaSemana
  templateTurnos.querySelectorAll("tr td")[1].textContent = document.querySelectorAll("input")[0].value
  templateTurnos.querySelectorAll("tr td")[2].textContent = document.querySelectorAll("input")[1].value
  templateTurnos.querySelectorAll("tr td")[3].textContent = document.querySelectorAll("input")[2].value
  const clon = document.getElementById("configuracionTurnos").content.cloneNode(true)
  fragmento.appendChild(clon)
  document.querySelector("table tbody").appendChild(fragmento)
  arrayTabla1.push(new Tabla1(diaSemana,document.querySelectorAll("input")[0].value,document.querySelectorAll("input")[1].value,document.querySelectorAll("input")[2].value))

  contador++
})

//EVENTO DELEGADO PARA QUE EL ICONO DE ELIMINAR PUEDA ELIMINAR LA FILA AL HACER CLICK 
const eliminar = document.querySelector("table").addEventListener("click",e=>{
  if (e.target.classList.contains("trashcan"))  e.target.parentNode.parentNode.parentNode.removeChild(e.target.parentNode.parentNode)
})

