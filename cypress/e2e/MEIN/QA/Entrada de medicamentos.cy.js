// Importar Xpath para manejar selectores XPath
require("cypress-xpath");
// Importar cypress-iframe para manejar iframes
import "cypress-iframe";
// Importar dayjs para manejar fechas
import dayjs from "dayjs";
// Importar la función de inicio de sesión
import { loginMEIN } from "../../../funciones/MEIN/loginMEIN";

const tiempoEspera = 50000; // Tiempo de espera en milisegundos

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

    //Seleccionar el módulo "Entrada de medicamentos"
    cy.get("#spn_modulo_farmacia_entrada_de_medicamentos", {
      timeout: tiempoEspera,
    })
      .should("be.visible")
      .click();
    // Esperar a que se cargue el spinner y validar que no existe
    cy.get(".ant-spin-dot-holder", {
      timeout: tiempoEspera,
    }).should("not.exist");

    //Seleccionar el módulo "Entrada de medicamentos"
    cy.get("#btn_crear_nueva_entrada", {
      timeout: tiempoEspera,
    })
      .should("be.visible")
      .click();

    // Seleccionar el tipo de almacén
    cy.get("#btn_admin_entrega_de_medicamentos_selecionar_opcion_deposito", {
      timeout: tiempoEspera,
    })
      .click()
      .type("Pruebas Automation", { delay: 100 })
      .type("{downarrow}")
      .type("{enter}")
      .blur();

    // Seleccionar el tipo de transacción
    cy.get("#input_admin_entrega_de_medicamentos_persona_que_recibe", {
      timeout: tiempoEspera,
    })
      .click()
      .type("Recepcion compra local", { delay: 100 })
      .type("{downarrow}")
      .type("{enter}")
      .blur();

    // Seleccionar la fecha de recibo
    /*const hoy = new Date();
    const dia = String(hoy.getDate()).padStart(2, "0");
    const mes = String(hoy.getMonth() + 1).padStart(2, "0");
    const anio = hoy.getFullYear();
    const fechaActual = `${dia}-${mes}-${anio}`;
    */

    const fechaFormateada = dayjs().format("DD-MM-YYYY");

    cy.get("#input_admin_entrega_de_medicamentos_fecha_recibo", {
      timeout: tiempoEspera,
    })
      .click()
      .type(fechaFormateada, { delay: 100 })
      .type("{downarrow}")
      .type("{enter}")
      .blur();

    // Ingresar el número de referencia

    function ingresarReferenciaUnica(base = "01", intento = 0) {
      const numero = `${base}${intento > 0 ? `-${intento}` : ""}`;

      cy.get("#input_admin_entrega_de_medicamentos_numero_de_referencia", {
        timeout: tiempoEspera,
      })
        .filter('[type="number"]')
        .clear()
        .click()
        .type(numero, { delay: 100 })
        .type("{enter}")
        .blur();

      // Espera a que el sistema responda (puedes ajustar según comportamiento del sistema)
      cy.wait(500);

      // Verificar si aparece el mensaje de error
      cy.get("body").then(($body) => {
        if ($body.find(".ant-form-item-explain-error").length > 0) {
          const mensaje = $body.find(".ant-form-item-explain-error").text();
          if (mensaje.includes("Número de referencia existente")) {
            cy.log(`La referencia '${numero}' ya existe. Probando con otro...`);
            ingresarReferenciaUnica(base, intento + 1); // Llama con otro intento
          } else {
            cy.log(`Referencia aceptada: ${numero}`);
          }
        } else {
          cy.log(`Referencia aceptada (sin error visible): ${numero}`);
        }
      });
    }

    // Uso:
    ingresarReferenciaUnica();

    // Ingresar el número de Proveedor
    cy.get('input[type="text"]', {
      timeout: tiempoEspera,
    })
      .click()
      .type("Faicer", { delay: 100 })
      .type("{enter}")
      .blur();

    // Preionar el botón "Siguiente"

    cy.get("#btn_admin_entrega_de_medicamentos_steps_siguiente", {
      timeout: tiempoEspera,
    })
      .should("be.visible")
      .click();

    // Detalle: Recepcion compra local

    cy.get("#grupo", {
      timeout: tiempoEspera,
    })
      .should("be.visible")
      .click()
      .type("Tabletas", { delay: 100 })
      .type("{downarrow}")
      .type("{enter}")
      .blur();

    cy.get("#medicamentoId", {
      timeout: tiempoEspera,
    })
      .should("be.visible")
      .click()
      .type(
        "OMEPRAZOL 20mg,  cápsula con microesferas gastrorresistentes, V.O.",
        { delay: 100 }
      )
      .type("{downarrow}")
      .type("{enter}")
      .blur();

    cy.get("#input_admin_entrega_de_medicamentos_nombre_comercial", {
      timeout: tiempoEspera,
    })
      .should("be.visible")
      .click()
      .type("OMEPRAZOL", { delay: 100 })
      .blur();

    function ingresarRegistroSanitarioUnico() {
      const aleatorio = mat;
      cy.log(`Ingresando registro sanitario: ${registroSanitario}`);

      cy.get("#input_admin_entrega_de_medicamentos_nombre_registro_sanitario", {
        timeout: tiempoEspera,
      })
        .should("be.visible")
        .click()
        .type(registroSanitario, { delay: 100 })
        .blur();
    }

    ingresarRegistroSanitarioUnico(1);
  });
});
