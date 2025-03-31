describe("Login", () => {
  require('cypress-plugin-tab')
  it("Should log in without issues", () => {
    cy.visit("https://spa-container-qa.nuevoexpediente.com/login")
    cy.wait(1000); 
    cy.get("#input_nombre_usuario_login").type("20240627001")
    cy.wait(1000); 
    cy.get("#input_contrasena_login").type("Password01", {log:false})
    cy.wait(1000); 
    cy.get("#btn_ingresar_login").click()
    cy.wait(1000); 
    cy.get("#btn_seleccionar_unidad_ejecutora_hospital_rafael_estevez").click()
    cy.wait(1000); 
    cy.get("#btn_seleccionar_area_consulta_externa").click()
    cy.wait(1000); 

    // verify tab url
    cy.url()
    .should('include', 'https://spa-container-qa.nuevoexpediente.com/app/medical-records/dashboard')

    cy.location().then((location) => {
      
      cy.get("#spn_icono_farmacia_verificacion").click()
      cy.wait(5000);
    
// verify tab url
    cy.url()
    .should('include', 'https://spa-container-qa.nuevoexpediente.com/app/farmacia/verificacion')

    
      cy.get("#number").type("ma")
      cy.wait(2000).tab()
      cy.get("#number").type("{enter}");
      cy.wait(1000).tab()
      cy.get("#btn_validar_paciente").click()
      

    })
  })
 })