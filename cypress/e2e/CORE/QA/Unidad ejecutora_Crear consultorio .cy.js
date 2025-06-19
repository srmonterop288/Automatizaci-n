import "@applitools/testgenai-cypress/commands";

describe("Consultorios", () => {
  require("cypress-plugin-tab");
  require("cypress-xpath");

  it("Creación de consultorio", () => {
    const tiempo = 50000;

    // Login
    cy.login_CORE_QA();
    cy.url().should("not.include", "/login");

    // Menús y navegación a unidad ejecutora
    cy.get("#btn_menu_desplegable", { timeout: tiempo }).should("be.visible").click();

    cy.get("#spn_modulo_medical_records_list_executing_units", {
      timeout: tiempo,
    }).should("be.visible").click();

    cy.get("#btn_menu_desplegable", { timeout: tiempo }).should("be.visible").click();
    cy.wait(1000);
    cy.wait(100).tab();
    cy.wait(100).tab();

    // Buscar Unidad Ejecutora
    cy.get("#ddl_provincia_lista_unidad_ejecutora", { timeout: tiempo }).click({ force: true });
    cy.wait(500);
    cy.get("#ddl_provincia_lista_unidad_ejecutora_list .ant-select-item-option", {
      timeout: tiempo,
    })
      .eq(1)
      .click();
    cy.wait(100).tab();

    cy.get("#input_unidad_ejecutora", { timeout: tiempo })
      .should("exist")
      .should("be.visible")
      .type("POLICLINICA DE GUABITO")
      .click();

    cy.get("#btn_buscar", { timeout: tiempo }).should("be.visible").click();

    cy.get('[id^="btn_mas_opciones_unidad_ejecutora_"]', { timeout: tiempo }).first().click();
    cy.get('[id^="btn_administrar_unidad"]', { timeout: tiempo }).click();

    cy.get("div#div_tab_consultorios", { timeout: tiempo })
      .scrollIntoView()
      .should("be.visible")
      .click();

    // Función con lógica de reintento si hay duplicado
    function crearConsultorio(reintento = 0) {
      const randomNumber = Math.floor(Math.random() * (1000 - 500 + 1)) + 500;
      const codigo = randomNumber.toString(); // puedes usar uno fijo si lo prefieres

      cy.get("#btn_crear_consultorio", { timeout: tiempo })
        .scrollIntoView()
        .should("be.visible")
        .click();

      cy.get("#input_codigo_consultorio", { timeout: tiempo }).clear().type(randomNumber);
      cy.wait(100).tab();

      cy.get("#input_ubicacion_consultorio", { timeout: tiempo })
        .should("exist")
        .type("Edificio A, planta baja");
      cy.wait(100).tab();

      cy.get("#input_nombre_consultorio", { timeout: tiempo })
        .should("exist")
        .type("Consultorio_" + randomNumber);
      cy.wait(100).tab();

      cy.get("#btn_habilitar_consultorio", { timeout: tiempo }).contains("Sí").click();

      cy.wait(100).tab();
      cy.wait(100).tab();

      cy.get("div.ant-modal-content", { timeout: tiempo })
        .find("#btn_crear_consultorio")
        .should("be.visible")
        .click();

      // Verificar si aparece el modal de duplicado
      cy.wait(1000);

      cy.get("body").then(($body) => {
        if (
          $body.find(
            '.ant-modal-content:contains("Este consultorio ya se encuentra registrado")'
          ).length > 0
        ) {
          cy.log("⚠️ Consultorio duplicado detectado");

          cy.get("#btn_aceptar").click();

          if (reintento < 3) {
            cy.log("🔁 Reintentando con otro código...");
            crearConsultorio(reintento + 1);
          } else {
            throw new Error(
              "❌ Se alcanzó el número máximo de intentos por consultorios duplicados."
            );
          }
        } else {
          // Si no hay modal, continuar validaciones
          cy.get("h4.ant-typography.css-1rqnfsa", { timeout: tiempo })
            .parent()
            .invoke("css", "overflow", "visible")
            .scrollIntoView()
            .should("be.visible");

          cy.contains("Administración de recursos de una unidad ejecutora").should("be.visible");

          cy.get("#div_alerta", { timeout: tiempo })
            .scrollIntoView()
            .should("exist")
            .within(() => {
              cy.get(".ant-alert-message")
                .should("contain", "El consultorio se ha creado exitosamente")
                .and("be.visible");
            });

          cy.screenshot("Consultorios/Creación de consultorio_");
        }
      });
    }

    // Llamar la función
    crearConsultorio();
  });
});
