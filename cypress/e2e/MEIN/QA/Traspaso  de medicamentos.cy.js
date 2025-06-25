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

    // Crear transpaso de medicamentos
    cy.get(".ant-tabs-tab-btn", { timeout: tiempoEspera })
      .eq(1)
      .scrollIntoView()
      .click();

    cy.fixture("entradaMedicamentoTransaccion.json").then((datosTrapaso) => {
      const origentraspaso = datosTrapaso[0].almacen;
      const destinotraspaso = datosTrapaso[0].subAlmacen;

      cy.get("#select_admin_transpasos_de_medicamentos_selecionar_deposito", {
        timeout: tiempoEspera,
      })
        .click()
        .type(origentraspaso, { delay: 100 })
        .type("{downarrow}")
        .type("{enter}")
        .blur();
      cy.get("#btn_admin_entrega_de_medicamentos_selecionar_opcion_deposito", {
        timeout: tiempoEspera,
      })
        .click()
        .type(destinotraspaso, { delay: 100 })
        .type("{downarrow}")
        .type("{enter}")
        .blur();
    });

    cy.fixture("medicamentos.json").then((datosMedicamentos) => {
      datosMedicamentos.forEach((medicameto) => {
        const nombreMedicamento = medicameto.nombre;
        cy.wrap(nombreMedicamento).as("nombreMedicamento");

        // Filtrar por nombre del medicamento
        cy.xpath(
          '//*[@id="single-spa-application:@thv/core"]/div/div/main/section/section/div/div[3]/div/div/div[2]/div/div[2]/div/div/div/div[1]/form/div/div/div/div/div/span/span/span[1]',
          {
            timeout: tiempoEspera,
          }
        )
          .scrollIntoView()
          .should("exist")
          .click()
          .clear()
          .type(nombreMedicamento, { delay: 100 })
          .wait(2000) // Espera para que se cargue la lista
          .type("{downarrow}")
          .type("{enter}");

        // Esperar y recorrer filas de la tabla
        cy.get(".ant-table-tbody", { timeout: tiempoEspera })
          .find("tr")
          .each(($fila, index) => {
            if (index > 0) {
              cy.wrap($fila)
                .find("td:nth-child(7)")
                .invoke("text")
                .then((textoExistencia) => {
                  const existencia = parseFloat(textoExistencia.trim());
                  if (existencia >= 1) {
                    cy.wrap($fila).contains("button", "Agregar").click();
                    cy.wait(300);
                  }
                });
            }
          });
      });
    });

    cy.get("#btn_admin_entrega_de_medicamentos_steps_siguiente", {
      timeout: tiempoEspera,
    })
      .scrollIntoView()
      .should("exist")
      .click();

    cy.get("#btn_admin_entrega_de_medicamentos_steps_crear", {
      timeout: tiempoEspera,
    })
      .scrollIntoView()
      .should("exist")
      .click();

    cy.get("#btn_admin_entrega_de_medicamentos_confirmar_modal_confirmar", {
      timeout: tiempoEspera,
    })
      .should("exist")
      .click();

    cy.get(".ant-alert-message", {
      timeout: tiempoEspera,
    })
      .scrollIntoView()
      .should("contain", "Se ha realizado el traspaso");
  });
});
