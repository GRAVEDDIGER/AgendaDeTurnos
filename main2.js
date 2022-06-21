let diaSemana = "lunes";
const diaTab = document.querySelectorAll("ul .nav-item button");
console.log(diaTab);

diaTab.forEach((item) => {
  item.addEventListener("click", (e) => {
    let previo = document.getElementById(diaSemana);
    previo.classList.remove("active");
    item.classList.add("active");
    diaSemana = item.id;
  });
});
// dia.addEventListener("click", (e) => {
// let previo = document.getElementById(diaSemana);
// previo.classList.remove("active");
// console.log("id: ", previo.id);
// dia.classList.add("active");
// console.log(dia);
// diaSemana = e.target.id;
// console.log(dia.classList);
// console.log(previo.classList);
// console.log(e.target.id);
