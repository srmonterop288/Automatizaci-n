import '@applitools/testgenai-cypress/commands'
describe("Login", () => {
  require('cypress-plugin-tab')
  require('cypress-xpath');

  it('Inicio de sesión éxitoso', () => {
    // Llama a la función login 
    cy.login_CORE();

       })
  })
 