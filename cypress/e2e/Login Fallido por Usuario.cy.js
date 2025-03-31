describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://front-core-stg.nuevoexpediente.com/login')

    //Login
    cy.get('#input_nombre_usuario_login').type("//@@==nADA de NADA UsUar10 FAIL") //Escribir información
    cy.get('#input_contrasena_login').type("Password01")
    cy.get('#btn_ingresar_login').click();
    cy.wait(2000); // Ajusta según lo que necesites

    // Tomar una captura de pantalla mejorada
    cy.screenshot('Login Fallido por Usuario/1 - Login', {
      capture: 'fullPage' // Captura toda la página
    });
  })
})