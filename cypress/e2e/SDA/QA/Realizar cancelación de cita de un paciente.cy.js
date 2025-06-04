import '@applitools/testgenai-cypress/commands'
describe("Realizar cancelación de cita de un paciente", () => {
  require('cypress-plugin-tab')
  require('cypress-xpath');

  it('debería iniciar sesión con éxito', () => {
    // Llama a la función login 
    cy.login_SDA_QA();

    // Verifica que el login haya sido exitoso
    cy.url().should('not.include', '/login');
  
    cy.wait(1000); 
    cy.get('#div_nombre_usuario', { timeout: 10000 }).should('be.visible').click();
    cy.get('#div_menu_cambiar_cuenta', { timeout: 10000 }).should('be.visible').click();
    cy.get('#div_seleccionar_rol_supervisor_de_tramites_y_citas', { timeout: 10000 }).should('be.visible').click();
    
        cy.wait(1000); 
        cy.get("#btn_menu_desplegable").should('be.visible').click();
        cy.wait(1000); 
        cy.get("#spn_modulo_unidades_ejecutoras_lista_citas").should('be.visible').click();
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

           cy.get('#txt_Citas_DNI', { timeout: 1000 })
           .should('exist')
           .should('be.visible')
           .type(DNI)
           .type('{enter}');

        // Ingresar FECHA
        const FECHA = datosExcel[i][3]; // Primer fila, segunda columna
        cy.get('#date_picker_Citas_Fecha', { timeout: 2000 })  // Espera hasta 2 segundos
        .should('exist')  // Asegura que el campo esté presente en el DOM
        .should('be.visible')  // Asegura que el campo sea visible
        .scrollIntoView()  // Asegura que el campo esté dentro del viewport
        .type(FECHA);  // Escribe el valor de la variable FECHANAC en el campo
        cy.wait(500).tab()



          // Usar los datos del Excel
        // Unidad Ejecutora
        cy.get('#ddl_Citas_Unidad_Ejecutora').scrollIntoView().should('be.visible');
        const UNIDADE = datosExcel[i][2]; // Primer fila, primera columna (usando índices 0 basados)     
        cy.get('#ddl_Citas_Unidad_Ejecutora', { timeout: 1000 })
        .should('exist')
        .should('be.visible')
        .type(UNIDADE)
        .type('{enter}');

   
  cy.get('#ddl_Citas_Servicio')  // Selecciona el elemento
  .scrollIntoView()  // Desplázate hacia el elemento para hacerlo visible
  .should('be.visible')  // Asegúrate de que el elemento sea visible
  .type('Medicina general')
  .type('{enter}');
  cy.wait(500).tab()
  
  cy.get('button.ant-btn.ant-btn-icon-only.ant-dropdown-trigger').first().click();

  cy.contains('Cancelar')  // Busca un botón o elemento con el texto "Cancelar"              // Hace clic
  .type('{enter}'); 

  
  cy.get('div.ant-flex.css-1uweeqc.ant-flex-align-stretch.ant-flex-gap-large.ant-flex-vertical')  // Selecciona el div con las clases proporcionadas
  .should('be.visible');

  cy.get('div.ant-flex.css-1uweeqc.ant-flex-align-stretch.ant-flex-gap-middle.ant-flex-vertical')  // Selecciona el div que contiene el modal
  .should('be.visible');


  
  
  cy.get('#ddl_Modal_Cancelar_Cita_Motivo').click({ force: true });

  cy.get('.ant-select-dropdown')
  .last() // toma el último renderizado
  .should('be.visible')
  .within(() => {
    cy.get('.ant-select-item-option')
      .first()
      .click();
  });

  cy.contains('Confirmar')            // Encuentra el botón con texto "Cancelar"
  .should('be.visible')            // Asegura que sea visible
  .focus()                         // Asegura que tenga el foco (necesario para .type())
  .click();
  cy.pause();
  contador++;

  // Mostrar en la consola el contador y el DNI
  cy.log(`Contador: ${contador}, DNI: ${DNI}`);
      cy.log(`Contador: ${contador}, DNI: ${DNI}`);
            cy.screenshot(
      "Cancelar citas_QA/cancelar cita_" +
        String(contador++).padStart(2, "0")
    );
                        
        }
      });
      
    })
  })

 
