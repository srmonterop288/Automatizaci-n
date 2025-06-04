import '@applitools/testgenai-cypress/commands'
describe(" Generar cita común de tipo Nuevo", () => {
  require('cypress-plugin-tab')
  require('cypress-xpath');

  it('debería iniciar sesión con éxito', () => {
    // Llama a la función login 
    cy.login_SDA_STG();

    // Verifica que el login haya sido exitoso
    cy.url().should('not.include', '/login');
  
    cy.wait(1000); 
    cy.get('#div_nombre_usuario', { timeout: 10000 }).should('be.visible').click();
    cy.get('#div_menu_cambiar_cuenta', { timeout: 10000 }).should('be.visible').click();
    cy.get('#div_seleccionar_rol_supervisor_de_tramites_y_citas', { timeout: 10000 }).should('be.visible').click();
    
        cy.wait(1000); 
        cy.get("#btn_menu_desplegable").should('be.visible').click();
        cy.wait(1000); 
        cy.get("#spn_modulo_unidades_ejecutoras_asignaciondecitas").should('be.visible').click();
        cy.wait(1000); 
        cy.get("#spn_submodulo_unidades_ejecutoras_asignacion_citas_agenda_comun").should('be.visible').click();
        cy.wait(1000); 
        
        cy.get("#btn_menu_desplegable").should('be.visible').click();
        cy.wait(1000);
        cy.wait(100).tab()
        cy.wait(100).tab()

//------------------------------------------------
let contador = 0;
      const rutaArchivoExcel = 'cypress/fixtures/agenda.xlsx';
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

           cy.get('#btn_Pantalla_Citas_Comun_Verificar', { timeout: 2000 })
           .should('exist')
           .should('be.visible')
           .type(DNI)
           .type('{enter}');

           
           cy.get("#btn_Pantalla_Citas_Verificar", { timeout: 10000 })
          .should('be.visible')
          .click();


          
          cy.get('#ddl_Pantalla_Citas_Comun_Servicio_Solicitado', { timeout: 10000 })
          .scrollIntoView()
          .should('be.visible');

          cy.get('#ddl_Pantalla_Citas_Comun_Servicio_Solicitado')
          .click()
          .type('{enter}');



  cy.get('input[type="radio"][value="No"]')  // Selecciona el radio button con el valor "No"
  .check();  


  

  cy.get('#ddl_Pantalla_Citas_Comun_Programas', { timeout: 10000 })
  .scrollIntoView()
  .should('be.visible');

  cy.get('#ddl_Pantalla_Citas_Comun_Programas')
  .click()
  .type('{enter}');



  cy.get('input[type="radio"][value="No"]')  // Selecciona el radio button con el valor "No"
  .check();  


  cy.xpath('//*[@id="form_Pantalla_Citas_Comun"]/div/div[2]/div[1]/div[2]/div[2]/div[1]/div/div[2]/div/div/div/div/div')
  .scrollIntoView()
  .should('be.visible')
  .click();

  cy.get('.ant-select-dropdown .ant-select-item-option')
  .contains('Médico')
  .click();

cy.get('.ant-select-dropdown .ant-select-item-option')
  .contains('Enfermero/a')
  .click();
  cy.wait(100).tab()
  


 
  cy.xpath('//*[@id="dtp_Pantalla_Citas_Comun_Buscar_Fecha"]').click();
  cy.contains('a', 'Hoy').click();
  cy.get('body').tab();
  cy.wait(100).tab()
  cy.wait(100).tab()
  cy.wait(100).tab()
  cy.wait(100).tab()
  cy.wait(100).tab()
  cy.wait(100).tab()
  cy.wait(100).tab()
  cy.wait(100).tab()

  
  cy.get('input[type="radio"][value="NUEVO"]', { timeout: 10000 })  // Selecciona el radio button con el valor "NUEVO"
  .check(); 


  cy.get('#btn_Pantalla_Citas_Comun_Obtener_Fecha').scrollIntoView().should('be.visible')
  .click();
 
  cy.contains('No hay citas disponibles').then(() => {
    win.alert('No hay citas disponibles');
    cy.log('Prueba Finalizada: correctamente');
    cy.pause(); // Esto detiene la ejecución y abre modo interactivo en Cypress UI
    
  });
    
  
  contador++;

  // Mostrar en la consola el contador y el DNI
  cy.log(`Contador: ${contador}, DNI: ${DNI}`);
  

      cy.log(`Contador: ${contador}, DNI: ${DNI}`);
            cy.screenshot(
      "Generar cita comun_STG/tipo NUEVO_" +
        String(contador++).padStart(2, "0")
    );
                        
        }
      });
      
    })
  })

 
