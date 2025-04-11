import '@applitools/testgenai-cypress/commands'
describe("Configuración de agendas de citas", () => {
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
        cy.get("#spn_modulo_unidades_ejecutoras_agendas").should('be.visible').click();
        cy.wait(1000); 
        cy.get("#btn_menu_desplegable").should('be.visible').click();
        cy.wait(2000);
        cy.wait(100).tab()
        cy.wait(100).tab()

        
        cy.get('#select_Agendas_Servicio', { timeout: 1000 })
        .should('exist')
        .should('be.visible')
        .type('Medicina general')
        .type('{enter}');


        cy.get('#select_Agendas_Especialidad', { timeout: 1000 })
        .should('exist')
        .should('be.visible')
        .type('Medicina general')
        .type('{enter}');
        

        cy.get('#select_Agendas_Personal_Salud')  // Selecciona el campo de búsqueda
        .click({ force: true });  // Forza el clic si es necesario
        cy.wait(500);

        cy.xpath('//*[@id="select_Agendas_Personal_Salud_list_0"]').should('be.visible');
    
        // Si quieres interactuar con el elemento, puedes agregarlo así:
        cy.xpath('//*[@id="select_Agendas_Personal_Salud_list_0"]').click();


     cy.get("#btn_Agendas_Crear_Agenda").should('be.visible').click();
     cy.wait(1000);
     
     cy.xpath('//*[@id="date_picker_Creando_Agenda_Fecha_Inicio"]').click();
     cy.contains('a', 'Hoy').click();
     cy.get('body').tab();
     cy.wait(100).tab()
     cy.wait(100).tab()
     cy.wait(100).tab()
     cy.wait(100).tab() 
     

     cy.get('#ddl_Creando_Agenda_Atencion_Semanal', { timeout: 1000 })
     .should('exist')
     .should('be.visible')
     .type('Lunes')
     .type('{enter}');
      cy.wait(100).tab()
     

    
      cy.get('#ddl_Creando_Agenda_Consultorio_Lunes')  // Selecciona el campo de búsqueda
      .click({ force: true });  // Forza el clic si es necesario
      cy.wait(500);
      cy.get('#ddl_Creando_Agenda_Consultorio_Lunes_list .ant-select-item-option')  // Selecciona los elementos de la lista
      .eq(0) // Toma el elemento 10
        .click();  // Hace clic en el primer elemento
        cy.wait(100).tab()


      cy.get('#time_picker_Creando_Agenda_Horario_Lunes', { timeout: 1000 })
      .should('exist')
      .should('be.visible')
      .type('12:00 PM')
      cy.wait(100).tab()
      .type('1:00 PM')
      .type('{enter}');


      cy.get("#btn_Creando_Agenda_Agregar_Cita").should('be.visible').click();
      cy.wait(1000);

      cy.get('#ddl_Creando_Agenda_Tipo_Cita_0', { timeout: 1000 })
      .should('exist')
      .should('be.visible')
      .type('Nuevo')
      .type('{enter}');
       cy.wait(100).tab()


       cy.get('#ddl_Creando_Agenda_Equivalencia_0', { timeout: 1000 })
       .should('exist')
       .should('be.visible')
       .type('60 min')
       .type('{enter}');
        cy.wait(100).tab()


        cy.get('#ddl_Creando_Agenda_Numero_Citas_0', { timeout: 1000 })
        .should('exist')
        .should('be.visible')
        .type('1 citas')
        .type('{enter}');
         cy.wait(100).tab()
      

         

  cy.get('#btn_Creando_Agenda_Crear').scrollIntoView().should('be.visible')
  .click();
  cy.wait(1000);

  cy.contains('button', 'Siguiente')  // Busca el botón que contiene el texto 'Siguiente'
  .click();
  cy.wait(1000);


  cy.contains('button', 'Finalizar')  // Busca el botón que contiene el texto 'Finalizar'
  .click();
  
      
    })
  })
 