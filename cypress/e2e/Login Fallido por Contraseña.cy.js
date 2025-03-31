describe('template spec', () => {
  it('Fallido por Contraseña', () => {
    cy.visit('https://front-core-stg.nuevoexpediente.com/login');

    // Login
    cy.get('#input_nombre_usuario_login').type("132-546-021"); // Escribir información
    cy.get('#input_contrasena_login').type("Password011@@@@2323===???");
    cy.get('#btn_ingresar_login').click();

    // Esperar a que la página se cargue completamente
    cy.wait(2000); // Ajusta según lo que necesites

    // Tomar una captura de pantalla mejorada
    cy.screenshot('Login Fallido por Contraseña/1 - Login', {
      capture: 'fullPage' // Captura toda la página
    });
  })
})