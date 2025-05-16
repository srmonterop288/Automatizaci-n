import '@applitools/testgenai-cypress/commands'
describe("Crear unidad ejecutora", () => {
  require('cypress-plugin-tab')
  require('cypress-xpath');

  it('Inicio de sesión éxitoso', () => {
    // Llama a la función login 
    cy.login_CORE();

    // Verifica que el login haya sido exitoso, por ejemplo, comprobando que la URL cambió
    cy.url().should('not.include', '/login');

    cy.wait(1000); 
    cy.get("#btn_menu_desplegable").should('be.visible').click();
    cy.wait(1000); 
    cy.get("#spn_modulo_medical_records_list_executing_units").should('be.visible').click();
    cy.wait(1000); 
    cy.get("#btn_menu_desplegable").should('be.visible').click();
    cy.wait(1000); 
    cy.get("#btn_crear_unidad_ejecutora").should('be.visible').click();
    cy.wait(100).tab()
    cy.wait(100).tab()
    cy.wait(100).tab()
    cy.wait(100).tab()


// 1. Provincia
cy.get('#ddl_seleccionar_provincia_unidad_ejecutora')  // Selecciona el campo de búsqueda
  .click({ force: true });  // Forza el clic si es necesario

// Espera a que la lista de opciones se cargue (si es necesario)
cy.wait(500);  // Ajusta el tiempo de espera según la velocidad de la aplicación

// Selecciona el primer elemento de la lista
cy.get('#ddl_seleccionar_provincia_unidad_ejecutora_list .ant-select-item-option')  // Selecciona los elementos de la lista
  .eq(1) // Toma el primer elemento
  .click();  // Hace clic en el primer elemento
  cy.wait(100).tab()

  
// 2. Distrito
cy.get('#ddl_seleccionar_distrito_unidad_ejecutora')  // Selecciona el campo de búsqueda
  .click({ force: true });  // Forza el clic si es necesario
// Espera a que la lista de opciones se cargue (si es necesario)
cy.wait(500);  // Ajusta el tiempo de espera según la velocidad de la aplicación

// Selecciona el primer elemento de la lista
cy.get('#ddl_seleccionar_distrito_unidad_ejecutora_list .ant-select-item-option')  // Selecciona los elementos de la lista
  .first() // Toma el primer elemento
  .click();  // Hace clic en el primer elemento
  cy.wait(100).tab()
  
// 3. Corregimiento
cy.get('#ddl_seleccionar_corregimiento_unidad_ejecutora')  // Selecciona el campo de búsqueda
  .click({ force: true });  // Forza el clic si es necesario
// Espera a que la lista de opciones se cargue (si es necesario)
cy.wait(500);  // Ajusta el tiempo de espera según la velocidad de la aplicación

// Selecciona el primer elemento de la lista
cy.get('#ddl_seleccionar_corregimiento_unidad_ejecutora_list .ant-select-item-option')  // Selecciona los elementos de la lista
  .first() // Toma el primer elemento
  .click();  // Hace clic en el primer elemento
  cy.wait(100).tab()

  // 4. Nivel de atención
cy.get('#ddl_seleccionar_nivel_atencion')  // Selecciona el campo de búsqueda
.click({ force: true });  // Forza el clic si es necesario
// Espera a que la lista de opciones se cargue (si es necesario)
cy.wait(500);  // Ajusta el tiempo de espera según la velocidad de la aplicación

// Selecciona el primer elemento de la lista
cy.get('#ddl_seleccionar_nivel_atencion_list .ant-select-item-option')  // Selecciona los elementos de la lista
.first() // Toma el primer elemento
.click();  // Hace clic en el primer elemento
cy.wait(100).tab()

// 5. Código unidad ejecutora
const randomNumber = Math.floor(Math.random() * (1000 - 500 + 1)) + 500;
cy.get('#input_codigo_unidad_ejecutora').type(randomNumber.toString()); //Escribir información
cy.wait(100).tab()
// 6. Unidad ejecutora
cy.get('#input_nombre_unidad_ejecutora').type("Prueba" + randomNumber); //Escribir información
cy.wait(100).tab()
// 7. Habilitar unidad ejecutora
cy.get('#btn_si_habilitar')  // Selecciona el radio button usando el ID
  .check();
  cy.wait(100).tab()
// 8. Selecciona el servicio
cy.get('#ddl_seleccionar_servicio')  // Selecciona el campo de búsqueda
  .click({ force: true });  // Forza el clic si es necesario
// Espera a que la lista de opciones se cargue (si es necesario)
cy.wait(500);  // Ajusta el tiempo de espera según la velocidad de la aplicación

// Selecciona el primer elemento de la lista
cy.get('#ddl_seleccionar_servicio_list .ant-select-item-option')  // Selecciona los elementos de la lista
.eq(15) // Toma el elemento 10
  .click();  // Hace clic en el primer elemento
  cy.wait(100).tab()



  
 //Seleccionamos el botón Asignar servicio"
 cy.get("#btn_asignar_servicio").should('be.visible').click();
 cy.wait(100).tab()
 cy.get('.ant-alert-message')  // Selecciona el div con la clase ant-alert-message
  .should('be.visible')  // Asegura que el mensaje esté visible
  .and('contain.text', 'Servicio agregado correctamente.'); 

cy.wait(2000).tab()
//Seleccionamos el botón Crear Unidad Ejecutora"
cy.get("#btn_crear_unidad_ejecutora").should('be.visible').click();
cy.wait(100).tab()
cy.wait(2000).tab()

//bucar Unidad Ejecutora
cy.get('#ddl_provincia_lista_unidad_ejecutora')  // Selecciona el campo de búsqueda
  .click({ force: true });  // Forza el clic si es necesario

// Espera a que la lista de opciones se cargue (si es necesario)
cy.wait(500);  // Ajusta el tiempo de espera según la velocidad de la aplicación

// Selecciona el primer elemento de la lista
cy.get('#ddl_provincia_lista_unidad_ejecutora_list .ant-select-item-option')  // Selecciona los elementos de la lista
  .eq(1) // Toma el primer elemento
  .click();  // Hace clic en el primer elemento
  cy.wait(100).tab()

  //Unidad ejecutora

  cy.get('#input_unidad_ejecutora').type("Prueba" + randomNumber); //Escribir información
  cy.wait(100).tab()
  cy.wait(100).tab()
  cy.get("#btn_buscar").should('be.visible').click();
  cy.wait(1000);
  cy.get('[id^="btn_ver_detalle_unidad_ejecutora_"]')  // Selecciona el botón cuyo ID empieza con "btn_ver_detalle_unidad_ejecutora_"
  .click();
  cy.wait(1000);
  console.log('¡Prueba exitosa!'); 
  cy.log('¡Prueba exitosa!');

})
   it('Prueba exitosa', () => {
  cy.screenshot('clicking-on-nav')
 
 
    })
  })
 