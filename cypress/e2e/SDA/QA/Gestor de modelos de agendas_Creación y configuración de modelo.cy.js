import '@applitools/testgenai-cypress/commands'
describe("Gestor de modelos de agendas", () => {
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
    cy.get('#div_seleccionar_rol_coordinador_nacional_de_reges', { timeout: 10000 }).should('be.visible').click();
    
        cy.wait(1000); 
        cy.get("#btn_menu_desplegable").should('be.visible').click();
        cy.wait(1000); 
        cy.get("#spn_modulo_unidades_ejecutoras_gestordeagendas").should('be.visible').click();
        cy.wait(1000); 
        cy.get("#spn_submodulo_unidades_ejecutoras_modelos_agenda").should('be.visible').click();
        cy.wait(1000); 
        
        cy.get("#btn_menu_desplegable").should('be.visible').click();
        cy.wait(1000);
        cy.wait(100).tab()
        cy.wait(100).tab()
cy.get('#btn_Models_Agenda_Abrir_Modal_Crear_Agenda', { timeout: 10000 }).should('be.visible').click();

cy.contains('div.ant-modal-title', 'Crear nuevo modelo de agenda')
  .should('be.visible');

  cy.get('#input_Modal_Modelos_Agendas_Modelos_Name', { timeout: 10000 }).should('be.visible').click();

  const randomNumber = Math.floor(Math.random() * (1000 - 500 + 1)) + 500;
cy.get('#input_Modal_Modelos_Agendas_Modelos_Name').type("Prueba" + randomNumber.toString()); //Escribir información
cy.wait(100).tab()

    cy.document().then((doc) => {
      const activeElement = doc.activeElement;
      cy.wrap(activeElement).should('exist'); // opcional: asegura que esté presente
      cy.log('Elemento enfocado:', activeElement);
            cy.wrap(activeElement).type('BOCAS DEL TORO')
            .type('{enter}');// por ejemplo
    });
    cy.wait(1000).tab()

// 6. Unidad ejecutora
cy.document().then((document) => {
  const focusedElement = document.activeElement;
  // Asegurarse de que el elemento enfocado existe
  cy.wrap(focusedElement).should('exist');
  // Log informativo (opcional)
  cy.log('Elemento actualmente enfocado:', focusedElement);
  // Escribir texto y presionar Enter
  cy.wrap(focusedElement)
    .type('POLICLINICA DE GUABITO')
    .type('{enter}');
});

cy.wait(1000).tab()   
cy.get('#form_Modal_Modelos_Agendas') // Encuentra el modal
  .find('[id="ddl_Modelos_Agendas_Estatus_id"]') // Encuentra todos los elementos con ese id (aunque esté mal usado)
  .eq(1) // Selecciona el segundo
  .click({ force: true });

cy.get('.ant-select-dropdown .ant-select-item-option:visible')
  .first() // o .contains('Activo') si prefieres por texto
  .click({ force: true });


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

 
