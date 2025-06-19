import "@applitools/testgenai-cypress/commands";
require("cypress-plugin-tab");
require("cypress-xpath");

describe("Unidades ejecutoras", () => {
  const tiempo = 10000;
  const MAX_INTENTOS = 2;

  const crearUnidadEjecutora = (intento = 1) => {
    if (intento > MAX_INTENTOS) {
      cy.log("🚫 Se alcanzó el número máximo de intentos.");
      return;
    }

    const randomNumber = Math.floor(Math.random() * (1000 - 500 + 1)) + 500;
    const nombreUnidad = `Prueba${randomNumber}`;

    cy.log(`🌀 Intento #${intento} - creando unidad: ${nombreUnidad}`);

    // Ir al menú de creación
    cy.get("#btn_menu_desplegable", { timeout: tiempo }).click();
    cy.get("#spn_modulo_medical_records_list_executing_units", { timeout: tiempo }).click();
    cy.get("#btn_menu_desplegable", { timeout: tiempo }).click();
    cy.get("#btn_crear_unidad_ejecutora", { timeout: tiempo }).click();

    // Provincia
    cy.get("#ddl_seleccionar_provincia_unidad_ejecutora", { timeout: tiempo }).click();
    cy.get("#ddl_seleccionar_provincia_unidad_ejecutora_list .ant-select-item-option", { timeout: tiempo })
      .eq(1).click();

    // Distrito
    cy.get("#ddl_seleccionar_distrito_unidad_ejecutora", { timeout: tiempo }).click();
    cy.get("#ddl_seleccionar_distrito_unidad_ejecutora_list .ant-select-item-option", { timeout: tiempo })
      .first().click();

    // Corregimiento
    cy.get("#ddl_seleccionar_corregimiento_unidad_ejecutora", { timeout: tiempo }).click();
    cy.get("#ddl_seleccionar_corregimiento_unidad_ejecutora_list .ant-select-item-option", { timeout: tiempo })
      .first().click();

    // Nivel de atención
    cy.get("#ddl_seleccionar_nivel_atencion", { timeout: tiempo }).click();
    cy.get("#ddl_seleccionar_nivel_atencion_list .ant-select-item-option", { timeout: tiempo })
      .first().click();

    // Código y nombre
    cy.get("#input_codigo_unidad_ejecutora", { timeout: tiempo }).type(randomNumber.toString());
    cy.get("#input_nombre_unidad_ejecutora", { timeout: tiempo }).type(nombreUnidad);

    // Habilitar
    cy.get("#btn_si_habilitar", { timeout: tiempo }).check();

    // Servicio
    cy.get("#ddl_seleccionar_servicio", { timeout: tiempo }).click();
    cy.get("#ddl_seleccionar_servicio_list .ant-select-item-option", { timeout: tiempo })
      .eq(15).click();
    cy.get("#btn_asignar_servicio", { timeout: tiempo }).click();

    // Confirmación servicio
    cy.get(".ant-alert-message", { timeout: tiempo })
      .should("contain.text", "Servicio agregado correctamente.");

    // Crear unidad
    cy.get("#btn_crear_unidad_ejecutora", { timeout: tiempo }).click();

    // Verificar si aparece modal de duplicado
    cy.wait(1000);
    cy.get("body", { timeout: tiempo }).then(($body) => {
      if (
        $body.find('.ant-modal-content:contains("ya se encuentra registrada")').length > 0
      ) {
        cy.log("⚠️ Unidad Ejecutora duplicada detectada");
        cy.get("#btn_aceptar", { timeout: tiempo }).click();

        // Reintentar con nuevo nombre/código
        crearUnidadEjecutora(intento + 1);
      } else {
        // Buscar y verificar que se creó
        cy.get("#ddl_provincia_lista_unidad_ejecutora", { timeout: tiempo }).click();
        cy.get("#ddl_provincia_lista_unidad_ejecutora_list .ant-select-item-option", { timeout: tiempo })
          .eq(1).click();

        cy.get("#input_unidad_ejecutora", { timeout: tiempo }).type(nombreUnidad);
        cy.get("#btn_buscar", { timeout: tiempo }).click();

        cy.get('[id^="btn_ver_detalle_unidad_ejecutora_"]', { timeout: tiempo }).first().click();
        cy.screenshot(`Unidades ejecutoras/Creación de unidad ejecutora_${nombreUnidad}`);

        cy.log("✅ Unidad Ejecutora creada exitosamente.");
      }
    });
  };

  it("Creación de unidad ejecutora con validación de duplicados", () => {
    cy.login_CORE_QA();
    cy.url().should("not.include", "/login");

    crearUnidadEjecutora();
  });
});
