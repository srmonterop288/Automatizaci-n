import "@applitools/testgenai-cypress/commands";
describe("Unidades ejecutoras", () => {
  require("cypress-plugin-tab");
  require("cypress-xpath");

  it("Creación de unidad ejecutora", () => {
<<<<<<< HEAD
    // Llama a la función login
=======
>>>>>>> 2ad3fd9 (cambios MEIN)
    cy.login_CORE_QA();
    cy.url().should("not.include", "/login");

<<<<<<< HEAD
    // Verifica que el login haya sido exitoso, por ejemplo, comprobando que la URL cambió
    cy.url().should("not.include", "/login");

    cy.wait(1000);
    cy.get("#btn_menu_desplegable").should("be.visible").click();
    cy.wait(1000);
    cy.get("#spn_modulo_medical_records_list_executing_units")
      .should("be.visible")
      .click();
    cy.wait(1000);
    cy.get("#btn_menu_desplegable").should("be.visible").click();
    cy.wait(1000);
    cy.get("#btn_crear_unidad_ejecutora").should("be.visible").click();
    cy.wait(100).tab();
    cy.wait(100).tab();
    cy.wait(100).tab();
    cy.wait(100).tab();

    // 1. Provincia
    cy.get("#ddl_seleccionar_provincia_unidad_ejecutora") // Selecciona el campo de búsqueda
      .click({ force: true }); // Forza el clic si es necesario

    // Espera a que la lista de opciones se cargue (si es necesario)
    cy.wait(500); // Ajusta el tiempo de espera según la velocidad de la aplicación

    // Selecciona el primer elemento de la lista
    cy.get(
      "#ddl_seleccionar_provincia_unidad_ejecutora_list .ant-select-item-option"
    ) // Selecciona los elementos de la lista
      .eq(1) // Toma el primer elemento
      .click(); // Hace clic en el primer elemento
    cy.wait(100).tab();

    // 2. Distrito
    cy.get("#ddl_seleccionar_distrito_unidad_ejecutora") // Selecciona el campo de búsqueda
      .click({ force: true }); // Forza el clic si es necesario
    // Espera a que la lista de opciones se cargue (si es necesario)
    cy.wait(500); // Ajusta el tiempo de espera según la velocidad de la aplicación

    // Selecciona el primer elemento de la lista
    cy.get(
      "#ddl_seleccionar_distrito_unidad_ejecutora_list .ant-select-item-option"
    ) // Selecciona los elementos de la lista
      .first() // Toma el primer elemento
      .click(); // Hace clic en el primer elemento
    cy.wait(100).tab();

    // 3. Corregimiento
    cy.get("#ddl_seleccionar_corregimiento_unidad_ejecutora") // Selecciona el campo de búsqueda
      .click({ force: true }); // Forza el clic si es necesario
    // Espera a que la lista de opciones se cargue (si es necesario)
    cy.wait(500); // Ajusta el tiempo de espera según la velocidad de la aplicación

    // Selecciona el primer elemento de la lista
    cy.get(
      "#ddl_seleccionar_corregimiento_unidad_ejecutora_list .ant-select-item-option"
    ) // Selecciona los elementos de la lista
      .first() // Toma el primer elemento
      .click(); // Hace clic en el primer elemento
    cy.wait(100).tab();

    // 4. Nivel de atención
    cy.get("#ddl_seleccionar_nivel_atencion") // Selecciona el campo de búsqueda
      .click({ force: true }); // Forza el clic si es necesario
    // Espera a que la lista de opciones se cargue (si es necesario)
    cy.wait(500); // Ajusta el tiempo de espera según la velocidad de la aplicación

    // Selecciona el primer elemento de la lista
    cy.get("#ddl_seleccionar_nivel_atencion_list .ant-select-item-option") // Selecciona los elementos de la lista
      .first() // Toma el primer elemento
      .click(); // Hace clic en el primer elemento
    cy.wait(100).tab();

    // 5. Código unidad ejecutora
    const randomNumber = Math.floor(Math.random() * (1000 - 500 + 1)) + 500;
    cy.get("#input_codigo_unidad_ejecutora").type(randomNumber.toString()); //Escribir información
    cy.wait(100).tab();
    // 6. Unidad ejecutora
    cy.get("#input_nombre_unidad_ejecutora").type("Prueba" + randomNumber); //Escribir información
    cy.wait(100).tab();
    // 7. Habilitar unidad ejecutora
    cy.get("#btn_si_habilitar") // Selecciona el radio button usando el ID
      .check();
    cy.wait(100).tab();
    // 8. Selecciona el servicio
    cy.get("#ddl_seleccionar_servicio") // Selecciona el campo de búsqueda
      .click({ force: true }); // Forza el clic si es necesario
    // Espera a que la lista de opciones se cargue (si es necesario)
    cy.wait(500); // Ajusta el tiempo de espera según la velocidad de la aplicación

    // Selecciona el primer elemento de la lista
    cy.get("#ddl_seleccionar_servicio_list .ant-select-item-option") // Selecciona los elementos de la lista
      .eq(15) // Toma el elemento 10
      .click(); // Hace clic en el primer elemento
    cy.wait(100).tab();

    //Seleccionamos el botón Asignar servicio"
    cy.get("#btn_asignar_servicio").should("be.visible").click();
    cy.wait(100).tab();
    cy.get(".ant-alert-message") // Selecciona el div con la clase ant-alert-message
      .should("be.visible") // Asegura que el mensaje esté visible
      .and("contain.text", "Servicio agregado correctamente.");

    cy.wait(2000).tab();
    //Seleccionamos el botón Crear Unidad Ejecutora"
    cy.get("#btn_crear_unidad_ejecutora").should("be.visible").click();
    cy.wait(100).tab();
    cy.wait(2000).tab();

    //bucar Unidad Ejecutora
    cy.get("#ddl_provincia_lista_unidad_ejecutora") // Selecciona el campo de búsqueda
      .click({ force: true }); // Forza el clic si es necesario

    // Espera a que la lista de opciones se cargue (si es necesario)
    cy.wait(500); // Ajusta el tiempo de espera según la velocidad de la aplicación

    // Selecciona el primer elemento de la lista
    cy.get("#ddl_provincia_lista_unidad_ejecutora_list .ant-select-item-option") // Selecciona los elementos de la lista
      .eq(1) // Toma el primer elemento
      .click(); // Hace clic en el primer elemento
    cy.wait(100).tab();

    //Unidad ejecutora

    cy.get("#input_unidad_ejecutora").type("Prueba" + randomNumber); //Escribir información
    cy.wait(100).tab();
    cy.wait(100).tab();
    cy.get("#btn_buscar").should("be.visible").click();
    cy.wait(1000);
    cy.get('[id^="btn_ver_detalle_unidad_ejecutora_"]') // Selecciona el botón cuyo ID empieza con "btn_ver_detalle_unidad_ejecutora_"
      .click();
    cy.wait(1000);

    let contador = 1;
    cy.screenshot("Unidades ejecutoras/Creación de unidad ejecutora_");

    console.log("¡Prueba exitosa!");
=======
    cy.get("#btn_menu_desplegable", { timeout: 10000 }).should("be.visible").click();
    cy.get("#spn_modulo_medical_records_list_executing_units", { timeout: 10000 }).should("be.visible").click();
    cy.get("#btn_menu_desplegable", { timeout: 10000 }).should("be.visible").click();
    cy.get("#btn_crear_unidad_ejecutora", { timeout: 10000 }).should("be.visible").click();
    cy.tab().tab().tab().tab();

    cy.get("#ddl_seleccionar_provincia_unidad_ejecutora", { timeout: 5000 }).click({ force: true });
    cy.get("#ddl_seleccionar_provincia_unidad_ejecutora_list .ant-select-item-option", { timeout: 5000 }).eq(1).click();
    cy.tab();

    cy.get("#ddl_seleccionar_distrito_unidad_ejecutora", { timeout: 5000 }).click({ force: true });
    cy.get("#ddl_seleccionar_distrito_unidad_ejecutora_list .ant-select-item-option", { timeout: 5000 }).first().click();
    cy.tab();

    cy.get("#ddl_seleccionar_corregimiento_unidad_ejecutora", { timeout: 5000 }).click({ force: true });
    cy.get("#ddl_seleccionar_corregimiento_unidad_ejecutora_list .ant-select-item-option", { timeout: 5000 }).first().click();
    cy.tab();

    cy.get("#ddl_seleccionar_nivel_atencion", { timeout: 5000 }).click({ force: true });
    cy.get("#ddl_seleccionar_nivel_atencion_list .ant-select-item-option", { timeout: 5000 }).first().click();
    cy.tab();

    const randomNumber = Math.floor(Math.random() * (1000 - 500 + 1)) + 500;
    cy.get("#input_codigo_unidad_ejecutora", { timeout: 5000 }).type(randomNumber.toString());
    cy.tab();
    cy.get("#input_nombre_unidad_ejecutora", { timeout: 5000 }).type("Prueba" + randomNumber);
    cy.tab();
    cy.get("#btn_si_habilitar", { timeout: 5000 }).check();
    cy.tab();

    cy.get("#ddl_seleccionar_servicio", { timeout: 5000 }).click({ force: true });
    cy.get("#ddl_seleccionar_servicio_list .ant-select-item-option", { timeout: 5000 }).eq(15).click();
    cy.tab();

    cy.get("#btn_asignar_servicio", { timeout: 10000 }).should("be.visible").click();
    cy.tab();
    cy.get(".ant-alert-message", { timeout: 5000 }).should("be.visible").and("contain.text", "Servicio agregado correctamente.");
    cy.tab();

    cy.get("#btn_crear_unidad_ejecutora", { timeout: 10000 }).should("be.visible").click();
    cy.wait(1500);
    // Validación: si aparece el mensaje de unidad ya registrada, cancelar y recargar
    cy.get('body').then(($body) => {
      if ($body.find('#div_modal_confirmar_titulo:contains("ya se encuentra registrada")').length > 0) {
        cy.log('Unidad ya registrada, repitiendo intento.');
        cy.get('#btn_cancelar', { timeout: 5000 }).click();
        cy.reload();
      }
    });

    cy.tab().tab();
    cy.get("#ddl_provincia_lista_unidad_ejecutora", { timeout: 5000 }).click({ force: true });
    cy.get("#ddl_provincia_lista_unidad_ejecutora_list .ant-select-item-option", { timeout: 5000 }).eq(1).click();
    cy.tab();

    cy.get("#input_unidad_ejecutora", { timeout: 5000 }).type("Prueba" + randomNumber);
    cy.tab().tab();
    cy.get("#btn_buscar", { timeout: 10000 }).should("be.visible").click();

    cy.get('[id^="btn_ver_detalle_unidad_ejecutora_"]', { timeout: 10000 })
      .first()
      .should("be.visible")
      .click();

    cy.screenshot("Unidades ejecutoras/Creación de unidad ejecutora_");

>>>>>>> 2ad3fd9 (cambios MEIN)
    cy.log("¡Prueba exitosa!");
  });
});
