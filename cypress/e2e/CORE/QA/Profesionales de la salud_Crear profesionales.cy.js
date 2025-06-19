import "@applitools/testgenai-cypress/commands";
describe("Crear Profesional de la Salud", () => {
  require("cypress-plugin-tab");
  require("cypress-xpath");

  it("Creación de usuarios y Profesional de la salud", () => {
    const tiempo = 50000;
    cy.login_CORE_QA();
    cy.url().should("not.include", "/login");

    cy.get("#btn_menu_desplegable", { timeout: tiempo }).should("be.visible").click();
    cy.get("#spn_modulo_medical_records_list_user", { timeout: tiempo }).should("be.visible").click();
    cy.get("#btn_menu_desplegable", { timeout: tiempo }).should("be.visible").click();
    cy.get("#btn_crear_usuario", { timeout: tiempo }).should("be.visible").click();
    cy.get("#ddl_tipo_identificacion", { timeout: tiempo }).click({ force: true });
    cy.get("#ddl_tipo_identificacion_list .ant-select-item-option", { timeout: tiempo }).first().click();
    cy.get("#ddl_tipo_identificacion").tab();

    let contador = 0;
    let imagen = 1;
    const rutaArchivoExcel = "cypress/fixtures/datos2.xlsx";

    cy.leerExcel(rutaArchivoExcel).then((datosExcel) => {
      Cypress._.each(datosExcel.slice(1), (fila) => {
        const DNI = fila[0];

        if (!DNI || DNI.trim() === "") {
          cy.window().then((win) => {
            win.alert("Prueba exitosa");
            cy.log("Prueba Finalizada: correctamente");
          });
          return;
        }

        cy.window().then((win) => win.alert("El DNI es correcto"));

        cy.get("#input_numero_cedula", { timeout: tiempo })
          .should("exist").scrollIntoView().should("be.visible")
          .type(DNI, { force: true });

        cy.contains("span.ant-breadcrumb-link", "Listado y búsqueda de usuarios")
          .scrollIntoView().should("be.visible");

        cy.get("#btn_validar_identificacion", { timeout: tiempo })
          .should("be.visible").scrollIntoView().click();

          cy.wait(1500);

        cy.get("body", { timeout: 10000 }).then(($body) => {
          if ($body.find('.ant-modal-content:contains("Este usuario ya se encuentra registrado")').length > 0) {
            cy.get("#btn_cancelar", { timeout: 5000 }).click();
            contador++;
            cy.log(`Contador incrementado: ${contador} — DNI duplicado: ${DNI}`);
            cy.get("#btn_crear_usuario", { timeout: tiempo }).should("be.visible").click();
            cy.get("#ddl_tipo_identificacion", { timeout: tiempo }).click({ force: true });
            cy.get("#ddl_tipo_identificacion_list .ant-select-item-option", { timeout: tiempo }).first().click();
            cy.get("#ddl_tipo_identificacion").tab();
            return;
          }

          const [NOMBRE, APELLIDO1, APELLIDO2, FECHANAC] = [fila[1], fila[2], fila[3], fila[4]];

          cy.get("#input_primer_nombre", { timeout: tiempo }).should("exist").scrollIntoView().type(NOMBRE);
          cy.get("#input_primer_apellido", { timeout: tiempo }).should("exist").scrollIntoView().type(APELLIDO1);
          cy.get("#input_segundo_apellido", { timeout: tiempo }).should("exist").scrollIntoView().type(APELLIDO2);
          cy.get("#input_fecha_nacimiento", { timeout: tiempo }).should("exist").scrollIntoView().type(FECHANAC);
          cy.get("#input_fecha_nacimiento").tab();

          
          
// Pais
cy.get('#ddl_pais_nacimiento', { timeout: 2000 })  // Espera hasta 2 segundos
  .should('exist')  // Asegura que el campo esté presente en el DOM
  .should('be.visible')  // Asegura que el campo sea visible
  .click({ force: true });  // Forza el clic si el campo no es interactuable

cy.get('#ddl_pais_nacimiento_list .ant-select-item-option', { timeout: 2000 })  // Asegura que los elementos de la lista existan
  .should('be.visible')  // Asegura que los elementos sean visibles
  .eq(163)  // Selecciona el elemento en la posición 163
  .scrollIntoView()  // Asegura que esté en el viewport
  .click();  // Hace clic en el elemento
          cy.wait(100).tab()

// Nacionalidad
cy.get('#ddl_nacionalidad', { timeout: 2000 })  // Espera hasta 2 segundos
  .should('exist')  // Asegura que el campo esté presente en el DOM
  .should('be.visible')  // Asegura que el campo sea visible
  .click();  // Realiza el clic si el campo es visible e interactuable

cy.get('#ddl_nacionalidad_list .ant-select-item-option', { timeout: 2000 })  // Espera hasta que los elementos de la lista estén presentes
  .should('be.visible')  // Asegura que los elementos sean visibles
  .eq(37)  // Selecciona el elemento en la posición 37
  .scrollIntoView()  // Asegura que el elemento esté en el viewport
  .click();  // Hace clic en el elemento seleccionado
            cy.wait(100).tab()

// Etnia
cy.get('#ddl_etnia', { timeout: 2000 })  // Espera hasta 2 segundos
  .should('exist')  // Asegura que el campo esté presente en el DOM
  .should('be.visible')  // Asegura que el campo sea visible
  .click();  // Realiza el clic si el campo es visible e interactuable

cy.get('#ddl_etnia_list .ant-select-item-option', { timeout: 2000 })  // Espera hasta que los elementos de la lista estén disponibles
  .should('be.visible')  // Asegura que los elementos sean visibles
  .eq(1)  // Selecciona el elemento en la posición 1
  .scrollIntoView()  // Asegura que el elemento esté dentro del viewport
  .click();  // Hace clic en el elemento seleccionado
              cy.wait(100).tab()

//Religion
cy.get('#ddl_religion', { timeout: 2000 }) 
.should('exist')
.should('be.visible') // Selecciona el campo de búsqueda
.click({ force: true });  // Forza el clic si es necesario
cy.wait(500);
cy.get('#ddl_religion_list .ant-select-item-option')  // Selecciona los elementos de la lista
.eq(0) // Toma el elemento 10
.scrollIntoView()     // asegura que esté en el viewport
.click(); // Hace clic en el primer elemento
  cy.wait(100).tab()


// Estado
cy.get('#ddl_estado_civil', { timeout: 2000 })  // Espera hasta 2 segundos
  .should('exist')  // Asegura que el campo esté presente en el DOM
  .should('be.visible')  // Asegura que el campo sea visible
  .click();  // Realiza el clic si el campo es visible e interactuable

cy.get('#ddl_estado_civil_list .ant-select-item-option', { timeout: 2000 })  // Espera hasta que los elementos de la lista estén disponibles
  .should('be.visible')  // Asegura que los elementos sean visibles
  .eq(0)  // Selecciona el primer elemento (índice 0)
  .scrollIntoView()  // Asegura que el elemento esté en el viewport
  .click();  // Hace clic en el primer elemento
                cy.wait(100).tab()

// Tipo beneficiario
cy.get('#ddl_tipo_beneficiario', { timeout: 2000 })  // Espera hasta 2 segundos
  .should('exist')  // Asegura que el campo esté presente en el DOM
  .should('be.visible')  // Asegura que el campo sea visible
  .click();  // Realiza el clic si el campo es visible e interactuable

cy.get('#ddl_tipo_beneficiario_list .ant-select-item-option', { timeout: 2000 })  // Espera hasta que los elementos de la lista estén disponibles
  .should('be.visible')  // Asegura que los elementos sean visibles
  .eq(7)  // Selecciona el elemento en la posición 7 (índice 7 es el octavo elemento)
  .scrollIntoView()  // Asegura que el elemento esté dentro del viewport
  .click();  // Hace clic en el elemento seleccionado
  cy.wait(100).tab()
cy.wait(100).tab()

// Ocupacion
cy.get('#ddl_ocupacion', { timeout: 2000 })  // Espera hasta 2 segundos
  .should('exist')  // Asegura que el campo esté presente en el DOM
  .should('be.visible')  // Asegura que el campo sea visible
  .click();  // Realiza el clic si el campo es visible e interactuable

cy.get('#ddl_ocupacion_list .ant-select-item-option', { timeout: 2000 })  // Espera hasta que los elementos de la lista estén disponibles
  .should('be.visible')  // Asegura que los elementos sean visibles
  .eq(8)  // Selecciona el noveno elemento (índice 8)
  .scrollIntoView()  // Asegura que el elemento esté dentro del viewport
  .click();  // Hace clic en el elemento seleccionado
cy.wait(100).tab();  // Espera 100ms antes de pasar a la siguiente acción (tabulación)

// Estudios
cy.get('#ddl_estudios', { timeout: 2000 })  // Espera hasta 2 segundos
  .should('exist')  // Asegura que el campo esté presente en el DOM
  .should('be.visible')  // Asegura que el campo sea visible
  .click();  // Realiza el clic si el campo es visible e interactuable

cy.get('#ddl_estudios_list .ant-select-item-option', { timeout: 2000 })  // Espera hasta que los elementos de la lista estén disponibles
  .should('be.visible')  // Asegura que los elementos sean visibles
  .eq(7)  // Selecciona el octavo elemento (índice 7)
  .scrollIntoView()  // Asegura que el elemento esté dentro del viewport
  .click();  // Hace clic en el elemento seleccionado
cy.wait(100).tab();  // Espera 100ms antes de pasar a la siguiente acción (tabulación)

// Sexo
cy.get('#ddl_sexo', { timeout: 2000 })  // Espera hasta 2 segundos para que el campo esté disponible
  .should('exist')  // Asegura que el campo esté presente en el DOM
  .should('be.visible')  // Asegura que el campo sea visible
  .click();  // Realiza el clic si el campo es visible e interactuable

cy.get('#ddl_sexo_list .ant-select-item-option', { timeout: 2000 })  // Espera hasta que los elementos de la lista estén disponibles
  .should('be.visible')  // Asegura que los elementos sean visibles
  .eq(0)  // Selecciona el primer elemento (índice 0)
  .scrollIntoView()  // Asegura que el elemento esté en el viewport
  .click();  // Hace clic en el elemento seleccionado
cy.wait(100).tab();  // Espera 100ms antes de pasar a la siguiente acción (tabulación)


    // Idioma                      
    cy.get('#ddl_idioma', { timeout: 2000 })  // Espera hasta 2 segundos para que el campo esté disponible
    .should('exist')  // Asegura que el campo esté presente en el DOM
    .should('be.visible')  // Asegura que el campo sea visible
    .click();  // Realiza el clic si el campo es visible e interactuable
  
  cy.get('#ddl_idioma_list .ant-select-item-option', { timeout: 2000 })  // Espera hasta que los elementos de la lista estén disponibles
    .should('be.visible')  // Asegura que los elementos sean visibles
    .eq(0)  // Selecciona el primer elemento (índice 0)
    .scrollIntoView()  // Asegura que el elemento esté dentro del viewport
    .click();  // Hace clic en el primer elemento
  cy.wait(100).tab()

// Sangre
cy.get('#ddl_grupo_sanguineo', { timeout: 2000 })  // Espera hasta 2 segundos para que el campo esté disponible
  .should('exist')  // Asegura que el campo esté presente en el DOM
  .should('be.visible')  // Asegura que el campo sea visible
  .click();  // Realiza el clic si el campo es visible e interactuable

cy.get('#ddl_grupo_sanguineo_list .ant-select-item-option', { timeout: 2000 })  // Espera hasta que los elementos de la lista estén disponibles
  .should('be.visible')  // Asegura que los elementos sean visibles
  .eq(6)  // Selecciona el séptimo elemento (índice 6)
  .scrollIntoView()  // Asegura que el elemento esté dentro del viewport
  .click();  // Hace clic en el elemento seleccionado
  cy.wait(100).tab()
  cy.wait(100).tab()


  cy.contains('span.ant-breadcrumb-link', 'Listado y búsqueda de usuarios')
  .scrollIntoView()  // Lleva el elemento al viewport
  .should('be.visible');


                            cy.get('#ddl_tipo_paciente', { timeout: 2000 })  // Selecciona el campo de búsqueda
                            .click({ force: true });  // Forza el clic si es necesario
                            cy.wait(500);
                            cy.get('#ddl_tipo_paciente_list .ant-select-item-option')  // Selecciona los elementos de la lista
                            .eq(0) // Toma el elemento 10
                              .click();  // Hace clic en el primer elemento
                              cy.wait(100).tab()

                              cy.get('#btn_paciente_asegurado_false', { timeout: 2000 })
                              .click()
                              .should('be.checked');
                              cy.wait(100).tab()


          cy.get("#btn_siguiente", { timeout: tiempo }).should("exist").scrollIntoView().should("be.visible").click();

          const ubicaciones = [
            { id: 'provincia', idx: 1 },
            { id: 'distrito', idx: 0 },
            { id: 'corregimiento', idx: 0 },
            { id: 'barrio', idx: 0 }
          ];

          ubicaciones.forEach(({ id, idx }) => {
            cy.get(`#input_${id}`, { timeout: tiempo }).click({ force: true });
            cy.get(`#input_${id}_list .ant-select-item-option`, { timeout: tiempo }).eq(idx).click();
            cy.get(`#input_${id}`).tab();
          });

          cy.get("#btn_siguiente", { timeout: tiempo }).should("be.visible").click();
          cy.get("#btn_siguiente", { timeout: tiempo }).should("be.visible").click();

          cy.get('.ant-alert-message')
            .scrollIntoView()
            .should('contain', 'El usuario se ha creado exitosamente.')
            .and('be.visible');

          cy.screenshot(
            "Crear Paciente_QA/Crear Paciente_" +
            String(imagen++).padStart(2, "0")
          );

          //Crear Profesional de la Salud-------------------------------------------------------------------------------------------------

        cy.wait(100).tab();
        cy.get("#btn_menu_desplegable").should("be.visible").click();
        cy.wait(1000);
        cy.get("#spn_modulo_medical_records_listar_profesional_salud")
          .should("be.visible")
          .click();
        cy.wait(1000);
        cy.get("#btn_menu_desplegable").should("be.visible").click();
        cy.wait(1000);
        cy.wait(100).tab();
        cy.wait(100).tab();
        cy.get("#btn_crear_profesional_de_la_salud")
          .should("be.visible")
          .click();
        cy.wait(100).tab();
        cy.wait(100).tab();
        cy.wait(100).tab();
        cy.wait(100).tab();

        cy.get("#ddl_tipo_identificacion") // Selecciona el campo de búsqueda
          .click({ force: true }); // Forza el clic si es necesario
        cy.wait(500);
        cy.get("#ddl_tipo_identificacion_list .ant-select-item-option") // Selecciona los elementos de la lista
          .first() // Toma el primer elemento
          .click(); // Hace clic en el primer elemento
        cy.wait(100).tab();

        // Ingresar DNI

        cy.get("#txt_tipo_identificacion", { timeout: 1000 })
          .should("exist")
          .should("be.visible")
          .type(DNI)
          .click();

        cy.get("#btn_validar").should("be.visible").click();
        cy.wait(1000);

        cy.get("#input_numero_empleado", { timeout: 1000 })
          .should("exist")
          .should("be.visible")
          .type(DNI)
          .click();

        cy.get("#input_numero_seguro_social", { timeout: 1000 })
          .should("exist")
          .should("be.visible")
          .type(DNI)
          .click();

        cy.get("#input_cargo_ocupado", { timeout: 1000 })
          .should("exist")
          .should("be.visible")
          .type(DNI)
          .click();
        cy.wait(100).tab();

        //correo
        const CORREO = fila[5]; // Primer fila, segunda columna
        cy.get("#input_correo_electronico_institucional", { timeout: 1000 })
          .should("exist")
          .should("be.visible")
          .type(CORREO)
          .click();
        cy.wait(500).tab();
        cy.wait(500);

        //turno
        cy.get("#ddl_turno") // Selecciona el campo de búsqueda
          .click({ force: true }); // Forza el clic si es necesario
        cy.wait(500);
        cy.get("#ddl_turno_list .ant-select-item-option") // Selecciona los elementos de la lista
          .eq(2) // Toma el elemento 10
          .click(); // Hace clic en el primer elemento
        cy.wait(100).tab();

        //Horario
        cy.get("#input_horario_turno", { timeout: 1000 })
          .should("exist")
          .should("be.visible")
          .type("12:00 AM")
          .click();
        cy.wait(100).tab();

        cy.get("#input_horario_turno_fin", { timeout: 1000 })
          .should("exist")
          .should("be.visible")
          .type("12:00 AM")
          .click();
        cy.wait(100).tab();

        cy.get("#btn_siguiente").should("be.visible").click();
        cy.wait(1000);
        cy.wait(100).tab();

        cy.get("#ddl_seleccionar_profesion") // Selecciona el campo de búsqueda
          .click({ force: true }); // Forza el clic si es necesario
        cy.wait(500);
        cy.get("#ddl_seleccionar_profesion_list .ant-select-item-option") // Selecciona los elementos de la lista
          .eq(0) // Toma el elemento 10
          .click(); // Hace clic en el primer elemento
        cy.wait(100).tab();

        cy.get("#input_numero_registro", { timeout: 1000 })
          .should("exist")
          .should("be.visible")
          .type(DNI)
          .click();
        cy.wait(100).tab();

        cy.get("#btn_agregar_profesion").should("be.visible").click();
        cy.wait(1000);
        cy.wait(100).tab();
        cy.wait(100).tab();
        cy.wait(100).tab();
        cy.wait(100).tab();
        cy.wait(100).tab();
        cy.wait(100).tab();
        cy.wait(100).tab();
        cy.get("#btn_siguiente").should("be.visible").click();
        cy.wait(2000);

        //Unidad Ejecutora////////////////////

        // Usar los datos del Excel
        // Provincia
        cy.get("#ddl_provincia").scrollIntoView().should("be.visible");
        const PROVINCIA = fila[6]; // Primer fila, primera columna (usando índices 0 basados)
        cy.get("#ddl_provincia", { timeout: 1000 })
          .should("exist")
          .should("be.visible")
          .type(PROVINCIA)
          .type("{enter}");

        // Usar los datos del Excel
        // Unidad Ejecutora
        cy.get("#ddl_unidad_ejecutora").scrollIntoView().should("be.visible");
        const UNIDADE = fila[7]; // Primer fila, primera columna (usando índices 0 basados)
        cy.get("#ddl_unidad_ejecutora", { timeout: 1000 })
          .should("exist")
          .should("be.visible")
          .type(UNIDADE)
          .type("{enter}");

        cy.get("#btn_agregar_unidad_ejecutora").should("be.visible").click();
        cy.wait(1000);
        cy.wait(100).tab();
        cy.wait(100).tab();
        cy.wait(100).tab();
        cy.wait(100).tab();
        cy.wait(100).tab();
        cy.get("#btn_siguiente", { timeout: 5000 }) // Espera hasta 5 segundos
          .should("exist") // Asegura que el botón esté en el DOM
          .scrollIntoView() // Asegura que el botón esté dentro del área visible
          .should("be.visible") // Asegura que el botón sea visible
          .click();
        cy.wait(1000);
        cy.wait(100).tab();

        // Verificar que el Paciente fue creado exitosamente

        cy.get("#div_alerta_listar_profesional_salud").scrollIntoView();
        // Verificar que la alerta tenga el mensaje correcto y sea visible
        cy.get("#div_alerta_listar_profesional_salud .ant-alert-message")
          .should("contain", "Los cambios se han guardado exitosamente")
          .and("be.visible"); // Asegura que el mensaje esté visible // Asegura que el mensaje esté visible

        cy.screenshot(
          "Profesionales de la Salud/Creación de profesional de la salud_"
        );
          cy.get("#btn_menu_desplegable", { timeout: tiempo }).should("be.visible").click();
          cy.get("#spn_modulo_medical_records_list_user", { timeout: tiempo }).should("be.visible").click();
          cy.get("#btn_menu_desplegable", { timeout: tiempo }).should("be.visible").click();
          cy.get("#btn_crear_usuario", { timeout: tiempo }).should("be.visible").click();
          cy.get("#ddl_tipo_identificacion", { timeout: tiempo }).click({ force: true });
          cy.get("#ddl_tipo_identificacion_list .ant-select-item-option", { timeout: tiempo }).first().click();
          cy.get("#ddl_tipo_identificacion").tab();


          contador++;
          cy.log(`Contador: ${contador}, DNI: ${DNI}`);
        });
      });
    });

    cy.wait(1000);
    console.log("¡Prueba exitosa!");
    cy.log("¡Prueba exitosa!");


  });
});


        