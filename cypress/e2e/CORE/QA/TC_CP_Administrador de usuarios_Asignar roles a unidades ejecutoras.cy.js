import '@applitools/testgenai-cypress/commands'
describe("TC_CP_Administrador de usuarios_Asignar roles a unidades ejecutoras", () => {
  require('cypress-plugin-tab')
  require('cypress-xpath');

  it('debería iniciar sesión con éxito', () => {
    // Llama a la función login 
    cy.login_CORE_QA();

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
      const rutaArchivoExcel = 'cypress/fixtures/datos2.xlsx';
        // Leer los datos del archivo Excel
      cy.leerExcel(rutaArchivoExcel).then((datosExcel) => {
        // Mostrar los datos leídos
        console.log(datosExcel);


        // Recorrer los datos del archivo Excel
      for (let i = 1; i < datosExcel.length; i++) { // Comenzamos desde 1 para saltarnos la fila de encabezados
        // Tomar el valor de la primera columna (DNI)

  
        // Usar los datos del Excel
        // Ingresar DNI
        const DNI = datosExcel[i][0]; // Primer fila, primera columna (usando índices 0 basados)


        if (DNI && DNI.trim() !== '') {
          // Si el DNI es válido, proceder con la acción
          cy.window().then((win) => {
            win.alert('El DNI es correcto');
          });
        } else {
          // Si el DNI está vacío o no es válido, lanzar una alerta
          cy.window().then((win) => {
            win.alert('Prueba exitosa');
            cy.log('Prueba Finalizada: correctamente');
            cy.pause();
          });
        }

           cy.get('#searchNamesOrIdentifications', { timeout: 1000 })
           .should('exist')
           .should('be.visible')
           .type(DNI)
           .click();


        cy.get("#btn_buscar_nuevo_usuario").should('be.visible').click();
        cy.wait(1000);


        cy.get('[id*="btn_ver_detalle_"]')
        .first()
        .scrollIntoView()
        .should('be.visible')
        .click();


        // Usar los datos del Excel
        // Ingresar NOMBRE
        const UNIDADE = datosExcel[i][7]; // Primer fila, segunda columna
        cy.get('#ddl_unidad_ejecutora', { timeout: 1000 })
        .should('exist')
        .should('be.visible')
        .type(UNIDADE)
        .type('{enter}');
        cy.wait(100).tab()

        // Usar los datos del Excel
        // Ingresar APELLIDO

        cy.xpath('//*[@id="single-spa-application:@thv/core"]/div/div/main/section/div/div/div/div/div[3]/div[2]/form/div/div[2]/div/div/div[2]/div/div/div/div/div')
        .scrollIntoView()
        .should('be.visible')
        .click();
      
        cy.get('.ant-select-dropdown .ant-select-item-option')
        .contains('Urgencia')
        .click();
        cy.wait(100).tab()

        const ROL = datosExcel[i][9];
        cy.xpath('//*[@id="single-spa-application:@thv/core"]/div/div/main/section/div/div/div/div/div[3]/div[2]/form/div/div[3]/div/div/div[2]/div/div/div/div/div')
        .scrollIntoView()
        .should('be.visible')
        .type(ROL)
        .type('{enter}');
        cy.wait(100).tab()
        

 cy.get("#btn_asignar_rol").should('be.visible').click();





// Incrementar el contador
contador++;

// Mostrar en la consola el contador y el DNI
cy.log(`Contador: ${contador}, DNI: ${DNI}`);

                      
      }



      });
    

  cy.wait(1000);
  console.log('¡Prueba exitosa!'); 
  cy.log('¡Prueba exitosa!');

  
  
    })
  })
 