import { obtenerFechaComoCadena } from "../../funciones/MEIN/funciones";

const tiempoEspera = 50000; // Tiempo de espera en milisegundos

// funcion para la entrada de medicamento en el formulario de transacción
export function entradaMedicamentoTransaccion() {
  cy.fixture("entradaMedicamentoTransaccion.json").then((transaccion) => {
    const t = transaccion[0];
    const nombreAlmacen = t.almacen;
    const tipoTransaccion = t.transaccion;
    const nombreProveedor = t.proveedor;

    cy.wrap(tipoTransaccion).as("tipoTransaccion");

    // Seleccionar almacén
    cy.get("#btn_admin_entrega_de_medicamentos_selecionar_opcion_deposito", {
      timeout: tiempoEspera,
    })
      .click()
      .type(nombreAlmacen, { delay: 100 })
      .type("{downarrow}")
      .type("{enter}")
      .blur();

    // Seleccionar transacción
    cy.get("#input_admin_entrega_de_medicamentos_persona_que_recibe", {
      timeout: tiempoEspera,
    })
      .click()
      .type(tipoTransaccion, { delay: 100 })
      .type("{downarrow}")
      .type("{enter}")
      .blur();

    // Fecha de recibo
    const fechaFormateada = obtenerFechaComoCadena("fechaCalendario");
    cy.get("#input_admin_entrega_de_medicamentos_fecha_recibo", {
      timeout: tiempoEspera,
    })
      .click()
      .type(fechaFormateada, { delay: 100 })
      .type("{downarrow}")
      .type("{enter}")
      .blur();

    // Función para número de referencia
    function numeroReferencia(intento = 1, maxIntentos = 15) {
      const aleatorio = Math.floor(100000 + Math.random() * 900000).toString();
      cy.log(`Intento ${intento}: generando referencia ${aleatorio}`);

      cy.wrap(aleatorio).as("numeroAleatorio");

      cy.get("#input_admin_entrega_de_medicamentos_numero_de_referencia", {
        timeout: tiempoEspera,
      })
        .filter('[type="number"]')
        .clear()
        .click()
        .type(aleatorio, { delay: 100 })
        .type("{enter}")
        .blur();

      cy.wait(500);

      return cy.get("body").then(($body) => {
        const err = $body.find(".ant-form-item-explain-error");
        if (
          err.length &&
          err.text().includes("Número de referencia existente")
        ) {
          cy.log(`❌ La referencia ${aleatorio} ya existe.`);
          if (intento < maxIntentos) {
            return numeroReferencia(intento + 1, maxIntentos);
          }
          throw new Error("Máximo de intentos alcanzado");
        }
        cy.log(`✅ Referencia aceptada: ${aleatorio}`);

        // Leer el archivo
        return cy
          .readFile("cypress/fixtures/entradaMedicamentoTransaccion.json")
          .then((medicamentos) => {
            //Agragar el ""numeroReferencia"
            medicamentos[0].numeroReferencia = aleatorio;
            // Guardar de nuevo el archivo

            return cy
              .writeFile(
                "cypress/fixtures/entradaMedicamentoTransaccion.json",
                medicamentos
              )
              .then(() => {
                cy.log(
                  `Número de referencia ${aleatorio} guardado en medicamentos.json`
                );
                return cy.wrap(aleatorio);
              });
          });
      });
    }

    // Uso de la función numeroReferencia
    numeroReferencia().then(() => {
      // Ingresar proveedor
      cy.get('input[type="text"]', {
        timeout: tiempoEspera,
      })
        .click()
        .type(nombreProveedor, { delay: 100 })
        .type("{enter}")
        .blur();
    });
  });
}

