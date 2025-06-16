export function loginMEIN(ambiente) {
  cy.readFile('cypress/fixtures/loginMEIN.json').then((data) => {
    cy.readFile('cypress/fixtures/urlDeAmbientes.json').then((urls) => {
      const url = urls[`url${ambiente}`];
      const jefeFarmacia = data[`jefeFarmacia${ambiente}`];
      const password = data[`passwordJefeFarmacia${ambiente}`];

      cy.log('🌐 URL:', url);
      cy.log('👨‍⚕️ Usuario:', jefeFarmacia);
      cy.log('🔒 Contraseña:', password);

      cy.visit(url);
      cy.get('#input_nombre_usuario_login').should('be.visible').type(jefeFarmacia);
      cy.get('#input_contrasena_login').should('be.visible').type(password);
      cy.get('#spn_ver_contrasena').click();
      cy.get('#btn_ingresar_login', { timeout: 20000 }).click();

      // Unidades Ejecutoras por ambiente
      const unidadesPorAmbiente = {
        QA: '#btn_seleccionar_unidad_ejecutora_hospital_de_almirante',
        STG: '#btn_seleccionar_unidad_ejecutora_policlinica_nuevo_san_juan',
        CAP: '#btn_seleccionar_unidad_ejecutora_hospital_de_prueba_qa',
      };

      cy.get(unidadesPorAmbiente[ambiente], { timeout: 20000 }).should('be.visible').click();
      cy.get('#btn_seleccionar_area_consulta_externa', { timeout: 20000 }).should('be.visible').click();

      // Barra lateral
      cy.get('#btn_menu_desplegable', { timeout: 20000 }).should('be.visible').click();
      cy.get('#menu_lateral', { timeout: 20000 }).click();
    });
  });
}
