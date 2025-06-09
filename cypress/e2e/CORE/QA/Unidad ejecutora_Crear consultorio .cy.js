import "@applitools/testgenai-cypress/commands";
describe("Consultorios", () => {
  require("cypress-plugin-tab");
  require("cypress-xpath");

  it("Creación de consultorio", () => {
    const tiempo = 50000;
    // Llama a la función login
    cy.login_CORE_QA();

    // Verifica que el login haya sido exitoso
    cy.url().should("not.include", "/login");

    cy.get("#btn_menu_desplegable", { timeout: tiempo })
      .should("be.visible")
      .click();

    cy.get("#spn_modulo_medical_records_list_executing_units", {
      timeout: tiempo,
    })
      .should("be.visible")
      .click();

    cy.get("#btn_menu_desplegable", { timeout: tiempo })
      .should("be.visible")
      .click();
    cy.wait(1000);
    cy.wait(100).tab();
    cy.wait(100).tab();

    //Buscar Unidad Ejecutora------------------

    cy.get("#ddl_provincia_lista_unidad_ejecutora", { timeout: tiempo }) // Selecciona el campo de búsqueda
      .click({ force: true }); // Forza el clic si es necesario
    cy.wait(500);
    cy.get(
      "#ddl_provincia_lista_unidad_ejecutora_list .ant-select-item-option",
      { timeout: tiempo }
    ) // Selecciona los elementos de la lista
      .eq(1) // Toma el elemento 10
      .click(); // Hace clic en el primer elemento
    cy.wait(100).tab();

    cy.get("#input_unidad_ejecutora", { timeout: tiempo })
      .should("exist")
      .should("be.visible")
      .type("POLICLINICA DE GUABITO")
      .click();

    cy.get("#btn_buscar", { timeout: tiempo }).should("be.visible").click();

    cy.get('[id^="btn_mas_opciones_unidad_ejecutora_"]', { timeout: tiempo })
      .first()
      .click();
    cy.get('[id^="btn_administrar_unidad"]', { timeout: tiempo }).click();

    cy.get("div#div_tab_consultorios", { timeout: tiempo })
      .scrollIntoView() // Scroll the element into view if it's clipped
      .should("be.visible")
      .click();

    cy.get("#btn_crear_consultorio", { timeout: tiempo })
      .scrollIntoView()
      .should("be.visible")
      .click();

    const randomNumber = Math.floor(Math.random() * (1000 - 500 + 1)) + 500;
    cy.get("#input_codigo_consultorio", { timeout: tiempo }).type(
      randomNumber.toString()
    ); //Escribir información
    cy.wait(100).tab();

    cy.get("#input_ubicacion_consultorio", { timeout: tiempo })
      .should("exist")
      .should("be.visible")
      .type("Edificio A, planta baja")
      .click();
    cy.wait(100).tab();

    cy.get("#input_nombre_consultorio", { timeout: tiempo })
      .should("exist")
      .should("be.visible")
      .type("Consultorio_")
      .type(randomNumber.toString())
      .click();

    cy.get("#btn_habilitar_consultorio", { timeout: tiempo })
      .contains("Sí") // Verifica que el texto 'Sí' esté presente en el botón
      .click();

    cy.wait(100).tab();
    cy.wait(100).tab();

    cy.get("div.ant-modal-content", { timeout: tiempo }) // Selecciona el div con la clase 'ant-modal-content'
      .find("#btn_crear_consultorio") // Busca el elemento con el id 'btn_crear_consultorio' dentro de ese div
      .should("be.visible") // Verifica que el botón sea visible
      .click();

    cy.get("h4.ant-typography.css-1rqnfsa", { timeout: tiempo }) // Selecciona el elemento
      .parent() // Obtiene el contenedor padre
      .then(($parent) => {
        // Cambia temporalmente el estilo overflow para permitir ver el contenido
        $parent.css("overflow", "visible");
      })
      .scrollIntoView() // Desplaza a la vista
      .should("be.visible");
    cy.contains("Administración de recursos de una unidad ejecutora") // Busca el texto exacto en la página
      .should("be.visible");

    cy.wait(1000);

    let imagen = 1;
    cy.get("#div_alerta", { timeout: tiempo }) // Espera hasta 10s si es necesario
      .scrollIntoView()
      .should("exist")
      .within(() => {
        cy.get(".ant-alert-message")
          .should("contain", "El consultorio se ha creado exitosamente")
          .and("be.visible");
      });

    cy.screenshot("Consultorios/Creación de consultorio_");
  });
});
