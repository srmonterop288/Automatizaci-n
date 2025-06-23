// Importar Xpath para manejar selectores XPath
require("cypress-xpath");
// Importar cypress-iframe para manejar iframes
import "cypress-iframe";
// Importar la función de inicio de sesión
import { loginMEIN } from "../../../funciones/MEIN/loginMEIN";

// Importar las funciones para manejar la entrada de medicamentos
import {
  entradaMedicamentoTransaccion,
  entradaMedicamentoDetalle,
} from "../../../funciones/MEIN/entradaMedicamentos";

const tiempoEspera = 500000; // Tiempo de espera en milisegundos

describe("Entrada de medicamentos", () => {
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

  it("Realizar la entrada de medicamentos", () => {
    // Iniciar sesión
    loginMEIN("QA");

    // Seleccionar el módulo "Entrada de medicamentos"
    cy.get("#spn_modulo_farmacia_entrada_de_medicamentos", {
      timeout: tiempoEspera,
    })
      .should("be.visible")
      .click();

    // Esperar a que desaparezca el spinner
    cy.get(".ant-spin-dot-holder", { timeout: tiempoEspera }).should(
      "not.exist"
    );

    // Crear nueva entrada
    cy.get("#btn_crear_nueva_entrada", { timeout: tiempoEspera })
      .should("be.visible")
      .click();

    // Función para ingresar los datos de la transacción
    entradaMedicamentoTransaccion();

    // Presionar el botón "Siguiente"
    cy.get("#btn_admin_entrega_de_medicamentos_steps_siguiente", {
      timeout: tiempoEspera,
    })
      .should("be.visible")
      .click();

    //Ingresar la información en el paso 2; Entrada de medicamentos "Detalle: Recepcion compra local"

    entradaMedicamentoDetalle();

    // Presionar el botón "Confirmar"
    cy.get("#btn_admin_entrega_de_medicamentos_confirmar_modal_confirmar", {
      timeout: tiempoEspera,
    })
      .should("exist")
      .click();

    // Verificar la creación de medicamentos
    cy.get("@tipoTransaccion", {
      timeout: tiempoEspera,
    }).then((tipo) => {
      cy.get(".ant-table-tbody", { timeout: tiempoEspera }).should(
        "contain",
        tipo
      );

      cy.readFile("cypress/fixtures/entradaMedicamentoTransaccion.json").then(
        (medicamentos) => {
          const numeroReferencia = medicamentos[0].numeroReferencia;

          cy.get(".ant-table-tbody", { timeout: tiempoEspera }).should(
            "contain",
            numeroReferencia
          );
        }
      );
    });
  });
});
