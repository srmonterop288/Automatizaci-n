import '@applitools/testgenai-cypress/commands'
describe("Crear Consultorio", () => {
  require('cypress-plugin-tab')
  require('cypress-xpath');

  it('Inicio de sesión exitoso', () => {
    // Llama a la función login 
    cy.login_CORE_QA();

    // Verifica que el login haya sido exitoso
    cy.url().should('not.include', '/login');
  

      

        cy.wait(1000); 
        cy.get("#btn_menu_desplegable").should('be.visible').click();
        cy.wait(1000); 
        cy.get("#spn_modulo_medical_records_list_executing_units").should('be.visible').click();
        cy.wait(1000); 
        cy.get("#btn_menu_desplegable").should('be.visible').click();
        cy.wait(1000);
        cy.wait(100).tab()
        cy.wait(100).tab()

//Buscar Unidad Ejecutora------------------

        cy.get('#ddl_provincia_lista_unidad_ejecutora')  // Selecciona el campo de búsqueda
        .click({ force: true });  // Forza el clic si es necesario
        cy.wait(500);
        cy.get('#ddl_provincia_lista_unidad_ejecutora_list .ant-select-item-option')  // Selecciona los elementos de la lista
        .eq(1) // Toma el elemento 10
          .click();  // Hace clic en el primer elemento
          cy.wait(100).tab()

          
     cy.get('#input_unidad_ejecutora', { timeout: 1000 })
     .should('exist')
     .should('be.visible')
     .type('POLICLINICA DE GUABITO')
     .click();

     cy.get("#btn_buscar").should('be.visible').click();

     cy.get('[id^="btn_mas_opciones_unidad_ejecutora_"]').first().click();
     cy.get('[id^="btn_administrar_unidad"]').click();

     cy.get('div#div_tab_consultorios')
  .scrollIntoView()  // Scroll the element into view if it's clipped
  .should('be.visible')
  .click();

  cy.get('#btn_crear_consultorio').scrollIntoView().should('be.visible')
  .click();


  const randomNumber = Math.floor(Math.random() * (1000 - 500 + 1)) + 500;
cy.get('#input_codigo_consultorio').type(randomNumber.toString()); //Escribir información
cy.wait(100).tab()

cy.get('#input_ubicacion_consultorio', { timeout: 1000 })
.should('exist')
.should('be.visible')
.type('Prueba')
.click();
cy.wait(100).tab()

cy.get('#input_nombre_consultorio', { timeout: 1000 })
.should('exist')
.should('be.visible')
.type('Prueba')
.click();


cy.get('#btn_habilitar_consultorio')
  .contains('Sí') // Verifica que el texto 'Sí' esté presente en el botón
  .click();


  cy.wait(100).tab()
  cy.wait(100).tab();

  cy.get('div.ant-modal-content') // Selecciona el div con la clase 'ant-modal-content'
  .find('#btn_crear_consultorio') // Busca el elemento con el id 'btn_crear_consultorio' dentro de ese div
  .should('be.visible') // Verifica que el botón sea visible
  .click();
  
  cy.get('h4.ant-typography.css-1rqnfsa')  // Selecciona el elemento
  .parent()  // Obtiene el contenedor padre
  .then(($parent) => {
    // Cambia temporalmente el estilo overflow para permitir ver el contenido
    $parent.css('overflow', 'visible');
  })
  .scrollIntoView()  // Desplaza a la vista
  .should('be.visible');
  cy.contains('Administración de recursos de una unidad ejecutora')  // Busca el texto exacto en la página
  .should('be.visible');


cy.wait(1000)

 let imagen = 1;
cy.get('#div_alerta', { timeout: 10000 }) // Espera hasta 10s si es necesario
  .scrollIntoView()
  .should('exist')
  .within(() => {
    cy.get('.ant-alert-message')
      .should('contain', 'El consultorio se ha creado exitosamente')
      .and('be.visible');
  });

          cy.screenshot(
      "Crear consultorio_QA/Crear consultorio_" +
        String(imagen++).padStart(2, "0")
    );
  
  
    })
  })
 