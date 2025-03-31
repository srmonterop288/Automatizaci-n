import '@applitools/testgenai-cypress/commands'
describe("Crear Pacientes", () => {
  require('cypress-plugin-tab')
  require('cypress-xpath');

  it('debería iniciar sesión con éxito', () => {
    // Llama a la función login 
    cy.login_CORE();

    // Verifica que el login haya sido exitoso
    cy.url().should('not.include', '/login');

    cy.wait(1000); 
    cy.get("#btn_menu_desplegable").should('be.visible').click();
    cy.wait(1000); 
    cy.get("#spn_modulo_medical_records_list_user").should('be.visible').click();
    cy.wait(1000); 
    cy.get("#btn_menu_desplegable").should('be.visible').click();
    cy.wait(1000); 
    cy.get("#btn_crear_usuario").should('be.visible').click();
    cy.wait(100).tab()
    cy.wait(100).tab()
    cy.wait(100).tab()
    cy.wait(100).tab()
  
    cy.get('#ddl_tipo_identificacion')  // Selecciona el campo de búsqueda
  .click({ force: true });  // Forza el clic si es necesario
    cy.wait(500);
    cy.get('#ddl_tipo_identificacion_list .ant-select-item-option')  // Selecciona los elementos de la lista
    .first() // Toma el primer elemento
    .click();  // Hace clic en el primer elemento
    cy.wait(100).tab()



      let contador = 0;
      const rutaArchivoExcel = 'cypress/fixtures/datos.xlsx';
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

           cy.get('#input_numero_identificacion', { timeout: 1000 })
           .should('exist')
           .should('be.visible')
           .type(DNI)
           .click();


        cy.get("#btn_validar").should('be.visible').click();
        cy.wait(1000);

        // Usar los datos del Excel
        // Ingresar NOMBRE
        const NOMBRE = datosExcel[i][1]; // Primer fila, segunda columna
        cy.get('#input_primer_nombre', { timeout: 1000 })
        .should('exist')
        .should('be.visible')
        .type(NOMBRE)
        .click();

        // Usar los datos del Excel
        // Ingresar APELLIDO
        const APELLIDO1 = datosExcel[i][2]; // Primer fila, segunda columna
        cy.get('#input_primer_apellido', { timeout: 1000 })
        .should('exist')
        .should('be.visible')
        .type(APELLIDO1)
        .click();


      // Usar los datos del Excel
        // Ingresar APELLIDO Materno
        const APELLIDO2 = datosExcel[i][3]; // Primer fila, segunda columna
        cy.get('#input_segundo_apellido', { timeout: 1000 })
        .should('exist')
        .should('be.visible')
        .type(APELLIDO2)
        .click();

        // Usar los datos del Excel
        // Ingresar FECHANAC
        const FECHANAC = datosExcel[i][4]; // Primer fila, segunda columna
        cy.get('#input_fecha_nacimiento', { timeout: 1000 })
        .should('exist')
        .should('be.visible')
        .type(FECHANAC)
        .click();
        cy.wait(500).tab()
        cy.wait(500);
        
// Pais
        cy.get('#ddl_pais_nacimiento')  // Selecciona el campo de búsqueda
        .click({ force: true });  // Forza el clic si es necesario
        cy.wait(500);
        cy.get('#ddl_pais_nacimiento_list .ant-select-item-option')  // Selecciona los elementos de la lista
        .eq(163) // Toma el elemento 10
          .click();  // Hace clic en el primer elemento
          cy.wait(100).tab()

// Nacionalidad
          cy.get('#ddl_nacionalidad')  // Selecciona el campo de búsqueda
          .click({ force: true });  // Forza el clic si es necesario
          cy.wait(500);
          cy.get('#ddl_nacionalidad_list .ant-select-item-option')  // Selecciona los elementos de la lista
          .eq(37) // Toma el elemento 10
            .click();  // Hace clic en el primer elemento
            cy.wait(100).tab()

// Etnia
            cy.get('#ddl_etnia')  // Selecciona el campo de búsqueda
            .click({ force: true });  // Forza el clic si es necesario
            cy.wait(500);
            cy.get('#ddl_etnia_list .ant-select-item-option')  // Selecciona los elementos de la lista
            .eq(1) // Toma el elemento 10
              .click();  // Hace clic en el primer elemento
              cy.wait(100).tab()
// Estado
              cy.get('#ddl_estado_civil')  // Selecciona el campo de búsqueda
              .click({ force: true });  // Forza el clic si es necesario
              cy.wait(500);
              cy.get('#ddl_estado_civil_list .ant-select-item-option')  // Selecciona los elementos de la lista
              .eq(0) // Toma el elemento 10
                .click();  // Hace clic en el primer elemento
                cy.wait(100).tab()

                cy.get('#btn_paciente_asegurado_false')
                .click()
                .should('be.checked');
                cy.wait(100).tab()

                cy.get('#ddl_tipo_paciente')  // Selecciona el campo de búsqueda
                .click({ force: true });  // Forza el clic si es necesario
                cy.wait(500);
                cy.get('#ddl_tipo_paciente_list .ant-select-item-option')  // Selecciona los elementos de la lista
                .eq(0) // Toma el elemento 10
                  .click();  // Hace clic en el primer elemento
                  cy.wait(100).tab()

                  cy.get('#ddl_tipo_beneficiario')  // Selecciona el campo de búsqueda
                  .click({ force: true });  // Forza el clic si es necesario
                  cy.wait(500);
                  cy.get('#ddl_tipo_beneficiario_list .ant-select-item-option')  // Selecciona los elementos de la lista
                  .eq(7) // Toma el elemento 10
                    .click();  // Hace clic en el primer elemento
                    cy.wait(100).tab()
                    cy.wait(100).tab()

                    cy.get('#ddl_ocupacion')  // Selecciona el campo de búsqueda
                    .click({ force: true });  // Forza el clic si es necesario
                    cy.wait(500);
                    cy.get('#ddl_ocupacion_list .ant-select-item-option')  // Selecciona los elementos de la lista
                    .eq(8) // Toma el elemento 10
                      .click();  // Hace clic en el primer elemento
                      cy.wait(100).tab()


                      cy.get('#ddl_estudios')  // Selecciona el campo de búsqueda
                      .click({ force: true });  // Forza el clic si es necesario
                      cy.wait(500);
                      cy.get('#ddl_estudios_list .ant-select-item-option')  // Selecciona los elementos de la lista
                      .eq(7) // Toma el elemento 10
                        .click();  // Hace clic en el primer elemento
                        cy.wait(100).tab()


                        cy.get('#ddl_sexo')  // Selecciona el campo de búsqueda
                        .click({ force: true });  // Forza el clic si es necesario
                        cy.wait(500);
                        cy.get('#ddl_sexo_list .ant-select-item-option')  // Selecciona los elementos de la lista
                        .eq(0) // Toma el elemento 10
                          .click();  // Hace clic en el primer elemento
                          cy.wait(100).tab()


                          
                        cy.get('#ddl_idioma')  // Selecciona el campo de búsqueda
                        .click({ force: true });  // Forza el clic si es necesario
                        cy.wait(500);
                        cy.get('#ddl_idioma_list .ant-select-item-option')  // Selecciona los elementos de la lista
                        .eq(0) // Toma el elemento 10
                          .click();  // Hace clic en el primer elemento
                          cy.wait(100).tab()


                          cy.get('#ddl_grupo_sanguineo')  // Selecciona el campo de búsqueda
                          .click({ force: true });  // Forza el clic si es necesario
                          cy.wait(500);
                          cy.get('#ddl_grupo_sanguineo_list .ant-select-item-option')  // Selecciona los elementos de la lista
                          .eq(6) // Toma el elemento 10
                            .click();  // Hace clic en el primer elemento
                            cy.wait(100).tab()
                            cy.wait(100).tab()

                            cy.get("#btn_siguiente").should('be.visible').click();
                            cy.wait(100).tab()



                            cy.get('#input_provincia')  // Selecciona el campo de búsqueda
                            .click({ force: true });  // Forza el clic si es necesario
                            cy.wait(500);
                            cy.get('#input_provincia_list .ant-select-item-option')  // Selecciona los elementos de la lista
                            .eq(1) // Toma el elemento 10
                              .click();  // Hace clic en el primer elemento
                              cy.wait(100).tab()


                              cy.get('#input_distrito')  // Selecciona el campo de búsqueda
                              .click({ force: true });  // Forza el clic si es necesario
                              cy.wait(500);
                              cy.get('#input_distrito_list .ant-select-item-option')  // Selecciona los elementos de la lista
                              .eq(0) // Toma el elemento 10
                                .click();  // Hace clic en el primer elemento
                                cy.wait(100).tab()


                                cy.get('#input_corregimiento')  // Selecciona el campo de búsqueda
                                .click({ force: true });  // Forza el clic si es necesario
                                cy.wait(500);
                                cy.get('#input_corregimiento_list .ant-select-item-option')  // Selecciona los elementos de la lista
                                .eq(0) // Toma el elemento 10
                                  .click();  // Hace clic en el primer elemento
                                  cy.wait(100).tab()


                                  cy.get('#input_barrio')  // Selecciona el campo de búsqueda
                                  .click({ force: true });  // Forza el clic si es necesario
                                  cy.wait(500);
                                  cy.get('#input_barrio_list .ant-select-item-option')  // Selecciona los elementos de la lista
                                  .eq(0) // Toma el elemento 10
                                    .click();  // Hace clic en el primer elemento
                                    cy.wait(100).tab()


                            cy.get("#btn_siguiente").should('be.visible').click();
                            cy.wait(2000).tab()
                            cy.get("#btn_siguiente").should('be.visible').click();
                            cy.wait(1000).tab()
                            cy.wait(100).tab()
                            cy.wait(100).tab()


                           
                            cy.get('#input_numero_documento').type(DNI);
                            cy.get("#btn_buscar").should('be.visible').click();
                            cy.wait(2000).tab()
                            cy.get("#btn_crear_usuario").should('be.visible').click();
                            cy.wait(100).tab()
                            cy.wait(100).tab()
                            cy.wait(100).tab()
                            cy.wait(100).tab()
                          
                            cy.get('#ddl_tipo_identificacion')  // Selecciona el campo de búsqueda
                          .click({ force: true });  // Forza el clic si es necesario
                            cy.wait(500);
                            cy.get('#ddl_tipo_identificacion_list .ant-select-item-option')  // Selecciona los elementos de la lista
                            .first() // Toma el primer elemento
                            .click();  // Hace clic en el primer elemento
                            cy.wait(100).tab()


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
 