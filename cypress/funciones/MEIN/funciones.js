
// Devuelve: segundos + minutos + hora (ssmmhh)
export function obtenerHoraComoCadena() {
  const ahora = new Date();
  const segundos = String(ahora.getSeconds()).padStart(2, "0");
  const minutos = String(ahora.getMinutes()).padStart(2, "0");
  const horas = String(ahora.getHours()).padStart(2, "0");
  return `${segundos}${minutos}${horas}`;
}

// Devuelve: día + mes + año (ddMMyyyy)
export function obtenerFechaComoCadena(requiero) {
  const ahora = new Date();
  const dia = String(ahora.getDate()).padStart(2, "0");
  const mes = String(ahora.getMonth() + 1).padStart(2, "0"); // Mes inicia en 0
  const anio = String(ahora.getFullYear());
  //return `${dia}${mes}${anio}`;
  if (requiero === "fechaCalendario") {
    return `${dia}-${mes}-${anio}`;
  } else if (requiero === "concatenacion") {
    return `${dia}`;
  } else {
    return null;
  }
}

// Devuelve: ssmmhhddMMyyyy
export function generarCadenaTiempoCompleta() {
  const hora = obtenerHoraComoCadena();
  const fecha = obtenerFechaComoCadena("concatenacion");
  return `${hora}${fecha}`;
}

export function concatenarHoraFecha() {
  const concatenacion = generarCadenaTiempoCompleta();
  const contrasenaConcatenada = "C" + concatenacion;
  const numeroRecetaConcatenada = "NR" + concatenacion;
  cy.readFile("cypress/fixtures/numeroDeReceta.json").then((data) => {
    // Actualiza el valor
    data.contrasenaConcatenada = contrasenaConcatenada;
    data.numeroRecetaConcatenada = numeroRecetaConcatenada;

    cy.writeFile("cypress/fixtures/numeroDeReceta.json", data); // Guarda en archivo

    cy.log("Contraseña concatenada:", contrasenaConcatenada);
    cy.log("Número Receta Concatenada:", numeroRecetaConcatenada);

    //Modificación de Efren
  });
  //Modificación Santiago
}

