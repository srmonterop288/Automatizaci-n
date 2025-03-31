import '@applitools/testgenai-cypress/commands'
describe("Antecedentes", () => {
  require('cypress-plugin-tab')
  require('cypress-xpath');

  it('debería iniciar sesión con éxito', () => {
    // Llama a la función login 
    cy.login_ECLI();

    // Verifica que el login haya sido exitoso, por ejemplo, comprobando que la URL cambió
    cy.url().should('not.include', '/login');

    cy.wait(1000); 
    cy.get("#spn_icono_estaciones_clinicas_agenda").should('be.visible').click();
    cy.wait(2000); 
    cy.get("#spn_submodulo_estaciones_clinicas_agenda").should('be.visible').click();
    cy.wait(4000); 

     // Seleccionamos el radio input con la clase ant-radio-input y el valor "Servicio"
    cy.get('input.ant-radio-input[value="Servicio"]').check();

    // Verificamos que el radio input con valor "Servicio" esté seleccionado
    cy.get('input.ant-radio-input[value="Servicio"]').should('be.checked');

     cy.wait(2000);

     //Seleccionamos el botón cuyo id contiene "btn_Enfermero/a_agenda_iniciar"
     //cy.get('button[id*="btn_Enfermero/a_agenda_iniciar_0"]').click();

  
 //Seleccionamos el botón continuar"
    cy.get('button[id="btn_Enfermero/a_agenda_continuar_0"]').then(($button) => {
      if ($button.length > 0) {
        // Si el botón con id="btn_Enfermero/a_agenda_iniciar_0" existe, hacer clic en él
        cy.wrap($button).click();
        cy.wait(1000);
      } else {
        // Si no existe, buscar el siguiente botón con otro id, por ejemplo "btn_Enfermero/a_agenda_iniciar_1"
        cy.get('button[id="btn_Enfermero/a_agenda_continuar_1"]')
          .should('exist').click(); // Haz clic en el segundo botón
      }
    });

    cy.wait(2000).tab()
     // motivo de consulta----------------------------------------------------
     cy.get('#btn_Enfermero\\/a_enfermedad_actual_agregar')  // Selecciona el selector
     .eq(0)  // Selecciona el primer elemento de los que coinciden
     .scrollIntoView()  // Desplaza el elemento hasta que sea visible
     .should('be.visible')  // Verifica que el elemento sea visible
     .click();  // Haz clic en el elemento

       cy.get('.ant-select-selection-overflow')
       .should('be.visible')  // Opcional: Verificar que el elemento sea visible
       .click()

       
       cy.get('#ddl_Enfermero\\/a_enfermedad_actual_motivo_consulta_list_0')  // Escapa el '/' con '\\'
       .should('be.visible')  // Verifica que el elemento sea visible
       .click();  // Haz clic en el elemento
        cy.wait(1000).tab()

        cy.get('#txt_Enfermero\\/a_enfermedad_actual_historia_enfermedad')  // Escapa el '/' con '\\'
        .should('be.visible')  // Verifica que el elemento esté visible
        .click(); 
        cy.get('#txt_Enfermero\\/a_enfermedad_actual_historia_enfermedad').type("prueba")

        cy.get('#btn_Enfermero\\/a_enfermedad_actual_guardar')  // Escapa el '/' con '\\'
        .should('be.visible')  // Verifica que el elemento sea visible
        .click();  // Haz clic en el elemento
        cy.wait(2000); 
        cy.screenshot('clicking-on-nav') 

 
   

    // Signos vitales------------------------------------
    cy.get("#tab_Doctor_evaluacion_medica_signos_vitales").should('be.visible').click();
    cy.screenshot('clicking-on-nav')
    cy.wait(3000); 
    cy.get("#btn_Doctor_signos_vitales_agregar_exploracion_fisica").should('be.visible').click();
    cy.wait(3000); 
    cy.get("#txt_Doctor_signos_vitales_presion_arterial").should('be.visible').click();
    cy.get("#txt_Doctor_signos_vitales_presion_arterial").type("125/80")
    cy.get("#txt_Doctor_signos_vitales_frecuencia_cardiaca").should('be.visible').click();
    cy.get("#txt_Doctor_signos_vitales_frecuencia_cardiaca").type("55")
    cy.get("#txt_Doctor_signos_vitales_frecuencia_respiratoria").should('be.visible').click();
    cy.get("#txt_Doctor_signos_vitales_frecuencia_respiratoria").type("55")
    cy.get("#txt_Doctor_signos_vitales_saturacion_oxigeno").should('be.visible').click();
    cy.get("#txt_Doctor_signos_vitales_saturacion_oxigeno").type("80")

    cy.get("#txt_Doctor_signos_vitales_temperatura").should('be.visible').click();
    cy.get("#txt_Doctor_signos_vitales_temperatura").type("37.0")
    cy.get("#txt_Doctor_signos_vitales_peso").should('be.visible').click();
    cy.get("#txt_Doctor_signos_vitales_peso").type("80")
    cy.get("#txt_Doctor_signos_vitales_talla").should('be.visible').click();
    cy.get("#txt_Doctor_signos_vitales_talla").type("1.80")

    cy.get("#txt_Doctor_signos_vitales_perimetro_abdominal").should('be.visible').click();
    cy.get("#txt_Doctor_signos_vitales_perimetro_abdominal").type("90")
    cy.get("#txt_Doctor_signos_vitales_perimetro_cefalico").should('be.visible').click();
    cy.get("#txt_Doctor_signos_vitales_perimetro_cefalico").type("90.9")
    cy.get("#btn_Doctor_signos_vitales_guardar").should('be.visible').click();
    cy.wait(2000); 
    cy.screenshot('clicking-on-nav')  
  
// Exploración Física

cy.get("#tab_Doctor_evaluacion_medica_exploracion_fisica").click();
cy.get("#btn_Doctor_exploracion_fisica_agregar_exploracion_fisica").should('be.visible').click();
cy.wait(2000); 
cy.get("#btn_Doctor_exploracion_fisica_guardar").click();
cy.wait(5000); 
cy.screenshot('clicking-on-nav')  


// Nota Médica

cy.get("#tab_Doctor_evaluacion_medica_notas_medicas").click();
cy.get("#btn_Doctor_notas_medicas_agregar_nota").should('be.visible').click();
cy.wait(2000); 
cy.get("#btn_Doctor_notas_medicas_nota_medica").click();
cy.get("#btn_Doctor_notas_medicas_nota_medica").type("prueba")
cy.wait(2000); 
cy.get("#btn_Doctor_notas_medicas_guardar").click();
cy.wait(3000); 
cy.screenshot('clicking-on-nav') 


// Diagnóstico de Salida

cy.get("#tab_Doctor_evaluacion_medica_diagnostico_salida").should('be.visible').click();
cy.get("#btn_Doctor_diagnostico_salida_agregar_diagnostico").should('be.visible').click();
cy.wait(2000); 
cy.get("#rb_Doctor_diagnostico_salida_nuevo").click();
cy.get("#ddl_Doctor_diagnostico_salida_enfermedad").click();
cy.wait(2000).tab()
cy.get("#ddl_Doctor_diagnostico_salida_enfermedad").type("{enter}");
cy.wait(2000); 
cy.get("#input_Doctor_diagnostico_salida_observacion").click();
cy.get("#input_Doctor_diagnostico_salida_observacion").type("prueba")
cy.get("#rb_Doctor_diagnostico_salida_estatus_diagnostico").click();
cy.get("#btn_Doctor_diagnostico_salida_guardar").click();
cy.wait(3000); 
cy.screenshot('clicking-on-nav') 



    })
  })
 