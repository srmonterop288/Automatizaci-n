Cypress.Commands.add('login_ECLI', () => { 
        cy.visit('https://spa-container-qa.nuevoexpediente.com/login')
    
        //Login
        cy.get('#input_nombre_usuario_login').type("02122024-02") //Escribir información
        cy.get('#input_contrasena_login').type("Password01")
        cy.get('#btn_ingresar_login').click();
        cy.get('#btn_seleccionar_unidad_ejecutora_hospital_de_almirante').should('be.visible').click();
        cy.wait(1000); 
        cy.get('#btn_seleccionar_area_consulta_externa').should('be.visible').click();
        
        // verify tab url
        cy.url()
        .should('include', 'https://spa-container-qa.nuevoexpediente.com/app/medical-records/dashboard')

      });

        //-------------------------------------------------------------------------------------
    
        Cypress.Commands.add('logout', () => {
            // Suponiendo que el botón de logout tiene un id de '#btn_logout'
            cy.get('#btn_logout').click();
            // Opcionalmente, puedes verificar que la URL haya cambiado, o que un elemento de login sea visible
            cy.url().should('include', '/login'); // Ajusta la URL según corresponda

//-------------------------------------------------------------------------------------
});


            Cypress.Commands.add('login_CORE', () => { 
              cy.visit('https://spa-container-qa.nuevoexpediente.com/login')
          
              //Login
              cy.get('#input_nombre_usuario_login').type("9-855-734") //Escribir información
              cy.get('#input_contrasena_login').type("Password05$")
              cy.get('#btn_ingresar_login').click();
             //Unidad Ejecutora
              cy.get('[id^="btn_seleccionar_unidad_ejecutora_pol"]')
                .should('be.visible')
                .click();

              cy.wait(1000); 
              cy.get('#btn_seleccionar_area_administracion_global').should('be.visible').click();
              
              // verify tab url
              cy.url()
              .should('include', 'https://spa-container-qa.nuevoexpediente.com/app/medical-records/dashboard')
      
              //--
          });




          import * as XLSX from 'xlsx';

// Comando personalizado para leer el archivo Excel
Cypress.Commands.add('leerExcel', (ruta) => {
  // Lee el archivo Excel
  cy.readFile(ruta, 'binary').then((data) => {
    const wb = XLSX.read(data, { type: 'binary' });

    // Obtén la primera hoja de trabajo
    const ws = wb.Sheets[wb.SheetNames[0]];

    // Convierte la hoja a JSON
    const json = XLSX.utils.sheet_to_json(ws, { header: 1 }); // 'header: 1' para obtener los datos como una matriz

    // Retorna los datos en formato JSON
    return json;
  });
});


















    
 
