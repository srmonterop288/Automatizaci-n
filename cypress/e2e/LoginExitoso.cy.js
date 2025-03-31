describe('template spec', () => {
  require('cypress-plugin-tab')
  it('passes', () => {
    cy.visit('https://spa-container-qa.nuevoexpediente.com/login')

    //Login
    cy.get('#input_nombre_usuario_login').type("9-855-734") //Escribir información
    cy.get('#input_contrasena_login').type("Password05$")
    cy.get('#btn_ingresar_login').click();
    cy.wait(2000).tab()

    cy.contains('MANUEL MARIA VALDES').click();

    cy.get('#btn_seleccionar_area_consulta_externa').should('be.visible').click();
    //alert('Login Exitoso'); //Dar clic en un elemento

    //Agenda Médica
    cy.get('#btn_menu_desplegable').should('be.visible').click();
    cy.wait(5000); // Ajusta según lo que necesites

    cy.screenshot('/Login Exitoso/1 - Login') //Tomar Captura de pantalla
  })
})