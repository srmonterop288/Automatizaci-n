import '@applitools/testgenai-cypress/commands';
import 'cypress-iframe';
import 'cypress-plugin-tab';
import 'cypress-xpath';

describe("Flujo MEIN", () => {
  // Función para bloquear visor PDF
  const bloquearPDF = () => {
    cy.get('iframe', { timeout: 10000 }).then($iframe => {
      if ($iframe.length > 0) {
        cy.log('⛔️ Eliminando iframe del visor PDF');
        cy.wrap($iframe).invoke('remove');
      }
    });
  };

  it('debería iniciar sesión con éxito y evitar ventana de impresión', () => {
    cy.login_MEIN_QA();

    cy.url().should('not.include', '/login');
    cy.wait(1000);

    let contador = 0;
    let imagen = 1;
    const rutaArchivoExcel = 'cypress/fixtures/receta.xlsx';

    // Leer los datos del archivo Excel
    cy.leerExcel(rutaArchivoExcel).then((datosExcel) => {
      console.log(datosExcel);

      // Recorrer los datos del archivo Excel
      for (let i = 1; i < datosExcel.length; i++) { // Comenzamos desde 1 para saltarnos la fila de encabezados
        const PACIENTE = datosExcel[i][0]; // Primer fila, primera columna

        if (PACIENTE && PACIENTE.trim() !== '') {
          cy.window().then((win) => {
            win.alert('El PACIENTE es correcto');
          });
        } else {
          cy.window().then((win) => {
            win.alert('Prueba exitosa');
            cy.log('Prueba Finalizada: correctamente');
          });
          return; // 🔴 Detiene el flujo del test
        }

        // Desplegar barra lateral
        cy.get('#btn_menu_desplegable', { timeout: 20000 }).should('be.visible').click();
        cy.get('#menu_lateral', { timeout: 20000 }).click();
        cy.get('#btn_menu_desplegable', { timeout: 20000 }).should('be.visible').click();

        cy.get('#spn_modulo_farmacia_verificacion').should('be.visible').click().wait(3000);

cy.get('#number', { timeout: 20000 })  // Espera hasta 1 segundo que el elemento exista
  .should('exist')
  .scrollIntoView()
  .should('be.visible')
  .type(PACIENTE)         // Escribe el valor del paciente
  .wait(15000)             // Espera 5 segundos
  .type('{enter}');

        cy.get('#btn_validar_paciente').click().wait(5000);
        cy.wait(1000);

   const RECETA = datosExcel[i][1]; // Primer fila, segunda columna     
   cy.get('#input_tecnico_preparacion_buscar_numero_receta', { timeout: 20000 })  // Espera hasta 1 segundo que el elemento exista
  .should('exist')
  .scrollIntoView()
  .should('be.visible')
  .type(RECETA)         // Escribe el valor del paciente
  .wait(10000)             // Espera 5 segundos
  .type('{enter}');

        cy.xpath('//*[@id="single-spa-application:@thv/core"]/div/div/main/section/section/div/div[5]/div[2]/div/div[2]/div[1]/div/div/div/div/div/table/thead/tr/th[2]/div/label/span/input').click();

        cy.wait(2000);
        cy.get('#btn_mostrar_acciones_trascripcion').parent().click().wait(2000);
        cy.contains('span', 'Reimprimir contraseña').click();

        // Bloquear visor PDF si está presente
        bloquearPDF();

        cy.wait(2000);
                cy.screenshot(
      "Verificación de Receta/Receta títulada_" +
        String(imagen++).padStart(2, "0")
    );

      }
    });
  }); // ← cierre del 'it'
}); // ← cierre del 'describe'
