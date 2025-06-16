export function loginECLI(ambiente) {
  cy.readFile('cypress/fixtures/loginECLI.json').then((data) => {
    cy.readFile('cypress/fixtures/urlDeAmbientes.json').then((urls) => {
      const url = urls[`url${ambiente}`];
      const doctor = data[`doctor${ambiente}`];
      const password = data[`passswordDoctor${ambiente}`];

      cy.log('🌐 URL:', url);
      cy.log('👨‍⚕️ Usuario:', doctor);
      cy.log('🔒 Contraseña:', password);

      cy.visit(url);
      cy.get('#input_nombre_usuario_login').should('be.visible').type(doctor);
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



export function iniciarUnaConsulta(tipoRol) 
{
  return cy.get('[id^=btn_'+tipoRol+'_agenda_iniciar_], [id^=btn_'+tipoRol+'_agenda_continuar_]', {timeout: 20000}).then(($buttons) => 
  {
    let tipoBoton = '';
    if ($buttons.length === 0) {
      cy.log('❌ No hay consultas disponibles en esta agenda.');
      return cy.wrap({ numero: null, botonMasNuevo: null, tipoBoton: null});
    }

    const botonesOrdenados = $buttons.toArray().map((button) => {
      const id = button.id;
      const numero = parseInt(id.replace(/\D+/g, ''), 10);
      return { id, numero, button };
    });

    botonesOrdenados.sort((a, b) => b.numero - a.numero);
    const botonMasNuevo = botonesOrdenados[0];

    cy.log(`✅ Se encontró botón con ID: ${botonMasNuevo.id}`);

    //SABER QUE TIPO DE INICIO SELECCIONÓ

    if (botonMasNuevo.id.startsWith('btn_'+tipoRol+'_agenda_iniciar_')) {
      cy.log('Se seleccionó un botón de iniciar consulta');
      tipoBoton = 'iniciar';
    } else if (botonMasNuevo.id.startsWith('btn_'+tipoRol+'_agenda_continuar_')) {
      cy.log('Se seleccionó un botón de continuar consulta');
      tipoBoton = 'continuar';
    }
    else{
      tipoBoton=null;// Retornar null si no hay botones
    }

    return cy.wrap({ numero: botonMasNuevo.numero, botonMasNuevo, tipoBoton, tipoRol});
  });
}
  

export function opcionesNuevaConsulta(tipoRol) 
{
  return cy.get('[id^=btn_'+tipoRol+'_agenda_iniciar_]', {timeout: 20000}).then(($buttons) => 
  {
    let tipoBoton = '';
    if ($buttons.length === 0) {
      cy.log('❌ No hay consultas disponibles en esta agenda.');
      return cy.wrap({ numero: null, botonMasNuevo: null, tipoBoton: null});
    }

    const botonesOrdenados = $buttons.toArray().map((button) => {
      const id = button.id;
      const numero = parseInt(id.replace(/\D+/g, ''), 10);
      return { id, numero, button };
    });

    botonesOrdenados.sort((a, b) => b.numero - a.numero);
    const botonMasNuevo = botonesOrdenados[0];

    cy.log(`✅ Se encontró botón con ID: ${botonMasNuevo.id}`);

    //SABER QUE TIPO DE INICIO SELECCIONÓ

    if (botonMasNuevo.id.startsWith('btn_'+tipoRol+'_agenda_iniciar_')) {
      cy.log('Se seleccionó un botón de iniciar consulta');
      tipoBoton = 'iniciar';
    } else if (botonMasNuevo.id.startsWith('btn_'+tipoRol+'_agenda_continuar_')) {
      cy.log('Se seleccionó un botón de continuar consulta');
      tipoBoton = 'continuar';
    }
    else{
      tipoBoton=null;// Retornar null si no hay botones
    }

    return cy.wrap({ numero: botonMasNuevo.numero, botonMasNuevo, tipoBoton, tipoRol});
  });
}

export function personaNoAsistio(numero, botonMasNuevo, tiposRol)
  {
    opcionesNuevaConsulta(numero, botonMasNuevo, tipoRol)
    for (let i = 0; i < 3; i++) {
        cy.get(`#${botonMasNuevo.id}`, {timeout: 20000} ).trigger('mouseover');
        cy.wait(500)
        cy.get('#btn_estado_registrar_llamado'+ numero, {timeout: 20000}).click();
        // Aquí puedes poner las acciones de cada vuelta
        cy.get('#rb_'+tipoRol+'_llamado_si', {timeout: 20000}).wait(1000).click();
        cy.get('#btn_'+tipoRol+'_agenda_motivo_guardar', {timeout: 20000}).click()
        cy.wait(5000);
      }
      cy.get(`#${botonMasNuevo.id}`, {timeout: 20000}).trigger('mouseover');
      cy.wait(500)
      cy.get('#btn_estado_no_asistio'+numero, {timeout: 20000}).click();
      cy.get('#btn_no-atendio_confirmar', {timeout: 20000}).click()
  }
  
  export function pacienteNoAtendido(numero, botonMasNuevo, tipoRol)
  {
    opcionesNuevaConsulta(tipoRol)
    cy.get(`#${botonMasNuevo.id}`).trigger('mouseover')
    cy.wait(500);
    cy.get('#btn_estado_no_atendio' + numero, {timeout: 20000}).click(); // Simula el hover
    cy.get('#ddl_'+tipoRol+'_agenda_motivo', {timeout: 20000}).should('be.visible').type('Otro{downarrow}{enter}')//.wait(500).select('Otro')
    cy.get('#txt_'+tipoRol+'_modal-no-atendido_otro-motivo', {timeout: 20000}).type('Prueba de otro en No Atendido')
    cy.get('#btn_'+tipoRol+'_agenda_motivo_guardar', {timeout: 20000}).click();
  }

  export function obtenerIdoneaDelPaciente()
  {
    cy.xpath('//*[@id="single-spa-application:@thv/core"]/div/div/main/section/div/main[2]/div/div[3]/div/div[3]/div/div[2]').invoke('text').then((text) => {
      const idonea = text.trim(); // El valor extraído
      // Leer archivo actual
        cy.readFile('cypress/fixtures/numeroDeReceta.json').then((data) => {
          data.idoneaDelPaciente = idonea; // Solo actualizamos esta propiedad
          // Escribir de nuevo el archivo completo con el nuevo valor
          cy.writeFile('cypress/fixtures/numeroDeReceta.json', data);
          cy.log('Guardado idónea del paciente:', idonea);
      });
    });
  }
  
  