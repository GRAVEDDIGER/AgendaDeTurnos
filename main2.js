let diaSemana = "lunes";
const diaTab = document.querySelectorAll("ul .nav-item button");
console.log(diaTab);

diaTab.forEach((item) => {
  item.addEventListener("click", () => {
    let previo = document.getElementById(diaSemana);
    previo.classList.remove("active");
    item.classList.add("active");
    diaSemana = item.id;
  });
});

const botonAgregar = document.getElementById("btnAgregar").addEventListener("click", () => {

  const fragmento = new DocumentFragment();
  let contador = 0
  const templateTurnos = document.getElementById("configuracionTurnos").content
  templateTurnos.querySelectorAll("tr td")[0].textContent = diaSemana
  templateTurnos.querySelectorAll("tr td")[1].textContent = document.querySelectorAll("input")[0].value
  templateTurnos.querySelectorAll("tr td")[2].textContent = document.querySelectorAll("input")[1].value
  templateTurnos.querySelectorAll("tr td")[3].textContent = document.querySelectorAll("input")[2].value
  const clon = document.getElementById("configuracionTurnos").content.cloneNode(true)
  fragmento.appendChild(clon)
  document.querySelector("table tbody").appendChild(fragmento)

})