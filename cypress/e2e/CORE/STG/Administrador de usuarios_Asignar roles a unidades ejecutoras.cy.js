import '@applitools/testgenai-cypress/commands';

describe("TC_CP_Administrador de usuarios_Asignar roles a unidades ejecutoras", () => {
  require('cypress-plugin-tab');
  require('cypress-xpath');

  it('debería iniciar sesión con éxito', () => {
    // Llama a la función login
    cy.login_CORE_STG();

    // Verifica que el login haya sido exitoso
    cy.url().should('not.include', '/login');

    cy.wait(1000);
    cy.get("#btn_menu_desplegable").should('be.visible').click();
    cy.wait(1000);
    cy.get("#spn_modulo_medical_records_administrar_usuarios").should('be.visible').click();
    cy.wait(1000);
    cy.get("#btn_menu_desplegable").should('be.visible').click();
    cy.wait(1000);

    let contador = 0;
    let imagen = 1; // Definir la variable imagen aquí, fuera del bucle

    const rutaArchivoExcel = 'cypress/fixtures/datos2.xlsx';

    // Leer los datos del archivo Excel
    cy.leerExcel(rutaArchivoExcel).then((datosExcel) => {
      // Mostrar los datos leídos
      console.log(datosExcel);

      // Recorrer los datos del archivo Excel
      for (let i = 1; i < datosExcel.length; i++) { // Comenzamos desde 1 para saltarnos la fila de encabezados
        // Tomar el valor de la primera columna (DNI)
        const DNI = datosExcel[i][0]; // Primer fila, primera columna (usando índices 0 basados)

        if (!DNI || DNI.trim() === 'undefined') {
          // Si el DNI es undefined o vacío, finalizar correctamente el test
          cy.window().then((win) => {
            win.alert('DNI no válido o vacío. Finalizando prueba.');
            cy.log('Prueba Finalizada: correctamente');
          });
          return; // Detiene la ejecución del test
        }

        // Si el DNI es válido, continuar con la prueba
        cy.window().then((win) => {
          win.alert('El DNI es correcto');
        });

        cy.get('#searchNamesOrIdentifications', { timeout: 5000 })
          .scrollIntoView()
          .should('exist')
          .should('be.visible')
          .type(`${DNI}{enter}`);
        cy.wait(4000);
        cy.wait(100).tab()

          cy.get('#numeroDocumento', { timeout: 5000 })
          .scrollIntoView()
          .should('exist')
          .should('be.visible')
          .type(`${DNI}{enter}`);
        cy.wait(2000);

        cy.get('[id*="btn_ver_detalle_"]')
          .first()
          .scrollIntoView()
          .should('be.visible')
          .click();

        // Usar los datos del Excel
        // Ingresar NOMBRE
        const UNIDADE = datosExcel[i][7]; // Primer fila, segunda columna
        cy.get('#ddl_unidad_ejecutora', { timeout: 5000 })
          .should('exist')
          .should('be.visible')
          .type(UNIDADE)
          .type('{enter}');
        cy.wait(100).tab();

        // Usar los datos del Excel
        // Ingresar APELLIDO
        cy.xpath('//*[@id="single-spa-application:@thv/core"]/div/div/main/section/div/div/div/div/div[3]/div[2]/form/div/div[2]/div/div/div[2]/div/div/div/div/div')
          .scrollIntoView()
          .should('be.visible')
          .click();

        cy.get('.ant-select-dropdown .ant-select-item-option')
          .contains('Urgencia')
          .click();
        cy.wait(100).tab();

        const ROL = datosExcel[i][9];
        cy.xpath('//*[@id="single-spa-application:@thv/core"]/div/div/main/section/div/div/div/div/div[3]/div[2]/form/div/div[3]/div/div/div[2]/div/div/div/div/div')
          .scrollIntoView()
          .should('be.visible')
          .type(ROL)
          .type('{enter}');
        cy.wait(100).tab();

        cy.get("#btn_asignar_rol").should('be.visible').click();

        // Tomamos la captura de pantalla **antes** de incrementar la variable imagen
        cy.get('.ant-alert-message')
          .scrollIntoView()
          .should('contain', 'El rol ha sido asignado correctamente.')
          .and('be.visible'); // Asegura que el mensaje esté visible

        // Tomamos la captura de pantalla
        cy.screenshot(
          "Administrador_de_Usuarios_STG/Asignar Rol_" +
           String(imagen++).padStart(2, "0")
            );

        cy.wait(1000);
        cy.get("#btn_menu_desplegable").should('be.visible').click();
        cy.wait(1000);
        cy.get("#spn_modulo_medical_records_administrar_usuarios").should('be.visible').click();
        cy.wait(1000);
        cy.get("#btn_menu_desplegable").should('be.visible').click();
        cy.wait(1000);

        // Incrementar el contador
        contador++;

        // Mostrar en la consola el contador y el DNI
        cy.log(`Contador: ${contador}, DNI: ${DNI}`);
      }
    });

    cy.wait(1000);
    console.log('¡Prueba exitosa!');
    cy.log('¡Prueba exitosa!');
  });
});
