async function pacientesRequest() {
    let pacienteObjeto=[];
    pacienteObjeto[0]=""
    let respuestaPacientes = { data: [] };
    if (localStorage.getItem("pacientes")) {
        respuestaPacientes.data = JSON.parse(localStorage.getItem("pacientes"))
    }
    else {
        respuestaPacientes = await axios("../paciente.json");
    }
    respuestaPacientes.data.forEach((e, i, a) => {
        pacienteObjeto[i] = new Paciente2(
            e.apellido,
            e.nombre,
            e.direccion.calle,
            e.direccion.numero,
            e.direccion.cPostal,
            e.telefono,
            e.dni,
            e.direccion.localidad
        );
    })
return pacienteObjeto;
}

