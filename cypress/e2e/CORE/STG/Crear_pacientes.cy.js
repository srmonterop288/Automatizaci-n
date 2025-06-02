import '@applitools/testgenai-cypress/commands'
describe("Crear Pacientes", () => {
  require('cypress-plugin-tab')
  require('cypress-xpath');

  it('Creación de Usuario exitoso', () => {
    // Llama a la función login 
    cy.login_CORE_STG();

    // Verifica que el login haya sido exitoso
    cy.url().should('not.include', '/login');

    cy.wait(1000); 
    cy.get("#btn_menu_desplegable").should('be.visible').click();
    cy.wait(1000); 
    cy.get("#spn_modulo_medical_records_list_user").should('be.visible').click();
    cy.wait(1000); 
    cy.get("#btn_menu_desplegable").should('be.visible').click();
    cy.wait(1000); 
    cy.get("#btn_crear_usuario", { timeout: 10000 }) // Espera hasta 10 segundos
    .should('be.visible') // Espera a que el botón sea visible
    .click(); 



    
  
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
    });

    // 🔴 Este return detiene completamente el flujo del test
    return; 
  }

 


        cy.get('#input_numero_cedula', { timeout: 1000 })  // Espera hasta 1 segundo
        .should('exist')  // Asegura que el campo exista en el DOM
        .scrollIntoView()
        .should('be.visible')
        .type(DNI);  // Escribe el valor de la variable DNI en el campo
 
        cy.contains('span.ant-breadcrumb-link', 'Listado y búsqueda de usuarios')
        .scrollIntoView()  // Lleva el elemento al viewport
        .should('be.visible');


           cy.get("#btn_validar_identificacion", { timeout: 10000 }) // espera hasta 10 segundos a que aparezca en el DOM
           .should('be.visible') // espera hasta que sea visible
           .scrollIntoView()     // asegura que esté en el viewport
           .click();             // hace clic

        // Usar los datos del Excel
        // Ingresar NOMBRE
        const NOMBRE = datosExcel[i][1]; // Primer fila, segunda columna
        cy.get('#input_primer_nombre', { timeout: 2000 }) // Espera hasta 2 segundos
        .should('exist')  // Asegura que el campo esté presente en el DOM
        .should('be.visible')  // Asegura que el campo sea visible
        .scrollIntoView()  // Asegura que esté dentro del viewport
        .type(NOMBRE);  // Escribe el valor de la variable NOMBRE en el campo


        // Usar los datos del Excel
        // Ingresar APELLIDO
        const APELLIDO1 = datosExcel[i][2]; // Primer fila, segunda columna
        cy.get('#input_primer_apellido', { timeout: 1000 })  // Espera hasta 1 segundo
        .should('exist')  // Asegura que el campo esté presente en el DOM
        .should('be.visible')  // Asegura que el campo sea visible
        .scrollIntoView()  // Asegura que esté dentro del viewport
        .type(APELLIDO1);  // Escribe el valor de la variable APELLIDO1 en el campo


      // Usar los datos del Excel
        // Ingresar APELLIDO Materno
        const APELLIDO2 = datosExcel[i][3]; // Primer fila, segunda columna
        cy.get('#input_segundo_apellido', { timeout: 1000 })  // Espera hasta 1 segundo
        .should('exist')  // Asegura que el campo esté presente en el DOM
        .should('be.visible')  // Asegura que el campo sea visible
        .scrollIntoView()  // Asegura que el campo esté en el viewport
        .type(APELLIDO2);  // Escribe el valor de la variable APELLIDO2 en el campo

        // Usar los datos del Excel
        // Ingresar FECHANAC
        const FECHANAC = datosExcel[i][4]; // Primer fila, segunda columna
        cy.get('#input_fecha_nacimiento', { timeout: 2000 })  // Espera hasta 2 segundos
        .should('exist')  // Asegura que el campo esté presente en el DOM
        .should('be.visible')  // Asegura que el campo sea visible
        .scrollIntoView()  // Asegura que el campo esté dentro del viewport
        .type(FECHANAC);  // Escribe el valor de la variable FECHANAC en el campo
        cy.wait(500).tab()

        
// Pais
cy.get('#ddl_pais_nacimiento', { timeout: 2000 })  // Espera hasta 2 segundos
  .should('exist')  // Asegura que el campo esté presente en el DOM
  .should('be.visible')  // Asegura que el campo sea visible
  .click({ force: true });  // Forza el clic si el campo no es interactuable

cy.get('#ddl_pais_nacimiento_list .ant-select-item-option', { timeout: 2000 })  // Asegura que los elementos de la lista existan
  .should('be.visible')  // Asegura que los elementos sean visibles
  .eq(163)  // Selecciona el elemento en la posición 163
  .scrollIntoView()  // Asegura que esté en el viewport
  .click();  // Hace clic en el elemento
          cy.wait(100).tab()

// Nacionalidad
cy.get('#ddl_nacionalidad', { timeout: 2000 })  // Espera hasta 2 segundos
  .should('exist')  // Asegura que el campo esté presente en el DOM
  .should('be.visible')  // Asegura que el campo sea visible
  .click();  // Realiza el clic si el campo es visible e interactuable

cy.get('#ddl_nacionalidad_list .ant-select-item-option', { timeout: 2000 })  // Espera hasta que los elementos de la lista estén presentes
  .should('be.visible')  // Asegura que los elementos sean visibles
  .eq(37)  // Selecciona el elemento en la posición 37
  .scrollIntoView()  // Asegura que el elemento esté en el viewport
  .click();  // Hace clic en el elemento seleccionado
            cy.wait(100).tab()

// Etnia
cy.get('#ddl_etnia', { timeout: 2000 })  // Espera hasta 2 segundos
  .should('exist')  // Asegura que el campo esté presente en el DOM
  .should('be.visible')  // Asegura que el campo sea visible
  .click();  // Realiza el clic si el campo es visible e interactuable

cy.get('#ddl_etnia_list .ant-select-item-option', { timeout: 2000 })  // Espera hasta que los elementos de la lista estén disponibles
  .should('be.visible')  // Asegura que los elementos sean visibles
  .eq(1)  // Selecciona el elemento en la posición 1
  .scrollIntoView()  // Asegura que el elemento esté dentro del viewport
  .click();  // Hace clic en el elemento seleccionado
              cy.wait(100).tab()

//Religion
cy.get('#ddl_religion', { timeout: 2000 }) 
.should('exist')
.should('be.visible') // Selecciona el campo de búsqueda
.click({ force: true });  // Forza el clic si es necesario
cy.wait(500);
cy.get('#ddl_religion_list .ant-select-item-option')  // Selecciona los elementos de la lista
.eq(0) // Toma el elemento 10
.scrollIntoView()     // asegura que esté en el viewport
.click(); // Hace clic en el primer elemento
  cy.wait(100).tab()


// Estado
cy.get('#ddl_estado_civil', { timeout: 2000 })  // Espera hasta 2 segundos
  .should('exist')  // Asegura que el campo esté presente en el DOM
  .should('be.visible')  // Asegura que el campo sea visible
  .click();  // Realiza el clic si el campo es visible e interactuable

cy.get('#ddl_estado_civil_list .ant-select-item-option', { timeout: 2000 })  // Espera hasta que los elementos de la lista estén disponibles
  .should('be.visible')  // Asegura que los elementos sean visibles
  .eq(0)  // Selecciona el primer elemento (índice 0)
  .scrollIntoView()  // Asegura que el elemento esté en el viewport
  .click();  // Hace clic en el primer elemento
                cy.wait(100).tab()

// Tipo beneficiario
cy.get('#ddl_tipo_beneficiario', { timeout: 2000 })  // Espera hasta 2 segundos
  .should('exist')  // Asegura que el campo esté presente en el DOM
  .should('be.visible')  // Asegura que el campo sea visible
  .click();  // Realiza el clic si el campo es visible e interactuable

cy.get('#ddl_tipo_beneficiario_list .ant-select-item-option', { timeout: 2000 })  // Espera hasta que los elementos de la lista estén disponibles
  .should('be.visible')  // Asegura que los elementos sean visibles
  .eq(7)  // Selecciona el elemento en la posición 7 (índice 7 es el octavo elemento)
  .scrollIntoView()  // Asegura que el elemento esté dentro del viewport
  .click();  // Hace clic en el elemento seleccionado
  cy.wait(100).tab()
cy.wait(100).tab()

// Ocupacion
cy.get('#ddl_ocupacion', { timeout: 2000 })  // Espera hasta 2 segundos
  .should('exist')  // Asegura que el campo esté presente en el DOM
  .should('be.visible')  // Asegura que el campo sea visible
  .click();  // Realiza el clic si el campo es visible e interactuable

cy.get('#ddl_ocupacion_list .ant-select-item-option', { timeout: 2000 })  // Espera hasta que los elementos de la lista estén disponibles
  .should('be.visible')  // Asegura que los elementos sean visibles
  .eq(8)  // Selecciona el noveno elemento (índice 8)
  .scrollIntoView()  // Asegura que el elemento esté dentro del viewport
  .click();  // Hace clic en el elemento seleccionado
cy.wait(100).tab();  // Espera 100ms antes de pasar a la siguiente acción (tabulación)

// Estudios
cy.get('#ddl_estudios', { timeout: 2000 })  // Espera hasta 2 segundos
  .should('exist')  // Asegura que el campo esté presente en el DOM
  .should('be.visible')  // Asegura que el campo sea visible
  .click();  // Realiza el clic si el campo es visible e interactuable

cy.get('#ddl_estudios_list .ant-select-item-option', { timeout: 2000 })  // Espera hasta que los elementos de la lista estén disponibles
  .should('be.visible')  // Asegura que los elementos sean visibles
  .eq(7)  // Selecciona el octavo elemento (índice 7)
  .scrollIntoView()  // Asegura que el elemento esté dentro del viewport
  .click();  // Hace clic en el elemento seleccionado
cy.wait(100).tab();  // Espera 100ms antes de pasar a la siguiente acción (tabulación)

// Sexo
cy.get('#ddl_sexo', { timeout: 2000 })  // Espera hasta 2 segundos para que el campo esté disponible
  .should('exist')  // Asegura que el campo esté presente en el DOM
  .should('be.visible')  // Asegura que el campo sea visible
  .click();  // Realiza el clic si el campo es visible e interactuable

cy.get('#ddl_sexo_list .ant-select-item-option', { timeout: 2000 })  // Espera hasta que los elementos de la lista estén disponibles
  .should('be.visible')  // Asegura que los elementos sean visibles
  .eq(0)  // Selecciona el primer elemento (índice 0)
  .scrollIntoView()  // Asegura que el elemento esté en el viewport
  .click();  // Hace clic en el elemento seleccionado
cy.wait(100).tab();  // Espera 100ms antes de pasar a la siguiente acción (tabulación)


    // Idioma                      
    cy.get('#ddl_idioma', { timeout: 2000 })  // Espera hasta 2 segundos para que el campo esté disponible
    .should('exist')  // Asegura que el campo esté presente en el DOM
    .should('be.visible')  // Asegura que el campo sea visible
    .click();  // Realiza el clic si el campo es visible e interactuable
  
  cy.get('#ddl_idioma_list .ant-select-item-option', { timeout: 2000 })  // Espera hasta que los elementos de la lista estén disponibles
    .should('be.visible')  // Asegura que los elementos sean visibles
    .eq(0)  // Selecciona el primer elemento (índice 0)
    .scrollIntoView()  // Asegura que el elemento esté dentro del viewport
    .click();  // Hace clic en el primer elemento
  cy.wait(100).tab()

// Sangre
cy.get('#ddl_grupo_sanguineo', { timeout: 2000 })  // Espera hasta 2 segundos para que el campo esté disponible
  .should('exist')  // Asegura que el campo esté presente en el DOM
  .should('be.visible')  // Asegura que el campo sea visible
  .click();  // Realiza el clic si el campo es visible e interactuable

cy.get('#ddl_grupo_sanguineo_list .ant-select-item-option', { timeout: 2000 })  // Espera hasta que los elementos de la lista estén disponibles
  .should('be.visible')  // Asegura que los elementos sean visibles
  .eq(6)  // Selecciona el séptimo elemento (índice 6)
  .scrollIntoView()  // Asegura que el elemento esté dentro del viewport
  .click();  // Hace clic en el elemento seleccionado
  cy.wait(100).tab()
  cy.wait(100).tab()


  cy.contains('span.ant-breadcrumb-link', 'Listado y búsqueda de usuarios')
  .scrollIntoView()  // Lleva el elemento al viewport
  .should('be.visible');


                            cy.get('#ddl_tipo_paciente', { timeout: 2000 })  // Selecciona el campo de búsqueda
                            .click({ force: true });  // Forza el clic si es necesario
                            cy.wait(500);
                            cy.get('#ddl_tipo_paciente_list .ant-select-item-option')  // Selecciona los elementos de la lista
                            .eq(0) // Toma el elemento 10
                              .click();  // Hace clic en el primer elemento
                              cy.wait(100).tab()

                              cy.get('#btn_paciente_asegurado_false', { timeout: 2000 })
                              .click()
                              .should('be.checked');
                              cy.wait(100).tab()

                              cy.get('#btn_siguiente', { timeout: 2000 })  // Espera hasta 2 segundos para que el botón esté disponible
                              .should('exist')  // Asegura que el botón esté presente en el DOM
                              .scrollIntoView()  // Asegura que el botón esté visible en el viewport
                              .should('be.visible')  // Asegura que el botón sea visible
                              .click();



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
   it('Prueba exitosa', () => {
  cy.screenshot('clicking-on-nav')
  
  })
 