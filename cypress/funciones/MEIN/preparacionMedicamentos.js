export function preparacionMedicamento(numeroDeReceta) {
  cy.get("#spn_modulo_farmacia_preparacion", { timeout: 15000 }).click();

  // Buscar recetario donde está la receta
  recetarioMedicamento(numeroDeReceta);

  // Clic en el botón de acción de la receta
  cy.xpath(
    '//*[@id="single-spa-application:@thv/core"]/div/div/main/section/section/div/div[4]/div/div[2]/div/div/div/div/div/div/div/div/div/div/table/tbody/tr[2]/td[7]/button',
    { timeout: 15000 }
  ).click();

  // Seleccionar la opción del dropdown de acciones
  cy.get("#icon_editar_deposito", { timeout: 15000 })
    .click()
    .wait(2000);

  // Cargar el JSON de medicamentos
  cy.fixture("medicamentos.json").then((listaMedicamentos) => {
    cy.wrap(listaMedicamentos).each((medicamento) => {
      // Buscar cada medicamento por nombre en la tabla de preparación
      cy.contains("td", medicamento.nombre, { timeout: 10000 })
      .scrollIntoView() // 👉 Esto fuerza a que se muestre en pantalla
      .should("be.visible") // Opcional: asegúrate de que está visible
      .parents("tr") // Nos subimos a toda la fila del medicamento
      .within(() => {
        cy.get("td").first().scrollIntoView().click().wait(3000); // También forzamos scroll al botón
      });
      // Luego de seleccionar todos, clic en guardar selección
      cy.get(
        "#btn_recetario_preparacion_de_medicamentos_guardar_seleccion_medicamentos",
        { timeout: 15000 }
      ).click();
    });

    // Guardar la preparación del medicamento
    cy.get("#btn_recetario_terminar_preparacion", { timeout: 15000 }).click();

    // Confirmar
    cy.get(
      "#btn_recetario_preparacion_de_medicamentos_confimar_modal_confirmar",
      { timeout: 15000 }
    )
      .click()
      .wait(3000);
  });
}

function recetarioMedicamento(numeroDeReceta) {
  // Abre el dropdown para obtener todas las opciones de recetarios
  cy.get("#input_tecnico_preparacion_seleccionar_deposito")
    .closest(".ant-select") // apunta al contenedor del select
    .click();

  // Espera a que carguen las opciones del dropdown
  cy.get(".ant-select-item-option", { timeout: 20000 }).then(($options) => {
    const recetarios = [...$options].map((option) => option.innerText.trim());

    let encontrada = false;

    // Iterar sobre recetarios
    cy.wrap(recetarios).each((recetario) => {
      // Si ya fue encontrada, termina iteración
      cy.then(() => {
        if (encontrada) return;

        cy.log(`🔍 Buscando en recetario: ${recetario}`);

        // Abre el dropdown de nuevo
        cy.get("#input_tecnico_preparacion_seleccionar_deposito")
          .closest(".ant-select")
          .click({ force: true })
          .wait(2000) // click forzado sobre el contenedor visible

        // Selecciona el recetario actual
        cy.get(".ant-select-item-option")
          .contains(recetario)
          .click({ force: true })
          .wait(2000);

        // Limpia e ingresa número de receta
        cy.get("#input_tecnico_preparacion_buscar_numero_receta", {
          timeout: 10000,
        })
          .clear()
          .type(numeroDeReceta)
          .wait(3000); // Espera a que cargue la tabla

        // Verifica si hay filas en la tabla
        cy.get("body").then(($body) => {
          const filas = $body.find(".ant-table-row");
          if (filas.length > 0) {
            encontrada = true;
            cy.log(`✅ Receta encontrada en recetario: ${recetario}`);

            // Aquí puedes hacer click en los botones de acción si lo necesitas
          } else {
            cy.log(`❌ No se encontró en recetario: ${recetario}`);
          }
        });
      });
    });
  });
}