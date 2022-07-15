let respuesta;

const request = async () => {
  const resultado = await axios("../datos.json");
  console.log(resultado.data);
  respuesta = await resultado;
  resultado.data.forEach((e, i, a) => {
    profesionalObj[i] = e;
  });
};
document.addEventListener("DOMContentLoaded", async () => {
  await request();
  const fragmento = new DocumentFragment();
  profesionalObj.forEach((objeto) => {
    const opcion = `${objeto.apellido} ${objeto.nombre} ${objeto.especialidad}`;
    const elemento = document.createElement("option");
    elemento.value = opcion;
    fragmento.appendChild(elemento);
  });
  document.getElementById("datalistOptions").appendChild(fragmento);
});
let opciones = {
  inline: true
}
const calendarioElemento = document.getElementById("calendario")
flatpickr(calendarioElemento, opciones)
document.querySelector(".flatpickr-days").addEventListener("click", () => {
  console.log("adrian")
})