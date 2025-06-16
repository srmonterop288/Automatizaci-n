require('cypress-xpath');
export function seleccionarEvaluacion()
{
    cy.get('#spn_submodulo_estaciones_clinicas_evaluacion_medica', {timeout: 20000}).click()
}

export function agregarMotivoDeConsultra(tipoRol)
{
    seleccionarEvaluacion()
    cy.get('#tab_'+tipoRol+'_evaluacion_medica_enfermedad_actual', {timeout: 20000}).click()
    cy.get('#tab_'+tipoRol+'_evaluacion_medica_enfermedad_actual').should('be.visible').click();
    cy.get('#btn_'+tipoRol+'_enfermedad_actual_agregar').should('be.visible').click();

    //AGREGAR MOTIVO DE CONSULTA
    cy.get('#ddl_'+tipoRol+'_enfermedad_actual_motivo_consulta').click().type('Actividades de programa escolar{enter}Actividades de programa SADI{enter}Actividades de programa salud mental{enter}');
    cy.get('#txt_'+tipoRol+'_enfermedad_actual_historia_enfermedad').type("Pruebas automatizadas de Motivo de Consulta")
    cy.get('#btn_'+tipoRol+'_enfermedad_actual_guardar').click();
    
}

export function agregarSignosVitales(tipoRol)
{
    seleccionarEvaluacion()
    cy.get('#tab_'+tipoRol+'_evaluacion_medica_signos_vitales', {timeout: 20000}).click()
    cy.get('#btn_'+tipoRol+'_signos_vitales_agregar_exploracion_fisica').should('be.visible').click()

    //AGREGAR SIGNOS VITALES
    cy.get('#txt_'+tipoRol+'_signos_vitales_presion_arterial', {timeout: 20000}).type('90/60')
    cy.get('#txt_'+tipoRol+'_signos_vitales_frecuencia_cardiaca').type('90')
    // Verificar el sexo del paciente antes de llenar los campos
    cy.get('#lbl_sexo').invoke('text').then((texto) => {
      if (texto.trim() === 'MUJER') {
        cy.get('#txt_'+tipoRol+'_signos_vitales_frecuencia_cardiaca_fetal').type('150')
      }
    });
    cy.get('#txt_'+tipoRol+'_signos_vitales_frecuencia_respiratoria').type('15')
    cy.get('#txt_'+tipoRol+'_signos_vitales_saturacion_oxigeno').type('98')
    cy.get('#txt_'+tipoRol+'_signos_vitales_temperatura').type('36.3')
    cy.get('#txt_'+tipoRol+'_signos_vitales_peso').type('89')
    //Verificar si la opción cm esta seleccionada, sino será seleccionada
    cy.get('#ddl_'+tipoRol+'_signos_vitales_talla').parents('.ant-select').within(() => {
    cy.get('.ant-select-selection-item').invoke('text').then((text) => {
      cy.log(text)
      if (text.trim().toLowerCase() !== 'cm') {
        cy.get('.ant-select-selector').click().wait(500)
        /*cy.get('.ant-select-selector-dropdown')
        .should('be.visible')*/
        cy.xpath('//*[@id="ddl_'+tipoRol+'_signos_vitales_talla_cm"]').click();
        // Esperar que se cargue el dropdown y hacer clic en "cm"
        //cy.get('#ddl_Doctor_signos_vitales_talla_cm').should('be.visible').click()
      }
    })
  })
    cy.get('#txt_'+tipoRol+'_signos_vitales_talla').type('189')
    cy.get('#txt_'+tipoRol+'_signos_vitales_glucemia_capilar').type('15')
    cy.get('#txt_'+tipoRol+'_signos_vitales_perimetro_abdominal').type('30')
    cy.get('#txt_'+tipoRol+'_signos_vitales_perimetro_cefalico').type('20')
    cy.get('#txt_'+tipoRol+'_signos_vitales_escala_dolor').type('5')

    cy.get('#btn_'+tipoRol+'_signos_vitales_guardar').click().wait(2000)

}

