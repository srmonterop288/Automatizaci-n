import '@applitools/testgenai-cypress/commands'
describe("Generar cita diaria de tipo Nuevo en horario AM", () => {
  require('cypress-plugin-tab')
  require('cypress-xpath');

  it('debería iniciar sesión con éxito', () => {
    // Llama a la función login 
    cy.login_SDA();

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
        cy.get("#spn_submodulo_unidades_ejecutoras_citas").should('be.visible').click();
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

           cy.get('#validateDNI_dni', { timeout: 1000 })
           .should('exist')
           .should('be.visible')
           .type(DNI)
           .type('{enter}');






  cy.get('#province').scrollIntoView().should('be.visible');
  const PROVINCIA = datosExcel[i][1]; // Primer fila, primera columna (usando índices 0 basados)     
  cy.get('#province', { timeout: 1000 })
  .should('exist')
  .should('be.visible')
  .type(PROVINCIA)
  .type('{enter}');


  cy.get('input[type="radio"][value="No"]')  // Selecciona el radio button con el valor "No"
  .check();  


          // Usar los datos del Excel
        // Unidad Ejecutora
        cy.get('#executingUnit').scrollIntoView().should('be.visible');
        const UNIDADE = datosExcel[i][2]; // Primer fila, primera columna (usando índices 0 basados)     
        cy.get('#executingUnit', { timeout: 1000 })
        .should('exist')
        .should('be.visible')
        .type(UNIDADE)
        .type('{enter}');

   


  cy.get('#requiredService')  // Selecciona el elemento
  .scrollIntoView()  // Desplázate hacia el elemento para hacerlo visible
  .should('be.visible')  // Asegúrate de que el elemento sea visible
  .type('Medicina general')
  .type('{enter}'); 


  cy.get('#select_Crear_Cita_Formulario_Modelo_Agenda')  // Selecciona el elemento
  .scrollIntoView()  // Desplázate hacia el elemento para hacerlo visible
  .should('be.visible')  // Asegúrate de que el elemento sea visible
  .type('Personalizado')
  .type('{enter}'); 

  cy.get('input[type="radio"][value="NUEVO"]')  // Selecciona el radio button con el valor "NUEVO"
  .check();  
  
  cy.get('input[type="radio"][value="AM"]')  // Selecciona el radio button con el valor "NUEVO"
  .check();  
  cy.pause();

  cy.get('div.ant-card.ant-card-bordered.overrideCardBody')
  .should('be.visible');
  cy.contains('span.ant-typography', 'Fecha de la cita', { timeout: 10000 }) // 10 segundos
  .should('be.visible');
  cy.contains('button', 'Asignar cita', { timeout: 10000 })
  .should('not.be.disabled')
  .click();
  cy.pause();
  contador++;

  // Mostrar en la consola el contador y el DNI
  cy.log(`Contador: ${contador}, DNI: ${DNI}`);
  
                        
        }
      });
      
    })
  })

 
