require("cypress-xpath");
import "cypress-iframe";

import { loginMEIN, loginMEINQA } from "../../../funciones/MEIN/loginMEIN";
import { dispensacionMedicamento } from '../../../funciones/MEIN/dispensacionMedicamentos';
import { preparacionMedicamento } from '../../../funciones/MEIN/preparacionMedicamentos';
import { verificarReceta } from '../../../funciones/MEIN/verificacionReceta';
import { entregarMedicamento } from '../../../funciones/MEIN/entregaMedicamentos';

describe("Medicamentos e insumos", () => {
  // Ignora errores específicos del ResizeObserver
  Cypress.on("uncaught:exception", (err, runnable) => {
    if (
      err.message.includes(
        "ResizeObserver loop completed with undelivered notifications"
      )
    ) {
      return false;
    }
  });

  it("Pruebas", () => {
    // ✅ Bloquear la descarga del PDF si se hace por red

    loginMEIN("QA")
    concatenarHoraFecha()
    cy.readFile("cypress/fixtures/numeroDeReceta.json").then((data) => {
      const idoneaDelPaciente = data.idoneaDelPaciente;
      const receta = data.valor;
      const contrasenaConcatenada = data.contrasenaConcatenada;
      const numeroRecetaConcatenada = data.numeroRecetaConcatenada;


      //Usamos el valor
      if (idoneaDelPaciente != "" && receta != "") {
        transcripciónRecetaSimple(idoneaDelPaciente, contrasenaConcatenada, numeroRecetaConcatenada)
        preparacionMedicamento(numeroRecetaConcatenada)
        dispensacionMedicamento(numeroRecetaConcatenada)
        entregarMedicamento(numeroRecetaConcatenada)
      } else {
        cy.log('Idonea médica o Número de Receta VACIOS');
      }
      //cy.log('Leemos el campo de receta: '+receta)
      //return receta;
    });
  });
});