export function agregarExploracionFisica(tipoRol)
{
    seleccionarEvaluacion()
    cy.get('#tab_'+tipoRol+'_evaluacion_medica_exploracion_fisica', {timeout: 20000}).click()
    cy.get('#btn_'+tipoRol+'_exploracion_fisica_agregar_exploracion_fisica').should('be.visible').click().wait(2000)

    //AGREGAR EXPLORACIÓN FISICA
    cy.get('tr.ant-table-row').each(($row) => {
        let area = $row.find('td').eq(1).text().trim().toLowerCase();
      
        // Reemplazar acentos y caracteres especiales
        area = area
          .normalize("NFD")                   // Separar acento de letra
          .replace(/[\u0300-\u036f]/g, "")   // Eliminar los acentos
          .replace(/\s+/g, '_');             // Reemplazar espacios por "_"
      
        // Seleccionar el botón "Anormal"
        cy.wrap($row)
          .find('input[type="radio"][value="anormal"]')
          .check({ force: true });
      
        // Construir el ID del textarea
        const textareaId = `#txt_`+tipoRol+`_exploracion_fisica_observaciones_${area}`;
      
        // Escribir observación
        cy.get(textareaId)
          .clear({ force: true })
          .type(`Observación automática para el área ${area}`, { force: true });
      });      
      
    cy.get('#btn_'+tipoRol+'_exploracion_fisica_guardar').click().wait(5000)
}

export function agregarNotasClinicas(tipoRol)
{
  seleccionarEvaluacion()
  cy.get('#tab_'+tipoRol+'_evaluacion_medica_notas_medicas', {timeout: 20000}).click()

  //AGREGAR NOTAS CLINICAS
  for(var i=0;i<=9;i++)
  {
    cy.get('#btn_'+tipoRol+'_notas_medicas_agregar_nota').click()
    cy.get('#btn_'+tipoRol+'_notas_medicas_nota_medica').type('Soy Enfermera - Prueba de Nota clínica '+i)
    cy.get('#btn_'+tipoRol+'_notas_medicas_guardar').click().wait(2000)
    //var x = i;
    if(i%2===1)
    {
      //cy.get('#btn_'+tipoRol+'_notas_medicas_tachar').click().wait(2000)
    }
  }
}

export function agregarDiagnosticoDeSalida(tipoRol)
{
  if (tipoRol === "Doctor" || tipoRol === "Medico"){
    seleccionarEvaluacion()
    cy.get('#tab_'+tipoRol+'_evaluacion_medica_diagnostico_salida', {timeout: 20000}).click()
    cy.get('#btn_'+tipoRol+'_diagnostico_salida_agregar_diagnostico').click()

    //AGREGAR DIAGNÓSTICO DE SALIDA
    cy.get('#rb_'+tipoRol+'_diagnostico_salida_nuevo').click()
    cy.get('#ddl_'+tipoRol+'_diagnostico_salida_enfermedad').click().wait(2000).type('A00{ENTER}')
    cy.get('#input_'+tipoRol+'_diagnostico_salida_observacion').type('Prueba de diagnóstico de salida')
    cy.get('#rb_'+tipoRol+'_diagnostico_salida_estatus_confirmado').click()
    cy.get('#btn_'+tipoRol+'_diagnostico_salida_guardar').click().wait(2000)
    /*if(cy.get('#btn_'+tipoRol+'_diagnostico_salida_alert_form').should('be.visible'))
    {
      cy.get('#btn_'+tipoRol+'_diagnostico_salida_alert_form').should('be.visible').click()
    }*/
    cy.get('body').then($body => {
      if ($body.find('#btn_'+tipoRol+'_diagnostico_salida_alert_form').length > 0) {
        cy.get('#btn_'+tipoRol+'_diagnostico_salida_alert_form').click();
      }
    });
  }
  else{
    cy.log("Las enfermeras no pueden ver el Diagnóstico de Salida")
  }
}