// Función para ingresar el  detalle del medicamento
export function entradaMedicamentoDetalle() {
  cy.fixture("medicamentos.json").then((detalleMedicamento) => {
    const detalles = detalleMedicamento.filter((d) => d.tipo);
    detalles.forEach((d, index) => {
      const grupoPresentacion = d.tipo;
      const nombreMedicamento = d.nombre;
      const nombreComercial = d.nombreConocido;
      const cantidad = d.cantidad;
      const cantidadPorEnvase = d.cantidadEnvase;
      const fechaVencimiento = d.vencimiento;

      // Ingresar la información del medicamento
      cy.get(".ant-card-body", { timeout: tiempoEspera }).should("exist");

      cy.get("#grupo", { timeout: tiempoEspera })
        .scrollIntoView()
        .should("be.visible")
        .click()
        .type(grupoPresentacion, { delay: 300 })
        .type("{downarrow}")
        .type("{enter}")
        .blur();

      // Medicamento
      cy.get("#medicamentoId", { timeout: tiempoEspera })
        .scrollIntoView()
        .should("be.visible")
        .clear()
        .click()
        .type(nombreMedicamento, { delay: 100 });

      // Espera que se renderice al menos una opción filtrada
      cy.get(`#medicamentoId_list [aria-label="${nombreMedicamento}"]`, {
        timeout: tiempoEspera,
      }).should("exist");

      // Selecciona la opción
      cy.get("#medicamentoId").type("{downarrow}").type("{enter}").blur();

      // Nombre comercial
      cy.get(".ant-input.ant-input-outlined", { timeout: tiempoEspera })
        .eq(1)
        .scrollIntoView()
        .click()
        .clear()
        .type(nombreComercial, { delay: 100 });

      // Registro sanitario
      cy.get("@numeroAleatorio").then((numero) => {
        const registroSanitario = `REGSAN-${numero}`;
        cy.get(
          "#input_admin_entrega_de_medicamentos_nombre_registro_sanitario",
          {
            timeout: tiempoEspera,
          }
        )
          .scrollIntoView()
          .should("be.visible")

          .click()
          .type(registroSanitario, { delay: 100 })
          .blur();
      });

      // Fabricante
      cy.get("@numeroAleatorio").then((numero) => {
        const fabricante = `FAB-${numero}`;
        cy.get(".ant-input.ant-input-outlined", { timeout: tiempoEspera })
          .eq(3)
          .scrollIntoView()
          .should("be.visible")

          .clear()

          .click()
          .type(fabricante, { delay: 100 })
          .blur();
      });

      // Lote
      cy.get("@numeroAleatorio").then((numero) => {
        const lote = `LOT-${numero}`;
        cy.get("#input_admin_entrega_de_medicamentos_nombre_lote", {
          timeout: tiempoEspera,
        })
          .scrollIntoView()
          .should("be.visible")

          .clear()

          .click()
          .type(lote, { delay: 100 })
          .blur();
      });

      // Cantidad
      cy.get("#input_admin_entrega_de_medicamentos_cantidad", {
        timeout: tiempoEspera,
      })
        .scrollIntoView()
        .should("be.visible")

        .click()

        .clear()
        .type(cantidad, { delay: 100 })
        .blur();

      // Cantidad por envase
      cy.get("#input_receta_cantidad_medicamento", {
        timeout: tiempoEspera,
      })
        .scrollIntoView()
        .should("be.visible")

        .click()
        .clear()
        .type(cantidadPorEnvase, { delay: 100 })
        .blur();

      // Fecha de vencimiento
      cy.get("#input_admin_entrega_de_medicamentos_vencimiento", {
        timeout: tiempoEspera,
      })
        .scrollIntoView()
        .should("be.visible")

        .click()
        .clear()
        .type(fechaVencimiento, { delay: 100 })
        .blur();
      cy.get("#btn_admin_entrega_de_medicamentos_añadir_medicamento", {
        timeout: tiempoEspera,
      })
        .scrollIntoView()
        .should("be.visible")
        .click();

      cy.get(".ant-table-tbody", { timeout: tiempoEspera }).should(
        "contain",
        nombreComercial
      );

      // Esperar hasta el último medicamento para hacer clic en "crear"
      if (index === detalles.length - 1) {
        cy.get("#btn_admin_entrega_de_medicamentos_steps_crear", {
          timeout: tiempoEspera,
        })
          .scrollIntoView()
          .should("be.visible")
          .click();
        //NAda
      }
    });
  }); // ← Cierra each
} //
